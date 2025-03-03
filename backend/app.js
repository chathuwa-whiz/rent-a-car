import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Auth
import authRoutes from './routes/AuthRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/api/auth', authRoutes);

export default app;