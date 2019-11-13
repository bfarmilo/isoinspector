module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/isoinspector/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "97RM":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "Bcfi":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "HVeQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1I2EN","boxName":"boxName__26nav","boxContainer":"boxContainer__1jDYD","subBox":"subBox__1KWXu","boxProp":"boxProp__31O6F","boxContents":"boxContents__3uHwf","arrayEntry":"arrayEntry__zS5vz","hexEntry":"hexEntry__1Mnjz"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/codem-isoboxer/dist/iso_boxer.js
var iso_boxer = __webpack_require__("unQC");
var iso_boxer_default = /*#__PURE__*/__webpack_require__.n(iso_boxer);

// CONCATENATED MODULE: ./components/ebmlSchema.js
var schema = new Map([[0x80, {
    name: 'ChapterDisplay',
    level: 4,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: true,
    description: 'Contains all possible strings to use for the chapter display.'
}], [0x83, {
    name: 'TrackType',
    level: 3,
    type: 'u',
    multiple: false,
    mandatory: true,
    minver: 1,
    range: '1-254',
    description: 'A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control).',
    webm: false
}], [0x85, {
    name: 'ChapString',
    cppname: 'ChapterString',
    level: 5,
    type: '8',
    multiple: false,
    mandatory: true,
    minver: 1,
    webm: true,
    description: 'Contains the string to use as the chapter atom.'
}], [0x86, {
    name: 'CodecID',
    level: 3,
    type: 's',
    mandatory: true,
    minver: 1,
    description: 'An ID corresponding to the codec, see the codec page for more info.',
    multiple: false,
    webm: false
}], [0x88, {
    name: 'FlagDefault',
    cppname: 'TrackFlagDefault',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    default: 1,
    range: '0-1',
    description: 'Set if that track (audio, video or subs) SHOULD be active if no language found matches the user preference. (1 bit)',
    multiple: false,
    webm: false
}], [0x89, {
    name: 'ChapterTrackNumber',
    level: 5,
    type: 'u',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    range: 'not 0',
    description: 'UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks.'
}], [0x91, {
    name: 'ChapterTimeStart',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: true,
    description: 'Timestamp of the start of Chapter (not scaled).',
    multiple: false
}], [0x92, {
    name: 'ChapterTimeEnd',
    level: 4,
    type: 'u',
    minver: 1,
    webm: false,
    description: 'Timestamp of the end of Chapter (timestamp excluded, not scaled).',
    multiple: false
}], [0x96, {
    name: 'CueRefTime',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 2,
    webm: false,
    description: 'Timestamp of the referenced Block.',
    multiple: false
}], [0x97, {
    name: 'CueRefCluster',
    level: 5,
    type: 'u',
    mandatory: true,
    webm: false,
    description: 'The Position of the Cluster containing the referenced Block.',
    minver: 0,
    multiple: false
}], [0x98, {
    name: 'ChapterFlagHidden',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    range: '0-1',
    description: 'If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)',
    multiple: false
}], [0x4254, {
    name: 'ContentCompAlgo',
    level: 6,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    br: ['', '', '', ''],
    del: ['1 - bzlib,', '2 - lzo1x'],
    description: 'The compression algorithm used. Algorithms that have been specified so far are: 0 - zlib,   3 - Header Stripping',
    multiple: false
}], [0x4255, {
    name: 'ContentCompSettings',
    level: 6,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track.',
    multiple: false
}], [0x4282, {
    name: 'DocType',
    level: 1,
    type: 's',
    mandatory: true,
    default: 'matroska',
    minver: 1,
    description: "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files.",
    multiple: false,
    webm: false
}], [0x4285, {
    name: 'DocTypeReadVersion',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 1,
    minver: 1,
    description: 'The minimum DocType version an interpreter has to support to read this file.',
    multiple: false,
    webm: false
}], [0x4286, {
    name: 'EBMLVersion',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 1,
    minver: 1,
    description: 'The version of EBML parser used to create the file.',
    multiple: false,
    webm: false
}], [0x4287, {
    name: 'DocTypeVersion',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 1,
    minver: 1,
    description: 'The version of DocType interpreter used to create the file.',
    multiple: false,
    webm: false
}], [0x4444, {
    name: 'SegmentFamily',
    level: 2,
    type: 'b',
    multiple: true,
    minver: 1,
    webm: false,
    bytesize: 16,
    description: 'A randomly generated unique ID that all segments related to each other must use (128 bits).'
}], [0x4461, {
    name: 'DateUTC',
    level: 2,
    type: 'd',
    minver: 1,
    description: 'Date of the origin of timestamp (value 0), i.e. production date.',
    multiple: false,
    webm: false
}], [0x4484, {
    name: 'TagDefault',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 1,
    range: '0-1',
    description: 'Indication to know if this is the default/original language to use for the given tag. (1 bit)',
    multiple: false
}], [0x4485, {
    name: 'TagBinary',
    level: 4,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString.',
    multiple: false
}], [0x4487, {
    name: 'TagString',
    level: 4,
    type: '8',
    minver: 1,
    webm: false,
    description: 'The value of the Tag.',
    multiple: false
}], [0x4489, {
    name: 'Duration',
    level: 2,
    type: 'f',
    minver: 1,
    range: '> 0',
    description: 'Duration of the segment (based on TimecodeScale).',
    multiple: false,
    webm: false
}], [0x4598, {
    name: 'ChapterFlagEnabled',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 1,
    range: '0-1',
    description: 'Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter (see flag notes). (1 bit)',
    multiple: false
}], [0x4660, {
    name: 'FileMimeType',
    level: 3,
    type: 's',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'MIME type of the file.',
    multiple: false
}], [0x4661, {
    name: 'FileUsedStartTime',
    level: 3,
    type: 'u',
    divx: true,
    description: 'DivX font extension',
    multiple: false
}], [0x4662, {
    name: 'FileUsedEndTime',
    level: 3,
    type: 'u',
    divx: true,
    multiple: false,
    description: 'DivX font extension'
}], [0x4675, {
    name: 'FileReferral',
    level: 3,
    type: 'b',
    webm: false,
    description: 'A binary value that a track/codec can refer to when the attachment is needed.',
    multiple: false
}], [0x5031, {
    name: 'ContentEncodingOrder',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    multiple: false,
    description: 'Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment.'
}], [0x5032, {
    name: 'ContentEncodingScope',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 1,
    range: 'not 0',
    br: ['', '', ''],
    description: "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values: 1 - all frame contents, 2 - the track's private data, 4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)",
    multiple: false
}], [0x5033, {
    name: 'ContentEncodingType',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    br: ['', ''],
    description: 'A value describing what kind of transformation has been done. Possible values: 0 - compression, 1 - encryption',
    multiple: false
}], [0x5034, {
    name: 'ContentCompression',
    level: 5,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking.',
    multiple: false
}], [0x5035, {
    name: 'ContentEncryption',
    level: 5,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise.',
    multiple: false
}], [0x5378, {
    name: 'CueBlockNumber',
    level: 4,
    type: 'u',
    minver: 1,
    default: 1,
    range: 'not 0',
    description: 'Number of the Block in the specified Cluster.',
    multiple: false
}], [0x5654, {
    name: 'ChapterStringUID',
    level: 4,
    type: '8',
    mandatory: false,
    minver: 3,
    webm: true,
    description: 'A unique string ID to identify the Chapter. Use for WebVTT cue identifier storage.',
    multiple: false
}], [0x5741, {
    name: 'WritingApp',
    level: 2,
    type: '8',
    mandatory: true,
    minver: 1,
    multiple: false,
    description: 'Writing application ("mkvmerge-0.3.3").'
}], [0x5854, {
    name: 'SilentTracks',
    cppname: 'ClusterSilentTracks',
    level: 2,
    type: 'm',
    minver: 1,
    multiple: false,
    webm: false,
    description: 'The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use.'
}], [0x6240, {
    name: 'ContentEncoding',
    level: 4,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Settings for one content encoding like compression or encryption.'
}], [0x6264, {
    name: 'BitDepth',
    cppname: 'AudioBitDepth',
    level: 4,
    type: 'u',
    minver: 1,
    range: 'not 0',
    multiple: false,
    description: 'Bits per sample, mostly used for PCM.'
}], [0x6532, {
    name: 'SignedElement',
    level: 3,
    type: 'b',
    multiple: true,
    webm: false,
    description: 'An element ID whose data will be used to compute the signature.'
}], [0x6624, {
    name: 'TrackTranslate',
    level: 3,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'The track identification for the given Chapter Codec.'
}], [0x6911, {
    name: 'ChapProcessCommand',
    cppname: 'ChapterProcessCommand',
    level: 5,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Contains all the commands associated to the Atom.'
}], [0x6922, {
    name: 'ChapProcessTime',
    cppname: 'ChapterProcessTime',
    level: 6,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter).'
}], [0x6924, {
    name: 'ChapterTranslate',
    level: 2,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'A tuple of corresponding ID used by chapter codecs to represent this segment.'
}], [0x6933, {
    name: 'ChapProcessData',
    cppname: 'ChapterProcessData',
    level: 6,
    type: 'b',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands.'
}], [0x6944, {
    name: 'ChapProcess',
    cppname: 'ChapterProcess',
    level: 4,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Contains all the commands associated to the Atom.'
}], [0x6955, {
    name: 'ChapProcessCodecID',
    cppname: 'ChapterProcessCodecID',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later.'
}], [0x7373, {
    name: 'Tag',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Element containing elements specific to Tracks/Chapters.'
}], [0x7384, {
    name: 'SegmentFilename',
    level: 2,
    type: '8',
    minver: 1,
    webm: false,
    description: 'A filename corresponding to this segment.'
}], [0x7446, {
    name: 'AttachmentLink',
    cppname: 'TrackAttachmentLink',
    level: 3,
    type: 'u',
    minver: 1,
    webm: false,
    range: 'not 0',
    description: 'The UID of an attachment that is used by this codec.'
}], [0x258688, {
    name: 'CodecName',
    level: 3,
    type: '8',
    minver: 1,
    description: 'A human-readable string specifying the codec.'
}], [0x18538067, {
    name: 'Segment',
    level: 0,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment.'
}], [0x447a, {
    name: 'TagLanguage',
    level: 4,
    type: 's',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 'und',
    description: 'Specifies the language of the tag specified, in the Matroska languages form.'
}], [0x45a3, {
    name: 'TagName',
    level: 4,
    type: '8',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The name of the Tag that is going to be stored.'
}], [0x67c8, {
    name: 'SimpleTag',
    cppname: 'TagSimple',
    level: 3,
    recursive: true,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Contains general information about the target.'
}], [0x63c6, {
    name: 'TagAttachmentUID',
    level: 4,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment.'
}], [0x63c4, {
    name: 'TagChapterUID',
    level: 4,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment.'
}], [0x63c9, {
    name: 'TagEditionUID',
    level: 4,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment.'
}], [0x63c5, {
    name: 'TagTrackUID',
    level: 4,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment.'
}], [0x63ca, {
    name: 'TargetType',
    cppname: 'TagTargetType',
    level: 4,
    type: 's',
    minver: 1,
    webm: false,
    strong: 'informational',
    description: 'An  string that can be used to display the logical level of the target like "ALBUM", "TRACK", "MOVIE", "CHAPTER", etc (see TargetType).'
}], [0x68ca, {
    name: 'TargetTypeValue',
    cppname: 'TagTargetTypeValue',
    level: 4,
    type: 'u',
    minver: 1,
    webm: false,
    default: 50,
    description: 'A number to indicate the logical level of the target (see TargetType).'
}], [0x63c0, {
    name: 'Targets',
    cppname: 'TagTargets',
    level: 3,
    type: 'm',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment.'
}], [0x1254c367, {
    name: 'Tags',
    level: 1,
    type: 'm',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here.'
}], [0x450d, {
    name: 'ChapProcessPrivate',
    cppname: 'ChapterProcessPrivate',
    level: 5,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the "DVD level" equivalent.'
}], [0x437e, {
    name: 'ChapCountry',
    cppname: 'ChapterCountry',
    level: 5,
    type: 's',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'The countries corresponding to the string, same 2 octets as in Internet domains.'
}], [0x437c, {
    name: 'ChapLanguage',
    cppname: 'ChapterLanguage',
    level: 5,
    type: 's',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: true,
    default: 'eng',
    description: 'The languages corresponding to the string, in the bibliographic ISO-639-2 form.'
}], [0x8f, {
    name: 'ChapterTrack',
    level: 4,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'List of tracks on which the chapter applies. If this element is not present, all tracks apply'
}], [0x63c3, {
    name: 'ChapterPhysicalEquiv',
    level: 4,
    type: 'u',
    minver: 1,
    webm: false,
    description: 'Specify the physical equivalent of this ChapterAtom like "DVD" (60) or "SIDE" (50), see complete list of values.'
}], [0x6ebc, {
    name: 'ChapterSegmentEditionUID',
    level: 4,
    type: 'u',
    minver: 1,
    webm: false,
    range: 'not 0',
    description: 'The EditionUID to play from the segment linked in ChapterSegmentUID.'
}], [0x6e67, {
    name: 'ChapterSegmentUID',
    level: 4,
    type: 'b',
    minver: 1,
    webm: false,
    range: '>0',
    bytesize: 16,
    description: 'A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used.'
}], [0x73c4, {
    name: 'ChapterUID',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: true,
    range: 'not 0',
    description: 'A unique ID to identify the Chapter.'
}], [0xb6, {
    name: 'ChapterAtom',
    level: 3,
    recursive: true,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: true,
    description: 'Contains the atom information to use as the chapter atom (apply to all tracks).'
}], [0x45dd, {
    name: 'EditionFlagOrdered',
    level: 3,
    type: 'u',
    minver: 1,
    webm: false,
    default: 0,
    range: '0-1',
    description: 'Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)'
}], [0x45db, {
    name: 'EditionFlagDefault',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    range: '0-1',
    description: 'If a flag is set (1) the edition should be used as the default one. (1 bit)'
}], [0x45bd, {
    name: 'EditionFlagHidden',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    range: '0-1',
    description: 'If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)'
}], [0x45bc, {
    name: 'EditionUID',
    level: 3,
    type: 'u',
    minver: 1,
    webm: false,
    range: 'not 0',
    description: "A unique ID to identify the edition. It's useful for tagging an edition."
}], [0x45b9, {
    name: 'EditionEntry',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: true,
    description: 'Contains all information about a segment edition.'
}], [0x1043a770, {
    name: 'Chapters',
    level: 1,
    type: 'm',
    minver: 1,
    webm: true,
    description: 'A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation.'
}], [0x46ae, {
    name: 'FileUID',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    range: 'not 0',
    description: 'Unique ID representing the file, as random as possible.'
}], [0x465c, {
    name: 'FileData',
    level: 3,
    type: 'b',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The data of the file.'
}], [0x466e, {
    name: 'FileName',
    level: 3,
    type: '8',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'Filename of the attached file.'
}], [0x467e, {
    name: 'FileDescription',
    level: 3,
    type: '8',
    minver: 1,
    webm: false,
    description: 'A human-friendly name for the attached file.'
}], [0x61a7, {
    name: 'AttachedFile',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    description: 'An attached file.'
}], [0x1941a469, {
    name: 'Attachments',
    level: 1,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'Contain attached files.'
}], [0xeb, {
    name: 'CueRefCodecState',
    level: 5,
    type: 'u',
    webm: false,
    default: 0,
    description: 'The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry.'
}], [0x535f, {
    name: 'CueRefNumber',
    level: 5,
    type: 'u',
    webm: false,
    default: 1,
    range: 'not 0',
    description: 'Number of the referenced Block of Track X in the specified Cluster.'
}], [0xdb, {
    name: 'CueReference',
    level: 4,
    type: 'm',
    multiple: true,
    minver: 2,
    webm: false,
    description: 'The Clusters containing the required referenced Blocks.'
}], [0xea, {
    name: 'CueCodecState',
    level: 4,
    type: 'u',
    minver: 2,
    webm: false,
    default: 0,
    description: 'The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry.'
}], [0xb2, {
    name: 'CueDuration',
    level: 4,
    type: 'u',
    mandatory: false,
    minver: 4,
    webm: false,
    description: "The duration of the block according to the segment time base. If missing the track's DefaultDuration does not apply and no duration information is available in terms of the cues."
}], [0xf0, {
    name: 'CueRelativePosition',
    level: 4,
    type: 'u',
    mandatory: false,
    minver: 4,
    webm: false,
    description: 'The relative position of the referenced block inside the cluster with 0 being the first possible position for an element inside that cluster.'
}], [0xf1, {
    name: 'CueClusterPosition',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    description: 'The position of the Cluster containing the required Block.'
}], [0xf7, {
    name: 'CueTrack',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    range: 'not 0',
    description: 'The track for which a position is given.'
}], [0xb7, {
    name: 'CueTrackPositions',
    level: 3,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Contain positions for different tracks corresponding to the timestamp.'
}], [0xb3, {
    name: 'CueTime',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    description: 'Absolute timestamp according to the segment time base.'
}], [0xbb, {
    name: 'CuePoint',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Contains all information relative to a seek point in the segment.'
}], [0x1c53bb6b, {
    name: 'Cues',
    level: 1,
    type: 'm',
    minver: 1,
    description: 'A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non "live" streams.'
}], [0x47e6, {
    name: 'ContentSigHashAlgo',
    level: 6,
    type: 'u',
    minver: 1,
    webm: false,
    default: 0,
    br: ['', ''],
    description: "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - SHA1-160 2 - MD5"
}], [0x47e5, {
    name: 'ContentSigAlgo',
    level: 6,
    type: 'u',
    minver: 1,
    webm: false,
    default: 0,
    br: '',
    description: "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - RSA"
}], [0x47e4, {
    name: 'ContentSigKeyID',
    level: 6,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'This is the ID of the private key the data was signed with.'
}], [0x47e3, {
    name: 'ContentSignature',
    level: 6,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'A cryptographic signature of the contents.'
}], [0x47e2, {
    name: 'ContentEncKeyID',
    level: 6,
    type: 'b',
    minver: 1,
    webm: false,
    description: 'For public key algorithms this is the ID of the public key the the data was encrypted with.'
}], [0x47e1, {
    name: 'ContentEncAlgo',
    level: 6,
    type: 'u',
    minver: 1,
    webm: false,
    default: 0,
    br: '',
    description: "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values: 1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES"
}], [0x6d80, {
    name: 'ContentEncodings',
    level: 3,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'Settings for several content encoding mechanisms like compression or encryption.'
}], [0xc4, {
    name: 'TrickMasterTrackSegmentUID',
    level: 3,
    type: 'b',
    divx: true,
    bytesize: 16,
    description: 'DivX trick track extenstions'
}], [0xc7, {
    name: 'TrickMasterTrackUID',
    level: 3,
    type: 'u',
    divx: true,
    description: 'DivX trick track extenstions'
}], [0xc6, {
    name: 'TrickTrackFlag',
    level: 3,
    type: 'u',
    divx: true,
    default: 0,
    description: 'DivX trick track extenstions'
}], [0xc1, {
    name: 'TrickTrackSegmentUID',
    level: 3,
    type: 'b',
    divx: true,
    bytesize: 16,
    description: 'DivX trick track extenstions'
}], [0xc0, {
    name: 'TrickTrackUID',
    level: 3,
    type: 'u',
    divx: true,
    description: 'DivX trick track extenstions'
}], [0xed, {
    name: 'TrackJoinUID',
    level: 5,
    type: 'u',
    mandatory: true,
    multiple: true,
    minver: 3,
    webm: false,
    range: 'not 0',
    description: 'The trackUID number of a track whose blocks are used to create this virtual track.'
}], [0xe9, {
    name: 'TrackJoinBlocks',
    level: 4,
    type: 'm',
    minver: 3,
    webm: false,
    description: 'Contains the list of all tracks whose Blocks need to be combined to create this virtual track'
}], [0xe6, {
    name: 'TrackPlaneType',
    level: 6,
    type: 'u',
    mandatory: true,
    minver: 3,
    webm: false,
    description: 'The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background).'
}], [0xe5, {
    name: 'TrackPlaneUID',
    level: 6,
    type: 'u',
    mandatory: true,
    minver: 3,
    webm: false,
    range: 'not 0',
    description: 'The trackUID number of the track representing the plane.'
}], [0xe4, {
    name: 'TrackPlane',
    level: 5,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 3,
    webm: false,
    description: 'Contains a video plane track that need to be combined to create this 3D track'
}], [0xe3, {
    name: 'TrackCombinePlanes',
    level: 4,
    type: 'm',
    minver: 3,
    webm: false,
    description: 'Contains the list of all video plane tracks that need to be combined to create this 3D track'
}], [0xe2, {
    name: 'TrackOperation',
    level: 3,
    type: 'm',
    minver: 3,
    webm: false,
    description: 'Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject.'
}], [0x7d7b, {
    name: 'ChannelPositions',
    cppname: 'AudioPosition',
    level: 4,
    type: 'b',
    webm: false,
    description: 'Table of horizontal angles for each successive channel, see appendix.'
}], [0x9f, {
    name: 'Channels',
    cppname: 'AudioChannels',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    default: 1,
    range: 'not 0',
    description: 'Numbers of channels in the track.'
}], [0x78b5, {
    name: 'OutputSamplingFrequency',
    cppname: 'AudioOutputSamplingFreq',
    level: 4,
    type: 'f',
    minver: 1,
    default: 'Sampling Frequency',
    range: '> 0',
    description: 'Real output sampling frequency in Hz (used for SBR techniques).'
}], [0xb5, {
    name: 'SamplingFrequency',
    cppname: 'AudioSamplingFreq',
    level: 4,
    type: 'f',
    mandatory: true,
    minver: 1,
    default: '8000.0',
    range: '> 0',
    description: 'Sampling frequency in Hz.'
}], [0xe1, {
    name: 'Audio',
    cppname: 'TrackAudio',
    level: 3,
    type: 'm',
    minver: 1,
    description: 'Audio settings.'
}], [0x2383e3, {
    name: 'FrameRate',
    cppname: 'VideoFrameRate',
    level: 4,
    type: 'f',
    range: '> 0',
    strong: 'Informational',
    description: 'Number of frames per second.  only.'
}], [0x2fb523, {
    name: 'GammaValue',
    cppname: 'VideoGamma',
    level: 4,
    type: 'f',
    webm: false,
    range: '> 0',
    description: 'Gamma Value.'
}], [0x2eb524, {
    name: 'ColourSpace',
    cppname: 'VideoColourSpace',
    level: 4,
    type: 'b',
    minver: 1,
    webm: false,
    bytesize: 4,
    description: 'Same value as in AVI (32 bits).'
}], [0x54b3, {
    name: 'AspectRatioType',
    cppname: 'VideoAspectRatio',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed).'
}], [0x54b2, {
    name: 'DisplayUnit',
    cppname: 'VideoDisplayUnit',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio).'
}], [0x54ba, {
    name: 'DisplayHeight',
    cppname: 'VideoDisplayHeight',
    level: 4,
    type: 'u',
    minver: 1,
    default: 'PixelHeight',
    range: 'not 0',
    description: 'Height of the video frames to display. The default value is only valid when DisplayUnit is 0.'
}], [0x54b0, {
    name: 'DisplayWidth',
    cppname: 'VideoDisplayWidth',
    level: 4,
    type: 'u',
    minver: 1,
    default: 'PixelWidth',
    range: 'not 0',
    description: 'Width of the video frames to display. The default value is only valid when DisplayUnit is 0.'
}], [0x54dd, {
    name: 'PixelCropRight',
    cppname: 'VideoPixelCropRight',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'The number of video pixels to remove on the right of the image.'
}], [0x54cc, {
    name: 'PixelCropLeft',
    cppname: 'VideoPixelCropLeft',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'The number of video pixels to remove on the left of the image.'
}], [0x54bb, {
    name: 'PixelCropTop',
    cppname: 'VideoPixelCropTop',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'The number of video pixels to remove at the top of the image.'
}], [0x54aa, {
    name: 'PixelCropBottom',
    cppname: 'VideoPixelCropBottom',
    level: 4,
    type: 'u',
    minver: 1,
    default: 0,
    description: 'The number of video pixels to remove at the bottom of the image (for HDTV content).'
}], [0xba, {
    name: 'PixelHeight',
    cppname: 'VideoPixelHeight',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    range: 'not 0',
    description: 'Height of the encoded video frames in pixels.'
}], [0xb0, {
    name: 'PixelWidth',
    cppname: 'VideoPixelWidth',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    range: 'not 0',
    description: 'Width of the encoded video frames in pixels.'
}], [0x53b9, {
    name: 'OldStereoMode',
    level: 4,
    type: 'u',
    maxver: '0',
    webm: false,
    divx: false,
    description: 'DEPRECATED, DO NOT USE. Bogus StereoMode value used in old versions of libmatroska. (0: mono, 1: right eye, 2: left eye, 3: both eyes).'
}], [0x53c0, {
    name: 'AlphaMode',
    cppname: 'VideoAlphaMode',
    level: 4,
    type: 'u',
    minver: 3,
    webm: true,
    default: 0,
    description: 'Alpha Video Mode. Presence of this element indicates that the BlockAdditional element could contain Alpha data.'
}], [0x53b8, {
    name: 'StereoMode',
    cppname: 'VideoStereoMode',
    level: 4,
    type: 'u',
    minver: 3,
    webm: true,
    default: 0,
    description: 'Stereo-3D video mode (0: mono, 1: side by side (left eye is first), 2: top-bottom (right eye is first), 3: top-bottom (left eye is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red), 11: side by side (right eye is first), 12: anaglyph (green/magenta), 13 both eyes laced in one Block (left eye is first), 14 both eyes laced in one Block (right eye is first)) . There are some more details on 3D support in the Specification Notes.'
}], [0x9a, {
    name: 'FlagInterlaced',
    cppname: 'VideoFlagInterlaced',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 2,
    webm: true,
    default: 0,
    range: '0-1',
    description: 'Set if the video is interlaced. (1 bit)'
}], [0xe0, {
    name: 'Video',
    cppname: 'TrackVideo',
    level: 3,
    type: 'm',
    minver: 1,
    description: 'Video settings.'
}], [0x66a5, {
    name: 'TrackTranslateTrackID',
    level: 4,
    type: 'b',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used.'
}], [0x66bf, {
    name: 'TrackTranslateCodec',
    level: 4,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).'
}], [0x66fc, {
    name: 'TrackTranslateEditionUID',
    level: 4,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment.'
}], [0x56bb, {
    name: 'SeekPreRoll',
    level: 3,
    type: 'u',
    mandatory: true,
    multiple: false,
    default: 0,
    minver: 4,
    webm: true,
    description: 'After a discontinuity, SeekPreRoll is the duration in nanoseconds of the data the decoder must decode before the decoded data is valid.'
}], [0x56aa, {
    name: 'CodecDelay',
    level: 3,
    type: 'u',
    multiple: false,
    default: 0,
    minver: 4,
    webm: true,
    description: 'CodecDelay is The codec-built-in delay in nanoseconds. This value must be subtracted from each block timestamp in order to get the actual timestamp. The value should be small so the muxing of tracks with the same actual timestamp are in the same Cluster.'
}], [0x6fab, {
    name: 'TrackOverlay',
    level: 3,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc.'
}], [0xaa, {
    name: 'CodecDecodeAll',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 2,
    webm: false,
    default: 1,
    range: '0-1',
    description: 'The codec can decode potentially damaged data (1 bit).'
}], [0x26b240, {
    name: 'CodecDownloadURL',
    level: 3,
    type: 's',
    multiple: true,
    webm: false,
    description: 'A URL to download about the codec used.'
}], [0x3b4040, {
    name: 'CodecInfoURL',
    level: 3,
    type: 's',
    multiple: true,
    webm: false,
    description: 'A URL to find information about the codec used.'
}], [0x3a9697, {
    name: 'CodecSettings',
    level: 3,
    type: '8',
    webm: false,
    description: 'A string describing the encoding setting used.'
}], [0x63a2, {
    name: 'CodecPrivate',
    level: 3,
    type: 'b',
    minver: 1,
    description: 'Private data only known to the codec.'
}], [0x22b59c, {
    name: 'Language',
    cppname: 'TrackLanguage',
    level: 3,
    type: 's',
    minver: 1,
    default: 'eng',
    description: 'Specifies the language of the track in the Matroska languages form.'
}], [0x536e, {
    name: 'Name',
    cppname: 'TrackName',
    level: 3,
    type: '8',
    minver: 1,
    description: 'A human-readable track name.'
}], [0x55ee, {
    name: 'MaxBlockAdditionID',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'The maximum value of BlockAdditions for this track.'
}], [0x537f, {
    name: 'TrackOffset',
    level: 3,
    type: 'i',
    webm: false,
    default: 0,
    description: "A value to add to the Block's Timestamp. This can be used to adjust the playback offset of a track."
}], [0x23314f, {
    name: 'TrackTimecodeScale',
    level: 3,
    type: 'f',
    mandatory: true,
    minver: 1,
    maxver: '3',
    webm: false,
    default: '1.0',
    range: '> 0',
    description: 'DEPRECATED, DO NOT USE. The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs).'
}], [0x234e7a, {
    name: 'DefaultDecodedFieldDuration',
    cppname: 'TrackDefaultDecodedFieldDuration',
    level: 3,
    type: 'u',
    minver: 4,
    range: 'not 0',
    description: 'The period in nanoseconds (not scaled by TimcodeScale)\nbetween two successive fields at the output of the decoding process (see the notes)'
}], [0x23e383, {
    name: 'DefaultDuration',
    cppname: 'TrackDefaultDuration',
    level: 3,
    type: 'u',
    minver: 1,
    range: 'not 0',
    description: "Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one element put into a (Simple)Block)."
}], [0x6df8, {
    name: 'MaxCache',
    cppname: 'TrackMaxCache',
    level: 3,
    type: 'u',
    minver: 1,
    webm: false,
    description: 'The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed.'
}], [0x6de7, {
    name: 'MinCache',
    cppname: 'TrackMinCache',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used.'
}], [0x9c, {
    name: 'FlagLacing',
    cppname: 'TrackFlagLacing',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    default: 1,
    range: '0-1',
    description: 'Set if the track may contain blocks using lacing. (1 bit)'
}], [0x55aa, {
    name: 'FlagForced',
    cppname: 'TrackFlagForced',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    default: 0,
    range: '0-1',
    description: 'Set if that track MUST be active during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)'
}], [0xb9, {
    name: 'FlagEnabled',
    cppname: 'TrackFlagEnabled',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 2,
    webm: true,
    default: 1,
    range: '0-1',
    description: 'Set if the track is usable. (1 bit)'
}], [0x73c5, {
    name: 'TrackUID',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    range: 'not 0',
    description: 'A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file.'
}], [0xd7, {
    name: 'TrackNumber',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    range: 'not 0',
    description: 'The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number).'
}], [0xae, {
    name: 'TrackEntry',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Describes a track with all elements.'
}], [0x1654ae6b, {
    name: 'Tracks',
    level: 1,
    type: 'm',
    multiple: true,
    minver: 1,
    description: 'A top-level block of information with many tracks described.'
}], [0xaf, {
    name: 'EncryptedBlock',
    level: 2,
    type: 'b',
    multiple: true,
    webm: false,
    description: 'Similar to EncryptedBlock Structure)'
}], [0xca, {
    name: 'ReferenceTimeCode',
    level: 4,
    type: 'u',
    multiple: false,
    mandatory: true,
    minver: 0,
    webm: false,
    divx: true,
    description: 'DivX trick track extenstions'
}], [0xc9, {
    name: 'ReferenceOffset',
    level: 4,
    type: 'u',
    multiple: false,
    mandatory: true,
    minver: 0,
    webm: false,
    divx: true,
    description: 'DivX trick track extenstions'
}], [0xc8, {
    name: 'ReferenceFrame',
    level: 3,
    type: 'm',
    multiple: false,
    minver: 0,
    webm: false,
    divx: true,
    description: 'DivX trick track extenstions'
}], [0xcf, {
    name: 'SliceDuration',
    level: 5,
    type: 'u',
    default: 0,
    description: 'The (scaled) duration to apply to the element.'
}], [0xce, {
    name: 'Delay',
    cppname: 'SliceDelay',
    level: 5,
    type: 'u',
    default: 0,
    description: 'The (scaled) delay to apply to the element.'
}], [0xcb, {
    name: 'BlockAdditionID',
    cppname: 'SliceBlockAddID',
    level: 5,
    type: 'u',
    default: 0,
    description: 'The ID of the BlockAdditional element (0 is the main Block).'
}], [0xcd, {
    name: 'FrameNumber',
    cppname: 'SliceFrameNumber',
    level: 5,
    type: 'u',
    default: 0,
    description: 'The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame).'
}], [0xcc, {
    name: 'LaceNumber',
    cppname: 'SliceLaceNumber',
    level: 5,
    type: 'u',
    minver: 1,
    default: 0,
    divx: false,
    description: 'The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.'
}], [0xe8, {
    name: 'TimeSlice',
    level: 4,
    type: 'm',
    multiple: true,
    minver: 1,
    divx: false,
    description: 'Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.'
}], [0x8e, {
    name: 'Slices',
    level: 3,
    type: 'm',
    minver: 1,
    divx: false,
    description: 'Contains slices description.'
}], [0x75a2, {
    name: 'DiscardPadding',
    level: 3,
    type: 'i',
    minver: 4,
    webm: true,
    description: 'Duration in nanoseconds of the silent data added to the Block (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and should be discarded during playback.'
}], [0xa4, {
    name: 'CodecState',
    level: 3,
    type: 'b',
    minver: 2,
    webm: false,
    description: 'The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry.'
}], [0xfd, {
    name: 'ReferenceVirtual',
    level: 3,
    type: 'i',
    webm: false,
    description: 'Relative position of the data that should be in position of the virtual block.'
}], [0xfb, {
    name: 'ReferenceBlock',
    level: 3,
    type: 'i',
    multiple: true,
    minver: 1,
    description: "Timestamp of another frame used as a reference (ie: B or P frame). The timestamp is relative to the block it's attached to."
}], [0xfa, {
    name: 'ReferencePriority',
    cppname: 'FlagReferenced',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 0,
    description: 'This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced.'
}], [0x9b, {
    name: 'BlockDuration',
    level: 3,
    type: 'u',
    minver: 1,
    default: 'TrackDuration',
    description: 'The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track (but can be omitted as other default values). When not written and with no DefaultDuration, the value is assumed to be the difference between the timestamp of this Block and the timestamp of the next Block in "display" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks. When set to 0 that means the frame is not a keyframe.'
}], [0xa5, {
    name: 'BlockAdditional',
    level: 5,
    type: 'b',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'Interpreted by the codec as it wishes (using the BlockAddID).'
}], [0xee, {
    name: 'BlockAddID',
    level: 5,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    default: 1,
    range: 'not 0',
    description: 'An ID to identify the BlockAdditional level.'
}], [0xa6, {
    name: 'BlockMore',
    level: 4,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Contain the BlockAdditional and some parameters.'
}], [0x75a1, {
    name: 'BlockAdditions',
    level: 3,
    type: 'm',
    minver: 1,
    webm: false,
    description: 'Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data.'
}], [0xa2, {
    name: 'BlockVirtual',
    level: 3,
    type: 'b',
    webm: false,
    description: 'A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)'
}], [0xa1, {
    name: 'Block',
    level: 3,
    type: 'b',
    mandatory: true,
    minver: 1,
    description: 'Block containing the actual data to be rendered and a timestamp relative to the Cluster Timecode. (see Block Structure)'
}], [0xa0, {
    name: 'BlockGroup',
    level: 2,
    type: 'm',
    multiple: true,
    minver: 1,
    description: 'Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock.'
}], [0xa3, {
    name: 'SimpleBlock',
    level: 2,
    type: 'b',
    multiple: true,
    minver: 2,
    webm: true,
    divx: true,
    description: 'Similar to SimpleBlock Structure)'
}], [0xab, {
    name: 'PrevSize',
    cppname: 'ClusterPrevSize',
    level: 2,
    type: 'u',
    minver: 1,
    description: 'Size of the previous Cluster, in octets. Can be useful for backward playing.'
}], [0xa7, {
    name: 'Position',
    cppname: 'ClusterPosition',
    level: 2,
    type: 'u',
    minver: 1,
    webm: false,
    description: 'The Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams.'
}], [0x58d7, {
    name: 'SilentTrackNumber',
    cppname: 'ClusterSilentTrackNumber',
    level: 3,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster.'
}], [0xe7, {
    name: 'Timecode',
    cppname: 'ClusterTimecode',
    level: 2,
    type: 'u',
    mandatory: true,
    minver: 1,
    description: 'Absolute timestamp of the cluster (based on TimecodeScale).'
}], [0x1f43b675, {
    name: 'Cluster',
    level: 1,
    type: 'm',
    multiple: true,
    minver: 1,
    description: 'The lower level element containing the (monolithic) Block structure.'
}], [0x4d80, {
    name: 'MuxingApp',
    level: 2,
    type: '8',
    mandatory: true,
    minver: 1,
    description: 'Muxing application or library ("libmatroska-0.4.3").'
}], [0x7ba9, {
    name: 'Title',
    level: 2,
    type: '8',
    minver: 1,
    webm: false,
    description: 'General name of the segment.'
}], [0x2ad7b2, {
    name: 'TimecodeScaleDenominator',
    level: 2,
    type: 'u',
    mandatory: true,
    minver: 4,
    default: 1000000000,
    description: 'Timestamp scale numerator, see TimecodeScale.'
}], [0x2ad7b1, {
    name: 'TimecodeScale',
    level: 2,
    type: 'u',
    mandatory: true,
    minver: 1,
    default: 1000000,
    description: 'Timestamp scale in nanoseconds (1.000.000 means all timestamps in the segment are expressed in milliseconds).'
}], [0x69a5, {
    name: 'ChapterTranslateID',
    level: 3,
    type: 'b',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used.'
}], [0x69bf, {
    name: 'ChapterTranslateCodec',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    webm: false,
    description: 'The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).'
}], [0x69fc, {
    name: 'ChapterTranslateEditionUID',
    level: 3,
    type: 'u',
    multiple: true,
    minver: 1,
    webm: false,
    description: 'Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment.'
}], [0x3e83bb, {
    name: 'NextFilename',
    level: 2,
    type: '8',
    minver: 1,
    webm: false,
    description: 'An escaped filename corresponding to the next segment.'
}], [0x3eb923, {
    name: 'NextUID',
    level: 2,
    type: 'b',
    minver: 1,
    webm: false,
    bytesize: 16,
    description: 'A unique ID to identify the next chained segment (128 bits).'
}], [0x3c83ab, {
    name: 'PrevFilename',
    level: 2,
    type: '8',
    minver: 1,
    webm: false,
    description: 'An escaped filename corresponding to the previous segment.'
}], [0x3cb923, {
    name: 'PrevUID',
    level: 2,
    type: 'b',
    minver: 1,
    webm: false,
    bytesize: 16,
    description: 'A unique ID to identify the previous chained segment (128 bits).'
}], [0x73a4, {
    name: 'SegmentUID',
    level: 2,
    type: 'b',
    minver: 1,
    webm: false,
    range: 'not 0',
    bytesize: 16,
    description: 'A randomly generated unique ID to identify the current segment between many others (128 bits).'
}], [0x1549a966, {
    name: 'Info',
    level: 1,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Contains miscellaneous general information and statistics on the file.'
}], [0x53ac, {
    name: 'SeekPosition',
    level: 3,
    type: 'u',
    mandatory: true,
    minver: 1,
    description: 'The position of the element in the segment in octets (0 = first level 1 element).'
}], [0x53ab, {
    name: 'SeekID',
    level: 3,
    type: 'b',
    mandatory: true,
    minver: 1,
    description: 'The binary ID corresponding to the element name.'
}], [0x4dbb, {
    name: 'Seek',
    cppname: 'SeekPoint',
    level: 2,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Contains a single seek entry to an EBML element.'
}], [0x114d9b74, {
    name: 'SeekHead',
    cppname: 'SeekHeader',
    level: 1,
    type: 'm',
    multiple: true,
    minver: 1,
    description: 'Contains the position of other level 1 elements.'
}], [0x7e7b, {
    name: 'SignatureElementList',
    level: 2,
    type: 'm',
    multiple: true,
    webm: false,
    i: 'Cluster|Block|BlockAdditional',
    description: 'A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption.'
}], [0x7e5b, {
    name: 'SignatureElements',
    level: 1,
    type: 'm',
    webm: false,
    description: 'Contains elements that will be used to compute the signature.'
}], [0x7eb5, {
    name: 'Signature',
    level: 1,
    type: 'b',
    webm: false,
    description: 'The signature of the data (until a new.'
}], [0x7ea5, {
    name: 'SignaturePublicKey',
    level: 1,
    type: 'b',
    webm: false,
    description: 'The public key to use with the algorithm (in the case of a PKI-based signature).'
}], [0x7e9a, {
    name: 'SignatureHash',
    level: 1,
    type: 'u',
    webm: false,
    description: 'Hash algorithm used (1=SHA1-160, 2=MD5).'
}], [0x7e8a, {
    name: 'SignatureAlgo',
    level: 1,
    type: 'u',
    webm: false,
    description: 'Signature algorithm used (1=RSA, 2=elliptic).'
}], [0x1b538667, {
    name: 'SignatureSlot',
    level: -1,
    type: 'm',
    multiple: true,
    webm: false,
    description: 'Contain signature of some (coming) elements in the stream.'
}], [0xbf, {
    name: 'CRC-32',
    level: -1,
    type: 'b',
    minver: 1,
    webm: false,
    description: "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian"
}], [0xec, {
    name: 'Void',
    level: -1,
    type: 'b',
    minver: 1,
    description: 'Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use.'
}], [0x42f3, {
    name: 'EBMLMaxSizeLength',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 8,
    minver: 1,
    description: "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
}], [0x42f2, {
    name: 'EBMLMaxIDLength',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 4,
    minver: 1,
    description: "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
}], [0x42f7, {
    name: 'EBMLReadVersion',
    level: 1,
    type: 'u',
    mandatory: true,
    default: 1,
    minver: 1,
    description: 'The minimum EBML version a parser has to support to read this file.'
}], [0x1a45dfa3, {
    name: 'EBML',
    level: 0,
    type: 'm',
    mandatory: true,
    multiple: true,
    minver: 1,
    description: 'Set the EBML characteristics of the data to follow. Each EBML document has to start with this.'
}], [21936, {
    name: 'Colour',
    level: 4,
    type: 'm',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    description: 'Settings describing the colour format'
}], [21937, {
    name: 'MatrixCoefficients',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '2',
    description: 'FThe Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries.'
}], [21938, {
    name: 'BitsPerChannel',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '0',
    description: 'The Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries. For clarity, the value and meanings for MatrixCoefficients are adopted from Table 4 of ISO/IEC 23001-8:2013/DCOR1. (0:GBR, 1: BT709, 2: Unspecified, 3: Reserved, 4: FCC, 5: BT470BG, 6: SMPTE 170M, 7: SMPTE 240M, 8: YCOCG, 9: BT2020 Non-constant Luminance, 10: BT2020 Constant Luminance)'
}], [21945, {
    name: 'Range',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '0',
    description: 'Clipping of the color ranges. (0: Unspecified, 1: Broadcast Range, 2:Full Range, 3:Defined by MatrixCoefficients/TransferCharacteristics'
}], [21946, {
    name: 'TransferCharacteristics',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '2',
    description: 'The transfer characteristics of the video. For clarity, the value and meanings for TransferCharacteristics 1-15 are adopted from Table 3 of ISO/IEC 23001-8:2013/DCOR1. TransferCharacteristics 16-18 are proposed values. (0: Reserved, 1: ITU-R BT.709, 2: Unspecified, 3: Reserved, 4: Gamma 2.2 curve, 5: Gamma 2.8 curve, 6: SMPTE 170M, 7: SMPTE 240M, 8: Linear, 9: Log, 10: Log Sqrt, 11: IEC 61966-2-4, 12: ITU-R BT.1361 Extended Colour Gamut, 13: IEC 61966-2-1, 14: ITU-R BT.2020 10 bit, 15: ITU-R BT.2020 12 bit, 16: SMPTE ST 2084, 17: SMPTE ST 428-1 18: ARIB STD-B67 (HLG))'
}], [21947, {
    name: 'Primaries',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '2',
    description: 'The colour primaries of the video. For clarity, the value and meanings for Primaries are adopted from Table 2 of ISO/IEC 23001-8:2013/DCOR1. (0: Reserved, 1: ITU-R BT.709, 2: Unspecified, 3: Reserved, 4: ITU-R BT.470M, 5: ITU-R BT.470BG, 6: SMPTE 170M, 7: SMPTE 240M, 8: FILM, 9: ITU-R BT.2020, 10: SMPTE ST 428-1, 22: JEDEC P22 phosphors)'
}], [0x47e7, {
    name: 'ContentEncAESSettings',
    level: 6,
    type: 'm',
    multiple: false,
    mandatory: false,
    webm: true,
    description: 'Settings describing the encryption algorithm used. If ConentEncAlgo !=5 this MUST be absent'
}], [0x47e8, {
    name: 'AESSettingsCipherMode',
    type: 'u',
    multiple: false,
    mandatory: false,
    webm: true,
    default: 1,
    description: 'The cipher mode used in the encryption. Predefined values: 1 - CTR'
}]]);

