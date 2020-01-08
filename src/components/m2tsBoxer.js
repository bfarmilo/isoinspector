import { convertToHex } from './tools';
const parser = require('mpeg2ts-parser')();
const { createWorker } = require('@ffmpeg/ffmpeg');
const MAX_TIME = 10;

const pidLookup = new Map([
    [0, 'Program Association Table'],
    [1, 'Conditional Access Table'],
    [2, 'Transport Stream Description Table'],
    [3, 'IPMP Control Information Table']
]);

const tableIDLookup = {
    0x00: 'Program Association Section',
    0x01: 'Conditional Access Section',
    0x02: 'TS Program Map Section',
    0x03: 'TS Description Section',
    0x04: 'Scene Description Section',
    0x05: 'Object Descriptor Section',
    0x06: 'Metadata Section',
    0x07: 'IPMP Control Information Section'
}

const streamTypeLookup = {
    0x00: 'ITU-T | ISO/IEC Reserved',
    0x01: 'ISO/IEC 11172-2 Video',
    0x02: 'ITU-T Rec. H.262 | ISO/IEC 13818-2 Video or ISO/IEC 11172-2 constrained parameter video stream',
    0x03: 'ISO/IEC 11172-3 Audio',
    0x04: 'ISO/IEC 13818-3 Audio',
    0x05: 'ITU-T Rec. H.222.0 | ISO/IEC 13818-1 private_sections',
    0x06: 'ITU-T Rec. H.222.0 | ISO/IEC 13818-1 PES packets containing private data',
    0x07: 'ISO/IEC 13522 MHEG 0x08 ITU-T Rec. H.222.0 | ISO/IEC 13818-1 Annex A DSM-CC',
    0x09: 'ITU-T Rec. H.222.1',
    0x0A: 'ISO/IEC 13818-6 type A',
    0x0B: 'ISO/IEC 13818-6 type B',
    0x0C: 'ISO/IEC 13818-6 type C',
    0x0D: 'ISO/IEC 13818-6 type D',
    0x0E: 'ITU-T Rec. H.222.0 | ISO/IEC 13818-1 auxiliary',
    0x0F: 'ISO/IEC 13818-7 Audio', // with ADTS transport syntax',
    0x10: 'ISO/IEC 14496-2 Visual',
    0x11: 'ISO/IEC 14496-3 Audio with the LATM transport syntax as defined in ISO/IEC 14496-3',
    0x12: 'ISO/IEC 14496-1 SL-packetized stream or FlexMux stream carried in PES packets',
    0x13: 'ISO/IEC 14496-1 SL-packetized stream or FlexMux stream carried in ISO/IEC 14496_sections',
    0x14: 'ISO/IEC 13818-6 Synchronized Download Protocol',
    0x15: 'Metadata carried in PES packets',
    0x16: 'Metadata carried in metadata_sections',
    0x17: 'Metadata carried in ISO/IEC 13818-6 Data Carousel',
    0x18: 'Metadata carried in ISO/IEC 13818-6 Object Carousel',
    0x19: 'Metadata carried in ISO/IEC 13818-6 Synchronized Download Protocol',
    0x1A: 'IPMP stream (defined in ISO/IEC 13818-11, MPEG-2 IPMP)',
    0x1B: 'AVC video stream', // as defined in ITU-T Rec. H.264 | ISO/IEC 14496-10 Video',
    0x7F: 'IPMP stream'
}

const generateM3U8 = (keyFile, IV, segmentList) => `#EXTM3U
#EXT-X-TARGETDURATION:5
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-KEY:METHOD=AES-128,URI="${keyFile}",IV=0x${IV}
${segmentList.map(segmentFile => `#EXTINF:5,
${segmentFile}`)}
#EXT-X-ENDLIST`;

const parsePAT = buf => {
    // need to parse the PAT
    return {
        table_id: tableIDLookup[buf[0]] || 'reserved',
        section_syntax_indicator: (buf[1] & 0b10000000) >> 7,
        // 0 bit
        reserved1: (buf[1] & 0b00110000) >> 4,
        section_length: (buf[1] & 0b00001111) << 4 | buf[2],
        transport_stream_id: buf[3] << 8 | buf[4],
        reserved2: (buf[5] & 0b11000000) >> 6,
        version_number: (buf[5] & 0b00111110) >> 1,
        current_next_indicator: (buf[5] & 0b00000001),
        section_number: buf[6],
        last_section_number: buf[7],
        program_number: buf[8] << 8 | buf[9],
        reserved3: (buf[10] & 0b11100000) >> 5,
        program_map_PID: (buf[10] & 0b00011111) << 8 | buf[11],
        crc_32: buf[12] << 24 | buf[13] << 16 | buf[14] << 8 | buf[15]
    }
}

