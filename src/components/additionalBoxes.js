
const { convertToHex, formatUuid } = require('./tools.js');
const { createWorker } = require('@ffmpeg/ffmpeg');
const Pbf = require('pbf');
const { WidevinePsshData } = require('./widevine_pssh.js');

let perSampleIVSize, subsampleCount;

const generateMPD = (keyFile, IV, segmentList) => `<?xml version="1.0"?>
<MPD minBufferTime="PT1.500000S" type="static" mediaPresentationDuration="PT0H9M56.46S" profiles="urn:mpeg:dash:profile:isoff-full:2011">
    <Period duration="PT0H1M0S">
        <AdaptationSet segmentAlignment="true" group="1" maxWidth="480" maxHeight="360" maxFrameRate="24" par="4:3">
            <SegmentTemplate timescale="96" media="bunny_$Bandwidth$bps/BigBuckBunny_6s$Number$.m4s" startNumber="1" duration="576" initialization="bunny_$Bandwidth$bps/BigBuckBunny_6s_init.mp4"/>
            <Representation id="320x240 46.0kbps" mimeType="video/mp4" codecs="avc1.42c00d" width="320" height="240" frameRate="24" sar="1:1" startWithSAP="1" bandwidth="45514"/>
        </AdaptationSet>
    </Period>
</MPD>
`;

const decodeMP4 = (playList, keyFile, segmentFile) => new Promise(async (resolve, reject) => {
    try {
        // should take a playList (buffer), keyFile (buffer), and a segmentFile (buffer)
        // remap to a new playList (buffer)

        // first get IV from old playlist
        const IV = playList.match(/IV=0x([0123456789ABCDEF]*)\s/);
        const newPlayList = generateM3U8('keyFile.key', IV ? IV[1] : '0000000000000001', ['segment.ts']);
        const [keyFileBuffer, segmentBuffer] = [keyFile, segmentFile].map(data => Uint8Array.from(atob(data), c => c.charCodeAt(0)));
        // now run ffmpeg and send the resulting buffer to processData(decoded)
        const worker = createWorker({ logger: ({ message }) => console.log(message) });
        await worker.load();
        // load files into virtual file system
        console.log('worker loaded');
        await worker.writeText('playlist.m3u8', newPlayList);
        await worker.write('keyFile.key', keyFileBuffer);
        await worker.write('segment.ts', segmentBuffer);
        // now run the decryption
        await worker.run(`-loglevel debug -allowed_extensions ALL -i /data/playlist.m3u8 -c copy decrypt.ts`, {
            input: ['playlist.m3u8', 'keyFile.key', 'segment.ts'],
            output: `decrypt.ts`,
            del: true
        });
        const { data } = await worker.read(`decrypt.ts`);
        return resolve(data);
    } catch (err) {
        return reject(err);
    }
})

