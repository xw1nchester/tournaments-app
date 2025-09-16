import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUser, getUserByNickname } from './userService';
import { AppError } from '../AppError';

interface TokenPayload {
    id: number;
}

const generateToken = (payload: TokenPayload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        // искуственно делаем токен неистекаемым
        expiresIn: '100000d'
    });
};

export const extractPayloadFromToken = (token: string): TokenPayload => {
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    ) as TokenPayload;
};

export const registerUser = async (nickname: string, password: string) => {
    const existingUser = await getUserByNickname(nickname);

    if (existingUser) {
        throw new AppError('ser with this nickname already exists');
    }

    const passwordHash = await bcrypt.hash(password, 3);

    const createdUser = await createUser(nickname, passwordHash);

    return {
        user: {
            id: createdUser.id,
            nickname: createdUser.nickname,
            token: generateToken({ id: createdUser.id })
        }
    };
};

export const loginUser = async (nickname: string, password: string) => {
    const existingUser = await getUserByNickname(nickname);

    if (!existingUser) {
        throw new AppError('invalid credentials');
    }

    const passwordsMatch = await bcrypt.compare(
        password,
        existingUser.passwordHash
    );

    if (!passwordsMatch) {
        throw new AppError('invalid credentials');
    }

    return {
        user: {
            id: existingUser.id,
            nickname: existingUser.nickname,
            token: generateToken({ id: existingUser.id })
        }
    };
};
