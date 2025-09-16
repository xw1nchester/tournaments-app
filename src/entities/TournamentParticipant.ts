import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique
} from 'typeorm';

import { User } from './User';
import { Tournament } from './Tournament';

// TODO: по хорошему сделать user и tournament первичными ключами
@Entity({ name: 'tournament_participants' })
export class TournamentParticipant {
    @PrimaryColumn({ name: 'user_id' })
    userId: number;

    @PrimaryColumn({ name: 'tournament_id' })
    tournamentId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Tournament, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @Column({ nullable: true })
    place: number | null;
}
