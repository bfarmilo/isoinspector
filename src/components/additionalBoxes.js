const { convertToHex, formatUuid } = require('./tools.js');

const additionalBoxes = [
    {
        source: 'ISO/IEC 14496-12:2012 - 8.8.7 Track Fragment Header Box',
        field: 'tfhd',
        _parser: function () {
            const flagData = [];
            this._procFullBox();
            this._procField('track_ID', 'uint', 32);
            if (this.flags & 0x01) this._procField('base_data_offset', 'uint', 64);
            if (this.flags & 0x02) this._procField('sample_description_offset', 'uint', 32);
            if (this.flags & 0x08) this._procField('default_sample_duration', 'uint', 32);
            if (this.flags & 0x10) this._procField('default_sample_size', 'uint', 32);
            if (this.flags & 0x20) this._procField('default_sample_flags', 'uint', 32);
            if (this.flags & 0x010000) flagData.push('duration-is-empty');
            if (this.flags & 0x020000) flagData.push('default-base-is-moof');
            if (flagData.length) this.flagData = flagData;
        }
    }, {
        source: 'ISO 14496-12_2012 Producer Reference Time 8.16.5',
        field: 'prft',
        _parser: function () {
            this._procFullBox();
            this._procField('reference_track_ID', 'uint', 32);
            this._procField('ntp_timestamp', 'uint', 64);
            this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
        }
    }, {
        source: 'ISO 14496-12_2012 Sample Auxiliary Information Sizes 8.7.8',
        field: 'saiz',
        _parser: function () {
            this._procFullBox();
            this.flags & 1 && this._procField('aux_info_type', 'uint', 32);
            this.flags & 1 && this._procField('aux_info_type_parameter', 'uint', 32);
            this._procField('default_sample_info_size', 'uint', 8);
            this._procField('sample_count', 'uint', 32);
            this.default_sample_info_size == 0 && this._procEntries('sample_info_sizes', this.sample_count, function (sample) {
                this._procEntryField(sample, 'sample_info_size', 'uint', 8);
            });
        }
    }, {
        source: 'ISO 14496-12_2012 Sample Auxiliary Information Offsets 8.7.9',
        field: 'saio',
        _parser: function () {
            const version = this.version;
            this._procFullBox();
            this.flags & 1 && this._procField('aux_info_type', 'uint', 32);
            this.flags & 1 && this._procField('aux_info_type_parameter', 'uint', 32);
            this._procField('entry_count', 'uint', 32);
            this._procEntries('offsets', this.entry_count, function (entry) {
                this._procEntryField(entry, 'offset', 'uint', version == 1 ? 64 : 32);
            });
        }
    }, {
        /* Sequence Entry
    aligned(8) class SampleGroupDescriptionBox (unsigned int(32) handler_type) extends FullBox('sgpd', version, 0){ 
        unsigned int(32) grouping_type;
        if (version==1) { unsigned int(32) default_length; } 
        unsigned int(32) entry_count; 
            int i;
            for (i = 1 ; i <= entry_count ; i++){ 
                if (version==1) { 
                    if (default_length==0) { 
                        unsigned int(32) description_length;
                    } 
                } switch (handler_type) {
                    case ‘vide’: // for video tracks VisualSampleGroupEntry (grouping_type); break;
                    case ‘soun’: // for audio tracks AudioSampleGroupEntry(grouping_type); break;
                    case ‘hint’: // for hint tracks HintSampleGroupEntry(grouping_type); break;
                } 
            } 
        } */
        source: 'ISO 14496-12_2012 Sample Group Description 8.9.3',
        field: 'sgpd'
    }, {
        source: 'ISO 14496-12_2012 Sample-to-Group 8.9.2',
        field: 'sbgp'
    }, {
        /*
        aligned(8) class SampleEncryptionBox extends FullBox(‘senc’, version=0, flags){
            unsigned int(32)  sample_count;
        {
            unsigned int(Per_Sample_IV_Size*8)  InitializationVector;
            if (flags & 0x000002)
            {
                unsigned int(16)  subsample_count;
                {
                    unsigned int(16)  BytesOfClearData;
                    unsigned int(32)  BytesOfProtectedData;
                } [ subsample_count ]
            }
        }[ sample_count ]
    }
    note Per_Sample_IV_Size and flags comes from 'tenc' box
     */
        source: 'ISO 23001-7_2016 Sample Encryption 7.2.1',
        field: 'senc'
    }, {
        source: 'ISO 14496-12_2012', field: 'iods'
    }, {
        /*
        aligned(8) class TimeToSampleBox extends FullBox(’stts’, version = 0, 0) { 
            unsigned int(32) entry_count;
            int i;
            for (i=0; i < entry_count; i++) { 
                unsigned int(32) sample_count; 
                unsigned int(32) sample_delta;
            }
        }*/
        source: 'ISO 14496-12_2012 (decoding) time-to-sample 8.6.1.2',
        field: 'stts',
        _parser: function () {
            this._procFullBox();
            this._procField('entry_count', 'uint', 32);
            if (this.entry_count) {
                this._procEntries('entries', this.entry_count, function (entry) {
                    this._procEntryField(entry, 'sample_count', 'uint', 32);
                    this._procEntryField(entry, 'sample_delta', 'uint', 32);
                })
            }
        }
    }, {
        source: 'ISO 14496-12_2012 sample-to-chunk, partial data-offset information 8.7.4',
        field: 'stsc',
        _parser: function () {
            this._procFullBox();
            this._procField('entry_count', 'uint', 32);
            if (this.entry_count) {
                this._procEntries('entries', this.entry_count, function (entry) {
                    this._procEntryField(entry, 'first_chunk', 'uint', 32);
                    this._procEntryField(entry, 'samples_per_chunk', 'uint', 32);
                    this._procEntryField(entry, 'sample_description_index', 'uint', 32);
                })
            }
        }
    }, {
        source: 'ISO 14496-12_2012 chunk offset, partial data-offset information 8.7.5',
        field: 'stco',
        _parser: function () {
            this._procFullBox();
            this._procField('entry_count', 'uint', 32);
            if (this.entry_count) {
                this._procEntries('entries', this.entry_count, function (entry) {
                    this._procEntryField(entry, 'chunk_offset', 'uint', 32);
                })
            }
        }
    }, {
        source: 'ISO 14496-12_2012 sync sample table 8.6.3',
        field: 'stss',
        _parser: function () {
            this._procFullBox();
            this._procField('entry_count', 'uint', 32);
            if (this.entry_count) {
                this._procEntries('entries', this.entry_count, function (entry) {
                    this._procEntryField(entry, 'sample_number', 'uint', 32);
                })
            }
        }
    }, {
        /*
        aligned(8) class CompositionOffsetBox 
        extends FullBox(‘ctts’, version = 0, 0) { 
            unsigned int(32) entry_count; 
                int i;
            if (version==0) {
                for (i=0; i < entry_count; i++) { 
                    unsigned int(32) sample_count;
                    unsigned int(32) sample_offset;
                } 
            } else if (version == 1) {
                for (i=0; i < entry_count; i++) { 
                    unsigned int(32) sample_count;
                    signed int(32) sample_offset;
                } 
            } 
        }
        */
        source: 'ISO 14496-12_2012 (composition) time to sample 8.6.1.3',
        field: 'ctts',
        _parser: function () {
            this._procFullBox();
            const version = this.version;
            this._procField('entry_count', 'uint', 32);
            if (this.entry_count) {
                this._procEntries('entries', this.entry_count, function (entry) {
                    this._procEntryField(entry, 'sample_count', 'uint', 32);
                    this._procEntryField(entry, 'sample_offset', version ? 'int' : 'uint', 32);
                });
            }
        }
    }, {
        source: 'ISO 14496-12_2012 Sample Size Box 8.7.3.1',
        field: 'stsz',
        _parser: function () {
            this._procFullBox();
            this._procField('sample_size', 'uint', 32);
            this._procField('sample_count', 'uint', 32);
            if (this.sample_size == 0 && this.sample_count) {
                this._procEntries('samples', this.sample_count, function (sample) {
                    this._procEntryField(sample, 'entry_size', 'uint', 32);
                })
            }
        }
    }, {
        source: 'Netflix Cadmium Player undocumented',
        field: 'uuid',
        _parser: function () {
            const uuidString = this.usertype.map(bit => bit.toString('16').padStart(2, '0').toUpperCase()).join('');
            const getUint64 = (byteOffset, littleEndian = false) => {
                // split 64-bit number into two 32-bit (4-byte) parts
                const left = this._raw.getUint32(byteOffset + 24, littleEndian);
                const right = this._raw.getUint32(byteOffset + 4 + 24, littleEndian);

                // combine the two 32-bit values
                const combined = littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right;

                if (!Number.isSafeInteger(combined))
                    console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

                return combined;
            }
            if (uuidString === '4E6574666C6978506966665374726D21') {
                console.log('NetflixPiffStream found !');
                /*
                function (a, b) { m(a, b); a.fileSize = b.Se(); a.X2 = b.Se(); a.duration = b.Se(); a.lka = b.Se(); a.Alb = b.Se(); 1 <= a.version && (a.cjb = b.Se(), a.djb = b.Ba(), a.mka = b.Se(), a.Gfa = b.Ba(), a.xfa = b.Jz()); }
                Se = cd(8)
                cd = function (a) { for (var b = 0; a--;)b = 256 * b + this.buffer[this.position++]; return b; }
                */
                this.filesize = getUint64(0);
                this.X2 = getUint64(8);
                this.duration = getUint64(16);
                this.lka_offset = getUint64(24);
                this.Alb = getUint64(32);
                this.cjb = getUint64(40);
                this.djb = this._raw.getUint32(48 + 24);
                this.mka = getUint64(52);
                this.Gfa = this._raw.getUint32(60 + 24);
                /*this._procField('X2', 'uint', 8); 8
                this._procField('duration', 'uint', 8); 16
                this._procField('lka_offset?', 'uint', 8); 24
                this._procField('Alb', 'uint', 8); 32
                this._procField('cjb', 'uint', 8); 40
                this._procField('djb', 'uint', 4); 48
                this._procField('mka_offset?', 'uint', 8); 52
                this._procField('Gfa_size?', 'uint', 4); 60
                this._procField('xfa_KID?', 'uint', 8); // just return the dataview*/
            } else { }
        }
    }
]

