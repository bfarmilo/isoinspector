const numToHex = bit => bit.toString('16').padStart(2, '0').toUpperCase();

const convertToHex = (entry, showChars=false) => {
    const ROW_SIZE = 16;
    const MAX_SIZE = 64 * ROW_SIZE;

    // create an array of bytes, capped at MAX_SIZE for display purposes
    const buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry)).slice(0, MAX_SIZE);

    const getRow = start => (start + ROW_SIZE < buffer.length) ?
        [buffer.slice(start, start + ROW_SIZE).map(numToHex).join(' ')].concat(getRow(start + ROW_SIZE)) :
        [buffer.slice(start).map(numToHex).join(' ')];

    if (!showChars) return getRow(0);

    return getRow(0).map(row => {
        // for each row of hex data, append on the character codes corresponding to each element
        const thisRow = row.split(' ');
        const charList = thisRow.map(val => {
            const char = parseInt(val, 16);
            return char > 31 ? String.fromCharCode(parseInt(val, 16)) : '.';
        }).join('');
        const fillArray = thisRow.length < ROW_SIZE ? (new Array(ROW_SIZE-thisRow.length)).fill('\u00a0\u00a0\u00a0').join('') : '';
        return row.concat(fillArray).concat('\t').concat(charList);
    });
}

const formatUuid = entry => {
    const buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry));

    const groupBytes = (offset, size) => buffer.slice(offset, offset+size).map(numToHex).join('');

    return `${groupBytes(0,4)}-${groupBytes(4,2)}-${groupBytes(6,2)}-${groupBytes(8,2)}-${groupBytes(10,6)}`;
}


module.exports = {
    convertToHex,
    formatUuid
};