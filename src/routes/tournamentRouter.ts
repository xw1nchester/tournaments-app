import express from 'express';
import { body, param } from 'express-validator';

import {
    createTournamentHandler,
    getTournamentByIdHandler,
    getTournamentsHandler,
    identifyRandomWinnersHandler,
    splitParticipantsIntoGroupsHandler
} from '../controllers/tournamentController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

export const tournamentRouter = express.Router();

tournamentRouter.post(
    '/',
    authMiddleware,
    body('name').notEmpty().withMessage('name should not be empty'),
    body('participants')
        .isArray()
        .withMessage('participant ids should be array'),
    validationMiddleware,
    createTournamentHandler
);

tournamentRouter.get('/', getTournamentsHandler);

tournamentRouter.get(
    '/:id',
    param('id').isNumeric(),
    validationMiddleware,
    getTournamentByIdHandler
);

tournamentRouter.post(
    '/:id/split',
    authMiddleware,
    param('id').isNumeric(),
    validationMiddleware,
    splitParticipantsIntoGroupsHandler
);

tournamentRouter.patch(
    '/:id/choose-winner',
    authMiddleware,
    param('id').isNumeric(),
    validationMiddleware,
    identifyRandomWinnersHandler
);
