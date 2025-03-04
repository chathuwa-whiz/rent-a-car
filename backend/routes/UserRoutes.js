import { getAllUsers, getUserById, getUserByRole, updateUser, deleteUser } from '../controller/UserController.js';
import express from 'express';
import { authenticate, authorize} from '../middleware/AuthMiddleware.js';

const userRoutes = express.Router();

userRoutes.get('/', authenticate, authorize("admin") , getAllUsers);
userRoutes.get('/:id',authenticate, authorize("user", "admin"), getUserById);
userRoutes.get('/role/:role',authenticate, authorize("admin"), getUserByRole);
userRoutes.put('/:id',authenticate, authorize("user", "admin"), updateUser);
userRoutes.delete('/:id',authenticate, authorize("user", "admin"), deleteUser);

export default userRoutes;