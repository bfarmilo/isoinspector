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

/***/ "09BN":
/***/ (function(module, exports) {

var schema = {
    "80": {
        "name": "ChapterDisplay",
        "level": "4",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "1",
        "description": "Contains all possible strings to use for the chapter display."
    },
    "83": {
        "name": "TrackType",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "1-254",
        "description": "A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control)."
    },
    "85": {
        "name": "ChapString",
        "cppname": "ChapterString",
        "level": "5",
        "type": "8",
        "mandatory": "1",
        "minver": "1",
        "webm": "1",
        "description": "Contains the string to use as the chapter atom."
    },
    "86": {
        "name": "CodecID",
        "level": "3",
        "type": "s",
        "mandatory": "1",
        "minver": "1",
        "description": "An ID corresponding to the codec, see the codec page for more info."
    },
    "88": {
        "name": "FlagDefault",
        "cppname": "TrackFlagDefault",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "default": "1",
        "range": "0-1",
        "description": "Set if that track (audio, video or subs) SHOULD be active if no language found matches the user preference. (1 bit)"
    },
    "89": {
        "name": "ChapterTrackNumber",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "description": "UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks."
    },
    "91": {
        "name": "ChapterTimeStart",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "1",
        "description": "Timestamp of the start of Chapter (not scaled)."
    },
    "92": {
        "name": "ChapterTimeEnd",
        "level": "4",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "description": "Timestamp of the end of Chapter (timestamp excluded, not scaled)."
    },
    "96": {
        "name": "CueRefTime",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "2",
        "webm": "0",
        "description": "Timestamp of the referenced Block."
    },
    "97": {
        "name": "CueRefCluster",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "webm": "0",
        "description": "The Position of the Cluster containing the referenced Block."
    },
    "98": {
        "name": "ChapterFlagHidden",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "range": "0-1",
        "description": "If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
    },
    "4254": {
        "name": "ContentCompAlgo",
        "level": "6",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "br": ["", "", "", ""],
        "del": ["1 - bzlib,", "2 - lzo1x"],
        "description": "The compression algorithm used. Algorithms that have been specified so far are: 0 - zlib,   3 - Header Stripping"
    },
    "4255": {
        "name": "ContentCompSettings",
        "level": "6",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track."
    },
    "4282": {
        "name": "DocType",
        "level": "1",
        "type": "s",
        "mandatory": "1",
        "default": "matroska",
        "minver": "1",
        "description": "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files."
    },
    "4285": {
        "name": "DocTypeReadVersion",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "1",
        "minver": "1",
        "description": "The minimum DocType version an interpreter has to support to read this file."
    },
    "4286": {
        "name": "EBMLVersion",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "1",
        "minver": "1",
        "description": "The version of EBML parser used to create the file."
    },
    "4287": {
        "name": "DocTypeVersion",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "1",
        "minver": "1",
        "description": "The version of DocType interpreter used to create the file."
    },
    "4444": {
        "name": "SegmentFamily",
        "level": "2",
        "type": "b",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "bytesize": "16",
        "description": "A randomly generated unique ID that all segments related to each other must use (128 bits)."
    },
    "4461": {
        "name": "DateUTC",
        "level": "2",
        "type": "d",
        "minver": "1",
        "description": "Date of the origin of timestamp (value 0), i.e. production date."
    },
    "4484": {
        "name": "TagDefault",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "1",
        "range": "0-1",
        "description": "Indication to know if this is the default/original language to use for the given tag. (1 bit)"
    },
    "4485": {
        "name": "TagBinary",
        "level": "4",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString."
    },
    "4487": {
        "name": "TagString",
        "level": "4",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "The value of the Tag."
    },
    "4489": {
        "name": "Duration",
        "level": "2",
        "type": "f",
        "minver": "1",
        "range": "> 0",
        "description": "Duration of the segment (based on TimecodeScale)."
    },
    "4598": {
        "name": "ChapterFlagEnabled",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "1",
        "range": "0-1",
        "description": "Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter (see flag notes). (1 bit)"
    },
    "4660": {
        "name": "FileMimeType",
        "level": "3",
        "type": "s",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "MIME type of the file."
    },
    "4661": {
        "name": "FileUsedStartTime",
        "level": "3",
        "type": "u",
        "divx": "1",
        "description": "DivX font extension"
    },
    "4662": {
        "name": "FileUsedEndTime",
        "level": "3",
        "type": "u",
        "divx": "1",
        "description": "DivX font extension"
    },
    "4675": {
        "name": "FileReferral",
        "level": "3",
        "type": "b",
        "webm": "0",
        "description": "A binary value that a track/codec can refer to when the attachment is needed."
    },
    "5031": {
        "name": "ContentEncodingOrder",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment."
    },
    "5032": {
        "name": "ContentEncodingScope",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "1",
        "range": "not 0",
        "br": ["", "", ""],
        "description": "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values: 1 - all frame contents, 2 - the track's private data, 4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)"
    },
    "5033": {
        "name": "ContentEncodingType",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "br": ["", ""],
        "description": "A value describing what kind of transformation has been done. Possible values: 0 - compression, 1 - encryption"
    },
    "5034": {
        "name": "ContentCompression",
        "level": "5",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking."
    },
    "5035": {
        "name": "ContentEncryption",
        "level": "5",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise."
    },
    "5378": {
        "name": "CueBlockNumber",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "1",
        "range": "not 0",
        "description": "Number of the Block in the specified Cluster."
    },
    "5654": {
        "name": "ChapterStringUID",
        "level": "4",
        "type": "8",
        "mandatory": "0",
        "minver": "3",
        "webm": "1",
        "description": "A unique string ID to identify the Chapter. Use for WebVTT cue identifier storage."
    },
    "5741": {
        "name": "WritingApp",
        "level": "2",
        "type": "8",
        "mandatory": "1",
        "minver": "1",
        "description": "Writing application (\"mkvmerge-0.3.3\")."
    },
    "5854": {
        "name": "SilentTracks",
        "cppname": "ClusterSilentTracks",
        "level": "2",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use."
    },
    "6240": {
        "name": "ContentEncoding",
        "level": "4",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Settings for one content encoding like compression or encryption."
    },
    "6264": {
        "name": "BitDepth",
        "cppname": "AudioBitDepth",
        "level": "4",
        "type": "u",
        "minver": "1",
        "range": "not 0",
        "description": "Bits per sample, mostly used for PCM."
    },
    "6532": {
        "name": "SignedElement",
        "level": "3",
        "type": "b",
        "multiple": "1",
        "webm": "0",
        "description": "An element ID whose data will be used to compute the signature."
    },
    "6624": {
        "name": "TrackTranslate",
        "level": "3",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "The track identification for the given Chapter Codec."
    },
    "6911": {
        "name": "ChapProcessCommand",
        "cppname": "ChapterProcessCommand",
        "level": "5",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contains all the commands associated to the Atom."
    },
    "6922": {
        "name": "ChapProcessTime",
        "cppname": "ChapterProcessTime",
        "level": "6",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter)."
    },
    "6924": {
        "name": "ChapterTranslate",
        "level": "2",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "A tuple of corresponding ID used by chapter codecs to represent this segment."
    },
    "6933": {
        "name": "ChapProcessData",
        "cppname": "ChapterProcessData",
        "level": "6",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands."
    },
    "6944": {
        "name": "ChapProcess",
        "cppname": "ChapterProcess",
        "level": "4",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contains all the commands associated to the Atom."
    },
    "6955": {
        "name": "ChapProcessCodecID",
        "cppname": "ChapterProcessCodecID",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later."
    },
    "7373": {
        "name": "Tag",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Element containing elements specific to Tracks/Chapters."
    },
    "7384": {
        "name": "SegmentFilename",
        "level": "2",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "A filename corresponding to this segment."
    },
    "7446": {
        "name": "AttachmentLink",
        "cppname": "TrackAttachmentLink",
        "level": "3",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "description": "The UID of an attachment that is used by this codec."
    },
    "258688": {
        "name": "CodecName",
        "level": "3",
        "type": "8",
        "minver": "1",
        "description": "A human-readable string specifying the codec."
    },
    "18538067": {
        "name": "Segment",
        "level": "0",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment."
    },
    "447a": {
        "name": "TagLanguage",
        "level": "4",
        "type": "s",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "und",
        "description": "Specifies the language of the tag specified, in the Matroska languages form."
    },
    "45a3": {
        "name": "TagName",
        "level": "4",
        "type": "8",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The name of the Tag that is going to be stored."
    },
    "67c8": {
        "name": "SimpleTag",
        "cppname": "TagSimple",
        "level": "3",
        "recursive": "1",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contains general information about the target."
    },
    "63c6": {
        "name": "TagAttachmentUID",
        "level": "4",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment."
    },
    "63c4": {
        "name": "TagChapterUID",
        "level": "4",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment."
    },
    "63c9": {
        "name": "TagEditionUID",
        "level": "4",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment."
    },
    "63c5": {
        "name": "TagTrackUID",
        "level": "4",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment."
    },
    "63ca": {
        "name": "TargetType",
        "cppname": "TagTargetType",
        "level": "4",
        "type": "s",
        "minver": "1",
        "webm": "0",
        "strong": "informational",
        "description": "An  string that can be used to display the logical level of the target like \"ALBUM\", \"TRACK\", \"MOVIE\", \"CHAPTER\", etc (see TargetType)."
    },
    "68ca": {
        "name": "TargetTypeValue",
        "cppname": "TagTargetTypeValue",
        "level": "4",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "default": "50",
        "description": "A number to indicate the logical level of the target (see TargetType)."
    },
    "63c0": {
        "name": "Targets",
        "cppname": "TagTargets",
        "level": "3",
        "type": "m",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment."
    },
    "1254c367": {
        "name": "Tags",
        "level": "1",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here."
    },
    "450d": {
        "name": "ChapProcessPrivate",
        "cppname": "ChapterProcessPrivate",
        "level": "5",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the \"DVD level\" equivalent."
    },
    "437e": {
        "name": "ChapCountry",
        "cppname": "ChapterCountry",
        "level": "5",
        "type": "s",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "The countries corresponding to the string, same 2 octets as in Internet domains."
    },
    "437c": {
        "name": "ChapLanguage",
        "cppname": "ChapterLanguage",
        "level": "5",
        "type": "s",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "1",
        "default": "eng",
        "description": "The languages corresponding to the string, in the bibliographic ISO-639-2 form."
    },
    "8f": {
        "name": "ChapterTrack",
        "level": "4",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "List of tracks on which the chapter applies. If this element is not present, all tracks apply"
    },
    "63c3": {
        "name": "ChapterPhysicalEquiv",
        "level": "4",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "description": "Specify the physical equivalent of this ChapterAtom like \"DVD\" (60) or \"SIDE\" (50), see complete list of values."
    },
    "6ebc": {
        "name": "ChapterSegmentEditionUID",
        "level": "4",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "description": "The EditionUID to play from the segment linked in ChapterSegmentUID."
    },
    "6e67": {
        "name": "ChapterSegmentUID",
        "level": "4",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "range": ">0",
        "bytesize": "16",
        "description": "A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used."
    },
    "73c4": {
        "name": "ChapterUID",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "1",
        "range": "not 0",
        "description": "A unique ID to identify the Chapter."
    },
    "b6": {
        "name": "ChapterAtom",
        "level": "3",
        "recursive": "1",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "1",
        "description": "Contains the atom information to use as the chapter atom (apply to all tracks)."
    },
    "45dd": {
        "name": "EditionFlagOrdered",
        "level": "3",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "range": "0-1",
        "description": "Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)"
    },
    "45db": {
        "name": "EditionFlagDefault",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "range": "0-1",
        "description": "If a flag is set (1) the edition should be used as the default one. (1 bit)"
    },
    "45bd": {
        "name": "EditionFlagHidden",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "range": "0-1",
        "description": "If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
    },
    "45bc": {
        "name": "EditionUID",
        "level": "3",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "description": "A unique ID to identify the edition. It's useful for tagging an edition."
    },
    "45b9": {
        "name": "EditionEntry",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "1",
        "description": "Contains all information about a segment edition."
    },
    "1043a770": {
        "name": "Chapters",
        "level": "1",
        "type": "m",
        "minver": "1",
        "webm": "1",
        "description": "A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation."
    },
    "46ae": {
        "name": "FileUID",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "description": "Unique ID representing the file, as random as possible."
    },
    "465c": {
        "name": "FileData",
        "level": "3",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The data of the file."
    },
    "466e": {
        "name": "FileName",
        "level": "3",
        "type": "8",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "Filename of the attached file."
    },
    "467e": {
        "name": "FileDescription",
        "level": "3",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "A human-friendly name for the attached file."
    },
    "61a7": {
        "name": "AttachedFile",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "An attached file."
    },
    "1941a469": {
        "name": "Attachments",
        "level": "1",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "Contain attached files."
    },
    "eb": {
        "name": "CueRefCodecState",
        "level": "5",
        "type": "u",
        "webm": "0",
        "default": "0",
        "description": "The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry."
    },
    "535f": {
        "name": "CueRefNumber",
        "level": "5",
        "type": "u",
        "webm": "0",
        "default": "1",
        "range": "not 0",
        "description": "Number of the referenced Block of Track X in the specified Cluster."
    },
    "db": {
        "name": "CueReference",
        "level": "4",
        "type": "m",
        "multiple": "1",
        "minver": "2",
        "webm": "0",
        "description": "The Clusters containing the required referenced Blocks."
    },
    "ea": {
        "name": "CueCodecState",
        "level": "4",
        "type": "u",
        "minver": "2",
        "webm": "0",
        "default": "0",
        "description": "The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry."
    },
    "b2": {
        "name": "CueDuration",
        "level": "4",
        "type": "u",
        "mandatory": "0",
        "minver": "4",
        "webm": "0",
        "description": "The duration of the block according to the segment time base. If missing the track's DefaultDuration does not apply and no duration information is available in terms of the cues."
    },
    "f0": {
        "name": "CueRelativePosition",
        "level": "4",
        "type": "u",
        "mandatory": "0",
        "minver": "4",
        "webm": "0",
        "description": "The relative position of the referenced block inside the cluster with 0 being the first possible position for an element inside that cluster."
    },
    "f1": {
        "name": "CueClusterPosition",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "description": "The position of the Cluster containing the required Block."
    },
    "f7": {
        "name": "CueTrack",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "not 0",
        "description": "The track for which a position is given."
    },
    "b7": {
        "name": "CueTrackPositions",
        "level": "3",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Contain positions for different tracks corresponding to the timestamp."
    },
    "b3": {
        "name": "CueTime",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "description": "Absolute timestamp according to the segment time base."
    },
    "bb": {
        "name": "CuePoint",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Contains all information relative to a seek point in the segment."
    },
    "1c53bb6b": {
        "name": "Cues",
        "level": "1",
        "type": "m",
        "minver": "1",
        "description": "A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non \"live\" streams."
    },
    "47e6": {
        "name": "ContentSigHashAlgo",
        "level": "6",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "br": ["", ""],
        "description": "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - SHA1-160 2 - MD5"
    },
    "47e5": {
        "name": "ContentSigAlgo",
        "level": "6",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "br": "",
        "description": "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - RSA"
    },
    "47e4": {
        "name": "ContentSigKeyID",
        "level": "6",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "This is the ID of the private key the data was signed with."
    },
    "47e3": {
        "name": "ContentSignature",
        "level": "6",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "A cryptographic signature of the contents."
    },
    "47e2": {
        "name": "ContentEncKeyID",
        "level": "6",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "For public key algorithms this is the ID of the public key the the data was encrypted with."
    },
    "47e1": {
        "name": "ContentEncAlgo",
        "level": "6",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "br": "",
        "description": "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values: 1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES"
    },
    "6d80": {
        "name": "ContentEncodings",
        "level": "3",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "Settings for several content encoding mechanisms like compression or encryption."
    },
    "c4": {
        "name": "TrickMasterTrackSegmentUID",
        "level": "3",
        "type": "b",
        "divx": "1",
        "bytesize": "16",
        "description": "DivX trick track extenstions"
    },
    "c7": {
        "name": "TrickMasterTrackUID",
        "level": "3",
        "type": "u",
        "divx": "1",
        "description": "DivX trick track extenstions"
    },
    "c6": {
        "name": "TrickTrackFlag",
        "level": "3",
        "type": "u",
        "divx": "1",
        "default": "0",
        "description": "DivX trick track extenstions"
    },
    "c1": {
        "name": "TrickTrackSegmentUID",
        "level": "3",
        "type": "b",
        "divx": "1",
        "bytesize": "16",
        "description": "DivX trick track extenstions"
    },
    "c0": {
        "name": "TrickTrackUID",
        "level": "3",
        "type": "u",
        "divx": "1",
        "description": "DivX trick track extenstions"
    },
    "ed": {
        "name": "TrackJoinUID",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "multiple": "1",
        "minver": "3",
        "webm": "0",
        "range": "not 0",
        "description": "The trackUID number of a track whose blocks are used to create this virtual track."
    },
    "e9": {
        "name": "TrackJoinBlocks",
        "level": "4",
        "type": "m",
        "minver": "3",
        "webm": "0",
        "description": "Contains the list of all tracks whose Blocks need to be combined to create this virtual track"
    },
    "e6": {
        "name": "TrackPlaneType",
        "level": "6",
        "type": "u",
        "mandatory": "1",
        "minver": "3",
        "webm": "0",
        "description": "The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background)."
    },
    "e5": {
        "name": "TrackPlaneUID",
        "level": "6",
        "type": "u",
        "mandatory": "1",
        "minver": "3",
        "webm": "0",
        "range": "not 0",
        "description": "The trackUID number of the track representing the plane."
    },
    "e4": {
        "name": "TrackPlane",
        "level": "5",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "3",
        "webm": "0",
        "description": "Contains a video plane track that need to be combined to create this 3D track"
    },
    "e3": {
        "name": "TrackCombinePlanes",
        "level": "4",
        "type": "m",
        "minver": "3",
        "webm": "0",
        "description": "Contains the list of all video plane tracks that need to be combined to create this 3D track"
    },
    "e2": {
        "name": "TrackOperation",
        "level": "3",
        "type": "m",
        "minver": "3",
        "webm": "0",
        "description": "Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject."
    },
    "7d7b": {
        "name": "ChannelPositions",
        "cppname": "AudioPosition",
        "level": "4",
        "type": "b",
        "webm": "0",
        "description": "Table of horizontal angles for each successive channel, see appendix."
    },
    "9f": {
        "name": "Channels",
        "cppname": "AudioChannels",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "default": "1",
        "range": "not 0",
        "description": "Numbers of channels in the track."
    },
    "78b5": {
        "name": "OutputSamplingFrequency",
        "cppname": "AudioOutputSamplingFreq",
        "level": "4",
        "type": "f",
        "minver": "1",
        "default": "Sampling Frequency",
        "range": "> 0",
        "description": "Real output sampling frequency in Hz (used for SBR techniques)."
    },
    "b5": {
        "name": "SamplingFrequency",
        "cppname": "AudioSamplingFreq",
        "level": "4",
        "type": "f",
        "mandatory": "1",
        "minver": "1",
        "default": "8000.0",
        "range": "> 0",
        "description": "Sampling frequency in Hz."
    },
    "e1": {
        "name": "Audio",
        "cppname": "TrackAudio",
        "level": "3",
        "type": "m",
        "minver": "1",
        "description": "Audio settings."
    },
    "2383e3": {
        "name": "FrameRate",
        "cppname": "VideoFrameRate",
        "level": "4",
        "type": "f",
        "range": "> 0",
        "strong": "Informational",
        "description": "Number of frames per second.  only."
    },
    "2fb523": {
        "name": "GammaValue",
        "cppname": "VideoGamma",
        "level": "4",
        "type": "f",
        "webm": "0",
        "range": "> 0",
        "description": "Gamma Value."
    },
    "2eb524": {
        "name": "ColourSpace",
        "cppname": "VideoColourSpace",
        "level": "4",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "bytesize": "4",
        "description": "Same value as in AVI (32 bits)."
    },
    "54b3": {
        "name": "AspectRatioType",
        "cppname": "VideoAspectRatio",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed)."
    },
    "54b2": {
        "name": "DisplayUnit",
        "cppname": "VideoDisplayUnit",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio)."
    },
    "54ba": {
        "name": "DisplayHeight",
        "cppname": "VideoDisplayHeight",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "PixelHeight",
        "range": "not 0",
        "description": "Height of the video frames to display. The default value is only valid when DisplayUnit is 0."
    },
    "54b0": {
        "name": "DisplayWidth",
        "cppname": "VideoDisplayWidth",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "PixelWidth",
        "range": "not 0",
        "description": "Width of the video frames to display. The default value is only valid when DisplayUnit is 0."
    },
    "54dd": {
        "name": "PixelCropRight",
        "cppname": "VideoPixelCropRight",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "The number of video pixels to remove on the right of the image."
    },
    "54cc": {
        "name": "PixelCropLeft",
        "cppname": "VideoPixelCropLeft",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "The number of video pixels to remove on the left of the image."
    },
    "54bb": {
        "name": "PixelCropTop",
        "cppname": "VideoPixelCropTop",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "The number of video pixels to remove at the top of the image."
    },
    "54aa": {
        "name": "PixelCropBottom",
        "cppname": "VideoPixelCropBottom",
        "level": "4",
        "type": "u",
        "minver": "1",
        "default": "0",
        "description": "The number of video pixels to remove at the bottom of the image (for HDTV content)."
    },
    "ba": {
        "name": "PixelHeight",
        "cppname": "VideoPixelHeight",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "not 0",
        "description": "Height of the encoded video frames in pixels."
    },
    "b0": {
        "name": "PixelWidth",
        "cppname": "VideoPixelWidth",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "not 0",
        "description": "Width of the encoded video frames in pixels."
    },
    "53b9": {
        "name": "OldStereoMode",
        "level": "4",
        "type": "u",
        "maxver": "0",
        "webm": "0",
        "divx": "0",
        "description": "DEPRECATED, DO NOT USE. Bogus StereoMode value used in old versions of libmatroska. (0: mono, 1: right eye, 2: left eye, 3: both eyes)."
    },
    "53c0": {
        "name": "AlphaMode",
        "cppname": "VideoAlphaMode",
        "level": "4",
        "type": "u",
        "minver": "3",
        "webm": "1",
        "default": "0",
        "description": "Alpha Video Mode. Presence of this element indicates that the BlockAdditional element could contain Alpha data."
    },
    "53b8": {
        "name": "StereoMode",
        "cppname": "VideoStereoMode",
        "level": "4",
        "type": "u",
        "minver": "3",
        "webm": "1",
        "default": "0",
        "description": "Stereo-3D video mode (0: mono, 1: side by side (left eye is first), 2: top-bottom (right eye is first), 3: top-bottom (left eye is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red), 11: side by side (right eye is first), 12: anaglyph (green/magenta), 13 both eyes laced in one Block (left eye is first), 14 both eyes laced in one Block (right eye is first)) . There are some more details on 3D support in the Specification Notes."
    },
    "9a": {
        "name": "FlagInterlaced",
        "cppname": "VideoFlagInterlaced",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "2",
        "webm": "1",
        "default": "0",
        "range": "0-1",
        "description": "Set if the video is interlaced. (1 bit)"
    },
    "e0": {
        "name": "Video",
        "cppname": "TrackVideo",
        "level": "3",
        "type": "m",
        "minver": "1",
        "description": "Video settings."
    },
    "66a5": {
        "name": "TrackTranslateTrackID",
        "level": "4",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used."
    },
    "66bf": {
        "name": "TrackTranslateCodec",
        "level": "4",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
    },
    "66fc": {
        "name": "TrackTranslateEditionUID",
        "level": "4",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment."
    },
    "56bb": {
        "name": "SeekPreRoll",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "multiple": "0",
        "default": "0",
        "minver": "4",
        "webm": "1",
        "description": "After a discontinuity, SeekPreRoll is the duration in nanoseconds of the data the decoder must decode before the decoded data is valid."
    },
    "56aa": {
        "name": "CodecDelay",
        "level": "3",
        "type": "u",
        "multiple": "0",
        "default": "0",
        "minver": "4",
        "webm": "1",
        "description": "CodecDelay is The codec-built-in delay in nanoseconds. This value must be subtracted from each block timestamp in order to get the actual timestamp. The value should be small so the muxing of tracks with the same actual timestamp are in the same Cluster."
    },
    "6fab": {
        "name": "TrackOverlay",
        "level": "3",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc."
    },
    "aa": {
        "name": "CodecDecodeAll",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "2",
        "webm": "0",
        "default": "1",
        "range": "0-1",
        "description": "The codec can decode potentially damaged data (1 bit)."
    },
    "26b240": {
        "name": "CodecDownloadURL",
        "level": "3",
        "type": "s",
        "multiple": "1",
        "webm": "0",
        "description": "A URL to download about the codec used."
    },
    "3b4040": {
        "name": "CodecInfoURL",
        "level": "3",
        "type": "s",
        "multiple": "1",
        "webm": "0",
        "description": "A URL to find information about the codec used."
    },
    "3a9697": {
        "name": "CodecSettings",
        "level": "3",
        "type": "8",
        "webm": "0",
        "description": "A string describing the encoding setting used."
    },
    "63a2": {
        "name": "CodecPrivate",
        "level": "3",
        "type": "b",
        "minver": "1",
        "description": "Private data only known to the codec."
    },
    "22b59c": {
        "name": "Language",
        "cppname": "TrackLanguage",
        "level": "3",
        "type": "s",
        "minver": "1",
        "default": "eng",
        "description": "Specifies the language of the track in the Matroska languages form."
    },
    "536e": {
        "name": "Name",
        "cppname": "TrackName",
        "level": "3",
        "type": "8",
        "minver": "1",
        "description": "A human-readable track name."
    },
    "55ee": {
        "name": "MaxBlockAdditionID",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "The maximum value of BlockAdditions for this track."
    },
    "537f": {
        "name": "TrackOffset",
        "level": "3",
        "type": "i",
        "webm": "0",
        "default": "0",
        "description": "A value to add to the Block's Timestamp. This can be used to adjust the playback offset of a track."
    },
    "23314f": {
        "name": "TrackTimecodeScale",
        "level": "3",
        "type": "f",
        "mandatory": "1",
        "minver": "1",
        "maxver": "3",
        "webm": "0",
        "default": "1.0",
        "range": "> 0",
        "description": "DEPRECATED, DO NOT USE. The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs)."
    },
    "234e7a": {
        "name": "DefaultDecodedFieldDuration",
        "cppname": "TrackDefaultDecodedFieldDuration",
        "level": "3",
        "type": "u",
        "minver": "4",
        "range": "not 0",
        "description": "The period in nanoseconds (not scaled by TimcodeScale)\nbetween two successive fields at the output of the decoding process (see the notes)"
    },
    "23e383": {
        "name": "DefaultDuration",
        "cppname": "TrackDefaultDuration",
        "level": "3",
        "type": "u",
        "minver": "1",
        "range": "not 0",
        "description": "Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one element put into a (Simple)Block)."
    },
    "6df8": {
        "name": "MaxCache",
        "cppname": "TrackMaxCache",
        "level": "3",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "description": "The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed."
    },
    "6de7": {
        "name": "MinCache",
        "cppname": "TrackMinCache",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used."
    },
    "9c": {
        "name": "FlagLacing",
        "cppname": "TrackFlagLacing",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "default": "1",
        "range": "0-1",
        "description": "Set if the track may contain blocks using lacing. (1 bit)"
    },
    "55aa": {
        "name": "FlagForced",
        "cppname": "TrackFlagForced",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "default": "0",
        "range": "0-1",
        "description": "Set if that track MUST be active during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)"
    },
    "b9": {
        "name": "FlagEnabled",
        "cppname": "TrackFlagEnabled",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "2",
        "webm": "1",
        "default": "1",
        "range": "0-1",
        "description": "Set if the track is usable. (1 bit)"
    },
    "73c5": {
        "name": "TrackUID",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "not 0",
        "description": "A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file."
    },
    "d7": {
        "name": "TrackNumber",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "range": "not 0",
        "description": "The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number)."
    },
    "ae": {
        "name": "TrackEntry",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Describes a track with all elements."
    },
    "1654ae6b": {
        "name": "Tracks",
        "level": "1",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "description": "A top-level block of information with many tracks described."
    },
    "af": {
        "name": "EncryptedBlock",
        "level": "2",
        "type": "b",
        "multiple": "1",
        "webm": "0",
        "description": "Similar to EncryptedBlock Structure)"
    },
    "ca": {
        "name": "ReferenceTimeCode",
        "level": "4",
        "type": "u",
        "multiple": "0",
        "mandatory": "1",
        "minver": "0",
        "webm": "0",
        "divx": "1",
        "description": "DivX trick track extenstions"
    },
    "c9": {
        "name": "ReferenceOffset",
        "level": "4",
        "type": "u",
        "multiple": "0",
        "mandatory": "1",
        "minver": "0",
        "webm": "0",
        "divx": "1",
        "description": "DivX trick track extenstions"
    },
    "c8": {
        "name": "ReferenceFrame",
        "level": "3",
        "type": "m",
        "multiple": "0",
        "minver": "0",
        "webm": "0",
        "divx": "1",
        "description": "DivX trick track extenstions"
    },
    "cf": {
        "name": "SliceDuration",
        "level": "5",
        "type": "u",
        "default": "0",
        "description": "The (scaled) duration to apply to the element."
    },
    "ce": {
        "name": "Delay",
        "cppname": "SliceDelay",
        "level": "5",
        "type": "u",
        "default": "0",
        "description": "The (scaled) delay to apply to the element."
    },
    "cb": {
        "name": "BlockAdditionID",
        "cppname": "SliceBlockAddID",
        "level": "5",
        "type": "u",
        "default": "0",
        "description": "The ID of the BlockAdditional element (0 is the main Block)."
    },
    "cd": {
        "name": "FrameNumber",
        "cppname": "SliceFrameNumber",
        "level": "5",
        "type": "u",
        "default": "0",
        "description": "The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame)."
    },
    "cc": {
        "name": "LaceNumber",
        "cppname": "SliceLaceNumber",
        "level": "5",
        "type": "u",
        "minver": "1",
        "default": "0",
        "divx": "0",
        "description": "The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
    },
    "e8": {
        "name": "TimeSlice",
        "level": "4",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "divx": "0",
        "description": "Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
    },
    "8e": {
        "name": "Slices",
        "level": "3",
        "type": "m",
        "minver": "1",
        "divx": "0",
        "description": "Contains slices description."
    },
    "75a2": {
        "name": "DiscardPadding",
        "level": "3",
        "type": "i",
        "minver": "4",
        "webm": "1",
        "description": "Duration in nanoseconds of the silent data added to the Block (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and should be discarded during playback."
    },
    "a4": {
        "name": "CodecState",
        "level": "3",
        "type": "b",
        "minver": "2",
        "webm": "0",
        "description": "The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry."
    },
    "fd": {
        "name": "ReferenceVirtual",
        "level": "3",
        "type": "i",
        "webm": "0",
        "description": "Relative position of the data that should be in position of the virtual block."
    },
    "fb": {
        "name": "ReferenceBlock",
        "level": "3",
        "type": "i",
        "multiple": "1",
        "minver": "1",
        "description": "Timestamp of another frame used as a reference (ie: B or P frame). The timestamp is relative to the block it's attached to."
    },
    "fa": {
        "name": "ReferencePriority",
        "cppname": "FlagReferenced",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "0",
        "description": "This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced."
    },
    "9b": {
        "name": "BlockDuration",
        "level": "3",
        "type": "u",
        "minver": "1",
        "default": "TrackDuration",
        "description": "The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track (but can be omitted as other default values). When not written and with no DefaultDuration, the value is assumed to be the difference between the timestamp of this Block and the timestamp of the next Block in \"display\" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks. When set to 0 that means the frame is not a keyframe."
    },
    "a5": {
        "name": "BlockAdditional",
        "level": "5",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "Interpreted by the codec as it wishes (using the BlockAddID)."
    },
    "ee": {
        "name": "BlockAddID",
        "level": "5",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "default": "1",
        "range": "not 0",
        "description": "An ID to identify the BlockAdditional level."
    },
    "a6": {
        "name": "BlockMore",
        "level": "4",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Contain the BlockAdditional and some parameters."
    },
    "75a1": {
        "name": "BlockAdditions",
        "level": "3",
        "type": "m",
        "minver": "1",
        "webm": "0",
        "description": "Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data."
    },
    "a2": {
        "name": "BlockVirtual",
        "level": "3",
        "type": "b",
        "webm": "0",
        "description": "A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)"
    },
    "a1": {
        "name": "Block",
        "level": "3",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "description": "Block containing the actual data to be rendered and a timestamp relative to the Cluster Timecode. (see Block Structure)"
    },
    "a0": {
        "name": "BlockGroup",
        "level": "2",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "description": "Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock."
    },
    "a3": {
        "name": "SimpleBlock",
        "level": "2",
        "type": "b",
        "multiple": "1",
        "minver": "2",
        "webm": "1",
        "divx": "1",
        "description": "Similar to SimpleBlock Structure)"
    },
    "ab": {
        "name": "PrevSize",
        "cppname": "ClusterPrevSize",
        "level": "2",
        "type": "u",
        "minver": "1",
        "description": "Size of the previous Cluster, in octets. Can be useful for backward playing."
    },
    "a7": {
        "name": "Position",
        "cppname": "ClusterPosition",
        "level": "2",
        "type": "u",
        "minver": "1",
        "webm": "0",
        "description": "The Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams."
    },
    "58d7": {
        "name": "SilentTrackNumber",
        "cppname": "ClusterSilentTrackNumber",
        "level": "3",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster."
    },
    "e7": {
        "name": "Timecode",
        "cppname": "ClusterTimecode",
        "level": "2",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "description": "Absolute timestamp of the cluster (based on TimecodeScale)."
    },
    "1f43b675": {
        "name": "Cluster",
        "level": "1",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "description": "The lower level element containing the (monolithic) Block structure."
    },
    "4d80": {
        "name": "MuxingApp",
        "level": "2",
        "type": "8",
        "mandatory": "1",
        "minver": "1",
        "description": "Muxing application or library (\"libmatroska-0.4.3\")."
    },
    "7ba9": {
        "name": "Title",
        "level": "2",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "General name of the segment."
    },
    "2ad7b2": {
        "name": "TimecodeScaleDenominator",
        "level": "2",
        "type": "u",
        "mandatory": "1",
        "minver": "4",
        "default": "1000000000",
        "description": "Timestamp scale numerator, see TimecodeScale."
    },
    "2ad7b1": {
        "name": "TimecodeScale",
        "level": "2",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "default": "1000000",
        "description": "Timestamp scale in nanoseconds (1.000.000 means all timestamps in the segment are expressed in milliseconds)."
    },
    "69a5": {
        "name": "ChapterTranslateID",
        "level": "3",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used."
    },
    "69bf": {
        "name": "ChapterTranslateCodec",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "webm": "0",
        "description": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
    },
    "69fc": {
        "name": "ChapterTranslateEditionUID",
        "level": "3",
        "type": "u",
        "multiple": "1",
        "minver": "1",
        "webm": "0",
        "description": "Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment."
    },
    "3e83bb": {
        "name": "NextFilename",
        "level": "2",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "An escaped filename corresponding to the next segment."
    },
    "3eb923": {
        "name": "NextUID",
        "level": "2",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "bytesize": "16",
        "description": "A unique ID to identify the next chained segment (128 bits)."
    },
    "3c83ab": {
        "name": "PrevFilename",
        "level": "2",
        "type": "8",
        "minver": "1",
        "webm": "0",
        "description": "An escaped filename corresponding to the previous segment."
    },
    "3cb923": {
        "name": "PrevUID",
        "level": "2",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "bytesize": "16",
        "description": "A unique ID to identify the previous chained segment (128 bits)."
    },
    "73a4": {
        "name": "SegmentUID",
        "level": "2",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "range": "not 0",
        "bytesize": "16",
        "description": "A randomly generated unique ID to identify the current segment between many others (128 bits)."
    },
    "1549a966": {
        "name": "Info",
        "level": "1",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Contains miscellaneous general information and statistics on the file."
    },
    "53ac": {
        "name": "SeekPosition",
        "level": "3",
        "type": "u",
        "mandatory": "1",
        "minver": "1",
        "description": "The position of the element in the segment in octets (0 = first level 1 element)."
    },
    "53ab": {
        "name": "SeekID",
        "level": "3",
        "type": "b",
        "mandatory": "1",
        "minver": "1",
        "description": "The binary ID corresponding to the element name."
    },
    "4dbb": {
        "name": "Seek",
        "cppname": "SeekPoint",
        "level": "2",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Contains a single seek entry to an EBML element."
    },
    "114d9b74": {
        "name": "SeekHead",
        "cppname": "SeekHeader",
        "level": "1",
        "type": "m",
        "multiple": "1",
        "minver": "1",
        "description": "Contains the position of other level 1 elements."
    },
    "7e7b": {
        "name": "SignatureElementList",
        "level": "2",
        "type": "m",
        "multiple": "1",
        "webm": "0",
        "i": "Cluster|Block|BlockAdditional",
        "description": "A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption."
    },
    "7e5b": {
        "name": "SignatureElements",
        "level": "1",
        "type": "m",
        "webm": "0",
        "description": "Contains elements that will be used to compute the signature."
    },
    "7eb5": {
        "name": "Signature",
        "level": "1",
        "type": "b",
        "webm": "0",
        "description": "The signature of the data (until a new."
    },
    "7ea5": {
        "name": "SignaturePublicKey",
        "level": "1",
        "type": "b",
        "webm": "0",
        "description": "The public key to use with the algorithm (in the case of a PKI-based signature)."
    },
    "7e9a": {
        "name": "SignatureHash",
        "level": "1",
        "type": "u",
        "webm": "0",
        "description": "Hash algorithm used (1=SHA1-160, 2=MD5)."
    },
    "7e8a": {
        "name": "SignatureAlgo",
        "level": "1",
        "type": "u",
        "webm": "0",
        "description": "Signature algorithm used (1=RSA, 2=elliptic)."
    },
    "1b538667": {
        "name": "SignatureSlot",
        "level": "-1",
        "type": "m",
        "multiple": "1",
        "webm": "0",
        "description": "Contain signature of some (coming) elements in the stream."
    },
    "bf": {
        "name": "CRC-32",
        "level": "-1",
        "type": "b",
        "minver": "1",
        "webm": "0",
        "description": "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian"
    },
    "ec": {
        "name": "Void",
        "level": "-1",
        "type": "b",
        "minver": "1",
        "description": "Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use."
    },
    "42f3": {
        "name": "EBMLMaxSizeLength",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "8",
        "minver": "1",
        "description": "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
    },
    "42f2": {
        "name": "EBMLMaxIDLength",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "4",
        "minver": "1",
        "description": "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
    },
    "42f7": {
        "name": "EBMLReadVersion",
        "level": "1",
        "type": "u",
        "mandatory": "1",
        "default": "1",
        "minver": "1",
        "description": "The minimum EBML version a parser has to support to read this file."
    },
    "1a45dfa3": {
        "name": "EBML",
        "level": "0",
        "type": "m",
        "mandatory": "1",
        "multiple": "1",
        "minver": "1",
        "description": "Set the EBML characteristics of the data to follow. Each EBML document has to start with this."
    }
};

