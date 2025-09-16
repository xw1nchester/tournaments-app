import { Request, Response } from 'express';

export const createTournament = async (req: Request, res: Response) => {
    const { name, users } = req.body;
    const creatorId = req.user.id;
    res.json({ name, users, creatorId });
};
