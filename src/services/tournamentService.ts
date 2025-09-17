import { AppError } from '../AppError';
import { AppDataSource } from '../data-source';
import { Match } from '../entities/Match';
import { Tournament } from '../entities/Tournament';
import { TournamentParticipant } from '../entities/TournamentParticipant';
import { powerOfTwo } from '../utils/power-of-two';
import { makeRandomPairs } from '../utils/make-random-pairs';
import { checkUserIdsExists } from './userService';

const tournamentRepo = AppDataSource.getRepository(Tournament);
const matchRepo = AppDataSource.getRepository(Match);

export const createTournament = async (
    name: string,
    creatorId: number,
    participantIds: number[]
) => {
    if (participantIds.length < 2 || !powerOfTwo(participantIds.length)) {
        throw new AppError(
            'count of participants should be 2 or 4 or 8 or 16 etc'
        );
    }

    const allUsersExists = await checkUserIdsExists(participantIds);
    if (!allUsersExists) {
        throw new AppError('some users was not found', 404);
    }

    const tournament = await tournamentRepo.save({
        name,
        creator: {
            id: creatorId
        },
        participants: participantIds.map(id => ({
            user: { id }
        }))
    });

    return await getTournamentById(tournament.id);
};

export const getTournaments = async () => {
    const tournaments = await tournamentRepo
        .createQueryBuilder('tournaments')
        .loadRelationCountAndMap(
            'tournaments.participantsCount',
            'tournaments.participants'
        )
        .getMany();

    return { tournaments };
};

export const getTournamentById = async (tournamentId: number) => {
    const tournament = await tournamentRepo.findOne({
        where: { id: tournamentId },
        relations: {
            creator: true,
            participants: { user: true },
            matches: { firstUser: true, secondUser: true, winner: true }
        },
        order: {
            participants: {
                place: 'ASC'
            },
            matches: {
                step: 'ASC'
            }
        }
    });

    if (!tournament) {
        throw new AppError('tournament not found', 404);
    }

    return { tournament };
};

export const splitParticipantsIntoGroups = async (
    tournamentId: number,
    initiatorId: number
) => {
    const { tournament } = await getTournamentById(tournamentId);

    if (tournament.creator.id != initiatorId) {
        throw new AppError('forbidden', 403);
    }

    if (tournament.matches.some(m => m.winner == null)) {
        throw new AppError('participants already splitted');
    }

    const possibleParticipants = tournament.participants.filter(p => !p.place);

    if (
        possibleParticipants.length < 2 ||
        !powerOfTwo(possibleParticipants.length)
    ) {
        throw new AppError('invalid participants count');
    }

    const pairs = makeRandomPairs(possibleParticipants);

    let step = 0;

    if (tournament.matches.length > 0) {
        step = tournament.matches[tournament.matches.length - 1].step + 1;
    }

    await matchRepo.insert(
        pairs.map(p => ({
            tournament: { id: tournament.id },
            step,
            firstUser: { id: p[0].user.id },
            secondUser: { id: p[1].user.id }
        }))
    );

    return getTournamentById(tournamentId);
};

export const identifyRandomWinners = async (
    tournamentId: number,
    initiatorId: number
) => {
    const { tournament } = await getTournamentById(tournamentId);

    if (tournament.creator.id != initiatorId) {
        throw new AppError('forbidden', 403);
    }

    const matchesCount = tournament.matches.length;

    if (matchesCount == 0) {
        throw new AppError('tournament does not have any matches');
    }

    const step = tournament.matches[matchesCount - 1].step;
    const currentMatches = tournament.matches.filter(m => m.step == step);

    if (currentMatches.some(m => m.winner)) {
        throw new AppError('on the current match winners already identified');
    }

    let startPlace = tournament.participants.length;

    if (step > 0) {
        for (const { place } of tournament.participants) {
            if (place && place < startPlace) {
                startPlace = place;
            }
        }
        startPlace--;
    }

    await AppDataSource.transaction(async tr => {
        for (const { id: matchId, firstUser, secondUser } of currentMatches) {
            const winnerId = Math.random() > 0.5 ? firstUser.id : secondUser.id;

            await tr.getRepository(Match).save({
                id: matchId,
                winner: { id: winnerId }
            });

            await tr.getRepository(TournamentParticipant).update(
                {
                    userId:
                        winnerId == firstUser.id ? secondUser.id : firstUser.id,
                    tournamentId: tournamentId
                },
                { place: startPlace }
            );

            startPlace--;

            if (startPlace == 1) {
                await tr.getRepository(TournamentParticipant).update(
                    {
                        userId: winnerId,
                        tournamentId: tournamentId
                    },
                    { place: 1 }
                );
            }
        }
    });

    return getTournamentById(tournamentId);
};
