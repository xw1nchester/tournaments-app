import express from 'express';
import { body } from 'express-validator';

import { createTournament } from '../controllers/tournamentController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

export const tournamentRouter = express.Router();

tournamentRouter.post(
    '/',
    authMiddleware,
    body('name').notEmpty().withMessage('name should not be empty'),
    body('users').isArray().withMessage('users should be array of integers'),
    validationMiddleware,
    createTournament
);
