import express from "express";
import upload from "../middleware/upload.js";
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controller/vehicleController.js";

const router = express.Router();

router.get("/", getVehicles);
router.post("/", upload.array("images", 5), addVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