module.exports = schema;

/***/ }),

/***/ "6IAg":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),

/***/ "7aRs":
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__("tTqp"),
    convertToHex = _require.convertToHex;

var schema_ext = {
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
};

var getWebMData = function getWebMData(tag) {

    var entryLookup = new Map([['u', { description: 'unsigned integer', returnVal: function returnVal(data, size) {
            return { display: data.readUIntBE(0, size) };
        } }], ['i', { description: 'signed integer', returnVal: function returnVal(data, size) {
            return { display: data.readIntBE(0, size) };
        } }], ['f', { description: 'floating point number', returnVal: function returnVal(data) {
            return { display: data.readFloatBE(0) };
        } }], ['s', { description: 'ASCII string', returnVal: function returnVal(data) {
            return { display: data.toString() };
        } }], ['8', { description: 'UTF-8 string', returnVal: function returnVal(data) {
            return { display: data.toString('utf8') };
        } }], ['d', { description: 'timestamp', returnVal: function returnVal(data) {
            console.warn('timestamp', data);return { display: new Date(data) };
        } }], ['b', { description: 'raw binary data', returnVal: function returnVal(data) {
            return data;
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
                    case 'Void':
                    case 'SegmentUID':
                        return { display: convertToHex(entry.value || entry.data) };
                    case 'CodecPrivate':
                        return { display: 'Raw Binary, ' + entry.dataSize + ' bytes', hex: convertToHex(entry.data)
                            // SimpleBlock and Block processing:
                            // https://www.matroska.org/technical/specs/index.html#simpleblock_structure
                        };case 'SimpleBlock':
                        // assume the MSB = 1 and it is a 7-bit track number
                        // otherwise if 0x4000 it is a 2-byte track number (not supported)
                        var trackNumber = entry.data.readUInt8(0) & 127;
                        var timeCode = entry.data.readUInt16BE(1);
                        var flags = entry.data.readUInt8(3);
                        var flagVals = [{ flag: 'Keyframe', bitmask: 128 }, { flag: 'Invisible', bitmask: 8 }, { flag: 'Lacing', bitmask: 6 }, { flag: 'Discardable', bitmask: 1 }];
                        return { display: 'Track ' + trackNumber + flagVals.filter(function (item) {
                                return flags & item.bitmask;
                            }).map(function (item) {
                                return ' (' + item.flag + ')';
                            }) + ', Timecode ' + timeCode + ', ' + entry.dataSize + ' bytes', hex: convertToHex(entry.data.slice(4)) };
                    // Eg CodecPrivate for Audio tracks:
                    // https://tools.ietf.org/html/rfc7845.html#section-5
                    // CodecPrivate for VP9
                    // https://www.webmproject.org/docs/container/#vp9-codec-feature-metadata-codecprivate

                    // for binary formats not yet implemented, return a bytestream.
                    default:
                        return { hex: convertToHex(entry.value || entry.data) };
                }
            }
            return returnVal(entry.value || entry.data, entry.dataSize);
        }
        // the code isn't in the entryLookup table
        return 'unknown type';
    };
    return processEntry(tag);
};

module.exports = {
    getWebMData: getWebMData,
    schema_ext: schema_ext
};

/***/ }),