'use strict';
/*globals ebml */

var EbmlDecoder = function EbmlDecoder(options) {
    var tools = {
        /**
         * Read variable length integer per https://www.matroska.org/technical/specs/index.html#EBML_ex
         * @param buffer
         * @param {Number} start
         * @returns {Number}  value / length object
         */
        readVint: function readVint(buffer, start) {
            start = start || 0;
            for (var length = 1; length <= 8; length++) {
                if (buffer[start] >= Math.pow(2, 8 - length)) {
                    break;
                }
            }
            if (length > 8) {
                throw new Error("Unrepresentable length: " + length + " " + buffer.toString('hex', start, start + length));
            }
            if (start + length > buffer.length) {
                return null;
            }
            var value = buffer[start] & (1 << 8 - length) - 1;
            for (var i = 1; i < length; i++) {
                if (i === 7) {
                    if (value >= Math.pow(2, 53 - 8) && buffer[start + 7] > 0) {
                        return {
                            length: length,
                            value: -1
                        };
                    }
                }
                value *= Math.pow(2, 8);
                value += buffer[start + i];
            }
            return {
                length: length,
                value: value
            };
        },

        /**
         * Write a variable-length integer EBML / Matroska / webm style
         * @param value
         * @returns {Buffer} variable-length integer
         */
        writeVint: function writeVint(value) {
            if (value < 0 || value > Math.pow(2, 53)) {
                throw new Error('Unrepresentable value: ' + value);
            }
            for (var length = 1; length <= 8; length++) {
                if (value < Math.pow(2, 7 * length) - 1) {
                    break;
                }
            }
            var buffer = new Uint8Array(length);
            for (var i = 1; i <= length; i++) {
                var b = value & 0xFF;
                buffer[length - i] = b;
                value -= b;
                value /= Math.pow(2, 8);
            }
            buffer[0] = buffer[0] | 1 << 8 - length;
            return buffer;
        },

        /***
         * concatenate two arrays of bytes
         * @param {Uint8Array} a1  First array
         * @param {Uint8Array} a2  Second array
         * @returns  {Uint8Array} concatenated arrays
         */
        concatenate: function concatenate(a1, a2) {
            if (!a1 || a1.byteLength === 0) return a2;
            if (!a2 || a2.byteLength === 0) return a1;
            var result = new Uint8Array(a1.byteLength + a2.byteLength);
            result.set(a1, 0);
            result.set(a2, a1.byteLength);
            a1 = null;
            a2 = null;
            return result;
        },

        /**
         * get a hex text string from Buff[start,end)
         * @param {Array} buff
         * @param {Number} start
         * @param {Number} end
         * @returns {string} the hex string
         */
        readHexString: function readHexString(buff, start, end) {
            var result = '';

            if (!start) start = 0;
            if (!end) end = buff.byteLength;

            for (var p = start; p < end; p++) {
                var q = Number(buff[p] & 0xff);
                result += ("00" + q.toString(16)).substr(-2);
            }
            return result;
        },
        readUtf8: function readUtf8(buff) {
            if (typeof window === 'undefined') {
                return new Buffer(buff.buffer, buff.byteOffset, buff.byteLength).toString("utf8");
            }
            try {
                /* Redmond Middle School science projects don't do this. */
                if (typeof TextDecoder !== "undefined") {
                    return new TextDecoder("utf8").decode(buff);
                }
                return null;
            } catch (exception) {
                return null;
            }
        },
        /**
         * get an unsigned number from a buffer
         * @param {Uint8Array} buff
         * @returns {number} result (in hex for lengths > 6)
         */
        readUnsigned: function readUnsigned(buff) {
            var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
            switch (buff.byteLength) {
                case 1:
                    return b.getUint8(0);
                case 2:
                    return b.getUint16(0);
                case 4:
                    return b.getUint32(0);
            }
            if (buff.byteLength <= 6) {
                var val = 0;
                for (var i = 0; i < buff.byteLength; i++) {
                    val = val * 256 + buff[i];
                }return val;
            } else {
                return tools.readHexString(buff);
            }
        },
        readSigned: function readSigned(buff) {
            var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
            switch (buff.byteLength) {
                case 1:
                    return b.getInt8(0);
                case 2:
                    return b.getInt16(0);
                case 4:
                    return b.getInt32(0);
            }
            return NaN;
        },
        readFloat: function readFloat(buff) {
            var b = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
            switch (buff.byteLength) {
                case 4:
                    return b.getFloat32(0);
                case 8:
                    return b.getFloat64(0);
                default:
                    return NaN;
            }
        },

        readDataFromTag: function readDataFromTag(tagObj, data) {

            tagObj.data = data;
            switch (tagObj.type) {
                case "u":
                    tagObj.value = tools.readUnsigned(data);
                    break;
                case "f":
                    tagObj.value = tools.readFloat(data);
                    break;
                case "i":
                    tagObj.value = tools.readSigned(data);
                    break;
                case "s":
                    tagObj.value = String.fromCharCode.apply(null, data);
                    break;
                case "8":
                    tagObj.value = tools.readUtf8(data);
                    break;
                default:
                    break;
            }

            if (tagObj.name === 'SimpleBlock' || tagObj.name === 'Block') {
                var lacingType = {
                    0: 'no lacing',
                    1: 'Xiph lacing',
                    3: 'EBML lacing',
                    2: 'fixed-size lacing'
                };
                var p = 0;
                var track = tools.readVint(data, p);
                p += track.length;
                tagObj.track = track.value;
                tagObj.value = tools.readSigned(data.subarray(p, p + 2));
                p += 2;
                if (tagObj.name === 'SimpleBlock') {
                    tagObj.keyframe = Boolean(data[p] & 0x80);
                    tagObj.discardable = Boolean(data[p] & 0x01);
                    tagObj.lacing = lacingType[(data[p] & 6) >> 1];
                    tagObj.invisible = Boolean(data[p] & 16);
                }
                p++;
                // if encrypted, it has a signal byte with the form x000000pe 
                // currently x (extension flag) must = 0
                if (tagObj.name === 'SimpleBlock' && !Boolean(data[p] & 252)) {
                    tagObj.signal_extension_flag = Boolean(data[p] & 128);
                    tagObj.signal_partition_flag = Boolean(data[p] & 2);
                    tagObj.signal_encryption_flag = Boolean(data[p] & 1);
                    p++;
                }
                tagObj.payload = data.subarray(p);
            }
            return tagObj;
        }
    };
    /*********** constructor ***************/
    options = options || {};

    //var debug = console.log;
    var debug = function debug() {};

    var STATE_TAG = 1,
        STATE_SIZE = 2,
        STATE_CONTENT = 3;

    var self = this;

    self._buffer = null;
    self._tag_stack = [];
    self._state = STATE_TAG;
    self._cursor = 0;
    self._total = 0;
    self._schema = schema;
    self._writecount = 0;

    EbmlDecoder.prototype.reset = function () {

        self._buffer = null;
        self._tag_stack = [];
        self._state = STATE_TAG;
        self._cursor = 0;
        self._total = 0;
        self._writecount = 0;
    };

    EbmlDecoder.prototype.write = function (chunk, callback) {

        self._callback = callback;

        self._writecount++;
        if (self._buffer === null) {
            self._buffer = new Uint8Array(chunk);
        } else {
            self._buffer = tools.concatenate(self._buffer, new Uint8Array(chunk));
        }

        while (self._cursor < self._buffer.length) {
            if (self._state === STATE_TAG && !self.readTag()) {
                break;
            }
            if (self._state === STATE_SIZE && !self.readSize()) {
                break;
            }
            if (self._state === STATE_CONTENT && !self.readContent()) {
                break;
            }
        }
    };

    EbmlDecoder.prototype.getSchemaInfo = function (tagStr) {
        debug('looking up tag');
        return self._schema.get(parseInt(tagStr, 16)) || {
            'type': 'unknown',
            'name': 'unknown'
        };
    };

    EbmlDecoder.prototype.readTag = function () {

        debug('parsing tag');

        if (self._cursor >= self._buffer.length) {
            debug('waiting for more data');
            return false;
        }

        var start = self._total;
        var tag = tools.readVint(self._buffer, self._cursor);

        if (tag == null) {
            debug('waiting for more data');
            return false;
        }

        var tagStr = tools.readHexString(self._buffer, self._cursor, self._cursor + tag.length);
        self._cursor += tag.length;
        self._total += tag.length;
        self._state = STATE_SIZE;

        var tagObj = {
            tag: tag.value,
            tagStr: tagStr,
            type: self.getSchemaInfo(tagStr).type,
            name: self.getSchemaInfo(tagStr).name,
            start: start,
            end: start + tag.length
        };

        self._tag_stack.push(tagObj);
        debug('read tag: ' + tagStr);

        return true;
    };

    EbmlDecoder.prototype.readSize = function () {

        var tagObj = self._tag_stack[self._tag_stack.length - 1];

        debug('parsing size for tag: ' + tagObj.tag.toString(16));

        if (self._cursor >= self._buffer.length) {
            debug('waiting for more data');
            return false;
        }

        var size = tools.readVint(self._buffer, self._cursor);

        if (!size) {
            debug('waiting for more data');
            return false;
        }

        self._cursor += size.length;
        self._total += size.length;
        self._state = STATE_CONTENT;
        tagObj.dataSize = size.value;

        // unknown size
        if (size.value === -1) {
            tagObj.end = -1;
        } else {
            tagObj.end += size.value + size.length;
        }

        debug('read size: ' + size.value);

        return true;
    };

    EbmlDecoder.prototype.readContent = function () {

        var tagObj = self._tag_stack[self._tag_stack.length - 1];

        debug('parsing content for tag: ' + tagObj.tag.toString(16));

        if (tagObj.type === 'm') {
            debug('content should be tags');
            self._callback(['start', tagObj]);
            self._state = STATE_TAG;
            return true;
        }

        if (self._buffer.length < self._cursor + tagObj.dataSize) {
            debug('got: ' + self._buffer.length);
            debug('need: ' + (self._cursor + tagObj.dataSize));
            debug('waiting for more data');
            debug('likely just an incomplete chunk, ending');
            return false;
        }

        var data = self._buffer.subarray(self._cursor, self._cursor + tagObj.dataSize);
        self._total += tagObj.dataSize;
        self._state = STATE_TAG;
        self._buffer = self._buffer.subarray(self._cursor + tagObj.dataSize);
        self._cursor = 0;

        self._tag_stack.pop(); // remove the object from the stack
        self._callback(['tag', tools.readDataFromTag(tagObj, data)]);

        while (self._tag_stack.length > 0) {
            var topEle = self._tag_stack[self._tag_stack.length - 1];
            if (self._total < topEle.end) {
                break;
            }
            self._callback(['end', topEle]);
            self._tag_stack.pop();
        }

        debug('read data: ' + tools.readHexString(data));
        return true;
    };
};


