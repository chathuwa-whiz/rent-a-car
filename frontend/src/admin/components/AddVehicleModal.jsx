import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddVehicleModal = ({ isOpen, onClose, onSave }) => {
  const [newVehicle, setNewVehicle] = useState({
    brand: '',
    model: '',
    engine: '',
    topSpeed: '',
    acceleration: '',
    images: [],
    price: '',
    booked: false,
    type: '',
    transmission: '',
    seats: '',
    rentalType: '',
    securityDeposit: '',
    availability: 'available' 
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle({
      ...newVehicle,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    if (files.length + newVehicle.images.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    setNewVehicle({
      ...newVehicle,
      images: [...newVehicle.images, ...files] // Append new files to existing ones
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newVehicle.images.filter((_, i) => i !== index);
    setNewVehicle({
      ...newVehicle,
      images: updatedImages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newVehicle); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 space-y-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Vehicle</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-graylight cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.brand}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.model}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="engine"
              placeholder="Engine"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.engine}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="topSpeed"
              placeholder="Top Speed (km/h)"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.topSpeed}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="acceleration"
              placeholder="Acceleration (0-100 km/h)"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.acceleration}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.price}
              onChange={handleInputChange}
              required
            />
            <select
              name="type"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
            <select
              name="transmission"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.transmission}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            <input
              type="number"
              name="seats"
              placeholder="Seats"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.seats}
              onChange={handleInputChange}
              required
            />
            <select
              name="rentalType"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.rentalType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Rental Type</option>
              <option value="Per Day">Per Day</option>
              <option value="Per Hour">Per Hour</option>
            </select>
            <input
              type="number"
              name="securityDeposit"
              placeholder="Security Deposit"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.securityDeposit}
              onChange={handleInputChange}
              required
            />
           
            <select
              name="availability"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={newVehicle.availability}
              onChange={handleInputChange}
              required
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-graydark">Upload Images (Max 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-1 block w-full px-3 py-2 border border-graylight rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm cursor-pointer"
              />
              {newVehicle.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {newVehicle.images.map((file, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-darkred text-white rounded-full p-1 cursor-pointer"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-graylight hover:bg-graylight cursor-pointer" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue text-white hover:bg-[#0024b5]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;