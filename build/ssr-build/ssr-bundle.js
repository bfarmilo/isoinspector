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

/***/ "1v4d":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "3oLT":
/***/ (function(module, exports) {


/**
 * Expose `isUrl`.
 */

module.exports = isUrl;

/**
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 */

var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

/**
 * Loosely validate a URL `string`.
 *
 * @param {String} string
 * @return {Boolean}
 */

function isUrl(string) {
  if (typeof string !== 'string') {
    return false;
  }

  var match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  var everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
    return true;
  }

  return false;
}

/***/ }),

/***/ "4PTo":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("Bcfi");
var fs = __webpack_require__("vHs2");
var fetch = __webpack_require__("AsQL");
var isURL = __webpack_require__("3oLT");

module.exports = function (_data) {
  return new Promise(function ($return, $error) {
    var data, res;

    data = _data;
    if (typeof _data === 'undefined') {
      return $return(_data);
    }

    if (typeof _data === 'string') {
      if (isURL(_data) || _data.startsWith('chrome-extension://') || _data.startsWith('file://')) {
        return Promise.resolve(fetch(_data)).then(function ($await_4) {
          try {
            res = $await_4;
            return Promise.resolve(res.arrayBuffer()).then(function ($await_5) {
              try {
                data = $await_5;
                return $If_2.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      } else {
        if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data)) {
          data = Buffer.from(_data.split(',')[1], 'base64');
          return $If_3.call(this);
        } else {
          return Promise.resolve(util.promisify(fs.readFile)(_data)).then(function ($await_6) {
            try {
              data = $await_6;
              return $If_3.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_3() {
          return $If_2.call(this);
        }
      }
      function $If_2() {
        return $If_1.call(this);
      }
    } else {
      if (Buffer.isBuffer(_data)) {
        data = _data;
      }

      return $If_1.call(this);
    }
    function $If_1() {
      return $return(data);
    }
  });
};

/***/ }),

/***/ "5hGE":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isBrowser = __webpack_require__("Hjji")('type') === 'browser';
var resolveURL = isBrowser ? __webpack_require__("6A2Q") : function (s) {
  return s;
}; // eslint-disable-line

module.exports = function (options) {
  var opts = _extends({}, options);
  ['corePath', 'workerPath'].forEach(function (key) {
    if (typeof options[key] !== 'undefined') {
      opts[key] = resolveURL(opts[key]);
    }
  });
  return opts;
};

/***/ }),

/***/ "6A2Q":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.resolveUrl = factory();
  }
}(this, function () {

  function resolveUrl() /* ...urls */{
    var numUrls = arguments.length;

    if (numUrls === 0) {
      throw new Error("resolveUrl requires at least one argument; got none.");
    }

    var base = document.createElement("base");
    base.href = arguments[0];

    if (numUrls === 1) {
      return base.href;
    }

    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(base, head.firstChild);

    var a = document.createElement("a");
    var resolved;

    for (var index = 1; index < numUrls; index++) {
      a.href = arguments[index];
      resolved = a.href;
      base.href = resolved;
    }

    head.removeChild(base);

    return resolved;
  }

  return resolveUrl;
});

/***/ }),

/***/ "7pDz":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"filename":"filename__2d2Hu"};

/***/ }),

/***/ "8XbC":
/***/ (function(module, exports) {

/**
 * send
 *
 * @name send
 * @function send packet to worker and create a job
 * @access public
 */
module.exports = function (worker, packet) {
  worker.send(packet);
};

/***/ }),

/***/ "97RM":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "9BjC":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("v9pv");

var _require = __webpack_require__("MKEY"),
    logging = _require.logging,
    setLogging = _require.setLogging;

var createWorker = __webpack_require__("BUvb");

module.exports = {
  logging: logging,
  setLogging: setLogging,
  createWorker: createWorker
};

/***/ }),

