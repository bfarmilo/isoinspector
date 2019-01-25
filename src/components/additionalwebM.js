
import { convertToHex } from './tools';
import { schema } from './ebmlSchema';


const getWebMData = tag => {

    const entryLookup = new Map([
        ['u', { description: 'unsigned integer', returnVal: (value, data, size) => ({ display: typeof value === 'number' ? value : convertToHex(data), hex: null }) }],
        ['i', { description: 'signed integer', returnVal: (value, data, size) => ({ display: value || data.readIntBE(0, size), hex: null }) }],
        ['f', { description: 'floating point number', returnVal: (value, data) => ({ display: value || data.readFloatBE(0), hex: null }) }],
        ['s', { description: 'ASCII string', returnVal: (value, data) => ({ display: value || data.toString(), hex: null }) }],
        ['8', { description: 'UTF-8 string', returnVal: (value, data) => ({ display: value || data.toString('utf8'), hex: null }) }],
        ['d', { description: 'timestamp', returnVal: (value, data) => { console.warn('timestamp', data); return { display: value || new Date(data), hex: null } } }],
        ['b', { description: 'raw binary data', returnVal: (value, data) => value || data }]
    ]);

    const processEntry = entry => {
        if (entryLookup.has(entry.type)) {
            const { returnVal } = entryLookup.get(entry.type);
            if (entry.type === 'b') {
                // additional entry processing here for binary formats.
                switch (entry.name) {
                    // For some binary boxes make nicer for display
                    case 'SeekID':
                        return { display: `${convertToHex(entry.value || entry.data)} (${schema.get(parseInt(Array.from(entry.data).map(byte => byte.toString('16').padStart(2, '0')).join(''), 16)).name})`, hex: null };
                    case 'Void':
                    case 'SegmentUID':
                        return { display: convertToHex(entry.value || entry.data), hex: null }
                    case 'CodecPrivate':
                        return { display: `Raw Binary, ${entry.dataSize} bytes`, hex: convertToHex(entry.data) }
                    // SimpleBlock and Block processing:
                    // https://www.matroska.org/technical/specs/index.html#simpleblock_structure
                    case 'SimpleBlock': case 'Block':
                        return { display: `Track ${entry.track}${entry.keyframe ? ' (Keyframe)' : ''}${entry.discardable ? ' (Discardable),' : ','} Timecode ${entry.value}, ${entry.dataSize} bytes`, hex: convertToHex(entry.payload.slice(4)) };
                    // Eg CodecPrivate for Audio tracks:
                    // https://tools.ietf.org/html/rfc7845.html#section-5
                    // CodecPrivate for VP9
                    // https://www.webmproject.org/docs/container/#vp9-codec-feature-metadata-codecprivate

                    // for binary formats not yet implemented, return a bytestream.
                    default: return { display: null, hex: convertToHex(entry.value || entry.data) };
                }
            }
            return returnVal(entry.value, entry.data, entry.dataSize);
        }
        // the code isn't in the entryLookup table
        return 'unknown type'
    }
    return processEntry(tag);
}


export {
    getWebMData
}