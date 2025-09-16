import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';
import { Tournament } from './Tournament';

@Entity({ name: 'matches' })
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    step: number;

    @ManyToOne(() => Tournament, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'first_user_id' })
    firstUser: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'second_user_id' })
    secondUser: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'winner_id' })
    winner: User;
}
