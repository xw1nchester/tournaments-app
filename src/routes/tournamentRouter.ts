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

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Создать новый турнир
 *     tags:
 *       - Tournaments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               participants:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - name
 *               - participants
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TournamentDetail'
 *       401:
 *         $ref: '#/components/responses/Error'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
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

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Получить список турниров
 *     tags:
 *       - Tournaments
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tournaments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TournamentShort'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
tournamentRouter.get('/', getTournamentsHandler);

/**
 * @swagger
 * /tournaments/{id}:
 *   get:
 *     summary: Получить турнир по ID
 *     tags:
 *       - Tournaments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TournamentDetail'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       404:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
tournamentRouter.get(
    '/:id',
    param('id').isNumeric(),
    validationMiddleware,
    getTournamentByIdHandler
);

/**
 * @swagger
 * /tournaments/{id}/split:
 *   post:
 *     summary: Разделить оставшихся участников турнира на случаные группы
 *     tags:
 *       - Tournaments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TournamentDetail'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       401:
 *         $ref: '#/components/responses/Error'
 *       403:
 *         $ref: '#/components/responses/Error'
 *       404:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
tournamentRouter.post(
    '/:id/split',
    authMiddleware,
    param('id').isNumeric(),
    validationMiddleware,
    splitParticipantsIntoGroupsHandler
);

/**
 * @swagger
 * /tournaments/{id}/choose-winner:
 *   patch:
 *     summary: Выбрать случайного победителя в текущем раунде
 *     tags:
 *       - Tournaments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TournamentDetail'
 *       401:
 *         $ref: '#/components/responses/Error'
 *       403:
 *         $ref: '#/components/responses/Error'
 *       404:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
tournamentRouter.patch(
    '/:id/choose-winner',
    authMiddleware,
    param('id').isNumeric(),
    validationMiddleware,
    identifyRandomWinnersHandler
);
