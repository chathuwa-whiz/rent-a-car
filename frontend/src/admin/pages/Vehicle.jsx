import React, { useState } from 'react';
import { Plus, Search, Filter, Car, Edit, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import UpdateVehicleModal from '../components/UpdateVehicleModal'; // For editing vehicles
import AddVehicleModal from '../components/AddVehicleModal';       // For adding new vehicles
import { useGetVehiclesQuery, useAddVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } from "../../redux/services/vehicleSlice";

const statusColors = { available: 'bg-[#bafff0] text-gasolinlight', booked: 'bg-[#cadbf3] text-blue', maintenance: 'bg-[#fff6c6] text-yellowdark' };
const statusIcons = { available: CheckCircle, booked: Car, maintenance: AlertTriangle };

export default function Vehicles() {
  const { data: vehiclesList, error, isLoading, refetch } = useGetVehiclesQuery();
  const [addVehicle] = useAddVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching vehicles</div>;

  // Filter based on brand and model (concatenated) and availability.
  const filteredVehicles = (vehiclesList || []).filter(vehicle => {
    const vehicleName = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
    const availability = vehicle.availability ? vehicle.availability.toLowerCase() : '';
    return (
      (filterStatus === 'all' || availability === filterStatus) &&
      vehicleName.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddVehicle = async (newVehicle) => {
    const formData = new FormData();
    for (let key in newVehicle) {
      if (key === 'primaryImage') {
        formData.append('primaryImage', newVehicle.primaryImage);
      } else if (key === 'thumbnails') {
        newVehicle.thumbnails.forEach(file => formData.append('thumbnails', file));
      } else {
        formData.append(key, newVehicle[key]);
      }
    }
    try {
      await addVehicle(formData).unwrap();
      refetch();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add vehicle", err);
    }
  };

    // =============== EDIT VEHICLE (Partial Update) ===============
    const handleEditVehicle = async (editedVehicle) => {
      const { id, primaryImage, thumbnails, ...rest } = editedVehicle;
      const formData = new FormData();
  
      // 1) Append all text/number fields from rest
      for (let key in rest) {
        formData.append(key, rest[key]);
      }
  
      // 2) Append new primaryImage only if a new file was chosen
      if (primaryImage) {
        formData.append('primaryImage', primaryImage);
      }
  
      // 3) Append new thumbnails only if user selected new files
      if (thumbnails && thumbnails.length > 0) {
        thumbnails.forEach(file => formData.append('thumbnails', file));
      }
  
      try {
        await updateVehicle({ id, data: formData }).unwrap();
        refetch();
        setVehicleToEdit(null);
        setIsEditModalOpen(false);
      } catch (err) {
        console.error("Failed to update vehicle", err);
      }
    };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete vehicle", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-4 lg:items-center">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <button
          className="w-[200px] bg-blue text-white px-4 py-2 rounded-lg hover:bg-[#0024b5] flex justify-center items-center cursor-pointer"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Vehicle
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="w-full pl-10 text-sm pr-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white text-sm pl-10 pr-8 py-2 rounded-lg border border-graylight cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const StatusIcon = statusIcons[vehicle.availability] || (() => null);
          const availability = vehicle.availability || '';
          return (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={vehicle.primaryImage} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-graylight text-sm">{vehicle.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center ${statusColors[availability]}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {availability ? availability.charAt(0).toUpperCase() + availability.slice(1) : ''}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold mt-2">${vehicle.price}/day</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 bg-[#cadbf3] text-blue px-4 py-2 rounded hover:bg-blue-100 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setVehicleToEdit(vehicle);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </button>
                  <button
                    className="flex-1 bg-[#f2dddd] text-darkred px-4 py-2 rounded hover:bg-red-100 flex items-center justify-center cursor-pointer"
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Vehicle Modal */}
      {isAddModalOpen && (
        <AddVehicleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddVehicle}
        />
      )}

      {/* Update Vehicle Modal */}
      {isEditModalOpen && vehicleToEdit && (
        <UpdateVehicleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setVehicleToEdit(null);
          }}
          onSave={handleEditVehicle}
          initialData={vehicleToEdit}
        />
      )}
    </div>
  );
}
