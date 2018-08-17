

module.exports = {
    schema_ext: {
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
}