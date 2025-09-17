import { DataSource } from 'typeorm';

import { Tournament } from './entities/Tournament';
import { TournamentParticipant } from './entities/TournamentParticipant';
import { User } from './entities/User';
import { Match } from './entities/Match';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Tournament, TournamentParticipant, Match]
});