const additionalBoxes = [
    {
        source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 Bitrate box',
        field: 'btrt',
        _parser: function () {
            this._procField('bufferSizeDB', 'uint', 32)
            this._procField('maxBitrate', 'uint', 32)
            this._procField('avgBitrate', 'uint', 32)
        }
    },
    {
        source: 'ISO/IEC 14496-12:2012 - 8.8.3.1 Track Extends Box',
        field: 'trex',
        _parser: function () {
            this._procFullBox();
            this._procField('track_ID', 'uint', 32);
            this._procField('default_sample_description_index', 'uint', 32);
            this._procField('default_sample_duration', 'uint', 32);
            this._procField('default_sample_size', 'uint', 32);
            this._procField('default_sample_flags', 'uint', 32);
            /*  this._procField('reserved1', 'bit', 4);
             this._procField('is_leading', 'uint', 2);
             this._procField('sample_depends_on', 'uint', 2);
             this._procField('sample_is_depended_on', 'uint', 2);
             this._procField('sample_has_redundancy', 'uint', 2);
             this._procField('sample_padding_value', 'bit', 3);
             this._procField('sample_is_non_sync_sample', 'bit', 1);
             this._procField('sample_degredation_priority', 'uint', 16); */
        }
    }, {
        source: 'ISO/IEC 14496-12:2012 - 8.12.2 Original Format Box',
        field: 'frma',
        _parser: function () {
            // process this as a 4-byte array instead of a uint32 since it's actually ASCII text
            this._procFieldArray('data_format', 4, 'uint', 8);
        }
    },
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
            this.flags & 1 && this._procFieldArray('aux_info_type', 4, 'uint', 8); //modified since this seems to be a string not a 32byte uint
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
            this.flags & 1 && this._procFieldArray('aux_info_type', 4, 'uint', 8); //modified since this seems to be a string not a 32byte uint
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
        source: 'ISO 23001-7 2016 Track Encryption 8.2.2',
        field: 'tenc',
        _parser: function () {
            this._procFullBox();
            this._procField('reserved1', 'uint', 8);
            if (this.version === 0) {
                this._procField('reserved2', 'uint', 8);
            } else {
                this._procField('default_crypt_byte_block', 'uint', 4);
                this._procField('default_skip_byte_block', 'uint', 4);
            }
            this._procField('default_isProtected', 'uint', 8);
            this._procField('default_Per_Sample_IV_Size', 'uint', 8);
            this._procFieldArray('default_KID', 16, 'uint', 8)
            if (this.default_Per_Sample_IV_Size == 0) {
                this._procField('default_constant_IV_size', 'uint', 8);
                this._procFieldArray('default_constant_IV', this.default_constant_IV_size, 'uint', 8);
            }
            this.perSampleIVSize = this.default_Per_Sample_IV_Size || this.default_constant_IV_size;
        }
    },
    {
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
        field: 'senc',
        _parser: function () {
            this._procFullBox();
            this._procField('sample_count', 'uint', 32);
            if (this.flags & 1) {
                this._procField('IV_size', 'uint', this.perSampleIVSize || 8);
            }
            this._procEntries('senc_samples', this.sample_count, function (entry) {
                this._procEntryField(entry, 'InitializationVector', 'data', 8);
                if (this.flags & 2) {
                    this._procEntryField(entry, 'subsample_count', 'uint', 16);
                    this._procSubEntries(entry, 'subsamples', entry.subsample_count, function (subsample) {
                        this._procEntryField(subsample, 'BytesOfClearData', 'uint', 16);
                        this._procEntryField(subsample, 'BytesOfEncryptedData', 'uint', 32);
                    });
                }
            });
        }
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
        source: 'ISO/IEC 14496-12 2015 8.5.2.2 Sample Entry, modified as described in 8.12',
        field: 'encv',
        _parser: function () {
            // SampleEntry fields
            this._procFieldArray('reserved1', 6, 'uint', 8);
            this._procField('data_reference_index', 'uint', 16);
            // VisualSampleEntry fields
            this._procField('pre_defined1', 'uint', 16);
            this._procField('reserved2', 'uint', 16);
            this._procFieldArray('pre_defined2', 3, 'uint', 32);
            this._procField('width', 'uint', 16);
            this._procField('height', 'uint', 16);
            this._procField('horizresolution', 'template', 32);
            this._procField('vertresolution', 'template', 32);
            this._procField('reserved3', 'uint', 32);
            this._procField('frame_count', 'uint', 16);
            this._procFieldArray('compressorname', 32, 'uint', 8);
            this._procField('depth', 'uint', 16);
            this._procField('pre_defined3', 'int', 16);
            // Codec-specific fields
            this._procSubBoxes('config', 1);
        }
    }, {
        source: 'EC3 Specific Box',
        field: 'dec3',
        _parser: function () {
            this._procField('data_rate', 'uint', 13);
            this._procField('num_ind_sub', 'uint', 3);
            this._procField('fscod', 'uint', 2);
            this._procField('bsid', 'uint', 5);
            this._procField('bsmod', 'uint', 5);
            this._procField('acmod', 'uint', 3)
            this._procField('lfeon', 'uint', 1);
            this._procField('reserved1', 'uint', 3);
            this._procField('num_dep_sub', 'uint', 4);
            if (this.num_dep_sub > 0) {
                this._procField('chan_loc', 'uint', 9);
            } else {
                this._procField('reserved2', 'uint', 1)
            }
        }
    }, {
        source: 'ISO/IEC 14496-12 2015 8.5.2.2 Sample Entry, modified as described in 8.12',
        field: 'avc1',
        _parser: function () {
            // SampleEntry fields
            this._procFieldArray('reserved1', 6, 'uint', 8);
            this._procField('data_reference_index', 'uint', 16);
            // VisualSampleEntry fields
            this._procField('pre_defined1', 'uint', 16);
            this._procField('reserved2', 'uint', 16);
            this._procFieldArray('pre_defined2', 3, 'uint', 32);
            this._procField('width', 'uint', 16);
            this._procField('height', 'uint', 16);
            this._procField('horizresolution', 'template', 32);
            this._procField('vertresolution', 'template', 32);
            this._procField('reserved3', 'uint', 32);
            this._procField('frame_count', 'uint', 16);
            this._procFieldArray('compressorname', 32, 'uint', 8);
            this._procField('depth', 'uint', 16);
            this._procField('pre_defined3', 'int', 16);
            // Codec-specific fields
            this._procSubBoxes('config', 1);
        }
    },
    {
        source: 'AV1 Sample Entry, AV1 Codec ISO Media File Format Binding https://aomediacodec.github.io/av1-isobmff/',
        field: 'av01',
        _parser: function () {
            // SampleEntry fields
            this._procFieldArray('reserved1', 6, 'uint', 8);
            this._procField('data_reference_index', 'uint', 16);
            // VisualSampleEntry fields
            this._procField('pre_defined1', 'uint', 16);
            this._procField('reserved2', 'uint', 16);
            this._procFieldArray('pre_defined2', 3, 'uint', 32);
            this._procField('width', 'uint', 16);
            this._procField('height', 'uint', 16);
            this._procField('horizresolution', 'template', 32);
            this._procField('vertresolution', 'template', 32);
            this._procField('reserved3', 'uint', 32);
            this._procField('frame_count', 'uint', 16);
            this._procFieldArray('compressorname', 32, 'uint', 8);
            this._procField('depth', 'uint', 16);
            this._procField('pre_defined3', 'int', 16);
            // Codec-specific fields
            this._procSubBoxes('av1C', 1);
            this._procSubBoxes('colr', 1);
        }
    },
    {
        source: 'AV1 Sample Entry, AV1 Codec ISO Media File Format Binding https://aomediacodec.github.io/av1-isobmff/',
        field: 'av1C',
        _parser: function () {
            // modified to handle <8 bit data
            this._procField('av1C_config', 'uint', 32);
            this.marker = (this.av1C_config & 0x80000000) >>> 31; //1
            this.version = (this.av1C_config & 0x7F000000) >>> 24; //7
            this.seq_profile = (this.av1C_config & 0x00E00000) >>> 21; //3
            this.seq_level_idx_0 = (this.av1C_config & 0x001F0000) >>> 16; //5
            this.seq_tier_0 = (this.av1C_config & 0x00008000) >>> 15;//1
            this.high_bitdepth = (this.av1C_config & 0x00004000) >>> 14; //1
            this.twelve_bit = (this.av1C_config & 0x00002000) >>> 13; //1
            this.monochrome = (this.av1C_config & 0x00001000) >>> 12; //1
            this.chroma_subsamping_x = (this.av1C_config & 0x00000800) >>> 11; //1
            this.chroma_subsampling_y = (this.av1C_config & 0x00000400) >>> 10; //1
            this.chroma_sample_position = (this.av1C_config & 0x00000300) >>> 8; //2
            this.reserved_1 = (this.av1C_config & 0x00000070) >>> 5; //3
            this.initial_presentation_delay_present = (this.av1C_config & 0x00000010) >>> 4; //1
            if (this.initial_presentation_delay_present) {
                this.initial_presentation_delay_minus_one = (this.av1C_config & 0x0000000F) >>> 0; //4
            } else {
                this.reserved_2 = (this.av1C_config & 0x0000000F) >>> 0; //4
            }
            this._procFieldArray('configOBUs', this.size - 4 - 4 - 4, 'uint', 8); //4 bytes length, 4 bytes 'av1C', 4 bytes for above
        }
    },
    {
        source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 mp4a box (use AudioSampleEntry definition and naming)',
        field: 'enca',
        _parser: function () {
            // SampleEntry fields
            this._procFieldArray('reserved1', 6, 'uint', 8);
            this._procField('data_reference_index', 'uint', 16);
            // AudioSampleEntry fields
            this._procFieldArray('reserved2', 2, 'uint', 32);
            this._procField('channelcount', 'uint', 16);
            this._procField('samplesize', 'uint', 16);
            this._procField('pre_defined', 'uint', 16);
            this._procField('reserved3', 'uint', 16);
            this._procField('samplerate', 'template', 32);
            // ESDescriptor fields //MODIFIED TO MAKE IT A BOX PARSER
            this._procSubBoxes('esds', 1);
        }
    },
    {
        source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 mp4a box (use AudioSampleEntry definition and naming)',
        field: 'mp4a',
        _parser: function () {
            // SampleEntry fields
            this._procFieldArray('reserved1', 6, 'uint', 8);
            this._procField('data_reference_index', 'uint', 16);
            // AudioSampleEntry fields
            this._procFieldArray('reserved2', 2, 'uint', 32);
            this._procField('channelcount', 'uint', 16);
            this._procField('samplesize', 'uint', 16);
            this._procField('pre_defined', 'uint', 16);
            this._procField('reserved3', 'uint', 16);
            this._procField('samplerate', 'template', 32);
            // ESDescriptor fields //MODIFIED TO MAKE IT A BOX PARSER
            this._procSubBoxes('esds', 1);
        }
    },
    {
        source: 'ISO/IEC 14496-1',
        field: 'esds',
        _parser: function () {
            //esds box
            this._procField('version', 'uint', 8);
            this._procField('ESDS_flag', 'uint', 24); //TODO deal with ESDS flag options
            /*
             bit(1) streamDependenceFlag;  
             bit(1) URL_Flag;  
             bit(1) OCRstreamFlag;  
             bit(5) streamPriority;  
             if (streamDependenceFlag)   bit(16) dependsOn_ES_ID;  
             if (URL_Flag) {   bit(8) URLlength;   bit(8) URLstring[URLlength];  }  
             if (OCRstreamFlag)   bit(16) OCR_ES_Id; 
             */
            // MP4ES Descriptor tag - 03
            this._procField('ES_tag', 'uint', 8);
            this._procField('ES_size', 'uint', 8);
            this._procField('ES_ID', 'uint', 16);
            this._procField('priority', 'uint', 8);
            // Mp4 Decoder Config Descriptor - 04
            this._procField('Dec_tag', 'uint', 8);
            this._procField('Dec_size', 'uint', 8);
            this._procField('Dec_type', 'uint', 8);
            // Stream_Flag holds 6 bits of stream type, 1 bit 'upstream flag' and 1 bit reserved=1
            this._procField('Stream_flag', 'uint', 8);
            this._procField('buffer_size', 'uint', 24);
            this._procField('maximum_BR', 'uint', 32);
            this._procField('average_BR', 'uint', 32);
            // MP4 Decoder Specific Config -05
            this._procField('Specific_tag', 'uint', 8);
            this._procField('Spec_size', 'uint', 8);
            this._procFieldArray('Spec_values', this.Spec_size, 'uint', 8);
            // SL Config Descriptor -06
            this._procField('SL_config_tag', 'uint', 8);
            this._procField('SL_config_size', 'uint', 8); //TODO scale by SL config size
            this._procField('SL', 'uint', 8);
        }
    },
    {
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
        source: 'ISO/IEC 14496-12:2012 - 8.12.5 Scheme Type Box',
        field: 'schm',
        _parser: function () {
            this._procFullBox();
            // turn this into a 4-byte array since it's actually text
            this._procFieldArray('scheme_type', 4, 'uint', 8);
            this._procField('scheme_version', 'uint', 32);

            if (this.flags & 0x000001) {
                this._procField('scheme_uri', 'string', -1);
            }
        }
    },
    {
        source: 'ISO 14496-15 avc decoder configuration',
        field: 'avcC',
        _parser: function () {
            this._procFullBox();
            this._procField('configuration_version', 'uint', 8);
            this._procField('AVC_profile_indication', 'uint', 8);
            this._procField('profile_compatibility', 'uint', 8);
            this._procField('configuration_version', 'uint', 8);
            this._procField('reserved1', 'bit', 6); //TODO Fix using Bitwise workaround with _config parameter
            this._procField('length_size_minus_one', 'uint', 2)
            this._procField('reserved1', 'bit', 3);
            this._procField('num_of_sequence_parameter_sets', 'uint', 5);
            // sequenceparamater
            this._procField('num_of_picture_parameter_sets', 'uint', 8);
            //picture parameters
            // if this.profile_idc == 100 || 110 || 122 || 144
            /*
             {   bit(6) reserved = ‘111111’b;   unsigned int(2) chroma_format;   bit(5) reserved = ‘11111’b;   unsigned int(3) bit_depth_luma_minus8;   bit(5) reserved = ‘11111’b;   unsigned int(3) bit_depth_chroma_minus8;   unsigned int(8) numOfSequenceParameterSetExt;   for (i=0; i< numOfSequenceParameterSetExt; i++) {    unsigned int(16) sequenceParameterSetExtLength;    bit(8*sequenceParameterSetExtLength) sequenceParameterSetExtNALUnit;   }  }
            */
        }
    },
    {
        source: 'Quicktime',
        field: 'pasp',
        _parser: function () {
            this._procField('h_spacing', 'uint', 32);
            this._procField('v_spacing', 'uint', 32);
        }
    },
    {
        source: 'Quicktime',
        field: 'colr',
        _parser: function () {
            this._procField('color_param_type', 'string', 4);
            this._procField('primaries_index', 'uint', 16);
            this._procField('transfer_func_index', 'uint', 16);
            this._procField('matrix_index', 'uint', 16);
        }
    },
    {
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
                    //console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

                    return combined;
            }
            if (uuidString === '4E6574666C6978506966665374726D21') {
                console.log('NetflixPiffStream found !');
                /*
                function (a, b) { m(a, b); a.fileSize = b.Se(); a.X2 = b.Se(); a.duration = b.Se(); a.lka = b.Se(); a.Alb = b.Se(); 1 <= a.version && (a.cjb = b.Se(), a.djb = b.Ba(), a.mka = b.Se(), a.Gfa = b.Ba(), a.xfa = b.Jz()); }
                Se = cd(8)
                cd = function (a) { for (var b = 0; a--;)b = 256 * b + this.buffer[this.position++]; return b; }
                
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
            } else if (uuidString === 'A2394F525A9B4F14A2446C427C648DF4') {
                console.log('Netflix senc box found!')
                this._procField('flags', 'uint', 32);
                this._procField('sample_count', 'uint', 32);
                if (this.flags & 1) {
                    this._procField('IV_size', 'uint', 8);
                }
                this._procEntries('senc_samples', this.sample_count, function (entry) {
                    this._procEntryField(entry, 'InitializationVector', 'data', 8);
                    if (this.flags & 2) {
                        this._procEntryField(entry, 'subsample_count', 'uint', 16);
                        this._procSubEntries(entry, 'subsamples', entry.subsample_count, function (subsample) {
                            this._procEntryField(subsample, 'BytesOfClearData', 'uint', 16);
                            this._procEntryField(subsample, 'BytesOfEncryptedData', 'uint', 32);
                        });
                    }
                });
            }
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
const getISOData = (key, value, boxIdentifier = '') => {
    // little helper that returns the type
    const valueType = Object.prototype.toString.call(value).match(/ (\w+)\]/i)[1];

    // 1) Handle Arrays of numbers
    // 2) Handle Arrays of things represented by numbers (pssh:SystemID, pssh:Data possibly (for PlayReady) for example)
    // 3) Handle lookups (psshLookup)
    // 4) Handle Arrays of plain Objects (eg. entries, references, samples) -- note * usually includes *_count !
    // 5) Handle raw binary (Uint8Array)
    const handleArray = {
        'Object': (value, excludeKeys = false) => value.map((item, index) => {
            const cleanEntry = { ...item };
            if (Object.keys(cleanEntry).includes('sample_flags')) cleanEntry.sample_flags = handleArray.LongSampleDependency(cleanEntry.sample_flags)
            if (excludeKeys) excludeKeys.forEach(key => delete cleanEntry[key]);
            cleanEntry.entryNumber = index + 1;
            return cleanEntry;
        }),
        'String': value => value.join(', '),
        'Number': value => value.join(', '),
        'SampleDependency': value => {
            const flags = [
                { flag: 'is_leading', bitmask: 0b11000000, shift: 6, 0: 'unknown', 1: 'is leading, dependency before', 2: 'not leading', 3: 'is leading, no dependency' },
                { flag: 'sample_depends_on', bitmask: 0b00110000, shift: 4, 0: 'unknown', 1: 'depends on others (not an I frame)', 2: 'does not depend (I frame)' },
                { flag: 'sample_is_depended_on', bitmask: 0b00001100, shift: 2, 0: 'unknown', 1: 'not disposable', 2: 'disposable' },
                { flag: 'sample_has_redundancy', bitmask: 0b00000011, shift: 0, 0: 'unknown', 1: 'has redundant coding', 2: 'has no redundant coding' }
            ];
            return value.map((item, index) => {
                // do a bit comparison and return the lookup
                const cleanEntry = flags.reduce((summary, flag) => {
                    summary[flag.flag] = flag[(item & flag.bitmask) >> flag.shift]
                    return summary;
                }, {});
                cleanEntry.entryNumber = index + 1;
                return cleanEntry
            })
        },
        'LongSampleDependency': value => {
            /*
            bit(4)	reserved=0;
            unsigned int(2) is_leading;
            unsigned int(2) sample_depends_on;
            unsigned int(2) sample_is_depended_on;
            unsigned int(2) sample_has_redundancy;
            bit(3)	sample_padding_value;
            bit(1)	sample_is_non_sync_sample;
            unsigned int(16)	sample_degradation_priority;
            */
            const flags = [
                { name: 'reserved1', bitmask: 0b11110000000000000000000000000000, shift: 28 },
                { name: 'is_leading', bitmask: 0b00001100000000000000000000000000, shift: 26, 0: 'unknown', 1: 'is leading, dependency before', 2: 'not leading', 3: 'is leading, no dependency' },
                { name: 'sample_depends_on', bitmask: 0b00000011000000000000000000000000, shift: 24, 0: 'unknown', 1: 'depends on others (not an I frame)', 2: 'does not depend (I frame)' },
                { name: 'sample_is_depended_on', bitmask: 0b00000000110000000000000000000000, shift: 22, 0: 'unknown', 1: 'not disposable', 2: 'disposable' },
                { name: 'sample_has_redundancy', bitmask: 0b00000000001100000000000000000000, shift: 20, 0: 'unknown', 1: 'has redundant coding', 2: 'has no redundant coding' },
                { name: 'sample_padding_value', bitmask: 0b00000000000011100000000000000000, shift: 17 },
                { name: 'sample_is_non_sync_sample', bitmask: 0b00000000000000010000000000000000, shift: 16, 0: 'sync sample', 1: 'not a sync sample' },
                { name: 'sample_degredation_priority', bitmask: 0b00000000000000001111111111111111, shift: 0 }
            ];
            // do a bit comparison and return the lookup
            // first, if it's an array then return an array
            if (Array.isArray(value)) return value.map((item, index) => {
                // do a bit comparison and return the lookup
                const cleanEntry = flags.reduce((summary, flag) => {
                    summary[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                    return summary;
                }, {});
                cleanEntry.entryNumber = index + 1;
                return cleanEntry
            })
            // otherwise, if it's a single value, just return a single value
            return [].concat(flags.reduce((summary, flag) => {
                summary[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                return summary;
            }, { entryNumber: 1 }));
        },
        'senc_samples': value => value.map((item, index) => {
            const cleanEntry = { ...item, InitializationVector: convertToHex(item.InitializationVector) };
            // add an entry number to each subsample entry, using the index in the subsample array + 1
            cleanEntry.subsamples = cleanEntry.subsamples.map((subsample, subEntryNo) => ({ ...subsample, entryNumber: subEntryNo + 1 }));
            cleanEntry.entryNumber = index + 1;
            return cleanEntry;
        }),
        'ESDescriptor': value => {
            // bit(6) Stream type
            // bit(1) Upstream Flag
            // bit(1) reserved = 1
            const flags = [
                { name: 'Stream_type', bitmask: 0b11111100, shift: 2, 0: 'Forbidden', 1: 'ObjectDescriptorStream', 2: 'ClockReferenceStream', 3: 'SceneDescriptionStream', 4: 'VisualStream', 5: 'AudioStream', 6: 'MPEG7 Stream', 7: '', 8: '', 9: '', 10: '', 11: '', },
                { name: 'upstream_flag', bitmask: 0b00000010, shift: 1 },
                { name: 'reserved_s', bitmask: 0b00000001, shift: 0 }
            ]
            return [].concat(flags.reduce((result, flag) => {
                result[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                return result;
            }, { entryNumber: 1 }));
        },
        'DecoderType': value => {
            const typeLookup = {
                0x00: 'Forbidden',
                0x01: 'Systems ISO/IEC 14496-1',
                0x02: 'Systems ISO/IEC 14496-1',
                0x03: 'Interaction Stream',
                0x04: 'Systems ISO/IEC 14496-1 Extended BIFS Configuration',
                0x05: 'Systems ISO/IEC 14496-1 AFX',
                0x06: 'Font Data Stream',
                0x07: 'Synthesized Texture Stream',
                0x08: 'Streaming Text Stream',
                0x20: 'Visual ISO/IEC 14496-2',
                0x21: 'Visual ITU-T Recommendation H.264 | ISO/IEC 14496-10',
                0x22: 'Parameter Sets for ITU-T Recommendation H.264 | ISO/IEC 14496-10',
                0x40: 'Audio ISO/IEC 14496-3',
                0x60: 'Visual ISO/IEC 13818-2 Simple Profile',
                0x61: 'Visual ISO/IEC 13818-2 Main Profile',
                0x62: 'Visual ISO/IEC 13818-2 SNR Profile',
                0x63: 'Visual ISO/IEC 13818-2 Spatial Profile',
                0x64: 'Visual ISO/IEC 13818-2 High Profile',
                0x65: 'Visual ISO/IEC 13818-2 422 Profile',
                0x66: 'Audio ISO/IEC 13818-7 Main Profile',
                0x67: 'Audio ISO/IEC 13818-7 LowComplexity Profile',
                0x68: 'Audio ISO/IEC 13818-7 Scaleable Sampling Rate Profile',
                0x69: 'Audio ISO/IEC 13818-3',
                0x6A: 'Visual ISO/IEC 11172-2',
                0x6B: 'Audio ISO/IEC 11172-3',
                0x6C: 'Visual ISO/IEC 10918-1',
                0xFF: 'no object type specified'
            }
            return typeLookup[value] || 'reserved for ISO use';
        }
    }


    // 5) Handle raw binary
    if (valueType === 'Uint8Array') {
        return convertToHex(value) // an array of hex strings, each 16 bytes wide, max of 64 rows
    }
    // Handle arrays of ...
    if (valueType === "Array") {
        // get the type of the first element
        const elementType = Object.prototype.toString.call(value[0]).match(/ (\w+)\]/i)[1];
        // first check for special handling by key
        switch (key) {
            case 'SystemID':
                return `${convertToHex(value)} (${psshLookup[convertToHex(value)]})`;
            case 'Data':
                if (boxIdentifier.includes('WideVine')) {
                    try {
                        const pbf = new Pbf(value);
                        const license = WidevinePsshData.read(pbf);
                        console.log('license read:', license);
                        // formatting

                        return Object.keys(license).reduce((formatted, key) => {
                            let value = '';
                            switch (key) {
                                case 'algorithm':
                                    value = license[key] == 1 ? 'AESCTR' : license[key] == 0 ? 'unencrypted' : null;
                                    break;
                                case 'key_id':
                                    value = Array.isArray(license[key]) ? license[key].map(val => formatUuid(val)).join(', ') : formatUuid(license[key])
                                    break;
                                case 'content_id':
                                    value = license[key] ? String.fromCharCode.apply(null, license[key]) : null;
                                    break;
                                case 'protection_scheme':
                                    if (license[key] != 9999) {
                                        // kind of hacky - it's a uint32 which is really a string (like 'cenc'). So - convert to hex, split into bytes, make Uint8Array, convert each byte to string
                                        value = String.fromCharCode.apply(null, Uint8Array.from(license[key].toString(16).padStart(8, 0).replace(/(\S{2})/g, "0x$1,").split(',').slice(0, 4)));
                                    } else {
                                        value = null;
                                    }
                                    break;
                                default:
                                    value = parseInt(license[key], 10) != 9999 ? license[key] : null;
                            }
                            if (value !== null) formatted[key] = value;
                            return formatted;
                        }, {});
                    } catch (e) {
                        return value.map(b => String.fromCharCode(b)).join('')
                    }
                } else if (boxIdentifier.includes('FairPlay')) {
                    // Netflix specific, looks like 44 bytes total
                    // 4 bytes? 00 00 00 04
                    // 8 bytes KID 00 00 00 00 05 79 2B DD
                    // 32 bytes? D8 08 6B 6F 6F 15 24 37  03 7E 52 3A DD F0 77 28  15 BB 6D CB FC 56 0C E9  73 4A 86 B3 9C 1C EB 45
                } else {
                    return value.map(b => String.fromCharCode(b)).join('');
                }
                
            case 'compressorname':
                return value.map(b => String.fromCharCode(b)).join('');
            case 'usertype':
                return `${formatUuid(value)} (${value.map(b => String.fromCharCode(b)).join('')})\n${convertToHex(value._data)}`;
            case 'xfa_KID?':
                return `${formatUuid(value)}`;
            case 'default_KID':
                return `${formatUuid(value)}`;
            case 'sample_dependency_table':
                return handleArray.SampleDependency(value);
            case 'sample_flags':
                return handleArray.LongSampleDependency(value);
            case 'references':
                return handleArray[elementType](value, ['sap', 'reference']);
            case 'senc_samples':
                return handleArray.senc_samples(value);
            case 'data_format': case 'scheme_type': case 'aux_info_type':
                return value.map(b => String.fromCharCode(b)).join('');
            case 'Stream_flag':
                return handleArray.ESDescriptor(value);
            case 'Dec_type':
                return handleArray.DecoderType(value);
            case 'configOBUs':
                return `${convertToHex(value)}`;
            default: // Otherwise handle based on type of the first entry
                return value[0] ? handleArray[elementType](value) : [];
        }
    }

    // handle special cases that aren't arrays
    switch (key) {
        case 'default_sample_flags': case 'first_sample_flags':
            return handleArray.LongSampleDependency(value);
        case 'Stream_flag':
            return handleArray.ESDescriptor(value);
        case 'Dec_type':
            return handleArray.DecoderType(value);
        case 'flags':
            return `0x${value.toString(16).padStart(2, '0').toUpperCase()}`;
        default:
            return value;
    }
}

