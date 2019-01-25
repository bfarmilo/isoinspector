import { EbmlDecoder } from './ebmlSchema';
import { getWebMData } from './additionalwebM';

const MAX_TIME = 10;

// helper to recursively convert all maps into arrays of objects
const convertBox = boxes => {
    // boxes is a map -> webM mode
    if (boxes.toString().includes('Map')) return Array.from(boxes).reduce((result, [key, entry]) => {
        if (Object.hasOwnProperty.call(entry, 'boxes')) entry.boxes = convertBox(entry.boxes);
        return result.concat(entry);
    }, []);
}

//

const processData = data => {
    try {
        // keep master result of parsed boxes
        let resultVal = new Map();

        // keep a list of parents up the tree
        let parentList = [];

        // handy helper to recursively work the way down the resultSet tree. Use 'start' as a hash since it's unique
        const setBox = newVal => {
            // each 'boxes' is a Map. temp has the lowest level 'boxes'
            const temp = parentList.reduce((boxList, entry) => boxList.get(entry).boxes, resultVal)
            temp.set(newVal.start, newVal);
        };

        // iterate through the boxes to create a box object like ISO box
        data.map(box => {
            if (box.dataType === 'start') {
                // start tag. Create an entry for this which includes a 'boxes' property
                const newEntry = {
                    type: box.payload.name,
                    start: box.payload.start,
                    size: box.payload.dataSize,
                    boxes: new Map()
                };
                // root level entries mean there are no parents
                if (parentList.length === 0) {
                    // no parents, so add to the result map using the start as a hash
                    resultVal.set(newEntry.start, { ...newEntry });
                } else {
                    // if there is at least one parent, use the helper to enter it at the right level.
                    setBox(newEntry);
                };
                // add to the parentlist array to keep track of where we are in the hierarchy
                parentList.push(box.payload.start);
            }
            if (box.dataType === 'tag') {
                const { display, hex } = getWebMData(box.payload)
                const { name, start, dataSize } = { ...box.payload }
                setBox({ name, start, size: dataSize, display, hex });
            };
            if (box.dataType === 'end') parentList.pop();
        });
        // now use convertBox to recursively process all 'boxes' 
        return { boxes: convertBox(resultVal) };
    } catch (e) {
        return e;
    }
};


const ebmlBoxer = buf => new Promise((resolve, reject) => {
    const decoder = new EbmlDecoder();
    let allData = [];
    let lastChunkTime = (new Date()).getTime();
    let currentTime = lastChunkTime;

    try {
        const catchEnd = setInterval(() => {
            if (allData.length && (lastChunkTime - currentTime) < MAX_TIME) {
                clearInterval(catchEnd);
                return resolve(processData(allData));
            } else {
                return reject('ebml timeout');
            }
        }, MAX_TIME / 2);

        decoder.write(buf, ([dataType, payload]) => {
            allData.push({ dataType, payload });
            lastChunkTime = (new Date()).getTime();
            currentTime = lastChunkTime;
        });
    } catch (e) { return reject(e) }
})

export { ebmlBoxer }