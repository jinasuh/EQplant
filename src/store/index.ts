export * from 'src/store/config';
export * from 'src/store/questions';
export * from 'src/store/conversations';

export const copyAndShuffle = <T>(array: T[]) => {
    const copy = array.slice();
    let j, x, i;
    for (i = copy.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = copy[i];
        copy[i] = copy[j];
        copy[j] = x;
    }

    return copy;
};
