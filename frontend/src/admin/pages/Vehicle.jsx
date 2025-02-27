import React, { useState } from 'react';
import { Plus, Search, Filter, Car, Edit, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

const vehicles = [
  { id: 1, name: 'BMW X5', type: 'SUV', year: 2024, registration: 'ABC123', status: 'available', price: 150, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Mercedes E-Class', type: 'Sedan', year: 2023, registration: 'XYZ789', status: 'rented', price: 200, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Toyota Camry', type: 'Sedan', year: 2023, registration: 'DEF456', status: 'maintenance', price: 100, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'BMW X2', type: 'Sedan', year: 2023, registration: 'DEF456', status: 'maintenance', price: 100, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Honda Civic', type: 'Sedan', year: 2023, registration: 'DEF456', status: 'maintenance', price: 100, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Toyota Belta', type: 'Sedan', year: 2023, registration: 'DEF456', status: 'maintenance', price: 100, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400' }
];

const statusColors = { available: 'bg-[#bafff0] text-gasolinlight', rented: 'bg-[#cadbf3] text-blue', maintenance: 'bg-[#fff6c6] text-yellowdark' };
const statusIcons = { available: CheckCircle, rented: Car, maintenance: AlertTriangle };

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (filterStatus === 'all' || vehicle.status === filterStatus) &&
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-4 lg:items-center">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <button className="w-[200px] bg-blue text-white px-4 py-2 rounded-lg hover:bg-[#0024b5] flex justify-center items-center cursor-pointer">
          <Plus className="h-5 w-5 mr-2" /> Add New Vehicle
        </button>
      </div>
      
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
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const StatusIcon = statusIcons[vehicle.status];
          return (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                    <p className="text-graylight text-sm">{vehicle.type} • {vehicle.year}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center ${statusColors[vehicle.status]}`}> 
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-graydark">Registration: {vehicle.registration}</p>
                  <p className="text-lg font-semibold mt-2">${vehicle.price}/day</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-[#cadbf3] text-blue px-4 py-2 rounded hover:bg-blue-100 flex items-center justify-center cursor-pointer">
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </button>
                  <button className="flex-1 bg-[#f2dddd] text-darkred px-4 py-2 rounded hover:bg-red-100 flex items-center justify-center cursor-pointer">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

