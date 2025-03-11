import {

    addMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
} from "../controller/MaintenanceController.js";
import express from "express";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";

const maintenanceRoutes = express.Router();

maintenanceRoutes.post("/",
    authenticate,
    authorize("admin"),
    addMaintenance);

maintenanceRoutes.get("/",
    authenticate,
    authorize("admin"),
    getAllMaintenance);

maintenanceRoutes.get("/:id",
    authenticate,
    authorize("admin"),
    getMaintenanceById);

maintenanceRoutes.put("/:id",
    authenticate,
    authorize("admin"),
    updateMaintenance);

maintenanceRoutes.delete("/:id",
    authenticate,
    authorize("admin"),
    deleteMaintenance);

export default maintenanceRoutes;