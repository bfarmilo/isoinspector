import { parseBuffer, addBoxProcessor } from 'codem-isoboxer';
import { ebmlBoxer } from '../components/ebmlBoxer';
import { EbmlDecoder } from '../components/ebmlSchema';
import { additionalBoxes, convertBox, postProcess, getBoxList } from '../components/additionalBoxes';
import { m2tsBoxer, decodeM2TS } from '../components/m2tsBoxer';

import * as fse from 'fs-extra';

const parseISO = buf => new Promise(async (resolve, reject) => {
    const VALID_START_BOX = new Set([
        'ftyp',
        'moof',
        'styp',
        'sidx'
    ]);
    // get the boxes
    const parsedData = await parseBuffer(buf);
    // process the boxes
    const result = convertBox(parsedData.boxes);
    if (VALID_START_BOX.has(parsedData.boxes[0].type)) return resolve({ boxes: result });
    return reject(new Error('not an ISOBMFF file'));
});

const parseWebM = buf => ebmlBoxer(buf.buffer);

const parseM2TS = buf => m2tsBoxer(buf.buffer);

// TEST FIXTURES

const componentWillMount = () => additionalBoxes.map(box => {
    if (Object.hasOwnProperty.call(box, '_parser')) addBoxProcessor(box.field, box._parser)
});


describe.skip('webM handling', () => {

    const buf = {};

    beforeAll(async () => {
        buf.buffer = await fse.readFile('./src/tests/Aug 16 Stream 1st segment.webm');
    });

    test('processes a webM file', async () => {
        try {
            const result = (await parseWebM(buf));
            expect(result).not.toBeFalsy;
            fse.writeJSON('./src/tests/webMTest.json', result);
        } catch (e) {
            console.error(e);
        }
    }, 10000);

    test('jumps to a tag and reads the hex values');
});

describe.skip('ISOBMFF init handling', () => {
    let buf;
    let result;

    beforeAll(async () => {
        // add the additional boxes
        componentWillMount();
        buf = new Uint8Array(await fse.readFile('./src/tests/598_StrangerThings.mp4')).buffer;
        return;
    });

    test('processes an mp4 file', async () => {
        result = (await parseISO(buf));
        expect(result).not.toBeFalsy;
        fse.writeJSON('./src/tests/ISOTestInit.json', result);
    });


    test('generates consistent structure', async () => {
        result = result || await fse.readJSON('./src/tests/ISOTestInit.json');
        const processed = postProcess(result.boxes);
        expect(processed).not.toBeFalsy;
        result = processed;
        fse.writeJSON('./src/tests/ISOPostTestInit.json', processed);
    })

    test('generates a tag tree', async () => {
        result = result || await fse.readJSON('./src/tests/ISOPostTestInit.json');
        const tagTree = await getBoxList(result, new Map());
        result = tagTree;
        fse.writeJSON('./src/tests/ISOInitBoxList.json', Array.from(tagTree));
    })
})

describe.skip('ISOBMFF moof handling', () => {
    let buf;
    let result;

    beforeAll(async () => {
        componentWillMount();
        buf = new Uint8Array(await fse.readFile('./src/tests/607_exampleWithMdat.mp4')).buffer;
        return;
    });

    test('processes an mp4 moof segment', async () => {
        result = (await parseISO(buf));
        expect(result).not.toBeFalsy;
        fse.writeJSON('./src/tests/ISOTest.json', result);
    });

    test('generates consistent structure', async () => {
        result = result || await fse.readJSON('./src/tests/ISOTest.json');
        const processed = postProcess(result.boxes);
        expect(processed).not.toBeFalsy;
        fse.writeJSON('./src/tests/ISOPostTest.json', processed);
    });
});

describe('M2TS handling', () => {

    const segment = {};
    const key = {};
    const buf = {};
    let playlist = '';

    beforeAll(async () => {
        playlist = await fse.readFile('./src/tests/playlist.m3u8', 'utf-8');
        key.buffer = await fse.readFile('./src/tests/hls_300_keyfile_0.key');
        // encrypted segment
        segment.buffer = await fse.readFile('./src/tests/hls_300-00000.ts');
        // plaintext segment
        buf.buffer = await fse.readFile('./src/tests/segment1_450000_av.ts');
    });

    test.skip('processes a plaintext MPEG2-TS file', async () => {
        try {
            const result = (await parseM2TS(buf));
            expect(result).not.toBeFalsy;
            fse.writeJSON('./src/tests/m2tsTest.json', result);
        } catch (e) {
            console.error(e);
        }
    }, 10000);

    test('produces a plaintext MPEG-TS file given a keyfile and playlist', async () => {
        try {
            const result = (await decodeM2TS(playlist, key.buffer, segment.buffer));
        } catch (e) {
            console.error(e)
        }
    }, 20000);
});
