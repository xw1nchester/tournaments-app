import express from 'express';
import { body } from 'express-validator';

import { loginUserHandler, registerUserHandler } from '../controllers/authController';
import { validationMiddleware } from '../middlewares/validationMiddleware';

export const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Регистрация пользователя
 *     requestBody:
 *       $ref: '#/components/requestBodies/Auth'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Auth'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
authRouter.post(
    '/register',
    body('nickname').notEmpty().withMessage('nickname should not be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('minimum password length is 8 characters'),
    validationMiddleware,
    registerUserHandler
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Вход пользователя
 *     requestBody:
 *       $ref: '#/components/requestBodies/Auth'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Auth'
 *       400:
 *         $ref: '#/components/responses/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
authRouter.post(
    '/login',
    body('nickname').notEmpty().withMessage('nickname should not be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('minimum password length is 8 characters'),
    validationMiddleware,
    loginUserHandler
);