// TODO: fix subsample handling !!
const postProcess = boxes => {
    return boxes.map(box => {
        const keyList = box.keys;
        const { type, start, size, hex } = { ...box };
        let boxContents, boxes;
        if (keyList.length) {
            boxContents = keyList.map(key => {
                // first check if the key is for sub-boxes
                if (key.includes('__altered')) return { name: key.split('__altered')[0], start, size, boxes: postProcess(box[key]) };
                // if the value of that key contains an array, map it to the new format
                /* if (key !== 'data' && Array.isArray(box[key]) && box[key].length) return box[key].map(entry => {
                    const entryKeys = Object.keys(entry);
                    return entryKeys.map(entryKey => ({ name: entryKey, display: entry[entryKey] }));
                }); */
                if (key === 'config') return { name: key, display: null, hex: box[key] }
                if (key === 'av1C_config') return { name: key, display: null, hex: null };
                return { name: key, display: box[key], hex: hex || null }
            })
        }
        // Merge the boxContents with sub-boxes if applicable. If it has sub-boxes recurse to process those
        const subBoxes = box.boxes && box.boxes.length ? postProcess(box.boxes) : null;
        if (!boxContents) {
            //no keys, must be just a container box
            boxes = subBoxes;
        } else if (!subBoxes) {
            //no subBoxes, but has contents, just a bottom-level box
            boxes = boxContents
        } else if (boxContents && subBoxes) {
            //has both its own contents and subboxes
            boxes = boxContents.concat(subBoxes);
        }
        return { type, start, size, boxes, hex: box.type === 'mdat' || box.type === 'free' ? hex : null };
    });
}

