import { getAllUsers, getUserById, getUserRole, updateUser, deleteUser } from '../controller/UserController.js';
import express from 'express';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.get('/role/:role', getUserRole);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;