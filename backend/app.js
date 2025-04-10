import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import payhereRoutes from "./routes/payhereRoutes.js";


import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import cardRoutes from "./routes/CardRoutes.js";
import maintenanceRoutes from "./routes/MaintenanceRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());

// Custom Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://apis.google.com"], // allow Google APIs if used
            styleSrc: ["'self'", "'unsafe-inline'"], // allow inline styles if needed
            imgSrc: ["'self'", "data:", "blob:"], // allow local and inline images
            connectSrc: ["'self'"], // for API calls (e.g., fetch/XHR)
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"], // disallow Flash/Java objects
            upgradeInsecureRequests: [],
        },
    })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);
// app.use('/api/card', cardRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payhere", payhereRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/send-email", emailRoutes);

export default app;