const mappedKey = (oldKey, box) => {
    switch (oldKey) {
        case '_offset': return { newKey: 'start', value: box[oldKey] };
        case '_data': case 'data': return { newKey: 'hex', value: box[oldKey] };
        default: return { newKey: oldKey, value: box[oldKey] };
    }
}


// fist stage of processing, filter out generic or unneeded keys.
const convertBox = boxes => {

    const HIDE_KEYS = new Set(['type', 'start', 'end', '_offset', '_data', 'size', 'hex']);

    return boxes.reduce((result, box) => {
        if (box._incomplete) console.log(`${box.type} payload not parsed due to missing bytes`);
        const keys = Object.keys(box).filter(key => !/^_/i.test(key) || key === '_offset' || key === '_data');
        return result.concat(
            keys.reduce((newBox, key) => {
                // recurse if the contents of a key are other ISOBoxes.
                // console.log('');
                if (key === 'boxes' || (Array.isArray(box[key]) && box[key][0] && box[key][0].hasOwnProperty('_cursor'))) {
                    // for non-box keys, make it an __altered entry
                    if (key !== 'boxes') {
                        newBox.keys.push(`${key}__altered`);
                        newBox[`${key}__altered`] = convertBox(box[key]);
                    } else {
                        // if the key is boxes, recurse to return a converted key
                        newBox[key] = convertBox(box[key])
                    }
                } else {
                    if (key !== '_data' || (box.type === 'uuid' && key === '_data')) {
                        const { newKey, value } = mappedKey(key, box);
                        newBox[newKey] = getISOData(key, value, newKey == 'Data' ? newBox.SystemID : '');
                        if (!HIDE_KEYS.has(newKey)) newBox.keys.push(newKey);
                    }
                }
                return newBox;
            }, { keys: [] })
        );
    }, []);
}

