import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    return next();
};