/***/ "8NLT":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__("jcLW");
} else {
  module.exports = __webpack_require__("9WM/");
}

/***/ }),

/***/ "97RM":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "9WM/":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__("Axko");
var util = __webpack_require__("Bcfi");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("y5CM");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  var supportsColor = __webpack_require__("DYmO");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (err) {}
// swallow - we only care if `supports-color` is available; it doesn't have to be.


/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return (/^debug_/i.test(key)
  );
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\x1B[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\x1B[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\x1B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),

/***/ "Axko":
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "Bcfi":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "DYmO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function hasFlag(flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
}();

/***/ }),

/***/ "HVeQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1I2EN","boxName":"boxName__26nav","boxContainer":"boxContainer__1jDYD","subBox":"subBox__1KWXu","boxProp":"boxProp__31O6F","boxContents":"boxContents__3uHwf","arrayEntry":"arrayEntry__zS5vz","inputArea":"inputArea__1vkMM","inputBox":"inputBox__2AC7B","parseButton":"parseButton__3dbik","hexEntry":"hexEntry__1Mnjz"};

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

// EXTERNAL MODULE: ./components/additionalBoxes.js
var additionalBoxes = __webpack_require__("kKod");
var additionalBoxes_default = /*#__PURE__*/__webpack_require__.n(additionalBoxes);

