import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import { In } from 'typeorm';

const userRepo = AppDataSource.getRepository(User);

export const getUserByNickname = async (nickname: string) => {
    return await userRepo.findOneBy({ nickname });
};

export const createUser = async (nickname: string, passwordHash: string) => {
    return await userRepo.save({ nickname, passwordHash });
};

export const checkUserIdsExists = async (userIds: number[]) => {
    const count = await userRepo.count({ where: { id: In(userIds) } });
    return count == userIds.length;
};
