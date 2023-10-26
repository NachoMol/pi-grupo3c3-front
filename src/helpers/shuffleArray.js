/**
 * The `shuffleArray` function takes an array as input and returns a new array with the elements
 * shuffled randomly.
 * @param arr - The parameter `arr` is an array that you want to shuffle.
 * @returns The function `shuffleArray` returns a new array that is a shuffled version of the input
 * array `arr`. The returned array contains the first 10 elements of the shuffled array.
 */
export const shuffleArray = (arr) => {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, 10);
}