// EXTERNAL MODULE: ./components/additionalwebM.js
var additionalwebM = __webpack_require__("7aRs");
var additionalwebM_default = /*#__PURE__*/__webpack_require__.n(additionalwebM);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js




var header_Header = function Header(props) {
	var names = {
		webm: 'webM',
		mp4: 'ISOBMFF',
		ts: 'MPEG-2 Transport Stream'
	};
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		Object(preact_min["h"])(
			'h1',
			null,
			names[props.mode],
			' Inspector'
		),
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])(
				'a',
				{ onClick: props.toggleHex },
				props.showHex ? 'Load Local File' : 'Paste Hex Values'
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

// EXTERNAL MODULE: ./components/tools.js
var tools = __webpack_require__("tTqp");
var tools_default = /*#__PURE__*/__webpack_require__.n(tools);

// CONCATENATED MODULE: ./components/home/index.js



var ISOBoxer = __webpack_require__("unQC");




var _ref = Object(preact_min["h"])(
	'div',
	null,
	'No valid boxes detected'
);

var home_Home = function Home(props) {

	var getWebMJSX = function getWebMJSX(box) {

		if (Object.hasOwnProperty.call(box, 'boxes')) {
			return Object(preact_min["h"])(
				'details',
				{ key: box.start },
				Object(preact_min["h"])(
					'summary',
					{ 'class': home_style_default.a.boxName },
					box.name
				),
				box.boxes.map(getWebMJSX)
			);
		}
		var result = Object(additionalwebM["getWebMData"])(box);
		return Object(preact_min["h"])(
			'div',
			{ key: box.start, 'class': home_style_default.a.boxProp },
			Object(preact_min["h"])(
				'span',
				null,
				box.name,
				': '
			),
			Object.hasOwnProperty.call(result, 'hex') ? Object(preact_min["h"])(
				'details',
				null,
				Object(preact_min["h"])(
					'summary',
					{ 'class': home_style_default.a.boxContents },
					result.display || ''
				),
				result.hex.map(function (row) {
					return Object(preact_min["h"])(
						'div',
						{ key: row, 'class': home_style_default.a.hexEntry },
						row
					);
				})
			) : Object(preact_min["h"])(
				'span',
				{ 'class': home_style_default.a.boxContents, raw: Object(tools["convertToHex"])(box.data) },
				result.display
			)
		);
	};

	/** takes the box contents and recursively maps them to JSX
 * @param {ISOBox} box -> The ISOBox
 	*/

	var getISOJSX = function getISOJSX(box) {

		// entryNumber is added by the box processor when the box contains an array of objects. It is not in the stream.
		// we process 'boxes' recursively.
		// no need to parse 'size' or 'type'.
		var SKIP_KEYS = ['boxes', 'size', 'type', 'entryNumber'];

		var contents = Object.keys(box).filter(function (key) {
			return !/^_/i.test(key) && !SKIP_KEYS.includes(key);
		});

		// iterate through the valid keys and generate processed output
		var boxEntry = function boxEntry(isoBox) {
			return contents.map(function (key) {
				var result = Object(additionalBoxes["getISOData"])(key, isoBox[key]);
				return Object(preact_min["h"])(
					'div',
					{ key: isoBox._offset + '_' + key, 'class': home_style_default.a.boxProp },
					Object(preact_min["h"])(
						'span',
						null,
						key,
						': '
					),
					Object.hasOwnProperty.call(result, 'hex') ? result.hex.map(function (row) {
						return Object(preact_min["h"])(
							'div',
							{ key: row, 'class': home_style_default.a.hexEntry },
							row
						);
					}) : Array.isArray(result) ? result.map(getISOJSX) : Object(preact_min["h"])(
						'span',
						{ key: key + '_' + result, 'class': home_style_default.a.boxContents, raw: Object(tools["convertToHex"])(isoBox._raw) },
						result
					)
				);
			});
		};

		// if the box contains a 'boxes' prop (but doesn't have an entryNumber, which we added) recurse
		// otherwise output the boxEntry according to the above.
		return Object(preact_min["h"])(
			'details',
			{ key: box._offset },
			box.entryNumber ? Object(preact_min["h"])(
				'summary',
				{ 'class': home_style_default.a.boxProp },
				box.type || box.entryNumber
			) : Object(preact_min["h"])(
				'summary',
				{ 'class': home_style_default.a.boxName },
				box.type,
				' (',
				box.size,
				' bytes)'
			),
			Object.hasOwnProperty.call(box, 'boxes') && !Object.hasOwnProperty.call(box, 'entryNumber') ? box.boxes.map(getISOJSX) : boxEntry(box)
		);
	};

	return Object(preact_min["h"])(
		'div',
		{ 'class': home_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.inputArea },
			props.showHex ? Object(preact_min["h"])(
				'div',
				{ style: { gridColumn: '1/5' } },
				Object(preact_min["h"])('textarea', { 'class': home_style_default.a.inputBox, onChange: props.updateInput, value: props.inputData }),
				Object(preact_min["h"])(
					'button',
					{ 'class': home_style_default.a.parseButton, onClick: props.parseFile },
					'Go'
				)
			) : Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(
					'label',
					{ 'for': 'getFile' },
					Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.parseButton, style: { textAlign: 'center', paddingTop: '0.2em' } },
						'Select Local File'
					)
				),
				Object(preact_min["h"])('input', { type: 'file', style: { opacity: 0 }, id: 'getFile', onChange: props.handleFiles })
			)
		),
		Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'h2',
				null,
				' ',
				props.decodeMode,
				' File Contents '
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.Result },
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
				) : props.parsedData.boxes.length > 0 ? props.decodeMode === 'webm' ? props.parsedData.boxes.map(getWebMJSX) : props.parsedData.boxes.map(getISOJSX) : _ref
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
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var app_ISOBoxer = __webpack_require__("unQC");