/***/ "AsQL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchError", function() { return FetchError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_stream__ = __webpack_require__("97RM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__("gHkb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url__ = __webpack_require__("Vy1O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_https__ = __webpack_require__("XgVs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_https___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_https__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zlib__ = __webpack_require__("epkN");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_zlib__);






// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = __WEBPACK_IMPORTED_MODULE_0_stream___default.a.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"encoding\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = __WEBPACK_IMPORTED_MODULE_0_stream___default.a.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = __WEBPACK_IMPORTED_MODULE_1_http___default.a.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = __WEBPACK_IMPORTED_MODULE_2_url___default.a.parse;
const format_url = __WEBPACK_IMPORTED_MODULE_2_url___default.a.format;

const streamDestructionSupported = 'destroy' in __WEBPACK_IMPORTED_MODULE_0_stream___default.a.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = __WEBPACK_IMPORTED_MODULE_0_stream___default.a.PassThrough;
const resolve_url = __WEBPACK_IMPORTED_MODULE_2_url___default.a.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? __WEBPACK_IMPORTED_MODULE_3_https___default.a : __WEBPACK_IMPORTED_MODULE_1_http___default.a).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof __WEBPACK_IMPORTED_MODULE_0_stream___default.a.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: __WEBPACK_IMPORTED_MODULE_4_zlib___default.a.Z_SYNC_FLUSH,
				finishFlush: __WEBPACK_IMPORTED_MODULE_4_zlib___default.a.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(__WEBPACK_IMPORTED_MODULE_4_zlib___default.a.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(__WEBPACK_IMPORTED_MODULE_4_zlib___default.a.createInflate());
					} else {
						body = body.pipe(__WEBPACK_IMPORTED_MODULE_4_zlib___default.a.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof __WEBPACK_IMPORTED_MODULE_4_zlib___default.a.createBrotliDecompress === 'function') {
				body = body.pipe(__WEBPACK_IMPORTED_MODULE_4_zlib___default.a.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* harmony default export */ __webpack_exports__["default"] = (fetch);



/***/ }),

/***/ "BUvb":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var createJob = __webpack_require__("UVan");

var _require = __webpack_require__("MKEY"),
    log = _require.log;

var getId = __webpack_require__("ujuL");
var extractProgress = __webpack_require__("PZMJ");
var resolvePaths = __webpack_require__("5hGE");

var _require2 = __webpack_require__("p66q"),
    defaultOptions = _require2.defaultOptions,
    spawnWorker = _require2.spawnWorker,
    terminateWorker = _require2.terminateWorker,
    onMessage = _require2.onMessage,
    send = _require2.send,
    fetchFile = _require2.fetchFile,
    fs = _require2.fs;

var workerCounter = 0;

module.exports = function () {
  var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var id = getId('Worker', workerCounter);

  var _resolvePaths = resolvePaths(_extends({}, defaultOptions, _options)),
      logger = _resolvePaths.logger,
      progress = _resolvePaths.progress,
      options = _objectWithoutProperties(_resolvePaths, ['logger', 'progress']);

  var resolves = {};
  var rejects = {};
  var worker = spawnWorker(options);

  workerCounter += 1;

  var setResolve = function setResolve(action, res) {
    resolves[action] = res;
  };

  var setReject = function setReject(action, rej) {
    rejects[action] = rej;
  };

  var startJob = function startJob(_ref) {
    var jobId = _ref.id,
        action = _ref.action,
        payload = _ref.payload;
    return new Promise(function (resolve, reject) {
      log('[' + id + ']: Start ' + jobId + ', action=' + action);
      setResolve(action, resolve);
      setReject(action, reject);
      send(worker, {
        workerId: id,
        jobId: jobId,
        action: action,
        payload: payload
      });
    });
  };

  var load = function load(jobId) {
    return startJob(createJob({
      id: jobId, action: 'load', payload: { options: options }
    }));
  };

  var syncfs = function syncfs(populate, jobId) {
    return startJob(createJob({
      id: jobId, action: 'syncfs', payload: { populate: populate }
    }));
  };

  var write = function write(path, data) {
    return new Promise(function ($return, $error) {
      return Promise.resolve(syncfs()).then(function ($await_3) {
        try {
          return Promise.resolve(fetchFile(data)).then(function ($await_4) {
            try {
              return Promise.resolve(fs.writeFile(path, $await_4)).then(function ($await_5) {
                try {
                  return Promise.resolve(syncfs(true)).then(function ($await_6) {
                    try {
                      return $return({
                        path: '/data/' + path
                      });
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }, $error);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  var writeText = function writeText(path, text) {
    return new Promise(function ($return, $error) {
      return Promise.resolve(syncfs(true)).then(function ($await_7) {
        try {
          return Promise.resolve(fs.writeFile(path, text)).then(function ($await_8) {
            try {
              return Promise.resolve(syncfs(true)).then(function ($await_9) {
                try {
                  return $return({
                    path: '/data/' + path
                  });
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  var read = function read(path) {
    var $args = arguments;return new Promise(function ($return, $error) {
      var del, data;
      del = $args.length > 1 && $args[1] !== undefined ? $args[1] : true;
      return Promise.resolve(fs.readFile(path)).then(function ($await_10) {
        try {
          data = $await_10;
          if (del) {
            return Promise.resolve(fs.deleteFile(path)).then(function ($await_11) {
              try {
                return $If_1.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          }

          function $If_1() {
            return $return({
              data: data
            });
          }

          return $If_1.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    });
  };

  var remove = function remove(path) {
    return new Promise(function ($return, $error) {
      return Promise.resolve(fs.deleteFile(path)).then(function ($await_12) {
        try {
          return $return({
            path: '/data/' + path
          });
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  var run = function run(args) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var jobId = arguments[2];
    return startJob(createJob({
      id: jobId, action: 'run', payload: { args: args, options: opts }
    }));
  };

  var transcode = function transcode(input, output) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var del = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var jobId = arguments[4];
    return run('-i /data/' + input + ' ' + opts + ' ' + output, { input: input, output: output, del: del }, jobId);
  };

  var trim = function trim(input, output, from, to) {
    var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var del = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var jobId = arguments[6];
    return run('-i /data/' + input + ' -ss ' + from + ' -to ' + to + ' ' + opts + ' ' + output, { input: input, output: output, del: del }, jobId);
  };

  var concatDemuxer = function concatDemuxer(input, output) {
    var $args = arguments;return new Promise(function ($return, $error) {
      var opts, del, jobId, text;
      opts = $args.length > 2 && $args[2] !== undefined ? $args[2] : '';
      del = $args.length > 3 && $args[3] !== undefined ? $args[3] : true;
      jobId = $args[4];

      text = input.reduce(function (acc, path) {
        return acc + '\nfile ' + path;
      }, '');
      return Promise.resolve(writeText('concat_list.txt', text)).then(function ($await_13) {
        try {
          return $return(run('-f concat -safe 0 -i /data/concat_list.txt -c copy ' + opts + ' ' + output, { del: del, output: output, input: [].concat(input, ['concat_list.txt']) }, jobId));
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  };

  var ls = function ls(path, jobId) {
    return startJob(createJob({
      id: jobId,
      action: 'FS',
      payload: { method: 'readdir', args: [path] }
    }));
  };

  var terminate = function terminate(jobId) {
    return new Promise(function ($return, $error) {
      if (worker !== null) {
        return Promise.resolve(startJob(createJob({
          id: jobId,
          action: 'terminate'
        }))).then(function ($await_14) {
          try {
            terminateWorker(worker);
            worker = null;
            return $If_2.call(this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      }

      function $If_2() {
        return $return(Promise.resolve());
      }

      return $If_2.call(this);
    });
  };

  onMessage(worker, function (_ref2) {
    var workerId = _ref2.workerId,
        jobId = _ref2.jobId,
        status = _ref2.status,
        action = _ref2.action,
        data = _ref2.data;

    if (status === 'resolve') {
      log('[' + workerId + ']: Complete ' + jobId);
      var d = data;
      if (action === 'FS') {
        var method = data.method,
            _data = data.data;

        if (method === 'readFile') {
          d = Uint8Array.from(_extends({}, _data, { length: Object.keys(_data).length }));
        } else {
          d = _data;
        }
      }
      resolves[action]({ jobId: jobId, data: d });
    } else if (status === 'reject') {
      rejects[action](data);
      throw Error(data);
    } else if (status === 'progress') {
      extractProgress(data, progress);
      logger(data);
    }
  });

  return {
    id: id,
    worker: worker,
    setResolve: setResolve,
    setReject: setReject,
    load: load,
    syncfs: syncfs,
    write: write,
    writeText: writeText,
    read: read,
    remove: remove,
    run: run,
    transcode: transcode,
    trim: trim,
    concatDemuxer: concatDemuxer,
    ls: ls,
    terminate: terminate
  };
};

/***/ }),

/***/ "Bcfi":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "Fnt3":
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__("a90S"),
    fork = _require.fork;

/**
 * spawnWorker
 *
 * @name spawnWorker
 * @function fork a new process in node
 * @access public
 */


module.exports = function (_ref) {
  var workerPath = _ref.workerPath;
  return fork(workerPath);
};

/***/ }),

/***/ "HVeQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1I2EN","boxName":"boxName__26nav","boxContainer":"boxContainer__1jDYD","subBox":"subBox__1KWXu","boxProp":"boxProp__31O6F","boxContents":"boxContents__3uHwf","arrayEntry":"arrayEntry__zS5vz","hexEntry":"hexEntry__1Mnjz"};

/***/ }),

/***/ "Hjji":
/***/ (function(module, exports) {

module.exports = function (key) {
  var env = {
    type: typeof window !== 'undefined' && typeof window.document !== 'undefined' ? 'browser' : 'node'
  };

  if (typeof key === 'undefined') {
    return env;
  }
  return env[key];
};

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
}], [0x55b0, {
    name: 'Colour',
    level: 4,
    type: 'm',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    description: 'Settings describing the colour format'
}], [0x55b1, {
    name: 'MatrixCoefficients',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '2',
    description: 'FThe Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries.'
}], [0x55b2, {
    name: 'BitsPerChannel',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '0',
    description: 'The Matrix Coefficients of the video used to derive luma and chroma values from reg, green, and blue color primaries. For clarity, the value and meanings for MatrixCoefficients are adopted from Table 4 of ISO/IEC 23001-8:2013/DCOR1. (0:GBR, 1: BT709, 2: Unspecified, 3: Reserved, 4: FCC, 5: BT470BG, 6: SMPTE 170M, 7: SMPTE 240M, 8: YCOCG, 9: BT2020 Non-constant Luminance, 10: BT2020 Constant Luminance)'
}], [0x55b9, {
    name: 'Range',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '0',
    description: 'Clipping of the color ranges. (0: Unspecified, 1: Broadcast Range, 2:Full Range, 3:Defined by MatrixCoefficients/TransferCharacteristics'
}], [0x55ba, {
    name: 'TransferCharacteristics',
    level: 5,
    type: 'u',
    multiple: false,
    mandatory: false,
    minver: 4,
    webm: false,
    default: '2',
    description: 'The transfer characteristics of the video. For clarity, the value and meanings for TransferCharacteristics 1-15 are adopted from Table 3 of ISO/IEC 23001-8:2013/DCOR1. TransferCharacteristics 16-18 are proposed values. (0: Reserved, 1: ITU-R BT.709, 2: Unspecified, 3: Reserved, 4: Gamma 2.2 curve, 5: Gamma 2.8 curve, 6: SMPTE 170M, 7: SMPTE 240M, 8: Linear, 9: Log, 10: Log Sqrt, 11: IEC 61966-2-4, 12: ITU-R BT.1361 Extended Colour Gamut, 13: IEC 61966-2-1, 14: ITU-R BT.2020 10 bit, 15: ITU-R BT.2020 12 bit, 16: SMPTE ST 2084, 17: SMPTE ST 428-1 18: ARIB STD-B67 (HLG))'
}], [0x55bb, {
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
        debug('looking up tag', tagStr);
        return self._schema.get(parseInt(tagStr, 16)) || {
            'type': 'unknown',
            'name': 'unknown tag ' + tagStr
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

var _require = __webpack_require__("9BjC"),
    createWorker = _require.createWorker;

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

var generateM3U8 = function generateM3U8(keyFile, IV, segmentList) {
    return '#EXTM3U\n#EXT-X-TARGETDURATION:5\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-KEY:METHOD=AES-128,URI="' + keyFile + '",IV=0x' + IV + '\n' + segmentList.map(function (segmentFile) {
        return '#EXTINF:5,\n' + segmentFile;
    }) + '\n#EXT-X-ENDLIST';
};

var m2tsBoxer_processData = function processData(data) {
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
        // need to parse the PMT
        var pmt = {
            table_id: tableIDLookup[buf[0]] || 'reserved',
            section_syntax_indicator: (buf[1] & 128) >> 7,
            private_bit: (buf[1] & 64) >> 6,
            reserved1: (buf[1] & 48) >> 4,
            section_length: (buf[1] & 15) << 8 | buf[2],
            program_number: buf[3] << 8 + buf[4],
            reserved2: (buf[5] & 192) >> 6,
            version_number: (buf[5] & 62) >> 1,
            current_next_indicator: buf[5] & 1,
            section_number: buf[6],
            last_section_number: buf[7],
            reserved3: (buf[8] & 224) >> 5,
            PCR_PID: (buf[8] & 31) << 8 | buf[9],
            reserved4: (buf[10] & 240) >> 4,
            program_info_length: (buf[10] & 15) << 8 | buf[11]

            // now need to loop buf[12] to get
        };var start = 12;
        var boxes = [];
        var i = 0;
        while (buf.length > start + i + 4) {
            var _streamInfo;

            var streamInfo = (_streamInfo = {
                stream_type: streamTypeLookup[buf[start + i]] || 'unknown'
            }, _streamInfo['reserved' + (5 + i)] = (buf[start + i + 1] & 224) >> 5, _streamInfo.elementary_PID = (buf[start + i + 1] & 31) << 8 | buf[start + i + 2], _streamInfo['reserved' + (6 + i + 1)] = (buf[start + i + 3] & 240) >> 4, _streamInfo.ES_info_length = (buf[start + i + 3] & 15) << 8 | buf[start + i + 4], _streamInfo);
            boxes.push(streamInfo);
            // add the stream type and id to the table
            pidLookup.set(streamInfo.elementary_PID, streamInfo.stream_type);
            i += 5;
        }
        boxes.map(function (stream, index) {
            return pmt['elementary_stream ' + (index + 1)] = stream;
        });
        pmt.crc_32 = buf[i] << 24 | buf[i + 1] << 16 | buf[i + 2] << 8 | buf[i + 3];
        return pmt;
    };

    var processEntry = function processEntry(segment, startByte) {
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
            // nested tags need a start and end
            var start = 4 + startByte;
            // if the current tag is adaptation field control, set whether this has one or not
            if (key === 'adaptation_field_control' && (segment[key] === 2 || segment[key] === 3)) hasAdaptationField = true;
            // if the current tag is the adaptation field length, store that
            if (key === 'adaptation_field_length') adaptationFieldLength = segment[key];
            // if the current tag is the program association section, set that instead
            if (key === 'program_association_section') hasAdaptationField = true;
            if (key === 'section_length' && hasAdaptationField) adaptationFieldLength = 3 + segment[key];
            // if the current tag is the PMT, set that instead
            if (key === 'program_map_section') hasAdaptationField = true;
            if (key === 'section_length' && hasAdaptationField) adaptationFieldLength = 4 + segment[key];
            // for elementary streams, length is 5 bytes
            if (key.includes('elementary_stream')) {
                adaptationFieldLength = 5;
                start = 4 + startByte + 12 + 5 * parseInt(key.slice(-1), 10);
            }
            if (typeof segment[key] === 'object') return {
                type: key,
                boxes: processEntry(segment[key], 4 + startByte),
                start: start,
                end: start + adaptationFieldLength
            };
            // plain data doesn't need a start and end
            return {
                name: key,
                display: segment[key],
                start: null,
                end: null
            };
        });
    };

    // reset markers for length counters
    var adaptationFieldLength = void 0,
        hasAdaptationField = void 0;
    try {
        var boxes = data.map(function (segment, index) {
            // Display layer is expecting the form:
            // box.start {number} byte offset of box start
            // box.end {number} byte offset of box end
            // box.display {string} display value of the box
            // box.hex {string} hex representation of the box
            // box.name {string} name of the data entry
            // box.type {string} name of the container box
            // box.boxes {Array:box} sub-boxes
            // first reset the markers each time we process a top-level box
            adaptationFieldLength = 0;
            hasAdaptationField = false;
            return {
                start: index * 188,
                end: (index + 1) * 188 - 1,
                type: 'PID ' + segment.pid + (pidLookup.has(segment.pid) ? ' (' + pidLookup.get(segment.pid) + ')' : '') + ' #' + segment.continuity_counter,
                hex: Object(tools["convertToHex"])(segment.packet),
                packet: Object(tools["convertToHex"])(segment.packet),
                boxes: processEntry(segment, index * 188)
            };
        });
        return { boxes: boxes };
    } catch (e) {
        throw e;
    }
};

var m2tsBoxer = function m2tsBoxer(buf) {
    var segmentCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
            parser.write(segmentCount ? buf.slice(0, 188 * segmentCount) : buf, function () {
                return resolve(m2tsBoxer_processData(allData));
            });
        } catch (e) {
            return reject(e);
        }
    });
};

var convertM2TS = function convertM2TS(segmentFile) {
    return new Promise(function (resolve, reject) {
        return new Promise(function ($return, $error) {
            var worker, _ref2, data;

            var $Try_3_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            };var $Try_3_Catch = function (e) {
                try {
                    return $return(reject(e));
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            };
            try {
                worker = createWorker({ logger: function logger(_ref) {
                        var message = _ref.message;
                        return console.log(message);
                    } });
                return Promise.resolve(worker.load()).then(function ($await_5) {
                    try {
                        // load files into virtual file system
                        console.log('worker loaded');
                        return Promise.resolve(worker.write('segment.ts', segmentFile)).then(function ($await_6) {
                            try {
                                return Promise.resolve(worker.run('-loglevel debug -allowed_extensions ALL -i /data/segment.ts -c copy -bsf:a aac_adtstoasc decrypt.mp4', {
                                    input: 'segment.ts',
                                    output: 'decrypt.mp4',
                                    del: true
                                })).then(function ($await_7) {
                                    try {
                                        return Promise.resolve(worker.read('decrypt.mp4')).then(function ($await_8) {
                                            try {
                                                _ref2 = $await_8, data = _ref2.data;

                                                return $return(resolve(data));
                                            } catch ($boundEx) {
                                                return $Try_3_Catch($boundEx);
                                            }
                                        }, $Try_3_Catch);
                                    } catch ($boundEx) {
                                        return $Try_3_Catch($boundEx);
                                    }
                                }, $Try_3_Catch);
                            } catch ($boundEx) {
                                return $Try_3_Catch($boundEx);
                            }
                        }, $Try_3_Catch);
                    } catch ($boundEx) {
                        return $Try_3_Catch($boundEx);
                    }
                }, $Try_3_Catch);
            } catch (e) {
                $Try_3_Catch(e)
            }
        });
    });
};

var decodeM2TS = function decodeM2TS(playList, keyFile, segmentFile) {
    return new Promise(function (resolve, reject) {
        return new Promise(function ($return, $error) {
            var IV, newPlayList, _map, keyFileBuffer, segmentBuffer, worker, _ref4, data;

            var $Try_4_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            };var $Try_4_Catch = function (err) {
                try {
                    return $return(reject(err));
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            };
            try {
                IV = playList.match(/IV=0x([0123456789ABCDEF]*)\s/);
                newPlayList = generateM3U8('keyFile.key', IV ? IV[1] : '0000000000000001', ['segment.ts']);
                _map = [keyFile, segmentFile].map(function (data) {
                    return Uint8Array.from(atob(data), function (c) {
                        return c.charCodeAt(0);
                    });
                }), keyFileBuffer = _map[0], segmentBuffer = _map[1];

                worker = createWorker({ logger: function logger(_ref3) {
                        var message = _ref3.message;
                        return console.log(message);
                    } });
                return Promise.resolve(worker.load()).then(function ($await_9) {
                    try {
                        // load files into virtual file system
                        console.log('worker loaded');
                        return Promise.resolve(worker.writeText('playlist.m3u8', newPlayList)).then(function ($await_10) {
                            try {
                                return Promise.resolve(worker.write('keyFile.key', keyFileBuffer)).then(function ($await_11) {
                                    try {
                                        return Promise.resolve(worker.write('segment.ts', segmentBuffer)).then(function ($await_12) {
                                            try {
                                                return Promise.resolve(worker.run('-loglevel debug -allowed_extensions ALL -i /data/playlist.m3u8 -c copy decrypt.ts', {
                                                    input: ['playlist.m3u8', 'keyFile.key', 'segment.ts'],
                                                    output: 'decrypt.ts',
                                                    del: true
                                                })).then(function ($await_13) {
                                                    try {
                                                        return Promise.resolve(worker.read('decrypt.ts')).then(function ($await_14) {
                                                            try {
                                                                _ref4 = $await_14, data = _ref4.data;

                                                                return $return(resolve(data));
                                                            } catch ($boundEx) {
                                                                return $Try_4_Catch($boundEx);
                                                            }
                                                        }, $Try_4_Catch);
                                                    } catch ($boundEx) {
                                                        return $Try_4_Catch($boundEx);
                                                    }
                                                }, $Try_4_Catch);
                                            } catch ($boundEx) {
                                                return $Try_4_Catch($boundEx);
                                            }
                                        }, $Try_4_Catch);
                                    } catch ($boundEx) {
                                        return $Try_4_Catch($boundEx);
                                    }
                                }, $Try_4_Catch);
                            } catch ($boundEx) {
                                return $Try_4_Catch($boundEx);
                            }
                        }, $Try_4_Catch);
                    } catch ($boundEx) {
                        return $Try_4_Catch($boundEx);
                    }
                }, $Try_4_Catch);
            } catch (err) {
                $Try_4_Catch(err)
            }
        });
    });
};


// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js




var header__ref = Object(preact_min["h"])(
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
		'Select Media File'
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
		header__ref,
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])('input', { type: 'file', id: 'getFile', onChange: function onChange(e) {
					return props.handleFiles(e, 'segment');
				} }),
			_ref2,
			Object(preact_min["h"])('input', { type: 'file', disabled: props.mode !== 'MP2T', id: 'getPlayList', onChange: function onChange(e) {
					return props.handleFiles(e, 'playlist');
				} }),
			Object(preact_min["h"])(
				'label',
				{ 'for': 'getPlayList' },
				Object(preact_min["h"])(
					'a',
					{ style: props.mode !== 'MP2T' ? { color: 'grey' } : {} },
					'Select Playlist File'
				)
			),
			Object(preact_min["h"])('input', { type: 'file', disabled: props.mode !== 'MP2T', id: 'getKey', onChange: function onChange(e) {
					return props.handleFiles(e, 'key');
				} }),
			Object(preact_min["h"])(
				'label',
				{ 'for': 'getKey' },
				Object(preact_min["h"])(
					'a',
					{ style: props.mode !== 'MP2T' ? { color: 'grey' } : {} },
					'Select Key File'
				)
			),
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
					if (Array.isArray(entry[key])) {
						return entry[key].filter(function (element) {
							return element && element.entryNumber;
						}).map(function (element) {
							return showEntryDetails(key, element);
						});
					}
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

		var boxLabel = '' + (box.type || box.name) + (props.hasFocus === box.start && box.type ? ' starting byte: ' + box.start : '') + (box.type && box.end ? ' (' + (box.size || box.end - box.start + 1) + ' bytes)' : '');

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
// EXTERNAL MODULE: ./components/multiview/style.css
var multiview_style = __webpack_require__("7pDz");
var multiview_style_default = /*#__PURE__*/__webpack_require__.n(multiview_style);

// CONCATENATED MODULE: ./components/multiview/index.js
var multiview__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/** @jsx h */

var multiview_TagTree = function TagTree(props) {
    //create indents based on children
    var renderKids = function renderKids(boxKey) {
        // need to get the actual key object since {a:1, b:2} !== {a:2, b:2}
        var tag = Array.from(props.tags.keys()).filter(function (_ref) {
            var box = _ref.box,
                start = _ref.start;
            return box === boxKey.box && start === boxKey.start;
        })[0];
        var entry = props.tags.get(tag);
        try {
            return Object(preact_min["h"])(
                'li',
                {
                    style: { padding: '2px', fontWeight: props.selected.box === tag.box && props.selected.start === tag.start ? "bold" : "normal" },
                    onClick: function onClick(e) {
                        return props.handleClick(e, tag);
                    },
                    key: tag.start
                },
                tag.box,
                !!entry.children && entry.children.length > 0 ? entry.children.map(renderKids) : ''
            );
        } catch (e) {
            console.error('error processing tag', entry, e);
        }
    };

    var rootTags = Array.from(props.tags).reduce(function (result, _ref2) {
        var key = _ref2[0],
            entry = _ref2[1];

        if (entry.parent.length === 0) result.push(key);
        return result;
    }, []);

    return Object(preact_min["h"])(
        'div',
        {
            style: {
                background: props.background,
                display: "grid",
                gridArea: "tree",
                overflowY: 'scroll',
                height: '50em'
            }
        },
        Object(preact_min["h"])(
            'li',
            { onClick: function onClick(e) {
                    return props.handleClick(e, "");
                }, 'class': multiview_style_default.a.filename },
            props.fileName,
            rootTags && rootTags.map(renderKids)
        )
    );
};

var multiview_Data = function Data(props) {

    var dataToShow = function dataToShow(box) {
        if (box.display && Array.isArray(box.display)) {
            if (box.display.length === 0) return Object(preact_min["h"])(
                'div',
                { style: { margin: 'inherit' } },
                '[]'
            );
            return Object(preact_min["h"])(
                'div',
                { style: { margin: 'inherit' }, onClick: function onClick(e) {
                        return props.arraySelected(e, box, props.tagName);
                    } },
                'Click for Details'
            );
        }
        return Object(preact_min["h"])(
            'div',
            { style: { margin: 'inherit' } },
            box.display
        );
    };

    return Object(preact_min["h"])(
        'div',
        {
            style: {
                background: props.background,
                display: 'flex',
                flexDirection: 'column',
                gridArea: "data",
                overflowY: 'scroll'
            }
        },
        props.tagData && props.tagData.map(function (value) {
            return Object(preact_min["h"])(
                'div',
                { style: {
                        display: 'flex',
                        margin: '2px 2px 2px 10px'
                    } },
                Object(preact_min["h"])(
                    'div',
                    { style: { margin: 'inherit', fontWeight: 'bold' } },
                    value.name,
                    ':'
                ),
                dataToShow(value)
            );
        })
    );
};

var _ref3 = Object(preact_min["h"])('div', null);

var multiview_SubArray = function SubArray(props) {
    return (
        // TODO - deal with arrays of arrays like senc samples
        Object(preact_min["h"])(
            'div',
            { style: {
                    overflowY: 'scroll'
                } },
            props.entryName ? Object(preact_min["h"])(
                'h2',
                null,
                props.entryName
            ) : _ref3,
            Object(preact_min["h"])(
                'div',
                {
                    style: {
                        background: props.background,
                        display: "flex",
                        gridArea: "array",
                        flexDirection: 'column'
                    }
                },
                props.subArray.map(function (entry) {
                    return Object(preact_min["h"])(
                        'div',
                        { style: { display: 'flex', background: entry.entryNumber % 2 ? 'lightgray' : 'darkgray' } },
                        Object(preact_min["h"])(
                            'div',
                            { style: { display: 'flex', alignSelf: 'center' } },
                            entry.entryNumber
                        ),
                        Object(preact_min["h"])(
                            'div',
                            null,
                            Object.keys(entry).filter(function (entry) {
                                return entry !== 'entryNumber';
                            }).map(function (key) {
                                return Object(preact_min["h"])(
                                    'div',
                                    { style: { display: 'flex', margin: '2px 2px 2px 10px' } },
                                    Object(preact_min["h"])(
                                        'div',
                                        { style: { margin: 'inherit' } },
                                        key,
                                        ':'
                                    ),
                                    Object(preact_min["h"])(
                                        'div',
                                        { style: { margin: 'inherit' } },
                                        Array.isArray(entry[key]) && entry[key].length > 1 ? entry[key].map(function (nestedVal) {
                                            return Object(preact_min["h"])(
                                                'div',
                                                { style: { margin: 'inherit' } },
                                                JSON.stringify(nestedVal)
                                            );
                                        }) : entry[key]
                                    )
                                );
                            })
                        )
                    );
                })
            )
        )
    );
};

var _ref4 = Object(preact_min["h"])('div', null);

var multiview_Hex = function Hex(props) {
    return Object(preact_min["h"])(
        'div',
        {
            style: { background: props.background, display: 'grid', gridTemplateRows: 'repeat(' + (props.hex.length + 1) + ', 1em)', gridArea: "hex" }
        },
        props.hex.map(function (row) {
            return Object(preact_min["h"])(
                'div',
                { style: { fontFamily: 'courier', display: "grid", gridTemplateColumns: '500px 200px auto' } },
                Object(preact_min["h"])(
                    'div',
                    null,
                    row
                ),
                Object(preact_min["h"])(
                    'div',
                    null,
                    row.split(' ').map(function (byte) {
                        var code = parseInt(byte, 16);
                        return code > 31 ? String.fromCharCode(code) : '.';
                    })
                ),
                _ref4
            );
        })
    );
};

var multiview_MultiView = function (_Component) {
    _inherits(MultiView, _Component);

    function MultiView(props) {
        _classCallCheck(this, MultiView);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handleClick = function (event, boxName) {
            event.stopPropagation();
            console.log(boxName, _this.state.boxList.get(boxName));

            var _this$state$boxList$g = _this.state.boxList.get(boxName),
                values = _this$state$boxList$g.values,
                hex = _this$state$boxList$g.hex;

            _this.setState({
                detailBox: '',
                arrayData: [],
                selectedTag: multiview__extends({}, boxName),
                selectedBox: values,
                selectedHex: hex
            });
        };

        _this.arraySelected = function (event, boxName, arrayTag) {
            console.log(boxName.name + '->' + arrayTag + ' selected, contains array entries');
            var arrayData = boxName.display;
            _this.setState({ arrayData: arrayData, detailBox: boxName.name });
        };

        _this.state = {
            fileName: _this.props.fileName,
            selectedTag: "",
            selectedBox: [],
            arrayData: [],
            selectedHex: [],
            detailBox: '',
            boxList: _this.props.boxList,
            preProcessed: _this.props.preProcessed,
            postProcessed: _this.props.postProcessed
        };
        return _this;
    }

    MultiView.prototype.render = function render() {
        return Object(preact_min["h"])(
            'div',
            {
                style: {
                    display: "grid",
                    gridTemplateAreas: '\'tree data array\'\n                                        \'tree hex hex\'\n                                        \'tree hex hex\'',
                    gridTemplateRows: "25em 25em",
                    gridTemplateColumns: "1.5fr 3fr 3fr"
                }
            },
            Object(preact_min["h"])(multiview_TagTree, {
                background: 'lightgrey',
                tags: this.state.boxList,
                handleClick: this.handleClick,
                fileName: this.state.fileName,
                selected: this.state.selectedTag
            }),
            Object(preact_min["h"])(multiview_Data, {
                background: 'white',
                tagData: this.state.selectedBox,
                tagName: this.state.selectedTag,
                arraySelected: this.arraySelected
            }),
            Object(preact_min["h"])(multiview_SubArray, {
                background: 'white',
                subArray: this.state.arrayData,
                entryName: this.state.detailBox
            }),
            Object(preact_min["h"])(multiview_Hex, {
                background: 'white',
                hex: this.state.selectedHex || ['00']
            })
        );
    };

    return MultiView;
}(preact_min["Component"]);

/* harmony default export */ var multiview = (multiview_MultiView);
// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










// debugging


// for M2TS segments, how many to parse? 
var SEGMENT_COUNT = 512;

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
	4: 'Can\'t parse metadata. Is this not an initialization segment?',
	99: 'MP2T file appears to be encrypted. \n\tPlease select a \'.key\' file and a \'.m3u8\' file\n\tusing \'Select Local File\' above'

};

var app_parseISO = function parseISO(buf) {
	return new Promise(function (resolve, reject) {
		return new Promise(function ($return, $error) {
			var VALID_START_BOX, parsedData, preProcessed, result;

			VALID_START_BOX = new Set(['ftyp', 'moof', 'styp', 'sidx']);
			return Promise.resolve(Object(iso_boxer["parseBuffer"])(buf.buffer)).then(function ($await_5) {
				try {
					parsedData = $await_5;
					if (VALID_START_BOX.has(parsedData.boxes[0].type)) {
						preProcessed = Object(additionalBoxes["convertBox"])(parsedData.boxes);
						console.log('pre-processed box data:', preProcessed);
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

var app__ref3 = Object(preact_min["h"])(
	'span',
	null,
	Object(preact_min["h"])('span', null)
);

var app__ref4 = Object(preact_min["h"])('div', null);

var _ref5 = Object(preact_min["h"])('option', null);

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App(props) {
		app__classCallCheck(this, App);

		var _this = app__possibleConstructorReturn(this, _Component.call(this, props));

		_this.componentWillMount = function () {
			// add any custom box processors
			additionalBoxes["additionalBoxes"].map(function (box) {
				if (Object.hasOwnProperty.call(box, '_parser')) Object(iso_boxer["addBoxProcessor"])(box.field, box._parser);
			});
		};

		_this.createParsed = function (inputData) {
			return new Promise(function ($return, $error) {
				var inputBuffer, decryptedData;

				inputBuffer = Uint8Array.from(atob(inputData), function (c) {
					return c.charCodeAt(0);
				});
				//console.log('hex dump',new TextDecoder('utf-8').decode(inputBuffer));
				if (_this.state.mode === 'webm') return $return(ebmlBoxer_ebmlBoxer(inputBuffer.buffer));
				if (_this.state.mode === 'mp4') return $return(app_parseISO(inputBuffer));
				if (_this.state.mode === 'MP2T') {
					// check first byte for the start code
					if (inputBuffer[0] !== 0x47) {
						decryptedData = void 0;
						// it's not a start code, and we're in MP2T mode, so try decrypting
						if (_this.state.playlist && _this.state.keyFile) {
							return Promise.resolve(decodeM2TS(_this.state.playlist, _this.state.keyFile, inputData, SEGMENT_COUNT)).then(function ($await_6) {
								try {
									decryptedData = $await_6;
									// store the converted output in inputData
									_this.setState({ videoData: decryptedData });
									// now process the boxes
									return $return(m2tsBoxer(decryptedData, SEGMENT_COUNT));
								} catch ($boundEx) {
									return $error($boundEx);
								}
							}, $error);
						} else {
							_this.setState({ videoError: niceError[99], working: false });
							return $return();
						};
						return $If_2.call(this);
					}
					// start code is valid, so just parse

					function $If_2() {
						_this.setState({ videoData: inputBuffer });
						return $return(m2tsBoxer(inputBuffer, SEGMENT_COUNT));
					}

					return $If_2.call(this);
				};
				return $return();
			});
		};

		_this.updateInput = function (e) {
			console.log('updating inbox box with new value: ' + e.target.value);
			var inputData = e.target.value;
			_this.setState({ inputData: inputData });
		};

		_this.parseFile = function (inputData) {
			console.log('parsing data in ' + _this.state.mode + ' mode:');
			_this.setState({ working: true, showVideo: false, videoError: '' });
			_this.createParsed(inputData).then(function (_ref) {
				var boxes = _ref.boxes;

				var listOfBoxes = new Map();
				//extract a list of box names for the dropdown
				//return Map([target, [parentList]]}
				Object(additionalBoxes["getBoxList"])(boxes, listOfBoxes).then(function (boxList) {
					return _this.setState({ boxList: boxList, inputData: inputData, parsedData: boxes, working: false, decodeAttempts: 0 });
				});
				;
				return;
			}).catch(function (err) {
				console.error(err);
				_this.setState({ errorMessage: err, working: false });
				/* if (this.state.decodeAttempts < Object.keys(modes).length) {
    	let { decodeAttempts, mode } = this.state;
    	decodeAttempts += 1;
    	mode = modes[mode];
    	console.log(`failed decode #${decodeAttempts}, trying ${mode} mode`);
    	this.setState({ decodeAttempts, mode, working: true });
    	this.parseFile(this.state.inputData);
    } */
			});
		};

		_this.handleEncrypted = function (e) {
			console.log('got encrypted event', e.target && e.target.error);
			e.preventDefault();
			var videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
			_this.setState({ showVideo: false, videoError: videoError });
		};

		_this.handleFiles = function (e, fileType) {
			var fileName = e.target.files[0];
			_this.setState({ working: true, showVideo: false, inputData: '' });
			console.log(fileName);
			if (fileName.type.includes('webm')) {
				_this.setState({ mode: 'webm' });
			} else if (fileName.type.includes('mp4')) {
				_this.setState({ mode: 'mp4' });
			} else {
				_this.setState({ mode: 'MP2T' });
			}
			var reader = new FileReader();
			var self = _this;
			reader.onload = function (r) {
				switch (fileType) {
					case 'playlist':
						var playlist = atob(r.target.result.split(/base64,/)[1]);
						self.setState({ playlist: playlist, working: false, fileName: 'Loaded Playlist ' + fileName.name });
						break;
					case 'key':
						var keyFile = r.target.result.split(/base64,/)[1];
						self.setState({ keyFile: keyFile, working: false, fileName: 'Loaded key file ' + fileName.name });
						break;
					default:
						var inputData = r.target.result.split(/base64,/)[1];
						self.setState({ inputData: inputData, fileName: fileName.name });
						self.parseFile(inputData);
				}
			};
			reader.readAsDataURL(fileName);
		};

		_this.toggleHex = function (e) {
			var showHex = !_this.state.showHex;
			_this.setState({ showHex: showHex });
		};

		_this.togglePreview = function (e) {
			return new Promise(function ($return, $error) {
				var showVideo, inputBuffer, videoData, convertedFile;

				_this.setState({ working: true });
				showVideo = !_this.state.showVideo;
				inputBuffer = _this.state.videoData;
				videoData = void 0;
				if (_this.state.mode === 'MP2T' && showVideo) {
					return Promise.resolve(convertM2TS(inputBuffer)).then(function ($await_7) {
						try {
							convertedFile = $await_7;
							// it's a buffer, so make it into base64 for rendering
							videoData = btoa(Array.from(convertedFile).map(function (byte) {
								return String.fromCharCode(byte);
							}).join(''));
							return $If_4.call(this);
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				} else {
					videoData = _this.state.inputData;
					return $If_4.call(this);
				}

				function $If_4() {
					_this.setState({ working: false, showVideo: showVideo, videoData: videoData });
					return $return();
				}
			});
		};

		_this.handleFocus = function (e, focusRow, showOffset) {
			console.log('got mouse' + (showOffset ? 'Enter' : 'Leave') + ' event for row ' + focusRow);
			_this.setState({ hasFocus: showOffset ? focusRow : -1 });
		};

		_this.handleSearch = function (e) {
			var searchTerm = e.target.value;
			console.log('searching box list for ' + searchTerm);
			var keyList = Array.from(_this.state.boxList.keys()).filter(function (_ref2) {
				var box = _ref2.box,
				    start = _ref2.start;
				return box === searchTerm;
			});
			console.log(keyList);
			if (keyList.length) {
				var parentList = keyList.reduce(function (result, key) {
					return _this.state.boxList.get(key).parent.concat(result);
				}, []);
				_this.setState({ searchTerm: searchTerm, selectedBox: { target: searchTerm, parentList: parentList } });
			}
			if (searchTerm == '') {
				_this.setState({ searchTerm: searchTerm, selectedBox: { target: '', parentList: [] } });
			}
		};

		_this.expandAll = function (e) {
			console.log('got command to ' + (_this.state.expanded ? 'collapse' : 'expand') + ' the tree');
			var expanded = !_this.state.expanded;
			_this.setState({ working: true, expanded: expanded });
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

		_this.changeViewMode = function (e) {
			var viewMode = !_this.state.viewMode;
			_this.setState({ viewMode: viewMode });
		};

		_this.changeFileMode = function (e, mode) {
			_this.setState({ mode: mode });
		};

		_this.state = {
			playlist: null,
			keyFile: null,
			fileName: 'raw base64 data',
			inputData: '',
			videoData: '',
			parsedData: { boxes: [] },
			mode: 'MP2T',
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false,
			hasFocus: -1,
			base64: '',
			expanded: false,
			boxList: new Map(),
			selectedBox: { target: '', parentList: [] },
			searchTerm: '',
			viewMode: false
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
				handleFiles: this.handleFiles,
				viewMode: this.state.viewMode,
				changeViewMode: this.changeViewMode
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
					{ style: { margin: '18px 0 0 7px' } },
					['mp4', 'webm', 'MP2T'].map(function (type) {
						return Object(preact_min["h"])(
							'div',
							null,
							Object(preact_min["h"])('input', { id: type, type: 'radio', name: type, value: type, checked: _this2.state.mode === type, onChange: function onChange(e) {
									return _this2.changeFileMode(e, type);
								} }),
							Object(preact_min["h"])(
								'label',
								{ htmlFor: type },
								app__ref3,
								type
							)
						);
					})
				),
				Object(preact_min["h"])(
					'div',
					{ style: { gridRow: '2/3' } },
					Object(preact_min["h"])(
						'button',
						{ style: styles.parseButton, onClick: function onClick(e) {
								return _this2.parseFile(_this2.state.inputData);
							} },
						'Go'
					)
				)
			) : app__ref4,
			Object(preact_min["h"])(
				'div',
				null,
				this.state.showVideo ? Object(preact_min["h"])(video, {
					mimeType: this.state.mode === 'MP2T' ? 'mp4' : this.state.mode,
					data: this.state.videoData,
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
						Object(preact_min["h"])(
							'input',
							{ list: 'tags', 'class': 'tagSearch', placeholder: 'search for tag', size: '8', onChange: this.handleSearch, value: this.state.searchTerm },
							Object(preact_min["h"])(
								'datalist',
								{ style: styles.parseButton, id: 'tags' },
								Array.from(this.state.boxList.keys()).map(function (boxName) {
									if (boxName) return Object(preact_min["h"])(
										'option',
										{ value: boxName },
										boxName
									);
									return _ref5;
								})
							)
						)
					)
				),
				this.state.viewMode ? Object(preact_min["h"])(multiview, {
					postProcessed: this.state.parsedData,
					boxList: this.state.boxList,
					fileName: this.state.fileName
				}) : Object(preact_min["h"])(home, {
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



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports) {

var n,
    l,
    u,
    t,
    i,
    o,
    r,
    f = {},
    e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function s(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }return n;
}function a(n) {
  var l = n.parentNode;l && l.removeChild(n);
}function p(n, l, u) {
  var t,
      i = arguments,
      o = {};for (t in l) {
    "key" !== t && "ref" !== t && (o[t] = l[t]);
  }if (arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) {
    u.push(i[t]);
  }if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (t in n.defaultProps) {
    void 0 === o[t] && (o[t] = n.defaultProps[t]);
  }return h(n, o, l && l.key, l && l.ref);
}function h(l, u, t, i) {
  var o = { type: l, props: u, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __d: null, __c: null, constructor: void 0 };return n.vnode && n.vnode(o), o;
}function v(n) {
  return n.children;
}function y(n, l) {
  this.props = n, this.context = l;
}function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }return "function" == typeof n.type ? d(n) : null;
}function m(n) {
  var l, u;if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;break;
      }
    }return m(n);
  }
}function x(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && ((i = n.debounceRendering) || t)(w);
}function w() {
  var n, l, t, i, o, r, f;for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) {
    n.__d && (t = void 0, i = void 0, r = (o = (l = n).__v).__e, (f = l.__P) && (t = [], i = N(f, o, s({}, o), l.__n, void 0 !== f.ownerSVGElement, null, t, null == r ? d(o) : r), T(t, o), i != r && m(o)));
  }
}function g(n, l, u, t, i, o, r, c, s) {
  var p,
      h,
      v,
      y,
      m,
      x,
      w,
      g = u && u.__k || e,
      _ = g.length;if (c == f && (c = null != o ? o[0] : _ ? d(u, 0) : null), p = 0, l.__k = k(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (v = g[p]) || v && u.key == v.key && u.type === v.type) g[p] = void 0;else for (h = 0; h < _; h++) {
        if ((v = g[h]) && u.key == v.key && u.type === v.type) {
          g[h] = void 0;break;
        }v = null;
      }if (y = N(n, u, v = v || f, t, i, o, r, c, s), (h = u.ref) && v.ref != h && (w || (w = []), v.ref && w.push(v.ref, null, u), w.push(h, u.__c || y, u)), null != y) {
        if (null == x && (x = y), null != u.__d) y = u.__d, u.__d = null;else if (o == v || y != c || null == y.parentNode) {
          n: if (null == c || c.parentNode !== n) n.appendChild(y);else {
            for (m = c, h = 0; (m = m.nextSibling) && h < _; h += 2) {
              if (m == y) break n;
            }n.insertBefore(y, c);
          }"option" == l.type && (n.value = "");
        }c = y.nextSibling, "function" == typeof l.type && (l.__d = y);
      }
    }return p++, u;
  }), l.__e = x, null != o && "function" != typeof l.type) for (p = o.length; p--;) {
    null != o[p] && a(o[p]);
  }for (p = _; p--;) {
    null != g[p] && z(g[p], g[p]);
  }if (w) for (p = 0; p < w.length; p++) {
    j(w[p], w[++p], w[++p]);
  }
}function k(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) {
    k(n[t], l, u);
  } else u.push(l ? l("string" == typeof n || "number" == typeof n ? h(null, n, null, null) : null != n.__e || null != n.__c ? h(n.type, n.props, n.key, null) : n) : n);return u;
}function _(n, l, u, t, i) {
  var o;for (o in u) {
    o in l || C(n, o, null, u[o], t);
  }for (o in l) {
    i && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], t);
  }
}function b(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
}function C(n, l, u, t, i) {
  var o, r, f, e, c;if (i ? "className" === l && (l = "class") : "class" === l && (l = "className"), "key" === l || "children" === l) ;else if ("style" === l) {
    if (o = n.style, "string" == typeof u) o.cssText = u;else {
      if ("string" == typeof t && (o.cssText = "", t = null), t) for (r in t) {
        u && r in u || b(o, r, "");
      }if (u) for (f in u) {
        t && u[f] === t[f] || b(o, f, u[f]);
      }
    }
  } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, P, e), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, P, e)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
}function P(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}function N(l, u, t, i, o, r, f, e, c) {
  var a,
      p,
      h,
      d,
      m,
      x,
      w,
      _,
      b,
      C,
      P = u.type;if (void 0 !== u.constructor) return null;(a = n.__b) && a(u);try {
    n: if ("function" == typeof P) {
      if (_ = u.props, b = (a = P.contextType) && i[a.__c], C = a ? b ? b.props.value : a.__ : i, t.__c ? w = (p = u.__c = t.__c).__ = p.__E : ("prototype" in P && P.prototype.render ? u.__c = p = new P(_, C) : (u.__c = p = new y(_, C), p.constructor = P, p.render = A), b && b.sub(p), p.props = _, p.state || (p.state = {}), p.context = C, p.__n = i, h = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), null != P.getDerivedStateFromProps && (p.__s == p.state && (p.__s = s({}, p.__s)), s(p.__s, P.getDerivedStateFromProps(_, p.__s))), d = p.props, m = p.state, h) null == P.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && _ !== d && null != p.componentWillReceiveProps && p.componentWillReceiveProps(_, C), !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(_, p.__s, C)) {
          for (p.props = _, p.state = p.__s, p.__d = !1, p.__v = u, u.__e = t.__e, u.__k = t.__k, p.__h.length && f.push(p), a = 0; a < u.__k.length; a++) {
            u.__k[a] && (u.__k[a].__ = u);
          }break n;
        }null != p.componentWillUpdate && p.componentWillUpdate(_, p.__s, C), null != p.componentDidUpdate && p.__h.push(function () {
          p.componentDidUpdate(d, m, x);
        });
      }p.context = C, p.props = _, p.state = p.__s, (a = n.__r) && a(u), p.__d = !1, p.__v = u, p.__P = l, a = p.render(p.props, p.state, p.context), u.__k = k(null != a && a.type == v && null == a.key ? a.props.children : a), null != p.getChildContext && (i = s(s({}, i), p.getChildContext())), h || null == p.getSnapshotBeforeUpdate || (x = p.getSnapshotBeforeUpdate(d, m)), g(l, u, t, i, o, r, f, e, c), p.base = u.__e, p.__h.length && f.push(p), w && (p.__E = p.__ = null), p.__e = null;
    } else u.__e = $(t.__e, u, t, i, o, r, f, c);(a = n.diffed) && a(u);
  } catch (l) {
    n.__e(l, u, t);
  }return u.__e;
}function T(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}function $(n, l, u, t, i, o, r, c) {
  var s,
      a,
      p,
      h,
      v,
      y = u.props,
      d = l.props;if (i = "svg" === l.type || i, null == n && null != o) for (s = 0; s < o.length; s++) {
    if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
      n = a, o[s] = null;break;
    }
  }if (null == n) {
    if (null === l.type) return document.createTextNode(d);n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), o = null;
  }if (null === l.type) null != o && (o[o.indexOf(n)] = null), y !== d && n.data != d && (n.data = d);else if (l !== u) {
    if (null != o && (o = e.slice.call(n.childNodes)), p = (y = u.props || f).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (y === f) for (y = {}, v = 0; v < n.attributes.length; v++) {
        y[n.attributes[v].name] = n.attributes[v].value;
      }(h || p) && (h && p && h.__html == p.__html || (n.innerHTML = h && h.__html || ""));
    }_(n, d, y, i, c), l.__k = l.props.children, h || g(n, l, u, t, "foreignObject" !== l.type && i, o, r, f, c), c || ("value" in d && void 0 !== d.value && d.value !== n.value && (n.value = null == d.value ? "" : d.value), "checked" in d && void 0 !== d.checked && d.checked !== n.checked && (n.checked = d.checked));
  }return n;
}function j(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}function z(l, u, t) {
  var i, o, r;if (n.unmount && n.unmount(l), (i = l.ref) && (i.current && i.current !== l.__e || j(i, null, u)), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = null, null != (i = l.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }i.base = i.__P = null;
  }if (i = l.__k) for (r = 0; r < i.length; r++) {
    i[r] && z(i[r], u, t);
  }null != o && a(o);
}function A(n, l, u) {
  return this.constructor(n, u);
}function D(l, u, t) {
  var i, r, c;n.__ && n.__(l, u), r = (i = t === o) ? null : t && t.__k || u.__k, l = p(v, null, [l]), c = [], N(u, (i ? u : t || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : r ? null : e.slice.call(u.childNodes), c, t || f, i), T(c, l);
}n = { __e: function __e(n, l) {
    for (var u, t; l = l.__;) {
      if ((u = l.__c) && !u.__) try {
        if (u.constructor && null != u.constructor.getDerivedStateFromError && (t = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (t = !0, u.componentDidCatch(n)), t) return x(u.__E = u);
      } catch (l) {
        n = l;
      }
    }throw n;
  } }, l = function l(n) {
  return null != n && void 0 === n.constructor;
}, y.prototype.setState = function (n, l) {
  var u;u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (this.__e = !1, l && this.__h.push(l), x(this));
}, y.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), x(this));
}, y.prototype.render = v, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = f, r = 0, exports.render = D, exports.hydrate = function (n, l) {
  D(n, l, o);
}, exports.createElement = p, exports.h = p, exports.Fragment = v, exports.createRef = function () {
  return {};
}, exports.isValidElement = l, exports.Component = y, exports.cloneElement = function (n, l) {
  return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), h(n.type, l, l.key || n.key, l.ref || n.ref);
}, exports.createContext = function (n) {
  var l = {},
      u = { __c: "__cC" + r++, __: n, Consumer: function Consumer(n, l) {
      return n.children(l);
    }, Provider: function Provider(n) {
      var t,
          i = this;return this.getChildContext || (t = [], this.getChildContext = function () {
        return l[u.__c] = i, l;
      }, this.shouldComponentUpdate = function (l) {
        n.value !== l.value && t.some(function (n) {
          n.context = l.value, x(n);
        });
      }, this.sub = function (n) {
        t.push(n);var l = n.componentWillUnmount;n.componentWillUnmount = function () {
          t.splice(t.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    } };return u.Consumer.contextType = u, u;
}, exports.toChildArray = k, exports._e = z, exports.options = n;
//# sourceMappingURL=preact.js.map

/***/ }),

/***/ "LTaw":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("Bcfi");
var fs = __webpack_require__("vHs2");

var _readFile = util.promisify(fs.readFile);
var _writeFile = util.promisify(fs.writeFile);
var _deleteFile = util.promisify(fs.unlink);

module.exports = function (path) {
  return _readFile('./data/' + path);
};

module.exports = {
  readFile: function readFile(path) {
    return _readFile('./data/' + path);
  },
  writeFile: function writeFile(path, data) {
    return _writeFile('./data/' + path, data);
  },
  deleteFile: function deleteFile(path) {
    return _deleteFile('./data/' + path);
  }
};

/***/ }),

/***/ "MKEY":
/***/ (function(module, exports) {

var _this = this;

var logging = false;

exports.logging = logging;

exports.setLogging = function (_logging) {
  logging = _logging;
};

exports.log = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return logging ? console.log.apply(_this, args) : null;
};

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

/***/ "PZMJ":
/***/ (function(module, exports) {

var duration = 0;

var ts2sec = function ts2sec(ts) {
  var _ts$split = ts.split(':'),
      h = _ts$split[0],
      m = _ts$split[1],
      s = _ts$split[2];

  return parseFloat(h) * 60 * 60 + parseFloat(m) * 60 + parseFloat(s);
};

module.exports = function (_ref, progress) {
  var message = _ref.message;

  if (typeof message === 'string') {
    if (message.startsWith('  Duration')) {
      var ts = message.split(', ')[0].split(': ')[1];
      var d = ts2sec(ts);
      if (duration === 0 || duration > d) {
        duration = d;
      }
    } else if (message.startsWith('frame')) {
      var _ts = message.split('time=')[1].split(' ')[0];
      var t = ts2sec(_ts);
      progress({ ratio: t / duration });
    } else if (message.startsWith('video:')) {
      progress({ ratio: 1 });
    }
  }
};

/***/ }),

/***/ "UVan":
/***/ (function(module, exports, __webpack_require__) {

var getId = __webpack_require__("ujuL");

var jobCounter = 0;

module.exports = function (_ref) {
  var _id = _ref.id,
      action = _ref.action,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload;

  var id = _id;
  if (typeof id === 'undefined') {
    id = getId('Job', jobCounter);
    jobCounter += 1;
  }

  return {
    id: id,
    action: action,
    payload: payload
  };
};

/***/ }),

/***/ "Vy1O":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "XgVs":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "YX++":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var path = __webpack_require__("1v4d");
var defaultOptions = __webpack_require__("hCda");

/*
 * Default options for node worker
 */
module.exports = _extends({}, defaultOptions, {
  workerPath: path.join(__dirname, '..', '..', 'worker-script', 'node', 'index.js')
});

/***/ }),

/***/ "a90S":
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "bUFf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "epkN":
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ "gHkb":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "hCda":
/***/ (function(module, exports) {

module.exports = {
  logger: function logger() {},
  progress: function progress() {}
};

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
    _parser: function _parser() {
        var version = this.version;
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
    source: 'ISO/IEC 14496-12 2015 8.5.2.2 Sample Entry, modified as described in 8.12',
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
        this._procSubBoxes('config', 1);
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
    source: 'ISO/IEC 14496-12 2015 8.5.2.2 Sample Entry, modified as described in 8.12',
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
        this._procSubBoxes('config', 1);
    }
}, {
    source: 'AV1 Sample Entry, AV1 Codec ISO Media File Format Binding https://aomediacodec.github.io/av1-isobmff/',
    field: 'av01',
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
        this._procSubBoxes('av1C', 1);
        this._procSubBoxes('colr', 1);
    }
}, {
    source: 'AV1 Sample Entry, AV1 Codec ISO Media File Format Binding https://aomediacodec.github.io/av1-isobmff/',
    field: 'av1C',
    _parser: function _parser() {
        // modified to handle <8 bit data
        this._procField('av1C_config', 'uint', 32);
        this.marker = (this.av1C_config & 0x80000000) >>> 31; //1
        this.version = (this.av1C_config & 0x7F000000) >>> 24; //7
        this.seq_profile = (this.av1C_config & 0x00E00000) >>> 21; //3
        this.seq_level_idx_0 = (this.av1C_config & 0x001F0000) >>> 16; //5
        this.seq_tier_0 = (this.av1C_config & 0x00008000) >>> 15; //1
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
        this._procSubBoxes('esds', 1);
    }
}, {
    source: 'ISO/IEC 14496-12:2015 - 8.5.2.2 mp4a box (use AudioSampleEntry definition and naming)',
    field: 'mp4a',
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
        this._procSubBoxes('esds', 1);
    }
}, {
    source: 'ISO/IEC 14496-1',
    field: 'esds',
    _parser: function _parser() {
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
        this._procField('reserved1', 'bit', 6); //TODO Fix using Bitwise workaround with _config parameter
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
        this._procField('h_spacing', 'uint', 32);
        this._procField('v_spacing', 'uint', 32);
    }
}, {
    source: 'Quicktime',
    field: 'colr',
    _parser: function _parser() {
        this._procField('color_param_type', 'string', 4);
        this._procField('primaries_index', 'uint', 16);
        this._procField('transfer_func_index', 'uint', 16);
        this._procField('matrix_index', 'uint', 16);
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
        } else if (uuidString === 'A2394F525A9B4F14A2446C427C648DF4') {
            console.log('Netflix senc box found!');
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
                // add an entry number to each subsample entry, using the index in the subsample array + 1
                cleanEntry.subsamples = cleanEntry.subsamples.map(function (subsample, subEntryNo) {
                    return _extends({}, subsample, { entryNumber: subEntryNo + 1 });
                });
                cleanEntry.entryNumber = index + 1;
                return cleanEntry;
            });
        },
        'ESDescriptor': function ESDescriptor(value) {
            // bit(6) Stream type
            // bit(1) Upstream Flag
            // bit(1) reserved = 1
            var flags = [{ name: 'Stream_type', bitmask: 252, shift: 2, 0: 'Forbidden', 1: 'ObjectDescriptorStream', 2: 'ClockReferenceStream', 3: 'SceneDescriptionStream', 4: 'VisualStream', 5: 'AudioStream', 6: 'MPEG7 Stream', 7: '', 8: '', 9: '', 10: '', 11: '' }, { name: 'upstream_flag', bitmask: 2, shift: 1 }, { name: 'reserved_s', bitmask: 1, shift: 0 }];
            return [].concat(flags.reduce(function (result, flag) {
                result[flag.name] = flag[(value & flag.bitmask) >> flag.shift] || (value & flag.bitmask) >> flag.shift;
                return result;
            }, { entryNumber: 1 }));
        },
        'DecoderType': function DecoderType(value) {
            var typeLookup = {
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
            };
            return typeLookup[value] || 'reserved for ISO use';
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
            case 'data_format':case 'scheme_type':case 'aux_info_type':
                return value.map(function (b) {
                    return String.fromCharCode(b);
                }).join('');
            case 'Stream_flag':
                return handleArray.ESDescriptor(value);
            case 'Dec_type':
                return handleArray.DecoderType(value);
            case 'configOBUs':
                return '' + convertToHex(value);
            default:
                // Otherwise handle based on type of the first entry
                return value[0] ? handleArray[elementType](value) : [];
        }
    }

    // handle special cases that aren't arrays
    switch (key) {
        case 'default_sample_flags':case 'first_sample_flags':
            return handleArray.LongSampleDependency(value);
        case 'Stream_flag':
            return handleArray.ESDescriptor(value);
        case 'Dec_type':
            return handleArray.DecoderType(value);
        case 'flags':
            return '0x' + value.toString(16).padStart(2, '0').toUpperCase();
        default:
            return value;
    }
};

// TODO: fix subsample handling !!
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
                if (key === 'av1C_config') return { name: key, display: null, hex: null };
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

var getBoxList = function getBoxList(collection, resultMap) {
    return new Promise(function ($return, $error) {
        var counter, addElements;


        counter = 0;

        addElements = function addElements(elemList, parentPath) {
            return new Promise(function (resolve, reject) {
                // first add all of the elements at this node
                elemList.forEach(function (elem) {
                    // only add items with a 'type' (ie, box definition) -- extend for special cases like encv entries
                    if (!!elem.type || elem.name === 'entries') {
                        // get all children
                        var boxContents = !!elem.boxes && elem.boxes.reduce(function (allChildren, current) {
                            if (!!current.type) allChildren.children.push({ box: current.type, start: current.start });
                            if (!!current.name && elem.type === 'stsd' && current.name === 'entries') allChildren.children.push({ box: current.boxes[0].type, start: current.boxes[0].start });
                            if (!!current.name) allChildren.values.push(current);
                            return allChildren;
                        }, { children: [], values: [] });
                        resultMap.set({ box: elem.type, start: elem.start }, { name: elem.type, parent: parentPath, children: boxContents.children, values: boxContents.values, hex: elem.hex });
                        console.log('extracted element', elem);
                        // now check for sub-boxes that are not null
                        if (!!elem.boxes) {
                            //quick check to see if the boxes have types
                            var validBoxes = elem.boxes.reduce(function (newList, box) {
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
        };

        // start the chain using the full collection
        counter++;
        return Promise.resolve(addElements(collection, [])).then($return, $error);
    });
};

module.exports = {
    getISOData: getISOData,
    psshLookup: psshLookup,
    additionalBoxes: additionalBoxes,
    postProcess: postProcess,
    convertBox: convertBox,
    getBoxList: getBoxList
};

/***/ }),

/***/ "o3ii":
/***/ (function(module, exports) {

/**
 * terminateWorker
 *
 * @name terminateWorker
 * @function kill worker
 * @access public
 */
module.exports = function (worker) {
  worker.kill();
};

/***/ }),

/***/ "p66q":
/***/ (function(module, exports, __webpack_require__) {

var defaultOptions = __webpack_require__("YX++");
var spawnWorker = __webpack_require__("Fnt3");
var terminateWorker = __webpack_require__("o3ii");
var onMessage = __webpack_require__("szi9");
var send = __webpack_require__("8XbC");
var fetchFile = __webpack_require__("4PTo");
var fs = __webpack_require__("LTaw");

module.exports = {
  defaultOptions: defaultOptions,
  spawnWorker: spawnWorker,
  terminateWorker: terminateWorker,
  onMessage: onMessage,
  send: send,
  fetchFile: fetchFile,
  fs: fs
};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "szi9":
/***/ (function(module, exports) {

module.exports = function (worker, handler) {
  worker.on('message', handler);
};

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

/***/ "ujuL":
/***/ (function(module, exports) {

module.exports = function (prefix, cnt) {
  return prefix + "-" + cnt + "-" + Math.random().toString(16).slice(3, 8);
};

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

/***/ }),

/***/ "v9pv":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;
}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "vHs2":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map