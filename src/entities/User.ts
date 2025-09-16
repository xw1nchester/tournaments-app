import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tournament } from './Tournament';
import { TournamentParticipant } from './UserTournament';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @OneToMany(() => Tournament, tournament => tournament.creator, {
        cascade: true
    })
    tournaments: Tournament[];

    @OneToMany(() => TournamentParticipant, tp => tp.user)
    tournamentParticipants: TournamentParticipant[];
}
