import { createPayment, getPayments, getPaymentByUserId, getPaymentsByPaymentDate, getPaymentsByPaymentMethod, getPaymentsByStatus, updatePayment, deletePayment } from '../controller/PaymentController.js';
import express from 'express';

import { authenticate, authorize } from '../middleware/AuthMiddleware.js';


const paymentRoutes = express.Router();

paymentRoutes.post('/',
    authenticate,
    authorize("user", "admin"),
    createPayment);

paymentRoutes.get('/user/:userId',
    authenticate,
    authorize("user","admin"),
     getPaymentByUserId);

paymentRoutes.get('/status/:status',
    authenticate,
    authorize("user","admin"), 
    getPaymentsByStatus);

paymentRoutes.get('/paymentMethod/:paymentMethod',
    authenticate,
    authorize("user","admin"), 
    getPaymentsByPaymentMethod);

paymentRoutes.get('/paymentDate/:paymentDate',
    authenticate,
    authorize("user","admin"),
     getPaymentsByPaymentDate);

paymentRoutes.get('/',
    authenticate,
    authorize("admin"),
    getPayments);

paymentRoutes.put('/:id',
    authenticate,
    authorize("admin"), 
    updatePayment);

paymentRoutes.delete('/:id',
    authenticate,
    authorize("admin"), 
    deletePayment);

export default paymentRoutes;