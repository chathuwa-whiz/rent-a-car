import { getAllUsers, getUserById, getUserByRole, updateUser, deleteUser } from '../controller/UserController.js';
import express from 'express';
import adminMiddleware from '../middleware/AdminMiddleware.js';

const userRoutes = express.Router();

userRoutes.get('/', adminMiddleware, getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.get('/role/:role',adminMiddleware, getUserByRole);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;