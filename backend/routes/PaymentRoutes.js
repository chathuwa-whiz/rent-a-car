import { createPayment, getPayments, getPaymentByUserId, getPaymentsByPaymentDate, getPaymentsByPaymentMethod, getPaymentsByStatus, updatePayment, deletePayment } from '../controller/PaymentController.js';
import express from 'express';

import adminMiddleware from '../middleware/AdminMiddleware.js';

const paymentRoutes = express.Router();

paymentRoutes.post('/', createPayment);
paymentRoutes.get('/user/:userId', getPaymentByUserId);
paymentRoutes.get('/status/:status', getPaymentsByStatus);
paymentRoutes.get('/paymentMethod/:paymentMethod', getPaymentsByPaymentMethod);
paymentRoutes.get('/paymentDate/:paymentDate', getPaymentsByPaymentDate);
paymentRoutes.get('/',adminMiddleware, getPayments);
paymentRoutes.put('/:id',adminMiddleware, updatePayment);
paymentRoutes.delete('/:id',adminMiddleware, deletePayment);

export default paymentRoutes;