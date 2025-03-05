import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings
} from "../controller/bookingController.js";

const router = express.Router();

router.get("/", getAllBookings); 
router.get("/user", getUserBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