// EXTERNAL MODULE: ./components/tools.js
var tools = __webpack_require__("tTqp");
var tools_default = /*#__PURE__*/__webpack_require__.n(tools);

// CONCATENATED MODULE: ./components/additionalwebM.js




var additionalwebM_getWebMData = function getWebMData(tag) {

    var entryLookup = new Map([['u', { description: 'unsigned integer', returnVal: function returnVal(value, data, size) {
            return { display: typeof value === 'number' ? value : Object(tools["convertToHex"])(data), hex: null };
        } }], ['i', { description: 'signed integer', returnVal: function returnVal(value, data, size) {
            return { display: value || data.readIntBE(0, size), hex: null };
        } }], ['f', { description: 'floating point number', returnVal: function returnVal(value, data) {
            return { display: value || data.readFloatBE(0), hex: null };
        } }], ['s', { description: 'ASCII string', returnVal: function returnVal(value, data) {
            return { display: value || data.toString(), hex: null };
        } }], ['8', { description: 'UTF-8 string', returnVal: function returnVal(value, data) {
            return { display: value || data.toString('utf8'), hex: null };
        } }], ['d', { description: 'timestamp', returnVal: function returnVal(value, data) {
            console.warn('timestamp', data);return { display: value || new Date(data), hex: null };
        } }], ['b', { description: 'raw binary data', returnVal: function returnVal(value, data) {
            return value || data;
        } }]]);

    var processEntry = function processEntry(entry) {
        if (entryLookup.has(entry.type)) {
            var _entryLookup$get = entryLookup.get(entry.type),
                returnVal = _entryLookup$get.returnVal;

            if (entry.type === 'b') {
                // additional entry processing here for binary formats.
                switch (entry.name) {
                    // For some binary boxes make nicer for display
                    case 'SeekID':
                        return { display: Object(tools["convertToHex"])(entry.value || entry.data) + ' (' + schema.get(parseInt(Array.from(entry.data).map(function (byte) {
                                return byte.toString('16').padStart(2, '0');
                            }).join(''), 16)).name + ')', hex: null };
                    case 'Void':
                    case 'SegmentUID':
                        return { display: Object(tools["convertToHex"])(entry.value || entry.data), hex: null };
                    case 'CodecPrivate':
                        return { display: 'Raw Binary, ' + entry.dataSize + ' bytes', hex: Object(tools["convertToHex"])(entry.data)
                            // SimpleBlock and Block processing:
                            // https://www.matroska.org/technical/specs/index.html#simpleblock_structure
                        };case 'SimpleBlock':case 'Block':
                        return { display: 'Track ' + entry.track + (entry.keyframe ? ' (Keyframe)' : '') + (entry.discardable ? ' (Discardable),' : ',') + ' Timecode ' + entry.value + ', ' + entry.dataSize + ' bytes', hex: Object(tools["convertToHex"])(entry.payload.slice(4)) };
                    // Eg CodecPrivate for Audio tracks:
                    // https://tools.ietf.org/html/rfc7845.html#section-5
                    // CodecPrivate for VP9
                    // https://www.webmproject.org/docs/container/#vp9-codec-feature-metadata-codecprivate

                    // for binary formats not yet implemented, return a bytestream.
                    default:
                        return { display: null, hex: Object(tools["convertToHex"])(entry.value || entry.data) };
                }
            }
            return returnVal(entry.value, entry.data, entry.dataSize);
        }
        // the code isn't in the entryLookup table
        return 'unknown type';
    };
    return processEntry(tag);
};


