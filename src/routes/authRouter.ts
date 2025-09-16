import express from 'express';
import { body } from 'express-validator';

import { loginUserHandler, registerUserHandler } from '../controllers/authController';
import { validationMiddleware } from '../middlewares/validationMiddleware';

export const authRouter = express.Router();

authRouter.post(
    '/register',
    body('nickname').notEmpty().withMessage('nickname should not be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('minimum password length is 8 characters'),
    validationMiddleware,
    registerUserHandler
);

authRouter.post(
    '/login',
    body('nickname').notEmpty().withMessage('nickname should not be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('minimum password length is 8 characters'),
    validationMiddleware,
    loginUserHandler
);
