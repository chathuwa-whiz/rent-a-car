import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import payhereRoutes from "./routes/payhereRoutes.js";


import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';
import cardRoutes from './routes/CardRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
// app.use('/api/card', cardRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payhere", payhereRoutes)

export default app;