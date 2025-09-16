import { Request, Response, NextFunction } from 'express';

import { loginUser, registerUser } from '../services/authService';

export const registerUserHandler = async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    const user = await registerUser(nickname, password);

    res.json({ user });
};

export const loginUserHandler = async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    const user = await loginUser(nickname, password);

    res.json({ user });
};
