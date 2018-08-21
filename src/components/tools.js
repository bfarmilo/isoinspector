const convertToHex = entry => {
    const buffer = entry instanceof Uint8Array ? entry : new Uint8Array(entry);
    return Array.from(buffer).map(b => b.toString('16').padStart(2, '0')).join(' ')
}

module.exports = {
    convertToHex
};