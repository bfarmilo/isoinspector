// Offsets

export const BIF_INDEX_OFFSET = 64;
export const FRAMEWISE_SEPARATION_OFFSET = 16;
export const NUMBER_OF_BIF_IMAGES_OFFSET = 12;
export const VERSION_OFFSET = 8;

// Metadata

export const BIF_INDEX_ENTRY_LENGTH = 8;

// Magic Number
// SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-MagicNumber
export const MAGIC_NUMBER = new Uint8Array([
    '0x89',
    '0x42',
    '0x49',
    '0x46',
    '0x0d',
    '0x0a',
    '0x1a',
    '0x0a',
]);

export const PNG_MAGIC = new Uint8Array([
    '0x89',
    '0x50',
    '0x4e',
    '0x47',
    '0x0d',
    '0x0a',
    '0x1a',
    '0x0a'
]);

export const JPEG_MAGIC = new Uint8Array([
    '0xff',
    '0xd8',
    '0xff',
    '0xe0',
    '0x00',
    '0x00',
    '0x4a',
    '0x46',
    '0x49',
    '0x46'
]);

/**
 * Validate the file identifier against the magic number.
 *
 * @returns {boolean} isValid
 */
function validate(binaryData, reference) {
    let isValid = true;

    const magicNumber = (new Uint8Array(binaryData)).slice(0, reference.length);
    reference.forEach((byte, i) => {
        if (byte != 0 && byte !== magicNumber[i]) {
            isValid = false;

            return;
        }
    });

    return isValid;
}

/**
 * Parsing and read BIF file format.
 *
 * @param {ArrayBuffer} arrayBuffer
 */
export class BIFParser {
    constructor(arrayBuffer) {
        // Magic Number
        // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-MagicNumber

        if (!validate(arrayBuffer, MAGIC_NUMBER)) {
            throw new Error('Invalid BIF file.');
        }

        this.arrayBuffer = arrayBuffer;

        this.data = new DataView(arrayBuffer); // eslint-disable-line new-cap

        // Framewise Separation
        // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-FramewiseSeparation
        this.framewiseSeparation = this.data.getUint32(FRAMEWISE_SEPARATION_OFFSET, true) || 1000;

        // Number of BIF images
        // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-NumberofBIFimages
        this.numberOfBIFImages = this.data.getUint32(NUMBER_OF_BIF_IMAGES_OFFSET, true);

        // Version
        // SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-Version
        this.version = this.data.getUint32(VERSION_OFFSET, true);

        this.bifIndex = this.generateBIFIndex(true);
    }

    /**
   * Create the BIF index
   * SEE: https://sdkdocs.roku.com/display/sdkdoc/Trick+Mode+Support#TrickModeSupport-BIFindex
   *
   * @returns {Array} bifIndex
   */
    generateBIFIndex() {
        const bifIndex = [];

        for (
            // BIF index starts at byte 64 (BIF_INDEX_OFFSET)
            let i = 0, bifIndexEntryOffset = BIF_INDEX_OFFSET;
            i < this.numberOfBIFImages;
            i += 1, bifIndexEntryOffset += BIF_INDEX_ENTRY_LENGTH
        ) {
            const bifIndexEntryTimestampOffset = bifIndexEntryOffset;
            const bifIndexEntryAbsoluteOffset = bifIndexEntryOffset + 4;

            const nextBifIndexEntryAbsoluteOffset = bifIndexEntryAbsoluteOffset + BIF_INDEX_ENTRY_LENGTH;

            // Documented example, items within `[]`are used to generate the frame.
            // 64, 65, 66, 67 | 68, 69, 70, 71
            // [Frame 0 timestamp] | [absolute offset of frame]
            // 72, 73, 74, 75 | 76, 77, 78, 79
            // Frame 1 timestamp | [absolute offset of frame]
            const offset = this.data.getUint32(bifIndexEntryAbsoluteOffset, true);
            const nextOffset = this.data.getUint32(nextBifIndexEntryAbsoluteOffset, true);
            const timestamp = this.data.getUint32(bifIndexEntryTimestampOffset, true);

            bifIndex.push({
                offset,
                timestamp,

                length: nextOffset - offset,
            });
        }

        return bifIndex;
    }

    /**
   * Return image data for a specific frame of a movie.
   *
   * @param {number} second
   * @returns {string} imageData
   */
    getImageDataAtSecond(second) {

        const image = 'data:image/jpeg;base64,';

        // since frames are defined at an interval of `this.framewiseSeparation`,
        // we need to convert the time into an appropriate frame number.
        const frameNumber = Math.floor(second / (this.framewiseSeparation / 1000));

        const frame = this.bifIndex[frameNumber];

        if (!frame) {
            return image;
        }

        const base64 = btoa(new Uint8Array(this.arrayBuffer.slice(frame.offset, frame.offset + frame.length)).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));

        return `${image}${base64}`;
    }

    getImageMetaAtSecond(second) {

        // since frames are defined at an interval of `this.framewiseSeparation`,
        // we need to convert the time into an appropriate frame number.
        const frameNumber = Math.floor(second / (this.framewiseSeparation / 1000));

        const frame = this.bifIndex[frameNumber];

        const imageFrame = this.arrayBuffer.slice(frame.offset, frame.offset + frame.length);

        const imageView = new DataView(imageFrame);

        const isPNG = validate(imageFrame, PNG_MAGIC);
        const isJFIF = validate(imageFrame, JPEG_MAGIC);

        /**
         * 
         * @param {[Number]} matchBytes - search string in '0xFFAABBCC' format 
         * @param {Number} numToMatch - number of bytes in the match string
         * @returns {Number} - position of the search string or 0 if not found
         */
        const findMarker = (matchBytes, numToMatch) => {

            const marker = numToMatch == 2 ? new Uint16Array([...matchBytes])[0] : new Uint32Array([...matchBytes])[0];


            // now step through the dataview one byte at a time and look for a match
            let offset = 0;
            let found = false;
            while (!found && offset < imageView.byteLength) {
                const readBytes = numToMatch == 2 ? imageView.getUint16(offset) : imageView.getUint32(offset);
                if (readBytes == marker) found = true;
                if (!found) offset += 1;
            }
            return found ? offset : 0;

        };

        const format = isJFIF ? 'JFIF' : isPNG ? 'PNG' : 'unknown format';

        if (isJFIF) {
            // Frame is SOF(2) 0xFF 0xC0, Lf(2), P(1), Y(2), X(2)
            // so find FFCO, then take height=bytes 4,5 width=bytes 6,7
            const findFFC0 = findMarker(['0xFFC0'], 2);
            if (findFFC0) return ({
                height: imageView.getUint16(findFFC0 + 5),
                width: imageView.getUint16(findFFC0 + 7),
                format
            });
        }

        if (isPNG) {
            const findIHDR = findMarker(['0x49484452'], 4);
            if (findIHDR) return ({
                format,
                width: imageView.getUint32(findIHDR + 4),
                height: imageView.getUint32(findIHDR + 8)
            });
        }

        return { height: 'unknown', width: 'unknown', format };
    }
}