var ebml = __webpack_require__("R0Du");





var modes = {
	webm: 'mp4',
	mp4: 'MP2T',
	MP2T: 'webm'
};

var niceError = {
	3: 'This video appears to be encrypted',
	4: 'Can\'t parse metadata. Is this not an initialization segment?'

};

var parseISO = function parseISO(buf) {
	return new Promise(function (resolve, reject) {
		var VALID_START_BOX = new Set(['ftyp', 'moof', 'styp', 'sidx']);
		var parsedData = app_ISOBoxer.parseBuffer(buf.buffer);
		console.log(parsedData);
		if (VALID_START_BOX.has(parsedData.boxes[0].type)) return resolve(parsedData);
		return reject(new Error('not an ISOBMFF file'));
	});
};

var app_parseWebM = function parseWebM(buf) {
	return new Promise(function (resolve, reject) {
		var decoder = new ebml.Decoder(additionalwebM["schema_ext"], {});
		var lastChunkTime = void 0;
		var allData = [];

		// poll in case the stream never sends a 'finish' or 'end' event.
		var MAX_TIME = 1000;
		var pollTime = setInterval(function () {
			var currentTime = new Date().getTime();
			lastChunkTime = lastChunkTime || currentTime;
			if (allData.length && currentTime - lastChunkTime > MAX_TIME) {
				clearInterval(pollTime);
				// keep master result of parsed boxes
				var resultVal = new Map();
				// keep a list of parents up the tree
				var parentList = [];
				// handy helper to recursively work the way down the resultSet tree. Use 'start' as a hash since it's unique
				var setBox = function setBox(newVal) {
					return parentList.reduce(function (boxList, entry) {
						return boxList.get(entry).boxes;
					}, resultVal).set(newVal.start, newVal);
				};
				// iterate through the boxes to create a box object like ISO box
				allData.map(function (box) {
					if (box.dataType === 'start') {
						var newEntry = { name: box.payload.name, start: box.payload.start, boxes: new Map() };
						// root level entries
						if (parentList.length === 0) {
							resultVal.set(newEntry.start, _extends({}, newEntry));
						} else {
							setBox(newEntry);
						};
						parentList.push(box.payload.start);
					}
					if (box.dataType === 'tag') setBox(_extends({}, box.payload));
					if (box.dataType === 'end') parentList.pop();
				});
				// now recursively convert all maps into arrays of objects
				var convertBox = function convertBox(boxMap) {
					return Array.from(boxMap).reduce(function (result, contents) {
						if (Object.hasOwnProperty.call(contents[1], 'boxes')) contents[1].boxes = convertBox(contents[1].boxes);
						return result.concat(contents[1]);
					}, []);
				};
				return resolve({ boxes: convertBox(resultVal) });
			}
		}, 500);
		decoder.on('data', function (chunk) {
			allData.push({ dataType: chunk[0], payload: chunk[1] });
			lastChunkTime = new Date().getTime();
		});
		decoder.on('finish', function () {
			console.log('got finish event');
			return resolve(allData);
		});
		decoder.on('end', function () {
			console.log('got end event');
			return resolve(allData);
		});
		decoder.on('error', function (err) {
			return reject(err);
		});
		decoder.write(buf);
	});
};

