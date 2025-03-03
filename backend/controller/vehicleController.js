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

    // Ensure files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const {
      brand, model, engine, topSpeed, acceleration, price,
      type, transmission, seats, rentalType, securityDeposit, availability
    } = req.body;

    // Extract Cloudinary URLs
    const imageUrls = req.files.map(file => file.path);

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
      images: imageUrls, 
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
