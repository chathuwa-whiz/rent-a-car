import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Maintenance = mongoose.model("Maintenance", userSchema);

export default Maintenance;