/*
UUID 	Reference 	Abstract
5E629AF5-38DA-4063-8977-97FFBD9902D4 	Marlin Adaptive Streaming Specification – Simple Profile, V1.0 [9] 	Marlin, see the spec for the details of what can be further specified within the ContentProtection element.
adb41c24-2dbf-4a6d-958b-4457c0d27b95 	Nagra MediaAccess PRM 3.0 , documentation available under NDA [12] 	Identifies Nagra MediaAccess PRM 3.0 and above
A68129D3-575B-4F1A-9CBA-3223846CF7C3 	Cisco/NDS VideoGuard Everywhere DRM ™. Documentation is available under NDA [13] 	Cisco/NDS VideoGuard Everywhere DRM identification. For more information on VideoGuard Everywhere DRM go here
9a04f079-9840-4286-ab92-e65be0885f95 	MPEG DASH Content Protection using Microsoft PlayReady [10], section 2.2.1 	Microsoft PlayReady
9a27dd82-fde2-4725-8cbc-4234aa06ec09 	Verimatrix VCAS™ for DASH [11] 	Verimatrix ViewRight Web / DASH @value= “Verimatrix VCAS for DASH, ViewRightWeb VV.vv” (VV.vv will be the version number)This is the name of the company system and client version as recommended in DASH-AVC/264. If used, this can help the client to determine if the current DRM client can play the content.
F239E769-EFA3-4850-9C16-A903C6932EFB 	Please contact Adobe for more information 	Adobe Primetime DRM, version 4
1f83e1e8-6ee9-4f0d-ba2f-5ec4e3ed1a66 	No separate and public specification is available. The UUID is a version 4 UUID as per RFC 4122 [8]. The UUID will be made available in SecureMedia documentation shared with a partner or customer of SecureMedia. Please refer to http://www.securemedia.com/. 	SecureMedia, ArrisThe UUID of @schemeIdURIis a version 4 UUID as per RFC 4122.@valueshall be as follows: “Arris SecureMedia version XXXXXXX”XXXXXX will be specified in documentation associated with a particular version of the product. The documentation will be shared with a partner or customer of SecureMedia. Please refer to http://www.securemedia.com/.
644FE7B5-260F-4FAD-949A-0762FFB054B4 	A draft version of the CMLA Technical Specification which is in process with involved adopters is not published. It’s planned to be chapter 18 of our CMLA Technical Specification upon completion and approval.Revisions of the CMLA Technical Specification become public upon CMLA approval.UUID will correlate to various related XML schema and PSSH components as well as elements of the content protection element relating to CMLA DASH mapping. 	CMLA (OMA DRM), for details see here http://www.cm-la.com.
6a99532d-869f-5922-9a91-113ab7b1e2f3 	More information is available at http://www.mobitv.com/core-technologies/digital-rights-management/. 	MobiTV DRM: A generic identifier for any version of MobiDRM (MobiTV DRM). The version is signaled in the pssh box.
35BF197B-530E-42D7-8B65-1B4BF415070F 	Please contact DivX for specifications. 	DivX DRM Series 5
B4413586-C58C-FFB0-94A5-D4896C1AF6C3 	VODRM documentation is available under NDA. Please contact Viaccess-Orca for more information. 	This UUID identifies the Viaccess-Orca DRM (VODRM).
edef8ba9-79d6-4ace-a3c8-27dcd51d21ed 	For more info: http://www.widevine.com 	Widevine Content Protection for MPEG DASH.
80a6be7e-1448-4c37-9e70-d5aebe04c8d2 	Irdeto Protection documentation available under NDA. For more info: http://www.irdeto.com 	Irdeto Content Protection for DASH
dcf4e3e3-62f1-5818-7ba6-0a6fe33ff3dd 	Documentation is available under NDA. For more info: http://www.digicaps.com/en/ 	DigiCAP SmartXess for DASH @value “CA/DRM_NAME VERSION” (CA 1.0, DRM+ 2.0)
45d481cb-8fe0-49c0-ada9-ab2d2455b2f2 	For more information and specification, please contact CoreTurst. The contact detail is mktall@coretrust.com 	CoreCrypt : CoreTrust Content Protection for MPEG-DASH
616C7469-6361-7374-2D50-726F74656374 	Please contact Alticast for more information, galtiprotect_drm@alticast.com. 	Alticast altiProtect, more information available at http://www.alticast.com/
45d481cb-8fe0-49c0-ada9-ab2d2455b2f2 	For more information and specification, please contact CoreTurst. The contact detail is mktall@coretrust.com 	CoreCrypt : CoreTrust Content Protection for MPEG-DASH
992c46e6-c437-4899-b6a0-50fa91ad0e39 	This UUID is a protection system specific identifier for SecureMedia SteelKnot. No separate and public specification is available. The UUID is as per RFC 4122 available at http://www.ietf.org/rfc/rfc4122.txt . The UUID will be made available in SecureMedia SteelKnot documentation shared with a partner or customer of SecureMedia SteelKnot. Please refer to http://www.securemedia.com/ 	The UUID of the attribute, @schemeIDURI is as per RFC 4122. The attribute, @value shall be as follows: “Arris SecureMedia SteelKnot version XXXXXXX”. The exact length and syntax of the placeholder denoted by XXXXXXX will be specified in documentation associated with a particular version of the product. The documentation will be shared with a partner or customer of SecureMedia SteelKnot. Please refer to http://www.securemedia.com/ .
1077efec-c0b2-4d02-ace3-3c1e52e2fb4b 	https://w3c.github.io/encrypted-media/format-registry/initdata/cenc.html 	This identifier is to be used as the SystemID for the Common PSSH box format defined by the W3C (https://w3c.github.io/encrypted-media/format-registry/initdata/cenc.html), as a preferred alternative to DRM system specific PSSH box formats. This identifier may be used in PSSH boxes and MPEG-DASH ContentProtection elements.
e2719d58-a985-b3c9-781a-b030af78d30e 	DASH-IF Interoperability Points v3.4: https://dashif.org/guidelines/ 	This identifier is meant to be used to signal availability of Clear Key content key delivery. Its use is mutually exclusive with the use of any other DRM System SystemIDs, including the Common PSSH Box Format System ID. This GUID may only be present in an MPEG-DASH ContentProtection element, and never in the media content PSSH Box.
94CE86FB-07FF-4F43-ADB8-93D2FA968CA2 	Content Protection System Identifier for Apple FairPlay Streaming 	System ID to identify FairPlay Streaming
279fe473-512c-48fe-ade8-d176fee6b40f 	Arris Titanium content protection. Documentation available under NDA. Contact multitrust.info@arris.com for further information. 	Arris Titanium. The UUID of @schemeiduri is a version 4 UUID as per RFC 4122. @value will be specified in documentation related to a specific version of the product. Contact multitrust.info@arris.com for further information.
aa11967f-cc01-4a4a-8e99-c5d3dddfea2d 	Unitend Technologies Inc. applies this UUID to identify the Unitend DRM (UDRM). For further information, contact y.ren@unitend.com This UUID identifies the Unitend-DRM (UDRM). More information available at http://www.unitend.com/

see also https://forums.developer.apple.com/thread/6185

*/