//placeholder for now
var parseM2TS = function parseM2TS(buf) {
	return new Promise(function (resolve, reject) {
		return reject(new Error('m2ts mode not supported'));
	});
};

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.componentWillMount = function () {
			// add any custom box processors
			app_ISOBoxer.addBoxProcessor(additionalBoxes["prft"].field, additionalBoxes["prft"]._parser);
		};

		_this.createParsed = function (inputData) {
			var inputBuffer = Uint8Array.from(atob(inputData), function (c) {
				return c.charCodeAt(0);
			});
			if (_this.state.mode === 'webm') return app_parseWebM(inputBuffer);
			if (_this.state.mode === 'mp4') return parseISO(inputBuffer);
			if (_this.state.mode === 'MP2T') return parseM2TS(inputBuffer);
		};

		_this.updateInput = function (e) {
			console.log('updating inbox box with new value: ' + e.target.value);
			var inputData = e.target.value;
			_this.setState({ inputData: inputData });
		};

		_this.parseFile = function (e) {
			console.log('parsing data in ' + _this.state.mode + ' mode:');
			_this.setState({ working: true, showVideo: false, videoError: '' });
			_this.createParsed(_this.state.inputData).then(function (parsedData) {
				_this.setState({ parsedData: parsedData, working: false, decodeAttempts: 0 });
				return;
			}).catch(function (err) {
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
				console.error(err);
			});
		};

		_this.handleEncrypted = function (e) {
			console.log('got encrypted event', e.target && e.target.error);
			e.preventDefault();
			var videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
			_this.setState({ showVideo: false, videoError: videoError });
		};

		_this.handleFiles = function (e) {
			_this.setState({ working: true, showVideo: false, inputData: '' });
			var file = e.target.files[0];
			var reader = new FileReader();
			var self = _this;
			reader.onload = function (r) {
				var inputData = r.target.result.split(/base64,/)[1];
				self.setState({ inputData: inputData });
				self.parseFile();
			};
			reader.readAsDataURL(file);
		};

		_this.toggleHex = function (e) {
			_this.setState({ showHex: !_this.state.showHex });
		};

		_this.togglePreview = function (e) {
			_this.setState({ showVideo: !_this.state.showVideo });
		};

		_this.state = {
			inputData: '',
			parsedData: { boxes: [] },
			mode: 'webm',
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false
		};
		return _this;
	}

	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(header, {
				mode: this.state.mode,
				togglePreview: this.togglePreview,
				showVideo: this.state.showVideo,
				showHex: this.state.showHex,
				toggleHex: this.toggleHex
			}),
			this.state.showVideo ? Object(preact_min["h"])(video, {
				mimeType: this.state.mode,
				data: this.state.inputData,
				handleEncrypted: this.handleEncrypted
			}) : Object(preact_min["h"])(
				'div',
				{ style: { padding: '56px 20px' } },
				this.state.videoError
			),
			Object(preact_min["h"])(home, {
				decodeMode: this.state.mode,
				working: this.state.working,
				parseFile: this.parseFile,
				updateInput: this.updateInput,
				inputData: this.state.inputData,
				parsedData: this.state.parsedData,
				handleFiles: this.handleFiles,
				error: this.state.errorMessage,
				showHex: this.state.showHex
			})
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
        l = M;for (i = arguments.length; i-- > 2;) {
      T.push(arguments[i]);
    }t && null != t.children && (T.length || T.push(t.children), delete t.children);while (T.length) {
      if ((o = T.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        T.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === M ? l = [o] : l.push(o), n = r;
    }var a = new S();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== L.vnode && L.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function o(e) {
    !e.__d && (e.__d = !0) && 1 == D.push(e) && (L.debounceRendering || P)(r);
  }function r() {
    var e,
        t = D;D = [];while (e = t.pop()) {
      e.__d && C(e);
    }
  }function i(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function l(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function a(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function p(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function s(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function u(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === W.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, c, l) : e.removeEventListener(t, c, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) {
        try {
          e[t] = null == o ? "" : o;
        } catch (e) {}null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function c(e) {
    return this.__l[e.type](L.event && L.event(e) || e);
  }function _() {
    var e;while (e = E.pop()) {
      L.afterMount && L.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    V++ || (A = null != r && void 0 !== r.ownerSVGElement, H = null != e && !("__preactattr_" in e));var l = f(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --V || (H = !1, i || _()), l;
  }function f(e, t, n, o, r) {
    var i = e,
        a = A;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0))), i.__preactattr_ = !0, i;var s = t.nodeName;if ("function" == typeof s) return x(e, t, n, o);if (A = "svg" === s || "foreignObject" !== s && A, s += "", (!e || !l(e, s)) && (i = p(s, A), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0);
    }var u = i.firstChild,
        c = i.__preactattr_,
        _ = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var d = i.attributes, f = d.length; f--;) {
        c[d[f].name] = d[f].value;
      }
    }return !H && _ && 1 === _.length && "string" == typeof _[0] && null != u && void 0 !== u.splitText && null == u.nextSibling ? u.nodeValue != _[0] && (u.nodeValue = _[0]) : (_ && _.length || null != u) && h(i, _, n, o, H || null != c.dangerouslySetInnerHTML), b(i, t.attributes, c), A = a, i;
  }function h(e, t, n, o, r) {
    var l,
        a,
        p,
        u,
        c,
        _ = e.childNodes,
        d = [],
        h = {},
        v = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (v++, h[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (d[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      u = t[C], c = null;var k = u.key;if (null != k) v && void 0 !== h[k] && (c = h[k], h[k] = void 0, v--);else if (b < g) for (l = b; l < g; l++) {
        if (void 0 !== d[l] && i(a = d[l], u, r)) {
          c = a, d[l] = void 0, l === g - 1 && g--, l === b && b++;break;
        }
      }c = f(c, u, n, o), p = _[C], c && c !== e && c !== p && (null == p ? e.appendChild(c) : c === p.nextSibling ? s(p) : e.insertBefore(c, p));
    }if (v) for (var C in h) {
      void 0 !== h[C] && m(h[C], !1);
    }while (b <= g) {
      void 0 !== (c = d[g--]) && m(c, !1);
    }
  }function m(e, t) {
    var n = e._component;n ? N(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || s(e), v(e));
  }function v(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;m(e, !0), e = t;
    }
  }function b(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || u(e, o, n[o], n[o] = void 0, A);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || u(e, o, n[o], n[o] = t[o], A);
    }
  }function y(e, t, n) {
    var o,
        r = B.length;e.prototype && e.prototype.render ? (o = new e(t, n), k.call(o, t, n)) : (o = new k(t, n), o.constructor = e, o.render = g);while (r--) {
      if (B[r].constructor === e) return o.__b = B[r].__b, B.splice(r, 1), o;
    }return o;
  }function g(e, t, n) {
    return this.constructor(e, n);
  }function w(e, t, n, r, i) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.__c || (e.__c = e.context), e.context = r), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === L.syncComponentUpdates && e.base ? o(e) : C(e, 1, i)), e.__r && e.__r(e));
  }function C(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          p,
          s = e.props,
          u = e.state,
          c = e.context,
          f = e.__p || s,
          h = e.__s || u,
          v = e.__c || c,
          b = e.base,
          g = e.__b,
          x = b || g,
          k = e._component,
          U = !1,
          S = v;if (e.constructor.getDerivedStateFromProps && (u = t(t({}, u), e.constructor.getDerivedStateFromProps(s, u)), e.state = u), b && (e.props = f, e.state = h, e.context = v, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, u, c) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(s, u, c), e.props = s, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(s, u, c), e.getChildContext && (c = t(t({}, c), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(f, h));var T,
            M,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = a(i);l = k, l && l.constructor === P && W.key == l.__k ? w(l, W, 1, c, !1) : (T = l, e._component = l = y(P, W, c), l.__b = l.__b || g, l.__u = e, w(l, W, 0, c, !1), C(l, 1, o, !0)), M = l.base;
        } else p = x, T = k, T && (p = e._component = null), (x || 1 === n) && (p && (p._component = null), M = d(p, i, c, o || !b, x && x.parentNode, !0));if (x && M !== x && l !== k) {
          var D = x.parentNode;D && M !== D && (D.replaceChild(M, x), T || (x._component = null, m(x, !1)));
        }if (T && N(T), e.base = M, M && !r) {
          var A = e,
              H = e;while (H = H.__u) {
            (A = H).base = M;
          }M._component = A, M._componentConstructor = A.constructor;
        }
      }!b || o ? E.unshift(e) : U || (e.componentDidUpdate && e.componentDidUpdate(f, h, S), L.afterUpdate && L.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }V || r || _();
    }
  }function x(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        p = r && e._componentConstructor === t.nodeName,
        s = p,
        u = a(t);while (r && !s && (r = r.__u)) {
      s = r.constructor === t.nodeName;
    }return r && s && (!o || r._component) ? (w(r, u, 3, n, o), e = r.base) : (i && !p && (N(i), e = l = null), r = y(t.nodeName, u, n), e && !r.__b && (r.__b = e, l = null), w(r, u, 1, n, o), e = r.base, l && e !== l && (l._component = null, m(l, !1))), e;
  }function N(e) {
    L.beforeUnmount && L.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? N(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, s(t), B.push(e), v(t)), e.__r && e.__r(null);
  }function k(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function U(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }var S = function S() {},
      L = {},
      T = [],
      M = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      W = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      D = [],
      E = [],
      V = 0,
      A = !1,
      H = !1,
      B = [];t(k.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), o(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), C(this, 2);
    }, render: function render() {} });var F = { h: e, createElement: e, cloneElement: n, Component: k, render: U, rerender: r, options: L }; true ? module.exports = F : self.preact = F;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KzOj":
