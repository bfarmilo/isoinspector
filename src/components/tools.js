const convertToHex = entry => {
    const ROW_SIZE = 16;
    const MAX_SIZE = 128 * ROW_SIZE;

    // create an array of bytes, capped at MAX_SIZE for display purposes
    const buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry)).slice(0, MAX_SIZE);

    const numToHex = bit => bit.toString('16').padStart(2, '0').toUpperCase();

    const getRow = start => (start + ROW_SIZE < buffer.length) ?
        [buffer.slice(start, start + ROW_SIZE).map(numToHex).join(' ')].concat(getRow(start + ROW_SIZE)) :
        [buffer.slice(start).map(numToHex).join(' ')];

    return getRow(0);
}

module.exports = {
    convertToHex
};