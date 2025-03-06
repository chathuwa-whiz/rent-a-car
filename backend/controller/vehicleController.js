import Vehicle from "../model/Vehicle.js";

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new vehicle with Cloudinary image upload
export const addVehicle = async (req, res) => {
  try {
    // Ensure required primary image exists
    if (!req.files || !req.files.primaryImage || req.files.primaryImage.length === 0) {
      return res.status(400).json({ message: "No primary image uploaded" });
    }

    const {
      brand, model, engine, topSpeed, acceleration, price,
      type, transmission, seats, rentalType, securityDeposit, availability, description
    } = req.body;

    // Extract Cloudinary URLs:
    // - primaryImage: first (and only) file from primaryImage field
    // - thumbnails: files from thumbnails field (if any)
    const primaryImage = req.files.primaryImage[0].path;
    const thumbnails = req.files.thumbnails ? req.files.thumbnails.map(file => file.path) : [];

    const newVehicle = new Vehicle({
      brand,
      model,
      engine,
      topSpeed,
      acceleration,
      price,
      booked: false,
      type,
      transmission,
      seats,
      rentalType,
      securityDeposit,
      availability,
      primaryImage,
      thumbnails,
      description,
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Get a single vehicle
export const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a vehicle (process file uploads if provided)
export const updateVehicle = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If files are uploaded, update the corresponding fields
    if (req.files) {
      if (req.files.primaryImage && req.files.primaryImage.length > 0) {
        updateData.primaryImage = req.files.primaryImage[0].path;
      }
      if (req.files.thumbnails && req.files.thumbnails.length > 0) {
        updateData.thumbnails = req.files.thumbnails.map(file => file.path);
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};