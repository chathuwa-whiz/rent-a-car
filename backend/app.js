import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/AuthMiddleware.js';

import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/payment',authMiddleware, paymentRoutes);


export default app;