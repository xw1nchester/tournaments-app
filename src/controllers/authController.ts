import { Request, Response, NextFunction } from 'express';

import { loginUser, registerUser } from '../services/authService';

export const registerUserHandler = async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    const data = await registerUser(nickname, password);

    res.json(data);
};

export const loginUserHandler = async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    const data = await loginUser(nickname, password);

    res.json(data);
};
