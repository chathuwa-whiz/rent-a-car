import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UpdateVehicleModal = ({ isOpen, onClose, onSave, initialData }) => {
  const defaultState = {
    id: '',
    brand: '',
    model: '',
    engine: '',
    topSpeed: '',
    acceleration: '',
    primaryImage: null,
    thumbnails: [],
    price: '',
    booked: false,
    type: '',
    transmission: '',
    seats: '',
    rentalType: '',
    securityDeposit: '',
    availability: 'available',
    description: ''
  };

  const [vehicleData, setVehicleData] = useState(defaultState);

  useEffect(() => {
    if (initialData) {
      setVehicleData({
        id: initialData.id, // from the Mongoose transform
        brand: initialData.brand || '',
        model: initialData.model || '',
        engine: initialData.engine || '',
        topSpeed: initialData.topSpeed || '',
        acceleration: initialData.acceleration || '',
        primaryImage: null, // File inputs cannot be pre-filled; use initialData.primaryImage for preview.
        thumbnails: [],
        price: initialData.price || '',
        booked: initialData.booked || false,
        type: initialData.type || '',
        transmission: initialData.transmission || '',
        seats: initialData.seats || '',
        rentalType: initialData.rentalType || '',
        securityDeposit: initialData.securityDeposit || '',
        availability: initialData.availability || 'available',
        description: initialData.description || ''
      });
    } else {
      setVehicleData(defaultState);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePrimaryImageUpload = (e) => {
    const file = e.target.files[0];
    setVehicleData({
      ...vehicleData,
      primaryImage: file
    });
  };

  const handleThumbnailsUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + vehicleData.thumbnails.length > 4) {
      alert('You can only upload up to 4 thumbnail images.');
      return;
    }
    setVehicleData({
      ...vehicleData,
      thumbnails: [...vehicleData.thumbnails, ...files]
    });
  };

  const handleRemovePrimaryImage = () => {
    setVehicleData({
      ...vehicleData,
      primaryImage: null
    });
  };

  const handleRemoveThumbnail = (index) => {
    const updatedThumbnails = vehicleData.thumbnails.filter((_, i) => i !== index);
    setVehicleData({
      ...vehicleData,
      thumbnails: updatedThumbnails
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(vehicleData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-2/3 p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Update Vehicle</h2>
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
              value={vehicleData.brand}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.model}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="engine"
              placeholder="Engine"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.engine}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="topSpeed"
              placeholder="Top Speed (km/h)"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.topSpeed}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="acceleration"
              placeholder="Acceleration (0-100 km/h)"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.acceleration}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.price}
              onChange={handleInputChange}
              required
            />
            <select
              name="type"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.type}
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
              value={vehicleData.transmission}
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
              value={vehicleData.seats}
              onChange={handleInputChange}
              required
            />
            <select
              name="rentalType"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.rentalType}
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
              value={vehicleData.securityDeposit}
              onChange={handleInputChange}
              required
            />
            <select
              name="availability"
              className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
              value={vehicleData.availability}
              onChange={handleInputChange}
              required
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <div className="col-span-full">
              <textarea
                name="description"
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
                value={vehicleData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Primary Image Upload */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-graydark">
                Upload Primary Image (1)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageUpload}
                className="mt-1 block w-full px-3 py-2 border border-graylight rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm cursor-pointer"
              />
              {vehicleData.primaryImage ? (
                <div className="mt-2 relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(vehicleData.primaryImage)}
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
              ) : initialData && initialData.primaryImage ? (
                <div className="mt-2 relative w-20 h-20">
                  <img
                    src={initialData.primaryImage}
                    alt="Primary Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : null}
            </div>

            {/* Thumbnails Upload */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-graydark">
                Upload Thumbnails (Max 4)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleThumbnailsUpload}
                className="mt-1 block w-full px-3 py-2 border border-graylight rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm cursor-pointer"
              />
              {vehicleData.thumbnails.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {vehicleData.thumbnails.map((file, index) => (
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
              ) : initialData && initialData.thumbnails && initialData.thumbnails.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {initialData.thumbnails.map((url, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <img
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
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

export default UpdateVehicleModal;
