import Maintenance from "../model/Maintenance.js";

// ADD MAINTENENCE
export const addMaintenance = async (req, res) => {

    const { vehicle, serviceType, details, status, priority, cost } = req.body;

    try {

        const maintenance = new Maintenance({
            vehicle,
            serviceType,
            details,
            status,
            priority,
            cost
        });

        await maintenance.save();
        res.status(201).json(maintenance);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


// GET MAINTENANCE
export const getAllMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.find();
        res.status(200).json(maintenance);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// GET MAINTENANCE BY ID
export const getMaintenanceById = async (req, res) => {

    try {

        const { id } = req.params;
        const maintenance = await Maintenance.findById(id);

        res.status(200).json(maintenance);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// UPDATE MAINTENANCE
export const updateMaintenance = async (req, res) => {

    try {

        const { id } = req.params;

        const { vehicle, serviceType, details, status, priority, cost } = req.body;

        const maintenance = await Maintenance.findById(id);

        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }

        maintenance.vehicle = vehicle;
        maintenance.serviceType = serviceType;
        maintenance.details = details;
        maintenance.status = status;
        maintenance.priority = priority;
        maintenance.cost = cost;

        await maintenance.save();

        res.status(200).json(maintenance);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// DELETE MAINTENANCE
export const deleteMaintenance = async (req, res) => {

    try {

        const { id } = req.params;

        const maintenance = await Maintenance.findById(id);

        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }

        await maintenance.deleteOne();

        res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

    