// CONCATENATED MODULE: ./components/ebmlBoxer.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var MAX_TIME = 10;

// helper to recursively convert all maps into arrays of objects
var convertBox = function convertBox(boxes) {
    // boxes is a map -> webM mode
    if (boxes.toString().includes('Map')) return Array.from(boxes).reduce(function (result, _ref) {
        var key = _ref[0],
            entry = _ref[1];

        if (Object.hasOwnProperty.call(entry, 'boxes')) entry.boxes = convertBox(entry.boxes);
        return result.concat(entry);
    }, []);
};

//

var ebmlBoxer_processData = function processData(data) {
    try {
        // keep master result of parsed boxes
        var resultVal = new Map();

        // keep a list of parents up the tree
        var parentList = [];

        // handy helper to recursively work the way down the resultSet tree. Use 'start' as a hash since it's unique
        var setBox = function setBox(newVal) {
            // each 'boxes' is a Map. temp has the lowest level 'boxes'
            var temp = parentList.reduce(function (boxList, entry) {
                return boxList.get(entry).boxes;
            }, resultVal);
            temp.set(newVal.start, newVal);
        };

        // iterate through the boxes to create a box object like ISO box
        data.map(function (box) {
            if (box.dataType === 'start') {
                // start tag. Create an entry for this which includes a 'boxes' property
                var newEntry = {
                    type: box.payload.name,
                    start: box.payload.start,
                    size: box.payload.dataSize,
                    boxes: new Map()
                };
                // root level entries mean there are no parents
                if (parentList.length === 0) {
                    // no parents, so add to the result map using the start as a hash
                    resultVal.set(newEntry.start, _extends({}, newEntry));
                } else {
                    // if there is at least one parent, use the helper to enter it at the right level.
                    setBox(newEntry);
                };
                // add to the parentlist array to keep track of where we are in the hierarchy
                parentList.push(box.payload.start);
            }
            if (box.dataType === 'tag') {
                var _getWebMData = additionalwebM_getWebMData(box.payload),
                    display = _getWebMData.display,
                    hex = _getWebMData.hex;

                var _box$payload = _extends({}, box.payload),
                    name = _box$payload.name,
                    start = _box$payload.start,
                    dataSize = _box$payload.dataSize;

                setBox({ name: name, start: start, size: dataSize, display: display, hex: hex });
            };
            if (box.dataType === 'end') parentList.pop();
        });
        // now use convertBox to recursively process all 'boxes' 
        return { boxes: convertBox(resultVal) };
    } catch (e) {
        return e;
    }
};

var ebmlBoxer_ebmlBoxer = function ebmlBoxer(buf) {
    return new Promise(function (resolve, reject) {
        var decoder = new EbmlDecoder();
        var allData = [];
        var lastChunkTime = new Date().getTime();
        var currentTime = lastChunkTime;

        try {
            var catchEnd = setInterval(function () {
                if (allData.length && lastChunkTime - currentTime < MAX_TIME) {
                    clearInterval(catchEnd);
                    return resolve(ebmlBoxer_processData(allData));
                } else {
                    return reject('ebml timeout');
                }
            }, MAX_TIME / 2);

            decoder.write(buf, function (_ref2) {
                var dataType = _ref2[0],
                    payload = _ref2[1];

                allData.push({ dataType: dataType, payload: payload });
                lastChunkTime = new Date().getTime();
                currentTime = lastChunkTime;
            });
        } catch (e) {
            return reject(e);
        }
    });
};


// EXTERNAL MODULE: ./components/additionalBoxes.js
var additionalBoxes = __webpack_require__("kKod");
var additionalBoxes_default = /*#__PURE__*/__webpack_require__.n(additionalBoxes);

// CONCATENATED MODULE: ./components/m2tsBoxer.js

var parser = __webpack_require__("PFLp")();
var m2tsBoxer_MAX_TIME = 10;

var pidLookup = new Map([[0, 'Program Association Table'], [1, 'Conditional Access Table'], [2, 'Transport Stream Description Table'], [3, 'IPMP Control Information Table']]);

var tableIDLookup = {
    0x00: 'Program Association Section',
    0x01: 'Conditional Access Section',
    0x02: 'TS Program Map Section',
    0x03: 'TS Description Section',
    0x04: 'Scene Description Section',
    0x05: 'Object Descriptor Section',
    0x06: 'Metadata Section',
    0x07: 'IPMP Control Information Section'
};

var streamTypeLookup = {
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
};

var parsePAT = function parsePAT(buf) {
    // need to parse the PAT
    return {
        table_id: tableIDLookup[buf[0]] || 'reserved',
        section_syntax_indicator: (buf[1] & 128) >> 7,
        // 0 bit
        reserved1: (buf[1] & 48) >> 4,
        section_length: (buf[1] & 15) << 4 | buf[2],
        transport_stream_id: buf[3] << 8 | buf[4],
        reserved2: (buf[5] & 192) >> 6,
        version_number: (buf[5] & 62) >> 1,
        current_next_indicator: buf[5] & 1,
        section_number: buf[6],
        last_section_number: buf[7],
        program_number: buf[8] << 8 | buf[9],
        reserved3: (buf[10] & 224) >> 5,
        program_map_PID: (buf[10] & 31) << 8 | buf[11],
        crc_32: buf[12] << 24 | buf[13] << 16 | buf[14] << 8 | buf[15]
    };
};

var parsePMT = function parsePMT(buf) {
    var _pmt;

    // need to parse the PMT
    var pmt = (_pmt = {
        table_id: tableIDLookup[buf[0]] || 'reserved',
        section_syntax_indicator: (buf[1] & 128) >> 7,
        // 0 bit
        reserved1: (buf[1] & 48) >> 4,
        section_length: (buf[1] & 15) << 8 | buf[2],
        program_number: buf[3] << 8 + buf[4],
        reserved2: (buf[5] & 192) >> 6,
        version_number: (buf[5] & 62) >> 1,
        current_next_indicator: buf[5] & 1,
        section_number: buf[6],
        last_section_number: buf[7],
        reserved3: (buf[8] & 224) >> 5,
        PCR_PID: (buf[8] & 31) << 8 | buf[9]
    }, _pmt['reserved3'] = (buf[10] & 240) >> 4, _pmt.program_info_length = (buf[10] & 15) << 8 | buf[11], _pmt);

    // now need to loop buf[12] to get
    var start = 12;
    var boxes = [];
    var i = 0;
    while (buf.length > start + i + 4) {
        var _streamInfo;

        var streamInfo = (_streamInfo = {
            stream_type: streamTypeLookup[buf[start + i]] || 'unknown'
        }, _streamInfo['reserved' + (4 + i)] = (buf[start + i + 1] & 224) >> 5, _streamInfo.elementary_PID = (buf[start + i + 1] & 31) << 8 | buf[start + i + 2], _streamInfo['reserved' + (4 + i + 1)] = (buf[start + i + 3] & 240) >> 4, _streamInfo.ES_info_length = (buf[start + i + 3] & 15) << 8 | buf[start + i + 4], _streamInfo);
        boxes.push(streamInfo);
        // add the stream type and id to the table
        pidLookup.set(streamInfo.elementary_PID, streamInfo.stream_type);
        i += 5;
    }
    pmt.boxes = boxes;
    pmt.crc_32 = buf[i] << 24 | buf[i + 1] << 16 | buf[i + 2] << 8 | buf[i + 3];
    return pmt;
};

var m2tsBoxer_processEntry = function processEntry(segment) {
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
    var keyList = Object.keys(segment).filter(function (key) {
        return key !== 'packet' && key !== 'payload';
    });
    return keyList.map(function (key) {
        if (typeof segment[key] === 'object') return { type: key, boxes: processEntry(segment[key]), start: null, end: null };
        return { name: key, display: segment[key], start: null, end: null };
    });
};

var m2tsBoxer_processData = function processData(data) {
    try {
        var boxes = data.map(function (segment) {
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
                type: 'PID ' + segment.pid + (pidLookup.has(segment.pid) ? ' (' + pidLookup.get(segment.pid) + ')' : '') + ' number ' + segment.continuity_counter,
                hex: Object(tools["convertToHex"])(segment.packet),
                packet: Object(tools["convertToHex"])(segment.packet),
                boxes: m2tsBoxer_processEntry(segment)
            };
        });
        return { boxes: boxes };
    } catch (e) {
        throw e;
    }
};

var m2tsBoxer = function m2tsBoxer(buf) {
    return new Promise(function (resolve, reject) {
        var allData = [];
        var lastChunkTime = new Date().getTime();
        var currentTime = lastChunkTime;

        try {
            var catchEnd = setInterval(function () {
                if (allData.length && lastChunkTime - currentTime < m2tsBoxer_MAX_TIME) {
                    clearInterval(catchEnd);
                    return resolve(allData);
                } else {
                    return reject('m2ts timeout');
                }
            }, m2tsBoxer_MAX_TIME / 2);

            parser.on('data', function (data) {
                allData.push(data);
                lastChunkTime = new Date().getTime();
                currentTime = lastChunkTime;
            });
            parser.on('end', function () {
                return resolve(allData);
            });
            parser.on('error', function (err) {
                return reject(err);
            });
            parser.write(buf, function () {
                return resolve(m2tsBoxer_processData(allData));
            });
        } catch (e) {
            return reject(e);
        }
    });
};


// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js




var _ref = Object(preact_min["h"])(
	'h1',
	null,
	'Media Inspector'
);

var _ref2 = Object(preact_min["h"])(
	'label',
	{ 'for': 'getFile' },
	Object(preact_min["h"])(
		'a',
		null,
		'Select Local File'
	)
);

var header_Header = function Header(props) {
	var names = {
		webm: 'webM',
		mp4: 'ISOBMFF',
		ts: 'MPEG-2 Transport Stream'
	};
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		_ref,
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])('input', { type: 'file', style: { opacity: 0 }, id: 'getFile', onChange: props.handleFiles }),
			_ref2,
			Object(preact_min["h"])(
				'a',
				{ onClick: props.toggleHex },
				props.showHex ? 'Hide Hex Input' : 'Paste Hex Values'
			),
			Object(preact_min["h"])(
				'a',
				{ onClick: props.togglePreview },
				props.showVideo ? 'Hide Preview' : 'Show Preview'
			)
		)
	);
};

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./components/home/style.css
var home_style = __webpack_require__("HVeQ");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./components/home/index.js




var home__ref = Object(preact_min["h"])(
	'div',
	null,
	'No valid boxes detected'
);

var home_Home = function Home(props) {

	var processBox = function processBox(box) {
		// box.start {number} byte offset of box start
		// box.end {number} byte offset of box end
		// box.display {string} display value of the box
		// box.hex {string} hex representation of the box
		// box.name {string} name of the data entry
		// box.type {string} name of the container box
		// box.boxes {Array:box} sub-boxes
		// 

		var showEntryDetails = function showEntryDetails(title, entry) {
			var expandBox = props.selectedBox && (props.selectedBox.target === title || props.selectedBox.parentList.includes(title));
			return Object(preact_min["h"])(
				'details',
				{ open: props.expandAll || expandBox },
				Object(preact_min["h"])(
					'summary',
					{ 'class': home_style_default.a.boxProp },
					title.slice(0, -1),
					' ',
					entry.entryNumber
				),
				Object.keys(entry).filter(function (key) {
					return key !== 'entryNumber' && key !== 'title';
				}).map(function (key) {
					if (Array.isArray(entry[key]) && entry[key][0] && entry[key][0].entryNumber) return showEntryDetails(key, entry[key][0]);
					return Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(
							'span',
							{ 'class': home_style_default.a.boxProp },
							key,
							':'
						),
						Object(preact_min["h"])(
							'span',
							{ 'class': home_style_default.a.boxContents },
							entry[key]
						)
					);
				})
			);
		};

		var boxLabel = '' + (box.type || box.name) + (props.hasFocus === box.start && box.type ? ' starting byte: ' + box.start : '') + (box.type && box.end ? ' (' + box.size + ' bytes)' : '');

		// container boxes have a 'type'. They may contain 'boxes' or raw hex.
		if (Object.hasOwnProperty.call(box, 'type')) {
			var expandBox = props.selectedBox && (props.selectedBox.target === boxLabel || props.selectedBox.parentList.includes(boxLabel));
			return Object(preact_min["h"])(
				'div',
				{ style: { display: 'flex' } },
				Object(preact_min["h"])(
					'div',
					{ style: { minWidth: '30em' } },
					Object(preact_min["h"])(
						'details',
						{ open: props.expandAll || expandBox, onToggle: function onToggle(e) {
								return props.toggleBase64(e, null);
							}, key: box.start },
						Object(preact_min["h"])(
							'summary',
							{ 'class': home_style_default.a.boxName /*onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}*/ },
							boxLabel
						),
						box.boxes ? box.boxes.map(processBox) : box.display || box.hex && box.hex.map(function (row) {
							return Object(preact_min["h"])(
								'div',
								{ onClick: function onClick(e) {
										return props.toggleBase64(e, box);
									}, 'class': home_style_default.a.hexEntry },
								row
							);
						})
					)
				),
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'a',
						{ style: { display: 'flex', justifySelf: 'end' }, onClick: function onClick(e) {
								return props.toggleBase64(e, box);
							} },
						'+'
					)
				)
			);
		}
		// need to handle five cases here: 
		// 1. raw hex, 
		// 2. a simple object (key=name, value=display), 
		// 3. an array of Objects, 
		// 4. a deeply nested box,
		// 5. (senc) an array of Objects that contains a key that contains an Array of Objects
		var outputRow = void 0;
		var outputLabel = Object(preact_min["h"])(
			'span',
			null,
			boxLabel,
			':'
		);
		if (box.hex) {
			// case 1
			outputRow = Object(preact_min["h"])(
				'details',
				{ open: props.expandAll, onToggle: function onToggle(e) {
						return props.toggleBase64(e, null);
					} },
				Object(preact_min["h"])(
					'summary',
					{ 'class': home_style_default.a.boxContents },
					box.display || ''
				),
				box.hex.map(function (row) {
					return Object(preact_min["h"])(
						'div',
						{ onClick: function onClick(e) {
								return props.toggleBase64(e, box);
							}, key: row, 'class': home_style_default.a.hexEntry },
						row
					);
				})
			);
		} else if (Array.isArray(box.display) && box.display[0] && box.display[0].entryNumber) {
			// case 3
			outputRow = box.display.map(function (display) {
				return showEntryDetails(boxLabel, display);
			});
			// case 5
		} else if (box.boxes) {
			// case 4
			outputLabel = '';
			outputRow = box.boxes.map(processBox);
		} else {
			// case 2
			outputRow = Object(preact_min["h"])(
				'span',
				{ 'class': home_style_default.a.boxContents },
				box.display
			);
		}
		return Object(preact_min["h"])(
			'div',
			{ key: box.start, 'class': box.boxes ? home_style_default.a.boxName : home_style_default.a.boxProp },
			outputLabel,
			outputRow
		);
	};

	return Object(preact_min["h"])(
		'div',
		{ 'class': home_style_default.a.home },
		Object(preact_min["h"])(
			'h2',
			null,
			props.fileName,
			' (',
			props.decodeMode,
			')'
		),
		props.working ? Object(preact_min["h"])(
			'div',
			{ style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50' } },
			Object(preact_min["h"])(
				'svg',
				{ version: '1.1', x: '0px', y: '0px', width: '40px', height: '50px', viewBox: '0 0 24 30' },
				[0, 1, 2].map(function (x) {
					return Object(preact_min["h"])(
						'rect',
						{ key: x, x: x * 7, y: '0', width: '4', height: '20', fill: '#673Ab7' },
						Object(preact_min["h"])('animate', { attributeName: 'opacity', attributeType: 'XML',
							values: '1; .2; 1',
							begin: x * 0.2 + 's', dur: '0.6s', repeatCount: 'indefinite' })
					);
				})
			)
		) : Object(preact_min["h"])(
			'div',
			{ style: { display: 'grid', gridTemplateColumns: '3fr 2fr' } },
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.Result },
				props.parsedData.length > 0 ? props.parsedData.map(processBox) : home__ref
			),
			Object(preact_min["h"])(
				'div',
				null,
				props.base64 ? props.base64 instanceof Array ? props.base64.map(function (row) {
					return Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.hexEntry },
						row
					);
				}) : Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.hexEntry },
					props.base64
				) : ''
			)
		)
	);
};

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./components/video/style.css
var video_style = __webpack_require__("bUFf");
var video_style_default = /*#__PURE__*/__webpack_require__.n(video_style);

