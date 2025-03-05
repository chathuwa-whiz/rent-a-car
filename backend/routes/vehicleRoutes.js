import express from "express";
import upload from "../middleware/upload.js";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicle
} from "../controller/vehicleController.js";

import { authenticate, authorize } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/",
   getVehicles);

router.get("/:id",
  getVehicle);

router.post("/",
  authenticate,
  authorize("admin"),
   upload.array("images", 5), 
   addVehicle);

router.put("/:id",
  authenticate,
  authorize("admin"),
   updateVehicle);

router.delete("/:id",
  authenticate,
  authorize("admin"),
   deleteVehicle);

export default router;
