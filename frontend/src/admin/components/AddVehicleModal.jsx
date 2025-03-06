import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddVehicleModal = ({ isOpen, onClose, onSave }) => {
  const [newVehicle, setNewVehicle] = useState({
    brand: '',
    model: '',
    engine: '',
    topSpeed: '',
    acceleration: '',
    primaryImage: null,      // For primary image file
    thumbnails: [],          // For thumbnail image files
    price: '',
    booked: false,
    type: '',
    transmission: '',
    seats: '',
    rentalType: '',
    securityDeposit: '',
    availability: 'available',
    description: ''          // New field for vehicle description
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle({
      ...newVehicle,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePrimaryImageUpload = (e) => {
    const file = e.target.files[0];
    setNewVehicle({
      ...newVehicle,
      primaryImage: file
    });
  };

  const handleThumbnailsUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newVehicle.thumbnails.length > 4) {
      alert('You can only upload up to 4 thumbnail images.');
      return;
    }
    setNewVehicle({
      ...newVehicle,
      thumbnails: [...newVehicle.thumbnails, ...files]
    });
  };

  const handleRemovePrimaryImage = () => {
    setNewVehicle({
      ...newVehicle,
      primaryImage: null
    });
  };

  const handleRemoveThumbnail = (index) => {
    const updatedThumbnails = newVehicle.thumbnails.filter((_, i) => i !== index);
    setNewVehicle({
      ...newVehicle,
      thumbnails: updatedThumbnails
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Description Field */}
            <div className="col-span-full">
              <textarea
                name="description"
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                value={newVehicle.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Primary Image Upload */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-graydark">Upload Primary Image (1)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageUpload}
                className="mt-1 block w-full px-3 py-2 border border-graylight rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm cursor-pointer"
              />
              {newVehicle.primaryImage && (
                <div className="mt-2 relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(newVehicle.primaryImage)}
                    alt="Primary Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-darkred text-white rounded-full p-1 cursor-pointer"
                    onClick={handleRemovePrimaryImage}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails Upload */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-graydark">Upload Thumbnails (Max 4)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleThumbnailsUpload}
                className="mt-1 block w-full px-3 py-2 border border-graylight rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm cursor-pointer"
              />
              {newVehicle.thumbnails.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {newVehicle.thumbnails.map((file, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-darkred text-white rounded-full p-1 cursor-pointer"
                        onClick={() => handleRemoveThumbnail(index)}
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
