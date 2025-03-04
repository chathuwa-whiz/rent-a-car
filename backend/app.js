import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleRoutes from "./routes/vehicleRoutes.js";

//Auth
import authRoutes from './routes/AuthRoutes.js';

//USER
import userRoutes from './routes/UserRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;