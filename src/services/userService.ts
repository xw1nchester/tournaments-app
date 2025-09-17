import { In } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);

export const getUserByNickname = async (nickname: string) => {
    return await userRepo.findOne({
        where: { nickname },
        select: { id: true, nickname: true, passwordHash: true }
    });
};

export const createUser = async (nickname: string, passwordHash: string) => {
    return await userRepo.save({ nickname, passwordHash });
};

export const checkUserIdsExists = async (userIds: number[]) => {
    const count = await userRepo.count({ where: { id: In(userIds) } });
    return count == userIds.length;
};
