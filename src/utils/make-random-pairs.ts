const shuffleArray = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const makeRandomPairs = <T>(array: T[]) => {
    if (array.length % 2 !== 0) {
        throw new Error('the number of elements should be even.');
    }

    const shuffled = shuffleArray([...array]);
    const pairs = [];

    for (let i = 0; i < shuffled.length; i += 2) {
        pairs.push([shuffled[i], shuffled[i + 1]]);
    }

    return pairs;
};
