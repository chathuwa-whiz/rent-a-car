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
  authenticate,
  authorize("user","admin"),
  getVehicle);

router.post("/",
    authenticate,
    authorize("admin"),
    upload.fields([
      { name: "primaryImage", maxCount: 1 },
      { name: "thumbnails", maxCount: 4 }
    ]),
    addVehicle);

router.put("/:id",
  authenticate,
  authorize("admin"),
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "thumbnails", maxCount: 4 },
  ]),
  updateVehicle);

router.delete("/:id",
  authenticate,
  authorize("admin"),
   deleteVehicle);

export default router;
