const { convertToHex } = require('./tools.js');

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
    }
]

const psshLookup = {
    '10 77 EF EC C0 B2 4D 02 AC E3 3C 1E 52 E2 FB 4B': 'Clearkey',
    '9A 04 F0 79 98 40 42 86 AB 92 E6 5B E0 88 5F 95': 'PlayReady',
    'ED EF 8B A9 79 D6 4A CE A3 C8 27 DC D5 1D 21 ED': 'WideVine'
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