const psshLookup = {
    '10 77 EF EC C0 B2 4D 02 AC E3 3C 1E 52 E2 FB 4B': 'Clearkey',
    '9A 04 F0 79 98 40 42 86 AB 92 E6 5B E0 88 5F 95': 'PlayReady',
    'ED EF 8B A9 79 D6 4A CE A3 C8 27 DC D5 1D 21 ED': 'WideVine',
    'F2 39 E7 69 EF A3 48 50 9C 16 A9 03 C6 93 2E FB': 'PrimeTime',
    '94 CE 86 FB 07 FF 4F 43 AD B8 93 D2 FA 96 8C A2': 'FairPlay',
    '29 70 1F E4 3C C7 4A 34 8C 5B AE 90 C7 43 9A 47': 'FairPlay-unofficial'

}

/** Looks at the box entry and returns proper formatting based on the type of data therein,
 * and possibly the entry.type
 * 
 * @param {Object} entry ->  a single box parameter
 * @returns {String or Array<Object>} -> returns the unformatted contents in an array
 */
const getISOData = (key, value) => {
    // little helper that returns the type
    const getValueType = val => Object.prototype.toString.call(val).match(/ (\w+)\]/i)[1];

    // 1) Handle Arrays of numbers
    // 2) Handle Arrays of things represented by numbers (pssh:SystemID, pssh:Data possibly (for PlayReady) for example)
    // 3) Handle lookups (psshLookup)
    // 4) Handle Arrays of Objects (eg. entries, references, samples) -- note * usually includes *_count !
    // 5) Handle raw binary (Uint8Array)
    const handleArray = {
        'Object': value => value.map((item, index) => {
            const cleanEntry = { ...item };
            cleanEntry.entryNumber = index + 1;
            return cleanEntry;
        }),
        'String': value => value.join(', '),
        'Number': value => value.join(', ')
    }

    // 5) Handle raw binary
    if (getValueType(value) === 'Uint8Array') {
        return { hex: convertToHex(value) } // an array of 16-byte entries
    }
    // Handle arrays of ...
    if (getValueType(value) === "Array") {
        // first check for special handling by key
        switch (key) {
            case 'SystemID':
                return `${convertToHex(value)} (${psshLookup[convertToHex(value)]})`;
            case 'Data':
            case 'compressorname':
                return value.map(b => String.fromCharCode(b)).join('');
            case 'usertype':
                return `${formatUuid(value)} (${value.map(b => String.fromCharCode(b)).join('')})\n${convertToHex(value._data)}`;
            case 'xfa_KID?':
                return `${formatUuid(value)}`;
            default: // Otherwise handle based on type of the first entry
                return value[0] ? handleArray[getValueType(value[0])](value) : [];
        }
    }
    // special case -- flags should show up as hex for easier comparison to standard
    if (key === 'flags') return `0x${value.toString(16).padStart(2, '0').toUpperCase()}`;
    // Handle string or Number or anything else that slips through
    return value;
}

module.exports = {
    getISOData,
    psshLookup,
    additionalBoxes
}