import { User } from '../entities/User';
import { AppDataSource } from '../data-source';

const userRepository = AppDataSource.getRepository(User);

export const getUserByNickname = async (nickname: string) => {
    return await userRepository.findOneBy({ nickname });
};

export const createUser = async (nickname: string, passwordHash: string) => {
    return await userRepository.save({ nickname, passwordHash });
};
