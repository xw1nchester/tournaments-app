import express from 'express';

import { authRouter } from './authRouter';
import { tournamentRouter } from './tournamentRouter';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/tournaments', tournamentRouter);