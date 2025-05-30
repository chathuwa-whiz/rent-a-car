import express from "express";
import { initiatePayment, generateHash } from "../controller/payhereController.js";

const router = express.Router();

// Route to get hash for JavaScript SDK
router.post("/hash", generateHash);

// Route to initiate payment
router.post("/pay", initiatePayment);

export default router;
