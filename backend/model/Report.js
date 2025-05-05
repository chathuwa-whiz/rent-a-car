import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['booking', 'revenue', 'vehicle'],
    required: true
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  metrics: {
    count: Number,
    growth: Number
  }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
export default Report;