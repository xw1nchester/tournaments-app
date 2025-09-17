import { Request, Response, NextFunction } from 'express';

import { extractPayloadFromToken } from '../services/authService';
import { AppError } from '../AppError';

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
        next(new AppError('unathorized', 401));
    }
};
