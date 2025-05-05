// backend/routes/ReportRoutes.js
import express from "express";
import {
  generateBookingReport,
  getReports,
} from "../controller/ReportController.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";

const reportRoutes = express.Router();

reportRoutes.get(
  "/bookings",
  authenticate,
  authorize("admin"),
  generateBookingReport
);

reportRoutes.get("/", authenticate, authorize("admin"), getReports);

export default reportRoutes;
