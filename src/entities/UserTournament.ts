import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';
import { Tournament } from './Tournament';

@Entity({ name: 'tournament_participants' })
export class TournamentParticipant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Tournament, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @Column({ nullable: true })
    place: number | null;
}
