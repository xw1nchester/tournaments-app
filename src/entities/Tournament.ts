import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';
import { TournamentParticipant } from './TournamentParticipant';
import { Match } from './Match';

@Entity({ name: 'tournaments' })
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.tournaments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'creator_id'
    })
    creator: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => TournamentParticipant, tp => tp.tournament, {
        cascade: true
    })
    participants: TournamentParticipant[];

    @OneToMany(() => Match, m => m.tournament, {
        cascade: true
    })
    matches: Match[];
}
