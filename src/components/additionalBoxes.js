const { convertToHex } = require('./tools.js');

const prft = {
    source: 'ISO 14496-12_2012 Producer Reference Time 8.16.5',
    field: 'prft',
    _parser: function () {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
}

const sgpd = {
    /* Sequence Entry
abstract class SampleGroupDescriptionEntry (unsigned int(32) grouping_type) { }
abstract class VisualSampleGroupEntry (unsigned int(32) grouping_type) extends SampleGroupDescriptionEntry (grouping_type) { }
abstract class AudioSampleGroupEntry (unsigned int(32) grouping_type) extends SampleGroupDescriptionEntry (grouping_type) { }
abstract class HintSampleGroupEntry (unsigned int(32) grouping_type) extends SampleGroupDescriptionEntry (grouping_type) { }
aligned(8) class SampleGroupDescriptionBox (unsigned int(32) handler_type) extends FullBox('sgpd', version, 0){ unsigned int(32) grouping_type;
if (version==1) { unsigned int(32) default_length; } unsigned int(32) entry_count; int i;
for (i = 1 ; i <= entry_count ; i++){ if (version==1) { if (default_length==0) { unsigned int(32) description_length;
} } switch (handler_type){
case ‘vide’: // for video tracks VisualSampleGroupEntry (grouping_type); break;
case ‘soun’: // for audio tracks AudioSampleGroupEntry(grouping_type); break;
case ‘hint’: // for hint tracks HintSampleGroupEntry(grouping_type); break;
} } } */
    source: 'ISO 14496-12_2012 Sample Group Description 8.9.3',
    field: 'sgpd',
    _parser: function () {
        this._procFullBox();
        this._procField('grouping_type', 'uint', 32);
        this.version == 1 && this._procField('default_length', 'uint', 32);
        this._procField('entry_count', 'uint', 32);
        //TODO
    }
}

const sbgp = {

    /*aligned(8) class SampleToGroupBox extends FullBox(‘sbgp’, version, 0)
{ unsigned int(32) } unsigned int(32) entry_count;
for (i=1; i <= entry_count; i++) {
unsigned int(32) unsigned int(32)
} } 8.9.2.3 Semantics
version is an integer that specifies the version of this box, either 0 or 1. grouping_type is an integer that identifies the type (i.e. criterion used to form the sample groups) of the sample grouping and links it to its sample group description table with the same value for grouping type. At most one occurrence of this box with the same value for grouping_type (and, if used, grouping_type_parameter) shall exist for a track. grouping_type_parameter is an indication of the sub-type of the grouping entry_count is an integer that gives the number of entries in the following table. sample_count is an integer that gives the number of consecutive samples with the same sample group descriptor. If the sum of the sample count in this box is less than the total sample count, then the reader should effectively extend it with an entry that associates the remaining samples with no group. It is an error for the total in this box to be greater than the sample_count documented elsewhere, and the reader behaviour would then be undefined.
sample_count; group_description_index; grouping_type;
if (version == 1) { unsigned int(32) grouping_type_parameter; */
    source: 'ISO 14496-12_2012 Sample-to-Group 8.9.2',
    field: 'sbgp',
    _parser: function () {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
}

const saiz = {
    /*aligned(8) class SampleAuxiliaryInformationSizesBox extends FullBox(‘saiz’, version = 0, flags)
{
if (flags & 1) { unsigned int(32) aux_info_type; unsigned int(32) aux_info_type_parameter;
}
unsigned int(8) default_sample_info_size; unsigned int(32) sample_count; if (default_sample_info_size == 0) {
unsigned int(8) sample_info_size[ sample_count ]; } } */
    source: 'ISO 14496-12_2012 Sample Auxiliary Information Sizes 8.7.8',
    field: 'saiz',
    _parser: function () {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
}

const saio = {
    /*aligned(8) class SampleAuxiliaryInformationOffsetsBox extends FullBox(‘saio’, version, flags)
{
if (flags & 1) { unsigned int(32) aux_info_type; unsigned int(32) aux_info_type_parameter;
}
unsigned int(32) entry_count; if ( version == 0 ) {
unsigned int(32) offset[ entry_count ]; }
else { unsigned int(64) offset[ entry_count ]; }
}
*/
    source: 'ISO 14496-12_2012 Sample Auxiliary Information Offsets 8.7.9',
    field: 'saio',
    _parser: function () {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
}

const senc = {
    /*aligned(8) class SampleEncryptionBox
	extends FullBox(‘senc’, version=0, flags)
{
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
    field: 'senc',
    _parser: function () {
        this._procFullBox();
        this._procField('sample_count', 'uint', 32);
        this._procEntry('entry', this.sample_count, function (entry) {
            this.procEntryField('subsample_count', 'uint', 16);
            this.procFieldArray('')
        })
        //TODO
    }
}

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
const getISOData = (boxName, key, value) => {

    // little helper that returns the type
    const getValueType = val => Object.prototype.toString.call(val).match(/ (\w+)\]/i)[1];

    // 1) Handle Arrays of numbers
    // 2) Handle Arrays of things represented by numbers (pssh:SystemID, pssh:Data possibly (for PlayReady) for example)
    // 3) Handle lookups (psshLookup)
    // 4) Handle Arrays of Objects (eg. entries, references, samples) -- note * usually includes *_count !
    // 5) Handle raw binary (Uint8Array)

    // 5) Handle raw binary
    if (getValueType(value) === 'Uint8Array') {
        return `0x ${convertToHex(value)}`
    }
    // Handle arrays of ...
    if (getValueType(value) === "Array") {
        // Arrays of Objects -- add an entry number and send it back up
        if (getValueType(value[0]) === 'Object') {
            return value.map((item, index) => {
                const cleanEntry = { ...item };
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        } else {
            // if the array entry isn't an object, return a comma separated list
            let formattedData;
            switch (key) {
                // Array of things represented by numbers
                case 'SystemID':
                    formattedData = `0x ${convertToHex(value)} (${psshLookup[convertToHex(value)]})`;
                    break;
                case 'Data':
                    formattedData = value.map(b => String.fromCharCode(b)).join('');
                    break;
                // Array of numbers
                default:
                    formattedData = value.join(', ');
            }
            return formattedData;
        }
    }
    // Handle string or Number or anything else that slips through
    return value;
}

module.exports = {
    getISOData,
    psshLookup,
    prft
}