import { NextFunction, Request, Response } from 'express';

import { AppError } from '../AppError';
import {
    createTournament,
    getTournamentById,
    getTournaments,
    identifyRandomWinners,
    splitParticipantsIntoGroups
} from '../services/tournamentService';

export const createTournamentHandler = async (req: Request, res: Response) => {
    const creatorId = req.user.id;
    const { name, participants } = req.body as {
        name: string;
        participants: number[];
    };

    let participantIds: number[] = [];

    for (const id of participants) {
        const n = Number(id);
        if (isNaN(n) || n < 1) {
            throw new AppError('each user id should be positive integer');
        }
        participantIds.push(n);
    }

    if (!participantIds.includes(creatorId)) {
        participantIds.push(creatorId);
    }

    participantIds = [...new Set(participantIds)];

    if (participantIds.length < 2) {
        throw new AppError('minimum count of participants should be 2 or more');
    }

    const data = await createTournament(name, creatorId, participantIds);

    res.json(data);
};

export const getTournamentsHandler = async (req: Request, res: Response) => {
    const data = await getTournaments();
    res.json(data);
};

export const getTournamentByIdHandler = async (req: Request, res: Response) => {
    const data = await getTournamentById(Number(req.params.id));
    res.json(data);
};

export const splitParticipantsIntoGroupsHandler = async (
    req: Request,
    res: Response
) => {
    const data = await splitParticipantsIntoGroups(
        Number(req.params.id),
        req.user.id
    );
    res.json(data);
};

export const identifyRandomWinnersHandler = async (
    req: Request,
    res: Response
) => {
    const data = await identifyRandomWinners(
        Number(req.params.id),
        req.user.id
    );
    res.json(data);
};
