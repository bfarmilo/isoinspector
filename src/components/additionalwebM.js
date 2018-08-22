
const { convertToHex } = require('./tools.js');

const schema_ext = {
    '55b0': {
        name: 'Colour',
        level: '4',
        type: 'm',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        description: 'Settings describing the colour format'
    },
    '55b1': {
        name: 'MatrixCoefficients',
        level: '5',
        type: 'u',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        default: '2',
        description: 'FThe Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries.'
    },
    '55b2': {
        name: 'BitsPerChannel',
        level: '5',
        type: 'u',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        default: '0',
        description: 'The Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries. For clarity, the value and meanings for MatrixCoefficients are adopted from Table 4 of ISO/IEC 23001-8:2013/DCOR1. (0:GBR, 1: BT709, 2: Unspecified, 3: Reserved, 4: FCC, 5: BT470BG, 6: SMPTE 170M, 7: SMPTE 240M, 8: YCOCG, 9: BT2020 Non-constant Luminance, 10: BT2020 Constant Luminance)'
    },
    '55b9': {
        name: 'Range',
        level: '5',
        type: 'u',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        default: '0',
        description: 'Clipping of the color ranges. (0: Unspecified, 1: Broadcast Range, 2:Full Range, 3:Defined by MatrixCoefficients/TransferCharacteristics'
    },
    '55ba': {
        name: 'TransferCharacteristics',
        level: '5',
        type: 'u',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        default: '2',
        description: 'The transfer characteristics of the video. For clarity, the value and meanings for TransferCharacteristics 1-15 are adopted from Table 3 of ISO/IEC 23001-8:2013/DCOR1. TransferCharacteristics 16-18 are proposed values. (0: Reserved, 1: ITU-R BT.709, 2: Unspecified, 3: Reserved, 4: Gamma 2.2 curve, 5: Gamma 2.8 curve, 6: SMPTE 170M, 7: SMPTE 240M, 8: Linear, 9: Log, 10: Log Sqrt, 11: IEC 61966-2-4, 12: ITU-R BT.1361 Extended Colour Gamut, 13: IEC 61966-2-1, 14: ITU-R BT.2020 10 bit, 15: ITU-R BT.2020 12 bit, 16: SMPTE ST 2084, 17: SMPTE ST 428-1 18: ARIB STD-B67 (HLG))'
    },
    '55bb': {
        name: 'Primaries',
        level: '5',
        type: 'u',
        multiple: '0',
        mandatory: '0',
        minver: '4',
        webm: '0',
        default: '2',
        description: 'The colour primaries of the video. For clarity, the value and meanings for Primaries are adopted from Table 2 of ISO/IEC 23001-8:2013/DCOR1. (0: Reserved, 1: ITU-R BT.709, 2: Unspecified, 3: Reserved, 4: ITU-R BT.470M, 5: ITU-R BT.470BG, 6: SMPTE 170M, 7: SMPTE 240M, 8: FILM, 9: ITU-R BT.2020, 10: SMPTE ST 428-1, 22: JEDEC P22 phosphors)'
    }
}

const getWebMData = tag => {

    const entryLookup = new Map([
        ['u', { description: 'unsigned integer', returnVal: (data, size) => data.readUIntBE(0, size) }],
        ['i', { description: 'signed integer', returnVal: (data, size) => data.readIntBE(0, size) }],
        ['f', { description: 'floating point number', returnVal(data) { return data.readFloatBE(0) } }],
        ['s', { description: 'ASCII string', returnVal(data) { return data.toString() } }],
        ['8', { description: 'UTF-8 string', returnVal(data) { return data.toString('utf8') } }],
        ['d', { description: 'timestamp', returnVal(data) { console.warn('timestamp', data); return new Date(data) } }],
        ['b', { description: 'raw binary data', returnVal: data => data }]
    ]);

    const processEntry = entry => {
        if (entryLookup.has(entry.type)) {
            const { returnVal } = entryLookup.get(entry.type);
            if (entry.type === 'b') {
                // additional entry processing here for binary formats.
                switch (entry.name) {
                    // SimpleBlock and Block processing:
                    // https://www.matroska.org/technical/specs/index.html#simpleblock_structure
                    case 'SimpleBlock':
                        // assume the MSB = 1 and it is a 7-bit track number
                        // otherwise if 0x4000 it is a 2-byte track number (not supported)
                        const trackNumber = entry.data.readUInt8(0) & 0b01111111;
                        const timeCode = entry.data.readUInt16BE(1);
                        const flags = entry.data.readUInt8(3);
                        const flagVals = [
                            { flag: 'Keyframe', bitmask: 0b10000000 },
                            { flag: 'Invisible', bitmask: 0b00001000 },
                            { flag: 'Lacing', bitmask: 0b00000110 },
                            { flag: 'Discardable', bitmask: 0b00000001 }
                        ];
                        return `Track ${trackNumber}${flagVals.filter(item => flags & item.bitmask).map(item => ` (${item.flag})`)}, Timecode ${timeCode}, ${entry.dataSize} bytes`;
                    // Eg CodecPrivate for Audio tracks:
                    // https://tools.ietf.org/html/rfc7845.html#section-5
                    // CodecPrivate for VP9
                    // https://www.webmproject.org/docs/container/#vp9-codec-feature-metadata-codecprivate

                    // for binary formats not yet implemented, return a bytestream.
                    default: return convertToHex(entry.value || entry.data);
                }
            }
            return returnVal(entry.value || entry.data, entry.dataSize);
        }
        // the code isn't in the entryLookup table
        return 'unknown type'
    }
    return processEntry(tag);
}


module.exports = {
    getWebMData,
    schema_ext
}