// CONCATENATED MODULE: ./components/video/index.js




var video_Video = function Video(props) {
    return Object(preact_min["h"])('video', {
        src: 'data:video/' + props.mimeType + '; base64,' + props.data,
        width: 320,
        height: 240,
        controls: true,
        onError: props.handleEncrypted
    });
};

/* harmony default export */ var video = (video_Video);
// CONCATENATED MODULE: ./components/app.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var styles = {
	parseButton: {
		width: '8em',
		margin: '5px',
		height: '3em',
		padding: '2px',
		color: 'whitesmoke',
		background: '#673ab7',
		boxShadow: '0 0 5px rgba(0, 0, 0, .5)',
		zIndex: '50',
		border: 'none',
		borderRadius: '3px',
		textAlign: 'center',
		alignContent: 'center'
	},
	inputArea: {
		display: 'grid',
		gridTemplateColumns: '6fr 1fr 20fr',
		gridTemplateRows: '2fr 1fr',
		marginTop: '65px'
	}
};

var modes = {
	webm: 'mp4',
	mp4: 'MP2T',
	MP2T: 'webm'
};

var niceError = {
	3: 'This video appears to be encrypted',
	4: 'Can\'t parse metadata. Is this not an initialization segment?'

};

var app_parseISO = function parseISO(buf) {
	return new Promise(function (resolve, reject) {
		return new Promise(function ($return, $error) {
			var VALID_START_BOX, parsedData, preProcessed, result;

			VALID_START_BOX = new Set(['ftyp', 'moof', 'styp', 'sidx']);
			return Promise.resolve(Object(iso_boxer["parseBuffer"])(buf.buffer)).then(function ($await_1) {
				try {
					parsedData = $await_1;
					if (VALID_START_BOX.has(parsedData.boxes[0].type)) {
						preProcessed = Object(additionalBoxes["convertBox"])(parsedData.boxes);
						console.log(preProcessed);
						result = Object(additionalBoxes["postProcess"])(preProcessed);
						return $return(resolve({ boxes: result }));
					}
					return $return(reject(new Error('not an ISOBMFF file')));
				} catch ($boundEx) {
					return $error($boundEx);
				}
			}, $error);
		});
	});
};

var app_parseWebM = function parseWebM(buf) {
	return ebmlBoxer_ebmlBoxer(buf.buffer);
};

var app_parseM2TS = function parseM2TS(buf) {
	return m2tsBoxer(buf);
};