/***/ (function(module, exports) {

module.exports = Buffers;

function Buffers(bufs) {
    if (!(this instanceof Buffers)) return new Buffers(bufs);
    this.buffers = bufs || [];
    this.length = this.buffers.reduce(function (size, buf) {
        return size + buf.length;
    }, 0);
}

Buffers.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to push a non-buffer');
        }
    }

    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.push(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.unshift = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to unshift a non-buffer');
        }
    }

    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.unshift(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.copy = function (dst, dStart, start, end) {
    return this.slice(start, end).copy(dst, dStart, 0, end - start);
};

Buffers.prototype.splice = function (i, howMany) {
    var buffers = this.buffers;
    var index = i >= 0 ? i : this.length - i;
    var reps = [].slice.call(arguments, 2);

    if (howMany === undefined) {
        howMany = this.length - index;
    } else if (howMany > this.length - index) {
        howMany = this.length - index;
    }

    for (var i = 0; i < reps.length; i++) {
        this.length += reps[i].length;
    }

    var removed = new Buffers();
    var bytes = 0;

    var startBytes = 0;
    for (var ii = 0; ii < buffers.length && startBytes + buffers[ii].length < index; ii++) {
        startBytes += buffers[ii].length;
    }

    if (index - startBytes > 0) {
        var start = index - startBytes;

        if (start + howMany < buffers[ii].length) {
            removed.push(buffers[ii].slice(start, start + howMany));

            var orig = buffers[ii];
            //var buf = new Buffer(orig.length - howMany);
            var buf0 = new Buffer(start);
            for (var i = 0; i < start; i++) {
                buf0[i] = orig[i];
            }

            var buf1 = new Buffer(orig.length - start - howMany);
            for (var i = start + howMany; i < orig.length; i++) {
                buf1[i - howMany - start] = orig[i];
            }

            if (reps.length > 0) {
                var reps_ = reps.slice();
                reps_.unshift(buf0);
                reps_.push(buf1);
                buffers.splice.apply(buffers, [ii, 1].concat(reps_));
                ii += reps_.length;
                reps = [];
            } else {
                buffers.splice(ii, 1, buf0, buf1);
                //buffers[ii] = buf;
                ii += 2;
            }
        } else {
            removed.push(buffers[ii].slice(start));
            buffers[ii] = buffers[ii].slice(0, start);
            ii++;
        }
    }

    if (reps.length > 0) {
        buffers.splice.apply(buffers, [ii, 0].concat(reps));
        ii += reps.length;
    }

    while (removed.length < howMany) {
        var buf = buffers[ii];
        var len = buf.length;
        var take = Math.min(len, howMany - removed.length);

        if (take === len) {
            removed.push(buf);
            buffers.splice(ii, 1);
        } else {
            removed.push(buf.slice(0, take));
            buffers[ii] = buffers[ii].slice(take);
        }
    }

    this.length -= removed.length;

    return removed;
};

Buffers.prototype.slice = function (i, j) {
    var buffers = this.buffers;
    if (j === undefined) j = this.length;
    if (i === undefined) i = 0;

    if (j > this.length) j = this.length;

    var startBytes = 0;
    for (var si = 0; si < buffers.length && startBytes + buffers[si].length <= i; si++) {
        startBytes += buffers[si].length;
    }

    var target = new Buffer(j - i);

    var ti = 0;
    for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
        var len = buffers[ii].length;

        var start = ti === 0 ? i - startBytes : 0;
        var end = ti + len >= j - i ? Math.min(start + (j - i) - ti, len) : len;

        buffers[ii].copy(target, ti, start, end);
        ti += end - start;
    }

    return target;
};

Buffers.prototype.pos = function (i) {
    if (i < 0 || i >= this.length) throw new Error('oob');
    var l = i,
        bi = 0,
        bu = null;
    for (;;) {
        bu = this.buffers[bi];
        if (l < bu.length) {
            return { buf: bi, offset: l };
        } else {
            l -= bu.length;
        }
        bi++;
    }
};

Buffers.prototype.get = function get(i) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].get(pos.offset);
};

Buffers.prototype.set = function set(i, b) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].set(pos.offset, b);
};

Buffers.prototype.indexOf = function (needle, offset) {
    if ("string" === typeof needle) {
        needle = new Buffer(needle);
    } else if (needle instanceof Buffer) {
        // already a buffer
    } else {
        throw new Error('Invalid type for a search string');
    }

    if (!needle.length) {
        return 0;
    }

    if (!this.length) {
        return -1;
    }

    var i = 0,
        j = 0,
        match = 0,
        mstart,
        pos = 0;

    // start search from a particular point in the virtual buffer
    if (offset) {
        var p = this.pos(offset);
        i = p.buf;
        j = p.offset;
        pos = offset;
    }

    // for each character in virtual buffer
    for (;;) {
        while (j >= this.buffers[i].length) {
            j = 0;
            i++;

            if (i >= this.buffers.length) {
                // search string not found
                return -1;
            }
        }

        var char = this.buffers[i][j];

        if (char == needle[match]) {
            // keep track where match started
            if (match == 0) {
                mstart = {
                    i: i,
                    j: j,
                    pos: pos
                };
            }
            match++;
            if (match == needle.length) {
                // full match
                return mstart.pos;
            }
        } else if (match != 0) {
            // a partial match ended, go back to match starting position
            // this will continue the search at the next character
            i = mstart.i;
            j = mstart.j;
            pos = mstart.pos;
            match = 0;
        }

        j++;
        pos++;
    }
};

Buffers.prototype.toBuffer = function () {
    return this.slice();
};

Buffers.prototype.toString = function (encoding, start, end) {
    return this.slice(start, end).toString(encoding);
};

/***/ }),

/***/ "N7N/":
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__("97RM").Transform,
    tools = __webpack_require__("Yjxe"),
    schema = __webpack_require__("09BN"),
    debug = __webpack_require__("8NLT")('ebml:encoder'),
    Buffers = __webpack_require__("KzOj");

function EbmlEncoder(options) {
    options = options || {};
    options.writableObjectMode = true;
    Transform.call(this, options);

    this._schema = schema;
    this._buffer = null;
    this._corked = false;

    this._stack = [];
}

__webpack_require__("Bcfi").inherits(EbmlEncoder, Transform);

EbmlEncoder.prototype._transform = function (chunk, enc, done) {
    debug('encode ' + chunk[0] + ' ' + chunk[1].name);

    if (chunk[0] === 'start') {
        this.startTag(chunk[1].name, chunk[1]);
    } else if (chunk[0] === 'tag') {
        this.writeTag(chunk[1].name, chunk[1].data);
    } else if (chunk[0] === 'end') {
        this.endTag(chunk[1].name);
    }

    done();
};

EbmlEncoder.prototype._flush = function (done) {
    done = done || function () {};
    if (!this._buffer || this._corked) {
        debug('no buffer/nothing pending');
        done();
        return;
    }

    debug('writing ' + this._buffer.length + ' bytes');

    var chunk = this._buffer.toBuffer();
    this._buffer = null;
    this.push(chunk);
    done();
};

EbmlEncoder.prototype._bufferAndFlush = function (buffer) {
    if (this._buffer) {
        this._buffer.push(buffer);
    } else {
        this._buffer = Buffers([buffer]);
    }
    this._flush();
};

EbmlEncoder.prototype.getSchemaInfo = function (tagName) {
    var tagStrs = Object.keys(this._schema);
    for (var i = 0; i < tagStrs.length; i++) {
        var tagStr = tagStrs[i];
        if (this._schema[tagStr].name === tagName) {
            return new Buffer(tagStr, 'hex');
        }
    }
    return null;
};

EbmlEncoder.prototype.cork = function () {
    this._corked = true;
};

EbmlEncoder.prototype.uncork = function () {
    this._corked = false;
    this._flush();
};

EbmlEncoder.prototype._encodeTag = function (tagId, tagData, end) {
    return Buffers([tagId, end === -1 ? Buffer('01ffffffffffffff', 'hex') : tools.writeVint(tagData.length), tagData]);
};

EbmlEncoder.prototype.writeTag = function (tagName, tagData) {
    var tagId = this.getSchemaInfo(tagName);
    if (!tagId) {
        throw new Error('No schema entry found for ' + tagName);
    }

    var data = this._encodeTag(tagId, tagData);
    if (this._stack.length > 0) {
        this._stack[this._stack.length - 1].children.push({
            data: data
        });
    } else {
        this._bufferAndFlush(data.toBuffer());
    }
};

EbmlEncoder.prototype.startTag = function (tagName, info) {
    var tagId = this.getSchemaInfo(tagName);
    if (!tagId) {
        throw new Error('No schema entry found for ' + tagName);
    }

    var tag = {
        id: tagId,
        name: tagName,
        end: info.end,
        children: []
    };

    if (this._stack.length > 0) {
        this._stack[this._stack.length - 1].children.push(tag);
    }
    this._stack.push(tag);
};

EbmlEncoder.prototype.endTag = function () {
    var tag = this._stack.pop();

    var childTagDataBuffers = tag.children.map(function (child) {
        return child.data;
    });
    tag.data = this._encodeTag(tag.id, Buffers(childTagDataBuffers), tag.end);

    if (this._stack.length < 1) {
        this._bufferAndFlush(tag.data.toBuffer());
    }
};

module.exports = EbmlEncoder;

/***/ }),

/***/ "R0Du":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cbLB");

/***/ }),

