import { addCard,getAllCards, getCardsByUserId, getCardById, updateCard, deleteCard } from '../controller/CardController.js';
import express from 'express';

import { authenticate, authorize } from '../middleware/AuthMiddleware.js';

const cardRoutes = express.Router();


// cardRoutes.post('/',
//     authenticate,
//     authorize("user","admin"),
//      addCard);

// cardRoutes.get('/',
//     authenticate,
//     authorize("user","admin"),
//      getAllCards);

// cardRoutes.get('/user/:userId',
//     authenticate,
//     authorize("user","admin"), 
//     getCardsByUserId);

// cardRoutes.get('/:id',
//     authenticate,
//     authorize("user","admin"), 
//     getCardById);

// cardRoutes.put('/:id',
//     authenticate,
//     authorize("user","admin"), 
//     updateCard);

// cardRoutes.delete('/:id',
//     authenticate,
//     authorize("user","admin"), 
//     deleteCard);

export default cardRoutes;