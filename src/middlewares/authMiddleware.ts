import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { extractPayloadFromToken } from '../services/authService';
import { AppError } from '../AppError';

// TODO: перенести куда-нибудь
declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
            };
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const {id} = extractPayloadFromToken(accessToken);
        req.user = { id };
        next();
    } catch (error) {
        console.log(error);
        next(new AppError('unathorized', 401));
    }
};
