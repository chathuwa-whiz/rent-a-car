import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  engine: { type: String, required: true },
  topSpeed: { type: Number, required: true },
  acceleration: { type: Number, required: true },
  price: { type: Number, required: true },
  booked: { type: Boolean, default: false },
  type: { type: String, required: true },
  transmission: { type: String, required: true },
  seats: { type: Number, required: true },
  rentalType: { type: String, required: true },
  securityDeposit: { type: Number, required: true },
  availability: { type: String, default: "available" },
  primaryImage: { type: String, required: true }, // Primary image Cloudinary URL
  thumbnails: [{ type: String }],              // Thumbnail images Cloudinary URLs
  description: { type: String }                  // Description of the vehicle
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