const parsePMT = buf => {
    // need to parse the PMT
    const pmt = {
        table_id: tableIDLookup[buf[0]] || 'reserved',
        section_syntax_indicator: (buf[1] & 0b10000000) >> 7,
        // 0 bit
        reserved1: (buf[1] & 0b00110000) >> 4,
        section_length: (buf[1] & 0b00001111) << 8 | buf[2],
        program_number: buf[3] << 8 + buf[4],
        reserved2: (buf[5] & 0b11000000) >> 6,
        version_number: (buf[5] & 0b00111110) >> 1,
        current_next_indicator: (buf[5] & 0b00000001),
        section_number: buf[6],
        last_section_number: buf[7],
        reserved3: (buf[8] & 0b11100000) >> 5,
        PCR_PID: (buf[8] & 0b00011111) << 8 | buf[9],
        reserved3: (buf[10] & 0b11110000) >> 4,
        program_info_length: (buf[10] & 0b00001111) << 8 | buf[11]
    }

    // now need to loop buf[12] to get
    const start = 12;
    const boxes = [];
    let i = 0;
    while (buf.length > start + i + 4) {
        const streamInfo = {
            stream_type: streamTypeLookup[buf[start + i]] || 'unknown',
            [`reserved${4 + i}`]: (buf[start + i + 1] & 0b11100000) >> 5,
            elementary_PID: (buf[start + i + 1] & 0b00011111) << 8 | buf[start + i + 2],
            [`reserved${4 + i + 1}`]: (buf[start + i + 3] & 0b11110000) >> 4,
            ES_info_length: (buf[start + i + 3] & 0b00001111) << 8 | buf[start + i + 4]
        };
        boxes.push(streamInfo);
        // add the stream type and id to the table
        pidLookup.set(streamInfo.elementary_PID, streamInfo.stream_type);
        i += 5;
    }
    pmt.boxes = boxes;
    pmt.crc_32 = buf[i] << 24 | buf[i + 1] << 16 | buf[i + 2] << 8 | buf[i + 3];
    return pmt;
}


const processEntry = segment => {
    // first some manual processing of the PAT, not in the decoder (yet)
    if (segment.hasOwnProperty('pid') && segment.pid === 0) {
        segment.program_association_section = parsePAT(segment.payload);
        // now add that to the list
        pidLookup.set(segment.program_association_section.program_map_PID, 'Program Map Table');
    };
    if (segment.hasOwnProperty('pid') && pidLookup.get(segment.pid) === 'Program Map Table') {
        // need to process the program map table
        segment.program_map_section = parsePMT(segment.payload);
    }
    // now convert all keys to the form {name, display}
    const keyList = Object.keys(segment).filter(key => key !== 'packet' && key !== 'payload');
    return keyList.map(key => {
        if (typeof segment[key] === 'object') return { type: key, boxes: processEntry(segment[key]), start: null, end: null };
        return { name: key, display: segment[key], start: null, end: null }
    });
}

const processData = data => {
    try {
        const boxes = data.map(segment => {
            // Display layer is expecting the form:
            // box.start {number} byte offset of box start
            // box.end {number} byte offset of box end
            // box.display {string} display value of the box
            // box.hex {string} hex representation of the box
            // box.name {string} name of the data entry
            // box.type {string} name of the container box
            // box.boxes {Array:box} sub-boxes
            return {
                start: null,
                end: null,
                type: `PID ${segment.pid}${pidLookup.has(segment.pid) ? ` (${pidLookup.get(segment.pid)})` : ''} number ${segment.continuity_counter}`,
                hex: convertToHex(segment.packet),
                packet: convertToHex(segment.packet),
                boxes: processEntry(segment)
            };
        })
        return ({ boxes })
    } catch (e) {
        throw e;
    }
}

const m2tsBoxer = (buf, segmentCount = 0) => new Promise((resolve, reject) => {
    let allData = [];
    let lastChunkTime = (new Date()).getTime();
    let currentTime = lastChunkTime;

    try {
        const catchEnd = setInterval(() => {
            if (allData.length && (lastChunkTime - currentTime) < MAX_TIME) {
                clearInterval(catchEnd);
                return resolve(allData);
            } else {
                return reject('m2ts timeout');
            }
        }, MAX_TIME / 2);

        parser.on('data', data => {
            allData.push(data);
            lastChunkTime = (new Date()).getTime();
            currentTime = lastChunkTime;
        });
        parser.on('end', () => {
            return resolve(allData)
        })
        parser.on('error', err => {
            return reject(err);
        });
        parser.write(segmentCount ? buf.slice(0,188*segmentCount) : buf, () => {
            return resolve(processData(allData));
        });
    } catch (e) {
        return reject(e);
    }
});

const decodeM2TS = (playList, keyFile, segmentFile, segmentCount = 0) => new Promise(async (resolve, reject) => {
    try {
        // should take a playList (buffer), keyFile (buffer), and a segmentFile (buffer)
        // remap to a new playList (buffer)

        // first get IV from old playlist
        const IV = playList.match(/IV=0x([0123456789ABCDEF]*)\s/);
        const newPlayList = generateM3U8('keyFile.key', IV ? IV[1] : '0000000000000001', ['segment.ts']);
        const [keyFileBuffer, segmentBuffer] = [keyFile, segmentFile].map(data => Uint8Array.from(atob(data), c=>c.charCodeAt(0)));
        // now run ffmpeg and send the resulting buffer to processData(decoded)
        const worker = createWorker({ logger: ({message}) => console.log(message) });
        await worker.load();
        // load files into virtual file system
        console.log('worker loaded');
        await worker.writeText('playlist.m3u8', newPlayList);
        await worker.write('keyFile.key', keyFileBuffer);
        await worker.write('segment.ts', segmentBuffer);
        // now run the decryption
        await worker.run('-loglevel debug -allowed_extensions ALL -i /data/playlist.m3u8 -c copy decrypt.ts', {
            input: ['playlist.m3u8', 'keyFile.key', 'segment.ts'],
            output: 'decrypt.ts',
            del: true
        });
        const { data } = await worker.read('decrypt.ts');
        return resolve(m2tsBoxer(data, segmentCount));
    } catch (err) {
        return reject(err);
    }
})

export { m2tsBoxer, decodeM2TS };