/***/ "Yjxe":
/***/ (function(module, exports) {

var tools = {
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

    writeVint: function writeVint(value) {
        if (value < 0 || value > Math.pow(2, 53)) {
            throw new Error("Unrepresentable value: " + value);
        }
        for (var length = 1; length <= 8; length++) {
            if (value < Math.pow(2, 7 * length) - 1) {
                break;
            }
        }
        var buffer = new Buffer(length);
        for (var i = 1; i <= length; i++) {
            var b = value & 0xFF;
            buffer[length - i] = b;
            value -= b;
            value /= Math.pow(2, 8);
        }
        buffer[0] = buffer[0] | 1 << 8 - length;
        return buffer;
    }
};

module.exports = tools;

/***/ }),

/***/ "bUFf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "cbLB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    tools: __webpack_require__("Yjxe"),
    schema: __webpack_require__("09BN"),
    Decoder: __webpack_require__("jL/Y"),
    Encoder: __webpack_require__("N7N/")
};

/***/ }),

/***/ "jL/Y":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Transform = __webpack_require__("97RM").Transform,
    tools = __webpack_require__("Yjxe"),
    schema = __webpack_require__("09BN"),
    debug = __webpack_require__("8NLT")('ebml:decoder');

var STATE_TAG = 1,
    STATE_SIZE = 2,
    STATE_CONTENT = 3;

function EbmlDecoder(ext_schema, options) {
    ext_schema = ext_schema || {};
    options = options || {};
    options.readableObjectMode = true;
    Transform.call(this, options);

    this._buffer = null;
    this._tag_stack = [];
    this._state = STATE_TAG;
    this._cursor = 0;
    this._total = 0;
    this._schema = ext_schema ? _extends(ext_schema, schema) : schema;
}

__webpack_require__("Bcfi").inherits(EbmlDecoder, Transform);

EbmlDecoder.prototype._transform = function (chunk, enc, done) {

    if (this._buffer === null) {
        this._buffer = chunk;
    } else {
        this._buffer = Buffer.concat([this._buffer, chunk]);
    }

    while (this._cursor < this._buffer.length) {
        if (this._state === STATE_TAG && !this.readTag()) {
            break;
        }
        if (this._state === STATE_SIZE && !this.readSize()) {
            break;
        }
        if (this._state === STATE_CONTENT && !this.readContent()) {
            break;
        }
    }

    done();
};

EbmlDecoder.prototype.getSchemaInfo = function (tagStr) {
    return this._schema[tagStr] || {
        "type": "unknown",
        "name": "unknown"
    };
};

EbmlDecoder.prototype.readTag = function () {

    debug('parsing tag');

    if (this._cursor >= this._buffer.length) {
        debug('waiting for more data');
        return false;
    }

    var start = this._total;
    var tag = tools.readVint(this._buffer, this._cursor);

    if (tag == null) {
        debug('waiting for more data');
        return false;
    }

    var tagStr = this._buffer.toString('hex', this._cursor, this._cursor + tag.length);

    this._cursor += tag.length;
    this._total += tag.length;
    this._state = STATE_SIZE;

    var tagObj = {
        tag: tag.value,
        tagStr: tagStr,
        type: this.getSchemaInfo(tagStr).type,
        name: this.getSchemaInfo(tagStr).name,
        start: start,
        end: start + tag.length
    };

    this._tag_stack.push(tagObj);
    debug('read tag: ' + tagStr);

    return true;
};

EbmlDecoder.prototype.readSize = function () {

    var tagObj = this._tag_stack[this._tag_stack.length - 1];

    debug('parsing size for tag: ' + tagObj.tag.toString(16));

    if (this._cursor >= this._buffer.length) {
        debug('waiting for more data');
        return false;
    }

    var size = tools.readVint(this._buffer, this._cursor);

    if (size == null) {
        debug('waiting for more data');
        return false;
    }

    this._cursor += size.length;
    this._total += size.length;
    this._state = STATE_CONTENT;
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

    var tagObj = this._tag_stack[this._tag_stack.length - 1];

    debug('parsing content for tag: ' + tagObj.tag.toString(16));

    if (tagObj.type === 'm') {
        debug('content should be tags');
        this.push(['start', tagObj]);
        this._state = STATE_TAG;
        return true;
    }

    if (this._buffer.length < this._cursor + tagObj.dataSize) {
        debug('got: ' + this._buffer.length);
        debug('need: ' + (this._cursor + tagObj.dataSize));
        debug('waiting for more data');
        return false;
    }

    var data = this._buffer.slice(this._cursor, this._cursor + tagObj.dataSize);
    this._total += tagObj.dataSize;
    this._state = STATE_TAG;
    this._buffer = this._buffer.slice(this._cursor + tagObj.dataSize);
    this._cursor = 0;

    this._tag_stack.pop(); // remove the object from the stack

    tagObj.data = data;
    this.push(['tag', tagObj]);

    while (this._tag_stack.length > 0) {
        var topEle = this._tag_stack[this._tag_stack.length - 1];
        if (this._total < topEle.end) {
            break;
        }
        this.push(['end', topEle]);
        this._tag_stack.pop();
    }

    if (debug.enabled) {
        debug('read data: ' + data.toString('hex'));
    }
    return true;
};

module.exports = EbmlDecoder;

/***/ }),

/***/ "jcLW":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("y5CM");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ }),

/***/ "kKod":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = __webpack_require__("tTqp"),
    convertToHex = _require.convertToHex;

var prft = {
    source: 'ISO 14496-12_2012 Producer Reference Time 8.16.5',
    field: 'prft',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
};

var sgpd = {
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('grouping_type', 'uint', 32);
        this.version == 1 && this._procField('default_length', 'uint', 32);
        this._procField('entry_count', 'uint', 32);
        //TODO
    }
};

var sbgp = {

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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
};

var saiz = {
    /*aligned(8) class SampleAuxiliaryInformationSizesBox extends FullBox(‘saiz’, version = 0, flags)
    {
    if (flags & 1) { unsigned int(32) aux_info_type; unsigned int(32) aux_info_type_parameter;
    }
    unsigned int(8) default_sample_info_size; unsigned int(32) sample_count; if (default_sample_info_size == 0) {
    unsigned int(8) sample_info_size[ sample_count ]; } } */
    source: 'ISO 14496-12_2012 Sample Auxiliary Information Sizes 8.7.8',
    field: 'saiz',
    _parser: function _parser() {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
};

var saio = {
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('reference_track_ID', 'uint', 32);
        this._procField('ntp_timestamp', 'uint', 64);
        this._procField('media_time', 'uint', this.version == 1 ? 64 : 32);
    }
};

var senc = {
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
    _parser: function _parser() {
        this._procFullBox();
        this._procField('sample_count', 'uint', 32);
        this._procEntry('entry', this.sample_count, function (entry) {
            this.procEntryField('subsample_count', 'uint', 16);
            this.procFieldArray('');
        });
        //TODO
    }
};

var psshLookup = {
    '10 77 EF EC C0 B2 4D 02 AC E3 3C 1E 52 E2 FB 4B': 'Clearkey',
    '9A 04 F0 79 98 40 42 86 AB 92 E6 5B E0 88 5F 95': 'PlayReady',
    'ED EF 8B A9 79 D6 4A CE A3 C8 27 DC D5 1D 21 ED': 'WideVine'

    /** Looks at the box entry and returns proper formatting based on the type of data therein,
     * and possibly the entry.type
     * 
     * @param {Object} entry ->  a single box parameter
     * @returns {String or Array<Object>} -> returns the unformatted contents in an array
     */
};var getISOData = function getISOData(key, value) {

    // little helper that returns the type
    var getValueType = function getValueType(val) {
        return Object.prototype.toString.call(val).match(/ (\w+)\]/i)[1];
    };

    // 1) Handle Arrays of numbers
    // 2) Handle Arrays of things represented by numbers (pssh:SystemID, pssh:Data possibly (for PlayReady) for example)
    // 3) Handle lookups (psshLookup)
    // 4) Handle Arrays of Objects (eg. entries, references, samples) -- note * usually includes *_count !
    // 5) Handle raw binary (Uint8Array)
    var handleArray = {
        'Object': function Object(value) {
            return value.map(function (item, index) {
                var cleanEntry = _extends({}, item);
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        },
        'String': function String(value) {
            return value.join(', ');
        },
        'Number': function Number(value) {
            return value.join(', ');
        }

        // 5) Handle raw binary
    };if (getValueType(value) === 'Uint8Array') {
        return { hex: convertToHex(value) // an array of 16-byte entries
        };
    }
    // Handle arrays of ...
    if (getValueType(value) === "Array") {
        // first check for special handling by key
        switch (key) {
            case 'SystemID':
                return convertToHex(value) + ' (' + psshLookup[convertToHex(value)] + ')';
            case 'Data':
            case 'compressorname':
                return value.map(function (b) {
                    return String.fromCharCode(b);
                }).join('');
            default:
                // Otherwise handle based on type of the first entry
                return handleArray[getValueType(value[0])](value);
        }
    }
    // Handle string or Number or anything else that slips through
    return value;
};

module.exports = {
    getISOData: getISOData,
    psshLookup: psshLookup,
    prft: prft
};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tTqp":
/***/ (function(module, exports) {

var convertToHex = function convertToHex(entry) {
    var ROW_SIZE = 16;
    var MAX_SIZE = 128 * ROW_SIZE;

    // create an array of bytes, capped at MAX_SIZE for display purposes
    var buffer = Array.from(entry instanceof Uint8Array ? entry : new Uint8Array(entry)).slice(0, MAX_SIZE);

    var numToHex = function numToHex(bit) {
        return bit.toString('16').padStart(2, '0').toUpperCase();
    };

    var getRow = function getRow(start) {
        return start + ROW_SIZE < buffer.length ? [buffer.slice(start, start + ROW_SIZE).map(numToHex).join(' ')].concat(getRow(start + ROW_SIZE)) : [buffer.slice(start).map(numToHex).join(' ')];
    };

    return getRow(0);
};

module.exports = {
    convertToHex: convertToHex
};

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","active":"active__27Q54"};

/***/ }),

/***/ "unQC":
/***/ (function(module, exports, __webpack_require__) {

/*! codem-isoboxer v0.3.6 https://github.com/madebyhiro/codem-isoboxer/blob/master/LICENSE.txt */
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

// ISO/IEC 14496-15:2014 - avc1 box
ISOBox.prototype._boxProcessors['avc1'] = ISOBox.prototype._boxProcessors['encv'] = function () {
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
  // AVCSampleEntry fields
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

/***/ }),

/***/ "y5CM":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("6IAg");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map