var app__ref2 = Object(preact_min["h"])('div', null);

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.componentWillMount = function () {
			// add any custom box processors
			additionalBoxes["additionalBoxes"].map(function (box) {
				if (Object.hasOwnProperty.call(box, '_parser')) Object(iso_boxer["addBoxProcessor"])(box.field, box._parser);
			});
		};

		_this.createParsed = function (inputData) {
			var inputBuffer = Uint8Array.from(atob(inputData), function (c) {
				return c.charCodeAt(0);
			});
			if (_this.state.mode === 'webm') return app_parseWebM(inputBuffer);
			if (_this.state.mode === 'mp4') return app_parseISO(inputBuffer);
			if (_this.state.mode === 'MP2T') return app_parseM2TS(inputBuffer);
		};

		_this.updateInput = function (e) {
			console.log('updating inbox box with new value: ' + e.target.value);
			var inputData = e.target.value;
			_this.setState({ inputData: inputData });
		};

		_this.parseFile = function (e) {

			var getBoxList = function getBoxList(collection, resultMap) {
				return new Promise(function ($return, $error) {
					var counter, addElements;


					counter = 0;

					addElements = function addElements(elemList, parentPath) {
						return new Promise(function (resolve, reject) {
							// first add all of the elements at this node
							elemList.forEach(function (elem) {
								console.log(elem);
								// only add items with a 'type' (ie, box definition)
								if (!!elem.type) {
									if (resultMap.size && resultMap.has(elem.type)) {
										resultMap.set(elem.type, resultMap.get(elem.type).concat(parentPath));
									} else {
										resultMap.set(elem.type, parentPath);
									};
									// now check for sub-boxes that are not null
									if (!!elem.boxes) {
										//quick check to see if the boxes have types
										var validBoxes = elem.boxes.reduce(function (newList, box) {
											if (!!box.type) {
												newList.push(box);
											} else if (box.name && box.name === 'entries') {
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
					};

					// start the chain using the full collection
					counter++;
					return Promise.resolve(addElements(collection, [])).then($return, $error);
				});
			};

			console.log('parsing data in ' + _this.state.mode + ' mode:');
			_this.setState({ working: true, showVideo: false, videoError: '' });
			_this.createParsed(_this.state.inputData).then(function (_ref) {
				var boxes = _ref.boxes;

				var listOfBoxes = new Map();
				//extract a list of box names for the dropdown
				//return Map([target, [parentList]]}
				getBoxList(boxes, listOfBoxes).then(function (boxList) {
					return _this.setState({ boxList: boxList, parsedData: boxes, working: false, decodeAttempts: 0 });
				});
				;
				return;
			}).catch(function (err) {
				console.error(err);
				_this.setState({ errorMessage: err, working: false });
				if (_this.state.decodeAttempts < Object.keys(modes).length) {
					var _this$state = _this.state,
					    decodeAttempts = _this$state.decodeAttempts,
					    mode = _this$state.mode;

					decodeAttempts += 1;
					mode = modes[mode];
					console.log('failed decode #' + decodeAttempts + ', trying ' + mode + ' mode');
					_this.setState({ decodeAttempts: decodeAttempts, mode: mode, working: true });
					_this.parseFile();
				}
			});
		};

		_this.handleEncrypted = function (e) {
			console.log('got encrypted event', e.target && e.target.error);
			e.preventDefault();
			var videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
			_this.setState({ showVideo: false, videoError: videoError });
		};

		_this.handleFiles = function (e) {
			var fileName = e.target.files[0];
			_this.setState({ working: true, showVideo: false, inputData: '', fileName: fileName.name });
			var reader = new FileReader();
			var self = _this;
			reader.onload = function (r) {
				var inputData = r.target.result.split(/base64,/)[1];
				self.setState({ inputData: inputData });
				self.parseFile();
			};
			reader.readAsDataURL(fileName);
		};

		_this.toggleHex = function (e) {
			_this.setState({ showHex: !_this.state.showHex });
		};

		_this.togglePreview = function (e) {
			_this.setState({ showVideo: !_this.state.showVideo });
		};

		_this.handleFocus = function (e, focusRow, showOffset) {
			console.log('got mouse' + (showOffset ? 'Enter' : 'Leave') + ' event for row ' + focusRow);
			_this.setState({ hasFocus: showOffset ? focusRow : -1 });
		};

		_this.handleSearch = function (e) {
			var searchTerm = e.target.value;
			console.log('searching box list for ' + searchTerm);
			console.log(_this.state.boxList);
			if (_this.state.boxList.has(searchTerm)) {
				console.log('found ' + searchTerm + ' with parents ' + _this.state.boxList.get(searchTerm));
				_this.setState({ searchTerm: searchTerm, selectedBox: { target: searchTerm, parentList: _this.state.boxList.get(searchTerm) } });
			}
			if (searchTerm == '') {
				_this.setState({ searchTerm: searchTerm, selectedBox: { target: '', parentList: [] } });
			}
		};

		_this.expandAll = function (e) {
			console.log('got command to ' + (_this.state.expanded ? 'collapse' : 'expand') + ' the tree');
			_this.setState({ working: true, expanded: !_this.state.expanded });
			setTimeout(function () {
				return _this.setState({ working: false });
			}, 100);
		};

		_this.toggleBase64 = function (e, boxData) {
			var extractHex = function extractHex(buffer) {
				var getRow = function getRow(start) {
					return start + 16 < buffer.length ? [buffer.slice(start, start + 16).map(function (bit) {
						return bit.toString('16').padStart(2, '0').toUpperCase();
					}).join(' ')].concat(getRow(start + 16)) : [buffer.slice(start).map(function (bit) {
						return bit.toString('16').padStart(2, '0').toUpperCase();
					}).join(' ')];
				};
				return getRow(0);
			};
			var mp4Hex = void 0,
			    base64 = void 0;

			if (_this.state.mode === 'mp4' && boxData) {
				// need to extract the hex by size and start byte
				var buf = Array.from(Uint8Array.from(atob(_this.state.inputData), function (c) {
					return c.charCodeAt(0);
				}).slice(boxData.start, boxData.start + boxData.size));
				mp4Hex = extractHex(buf);
			}
			var hexData = boxData && (boxData.hex || mp4Hex);
			// toggle from hidden => base64 => hex
			if (!_this.state.base64) {
				// hidden => base64
				base64 = hexData ? hexData.join(' ').split(' ').map(function (byte) {
					return String.fromCharCode(parseInt(byte, 16));
				}).join('') : '';
			} else if (_this.state.base64 instanceof Array) {
				// /([0-F][0-F] ){3,}/i.test(this.state.base64)) {
				// hex => hidden
				base64 = '';
			} else {
				// base64 => hex
				base64 = hexData;
			}
			_this.setState({ base64: base64 });
		};

		_this.state = {
			inputData: '',
			parsedData: { boxes: [] },
			mode: 'mp4',
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false,
			hasFocus: -1,
			fileName: 'raw base64 data',
			base64: '',
			expanded: false,
			boxList: new Map(),
			selectedBox: { target: '', parentList: [] },
			searchTerm: ''
		};
		return _this;
	}

	App.prototype.render = function render() {
		var _this2 = this;

		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(header, {
				mode: this.state.mode,
				togglePreview: this.togglePreview,
				showVideo: this.state.showVideo,
				showHex: this.state.showHex,
				hexCode: this.state.hexCode,
				toggleHex: this.toggleHex,
				handleFiles: this.handleFiles
			}),
			this.state.showHex ? Object(preact_min["h"])(
				'div',
				{ style: styles.inputArea },
				Object(preact_min["h"])(
					'div',
					{ style: { gridRow: '1/3' } },
					Object(preact_min["h"])('textarea', { style: { height: '90%', width: '95%', margin: '10px' }, onChange: function onChange(e) {
							return _this2.updateInput(e);
						}, value: this.state.inputData })
				),
				Object(preact_min["h"])(
					'div',
					{ style: { gridRow: '2/3' } },
					Object(preact_min["h"])(
						'button',
						{ style: styles.parseButton, onClick: function onClick(e) {
								return _this2.parseFile(e);
							} },
						'Go'
					)
				)
			) : app__ref2,
			Object(preact_min["h"])(
				'div',
				null,
				this.state.showVideo ? Object(preact_min["h"])(video, {
					mimeType: this.state.mode,
					data: this.state.inputData,
					handleEncrypted: this.handleEncrypted
				}) : Object(preact_min["h"])(
					'div',
					{ style: { padding: this.state.showHex ? '10px 10px' : '56px 10px' } },
					this.state.videoError
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'treeControl' },
					Object(preact_min["h"])(
						'div',
						{ style: styles.parseButton, onClick: this.expandAll },
						this.state.expanded ? 'Collapse Tree View' : 'Expand Tree View'
					),
					Object(preact_min["h"])(
						'div',
						{ style: styles.parseButton },
						Object(preact_min["h"])('input', { 'class': 'tagSearch', placeholder: 'search for tag', type: 'search', size: '10', onChange: this.handleSearch, value: this.state.searchTerm })
					)
				),
				Object(preact_min["h"])(home, {
					fileName: this.state.fileName,
					decodeMode: this.state.mode,
					working: this.state.working,
					parsedData: this.state.parsedData,
					handleFocus: this.handleFocus,
					error: this.state.errorMessage,
					hasFocus: this.state.hasFocus,
					base64: this.state.base64,
					toggleBase64: this.toggleBase64,
					expandAll: this.state.expanded,
					selectedBox: this.state.selectedBox
				})
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "PFLp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stream = __webpack_require__("97RM");
var util = __webpack_require__("Bcfi");

/**
 * @private
 * @param {Buffer} packet - TS packet
 * @return {Object}
 */
var parseAdaptationField = function parseAdaptationField(packet) {
    var adaptation_field_length = packet[4];

    if (adaptation_field_length <= 0) {
        return {
            adaptation_field_length: adaptation_field_length
        };
    }

    var adaptation_field = {
        adaptation_field_length: adaptation_field_length,
        discontinuity_indicator: (packet[5] & 0x80) >>> 7,
        random_access_indicator: (packet[5] & 0x40) >>> 6,
        elementary_stream_priority_indicator: (packet[5] & 0x20) >>> 5,
        pcr_flag: (packet[5] & 0x10) >>> 4,
        opcr_flag: (packet[5] & 0x08) >>> 3,
        splicing_point_flag: (packet[5] & 0x04) >>> 2,
        transport_private_data_flag: (packet[5] & 0x02) >>> 1,
        adaptation_field_extension_flag: packet[5] & 0x01
    };

    var index = 6;

    if (adaptation_field.pcr_flag) {
        adaptation_field.program_clock_reference_base = packet.readUInt32BE(index) * 2 + ((packet[index + 4] & 0x80) >>> 7);

        adaptation_field.program_clock_reference_extension = (packet[index + 4] & 0x1) * 256 + (packet[index + 5] >>> 0);

        index += 6;
    }

    if (adaptation_field.opcr_flag) {
        adaptation_field.original_program_clock_reference_base = packet.readUInt32BE(index) * 2 + ((packet[index + 4] & 0x80) >>> 7);

        adaptation_field.original_program_clock_reference_extension = (packet[index + 4] & 0x1) * 256 + (packet[index + 5] >>> 0);

        index += 6;
    }

    if (adaptation_field.splicing_point_flag) {
        adaptation_field.splice_countdown = packet.readInt8(index);

        index += 1;
    }

    if (adaptation_field.transport_private_data_flag) {
        adaptation_field.transport_private_data_length = packet[index] >>> 0;

        adaptation_field.private_data = packet.slice(index + 1, index + 1 + adaptation_field.transport_private_data_length);

        index += 1 + adaptation_field.transport_private_data_length;
    }

    if (adaptation_field.adaptation_field_extension_flag) {
        adaptation_field.adaptation_field_extension_length = packet[index] >>> 0;

        adaptation_field.ltw_flag = (packet[index + 1] & 0x80) >>> 7;
        adaptation_field.piecewise_rate_flag = (packet[index + 1] & 0x40) >>> 6;
        adaptation_field.seamless_splice_flag = (packet[index + 1] & 0x20) >>> 5;

        index += 2;

        if (adaptation_field.ltw_flag) {
            adaptation_field.ltw_valid_flag = (packet[index] & 0x80) >>> 7;

            adaptation_field.ltw_offset = (packet[index] & 0x7f) * 256 + (packet[index + 1] >>> 0);

            index += 2;
        }

        if (adaptation_field.piecewise_rate_flag) {
            adaptation_field.piecewise_rate = (packet[index] & 0x3f) * 65536 + packet[index + 1] * 256 + (packet[index + 2] >>> 0);

            index += 3;
        }

        if (adaptation_field.seamless_splice_flag) {
            adaptation_field.splice_type = (packet[index] & 0xf0) >>> 4;

            // 536870912 = 2 ^ 29
            // 4194304   = 2 ^ 22
            // 16384     = 2 ^ 14
            // 128       = 2 ^ 7
            adaptation_field.dts_next_au = (packet[index] & 0x0e) * 536870912 + packet[index + 1] * 4194304 + ((packet[index + 2] & 0xfe) >>> 0) * 16384 + packet[index + 3] * 128 + ((packet[index + 4] & 0xfe) >>> 1);
        }
    }

    return adaptation_field;
};

/**
 * @private
 * @param {Buffer} chunk - Buffer
 * @return {Object}
 */
var parsePacket = function parsePacket(chunk) {
    if (chunk[0] !== 0x47 /* sync byte */) {
            throw new Error('Not a ts packet');
        }

    var packet = {
        transport_error_indicator: (chunk[1] & 0x80) >>> 7,
        payload_unit_start_indicator: (chunk[1] & 0x40) >>> 6,
        transport_priority: (chunk[1] & 0x20) >>> 5,
        pid: (chunk[1] & 0x1f) << 8 | chunk[2],
        transport_scrambling_control: (chunk[3] & 0xc0) >>> 6,
        adaptation_field_control: (chunk[3] & 0x30) >>> 4,
        continuity_counter: chunk[3] & 0x0f,
        packet: chunk
    };

    if (packet.adaptation_field_control & 0x2) {
        packet.adaptation_field = parseAdaptationField(chunk);
    }

    if (packet.adaptation_field_control & 0x1) {
        var begin = 5 + (packet.adaptation_field & 0x2 ? packet.adaptation_field.adaptation_field_length : 0);

        var end = 188;
        for (; chunk[end - 1] === 0xff; --end) {}

        packet.payload = chunk.slice(begin, end);
    }

    return packet;
};

/**
 * @class
 * @param {Object} options
 */
var Mpeg2TsParser = function Mpeg2TsParser(options) {
    if (!(this instanceof Mpeg2TsParser)) {
        return new Mpeg2TsParser(options);
    }

    stream.Transform.call(this, typeof options === 'undefined' ? {} : options);

    this._writableState.objectMode = false;
    this._readableState.objectMode = true;

    this._buffer = new Buffer(0);
};

util.inherits(Mpeg2TsParser, stream.Transform);

/**
 * @private
 */
Mpeg2TsParser.prototype._transform = function (chunk, encoding, callback) {
    if (this._buffer.length + chunk.length < 188) {
        try {
            this._buffer = Buffer.concat([this._buffer, chunk]);
        } catch (err) {
            callback(err);
            return;
        }

        callback();
        return;
    }

    try {
        this.push(parsePacket(Buffer.concat([this._buffer, chunk.slice(0, 188 - this._buffer.length)], 188)));

        chunk = chunk.slice(188 - this._buffer.length);

        var index = 0;

        for (; index + 188 < chunk.length; index += 188) {
            this.push(parsePacket(chunk.slice(index, index + 188)));
        }

        this._buffer = chunk.slice(index);
    } catch (err) {
        callback(err);
        return;
    }

    callback();
};

module.exports = Mpeg2TsParser;

/***/ }),

/***/ "bUFf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "kKod":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = __webpack_require__("tTqp"),
    convertToHex = _require.convertToHex,
    formatUuid = _require.formatUuid;

var perSampleIVSize = void 0,
    subsampleCount = void 0;

var additionalBoxes = [{
    source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 Bitrate box',
    field: 'btrt',
    _parser: function _parser() {
        this._procField('bufferSizeDB', 'uint', 32);
        this._procField('maxBitrate', 'uint', 32);
        this._procField('avgBitrate', 'uint', 32);
    }
}, {
    source: 'ISO/IEC 14496-12:2012 - 8.8.3.1 Track Extends Box',
    field: 'trex',
    _parser: function _parser() {
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
    _parser: function _parser() {
        // process this as a 4-byte array instead of a uint32 since it's actually ASCII text
        this._procFieldArray('data_format', 4, 'uint', 8);
    }
}, {
    source: 'ISO/IEC 14496-12:2012 - 8.8.7 Track Fragment Header Box',
    field: 'tfhd',
    _parser: function _parser() {
        var flagData = [];
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
}, {
    source: 'ISO 14496-12_2012 Sample Auxiliary Information Sizes 8.7.8',
    field: 'saiz',
    _parser: function _parser() {
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
    _parser: function _parser() {
        var version = this.version;
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
    source: 'ISO 23001-7 2016 Track Encryption 8.2.2',
    field: 'tenc',
    _parser: function _parser() {
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
        this._procFieldArray('default_KID', 16, 'uint', 8);
        if (this.default_Per_Sample_IV_Size == 0) {
            this._procField('default_constant_IV_size', 'uint', 8);
            this._procFieldArray('default_constant_IV', this.default_constant_IV_size, 'uint', 8);
        }
        this.perSampleIVSize = this.default_Per_Sample_IV_Size || this.default_constant_IV_size;
    }
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
    field: 'senc',
    _parser: function _parser() {
        this._procFullBox();
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('entry_count', 'uint', 32);
        if (this.entry_count) {
            this._procEntries('entries', this.entry_count, function (entry) {
                this._procEntryField(entry, 'sample_count', 'uint', 32);
                this._procEntryField(entry, 'sample_delta', 'uint', 32);
            });
        }
    }
}, {
    source: 'ISO 14496-12_2012 sample-to-chunk, partial data-offset information 8.7.4',
    field: 'stsc',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('entry_count', 'uint', 32);
        if (this.entry_count) {
            this._procEntries('entries', this.entry_count, function (entry) {
                this._procEntryField(entry, 'first_chunk', 'uint', 32);
                this._procEntryField(entry, 'samples_per_chunk', 'uint', 32);
                this._procEntryField(entry, 'sample_description_index', 'uint', 32);
            });
        }
    }
}, {
    source: 'ISO 14496-12_2012 chunk offset, partial data-offset information 8.7.5',
    field: 'stco',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('entry_count', 'uint', 32);
        if (this.entry_count) {
            this._procEntries('entries', this.entry_count, function (entry) {
                this._procEntryField(entry, 'chunk_offset', 'uint', 32);
            });
        }
    }
}, {
    source: 'ISO 14496-12_2012 sync sample table 8.6.3',
    field: 'stss',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('entry_count', 'uint', 32);
        if (this.entry_count) {
            this._procEntries('entries', this.entry_count, function (entry) {
                this._procEntryField(entry, 'sample_number', 'uint', 32);
            });
        }
    }
}, {
    source: 'ISO/IEC 14496-12 2015 12.1.3.2 Sample Entry, modified as described in 8.12',
    field: 'encv',
    _parser: function _parser() {
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
        this._procSubBoxes('config', 'data', -1);
    }
}, {
    source: 'EC3 Specific Box',
    field: 'dec3',
    _parser: function _parser() {
        this._procField('data_rate', 'uint', 13);
        this._procField('num_ind_sub', 'uint', 3);
        this._procField('fscod', 'uint', 2);
        this._procField('bsid', 'uint', 5);
        this._procField('bsmod', 'uint', 5);
        this._procField('acmod', 'uint', 3);
        this._procField('lfeon', 'uint', 1);
        this._procField('reserved1', 'uint', 3);
        this._procField('num_dep_sub', 'uint', 4);
        if (this.num_dep_sub > 0) {
            this._procField('chan_loc', 'uint', 9);
        } else {
            this._procField('reserved2', 'uint', 1);
        }
    }
}, {
    source: 'ISO/IEC 14496-12 2015 12.1.3.2 Sample Entry, modified as described in 8.12',
    field: 'avc1',
    _parser: function _parser() {
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
        this._procSubBoxes('config', 'data', -1);
    }
}, {
    source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 mp4a box (use AudioSampleEntry definition and naming)',
    field: 'enca',
    _parser: function _parser() {
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
        this._procSubBoxes('esds', 'data', -1);
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
    _parser: function _parser() {
        this._procFullBox();
        var version = this.version;
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('sample_size', 'uint', 32);
        this._procField('sample_count', 'uint', 32);
        if (this.sample_size == 0 && this.sample_count) {
            this._procEntries('samples', this.sample_count, function (sample) {
                this._procEntryField(sample, 'entry_size', 'uint', 32);
            });
        }
    }
}, {
    source: 'ISO/IEC 14496-12:2012 - 8.12.5 Scheme Type Box',
    field: 'schm',
    _parser: function _parser() {
        this._procFullBox();
        // turn this into a 4-byte array since it's actually text
        this._procFieldArray('scheme_type', 4, 'uint', 8);
        this._procField('scheme_version', 'uint', 32);

        if (this.flags & 0x000001) {
            this._procField('scheme_uri', 'string', -1);
        }
    }
}, {
    source: 'ISO 14496-15 avc decoder configuration',
    field: 'avcC',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('configuration_version', 'uint', 8);
        this._procField('AVC_profile_indication', 'uint', 8);
        this._procField('profile_compatibility', 'uint', 8);
        this._procField('configuration_version', 'uint', 8);
        this._procField('reserved1', 'bit', 6);
        this._procField('length_size_minus_one', 'uint', 2);
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
}, {
    source: 'Quicktime',
    field: 'pasp',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('h_spacing', 'uint', 32);
        this._procField('b_spacing', 'uint', 32);
        if (this.sample_size == 0 && this.sample_count) {
            this._procEntries('samples', this.sample_count, function (sample) {
                this._procEntryField(sample, 'entry_size', 'uint', 32);
            });
        }
    }
}, {
    source: 'Netflix Cadmium Player undocumented',
    field: 'uuid',
    _parser: function _parser() {
        var _this = this;

        var uuidString = this.usertype.map(function (bit) {
            return bit.toString('16').padStart(2, '0').toUpperCase();
        }).join('');
        var getUint64 = function getUint64(byteOffset) {
            var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // split 64-bit number into two 32-bit (4-byte) parts
            var left = _this._raw.getUint32(byteOffset + 24, littleEndian);
            var right = _this._raw.getUint32(byteOffset + 4 + 24, littleEndian);

            // combine the two 32-bit values
            var combined = littleEndian ? left + Math.pow(2, 32) * right : Math.pow(2, 32) * left + right;

            if (!Number.isSafeInteger(combined))
                //console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

                return combined;
        };
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
        } else {}
    }
}];

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

var psshLookup = {
    '10 77 EF EC C0 B2 4D 02 AC E3 3C 1E 52 E2 FB 4B': 'Clearkey',
    '9A 04 F0 79 98 40 42 86 AB 92 E6 5B E0 88 5F 95': 'PlayReady',
    'ED EF 8B A9 79 D6 4A CE A3 C8 27 DC D5 1D 21 ED': 'WideVine',
    'F2 39 E7 69 EF A3 48 50 9C 16 A9 03 C6 93 2E FB': 'PrimeTime',
    '94 CE 86 FB 07 FF 4F 43 AD B8 93 D2 FA 96 8C A2': 'FairPlay',
    '29 70 1F E4 3C C7 4A 34 8C 5B AE 90 C7 43 9A 47': 'FairPlay-unofficial'

    /** Looks at the box entry and returns proper formatting based on the type of data therein,
     * and possibly the entry.type
     * 
     * @param {Object} entry ->  a single box parameter
     * @returns {String or Array<Object>} -> returns the unformatted contents in an array
     */
};var getISOData = function getISOData(key, value) {
    // little helper that returns the type
    var valueType = Object.prototype.toString.call(value).match(/ (\w+)\]/i)[1];

    // 1) Handle Arrays of numbers
    // 2) Handle Arrays of things represented by numbers (pssh:SystemID, pssh:Data possibly (for PlayReady) for example)
    // 3) Handle lookups (psshLookup)
    // 4) Handle Arrays of plain Objects (eg. entries, references, samples) -- note * usually includes *_count !
    // 5) Handle raw binary (Uint8Array)
    var handleArray = {
        'Object': function (_Object) {
            function Object(_x2) {
                return _Object.apply(this, arguments);
            }

            Object.toString = function () {
                return _Object.toString();
            };

            return Object;
        }(function (value) {
            var excludeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            return value.map(function (item, index) {
                var cleanEntry = _extends({}, item);
                if (Object.keys(cleanEntry).includes('sample_flags')) cleanEntry.sample_flags = handleArray.LongSampleDependency(cleanEntry.sample_flags);
                if (excludeKeys) excludeKeys.forEach(function (key) {
                    return delete cleanEntry[key];
                });
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        }),
        'String': function String(value) {
            return value.join(', ');
        },
        'Number': function Number(value) {
            return value.join(', ');
        },
        'SampleDependency': function SampleDependency(value) {
            var flags = [{ flag: 'is_leading', bitmask: 192, shift: 6, 0: 'unknown', 1: 'is leading, dependency before', 2: 'not leading', 3: 'is leading, no dependency' }, { flag: 'sample_depends_on', bitmask: 48, shift: 4, 0: 'unknown', 1: 'depends on others (not an I frame)', 2: 'does not depend (I frame)' }, { flag: 'sample_is_depended_on', bitmask: 12, shift: 2, 0: 'unknown', 1: 'not disposable', 2: 'disposable' }, { flag: 'sample_has_redundancy', bitmask: 3, shift: 0, 0: 'unknown', 1: 'has redundant coding', 2: 'has no redundant coding' }];
            return value.map(function (item, index) {
                // do a bit comparison and return the lookup
                var cleanEntry = flags.reduce(function (summary, flag) {
                    summary[flag.flag] = flag[(item & flag.bitmask) >> flag.shift];
                    return summary;
                }, {});
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        },
        'LongSampleDependency': function LongSampleDependency(value) {
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
            var flags = [{ name: 'reserved1', bitmask: 4026531840, shift: 28 }, { name: 'is_leading', bitmask: 201326592, shift: 26, 0: 'unknown', 1: 'is leading, dependency before', 2: 'not leading', 3: 'is leading, no dependency' }, { name: 'sample_depends_on', bitmask: 50331648, shift: 24, 0: 'unknown', 1: 'depends on others (not an I frame)', 2: 'does not depend (I frame)' }, { name: 'sample_is_depended_on', bitmask: 12582912, shift: 22, 0: 'unknown', 1: 'not disposable', 2: 'disposable' }, { name: 'sample_has_redundancy', bitmask: 3145728, shift: 20, 0: 'unknown', 1: 'has redundant coding', 2: 'has no redundant coding' }, { name: 'sample_padding_value', bitmask: 917504, shift: 17 }, { name: 'sample_is_non_sync_sample', bitmask: 65536, shift: 16, 0: 'sync sample', 1: 'not a sync sample' }, { name: 'sample_degredation_priority', bitmask: 65535, shift: 0 }];
            // do a bit comparison and return the lookup
            // first, if it's an array then return an array
            if (Array.isArray(value)) return value.map(function (item, index) {
                // do a bit comparison and return the lookup
                var cleanEntry = flags.reduce(function (summary, flag) {
                    summary[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                    return summary;
                }, {});
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
            // otherwise, if it's a single value, just return a single value
            return [].concat(flags.reduce(function (summary, flag) {
                summary[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                return summary;
            }, { entryNumber: 1 }));
        },
        'senc_samples': function senc_samples(value) {
            return value.map(function (item, index) {
                var cleanEntry = _extends({}, item, { InitializationVector: convertToHex(item.InitializationVector) });
                // add an entry number to each subsample entry
                cleanEntry.subsamples = cleanEntry.subsamples.map(function (subsample, subEntryNo) {
                    return _extends({}, subsample, { entryNumber: subEntryNo + 1 });
                });
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        }

        // 5) Handle raw binary
    };if (valueType === 'Uint8Array') {
        return convertToHex(value); // an array of hex strings, each 16 bytes wide, max of 64 rows
    }
    // Handle arrays of ...
    if (valueType === "Array") {
        // get the type of the first element
        var elementType = Object.prototype.toString.call(value[0]).match(/ (\w+)\]/i)[1];
        // first check for special handling by key
        switch (key) {
            case 'SystemID':
                return convertToHex(value) + ' (' + psshLookup[convertToHex(value)] + ')';
            case 'Data':
            case 'compressorname':
                return value.map(function (b) {
                    return String.fromCharCode(b);
                }).join('');
            case 'usertype':
                return formatUuid(value) + ' (' + value.map(function (b) {
                    return String.fromCharCode(b);
                }).join('') + ')\n' + convertToHex(value._data);
            case 'xfa_KID?':
                return '' + formatUuid(value);
            case 'default_KID':
                return '' + formatUuid(value);
            case 'sample_dependency_table':
                return handleArray.SampleDependency(value);
            case 'sample_flags':
                return handleArray.LongSampleDependency(value);
            case 'references':
                return handleArray[elementType](value, ['sap', 'reference']);
            case 'senc_samples':
                return handleArray.senc_samples(value);
            case 'data_format':case 'scheme_type':
                return value.map(function (b) {
                    return String.fromCharCode(b);
                }).join('');
            default:
                // Otherwise handle based on type of the first entry
                return value[0] ? handleArray[elementType](value) : [];
        }
    }
    // special case -- flags should show up as hex for easier comparison to standard
    if (key === 'flags') return '0x' + value.toString(16).padStart(2, '0').toUpperCase();
    // Handle 'default_sample_flags' or 'first_sample_flags
    if (key === 'default_sample_flags' || key === 'first_sample_flags') {
        return handleArray.LongSampleDependency(value);
    }
    // Handle string or Number or anything else that slips through
    return value;
};

var postProcess = function postProcess(boxes) {
    return boxes.map(function (box) {
        var keyList = box.keys;

        var _box = _extends({}, box),
            type = _box.type,
            start = _box.start,
            size = _box.size,
            hex = _box.hex;

        var boxContents = void 0,
            boxes = void 0;
        if (keyList.length) {
            boxContents = keyList.map(function (key) {
                // first check if the key is for sub-boxes
                if (key.includes('__altered')) return { name: key.split('__altered')[0], start: start, size: size, boxes: postProcess(box[key]) };
                // if the value of that key contains an array, map it to the new format
                /* if (key !== 'data' && Array.isArray(box[key]) && box[key].length) return box[key].map(entry => {
                    const entryKeys = Object.keys(entry);
                    return entryKeys.map(entryKey => ({ name: entryKey, display: entry[entryKey] }));
                }); */
                if (key === 'config') return { name: key, display: null, hex: box[key] };
                return { name: key, display: box[key], hex: hex || null };
            });
        }
        // Merge the boxContents with sub-boxes if applicable. If it has sub-boxes recurse to process those
        var subBoxes = box.boxes && box.boxes.length ? postProcess(box.boxes) : null;
        if (!boxContents) {
            //no keys, must be just a container box
            boxes = subBoxes;
        } else if (!subBoxes) {
            //no subBoxes, but has contents, just a bottom-level box
            boxes = boxContents;
        } else if (boxContents && subBoxes) {
            //has both its own contents and subboxes
            boxes = boxContents.concat(subBoxes);
        }
        return { type: type, start: start, size: size, boxes: boxes, hex: box.type === 'mdat' || box.type === 'free' ? hex : null };
    });
};

var mappedKey = function mappedKey(oldKey, box) {
    switch (oldKey) {
        case '_offset':
            return { newKey: 'start', value: box[oldKey] };
        case '_data':case 'data':
            return { newKey: 'hex', value: box[oldKey] };
        default:
            return { newKey: oldKey, value: box[oldKey] };
    }
};

// fist stage of processing, filter out generic or unneeded keys.
var convertBox = function convertBox(boxes) {

    var HIDE_KEYS = new Set(['type', 'start', 'end', '_offset', '_data', 'size', 'hex']);

    return boxes.reduce(function (result, box) {
        if (box._incomplete) console.log(box.type + ' payload not parsed due to missing bytes');
        var keys = Object.keys(box).filter(function (key) {
            return !/^_/i.test(key) || key === '_offset' || key === '_data';
        });
        return result.concat(keys.reduce(function (newBox, key) {
            // recurse if the contents of a key are other ISOBoxes.
            // console.log('');
            if (key === 'boxes' || Array.isArray(box[key]) && box[key][0] && box[key][0].hasOwnProperty('_cursor')) {
                // for non-box keys, make it an __altered entry
                if (key !== 'boxes') {
                    newBox.keys.push(key + '__altered');
                    newBox[key + '__altered'] = convertBox(box[key]);
                } else {
                    // if the key is boxes, recurse to return a converted key
                    newBox[key] = convertBox(box[key]);
                }
            } else {
                if (key !== '_data' || box.type === 'uuid' && key === '_data') {
                    var _mappedKey = mappedKey(key, box),
                        newKey = _mappedKey.newKey,
                        value = _mappedKey.value;

                    newBox[newKey] = getISOData(key, value);
                    if (!HIDE_KEYS.has(newKey)) newBox.keys.push(newKey);
                }
            }
            return newBox;
        }, { keys: [] }));
    }, []);
};

module.exports = {
    getISOData: getISOData,
    psshLookup: psshLookup,
    additionalBoxes: additionalBoxes,
    postProcess: postProcess,
    convertBox: convertBox
};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tTqp":
/***/ (function(module, exports) {

var numToHex = function numToHex(bit) {
    return bit.toString('16').padStart(2, '0').toUpperCase();
};

var convertToHex = function convertToHex(entry) {
    var ROW_SIZE = 16;
    var MAX_SIZE = 64 * ROW_SIZE;

    // create an array of bytes, capped at MAX_SIZE for display purposes
    var buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry)).slice(0, MAX_SIZE);

    var getRow = function getRow(start) {
        return start + ROW_SIZE < buffer.length ? [buffer.slice(start, start + ROW_SIZE).map(numToHex).join(' ')].concat(getRow(start + ROW_SIZE)) : [buffer.slice(start).map(numToHex).join(' ')];
    };

    return getRow(0);
};

var formatUuid = function formatUuid(entry) {
    var buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry));

    var groupBytes = function groupBytes(offset, size) {
        return buffer.slice(offset, offset + size).map(numToHex).join('');
    };

    return groupBytes(0, 4) + '-' + groupBytes(4, 2) + '-' + groupBytes(6, 2) + '-' + groupBytes(8, 2) + '-' + groupBytes(10, 6);
};

module.exports = {
    convertToHex: convertToHex,
    formatUuid: formatUuid
};

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","active":"active__27Q54"};

/***/ }),

/***/ "unQC":
/***/ (function(module, exports, __webpack_require__) {

/*! codem-isoboxer v0.3.7 https://github.com/madebyhiro/codem-isoboxer/blob/master/LICENSE.txt */
var ISOBoxer = {};

ISOBoxer.parseBuffer = function (arrayBuffer) {
  return new ISOFile(arrayBuffer).parse();
};

ISOBoxer.addBoxProcessor = function (type, parser) {
  if (typeof type !== 'string' || typeof parser !== 'function') {
    return;
  }
  ISOBox.prototype._boxProcessors[type] = parser;
};

ISOBoxer.createFile = function () {
  return new ISOFile();
};

// See ISOBoxer.append() for 'pos' parameter syntax
ISOBoxer.createBox = function (type, parent, pos) {
  var newBox = ISOBox.create(type);
  if (parent) {
    parent.append(newBox, pos);
  }
  return newBox;
};

// See ISOBoxer.append() for 'pos' parameter syntax
ISOBoxer.createFullBox = function (type, parent, pos) {
  var newBox = ISOBoxer.createBox(type, parent, pos);
  newBox.version = 0;
  newBox.flags = 0;
  return newBox;
};

ISOBoxer.Utils = {};
ISOBoxer.Utils.dataViewToString = function (dataView, encoding) {
  var impliedEncoding = encoding || 'utf-8';
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder(impliedEncoding).decode(dataView);
  }
  var a = [];
  var i = 0;

  if (impliedEncoding === 'utf-8') {
    /* The following algorithm is essentially a rewrite of the UTF8.decode at
    http://bannister.us/weblog/2007/simple-base64-encodedecode-javascript/
    */

    while (i < dataView.byteLength) {
      var c = dataView.getUint8(i++);
      if (c < 0x80) {
        // 1-byte character (7 bits)
      } else if (c < 0xe0) {
        // 2-byte character (11 bits)
        c = (c & 0x1f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      } else if (c < 0xf0) {
        // 3-byte character (16 bits)
        c = (c & 0xf) << 12;
        c |= (dataView.getUint8(i++) & 0x3f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      } else {
        // 4-byte character (21 bits)
        c = (c & 0x7) << 18;
        c |= (dataView.getUint8(i++) & 0x3f) << 12;
        c |= (dataView.getUint8(i++) & 0x3f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      }
      a.push(String.fromCharCode(c));
    }
  } else {
    // Just map byte-by-byte (probably wrong)
    while (i < dataView.byteLength) {
      a.push(String.fromCharCode(dataView.getUint8(i++)));
    }
  }
  return a.join('');
};

ISOBoxer.Utils.utf8ToByteArray = function (string) {
  // Only UTF-8 encoding is supported by TextEncoder
  var u, i;
  if (typeof TextEncoder !== 'undefined') {
    u = new TextEncoder().encode(string);
  } else {
    u = [];
    for (i = 0; i < string.length; ++i) {
      var c = string.charCodeAt(i);
      if (c < 0x80) {
        u.push(c);
      } else if (c < 0x800) {
        u.push(0xC0 | c >> 6);
        u.push(0x80 | 63 & c);
      } else if (c < 0x10000) {
        u.push(0xE0 | c >> 12);
        u.push(0x80 | 63 & c >> 6);
        u.push(0x80 | 63 & c);
      } else {
        u.push(0xF0 | c >> 18);
        u.push(0x80 | 63 & c >> 12);
        u.push(0x80 | 63 & c >> 6);
        u.push(0x80 | 63 & c);
      }
    }
  }
  return u;
};

// Method to append a box in the list of child boxes
// The 'pos' parameter can be either:
//   - (number) a position index at which to insert the new box
//   - (string) the type of the box after which to insert the new box
//   - (object) the box after which to insert the new box
ISOBoxer.Utils.appendBox = function (parent, box, pos) {
  box._offset = parent._cursor.offset;
  box._root = parent._root ? parent._root : parent;
  box._raw = parent._raw;
  box._parent = parent;

  if (pos === -1) {
    // The new box is a sub-box of the parent but not added in boxes array,
    // for example when the new box is set as an entry (see dref and stsd for example)
    return;
  }

  if (pos === undefined || pos === null) {
    parent.boxes.push(box);
    return;
  }

  var index = -1,
      type;

  if (typeof pos === "number") {
    index = pos;
  } else {
    if (typeof pos === "string") {
      type = pos;
    } else if (typeof pos === "object" && pos.type) {
      type = pos.type;
    } else {
      parent.boxes.push(box);
      return;
    }

    for (var i = 0; i < parent.boxes.length; i++) {
      if (type === parent.boxes[i].type) {
        index = i + 1;
        break;
      }
    }
  }
  parent.boxes.splice(index, 0, box);
};

if (true) {
  exports.parseBuffer = ISOBoxer.parseBuffer;
  exports.addBoxProcessor = ISOBoxer.addBoxProcessor;
  exports.createFile = ISOBoxer.createFile;
  exports.createBox = ISOBoxer.createBox;
  exports.createFullBox = ISOBoxer.createFullBox;
  exports.Utils = ISOBoxer.Utils;
}

ISOBoxer.Cursor = function (initialOffset) {
  this.offset = typeof initialOffset == 'undefined' ? 0 : initialOffset;
};

var ISOFile = function ISOFile(arrayBuffer) {
  this._cursor = new ISOBoxer.Cursor();
  this.boxes = [];
  if (arrayBuffer) {
    this._raw = new DataView(arrayBuffer);
  }
};

ISOFile.prototype.fetch = function (type) {
  var result = this.fetchAll(type, true);
  return result.length ? result[0] : null;
};

ISOFile.prototype.fetchAll = function (type, returnEarly) {
  var result = [];
  ISOFile._sweep.call(this, type, result, returnEarly);
  return result;
};

ISOFile.prototype.parse = function () {
  this._cursor.offset = 0;
  this.boxes = [];
  while (this._cursor.offset < this._raw.byteLength) {
    var box = ISOBox.parse(this);

    // Box could not be parsed
    if (typeof box.type === 'undefined') break;

    this.boxes.push(box);
  }
  return this;
};

ISOFile._sweep = function (type, result, returnEarly) {
  if (this.type && this.type == type) result.push(this);
  for (var box in this.boxes) {
    if (result.length && returnEarly) return;
    ISOFile._sweep.call(this.boxes[box], type, result, returnEarly);
  }
};

ISOFile.prototype.write = function () {

  var length = 0,
      i;

  for (i = 0; i < this.boxes.length; i++) {
    length += this.boxes[i].getLength(false);
  }

  var bytes = new Uint8Array(length);
  this._rawo = new DataView(bytes.buffer);
  this.bytes = bytes;
  this._cursor.offset = 0;

  for (i = 0; i < this.boxes.length; i++) {
    this.boxes[i].write();
  }

  return bytes.buffer;
};

ISOFile.prototype.append = function (box, pos) {
  ISOBoxer.Utils.appendBox(this, box, pos);
};
var ISOBox = function ISOBox() {
  this._cursor = new ISOBoxer.Cursor();
};

ISOBox.parse = function (parent) {
  var newBox = new ISOBox();
  newBox._offset = parent._cursor.offset;
  newBox._root = parent._root ? parent._root : parent;
  newBox._raw = parent._raw;
  newBox._parent = parent;
  newBox._parseBox();
  parent._cursor.offset = newBox._raw.byteOffset + newBox._raw.byteLength;
  return newBox;
};

ISOBox.create = function (type) {
  var newBox = new ISOBox();
  newBox.type = type;
  newBox.boxes = [];
  return newBox;
};

ISOBox.prototype._boxContainers = ['dinf', 'edts', 'mdia', 'meco', 'mfra', 'minf', 'moof', 'moov', 'mvex', 'stbl', 'strk', 'traf', 'trak', 'tref', 'udta', 'vttc', 'sinf', 'schi', 'encv', 'enca'];

ISOBox.prototype._boxProcessors = {};

///////////////////////////////////////////////////////////////////////////////////////////////////
// Generic read/write functions

ISOBox.prototype._procField = function (name, type, size) {
  if (this._parsing) {
    this[name] = this._readField(type, size);
  } else {
    this._writeField(type, size, this[name]);
  }
};

ISOBox.prototype._procFieldArray = function (name, length, type, size) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name][i] = this._readField(type, size);
    }
  } else {
    for (i = 0; i < this[name].length; i++) {
      this._writeField(type, size, this[name][i]);
    }
  }
};

ISOBox.prototype._procFullBox = function () {
  this._procField('version', 'uint', 8);
  this._procField('flags', 'uint', 24);
};

ISOBox.prototype._procEntries = function (name, length, fn) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name].push({});
      fn.call(this, this[name][i]);
    }
  } else {
    for (i = 0; i < length; i++) {
      fn.call(this, this[name][i]);
    }
  }
};

ISOBox.prototype._procSubEntries = function (entry, name, length, fn) {
  var i;
  if (this._parsing) {
    entry[name] = [];
    for (i = 0; i < length; i++) {
      entry[name].push({});
      fn.call(this, entry[name][i]);
    }
  } else {
    for (i = 0; i < length; i++) {
      fn.call(this, entry[name][i]);
    }
  }
};

ISOBox.prototype._procEntryField = function (entry, name, type, size) {
  if (this._parsing) {
    entry[name] = this._readField(type, size);
  } else {
    this._writeField(type, size, entry[name]);
  }
};

ISOBox.prototype._procSubBoxes = function (name, length) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name].push(ISOBox.parse(this));
    }
  } else {
    for (i = 0; i < length; i++) {
      if (this._rawo) {
        this[name][i].write();
      } else {
        this.size += this[name][i].getLength();
      }
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// Read/parse functions

ISOBox.prototype._readField = function (type, size) {
  switch (type) {
    case 'uint':
      return this._readUint(size);
    case 'int':
      return this._readInt(size);
    case 'template':
      return this._readTemplate(size);
    case 'string':
      return size === -1 ? this._readTerminatedString() : this._readString(size);
    case 'data':
      return this._readData(size);
    case 'utf8':
      return this._readUTF8String();
    default:
      return -1;
  }
};

ISOBox.prototype._readInt = function (size) {
  var result = null,
      offset = this._cursor.offset - this._raw.byteOffset;
  switch (size) {
    case 8:
      result = this._raw.getInt8(offset);
      break;
    case 16:
      result = this._raw.getInt16(offset);
      break;
    case 32:
      result = this._raw.getInt32(offset);
      break;
    case 64:
      // Warning: JavaScript cannot handle 64-bit integers natively.
      // This will give unexpected results for integers >= 2^53
      var s1 = this._raw.getInt32(offset);
      var s2 = this._raw.getInt32(offset + 4);
      result = s1 * Math.pow(2, 32) + s2;
      break;
  }
  this._cursor.offset += size >> 3;
  return result;
};

ISOBox.prototype._readUint = function (size) {
  var result = null,
      offset = this._cursor.offset - this._raw.byteOffset,
      s1,
      s2;
  switch (size) {
    case 8:
      result = this._raw.getUint8(offset);
      break;
    case 16:
      result = this._raw.getUint16(offset);
      break;
    case 24:
      s1 = this._raw.getUint16(offset);
      s2 = this._raw.getUint8(offset + 2);
      result = (s1 << 8) + s2;
      break;
    case 32:
      result = this._raw.getUint32(offset);
      break;
    case 64:
      // Warning: JavaScript cannot handle 64-bit integers natively.
      // This will give unexpected results for integers >= 2^53
      s1 = this._raw.getUint32(offset);
      s2 = this._raw.getUint32(offset + 4);
      result = s1 * Math.pow(2, 32) + s2;
      break;
  }
  this._cursor.offset += size >> 3;
  return result;
};

ISOBox.prototype._readString = function (length) {
  var str = '';
  for (var c = 0; c < length; c++) {
    var char = this._readUint(8);
    str += String.fromCharCode(char);
  }
  return str;
};

ISOBox.prototype._readTemplate = function (size) {
  var pre = this._readUint(size / 2);
  var post = this._readUint(size / 2);
  return pre + post / Math.pow(2, size / 2);
};

ISOBox.prototype._readTerminatedString = function () {
  var str = '';
  while (this._cursor.offset - this._offset < this._raw.byteLength) {
    var char = this._readUint(8);
    if (char === 0) break;
    str += String.fromCharCode(char);
  }
  return str;
};

ISOBox.prototype._readData = function (size) {
  var length = size > 0 ? size : this._raw.byteLength - (this._cursor.offset - this._offset);
  if (length > 0) {
    var data = new Uint8Array(this._raw.buffer, this._cursor.offset, length);

    this._cursor.offset += length;
    return data;
  } else {
    return null;
  }
};

ISOBox.prototype._readUTF8String = function () {
  var length = this._raw.byteLength - (this._cursor.offset - this._offset);
  var data = null;
  if (length > 0) {
    data = new DataView(this._raw.buffer, this._cursor.offset, length);
    this._cursor.offset += length;
  }

  return data ? ISOBoxer.Utils.dataViewToString(data) : data;
};

ISOBox.prototype._parseBox = function () {
  this._parsing = true;
  this._cursor.offset = this._offset;

  // return immediately if there are not enough bytes to read the header
  if (this._offset + 8 > this._raw.buffer.byteLength) {
    this._root._incomplete = true;
    return;
  }

  this._procField('size', 'uint', 32);
  this._procField('type', 'string', 4);

  if (this.size === 1) {
    this._procField('largesize', 'uint', 64);
  }
  if (this.type === 'uuid') {
    this._procFieldArray('usertype', 16, 'uint', 8);
  }

  switch (this.size) {
    case 0:
      this._raw = new DataView(this._raw.buffer, this._offset, this._raw.byteLength - this._cursor.offset + 8);
      break;
    case 1:
      if (this._offset + this.size > this._raw.buffer.byteLength) {
        this._incomplete = true;
        this._root._incomplete = true;
      } else {
        this._raw = new DataView(this._raw.buffer, this._offset, this.largesize);
      }
      break;
    default:
      if (this._offset + this.size > this._raw.buffer.byteLength) {
        this._incomplete = true;
        this._root._incomplete = true;
      } else {
        this._raw = new DataView(this._raw.buffer, this._offset, this.size);
      }
  }

  // additional parsing
  if (!this._incomplete) {
    if (this._boxProcessors[this.type]) {
      this._boxProcessors[this.type].call(this);
    }
    if (this._boxContainers.indexOf(this.type) !== -1) {
      this._parseContainerBox();
    } else {
      // Unknown box => read and store box content
      this._data = this._readData();
    }
  }
};

ISOBox.prototype._parseFullBox = function () {
  this.version = this._readUint(8);
  this.flags = this._readUint(24);
};

ISOBox.prototype._parseContainerBox = function () {
  this.boxes = [];
  while (this._cursor.offset - this._raw.byteOffset < this._raw.byteLength) {
    this.boxes.push(ISOBox.parse(this));
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// Write functions

ISOBox.prototype.append = function (box, pos) {
  ISOBoxer.Utils.appendBox(this, box, pos);
};

ISOBox.prototype.getLength = function () {
  this._parsing = false;
  this._rawo = null;

  this.size = 0;
  this._procField('size', 'uint', 32);
  this._procField('type', 'string', 4);

  if (this.size === 1) {
    this._procField('largesize', 'uint', 64);
  }
  if (this.type === 'uuid') {
    this._procFieldArray('usertype', 16, 'uint', 8);
  }

  if (this._boxProcessors[this.type]) {
    this._boxProcessors[this.type].call(this);
  }

  if (this._boxContainers.indexOf(this.type) !== -1) {
    for (var i = 0; i < this.boxes.length; i++) {
      this.size += this.boxes[i].getLength();
    }
  }

  if (this._data) {
    this._writeData(this._data);
  }

  return this.size;
};

ISOBox.prototype.write = function () {
  this._parsing = false;
  this._cursor.offset = this._parent._cursor.offset;

  switch (this.size) {
    case 0:
      this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.parent._rawo.byteLength - this._cursor.offset);
      break;
    case 1:
      this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.largesize);
      break;
    default:
      this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.size);
  }

  this._procField('size', 'uint', 32);
  this._procField('type', 'string', 4);

  if (this.size === 1) {
    this._procField('largesize', 'uint', 64);
  }
  if (this.type === 'uuid') {
    this._procFieldArray('usertype', 16, 'uint', 8);
  }

  if (this._boxProcessors[this.type]) {
    this._boxProcessors[this.type].call(this);
  }

  if (this._boxContainers.indexOf(this.type) !== -1) {
    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].write();
    }
  }

  if (this._data) {
    this._writeData(this._data);
  }

  this._parent._cursor.offset += this.size;

  return this.size;
};

ISOBox.prototype._writeInt = function (size, value) {
  if (this._rawo) {
    var offset = this._cursor.offset - this._rawo.byteOffset;
    switch (size) {
      case 8:
        this._rawo.setInt8(offset, value);
        break;
      case 16:
        this._rawo.setInt16(offset, value);
        break;
      case 32:
        this._rawo.setInt32(offset, value);
        break;
      case 64:
        // Warning: JavaScript cannot handle 64-bit integers natively.
        // This will give unexpected results for integers >= 2^53
        var s1 = Math.floor(value / Math.pow(2, 32));
        var s2 = value - s1 * Math.pow(2, 32);
        this._rawo.setUint32(offset, s1);
        this._rawo.setUint32(offset + 4, s2);
        break;
    }
    this._cursor.offset += size >> 3;
  } else {
    this.size += size >> 3;
  }
};

ISOBox.prototype._writeUint = function (size, value) {

  if (this._rawo) {
    var offset = this._cursor.offset - this._rawo.byteOffset,
        s1,
        s2;
    switch (size) {
      case 8:
        this._rawo.setUint8(offset, value);
        break;
      case 16:
        this._rawo.setUint16(offset, value);
        break;
      case 24:
        s1 = (value & 0xFFFF00) >> 8;
        s2 = value & 0x0000FF;
        this._rawo.setUint16(offset, s1);
        this._rawo.setUint8(offset + 2, s2);
        break;
      case 32:
        this._rawo.setUint32(offset, value);
        break;
      case 64:
        // Warning: JavaScript cannot handle 64-bit integers natively.
        // This will give unexpected results for integers >= 2^53
        s1 = Math.floor(value / Math.pow(2, 32));
        s2 = value - s1 * Math.pow(2, 32);
        this._rawo.setUint32(offset, s1);
        this._rawo.setUint32(offset + 4, s2);
        break;
    }
    this._cursor.offset += size >> 3;
  } else {
    this.size += size >> 3;
  }
};

ISOBox.prototype._writeString = function (size, str) {
  for (var c = 0; c < size; c++) {
    this._writeUint(8, str.charCodeAt(c));
  }
};

ISOBox.prototype._writeTerminatedString = function (str) {
  if (str.length === 0) {
    return;
  }
  for (var c = 0; c < str.length; c++) {
    this._writeUint(8, str.charCodeAt(c));
  }
  this._writeUint(8, 0);
};

ISOBox.prototype._writeTemplate = function (size, value) {
  var pre = Math.floor(value);
  var post = (value - pre) * Math.pow(2, size / 2);
  this._writeUint(size / 2, pre);
  this._writeUint(size / 2, post);
};

ISOBox.prototype._writeData = function (data) {
  var i;
  //data to copy
  if (data) {
    if (this._rawo) {
      //Array and Uint8Array has also to be managed
      if (data instanceof Array) {
        var offset = this._cursor.offset - this._rawo.byteOffset;
        for (var i = 0; i < data.length; i++) {
          this._rawo.setInt8(offset + i, data[i]);
        }
        this._cursor.offset += data.length;
      }

      if (data instanceof Uint8Array) {
        this._root.bytes.set(data, this._cursor.offset);
        this._cursor.offset += data.length;
      }
    } else {
      //nothing to copy only size to compute
      this.size += data.length;
    }
  }
};

ISOBox.prototype._writeUTF8String = function (string) {
  var u = ISOBoxer.Utils.utf8ToByteArray(string);
  if (this._rawo) {
    var dataView = new DataView(this._rawo.buffer, this._cursor.offset, u.length);
    for (var i = 0; i < u.length; i++) {
      dataView.setUint8(i, u[i]);
    }
  } else {
    this.size += u.length;
  }
};

ISOBox.prototype._writeField = function (type, size, value) {
  switch (type) {
    case 'uint':
      this._writeUint(size, value);
      break;
    case 'int':
      this._writeInt(size, value);
      break;
    case 'template':
      this._writeTemplate(size, value);
      break;
    case 'string':
      if (size == -1) {
        this._writeTerminatedString(value);
      } else {
        this._writeString(size, value);
      }
      break;
    case 'data':
      this._writeData(value);
      break;
    case 'utf8':
      this._writeUTF8String(value);
      break;
    default:
      break;
  }
};

// ISO/IEC 14496-15:2014 - avc1/2/3/4, hev1, hvc1, encv
ISOBox.prototype._boxProcessors['avc1'] = ISOBox.prototype._boxProcessors['avc2'] = ISOBox.prototype._boxProcessors['avc3'] = ISOBox.prototype._boxProcessors['avc4'] = ISOBox.prototype._boxProcessors['hvc1'] = ISOBox.prototype._boxProcessors['hev1'] = ISOBox.prototype._boxProcessors['encv'] = function () {
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
  this._procField('config', 'data', -1);
};

// ISO/IEC 14496-12:2012 - 8.7.2 Data Reference Box
ISOBox.prototype._boxProcessors['dref'] = function () {
  this._procFullBox();
  this._procField('entry_count', 'uint', 32);
  this._procSubBoxes('entries', this.entry_count);
};

// ISO/IEC 14496-12:2012 - 8.6.6 Edit List Box
ISOBox.prototype._boxProcessors['elst'] = function () {
  this._procFullBox();
  this._procField('entry_count', 'uint', 32);
  this._procEntries('entries', this.entry_count, function (entry) {
    this._procEntryField(entry, 'segment_duration', 'uint', this.version === 1 ? 64 : 32);
    this._procEntryField(entry, 'media_time', 'int', this.version === 1 ? 64 : 32);
    this._procEntryField(entry, 'media_rate_integer', 'int', 16);
    this._procEntryField(entry, 'media_rate_fraction', 'int', 16);
  });
};

// ISO/IEC 23009-1:2014 - 5.10.3.3 Event Message Box
ISOBox.prototype._boxProcessors['emsg'] = function () {
  this._procFullBox();
  if (this.version == 1) {
    this._procField('timescale', 'uint', 32);
    this._procField('presentation_time', 'uint', 64);
    this._procField('event_duration', 'uint', 32);
    this._procField('id', 'uint', 32);
    this._procField('scheme_id_uri', 'string', -1);
    this._procField('value', 'string', -1);
  } else {
    this._procField('scheme_id_uri', 'string', -1);
    this._procField('value', 'string', -1);
    this._procField('timescale', 'uint', 32);
    this._procField('presentation_time_delta', 'uint', 32);
    this._procField('event_duration', 'uint', 32);
    this._procField('id', 'uint', 32);
  }
  this._procField('message_data', 'data', -1);
};
// ISO/IEC 14496-12:2012 - 8.1.2 Free Space Box
ISOBox.prototype._boxProcessors['free'] = ISOBox.prototype._boxProcessors['skip'] = function () {
  this._procField('data', 'data', -1);
};

// ISO/IEC 14496-12:2012 - 8.12.2 Original Format Box
ISOBox.prototype._boxProcessors['frma'] = function () {
  this._procField('data_format', 'uint', 32);
};
// ISO/IEC 14496-12:2012 - 4.3 File Type Box / 8.16.2 Segment Type Box
ISOBox.prototype._boxProcessors['ftyp'] = ISOBox.prototype._boxProcessors['styp'] = function () {
  this._procField('major_brand', 'string', 4);
  this._procField('minor_version', 'uint', 32);
  var nbCompatibleBrands = -1;
  if (this._parsing) {
    nbCompatibleBrands = (this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset)) / 4;
  }
  this._procFieldArray('compatible_brands', nbCompatibleBrands, 'string', 4);
};

// ISO/IEC 14496-12:2012 - 8.4.3 Handler Reference Box
ISOBox.prototype._boxProcessors['hdlr'] = function () {
  this._procFullBox();
  this._procField('pre_defined', 'uint', 32);
  this._procField('handler_type', 'string', 4);
  this._procFieldArray('reserved', 3, 'uint', 32);
  this._procField('name', 'string', -1);
};

// ISO/IEC 14496-12:2012 - 8.1.1 Media Data Box
ISOBox.prototype._boxProcessors['mdat'] = function () {
  this._procField('data', 'data', -1);
};

// ISO/IEC 14496-12:2012 - 8.4.2 Media Header Box
ISOBox.prototype._boxProcessors['mdhd'] = function () {
  this._procFullBox();
  this._procField('creation_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('modification_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('timescale', 'uint', 32);
  this._procField('duration', 'uint', this.version == 1 ? 64 : 32);
  if (!this._parsing && typeof this.language === 'string') {
    // In case of writing and language has been set as a string, then convert it into char codes array
    this.language = this.language.charCodeAt(0) - 0x60 << 10 | this.language.charCodeAt(1) - 0x60 << 5 | this.language.charCodeAt(2) - 0x60;
  }
  this._procField('language', 'uint', 16);
  if (this._parsing) {
    this.language = String.fromCharCode((this.language >> 10 & 0x1F) + 0x60, (this.language >> 5 & 0x1F) + 0x60, (this.language & 0x1F) + 0x60);
  }
  this._procField('pre_defined', 'uint', 16);
};

// ISO/IEC 14496-12:2012 - 8.8.2 Movie Extends Header Box
ISOBox.prototype._boxProcessors['mehd'] = function () {
  this._procFullBox();
  this._procField('fragment_duration', 'uint', this.version == 1 ? 64 : 32);
};

// ISO/IEC 14496-12:2012 - 8.8.5 Movie Fragment Header Box
ISOBox.prototype._boxProcessors['mfhd'] = function () {
  this._procFullBox();
  this._procField('sequence_number', 'uint', 32);
};

// ISO/IEC 14496-12:2012 - 8.8.11 Movie Fragment Random Access Box
ISOBox.prototype._boxProcessors['mfro'] = function () {
  this._procFullBox();
  this._procField('mfra_size', 'uint', 32); // Called mfra_size to distinguish from the normal "size" attribute of a box
};

// ISO/IEC 14496-12:2012 - 8.5.2.2 mp4a box (use AudioSampleEntry definition and naming)
ISOBox.prototype._boxProcessors['mp4a'] = ISOBox.prototype._boxProcessors['enca'] = function () {
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
  // ESDescriptor fields
  this._procField('esds', 'data', -1);
};

// ISO/IEC 14496-12:2012 - 8.2.2 Movie Header Box
ISOBox.prototype._boxProcessors['mvhd'] = function () {
  this._procFullBox();
  this._procField('creation_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('modification_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('timescale', 'uint', 32);
  this._procField('duration', 'uint', this.version == 1 ? 64 : 32);
  this._procField('rate', 'template', 32);
  this._procField('volume', 'template', 16);
  this._procField('reserved1', 'uint', 16);
  this._procFieldArray('reserved2', 2, 'uint', 32);
  this._procFieldArray('matrix', 9, 'template', 32);
  this._procFieldArray('pre_defined', 6, 'uint', 32);
  this._procField('next_track_ID', 'uint', 32);
};

// ISO/IEC 14496-30:2014 - WebVTT Cue Payload Box.
ISOBox.prototype._boxProcessors['payl'] = function () {
  this._procField('cue_text', 'utf8');
};

//ISO/IEC 23001-7:2011 - 8.1 Protection System Specific Header Box
ISOBox.prototype._boxProcessors['pssh'] = function () {
  this._procFullBox();

  this._procFieldArray('SystemID', 16, 'uint', 8);
  this._procField('DataSize', 'uint', 32);
  this._procFieldArray('Data', this.DataSize, 'uint', 8);
};
// ISO/IEC 14496-12:2012 - 8.12.5 Scheme Type Box
ISOBox.prototype._boxProcessors['schm'] = function () {
  this._procFullBox();

  this._procField('scheme_type', 'uint', 32);
  this._procField('scheme_version', 'uint', 32);

  if (this.flags & 0x000001) {
    this._procField('scheme_uri', 'string', -1);
  }
};
// ISO/IEC 14496-12:2012 - 8.6.4.1 sdtp box 
ISOBox.prototype._boxProcessors['sdtp'] = function () {
  this._procFullBox();

  var sample_count = -1;
  if (this._parsing) {
    sample_count = this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset);
  }

  this._procFieldArray('sample_dependency_table', sample_count, 'uint', 8);
};

// ISO/IEC 14496-12:2012 - 8.16.3 Segment Index Box
ISOBox.prototype._boxProcessors['sidx'] = function () {
  this._procFullBox();
  this._procField('reference_ID', 'uint', 32);
  this._procField('timescale', 'uint', 32);
  this._procField('earliest_presentation_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('first_offset', 'uint', this.version == 1 ? 64 : 32);
  this._procField('reserved', 'uint', 16);
  this._procField('reference_count', 'uint', 16);
  this._procEntries('references', this.reference_count, function (entry) {
    if (!this._parsing) {
      entry.reference = (entry.reference_type & 0x00000001) << 31;
      entry.reference |= entry.referenced_size & 0x7FFFFFFF;
      entry.sap = (entry.starts_with_SAP & 0x00000001) << 31;
      entry.sap |= (entry.SAP_type & 0x00000003) << 28;
      entry.sap |= entry.SAP_delta_time & 0x0FFFFFFF;
    }
    this._procEntryField(entry, 'reference', 'uint', 32);
    this._procEntryField(entry, 'subsegment_duration', 'uint', 32);
    this._procEntryField(entry, 'sap', 'uint', 32);
    if (this._parsing) {
      entry.reference_type = entry.reference >> 31 & 0x00000001;
      entry.referenced_size = entry.reference & 0x7FFFFFFF;
      entry.starts_with_SAP = entry.sap >> 31 & 0x00000001;
      entry.SAP_type = entry.sap >> 28 & 0x00000007;
      entry.SAP_delta_time = entry.sap & 0x0FFFFFFF;
    }
  });
};

// ISO/IEC 14496-12:2012 - 8.4.5.3 Sound Media Header Box
ISOBox.prototype._boxProcessors['smhd'] = function () {
  this._procFullBox();
  this._procField('balance', 'uint', 16);
  this._procField('reserved', 'uint', 16);
};

// ISO/IEC 14496-12:2012 - 8.16.4 Subsegment Index Box
ISOBox.prototype._boxProcessors['ssix'] = function () {
  this._procFullBox();
  this._procField('subsegment_count', 'uint', 32);
  this._procEntries('subsegments', this.subsegment_count, function (subsegment) {
    this._procEntryField(subsegment, 'ranges_count', 'uint', 32);
    this._procSubEntries(subsegment, 'ranges', subsegment.ranges_count, function (range) {
      this._procEntryField(range, 'level', 'uint', 8);
      this._procEntryField(range, 'range_size', 'uint', 24);
    });
  });
};

// ISO/IEC 14496-12:2012 - 8.5.2 Sample Description Box
ISOBox.prototype._boxProcessors['stsd'] = function () {
  this._procFullBox();
  this._procField('entry_count', 'uint', 32);
  this._procSubBoxes('entries', this.entry_count);
};

// ISO/IEC 14496-12:2015 - 8.7.7 Sub-Sample Information Box
ISOBox.prototype._boxProcessors['subs'] = function () {
  this._procFullBox();
  this._procField('entry_count', 'uint', 32);
  this._procEntries('entries', this.entry_count, function (entry) {
    this._procEntryField(entry, 'sample_delta', 'uint', 32);
    this._procEntryField(entry, 'subsample_count', 'uint', 16);
    this._procSubEntries(entry, 'subsamples', entry.subsample_count, function (subsample) {
      this._procEntryField(subsample, 'subsample_size', 'uint', this.version === 1 ? 32 : 16);
      this._procEntryField(subsample, 'subsample_priority', 'uint', 8);
      this._procEntryField(subsample, 'discardable', 'uint', 8);
      this._procEntryField(subsample, 'codec_specific_parameters', 'uint', 32);
    });
  });
};

//ISO/IEC 23001-7:2011 - 8.2 Track Encryption Box
ISOBox.prototype._boxProcessors['tenc'] = function () {
  this._procFullBox();

  this._procField('default_IsEncrypted', 'uint', 24);
  this._procField('default_IV_size', 'uint', 8);
  this._procFieldArray('default_KID', 16, 'uint', 8);
};

// ISO/IEC 14496-12:2012 - 8.8.12 Track Fragmnent Decode Time
ISOBox.prototype._boxProcessors['tfdt'] = function () {
  this._procFullBox();
  this._procField('baseMediaDecodeTime', 'uint', this.version == 1 ? 64 : 32);
};

// ISO/IEC 14496-12:2012 - 8.8.7 Track Fragment Header Box
ISOBox.prototype._boxProcessors['tfhd'] = function () {
  this._procFullBox();
  this._procField('track_ID', 'uint', 32);
  if (this.flags & 0x01) this._procField('base_data_offset', 'uint', 64);
  if (this.flags & 0x02) this._procField('sample_description_offset', 'uint', 32);
  if (this.flags & 0x08) this._procField('default_sample_duration', 'uint', 32);
  if (this.flags & 0x10) this._procField('default_sample_size', 'uint', 32);
  if (this.flags & 0x20) this._procField('default_sample_flags', 'uint', 32);
};

// ISO/IEC 14496-12:2012 - 8.8.10 Track Fragment Random Access Box
ISOBox.prototype._boxProcessors['tfra'] = function () {
  this._procFullBox();
  this._procField('track_ID', 'uint', 32);
  if (!this._parsing) {
    this.reserved = 0;
    this.reserved |= (this.length_size_of_traf_num & 0x00000030) << 4;
    this.reserved |= (this.length_size_of_trun_num & 0x0000000C) << 2;
    this.reserved |= this.length_size_of_sample_num & 0x00000003;
  }
  this._procField('reserved', 'uint', 32);
  if (this._parsing) {
    this.length_size_of_traf_num = (this.reserved & 0x00000030) >> 4;
    this.length_size_of_trun_num = (this.reserved & 0x0000000C) >> 2;
    this.length_size_of_sample_num = this.reserved & 0x00000003;
  }
  this._procField('number_of_entry', 'uint', 32);
  this._procEntries('entries', this.number_of_entry, function (entry) {
    this._procEntryField(entry, 'time', 'uint', this.version === 1 ? 64 : 32);
    this._procEntryField(entry, 'moof_offset', 'uint', this.version === 1 ? 64 : 32);
    this._procEntryField(entry, 'traf_number', 'uint', (this.length_size_of_traf_num + 1) * 8);
    this._procEntryField(entry, 'trun_number', 'uint', (this.length_size_of_trun_num + 1) * 8);
    this._procEntryField(entry, 'sample_number', 'uint', (this.length_size_of_sample_num + 1) * 8);
  });
};

// ISO/IEC 14496-12:2012 - 8.3.2 Track Header Box
ISOBox.prototype._boxProcessors['tkhd'] = function () {
  this._procFullBox();
  this._procField('creation_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('modification_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('track_ID', 'uint', 32);
  this._procField('reserved1', 'uint', 32);
  this._procField('duration', 'uint', this.version == 1 ? 64 : 32);
  this._procFieldArray('reserved2', 2, 'uint', 32);
  this._procField('layer', 'uint', 16);
  this._procField('alternate_group', 'uint', 16);
  this._procField('volume', 'template', 16);
  this._procField('reserved3', 'uint', 16);
  this._procFieldArray('matrix', 9, 'template', 32);
  this._procField('width', 'template', 32);
  this._procField('height', 'template', 32);
};

// ISO/IEC 14496-12:2012 - 8.8.3 Track Extends Box
ISOBox.prototype._boxProcessors['trex'] = function () {
  this._procFullBox();
  this._procField('track_ID', 'uint', 32);
  this._procField('default_sample_description_index', 'uint', 32);
  this._procField('default_sample_duration', 'uint', 32);
  this._procField('default_sample_size', 'uint', 32);
  this._procField('default_sample_flags', 'uint', 32);
};

// ISO/IEC 14496-12:2012 - 8.8.8 Track Run Box
// Note: the 'trun' box has a direct relation to the 'tfhd' box for defaults.
// These defaults are not set explicitly here, but are left to resolve for the user.
ISOBox.prototype._boxProcessors['trun'] = function () {
  this._procFullBox();
  this._procField('sample_count', 'uint', 32);
  if (this.flags & 0x1) this._procField('data_offset', 'int', 32);
  if (this.flags & 0x4) this._procField('first_sample_flags', 'uint', 32);
  this._procEntries('samples', this.sample_count, function (sample) {
    if (this.flags & 0x100) this._procEntryField(sample, 'sample_duration', 'uint', 32);
    if (this.flags & 0x200) this._procEntryField(sample, 'sample_size', 'uint', 32);
    if (this.flags & 0x400) this._procEntryField(sample, 'sample_flags', 'uint', 32);
    if (this.flags & 0x800) this._procEntryField(sample, 'sample_composition_time_offset', this.version === 1 ? 'int' : 'uint', 32);
  });
};

// ISO/IEC 14496-12:2012 - 8.7.2 Data Reference Box
ISOBox.prototype._boxProcessors['url '] = ISOBox.prototype._boxProcessors['urn '] = function () {
  this._procFullBox();
  if (this.type === 'urn ') {
    this._procField('name', 'string', -1);
  }
  this._procField('location', 'string', -1);
};

// ISO/IEC 14496-30:2014 - WebVTT Source Label Box
ISOBox.prototype._boxProcessors['vlab'] = function () {
  this._procField('source_label', 'utf8');
};

// ISO/IEC 14496-12:2012 - 8.4.5.2 Video Media Header Box
ISOBox.prototype._boxProcessors['vmhd'] = function () {
  this._procFullBox();
  this._procField('graphicsmode', 'uint', 16);
  this._procFieldArray('opcolor', 3, 'uint', 16);
};

// ISO/IEC 14496-30:2014 - WebVTT Configuration Box
ISOBox.prototype._boxProcessors['vttC'] = function () {
  this._procField('config', 'utf8');
};

// ISO/IEC 14496-30:2014 - WebVTT Empty Sample Box
ISOBox.prototype._boxProcessors['vtte'] = function () {
  // Nothing should happen here.
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map