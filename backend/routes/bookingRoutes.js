import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings
} from "../controller/bookingController.js";
import authMiddleware from "../middleware/AuthMiddleware.js"; 

const router = express.Router();

router.get("/", authMiddleware, getAllBookings); 
router.get("/user", authMiddleware, getUserBookings);
router.get("/:id", authMiddleware, getBookingById);
router.post("/", authMiddleware, createBooking);
router.put("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
