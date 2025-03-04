import { addCard,getAllCards, getCardsByUserId, getCardById, updateCard, deleteCard } from '../controller/CardController.js';
import express from 'express';

const cardRoutes = express.Router();


cardRoutes.post('/', addCard);
cardRoutes.get('/', getAllCards);
cardRoutes.get('/user/:userId', getCardsByUserId);
cardRoutes.get('/:id', getCardById);
cardRoutes.put('/:id', updateCard);
cardRoutes.delete('/:id', deleteCard);

export default cardRoutes;