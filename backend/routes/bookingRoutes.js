import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings
} from "../controller/bookingController.js";

import { authenticate, authorize } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/",
  authenticate,
  // authorize("admin"),
  getAllBookings // Admin-only access
);

router.get("/user",
  authenticate,
  getUserBookings // Get user's own bookings
);

router.get("/:id",
  authenticate,
  getBookingById // Get a specific booking
);

router.post("/",
  authenticate,
  createBooking // Create a new booking (Only logged-in users)
);

router.put("/:id",
  authenticate,
  authorize("admin"),
  updateBooking // Update booking status (Admin Only)
);

router.delete("/:id",
  authenticate,
  authorize("admin"),
  deleteBooking // Delete a booking (Admin Only)
);

export default router;
