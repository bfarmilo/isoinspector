import { parseBuffer, addBoxProcessor } from 'codem-isoboxer';
import { ebmlBoxer } from '../components/ebmlBoxer';
import { EbmlDecoder } from '../components/ebmlSchema';
import { additionalBoxes, convertBox, postProcess } from '../components/additionalBoxes';


import * as fs from 'fs';



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


// TEST FIXTURES

const componentWillMount = () => additionalBoxes.map(box => {
    if (Object.hasOwnProperty.call(box, '_parser')) addBoxProcessor(box.field, box._parser)
});

const readFilePromise = fileName => new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
    })
})

describe('webM handling', () => {

    const buf = {};

    beforeAll(async () => {
        buf.buffer = await readFilePromise('./src/tests/Aug 16 Stream 1st segment.webm');
    });

    test('processes a webM file', async () => {
        try {
            const result = (await parseWebM(buf));
            expect(result).not.toBeFalsy;
            fs.writeFile('./src/tests/webMTest.json', JSON.stringify(result));
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
        buf = new Uint8Array(await readFilePromise('./src/tests/598_StrangerThings.mp4')).buffer;
        return;
    });

    test('processes an mp4 file', async () => {
        result = (await parseISO(buf));
        expect(result).not.toBeFalsy;
        fs.writeFile('./src/tests/ISOTestInit.json', JSON.stringify(result));
    });

    test('generates consistent structure', async () => {
        result = result || JSON.parse(await readFilePromise('./src/tests/ISOTestInit.json'));
        const processed = postProcess(result.boxes);
        expect(processed).not.toBeFalsy;
        fs.writeFile('./src/tests/ISOPostTestInit.json', JSON.stringify(processed));
    })
})

describe.skip('ISOBMFF moof handling', () => {
    let buf;
    let result;

    beforeAll(async () => {
        componentWillMount();
        buf = new Uint8Array(await readFilePromise('./src/tests/607_exampleWithMdat.mp4')).buffer;
        return;
    });

    test('processes an mp4 moof segment', async () => {
        result = (await parseISO(buf));
        expect(result).not.toBeFalsy;
        fs.writeFile('./src/tests/ISOTest.json', JSON.stringify(result));
    });

    test('generates consistent structure', async () => {
        result = result || JSON.parse(await readFilePromise('./src/tests/ISOTest.json'));
        const processed = postProcess(result.boxes);
        expect(processed).not.toBeFalsy;
        fs.writeFile('./src/tests/ISOPostTest.json', JSON.stringify(processed));
    })
})
