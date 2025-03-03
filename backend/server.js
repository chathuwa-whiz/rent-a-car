import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import express from "express";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
