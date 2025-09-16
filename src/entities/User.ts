import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tournament } from './Tournament';
import { TournamentParticipant } from './TournamentParticipant';
import { Match } from './Match';

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

    @OneToMany(() => TournamentParticipant, tp => tp.user, { cascade: true })
    tournamentParticipants: TournamentParticipant[];

    @OneToMany(() => Match, match => match.firstUser, { cascade: true })
    matchesAsFirstUser: Match[];

    @OneToMany(() => Match, match => match.secondUser, { cascade: true })
    matchesAsSecondUser: Match[];

    @OneToMany(() => Match, match => match.winner, { cascade: true })
    matchesAsWinner: Match[];
}