const getBoxList = async (collection, resultMap) => {

    let counter = 0;

    const addElements = (elemList, parentPath) => new Promise((resolve, reject) => {
        // first add all of the elements at this node
        elemList.forEach(elem => {
            // only add items with a 'type' (ie, box definition) -- extend for special cases like encv entries
            if (!!elem.type || elem.name === 'entries') {
                // get all children
                const boxContents = !!elem.boxes && elem.boxes.reduce((allChildren, current) => {
                    if (!!current.type) allChildren.children.push({ box: current.type, start: current.start });
                    if (!!current.name && elem.type === 'stsd' && current.name === 'entries') allChildren.children.push({ box: current.boxes[0].type, start: current.boxes[0].start })
                    if (!!current.name) allChildren.values.push(current);
                    return allChildren;
                }, { children: [], values: [] });
                resultMap.set({ box: elem.type, start: elem.start }, { name: elem.type, parent: parentPath, children: boxContents.children, values: boxContents.values, hex: elem.hex });
                console.log('extracted element', elem);
                // now check for sub-boxes that are not null
                if (!!elem.boxes) {
                    //quick check to see if the boxes have types
                    const validBoxes = elem.boxes.reduce((newList, box) => {
                        if (!!box.type) {
                            newList.push(box);
                        } else if (box.name && box.name === 'entries' && box.boxes) {
                            newList.push(box.boxes[0]);
                        }
                        return newList;
                    }, []);
                    //recurse any sub-boxes
                    if (validBoxes.length) {
                        counter++;
                        return addElements(validBoxes, parentPath.concat(elem.type));
                    }
                }
            }
        });
        counter--;
        if (counter == 0) return resolve(resultMap);
    });

    // start the chain using the full collection
    counter++;
    return await addElements(collection, []);
}

module.exports = {
    getISOData,
    psshLookup,
    additionalBoxes,
    postProcess,
    convertBox,
    getBoxList
}