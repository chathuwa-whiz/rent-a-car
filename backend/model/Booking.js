import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle", 
    required: true,
  },
  dates: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  status: {
    type: String,
    enum: ["Active", "Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  returnStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  total: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
