import Booking from "../model/Booking.js";
import Vehicle from "../model/Vehicle.js";

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "firstName lastName email").populate("vehicle");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user", "firstName lastName email").populate("vehicle");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking (Only for logged-in users)
export const createBooking = async (req, res) => {
  try {
    const { vehicleId, dates, total } = req.body;
    const userId = req.user.id; // Get user ID from authentication middleware

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const newBooking = new Booking({
      user: userId, // Associate booking with the logged-in user
      vehicle: vehicleId,
      dates,
      total,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user-specific bookings (Booking history)
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authentication middleware
    const userBookings = await Booking.find({ user: userId }).populate("vehicle");

    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
export const updateBooking = async (req, res) => {
  try {
    const { status, returnStatus } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, returnStatus },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a booking (Admin only)
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
