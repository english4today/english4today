(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~course_$courseName~course_$courseName$93_skill_$91id~login~sign$45up~sign$45up$45success"],{

/***/ "../../node_modules/argsarray/index.js":
/*!****************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/argsarray/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = argsArray;

function argsArray(fun) {
  return function () {
    var len = arguments.length;
    if (len) {
      var args = [];
      var i = -1;
      while (++i < len) {
        args[i] = arguments[i];
      }
      return fun.call(this, args);
    } else {
      return fun.call(this, []);
    }
  };
}

/***/ }),

/***/ "../../node_modules/immediate/lib/index.js":
/*!********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var types = [
  __webpack_require__(/*! ./nextTick */ 0),
  __webpack_require__(/*! ./queueMicrotask */ "../../node_modules/immediate/lib/queueMicrotask.js"),
  __webpack_require__(/*! ./mutation.js */ "../../node_modules/immediate/lib/mutation.js"),
  __webpack_require__(/*! ./messageChannel */ "../../node_modules/immediate/lib/messageChannel.js"),
  __webpack_require__(/*! ./stateChange */ "../../node_modules/immediate/lib/stateChange.js"),
  __webpack_require__(/*! ./timeout */ "../../node_modules/immediate/lib/timeout.js")
];
var draining;
var currentQueue;
var queueIndex = -1;
var queue = [];
var scheduled = false;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    nextTick();
  }
}

//named nextTick for less confusing stack traces
function nextTick() {
  if (draining) {
    return;
  }
  scheduled = false;
  draining = true;
  var len = queue.length;
  var timeout = setTimeout(cleanUpNextTick);
  while (len) {
    currentQueue = queue;
    queue = [];
    while (currentQueue && ++queueIndex < len) {
      currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  queueIndex = -1;
  draining = false;
  clearTimeout(timeout);
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  var fun = this.fun;
  var array = this.array;
  switch (array.length) {
  case 0:
    return fun();
  case 1:
    return fun(array[0]);
  case 2:
    return fun(array[0], array[1]);
  case 3:
    return fun(array[0], array[1], array[2]);
  default:
    return fun.apply(null, array);
  }

};
module.exports = immediate;
function immediate(task) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(task, args));
  if (!scheduled && !draining) {
    scheduled = true;
    scheduleDrain();
  }
}


/***/ }),

/***/ "../../node_modules/immediate/lib/messageChannel.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/messageChannel.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/immediate/lib/mutation.js":
/*!***********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/mutation.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/immediate/lib/queueMicrotask.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/queueMicrotask.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
exports.test = function () {
  return typeof global.queueMicrotask === 'function';
};

exports.install = function (func) {
  return function () {
    global.queueMicrotask(func);
  };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/immediate/lib/stateChange.js":
/*!**************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/stateChange.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/immediate/lib/timeout.js":
/*!**********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/immediate/lib/timeout.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};

/***/ }),

/***/ "../../node_modules/inherits/inherits_browser.js":
/*!**************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/inherits/inherits_browser.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "../../node_modules/map-age-cleaner/dist/index.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/map-age-cleaner/dist/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_defer_1 = __importDefault(__webpack_require__(/*! p-defer */ "../../node_modules/p-defer/index.js"));
function mapAgeCleaner(map, property = 'maxAge') {
    let processingKey;
    let processingTimer;
    let processingDeferred;
    const cleanup = () => __awaiter(this, void 0, void 0, function* () {
        if (processingKey !== undefined) {
            // If we are already processing an item, we can safely exit
            return;
        }
        const setupTimer = (item) => __awaiter(this, void 0, void 0, function* () {
            processingDeferred = p_defer_1.default();
            const delay = item[1][property] - Date.now();
            if (delay <= 0) {
                // Remove the item immediately if the delay is equal to or below 0
                map.delete(item[0]);
                processingDeferred.resolve();
                return;
            }
            // Keep track of the current processed key
            processingKey = item[0];
            processingTimer = setTimeout(() => {
                // Remove the item when the timeout fires
                map.delete(item[0]);
                if (processingDeferred) {
                    processingDeferred.resolve();
                }
            }, delay);
            // tslint:disable-next-line:strict-type-predicates
            if (typeof processingTimer.unref === 'function') {
                // Don't hold up the process from exiting
                processingTimer.unref();
            }
            return processingDeferred.promise;
        });
        try {
            for (const entry of map) {
                yield setupTimer(entry);
            }
        }
        catch (_a) {
            // Do nothing if an error occurs, this means the timer was cleaned up and we should stop processing
        }
        processingKey = undefined;
    });
    const reset = () => {
        processingKey = undefined;
        if (processingTimer !== undefined) {
            clearTimeout(processingTimer);
            processingTimer = undefined;
        }
        if (processingDeferred !== undefined) { // tslint:disable-line:early-exit
            processingDeferred.reject(undefined);
            processingDeferred = undefined;
        }
    };
    const originalSet = map.set.bind(map);
    map.set = (key, value) => {
        if (map.has(key)) {
            // If the key already exist, remove it so we can add it back at the end of the map.
            map.delete(key);
        }
        // Call the original `map.set`
        const result = originalSet(key, value);
        // If we are already processing a key and the key added is the current processed key, stop processing it
        if (processingKey && processingKey === key) {
            reset();
        }
        // Always run the cleanup method in case it wasn't started yet
        cleanup(); // tslint:disable-line:no-floating-promises
        return result;
    };
    cleanup(); // tslint:disable-line:no-floating-promises
    return map;
}
exports.default = mapAgeCleaner;
// Add support for CJS
module.exports = mapAgeCleaner;
module.exports.default = mapAgeCleaner;


/***/ }),

/***/ "../../node_modules/mem/index.js":
/*!**********************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mem/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const mimicFn = __webpack_require__(/*! mimic-fn */ "../../node_modules/mimic-fn/index.js");
const mapAgeCleaner = __webpack_require__(/*! map-age-cleaner */ "../../node_modules/map-age-cleaner/dist/index.js");

const cacheStore = new WeakMap();

const mem = (fn, options = {}) => {
	// Automatically use WeakMap unless the user provided their own cache
	const weakCache = options.cache || new WeakMap();
	const {
		cacheKey = ([firstArgument]) => firstArgument,
		cache = new Map(),
		maxAge
	} = options;

	if (typeof maxAge === 'number') {
		mapAgeCleaner(cache);
	}

	const memoized = function (...arguments_) {
		const key = cacheKey(arguments_);

		// Prefer WeakMap if the key allows it
		const bestCache = key && (typeof key === 'object' || typeof key === 'function') ?
			weakCache :
			cache;

		if (bestCache.has(key)) {
			return bestCache.get(key).data;
		}

		const cacheItem = fn.apply(this, arguments_);

		bestCache.set(key, {
			data: cacheItem,
			maxAge: maxAge ? Date.now() + maxAge : Infinity
		});

		return cacheItem;
	};

	try {
		// The below call will throw in some host environments
		// See https://github.com/sindresorhus/mimic-fn/issues/10
		mimicFn(memoized, fn);
	} catch (_) {}

	cacheStore.set(memoized, cache);

	return memoized;
};

module.exports = mem;

module.exports.clear = fn => {
	if (!cacheStore.has(fn)) {
		throw new Error('Can\'t clear a function that was not memoized!');
	}

	const cache = cacheStore.get(fn);
	if (typeof cache.clear === 'function') {
		cache.clear();
	}
};


/***/ }),

/***/ "../../node_modules/mimic-fn/index.js":
/*!***************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mimic-fn/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	// `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	// `Function#prototype` is non-writable and non-configurable so can never be modified.
	if (property === 'length' || property === 'prototype') {
		return;
	}

	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
		return;
	}

	Object.defineProperty(to, property, fromDescriptor);
};

// `Object.defineProperty()` throws if the property exists, is not configurable and either:
//  - one its descriptors is changed
//  - it is non-writable and its value is changed
const canCopyProperty = function (toDescriptor, fromDescriptor) {
	return toDescriptor === undefined || toDescriptor.configurable || (
		toDescriptor.writable === fromDescriptor.writable &&
		toDescriptor.enumerable === fromDescriptor.enumerable &&
		toDescriptor.configurable === fromDescriptor.configurable &&
		(toDescriptor.writable || toDescriptor.value === fromDescriptor.value)
	);
};

const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) {
		return;
	}

	Object.setPrototypeOf(to, fromPrototype);
};

const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;

const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name');

// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
// We use `bind()` instead of a closure for the same reason.
// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
const changeToString = (to, from, name) => {
	const withName = name === '' ? '' : `with ${name.trim()}() `;
	const newToString = wrappedToString.bind(null, withName, from.toString());
	// Ensure `to.toString.toString` is non-enumerable and has the same `same`
	Object.defineProperty(newToString, 'name', toStringName);
	Object.defineProperty(to, 'toString', {...toStringDescriptor, value: newToString});
};

const mimicFn = (to, from, {ignoreNonConfigurable = false} = {}) => {
	const {name} = to;

	for (const property of Reflect.ownKeys(from)) {
		copyProperty(to, from, property, ignoreNonConfigurable);
	}

	changePrototype(to, from);
	changeToString(to, from, name);

	return to;
};

module.exports = mimicFn;


/***/ }),

/***/ "../../node_modules/node-libs-browser/node_modules/events/events.js":
/*!*********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/node-libs-browser/node_modules/events/events.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "../../node_modules/p-defer/index.js":
/*!**************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/p-defer/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = () => {
	const ret = {};

	ret.promise = new Promise((resolve, reject) => {
		ret.resolve = resolve;
		ret.reject = reject;
	});

	return ret;
};


/***/ }),

/***/ "../../node_modules/p-memoize/index.js":
/*!****************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/p-memoize/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const mem = __webpack_require__(/*! mem */ "../../node_modules/mem/index.js");
const mimicFn = __webpack_require__(/*! mimic-fn */ "../../node_modules/mimic-fn/index.js");

const memoizedFunctions = new WeakMap();

const pMemoize = (fn, {cachePromiseRejection = false, ...options} = {}) => {
	const cache = options.cache || new Map();
	const cacheKey = options.cacheKey || (([firstArgument]) => firstArgument);

	const memoized = mem(fn, {
		...options,
		cache,
		cacheKey
	});

	const memoizedAdapter = function (...arguments_) {
		const cacheItem = memoized.apply(this, arguments_);

		if (!cachePromiseRejection && cacheItem && cacheItem.catch) {
			cacheItem.catch(() => {
				cache.delete(cacheKey(arguments_));
			});
		}

		return cacheItem;
	};

	mimicFn(memoizedAdapter, fn);
	memoizedFunctions.set(memoizedAdapter, memoized);

	return memoizedAdapter;
};

module.exports = pMemoize;

module.exports.clear = memoized => {
	if (!memoizedFunctions.has(memoized)) {
		throw new Error('Can\'t clear a function that was not memoized!');
	}

	mem.clear(memoizedFunctions.get(memoized));
};


/***/ }),

/***/ "../../node_modules/pouchdb/lib/index-browser.es.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/lib/index-browser.es.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var immediate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immediate */ "../../node_modules/immediate/lib/index.js");
/* harmony import */ var immediate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immediate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var spark_md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! spark-md5 */ "../../node_modules/spark-md5/spark-md5.js");
/* harmony import */ var spark_md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(spark_md5__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuvuzela__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuvuzela */ "../../node_modules/vuvuzela/index.js");
/* harmony import */ var vuvuzela__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vuvuzela__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var argsarray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! argsarray */ "../../node_modules/argsarray/index.js");
/* harmony import */ var argsarray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(argsarray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inherits */ "../../node_modules/inherits/inherits_browser.js");
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! events */ "../../node_modules/node-libs-browser/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_6__);








function mangle(key) {
  return '$' + key;
}
function unmangle(key) {
  return key.substring(1);
}
function Map$1() {
  this._store = {};
}
Map$1.prototype.get = function (key) {
  var mangled = mangle(key);
  return this._store[mangled];
};
Map$1.prototype.set = function (key, value) {
  var mangled = mangle(key);
  this._store[mangled] = value;
  return true;
};
Map$1.prototype.has = function (key) {
  var mangled = mangle(key);
  return mangled in this._store;
};
Map$1.prototype.delete = function (key) {
  var mangled = mangle(key);
  var res = mangled in this._store;
  delete this._store[mangled];
  return res;
};
Map$1.prototype.forEach = function (cb) {
  var keys = Object.keys(this._store);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var value = this._store[key];
    key = unmangle(key);
    cb(value, key);
  }
};
Object.defineProperty(Map$1.prototype, 'size', {
  get: function () {
    return Object.keys(this._store).length;
  }
});

function Set$1(array) {
  this._store = new Map$1();

  // init with an array
  if (array && Array.isArray(array)) {
    for (var i = 0, len = array.length; i < len; i++) {
      this.add(array[i]);
    }
  }
}
Set$1.prototype.add = function (key) {
  return this._store.set(key, true);
};
Set$1.prototype.has = function (key) {
  return this._store.has(key);
};
Set$1.prototype.forEach = function (cb) {
  this._store.forEach(function (value, key) {
    cb(key);
  });
};
Object.defineProperty(Set$1.prototype, 'size', {
  get: function () {
    return this._store.size;
  }
});

/* global Map,Set,Symbol */
// Based on https://kangax.github.io/compat-table/es6/ we can sniff out
// incomplete Map/Set implementations which would otherwise cause our tests to fail.
// Notably they fail in IE11 and iOS 8.4, which this prevents.
function supportsMapAndSet() {
  if (typeof Symbol === 'undefined' || typeof Map === 'undefined' || typeof Set === 'undefined') {
    return false;
  }
  var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return prop && 'get' in prop && Map[Symbol.species] === Map;
}

// based on https://github.com/montagejs/collections

var ExportedSet;
var ExportedMap;

{
  if (supportsMapAndSet()) { // prefer built-in Map/Set
    ExportedSet = Set;
    ExportedMap = Map;
  } else { // fall back to our polyfill
    ExportedSet = Set$1;
    ExportedMap = Map$1;
  }
}

function isBinaryObject(object) {
  return (typeof ArrayBuffer !== 'undefined' && object instanceof ArrayBuffer) ||
    (typeof Blob !== 'undefined' && object instanceof Blob);
}

function cloneArrayBuffer(buff) {
  if (typeof buff.slice === 'function') {
    return buff.slice(0);
  }
  // IE10-11 slice() polyfill
  var target = new ArrayBuffer(buff.byteLength);
  var targetArray = new Uint8Array(target);
  var sourceArray = new Uint8Array(buff);
  targetArray.set(sourceArray);
  return target;
}

function cloneBinaryObject(object) {
  if (object instanceof ArrayBuffer) {
    return cloneArrayBuffer(object);
  }
  var size = object.size;
  var type = object.type;
  // Blob
  if (typeof object.slice === 'function') {
    return object.slice(0, size, type);
  }
  // PhantomJS slice() replacement
  return object.webkitSlice(0, size, type);
}

// most of this is borrowed from lodash.isPlainObject:
// https://github.com/fis-components/lodash.isplainobject/
// blob/29c358140a74f252aeb08c9eb28bef86f2217d4a/index.js

var funcToString = Function.prototype.toString;
var objectCtorString = funcToString.call(Object);

function isPlainObject(value) {
  var proto = Object.getPrototypeOf(value);
  /* istanbul ignore if */
  if (proto === null) { // not sure when this happens, but I guess it can
    return true;
  }
  var Ctor = proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

function clone(object) {
  var newObject;
  var i;
  var len;

  if (!object || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    newObject = [];
    for (i = 0, len = object.length; i < len; i++) {
      newObject[i] = clone(object[i]);
    }
    return newObject;
  }

  // special case: to avoid inconsistencies between IndexedDB
  // and other backends, we automatically stringify Dates
  if (object instanceof Date) {
    return object.toISOString();
  }

  if (isBinaryObject(object)) {
    return cloneBinaryObject(object);
  }

  if (!isPlainObject(object)) {
    return object; // don't clone objects like Workers
  }

  newObject = {};
  for (i in object) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(object, i)) {
      var value = clone(object[i]);
      if (typeof value !== 'undefined') {
        newObject[i] = value;
      }
    }
  }
  return newObject;
}

function once(fun) {
  var called = false;
  return argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
    /* istanbul ignore if */
    if (called) {
      // this is a smoke test and should never actually happen
      throw new Error('once called more than once');
    } else {
      called = true;
      fun.apply(this, args);
    }
  });
}

function toPromise(func) {
  //create the function we will be returning
  return argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
    // Clone arguments
    args = clone(args);
    var self = this;
    // if the last argument is a function, assume its a callback
    var usedCB = (typeof args[args.length - 1] === 'function') ? args.pop() : false;
    var promise = new Promise(function (fulfill, reject) {
      var resp;
      try {
        var callback = once(function (err, mesg) {
          if (err) {
            reject(err);
          } else {
            fulfill(mesg);
          }
        });
        // create a callback for this invocation
        // apply the function in the orig context
        args.push(callback);
        resp = func.apply(self, args);
        if (resp && typeof resp.then === 'function') {
          fulfill(resp);
        }
      } catch (e) {
        reject(e);
      }
    });
    // if there is a callback, call it back
    if (usedCB) {
      promise.then(function (result) {
        usedCB(null, result);
      }, usedCB);
    }
    return promise;
  });
}

function logApiCall(self, name, args) {
  /* istanbul ignore if */
  if (self.constructor.listeners('debug').length) {
    var logArgs = ['api', self.name, name];
    for (var i = 0; i < args.length - 1; i++) {
      logArgs.push(args[i]);
    }
    self.constructor.emit('debug', logArgs);

    // override the callback itself to log the response
    var origCallback = args[args.length - 1];
    args[args.length - 1] = function (err, res) {
      var responseArgs = ['api', self.name, name];
      responseArgs = responseArgs.concat(
        err ? ['error', err] : ['success', res]
      );
      self.constructor.emit('debug', responseArgs);
      origCallback(err, res);
    };
  }
}

function adapterFun(name, callback) {
  return toPromise(argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
    if (this._closed) {
      return Promise.reject(new Error('database is closed'));
    }
    if (this._destroyed) {
      return Promise.reject(new Error('database is destroyed'));
    }
    var self = this;
    logApiCall(self, name, args);
    if (!this.taskqueue.isReady) {
      return new Promise(function (fulfill, reject) {
        self.taskqueue.addTask(function (failed) {
          if (failed) {
            reject(failed);
          } else {
            fulfill(self[name].apply(self, args));
          }
        });
      });
    }
    return callback.apply(this, args);
  }));
}

// like underscore/lodash _.pick()
function pick(obj, arr) {
  var res = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var prop = arr[i];
    if (prop in obj) {
      res[prop] = obj[prop];
    }
  }
  return res;
}

// Most browsers throttle concurrent requests at 6, so it's silly
// to shim _bulk_get by trying to launch potentially hundreds of requests
// and then letting the majority time out. We can handle this ourselves.
var MAX_NUM_CONCURRENT_REQUESTS = 6;

function identityFunction(x) {
  return x;
}

function formatResultForOpenRevsGet(result) {
  return [{
    ok: result
  }];
}

// shim for P/CouchDB adapters that don't directly implement _bulk_get
function bulkGet(db, opts, callback) {
  var requests = opts.docs;

  // consolidate into one request per doc if possible
  var requestsById = new ExportedMap();
  requests.forEach(function (request) {
    if (requestsById.has(request.id)) {
      requestsById.get(request.id).push(request);
    } else {
      requestsById.set(request.id, [request]);
    }
  });

  var numDocs = requestsById.size;
  var numDone = 0;
  var perDocResults = new Array(numDocs);

  function collapseResultsAndFinish() {
    var results = [];
    perDocResults.forEach(function (res) {
      res.docs.forEach(function (info) {
        results.push({
          id: res.id,
          docs: [info]
        });
      });
    });
    callback(null, {results: results});
  }

  function checkDone() {
    if (++numDone === numDocs) {
      collapseResultsAndFinish();
    }
  }

  function gotResult(docIndex, id, docs) {
    perDocResults[docIndex] = {id: id, docs: docs};
    checkDone();
  }

  var allRequests = [];
  requestsById.forEach(function (value, key) {
    allRequests.push(key);
  });

  var i = 0;

  function nextBatch() {

    if (i >= allRequests.length) {
      return;
    }

    var upTo = Math.min(i + MAX_NUM_CONCURRENT_REQUESTS, allRequests.length);
    var batch = allRequests.slice(i, upTo);
    processBatch(batch, i);
    i += batch.length;
  }

  function processBatch(batch, offset) {
    batch.forEach(function (docId, j) {
      var docIdx = offset + j;
      var docRequests = requestsById.get(docId);

      // just use the first request as the "template"
      // TODO: The _bulk_get API allows for more subtle use cases than this,
      // but for now it is unlikely that there will be a mix of different
      // "atts_since" or "attachments" in the same request, since it's just
      // replicate.js that is using this for the moment.
      // Also, atts_since is aspirational, since we don't support it yet.
      var docOpts = pick(docRequests[0], ['atts_since', 'attachments']);
      docOpts.open_revs = docRequests.map(function (request) {
        // rev is optional, open_revs disallowed
        return request.rev;
      });

      // remove falsey / undefined revisions
      docOpts.open_revs = docOpts.open_revs.filter(identityFunction);

      var formatResult = identityFunction;

      if (docOpts.open_revs.length === 0) {
        delete docOpts.open_revs;

        // when fetching only the "winning" leaf,
        // transform the result so it looks like an open_revs
        // request
        formatResult = formatResultForOpenRevsGet;
      }

      // globally-supplied options
      ['revs', 'attachments', 'binary', 'ajax', 'latest'].forEach(function (param) {
        if (param in opts) {
          docOpts[param] = opts[param];
        }
      });
      db.get(docId, docOpts, function (err, res) {
        var result;
        /* istanbul ignore if */
        if (err) {
          result = [{error: err}];
        } else {
          result = formatResult(res);
        }
        gotResult(docIdx, docId, result);
        nextBatch();
      });
    });
  }

  nextBatch();

}

var hasLocal;

try {
  localStorage.setItem('_pouch_check_localstorage', 1);
  hasLocal = !!localStorage.getItem('_pouch_check_localstorage');
} catch (e) {
  hasLocal = false;
}

function hasLocalStorage() {
  return hasLocal;
}

// Custom nextTick() shim for browsers. In node, this will just be process.nextTick(). We

inherits__WEBPACK_IMPORTED_MODULE_5___default()(Changes, events__WEBPACK_IMPORTED_MODULE_6___default.a);

/* istanbul ignore next */
function attachBrowserEvents(self) {
  if (hasLocalStorage()) {
    addEventListener("storage", function (e) {
      self.emit(e.key);
    });
  }
}

function Changes() {
  events__WEBPACK_IMPORTED_MODULE_6___default.a.call(this);
  this._listeners = {};

  attachBrowserEvents(this);
}
Changes.prototype.addListener = function (dbName, id, db, opts) {
  /* istanbul ignore if */
  if (this._listeners[id]) {
    return;
  }
  var self = this;
  var inprogress = false;
  function eventFunction() {
    /* istanbul ignore if */
    if (!self._listeners[id]) {
      return;
    }
    if (inprogress) {
      inprogress = 'waiting';
      return;
    }
    inprogress = true;
    var changesOpts = pick(opts, [
      'style', 'include_docs', 'attachments', 'conflicts', 'filter',
      'doc_ids', 'view', 'since', 'query_params', 'binary', 'return_docs'
    ]);

    /* istanbul ignore next */
    function onError() {
      inprogress = false;
    }

    db.changes(changesOpts).on('change', function (c) {
      if (c.seq > opts.since && !opts.cancelled) {
        opts.since = c.seq;
        opts.onChange(c);
      }
    }).on('complete', function () {
      if (inprogress === 'waiting') {
        immediate__WEBPACK_IMPORTED_MODULE_0___default()(eventFunction);
      }
      inprogress = false;
    }).on('error', onError);
  }
  this._listeners[id] = eventFunction;
  this.on(dbName, eventFunction);
};

Changes.prototype.removeListener = function (dbName, id) {
  /* istanbul ignore if */
  if (!(id in this._listeners)) {
    return;
  }
  events__WEBPACK_IMPORTED_MODULE_6___default.a.prototype.removeListener.call(this, dbName,
    this._listeners[id]);
  delete this._listeners[id];
};


/* istanbul ignore next */
Changes.prototype.notifyLocalWindows = function (dbName) {
  //do a useless change on a storage thing
  //in order to get other windows's listeners to activate
  if (hasLocalStorage()) {
    localStorage[dbName] = (localStorage[dbName] === "a") ? "b" : "a";
  }
};

Changes.prototype.notify = function (dbName) {
  this.emit(dbName);
  this.notifyLocalWindows(dbName);
};

function guardedConsole(method) {
  /* istanbul ignore else */
  if (typeof console !== 'undefined' && typeof console[method] === 'function') {
    var args = Array.prototype.slice.call(arguments, 1);
    console[method].apply(console, args);
  }
}

function randomNumber(min, max) {
  var maxTimeout = 600000; // Hard-coded default of 10 minutes
  min = parseInt(min, 10) || 0;
  max = parseInt(max, 10);
  if (max !== max || max <= min) {
    max = (min || 1) << 1; //doubling
  } else {
    max = max + 1;
  }
  // In order to not exceed maxTimeout, pick a random value between half of maxTimeout and maxTimeout
  if (max > maxTimeout) {
    min = maxTimeout >> 1; // divide by two
    max = maxTimeout;
  }
  var ratio = Math.random();
  var range = max - min;

  return ~~(range * ratio + min); // ~~ coerces to an int, but fast.
}

function defaultBackOff(min) {
  var max = 0;
  if (!min) {
    max = 2000;
  }
  return randomNumber(min, max);
}

// designed to give info to browser users, who are disturbed
// when they see http errors in the console
function explainError(status, str) {
  guardedConsole('info', 'The above ' + status + ' is totally normal. ' + str);
}

var assign;
{
  if (typeof Object.assign === 'function') {
    assign = Object.assign;
  } else {
    // lite Object.assign polyfill based on
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    assign = function (target) {
      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }
}

var $inject_Object_assign = assign;

inherits__WEBPACK_IMPORTED_MODULE_5___default()(PouchError, Error);

function PouchError(status, error, reason) {
  Error.call(this, reason);
  this.status = status;
  this.name = error;
  this.message = reason;
  this.error = true;
}

PouchError.prototype.toString = function () {
  return JSON.stringify({
    status: this.status,
    name: this.name,
    message: this.message,
    reason: this.reason
  });
};

var UNAUTHORIZED = new PouchError(401, 'unauthorized', "Name or password is incorrect.");
var MISSING_BULK_DOCS = new PouchError(400, 'bad_request', "Missing JSON list of 'docs'");
var MISSING_DOC = new PouchError(404, 'not_found', 'missing');
var REV_CONFLICT = new PouchError(409, 'conflict', 'Document update conflict');
var INVALID_ID = new PouchError(400, 'bad_request', '_id field must contain a string');
var MISSING_ID = new PouchError(412, 'missing_id', '_id is required for puts');
var RESERVED_ID = new PouchError(400, 'bad_request', 'Only reserved document ids may start with underscore.');
var NOT_OPEN = new PouchError(412, 'precondition_failed', 'Database not open');
var UNKNOWN_ERROR = new PouchError(500, 'unknown_error', 'Database encountered an unknown error');
var BAD_ARG = new PouchError(500, 'badarg', 'Some query argument is invalid');
var INVALID_REQUEST = new PouchError(400, 'invalid_request', 'Request was invalid');
var QUERY_PARSE_ERROR = new PouchError(400, 'query_parse_error', 'Some query parameter is invalid');
var DOC_VALIDATION = new PouchError(500, 'doc_validation', 'Bad special document member');
var BAD_REQUEST = new PouchError(400, 'bad_request', 'Something wrong with the request');
var NOT_AN_OBJECT = new PouchError(400, 'bad_request', 'Document must be a JSON object');
var DB_MISSING = new PouchError(404, 'not_found', 'Database not found');
var IDB_ERROR = new PouchError(500, 'indexed_db_went_bad', 'unknown');
var WSQ_ERROR = new PouchError(500, 'web_sql_went_bad', 'unknown');
var LDB_ERROR = new PouchError(500, 'levelDB_went_went_bad', 'unknown');
var FORBIDDEN = new PouchError(403, 'forbidden', 'Forbidden by design doc validate_doc_update function');
var INVALID_REV = new PouchError(400, 'bad_request', 'Invalid rev format');
var FILE_EXISTS = new PouchError(412, 'file_exists', 'The database could not be created, the file already exists.');
var MISSING_STUB = new PouchError(412, 'missing_stub', 'A pre-existing attachment stub wasn\'t found');
var INVALID_URL = new PouchError(413, 'invalid_url', 'Provided URL is invalid');

function createError(error, reason) {
  function CustomPouchError(reason) {
    // inherit error properties from our parent error manually
    // so as to allow proper JSON parsing.
    /* jshint ignore:start */
    var names = Object.getOwnPropertyNames(error);
    for (var i = 0, len = names.length; i < len; i++) {
      if (typeof error[names[i]] !== 'function') {
        this[names[i]] = error[names[i]];
      }
    }
    /* jshint ignore:end */
    if (reason !== undefined) {
      this.reason = reason;
    }
  }
  CustomPouchError.prototype = PouchError.prototype;
  return new CustomPouchError(reason);
}

function generateErrorFromResponse(err) {

  if (typeof err !== 'object') {
    var data = err;
    err = UNKNOWN_ERROR;
    err.data = data;
  }

  if ('error' in err && err.error === 'conflict') {
    err.name = 'conflict';
    err.status = 409;
  }

  if (!('name' in err)) {
    err.name = err.error || 'unknown';
  }

  if (!('status' in err)) {
    err.status = 500;
  }

  if (!('message' in err)) {
    err.message = err.message || err.reason;
  }

  return err;
}

function tryFilter(filter, doc, req) {
  try {
    return !filter(doc, req);
  } catch (err) {
    var msg = 'Filter function threw: ' + err.toString();
    return createError(BAD_REQUEST, msg);
  }
}

function filterChange(opts) {
  var req = {};
  var hasFilter = opts.filter && typeof opts.filter === 'function';
  req.query = opts.query_params;

  return function filter(change) {
    if (!change.doc) {
      // CSG sends events on the changes feed that don't have documents,
      // this hack makes a whole lot of existing code robust.
      change.doc = {};
    }

    var filterReturn = hasFilter && tryFilter(opts.filter, change.doc, req);

    if (typeof filterReturn === 'object') {
      return filterReturn;
    }

    if (filterReturn) {
      return false;
    }

    if (!opts.include_docs) {
      delete change.doc;
    } else if (!opts.attachments) {
      for (var att in change.doc._attachments) {
        /* istanbul ignore else */
        if (change.doc._attachments.hasOwnProperty(att)) {
          change.doc._attachments[att].stub = true;
        }
      }
    }
    return true;
  };
}

function flatten(arrs) {
  var res = [];
  for (var i = 0, len = arrs.length; i < len; i++) {
    res = res.concat(arrs[i]);
  }
  return res;
}

// shim for Function.prototype.name,

// Determine id an ID is valid
//   - invalid IDs begin with an underescore that does not begin '_design' or
//     '_local'
//   - any other string value is a valid id
// Returns the specific error object for each case
function invalidIdError(id) {
  var err;
  if (!id) {
    err = createError(MISSING_ID);
  } else if (typeof id !== 'string') {
    err = createError(INVALID_ID);
  } else if (/^_/.test(id) && !(/^_(design|local)/).test(id)) {
    err = createError(RESERVED_ID);
  }
  if (err) {
    throw err;
  }
}

// Checks if a PouchDB object is "remote" or not. This is

function isRemote(db) {
  if (typeof db._remote === 'boolean') {
    return db._remote;
  }
  /* istanbul ignore next */
  if (typeof db.type === 'function') {
    guardedConsole('warn',
      'db.type() is deprecated and will be removed in ' +
      'a future version of PouchDB');
    return db.type() === 'http';
  }
  /* istanbul ignore next */
  return false;
}

function listenerCount(ee, type) {
  return 'listenerCount' in ee ? ee.listenerCount(type) :
                                 events__WEBPACK_IMPORTED_MODULE_6___default.a.listenerCount(ee, type);
}

function parseDesignDocFunctionName(s) {
  if (!s) {
    return null;
  }
  var parts = s.split('/');
  if (parts.length === 2) {
    return parts;
  }
  if (parts.length === 1) {
    return [s, s];
  }
  return null;
}

function normalizeDesignDocFunctionName(s) {
  var normalized = parseDesignDocFunctionName(s);
  return normalized ? normalized.join('/') : null;
}

// originally parseUri 1.2.2, now patched by us
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
var keys = ["source", "protocol", "authority", "userInfo", "user", "password",
    "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
var qName ="queryKey";
var qParser = /(?:^|&)([^&=]*)=?([^&]*)/g;

// use the "loose" parser
/* eslint maxlen: 0, no-useless-escape: 0 */
var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

function parseUri(str) {
  var m = parser.exec(str);
  var uri = {};
  var i = 14;

  while (i--) {
    var key = keys[i];
    var value = m[i] || "";
    var encoded = ['user', 'password'].indexOf(key) !== -1;
    uri[key] = encoded ? decodeURIComponent(value) : value;
  }

  uri[qName] = {};
  uri[keys[12]].replace(qParser, function ($0, $1, $2) {
    if ($1) {
      uri[qName][$1] = $2;
    }
  });

  return uri;
}

// Based on https://github.com/alexdavid/scope-eval v0.0.3
// (source: https://unpkg.com/scope-eval@0.0.3/scope_eval.js)
// This is basically just a wrapper around new Function()

function scopeEval(source, scope) {
  var keys = [];
  var values = [];
  for (var key in scope) {
    if (scope.hasOwnProperty(key)) {
      keys.push(key);
      values.push(scope[key]);
    }
  }
  keys.push(source);
  return Function.apply(null, keys).apply(null, values);
}

// this is essentially the "update sugar" function from daleharvey/pouchdb#1388
// the diffFun tells us what delta to apply to the doc.  it either returns
// the doc, or false if it doesn't need to do an update after all
function upsert(db, docId, diffFun) {
  return new Promise(function (fulfill, reject) {
    db.get(docId, function (err, doc) {
      if (err) {
        /* istanbul ignore next */
        if (err.status !== 404) {
          return reject(err);
        }
        doc = {};
      }

      // the user might change the _rev, so save it for posterity
      var docRev = doc._rev;
      var newDoc = diffFun(doc);

      if (!newDoc) {
        // if the diffFun returns falsy, we short-circuit as
        // an optimization
        return fulfill({updated: false, rev: docRev});
      }

      // users aren't allowed to modify these values,
      // so reset them here
      newDoc._id = docId;
      newDoc._rev = docRev;
      fulfill(tryAndPut(db, newDoc, diffFun));
    });
  });
}

function tryAndPut(db, doc, diffFun) {
  return db.put(doc).then(function (res) {
    return {
      updated: true,
      rev: res.rev
    };
  }, function (err) {
    /* istanbul ignore next */
    if (err.status !== 409) {
      throw err;
    }
    return upsert(db, doc._id, diffFun);
  });
}

var thisAtob = function (str) {
  return atob(str);
};

var thisBtoa = function (str) {
  return btoa(str);
};

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor (e.g.
// old QtWebKit versions, Android < 4.4).
function createBlob(parts, properties) {
  /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
  parts = parts || [];
  properties = properties || {};
  try {
    return new Blob(parts, properties);
  } catch (e) {
    if (e.name !== "TypeError") {
      throw e;
    }
    var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
                  typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
                  typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder :
                  WebKitBlobBuilder;
    var builder = new Builder();
    for (var i = 0; i < parts.length; i += 1) {
      builder.append(parts[i]);
    }
    return builder.getBlob(properties.type);
  }
}

// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function binaryStringToArrayBuffer(bin) {
  var length = bin.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return buf;
}

function binStringToBluffer(binString, type) {
  return createBlob([binaryStringToArrayBuffer(binString)], {type: type});
}

function b64ToBluffer(b64, type) {
  return binStringToBluffer(thisAtob(b64), type);
}

//Can't find original post, but this is close
//http://stackoverflow.com/questions/6965107/ (continues on next line)
//converting-between-strings-and-arraybuffers
function arrayBufferToBinaryString(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var length = bytes.byteLength;
  for (var i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

// shim for browsers that don't support it
function readAsBinaryString(blob, callback) {
  var reader = new FileReader();
  var hasBinaryString = typeof reader.readAsBinaryString === 'function';
  reader.onloadend = function (e) {
    var result = e.target.result || '';
    if (hasBinaryString) {
      return callback(result);
    }
    callback(arrayBufferToBinaryString(result));
  };
  if (hasBinaryString) {
    reader.readAsBinaryString(blob);
  } else {
    reader.readAsArrayBuffer(blob);
  }
}

function blobToBinaryString(blobOrBuffer, callback) {
  readAsBinaryString(blobOrBuffer, function (bin) {
    callback(bin);
  });
}

function blobToBase64(blobOrBuffer, callback) {
  blobToBinaryString(blobOrBuffer, function (base64) {
    callback(thisBtoa(base64));
  });
}

// simplified API. universal browser support is assumed
function readAsArrayBuffer(blob, callback) {
  var reader = new FileReader();
  reader.onloadend = function (e) {
    var result = e.target.result || new ArrayBuffer(0);
    callback(result);
  };
  reader.readAsArrayBuffer(blob);
}

// this is not used in the browser

var setImmediateShim = self.setImmediate || self.setTimeout;
var MD5_CHUNK_SIZE = 32768;

function rawToBase64(raw) {
  return thisBtoa(raw);
}

function sliceBlob(blob, start, end) {
  if (blob.webkitSlice) {
    return blob.webkitSlice(start, end);
  }
  return blob.slice(start, end);
}

function appendBlob(buffer, blob, start, end, callback) {
  if (start > 0 || end < blob.size) {
    // only slice blob if we really need to
    blob = sliceBlob(blob, start, end);
  }
  readAsArrayBuffer(blob, function (arrayBuffer) {
    buffer.append(arrayBuffer);
    callback();
  });
}

function appendString(buffer, string, start, end, callback) {
  if (start > 0 || end < string.length) {
    // only create a substring if we really need to
    string = string.substring(start, end);
  }
  buffer.appendBinary(string);
  callback();
}

function binaryMd5(data, callback) {
  var inputIsString = typeof data === 'string';
  var len = inputIsString ? data.length : data.size;
  var chunkSize = Math.min(MD5_CHUNK_SIZE, len);
  var chunks = Math.ceil(len / chunkSize);
  var currentChunk = 0;
  var buffer = inputIsString ? new spark_md5__WEBPACK_IMPORTED_MODULE_2___default.a() : new spark_md5__WEBPACK_IMPORTED_MODULE_2___default.a.ArrayBuffer();

  var append = inputIsString ? appendString : appendBlob;

  function next() {
    setImmediateShim(loadNextChunk);
  }

  function done() {
    var raw = buffer.end(true);
    var base64 = rawToBase64(raw);
    callback(base64);
    buffer.destroy();
  }

  function loadNextChunk() {
    var start = currentChunk * chunkSize;
    var end = start + chunkSize;
    currentChunk++;
    if (currentChunk < chunks) {
      append(buffer, data, start, end, next);
    } else {
      append(buffer, data, start, end, done);
    }
  }
  loadNextChunk();
}

function stringMd5(string) {
  return spark_md5__WEBPACK_IMPORTED_MODULE_2___default.a.hash(string);
}

function rev(doc, deterministic_revs) {
  var clonedDoc = clone(doc);
  if (!deterministic_revs) {
    return Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])().replace(/-/g, '').toLowerCase();
  }

  delete clonedDoc._rev_tree;
  return stringMd5(JSON.stringify(clonedDoc));
}

var uuid = uuid__WEBPACK_IMPORTED_MODULE_1__["v4"]; // mimic old import, only v4 is ever used elsewhere

// We fetch all leafs of the revision tree, and sort them based on tree length
// and whether they were deleted, undeleted documents with the longest revision
// tree (most edits) win
// The final sort algorithm is slightly documented in a sidebar here:
// http://guide.couchdb.org/draft/conflicts.html
function winningRev(metadata) {
  var winningId;
  var winningPos;
  var winningDeleted;
  var toVisit = metadata.rev_tree.slice();
  var node;
  while ((node = toVisit.pop())) {
    var tree = node.ids;
    var branches = tree[2];
    var pos = node.pos;
    if (branches.length) { // non-leaf
      for (var i = 0, len = branches.length; i < len; i++) {
        toVisit.push({pos: pos + 1, ids: branches[i]});
      }
      continue;
    }
    var deleted = !!tree[1].deleted;
    var id = tree[0];
    // sort by deleted, then pos, then id
    if (!winningId || (winningDeleted !== deleted ? winningDeleted :
        winningPos !== pos ? winningPos < pos : winningId < id)) {
      winningId = id;
      winningPos = pos;
      winningDeleted = deleted;
    }
  }

  return winningPos + '-' + winningId;
}

// Pretty much all below can be combined into a higher order function to
// traverse revisions
// The return value from the callback will be passed as context to all
// children of that node
function traverseRevTree(revs, callback) {
  var toVisit = revs.slice();

  var node;
  while ((node = toVisit.pop())) {
    var pos = node.pos;
    var tree = node.ids;
    var branches = tree[2];
    var newCtx =
      callback(branches.length === 0, pos, tree[0], node.ctx, tree[1]);
    for (var i = 0, len = branches.length; i < len; i++) {
      toVisit.push({pos: pos + 1, ids: branches[i], ctx: newCtx});
    }
  }
}

function sortByPos(a, b) {
  return a.pos - b.pos;
}

function collectLeaves(revs) {
  var leaves = [];
  traverseRevTree(revs, function (isLeaf, pos, id, acc, opts) {
    if (isLeaf) {
      leaves.push({rev: pos + "-" + id, pos: pos, opts: opts});
    }
  });
  leaves.sort(sortByPos).reverse();
  for (var i = 0, len = leaves.length; i < len; i++) {
    delete leaves[i].pos;
  }
  return leaves;
}

// returns revs of all conflicts that is leaves such that
// 1. are not deleted and
// 2. are different than winning revision
function collectConflicts(metadata) {
  var win = winningRev(metadata);
  var leaves = collectLeaves(metadata.rev_tree);
  var conflicts = [];
  for (var i = 0, len = leaves.length; i < len; i++) {
    var leaf = leaves[i];
    if (leaf.rev !== win && !leaf.opts.deleted) {
      conflicts.push(leaf.rev);
    }
  }
  return conflicts;
}

// compact a tree by marking its non-leafs as missing,
// and return a list of revs to delete
function compactTree(metadata) {
  var revs = [];
  traverseRevTree(metadata.rev_tree, function (isLeaf, pos,
                                               revHash, ctx, opts) {
    if (opts.status === 'available' && !isLeaf) {
      revs.push(pos + '-' + revHash);
      opts.status = 'missing';
    }
  });
  return revs;
}

// build up a list of all the paths to the leafs in this revision tree
function rootToLeaf(revs) {
  var paths = [];
  var toVisit = revs.slice();
  var node;
  while ((node = toVisit.pop())) {
    var pos = node.pos;
    var tree = node.ids;
    var id = tree[0];
    var opts = tree[1];
    var branches = tree[2];
    var isLeaf = branches.length === 0;

    var history = node.history ? node.history.slice() : [];
    history.push({id: id, opts: opts});
    if (isLeaf) {
      paths.push({pos: (pos + 1 - history.length), ids: history});
    }
    for (var i = 0, len = branches.length; i < len; i++) {
      toVisit.push({pos: pos + 1, ids: branches[i], history: history});
    }
  }
  return paths.reverse();
}

// for a better overview of what this is doing, read:

function sortByPos$1(a, b) {
  return a.pos - b.pos;
}

// classic binary search
function binarySearch(arr, item, comparator) {
  var low = 0;
  var high = arr.length;
  var mid;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (comparator(arr[mid], item) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

// assuming the arr is sorted, insert the item in the proper place
function insertSorted(arr, item, comparator) {
  var idx = binarySearch(arr, item, comparator);
  arr.splice(idx, 0, item);
}

// Turn a path as a flat array into a tree with a single branch.
// If any should be stemmed from the beginning of the array, that's passed
// in as the second argument
function pathToTree(path, numStemmed) {
  var root;
  var leaf;
  for (var i = numStemmed, len = path.length; i < len; i++) {
    var node = path[i];
    var currentLeaf = [node.id, node.opts, []];
    if (leaf) {
      leaf[2].push(currentLeaf);
      leaf = currentLeaf;
    } else {
      root = leaf = currentLeaf;
    }
  }
  return root;
}

// compare the IDs of two trees
function compareTree(a, b) {
  return a[0] < b[0] ? -1 : 1;
}

// Merge two trees together
// The roots of tree1 and tree2 must be the same revision
function mergeTree(in_tree1, in_tree2) {
  var queue = [{tree1: in_tree1, tree2: in_tree2}];
  var conflicts = false;
  while (queue.length > 0) {
    var item = queue.pop();
    var tree1 = item.tree1;
    var tree2 = item.tree2;

    if (tree1[1].status || tree2[1].status) {
      tree1[1].status =
        (tree1[1].status ===  'available' ||
        tree2[1].status === 'available') ? 'available' : 'missing';
    }

    for (var i = 0; i < tree2[2].length; i++) {
      if (!tree1[2][0]) {
        conflicts = 'new_leaf';
        tree1[2][0] = tree2[2][i];
        continue;
      }

      var merged = false;
      for (var j = 0; j < tree1[2].length; j++) {
        if (tree1[2][j][0] === tree2[2][i][0]) {
          queue.push({tree1: tree1[2][j], tree2: tree2[2][i]});
          merged = true;
        }
      }
      if (!merged) {
        conflicts = 'new_branch';
        insertSorted(tree1[2], tree2[2][i], compareTree);
      }
    }
  }
  return {conflicts: conflicts, tree: in_tree1};
}

function doMerge(tree, path, dontExpand) {
  var restree = [];
  var conflicts = false;
  var merged = false;
  var res;

  if (!tree.length) {
    return {tree: [path], conflicts: 'new_leaf'};
  }

  for (var i = 0, len = tree.length; i < len; i++) {
    var branch = tree[i];
    if (branch.pos === path.pos && branch.ids[0] === path.ids[0]) {
      // Paths start at the same position and have the same root, so they need
      // merged
      res = mergeTree(branch.ids, path.ids);
      restree.push({pos: branch.pos, ids: res.tree});
      conflicts = conflicts || res.conflicts;
      merged = true;
    } else if (dontExpand !== true) {
      // The paths start at a different position, take the earliest path and
      // traverse up until it as at the same point from root as the path we
      // want to merge.  If the keys match we return the longer path with the
      // other merged After stemming we dont want to expand the trees

      var t1 = branch.pos < path.pos ? branch : path;
      var t2 = branch.pos < path.pos ? path : branch;
      var diff = t2.pos - t1.pos;

      var candidateParents = [];

      var trees = [];
      trees.push({ids: t1.ids, diff: diff, parent: null, parentIdx: null});
      while (trees.length > 0) {
        var item = trees.pop();
        if (item.diff === 0) {
          if (item.ids[0] === t2.ids[0]) {
            candidateParents.push(item);
          }
          continue;
        }
        var elements = item.ids[2];
        for (var j = 0, elementsLen = elements.length; j < elementsLen; j++) {
          trees.push({
            ids: elements[j],
            diff: item.diff - 1,
            parent: item.ids,
            parentIdx: j
          });
        }
      }

      var el = candidateParents[0];

      if (!el) {
        restree.push(branch);
      } else {
        res = mergeTree(el.ids, t2.ids);
        el.parent[2][el.parentIdx] = res.tree;
        restree.push({pos: t1.pos, ids: t1.ids});
        conflicts = conflicts || res.conflicts;
        merged = true;
      }
    } else {
      restree.push(branch);
    }
  }

  // We didnt find
  if (!merged) {
    restree.push(path);
  }

  restree.sort(sortByPos$1);

  return {
    tree: restree,
    conflicts: conflicts || 'internal_node'
  };
}

// To ensure we dont grow the revision tree infinitely, we stem old revisions
function stem(tree, depth) {
  // First we break out the tree into a complete list of root to leaf paths
  var paths = rootToLeaf(tree);
  var stemmedRevs;

  var result;
  for (var i = 0, len = paths.length; i < len; i++) {
    // Then for each path, we cut off the start of the path based on the
    // `depth` to stem to, and generate a new set of flat trees
    var path = paths[i];
    var stemmed = path.ids;
    var node;
    if (stemmed.length > depth) {
      // only do the stemming work if we actually need to stem
      if (!stemmedRevs) {
        stemmedRevs = {}; // avoid allocating this object unnecessarily
      }
      var numStemmed = stemmed.length - depth;
      node = {
        pos: path.pos + numStemmed,
        ids: pathToTree(stemmed, numStemmed)
      };

      for (var s = 0; s < numStemmed; s++) {
        var rev = (path.pos + s) + '-' + stemmed[s].id;
        stemmedRevs[rev] = true;
      }
    } else { // no need to actually stem
      node = {
        pos: path.pos,
        ids: pathToTree(stemmed, 0)
      };
    }

    // Then we remerge all those flat trees together, ensuring that we dont
    // connect trees that would go beyond the depth limit
    if (result) {
      result = doMerge(result, node, true).tree;
    } else {
      result = [node];
    }
  }

  // this is memory-heavy per Chrome profiler, avoid unless we actually stemmed
  if (stemmedRevs) {
    traverseRevTree(result, function (isLeaf, pos, revHash) {
      // some revisions may have been removed in a branch but not in another
      delete stemmedRevs[pos + '-' + revHash];
    });
  }

  return {
    tree: result,
    revs: stemmedRevs ? Object.keys(stemmedRevs) : []
  };
}

function merge(tree, path, depth) {
  var newTree = doMerge(tree, path);
  var stemmed = stem(newTree.tree, depth);
  return {
    tree: stemmed.tree,
    stemmedRevs: stemmed.revs,
    conflicts: newTree.conflicts
  };
}

// return true if a rev exists in the rev tree, false otherwise
function revExists(revs, rev) {
  var toVisit = revs.slice();
  var splitRev = rev.split('-');
  var targetPos = parseInt(splitRev[0], 10);
  var targetId = splitRev[1];

  var node;
  while ((node = toVisit.pop())) {
    if (node.pos === targetPos && node.ids[0] === targetId) {
      return true;
    }
    var branches = node.ids[2];
    for (var i = 0, len = branches.length; i < len; i++) {
      toVisit.push({pos: node.pos + 1, ids: branches[i]});
    }
  }
  return false;
}

function getTrees(node) {
  return node.ids;
}

// check if a specific revision of a doc has been deleted
//  - metadata: the metadata object from the doc store
//  - rev: (optional) the revision to check. defaults to winning revision
function isDeleted(metadata, rev) {
  if (!rev) {
    rev = winningRev(metadata);
  }
  var id = rev.substring(rev.indexOf('-') + 1);
  var toVisit = metadata.rev_tree.map(getTrees);

  var tree;
  while ((tree = toVisit.pop())) {
    if (tree[0] === id) {
      return !!tree[1].deleted;
    }
    toVisit = toVisit.concat(tree[2]);
  }
}

function isLocalId(id) {
  return (/^_local/).test(id);
}

// returns the current leaf node for a given revision
function latest(rev, metadata) {
  var toVisit = metadata.rev_tree.slice();
  var node;
  while ((node = toVisit.pop())) {
    var pos = node.pos;
    var tree = node.ids;
    var id = tree[0];
    var opts = tree[1];
    var branches = tree[2];
    var isLeaf = branches.length === 0;

    var history = node.history ? node.history.slice() : [];
    history.push({id: id, pos: pos, opts: opts});

    if (isLeaf) {
      for (var i = 0, len = history.length; i < len; i++) {
        var historyNode = history[i];
        var historyRev = historyNode.pos + '-' + historyNode.id;

        if (historyRev === rev) {
          // return the rev of this leaf
          return pos + '-' + id;
        }
      }
    }

    for (var j = 0, l = branches.length; j < l; j++) {
      toVisit.push({pos: pos + 1, ids: branches[j], history: history});
    }
  }

  /* istanbul ignore next */
  throw new Error('Unable to resolve latest revision for id ' + metadata.id + ', rev ' + rev);
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(Changes$1, events__WEBPACK_IMPORTED_MODULE_6___default.a);

function tryCatchInChangeListener(self, change, pending, lastSeq) {
  // isolate try/catches to avoid V8 deoptimizations
  try {
    self.emit('change', change, pending, lastSeq);
  } catch (e) {
    guardedConsole('error', 'Error in .on("change", function):', e);
  }
}

function Changes$1(db, opts, callback) {
  events__WEBPACK_IMPORTED_MODULE_6___default.a.call(this);
  var self = this;
  this.db = db;
  opts = opts ? clone(opts) : {};
  var complete = opts.complete = once(function (err, resp) {
    if (err) {
      if (listenerCount(self, 'error') > 0) {
        self.emit('error', err);
      }
    } else {
      self.emit('complete', resp);
    }
    self.removeAllListeners();
    db.removeListener('destroyed', onDestroy);
  });
  if (callback) {
    self.on('complete', function (resp) {
      callback(null, resp);
    });
    self.on('error', callback);
  }
  function onDestroy() {
    self.cancel();
  }
  db.once('destroyed', onDestroy);

  opts.onChange = function (change, pending, lastSeq) {
    /* istanbul ignore if */
    if (self.isCancelled) {
      return;
    }
    tryCatchInChangeListener(self, change, pending, lastSeq);
  };

  var promise = new Promise(function (fulfill, reject) {
    opts.complete = function (err, res) {
      if (err) {
        reject(err);
      } else {
        fulfill(res);
      }
    };
  });
  self.once('cancel', function () {
    db.removeListener('destroyed', onDestroy);
    opts.complete(null, {status: 'cancelled'});
  });
  this.then = promise.then.bind(promise);
  this['catch'] = promise['catch'].bind(promise);
  this.then(function (result) {
    complete(null, result);
  }, complete);



  if (!db.taskqueue.isReady) {
    db.taskqueue.addTask(function (failed) {
      if (failed) {
        opts.complete(failed);
      } else if (self.isCancelled) {
        self.emit('cancel');
      } else {
        self.validateChanges(opts);
      }
    });
  } else {
    self.validateChanges(opts);
  }
}
Changes$1.prototype.cancel = function () {
  this.isCancelled = true;
  if (this.db.taskqueue.isReady) {
    this.emit('cancel');
  }
};
function processChange(doc, metadata, opts) {
  var changeList = [{rev: doc._rev}];
  if (opts.style === 'all_docs') {
    changeList = collectLeaves(metadata.rev_tree)
    .map(function (x) { return {rev: x.rev}; });
  }
  var change = {
    id: metadata.id,
    changes: changeList,
    doc: doc
  };

  if (isDeleted(metadata, doc._rev)) {
    change.deleted = true;
  }
  if (opts.conflicts) {
    change.doc._conflicts = collectConflicts(metadata);
    if (!change.doc._conflicts.length) {
      delete change.doc._conflicts;
    }
  }
  return change;
}

Changes$1.prototype.validateChanges = function (opts) {
  var callback = opts.complete;
  var self = this;

  /* istanbul ignore else */
  if (PouchDB._changesFilterPlugin) {
    PouchDB._changesFilterPlugin.validate(opts, function (err) {
      if (err) {
        return callback(err);
      }
      self.doChanges(opts);
    });
  } else {
    self.doChanges(opts);
  }
};

Changes$1.prototype.doChanges = function (opts) {
  var self = this;
  var callback = opts.complete;

  opts = clone(opts);
  if ('live' in opts && !('continuous' in opts)) {
    opts.continuous = opts.live;
  }
  opts.processChange = processChange;

  if (opts.since === 'latest') {
    opts.since = 'now';
  }
  if (!opts.since) {
    opts.since = 0;
  }
  if (opts.since === 'now') {
    this.db.info().then(function (info) {
      /* istanbul ignore if */
      if (self.isCancelled) {
        callback(null, {status: 'cancelled'});
        return;
      }
      opts.since = info.update_seq;
      self.doChanges(opts);
    }, callback);
    return;
  }

  /* istanbul ignore else */
  if (PouchDB._changesFilterPlugin) {
    PouchDB._changesFilterPlugin.normalize(opts);
    if (PouchDB._changesFilterPlugin.shouldFilter(this, opts)) {
      return PouchDB._changesFilterPlugin.filter(this, opts);
    }
  } else {
    ['doc_ids', 'filter', 'selector', 'view'].forEach(function (key) {
      if (key in opts) {
        guardedConsole('warn',
          'The "' + key + '" option was passed in to changes/replicate, ' +
          'but pouchdb-changes-filter plugin is not installed, so it ' +
          'was ignored. Please install the plugin to enable filtering.'
        );
      }
    });
  }

  if (!('descending' in opts)) {
    opts.descending = false;
  }

  // 0 and 1 should return 1 document
  opts.limit = opts.limit === 0 ? 1 : opts.limit;
  opts.complete = callback;
  var newPromise = this.db._changes(opts);
  /* istanbul ignore else */
  if (newPromise && typeof newPromise.cancel === 'function') {
    var cancel = self.cancel;
    self.cancel = argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
      newPromise.cancel();
      cancel.apply(this, args);
    });
  }
};

/*
 * A generic pouch adapter
 */

function compare(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

// Wrapper for functions that call the bulkdocs api with a single doc,
// if the first result is an error, return an error
function yankError(callback, docId) {
  return function (err, results) {
    if (err || (results[0] && results[0].error)) {
      err = err || results[0];
      err.docId = docId;
      callback(err);
    } else {
      callback(null, results.length ? results[0]  : results);
    }
  };
}

// clean docs given to us by the user
function cleanDocs(docs) {
  for (var i = 0; i < docs.length; i++) {
    var doc = docs[i];
    if (doc._deleted) {
      delete doc._attachments; // ignore atts for deleted docs
    } else if (doc._attachments) {
      // filter out extraneous keys from _attachments
      var atts = Object.keys(doc._attachments);
      for (var j = 0; j < atts.length; j++) {
        var att = atts[j];
        doc._attachments[att] = pick(doc._attachments[att],
          ['data', 'digest', 'content_type', 'length', 'revpos', 'stub']);
      }
    }
  }
}

// compare two docs, first by _id then by _rev
function compareByIdThenRev(a, b) {
  var idCompare = compare(a._id, b._id);
  if (idCompare !== 0) {
    return idCompare;
  }
  var aStart = a._revisions ? a._revisions.start : 0;
  var bStart = b._revisions ? b._revisions.start : 0;
  return compare(aStart, bStart);
}

// for every node in a revision tree computes its distance from the closest
// leaf
function computeHeight(revs) {
  var height = {};
  var edges = [];
  traverseRevTree(revs, function (isLeaf, pos, id, prnt) {
    var rev$$1 = pos + "-" + id;
    if (isLeaf) {
      height[rev$$1] = 0;
    }
    if (prnt !== undefined) {
      edges.push({from: prnt, to: rev$$1});
    }
    return rev$$1;
  });

  edges.reverse();
  edges.forEach(function (edge) {
    if (height[edge.from] === undefined) {
      height[edge.from] = 1 + height[edge.to];
    } else {
      height[edge.from] = Math.min(height[edge.from], 1 + height[edge.to]);
    }
  });
  return height;
}

function allDocsKeysParse(opts) {
  var keys =  ('limit' in opts) ?
    opts.keys.slice(opts.skip, opts.limit + opts.skip) :
    (opts.skip > 0) ? opts.keys.slice(opts.skip) : opts.keys;
  opts.keys = keys;
  opts.skip = 0;
  delete opts.limit;
  if (opts.descending) {
    keys.reverse();
    opts.descending = false;
  }
}

// all compaction is done in a queue, to avoid attaching
// too many listeners at once
function doNextCompaction(self) {
  var task = self._compactionQueue[0];
  var opts = task.opts;
  var callback = task.callback;
  self.get('_local/compaction').catch(function () {
    return false;
  }).then(function (doc) {
    if (doc && doc.last_seq) {
      opts.last_seq = doc.last_seq;
    }
    self._compact(opts, function (err, res) {
      /* istanbul ignore if */
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
      immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
        self._compactionQueue.shift();
        if (self._compactionQueue.length) {
          doNextCompaction(self);
        }
      });
    });
  });
}

function attachmentNameError(name) {
  if (name.charAt(0) === '_') {
    return name + ' is not a valid attachment name, attachment ' +
      'names cannot start with \'_\'';
  }
  return false;
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(AbstractPouchDB, events__WEBPACK_IMPORTED_MODULE_6___default.a);

function AbstractPouchDB() {
  events__WEBPACK_IMPORTED_MODULE_6___default.a.call(this);

  // re-bind prototyped methods
  for (var p in AbstractPouchDB.prototype) {
    if (typeof this[p] === 'function') {
      this[p] = this[p].bind(this);
    }
  }
}

AbstractPouchDB.prototype.post =
  adapterFun('post', function (doc, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  if (typeof doc !== 'object' || Array.isArray(doc)) {
    return callback(createError(NOT_AN_OBJECT));
  }
  this.bulkDocs({docs: [doc]}, opts, yankError(callback, doc._id));
});

AbstractPouchDB.prototype.put = adapterFun('put', function (doc, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  if (typeof doc !== 'object' || Array.isArray(doc)) {
    return cb(createError(NOT_AN_OBJECT));
  }
  invalidIdError(doc._id);
  if (isLocalId(doc._id) && typeof this._putLocal === 'function') {
    if (doc._deleted) {
      return this._removeLocal(doc, cb);
    } else {
      return this._putLocal(doc, cb);
    }
  }
  var self = this;
  if (opts.force && doc._rev) {
    transformForceOptionToNewEditsOption();
    putDoc(function (err) {
      var result = err ? null : {ok: true, id: doc._id, rev: doc._rev};
      cb(err, result);
    });
  } else {
    putDoc(cb);
  }

  function transformForceOptionToNewEditsOption() {
    var parts = doc._rev.split('-');
    var oldRevId = parts[1];
    var oldRevNum = parseInt(parts[0], 10);

    var newRevNum = oldRevNum + 1;
    var newRevId = rev();

    doc._revisions = {
      start: newRevNum,
      ids: [newRevId, oldRevId]
    };
    doc._rev = newRevNum + '-' + newRevId;
    opts.new_edits = false;
  }
  function putDoc(next) {
    if (typeof self._put === 'function' && opts.new_edits !== false) {
      self._put(doc, opts, next);
    } else {
      self.bulkDocs({docs: [doc]}, opts, yankError(next, doc._id));
    }
  }
});

AbstractPouchDB.prototype.putAttachment =
  adapterFun('putAttachment', function (docId, attachmentId, rev$$1,
                                              blob, type) {
  var api = this;
  if (typeof type === 'function') {
    type = blob;
    blob = rev$$1;
    rev$$1 = null;
  }
  // Lets fix in https://github.com/pouchdb/pouchdb/issues/3267
  /* istanbul ignore if */
  if (typeof type === 'undefined') {
    type = blob;
    blob = rev$$1;
    rev$$1 = null;
  }
  if (!type) {
    guardedConsole('warn', 'Attachment', attachmentId, 'on document', docId, 'is missing content_type');
  }

  function createAttachment(doc) {
    var prevrevpos = '_rev' in doc ? parseInt(doc._rev, 10) : 0;
    doc._attachments = doc._attachments || {};
    doc._attachments[attachmentId] = {
      content_type: type,
      data: blob,
      revpos: ++prevrevpos
    };
    return api.put(doc);
  }

  return api.get(docId).then(function (doc) {
    if (doc._rev !== rev$$1) {
      throw createError(REV_CONFLICT);
    }

    return createAttachment(doc);
  }, function (err) {
     // create new doc
    /* istanbul ignore else */
    if (err.reason === MISSING_DOC.message) {
      return createAttachment({_id: docId});
    } else {
      throw err;
    }
  });
});

AbstractPouchDB.prototype.removeAttachment =
  adapterFun('removeAttachment', function (docId, attachmentId, rev$$1,
                                                 callback) {
  var self = this;
  self.get(docId, function (err, obj) {
    /* istanbul ignore if */
    if (err) {
      callback(err);
      return;
    }
    if (obj._rev !== rev$$1) {
      callback(createError(REV_CONFLICT));
      return;
    }
    /* istanbul ignore if */
    if (!obj._attachments) {
      return callback();
    }
    delete obj._attachments[attachmentId];
    if (Object.keys(obj._attachments).length === 0) {
      delete obj._attachments;
    }
    self.put(obj, callback);
  });
});

AbstractPouchDB.prototype.remove =
  adapterFun('remove', function (docOrId, optsOrRev, opts, callback) {
  var doc;
  if (typeof optsOrRev === 'string') {
    // id, rev, opts, callback style
    doc = {
      _id: docOrId,
      _rev: optsOrRev
    };
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
  } else {
    // doc, opts, callback style
    doc = docOrId;
    if (typeof optsOrRev === 'function') {
      callback = optsOrRev;
      opts = {};
    } else {
      callback = opts;
      opts = optsOrRev;
    }
  }
  opts = opts || {};
  opts.was_delete = true;
  var newDoc = {_id: doc._id, _rev: (doc._rev || opts.rev)};
  newDoc._deleted = true;
  if (isLocalId(newDoc._id) && typeof this._removeLocal === 'function') {
    return this._removeLocal(doc, callback);
  }
  this.bulkDocs({docs: [newDoc]}, opts, yankError(callback, newDoc._id));
});

AbstractPouchDB.prototype.revsDiff =
  adapterFun('revsDiff', function (req, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  var ids = Object.keys(req);

  if (!ids.length) {
    return callback(null, {});
  }

  var count = 0;
  var missing = new ExportedMap();

  function addToMissing(id, revId) {
    if (!missing.has(id)) {
      missing.set(id, {missing: []});
    }
    missing.get(id).missing.push(revId);
  }

  function processDoc(id, rev_tree) {
    // Is this fast enough? Maybe we should switch to a set simulated by a map
    var missingForId = req[id].slice(0);
    traverseRevTree(rev_tree, function (isLeaf, pos, revHash, ctx,
      opts) {
        var rev$$1 = pos + '-' + revHash;
        var idx = missingForId.indexOf(rev$$1);
        if (idx === -1) {
          return;
        }

        missingForId.splice(idx, 1);
        /* istanbul ignore if */
        if (opts.status !== 'available') {
          addToMissing(id, rev$$1);
        }
      });

    // Traversing the tree is synchronous, so now `missingForId` contains
    // revisions that were not found in the tree
    missingForId.forEach(function (rev$$1) {
      addToMissing(id, rev$$1);
    });
  }

  ids.map(function (id) {
    this._getRevisionTree(id, function (err, rev_tree) {
      if (err && err.status === 404 && err.message === 'missing') {
        missing.set(id, {missing: req[id]});
      } else if (err) {
        /* istanbul ignore next */
        return callback(err);
      } else {
        processDoc(id, rev_tree);
      }

      if (++count === ids.length) {
        // convert LazyMap to object
        var missingObj = {};
        missing.forEach(function (value, key) {
          missingObj[key] = value;
        });
        return callback(null, missingObj);
      }
    });
  }, this);
});

// _bulk_get API for faster replication, as described in
// https://github.com/apache/couchdb-chttpd/pull/33
// At the "abstract" level, it will just run multiple get()s in
// parallel, because this isn't much of a performance cost
// for local databases (except the cost of multiple transactions, which is
// small). The http adapter overrides this in order
// to do a more efficient single HTTP request.
AbstractPouchDB.prototype.bulkGet =
  adapterFun('bulkGet', function (opts, callback) {
  bulkGet(this, opts, callback);
});

// compact one document and fire callback
// by compacting we mean removing all revisions which
// are further from the leaf in revision tree than max_height
AbstractPouchDB.prototype.compactDocument =
  adapterFun('compactDocument', function (docId, maxHeight, callback) {
  var self = this;
  this._getRevisionTree(docId, function (err, revTree) {
    /* istanbul ignore if */
    if (err) {
      return callback(err);
    }
    var height = computeHeight(revTree);
    var candidates = [];
    var revs = [];
    Object.keys(height).forEach(function (rev$$1) {
      if (height[rev$$1] > maxHeight) {
        candidates.push(rev$$1);
      }
    });

    traverseRevTree(revTree, function (isLeaf, pos, revHash, ctx, opts) {
      var rev$$1 = pos + '-' + revHash;
      if (opts.status === 'available' && candidates.indexOf(rev$$1) !== -1) {
        revs.push(rev$$1);
      }
    });
    self._doCompaction(docId, revs, callback);
  });
});

// compact the whole database using single document
// compaction
AbstractPouchDB.prototype.compact =
  adapterFun('compact', function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var self = this;
  opts = opts || {};

  self._compactionQueue = self._compactionQueue || [];
  self._compactionQueue.push({opts: opts, callback: callback});
  if (self._compactionQueue.length === 1) {
    doNextCompaction(self);
  }
});
AbstractPouchDB.prototype._compact = function (opts, callback) {
  var self = this;
  var changesOpts = {
    return_docs: false,
    last_seq: opts.last_seq || 0
  };
  var promises = [];

  function onChange(row) {
    promises.push(self.compactDocument(row.id, 0));
  }
  function onComplete(resp) {
    var lastSeq = resp.last_seq;
    Promise.all(promises).then(function () {
      return upsert(self, '_local/compaction', function deltaFunc(doc) {
        if (!doc.last_seq || doc.last_seq < lastSeq) {
          doc.last_seq = lastSeq;
          return doc;
        }
        return false; // somebody else got here first, don't update
      });
    }).then(function () {
      callback(null, {ok: true});
    }).catch(callback);
  }
  self.changes(changesOpts)
    .on('change', onChange)
    .on('complete', onComplete)
    .on('error', callback);
};

/* Begin api wrappers. Specific functionality to storage belongs in the
   _[method] */
AbstractPouchDB.prototype.get = adapterFun('get', function (id, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  if (typeof id !== 'string') {
    return cb(createError(INVALID_ID));
  }
  if (isLocalId(id) && typeof this._getLocal === 'function') {
    return this._getLocal(id, cb);
  }
  var leaves = [], self = this;

  function finishOpenRevs() {
    var result = [];
    var count = leaves.length;
    /* istanbul ignore if */
    if (!count) {
      return cb(null, result);
    }

    // order with open_revs is unspecified
    leaves.forEach(function (leaf) {
      self.get(id, {
        rev: leaf,
        revs: opts.revs,
        latest: opts.latest,
        attachments: opts.attachments,
        binary: opts.binary
      }, function (err, doc) {
        if (!err) {
          // using latest=true can produce duplicates
          var existing;
          for (var i = 0, l = result.length; i < l; i++) {
            if (result[i].ok && result[i].ok._rev === doc._rev) {
              existing = true;
              break;
            }
          }
          if (!existing) {
            result.push({ok: doc});
          }
        } else {
          result.push({missing: leaf});
        }
        count--;
        if (!count) {
          cb(null, result);
        }
      });
    });
  }

  if (opts.open_revs) {
    if (opts.open_revs === "all") {
      this._getRevisionTree(id, function (err, rev_tree) {
        /* istanbul ignore if */
        if (err) {
          return cb(err);
        }
        leaves = collectLeaves(rev_tree).map(function (leaf) {
          return leaf.rev;
        });
        finishOpenRevs();
      });
    } else {
      if (Array.isArray(opts.open_revs)) {
        leaves = opts.open_revs;
        for (var i = 0; i < leaves.length; i++) {
          var l = leaves[i];
          // looks like it's the only thing couchdb checks
          if (!(typeof (l) === "string" && /^\d+-/.test(l))) {
            return cb(createError(INVALID_REV));
          }
        }
        finishOpenRevs();
      } else {
        return cb(createError(UNKNOWN_ERROR, 'function_clause'));
      }
    }
    return; // open_revs does not like other options
  }

  return this._get(id, opts, function (err, result) {
    if (err) {
      err.docId = id;
      return cb(err);
    }

    var doc = result.doc;
    var metadata = result.metadata;
    var ctx = result.ctx;

    if (opts.conflicts) {
      var conflicts = collectConflicts(metadata);
      if (conflicts.length) {
        doc._conflicts = conflicts;
      }
    }

    if (isDeleted(metadata, doc._rev)) {
      doc._deleted = true;
    }

    if (opts.revs || opts.revs_info) {
      var splittedRev = doc._rev.split('-');
      var revNo       = parseInt(splittedRev[0], 10);
      var revHash     = splittedRev[1];

      var paths = rootToLeaf(metadata.rev_tree);
      var path = null;

      for (var i = 0; i < paths.length; i++) {
        var currentPath = paths[i];
        var hashIndex = currentPath.ids.map(function (x) { return x.id; })
          .indexOf(revHash);
        var hashFoundAtRevPos = hashIndex === (revNo - 1);

        if (hashFoundAtRevPos || (!path && hashIndex !== -1)) {
          path = currentPath;
        }
      }

      /* istanbul ignore if */
      if (!path) {
        err = new Error('invalid rev tree');
        err.docId = id;
        return cb(err);
      }

      var indexOfRev = path.ids.map(function (x) { return x.id; })
        .indexOf(doc._rev.split('-')[1]) + 1;
      var howMany = path.ids.length - indexOfRev;
      path.ids.splice(indexOfRev, howMany);
      path.ids.reverse();

      if (opts.revs) {
        doc._revisions = {
          start: (path.pos + path.ids.length) - 1,
          ids: path.ids.map(function (rev$$1) {
            return rev$$1.id;
          })
        };
      }
      if (opts.revs_info) {
        var pos =  path.pos + path.ids.length;
        doc._revs_info = path.ids.map(function (rev$$1) {
          pos--;
          return {
            rev: pos + '-' + rev$$1.id,
            status: rev$$1.opts.status
          };
        });
      }
    }

    if (opts.attachments && doc._attachments) {
      var attachments = doc._attachments;
      var count = Object.keys(attachments).length;
      if (count === 0) {
        return cb(null, doc);
      }
      Object.keys(attachments).forEach(function (key) {
        this._getAttachment(doc._id, key, attachments[key], {
          // Previously the revision handling was done in adapter.js
          // getAttachment, however since idb-next doesnt we need to
          // pass the rev through
          rev: doc._rev,
          binary: opts.binary,
          ctx: ctx
        }, function (err, data) {
          var att = doc._attachments[key];
          att.data = data;
          delete att.stub;
          delete att.length;
          if (!--count) {
            cb(null, doc);
          }
        });
      }, self);
    } else {
      if (doc._attachments) {
        for (var key in doc._attachments) {
          /* istanbul ignore else */
          if (doc._attachments.hasOwnProperty(key)) {
            doc._attachments[key].stub = true;
          }
        }
      }
      cb(null, doc);
    }
  });
});

// TODO: I dont like this, it forces an extra read for every
// attachment read and enforces a confusing api between
// adapter.js and the adapter implementation
AbstractPouchDB.prototype.getAttachment =
  adapterFun('getAttachment', function (docId, attachmentId, opts, callback) {
  var self = this;
  if (opts instanceof Function) {
    callback = opts;
    opts = {};
  }
  this._get(docId, opts, function (err, res) {
    if (err) {
      return callback(err);
    }
    if (res.doc._attachments && res.doc._attachments[attachmentId]) {
      opts.ctx = res.ctx;
      opts.binary = true;
      self._getAttachment(docId, attachmentId,
                          res.doc._attachments[attachmentId], opts, callback);
    } else {
      return callback(createError(MISSING_DOC));
    }
  });
});

AbstractPouchDB.prototype.allDocs =
  adapterFun('allDocs', function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  opts.skip = typeof opts.skip !== 'undefined' ? opts.skip : 0;
  if (opts.start_key) {
    opts.startkey = opts.start_key;
  }
  if (opts.end_key) {
    opts.endkey = opts.end_key;
  }
  if ('keys' in opts) {
    if (!Array.isArray(opts.keys)) {
      return callback(new TypeError('options.keys must be an array'));
    }
    var incompatibleOpt =
      ['startkey', 'endkey', 'key'].filter(function (incompatibleOpt) {
      return incompatibleOpt in opts;
    })[0];
    if (incompatibleOpt) {
      callback(createError(QUERY_PARSE_ERROR,
        'Query parameter `' + incompatibleOpt +
        '` is not compatible with multi-get'
      ));
      return;
    }
    if (!isRemote(this)) {
      allDocsKeysParse(opts);
      if (opts.keys.length === 0) {
        return this._allDocs({limit: 0}, callback);
      }
    }
  }

  return this._allDocs(opts, callback);
});

AbstractPouchDB.prototype.changes = function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts = opts || {};

  // By default set return_docs to false if the caller has opts.live = true,
  // this will prevent us from collecting the set of changes indefinitely
  // resulting in growing memory
  opts.return_docs = ('return_docs' in opts) ? opts.return_docs : !opts.live;

  return new Changes$1(this, opts, callback);
};

AbstractPouchDB.prototype.close = adapterFun('close', function (callback) {
  this._closed = true;
  this.emit('closed');
  return this._close(callback);
});

AbstractPouchDB.prototype.info = adapterFun('info', function (callback) {
  var self = this;
  this._info(function (err, info) {
    if (err) {
      return callback(err);
    }
    // assume we know better than the adapter, unless it informs us
    info.db_name = info.db_name || self.name;
    info.auto_compaction = !!(self.auto_compaction && !isRemote(self));
    info.adapter = self.adapter;
    callback(null, info);
  });
});

AbstractPouchDB.prototype.id = adapterFun('id', function (callback) {
  return this._id(callback);
});

/* istanbul ignore next */
AbstractPouchDB.prototype.type = function () {
  return (typeof this._type === 'function') ? this._type() : this.adapter;
};

AbstractPouchDB.prototype.bulkDocs =
  adapterFun('bulkDocs', function (req, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts = opts || {};

  if (Array.isArray(req)) {
    req = {
      docs: req
    };
  }

  if (!req || !req.docs || !Array.isArray(req.docs)) {
    return callback(createError(MISSING_BULK_DOCS));
  }

  for (var i = 0; i < req.docs.length; ++i) {
    if (typeof req.docs[i] !== 'object' || Array.isArray(req.docs[i])) {
      return callback(createError(NOT_AN_OBJECT));
    }
  }

  var attachmentError;
  req.docs.forEach(function (doc) {
    if (doc._attachments) {
      Object.keys(doc._attachments).forEach(function (name) {
        attachmentError = attachmentError || attachmentNameError(name);
        if (!doc._attachments[name].content_type) {
          guardedConsole('warn', 'Attachment', name, 'on document', doc._id, 'is missing content_type');
        }
      });
    }
  });

  if (attachmentError) {
    return callback(createError(BAD_REQUEST, attachmentError));
  }

  if (!('new_edits' in opts)) {
    if ('new_edits' in req) {
      opts.new_edits = req.new_edits;
    } else {
      opts.new_edits = true;
    }
  }

  var adapter = this;
  if (!opts.new_edits && !isRemote(adapter)) {
    // ensure revisions of the same doc are sorted, so that
    // the local adapter processes them correctly (#2935)
    req.docs.sort(compareByIdThenRev);
  }

  cleanDocs(req.docs);

  // in the case of conflicts, we want to return the _ids to the user
  // however, the underlying adapter may destroy the docs array, so
  // create a copy here
  var ids = req.docs.map(function (doc) {
    return doc._id;
  });

  return this._bulkDocs(req, opts, function (err, res) {
    if (err) {
      return callback(err);
    }
    if (!opts.new_edits) {
      // this is what couch does when new_edits is false
      res = res.filter(function (x) {
        return x.error;
      });
    }
    // add ids for error/conflict responses (not required for CouchDB)
    if (!isRemote(adapter)) {
      for (var i = 0, l = res.length; i < l; i++) {
        res[i].id = res[i].id || ids[i];
      }
    }

    callback(null, res);
  });
});

AbstractPouchDB.prototype.registerDependentDatabase =
  adapterFun('registerDependentDatabase', function (dependentDb,
                                                          callback) {
  var depDB = new this.constructor(dependentDb, this.__opts);

  function diffFun(doc) {
    doc.dependentDbs = doc.dependentDbs || {};
    if (doc.dependentDbs[dependentDb]) {
      return false; // no update required
    }
    doc.dependentDbs[dependentDb] = true;
    return doc;
  }
  upsert(this, '_local/_pouch_dependentDbs', diffFun)
    .then(function () {
      callback(null, {db: depDB});
    }).catch(callback);
});

AbstractPouchDB.prototype.destroy =
  adapterFun('destroy', function (opts, callback) {

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var self = this;
  var usePrefix = 'use_prefix' in self ? self.use_prefix : true;

  function destroyDb() {
    // call destroy method of the particular adaptor
    self._destroy(opts, function (err, resp) {
      if (err) {
        return callback(err);
      }
      self._destroyed = true;
      self.emit('destroyed');
      callback(null, resp || { 'ok': true });
    });
  }

  if (isRemote(self)) {
    // no need to check for dependent DBs if it's a remote DB
    return destroyDb();
  }

  self.get('_local/_pouch_dependentDbs', function (err, localDoc) {
    if (err) {
      /* istanbul ignore if */
      if (err.status !== 404) {
        return callback(err);
      } else { // no dependencies
        return destroyDb();
      }
    }
    var dependentDbs = localDoc.dependentDbs;
    var PouchDB = self.constructor;
    var deletedMap = Object.keys(dependentDbs).map(function (name) {
      // use_prefix is only false in the browser
      /* istanbul ignore next */
      var trueName = usePrefix ?
        name.replace(new RegExp('^' + PouchDB.prefix), '') : name;
      return new PouchDB(trueName, self.__opts).destroy();
    });
    Promise.all(deletedMap).then(destroyDb, callback);
  });
});

function TaskQueue() {
  this.isReady = false;
  this.failed = false;
  this.queue = [];
}

TaskQueue.prototype.execute = function () {
  var fun;
  if (this.failed) {
    while ((fun = this.queue.shift())) {
      fun(this.failed);
    }
  } else {
    while ((fun = this.queue.shift())) {
      fun();
    }
  }
};

TaskQueue.prototype.fail = function (err) {
  this.failed = err;
  this.execute();
};

TaskQueue.prototype.ready = function (db) {
  this.isReady = true;
  this.db = db;
  this.execute();
};

TaskQueue.prototype.addTask = function (fun) {
  this.queue.push(fun);
  if (this.failed) {
    this.execute();
  }
};

function parseAdapter(name, opts) {
  var match = name.match(/([a-z-]*):\/\/(.*)/);
  if (match) {
    // the http adapter expects the fully qualified name
    return {
      name: /https?/.test(match[1]) ? match[1] + '://' + match[2] : match[2],
      adapter: match[1]
    };
  }

  var adapters = PouchDB.adapters;
  var preferredAdapters = PouchDB.preferredAdapters;
  var prefix = PouchDB.prefix;
  var adapterName = opts.adapter;

  if (!adapterName) { // automatically determine adapter
    for (var i = 0; i < preferredAdapters.length; ++i) {
      adapterName = preferredAdapters[i];
      // check for browsers that have been upgraded from websql-only to websql+idb
      /* istanbul ignore if */
      if (adapterName === 'idb' && 'websql' in adapters &&
          hasLocalStorage() && localStorage['_pouch__websqldb_' + prefix + name]) {
        // log it, because this can be confusing during development
        guardedConsole('log', 'PouchDB is downgrading "' + name + '" to WebSQL to' +
          ' avoid data loss, because it was already opened with WebSQL.');
        continue; // keep using websql to avoid user data loss
      }
      break;
    }
  }

  var adapter = adapters[adapterName];

  // if adapter is invalid, then an error will be thrown later
  var usePrefix = (adapter && 'use_prefix' in adapter) ?
    adapter.use_prefix : true;

  return {
    name: usePrefix ? (prefix + name) : name,
    adapter: adapterName
  };
}

// OK, so here's the deal. Consider this code:
//     var db1 = new PouchDB('foo');
//     var db2 = new PouchDB('foo');
//     db1.destroy();
// ^ these two both need to emit 'destroyed' events,
// as well as the PouchDB constructor itself.
// So we have one db object (whichever one got destroy() called on it)
// responsible for emitting the initial event, which then gets emitted
// by the constructor, which then broadcasts it to any other dbs
// that may have been created with the same name.
function prepareForDestruction(self) {

  function onDestroyed(from_constructor) {
    self.removeListener('closed', onClosed);
    if (!from_constructor) {
      self.constructor.emit('destroyed', self.name);
    }
  }

  function onClosed() {
    self.removeListener('destroyed', onDestroyed);
    self.constructor.emit('unref', self);
  }

  self.once('destroyed', onDestroyed);
  self.once('closed', onClosed);
  self.constructor.emit('ref', self);
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(PouchDB, AbstractPouchDB);
function PouchDB(name, opts) {
  // In Node our test suite only tests this for PouchAlt unfortunately
  /* istanbul ignore if */
  if (!(this instanceof PouchDB)) {
    return new PouchDB(name, opts);
  }

  var self = this;
  opts = opts || {};

  if (name && typeof name === 'object') {
    opts = name;
    name = opts.name;
    delete opts.name;
  }

  if (opts.deterministic_revs === undefined) {
    opts.deterministic_revs = true;
  }

  this.__opts = opts = clone(opts);

  self.auto_compaction = opts.auto_compaction;
  self.prefix = PouchDB.prefix;

  if (typeof name !== 'string') {
    throw new Error('Missing/invalid DB name');
  }

  var prefixedName = (opts.prefix || '') + name;
  var backend = parseAdapter(prefixedName, opts);

  opts.name = backend.name;
  opts.adapter = opts.adapter || backend.adapter;

  self.name = name;
  self._adapter = opts.adapter;
  PouchDB.emit('debug', ['adapter', 'Picked adapter: ', opts.adapter]);

  if (!PouchDB.adapters[opts.adapter] ||
      !PouchDB.adapters[opts.adapter].valid()) {
    throw new Error('Invalid Adapter: ' + opts.adapter);
  }

  AbstractPouchDB.call(self);
  self.taskqueue = new TaskQueue();

  self.adapter = opts.adapter;

  PouchDB.adapters[opts.adapter].call(self, opts, function (err) {
    if (err) {
      return self.taskqueue.fail(err);
    }
    prepareForDestruction(self);

    self.emit('created', self);
    PouchDB.emit('created', self.name);
    self.taskqueue.ready(self);
  });

}

// AbortController was introduced quite a while after fetch and
// isnt required for PouchDB to function so polyfill if needed
var a = (typeof AbortController !== 'undefined')
    ? AbortController
    : function () { return {abort: function () {}}; };

var f$1 = fetch;
var h = Headers;

PouchDB.adapters = {};
PouchDB.preferredAdapters = [];

PouchDB.prefix = '_pouch_';

var eventEmitter = new events__WEBPACK_IMPORTED_MODULE_6___default.a();

function setUpEventEmitter(Pouch) {
  Object.keys(events__WEBPACK_IMPORTED_MODULE_6___default.a.prototype).forEach(function (key) {
    if (typeof events__WEBPACK_IMPORTED_MODULE_6___default.a.prototype[key] === 'function') {
      Pouch[key] = eventEmitter[key].bind(eventEmitter);
    }
  });

  // these are created in constructor.js, and allow us to notify each DB with
  // the same name that it was destroyed, via the constructor object
  var destructListeners = Pouch._destructionListeners = new ExportedMap();

  Pouch.on('ref', function onConstructorRef(db) {
    if (!destructListeners.has(db.name)) {
      destructListeners.set(db.name, []);
    }
    destructListeners.get(db.name).push(db);
  });

  Pouch.on('unref', function onConstructorUnref(db) {
    if (!destructListeners.has(db.name)) {
      return;
    }
    var dbList = destructListeners.get(db.name);
    var pos = dbList.indexOf(db);
    if (pos < 0) {
      /* istanbul ignore next */
      return;
    }
    dbList.splice(pos, 1);
    if (dbList.length > 1) {
      /* istanbul ignore next */
      destructListeners.set(db.name, dbList);
    } else {
      destructListeners.delete(db.name);
    }
  });

  Pouch.on('destroyed', function onConstructorDestroyed(name) {
    if (!destructListeners.has(name)) {
      return;
    }
    var dbList = destructListeners.get(name);
    destructListeners.delete(name);
    dbList.forEach(function (db) {
      db.emit('destroyed',true);
    });
  });
}

setUpEventEmitter(PouchDB);

PouchDB.adapter = function (id, obj, addToPreferredAdapters) {
  /* istanbul ignore else */
  if (obj.valid()) {
    PouchDB.adapters[id] = obj;
    if (addToPreferredAdapters) {
      PouchDB.preferredAdapters.push(id);
    }
  }
};

PouchDB.plugin = function (obj) {
  if (typeof obj === 'function') { // function style for plugins
    obj(PouchDB);
  } else if (typeof obj !== 'object' || Object.keys(obj).length === 0) {
    throw new Error('Invalid plugin: got "' + obj + '", expected an object or a function');
  } else {
    Object.keys(obj).forEach(function (id) { // object style for plugins
      PouchDB.prototype[id] = obj[id];
    });
  }
  if (this.__defaults) {
    PouchDB.__defaults = $inject_Object_assign({}, this.__defaults);
  }
  return PouchDB;
};

PouchDB.defaults = function (defaultOpts) {
  function PouchAlt(name, opts) {
    if (!(this instanceof PouchAlt)) {
      return new PouchAlt(name, opts);
    }

    opts = opts || {};

    if (name && typeof name === 'object') {
      opts = name;
      name = opts.name;
      delete opts.name;
    }

    opts = $inject_Object_assign({}, PouchAlt.__defaults, opts);
    PouchDB.call(this, name, opts);
  }

  inherits__WEBPACK_IMPORTED_MODULE_5___default()(PouchAlt, PouchDB);

  PouchAlt.preferredAdapters = PouchDB.preferredAdapters.slice();
  Object.keys(PouchDB).forEach(function (key) {
    if (!(key in PouchAlt)) {
      PouchAlt[key] = PouchDB[key];
    }
  });

  // make default options transitive
  // https://github.com/pouchdb/pouchdb/issues/5922
  PouchAlt.__defaults = $inject_Object_assign({}, this.__defaults, defaultOpts);

  return PouchAlt;
};

PouchDB.fetch = function (url, opts) {
  return f$1(url, opts);
};

// managed automatically by set-version.js
var version = "7.2.2";

// this would just be "return doc[field]", but fields
// can be "deep" due to dot notation
function getFieldFromDoc(doc, parsedField) {
  var value = doc;
  for (var i = 0, len = parsedField.length; i < len; i++) {
    var key = parsedField[i];
    value = value[key];
    if (!value) {
      break;
    }
  }
  return value;
}

function compare$1(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

// Converts a string in dot notation to an array of its components, with backslash escaping
function parseField(fieldName) {
  // fields may be deep (e.g. "foo.bar.baz"), so parse
  var fields = [];
  var current = '';
  for (var i = 0, len = fieldName.length; i < len; i++) {
    var ch = fieldName[i];
    if (ch === '.') {
      if (i > 0 && fieldName[i - 1] === '\\') { // escaped delimiter
        current = current.substring(0, current.length - 1) + '.';
      } else { // not escaped, so delimiter
        fields.push(current);
        current = '';
      }
    } else { // normal character
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

var combinationFields = ['$or', '$nor', '$not'];
function isCombinationalField(field) {
  return combinationFields.indexOf(field) > -1;
}

function getKey(obj) {
  return Object.keys(obj)[0];
}

function getValue(obj) {
  return obj[getKey(obj)];
}


// flatten an array of selectors joined by an $and operator
function mergeAndedSelectors(selectors) {

  // sort to ensure that e.g. if the user specified
  // $and: [{$gt: 'a'}, {$gt: 'b'}], then it's collapsed into
  // just {$gt: 'b'}
  var res = {};

  selectors.forEach(function (selector) {
    Object.keys(selector).forEach(function (field) {
      var matcher = selector[field];
      if (typeof matcher !== 'object') {
        matcher = {$eq: matcher};
      }

      if (isCombinationalField(field)) {
        if (matcher instanceof Array) {
          res[field] = matcher.map(function (m) {
            return mergeAndedSelectors([m]);
          });
        } else {
          res[field] = mergeAndedSelectors([matcher]);
        }
      } else {
        var fieldMatchers = res[field] = res[field] || {};
        Object.keys(matcher).forEach(function (operator) {
          var value = matcher[operator];

          if (operator === '$gt' || operator === '$gte') {
            return mergeGtGte(operator, value, fieldMatchers);
          } else if (operator === '$lt' || operator === '$lte') {
            return mergeLtLte(operator, value, fieldMatchers);
          } else if (operator === '$ne') {
            return mergeNe(value, fieldMatchers);
          } else if (operator === '$eq') {
            return mergeEq(value, fieldMatchers);
          }
          fieldMatchers[operator] = value;
        });
      }
    });
  });

  return res;
}



// collapse logically equivalent gt/gte values
function mergeGtGte(operator, value, fieldMatchers) {
  if (typeof fieldMatchers.$eq !== 'undefined') {
    return; // do nothing
  }
  if (typeof fieldMatchers.$gte !== 'undefined') {
    if (operator === '$gte') {
      if (value > fieldMatchers.$gte) { // more specificity
        fieldMatchers.$gte = value;
      }
    } else { // operator === '$gt'
      if (value >= fieldMatchers.$gte) { // more specificity
        delete fieldMatchers.$gte;
        fieldMatchers.$gt = value;
      }
    }
  } else if (typeof fieldMatchers.$gt !== 'undefined') {
    if (operator === '$gte') {
      if (value > fieldMatchers.$gt) { // more specificity
        delete fieldMatchers.$gt;
        fieldMatchers.$gte = value;
      }
    } else { // operator === '$gt'
      if (value > fieldMatchers.$gt) { // more specificity
        fieldMatchers.$gt = value;
      }
    }
  } else {
    fieldMatchers[operator] = value;
  }
}

// collapse logically equivalent lt/lte values
function mergeLtLte(operator, value, fieldMatchers) {
  if (typeof fieldMatchers.$eq !== 'undefined') {
    return; // do nothing
  }
  if (typeof fieldMatchers.$lte !== 'undefined') {
    if (operator === '$lte') {
      if (value < fieldMatchers.$lte) { // more specificity
        fieldMatchers.$lte = value;
      }
    } else { // operator === '$gt'
      if (value <= fieldMatchers.$lte) { // more specificity
        delete fieldMatchers.$lte;
        fieldMatchers.$lt = value;
      }
    }
  } else if (typeof fieldMatchers.$lt !== 'undefined') {
    if (operator === '$lte') {
      if (value < fieldMatchers.$lt) { // more specificity
        delete fieldMatchers.$lt;
        fieldMatchers.$lte = value;
      }
    } else { // operator === '$gt'
      if (value < fieldMatchers.$lt) { // more specificity
        fieldMatchers.$lt = value;
      }
    }
  } else {
    fieldMatchers[operator] = value;
  }
}

// combine $ne values into one array
function mergeNe(value, fieldMatchers) {
  if ('$ne' in fieldMatchers) {
    // there are many things this could "not" be
    fieldMatchers.$ne.push(value);
  } else { // doesn't exist yet
    fieldMatchers.$ne = [value];
  }
}

// add $eq into the mix
function mergeEq(value, fieldMatchers) {
  // these all have less specificity than the $eq
  // TODO: check for user errors here
  delete fieldMatchers.$gt;
  delete fieldMatchers.$gte;
  delete fieldMatchers.$lt;
  delete fieldMatchers.$lte;
  delete fieldMatchers.$ne;
  fieldMatchers.$eq = value;
}

//#7458: execute function mergeAndedSelectors on nested $and
function mergeAndedSelectorsNested(obj) {
    for (var prop in obj) {
        if (Array.isArray(obj)) {
            for (var i in obj) {
                if (obj[i]['$and']) {
                    obj[i] = mergeAndedSelectors(obj[i]['$and']);
                }
            }
        }
        var value = obj[prop];
        if (typeof value === 'object') {
            mergeAndedSelectorsNested(value); // <- recursive call
        }
    }
    return obj;
}

//#7458: determine id $and is present in selector (at any level)
function isAndInSelector(obj, isAnd) {
    for (var prop in obj) {
        if (prop === '$and') {
            isAnd = true;
        }
        var value = obj[prop];
        if (typeof value === 'object') {
            isAnd = isAndInSelector(value, isAnd); // <- recursive call
        }
    }
    return isAnd;
}

//
// normalize the selector
//
function massageSelector(input) {
  var result = clone(input);
  var wasAnded = false;
    //#7458: if $and is present in selector (at any level) merge nested $and
    if (isAndInSelector(result, false)) {
        result = mergeAndedSelectorsNested(result);
        if ('$and' in result) {
            result = mergeAndedSelectors(result['$and']);
        }
        wasAnded = true;
    }

  ['$or', '$nor'].forEach(function (orOrNor) {
    if (orOrNor in result) {
      // message each individual selector
      // e.g. {foo: 'bar'} becomes {foo: {$eq: 'bar'}}
      result[orOrNor].forEach(function (subSelector) {
        var fields = Object.keys(subSelector);
        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          var matcher = subSelector[field];
          if (typeof matcher !== 'object' || matcher === null) {
            subSelector[field] = {$eq: matcher};
          }
        }
      });
    }
  });

  if ('$not' in result) {
    //This feels a little like forcing, but it will work for now,
    //I would like to come back to this and make the merging of selectors a little more generic
    result['$not'] = mergeAndedSelectors([result['$not']]);
  }

  var fields = Object.keys(result);

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var matcher = result[field];

    if (typeof matcher !== 'object' || matcher === null) {
      matcher = {$eq: matcher};
    } else if ('$ne' in matcher && !wasAnded) {
      // I put these in an array, since there may be more than one
      // but in the "mergeAnded" operation, I already take care of that
      matcher.$ne = [matcher.$ne];
    }
    result[field] = matcher;
  }

  return result;
}

function pad(str, padWith, upToLength) {
  var padding = '';
  var targetLength = upToLength - str.length;
  /* istanbul ignore next */
  while (padding.length < targetLength) {
    padding += padWith;
  }
  return padding;
}

function padLeft(str, padWith, upToLength) {
  var padding = pad(str, padWith, upToLength);
  return padding + str;
}

var MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE
var MAGNITUDE_DIGITS = 3; // ditto
var SEP = ''; // set to '_' for easier debugging 

function collate(a, b) {

  if (a === b) {
    return 0;
  }

  a = normalizeKey(a);
  b = normalizeKey(b);

  var ai = collationIndex(a);
  var bi = collationIndex(b);
  if ((ai - bi) !== 0) {
    return ai - bi;
  }
  switch (typeof a) {
    case 'number':
      return a - b;
    case 'boolean':
      return a < b ? -1 : 1;
    case 'string':
      return stringCollate(a, b);
  }
  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
}

// couch considers null/NaN/Infinity/-Infinity === undefined,
// for the purposes of mapreduce indexes. also, dates get stringified.
function normalizeKey(key) {
  switch (typeof key) {
    case 'undefined':
      return null;
    case 'number':
      if (key === Infinity || key === -Infinity || isNaN(key)) {
        return null;
      }
      return key;
    case 'object':
      var origKey = key;
      if (Array.isArray(key)) {
        var len = key.length;
        key = new Array(len);
        for (var i = 0; i < len; i++) {
          key[i] = normalizeKey(origKey[i]);
        }
      /* istanbul ignore next */
      } else if (key instanceof Date) {
        return key.toJSON();
      } else if (key !== null) { // generic object
        key = {};
        for (var k in origKey) {
          if (origKey.hasOwnProperty(k)) {
            var val = origKey[k];
            if (typeof val !== 'undefined') {
              key[k] = normalizeKey(val);
            }
          }
        }
      }
  }
  return key;
}

function indexify(key) {
  if (key !== null) {
    switch (typeof key) {
      case 'boolean':
        return key ? 1 : 0;
      case 'number':
        return numToIndexableString(key);
      case 'string':
        // We've to be sure that key does not contain \u0000
        // Do order-preserving replacements:
        // 0 -> 1, 1
        // 1 -> 1, 2
        // 2 -> 2, 2
        /* eslint-disable no-control-regex */
        return key
          .replace(/\u0002/g, '\u0002\u0002')
          .replace(/\u0001/g, '\u0001\u0002')
          .replace(/\u0000/g, '\u0001\u0001');
        /* eslint-enable no-control-regex */
      case 'object':
        var isArray = Array.isArray(key);
        var arr = isArray ? key : Object.keys(key);
        var i = -1;
        var len = arr.length;
        var result = '';
        if (isArray) {
          while (++i < len) {
            result += toIndexableString(arr[i]);
          }
        } else {
          while (++i < len) {
            var objKey = arr[i];
            result += toIndexableString(objKey) +
                toIndexableString(key[objKey]);
          }
        }
        return result;
    }
  }
  return '';
}

// convert the given key to a string that would be appropriate
// for lexical sorting, e.g. within a database, where the
// sorting is the same given by the collate() function.
function toIndexableString(key) {
  var zero = '\u0000';
  key = normalizeKey(key);
  return collationIndex(key) + SEP + indexify(key) + zero;
}

function parseNumber(str, i) {
  var originalIdx = i;
  var num;
  var zero = str[i] === '1';
  if (zero) {
    num = 0;
    i++;
  } else {
    var neg = str[i] === '0';
    i++;
    var numAsString = '';
    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
    /* istanbul ignore next */
    if (neg) {
      magnitude = -magnitude;
    }
    i += MAGNITUDE_DIGITS;
    while (true) {
      var ch = str[i];
      if (ch === '\u0000') {
        break;
      } else {
        numAsString += ch;
      }
      i++;
    }
    numAsString = numAsString.split('.');
    if (numAsString.length === 1) {
      num = parseInt(numAsString, 10);
    } else {
      /* istanbul ignore next */
      num = parseFloat(numAsString[0] + '.' + numAsString[1]);
    }
    /* istanbul ignore next */
    if (neg) {
      num = num - 10;
    }
    /* istanbul ignore next */
    if (magnitude !== 0) {
      // parseFloat is more reliable than pow due to rounding errors
      // e.g. Number.MAX_VALUE would return Infinity if we did
      // num * Math.pow(10, magnitude);
      num = parseFloat(num + 'e' + magnitude);
    }
  }
  return {num: num, length : i - originalIdx};
}

// move up the stack while parsing
// this function moved outside of parseIndexableString for performance
function pop(stack, metaStack) {
  var obj = stack.pop();

  if (metaStack.length) {
    var lastMetaElement = metaStack[metaStack.length - 1];
    if (obj === lastMetaElement.element) {
      // popping a meta-element, e.g. an object whose value is another object
      metaStack.pop();
      lastMetaElement = metaStack[metaStack.length - 1];
    }
    var element = lastMetaElement.element;
    var lastElementIndex = lastMetaElement.index;
    if (Array.isArray(element)) {
      element.push(obj);
    } else if (lastElementIndex === stack.length - 2) { // obj with key+value
      var key = stack.pop();
      element[key] = obj;
    } else {
      stack.push(obj); // obj with key only
    }
  }
}

function parseIndexableString(str) {
  var stack = [];
  var metaStack = []; // stack for arrays and objects
  var i = 0;

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    var collationIndex = str[i++];
    if (collationIndex === '\u0000') {
      if (stack.length === 1) {
        return stack.pop();
      } else {
        pop(stack, metaStack);
        continue;
      }
    }
    switch (collationIndex) {
      case '1':
        stack.push(null);
        break;
      case '2':
        stack.push(str[i] === '1');
        i++;
        break;
      case '3':
        var parsedNum = parseNumber(str, i);
        stack.push(parsedNum.num);
        i += parsedNum.length;
        break;
      case '4':
        var parsedStr = '';
        /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
        while (true) {
          var ch = str[i];
          if (ch === '\u0000') {
            break;
          }
          parsedStr += ch;
          i++;
        }
        // perform the reverse of the order-preserving replacement
        // algorithm (see above)
        /* eslint-disable no-control-regex */
        parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000')
          .replace(/\u0001\u0002/g, '\u0001')
          .replace(/\u0002\u0002/g, '\u0002');
        /* eslint-enable no-control-regex */
        stack.push(parsedStr);
        break;
      case '5':
        var arrayElement = { element: [], index: stack.length };
        stack.push(arrayElement.element);
        metaStack.push(arrayElement);
        break;
      case '6':
        var objElement = { element: {}, index: stack.length };
        stack.push(objElement.element);
        metaStack.push(objElement);
        break;
      /* istanbul ignore next */
      default:
        throw new Error(
          'bad collationIndex or unexpectedly reached end of input: ' +
            collationIndex);
    }
  }
}

function arrayCollate(a, b) {
  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var sort = collate(a[i], b[i]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (a.length === b.length) ? 0 :
    (a.length > b.length) ? 1 : -1;
}
function stringCollate(a, b) {
  // See: https://github.com/daleharvey/pouchdb/issues/40
  // This is incompatible with the CouchDB implementation, but its the
  // best we can do for now
  return (a === b) ? 0 : ((a > b) ? 1 : -1);
}
function objectCollate(a, b) {
  var ak = Object.keys(a), bk = Object.keys(b);
  var len = Math.min(ak.length, bk.length);
  for (var i = 0; i < len; i++) {
    // First sort the keys
    var sort = collate(ak[i], bk[i]);
    if (sort !== 0) {
      return sort;
    }
    // if the keys are equal sort the values
    sort = collate(a[ak[i]], b[bk[i]]);
    if (sort !== 0) {
      return sort;
    }

  }
  return (ak.length === bk.length) ? 0 :
    (ak.length > bk.length) ? 1 : -1;
}
// The collation is defined by erlangs ordered terms
// the atoms null, true, false come first, then numbers, strings,
// arrays, then objects
// null/undefined/NaN/Infinity/-Infinity are all considered null
function collationIndex(x) {
  var id = ['boolean', 'number', 'string', 'object'];
  var idx = id.indexOf(typeof x);
  //false if -1 otherwise true, but fast!!!!1
  if (~idx) {
    if (x === null) {
      return 1;
    }
    if (Array.isArray(x)) {
      return 5;
    }
    return idx < 3 ? (idx + 2) : (idx + 3);
  }
  /* istanbul ignore next */
  if (Array.isArray(x)) {
    return 5;
  }
}

// conversion:
// x yyy zz...zz
// x = 0 for negative, 1 for 0, 2 for positive
// y = exponent (for negative numbers negated) moved so that it's >= 0
// z = mantisse
function numToIndexableString(num) {

  if (num === 0) {
    return '1';
  }

  // convert number to exponential format for easier and
  // more succinct string sorting
  var expFormat = num.toExponential().split(/e\+?/);
  var magnitude = parseInt(expFormat[1], 10);

  var neg = num < 0;

  var result = neg ? '0' : '2';

  // first sort by magnitude
  // it's easier if all magnitudes are positive
  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
  var magString = padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);

  result += SEP + magString;

  // then sort by the factor
  var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)
  /* istanbul ignore next */
  if (neg) { // for negative reverse ordering
    factor = 10 - factor;
  }

  var factorStr = factor.toFixed(20);

  // strip zeros from the end
  factorStr = factorStr.replace(/\.?0+$/, '');

  result += SEP + factorStr;

  return result;
}

// create a comparator based on the sort object
function createFieldSorter(sort) {

  function getFieldValuesAsArray(doc) {
    return sort.map(function (sorting) {
      var fieldName = getKey(sorting);
      var parsedField = parseField(fieldName);
      var docFieldValue = getFieldFromDoc(doc, parsedField);
      return docFieldValue;
    });
  }

  return function (aRow, bRow) {
    var aFieldValues = getFieldValuesAsArray(aRow.doc);
    var bFieldValues = getFieldValuesAsArray(bRow.doc);
    var collation = collate(aFieldValues, bFieldValues);
    if (collation !== 0) {
      return collation;
    }
    // this is what mango seems to do
    return compare$1(aRow.doc._id, bRow.doc._id);
  };
}

function filterInMemoryFields(rows, requestDef, inMemoryFields) {
  rows = rows.filter(function (row) {
    return rowFilter(row.doc, requestDef.selector, inMemoryFields);
  });

  if (requestDef.sort) {
    // in-memory sort
    var fieldSorter = createFieldSorter(requestDef.sort);
    rows = rows.sort(fieldSorter);
    if (typeof requestDef.sort[0] !== 'string' &&
        getValue(requestDef.sort[0]) === 'desc') {
      rows = rows.reverse();
    }
  }

  if ('limit' in requestDef || 'skip' in requestDef) {
    // have to do the limit in-memory
    var skip = requestDef.skip || 0;
    var limit = ('limit' in requestDef ? requestDef.limit : rows.length) + skip;
    rows = rows.slice(skip, limit);
  }
  return rows;
}

function rowFilter(doc, selector, inMemoryFields) {
  return inMemoryFields.every(function (field) {
    var matcher = selector[field];
    var parsedField = parseField(field);
    var docFieldValue = getFieldFromDoc(doc, parsedField);
    if (isCombinationalField(field)) {
      return matchCominationalSelector(field, matcher, doc);
    }

    return matchSelector(matcher, doc, parsedField, docFieldValue);
  });
}

function matchSelector(matcher, doc, parsedField, docFieldValue) {
  if (!matcher) {
    // no filtering necessary; this field is just needed for sorting
    return true;
  }

  // is matcher an object, if so continue recursion
  if (typeof matcher === 'object') {
    return Object.keys(matcher).every(function (userOperator) {
      var userValue = matcher[userOperator];
      return match(userOperator, doc, userValue, parsedField, docFieldValue);
    });
  }

  // no more depth, No need to recurse further
  return matcher === docFieldValue;
}

function matchCominationalSelector(field, matcher, doc) {

  if (field === '$or') {
    return matcher.some(function (orMatchers) {
      return rowFilter(doc, orMatchers, Object.keys(orMatchers));
    });
  }

  if (field === '$not') {
    return !rowFilter(doc, matcher, Object.keys(matcher));
  }

  //`$nor`
  return !matcher.find(function (orMatchers) {
    return rowFilter(doc, orMatchers, Object.keys(orMatchers));
  });

}

function match(userOperator, doc, userValue, parsedField, docFieldValue) {
  if (!matchers[userOperator]) {
    throw new Error('unknown operator "' + userOperator +
      '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, ' +
      '$nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
  }
  return matchers[userOperator](doc, userValue, parsedField, docFieldValue);
}

function fieldExists(docFieldValue) {
  return typeof docFieldValue !== 'undefined' && docFieldValue !== null;
}

function fieldIsNotUndefined(docFieldValue) {
  return typeof docFieldValue !== 'undefined';
}

function modField(docFieldValue, userValue) {
  var divisor = userValue[0];
  var mod = userValue[1];
  if (divisor === 0) {
    throw new Error('Bad divisor, cannot divide by zero');
  }

  if (parseInt(divisor, 10) !== divisor ) {
    throw new Error('Divisor is not an integer');
  }

  if (parseInt(mod, 10) !== mod ) {
    throw new Error('Modulus is not an integer');
  }

  if (parseInt(docFieldValue, 10) !== docFieldValue) {
    return false;
  }

  return docFieldValue % divisor === mod;
}

function arrayContainsValue(docFieldValue, userValue) {
  return userValue.some(function (val) {
    if (docFieldValue instanceof Array) {
      return docFieldValue.indexOf(val) > -1;
    }

    return docFieldValue === val;
  });
}

function arrayContainsAllValues(docFieldValue, userValue) {
  return userValue.every(function (val) {
    return docFieldValue.indexOf(val) > -1;
  });
}

function arraySize(docFieldValue, userValue) {
  return docFieldValue.length === userValue;
}

function regexMatch(docFieldValue, userValue) {
  var re = new RegExp(userValue);

  return re.test(docFieldValue);
}

function typeMatch(docFieldValue, userValue) {

  switch (userValue) {
    case 'null':
      return docFieldValue === null;
    case 'boolean':
      return typeof (docFieldValue) === 'boolean';
    case 'number':
      return typeof (docFieldValue) === 'number';
    case 'string':
      return typeof (docFieldValue) === 'string';
    case 'array':
      return docFieldValue instanceof Array;
    case 'object':
      return ({}).toString.call(docFieldValue) === '[object Object]';
  }

  throw new Error(userValue + ' not supported as a type.' +
                  'Please use one of object, string, array, number, boolean or null.');

}

var matchers = {

  '$elemMatch': function (doc, userValue, parsedField, docFieldValue) {
    if (!Array.isArray(docFieldValue)) {
      return false;
    }

    if (docFieldValue.length === 0) {
      return false;
    }

    if (typeof docFieldValue[0] === 'object') {
      return docFieldValue.some(function (val) {
        return rowFilter(val, userValue, Object.keys(userValue));
      });
    }

    return docFieldValue.some(function (val) {
      return matchSelector(userValue, doc, parsedField, val);
    });
  },

  '$allMatch': function (doc, userValue, parsedField, docFieldValue) {
    if (!Array.isArray(docFieldValue)) {
      return false;
    }

    /* istanbul ignore next */
    if (docFieldValue.length === 0) {
      return false;
    }

    if (typeof docFieldValue[0] === 'object') {
      return docFieldValue.every(function (val) {
        return rowFilter(val, userValue, Object.keys(userValue));
      });
    }

    return docFieldValue.every(function (val) {
      return matchSelector(userValue, doc, parsedField, val);
    });
  },

  '$eq': function (doc, userValue, parsedField, docFieldValue) {
    return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) === 0;
  },

  '$gte': function (doc, userValue, parsedField, docFieldValue) {
    return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) >= 0;
  },

  '$gt': function (doc, userValue, parsedField, docFieldValue) {
    return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) > 0;
  },

  '$lte': function (doc, userValue, parsedField, docFieldValue) {
    return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) <= 0;
  },

  '$lt': function (doc, userValue, parsedField, docFieldValue) {
    return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) < 0;
  },

  '$exists': function (doc, userValue, parsedField, docFieldValue) {
    //a field that is null is still considered to exist
    if (userValue) {
      return fieldIsNotUndefined(docFieldValue);
    }

    return !fieldIsNotUndefined(docFieldValue);
  },

  '$mod': function (doc, userValue, parsedField, docFieldValue) {
    return fieldExists(docFieldValue) && modField(docFieldValue, userValue);
  },

  '$ne': function (doc, userValue, parsedField, docFieldValue) {
    return userValue.every(function (neValue) {
      return collate(docFieldValue, neValue) !== 0;
    });
  },
  '$in': function (doc, userValue, parsedField, docFieldValue) {
    return fieldExists(docFieldValue) && arrayContainsValue(docFieldValue, userValue);
  },

  '$nin': function (doc, userValue, parsedField, docFieldValue) {
    return fieldExists(docFieldValue) && !arrayContainsValue(docFieldValue, userValue);
  },

  '$size': function (doc, userValue, parsedField, docFieldValue) {
    return fieldExists(docFieldValue) && arraySize(docFieldValue, userValue);
  },

  '$all': function (doc, userValue, parsedField, docFieldValue) {
    return Array.isArray(docFieldValue) && arrayContainsAllValues(docFieldValue, userValue);
  },

  '$regex': function (doc, userValue, parsedField, docFieldValue) {
    return fieldExists(docFieldValue) && regexMatch(docFieldValue, userValue);
  },

  '$type': function (doc, userValue, parsedField, docFieldValue) {
    return typeMatch(docFieldValue, userValue);
  }
};

// return true if the given doc matches the supplied selector
function matchesSelector(doc, selector) {
  /* istanbul ignore if */
  if (typeof selector !== 'object') {
    // match the CouchDB error message
    throw new Error('Selector error: expected a JSON object');
  }

  selector = massageSelector(selector);
  var row = {
    'doc': doc
  };

  var rowsMatched = filterInMemoryFields([row], { 'selector': selector }, Object.keys(selector));
  return rowsMatched && rowsMatched.length === 1;
}

function evalFilter(input) {
  return scopeEval('"use strict";\nreturn ' + input + ';', {});
}

function evalView(input) {
  var code = [
    'return function(doc) {',
    '  "use strict";',
    '  var emitted = false;',
    '  var emit = function (a, b) {',
    '    emitted = true;',
    '  };',
    '  var view = ' + input + ';',
    '  view(doc);',
    '  if (emitted) {',
    '    return true;',
    '  }',
    '};'
  ].join('\n');

  return scopeEval(code, {});
}

function validate(opts, callback) {
  if (opts.selector) {
    if (opts.filter && opts.filter !== '_selector') {
      var filterName = typeof opts.filter === 'string' ?
        opts.filter : 'function';
      return callback(new Error('selector invalid for filter "' + filterName + '"'));
    }
  }
  callback();
}

function normalize(opts) {
  if (opts.view && !opts.filter) {
    opts.filter = '_view';
  }

  if (opts.selector && !opts.filter) {
    opts.filter = '_selector';
  }

  if (opts.filter && typeof opts.filter === 'string') {
    if (opts.filter === '_view') {
      opts.view = normalizeDesignDocFunctionName(opts.view);
    } else {
      opts.filter = normalizeDesignDocFunctionName(opts.filter);
    }
  }
}

function shouldFilter(changesHandler, opts) {
  return opts.filter && typeof opts.filter === 'string' &&
    !opts.doc_ids && !isRemote(changesHandler.db);
}

function filter(changesHandler, opts) {
  var callback = opts.complete;
  if (opts.filter === '_view') {
    if (!opts.view || typeof opts.view !== 'string') {
      var err = createError(BAD_REQUEST,
        '`view` filter parameter not found or invalid.');
      return callback(err);
    }
    // fetch a view from a design doc, make it behave like a filter
    var viewName = parseDesignDocFunctionName(opts.view);
    changesHandler.db.get('_design/' + viewName[0], function (err, ddoc) {
      /* istanbul ignore if */
      if (changesHandler.isCancelled) {
        return callback(null, {status: 'cancelled'});
      }
      /* istanbul ignore next */
      if (err) {
        return callback(generateErrorFromResponse(err));
      }
      var mapFun = ddoc && ddoc.views && ddoc.views[viewName[1]] &&
        ddoc.views[viewName[1]].map;
      if (!mapFun) {
        return callback(createError(MISSING_DOC,
          (ddoc.views ? 'missing json key: ' + viewName[1] :
            'missing json key: views')));
      }
      opts.filter = evalView(mapFun);
      changesHandler.doChanges(opts);
    });
  } else if (opts.selector) {
    opts.filter = function (doc) {
      return matchesSelector(doc, opts.selector);
    };
    changesHandler.doChanges(opts);
  } else {
    // fetch a filter from a design doc
    var filterName = parseDesignDocFunctionName(opts.filter);
    changesHandler.db.get('_design/' + filterName[0], function (err, ddoc) {
      /* istanbul ignore if */
      if (changesHandler.isCancelled) {
        return callback(null, {status: 'cancelled'});
      }
      /* istanbul ignore next */
      if (err) {
        return callback(generateErrorFromResponse(err));
      }
      var filterFun = ddoc && ddoc.filters && ddoc.filters[filterName[1]];
      if (!filterFun) {
        return callback(createError(MISSING_DOC,
          ((ddoc && ddoc.filters) ? 'missing json key: ' + filterName[1]
            : 'missing json key: filters')));
      }
      opts.filter = evalFilter(filterFun);
      changesHandler.doChanges(opts);
    });
  }
}

function applyChangesFilterPlugin(PouchDB) {
  PouchDB._changesFilterPlugin = {
    validate: validate,
    normalize: normalize,
    shouldFilter: shouldFilter,
    filter: filter
  };
}

// TODO: remove from pouchdb-core (breaking)
PouchDB.plugin(applyChangesFilterPlugin);

PouchDB.version = version;

function toObject(array) {
  return array.reduce(function (obj, item) {
    obj[item] = true;
    return obj;
  }, {});
}
// List of top level reserved words for doc
var reservedWords = toObject([
  '_id',
  '_rev',
  '_attachments',
  '_deleted',
  '_revisions',
  '_revs_info',
  '_conflicts',
  '_deleted_conflicts',
  '_local_seq',
  '_rev_tree',
  //replication documents
  '_replication_id',
  '_replication_state',
  '_replication_state_time',
  '_replication_state_reason',
  '_replication_stats',
  // Specific to Couchbase Sync Gateway
  '_removed'
]);

// List of reserved words that should end up the document
var dataWords = toObject([
  '_attachments',
  //replication documents
  '_replication_id',
  '_replication_state',
  '_replication_state_time',
  '_replication_state_reason',
  '_replication_stats'
]);

function parseRevisionInfo(rev$$1) {
  if (!/^\d+-/.test(rev$$1)) {
    return createError(INVALID_REV);
  }
  var idx = rev$$1.indexOf('-');
  var left = rev$$1.substring(0, idx);
  var right = rev$$1.substring(idx + 1);
  return {
    prefix: parseInt(left, 10),
    id: right
  };
}

function makeRevTreeFromRevisions(revisions, opts) {
  var pos = revisions.start - revisions.ids.length + 1;

  var revisionIds = revisions.ids;
  var ids = [revisionIds[0], opts, []];

  for (var i = 1, len = revisionIds.length; i < len; i++) {
    ids = [revisionIds[i], {status: 'missing'}, [ids]];
  }

  return [{
    pos: pos,
    ids: ids
  }];
}

// Preprocess documents, parse their revisions, assign an id and a
// revision for new writes that are missing them, etc
function parseDoc(doc, newEdits, dbOpts) {
  if (!dbOpts) {
    dbOpts = {
      deterministic_revs: true
    };
  }

  var nRevNum;
  var newRevId;
  var revInfo;
  var opts = {status: 'available'};
  if (doc._deleted) {
    opts.deleted = true;
  }

  if (newEdits) {
    if (!doc._id) {
      doc._id = uuid();
    }
    newRevId = rev(doc, dbOpts.deterministic_revs);
    if (doc._rev) {
      revInfo = parseRevisionInfo(doc._rev);
      if (revInfo.error) {
        return revInfo;
      }
      doc._rev_tree = [{
        pos: revInfo.prefix,
        ids: [revInfo.id, {status: 'missing'}, [[newRevId, opts, []]]]
      }];
      nRevNum = revInfo.prefix + 1;
    } else {
      doc._rev_tree = [{
        pos: 1,
        ids : [newRevId, opts, []]
      }];
      nRevNum = 1;
    }
  } else {
    if (doc._revisions) {
      doc._rev_tree = makeRevTreeFromRevisions(doc._revisions, opts);
      nRevNum = doc._revisions.start;
      newRevId = doc._revisions.ids[0];
    }
    if (!doc._rev_tree) {
      revInfo = parseRevisionInfo(doc._rev);
      if (revInfo.error) {
        return revInfo;
      }
      nRevNum = revInfo.prefix;
      newRevId = revInfo.id;
      doc._rev_tree = [{
        pos: nRevNum,
        ids: [newRevId, opts, []]
      }];
    }
  }

  invalidIdError(doc._id);

  doc._rev = nRevNum + '-' + newRevId;

  var result = {metadata : {}, data : {}};
  for (var key in doc) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(doc, key)) {
      var specialKey = key[0] === '_';
      if (specialKey && !reservedWords[key]) {
        var error = createError(DOC_VALIDATION, key);
        error.message = DOC_VALIDATION.message + ': ' + key;
        throw error;
      } else if (specialKey && !dataWords[key]) {
        result.metadata[key.slice(1)] = doc[key];
      } else {
        result.data[key] = doc[key];
      }
    }
  }
  return result;
}

function parseBase64(data) {
  try {
    return thisAtob(data);
  } catch (e) {
    var err = createError(BAD_ARG,
      'Attachment is not a valid base64 string');
    return {error: err};
  }
}

function preprocessString(att, blobType, callback) {
  var asBinary = parseBase64(att.data);
  if (asBinary.error) {
    return callback(asBinary.error);
  }

  att.length = asBinary.length;
  if (blobType === 'blob') {
    att.data = binStringToBluffer(asBinary, att.content_type);
  } else if (blobType === 'base64') {
    att.data = thisBtoa(asBinary);
  } else { // binary
    att.data = asBinary;
  }
  binaryMd5(asBinary, function (result) {
    att.digest = 'md5-' + result;
    callback();
  });
}

function preprocessBlob(att, blobType, callback) {
  binaryMd5(att.data, function (md5) {
    att.digest = 'md5-' + md5;
    // size is for blobs (browser), length is for buffers (node)
    att.length = att.data.size || att.data.length || 0;
    if (blobType === 'binary') {
      blobToBinaryString(att.data, function (binString) {
        att.data = binString;
        callback();
      });
    } else if (blobType === 'base64') {
      blobToBase64(att.data, function (b64) {
        att.data = b64;
        callback();
      });
    } else {
      callback();
    }
  });
}

function preprocessAttachment(att, blobType, callback) {
  if (att.stub) {
    return callback();
  }
  if (typeof att.data === 'string') { // input is a base64 string
    preprocessString(att, blobType, callback);
  } else { // input is a blob
    preprocessBlob(att, blobType, callback);
  }
}

function preprocessAttachments(docInfos, blobType, callback) {

  if (!docInfos.length) {
    return callback();
  }

  var docv = 0;
  var overallErr;

  docInfos.forEach(function (docInfo) {
    var attachments = docInfo.data && docInfo.data._attachments ?
      Object.keys(docInfo.data._attachments) : [];
    var recv = 0;

    if (!attachments.length) {
      return done();
    }

    function processedAttachment(err) {
      overallErr = err;
      recv++;
      if (recv === attachments.length) {
        done();
      }
    }

    for (var key in docInfo.data._attachments) {
      if (docInfo.data._attachments.hasOwnProperty(key)) {
        preprocessAttachment(docInfo.data._attachments[key],
          blobType, processedAttachment);
      }
    }
  });

  function done() {
    docv++;
    if (docInfos.length === docv) {
      if (overallErr) {
        callback(overallErr);
      } else {
        callback();
      }
    }
  }
}

function updateDoc(revLimit, prev, docInfo, results,
                   i, cb, writeDoc, newEdits) {

  if (revExists(prev.rev_tree, docInfo.metadata.rev) && !newEdits) {
    results[i] = docInfo;
    return cb();
  }

  // sometimes this is pre-calculated. historically not always
  var previousWinningRev = prev.winningRev || winningRev(prev);
  var previouslyDeleted = 'deleted' in prev ? prev.deleted :
    isDeleted(prev, previousWinningRev);
  var deleted = 'deleted' in docInfo.metadata ? docInfo.metadata.deleted :
    isDeleted(docInfo.metadata);
  var isRoot = /^1-/.test(docInfo.metadata.rev);

  if (previouslyDeleted && !deleted && newEdits && isRoot) {
    var newDoc = docInfo.data;
    newDoc._rev = previousWinningRev;
    newDoc._id = docInfo.metadata.id;
    docInfo = parseDoc(newDoc, newEdits);
  }

  var merged = merge(prev.rev_tree, docInfo.metadata.rev_tree[0], revLimit);

  var inConflict = newEdits && ((
    (previouslyDeleted && deleted && merged.conflicts !== 'new_leaf') ||
    (!previouslyDeleted && merged.conflicts !== 'new_leaf') ||
    (previouslyDeleted && !deleted && merged.conflicts === 'new_branch')));

  if (inConflict) {
    var err = createError(REV_CONFLICT);
    results[i] = err;
    return cb();
  }

  var newRev = docInfo.metadata.rev;
  docInfo.metadata.rev_tree = merged.tree;
  docInfo.stemmedRevs = merged.stemmedRevs || [];
  /* istanbul ignore else */
  if (prev.rev_map) {
    docInfo.metadata.rev_map = prev.rev_map; // used only by leveldb
  }

  // recalculate
  var winningRev$$1 = winningRev(docInfo.metadata);
  var winningRevIsDeleted = isDeleted(docInfo.metadata, winningRev$$1);

  // calculate the total number of documents that were added/removed,
  // from the perspective of total_rows/doc_count
  var delta = (previouslyDeleted === winningRevIsDeleted) ? 0 :
    previouslyDeleted < winningRevIsDeleted ? -1 : 1;

  var newRevIsDeleted;
  if (newRev === winningRev$$1) {
    // if the new rev is the same as the winning rev, we can reuse that value
    newRevIsDeleted = winningRevIsDeleted;
  } else {
    // if they're not the same, then we need to recalculate
    newRevIsDeleted = isDeleted(docInfo.metadata, newRev);
  }

  writeDoc(docInfo, winningRev$$1, winningRevIsDeleted, newRevIsDeleted,
    true, delta, i, cb);
}

function rootIsMissing(docInfo) {
  return docInfo.metadata.rev_tree[0].ids[1].status === 'missing';
}

function processDocs(revLimit, docInfos, api, fetchedDocs, tx, results,
                     writeDoc, opts, overallCallback) {

  // Default to 1000 locally
  revLimit = revLimit || 1000;

  function insertDoc(docInfo, resultsIdx, callback) {
    // Cant insert new deleted documents
    var winningRev$$1 = winningRev(docInfo.metadata);
    var deleted = isDeleted(docInfo.metadata, winningRev$$1);
    if ('was_delete' in opts && deleted) {
      results[resultsIdx] = createError(MISSING_DOC, 'deleted');
      return callback();
    }

    // 4712 - detect whether a new document was inserted with a _rev
    var inConflict = newEdits && rootIsMissing(docInfo);

    if (inConflict) {
      var err = createError(REV_CONFLICT);
      results[resultsIdx] = err;
      return callback();
    }

    var delta = deleted ? 0 : 1;

    writeDoc(docInfo, winningRev$$1, deleted, deleted, false,
      delta, resultsIdx, callback);
  }

  var newEdits = opts.new_edits;
  var idsToDocs = new ExportedMap();

  var docsDone = 0;
  var docsToDo = docInfos.length;

  function checkAllDocsDone() {
    if (++docsDone === docsToDo && overallCallback) {
      overallCallback();
    }
  }

  docInfos.forEach(function (currentDoc, resultsIdx) {

    if (currentDoc._id && isLocalId(currentDoc._id)) {
      var fun = currentDoc._deleted ? '_removeLocal' : '_putLocal';
      api[fun](currentDoc, {ctx: tx}, function (err, res) {
        results[resultsIdx] = err || res;
        checkAllDocsDone();
      });
      return;
    }

    var id = currentDoc.metadata.id;
    if (idsToDocs.has(id)) {
      docsToDo--; // duplicate
      idsToDocs.get(id).push([currentDoc, resultsIdx]);
    } else {
      idsToDocs.set(id, [[currentDoc, resultsIdx]]);
    }
  });

  // in the case of new_edits, the user can provide multiple docs
  // with the same id. these need to be processed sequentially
  idsToDocs.forEach(function (docs, id) {
    var numDone = 0;

    function docWritten() {
      if (++numDone < docs.length) {
        nextDoc();
      } else {
        checkAllDocsDone();
      }
    }
    function nextDoc() {
      var value = docs[numDone];
      var currentDoc = value[0];
      var resultsIdx = value[1];

      if (fetchedDocs.has(id)) {
        updateDoc(revLimit, fetchedDocs.get(id), currentDoc, results,
          resultsIdx, docWritten, writeDoc, newEdits);
      } else {
        // Ensure stemming applies to new writes as well
        var merged = merge([], currentDoc.metadata.rev_tree[0], revLimit);
        currentDoc.metadata.rev_tree = merged.tree;
        currentDoc.stemmedRevs = merged.stemmedRevs || [];
        insertDoc(currentDoc, resultsIdx, docWritten);
      }
    }
    nextDoc();
  });
}

// IndexedDB requires a versioned database structure, so we use the
// version here to manage migrations.
var ADAPTER_VERSION = 5;

// The object stores created for each database
// DOC_STORE stores the document meta data, its revision history and state
// Keyed by document id
var DOC_STORE = 'document-store';
// BY_SEQ_STORE stores a particular version of a document, keyed by its
// sequence id
var BY_SEQ_STORE = 'by-sequence';
// Where we store attachments
var ATTACH_STORE = 'attach-store';
// Where we store many-to-many relations
// between attachment digests and seqs
var ATTACH_AND_SEQ_STORE = 'attach-seq-store';

// Where we store database-wide meta data in a single record
// keyed by id: META_STORE
var META_STORE = 'meta-store';
// Where we store local documents
var LOCAL_STORE = 'local-store';
// Where we detect blob support
var DETECT_BLOB_SUPPORT_STORE = 'detect-blob-support';

function safeJsonParse(str) {
  // This try/catch guards against stack overflow errors.
  // JSON.parse() is faster than vuvuzela.parse() but vuvuzela
  // cannot overflow.
  try {
    return JSON.parse(str);
  } catch (e) {
    /* istanbul ignore next */
    return vuvuzela__WEBPACK_IMPORTED_MODULE_3___default.a.parse(str);
  }
}

function safeJsonStringify(json) {
  try {
    return JSON.stringify(json);
  } catch (e) {
    /* istanbul ignore next */
    return vuvuzela__WEBPACK_IMPORTED_MODULE_3___default.a.stringify(json);
  }
}

function idbError(callback) {
  return function (evt) {
    var message = 'unknown_error';
    if (evt.target && evt.target.error) {
      message = evt.target.error.name || evt.target.error.message;
    }
    callback(createError(IDB_ERROR, message, evt.type));
  };
}

// Unfortunately, the metadata has to be stringified
// when it is put into the database, because otherwise
// IndexedDB can throw errors for deeply-nested objects.
// Originally we just used JSON.parse/JSON.stringify; now
// we use this custom vuvuzela library that avoids recursion.
// If we could do it all over again, we'd probably use a
// format for the revision trees other than JSON.
function encodeMetadata(metadata, winningRev, deleted) {
  return {
    data: safeJsonStringify(metadata),
    winningRev: winningRev,
    deletedOrLocal: deleted ? '1' : '0',
    seq: metadata.seq, // highest seq for this doc
    id: metadata.id
  };
}

function decodeMetadata(storedObject) {
  if (!storedObject) {
    return null;
  }
  var metadata = safeJsonParse(storedObject.data);
  metadata.winningRev = storedObject.winningRev;
  metadata.deleted = storedObject.deletedOrLocal === '1';
  metadata.seq = storedObject.seq;
  return metadata;
}

// read the doc back out from the database. we don't store the
// _id or _rev because we already have _doc_id_rev.
function decodeDoc(doc) {
  if (!doc) {
    return doc;
  }
  var idx = doc._doc_id_rev.lastIndexOf(':');
  doc._id = doc._doc_id_rev.substring(0, idx - 1);
  doc._rev = doc._doc_id_rev.substring(idx + 1);
  delete doc._doc_id_rev;
  return doc;
}

// Read a blob from the database, encoding as necessary
// and translating from base64 if the IDB doesn't support
// native Blobs
function readBlobData(body, type, asBlob, callback) {
  if (asBlob) {
    if (!body) {
      callback(createBlob([''], {type: type}));
    } else if (typeof body !== 'string') { // we have blob support
      callback(body);
    } else { // no blob support
      callback(b64ToBluffer(body, type));
    }
  } else { // as base64 string
    if (!body) {
      callback('');
    } else if (typeof body !== 'string') { // we have blob support
      readAsBinaryString(body, function (binary) {
        callback(thisBtoa(binary));
      });
    } else { // no blob support
      callback(body);
    }
  }
}

function fetchAttachmentsIfNecessary(doc, opts, txn, cb) {
  var attachments = Object.keys(doc._attachments || {});
  if (!attachments.length) {
    return cb && cb();
  }
  var numDone = 0;

  function checkDone() {
    if (++numDone === attachments.length && cb) {
      cb();
    }
  }

  function fetchAttachment(doc, att) {
    var attObj = doc._attachments[att];
    var digest = attObj.digest;
    var req = txn.objectStore(ATTACH_STORE).get(digest);
    req.onsuccess = function (e) {
      attObj.body = e.target.result.body;
      checkDone();
    };
  }

  attachments.forEach(function (att) {
    if (opts.attachments && opts.include_docs) {
      fetchAttachment(doc, att);
    } else {
      doc._attachments[att].stub = true;
      checkDone();
    }
  });
}

// IDB-specific postprocessing necessary because
// we don't know whether we stored a true Blob or
// a base64-encoded string, and if it's a Blob it
// needs to be read outside of the transaction context
function postProcessAttachments(results, asBlob) {
  return Promise.all(results.map(function (row) {
    if (row.doc && row.doc._attachments) {
      var attNames = Object.keys(row.doc._attachments);
      return Promise.all(attNames.map(function (att) {
        var attObj = row.doc._attachments[att];
        if (!('body' in attObj)) { // already processed
          return;
        }
        var body = attObj.body;
        var type = attObj.content_type;
        return new Promise(function (resolve) {
          readBlobData(body, type, asBlob, function (data) {
            row.doc._attachments[att] = $inject_Object_assign(
              pick(attObj, ['digest', 'content_type']),
              {data: data}
            );
            resolve();
          });
        });
      }));
    }
  }));
}

function compactRevs(revs, docId, txn) {

  var possiblyOrphanedDigests = [];
  var seqStore = txn.objectStore(BY_SEQ_STORE);
  var attStore = txn.objectStore(ATTACH_STORE);
  var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
  var count = revs.length;

  function checkDone() {
    count--;
    if (!count) { // done processing all revs
      deleteOrphanedAttachments();
    }
  }

  function deleteOrphanedAttachments() {
    if (!possiblyOrphanedDigests.length) {
      return;
    }
    possiblyOrphanedDigests.forEach(function (digest) {
      var countReq = attAndSeqStore.index('digestSeq').count(
        IDBKeyRange.bound(
          digest + '::', digest + '::\uffff', false, false));
      countReq.onsuccess = function (e) {
        var count = e.target.result;
        if (!count) {
          // orphaned
          attStore.delete(digest);
        }
      };
    });
  }

  revs.forEach(function (rev$$1) {
    var index = seqStore.index('_doc_id_rev');
    var key = docId + "::" + rev$$1;
    index.getKey(key).onsuccess = function (e) {
      var seq = e.target.result;
      if (typeof seq !== 'number') {
        return checkDone();
      }
      seqStore.delete(seq);

      var cursor = attAndSeqStore.index('seq')
        .openCursor(IDBKeyRange.only(seq));

      cursor.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          var digest = cursor.value.digestSeq.split('::')[0];
          possiblyOrphanedDigests.push(digest);
          attAndSeqStore.delete(cursor.primaryKey);
          cursor.continue();
        } else { // done
          checkDone();
        }
      };
    };
  });
}

function openTransactionSafely(idb, stores, mode) {
  try {
    return {
      txn: idb.transaction(stores, mode)
    };
  } catch (err) {
    return {
      error: err
    };
  }
}

var changesHandler = new Changes();

function idbBulkDocs(dbOpts, req, opts, api, idb, callback) {
  var docInfos = req.docs;
  var txn;
  var docStore;
  var bySeqStore;
  var attachStore;
  var attachAndSeqStore;
  var metaStore;
  var docInfoError;
  var metaDoc;

  for (var i = 0, len = docInfos.length; i < len; i++) {
    var doc = docInfos[i];
    if (doc._id && isLocalId(doc._id)) {
      continue;
    }
    doc = docInfos[i] = parseDoc(doc, opts.new_edits, dbOpts);
    if (doc.error && !docInfoError) {
      docInfoError = doc;
    }
  }

  if (docInfoError) {
    return callback(docInfoError);
  }

  var allDocsProcessed = false;
  var docCountDelta = 0;
  var results = new Array(docInfos.length);
  var fetchedDocs = new ExportedMap();
  var preconditionErrored = false;
  var blobType = api._meta.blobSupport ? 'blob' : 'base64';

  preprocessAttachments(docInfos, blobType, function (err) {
    if (err) {
      return callback(err);
    }
    startTransaction();
  });

  function startTransaction() {

    var stores = [
      DOC_STORE, BY_SEQ_STORE,
      ATTACH_STORE,
      LOCAL_STORE, ATTACH_AND_SEQ_STORE,
      META_STORE
    ];
    var txnResult = openTransactionSafely(idb, stores, 'readwrite');
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    txn = txnResult.txn;
    txn.onabort = idbError(callback);
    txn.ontimeout = idbError(callback);
    txn.oncomplete = complete;
    docStore = txn.objectStore(DOC_STORE);
    bySeqStore = txn.objectStore(BY_SEQ_STORE);
    attachStore = txn.objectStore(ATTACH_STORE);
    attachAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
    metaStore = txn.objectStore(META_STORE);

    metaStore.get(META_STORE).onsuccess = function (e) {
      metaDoc = e.target.result;
      updateDocCountIfReady();
    };

    verifyAttachments(function (err) {
      if (err) {
        preconditionErrored = true;
        return callback(err);
      }
      fetchExistingDocs();
    });
  }

  function onAllDocsProcessed() {
    allDocsProcessed = true;
    updateDocCountIfReady();
  }

  function idbProcessDocs() {
    processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs,
                txn, results, writeDoc, opts, onAllDocsProcessed);
  }

  function updateDocCountIfReady() {
    if (!metaDoc || !allDocsProcessed) {
      return;
    }
    // caching the docCount saves a lot of time in allDocs() and
    // info(), which is why we go to all the trouble of doing this
    metaDoc.docCount += docCountDelta;
    metaStore.put(metaDoc);
  }

  function fetchExistingDocs() {

    if (!docInfos.length) {
      return;
    }

    var numFetched = 0;

    function checkDone() {
      if (++numFetched === docInfos.length) {
        idbProcessDocs();
      }
    }

    function readMetadata(event) {
      var metadata = decodeMetadata(event.target.result);

      if (metadata) {
        fetchedDocs.set(metadata.id, metadata);
      }
      checkDone();
    }

    for (var i = 0, len = docInfos.length; i < len; i++) {
      var docInfo = docInfos[i];
      if (docInfo._id && isLocalId(docInfo._id)) {
        checkDone(); // skip local docs
        continue;
      }
      var req = docStore.get(docInfo.metadata.id);
      req.onsuccess = readMetadata;
    }
  }

  function complete() {
    if (preconditionErrored) {
      return;
    }

    changesHandler.notify(api._meta.name);
    callback(null, results);
  }

  function verifyAttachment(digest, callback) {

    var req = attachStore.get(digest);
    req.onsuccess = function (e) {
      if (!e.target.result) {
        var err = createError(MISSING_STUB,
          'unknown stub attachment with digest ' +
          digest);
        err.status = 412;
        callback(err);
      } else {
        callback();
      }
    };
  }

  function verifyAttachments(finish) {


    var digests = [];
    docInfos.forEach(function (docInfo) {
      if (docInfo.data && docInfo.data._attachments) {
        Object.keys(docInfo.data._attachments).forEach(function (filename) {
          var att = docInfo.data._attachments[filename];
          if (att.stub) {
            digests.push(att.digest);
          }
        });
      }
    });
    if (!digests.length) {
      return finish();
    }
    var numDone = 0;
    var err;

    function checkDone() {
      if (++numDone === digests.length) {
        finish(err);
      }
    }
    digests.forEach(function (digest) {
      verifyAttachment(digest, function (attErr) {
        if (attErr && !err) {
          err = attErr;
        }
        checkDone();
      });
    });
  }

  function writeDoc(docInfo, winningRev$$1, winningRevIsDeleted, newRevIsDeleted,
                    isUpdate, delta, resultsIdx, callback) {

    docInfo.metadata.winningRev = winningRev$$1;
    docInfo.metadata.deleted = winningRevIsDeleted;

    var doc = docInfo.data;
    doc._id = docInfo.metadata.id;
    doc._rev = docInfo.metadata.rev;

    if (newRevIsDeleted) {
      doc._deleted = true;
    }

    var hasAttachments = doc._attachments &&
      Object.keys(doc._attachments).length;
    if (hasAttachments) {
      return writeAttachments(docInfo, winningRev$$1, winningRevIsDeleted,
        isUpdate, resultsIdx, callback);
    }

    docCountDelta += delta;
    updateDocCountIfReady();

    finishDoc(docInfo, winningRev$$1, winningRevIsDeleted,
      isUpdate, resultsIdx, callback);
  }

  function finishDoc(docInfo, winningRev$$1, winningRevIsDeleted,
                     isUpdate, resultsIdx, callback) {

    var doc = docInfo.data;
    var metadata = docInfo.metadata;

    doc._doc_id_rev = metadata.id + '::' + metadata.rev;
    delete doc._id;
    delete doc._rev;

    function afterPutDoc(e) {
      var revsToDelete = docInfo.stemmedRevs || [];

      if (isUpdate && api.auto_compaction) {
        revsToDelete = revsToDelete.concat(compactTree(docInfo.metadata));
      }

      if (revsToDelete && revsToDelete.length) {
        compactRevs(revsToDelete, docInfo.metadata.id, txn);
      }

      metadata.seq = e.target.result;
      // Current _rev is calculated from _rev_tree on read
      // delete metadata.rev;
      var metadataToStore = encodeMetadata(metadata, winningRev$$1,
        winningRevIsDeleted);
      var metaDataReq = docStore.put(metadataToStore);
      metaDataReq.onsuccess = afterPutMetadata;
    }

    function afterPutDocError(e) {
      // ConstraintError, need to update, not put (see #1638 for details)
      e.preventDefault(); // avoid transaction abort
      e.stopPropagation(); // avoid transaction onerror
      var index = bySeqStore.index('_doc_id_rev');
      var getKeyReq = index.getKey(doc._doc_id_rev);
      getKeyReq.onsuccess = function (e) {
        var putReq = bySeqStore.put(doc, e.target.result);
        putReq.onsuccess = afterPutDoc;
      };
    }

    function afterPutMetadata() {
      results[resultsIdx] = {
        ok: true,
        id: metadata.id,
        rev: metadata.rev
      };
      fetchedDocs.set(docInfo.metadata.id, docInfo.metadata);
      insertAttachmentMappings(docInfo, metadata.seq, callback);
    }

    var putReq = bySeqStore.put(doc);

    putReq.onsuccess = afterPutDoc;
    putReq.onerror = afterPutDocError;
  }

  function writeAttachments(docInfo, winningRev$$1, winningRevIsDeleted,
                            isUpdate, resultsIdx, callback) {


    var doc = docInfo.data;

    var numDone = 0;
    var attachments = Object.keys(doc._attachments);

    function collectResults() {
      if (numDone === attachments.length) {
        finishDoc(docInfo, winningRev$$1, winningRevIsDeleted,
          isUpdate, resultsIdx, callback);
      }
    }

    function attachmentSaved() {
      numDone++;
      collectResults();
    }

    attachments.forEach(function (key) {
      var att = docInfo.data._attachments[key];
      if (!att.stub) {
        var data = att.data;
        delete att.data;
        att.revpos = parseInt(winningRev$$1, 10);
        var digest = att.digest;
        saveAttachment(digest, data, attachmentSaved);
      } else {
        numDone++;
        collectResults();
      }
    });
  }

  // map seqs to attachment digests, which
  // we will need later during compaction
  function insertAttachmentMappings(docInfo, seq, callback) {

    var attsAdded = 0;
    var attsToAdd = Object.keys(docInfo.data._attachments || {});

    if (!attsToAdd.length) {
      return callback();
    }

    function checkDone() {
      if (++attsAdded === attsToAdd.length) {
        callback();
      }
    }

    function add(att) {
      var digest = docInfo.data._attachments[att].digest;
      var req = attachAndSeqStore.put({
        seq: seq,
        digestSeq: digest + '::' + seq
      });

      req.onsuccess = checkDone;
      req.onerror = function (e) {
        // this callback is for a constaint error, which we ignore
        // because this docid/rev has already been associated with
        // the digest (e.g. when new_edits == false)
        e.preventDefault(); // avoid transaction abort
        e.stopPropagation(); // avoid transaction onerror
        checkDone();
      };
    }
    for (var i = 0; i < attsToAdd.length; i++) {
      add(attsToAdd[i]); // do in parallel
    }
  }

  function saveAttachment(digest, data, callback) {


    var getKeyReq = attachStore.count(digest);
    getKeyReq.onsuccess = function (e) {
      var count = e.target.result;
      if (count) {
        return callback(); // already exists
      }
      var newAtt = {
        digest: digest,
        body: data
      };
      var putReq = attachStore.put(newAtt);
      putReq.onsuccess = callback;
    };
  }
}

// Abstraction over IDBCursor and getAll()/getAllKeys() that allows us to batch our operations
// while falling back to a normal IDBCursor operation on browsers that don't support getAll() or
// getAllKeys(). This allows for a much faster implementation than just straight-up cursors, because
// we're not processing each document one-at-a-time.
function runBatchedCursor(objectStore, keyRange, descending, batchSize, onBatch) {

  if (batchSize === -1) {
    batchSize = 1000;
  }

  // Bail out of getAll()/getAllKeys() in the following cases:
  // 1) either method is unsupported - we need both
  // 2) batchSize is 1 (might as well use IDBCursor)
  // 3) descending – no real way to do this via getAll()/getAllKeys()

  var useGetAll = typeof objectStore.getAll === 'function' &&
    typeof objectStore.getAllKeys === 'function' &&
    batchSize > 1 && !descending;

  var keysBatch;
  var valuesBatch;
  var pseudoCursor;

  function onGetAll(e) {
    valuesBatch = e.target.result;
    if (keysBatch) {
      onBatch(keysBatch, valuesBatch, pseudoCursor);
    }
  }

  function onGetAllKeys(e) {
    keysBatch = e.target.result;
    if (valuesBatch) {
      onBatch(keysBatch, valuesBatch, pseudoCursor);
    }
  }

  function continuePseudoCursor() {
    if (!keysBatch.length) { // no more results
      return onBatch();
    }
    // fetch next batch, exclusive start
    var lastKey = keysBatch[keysBatch.length - 1];
    var newKeyRange;
    if (keyRange && keyRange.upper) {
      try {
        newKeyRange = IDBKeyRange.bound(lastKey, keyRange.upper,
          true, keyRange.upperOpen);
      } catch (e) {
        if (e.name === "DataError" && e.code === 0) {
          return onBatch(); // we're done, startkey and endkey are equal
        }
      }
    } else {
      newKeyRange = IDBKeyRange.lowerBound(lastKey, true);
    }
    keyRange = newKeyRange;
    keysBatch = null;
    valuesBatch = null;
    objectStore.getAll(keyRange, batchSize).onsuccess = onGetAll;
    objectStore.getAllKeys(keyRange, batchSize).onsuccess = onGetAllKeys;
  }

  function onCursor(e) {
    var cursor = e.target.result;
    if (!cursor) { // done
      return onBatch();
    }
    // regular IDBCursor acts like a batch where batch size is always 1
    onBatch([cursor.key], [cursor.value], cursor);
  }

  if (useGetAll) {
    pseudoCursor = {"continue": continuePseudoCursor};
    objectStore.getAll(keyRange, batchSize).onsuccess = onGetAll;
    objectStore.getAllKeys(keyRange, batchSize).onsuccess = onGetAllKeys;
  } else if (descending) {
    objectStore.openCursor(keyRange, 'prev').onsuccess = onCursor;
  } else {
    objectStore.openCursor(keyRange).onsuccess = onCursor;
  }
}

// simple shim for objectStore.getAll(), falling back to IDBCursor
function getAll(objectStore, keyRange, onSuccess) {
  if (typeof objectStore.getAll === 'function') {
    // use native getAll
    objectStore.getAll(keyRange).onsuccess = onSuccess;
    return;
  }
  // fall back to cursors
  var values = [];

  function onCursor(e) {
    var cursor = e.target.result;
    if (cursor) {
      values.push(cursor.value);
      cursor.continue();
    } else {
      onSuccess({
        target: {
          result: values
        }
      });
    }
  }

  objectStore.openCursor(keyRange).onsuccess = onCursor;
}

function allDocsKeys(keys, docStore, onBatch) {
  // It's not guaranted to be returned in right order  
  var valuesBatch = new Array(keys.length);
  var count = 0;
  keys.forEach(function (key, index) {
    docStore.get(key).onsuccess = function (event) {
      if (event.target.result) {
        valuesBatch[index] = event.target.result;
      } else {
        valuesBatch[index] = {key: key, error: 'not_found'};
      }
      count++;
      if (count === keys.length) {
        onBatch(keys, valuesBatch, {});
      }
    };
  });
}

function createKeyRange(start, end, inclusiveEnd, key, descending) {
  try {
    if (start && end) {
      if (descending) {
        return IDBKeyRange.bound(end, start, !inclusiveEnd, false);
      } else {
        return IDBKeyRange.bound(start, end, false, !inclusiveEnd);
      }
    } else if (start) {
      if (descending) {
        return IDBKeyRange.upperBound(start);
      } else {
        return IDBKeyRange.lowerBound(start);
      }
    } else if (end) {
      if (descending) {
        return IDBKeyRange.lowerBound(end, !inclusiveEnd);
      } else {
        return IDBKeyRange.upperBound(end, !inclusiveEnd);
      }
    } else if (key) {
      return IDBKeyRange.only(key);
    }
  } catch (e) {
    return {error: e};
  }
  return null;
}

function idbAllDocs(opts, idb, callback) {
  var start = 'startkey' in opts ? opts.startkey : false;
  var end = 'endkey' in opts ? opts.endkey : false;
  var key = 'key' in opts ? opts.key : false;
  var keys = 'keys' in opts ? opts.keys : false; 
  var skip = opts.skip || 0;
  var limit = typeof opts.limit === 'number' ? opts.limit : -1;
  var inclusiveEnd = opts.inclusive_end !== false;

  var keyRange ; 
  var keyRangeError;
  if (!keys) {
    keyRange = createKeyRange(start, end, inclusiveEnd, key, opts.descending);
    keyRangeError = keyRange && keyRange.error;
    if (keyRangeError && 
      !(keyRangeError.name === "DataError" && keyRangeError.code === 0)) {
      // DataError with error code 0 indicates start is less than end, so
      // can just do an empty query. Else need to throw
      return callback(createError(IDB_ERROR,
        keyRangeError.name, keyRangeError.message));
    }
  }

  var stores = [DOC_STORE, BY_SEQ_STORE, META_STORE];

  if (opts.attachments) {
    stores.push(ATTACH_STORE);
  }
  var txnResult = openTransactionSafely(idb, stores, 'readonly');
  if (txnResult.error) {
    return callback(txnResult.error);
  }
  var txn = txnResult.txn;
  txn.oncomplete = onTxnComplete;
  txn.onabort = idbError(callback);
  var docStore = txn.objectStore(DOC_STORE);
  var seqStore = txn.objectStore(BY_SEQ_STORE);
  var metaStore = txn.objectStore(META_STORE);
  var docIdRevIndex = seqStore.index('_doc_id_rev');
  var results = [];
  var docCount;
  var updateSeq;

  metaStore.get(META_STORE).onsuccess = function (e) {
    docCount = e.target.result.docCount;
  };

  /* istanbul ignore if */
  if (opts.update_seq) {
    getMaxUpdateSeq(seqStore, function (e) { 
      if (e.target.result && e.target.result.length > 0) {
        updateSeq = e.target.result[0];
      }
    });
  }

  function getMaxUpdateSeq(objectStore, onSuccess) {
    function onCursor(e) {
      var cursor = e.target.result;
      var maxKey = undefined;
      if (cursor && cursor.key) {
        maxKey = cursor.key;
      } 
      return onSuccess({
        target: {
          result: [maxKey]
        }
      });
    }
    objectStore.openCursor(null, 'prev').onsuccess = onCursor;
  }

  // if the user specifies include_docs=true, then we don't
  // want to block the main cursor while we're fetching the doc
  function fetchDocAsynchronously(metadata, row, winningRev$$1) {
    var key = metadata.id + "::" + winningRev$$1;
    docIdRevIndex.get(key).onsuccess =  function onGetDoc(e) {
      row.doc = decodeDoc(e.target.result) || {};
      if (opts.conflicts) {
        var conflicts = collectConflicts(metadata);
        if (conflicts.length) {
          row.doc._conflicts = conflicts;
        }
      }
      fetchAttachmentsIfNecessary(row.doc, opts, txn);
    };
  }

  function allDocsInner(winningRev$$1, metadata) {
    var row = {
      id: metadata.id,
      key: metadata.id,
      value: {
        rev: winningRev$$1
      }
    };
    var deleted = metadata.deleted;
    if (deleted) {
      if (keys) {
        results.push(row);
        // deleted docs are okay with "keys" requests
        row.value.deleted = true;
        row.doc = null;
      }
    } else if (skip-- <= 0) {
      results.push(row);
      if (opts.include_docs) {
        fetchDocAsynchronously(metadata, row, winningRev$$1);
      }
    }
  }

  function processBatch(batchValues) {
    for (var i = 0, len = batchValues.length; i < len; i++) {
      if (results.length === limit) {
        break;
      }
      var batchValue = batchValues[i];
      if (batchValue.error && keys) {
        // key was not found with "keys" requests
        results.push(batchValue);
        continue;
      }
      var metadata = decodeMetadata(batchValue);
      var winningRev$$1 = metadata.winningRev;
      allDocsInner(winningRev$$1, metadata);
    }
  }

  function onBatch(batchKeys, batchValues, cursor) {
    if (!cursor) {
      return;
    }
    processBatch(batchValues);
    if (results.length < limit) {
      cursor.continue();
    }
  }

  function onGetAll(e) {
    var values = e.target.result;
    if (opts.descending) {
      values = values.reverse();
    }
    processBatch(values);
  }

  function onResultsReady() {
    var returnVal = {
      total_rows: docCount,
      offset: opts.skip,
      rows: results
    };
    
    /* istanbul ignore if */
    if (opts.update_seq && updateSeq !== undefined) {
      returnVal.update_seq = updateSeq;
    }
    callback(null, returnVal);
  }

  function onTxnComplete() {
    if (opts.attachments) {
      postProcessAttachments(results, opts.binary).then(onResultsReady);
    } else {
      onResultsReady();
    }
  }

  // don't bother doing any requests if start > end or limit === 0
  if (keyRangeError || limit === 0) {
    return;
  }
  if (keys) {
    return allDocsKeys(opts.keys, docStore, onBatch);
  }
  if (limit === -1) { // just fetch everything
    return getAll(docStore, keyRange, onGetAll);
  }
  // else do a cursor
  // choose a batch size based on the skip, since we'll need to skip that many
  runBatchedCursor(docStore, keyRange, opts.descending, limit + skip, onBatch);
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
function checkBlobSupport(txn) {
  return new Promise(function (resolve) {
    var blob$$1 = createBlob(['']);
    var req = txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob$$1, 'key');

    req.onsuccess = function () {
      var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
      var matchedEdge = navigator.userAgent.match(/Edge\//);
      // MS Edge pretends to be Chrome 42:
      // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
      resolve(matchedEdge || !matchedChrome ||
        parseInt(matchedChrome[1], 10) >= 43);
    };

    req.onerror = txn.onabort = function (e) {
      // If the transaction aborts now its due to not being able to
      // write to the database, likely due to the disk being full
      e.preventDefault();
      e.stopPropagation();
      resolve(false);
    };
  }).catch(function () {
    return false; // error, so assume unsupported
  });
}

function countDocs(txn, cb) {
  var index = txn.objectStore(DOC_STORE).index('deletedOrLocal');
  index.count(IDBKeyRange.only('0')).onsuccess = function (e) {
    cb(e.target.result);
  };
}

// This task queue ensures that IDB open calls are done in their own tick

var running = false;
var queue = [];

function tryCode(fun, err, res, PouchDB) {
  try {
    fun(err, res);
  } catch (err) {
    // Shouldn't happen, but in some odd cases
    // IndexedDB implementations might throw a sync
    // error, in which case this will at least log it.
    PouchDB.emit('error', err);
  }
}

function applyNext() {
  if (running || !queue.length) {
    return;
  }
  running = true;
  queue.shift()();
}

function enqueueTask(action, callback, PouchDB) {
  queue.push(function runAction() {
    action(function runCallback(err, res) {
      tryCode(callback, err, res, PouchDB);
      running = false;
      immediate__WEBPACK_IMPORTED_MODULE_0___default()(function runNext() {
        applyNext(PouchDB);
      });
    });
  });
  applyNext();
}

function changes(opts, api, dbName, idb) {
  opts = clone(opts);

  if (opts.continuous) {
    var id = dbName + ':' + uuid();
    changesHandler.addListener(dbName, id, api, opts);
    changesHandler.notify(dbName);
    return {
      cancel: function () {
        changesHandler.removeListener(dbName, id);
      }
    };
  }

  var docIds = opts.doc_ids && new ExportedSet(opts.doc_ids);

  opts.since = opts.since || 0;
  var lastSeq = opts.since;

  var limit = 'limit' in opts ? opts.limit : -1;
  if (limit === 0) {
    limit = 1; // per CouchDB _changes spec
  }

  var results = [];
  var numResults = 0;
  var filter = filterChange(opts);
  var docIdsToMetadata = new ExportedMap();

  var txn;
  var bySeqStore;
  var docStore;
  var docIdRevIndex;

  function onBatch(batchKeys, batchValues, cursor) {
    if (!cursor || !batchKeys.length) { // done
      return;
    }

    var winningDocs = new Array(batchKeys.length);
    var metadatas = new Array(batchKeys.length);

    function processMetadataAndWinningDoc(metadata, winningDoc) {
      var change = opts.processChange(winningDoc, metadata, opts);
      lastSeq = change.seq = metadata.seq;

      var filtered = filter(change);
      if (typeof filtered === 'object') { // anything but true/false indicates error
        return Promise.reject(filtered);
      }

      if (!filtered) {
        return Promise.resolve();
      }
      numResults++;
      if (opts.return_docs) {
        results.push(change);
      }
      // process the attachment immediately
      // for the benefit of live listeners
      if (opts.attachments && opts.include_docs) {
        return new Promise(function (resolve) {
          fetchAttachmentsIfNecessary(winningDoc, opts, txn, function () {
            postProcessAttachments([change], opts.binary).then(function () {
              resolve(change);
            });
          });
        });
      } else {
        return Promise.resolve(change);
      }
    }

    function onBatchDone() {
      var promises = [];
      for (var i = 0, len = winningDocs.length; i < len; i++) {
        if (numResults === limit) {
          break;
        }
        var winningDoc = winningDocs[i];
        if (!winningDoc) {
          continue;
        }
        var metadata = metadatas[i];
        promises.push(processMetadataAndWinningDoc(metadata, winningDoc));
      }

      Promise.all(promises).then(function (changes) {
        for (var i = 0, len = changes.length; i < len; i++) {
          if (changes[i]) {
            opts.onChange(changes[i]);
          }
        }
      }).catch(opts.complete);

      if (numResults !== limit) {
        cursor.continue();
      }
    }

    // Fetch all metadatas/winningdocs from this batch in parallel, then process
    // them all only once all data has been collected. This is done in parallel
    // because it's faster than doing it one-at-a-time.
    var numDone = 0;
    batchValues.forEach(function (value, i) {
      var doc = decodeDoc(value);
      var seq = batchKeys[i];
      fetchWinningDocAndMetadata(doc, seq, function (metadata, winningDoc) {
        metadatas[i] = metadata;
        winningDocs[i] = winningDoc;
        if (++numDone === batchKeys.length) {
          onBatchDone();
        }
      });
    });
  }

  function onGetMetadata(doc, seq, metadata, cb) {
    if (metadata.seq !== seq) {
      // some other seq is later
      return cb();
    }

    if (metadata.winningRev === doc._rev) {
      // this is the winning doc
      return cb(metadata, doc);
    }

    // fetch winning doc in separate request
    var docIdRev = doc._id + '::' + metadata.winningRev;
    var req = docIdRevIndex.get(docIdRev);
    req.onsuccess = function (e) {
      cb(metadata, decodeDoc(e.target.result));
    };
  }

  function fetchWinningDocAndMetadata(doc, seq, cb) {
    if (docIds && !docIds.has(doc._id)) {
      return cb();
    }

    var metadata = docIdsToMetadata.get(doc._id);
    if (metadata) { // cached
      return onGetMetadata(doc, seq, metadata, cb);
    }
    // metadata not cached, have to go fetch it
    docStore.get(doc._id).onsuccess = function (e) {
      metadata = decodeMetadata(e.target.result);
      docIdsToMetadata.set(doc._id, metadata);
      onGetMetadata(doc, seq, metadata, cb);
    };
  }

  function finish() {
    opts.complete(null, {
      results: results,
      last_seq: lastSeq
    });
  }

  function onTxnComplete() {
    if (!opts.continuous && opts.attachments) {
      // cannot guarantee that postProcessing was already done,
      // so do it again
      postProcessAttachments(results).then(finish);
    } else {
      finish();
    }
  }

  var objectStores = [DOC_STORE, BY_SEQ_STORE];
  if (opts.attachments) {
    objectStores.push(ATTACH_STORE);
  }
  var txnResult = openTransactionSafely(idb, objectStores, 'readonly');
  if (txnResult.error) {
    return opts.complete(txnResult.error);
  }
  txn = txnResult.txn;
  txn.onabort = idbError(opts.complete);
  txn.oncomplete = onTxnComplete;

  bySeqStore = txn.objectStore(BY_SEQ_STORE);
  docStore = txn.objectStore(DOC_STORE);
  docIdRevIndex = bySeqStore.index('_doc_id_rev');

  var keyRange = (opts.since && !opts.descending) ?
    IDBKeyRange.lowerBound(opts.since, true) : null;

  runBatchedCursor(bySeqStore, keyRange, opts.descending, limit, onBatch);
}

var cachedDBs = new ExportedMap();
var blobSupportPromise;
var openReqList = new ExportedMap();

function IdbPouch(opts, callback) {
  var api = this;

  enqueueTask(function (thisCallback) {
    init(api, opts, thisCallback);
  }, callback, api.constructor);
}

function init(api, opts, callback) {

  var dbName = opts.name;

  var idb = null;
  api._meta = null;

  // called when creating a fresh new database
  function createSchema(db) {
    var docStore = db.createObjectStore(DOC_STORE, {keyPath : 'id'});
    db.createObjectStore(BY_SEQ_STORE, {autoIncrement: true})
      .createIndex('_doc_id_rev', '_doc_id_rev', {unique: true});
    db.createObjectStore(ATTACH_STORE, {keyPath: 'digest'});
    db.createObjectStore(META_STORE, {keyPath: 'id', autoIncrement: false});
    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);

    // added in v2
    docStore.createIndex('deletedOrLocal', 'deletedOrLocal', {unique : false});

    // added in v3
    db.createObjectStore(LOCAL_STORE, {keyPath: '_id'});

    // added in v4
    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,
      {autoIncrement: true});
    attAndSeqStore.createIndex('seq', 'seq');
    attAndSeqStore.createIndex('digestSeq', 'digestSeq', {unique: true});
  }

  // migration to version 2
  // unfortunately "deletedOrLocal" is a misnomer now that we no longer
  // store local docs in the main doc-store, but whaddyagonnado
  function addDeletedOrLocalIndex(txn, callback) {
    var docStore = txn.objectStore(DOC_STORE);
    docStore.createIndex('deletedOrLocal', 'deletedOrLocal', {unique : false});

    docStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        var metadata = cursor.value;
        var deleted = isDeleted(metadata);
        metadata.deletedOrLocal = deleted ? "1" : "0";
        docStore.put(metadata);
        cursor.continue();
      } else {
        callback();
      }
    };
  }

  // migration to version 3 (part 1)
  function createLocalStoreSchema(db) {
    db.createObjectStore(LOCAL_STORE, {keyPath: '_id'})
      .createIndex('_doc_id_rev', '_doc_id_rev', {unique: true});
  }

  // migration to version 3 (part 2)
  function migrateLocalStore(txn, cb) {
    var localStore = txn.objectStore(LOCAL_STORE);
    var docStore = txn.objectStore(DOC_STORE);
    var seqStore = txn.objectStore(BY_SEQ_STORE);

    var cursor = docStore.openCursor();
    cursor.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        var metadata = cursor.value;
        var docId = metadata.id;
        var local = isLocalId(docId);
        var rev$$1 = winningRev(metadata);
        if (local) {
          var docIdRev = docId + "::" + rev$$1;
          // remove all seq entries
          // associated with this docId
          var start = docId + "::";
          var end = docId + "::~";
          var index = seqStore.index('_doc_id_rev');
          var range = IDBKeyRange.bound(start, end, false, false);
          var seqCursor = index.openCursor(range);
          seqCursor.onsuccess = function (e) {
            seqCursor = e.target.result;
            if (!seqCursor) {
              // done
              docStore.delete(cursor.primaryKey);
              cursor.continue();
            } else {
              var data = seqCursor.value;
              if (data._doc_id_rev === docIdRev) {
                localStore.put(data);
              }
              seqStore.delete(seqCursor.primaryKey);
              seqCursor.continue();
            }
          };
        } else {
          cursor.continue();
        }
      } else if (cb) {
        cb();
      }
    };
  }

  // migration to version 4 (part 1)
  function addAttachAndSeqStore(db) {
    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,
      {autoIncrement: true});
    attAndSeqStore.createIndex('seq', 'seq');
    attAndSeqStore.createIndex('digestSeq', 'digestSeq', {unique: true});
  }

  // migration to version 4 (part 2)
  function migrateAttsAndSeqs(txn, callback) {
    var seqStore = txn.objectStore(BY_SEQ_STORE);
    var attStore = txn.objectStore(ATTACH_STORE);
    var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);

    // need to actually populate the table. this is the expensive part,
    // so as an optimization, check first that this database even
    // contains attachments
    var req = attStore.count();
    req.onsuccess = function (e) {
      var count = e.target.result;
      if (!count) {
        return callback(); // done
      }

      seqStore.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) {
          return callback(); // done
        }
        var doc = cursor.value;
        var seq = cursor.primaryKey;
        var atts = Object.keys(doc._attachments || {});
        var digestMap = {};
        for (var j = 0; j < atts.length; j++) {
          var att = doc._attachments[atts[j]];
          digestMap[att.digest] = true; // uniq digests, just in case
        }
        var digests = Object.keys(digestMap);
        for (j = 0; j < digests.length; j++) {
          var digest = digests[j];
          attAndSeqStore.put({
            seq: seq,
            digestSeq: digest + '::' + seq
          });
        }
        cursor.continue();
      };
    };
  }

  // migration to version 5
  // Instead of relying on on-the-fly migration of metadata,
  // this brings the doc-store to its modern form:
  // - metadata.winningrev
  // - metadata.seq
  // - stringify the metadata when storing it
  function migrateMetadata(txn) {

    function decodeMetadataCompat(storedObject) {
      if (!storedObject.data) {
        // old format, when we didn't store it stringified
        storedObject.deleted = storedObject.deletedOrLocal === '1';
        return storedObject;
      }
      return decodeMetadata(storedObject);
    }

    // ensure that every metadata has a winningRev and seq,
    // which was previously created on-the-fly but better to migrate
    var bySeqStore = txn.objectStore(BY_SEQ_STORE);
    var docStore = txn.objectStore(DOC_STORE);
    var cursor = docStore.openCursor();
    cursor.onsuccess = function (e) {
      var cursor = e.target.result;
      if (!cursor) {
        return; // done
      }
      var metadata = decodeMetadataCompat(cursor.value);

      metadata.winningRev = metadata.winningRev ||
        winningRev(metadata);

      function fetchMetadataSeq() {
        // metadata.seq was added post-3.2.0, so if it's missing,
        // we need to fetch it manually
        var start = metadata.id + '::';
        var end = metadata.id + '::\uffff';
        var req = bySeqStore.index('_doc_id_rev').openCursor(
          IDBKeyRange.bound(start, end));

        var metadataSeq = 0;
        req.onsuccess = function (e) {
          var cursor = e.target.result;
          if (!cursor) {
            metadata.seq = metadataSeq;
            return onGetMetadataSeq();
          }
          var seq = cursor.primaryKey;
          if (seq > metadataSeq) {
            metadataSeq = seq;
          }
          cursor.continue();
        };
      }

      function onGetMetadataSeq() {
        var metadataToStore = encodeMetadata(metadata,
          metadata.winningRev, metadata.deleted);

        var req = docStore.put(metadataToStore);
        req.onsuccess = function () {
          cursor.continue();
        };
      }

      if (metadata.seq) {
        return onGetMetadataSeq();
      }

      fetchMetadataSeq();
    };

  }

  api._remote = false;
  api.type = function () {
    return 'idb';
  };

  api._id = toPromise(function (callback) {
    callback(null, api._meta.instanceId);
  });

  api._bulkDocs = function idb_bulkDocs(req, reqOpts, callback) {
    idbBulkDocs(opts, req, reqOpts, api, idb, callback);
  };

  // First we look up the metadata in the ids database, then we fetch the
  // current revision(s) from the by sequence store
  api._get = function idb_get(id, opts, callback) {
    var doc;
    var metadata;
    var err;
    var txn = opts.ctx;
    if (!txn) {
      var txnResult = openTransactionSafely(idb,
        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], 'readonly');
      if (txnResult.error) {
        return callback(txnResult.error);
      }
      txn = txnResult.txn;
    }

    function finish() {
      callback(err, {doc: doc, metadata: metadata, ctx: txn});
    }

    txn.objectStore(DOC_STORE).get(id).onsuccess = function (e) {
      metadata = decodeMetadata(e.target.result);
      // we can determine the result here if:
      // 1. there is no such document
      // 2. the document is deleted and we don't ask about specific rev
      // When we ask with opts.rev we expect the answer to be either
      // doc (possibly with _deleted=true) or missing error
      if (!metadata) {
        err = createError(MISSING_DOC, 'missing');
        return finish();
      }

      var rev$$1;
      if (!opts.rev) {
        rev$$1 = metadata.winningRev;
        var deleted = isDeleted(metadata);
        if (deleted) {
          err = createError(MISSING_DOC, "deleted");
          return finish();
        }
      } else {
        rev$$1 = opts.latest ? latest(opts.rev, metadata) : opts.rev;
      }

      var objectStore = txn.objectStore(BY_SEQ_STORE);
      var key = metadata.id + '::' + rev$$1;

      objectStore.index('_doc_id_rev').get(key).onsuccess = function (e) {
        doc = e.target.result;
        if (doc) {
          doc = decodeDoc(doc);
        }
        if (!doc) {
          err = createError(MISSING_DOC, 'missing');
          return finish();
        }
        finish();
      };
    };
  };

  api._getAttachment = function (docId, attachId, attachment, opts, callback) {
    var txn;
    if (opts.ctx) {
      txn = opts.ctx;
    } else {
      var txnResult = openTransactionSafely(idb,
        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], 'readonly');
      if (txnResult.error) {
        return callback(txnResult.error);
      }
      txn = txnResult.txn;
    }
    var digest = attachment.digest;
    var type = attachment.content_type;

    txn.objectStore(ATTACH_STORE).get(digest).onsuccess = function (e) {
      var body = e.target.result.body;
      readBlobData(body, type, opts.binary, function (blobData) {
        callback(null, blobData);
      });
    };
  };

  api._info = function idb_info(callback) {
    var updateSeq;
    var docCount;

    var txnResult = openTransactionSafely(idb, [META_STORE, BY_SEQ_STORE], 'readonly');
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    var txn = txnResult.txn;
    txn.objectStore(META_STORE).get(META_STORE).onsuccess = function (e) {
      docCount = e.target.result.docCount;
    };
    txn.objectStore(BY_SEQ_STORE).openCursor(null, 'prev').onsuccess = function (e) {
      var cursor = e.target.result;
      updateSeq = cursor ? cursor.key : 0;
    };

    txn.oncomplete = function () {
      callback(null, {
        doc_count: docCount,
        update_seq: updateSeq,
        // for debugging
        idb_attachment_format: (api._meta.blobSupport ? 'binary' : 'base64')
      });
    };
  };

  api._allDocs = function idb_allDocs(opts, callback) {
    idbAllDocs(opts, idb, callback);
  };

  api._changes = function idbChanges(opts) {
    return changes(opts, api, dbName, idb);
  };

  api._close = function (callback) {
    // https://developer.mozilla.org/en-US/docs/IndexedDB/IDBDatabase#close
    // "Returns immediately and closes the connection in a separate thread..."
    idb.close();
    cachedDBs.delete(dbName);
    callback();
  };

  api._getRevisionTree = function (docId, callback) {
    var txnResult = openTransactionSafely(idb, [DOC_STORE], 'readonly');
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    var txn = txnResult.txn;
    var req = txn.objectStore(DOC_STORE).get(docId);
    req.onsuccess = function (event) {
      var doc = decodeMetadata(event.target.result);
      if (!doc) {
        callback(createError(MISSING_DOC));
      } else {
        callback(null, doc.rev_tree);
      }
    };
  };

  // This function removes revisions of document docId
  // which are listed in revs and sets this document
  // revision to to rev_tree
  api._doCompaction = function (docId, revs, callback) {
    var stores = [
      DOC_STORE,
      BY_SEQ_STORE,
      ATTACH_STORE,
      ATTACH_AND_SEQ_STORE
    ];
    var txnResult = openTransactionSafely(idb, stores, 'readwrite');
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    var txn = txnResult.txn;

    var docStore = txn.objectStore(DOC_STORE);

    docStore.get(docId).onsuccess = function (event) {
      var metadata = decodeMetadata(event.target.result);
      traverseRevTree(metadata.rev_tree, function (isLeaf, pos,
                                                         revHash, ctx, opts) {
        var rev$$1 = pos + '-' + revHash;
        if (revs.indexOf(rev$$1) !== -1) {
          opts.status = 'missing';
        }
      });
      compactRevs(revs, docId, txn);
      var winningRev$$1 = metadata.winningRev;
      var deleted = metadata.deleted;
      txn.objectStore(DOC_STORE).put(
        encodeMetadata(metadata, winningRev$$1, deleted));
    };
    txn.onabort = idbError(callback);
    txn.oncomplete = function () {
      callback();
    };
  };


  api._getLocal = function (id, callback) {
    var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readonly');
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    var tx = txnResult.txn;
    var req = tx.objectStore(LOCAL_STORE).get(id);

    req.onerror = idbError(callback);
    req.onsuccess = function (e) {
      var doc = e.target.result;
      if (!doc) {
        callback(createError(MISSING_DOC));
      } else {
        delete doc['_doc_id_rev']; // for backwards compat
        callback(null, doc);
      }
    };
  };

  api._putLocal = function (doc, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    delete doc._revisions; // ignore this, trust the rev
    var oldRev = doc._rev;
    var id = doc._id;
    if (!oldRev) {
      doc._rev = '0-1';
    } else {
      doc._rev = '0-' + (parseInt(oldRev.split('-')[1], 10) + 1);
    }

    var tx = opts.ctx;
    var ret;
    if (!tx) {
      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readwrite');
      if (txnResult.error) {
        return callback(txnResult.error);
      }
      tx = txnResult.txn;
      tx.onerror = idbError(callback);
      tx.oncomplete = function () {
        if (ret) {
          callback(null, ret);
        }
      };
    }

    var oStore = tx.objectStore(LOCAL_STORE);
    var req;
    if (oldRev) {
      req = oStore.get(id);
      req.onsuccess = function (e) {
        var oldDoc = e.target.result;
        if (!oldDoc || oldDoc._rev !== oldRev) {
          callback(createError(REV_CONFLICT));
        } else { // update
          var req = oStore.put(doc);
          req.onsuccess = function () {
            ret = {ok: true, id: doc._id, rev: doc._rev};
            if (opts.ctx) { // return immediately
              callback(null, ret);
            }
          };
        }
      };
    } else { // new doc
      req = oStore.add(doc);
      req.onerror = function (e) {
        // constraint error, already exists
        callback(createError(REV_CONFLICT));
        e.preventDefault(); // avoid transaction abort
        e.stopPropagation(); // avoid transaction onerror
      };
      req.onsuccess = function () {
        ret = {ok: true, id: doc._id, rev: doc._rev};
        if (opts.ctx) { // return immediately
          callback(null, ret);
        }
      };
    }
  };

  api._removeLocal = function (doc, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    var tx = opts.ctx;
    if (!tx) {
      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readwrite');
      if (txnResult.error) {
        return callback(txnResult.error);
      }
      tx = txnResult.txn;
      tx.oncomplete = function () {
        if (ret) {
          callback(null, ret);
        }
      };
    }
    var ret;
    var id = doc._id;
    var oStore = tx.objectStore(LOCAL_STORE);
    var req = oStore.get(id);

    req.onerror = idbError(callback);
    req.onsuccess = function (e) {
      var oldDoc = e.target.result;
      if (!oldDoc || oldDoc._rev !== doc._rev) {
        callback(createError(MISSING_DOC));
      } else {
        oStore.delete(id);
        ret = {ok: true, id: id, rev: '0-0'};
        if (opts.ctx) { // return immediately
          callback(null, ret);
        }
      }
    };
  };

  api._destroy = function (opts, callback) {
    changesHandler.removeAllListeners(dbName);

    //Close open request for "dbName" database to fix ie delay.
    var openReq = openReqList.get(dbName);
    if (openReq && openReq.result) {
      openReq.result.close();
      cachedDBs.delete(dbName);
    }
    var req = indexedDB.deleteDatabase(dbName);

    req.onsuccess = function () {
      //Remove open request from the list.
      openReqList.delete(dbName);
      if (hasLocalStorage() && (dbName in localStorage)) {
        delete localStorage[dbName];
      }
      callback(null, { 'ok': true });
    };

    req.onerror = idbError(callback);
  };

  var cached = cachedDBs.get(dbName);

  if (cached) {
    idb = cached.idb;
    api._meta = cached.global;
    return immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      callback(null, api);
    });
  }

  var req = indexedDB.open(dbName, ADAPTER_VERSION);
  openReqList.set(dbName, req);

  req.onupgradeneeded = function (e) {
    var db = e.target.result;
    if (e.oldVersion < 1) {
      return createSchema(db); // new db, initial schema
    }
    // do migrations

    var txn = e.currentTarget.transaction;
    // these migrations have to be done in this function, before
    // control is returned to the event loop, because IndexedDB

    if (e.oldVersion < 3) {
      createLocalStoreSchema(db); // v2 -> v3
    }
    if (e.oldVersion < 4) {
      addAttachAndSeqStore(db); // v3 -> v4
    }

    var migrations = [
      addDeletedOrLocalIndex, // v1 -> v2
      migrateLocalStore,      // v2 -> v3
      migrateAttsAndSeqs,     // v3 -> v4
      migrateMetadata         // v4 -> v5
    ];

    var i = e.oldVersion;

    function next() {
      var migration = migrations[i - 1];
      i++;
      if (migration) {
        migration(txn, next);
      }
    }

    next();
  };

  req.onsuccess = function (e) {

    idb = e.target.result;

    idb.onversionchange = function () {
      idb.close();
      cachedDBs.delete(dbName);
    };

    idb.onabort = function (e) {
      guardedConsole('error', 'Database has a global failure', e.target.error);
      idb.close();
      cachedDBs.delete(dbName);
    };

    // Do a few setup operations (in parallel as much as possible):
    // 1. Fetch meta doc
    // 2. Check blob support
    // 3. Calculate docCount
    // 4. Generate an instanceId if necessary
    // 5. Store docCount and instanceId on meta doc

    var txn = idb.transaction([
      META_STORE,
      DETECT_BLOB_SUPPORT_STORE,
      DOC_STORE
    ], 'readwrite');

    var storedMetaDoc = false;
    var metaDoc;
    var docCount;
    var blobSupport;
    var instanceId;

    function completeSetup() {
      if (typeof blobSupport === 'undefined' || !storedMetaDoc) {
        return;
      }
      api._meta = {
        name: dbName,
        instanceId: instanceId,
        blobSupport: blobSupport
      };

      cachedDBs.set(dbName, {
        idb: idb,
        global: api._meta
      });
      callback(null, api);
    }

    function storeMetaDocIfReady() {
      if (typeof docCount === 'undefined' || typeof metaDoc === 'undefined') {
        return;
      }
      var instanceKey = dbName + '_id';
      if (instanceKey in metaDoc) {
        instanceId = metaDoc[instanceKey];
      } else {
        metaDoc[instanceKey] = instanceId = uuid();
      }
      metaDoc.docCount = docCount;
      txn.objectStore(META_STORE).put(metaDoc);
    }

    //
    // fetch or generate the instanceId
    //
    txn.objectStore(META_STORE).get(META_STORE).onsuccess = function (e) {
      metaDoc = e.target.result || { id: META_STORE };
      storeMetaDocIfReady();
    };

    //
    // countDocs
    //
    countDocs(txn, function (count) {
      docCount = count;
      storeMetaDocIfReady();
    });

    //
    // check blob support
    //
    if (!blobSupportPromise) {
      // make sure blob support is only checked once
      blobSupportPromise = checkBlobSupport(txn);
    }

    blobSupportPromise.then(function (val) {
      blobSupport = val;
      completeSetup();
    });

    // only when the metadata put transaction has completed,
    // consider the setup done
    txn.oncomplete = function () {
      storedMetaDoc = true;
      completeSetup();
    };
    txn.onabort = idbError(callback);
  };

  req.onerror = function (e) {
    var msg = e.target.error && e.target.error.message;

    if (!msg) {
      msg = 'Failed to open indexedDB, are you in private browsing mode?';
    } else if (msg.indexOf("stored database is a higher version") !== -1) {
      msg = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter');
    }

    guardedConsole('error', msg);
    callback(createError(IDB_ERROR, msg));
  };
}

IdbPouch.valid = function () {
  // Following #7085 buggy idb versions (typically Safari < 10.1) are
  // considered valid.

  // On Firefox SecurityError is thrown while referencing indexedDB if cookies
  // are not allowed. `typeof indexedDB` also triggers the error.
  try {
    // some outdated implementations of IDB that appear on Samsung
    // and HTC Android devices <4.4 are missing IDBKeyRange
    return typeof indexedDB !== 'undefined' && typeof IDBKeyRange !== 'undefined';
  } catch (e) {
    return false;
  }
};

function IDBPouch (PouchDB) {
  PouchDB.adapter('idb', IdbPouch, true);
}

// dead simple promise pool, inspired by https://github.com/timdp/es6-promise-pool
// but much smaller in code size. limits the number of concurrent promises that are executed


function pool(promiseFactories, limit) {
  return new Promise(function (resolve, reject) {
    var running = 0;
    var current = 0;
    var done = 0;
    var len = promiseFactories.length;
    var err;

    function runNext() {
      running++;
      promiseFactories[current++]().then(onSuccess, onError);
    }

    function doNext() {
      if (++done === len) {
        /* istanbul ignore if */
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      } else {
        runNextBatch();
      }
    }

    function onSuccess() {
      running--;
      doNext();
    }

    /* istanbul ignore next */
    function onError(thisErr) {
      running--;
      err = err || thisErr;
      doNext();
    }

    function runNextBatch() {
      while (running < limit && current < len) {
        runNext();
      }
    }

    runNextBatch();
  });
}

var CHANGES_BATCH_SIZE = 25;
var MAX_SIMULTANEOUS_REVS = 50;
var CHANGES_TIMEOUT_BUFFER = 5000;
var DEFAULT_HEARTBEAT = 10000;

var supportsBulkGetMap = {};

function readAttachmentsAsBlobOrBuffer(row) {
  var doc = row.doc || row.ok;
  var atts = doc && doc._attachments;
  if (!atts) {
    return;
  }
  Object.keys(atts).forEach(function (filename) {
    var att = atts[filename];
    att.data = b64ToBluffer(att.data, att.content_type);
  });
}

function encodeDocId(id) {
  if (/^_design/.test(id)) {
    return '_design/' + encodeURIComponent(id.slice(8));
  }
  if (/^_local/.test(id)) {
    return '_local/' + encodeURIComponent(id.slice(7));
  }
  return encodeURIComponent(id);
}

function preprocessAttachments$1(doc) {
  if (!doc._attachments || !Object.keys(doc._attachments)) {
    return Promise.resolve();
  }

  return Promise.all(Object.keys(doc._attachments).map(function (key) {
    var attachment = doc._attachments[key];
    if (attachment.data && typeof attachment.data !== 'string') {
      return new Promise(function (resolve) {
        blobToBase64(attachment.data, resolve);
      }).then(function (b64) {
        attachment.data = b64;
      });
    }
  }));
}

function hasUrlPrefix(opts) {
  if (!opts.prefix) {
    return false;
  }
  var protocol = parseUri(opts.prefix).protocol;
  return protocol === 'http' || protocol === 'https';
}

// Get all the information you possibly can about the URI given by name and
// return it as a suitable object.
function getHost(name, opts) {
  // encode db name if opts.prefix is a url (#5574)
  if (hasUrlPrefix(opts)) {
    var dbName = opts.name.substr(opts.prefix.length);
    // Ensure prefix has a trailing slash
    var prefix = opts.prefix.replace(/\/?$/, '/');
    name = prefix + encodeURIComponent(dbName);
  }

  var uri = parseUri(name);
  if (uri.user || uri.password) {
    uri.auth = {username: uri.user, password: uri.password};
  }

  // Split the path part of the URI into parts using '/' as the delimiter
  // after removing any leading '/' and any trailing '/'
  var parts = uri.path.replace(/(^\/|\/$)/g, '').split('/');

  uri.db = parts.pop();
  // Prevent double encoding of URI component
  if (uri.db.indexOf('%') === -1) {
    uri.db = encodeURIComponent(uri.db);
  }

  uri.path = parts.join('/');

  return uri;
}

// Generate a URL with the host data given by opts and the given path
function genDBUrl(opts, path) {
  return genUrl(opts, opts.db + '/' + path);
}

// Generate a URL with the host data given by opts and the given path
function genUrl(opts, path) {
  // If the host already has a path, then we need to have a path delimiter
  // Otherwise, the path delimiter is the empty string
  var pathDel = !opts.path ? '' : '/';

  // If the host already has a path, then we need to have a path delimiter
  // Otherwise, the path delimiter is the empty string
  return opts.protocol + '://' + opts.host +
         (opts.port ? (':' + opts.port) : '') +
         '/' + opts.path + pathDel + path;
}

function paramsToStr(params) {
  return '?' + Object.keys(params).map(function (k) {
    return k + '=' + encodeURIComponent(params[k]);
  }).join('&');
}

function shouldCacheBust(opts) {
  var ua = (typeof navigator !== 'undefined' && navigator.userAgent) ?
      navigator.userAgent.toLowerCase() : '';
  var isIE = ua.indexOf('msie') !== -1;
  var isTrident = ua.indexOf('trident') !== -1;
  var isEdge = ua.indexOf('edge') !== -1;
  var isGET = !('method' in opts) || opts.method === 'GET';
  return (isIE || isTrident || isEdge) && isGET;
}

// Implements the PouchDB API for dealing with CouchDB instances over HTTP
function HttpPouch(opts, callback) {

  // The functions that will be publicly available for HttpPouch
  var api = this;

  var host = getHost(opts.name, opts);
  var dbUrl = genDBUrl(host, '');

  opts = clone(opts);

  var ourFetch = function (url, options) {

    options = options || {};
    options.headers = options.headers || new h();

    options.credentials = 'include';

    if (opts.auth || host.auth) {
      var nAuth = opts.auth || host.auth;
      var str = nAuth.username + ':' + nAuth.password;
      var token = thisBtoa(unescape(encodeURIComponent(str)));
      options.headers.set('Authorization', 'Basic ' + token);
    }

    var headers = opts.headers || {};
    Object.keys(headers).forEach(function (key) {
      options.headers.append(key, headers[key]);
    });

    /* istanbul ignore if */
    if (shouldCacheBust(options)) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + '_nonce=' + Date.now();
    }

    var fetchFun = opts.fetch || f$1;
    return fetchFun(url, options);
  };

  function adapterFun$$1(name, fun) {
    return adapterFun(name, argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
      setup().then(function () {
        return fun.apply(this, args);
      }).catch(function (e) {
        var callback = args.pop();
        callback(e);
      });
    })).bind(api);
  }

  function fetchJSON(url, options, callback) {

    var result = {};

    options = options || {};
    options.headers = options.headers || new h();

    if (!options.headers.get('Content-Type')) {
      options.headers.set('Content-Type', 'application/json');
    }
    if (!options.headers.get('Accept')) {
      options.headers.set('Accept', 'application/json');
    }

    return ourFetch(url, options).then(function (response) {
      result.ok = response.ok;
      result.status = response.status;
      return response.json();
    }).then(function (json) {
      result.data = json;
      if (!result.ok) {
        result.data.status = result.status;
        var err = generateErrorFromResponse(result.data);
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }

      if (Array.isArray(result.data)) {
        result.data = result.data.map(function (v) {
          if (v.error || v.missing) {
            return generateErrorFromResponse(v);
          } else {
            return v;
          }
        });
      }

      if (callback) {
        callback(null, result.data);
      } else {
        return result;
      }
    });
  }

  var setupPromise;

  function setup() {
    if (opts.skip_setup) {
      return Promise.resolve();
    }

    // If there is a setup in process or previous successful setup
    // done then we will use that
    // If previous setups have been rejected we will try again
    if (setupPromise) {
      return setupPromise;
    }

    setupPromise = fetchJSON(dbUrl).catch(function (err) {
      if (err && err.status && err.status === 404) {
        // Doesnt exist, create it
        explainError(404, 'PouchDB is just detecting if the remote exists.');
        return fetchJSON(dbUrl, {method: 'PUT'});
      } else {
        return Promise.reject(err);
      }
    }).catch(function (err) {
      // If we try to create a database that already exists, skipped in
      // istanbul since its catching a race condition.
      /* istanbul ignore if */
      if (err && err.status && err.status === 412) {
        return true;
      }
      return Promise.reject(err);
    });

    setupPromise.catch(function () {
      setupPromise = null;
    });

    return setupPromise;
  }

  immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    callback(null, api);
  });

  api._remote = true;

  /* istanbul ignore next */
  api.type = function () {
    return 'http';
  };

  api.id = adapterFun$$1('id', function (callback) {
    ourFetch(genUrl(host, '')).then(function (response) {
      return response.json();
    }).catch(function () {
      return {};
    }).then(function (result) {
      // Bad response or missing `uuid` should not prevent ID generation.
      var uuid$$1 = (result && result.uuid) ?
          (result.uuid + host.db) : genDBUrl(host, '');
      callback(null, uuid$$1);
    });
  });

  // Sends a POST request to the host calling the couchdb _compact function
  //    version: The version of CouchDB it is running
  api.compact = adapterFun$$1('compact', function (opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = clone(opts);

    fetchJSON(genDBUrl(host, '_compact'), {method: 'POST'}).then(function () {
      function ping() {
        api.info(function (err, res) {
          // CouchDB may send a "compact_running:true" if it's
          // already compacting. PouchDB Server doesn't.
          /* istanbul ignore else */
          if (res && !res.compact_running) {
            callback(null, {ok: true});
          } else {
            setTimeout(ping, opts.interval || 200);
          }
        });
      }
      // Ping the http if it's finished compaction
      ping();
    });
  });

  api.bulkGet = adapterFun('bulkGet', function (opts, callback) {
    var self = this;

    function doBulkGet(cb) {
      var params = {};
      if (opts.revs) {
        params.revs = true;
      }
      if (opts.attachments) {
        /* istanbul ignore next */
        params.attachments = true;
      }
      if (opts.latest) {
        params.latest = true;
      }
      fetchJSON(genDBUrl(host, '_bulk_get' + paramsToStr(params)), {
        method: 'POST',
        body: JSON.stringify({ docs: opts.docs})
      }).then(function (result) {
        if (opts.attachments && opts.binary) {
          result.data.results.forEach(function (res) {
            res.docs.forEach(readAttachmentsAsBlobOrBuffer);
          });
        }
        cb(null, result.data);
      }).catch(cb);
    }

    /* istanbul ignore next */
    function doBulkGetShim() {
      // avoid "url too long error" by splitting up into multiple requests
      var batchSize = MAX_SIMULTANEOUS_REVS;
      var numBatches = Math.ceil(opts.docs.length / batchSize);
      var numDone = 0;
      var results = new Array(numBatches);

      function onResult(batchNum) {
        return function (err, res) {
          // err is impossible because shim returns a list of errs in that case
          results[batchNum] = res.results;
          if (++numDone === numBatches) {
            callback(null, {results: flatten(results)});
          }
        };
      }

      for (var i = 0; i < numBatches; i++) {
        var subOpts = pick(opts, ['revs', 'attachments', 'binary', 'latest']);
        subOpts.docs = opts.docs.slice(i * batchSize,
          Math.min(opts.docs.length, (i + 1) * batchSize));
        bulkGet(self, subOpts, onResult(i));
      }
    }

    // mark the whole database as either supporting or not supporting _bulk_get
    var dbUrl = genUrl(host, '');
    var supportsBulkGet = supportsBulkGetMap[dbUrl];

    /* istanbul ignore next */
    if (typeof supportsBulkGet !== 'boolean') {
      // check if this database supports _bulk_get
      doBulkGet(function (err, res) {
        if (err) {
          supportsBulkGetMap[dbUrl] = false;
          explainError(
            err.status,
            'PouchDB is just detecting if the remote ' +
            'supports the _bulk_get API.'
          );
          doBulkGetShim();
        } else {
          supportsBulkGetMap[dbUrl] = true;
          callback(null, res);
        }
      });
    } else if (supportsBulkGet) {
      doBulkGet(callback);
    } else {
      doBulkGetShim();
    }
  });

  // Calls GET on the host, which gets back a JSON string containing
  //    couchdb: A welcome string
  //    version: The version of CouchDB it is running
  api._info = function (callback) {
    setup().then(function () {
      return ourFetch(genDBUrl(host, ''));
    }).then(function (response) {
      return response.json();
    }).then(function (info) {
      info.host = genDBUrl(host, '');
      callback(null, info);
    }).catch(callback);
  };

  api.fetch = function (path, options) {
    return setup().then(function () {
      var url = path.substring(0, 1) === '/' ?
        genUrl(host, path.substring(1)) :
        genDBUrl(host, path);
      return ourFetch(url, options);
    });
  };

  // Get the document with the given id from the database given by host.
  // The id could be solely the _id in the database, or it may be a
  // _design/ID or _local/ID path
  api.get = adapterFun$$1('get', function (id, opts, callback) {
    // If no options were given, set the callback to the second parameter
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = clone(opts);

    // List of parameters to add to the GET request
    var params = {};

    if (opts.revs) {
      params.revs = true;
    }

    if (opts.revs_info) {
      params.revs_info = true;
    }

    if (opts.latest) {
      params.latest = true;
    }

    if (opts.open_revs) {
      if (opts.open_revs !== "all") {
        opts.open_revs = JSON.stringify(opts.open_revs);
      }
      params.open_revs = opts.open_revs;
    }

    if (opts.rev) {
      params.rev = opts.rev;
    }

    if (opts.conflicts) {
      params.conflicts = opts.conflicts;
    }

    /* istanbul ignore if */
    if (opts.update_seq) {
      params.update_seq = opts.update_seq;
    }

    id = encodeDocId(id);

    function fetchAttachments(doc) {
      var atts = doc._attachments;
      var filenames = atts && Object.keys(atts);
      if (!atts || !filenames.length) {
        return;
      }
      // we fetch these manually in separate XHRs, because
      // Sync Gateway would normally send it back as multipart/mixed,
      // which we cannot parse. Also, this is more efficient than
      // receiving attachments as base64-encoded strings.
      function fetchData(filename) {
        var att = atts[filename];
        var path = encodeDocId(doc._id) + '/' + encodeAttachmentId(filename) +
            '?rev=' + doc._rev;
        return ourFetch(genDBUrl(host, path)).then(function (response) {
          if ('buffer' in response) {
            return response.buffer();
          } else {
            /* istanbul ignore next */
            return response.blob();
          }
        }).then(function (blob) {
          if (opts.binary) {
            var typeFieldDescriptor = Object.getOwnPropertyDescriptor(blob.__proto__, 'type');
            if (!typeFieldDescriptor || typeFieldDescriptor.set) {
              blob.type = att.content_type;
            }
            return blob;
          }
          return new Promise(function (resolve) {
            blobToBase64(blob, resolve);
          });
        }).then(function (data) {
          delete att.stub;
          delete att.length;
          att.data = data;
        });
      }

      var promiseFactories = filenames.map(function (filename) {
        return function () {
          return fetchData(filename);
        };
      });

      // This limits the number of parallel xhr requests to 5 any time
      // to avoid issues with maximum browser request limits
      return pool(promiseFactories, 5);
    }

    function fetchAllAttachments(docOrDocs) {
      if (Array.isArray(docOrDocs)) {
        return Promise.all(docOrDocs.map(function (doc) {
          if (doc.ok) {
            return fetchAttachments(doc.ok);
          }
        }));
      }
      return fetchAttachments(docOrDocs);
    }

    var url = genDBUrl(host, id + paramsToStr(params));
    fetchJSON(url).then(function (res) {
      return Promise.resolve().then(function () {
        if (opts.attachments) {
          return fetchAllAttachments(res.data);
        }
      }).then(function () {
        callback(null, res.data);
      });
    }).catch(function (e) {
      e.docId = id;
      callback(e);
    });
  });


  // Delete the document given by doc from the database given by host.
  api.remove = adapterFun$$1('remove', function (docOrId, optsOrRev, opts, cb) {
    var doc;
    if (typeof optsOrRev === 'string') {
      // id, rev, opts, callback style
      doc = {
        _id: docOrId,
        _rev: optsOrRev
      };
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }
    } else {
      // doc, opts, callback style
      doc = docOrId;
      if (typeof optsOrRev === 'function') {
        cb = optsOrRev;
        opts = {};
      } else {
        cb = opts;
        opts = optsOrRev;
      }
    }

    var rev$$1 = (doc._rev || opts.rev);
    var url = genDBUrl(host, encodeDocId(doc._id)) + '?rev=' + rev$$1;

    fetchJSON(url, {method: 'DELETE'}, cb).catch(cb);
  });

  function encodeAttachmentId(attachmentId) {
    return attachmentId.split("/").map(encodeURIComponent).join("/");
  }

  // Get the attachment
  api.getAttachment = adapterFun$$1('getAttachment', function (docId, attachmentId,
                                                            opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    var params = opts.rev ? ('?rev=' + opts.rev) : '';
    var url = genDBUrl(host, encodeDocId(docId)) + '/' +
        encodeAttachmentId(attachmentId) + params;
    var contentType;
    ourFetch(url, {method: 'GET'}).then(function (response) {
      contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw response;
      } else {
        if (typeof process !== 'undefined' && !true && typeof response.buffer === 'function') {
          return response.buffer();
        } else {
          /* istanbul ignore next */
          return response.blob();
        }
      }
    }).then(function (blob) {
      // TODO: also remove
      if (typeof process !== 'undefined' && !true) {
        blob.type = contentType;
      }
      callback(null, blob);
    }).catch(function (err) {
      callback(err);
    });
  });

  // Remove the attachment given by the id and rev
  api.removeAttachment =  adapterFun$$1('removeAttachment', function (docId,
                                                                   attachmentId,
                                                                   rev$$1,
                                                                   callback) {
    var url = genDBUrl(host, encodeDocId(docId) + '/' +
                       encodeAttachmentId(attachmentId)) + '?rev=' + rev$$1;
    fetchJSON(url, {method: 'DELETE'}, callback).catch(callback);
  });

  // Add the attachment given by blob and its contentType property
  // to the document with the given id, the revision given by rev, and
  // add it to the database given by host.
  api.putAttachment = adapterFun$$1('putAttachment', function (docId, attachmentId,
                                                            rev$$1, blob,
                                                            type, callback) {
    if (typeof type === 'function') {
      callback = type;
      type = blob;
      blob = rev$$1;
      rev$$1 = null;
    }
    var id = encodeDocId(docId) + '/' + encodeAttachmentId(attachmentId);
    var url = genDBUrl(host, id);
    if (rev$$1) {
      url += '?rev=' + rev$$1;
    }

    if (typeof blob === 'string') {
      // input is assumed to be a base64 string
      var binary;
      try {
        binary = thisAtob(blob);
      } catch (err) {
        return callback(createError(BAD_ARG,
                        'Attachment is not a valid base64 string'));
      }
      blob = binary ? binStringToBluffer(binary, type) : '';
    }

    // Add the attachment
    fetchJSON(url, {
      headers: new h({'Content-Type': type}),
      method: 'PUT',
      body: blob
    }, callback).catch(callback);
  });

  // Update/create multiple documents given by req in the database
  // given by host.
  api._bulkDocs = function (req, opts, callback) {
    // If new_edits=false then it prevents the database from creating
    // new revision numbers for the documents. Instead it just uses
    // the old ones. This is used in database replication.
    req.new_edits = opts.new_edits;

    setup().then(function () {
      return Promise.all(req.docs.map(preprocessAttachments$1));
    }).then(function () {
      // Update/create the documents
      return fetchJSON(genDBUrl(host, '_bulk_docs'), {
        method: 'POST',
        body: JSON.stringify(req)
      }, callback);
    }).catch(callback);
  };


  // Update/create document
  api._put = function (doc, opts, callback) {
    setup().then(function () {
      return preprocessAttachments$1(doc);
    }).then(function () {
      return fetchJSON(genDBUrl(host, encodeDocId(doc._id)), {
        method: 'PUT',
        body: JSON.stringify(doc)
      });
    }).then(function (result) {
      callback(null, result.data);
    }).catch(function (err) {
      err.docId = doc && doc._id;
      callback(err);
    });
  };


  // Get a listing of the documents in the database given
  // by host and ordered by increasing id.
  api.allDocs = adapterFun$$1('allDocs', function (opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = clone(opts);

    // List of parameters to add to the GET request
    var params = {};
    var body;
    var method = 'GET';

    if (opts.conflicts) {
      params.conflicts = true;
    }

    /* istanbul ignore if */
    if (opts.update_seq) {
      params.update_seq = true;
    }

    if (opts.descending) {
      params.descending = true;
    }

    if (opts.include_docs) {
      params.include_docs = true;
    }

    // added in CouchDB 1.6.0
    if (opts.attachments) {
      params.attachments = true;
    }

    if (opts.key) {
      params.key = JSON.stringify(opts.key);
    }

    if (opts.start_key) {
      opts.startkey = opts.start_key;
    }

    if (opts.startkey) {
      params.startkey = JSON.stringify(opts.startkey);
    }

    if (opts.end_key) {
      opts.endkey = opts.end_key;
    }

    if (opts.endkey) {
      params.endkey = JSON.stringify(opts.endkey);
    }

    if (typeof opts.inclusive_end !== 'undefined') {
      params.inclusive_end = !!opts.inclusive_end;
    }

    if (typeof opts.limit !== 'undefined') {
      params.limit = opts.limit;
    }

    if (typeof opts.skip !== 'undefined') {
      params.skip = opts.skip;
    }

    var paramStr = paramsToStr(params);

    if (typeof opts.keys !== 'undefined') {
      method = 'POST';
      body = {keys: opts.keys};
    }

    fetchJSON(genDBUrl(host, '_all_docs' + paramStr), {
       method: method,
      body: JSON.stringify(body)
    }).then(function (result) {
      if (opts.include_docs && opts.attachments && opts.binary) {
        result.data.rows.forEach(readAttachmentsAsBlobOrBuffer);
      }
      callback(null, result.data);
    }).catch(callback);
  });

  // Get a list of changes made to documents in the database given by host.
  // TODO According to the README, there should be two other methods here,
  // api.changes.addListener and api.changes.removeListener.
  api._changes = function (opts) {

    // We internally page the results of a changes request, this means
    // if there is a large set of changes to be returned we can start
    // processing them quicker instead of waiting on the entire
    // set of changes to return and attempting to process them at once
    var batchSize = 'batch_size' in opts ? opts.batch_size : CHANGES_BATCH_SIZE;

    opts = clone(opts);

    if (opts.continuous && !('heartbeat' in opts)) {
      opts.heartbeat = DEFAULT_HEARTBEAT;
    }

    var requestTimeout = ('timeout' in opts) ? opts.timeout : 30 * 1000;

    // ensure CHANGES_TIMEOUT_BUFFER applies
    if ('timeout' in opts && opts.timeout &&
      (requestTimeout - opts.timeout) < CHANGES_TIMEOUT_BUFFER) {
        requestTimeout = opts.timeout + CHANGES_TIMEOUT_BUFFER;
    }

    /* istanbul ignore if */
    if ('heartbeat' in opts && opts.heartbeat &&
       (requestTimeout - opts.heartbeat) < CHANGES_TIMEOUT_BUFFER) {
        requestTimeout = opts.heartbeat + CHANGES_TIMEOUT_BUFFER;
    }

    var params = {};
    if ('timeout' in opts && opts.timeout) {
      params.timeout = opts.timeout;
    }

    var limit = (typeof opts.limit !== 'undefined') ? opts.limit : false;
    var leftToFetch = limit;

    if (opts.style) {
      params.style = opts.style;
    }

    if (opts.include_docs || opts.filter && typeof opts.filter === 'function') {
      params.include_docs = true;
    }

    if (opts.attachments) {
      params.attachments = true;
    }

    if (opts.continuous) {
      params.feed = 'longpoll';
    }

    if (opts.seq_interval) {
      params.seq_interval = opts.seq_interval;
    }

    if (opts.conflicts) {
      params.conflicts = true;
    }

    if (opts.descending) {
      params.descending = true;
    }

    /* istanbul ignore if */
    if (opts.update_seq) {
      params.update_seq = true;
    }

    if ('heartbeat' in opts) {
      // If the heartbeat value is false, it disables the default heartbeat
      if (opts.heartbeat) {
        params.heartbeat = opts.heartbeat;
      }
    }

    if (opts.filter && typeof opts.filter === 'string') {
      params.filter = opts.filter;
    }

    if (opts.view && typeof opts.view === 'string') {
      params.filter = '_view';
      params.view = opts.view;
    }

    // If opts.query_params exists, pass it through to the changes request.
    // These parameters may be used by the filter on the source database.
    if (opts.query_params && typeof opts.query_params === 'object') {
      for (var param_name in opts.query_params) {
        /* istanbul ignore else */
        if (opts.query_params.hasOwnProperty(param_name)) {
          params[param_name] = opts.query_params[param_name];
        }
      }
    }

    var method = 'GET';
    var body;

    if (opts.doc_ids) {
      // set this automagically for the user; it's annoying that couchdb
      // requires both a "filter" and a "doc_ids" param.
      params.filter = '_doc_ids';
      method = 'POST';
      body = {doc_ids: opts.doc_ids };
    }
    /* istanbul ignore next */
    else if (opts.selector) {
      // set this automagically for the user, similar to above
      params.filter = '_selector';
      method = 'POST';
      body = {selector: opts.selector };
    }

    var controller = new a();
    var lastFetchedSeq;

    // Get all the changes starting wtih the one immediately after the
    // sequence number given by since.
    var fetchData = function (since, callback) {
      if (opts.aborted) {
        return;
      }
      params.since = since;
      // "since" can be any kind of json object in Cloudant/CouchDB 2.x
      /* istanbul ignore next */
      if (typeof params.since === "object") {
        params.since = JSON.stringify(params.since);
      }

      if (opts.descending) {
        if (limit) {
          params.limit = leftToFetch;
        }
      } else {
        params.limit = (!limit || leftToFetch > batchSize) ?
          batchSize : leftToFetch;
      }

      // Set the options for the ajax call
      var url = genDBUrl(host, '_changes' + paramsToStr(params));
      var fetchOpts = {
        signal: controller.signal,
        method: method,
        body: JSON.stringify(body)
      };
      lastFetchedSeq = since;

      /* istanbul ignore if */
      if (opts.aborted) {
        return;
      }

      // Get the changes
      setup().then(function () {
        return fetchJSON(url, fetchOpts, callback);
      }).catch(callback);
    };

    // If opts.since exists, get all the changes from the sequence
    // number given by opts.since. Otherwise, get all the changes
    // from the sequence number 0.
    var results = {results: []};

    var fetched = function (err, res) {
      if (opts.aborted) {
        return;
      }
      var raw_results_length = 0;
      // If the result of the ajax call (res) contains changes (res.results)
      if (res && res.results) {
        raw_results_length = res.results.length;
        results.last_seq = res.last_seq;
        var pending = null;
        var lastSeq = null;
        // Attach 'pending' property if server supports it (CouchDB 2.0+)
        /* istanbul ignore if */
        if (typeof res.pending === 'number') {
          pending = res.pending;
        }
        if (typeof results.last_seq === 'string' || typeof results.last_seq === 'number') {
          lastSeq = results.last_seq;
        }
        // For each change
        var req = {};
        req.query = opts.query_params;
        res.results = res.results.filter(function (c) {
          leftToFetch--;
          var ret = filterChange(opts)(c);
          if (ret) {
            if (opts.include_docs && opts.attachments && opts.binary) {
              readAttachmentsAsBlobOrBuffer(c);
            }
            if (opts.return_docs) {
              results.results.push(c);
            }
            opts.onChange(c, pending, lastSeq);
          }
          return ret;
        });
      } else if (err) {
        // In case of an error, stop listening for changes and call
        // opts.complete
        opts.aborted = true;
        opts.complete(err);
        return;
      }

      // The changes feed may have timed out with no results
      // if so reuse last update sequence
      if (res && res.last_seq) {
        lastFetchedSeq = res.last_seq;
      }

      var finished = (limit && leftToFetch <= 0) ||
        (res && raw_results_length < batchSize) ||
        (opts.descending);

      if ((opts.continuous && !(limit && leftToFetch <= 0)) || !finished) {
        // Queue a call to fetch again with the newest sequence number
        immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () { fetchData(lastFetchedSeq, fetched); });
      } else {
        // We're done, call the callback
        opts.complete(null, results);
      }
    };

    fetchData(opts.since || 0, fetched);

    // Return a method to cancel this method from processing any more
    return {
      cancel: function () {
        opts.aborted = true;
        controller.abort();
      }
    };
  };

  // Given a set of document/revision IDs (given by req), tets the subset of
  // those that do NOT correspond to revisions stored in the database.
  // See http://wiki.apache.org/couchdb/HttpPostRevsDiff
  api.revsDiff = adapterFun$$1('revsDiff', function (req, opts, callback) {
    // If no options were given, set the callback to be the second parameter
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    // Get the missing document/revision IDs
    fetchJSON(genDBUrl(host, '_revs_diff'), {
      method: 'POST',
      body: JSON.stringify(req)
    }, callback).catch(callback);
  });

  api._close = function (callback) {
    callback();
  };

  api._destroy = function (options, callback) {
    fetchJSON(genDBUrl(host, ''), {method: 'DELETE'}).then(function (json) {
      callback(null, json);
    }).catch(function (err) {
      /* istanbul ignore if */
      if (err.status === 404) {
        callback(null, {ok: true});
      } else {
        callback(err);
      }
    });
  };
}

// HttpPouch is a valid adapter.
HttpPouch.valid = function () {
  return true;
};

function HttpPouch$1 (PouchDB) {
  PouchDB.adapter('http', HttpPouch, false);
  PouchDB.adapter('https', HttpPouch, false);
}

function QueryParseError(message) {
  this.status = 400;
  this.name = 'query_parse_error';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, QueryParseError);
  } catch (e) {}
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(QueryParseError, Error);

function NotFoundError(message) {
  this.status = 404;
  this.name = 'not_found';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, NotFoundError);
  } catch (e) {}
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(NotFoundError, Error);

function BuiltInError(message) {
  this.status = 500;
  this.name = 'invalid_value';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, BuiltInError);
  } catch (e) {}
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(BuiltInError, Error);

function promisedCallback(promise, callback) {
  if (callback) {
    promise.then(function (res) {
      immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
        callback(null, res);
      });
    }, function (reason) {
      immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
        callback(reason);
      });
    });
  }
  return promise;
}

function callbackify(fun) {
  return argsarray__WEBPACK_IMPORTED_MODULE_4___default()(function (args) {
    var cb = args.pop();
    var promise = fun.apply(this, args);
    if (typeof cb === 'function') {
      promisedCallback(promise, cb);
    }
    return promise;
  });
}

// Promise finally util similar to Q.finally
function fin(promise, finalPromiseFactory) {
  return promise.then(function (res) {
    return finalPromiseFactory().then(function () {
      return res;
    });
  }, function (reason) {
    return finalPromiseFactory().then(function () {
      throw reason;
    });
  });
}

function sequentialize(queue, promiseFactory) {
  return function () {
    var args = arguments;
    var that = this;
    return queue.add(function () {
      return promiseFactory.apply(that, args);
    });
  };
}

// uniq an array of strings, order not guaranteed
// similar to underscore/lodash _.uniq
function uniq(arr) {
  var theSet = new ExportedSet(arr);
  var result = new Array(theSet.size);
  var index = -1;
  theSet.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

function mapToKeysArray(map) {
  var result = new Array(map.size);
  var index = -1;
  map.forEach(function (value, key) {
    result[++index] = key;
  });
  return result;
}

function createBuiltInError(name) {
  var message = 'builtin ' + name +
    ' function requires map values to be numbers' +
    ' or number arrays';
  return new BuiltInError(message);
}

function sum(values) {
  var result = 0;
  for (var i = 0, len = values.length; i < len; i++) {
    var num = values[i];
    if (typeof num !== 'number') {
      if (Array.isArray(num)) {
        // lists of numbers are also allowed, sum them separately
        result = typeof result === 'number' ? [result] : result;
        for (var j = 0, jLen = num.length; j < jLen; j++) {
          var jNum = num[j];
          if (typeof jNum !== 'number') {
            throw createBuiltInError('_sum');
          } else if (typeof result[j] === 'undefined') {
            result.push(jNum);
          } else {
            result[j] += jNum;
          }
        }
      } else { // not array/number
        throw createBuiltInError('_sum');
      }
    } else if (typeof result === 'number') {
      result += num;
    } else { // add number to array
      result[0] += num;
    }
  }
  return result;
}

var log = guardedConsole.bind(null, 'log');
var isArray = Array.isArray;
var toJSON = JSON.parse;

function evalFunctionWithEval(func, emit) {
  return scopeEval(
    "return (" + func.replace(/;\s*$/, "") + ");",
    {
      emit: emit,
      sum: sum,
      log: log,
      isArray: isArray,
      toJSON: toJSON
    }
  );
}

/*
 * Simple task queue to sequentialize actions. Assumes
 * callbacks will eventually fire (once).
 */


function TaskQueue$1() {
  this.promise = new Promise(function (fulfill) {fulfill(); });
}
TaskQueue$1.prototype.add = function (promiseFactory) {
  this.promise = this.promise.catch(function () {
    // just recover
  }).then(function () {
    return promiseFactory();
  });
  return this.promise;
};
TaskQueue$1.prototype.finish = function () {
  return this.promise;
};

function stringify(input) {
  if (!input) {
    return 'undefined'; // backwards compat for empty reduce
  }
  // for backwards compat with mapreduce, functions/strings are stringified
  // as-is. everything else is JSON-stringified.
  switch (typeof input) {
    case 'function':
      // e.g. a mapreduce map
      return input.toString();
    case 'string':
      // e.g. a mapreduce built-in _reduce function
      return input.toString();
    default:
      // e.g. a JSON object in the case of mango queries
      return JSON.stringify(input);
  }
}

/* create a string signature for a view so we can cache it and uniq it */
function createViewSignature(mapFun, reduceFun) {
  // the "undefined" part is for backwards compatibility
  return stringify(mapFun) + stringify(reduceFun) + 'undefined';
}

function createView(sourceDB, viewName, mapFun, reduceFun, temporary, localDocName) {
  var viewSignature = createViewSignature(mapFun, reduceFun);

  var cachedViews;
  if (!temporary) {
    // cache this to ensure we don't try to update the same view twice
    cachedViews = sourceDB._cachedViews = sourceDB._cachedViews || {};
    if (cachedViews[viewSignature]) {
      return cachedViews[viewSignature];
    }
  }

  var promiseForView = sourceDB.info().then(function (info) {

    var depDbName = info.db_name + '-mrview-' +
      (temporary ? 'temp' : stringMd5(viewSignature));

    // save the view name in the source db so it can be cleaned up if necessary
    // (e.g. when the _design doc is deleted, remove all associated view data)
    function diffFunction(doc) {
      doc.views = doc.views || {};
      var fullViewName = viewName;
      if (fullViewName.indexOf('/') === -1) {
        fullViewName = viewName + '/' + viewName;
      }
      var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
      /* istanbul ignore if */
      if (depDbs[depDbName]) {
        return; // no update necessary
      }
      depDbs[depDbName] = true;
      return doc;
    }
    return upsert(sourceDB, '_local/' + localDocName, diffFunction).then(function () {
      return sourceDB.registerDependentDatabase(depDbName).then(function (res) {
        var db = res.db;
        db.auto_compaction = true;
        var view = {
          name: depDbName,
          db: db,
          sourceDB: sourceDB,
          adapter: sourceDB.adapter,
          mapFun: mapFun,
          reduceFun: reduceFun
        };
        return view.db.get('_local/lastSeq').catch(function (err) {
          /* istanbul ignore if */
          if (err.status !== 404) {
            throw err;
          }
        }).then(function (lastSeqDoc) {
          view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
          if (cachedViews) {
            view.db.once('destroyed', function () {
              delete cachedViews[viewSignature];
            });
          }
          return view;
        });
      });
    });
  });

  if (cachedViews) {
    cachedViews[viewSignature] = promiseForView;
  }
  return promiseForView;
}

var persistentQueues = {};
var tempViewQueue = new TaskQueue$1();
var CHANGES_BATCH_SIZE$1 = 50;

function parseViewName(name) {
  // can be either 'ddocname/viewname' or just 'viewname'
  // (where the ddoc name is the same)
  return name.indexOf('/') === -1 ? [name, name] : name.split('/');
}

function isGenOne(changes) {
  // only return true if the current change is 1-
  // and there are no other leafs
  return changes.length === 1 && /^1-/.test(changes[0].rev);
}

function emitError(db, e) {
  try {
    db.emit('error', e);
  } catch (err) {
    guardedConsole('error',
      'The user\'s map/reduce function threw an uncaught error.\n' +
      'You can debug this error by doing:\n' +
      'myDatabase.on(\'error\', function (err) { debugger; });\n' +
      'Please double-check your map/reduce function.');
    guardedConsole('error', e);
  }
}

/**
 * Returns an "abstract" mapreduce object of the form:
 *
 *   {
 *     query: queryFun,
 *     viewCleanup: viewCleanupFun
 *   }
 *
 * Arguments are:
 *
 * localDoc: string
 *   This is for the local doc that gets saved in order to track the
 *   "dependent" DBs and clean them up for viewCleanup. It should be
 *   unique, so that indexer plugins don't collide with each other.
 * mapper: function (mapFunDef, emit)
 *   Returns a map function based on the mapFunDef, which in the case of
 *   normal map/reduce is just the de-stringified function, but may be
 *   something else, such as an object in the case of pouchdb-find.
 * reducer: function (reduceFunDef)
 *   Ditto, but for reducing. Modules don't have to support reducing
 *   (e.g. pouchdb-find).
 * ddocValidator: function (ddoc, viewName)
 *   Throws an error if the ddoc or viewName is not valid.
 *   This could be a way to communicate to the user that the configuration for the
 *   indexer is invalid.
 */
function createAbstractMapReduce(localDocName, mapper, reducer, ddocValidator) {

  function tryMap(db, fun, doc) {
    // emit an event if there was an error thrown by a map function.
    // putting try/catches in a single function also avoids deoptimizations.
    try {
      fun(doc);
    } catch (e) {
      emitError(db, e);
    }
  }

  function tryReduce(db, fun, keys, values, rereduce) {
    // same as above, but returning the result or an error. there are two separate
    // functions to avoid extra memory allocations since the tryCode() case is used
    // for custom map functions (common) vs this function, which is only used for
    // custom reduce functions (rare)
    try {
      return {output : fun(keys, values, rereduce)};
    } catch (e) {
      emitError(db, e);
      return {error: e};
    }
  }

  function sortByKeyThenValue(x, y) {
    var keyCompare = collate(x.key, y.key);
    return keyCompare !== 0 ? keyCompare : collate(x.value, y.value);
  }

  function sliceResults(results, limit, skip) {
    skip = skip || 0;
    if (typeof limit === 'number') {
      return results.slice(skip, limit + skip);
    } else if (skip > 0) {
      return results.slice(skip);
    }
    return results;
  }

  function rowToDocId(row) {
    var val = row.value;
    // Users can explicitly specify a joined doc _id, or it
    // defaults to the doc _id that emitted the key/value.
    var docId = (val && typeof val === 'object' && val._id) || row.id;
    return docId;
  }

  function readAttachmentsAsBlobOrBuffer(res) {
    res.rows.forEach(function (row) {
      var atts = row.doc && row.doc._attachments;
      if (!atts) {
        return;
      }
      Object.keys(atts).forEach(function (filename) {
        var att = atts[filename];
        atts[filename].data = b64ToBluffer(att.data, att.content_type);
      });
    });
  }

  function postprocessAttachments(opts) {
    return function (res) {
      if (opts.include_docs && opts.attachments && opts.binary) {
        readAttachmentsAsBlobOrBuffer(res);
      }
      return res;
    };
  }

  function addHttpParam(paramName, opts, params, asJson) {
    // add an http param from opts to params, optionally json-encoded
    var val = opts[paramName];
    if (typeof val !== 'undefined') {
      if (asJson) {
        val = encodeURIComponent(JSON.stringify(val));
      }
      params.push(paramName + '=' + val);
    }
  }

  function coerceInteger(integerCandidate) {
    if (typeof integerCandidate !== 'undefined') {
      var asNumber = Number(integerCandidate);
      // prevents e.g. '1foo' or '1.1' being coerced to 1
      if (!isNaN(asNumber) && asNumber === parseInt(integerCandidate, 10)) {
        return asNumber;
      } else {
        return integerCandidate;
      }
    }
  }

  function coerceOptions(opts) {
    opts.group_level = coerceInteger(opts.group_level);
    opts.limit = coerceInteger(opts.limit);
    opts.skip = coerceInteger(opts.skip);
    return opts;
  }

  function checkPositiveInteger(number) {
    if (number) {
      if (typeof number !== 'number') {
        return  new QueryParseError('Invalid value for integer: "' +
          number + '"');
      }
      if (number < 0) {
        return new QueryParseError('Invalid value for positive integer: ' +
          '"' + number + '"');
      }
    }
  }

  function checkQueryParseError(options, fun) {
    var startkeyName = options.descending ? 'endkey' : 'startkey';
    var endkeyName = options.descending ? 'startkey' : 'endkey';

    if (typeof options[startkeyName] !== 'undefined' &&
      typeof options[endkeyName] !== 'undefined' &&
      collate(options[startkeyName], options[endkeyName]) > 0) {
      throw new QueryParseError('No rows can match your key range, ' +
        'reverse your start_key and end_key or set {descending : true}');
    } else if (fun.reduce && options.reduce !== false) {
      if (options.include_docs) {
        throw new QueryParseError('{include_docs:true} is invalid for reduce');
      } else if (options.keys && options.keys.length > 1 &&
        !options.group && !options.group_level) {
        throw new QueryParseError('Multi-key fetches for reduce views must use ' +
          '{group: true}');
      }
    }
    ['group_level', 'limit', 'skip'].forEach(function (optionName) {
      var error = checkPositiveInteger(options[optionName]);
      if (error) {
        throw error;
      }
    });
  }

  function httpQuery(db, fun, opts) {
    // List of parameters to add to the PUT request
    var params = [];
    var body;
    var method = 'GET';
    var ok, status;

    // If opts.reduce exists and is defined, then add it to the list
    // of parameters.
    // If reduce=false then the results are that of only the map function
    // not the final result of map and reduce.
    addHttpParam('reduce', opts, params);
    addHttpParam('include_docs', opts, params);
    addHttpParam('attachments', opts, params);
    addHttpParam('limit', opts, params);
    addHttpParam('descending', opts, params);
    addHttpParam('group', opts, params);
    addHttpParam('group_level', opts, params);
    addHttpParam('skip', opts, params);
    addHttpParam('stale', opts, params);
    addHttpParam('conflicts', opts, params);
    addHttpParam('startkey', opts, params, true);
    addHttpParam('start_key', opts, params, true);
    addHttpParam('endkey', opts, params, true);
    addHttpParam('end_key', opts, params, true);
    addHttpParam('inclusive_end', opts, params);
    addHttpParam('key', opts, params, true);
    addHttpParam('update_seq', opts, params);

    // Format the list of parameters into a valid URI query string
    params = params.join('&');
    params = params === '' ? '' : '?' + params;

    // If keys are supplied, issue a POST to circumvent GET query string limits
    // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
    if (typeof opts.keys !== 'undefined') {
      var MAX_URL_LENGTH = 2000;
      // according to http://stackoverflow.com/a/417184/680742,
      // the de facto URL length limit is 2000 characters

      var keysAsString =
        'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
      if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
        // If the keys are short enough, do a GET. we do this to work around
        // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)
        params += (params[0] === '?' ? '&' : '?') + keysAsString;
      } else {
        method = 'POST';
        if (typeof fun === 'string') {
          body = {keys: opts.keys};
        } else { // fun is {map : mapfun}, so append to this
          fun.keys = opts.keys;
        }
      }
    }

    // We are referencing a query defined in the design doc
    if (typeof fun === 'string') {
      var parts = parseViewName(fun);
      return db.fetch('_design/' + parts[0] + '/_view/' + parts[1] + params, {
        headers: new h({'Content-Type': 'application/json'}),
        method: method,
        body: JSON.stringify(body)
      }).then(function (response) {
        ok = response.ok;
        status = response.status;
        return response.json();
      }).then(function (result) {
        if (!ok) {
          result.status = status;
          throw generateErrorFromResponse(result);
        }
        // fail the entire request if the result contains an error
        result.rows.forEach(function (row) {
          /* istanbul ignore if */
          if (row.value && row.value.error && row.value.error === "builtin_reduce_error") {
            throw new Error(row.reason);
          }
        });
        return result;
      }).then(postprocessAttachments(opts));
    }

    // We are using a temporary view, terrible for performance, good for testing
    body = body || {};
    Object.keys(fun).forEach(function (key) {
      if (Array.isArray(fun[key])) {
        body[key] = fun[key];
      } else {
        body[key] = fun[key].toString();
      }
    });

    return db.fetch('_temp_view' + params, {
      headers: new h({'Content-Type': 'application/json'}),
      method: 'POST',
      body: JSON.stringify(body)
    }).then(function (response) {
        ok = response.ok;
        status = response.status;
      return response.json();
    }).then(function (result) {
      if (!ok) {
        result.status = status;
        throw generateErrorFromResponse(result);
      }
      return result;
    }).then(postprocessAttachments(opts));
  }

  // custom adapters can define their own api._query
  // and override the default behavior
  /* istanbul ignore next */
  function customQuery(db, fun, opts) {
    return new Promise(function (resolve, reject) {
      db._query(fun, opts, function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  // custom adapters can define their own api._viewCleanup
  // and override the default behavior
  /* istanbul ignore next */
  function customViewCleanup(db) {
    return new Promise(function (resolve, reject) {
      db._viewCleanup(function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  function defaultsTo(value) {
    return function (reason) {
      /* istanbul ignore else */
      if (reason.status === 404) {
        return value;
      } else {
        throw reason;
      }
    };
  }

  // returns a promise for a list of docs to update, based on the input docId.
  // the order doesn't matter, because post-3.2.0, bulkDocs
  // is an atomic operation in all three adapters.
  function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
    var metaDocId = '_local/doc_' + docId;
    var defaultMetaDoc = {_id: metaDocId, keys: []};
    var docData = docIdsToChangesAndEmits.get(docId);
    var indexableKeysToKeyValues = docData[0];
    var changes = docData[1];

    function getMetaDoc() {
      if (isGenOne(changes)) {
        // generation 1, so we can safely assume initial state
        // for performance reasons (avoids unnecessary GETs)
        return Promise.resolve(defaultMetaDoc);
      }
      return view.db.get(metaDocId).catch(defaultsTo(defaultMetaDoc));
    }

    function getKeyValueDocs(metaDoc) {
      if (!metaDoc.keys.length) {
        // no keys, no need for a lookup
        return Promise.resolve({rows: []});
      }
      return view.db.allDocs({
        keys: metaDoc.keys,
        include_docs: true
      });
    }

    function processKeyValueDocs(metaDoc, kvDocsRes) {
      var kvDocs = [];
      var oldKeys = new ExportedSet();

      for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
        var row = kvDocsRes.rows[i];
        var doc = row.doc;
        if (!doc) { // deleted
          continue;
        }
        kvDocs.push(doc);
        oldKeys.add(doc._id);
        doc._deleted = !indexableKeysToKeyValues.has(doc._id);
        if (!doc._deleted) {
          var keyValue = indexableKeysToKeyValues.get(doc._id);
          if ('value' in keyValue) {
            doc.value = keyValue.value;
          }
        }
      }
      var newKeys = mapToKeysArray(indexableKeysToKeyValues);
      newKeys.forEach(function (key) {
        if (!oldKeys.has(key)) {
          // new doc
          var kvDoc = {
            _id: key
          };
          var keyValue = indexableKeysToKeyValues.get(key);
          if ('value' in keyValue) {
            kvDoc.value = keyValue.value;
          }
          kvDocs.push(kvDoc);
        }
      });
      metaDoc.keys = uniq(newKeys.concat(metaDoc.keys));
      kvDocs.push(metaDoc);

      return kvDocs;
    }

    return getMetaDoc().then(function (metaDoc) {
      return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {
        return processKeyValueDocs(metaDoc, kvDocsRes);
      });
    });
  }

  // updates all emitted key/value docs and metaDocs in the mrview database
  // for the given batch of documents from the source database
  function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
    var seqDocId = '_local/lastSeq';
    return view.db.get(seqDocId)
      .catch(defaultsTo({_id: seqDocId, seq: 0}))
      .then(function (lastSeqDoc) {
        var docIds = mapToKeysArray(docIdsToChangesAndEmits);
        return Promise.all(docIds.map(function (docId) {
          return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
        })).then(function (listOfDocsToPersist) {
          var docsToPersist = flatten(listOfDocsToPersist);
          lastSeqDoc.seq = seq;
          docsToPersist.push(lastSeqDoc);
          // write all docs in a single operation, update the seq once
          return view.db.bulkDocs({docs : docsToPersist});
        });
      });
  }

  function getQueue(view) {
    var viewName = typeof view === 'string' ? view : view.name;
    var queue = persistentQueues[viewName];
    if (!queue) {
      queue = persistentQueues[viewName] = new TaskQueue$1();
    }
    return queue;
  }

  function updateView(view) {
    return sequentialize(getQueue(view), function () {
      return updateViewInQueue(view);
    })();
  }

  function updateViewInQueue(view) {
    // bind the emit function once
    var mapResults;
    var doc;

    function emit(key, value) {
      var output = {id: doc._id, key: normalizeKey(key)};
      // Don't explicitly store the value unless it's defined and non-null.
      // This saves on storage space, because often people don't use it.
      if (typeof value !== 'undefined' && value !== null) {
        output.value = normalizeKey(value);
      }
      mapResults.push(output);
    }

    var mapFun = mapper(view.mapFun, emit);

    var currentSeq = view.seq || 0;

    function processChange(docIdsToChangesAndEmits, seq) {
      return function () {
        return saveKeyValues(view, docIdsToChangesAndEmits, seq);
      };
    }

    var queue = new TaskQueue$1();

    function processNextBatch() {
      return view.sourceDB.changes({
        return_docs: true,
        conflicts: true,
        include_docs: true,
        style: 'all_docs',
        since: currentSeq,
        limit: CHANGES_BATCH_SIZE$1
      }).then(processBatch);
    }

    function processBatch(response) {
      var results = response.results;
      if (!results.length) {
        return;
      }
      var docIdsToChangesAndEmits = createDocIdsToChangesAndEmits(results);
      queue.add(processChange(docIdsToChangesAndEmits, currentSeq));
      if (results.length < CHANGES_BATCH_SIZE$1) {
        return;
      }
      return processNextBatch();
    }

    function createDocIdsToChangesAndEmits(results) {
      var docIdsToChangesAndEmits = new ExportedMap();
      for (var i = 0, len = results.length; i < len; i++) {
        var change = results[i];
        if (change.doc._id[0] !== '_') {
          mapResults = [];
          doc = change.doc;

          if (!doc._deleted) {
            tryMap(view.sourceDB, mapFun, doc);
          }
          mapResults.sort(sortByKeyThenValue);

          var indexableKeysToKeyValues = createIndexableKeysToKeyValues(mapResults);
          docIdsToChangesAndEmits.set(change.doc._id, [
            indexableKeysToKeyValues,
            change.changes
          ]);
        }
        currentSeq = change.seq;
      }
      return docIdsToChangesAndEmits;
    }

    function createIndexableKeysToKeyValues(mapResults) {
      var indexableKeysToKeyValues = new ExportedMap();
      var lastKey;
      for (var i = 0, len = mapResults.length; i < len; i++) {
        var emittedKeyValue = mapResults[i];
        var complexKey = [emittedKeyValue.key, emittedKeyValue.id];
        if (i > 0 && collate(emittedKeyValue.key, lastKey) === 0) {
          complexKey.push(i); // dup key+id, so make it unique
        }
        indexableKeysToKeyValues.set(toIndexableString(complexKey), emittedKeyValue);
        lastKey = emittedKeyValue.key;
      }
      return indexableKeysToKeyValues;
    }

    return processNextBatch().then(function () {
      return queue.finish();
    }).then(function () {
      view.seq = currentSeq;
    });
  }

  function reduceView(view, results, options) {
    if (options.group_level === 0) {
      delete options.group_level;
    }

    var shouldGroup = options.group || options.group_level;

    var reduceFun = reducer(view.reduceFun);

    var groups = [];
    var lvl = isNaN(options.group_level) ? Number.POSITIVE_INFINITY :
      options.group_level;
    results.forEach(function (e) {
      var last = groups[groups.length - 1];
      var groupKey = shouldGroup ? e.key : null;

      // only set group_level for array keys
      if (shouldGroup && Array.isArray(groupKey)) {
        groupKey = groupKey.slice(0, lvl);
      }

      if (last && collate(last.groupKey, groupKey) === 0) {
        last.keys.push([e.key, e.id]);
        last.values.push(e.value);
        return;
      }
      groups.push({
        keys: [[e.key, e.id]],
        values: [e.value],
        groupKey: groupKey
      });
    });
    results = [];
    for (var i = 0, len = groups.length; i < len; i++) {
      var e = groups[i];
      var reduceTry = tryReduce(view.sourceDB, reduceFun, e.keys, e.values, false);
      if (reduceTry.error && reduceTry.error instanceof BuiltInError) {
        // CouchDB returns an error if a built-in errors out
        throw reduceTry.error;
      }
      results.push({
        // CouchDB just sets the value to null if a non-built-in errors out
        value: reduceTry.error ? null : reduceTry.output,
        key: e.groupKey
      });
    }
    // no total_rows/offset when reducing
    return {rows: sliceResults(results, options.limit, options.skip)};
  }

  function queryView(view, opts) {
    return sequentialize(getQueue(view), function () {
      return queryViewInQueue(view, opts);
    })();
  }

  function queryViewInQueue(view, opts) {
    var totalRows;
    var shouldReduce = view.reduceFun && opts.reduce !== false;
    var skip = opts.skip || 0;
    if (typeof opts.keys !== 'undefined' && !opts.keys.length) {
      // equivalent query
      opts.limit = 0;
      delete opts.keys;
    }

    function fetchFromView(viewOpts) {
      viewOpts.include_docs = true;
      return view.db.allDocs(viewOpts).then(function (res) {
        totalRows = res.total_rows;
        return res.rows.map(function (result) {

          // implicit migration - in older versions of PouchDB,
          // we explicitly stored the doc as {id: ..., key: ..., value: ...}
          // this is tested in a migration test
          /* istanbul ignore next */
          if ('value' in result.doc && typeof result.doc.value === 'object' &&
            result.doc.value !== null) {
            var keys = Object.keys(result.doc.value).sort();
            // this detection method is not perfect, but it's unlikely the user
            // emitted a value which was an object with these 3 exact keys
            var expectedKeys = ['id', 'key', 'value'];
            if (!(keys < expectedKeys || keys > expectedKeys)) {
              return result.doc.value;
            }
          }

          var parsedKeyAndDocId = parseIndexableString(result.doc._id);
          return {
            key: parsedKeyAndDocId[0],
            id: parsedKeyAndDocId[1],
            value: ('value' in result.doc ? result.doc.value : null)
          };
        });
      });
    }

    function onMapResultsReady(rows) {
      var finalResults;
      if (shouldReduce) {
        finalResults = reduceView(view, rows, opts);
      } else {
        finalResults = {
          total_rows: totalRows,
          offset: skip,
          rows: rows
        };
      }
      /* istanbul ignore if */
      if (opts.update_seq) {
        finalResults.update_seq = view.seq;
      }
      if (opts.include_docs) {
        var docIds = uniq(rows.map(rowToDocId));

        return view.sourceDB.allDocs({
          keys: docIds,
          include_docs: true,
          conflicts: opts.conflicts,
          attachments: opts.attachments,
          binary: opts.binary
        }).then(function (allDocsRes) {
          var docIdsToDocs = new ExportedMap();
          allDocsRes.rows.forEach(function (row) {
            docIdsToDocs.set(row.id, row.doc);
          });
          rows.forEach(function (row) {
            var docId = rowToDocId(row);
            var doc = docIdsToDocs.get(docId);
            if (doc) {
              row.doc = doc;
            }
          });
          return finalResults;
        });
      } else {
        return finalResults;
      }
    }

    if (typeof opts.keys !== 'undefined') {
      var keys = opts.keys;
      var fetchPromises = keys.map(function (key) {
        var viewOpts = {
          startkey : toIndexableString([key]),
          endkey   : toIndexableString([key, {}])
        };
        /* istanbul ignore if */
        if (opts.update_seq) {
          viewOpts.update_seq = true;
        }
        return fetchFromView(viewOpts);
      });
      return Promise.all(fetchPromises).then(flatten).then(onMapResultsReady);
    } else { // normal query, no 'keys'
      var viewOpts = {
        descending : opts.descending
      };
      /* istanbul ignore if */
      if (opts.update_seq) {
        viewOpts.update_seq = true;
      }
      var startkey;
      var endkey;
      if ('start_key' in opts) {
        startkey = opts.start_key;
      }
      if ('startkey' in opts) {
        startkey = opts.startkey;
      }
      if ('end_key' in opts) {
        endkey = opts.end_key;
      }
      if ('endkey' in opts) {
        endkey = opts.endkey;
      }
      if (typeof startkey !== 'undefined') {
        viewOpts.startkey = opts.descending ?
          toIndexableString([startkey, {}]) :
          toIndexableString([startkey]);
      }
      if (typeof endkey !== 'undefined') {
        var inclusiveEnd = opts.inclusive_end !== false;
        if (opts.descending) {
          inclusiveEnd = !inclusiveEnd;
        }

        viewOpts.endkey = toIndexableString(
          inclusiveEnd ? [endkey, {}] : [endkey]);
      }
      if (typeof opts.key !== 'undefined') {
        var keyStart = toIndexableString([opts.key]);
        var keyEnd = toIndexableString([opts.key, {}]);
        if (viewOpts.descending) {
          viewOpts.endkey = keyStart;
          viewOpts.startkey = keyEnd;
        } else {
          viewOpts.startkey = keyStart;
          viewOpts.endkey = keyEnd;
        }
      }
      if (!shouldReduce) {
        if (typeof opts.limit === 'number') {
          viewOpts.limit = opts.limit;
        }
        viewOpts.skip = skip;
      }
      return fetchFromView(viewOpts).then(onMapResultsReady);
    }
  }

  function httpViewCleanup(db) {
    return db.fetch('_view_cleanup', {
      headers: new h({'Content-Type': 'application/json'}),
      method: 'POST'
    }).then(function (response) {
      return response.json();
    });
  }

  function localViewCleanup(db) {
    return db.get('_local/' + localDocName).then(function (metaDoc) {
      var docsToViews = new ExportedMap();
      Object.keys(metaDoc.views).forEach(function (fullViewName) {
        var parts = parseViewName(fullViewName);
        var designDocName = '_design/' + parts[0];
        var viewName = parts[1];
        var views = docsToViews.get(designDocName);
        if (!views) {
          views = new ExportedSet();
          docsToViews.set(designDocName, views);
        }
        views.add(viewName);
      });
      var opts = {
        keys : mapToKeysArray(docsToViews),
        include_docs : true
      };
      return db.allDocs(opts).then(function (res) {
        var viewsToStatus = {};
        res.rows.forEach(function (row) {
          var ddocName = row.key.substring(8); // cuts off '_design/'
          docsToViews.get(row.key).forEach(function (viewName) {
            var fullViewName = ddocName + '/' + viewName;
            /* istanbul ignore if */
            if (!metaDoc.views[fullViewName]) {
              // new format, without slashes, to support PouchDB 2.2.0
              // migration test in pouchdb's browser.migration.js verifies this
              fullViewName = viewName;
            }
            var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
            // design doc deleted, or view function nonexistent
            var statusIsGood = row.doc && row.doc.views &&
              row.doc.views[viewName];
            viewDBNames.forEach(function (viewDBName) {
              viewsToStatus[viewDBName] =
                viewsToStatus[viewDBName] || statusIsGood;
            });
          });
        });
        var dbsToDelete = Object.keys(viewsToStatus).filter(
          function (viewDBName) { return !viewsToStatus[viewDBName]; });
        var destroyPromises = dbsToDelete.map(function (viewDBName) {
          return sequentialize(getQueue(viewDBName), function () {
            return new db.constructor(viewDBName, db.__opts).destroy();
          })();
        });
        return Promise.all(destroyPromises).then(function () {
          return {ok: true};
        });
      });
    }, defaultsTo({ok: true}));
  }

  function queryPromised(db, fun, opts) {
    /* istanbul ignore next */
    if (typeof db._query === 'function') {
      return customQuery(db, fun, opts);
    }
    if (isRemote(db)) {
      return httpQuery(db, fun, opts);
    }

    if (typeof fun !== 'string') {
      // temp_view
      checkQueryParseError(opts, fun);

      tempViewQueue.add(function () {
        var createViewPromise = createView(
          /* sourceDB */ db,
          /* viewName */ 'temp_view/temp_view',
          /* mapFun */ fun.map,
          /* reduceFun */ fun.reduce,
          /* temporary */ true,
          /* localDocName */ localDocName);
        return createViewPromise.then(function (view) {
          return fin(updateView(view).then(function () {
            return queryView(view, opts);
          }), function () {
            return view.db.destroy();
          });
        });
      });
      return tempViewQueue.finish();
    } else {
      // persistent view
      var fullViewName = fun;
      var parts = parseViewName(fullViewName);
      var designDocName = parts[0];
      var viewName = parts[1];
      return db.get('_design/' + designDocName).then(function (doc) {
        var fun = doc.views && doc.views[viewName];

        if (!fun) {
          // basic validator; it's assumed that every subclass would want this
          throw new NotFoundError('ddoc ' + doc._id + ' has no view named ' +
            viewName);
        }

        ddocValidator(doc, viewName);
        checkQueryParseError(opts, fun);

        var createViewPromise = createView(
          /* sourceDB */ db,
          /* viewName */ fullViewName,
          /* mapFun */ fun.map,
          /* reduceFun */ fun.reduce,
          /* temporary */ false,
          /* localDocName */ localDocName);
        return createViewPromise.then(function (view) {
          if (opts.stale === 'ok' || opts.stale === 'update_after') {
            if (opts.stale === 'update_after') {
              immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
                updateView(view);
              });
            }
            return queryView(view, opts);
          } else { // stale not ok
            return updateView(view).then(function () {
              return queryView(view, opts);
            });
          }
        });
      });
    }
  }

  function abstractQuery(fun, opts, callback) {
    var db = this;
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = opts ? coerceOptions(opts) : {};

    if (typeof fun === 'function') {
      fun = {map : fun};
    }

    var promise = Promise.resolve().then(function () {
      return queryPromised(db, fun, opts);
    });
    promisedCallback(promise, callback);
    return promise;
  }

  var abstractViewCleanup = callbackify(function () {
    var db = this;
    /* istanbul ignore next */
    if (typeof db._viewCleanup === 'function') {
      return customViewCleanup(db);
    }
    if (isRemote(db)) {
      return httpViewCleanup(db);
    }
    return localViewCleanup(db);
  });

  return {
    query: abstractQuery,
    viewCleanup: abstractViewCleanup
  };
}

var builtInReduce = {
  _sum: function (keys, values) {
    return sum(values);
  },

  _count: function (keys, values) {
    return values.length;
  },

  _stats: function (keys, values) {
    // no need to implement rereduce=true, because Pouch
    // will never call it
    function sumsqr(values) {
      var _sumsqr = 0;
      for (var i = 0, len = values.length; i < len; i++) {
        var num = values[i];
        _sumsqr += (num * num);
      }
      return _sumsqr;
    }
    return {
      sum     : sum(values),
      min     : Math.min.apply(null, values),
      max     : Math.max.apply(null, values),
      count   : values.length,
      sumsqr : sumsqr(values)
    };
  }
};

function getBuiltIn(reduceFunString) {
  if (/^_sum/.test(reduceFunString)) {
    return builtInReduce._sum;
  } else if (/^_count/.test(reduceFunString)) {
    return builtInReduce._count;
  } else if (/^_stats/.test(reduceFunString)) {
    return builtInReduce._stats;
  } else if (/^_/.test(reduceFunString)) {
    throw new Error(reduceFunString + ' is not a supported reduce function.');
  }
}

function mapper(mapFun, emit) {
  // for temp_views one can use emit(doc, emit), see #38
  if (typeof mapFun === "function" && mapFun.length === 2) {
    var origMap = mapFun;
    return function (doc) {
      return origMap(doc, emit);
    };
  } else {
    return evalFunctionWithEval(mapFun.toString(), emit);
  }
}

function reducer(reduceFun) {
  var reduceFunString = reduceFun.toString();
  var builtIn = getBuiltIn(reduceFunString);
  if (builtIn) {
    return builtIn;
  } else {
    return evalFunctionWithEval(reduceFunString);
  }
}

function ddocValidator(ddoc, viewName) {
  var fun = ddoc.views && ddoc.views[viewName];
  if (typeof fun.map !== 'string') {
    throw new NotFoundError('ddoc ' + ddoc._id + ' has no string view named ' +
      viewName + ', instead found object of type: ' + typeof fun.map);
  }
}

var localDocName = 'mrviews';
var abstract = createAbstractMapReduce(localDocName, mapper, reducer, ddocValidator);

function query(fun, opts, callback) {
  return abstract.query.call(this, fun, opts, callback);
}

function viewCleanup(callback) {
  return abstract.viewCleanup.call(this, callback);
}

var mapreduce = {
  query: query,
  viewCleanup: viewCleanup
};

function isGenOne$1(rev$$1) {
  return /^1-/.test(rev$$1);
}

function fileHasChanged(localDoc, remoteDoc, filename) {
  return !localDoc._attachments ||
         !localDoc._attachments[filename] ||
         localDoc._attachments[filename].digest !== remoteDoc._attachments[filename].digest;
}

function getDocAttachments(db, doc) {
  var filenames = Object.keys(doc._attachments);
  return Promise.all(filenames.map(function (filename) {
    return db.getAttachment(doc._id, filename, {rev: doc._rev});
  }));
}

function getDocAttachmentsFromTargetOrSource(target, src, doc) {
  var doCheckForLocalAttachments = isRemote(src) && !isRemote(target);
  var filenames = Object.keys(doc._attachments);

  if (!doCheckForLocalAttachments) {
    return getDocAttachments(src, doc);
  }

  return target.get(doc._id).then(function (localDoc) {
    return Promise.all(filenames.map(function (filename) {
      if (fileHasChanged(localDoc, doc, filename)) {
        return src.getAttachment(doc._id, filename);
      }

      return target.getAttachment(localDoc._id, filename);
    }));
  }).catch(function (error) {
    /* istanbul ignore if */
    if (error.status !== 404) {
      throw error;
    }

    return getDocAttachments(src, doc);
  });
}

function createBulkGetOpts(diffs) {
  var requests = [];
  Object.keys(diffs).forEach(function (id) {
    var missingRevs = diffs[id].missing;
    missingRevs.forEach(function (missingRev) {
      requests.push({
        id: id,
        rev: missingRev
      });
    });
  });

  return {
    docs: requests,
    revs: true,
    latest: true
  };
}

//
// Fetch all the documents from the src as described in the "diffs",
// which is a mapping of docs IDs to revisions. If the state ever
// changes to "cancelled", then the returned promise will be rejected.
// Else it will be resolved with a list of fetched documents.
//
function getDocs(src, target, diffs, state) {
  diffs = clone(diffs); // we do not need to modify this

  var resultDocs = [],
      ok = true;

  function getAllDocs() {

    var bulkGetOpts = createBulkGetOpts(diffs);

    if (!bulkGetOpts.docs.length) { // optimization: skip empty requests
      return;
    }

    return src.bulkGet(bulkGetOpts).then(function (bulkGetResponse) {
      /* istanbul ignore if */
      if (state.cancelled) {
        throw new Error('cancelled');
      }
      return Promise.all(bulkGetResponse.results.map(function (bulkGetInfo) {
        return Promise.all(bulkGetInfo.docs.map(function (doc) {
          var remoteDoc = doc.ok;

          if (doc.error) {
            // when AUTO_COMPACTION is set, docs can be returned which look
            // like this: {"missing":"1-7c3ac256b693c462af8442f992b83696"}
            ok = false;
          }

          if (!remoteDoc || !remoteDoc._attachments) {
            return remoteDoc;
          }

          return getDocAttachmentsFromTargetOrSource(target, src, remoteDoc)
                   .then(function (attachments) {
                           var filenames = Object.keys(remoteDoc._attachments);
                           attachments
                             .forEach(function (attachment, i) {
                                        var att = remoteDoc._attachments[filenames[i]];
                                        delete att.stub;
                                        delete att.length;
                                        att.data = attachment;
                                      });

                                      return remoteDoc;
                                    });
        }));
      }))

      .then(function (results) {
        resultDocs = resultDocs.concat(flatten(results).filter(Boolean));
      });
    });
  }

  function hasAttachments(doc) {
    return doc._attachments && Object.keys(doc._attachments).length > 0;
  }

  function hasConflicts(doc) {
    return doc._conflicts && doc._conflicts.length > 0;
  }

  function fetchRevisionOneDocs(ids) {
    // Optimization: fetch gen-1 docs and attachments in
    // a single request using _all_docs
    return src.allDocs({
      keys: ids,
      include_docs: true,
      conflicts: true
    }).then(function (res) {
      if (state.cancelled) {
        throw new Error('cancelled');
      }
      res.rows.forEach(function (row) {
        if (row.deleted || !row.doc || !isGenOne$1(row.value.rev) ||
            hasAttachments(row.doc) || hasConflicts(row.doc)) {
          // if any of these conditions apply, we need to fetch using get()
          return;
        }

        // strip _conflicts array to appease CSG (#5793)
        /* istanbul ignore if */
        if (row.doc._conflicts) {
          delete row.doc._conflicts;
        }

        // the doc we got back from allDocs() is sufficient
        resultDocs.push(row.doc);
        delete diffs[row.id];
      });
    });
  }

  function getRevisionOneDocs() {
    // filter out the generation 1 docs and get them
    // leaving the non-generation one docs to be got otherwise
    var ids = Object.keys(diffs).filter(function (id) {
      var missing = diffs[id].missing;
      return missing.length === 1 && isGenOne$1(missing[0]);
    });
    if (ids.length > 0) {
      return fetchRevisionOneDocs(ids);
    }
  }

  function returnResult() {
    return { ok:ok, docs:resultDocs };
  }

  return Promise.resolve()
    .then(getRevisionOneDocs)
    .then(getAllDocs)
    .then(returnResult);
}

var CHECKPOINT_VERSION = 1;
var REPLICATOR = "pouchdb";
// This is an arbitrary number to limit the
// amount of replication history we save in the checkpoint.
// If we save too much, the checkpoing docs will become very big,
// if we save fewer, we'll run a greater risk of having to
// read all the changes from 0 when checkpoint PUTs fail
// CouchDB 2.0 has a more involved history pruning,
// but let's go for the simple version for now.
var CHECKPOINT_HISTORY_SIZE = 5;
var LOWEST_SEQ = 0;

function updateCheckpoint(db, id, checkpoint, session, returnValue) {
  return db.get(id).catch(function (err) {
    if (err.status === 404) {
      if (db.adapter === 'http' || db.adapter === 'https') {
        explainError(
          404, 'PouchDB is just checking if a remote checkpoint exists.'
        );
      }
      return {
        session_id: session,
        _id: id,
        history: [],
        replicator: REPLICATOR,
        version: CHECKPOINT_VERSION
      };
    }
    throw err;
  }).then(function (doc) {
    if (returnValue.cancelled) {
      return;
    }

    // if the checkpoint has not changed, do not update
    if (doc.last_seq === checkpoint) {
      return;
    }

    // Filter out current entry for this replication
    doc.history = (doc.history || []).filter(function (item) {
      return item.session_id !== session;
    });

    // Add the latest checkpoint to history
    doc.history.unshift({
      last_seq: checkpoint,
      session_id: session
    });

    // Just take the last pieces in history, to
    // avoid really big checkpoint docs.
    // see comment on history size above
    doc.history = doc.history.slice(0, CHECKPOINT_HISTORY_SIZE);

    doc.version = CHECKPOINT_VERSION;
    doc.replicator = REPLICATOR;

    doc.session_id = session;
    doc.last_seq = checkpoint;

    return db.put(doc).catch(function (err) {
      if (err.status === 409) {
        // retry; someone is trying to write a checkpoint simultaneously
        return updateCheckpoint(db, id, checkpoint, session, returnValue);
      }
      throw err;
    });
  });
}

function Checkpointer(src, target, id, returnValue, opts) {
  this.src = src;
  this.target = target;
  this.id = id;
  this.returnValue = returnValue;
  this.opts = opts || {};
}

Checkpointer.prototype.writeCheckpoint = function (checkpoint, session) {
  var self = this;
  return this.updateTarget(checkpoint, session).then(function () {
    return self.updateSource(checkpoint, session);
  });
};

Checkpointer.prototype.updateTarget = function (checkpoint, session) {
  if (this.opts.writeTargetCheckpoint) {
    return updateCheckpoint(this.target, this.id, checkpoint,
      session, this.returnValue);
  } else {
    return Promise.resolve(true);
  }
};

Checkpointer.prototype.updateSource = function (checkpoint, session) {
  if (this.opts.writeSourceCheckpoint) {
    var self = this;
    return updateCheckpoint(this.src, this.id, checkpoint,
      session, this.returnValue)
      .catch(function (err) {
        if (isForbiddenError(err)) {
          self.opts.writeSourceCheckpoint = false;
          return true;
        }
        throw err;
      });
  } else {
    return Promise.resolve(true);
  }
};

var comparisons = {
  "undefined": function (targetDoc, sourceDoc) {
    // This is the previous comparison function
    if (collate(targetDoc.last_seq, sourceDoc.last_seq) === 0) {
      return sourceDoc.last_seq;
    }
    /* istanbul ignore next */
    return 0;
  },
  "1": function (targetDoc, sourceDoc) {
    // This is the comparison function ported from CouchDB
    return compareReplicationLogs(sourceDoc, targetDoc).last_seq;
  }
};

Checkpointer.prototype.getCheckpoint = function () {
  var self = this;

  if (self.opts && self.opts.writeSourceCheckpoint && !self.opts.writeTargetCheckpoint) {
    return self.src.get(self.id).then(function (sourceDoc) {
      return sourceDoc.last_seq || LOWEST_SEQ;
    }).catch(function (err) {
      /* istanbul ignore if */
      if (err.status !== 404) {
        throw err;
      }
      return LOWEST_SEQ;
    });
  }

  return self.target.get(self.id).then(function (targetDoc) {
    if (self.opts && self.opts.writeTargetCheckpoint && !self.opts.writeSourceCheckpoint) {
      return targetDoc.last_seq || LOWEST_SEQ;
    }

    return self.src.get(self.id).then(function (sourceDoc) {
      // Since we can't migrate an old version doc to a new one
      // (no session id), we just go with the lowest seq in this case
      /* istanbul ignore if */
      if (targetDoc.version !== sourceDoc.version) {
        return LOWEST_SEQ;
      }

      var version;
      if (targetDoc.version) {
        version = targetDoc.version.toString();
      } else {
        version = "undefined";
      }

      if (version in comparisons) {
        return comparisons[version](targetDoc, sourceDoc);
      }
      /* istanbul ignore next */
      return LOWEST_SEQ;
    }, function (err) {
      if (err.status === 404 && targetDoc.last_seq) {
        return self.src.put({
          _id: self.id,
          last_seq: LOWEST_SEQ
        }).then(function () {
          return LOWEST_SEQ;
        }, function (err) {
          if (isForbiddenError(err)) {
            self.opts.writeSourceCheckpoint = false;
            return targetDoc.last_seq;
          }
          /* istanbul ignore next */
          return LOWEST_SEQ;
        });
      }
      throw err;
    });
  }).catch(function (err) {
    if (err.status !== 404) {
      throw err;
    }
    return LOWEST_SEQ;
  });
};
// This checkpoint comparison is ported from CouchDBs source
// they come from here:
// https://github.com/apache/couchdb-couch-replicator/blob/master/src/couch_replicator.erl#L863-L906

function compareReplicationLogs(srcDoc, tgtDoc) {
  if (srcDoc.session_id === tgtDoc.session_id) {
    return {
      last_seq: srcDoc.last_seq,
      history: srcDoc.history
    };
  }

  return compareReplicationHistory(srcDoc.history, tgtDoc.history);
}

function compareReplicationHistory(sourceHistory, targetHistory) {
  // the erlang loop via function arguments is not so easy to repeat in JS
  // therefore, doing this as recursion
  var S = sourceHistory[0];
  var sourceRest = sourceHistory.slice(1);
  var T = targetHistory[0];
  var targetRest = targetHistory.slice(1);

  if (!S || targetHistory.length === 0) {
    return {
      last_seq: LOWEST_SEQ,
      history: []
    };
  }

  var sourceId = S.session_id;
  /* istanbul ignore if */
  if (hasSessionId(sourceId, targetHistory)) {
    return {
      last_seq: S.last_seq,
      history: sourceHistory
    };
  }

  var targetId = T.session_id;
  if (hasSessionId(targetId, sourceRest)) {
    return {
      last_seq: T.last_seq,
      history: targetRest
    };
  }

  return compareReplicationHistory(sourceRest, targetRest);
}

function hasSessionId(sessionId, history) {
  var props = history[0];
  var rest = history.slice(1);

  if (!sessionId || history.length === 0) {
    return false;
  }

  if (sessionId === props.session_id) {
    return true;
  }

  return hasSessionId(sessionId, rest);
}

function isForbiddenError(err) {
  return typeof err.status === 'number' && Math.floor(err.status / 100) === 4;
}

var STARTING_BACK_OFF = 0;

function backOff(opts, returnValue, error, callback) {
  if (opts.retry === false) {
    returnValue.emit('error', error);
    returnValue.removeAllListeners();
    return;
  }
  /* istanbul ignore if */
  if (typeof opts.back_off_function !== 'function') {
    opts.back_off_function = defaultBackOff;
  }
  returnValue.emit('requestError', error);
  if (returnValue.state === 'active' || returnValue.state === 'pending') {
    returnValue.emit('paused', error);
    returnValue.state = 'stopped';
    var backOffSet = function backoffTimeSet() {
      opts.current_back_off = STARTING_BACK_OFF;
    };
    var removeBackOffSetter = function removeBackOffTimeSet() {
      returnValue.removeListener('active', backOffSet);
    };
    returnValue.once('paused', removeBackOffSetter);
    returnValue.once('active', backOffSet);
  }

  opts.current_back_off = opts.current_back_off || STARTING_BACK_OFF;
  opts.current_back_off = opts.back_off_function(opts.current_back_off);
  setTimeout(callback, opts.current_back_off);
}

function sortObjectPropertiesByKey(queryParams) {
  return Object.keys(queryParams).sort(collate).reduce(function (result, key) {
    result[key] = queryParams[key];
    return result;
  }, {});
}

// Generate a unique id particular to this replication.
// Not guaranteed to align perfectly with CouchDB's rep ids.
function generateReplicationId(src, target, opts) {
  var docIds = opts.doc_ids ? opts.doc_ids.sort(collate) : '';
  var filterFun = opts.filter ? opts.filter.toString() : '';
  var queryParams = '';
  var filterViewName =  '';
  var selector = '';

  // possibility for checkpoints to be lost here as behaviour of
  // JSON.stringify is not stable (see #6226)
  /* istanbul ignore if */
  if (opts.selector) {
    selector = JSON.stringify(opts.selector);
  }

  if (opts.filter && opts.query_params) {
    queryParams = JSON.stringify(sortObjectPropertiesByKey(opts.query_params));
  }

  if (opts.filter && opts.filter === '_view') {
    filterViewName = opts.view.toString();
  }

  return Promise.all([src.id(), target.id()]).then(function (res) {
    var queryData = res[0] + res[1] + filterFun + filterViewName +
      queryParams + docIds + selector;
    return new Promise(function (resolve) {
      binaryMd5(queryData, resolve);
    });
  }).then(function (md5sum) {
    // can't use straight-up md5 alphabet, because
    // the char '/' is interpreted as being for attachments,
    // and + is also not url-safe
    md5sum = md5sum.replace(/\//g, '.').replace(/\+/g, '_');
    return '_local/' + md5sum;
  });
}

function replicate(src, target, opts, returnValue, result) {
  var batches = [];               // list of batches to be processed
  var currentBatch;               // the batch currently being processed
  var pendingBatch = {
    seq: 0,
    changes: [],
    docs: []
  }; // next batch, not yet ready to be processed
  var writingCheckpoint = false;  // true while checkpoint is being written
  var changesCompleted = false;   // true when all changes received
  var replicationCompleted = false; // true when replication has completed
  var last_seq = 0;
  var continuous = opts.continuous || opts.live || false;
  var batch_size = opts.batch_size || 100;
  var batches_limit = opts.batches_limit || 10;
  var changesPending = false;     // true while src.changes is running
  var doc_ids = opts.doc_ids;
  var selector = opts.selector;
  var repId;
  var checkpointer;
  var changedDocs = [];
  // Like couchdb, every replication gets a unique session id
  var session = uuid();

  result = result || {
    ok: true,
    start_time: new Date().toISOString(),
    docs_read: 0,
    docs_written: 0,
    doc_write_failures: 0,
    errors: []
  };

  var changesOpts = {};
  returnValue.ready(src, target);

  function initCheckpointer() {
    if (checkpointer) {
      return Promise.resolve();
    }
    return generateReplicationId(src, target, opts).then(function (res) {
      repId = res;

      var checkpointOpts = {};
      if (opts.checkpoint === false) {
        checkpointOpts = { writeSourceCheckpoint: false, writeTargetCheckpoint: false };
      } else if (opts.checkpoint === 'source') {
        checkpointOpts = { writeSourceCheckpoint: true, writeTargetCheckpoint: false };
      } else if (opts.checkpoint === 'target') {
        checkpointOpts = { writeSourceCheckpoint: false, writeTargetCheckpoint: true };
      } else {
        checkpointOpts = { writeSourceCheckpoint: true, writeTargetCheckpoint: true };
      }

      checkpointer = new Checkpointer(src, target, repId, returnValue, checkpointOpts);
    });
  }

  function writeDocs() {
    changedDocs = [];

    if (currentBatch.docs.length === 0) {
      return;
    }
    var docs = currentBatch.docs;
    var bulkOpts = {timeout: opts.timeout};
    return target.bulkDocs({docs: docs, new_edits: false}, bulkOpts).then(function (res) {
      /* istanbul ignore if */
      if (returnValue.cancelled) {
        completeReplication();
        throw new Error('cancelled');
      }

      // `res` doesn't include full documents (which live in `docs`), so we create a map of 
      // (id -> error), and check for errors while iterating over `docs`
      var errorsById = Object.create(null);
      res.forEach(function (res) {
        if (res.error) {
          errorsById[res.id] = res;
        }
      });

      var errorsNo = Object.keys(errorsById).length;
      result.doc_write_failures += errorsNo;
      result.docs_written += docs.length - errorsNo;

      docs.forEach(function (doc) {
        var error = errorsById[doc._id];
        if (error) {
          result.errors.push(error);
          // Normalize error name. i.e. 'Unauthorized' -> 'unauthorized' (eg Sync Gateway)
          var errorName = (error.name || '').toLowerCase();
          if (errorName === 'unauthorized' || errorName === 'forbidden') {
            returnValue.emit('denied', clone(error));
          } else {
            throw error;
          }
        } else {
          changedDocs.push(doc);
        }
      });

    }, function (err) {
      result.doc_write_failures += docs.length;
      throw err;
    });
  }

  function finishBatch() {
    if (currentBatch.error) {
      throw new Error('There was a problem getting docs.');
    }
    result.last_seq = last_seq = currentBatch.seq;
    var outResult = clone(result);
    if (changedDocs.length) {
      outResult.docs = changedDocs;
      // Attach 'pending' property if server supports it (CouchDB 2.0+)
      /* istanbul ignore if */
      if (typeof currentBatch.pending === 'number') {
        outResult.pending = currentBatch.pending;
        delete currentBatch.pending;
      }
      returnValue.emit('change', outResult);
    }
    writingCheckpoint = true;
    return checkpointer.writeCheckpoint(currentBatch.seq,
        session).then(function () {
      writingCheckpoint = false;
      /* istanbul ignore if */
      if (returnValue.cancelled) {
        completeReplication();
        throw new Error('cancelled');
      }
      currentBatch = undefined;
      getChanges();
    }).catch(function (err) {
      onCheckpointError(err);
      throw err;
    });
  }

  function getDiffs() {
    var diff = {};
    currentBatch.changes.forEach(function (change) {
      // Couchbase Sync Gateway emits these, but we can ignore them
      /* istanbul ignore if */
      if (change.id === "_user/") {
        return;
      }
      diff[change.id] = change.changes.map(function (x) {
        return x.rev;
      });
    });
    return target.revsDiff(diff).then(function (diffs) {
      /* istanbul ignore if */
      if (returnValue.cancelled) {
        completeReplication();
        throw new Error('cancelled');
      }
      // currentBatch.diffs elements are deleted as the documents are written
      currentBatch.diffs = diffs;
    });
  }

  function getBatchDocs() {
    return getDocs(src, target, currentBatch.diffs, returnValue).then(function (got) {
      currentBatch.error = !got.ok;
      got.docs.forEach(function (doc) {
        delete currentBatch.diffs[doc._id];
        result.docs_read++;
        currentBatch.docs.push(doc);
      });
    });
  }

  function startNextBatch() {
    if (returnValue.cancelled || currentBatch) {
      return;
    }
    if (batches.length === 0) {
      processPendingBatch(true);
      return;
    }
    currentBatch = batches.shift();
    getDiffs()
      .then(getBatchDocs)
      .then(writeDocs)
      .then(finishBatch)
      .then(startNextBatch)
      .catch(function (err) {
        abortReplication('batch processing terminated with error', err);
      });
  }


  function processPendingBatch(immediate$$1) {
    if (pendingBatch.changes.length === 0) {
      if (batches.length === 0 && !currentBatch) {
        if ((continuous && changesOpts.live) || changesCompleted) {
          returnValue.state = 'pending';
          returnValue.emit('paused');
        }
        if (changesCompleted) {
          completeReplication();
        }
      }
      return;
    }
    if (
      immediate$$1 ||
      changesCompleted ||
      pendingBatch.changes.length >= batch_size
    ) {
      batches.push(pendingBatch);
      pendingBatch = {
        seq: 0,
        changes: [],
        docs: []
      };
      if (returnValue.state === 'pending' || returnValue.state === 'stopped') {
        returnValue.state = 'active';
        returnValue.emit('active');
      }
      startNextBatch();
    }
  }


  function abortReplication(reason, err) {
    if (replicationCompleted) {
      return;
    }
    if (!err.message) {
      err.message = reason;
    }
    result.ok = false;
    result.status = 'aborting';
    batches = [];
    pendingBatch = {
      seq: 0,
      changes: [],
      docs: []
    };
    completeReplication(err);
  }


  function completeReplication(fatalError) {
    if (replicationCompleted) {
      return;
    }
    /* istanbul ignore if */
    if (returnValue.cancelled) {
      result.status = 'cancelled';
      if (writingCheckpoint) {
        return;
      }
    }
    result.status = result.status || 'complete';
    result.end_time = new Date().toISOString();
    result.last_seq = last_seq;
    replicationCompleted = true;

    if (fatalError) {
      // need to extend the error because Firefox considers ".result" read-only
      fatalError = createError(fatalError);
      fatalError.result = result;

      // Normalize error name. i.e. 'Unauthorized' -> 'unauthorized' (eg Sync Gateway)
      var errorName = (fatalError.name || '').toLowerCase();
      if (errorName === 'unauthorized' || errorName === 'forbidden') {
        returnValue.emit('error', fatalError);
        returnValue.removeAllListeners();
      } else {
        backOff(opts, returnValue, fatalError, function () {
          replicate(src, target, opts, returnValue);
        });
      }
    } else {
      returnValue.emit('complete', result);
      returnValue.removeAllListeners();
    }
  }


  function onChange(change, pending, lastSeq) {
    /* istanbul ignore if */
    if (returnValue.cancelled) {
      return completeReplication();
    }
    // Attach 'pending' property if server supports it (CouchDB 2.0+)
    /* istanbul ignore if */
    if (typeof pending === 'number') {
      pendingBatch.pending = pending;
    }

    var filter = filterChange(opts)(change);
    if (!filter) {
      return;
    }
    pendingBatch.seq = change.seq || lastSeq;
    pendingBatch.changes.push(change);
    immediate__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      processPendingBatch(batches.length === 0 && changesOpts.live);
    });
  }


  function onChangesComplete(changes) {
    changesPending = false;
    /* istanbul ignore if */
    if (returnValue.cancelled) {
      return completeReplication();
    }

    // if no results were returned then we're done,
    // else fetch more
    if (changes.results.length > 0) {
      changesOpts.since = changes.results[changes.results.length - 1].seq;
      getChanges();
      processPendingBatch(true);
    } else {

      var complete = function () {
        if (continuous) {
          changesOpts.live = true;
          getChanges();
        } else {
          changesCompleted = true;
        }
        processPendingBatch(true);
      };

      // update the checkpoint so we start from the right seq next time
      if (!currentBatch && changes.results.length === 0) {
        writingCheckpoint = true;
        checkpointer.writeCheckpoint(changes.last_seq,
            session).then(function () {
          writingCheckpoint = false;
          result.last_seq = last_seq = changes.last_seq;
          complete();
        })
        .catch(onCheckpointError);
      } else {
        complete();
      }
    }
  }


  function onChangesError(err) {
    changesPending = false;
    /* istanbul ignore if */
    if (returnValue.cancelled) {
      return completeReplication();
    }
    abortReplication('changes rejected', err);
  }


  function getChanges() {
    if (!(
      !changesPending &&
      !changesCompleted &&
      batches.length < batches_limit
      )) {
      return;
    }
    changesPending = true;
    function abortChanges() {
      changes.cancel();
    }
    function removeListener() {
      returnValue.removeListener('cancel', abortChanges);
    }

    if (returnValue._changes) { // remove old changes() and listeners
      returnValue.removeListener('cancel', returnValue._abortChanges);
      returnValue._changes.cancel();
    }
    returnValue.once('cancel', abortChanges);

    var changes = src.changes(changesOpts)
      .on('change', onChange);
    changes.then(removeListener, removeListener);
    changes.then(onChangesComplete)
      .catch(onChangesError);

    if (opts.retry) {
      // save for later so we can cancel if necessary
      returnValue._changes = changes;
      returnValue._abortChanges = abortChanges;
    }
  }


  function startChanges() {
    initCheckpointer().then(function () {
      /* istanbul ignore if */
      if (returnValue.cancelled) {
        completeReplication();
        return;
      }
      return checkpointer.getCheckpoint().then(function (checkpoint) {
        last_seq = checkpoint;
        changesOpts = {
          since: last_seq,
          limit: batch_size,
          batch_size: batch_size,
          style: 'all_docs',
          doc_ids: doc_ids,
          selector: selector,
          return_docs: true // required so we know when we're done
        };
        if (opts.filter) {
          if (typeof opts.filter !== 'string') {
            // required for the client-side filter in onChange
            changesOpts.include_docs = true;
          } else { // ddoc filter
            changesOpts.filter = opts.filter;
          }
        }
        if ('heartbeat' in opts) {
          changesOpts.heartbeat = opts.heartbeat;
        }
        if ('timeout' in opts) {
          changesOpts.timeout = opts.timeout;
        }
        if (opts.query_params) {
          changesOpts.query_params = opts.query_params;
        }
        if (opts.view) {
          changesOpts.view = opts.view;
        }
        getChanges();
      });
    }).catch(function (err) {
      abortReplication('getCheckpoint rejected with ', err);
    });
  }

  /* istanbul ignore next */
  function onCheckpointError(err) {
    writingCheckpoint = false;
    abortReplication('writeCheckpoint completed with error', err);
  }

  /* istanbul ignore if */
  if (returnValue.cancelled) { // cancelled immediately
    completeReplication();
    return;
  }

  if (!returnValue._addedListeners) {
    returnValue.once('cancel', completeReplication);

    if (typeof opts.complete === 'function') {
      returnValue.once('error', opts.complete);
      returnValue.once('complete', function (result) {
        opts.complete(null, result);
      });
    }
    returnValue._addedListeners = true;
  }

  if (typeof opts.since === 'undefined') {
    startChanges();
  } else {
    initCheckpointer().then(function () {
      writingCheckpoint = true;
      return checkpointer.writeCheckpoint(opts.since, session);
    }).then(function () {
      writingCheckpoint = false;
      /* istanbul ignore if */
      if (returnValue.cancelled) {
        completeReplication();
        return;
      }
      last_seq = opts.since;
      startChanges();
    }).catch(onCheckpointError);
  }
}

// We create a basic promise so the caller can cancel the replication possibly
// before we have actually started listening to changes etc
inherits__WEBPACK_IMPORTED_MODULE_5___default()(Replication, events__WEBPACK_IMPORTED_MODULE_6___default.a);
function Replication() {
  events__WEBPACK_IMPORTED_MODULE_6___default.a.call(this);
  this.cancelled = false;
  this.state = 'pending';
  var self = this;
  var promise = new Promise(function (fulfill, reject) {
    self.once('complete', fulfill);
    self.once('error', reject);
  });
  self.then = function (resolve, reject) {
    return promise.then(resolve, reject);
  };
  self.catch = function (reject) {
    return promise.catch(reject);
  };
  // As we allow error handling via "error" event as well,
  // put a stub in here so that rejecting never throws UnhandledError.
  self.catch(function () {});
}

Replication.prototype.cancel = function () {
  this.cancelled = true;
  this.state = 'cancelled';
  this.emit('cancel');
};

Replication.prototype.ready = function (src, target) {
  var self = this;
  if (self._readyCalled) {
    return;
  }
  self._readyCalled = true;

  function onDestroy() {
    self.cancel();
  }
  src.once('destroyed', onDestroy);
  target.once('destroyed', onDestroy);
  function cleanup() {
    src.removeListener('destroyed', onDestroy);
    target.removeListener('destroyed', onDestroy);
  }
  self.once('complete', cleanup);
};

function toPouch(db, opts) {
  var PouchConstructor = opts.PouchConstructor;
  if (typeof db === 'string') {
    return new PouchConstructor(db, opts);
  } else {
    return db;
  }
}

function replicateWrapper(src, target, opts, callback) {

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  if (typeof opts === 'undefined') {
    opts = {};
  }

  if (opts.doc_ids && !Array.isArray(opts.doc_ids)) {
    throw createError(BAD_REQUEST,
                       "`doc_ids` filter parameter is not a list.");
  }

  opts.complete = callback;
  opts = clone(opts);
  opts.continuous = opts.continuous || opts.live;
  opts.retry = ('retry' in opts) ? opts.retry : false;
  /*jshint validthis:true */
  opts.PouchConstructor = opts.PouchConstructor || this;
  var replicateRet = new Replication(opts);
  var srcPouch = toPouch(src, opts);
  var targetPouch = toPouch(target, opts);
  replicate(srcPouch, targetPouch, opts, replicateRet);
  return replicateRet;
}

inherits__WEBPACK_IMPORTED_MODULE_5___default()(Sync, events__WEBPACK_IMPORTED_MODULE_6___default.a);
function sync(src, target, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  if (typeof opts === 'undefined') {
    opts = {};
  }
  opts = clone(opts);
  /*jshint validthis:true */
  opts.PouchConstructor = opts.PouchConstructor || this;
  src = toPouch(src, opts);
  target = toPouch(target, opts);
  return new Sync(src, target, opts, callback);
}

function Sync(src, target, opts, callback) {
  var self = this;
  this.canceled = false;

  var optsPush = opts.push ? $inject_Object_assign({}, opts, opts.push) : opts;
  var optsPull = opts.pull ? $inject_Object_assign({}, opts, opts.pull) : opts;

  this.push = replicateWrapper(src, target, optsPush);
  this.pull = replicateWrapper(target, src, optsPull);

  this.pushPaused = true;
  this.pullPaused = true;

  function pullChange(change) {
    self.emit('change', {
      direction: 'pull',
      change: change
    });
  }
  function pushChange(change) {
    self.emit('change', {
      direction: 'push',
      change: change
    });
  }
  function pushDenied(doc) {
    self.emit('denied', {
      direction: 'push',
      doc: doc
    });
  }
  function pullDenied(doc) {
    self.emit('denied', {
      direction: 'pull',
      doc: doc
    });
  }
  function pushPaused() {
    self.pushPaused = true;
    /* istanbul ignore if */
    if (self.pullPaused) {
      self.emit('paused');
    }
  }
  function pullPaused() {
    self.pullPaused = true;
    /* istanbul ignore if */
    if (self.pushPaused) {
      self.emit('paused');
    }
  }
  function pushActive() {
    self.pushPaused = false;
    /* istanbul ignore if */
    if (self.pullPaused) {
      self.emit('active', {
        direction: 'push'
      });
    }
  }
  function pullActive() {
    self.pullPaused = false;
    /* istanbul ignore if */
    if (self.pushPaused) {
      self.emit('active', {
        direction: 'pull'
      });
    }
  }

  var removed = {};

  function removeAll(type) { // type is 'push' or 'pull'
    return function (event, func) {
      var isChange = event === 'change' &&
        (func === pullChange || func === pushChange);
      var isDenied = event === 'denied' &&
        (func === pullDenied || func === pushDenied);
      var isPaused = event === 'paused' &&
        (func === pullPaused || func === pushPaused);
      var isActive = event === 'active' &&
        (func === pullActive || func === pushActive);

      if (isChange || isDenied || isPaused || isActive) {
        if (!(event in removed)) {
          removed[event] = {};
        }
        removed[event][type] = true;
        if (Object.keys(removed[event]).length === 2) {
          // both push and pull have asked to be removed
          self.removeAllListeners(event);
        }
      }
    };
  }

  if (opts.live) {
    this.push.on('complete', self.pull.cancel.bind(self.pull));
    this.pull.on('complete', self.push.cancel.bind(self.push));
  }

  function addOneListener(ee, event, listener) {
    if (ee.listeners(event).indexOf(listener) == -1) {
      ee.on(event, listener);
    }
  }

  this.on('newListener', function (event) {
    if (event === 'change') {
      addOneListener(self.pull, 'change', pullChange);
      addOneListener(self.push, 'change', pushChange);
    } else if (event === 'denied') {
      addOneListener(self.pull, 'denied', pullDenied);
      addOneListener(self.push, 'denied', pushDenied);
    } else if (event === 'active') {
      addOneListener(self.pull, 'active', pullActive);
      addOneListener(self.push, 'active', pushActive);
    } else if (event === 'paused') {
      addOneListener(self.pull, 'paused', pullPaused);
      addOneListener(self.push, 'paused', pushPaused);
    }
  });

  this.on('removeListener', function (event) {
    if (event === 'change') {
      self.pull.removeListener('change', pullChange);
      self.push.removeListener('change', pushChange);
    } else if (event === 'denied') {
      self.pull.removeListener('denied', pullDenied);
      self.push.removeListener('denied', pushDenied);
    } else if (event === 'active') {
      self.pull.removeListener('active', pullActive);
      self.push.removeListener('active', pushActive);
    } else if (event === 'paused') {
      self.pull.removeListener('paused', pullPaused);
      self.push.removeListener('paused', pushPaused);
    }
  });

  this.pull.on('removeListener', removeAll('pull'));
  this.push.on('removeListener', removeAll('push'));

  var promise = Promise.all([
    this.push,
    this.pull
  ]).then(function (resp) {
    var out = {
      push: resp[0],
      pull: resp[1]
    };
    self.emit('complete', out);
    if (callback) {
      callback(null, out);
    }
    self.removeAllListeners();
    return out;
  }, function (err) {
    self.cancel();
    if (callback) {
      // if there's a callback, then the callback can receive
      // the error event
      callback(err);
    } else {
      // if there's no callback, then we're safe to emit an error
      // event, which would otherwise throw an unhandled error
      // due to 'error' being a special event in EventEmitters
      self.emit('error', err);
    }
    self.removeAllListeners();
    if (callback) {
      // no sense throwing if we're already emitting an 'error' event
      throw err;
    }
  });

  this.then = function (success, err) {
    return promise.then(success, err);
  };

  this.catch = function (err) {
    return promise.catch(err);
  };
}

Sync.prototype.cancel = function () {
  if (!this.canceled) {
    this.canceled = true;
    this.push.cancel();
    this.pull.cancel();
  }
};

function replication(PouchDB) {
  PouchDB.replicate = replicateWrapper;
  PouchDB.sync = sync;

  Object.defineProperty(PouchDB.prototype, 'replicate', {
    get: function () {
      var self = this;
      if (typeof this.replicateMethods === 'undefined') {
        this.replicateMethods = {
          from: function (other, opts, callback) {
            return self.constructor.replicate(other, self, opts, callback);
          },
          to: function (other, opts, callback) {
            return self.constructor.replicate(self, other, opts, callback);
          }
        };
      }
      return this.replicateMethods;
    }
  });

  PouchDB.prototype.sync = function (dbName, opts, callback) {
    return this.constructor.sync(this, dbName, opts, callback);
  };
}

PouchDB.plugin(IDBPouch)
  .plugin(HttpPouch$1)
  .plugin(mapreduce)
  .plugin(replication);

// Pull from src because pouchdb-node/pouchdb-browser themselves

/* harmony default export */ __webpack_exports__["default"] = (PouchDB);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/bytesToUuid.js":
/*!*******************************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  return (bth[buf[i + 0]] + bth[buf[i + 1]] + bth[buf[i + 2]] + bth[buf[i + 3]] + '-' + bth[buf[i + 4]] + bth[buf[i + 5]] + '-' + bth[buf[i + 6]] + bth[buf[i + 7]] + '-' + bth[buf[i + 8]] + bth[buf[i + 9]] + '-' + bth[buf[i + 10]] + bth[buf[i + 11]] + bth[buf[i + 12]] + bth[buf[i + 13]] + bth[buf[i + 14]] + bth[buf[i + 15]]).toLowerCase();
}

/* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/index.js":
/*!*************************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/index.js ***!
  \*************************************************************************************************************************/
/*! exports provided: v1, v3, v4, v5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/md5.js":
/*!***********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/md5.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/rng.js":
/*!***********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/rng.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/sha1.js":
/*!************************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/sha1.js ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v1.js":
/*!**********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v1.js ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/bytesToUuid.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v3.js":
/*!**********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v3.js ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v35.js":
/*!***********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v35.js ***!
  \***********************************************************************************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToUuid.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/bytesToUuid.js");


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var off = buf && offset || 0;
    if (typeof value === 'string') value = stringToBytes(value);
    if (typeof namespace === 'string') namespace = uuidToBytes(namespace);

    if (!Array.isArray(value)) {
      throw TypeError('value must be an array of bytes');
    }

    if (!Array.isArray(namespace) || namespace.length !== 16) {
      throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    } // Per 4.3


    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off + idx] = bytes[idx];
      }
    }

    return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v4.js":
/*!**********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v4.js ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/bytesToUuid.js");



function v4(options, buf, offset) {
  if (typeof options === 'string') {
    buf = options === 'binary' ? new Uint8Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    var start = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[start + i] = rnds[i];
    }

    return buf;
  }

  return Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v5.js":
/*!**********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v5.js ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "../../node_modules/pouchdb/node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "../../node_modules/spark-md5/spark-md5.js":
/*!********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/spark-md5/spark-md5.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
    if (true) {
        // Node/CommonJS
        module.exports = factory();
    } else { var glob; }
}(function (undefined) {

    'use strict';

    /*
     * Fastest md5 implementation around (JKM md5).
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    },
        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];


    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;

        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;

        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;

        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b  = (b << 21 | b >>> 11) + c | 0;

        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }

    function md5blk(s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function md5blk_array(a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    }

    function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    }

    function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    }

    // In some cases the fast add32 function cannot be used..
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }

    // ---------------------------------------------------

    /**
     * ArrayBuffer slice polyfill.
     *
     * @see https://github.com/ttaubert/node-arraybuffer-slice
     */

    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = (val | 0) || 0;

                if (val < 0) {
                    return Math.max(val + length, 0);
                }

                return Math.min(val, length);
            }

            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;

                if (to !== undefined) {
                    end = clamp(to, length);
                }

                if (begin > end) {
                    return new ArrayBuffer(0);
                }

                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);

                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);

                return target;
            };
        })();
    }

    // ---------------------------------------------------

    /**
     * Helpers.
     */

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        return str;
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
           buff = new ArrayBuffer(length),
           arr = new Uint8Array(buff),
           i;

        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);

        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);

        return returnUInt8Array ? result : result.buffer;
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
    }

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */

    function SparkMD5() {
        // call reset to init the instance
        this.reset();
    }

    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // Converts the string to utf8 bytes if necessary
        // Then append as binary
        this.appendBinary(toUtf8(str));

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = '';
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.prototype.getState = function () {
        return {
            buff: this._buff,
            length: this._length,
            hash: this._hash.slice()
        };
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other additional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
    };

    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} [raw] True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hash = function (str, raw) {
        // Converts the string to utf8 bytes if necessary
        // Then compute it using the binary function
        return SparkMD5.hashBinary(toUtf8(str), raw);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} [raw]     True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);

        // Convert buffer to a string
        state.buff = arrayBuffer2Utf8Str(state.buff);

        return state;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        // Convert string to buffer
        state.buff = utf8Str2ArrayBuffer(state.buff, true);

        return SparkMD5.prototype.setState.call(this, state);
    };

    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     [raw] True to get the raw string, false to get the hex one
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    return SparkMD5;
}));


/***/ }),

/***/ "../../node_modules/vuvuzela/index.js":
/*!***************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/vuvuzela/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Stringify/parse functions that don't operate
 * recursively, so they avoid call stack exceeded
 * errors.
 */
exports.stringify = function stringify(input) {
  var queue = [];
  queue.push({obj: input});

  var res = '';
  var next, obj, prefix, val, i, arrayPrefix, keys, k, key, value, objPrefix;
  while ((next = queue.pop())) {
    obj = next.obj;
    prefix = next.prefix || '';
    val = next.val || '';
    res += prefix;
    if (val) {
      res += val;
    } else if (typeof obj !== 'object') {
      res += typeof obj === 'undefined' ? null : JSON.stringify(obj);
    } else if (obj === null) {
      res += 'null';
    } else if (Array.isArray(obj)) {
      queue.push({val: ']'});
      for (i = obj.length - 1; i >= 0; i--) {
        arrayPrefix = i === 0 ? '' : ',';
        queue.push({obj: obj[i], prefix: arrayPrefix});
      }
      queue.push({val: '['});
    } else { // object
      keys = [];
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          keys.push(k);
        }
      }
      queue.push({val: '}'});
      for (i = keys.length - 1; i >= 0; i--) {
        key = keys[i];
        value = obj[key];
        objPrefix = (i > 0 ? ',' : '');
        objPrefix += JSON.stringify(key) + ':';
        queue.push({obj: value, prefix: objPrefix});
      }
      queue.push({val: '{'});
    }
  }
  return res;
};

// Convenience function for the parse function.
// This pop function is basically copied from
// pouchCollate.parseIndexableString
function pop(obj, stack, metaStack) {
  var lastMetaElement = metaStack[metaStack.length - 1];
  if (obj === lastMetaElement.element) {
    // popping a meta-element, e.g. an object whose value is another object
    metaStack.pop();
    lastMetaElement = metaStack[metaStack.length - 1];
  }
  var element = lastMetaElement.element;
  var lastElementIndex = lastMetaElement.index;
  if (Array.isArray(element)) {
    element.push(obj);
  } else if (lastElementIndex === stack.length - 2) { // obj with key+value
    var key = stack.pop();
    element[key] = obj;
  } else {
    stack.push(obj); // obj with key only
  }
}

exports.parse = function (str) {
  var stack = [];
  var metaStack = []; // stack for arrays and objects
  var i = 0;
  var collationIndex,parsedNum,numChar;
  var parsedString,lastCh,numConsecutiveSlashes,ch;
  var arrayElement, objElement;
  while (true) {
    collationIndex = str[i++];
    if (collationIndex === '}' ||
        collationIndex === ']' ||
        typeof collationIndex === 'undefined') {
      if (stack.length === 1) {
        return stack.pop();
      } else {
        pop(stack.pop(), stack, metaStack);
        continue;
      }
    }
    switch (collationIndex) {
      case ' ':
      case '\t':
      case '\n':
      case ':':
      case ',':
        break;
      case 'n':
        i += 3; // 'ull'
        pop(null, stack, metaStack);
        break;
      case 't':
        i += 3; // 'rue'
        pop(true, stack, metaStack);
        break;
      case 'f':
        i += 4; // 'alse'
        pop(false, stack, metaStack);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '-':
        parsedNum = '';
        i--;
        while (true) {
          numChar = str[i++];
          if (/[\d\.\-e\+]/.test(numChar)) {
            parsedNum += numChar;
          } else {
            i--;
            break;
          }
        }
        pop(parseFloat(parsedNum), stack, metaStack);
        break;
      case '"':
        parsedString = '';
        lastCh = void 0;
        numConsecutiveSlashes = 0;
        while (true) {
          ch = str[i++];
          if (ch !== '"' || (lastCh === '\\' &&
              numConsecutiveSlashes % 2 === 1)) {
            parsedString += ch;
            lastCh = ch;
            if (lastCh === '\\') {
              numConsecutiveSlashes++;
            } else {
              numConsecutiveSlashes = 0;
            }
          } else {
            break;
          }
        }
        pop(JSON.parse('"' + parsedString + '"'), stack, metaStack);
        break;
      case '[':
        arrayElement = { element: [], index: stack.length };
        stack.push(arrayElement.element);
        metaStack.push(arrayElement);
        break;
      case '{':
        objElement = { element: {}, index: stack.length };
        stack.push(objElement.element);
        metaStack.push(objElement);
        break;
      default:
        throw new Error(
          'unexpectedly reached end of input: ' + collationIndex);
    }
  }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9hcmdzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvaW1tZWRpYXRlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL21lc3NhZ2VDaGFubmVsLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvaW1tZWRpYXRlL2xpYi9xdWV1ZU1pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL3N0YXRlQ2hhbmdlLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvdGltZW91dC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21hcC1hZ2UtY2xlYW5lci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21lbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9taW1pYy1mbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wLWRlZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3AtbWVtb2l6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wb3VjaGRiL2xpYi9pbmRleC1icm93c2VyLmVzLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3BvdWNoZGIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wb3VjaGRiL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcG91Y2hkYi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL21kNS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wb3VjaGRiL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3BvdWNoZGIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zaGExLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3BvdWNoZGIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92MS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wb3VjaGRiL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcG91Y2hkYi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YzNS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wb3VjaGRiL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcG91Y2hkYi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y1LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3NwYXJrLW1kNS9zcGFyay1tZDUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvdnV2dXplbGEvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2xCYTtBQUNiO0FBQ0EsRUFBRSxtQkFBTyxDQUFDLG1CQUFZO0FBQ3RCLEVBQUUsbUJBQU8sQ0FBQyw0RUFBa0I7QUFDNUIsRUFBRSxtQkFBTyxDQUFDLG1FQUFlO0FBQ3pCLEVBQUUsbUJBQU8sQ0FBQyw0RUFBa0I7QUFDNUIsRUFBRSxtQkFBTyxDQUFDLHNFQUFlO0FBQ3pCLEVBQUUsbUJBQU8sQ0FBQyw4REFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLDZDQUFFO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2REFBNkQsV0FBVztBQUN4RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFD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Q0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFNBQVM7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELHVCQUF1QjtBQUN4RTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLHVCQUF1QixLQUFLO0FBQzdEOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0Isb0JBQW9CO0FBQ3BCLDJCQUEyQjtBQUMzQixtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLFNBQVM7QUFDVCxnQ0FBZ0M7QUFDaEMsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIsUUFBUTtBQUNSLE9BQU87QUFDUDs7QUFFQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJDQUEyQyxTQUFTO0FBQ3BELDRCQUE0QixrQkFBa0I7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRyxPQUFPO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLEdBQUcsT0FBTztBQUNWO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsU0FBUztBQUNuRDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0RBQStEOztBQUUvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsaUJBQWlCO0FBQ2pCLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdEQUFTO0FBQ2Y7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUF1QixpQkFBaUI7QUFDeEM7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQix1Q0FBdUM7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsZUFBZTtBQUNmLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxlQUFlO0FBQ2YsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsYUFBYTtBQUNuQzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0RBQVM7QUFDcEI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsZ0RBQVk7QUFDeEM7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLEVBQUUsZ0RBQVM7QUFDWDtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkMsZUFBZTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQyxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaUJBQWlCO0FBQy9DLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLGlCQUFpQjtBQUNyQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLCtDQUErQyxJQUFlO0FBQzlEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNkNBQTZDLElBQWU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFP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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFVBQVUsRUFBRSxFQUFFO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLGlDQUFpQyxtQ0FBbUMsRUFBRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0Esa0JBQWtCO0FBQ2xCLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSyxjQUFjLFNBQVM7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnREFBUztBQUN2QjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFNBQVM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGNBQWM7QUFDOUQsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQSxxQ0FBcUM7QUFDckMsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnQ0FBZ0M7QUFDaEMsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsT0FBTztBQUNQLDBCQUEwQjtBQUMxQixPQUFPO0FBQ1AsMEJBQTBCO0FBQzFCLE9BQU87QUFDUCwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQiw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87O0FBRVAsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBUSxjQUFjLDZDQUFFO0FBQ3hCO0FBQ0EsRUFBRSw2Q0FBRTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBUSxPQUFPLDZDQUFFO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscURBQXFEO0FBQ3JELHFEQUFxRDs7QUFFckQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsc0VBQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUM1aFV2QjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBOztBQUVlLDBFQUFXLEU7Ozs7Ozs7Ozs7OztBQ2xCMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDRnhDO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7O0FBRWxEOztBQUVBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZSxrRUFBRyxFOzs7Ozs7Ozs7Ozs7QUN0TmxCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7O0FBRWxEOztBQUVBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7O0FBRWQsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7O0FBRWQsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVC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QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZWJlOWYwZjJmMTA4NjViZjRiZC92ZW5kb3JzfmNvdXJzZV8kY291cnNlTmFtZX5jb3Vyc2VfJGNvdXJzZU5hbWUkOTNfc2tpbGxfJDkxaWR+bG9naW5+c2lnbiQ0NXVwfnNpZ24kNDV1cCQ0NXN1Y2Nlc3MudmVuZG9yc35jb3Vyc2VfJGNvdXJzZU5hbWV+Y291cnNlXyRjb3Vyc2VOYW1lJDkzX3NraWxsXyQ5MWlkfmxvZ2lufnNpZ24kNDV1cH5zaWduJDQ1dXAkNDVzdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFyZ3NBcnJheTtcblxuZnVuY3Rpb24gYXJnc0FycmF5KGZ1bikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW4pIHtcbiAgICAgIHZhciBhcmdzID0gW107XG4gICAgICB2YXIgaSA9IC0xO1xuICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bi5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuLmNhbGwodGhpcywgW10pO1xuICAgIH1cbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgdHlwZXMgPSBbXG4gIHJlcXVpcmUoJy4vbmV4dFRpY2snKSxcbiAgcmVxdWlyZSgnLi9xdWV1ZU1pY3JvdGFzaycpLFxuICByZXF1aXJlKCcuL211dGF0aW9uLmpzJyksXG4gIHJlcXVpcmUoJy4vbWVzc2FnZUNoYW5uZWwnKSxcbiAgcmVxdWlyZSgnLi9zdGF0ZUNoYW5nZScpLFxuICByZXF1aXJlKCcuL3RpbWVvdXQnKVxuXTtcbnZhciBkcmFpbmluZztcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xudmFyIHF1ZXVlID0gW107XG52YXIgc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkcmFpbmluZyA9IGZhbHNlO1xuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBuZXh0VGljaygpO1xuICB9XG59XG5cbi8vbmFtZWQgbmV4dFRpY2sgZm9yIGxlc3MgY29uZnVzaW5nIHN0YWNrIHRyYWNlc1xuZnVuY3Rpb24gbmV4dFRpY2soKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG4gICAgd2hpbGUgKGN1cnJlbnRRdWV1ZSAmJiArK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICB9XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBxdWV1ZUluZGV4ID0gLTE7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbnZhciBzY2hlZHVsZURyYWluO1xudmFyIGkgPSAtMTtcbnZhciBsZW4gPSB0eXBlcy5sZW5ndGg7XG53aGlsZSAoKytpIDwgbGVuKSB7XG4gIGlmICh0eXBlc1tpXSAmJiB0eXBlc1tpXS50ZXN0ICYmIHR5cGVzW2ldLnRlc3QoKSkge1xuICAgIHNjaGVkdWxlRHJhaW4gPSB0eXBlc1tpXS5pbnN0YWxsKG5leHRUaWNrKTtcbiAgICBicmVhaztcbiAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmdW4gPSB0aGlzLmZ1bjtcbiAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcbiAgc3dpdGNoIChhcnJheS5sZW5ndGgpIHtcbiAgY2FzZSAwOlxuICAgIHJldHVybiBmdW4oKTtcbiAgY2FzZSAxOlxuICAgIHJldHVybiBmdW4oYXJyYXlbMF0pO1xuICBjYXNlIDI6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSwgYXJyYXlbMV0pO1xuICBjYXNlIDM6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSwgYXJyYXlbMV0sIGFycmF5WzJdKTtcbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gZnVuLmFwcGx5KG51bGwsIGFycmF5KTtcbiAgfVxuXG59O1xubW9kdWxlLmV4cG9ydHMgPSBpbW1lZGlhdGU7XG5mdW5jdGlvbiBpbW1lZGlhdGUodGFzaykge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cbiAgcXVldWUucHVzaChuZXcgSXRlbSh0YXNrLCBhcmdzKSk7XG4gIGlmICghc2NoZWR1bGVkICYmICFkcmFpbmluZykge1xuICAgIHNjaGVkdWxlZCA9IHRydWU7XG4gICAgc2NoZWR1bGVEcmFpbigpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAvLyB3ZSBjYW4gb25seSBnZXQgaGVyZSBpbiBJRTEwXG4gICAgLy8gd2hpY2ggZG9lc24ndCBoYW5kZWwgcG9zdE1lc3NhZ2Ugd2VsbFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoZnVuYykge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBnbG9iYWwuTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vYmFzZWQgb2ZmIHJzdnAgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qc1xuLy9saWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9tYXN0ZXIvTElDRU5TRVxuLy9odHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzL2Jsb2IvbWFzdGVyL2xpYi9yc3ZwL2FzYXAuanNcblxudmFyIE11dGF0aW9uID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cbmV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE11dGF0aW9uO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uKGhhbmRsZSk7XG4gIHZhciBlbGVtZW50ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBlbGVtZW50LmRhdGEgPSAoY2FsbGVkID0gKytjYWxsZWQgJSAyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHlwZW9mIGdsb2JhbC5xdWV1ZU1pY3JvdGFzayA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZ2xvYmFsLnF1ZXVlTWljcm90YXNrKGZ1bmMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ2RvY3VtZW50JyBpbiBnbG9iYWwgJiYgJ29ucmVhZHlzdGF0ZWNoYW5nZScgaW4gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICB2YXIgc2NyaXB0RWwgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaGFuZGxlKCk7XG5cbiAgICAgIHNjcmlwdEVsLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICBzY3JpcHRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdEVsKTtcbiAgICAgIHNjcmlwdEVsID0gbnVsbDtcbiAgICB9O1xuICAgIGdsb2JhbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0RWwpO1xuXG4gICAgcmV0dXJuIGhhbmRsZTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCh0LCAwKTtcbiAgfTtcbn07IiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICAgIH1cbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBfZGVmZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicC1kZWZlclwiKSk7XG5mdW5jdGlvbiBtYXBBZ2VDbGVhbmVyKG1hcCwgcHJvcGVydHkgPSAnbWF4QWdlJykge1xuICAgIGxldCBwcm9jZXNzaW5nS2V5O1xuICAgIGxldCBwcm9jZXNzaW5nVGltZXI7XG4gICAgbGV0IHByb2Nlc3NpbmdEZWZlcnJlZDtcbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAocHJvY2Vzc2luZ0tleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBwcm9jZXNzaW5nIGFuIGl0ZW0sIHdlIGNhbiBzYWZlbHkgZXhpdFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHVwVGltZXIgPSAoaXRlbSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gcF9kZWZlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXRlbVsxXVtwcm9wZXJ0eV0gLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gaW1tZWRpYXRlbHkgaWYgdGhlIGRlbGF5IGlzIGVxdWFsIHRvIG9yIGJlbG93IDBcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5XG4gICAgICAgICAgICBwcm9jZXNzaW5nS2V5ID0gaXRlbVswXTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSB3aGVuIHRoZSB0aW1lb3V0IGZpcmVzXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc2luZ1RpbWVyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgaG9sZCB1cCB0aGUgcHJvY2VzcyBmcm9tIGV4aXRpbmdcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIG1hcCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHNldHVwVGltZXIoZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbiBlcnJvciBvY2N1cnMsIHRoaXMgbWVhbnMgdGhlIHRpbWVyIHdhcyBjbGVhbmVkIHVwIGFuZCB3ZSBzaG91bGQgc3RvcCBwcm9jZXNzaW5nXG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzc2luZ0tleSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICAgICAgcHJvY2Vzc2luZ0tleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocHJvY2Vzc2luZ1RpbWVyKTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkICE9PSB1bmRlZmluZWQpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTplYXJseS1leGl0XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVqZWN0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9yaWdpbmFsU2V0ID0gbWFwLnNldC5iaW5kKG1hcCk7XG4gICAgbWFwLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBrZXkgYWxyZWFkeSBleGlzdCwgcmVtb3ZlIGl0IHNvIHdlIGNhbiBhZGQgaXQgYmFjayBhdCB0aGUgZW5kIG9mIHRoZSBtYXAuXG4gICAgICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FsbCB0aGUgb3JpZ2luYWwgYG1hcC5zZXRgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsU2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBwcm9jZXNzaW5nIGEga2V5IGFuZCB0aGUga2V5IGFkZGVkIGlzIHRoZSBjdXJyZW50IHByb2Nlc3NlZCBrZXksIHN0b3AgcHJvY2Vzc2luZyBpdFxuICAgICAgICBpZiAocHJvY2Vzc2luZ0tleSAmJiBwcm9jZXNzaW5nS2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIHJ1biB0aGUgY2xlYW51cCBtZXRob2QgaW4gY2FzZSBpdCB3YXNuJ3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBjbGVhbnVwKCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICByZXR1cm4gbWFwO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gbWFwQWdlQ2xlYW5lcjtcbi8vIEFkZCBzdXBwb3J0IGZvciBDSlNcbm1vZHVsZS5leHBvcnRzID0gbWFwQWdlQ2xlYW5lcjtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtYXBBZ2VDbGVhbmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoJ21pbWljLWZuJyk7XG5jb25zdCBtYXBBZ2VDbGVhbmVyID0gcmVxdWlyZSgnbWFwLWFnZS1jbGVhbmVyJyk7XG5cbmNvbnN0IGNhY2hlU3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBtZW0gPSAoZm4sIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHQvLyBBdXRvbWF0aWNhbGx5IHVzZSBXZWFrTWFwIHVubGVzcyB0aGUgdXNlciBwcm92aWRlZCB0aGVpciBvd24gY2FjaGVcblx0Y29uc3Qgd2Vha0NhY2hlID0gb3B0aW9ucy5jYWNoZSB8fCBuZXcgV2Vha01hcCgpO1xuXHRjb25zdCB7XG5cdFx0Y2FjaGVLZXkgPSAoW2ZpcnN0QXJndW1lbnRdKSA9PiBmaXJzdEFyZ3VtZW50LFxuXHRcdGNhY2hlID0gbmV3IE1hcCgpLFxuXHRcdG1heEFnZVxuXHR9ID0gb3B0aW9ucztcblxuXHRpZiAodHlwZW9mIG1heEFnZSA9PT0gJ251bWJlcicpIHtcblx0XHRtYXBBZ2VDbGVhbmVyKGNhY2hlKTtcblx0fVxuXG5cdGNvbnN0IG1lbW9pemVkID0gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRjb25zdCBrZXkgPSBjYWNoZUtleShhcmd1bWVudHNfKTtcblxuXHRcdC8vIFByZWZlciBXZWFrTWFwIGlmIHRoZSBrZXkgYWxsb3dzIGl0XG5cdFx0Y29uc3QgYmVzdENhY2hlID0ga2V5ICYmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSA/XG5cdFx0XHR3ZWFrQ2FjaGUgOlxuXHRcdFx0Y2FjaGU7XG5cblx0XHRpZiAoYmVzdENhY2hlLmhhcyhrZXkpKSB7XG5cdFx0XHRyZXR1cm4gYmVzdENhY2hlLmdldChrZXkpLmRhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY2FjaGVJdGVtID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzXyk7XG5cblx0XHRiZXN0Q2FjaGUuc2V0KGtleSwge1xuXHRcdFx0ZGF0YTogY2FjaGVJdGVtLFxuXHRcdFx0bWF4QWdlOiBtYXhBZ2UgPyBEYXRlLm5vdygpICsgbWF4QWdlIDogSW5maW5pdHlcblx0XHR9KTtcblxuXHRcdHJldHVybiBjYWNoZUl0ZW07XG5cdH07XG5cblx0dHJ5IHtcblx0XHQvLyBUaGUgYmVsb3cgY2FsbCB3aWxsIHRocm93IGluIHNvbWUgaG9zdCBlbnZpcm9ubWVudHNcblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9taW1pYy1mbi9pc3N1ZXMvMTBcblx0XHRtaW1pY0ZuKG1lbW9pemVkLCBmbik7XG5cdH0gY2F0Y2ggKF8pIHt9XG5cblx0Y2FjaGVTdG9yZS5zZXQobWVtb2l6ZWQsIGNhY2hlKTtcblxuXHRyZXR1cm4gbWVtb2l6ZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbTtcblxubW9kdWxlLmV4cG9ydHMuY2xlYXIgPSBmbiA9PiB7XG5cdGlmICghY2FjaGVTdG9yZS5oYXMoZm4pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGNsZWFyIGEgZnVuY3Rpb24gdGhhdCB3YXMgbm90IG1lbW9pemVkIScpO1xuXHR9XG5cblx0Y29uc3QgY2FjaGUgPSBjYWNoZVN0b3JlLmdldChmbik7XG5cdGlmICh0eXBlb2YgY2FjaGUuY2xlYXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRjYWNoZS5jbGVhcigpO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb3B5UHJvcGVydHkgPSAodG8sIGZyb20sIHByb3BlcnR5LCBpZ25vcmVOb25Db25maWd1cmFibGUpID0+IHtcblx0Ly8gYEZ1bmN0aW9uI2xlbmd0aGAgc2hvdWxkIHJlZmxlY3QgdGhlIHBhcmFtZXRlcnMgb2YgYHRvYCBub3QgYGZyb21gIHNpbmNlIHdlIGtlZXAgaXRzIGJvZHkuXG5cdC8vIGBGdW5jdGlvbiNwcm90b3R5cGVgIGlzIG5vbi13cml0YWJsZSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSBzbyBjYW4gbmV2ZXIgYmUgbW9kaWZpZWQuXG5cdGlmIChwcm9wZXJ0eSA9PT0gJ2xlbmd0aCcgfHwgcHJvcGVydHkgPT09ICdwcm90b3R5cGUnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdG9EZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0bywgcHJvcGVydHkpO1xuXHRjb25zdCBmcm9tRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnJvbSwgcHJvcGVydHkpO1xuXG5cdGlmICghY2FuQ29weVByb3BlcnR5KHRvRGVzY3JpcHRvciwgZnJvbURlc2NyaXB0b3IpICYmIGlnbm9yZU5vbkNvbmZpZ3VyYWJsZSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywgcHJvcGVydHksIGZyb21EZXNjcmlwdG9yKTtcbn07XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHkoKWAgdGhyb3dzIGlmIHRoZSBwcm9wZXJ0eSBleGlzdHMsIGlzIG5vdCBjb25maWd1cmFibGUgYW5kIGVpdGhlcjpcbi8vICAtIG9uZSBpdHMgZGVzY3JpcHRvcnMgaXMgY2hhbmdlZFxuLy8gIC0gaXQgaXMgbm9uLXdyaXRhYmxlIGFuZCBpdHMgdmFsdWUgaXMgY2hhbmdlZFxuY29uc3QgY2FuQ29weVByb3BlcnR5ID0gZnVuY3Rpb24gKHRvRGVzY3JpcHRvciwgZnJvbURlc2NyaXB0b3IpIHtcblx0cmV0dXJuIHRvRGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkIHx8IHRvRGVzY3JpcHRvci5jb25maWd1cmFibGUgfHwgKFxuXHRcdHRvRGVzY3JpcHRvci53cml0YWJsZSA9PT0gZnJvbURlc2NyaXB0b3Iud3JpdGFibGUgJiZcblx0XHR0b0Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9PT0gZnJvbURlc2NyaXB0b3IuZW51bWVyYWJsZSAmJlxuXHRcdHRvRGVzY3JpcHRvci5jb25maWd1cmFibGUgPT09IGZyb21EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSAmJlxuXHRcdCh0b0Rlc2NyaXB0b3Iud3JpdGFibGUgfHwgdG9EZXNjcmlwdG9yLnZhbHVlID09PSBmcm9tRGVzY3JpcHRvci52YWx1ZSlcblx0KTtcbn07XG5cbmNvbnN0IGNoYW5nZVByb3RvdHlwZSA9ICh0bywgZnJvbSkgPT4ge1xuXHRjb25zdCBmcm9tUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGZyb20pO1xuXHRpZiAoZnJvbVByb3RvdHlwZSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRvKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZih0bywgZnJvbVByb3RvdHlwZSk7XG59O1xuXG5jb25zdCB3cmFwcGVkVG9TdHJpbmcgPSAod2l0aE5hbWUsIGZyb21Cb2R5KSA9PiBgLyogV3JhcHBlZCAke3dpdGhOYW1lfSovXFxuJHtmcm9tQm9keX1gO1xuXG5jb25zdCB0b1N0cmluZ0Rlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJyk7XG5jb25zdCB0b1N0cmluZ05hbWUgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZywgJ25hbWUnKTtcblxuLy8gV2UgY2FsbCBgZnJvbS50b1N0cmluZygpYCBlYXJseSAobm90IGxhemlseSkgdG8gZW5zdXJlIGBmcm9tYCBjYW4gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4vLyBXZSB1c2UgYGJpbmQoKWAgaW5zdGVhZCBvZiBhIGNsb3N1cmUgZm9yIHRoZSBzYW1lIHJlYXNvbi5cbi8vIENhbGxpbmcgYGZyb20udG9TdHJpbmcoKWAgZWFybHkgYWxzbyBhbGxvd3MgY2FjaGluZyBpdCBpbiBjYXNlIGB0by50b1N0cmluZygpYCBpcyBjYWxsZWQgc2V2ZXJhbCB0aW1lcy5cbmNvbnN0IGNoYW5nZVRvU3RyaW5nID0gKHRvLCBmcm9tLCBuYW1lKSA9PiB7XG5cdGNvbnN0IHdpdGhOYW1lID0gbmFtZSA9PT0gJycgPyAnJyA6IGB3aXRoICR7bmFtZS50cmltKCl9KCkgYDtcblx0Y29uc3QgbmV3VG9TdHJpbmcgPSB3cmFwcGVkVG9TdHJpbmcuYmluZChudWxsLCB3aXRoTmFtZSwgZnJvbS50b1N0cmluZygpKTtcblx0Ly8gRW5zdXJlIGB0by50b1N0cmluZy50b1N0cmluZ2AgaXMgbm9uLWVudW1lcmFibGUgYW5kIGhhcyB0aGUgc2FtZSBgc2FtZWBcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld1RvU3RyaW5nLCAnbmFtZScsIHRvU3RyaW5nTmFtZSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywgJ3RvU3RyaW5nJywgey4uLnRvU3RyaW5nRGVzY3JpcHRvciwgdmFsdWU6IG5ld1RvU3RyaW5nfSk7XG59O1xuXG5jb25zdCBtaW1pY0ZuID0gKHRvLCBmcm9tLCB7aWdub3JlTm9uQ29uZmlndXJhYmxlID0gZmFsc2V9ID0ge30pID0+IHtcblx0Y29uc3Qge25hbWV9ID0gdG87XG5cblx0Zm9yIChjb25zdCBwcm9wZXJ0eSBvZiBSZWZsZWN0Lm93bktleXMoZnJvbSkpIHtcblx0XHRjb3B5UHJvcGVydHkodG8sIGZyb20sIHByb3BlcnR5LCBpZ25vcmVOb25Db25maWd1cmFibGUpO1xuXHR9XG5cblx0Y2hhbmdlUHJvdG90eXBlKHRvLCBmcm9tKTtcblx0Y2hhbmdlVG9TdHJpbmcodG8sIGZyb20sIG5hbWUpO1xuXG5cdHJldHVybiB0bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWltaWNGbjtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cdGNvbnN0IHJldCA9IHt9O1xuXG5cdHJldC5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHJldC5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRyZXQucmVqZWN0ID0gcmVqZWN0O1xuXHR9KTtcblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1lbSA9IHJlcXVpcmUoJ21lbScpO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoJ21pbWljLWZuJyk7XG5cbmNvbnN0IG1lbW9pemVkRnVuY3Rpb25zID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgcE1lbW9pemUgPSAoZm4sIHtjYWNoZVByb21pc2VSZWplY3Rpb24gPSBmYWxzZSwgLi4ub3B0aW9uc30gPSB7fSkgPT4ge1xuXHRjb25zdCBjYWNoZSA9IG9wdGlvbnMuY2FjaGUgfHwgbmV3IE1hcCgpO1xuXHRjb25zdCBjYWNoZUtleSA9IG9wdGlvbnMuY2FjaGVLZXkgfHwgKChbZmlyc3RBcmd1bWVudF0pID0+IGZpcnN0QXJndW1lbnQpO1xuXG5cdGNvbnN0IG1lbW9pemVkID0gbWVtKGZuLCB7XG5cdFx0Li4ub3B0aW9ucyxcblx0XHRjYWNoZSxcblx0XHRjYWNoZUtleVxuXHR9KTtcblxuXHRjb25zdCBtZW1vaXplZEFkYXB0ZXIgPSBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdGNvbnN0IGNhY2hlSXRlbSA9IG1lbW9pemVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXG5cdFx0aWYgKCFjYWNoZVByb21pc2VSZWplY3Rpb24gJiYgY2FjaGVJdGVtICYmIGNhY2hlSXRlbS5jYXRjaCkge1xuXHRcdFx0Y2FjaGVJdGVtLmNhdGNoKCgpID0+IHtcblx0XHRcdFx0Y2FjaGUuZGVsZXRlKGNhY2hlS2V5KGFyZ3VtZW50c18pKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZUl0ZW07XG5cdH07XG5cblx0bWltaWNGbihtZW1vaXplZEFkYXB0ZXIsIGZuKTtcblx0bWVtb2l6ZWRGdW5jdGlvbnMuc2V0KG1lbW9pemVkQWRhcHRlciwgbWVtb2l6ZWQpO1xuXG5cdHJldHVybiBtZW1vaXplZEFkYXB0ZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBNZW1vaXplO1xuXG5tb2R1bGUuZXhwb3J0cy5jbGVhciA9IG1lbW9pemVkID0+IHtcblx0aWYgKCFtZW1vaXplZEZ1bmN0aW9ucy5oYXMobWVtb2l6ZWQpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGNsZWFyIGEgZnVuY3Rpb24gdGhhdCB3YXMgbm90IG1lbW9pemVkIScpO1xuXHR9XG5cblx0bWVtLmNsZWFyKG1lbW9pemVkRnVuY3Rpb25zLmdldChtZW1vaXplZCkpO1xufTtcbiIsImltcG9ydCBpbW1lZGlhdGUgZnJvbSAnaW1tZWRpYXRlJztcbmltcG9ydCB7IHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgTWQ1IGZyb20gJ3NwYXJrLW1kNSc7XG5pbXBvcnQgdnV2dXplbGEgZnJvbSAndnV2dXplbGEnO1xuaW1wb3J0IGdldEFyZ3VtZW50cyBmcm9tICdhcmdzYXJyYXknO1xuaW1wb3J0IGluaGVyaXRzIGZyb20gJ2luaGVyaXRzJztcbmltcG9ydCBFRSBmcm9tICdldmVudHMnO1xuXG5mdW5jdGlvbiBtYW5nbGUoa2V5KSB7XG4gIHJldHVybiAnJCcgKyBrZXk7XG59XG5mdW5jdGlvbiB1bm1hbmdsZShrZXkpIHtcbiAgcmV0dXJuIGtleS5zdWJzdHJpbmcoMSk7XG59XG5mdW5jdGlvbiBNYXAkMSgpIHtcbiAgdGhpcy5fc3RvcmUgPSB7fTtcbn1cbk1hcCQxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHZhciBtYW5nbGVkID0gbWFuZ2xlKGtleSk7XG4gIHJldHVybiB0aGlzLl9zdG9yZVttYW5nbGVkXTtcbn07XG5NYXAkMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdmFyIG1hbmdsZWQgPSBtYW5nbGUoa2V5KTtcbiAgdGhpcy5fc3RvcmVbbWFuZ2xlZF0gPSB2YWx1ZTtcbiAgcmV0dXJuIHRydWU7XG59O1xuTWFwJDEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdmFyIG1hbmdsZWQgPSBtYW5nbGUoa2V5KTtcbiAgcmV0dXJuIG1hbmdsZWQgaW4gdGhpcy5fc3RvcmU7XG59O1xuTWFwJDEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdmFyIG1hbmdsZWQgPSBtYW5nbGUoa2V5KTtcbiAgdmFyIHJlcyA9IG1hbmdsZWQgaW4gdGhpcy5fc3RvcmU7XG4gIGRlbGV0ZSB0aGlzLl9zdG9yZVttYW5nbGVkXTtcbiAgcmV0dXJuIHJlcztcbn07XG5NYXAkMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3N0b3JlKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLl9zdG9yZVtrZXldO1xuICAgIGtleSA9IHVubWFuZ2xlKGtleSk7XG4gICAgY2IodmFsdWUsIGtleSk7XG4gIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwJDEucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3N0b3JlKS5sZW5ndGg7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBTZXQkMShhcnJheSkge1xuICB0aGlzLl9zdG9yZSA9IG5ldyBNYXAkMSgpO1xuXG4gIC8vIGluaXQgd2l0aCBhbiBhcnJheVxuICBpZiAoYXJyYXkgJiYgQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkKGFycmF5W2ldKTtcbiAgICB9XG4gIH1cbn1cblNldCQxLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9zdG9yZS5zZXQoa2V5LCB0cnVlKTtcbn07XG5TZXQkMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5fc3RvcmUuaGFzKGtleSk7XG59O1xuU2V0JDEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgdGhpcy5fc3RvcmUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGNiKGtleSk7XG4gIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQkMS5wcm90b3R5cGUsICdzaXplJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUuc2l6ZTtcbiAgfVxufSk7XG5cbi8qIGdsb2JhbCBNYXAsU2V0LFN5bWJvbCAqL1xuLy8gQmFzZWQgb24gaHR0cHM6Ly9rYW5nYXguZ2l0aHViLmlvL2NvbXBhdC10YWJsZS9lczYvIHdlIGNhbiBzbmlmZiBvdXRcbi8vIGluY29tcGxldGUgTWFwL1NldCBpbXBsZW1lbnRhdGlvbnMgd2hpY2ggd291bGQgb3RoZXJ3aXNlIGNhdXNlIG91ciB0ZXN0cyB0byBmYWlsLlxuLy8gTm90YWJseSB0aGV5IGZhaWwgaW4gSUUxMSBhbmQgaU9TIDguNCwgd2hpY2ggdGhpcyBwcmV2ZW50cy5cbmZ1bmN0aW9uIHN1cHBvcnRzTWFwQW5kU2V0KCkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1hcCwgU3ltYm9sLnNwZWNpZXMpO1xuICByZXR1cm4gcHJvcCAmJiAnZ2V0JyBpbiBwcm9wICYmIE1hcFtTeW1ib2wuc3BlY2llc10gPT09IE1hcDtcbn1cblxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL21vbnRhZ2Vqcy9jb2xsZWN0aW9uc1xuXG52YXIgRXhwb3J0ZWRTZXQ7XG52YXIgRXhwb3J0ZWRNYXA7XG5cbntcbiAgaWYgKHN1cHBvcnRzTWFwQW5kU2V0KCkpIHsgLy8gcHJlZmVyIGJ1aWx0LWluIE1hcC9TZXRcbiAgICBFeHBvcnRlZFNldCA9IFNldDtcbiAgICBFeHBvcnRlZE1hcCA9IE1hcDtcbiAgfSBlbHNlIHsgLy8gZmFsbCBiYWNrIHRvIG91ciBwb2x5ZmlsbFxuICAgIEV4cG9ydGVkU2V0ID0gU2V0JDE7XG4gICAgRXhwb3J0ZWRNYXAgPSBNYXAkMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0JpbmFyeU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQmxvYik7XG59XG5cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYnVmZikge1xuICBpZiAodHlwZW9mIGJ1ZmYuc2xpY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYnVmZi5zbGljZSgwKTtcbiAgfVxuICAvLyBJRTEwLTExIHNsaWNlKCkgcG9seWZpbGxcbiAgdmFyIHRhcmdldCA9IG5ldyBBcnJheUJ1ZmZlcihidWZmLmJ5dGVMZW5ndGgpO1xuICB2YXIgdGFyZ2V0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0YXJnZXQpO1xuICB2YXIgc291cmNlQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmKTtcbiAgdGFyZ2V0QXJyYXkuc2V0KHNvdXJjZUFycmF5KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY2xvbmVCaW5hcnlPYmplY3Qob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG4gIH1cbiAgdmFyIHNpemUgPSBvYmplY3Quc2l6ZTtcbiAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcbiAgLy8gQmxvYlxuICBpZiAodHlwZW9mIG9iamVjdC5zbGljZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvYmplY3Quc2xpY2UoMCwgc2l6ZSwgdHlwZSk7XG4gIH1cbiAgLy8gUGhhbnRvbUpTIHNsaWNlKCkgcmVwbGFjZW1lbnRcbiAgcmV0dXJuIG9iamVjdC53ZWJraXRTbGljZSgwLCBzaXplLCB0eXBlKTtcbn1cblxuLy8gbW9zdCBvZiB0aGlzIGlzIGJvcnJvd2VkIGZyb20gbG9kYXNoLmlzUGxhaW5PYmplY3Q6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmlzLWNvbXBvbmVudHMvbG9kYXNoLmlzcGxhaW5vYmplY3QvXG4vLyBibG9iLzI5YzM1ODE0MGE3NGYyNTJhZWIwOGM5ZWIyOGJlZjg2ZjIyMTdkNGEvaW5kZXguanNcblxudmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHByb3RvID09PSBudWxsKSB7IC8vIG5vdCBzdXJlIHdoZW4gdGhpcyBoYXBwZW5zLCBidXQgSSBndWVzcyBpdCBjYW5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XG4gIHZhciBuZXdPYmplY3Q7XG4gIHZhciBpO1xuICB2YXIgbGVuO1xuXG4gIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICBuZXdPYmplY3QgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmplY3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG5ld09iamVjdFtpXSA9IGNsb25lKG9iamVjdFtpXSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cblxuICAvLyBzcGVjaWFsIGNhc2U6IHRvIGF2b2lkIGluY29uc2lzdGVuY2llcyBiZXR3ZWVuIEluZGV4ZWREQlxuICAvLyBhbmQgb3RoZXIgYmFja2VuZHMsIHdlIGF1dG9tYXRpY2FsbHkgc3RyaW5naWZ5IERhdGVzXG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG9iamVjdC50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgaWYgKGlzQmluYXJ5T2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gY2xvbmVCaW5hcnlPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDsgLy8gZG9uJ3QgY2xvbmUgb2JqZWN0cyBsaWtlIFdvcmtlcnNcbiAgfVxuXG4gIG5ld09iamVjdCA9IHt9O1xuICBmb3IgKGkgaW4gb2JqZWN0KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaSkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGNsb25lKG9iamVjdFtpXSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdPYmplY3RbaV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iamVjdDtcbn1cblxuZnVuY3Rpb24gb25jZShmdW4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZ2V0QXJndW1lbnRzKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgLy8gdGhpcyBpcyBhIHNtb2tlIHRlc3QgYW5kIHNob3VsZCBuZXZlciBhY3R1YWxseSBoYXBwZW5cbiAgICAgIHRocm93IG5ldyBFcnJvcignb25jZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2UnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZ1bi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b1Byb21pc2UoZnVuYykge1xuICAvL2NyZWF0ZSB0aGUgZnVuY3Rpb24gd2Ugd2lsbCBiZSByZXR1cm5pbmdcbiAgcmV0dXJuIGdldEFyZ3VtZW50cyhmdW5jdGlvbiAoYXJncykge1xuICAgIC8vIENsb25lIGFyZ3VtZW50c1xuICAgIGFyZ3MgPSBjbG9uZShhcmdzKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gaWYgdGhlIGxhc3QgYXJndW1lbnQgaXMgYSBmdW5jdGlvbiwgYXNzdW1lIGl0cyBhIGNhbGxiYWNrXG4gICAgdmFyIHVzZWRDQiA9ICh0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSA/IGFyZ3MucG9wKCkgOiBmYWxzZTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcbiAgICAgIHZhciByZXNwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gb25jZShmdW5jdGlvbiAoZXJyLCBtZXNnKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGZpbGwobWVzZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY3JlYXRlIGEgY2FsbGJhY2sgZm9yIHRoaXMgaW52b2NhdGlvblxuICAgICAgICAvLyBhcHBseSB0aGUgZnVuY3Rpb24gaW4gdGhlIG9yaWcgY29udGV4dFxuICAgICAgICBhcmdzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXNwID0gZnVuYy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgaWYgKHJlc3AgJiYgdHlwZW9mIHJlc3AudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGZ1bGZpbGwocmVzcCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIHRoZXJlIGlzIGEgY2FsbGJhY2ssIGNhbGwgaXQgYmFja1xuICAgIGlmICh1c2VkQ0IpIHtcbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHVzZWRDQihudWxsLCByZXN1bHQpO1xuICAgICAgfSwgdXNlZENCKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsb2dBcGlDYWxsKHNlbGYsIG5hbWUsIGFyZ3MpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChzZWxmLmNvbnN0cnVjdG9yLmxpc3RlbmVycygnZGVidWcnKS5sZW5ndGgpIHtcbiAgICB2YXIgbG9nQXJncyA9IFsnYXBpJywgc2VsZi5uYW1lLCBuYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBsb2dBcmdzLnB1c2goYXJnc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuY29uc3RydWN0b3IuZW1pdCgnZGVidWcnLCBsb2dBcmdzKTtcblxuICAgIC8vIG92ZXJyaWRlIHRoZSBjYWxsYmFjayBpdHNlbGYgdG8gbG9nIHRoZSByZXNwb25zZVxuICAgIHZhciBvcmlnQ2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgYXJnc1thcmdzLmxlbmd0aCAtIDFdID0gZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICB2YXIgcmVzcG9uc2VBcmdzID0gWydhcGknLCBzZWxmLm5hbWUsIG5hbWVdO1xuICAgICAgcmVzcG9uc2VBcmdzID0gcmVzcG9uc2VBcmdzLmNvbmNhdChcbiAgICAgICAgZXJyID8gWydlcnJvcicsIGVycl0gOiBbJ3N1Y2Nlc3MnLCByZXNdXG4gICAgICApO1xuICAgICAgc2VsZi5jb25zdHJ1Y3Rvci5lbWl0KCdkZWJ1ZycsIHJlc3BvbnNlQXJncyk7XG4gICAgICBvcmlnQ2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRhcHRlckZ1bihuYW1lLCBjYWxsYmFjaykge1xuICByZXR1cm4gdG9Qcm9taXNlKGdldEFyZ3VtZW50cyhmdW5jdGlvbiAoYXJncykge1xuICAgIGlmICh0aGlzLl9jbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2RhdGFiYXNlIGlzIGNsb3NlZCcpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignZGF0YWJhc2UgaXMgZGVzdHJveWVkJykpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgbG9nQXBpQ2FsbChzZWxmLCBuYW1lLCBhcmdzKTtcbiAgICBpZiAoIXRoaXMudGFza3F1ZXVlLmlzUmVhZHkpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYudGFza3F1ZXVlLmFkZFRhc2soZnVuY3Rpb24gKGZhaWxlZCkge1xuICAgICAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgICAgIHJlamVjdChmYWlsZWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdWxmaWxsKHNlbGZbbmFtZV0uYXBwbHkoc2VsZiwgYXJncykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KSk7XG59XG5cbi8vIGxpa2UgdW5kZXJzY29yZS9sb2Rhc2ggXy5waWNrKClcbmZ1bmN0aW9uIHBpY2sob2JqLCBhcnIpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIHByb3AgPSBhcnJbaV07XG4gICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICByZXNbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8vIE1vc3QgYnJvd3NlcnMgdGhyb3R0bGUgY29uY3VycmVudCByZXF1ZXN0cyBhdCA2LCBzbyBpdCdzIHNpbGx5XG4vLyB0byBzaGltIF9idWxrX2dldCBieSB0cnlpbmcgdG8gbGF1bmNoIHBvdGVudGlhbGx5IGh1bmRyZWRzIG9mIHJlcXVlc3RzXG4vLyBhbmQgdGhlbiBsZXR0aW5nIHRoZSBtYWpvcml0eSB0aW1lIG91dC4gV2UgY2FuIGhhbmRsZSB0aGlzIG91cnNlbHZlcy5cbnZhciBNQVhfTlVNX0NPTkNVUlJFTlRfUkVRVUVTVFMgPSA2O1xuXG5mdW5jdGlvbiBpZGVudGl0eUZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHg7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFJlc3VsdEZvck9wZW5SZXZzR2V0KHJlc3VsdCkge1xuICByZXR1cm4gW3tcbiAgICBvazogcmVzdWx0XG4gIH1dO1xufVxuXG4vLyBzaGltIGZvciBQL0NvdWNoREIgYWRhcHRlcnMgdGhhdCBkb24ndCBkaXJlY3RseSBpbXBsZW1lbnQgX2J1bGtfZ2V0XG5mdW5jdGlvbiBidWxrR2V0KGRiLCBvcHRzLCBjYWxsYmFjaykge1xuICB2YXIgcmVxdWVzdHMgPSBvcHRzLmRvY3M7XG5cbiAgLy8gY29uc29saWRhdGUgaW50byBvbmUgcmVxdWVzdCBwZXIgZG9jIGlmIHBvc3NpYmxlXG4gIHZhciByZXF1ZXN0c0J5SWQgPSBuZXcgRXhwb3J0ZWRNYXAoKTtcbiAgcmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIGlmIChyZXF1ZXN0c0J5SWQuaGFzKHJlcXVlc3QuaWQpKSB7XG4gICAgICByZXF1ZXN0c0J5SWQuZ2V0KHJlcXVlc3QuaWQpLnB1c2gocmVxdWVzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3RzQnlJZC5zZXQocmVxdWVzdC5pZCwgW3JlcXVlc3RdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBudW1Eb2NzID0gcmVxdWVzdHNCeUlkLnNpemU7XG4gIHZhciBudW1Eb25lID0gMDtcbiAgdmFyIHBlckRvY1Jlc3VsdHMgPSBuZXcgQXJyYXkobnVtRG9jcyk7XG5cbiAgZnVuY3Rpb24gY29sbGFwc2VSZXN1bHRzQW5kRmluaXNoKCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgcGVyRG9jUmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHJlcy5kb2NzLmZvckVhY2goZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICBpZDogcmVzLmlkLFxuICAgICAgICAgIGRvY3M6IFtpbmZvXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNhbGxiYWNrKG51bGwsIHtyZXN1bHRzOiByZXN1bHRzfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgaWYgKCsrbnVtRG9uZSA9PT0gbnVtRG9jcykge1xuICAgICAgY29sbGFwc2VSZXN1bHRzQW5kRmluaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ290UmVzdWx0KGRvY0luZGV4LCBpZCwgZG9jcykge1xuICAgIHBlckRvY1Jlc3VsdHNbZG9jSW5kZXhdID0ge2lkOiBpZCwgZG9jczogZG9jc307XG4gICAgY2hlY2tEb25lKCk7XG4gIH1cblxuICB2YXIgYWxsUmVxdWVzdHMgPSBbXTtcbiAgcmVxdWVzdHNCeUlkLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhbGxSZXF1ZXN0cy5wdXNoKGtleSk7XG4gIH0pO1xuXG4gIHZhciBpID0gMDtcblxuICBmdW5jdGlvbiBuZXh0QmF0Y2goKSB7XG5cbiAgICBpZiAoaSA+PSBhbGxSZXF1ZXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXBUbyA9IE1hdGgubWluKGkgKyBNQVhfTlVNX0NPTkNVUlJFTlRfUkVRVUVTVFMsIGFsbFJlcXVlc3RzLmxlbmd0aCk7XG4gICAgdmFyIGJhdGNoID0gYWxsUmVxdWVzdHMuc2xpY2UoaSwgdXBUbyk7XG4gICAgcHJvY2Vzc0JhdGNoKGJhdGNoLCBpKTtcbiAgICBpICs9IGJhdGNoLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NCYXRjaChiYXRjaCwgb2Zmc2V0KSB7XG4gICAgYmF0Y2guZm9yRWFjaChmdW5jdGlvbiAoZG9jSWQsIGopIHtcbiAgICAgIHZhciBkb2NJZHggPSBvZmZzZXQgKyBqO1xuICAgICAgdmFyIGRvY1JlcXVlc3RzID0gcmVxdWVzdHNCeUlkLmdldChkb2NJZCk7XG5cbiAgICAgIC8vIGp1c3QgdXNlIHRoZSBmaXJzdCByZXF1ZXN0IGFzIHRoZSBcInRlbXBsYXRlXCJcbiAgICAgIC8vIFRPRE86IFRoZSBfYnVsa19nZXQgQVBJIGFsbG93cyBmb3IgbW9yZSBzdWJ0bGUgdXNlIGNhc2VzIHRoYW4gdGhpcyxcbiAgICAgIC8vIGJ1dCBmb3Igbm93IGl0IGlzIHVubGlrZWx5IHRoYXQgdGhlcmUgd2lsbCBiZSBhIG1peCBvZiBkaWZmZXJlbnRcbiAgICAgIC8vIFwiYXR0c19zaW5jZVwiIG9yIFwiYXR0YWNobWVudHNcIiBpbiB0aGUgc2FtZSByZXF1ZXN0LCBzaW5jZSBpdCdzIGp1c3RcbiAgICAgIC8vIHJlcGxpY2F0ZS5qcyB0aGF0IGlzIHVzaW5nIHRoaXMgZm9yIHRoZSBtb21lbnQuXG4gICAgICAvLyBBbHNvLCBhdHRzX3NpbmNlIGlzIGFzcGlyYXRpb25hbCwgc2luY2Ugd2UgZG9uJ3Qgc3VwcG9ydCBpdCB5ZXQuXG4gICAgICB2YXIgZG9jT3B0cyA9IHBpY2soZG9jUmVxdWVzdHNbMF0sIFsnYXR0c19zaW5jZScsICdhdHRhY2htZW50cyddKTtcbiAgICAgIGRvY09wdHMub3Blbl9yZXZzID0gZG9jUmVxdWVzdHMubWFwKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIC8vIHJldiBpcyBvcHRpb25hbCwgb3Blbl9yZXZzIGRpc2FsbG93ZWRcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QucmV2O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlbW92ZSBmYWxzZXkgLyB1bmRlZmluZWQgcmV2aXNpb25zXG4gICAgICBkb2NPcHRzLm9wZW5fcmV2cyA9IGRvY09wdHMub3Blbl9yZXZzLmZpbHRlcihpZGVudGl0eUZ1bmN0aW9uKTtcblxuICAgICAgdmFyIGZvcm1hdFJlc3VsdCA9IGlkZW50aXR5RnVuY3Rpb247XG5cbiAgICAgIGlmIChkb2NPcHRzLm9wZW5fcmV2cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIGRvY09wdHMub3Blbl9yZXZzO1xuXG4gICAgICAgIC8vIHdoZW4gZmV0Y2hpbmcgb25seSB0aGUgXCJ3aW5uaW5nXCIgbGVhZixcbiAgICAgICAgLy8gdHJhbnNmb3JtIHRoZSByZXN1bHQgc28gaXQgbG9va3MgbGlrZSBhbiBvcGVuX3JldnNcbiAgICAgICAgLy8gcmVxdWVzdFxuICAgICAgICBmb3JtYXRSZXN1bHQgPSBmb3JtYXRSZXN1bHRGb3JPcGVuUmV2c0dldDtcbiAgICAgIH1cblxuICAgICAgLy8gZ2xvYmFsbHktc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgWydyZXZzJywgJ2F0dGFjaG1lbnRzJywgJ2JpbmFyeScsICdhamF4JywgJ2xhdGVzdCddLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICAgIGlmIChwYXJhbSBpbiBvcHRzKSB7XG4gICAgICAgICAgZG9jT3B0c1twYXJhbV0gPSBvcHRzW3BhcmFtXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkYi5nZXQoZG9jSWQsIGRvY09wdHMsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlc3VsdCA9IFt7ZXJyb3I6IGVycn1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdFJlc3VsdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGdvdFJlc3VsdChkb2NJZHgsIGRvY0lkLCByZXN1bHQpO1xuICAgICAgICBuZXh0QmF0Y2goKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmV4dEJhdGNoKCk7XG5cbn1cblxudmFyIGhhc0xvY2FsO1xuXG50cnkge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnX3BvdWNoX2NoZWNrX2xvY2Fsc3RvcmFnZScsIDEpO1xuICBoYXNMb2NhbCA9ICEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19wb3VjaF9jaGVja19sb2NhbHN0b3JhZ2UnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgaGFzTG9jYWwgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaGFzTG9jYWxTdG9yYWdlKCkge1xuICByZXR1cm4gaGFzTG9jYWw7XG59XG5cbi8vIEN1c3RvbSBuZXh0VGljaygpIHNoaW0gZm9yIGJyb3dzZXJzLiBJbiBub2RlLCB0aGlzIHdpbGwganVzdCBiZSBwcm9jZXNzLm5leHRUaWNrKCkuIFdlXG5cbmluaGVyaXRzKENoYW5nZXMsIEVFKTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGF0dGFjaEJyb3dzZXJFdmVudHMoc2VsZikge1xuICBpZiAoaGFzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgc2VsZi5lbWl0KGUua2V5KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBDaGFuZ2VzKCkge1xuICBFRS5jYWxsKHRoaXMpO1xuICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICBhdHRhY2hCcm93c2VyRXZlbnRzKHRoaXMpO1xufVxuQ2hhbmdlcy5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoZGJOYW1lLCBpZCwgZGIsIG9wdHMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0aGlzLl9saXN0ZW5lcnNbaWRdKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGlucHJvZ3Jlc3MgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZXZlbnRGdW5jdGlvbigpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXNlbGYuX2xpc3RlbmVyc1tpZF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlucHJvZ3Jlc3MpIHtcbiAgICAgIGlucHJvZ3Jlc3MgPSAnd2FpdGluZyc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlucHJvZ3Jlc3MgPSB0cnVlO1xuICAgIHZhciBjaGFuZ2VzT3B0cyA9IHBpY2sob3B0cywgW1xuICAgICAgJ3N0eWxlJywgJ2luY2x1ZGVfZG9jcycsICdhdHRhY2htZW50cycsICdjb25mbGljdHMnLCAnZmlsdGVyJyxcbiAgICAgICdkb2NfaWRzJywgJ3ZpZXcnLCAnc2luY2UnLCAncXVlcnlfcGFyYW1zJywgJ2JpbmFyeScsICdyZXR1cm5fZG9jcydcbiAgICBdKTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgIGlucHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkYi5jaGFuZ2VzKGNoYW5nZXNPcHRzKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGMpIHtcbiAgICAgIGlmIChjLnNlcSA+IG9wdHMuc2luY2UgJiYgIW9wdHMuY2FuY2VsbGVkKSB7XG4gICAgICAgIG9wdHMuc2luY2UgPSBjLnNlcTtcbiAgICAgICAgb3B0cy5vbkNoYW5nZShjKTtcbiAgICAgIH1cbiAgICB9KS5vbignY29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaW5wcm9ncmVzcyA9PT0gJ3dhaXRpbmcnKSB7XG4gICAgICAgIGltbWVkaWF0ZShldmVudEZ1bmN0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlucHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9KS5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgfVxuICB0aGlzLl9saXN0ZW5lcnNbaWRdID0gZXZlbnRGdW5jdGlvbjtcbiAgdGhpcy5vbihkYk5hbWUsIGV2ZW50RnVuY3Rpb24pO1xufTtcblxuQ2hhbmdlcy5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoZGJOYW1lLCBpZCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCEoaWQgaW4gdGhpcy5fbGlzdGVuZXJzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBFRS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIuY2FsbCh0aGlzLCBkYk5hbWUsXG4gICAgdGhpcy5fbGlzdGVuZXJzW2lkXSk7XG4gIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xufTtcblxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuQ2hhbmdlcy5wcm90b3R5cGUubm90aWZ5TG9jYWxXaW5kb3dzID0gZnVuY3Rpb24gKGRiTmFtZSkge1xuICAvL2RvIGEgdXNlbGVzcyBjaGFuZ2Ugb24gYSBzdG9yYWdlIHRoaW5nXG4gIC8vaW4gb3JkZXIgdG8gZ2V0IG90aGVyIHdpbmRvd3MncyBsaXN0ZW5lcnMgdG8gYWN0aXZhdGVcbiAgaWYgKGhhc0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgbG9jYWxTdG9yYWdlW2RiTmFtZV0gPSAobG9jYWxTdG9yYWdlW2RiTmFtZV0gPT09IFwiYVwiKSA/IFwiYlwiIDogXCJhXCI7XG4gIH1cbn07XG5cbkNoYW5nZXMucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIChkYk5hbWUpIHtcbiAgdGhpcy5lbWl0KGRiTmFtZSk7XG4gIHRoaXMubm90aWZ5TG9jYWxXaW5kb3dzKGRiTmFtZSk7XG59O1xuXG5mdW5jdGlvbiBndWFyZGVkQ29uc29sZShtZXRob2QpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZVttZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGNvbnNvbGVbbWV0aG9kXS5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByYW5kb21OdW1iZXIobWluLCBtYXgpIHtcbiAgdmFyIG1heFRpbWVvdXQgPSA2MDAwMDA7IC8vIEhhcmQtY29kZWQgZGVmYXVsdCBvZiAxMCBtaW51dGVzXG4gIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApIHx8IDA7XG4gIG1heCA9IHBhcnNlSW50KG1heCwgMTApO1xuICBpZiAobWF4ICE9PSBtYXggfHwgbWF4IDw9IG1pbikge1xuICAgIG1heCA9IChtaW4gfHwgMSkgPDwgMTsgLy9kb3VibGluZ1xuICB9IGVsc2Uge1xuICAgIG1heCA9IG1heCArIDE7XG4gIH1cbiAgLy8gSW4gb3JkZXIgdG8gbm90IGV4Y2VlZCBtYXhUaW1lb3V0LCBwaWNrIGEgcmFuZG9tIHZhbHVlIGJldHdlZW4gaGFsZiBvZiBtYXhUaW1lb3V0IGFuZCBtYXhUaW1lb3V0XG4gIGlmIChtYXggPiBtYXhUaW1lb3V0KSB7XG4gICAgbWluID0gbWF4VGltZW91dCA+PiAxOyAvLyBkaXZpZGUgYnkgdHdvXG4gICAgbWF4ID0gbWF4VGltZW91dDtcbiAgfVxuICB2YXIgcmF0aW8gPSBNYXRoLnJhbmRvbSgpO1xuICB2YXIgcmFuZ2UgPSBtYXggLSBtaW47XG5cbiAgcmV0dXJuIH5+KHJhbmdlICogcmF0aW8gKyBtaW4pOyAvLyB+fiBjb2VyY2VzIHRvIGFuIGludCwgYnV0IGZhc3QuXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRCYWNrT2ZmKG1pbikge1xuICB2YXIgbWF4ID0gMDtcbiAgaWYgKCFtaW4pIHtcbiAgICBtYXggPSAyMDAwO1xuICB9XG4gIHJldHVybiByYW5kb21OdW1iZXIobWluLCBtYXgpO1xufVxuXG4vLyBkZXNpZ25lZCB0byBnaXZlIGluZm8gdG8gYnJvd3NlciB1c2Vycywgd2hvIGFyZSBkaXN0dXJiZWRcbi8vIHdoZW4gdGhleSBzZWUgaHR0cCBlcnJvcnMgaW4gdGhlIGNvbnNvbGVcbmZ1bmN0aW9uIGV4cGxhaW5FcnJvcihzdGF0dXMsIHN0cikge1xuICBndWFyZGVkQ29uc29sZSgnaW5mbycsICdUaGUgYWJvdmUgJyArIHN0YXR1cyArICcgaXMgdG90YWxseSBub3JtYWwuICcgKyBzdHIpO1xufVxuXG52YXIgYXNzaWduO1xue1xuICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuICB9IGVsc2Uge1xuICAgIC8vIGxpdGUgT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbCBiYXNlZCBvblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAgICBhc3NpZ24gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH07XG4gIH1cbn1cblxudmFyICRpbmplY3RfT2JqZWN0X2Fzc2lnbiA9IGFzc2lnbjtcblxuaW5oZXJpdHMoUG91Y2hFcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiBQb3VjaEVycm9yKHN0YXR1cywgZXJyb3IsIHJlYXNvbikge1xuICBFcnJvci5jYWxsKHRoaXMsIHJlYXNvbik7XG4gIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICB0aGlzLm5hbWUgPSBlcnJvcjtcbiAgdGhpcy5tZXNzYWdlID0gcmVhc29uO1xuICB0aGlzLmVycm9yID0gdHJ1ZTtcbn1cblxuUG91Y2hFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgIHJlYXNvbjogdGhpcy5yZWFzb25cbiAgfSk7XG59O1xuXG52YXIgVU5BVVRIT1JJWkVEID0gbmV3IFBvdWNoRXJyb3IoNDAxLCAndW5hdXRob3JpemVkJywgXCJOYW1lIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdC5cIik7XG52YXIgTUlTU0lOR19CVUxLX0RPQ1MgPSBuZXcgUG91Y2hFcnJvcig0MDAsICdiYWRfcmVxdWVzdCcsIFwiTWlzc2luZyBKU09OIGxpc3Qgb2YgJ2RvY3MnXCIpO1xudmFyIE1JU1NJTkdfRE9DID0gbmV3IFBvdWNoRXJyb3IoNDA0LCAnbm90X2ZvdW5kJywgJ21pc3NpbmcnKTtcbnZhciBSRVZfQ09ORkxJQ1QgPSBuZXcgUG91Y2hFcnJvcig0MDksICdjb25mbGljdCcsICdEb2N1bWVudCB1cGRhdGUgY29uZmxpY3QnKTtcbnZhciBJTlZBTElEX0lEID0gbmV3IFBvdWNoRXJyb3IoNDAwLCAnYmFkX3JlcXVlc3QnLCAnX2lkIGZpZWxkIG11c3QgY29udGFpbiBhIHN0cmluZycpO1xudmFyIE1JU1NJTkdfSUQgPSBuZXcgUG91Y2hFcnJvcig0MTIsICdtaXNzaW5nX2lkJywgJ19pZCBpcyByZXF1aXJlZCBmb3IgcHV0cycpO1xudmFyIFJFU0VSVkVEX0lEID0gbmV3IFBvdWNoRXJyb3IoNDAwLCAnYmFkX3JlcXVlc3QnLCAnT25seSByZXNlcnZlZCBkb2N1bWVudCBpZHMgbWF5IHN0YXJ0IHdpdGggdW5kZXJzY29yZS4nKTtcbnZhciBOT1RfT1BFTiA9IG5ldyBQb3VjaEVycm9yKDQxMiwgJ3ByZWNvbmRpdGlvbl9mYWlsZWQnLCAnRGF0YWJhc2Ugbm90IG9wZW4nKTtcbnZhciBVTktOT1dOX0VSUk9SID0gbmV3IFBvdWNoRXJyb3IoNTAwLCAndW5rbm93bl9lcnJvcicsICdEYXRhYmFzZSBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGVycm9yJyk7XG52YXIgQkFEX0FSRyA9IG5ldyBQb3VjaEVycm9yKDUwMCwgJ2JhZGFyZycsICdTb21lIHF1ZXJ5IGFyZ3VtZW50IGlzIGludmFsaWQnKTtcbnZhciBJTlZBTElEX1JFUVVFU1QgPSBuZXcgUG91Y2hFcnJvcig0MDAsICdpbnZhbGlkX3JlcXVlc3QnLCAnUmVxdWVzdCB3YXMgaW52YWxpZCcpO1xudmFyIFFVRVJZX1BBUlNFX0VSUk9SID0gbmV3IFBvdWNoRXJyb3IoNDAwLCAncXVlcnlfcGFyc2VfZXJyb3InLCAnU29tZSBxdWVyeSBwYXJhbWV0ZXIgaXMgaW52YWxpZCcpO1xudmFyIERPQ19WQUxJREFUSU9OID0gbmV3IFBvdWNoRXJyb3IoNTAwLCAnZG9jX3ZhbGlkYXRpb24nLCAnQmFkIHNwZWNpYWwgZG9jdW1lbnQgbWVtYmVyJyk7XG52YXIgQkFEX1JFUVVFU1QgPSBuZXcgUG91Y2hFcnJvcig0MDAsICdiYWRfcmVxdWVzdCcsICdTb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgcmVxdWVzdCcpO1xudmFyIE5PVF9BTl9PQkpFQ1QgPSBuZXcgUG91Y2hFcnJvcig0MDAsICdiYWRfcmVxdWVzdCcsICdEb2N1bWVudCBtdXN0IGJlIGEgSlNPTiBvYmplY3QnKTtcbnZhciBEQl9NSVNTSU5HID0gbmV3IFBvdWNoRXJyb3IoNDA0LCAnbm90X2ZvdW5kJywgJ0RhdGFiYXNlIG5vdCBmb3VuZCcpO1xudmFyIElEQl9FUlJPUiA9IG5ldyBQb3VjaEVycm9yKDUwMCwgJ2luZGV4ZWRfZGJfd2VudF9iYWQnLCAndW5rbm93bicpO1xudmFyIFdTUV9FUlJPUiA9IG5ldyBQb3VjaEVycm9yKDUwMCwgJ3dlYl9zcWxfd2VudF9iYWQnLCAndW5rbm93bicpO1xudmFyIExEQl9FUlJPUiA9IG5ldyBQb3VjaEVycm9yKDUwMCwgJ2xldmVsREJfd2VudF93ZW50X2JhZCcsICd1bmtub3duJyk7XG52YXIgRk9SQklEREVOID0gbmV3IFBvdWNoRXJyb3IoNDAzLCAnZm9yYmlkZGVuJywgJ0ZvcmJpZGRlbiBieSBkZXNpZ24gZG9jIHZhbGlkYXRlX2RvY191cGRhdGUgZnVuY3Rpb24nKTtcbnZhciBJTlZBTElEX1JFViA9IG5ldyBQb3VjaEVycm9yKDQwMCwgJ2JhZF9yZXF1ZXN0JywgJ0ludmFsaWQgcmV2IGZvcm1hdCcpO1xudmFyIEZJTEVfRVhJU1RTID0gbmV3IFBvdWNoRXJyb3IoNDEyLCAnZmlsZV9leGlzdHMnLCAnVGhlIGRhdGFiYXNlIGNvdWxkIG5vdCBiZSBjcmVhdGVkLCB0aGUgZmlsZSBhbHJlYWR5IGV4aXN0cy4nKTtcbnZhciBNSVNTSU5HX1NUVUIgPSBuZXcgUG91Y2hFcnJvcig0MTIsICdtaXNzaW5nX3N0dWInLCAnQSBwcmUtZXhpc3RpbmcgYXR0YWNobWVudCBzdHViIHdhc25cXCd0IGZvdW5kJyk7XG52YXIgSU5WQUxJRF9VUkwgPSBuZXcgUG91Y2hFcnJvcig0MTMsICdpbnZhbGlkX3VybCcsICdQcm92aWRlZCBVUkwgaXMgaW52YWxpZCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVFcnJvcihlcnJvciwgcmVhc29uKSB7XG4gIGZ1bmN0aW9uIEN1c3RvbVBvdWNoRXJyb3IocmVhc29uKSB7XG4gICAgLy8gaW5oZXJpdCBlcnJvciBwcm9wZXJ0aWVzIGZyb20gb3VyIHBhcmVudCBlcnJvciBtYW51YWxseVxuICAgIC8vIHNvIGFzIHRvIGFsbG93IHByb3BlciBKU09OIHBhcnNpbmcuXG4gICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgIHZhciBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycm9yKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3JbbmFtZXNbaV1dICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXNbbmFtZXNbaV1dID0gZXJyb3JbbmFtZXNbaV1dO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgIGlmIChyZWFzb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gICAgfVxuICB9XG4gIEN1c3RvbVBvdWNoRXJyb3IucHJvdG90eXBlID0gUG91Y2hFcnJvci5wcm90b3R5cGU7XG4gIHJldHVybiBuZXcgQ3VzdG9tUG91Y2hFcnJvcihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVycm9yRnJvbVJlc3BvbnNlKGVycikge1xuXG4gIGlmICh0eXBlb2YgZXJyICE9PSAnb2JqZWN0Jykge1xuICAgIHZhciBkYXRhID0gZXJyO1xuICAgIGVyciA9IFVOS05PV05fRVJST1I7XG4gICAgZXJyLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCdlcnJvcicgaW4gZXJyICYmIGVyci5lcnJvciA9PT0gJ2NvbmZsaWN0Jykge1xuICAgIGVyci5uYW1lID0gJ2NvbmZsaWN0JztcbiAgICBlcnIuc3RhdHVzID0gNDA5O1xuICB9XG5cbiAgaWYgKCEoJ25hbWUnIGluIGVycikpIHtcbiAgICBlcnIubmFtZSA9IGVyci5lcnJvciB8fCAndW5rbm93bic7XG4gIH1cblxuICBpZiAoISgnc3RhdHVzJyBpbiBlcnIpKSB7XG4gICAgZXJyLnN0YXR1cyA9IDUwMDtcbiAgfVxuXG4gIGlmICghKCdtZXNzYWdlJyBpbiBlcnIpKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZSB8fCBlcnIucmVhc29uO1xuICB9XG5cbiAgcmV0dXJuIGVycjtcbn1cblxuZnVuY3Rpb24gdHJ5RmlsdGVyKGZpbHRlciwgZG9jLCByZXEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gIWZpbHRlcihkb2MsIHJlcSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhciBtc2cgPSAnRmlsdGVyIGZ1bmN0aW9uIHRocmV3OiAnICsgZXJyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIGNyZWF0ZUVycm9yKEJBRF9SRVFVRVNULCBtc2cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlckNoYW5nZShvcHRzKSB7XG4gIHZhciByZXEgPSB7fTtcbiAgdmFyIGhhc0ZpbHRlciA9IG9wdHMuZmlsdGVyICYmIHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJztcbiAgcmVxLnF1ZXJ5ID0gb3B0cy5xdWVyeV9wYXJhbXM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGZpbHRlcihjaGFuZ2UpIHtcbiAgICBpZiAoIWNoYW5nZS5kb2MpIHtcbiAgICAgIC8vIENTRyBzZW5kcyBldmVudHMgb24gdGhlIGNoYW5nZXMgZmVlZCB0aGF0IGRvbid0IGhhdmUgZG9jdW1lbnRzLFxuICAgICAgLy8gdGhpcyBoYWNrIG1ha2VzIGEgd2hvbGUgbG90IG9mIGV4aXN0aW5nIGNvZGUgcm9idXN0LlxuICAgICAgY2hhbmdlLmRvYyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBmaWx0ZXJSZXR1cm4gPSBoYXNGaWx0ZXIgJiYgdHJ5RmlsdGVyKG9wdHMuZmlsdGVyLCBjaGFuZ2UuZG9jLCByZXEpO1xuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXJSZXR1cm4gPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmlsdGVyUmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaWx0ZXJSZXR1cm4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuaW5jbHVkZV9kb2NzKSB7XG4gICAgICBkZWxldGUgY2hhbmdlLmRvYztcbiAgICB9IGVsc2UgaWYgKCFvcHRzLmF0dGFjaG1lbnRzKSB7XG4gICAgICBmb3IgKHZhciBhdHQgaW4gY2hhbmdlLmRvYy5fYXR0YWNobWVudHMpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGNoYW5nZS5kb2MuX2F0dGFjaG1lbnRzLmhhc093blByb3BlcnR5KGF0dCkpIHtcbiAgICAgICAgICBjaGFuZ2UuZG9jLl9hdHRhY2htZW50c1thdHRdLnN0dWIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuKGFycnMpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHJlcyA9IHJlcy5jb25jYXQoYXJyc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLy8gc2hpbSBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUsXG5cbi8vIERldGVybWluZSBpZCBhbiBJRCBpcyB2YWxpZFxuLy8gICAtIGludmFsaWQgSURzIGJlZ2luIHdpdGggYW4gdW5kZXJlc2NvcmUgdGhhdCBkb2VzIG5vdCBiZWdpbiAnX2Rlc2lnbicgb3Jcbi8vICAgICAnX2xvY2FsJ1xuLy8gICAtIGFueSBvdGhlciBzdHJpbmcgdmFsdWUgaXMgYSB2YWxpZCBpZFxuLy8gUmV0dXJucyB0aGUgc3BlY2lmaWMgZXJyb3Igb2JqZWN0IGZvciBlYWNoIGNhc2VcbmZ1bmN0aW9uIGludmFsaWRJZEVycm9yKGlkKSB7XG4gIHZhciBlcnI7XG4gIGlmICghaWQpIHtcbiAgICBlcnIgPSBjcmVhdGVFcnJvcihNSVNTSU5HX0lEKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgZXJyID0gY3JlYXRlRXJyb3IoSU5WQUxJRF9JRCk7XG4gIH0gZWxzZSBpZiAoL15fLy50ZXN0KGlkKSAmJiAhKC9eXyhkZXNpZ258bG9jYWwpLykudGVzdChpZCkpIHtcbiAgICBlcnIgPSBjcmVhdGVFcnJvcihSRVNFUlZFRF9JRCk7XG4gIH1cbiAgaWYgKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG4vLyBDaGVja3MgaWYgYSBQb3VjaERCIG9iamVjdCBpcyBcInJlbW90ZVwiIG9yIG5vdC4gVGhpcyBpc1xuXG5mdW5jdGlvbiBpc1JlbW90ZShkYikge1xuICBpZiAodHlwZW9mIGRiLl9yZW1vdGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBkYi5fcmVtb3RlO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0eXBlb2YgZGIudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGd1YXJkZWRDb25zb2xlKCd3YXJuJyxcbiAgICAgICdkYi50eXBlKCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgK1xuICAgICAgJ2EgZnV0dXJlIHZlcnNpb24gb2YgUG91Y2hEQicpO1xuICAgIHJldHVybiBkYi50eXBlKCkgPT09ICdodHRwJztcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZWUsIHR5cGUpIHtcbiAgcmV0dXJuICdsaXN0ZW5lckNvdW50JyBpbiBlZSA/IGVlLmxpc3RlbmVyQ291bnQodHlwZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRUUubGlzdGVuZXJDb3VudChlZSwgdHlwZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGVzaWduRG9jRnVuY3Rpb25OYW1lKHMpIHtcbiAgaWYgKCFzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIHBhcnRzID0gcy5zcGxpdCgnLycpO1xuICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgcmV0dXJuIHBhcnRzO1xuICB9XG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gW3MsIHNdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVEZXNpZ25Eb2NGdW5jdGlvbk5hbWUocykge1xuICB2YXIgbm9ybWFsaXplZCA9IHBhcnNlRGVzaWduRG9jRnVuY3Rpb25OYW1lKHMpO1xuICByZXR1cm4gbm9ybWFsaXplZCA/IG5vcm1hbGl6ZWQuam9pbignLycpIDogbnVsbDtcbn1cblxuLy8gb3JpZ2luYWxseSBwYXJzZVVyaSAxLjIuMiwgbm93IHBhdGNoZWQgYnkgdXNcbi8vIChjKSBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbi8vIE1JVCBMaWNlbnNlXG52YXIga2V5cyA9IFtcInNvdXJjZVwiLCBcInByb3RvY29sXCIsIFwiYXV0aG9yaXR5XCIsIFwidXNlckluZm9cIiwgXCJ1c2VyXCIsIFwicGFzc3dvcmRcIixcbiAgICBcImhvc3RcIiwgXCJwb3J0XCIsIFwicmVsYXRpdmVcIiwgXCJwYXRoXCIsIFwiZGlyZWN0b3J5XCIsIFwiZmlsZVwiLCBcInF1ZXJ5XCIsIFwiYW5jaG9yXCJdO1xudmFyIHFOYW1lID1cInF1ZXJ5S2V5XCI7XG52YXIgcVBhcnNlciA9IC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZztcblxuLy8gdXNlIHRoZSBcImxvb3NlXCIgcGFyc2VyXG4vKiBlc2xpbnQgbWF4bGVuOiAwLCBuby11c2VsZXNzLWVzY2FwZTogMCAqL1xudmFyIHBhcnNlciA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKFteOlxcLz8jLl0rKTopPyg/OlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxuZnVuY3Rpb24gcGFyc2VVcmkoc3RyKSB7XG4gIHZhciBtID0gcGFyc2VyLmV4ZWMoc3RyKTtcbiAgdmFyIHVyaSA9IHt9O1xuICB2YXIgaSA9IDE0O1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgdmFsdWUgPSBtW2ldIHx8IFwiXCI7XG4gICAgdmFyIGVuY29kZWQgPSBbJ3VzZXInLCAncGFzc3dvcmQnXS5pbmRleE9mKGtleSkgIT09IC0xO1xuICAgIHVyaVtrZXldID0gZW5jb2RlZCA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuXG4gIHVyaVtxTmFtZV0gPSB7fTtcbiAgdXJpW2tleXNbMTJdXS5yZXBsYWNlKHFQYXJzZXIsIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgaWYgKCQxKSB7XG4gICAgICB1cmlbcU5hbWVdWyQxXSA9ICQyO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHVyaTtcbn1cblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2FsZXhkYXZpZC9zY29wZS1ldmFsIHYwLjAuM1xuLy8gKHNvdXJjZTogaHR0cHM6Ly91bnBrZy5jb20vc2NvcGUtZXZhbEAwLjAuMy9zY29wZV9ldmFsLmpzKVxuLy8gVGhpcyBpcyBiYXNpY2FsbHkganVzdCBhIHdyYXBwZXIgYXJvdW5kIG5ldyBGdW5jdGlvbigpXG5cbmZ1bmN0aW9uIHNjb3BlRXZhbChzb3VyY2UsIHNjb3BlKSB7XG4gIHZhciBrZXlzID0gW107XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIHNjb3BlKSB7XG4gICAgaWYgKHNjb3BlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgdmFsdWVzLnB1c2goc2NvcGVba2V5XSk7XG4gICAgfVxuICB9XG4gIGtleXMucHVzaChzb3VyY2UpO1xuICByZXR1cm4gRnVuY3Rpb24uYXBwbHkobnVsbCwga2V5cykuYXBwbHkobnVsbCwgdmFsdWVzKTtcbn1cblxuLy8gdGhpcyBpcyBlc3NlbnRpYWxseSB0aGUgXCJ1cGRhdGUgc3VnYXJcIiBmdW5jdGlvbiBmcm9tIGRhbGVoYXJ2ZXkvcG91Y2hkYiMxMzg4XG4vLyB0aGUgZGlmZkZ1biB0ZWxscyB1cyB3aGF0IGRlbHRhIHRvIGFwcGx5IHRvIHRoZSBkb2MuICBpdCBlaXRoZXIgcmV0dXJuc1xuLy8gdGhlIGRvYywgb3IgZmFsc2UgaWYgaXQgZG9lc24ndCBuZWVkIHRvIGRvIGFuIHVwZGF0ZSBhZnRlciBhbGxcbmZ1bmN0aW9uIHVwc2VydChkYiwgZG9jSWQsIGRpZmZGdW4pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcbiAgICBkYi5nZXQoZG9jSWQsIGZ1bmN0aW9uIChlcnIsIGRvYykge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoZXJyLnN0YXR1cyAhPT0gNDA0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGRvYyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgdXNlciBtaWdodCBjaGFuZ2UgdGhlIF9yZXYsIHNvIHNhdmUgaXQgZm9yIHBvc3Rlcml0eVxuICAgICAgdmFyIGRvY1JldiA9IGRvYy5fcmV2O1xuICAgICAgdmFyIG5ld0RvYyA9IGRpZmZGdW4oZG9jKTtcblxuICAgICAgaWYgKCFuZXdEb2MpIHtcbiAgICAgICAgLy8gaWYgdGhlIGRpZmZGdW4gcmV0dXJucyBmYWxzeSwgd2Ugc2hvcnQtY2lyY3VpdCBhc1xuICAgICAgICAvLyBhbiBvcHRpbWl6YXRpb25cbiAgICAgICAgcmV0dXJuIGZ1bGZpbGwoe3VwZGF0ZWQ6IGZhbHNlLCByZXY6IGRvY1Jldn0pO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2VycyBhcmVuJ3QgYWxsb3dlZCB0byBtb2RpZnkgdGhlc2UgdmFsdWVzLFxuICAgICAgLy8gc28gcmVzZXQgdGhlbSBoZXJlXG4gICAgICBuZXdEb2MuX2lkID0gZG9jSWQ7XG4gICAgICBuZXdEb2MuX3JldiA9IGRvY1JldjtcbiAgICAgIGZ1bGZpbGwodHJ5QW5kUHV0KGRiLCBuZXdEb2MsIGRpZmZGdW4pKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyeUFuZFB1dChkYiwgZG9jLCBkaWZmRnVuKSB7XG4gIHJldHVybiBkYi5wdXQoZG9jKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlZDogdHJ1ZSxcbiAgICAgIHJldjogcmVzLnJldlxuICAgIH07XG4gIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChlcnIuc3RhdHVzICE9PSA0MDkpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHVwc2VydChkYiwgZG9jLl9pZCwgZGlmZkZ1bik7XG4gIH0pO1xufVxuXG52YXIgdGhpc0F0b2IgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBhdG9iKHN0cik7XG59O1xuXG52YXIgdGhpc0J0b2EgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBidG9hKHN0cik7XG59O1xuXG4vLyBBYnN0cmFjdHMgY29uc3RydWN0aW5nIGEgQmxvYiBvYmplY3QsIHNvIGl0IGFsc28gd29ya3MgaW4gb2xkZXJcbi8vIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgbmF0aXZlIEJsb2IgY29uc3RydWN0b3IgKGUuZy5cbi8vIG9sZCBRdFdlYktpdCB2ZXJzaW9ucywgQW5kcm9pZCA8IDQuNCkuXG5mdW5jdGlvbiBjcmVhdGVCbG9iKHBhcnRzLCBwcm9wZXJ0aWVzKSB7XG4gIC8qIGdsb2JhbCBCbG9iQnVpbGRlcixNU0Jsb2JCdWlsZGVyLE1vekJsb2JCdWlsZGVyLFdlYktpdEJsb2JCdWlsZGVyICovXG4gIHBhcnRzID0gcGFydHMgfHwgW107XG4gIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgQmxvYihwYXJ0cywgcHJvcGVydGllcyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZS5uYW1lICE9PSBcIlR5cGVFcnJvclwiKSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICB2YXIgQnVpbGRlciA9IHR5cGVvZiBCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iQnVpbGRlciA6XG4gICAgICAgICAgICAgICAgICB0eXBlb2YgTVNCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBNU0Jsb2JCdWlsZGVyIDpcbiAgICAgICAgICAgICAgICAgIHR5cGVvZiBNb3pCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBNb3pCbG9iQnVpbGRlciA6XG4gICAgICAgICAgICAgICAgICBXZWJLaXRCbG9iQnVpbGRlcjtcbiAgICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYnVpbGRlci5hcHBlbmQocGFydHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYnVpbGRlci5nZXRCbG9iKHByb3BlcnRpZXMudHlwZSk7XG4gIH1cbn1cblxuLy8gRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0OTY3NjQ3LyAoY29udGludWVzIG9uIG5leHQgbGluZSlcbi8vIGVuY29kZS1kZWNvZGUtaW1hZ2Utd2l0aC1iYXNlNjQtYnJlYWtzLWltYWdlICgyMDEzLTA0LTIxKVxuZnVuY3Rpb24gYmluYXJ5U3RyaW5nVG9BcnJheUJ1ZmZlcihiaW4pIHtcbiAgdmFyIGxlbmd0aCA9IGJpbi5sZW5ndGg7XG4gIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoKTtcbiAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBhcnJbaV0gPSBiaW4uY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYnVmO1xufVxuXG5mdW5jdGlvbiBiaW5TdHJpbmdUb0JsdWZmZXIoYmluU3RyaW5nLCB0eXBlKSB7XG4gIHJldHVybiBjcmVhdGVCbG9iKFtiaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyKGJpblN0cmluZyldLCB7dHlwZTogdHlwZX0pO1xufVxuXG5mdW5jdGlvbiBiNjRUb0JsdWZmZXIoYjY0LCB0eXBlKSB7XG4gIHJldHVybiBiaW5TdHJpbmdUb0JsdWZmZXIodGhpc0F0b2IoYjY0KSwgdHlwZSk7XG59XG5cbi8vQ2FuJ3QgZmluZCBvcmlnaW5hbCBwb3N0LCBidXQgdGhpcyBpcyBjbG9zZVxuLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzY5NjUxMDcvIChjb250aW51ZXMgb24gbmV4dCBsaW5lKVxuLy9jb252ZXJ0aW5nLWJldHdlZW4tc3RyaW5ncy1hbmQtYXJyYXlidWZmZXJzXG5mdW5jdGlvbiBhcnJheUJ1ZmZlclRvQmluYXJ5U3RyaW5nKGJ1ZmZlcikge1xuICB2YXIgYmluYXJ5ID0gJyc7XG4gIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gIHZhciBsZW5ndGggPSBieXRlcy5ieXRlTGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICB9XG4gIHJldHVybiBiaW5hcnk7XG59XG5cbi8vIHNoaW0gZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBpdFxuZnVuY3Rpb24gcmVhZEFzQmluYXJ5U3RyaW5nKGJsb2IsIGNhbGxiYWNrKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICB2YXIgaGFzQmluYXJ5U3RyaW5nID0gdHlwZW9mIHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcgPT09ICdmdW5jdGlvbic7XG4gIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciByZXN1bHQgPSBlLnRhcmdldC5yZXN1bHQgfHwgJyc7XG4gICAgaWYgKGhhc0JpbmFyeVN0cmluZykge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgfVxuICAgIGNhbGxiYWNrKGFycmF5QnVmZmVyVG9CaW5hcnlTdHJpbmcocmVzdWx0KSk7XG4gIH07XG4gIGlmIChoYXNCaW5hcnlTdHJpbmcpIHtcbiAgICByZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nKGJsb2IpO1xuICB9IGVsc2Uge1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBibG9iVG9CaW5hcnlTdHJpbmcoYmxvYk9yQnVmZmVyLCBjYWxsYmFjaykge1xuICByZWFkQXNCaW5hcnlTdHJpbmcoYmxvYk9yQnVmZmVyLCBmdW5jdGlvbiAoYmluKSB7XG4gICAgY2FsbGJhY2soYmluKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJsb2JUb0Jhc2U2NChibG9iT3JCdWZmZXIsIGNhbGxiYWNrKSB7XG4gIGJsb2JUb0JpbmFyeVN0cmluZyhibG9iT3JCdWZmZXIsIGZ1bmN0aW9uIChiYXNlNjQpIHtcbiAgICBjYWxsYmFjayh0aGlzQnRvYShiYXNlNjQpKTtcbiAgfSk7XG59XG5cbi8vIHNpbXBsaWZpZWQgQVBJLiB1bml2ZXJzYWwgYnJvd3NlciBzdXBwb3J0IGlzIGFzc3VtZWRcbmZ1bmN0aW9uIHJlYWRBc0FycmF5QnVmZmVyKGJsb2IsIGNhbGxiYWNrKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZS50YXJnZXQucmVzdWx0IHx8IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9O1xuICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG59XG5cbi8vIHRoaXMgaXMgbm90IHVzZWQgaW4gdGhlIGJyb3dzZXJcblxudmFyIHNldEltbWVkaWF0ZVNoaW0gPSBzZWxmLnNldEltbWVkaWF0ZSB8fCBzZWxmLnNldFRpbWVvdXQ7XG52YXIgTUQ1X0NIVU5LX1NJWkUgPSAzMjc2ODtcblxuZnVuY3Rpb24gcmF3VG9CYXNlNjQocmF3KSB7XG4gIHJldHVybiB0aGlzQnRvYShyYXcpO1xufVxuXG5mdW5jdGlvbiBzbGljZUJsb2IoYmxvYiwgc3RhcnQsIGVuZCkge1xuICBpZiAoYmxvYi53ZWJraXRTbGljZSkge1xuICAgIHJldHVybiBibG9iLndlYmtpdFNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG4gIHJldHVybiBibG9iLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRCbG9iKGJ1ZmZlciwgYmxvYiwgc3RhcnQsIGVuZCwgY2FsbGJhY2spIHtcbiAgaWYgKHN0YXJ0ID4gMCB8fCBlbmQgPCBibG9iLnNpemUpIHtcbiAgICAvLyBvbmx5IHNsaWNlIGJsb2IgaWYgd2UgcmVhbGx5IG5lZWQgdG9cbiAgICBibG9iID0gc2xpY2VCbG9iKGJsb2IsIHN0YXJ0LCBlbmQpO1xuICB9XG4gIHJlYWRBc0FycmF5QnVmZmVyKGJsb2IsIGZ1bmN0aW9uIChhcnJheUJ1ZmZlcikge1xuICAgIGJ1ZmZlci5hcHBlbmQoYXJyYXlCdWZmZXIpO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRTdHJpbmcoYnVmZmVyLCBzdHJpbmcsIHN0YXJ0LCBlbmQsIGNhbGxiYWNrKSB7XG4gIGlmIChzdGFydCA+IDAgfHwgZW5kIDwgc3RyaW5nLmxlbmd0aCkge1xuICAgIC8vIG9ubHkgY3JlYXRlIGEgc3Vic3RyaW5nIGlmIHdlIHJlYWxseSBuZWVkIHRvXG4gICAgc3RyaW5nID0gc3RyaW5nLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgfVxuICBidWZmZXIuYXBwZW5kQmluYXJ5KHN0cmluZyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cbmZ1bmN0aW9uIGJpbmFyeU1kNShkYXRhLCBjYWxsYmFjaykge1xuICB2YXIgaW5wdXRJc1N0cmluZyA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJztcbiAgdmFyIGxlbiA9IGlucHV0SXNTdHJpbmcgPyBkYXRhLmxlbmd0aCA6IGRhdGEuc2l6ZTtcbiAgdmFyIGNodW5rU2l6ZSA9IE1hdGgubWluKE1ENV9DSFVOS19TSVpFLCBsZW4pO1xuICB2YXIgY2h1bmtzID0gTWF0aC5jZWlsKGxlbiAvIGNodW5rU2l6ZSk7XG4gIHZhciBjdXJyZW50Q2h1bmsgPSAwO1xuICB2YXIgYnVmZmVyID0gaW5wdXRJc1N0cmluZyA/IG5ldyBNZDUoKSA6IG5ldyBNZDUuQXJyYXlCdWZmZXIoKTtcblxuICB2YXIgYXBwZW5kID0gaW5wdXRJc1N0cmluZyA/IGFwcGVuZFN0cmluZyA6IGFwcGVuZEJsb2I7XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBzZXRJbW1lZGlhdGVTaGltKGxvYWROZXh0Q2h1bmspO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICB2YXIgcmF3ID0gYnVmZmVyLmVuZCh0cnVlKTtcbiAgICB2YXIgYmFzZTY0ID0gcmF3VG9CYXNlNjQocmF3KTtcbiAgICBjYWxsYmFjayhiYXNlNjQpO1xuICAgIGJ1ZmZlci5kZXN0cm95KCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkTmV4dENodW5rKCkge1xuICAgIHZhciBzdGFydCA9IGN1cnJlbnRDaHVuayAqIGNodW5rU2l6ZTtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBjaHVua1NpemU7XG4gICAgY3VycmVudENodW5rKys7XG4gICAgaWYgKGN1cnJlbnRDaHVuayA8IGNodW5rcykge1xuICAgICAgYXBwZW5kKGJ1ZmZlciwgZGF0YSwgc3RhcnQsIGVuZCwgbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZChidWZmZXIsIGRhdGEsIHN0YXJ0LCBlbmQsIGRvbmUpO1xuICAgIH1cbiAgfVxuICBsb2FkTmV4dENodW5rKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ01kNShzdHJpbmcpIHtcbiAgcmV0dXJuIE1kNS5oYXNoKHN0cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJldihkb2MsIGRldGVybWluaXN0aWNfcmV2cykge1xuICB2YXIgY2xvbmVkRG9jID0gY2xvbmUoZG9jKTtcbiAgaWYgKCFkZXRlcm1pbmlzdGljX3JldnMpIHtcbiAgICByZXR1cm4gdjQoKS5yZXBsYWNlKC8tL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZGVsZXRlIGNsb25lZERvYy5fcmV2X3RyZWU7XG4gIHJldHVybiBzdHJpbmdNZDUoSlNPTi5zdHJpbmdpZnkoY2xvbmVkRG9jKSk7XG59XG5cbnZhciB1dWlkID0gdjQ7IC8vIG1pbWljIG9sZCBpbXBvcnQsIG9ubHkgdjQgaXMgZXZlciB1c2VkIGVsc2V3aGVyZVxuXG4vLyBXZSBmZXRjaCBhbGwgbGVhZnMgb2YgdGhlIHJldmlzaW9uIHRyZWUsIGFuZCBzb3J0IHRoZW0gYmFzZWQgb24gdHJlZSBsZW5ndGhcbi8vIGFuZCB3aGV0aGVyIHRoZXkgd2VyZSBkZWxldGVkLCB1bmRlbGV0ZWQgZG9jdW1lbnRzIHdpdGggdGhlIGxvbmdlc3QgcmV2aXNpb25cbi8vIHRyZWUgKG1vc3QgZWRpdHMpIHdpblxuLy8gVGhlIGZpbmFsIHNvcnQgYWxnb3JpdGhtIGlzIHNsaWdodGx5IGRvY3VtZW50ZWQgaW4gYSBzaWRlYmFyIGhlcmU6XG4vLyBodHRwOi8vZ3VpZGUuY291Y2hkYi5vcmcvZHJhZnQvY29uZmxpY3RzLmh0bWxcbmZ1bmN0aW9uIHdpbm5pbmdSZXYobWV0YWRhdGEpIHtcbiAgdmFyIHdpbm5pbmdJZDtcbiAgdmFyIHdpbm5pbmdQb3M7XG4gIHZhciB3aW5uaW5nRGVsZXRlZDtcbiAgdmFyIHRvVmlzaXQgPSBtZXRhZGF0YS5yZXZfdHJlZS5zbGljZSgpO1xuICB2YXIgbm9kZTtcbiAgd2hpbGUgKChub2RlID0gdG9WaXNpdC5wb3AoKSkpIHtcbiAgICB2YXIgdHJlZSA9IG5vZGUuaWRzO1xuICAgIHZhciBicmFuY2hlcyA9IHRyZWVbMl07XG4gICAgdmFyIHBvcyA9IG5vZGUucG9zO1xuICAgIGlmIChicmFuY2hlcy5sZW5ndGgpIHsgLy8gbm9uLWxlYWZcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBicmFuY2hlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0b1Zpc2l0LnB1c2goe3BvczogcG9zICsgMSwgaWRzOiBicmFuY2hlc1tpXX0pO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBkZWxldGVkID0gISF0cmVlWzFdLmRlbGV0ZWQ7XG4gICAgdmFyIGlkID0gdHJlZVswXTtcbiAgICAvLyBzb3J0IGJ5IGRlbGV0ZWQsIHRoZW4gcG9zLCB0aGVuIGlkXG4gICAgaWYgKCF3aW5uaW5nSWQgfHwgKHdpbm5pbmdEZWxldGVkICE9PSBkZWxldGVkID8gd2lubmluZ0RlbGV0ZWQgOlxuICAgICAgICB3aW5uaW5nUG9zICE9PSBwb3MgPyB3aW5uaW5nUG9zIDwgcG9zIDogd2lubmluZ0lkIDwgaWQpKSB7XG4gICAgICB3aW5uaW5nSWQgPSBpZDtcbiAgICAgIHdpbm5pbmdQb3MgPSBwb3M7XG4gICAgICB3aW5uaW5nRGVsZXRlZCA9IGRlbGV0ZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdpbm5pbmdQb3MgKyAnLScgKyB3aW5uaW5nSWQ7XG59XG5cbi8vIFByZXR0eSBtdWNoIGFsbCBiZWxvdyBjYW4gYmUgY29tYmluZWQgaW50byBhIGhpZ2hlciBvcmRlciBmdW5jdGlvbiB0b1xuLy8gdHJhdmVyc2UgcmV2aXNpb25zXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGZyb20gdGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIGFzIGNvbnRleHQgdG8gYWxsXG4vLyBjaGlsZHJlbiBvZiB0aGF0IG5vZGVcbmZ1bmN0aW9uIHRyYXZlcnNlUmV2VHJlZShyZXZzLCBjYWxsYmFjaykge1xuICB2YXIgdG9WaXNpdCA9IHJldnMuc2xpY2UoKTtcblxuICB2YXIgbm9kZTtcbiAgd2hpbGUgKChub2RlID0gdG9WaXNpdC5wb3AoKSkpIHtcbiAgICB2YXIgcG9zID0gbm9kZS5wb3M7XG4gICAgdmFyIHRyZWUgPSBub2RlLmlkcztcbiAgICB2YXIgYnJhbmNoZXMgPSB0cmVlWzJdO1xuICAgIHZhciBuZXdDdHggPVxuICAgICAgY2FsbGJhY2soYnJhbmNoZXMubGVuZ3RoID09PSAwLCBwb3MsIHRyZWVbMF0sIG5vZGUuY3R4LCB0cmVlWzFdKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnJhbmNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRvVmlzaXQucHVzaCh7cG9zOiBwb3MgKyAxLCBpZHM6IGJyYW5jaGVzW2ldLCBjdHg6IG5ld0N0eH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzb3J0QnlQb3MoYSwgYikge1xuICByZXR1cm4gYS5wb3MgLSBiLnBvcztcbn1cblxuZnVuY3Rpb24gY29sbGVjdExlYXZlcyhyZXZzKSB7XG4gIHZhciBsZWF2ZXMgPSBbXTtcbiAgdHJhdmVyc2VSZXZUcmVlKHJldnMsIGZ1bmN0aW9uIChpc0xlYWYsIHBvcywgaWQsIGFjYywgb3B0cykge1xuICAgIGlmIChpc0xlYWYpIHtcbiAgICAgIGxlYXZlcy5wdXNoKHtyZXY6IHBvcyArIFwiLVwiICsgaWQsIHBvczogcG9zLCBvcHRzOiBvcHRzfSk7XG4gICAgfVxuICB9KTtcbiAgbGVhdmVzLnNvcnQoc29ydEJ5UG9zKS5yZXZlcnNlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsZWF2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkZWxldGUgbGVhdmVzW2ldLnBvcztcbiAgfVxuICByZXR1cm4gbGVhdmVzO1xufVxuXG4vLyByZXR1cm5zIHJldnMgb2YgYWxsIGNvbmZsaWN0cyB0aGF0IGlzIGxlYXZlcyBzdWNoIHRoYXRcbi8vIDEuIGFyZSBub3QgZGVsZXRlZCBhbmRcbi8vIDIuIGFyZSBkaWZmZXJlbnQgdGhhbiB3aW5uaW5nIHJldmlzaW9uXG5mdW5jdGlvbiBjb2xsZWN0Q29uZmxpY3RzKG1ldGFkYXRhKSB7XG4gIHZhciB3aW4gPSB3aW5uaW5nUmV2KG1ldGFkYXRhKTtcbiAgdmFyIGxlYXZlcyA9IGNvbGxlY3RMZWF2ZXMobWV0YWRhdGEucmV2X3RyZWUpO1xuICB2YXIgY29uZmxpY3RzID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsZWF2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgbGVhZiA9IGxlYXZlc1tpXTtcbiAgICBpZiAobGVhZi5yZXYgIT09IHdpbiAmJiAhbGVhZi5vcHRzLmRlbGV0ZWQpIHtcbiAgICAgIGNvbmZsaWN0cy5wdXNoKGxlYWYucmV2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZsaWN0cztcbn1cblxuLy8gY29tcGFjdCBhIHRyZWUgYnkgbWFya2luZyBpdHMgbm9uLWxlYWZzIGFzIG1pc3NpbmcsXG4vLyBhbmQgcmV0dXJuIGEgbGlzdCBvZiByZXZzIHRvIGRlbGV0ZVxuZnVuY3Rpb24gY29tcGFjdFRyZWUobWV0YWRhdGEpIHtcbiAgdmFyIHJldnMgPSBbXTtcbiAgdHJhdmVyc2VSZXZUcmVlKG1ldGFkYXRhLnJldl90cmVlLCBmdW5jdGlvbiAoaXNMZWFmLCBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldkhhc2gsIGN0eCwgb3B0cykge1xuICAgIGlmIChvcHRzLnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScgJiYgIWlzTGVhZikge1xuICAgICAgcmV2cy5wdXNoKHBvcyArICctJyArIHJldkhhc2gpO1xuICAgICAgb3B0cy5zdGF0dXMgPSAnbWlzc2luZyc7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldnM7XG59XG5cbi8vIGJ1aWxkIHVwIGEgbGlzdCBvZiBhbGwgdGhlIHBhdGhzIHRvIHRoZSBsZWFmcyBpbiB0aGlzIHJldmlzaW9uIHRyZWVcbmZ1bmN0aW9uIHJvb3RUb0xlYWYocmV2cykge1xuICB2YXIgcGF0aHMgPSBbXTtcbiAgdmFyIHRvVmlzaXQgPSByZXZzLnNsaWNlKCk7XG4gIHZhciBub2RlO1xuICB3aGlsZSAoKG5vZGUgPSB0b1Zpc2l0LnBvcCgpKSkge1xuICAgIHZhciBwb3MgPSBub2RlLnBvcztcbiAgICB2YXIgdHJlZSA9IG5vZGUuaWRzO1xuICAgIHZhciBpZCA9IHRyZWVbMF07XG4gICAgdmFyIG9wdHMgPSB0cmVlWzFdO1xuICAgIHZhciBicmFuY2hlcyA9IHRyZWVbMl07XG4gICAgdmFyIGlzTGVhZiA9IGJyYW5jaGVzLmxlbmd0aCA9PT0gMDtcblxuICAgIHZhciBoaXN0b3J5ID0gbm9kZS5oaXN0b3J5ID8gbm9kZS5oaXN0b3J5LnNsaWNlKCkgOiBbXTtcbiAgICBoaXN0b3J5LnB1c2goe2lkOiBpZCwgb3B0czogb3B0c30pO1xuICAgIGlmIChpc0xlYWYpIHtcbiAgICAgIHBhdGhzLnB1c2goe3BvczogKHBvcyArIDEgLSBoaXN0b3J5Lmxlbmd0aCksIGlkczogaGlzdG9yeX0pO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnJhbmNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRvVmlzaXQucHVzaCh7cG9zOiBwb3MgKyAxLCBpZHM6IGJyYW5jaGVzW2ldLCBoaXN0b3J5OiBoaXN0b3J5fSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXRocy5yZXZlcnNlKCk7XG59XG5cbi8vIGZvciBhIGJldHRlciBvdmVydmlldyBvZiB3aGF0IHRoaXMgaXMgZG9pbmcsIHJlYWQ6XG5cbmZ1bmN0aW9uIHNvcnRCeVBvcyQxKGEsIGIpIHtcbiAgcmV0dXJuIGEucG9zIC0gYi5wb3M7XG59XG5cbi8vIGNsYXNzaWMgYmluYXJ5IHNlYXJjaFxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoKGFyciwgaXRlbSwgY29tcGFyYXRvcikge1xuICB2YXIgbG93ID0gMDtcbiAgdmFyIGhpZ2ggPSBhcnIubGVuZ3RoO1xuICB2YXIgbWlkO1xuICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMTtcbiAgICBpZiAoY29tcGFyYXRvcihhcnJbbWlkXSwgaXRlbSkgPCAwKSB7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWdoID0gbWlkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbG93O1xufVxuXG4vLyBhc3N1bWluZyB0aGUgYXJyIGlzIHNvcnRlZCwgaW5zZXJ0IHRoZSBpdGVtIGluIHRoZSBwcm9wZXIgcGxhY2VcbmZ1bmN0aW9uIGluc2VydFNvcnRlZChhcnIsIGl0ZW0sIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGlkeCA9IGJpbmFyeVNlYXJjaChhcnIsIGl0ZW0sIGNvbXBhcmF0b3IpO1xuICBhcnIuc3BsaWNlKGlkeCwgMCwgaXRlbSk7XG59XG5cbi8vIFR1cm4gYSBwYXRoIGFzIGEgZmxhdCBhcnJheSBpbnRvIGEgdHJlZSB3aXRoIGEgc2luZ2xlIGJyYW5jaC5cbi8vIElmIGFueSBzaG91bGQgYmUgc3RlbW1lZCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5LCB0aGF0J3MgcGFzc2VkXG4vLyBpbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50XG5mdW5jdGlvbiBwYXRoVG9UcmVlKHBhdGgsIG51bVN0ZW1tZWQpIHtcbiAgdmFyIHJvb3Q7XG4gIHZhciBsZWFmO1xuICBmb3IgKHZhciBpID0gbnVtU3RlbW1lZCwgbGVuID0gcGF0aC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBub2RlID0gcGF0aFtpXTtcbiAgICB2YXIgY3VycmVudExlYWYgPSBbbm9kZS5pZCwgbm9kZS5vcHRzLCBbXV07XG4gICAgaWYgKGxlYWYpIHtcbiAgICAgIGxlYWZbMl0ucHVzaChjdXJyZW50TGVhZik7XG4gICAgICBsZWFmID0gY3VycmVudExlYWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSBsZWFmID0gY3VycmVudExlYWY7XG4gICAgfVxuICB9XG4gIHJldHVybiByb290O1xufVxuXG4vLyBjb21wYXJlIHRoZSBJRHMgb2YgdHdvIHRyZWVzXG5mdW5jdGlvbiBjb21wYXJlVHJlZShhLCBiKSB7XG4gIHJldHVybiBhWzBdIDwgYlswXSA/IC0xIDogMTtcbn1cblxuLy8gTWVyZ2UgdHdvIHRyZWVzIHRvZ2V0aGVyXG4vLyBUaGUgcm9vdHMgb2YgdHJlZTEgYW5kIHRyZWUyIG11c3QgYmUgdGhlIHNhbWUgcmV2aXNpb25cbmZ1bmN0aW9uIG1lcmdlVHJlZShpbl90cmVlMSwgaW5fdHJlZTIpIHtcbiAgdmFyIHF1ZXVlID0gW3t0cmVlMTogaW5fdHJlZTEsIHRyZWUyOiBpbl90cmVlMn1dO1xuICB2YXIgY29uZmxpY3RzID0gZmFsc2U7XG4gIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICB2YXIgdHJlZTEgPSBpdGVtLnRyZWUxO1xuICAgIHZhciB0cmVlMiA9IGl0ZW0udHJlZTI7XG5cbiAgICBpZiAodHJlZTFbMV0uc3RhdHVzIHx8IHRyZWUyWzFdLnN0YXR1cykge1xuICAgICAgdHJlZTFbMV0uc3RhdHVzID1cbiAgICAgICAgKHRyZWUxWzFdLnN0YXR1cyA9PT0gICdhdmFpbGFibGUnIHx8XG4gICAgICAgIHRyZWUyWzFdLnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScpID8gJ2F2YWlsYWJsZScgOiAnbWlzc2luZyc7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlMlsyXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0cmVlMVsyXVswXSkge1xuICAgICAgICBjb25mbGljdHMgPSAnbmV3X2xlYWYnO1xuICAgICAgICB0cmVlMVsyXVswXSA9IHRyZWUyWzJdW2ldO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1lcmdlZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmVlMVsyXS5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAodHJlZTFbMl1bal1bMF0gPT09IHRyZWUyWzJdW2ldWzBdKSB7XG4gICAgICAgICAgcXVldWUucHVzaCh7dHJlZTE6IHRyZWUxWzJdW2pdLCB0cmVlMjogdHJlZTJbMl1baV19KTtcbiAgICAgICAgICBtZXJnZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIW1lcmdlZCkge1xuICAgICAgICBjb25mbGljdHMgPSAnbmV3X2JyYW5jaCc7XG4gICAgICAgIGluc2VydFNvcnRlZCh0cmVlMVsyXSwgdHJlZTJbMl1baV0sIGNvbXBhcmVUcmVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtjb25mbGljdHM6IGNvbmZsaWN0cywgdHJlZTogaW5fdHJlZTF9O1xufVxuXG5mdW5jdGlvbiBkb01lcmdlKHRyZWUsIHBhdGgsIGRvbnRFeHBhbmQpIHtcbiAgdmFyIHJlc3RyZWUgPSBbXTtcbiAgdmFyIGNvbmZsaWN0cyA9IGZhbHNlO1xuICB2YXIgbWVyZ2VkID0gZmFsc2U7XG4gIHZhciByZXM7XG5cbiAgaWYgKCF0cmVlLmxlbmd0aCkge1xuICAgIHJldHVybiB7dHJlZTogW3BhdGhdLCBjb25mbGljdHM6ICduZXdfbGVhZid9O1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRyZWUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgYnJhbmNoID0gdHJlZVtpXTtcbiAgICBpZiAoYnJhbmNoLnBvcyA9PT0gcGF0aC5wb3MgJiYgYnJhbmNoLmlkc1swXSA9PT0gcGF0aC5pZHNbMF0pIHtcbiAgICAgIC8vIFBhdGhzIHN0YXJ0IGF0IHRoZSBzYW1lIHBvc2l0aW9uIGFuZCBoYXZlIHRoZSBzYW1lIHJvb3QsIHNvIHRoZXkgbmVlZFxuICAgICAgLy8gbWVyZ2VkXG4gICAgICByZXMgPSBtZXJnZVRyZWUoYnJhbmNoLmlkcywgcGF0aC5pZHMpO1xuICAgICAgcmVzdHJlZS5wdXNoKHtwb3M6IGJyYW5jaC5wb3MsIGlkczogcmVzLnRyZWV9KTtcbiAgICAgIGNvbmZsaWN0cyA9IGNvbmZsaWN0cyB8fCByZXMuY29uZmxpY3RzO1xuICAgICAgbWVyZ2VkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGRvbnRFeHBhbmQgIT09IHRydWUpIHtcbiAgICAgIC8vIFRoZSBwYXRocyBzdGFydCBhdCBhIGRpZmZlcmVudCBwb3NpdGlvbiwgdGFrZSB0aGUgZWFybGllc3QgcGF0aCBhbmRcbiAgICAgIC8vIHRyYXZlcnNlIHVwIHVudGlsIGl0IGFzIGF0IHRoZSBzYW1lIHBvaW50IGZyb20gcm9vdCBhcyB0aGUgcGF0aCB3ZVxuICAgICAgLy8gd2FudCB0byBtZXJnZS4gIElmIHRoZSBrZXlzIG1hdGNoIHdlIHJldHVybiB0aGUgbG9uZ2VyIHBhdGggd2l0aCB0aGVcbiAgICAgIC8vIG90aGVyIG1lcmdlZCBBZnRlciBzdGVtbWluZyB3ZSBkb250IHdhbnQgdG8gZXhwYW5kIHRoZSB0cmVlc1xuXG4gICAgICB2YXIgdDEgPSBicmFuY2gucG9zIDwgcGF0aC5wb3MgPyBicmFuY2ggOiBwYXRoO1xuICAgICAgdmFyIHQyID0gYnJhbmNoLnBvcyA8IHBhdGgucG9zID8gcGF0aCA6IGJyYW5jaDtcbiAgICAgIHZhciBkaWZmID0gdDIucG9zIC0gdDEucG9zO1xuXG4gICAgICB2YXIgY2FuZGlkYXRlUGFyZW50cyA9IFtdO1xuXG4gICAgICB2YXIgdHJlZXMgPSBbXTtcbiAgICAgIHRyZWVzLnB1c2goe2lkczogdDEuaWRzLCBkaWZmOiBkaWZmLCBwYXJlbnQ6IG51bGwsIHBhcmVudElkeDogbnVsbH0pO1xuICAgICAgd2hpbGUgKHRyZWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0cmVlcy5wb3AoKTtcbiAgICAgICAgaWYgKGl0ZW0uZGlmZiA9PT0gMCkge1xuICAgICAgICAgIGlmIChpdGVtLmlkc1swXSA9PT0gdDIuaWRzWzBdKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGVQYXJlbnRzLnB1c2goaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50cyA9IGl0ZW0uaWRzWzJdO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgZWxlbWVudHNMZW4gPSBlbGVtZW50cy5sZW5ndGg7IGogPCBlbGVtZW50c0xlbjsgaisrKSB7XG4gICAgICAgICAgdHJlZXMucHVzaCh7XG4gICAgICAgICAgICBpZHM6IGVsZW1lbnRzW2pdLFxuICAgICAgICAgICAgZGlmZjogaXRlbS5kaWZmIC0gMSxcbiAgICAgICAgICAgIHBhcmVudDogaXRlbS5pZHMsXG4gICAgICAgICAgICBwYXJlbnRJZHg6IGpcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZWwgPSBjYW5kaWRhdGVQYXJlbnRzWzBdO1xuXG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHJlc3RyZWUucHVzaChicmFuY2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzID0gbWVyZ2VUcmVlKGVsLmlkcywgdDIuaWRzKTtcbiAgICAgICAgZWwucGFyZW50WzJdW2VsLnBhcmVudElkeF0gPSByZXMudHJlZTtcbiAgICAgICAgcmVzdHJlZS5wdXNoKHtwb3M6IHQxLnBvcywgaWRzOiB0MS5pZHN9KTtcbiAgICAgICAgY29uZmxpY3RzID0gY29uZmxpY3RzIHx8IHJlcy5jb25mbGljdHM7XG4gICAgICAgIG1lcmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3RyZWUucHVzaChicmFuY2gpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlIGRpZG50IGZpbmRcbiAgaWYgKCFtZXJnZWQpIHtcbiAgICByZXN0cmVlLnB1c2gocGF0aCk7XG4gIH1cblxuICByZXN0cmVlLnNvcnQoc29ydEJ5UG9zJDEpO1xuXG4gIHJldHVybiB7XG4gICAgdHJlZTogcmVzdHJlZSxcbiAgICBjb25mbGljdHM6IGNvbmZsaWN0cyB8fCAnaW50ZXJuYWxfbm9kZSdcbiAgfTtcbn1cblxuLy8gVG8gZW5zdXJlIHdlIGRvbnQgZ3JvdyB0aGUgcmV2aXNpb24gdHJlZSBpbmZpbml0ZWx5LCB3ZSBzdGVtIG9sZCByZXZpc2lvbnNcbmZ1bmN0aW9uIHN0ZW0odHJlZSwgZGVwdGgpIHtcbiAgLy8gRmlyc3Qgd2UgYnJlYWsgb3V0IHRoZSB0cmVlIGludG8gYSBjb21wbGV0ZSBsaXN0IG9mIHJvb3QgdG8gbGVhZiBwYXRoc1xuICB2YXIgcGF0aHMgPSByb290VG9MZWFmKHRyZWUpO1xuICB2YXIgc3RlbW1lZFJldnM7XG5cbiAgdmFyIHJlc3VsdDtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgLy8gVGhlbiBmb3IgZWFjaCBwYXRoLCB3ZSBjdXQgb2ZmIHRoZSBzdGFydCBvZiB0aGUgcGF0aCBiYXNlZCBvbiB0aGVcbiAgICAvLyBgZGVwdGhgIHRvIHN0ZW0gdG8sIGFuZCBnZW5lcmF0ZSBhIG5ldyBzZXQgb2YgZmxhdCB0cmVlc1xuICAgIHZhciBwYXRoID0gcGF0aHNbaV07XG4gICAgdmFyIHN0ZW1tZWQgPSBwYXRoLmlkcztcbiAgICB2YXIgbm9kZTtcbiAgICBpZiAoc3RlbW1lZC5sZW5ndGggPiBkZXB0aCkge1xuICAgICAgLy8gb25seSBkbyB0aGUgc3RlbW1pbmcgd29yayBpZiB3ZSBhY3R1YWxseSBuZWVkIHRvIHN0ZW1cbiAgICAgIGlmICghc3RlbW1lZFJldnMpIHtcbiAgICAgICAgc3RlbW1lZFJldnMgPSB7fTsgLy8gYXZvaWQgYWxsb2NhdGluZyB0aGlzIG9iamVjdCB1bm5lY2Vzc2FyaWx5XG4gICAgICB9XG4gICAgICB2YXIgbnVtU3RlbW1lZCA9IHN0ZW1tZWQubGVuZ3RoIC0gZGVwdGg7XG4gICAgICBub2RlID0ge1xuICAgICAgICBwb3M6IHBhdGgucG9zICsgbnVtU3RlbW1lZCxcbiAgICAgICAgaWRzOiBwYXRoVG9UcmVlKHN0ZW1tZWQsIG51bVN0ZW1tZWQpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBzID0gMDsgcyA8IG51bVN0ZW1tZWQ7IHMrKykge1xuICAgICAgICB2YXIgcmV2ID0gKHBhdGgucG9zICsgcykgKyAnLScgKyBzdGVtbWVkW3NdLmlkO1xuICAgICAgICBzdGVtbWVkUmV2c1tyZXZdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBubyBuZWVkIHRvIGFjdHVhbGx5IHN0ZW1cbiAgICAgIG5vZGUgPSB7XG4gICAgICAgIHBvczogcGF0aC5wb3MsXG4gICAgICAgIGlkczogcGF0aFRvVHJlZShzdGVtbWVkLCAwKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBUaGVuIHdlIHJlbWVyZ2UgYWxsIHRob3NlIGZsYXQgdHJlZXMgdG9nZXRoZXIsIGVuc3VyaW5nIHRoYXQgd2UgZG9udFxuICAgIC8vIGNvbm5lY3QgdHJlZXMgdGhhdCB3b3VsZCBnbyBiZXlvbmQgdGhlIGRlcHRoIGxpbWl0XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gZG9NZXJnZShyZXN1bHQsIG5vZGUsIHRydWUpLnRyZWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IFtub2RlXTtcbiAgICB9XG4gIH1cblxuICAvLyB0aGlzIGlzIG1lbW9yeS1oZWF2eSBwZXIgQ2hyb21lIHByb2ZpbGVyLCBhdm9pZCB1bmxlc3Mgd2UgYWN0dWFsbHkgc3RlbW1lZFxuICBpZiAoc3RlbW1lZFJldnMpIHtcbiAgICB0cmF2ZXJzZVJldlRyZWUocmVzdWx0LCBmdW5jdGlvbiAoaXNMZWFmLCBwb3MsIHJldkhhc2gpIHtcbiAgICAgIC8vIHNvbWUgcmV2aXNpb25zIG1heSBoYXZlIGJlZW4gcmVtb3ZlZCBpbiBhIGJyYW5jaCBidXQgbm90IGluIGFub3RoZXJcbiAgICAgIGRlbGV0ZSBzdGVtbWVkUmV2c1twb3MgKyAnLScgKyByZXZIYXNoXTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHJlZTogcmVzdWx0LFxuICAgIHJldnM6IHN0ZW1tZWRSZXZzID8gT2JqZWN0LmtleXMoc3RlbW1lZFJldnMpIDogW11cbiAgfTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UodHJlZSwgcGF0aCwgZGVwdGgpIHtcbiAgdmFyIG5ld1RyZWUgPSBkb01lcmdlKHRyZWUsIHBhdGgpO1xuICB2YXIgc3RlbW1lZCA9IHN0ZW0obmV3VHJlZS50cmVlLCBkZXB0aCk7XG4gIHJldHVybiB7XG4gICAgdHJlZTogc3RlbW1lZC50cmVlLFxuICAgIHN0ZW1tZWRSZXZzOiBzdGVtbWVkLnJldnMsXG4gICAgY29uZmxpY3RzOiBuZXdUcmVlLmNvbmZsaWN0c1xuICB9O1xufVxuXG4vLyByZXR1cm4gdHJ1ZSBpZiBhIHJldiBleGlzdHMgaW4gdGhlIHJldiB0cmVlLCBmYWxzZSBvdGhlcndpc2VcbmZ1bmN0aW9uIHJldkV4aXN0cyhyZXZzLCByZXYpIHtcbiAgdmFyIHRvVmlzaXQgPSByZXZzLnNsaWNlKCk7XG4gIHZhciBzcGxpdFJldiA9IHJldi5zcGxpdCgnLScpO1xuICB2YXIgdGFyZ2V0UG9zID0gcGFyc2VJbnQoc3BsaXRSZXZbMF0sIDEwKTtcbiAgdmFyIHRhcmdldElkID0gc3BsaXRSZXZbMV07XG5cbiAgdmFyIG5vZGU7XG4gIHdoaWxlICgobm9kZSA9IHRvVmlzaXQucG9wKCkpKSB7XG4gICAgaWYgKG5vZGUucG9zID09PSB0YXJnZXRQb3MgJiYgbm9kZS5pZHNbMF0gPT09IHRhcmdldElkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGJyYW5jaGVzID0gbm9kZS5pZHNbMl07XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJyYW5jaGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0b1Zpc2l0LnB1c2goe3Bvczogbm9kZS5wb3MgKyAxLCBpZHM6IGJyYW5jaGVzW2ldfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJlZXMobm9kZSkge1xuICByZXR1cm4gbm9kZS5pZHM7XG59XG5cbi8vIGNoZWNrIGlmIGEgc3BlY2lmaWMgcmV2aXNpb24gb2YgYSBkb2MgaGFzIGJlZW4gZGVsZXRlZFxuLy8gIC0gbWV0YWRhdGE6IHRoZSBtZXRhZGF0YSBvYmplY3QgZnJvbSB0aGUgZG9jIHN0b3JlXG4vLyAgLSByZXY6IChvcHRpb25hbCkgdGhlIHJldmlzaW9uIHRvIGNoZWNrLiBkZWZhdWx0cyB0byB3aW5uaW5nIHJldmlzaW9uXG5mdW5jdGlvbiBpc0RlbGV0ZWQobWV0YWRhdGEsIHJldikge1xuICBpZiAoIXJldikge1xuICAgIHJldiA9IHdpbm5pbmdSZXYobWV0YWRhdGEpO1xuICB9XG4gIHZhciBpZCA9IHJldi5zdWJzdHJpbmcocmV2LmluZGV4T2YoJy0nKSArIDEpO1xuICB2YXIgdG9WaXNpdCA9IG1ldGFkYXRhLnJldl90cmVlLm1hcChnZXRUcmVlcyk7XG5cbiAgdmFyIHRyZWU7XG4gIHdoaWxlICgodHJlZSA9IHRvVmlzaXQucG9wKCkpKSB7XG4gICAgaWYgKHRyZWVbMF0gPT09IGlkKSB7XG4gICAgICByZXR1cm4gISF0cmVlWzFdLmRlbGV0ZWQ7XG4gICAgfVxuICAgIHRvVmlzaXQgPSB0b1Zpc2l0LmNvbmNhdCh0cmVlWzJdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0xvY2FsSWQoaWQpIHtcbiAgcmV0dXJuICgvXl9sb2NhbC8pLnRlc3QoaWQpO1xufVxuXG4vLyByZXR1cm5zIHRoZSBjdXJyZW50IGxlYWYgbm9kZSBmb3IgYSBnaXZlbiByZXZpc2lvblxuZnVuY3Rpb24gbGF0ZXN0KHJldiwgbWV0YWRhdGEpIHtcbiAgdmFyIHRvVmlzaXQgPSBtZXRhZGF0YS5yZXZfdHJlZS5zbGljZSgpO1xuICB2YXIgbm9kZTtcbiAgd2hpbGUgKChub2RlID0gdG9WaXNpdC5wb3AoKSkpIHtcbiAgICB2YXIgcG9zID0gbm9kZS5wb3M7XG4gICAgdmFyIHRyZWUgPSBub2RlLmlkcztcbiAgICB2YXIgaWQgPSB0cmVlWzBdO1xuICAgIHZhciBvcHRzID0gdHJlZVsxXTtcbiAgICB2YXIgYnJhbmNoZXMgPSB0cmVlWzJdO1xuICAgIHZhciBpc0xlYWYgPSBicmFuY2hlcy5sZW5ndGggPT09IDA7XG5cbiAgICB2YXIgaGlzdG9yeSA9IG5vZGUuaGlzdG9yeSA/IG5vZGUuaGlzdG9yeS5zbGljZSgpIDogW107XG4gICAgaGlzdG9yeS5wdXNoKHtpZDogaWQsIHBvczogcG9zLCBvcHRzOiBvcHRzfSk7XG5cbiAgICBpZiAoaXNMZWFmKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaGlzdG9yeS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaGlzdG9yeU5vZGUgPSBoaXN0b3J5W2ldO1xuICAgICAgICB2YXIgaGlzdG9yeVJldiA9IGhpc3RvcnlOb2RlLnBvcyArICctJyArIGhpc3RvcnlOb2RlLmlkO1xuXG4gICAgICAgIGlmIChoaXN0b3J5UmV2ID09PSByZXYpIHtcbiAgICAgICAgICAvLyByZXR1cm4gdGhlIHJldiBvZiB0aGlzIGxlYWZcbiAgICAgICAgICByZXR1cm4gcG9zICsgJy0nICsgaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMCwgbCA9IGJyYW5jaGVzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgdG9WaXNpdC5wdXNoKHtwb3M6IHBvcyArIDEsIGlkczogYnJhbmNoZXNbal0sIGhpc3Rvcnk6IGhpc3Rvcnl9KTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byByZXNvbHZlIGxhdGVzdCByZXZpc2lvbiBmb3IgaWQgJyArIG1ldGFkYXRhLmlkICsgJywgcmV2ICcgKyByZXYpO1xufVxuXG5pbmhlcml0cyhDaGFuZ2VzJDEsIEVFKTtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2hJbkNoYW5nZUxpc3RlbmVyKHNlbGYsIGNoYW5nZSwgcGVuZGluZywgbGFzdFNlcSkge1xuICAvLyBpc29sYXRlIHRyeS9jYXRjaGVzIHRvIGF2b2lkIFY4IGRlb3B0aW1pemF0aW9uc1xuICB0cnkge1xuICAgIHNlbGYuZW1pdCgnY2hhbmdlJywgY2hhbmdlLCBwZW5kaW5nLCBsYXN0U2VxKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGd1YXJkZWRDb25zb2xlKCdlcnJvcicsICdFcnJvciBpbiAub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24pOicsIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIENoYW5nZXMkMShkYiwgb3B0cywgY2FsbGJhY2spIHtcbiAgRUUuY2FsbCh0aGlzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmRiID0gZGI7XG4gIG9wdHMgPSBvcHRzID8gY2xvbmUob3B0cykgOiB7fTtcbiAgdmFyIGNvbXBsZXRlID0gb3B0cy5jb21wbGV0ZSA9IG9uY2UoZnVuY3Rpb24gKGVyciwgcmVzcCkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGlmIChsaXN0ZW5lckNvdW50KHNlbGYsICdlcnJvcicpID4gMCkge1xuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5lbWl0KCdjb21wbGV0ZScsIHJlc3ApO1xuICAgIH1cbiAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIGRiLnJlbW92ZUxpc3RlbmVyKCdkZXN0cm95ZWQnLCBvbkRlc3Ryb3kpO1xuICB9KTtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgc2VsZi5vbignY29tcGxldGUnLCBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcCk7XG4gICAgfSk7XG4gICAgc2VsZi5vbignZXJyb3InLCBjYWxsYmFjayk7XG4gIH1cbiAgZnVuY3Rpb24gb25EZXN0cm95KCkge1xuICAgIHNlbGYuY2FuY2VsKCk7XG4gIH1cbiAgZGIub25jZSgnZGVzdHJveWVkJywgb25EZXN0cm95KTtcblxuICBvcHRzLm9uQ2hhbmdlID0gZnVuY3Rpb24gKGNoYW5nZSwgcGVuZGluZywgbGFzdFNlcSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChzZWxmLmlzQ2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeUNhdGNoSW5DaGFuZ2VMaXN0ZW5lcihzZWxmLCBjaGFuZ2UsIHBlbmRpbmcsIGxhc3RTZXEpO1xuICB9O1xuXG4gIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwsIHJlamVjdCkge1xuICAgIG9wdHMuY29tcGxldGUgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKHJlcyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIHNlbGYub25jZSgnY2FuY2VsJywgZnVuY3Rpb24gKCkge1xuICAgIGRiLnJlbW92ZUxpc3RlbmVyKCdkZXN0cm95ZWQnLCBvbkRlc3Ryb3kpO1xuICAgIG9wdHMuY29tcGxldGUobnVsbCwge3N0YXR1czogJ2NhbmNlbGxlZCd9KTtcbiAgfSk7XG4gIHRoaXMudGhlbiA9IHByb21pc2UudGhlbi5iaW5kKHByb21pc2UpO1xuICB0aGlzWydjYXRjaCddID0gcHJvbWlzZVsnY2F0Y2gnXS5iaW5kKHByb21pc2UpO1xuICB0aGlzLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGNvbXBsZXRlKG51bGwsIHJlc3VsdCk7XG4gIH0sIGNvbXBsZXRlKTtcblxuXG5cbiAgaWYgKCFkYi50YXNrcXVldWUuaXNSZWFkeSkge1xuICAgIGRiLnRhc2txdWV1ZS5hZGRUYXNrKGZ1bmN0aW9uIChmYWlsZWQpIHtcbiAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgb3B0cy5jb21wbGV0ZShmYWlsZWQpO1xuICAgICAgfSBlbHNlIGlmIChzZWxmLmlzQ2FuY2VsbGVkKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnY2FuY2VsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnZhbGlkYXRlQ2hhbmdlcyhvcHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzZWxmLnZhbGlkYXRlQ2hhbmdlcyhvcHRzKTtcbiAgfVxufVxuQ2hhbmdlcyQxLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaXNDYW5jZWxsZWQgPSB0cnVlO1xuICBpZiAodGhpcy5kYi50YXNrcXVldWUuaXNSZWFkeSkge1xuICAgIHRoaXMuZW1pdCgnY2FuY2VsJyk7XG4gIH1cbn07XG5mdW5jdGlvbiBwcm9jZXNzQ2hhbmdlKGRvYywgbWV0YWRhdGEsIG9wdHMpIHtcbiAgdmFyIGNoYW5nZUxpc3QgPSBbe3JldjogZG9jLl9yZXZ9XTtcbiAgaWYgKG9wdHMuc3R5bGUgPT09ICdhbGxfZG9jcycpIHtcbiAgICBjaGFuZ2VMaXN0ID0gY29sbGVjdExlYXZlcyhtZXRhZGF0YS5yZXZfdHJlZSlcbiAgICAubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB7cmV2OiB4LnJldn07IH0pO1xuICB9XG4gIHZhciBjaGFuZ2UgPSB7XG4gICAgaWQ6IG1ldGFkYXRhLmlkLFxuICAgIGNoYW5nZXM6IGNoYW5nZUxpc3QsXG4gICAgZG9jOiBkb2NcbiAgfTtcblxuICBpZiAoaXNEZWxldGVkKG1ldGFkYXRhLCBkb2MuX3JldikpIHtcbiAgICBjaGFuZ2UuZGVsZXRlZCA9IHRydWU7XG4gIH1cbiAgaWYgKG9wdHMuY29uZmxpY3RzKSB7XG4gICAgY2hhbmdlLmRvYy5fY29uZmxpY3RzID0gY29sbGVjdENvbmZsaWN0cyhtZXRhZGF0YSk7XG4gICAgaWYgKCFjaGFuZ2UuZG9jLl9jb25mbGljdHMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgY2hhbmdlLmRvYy5fY29uZmxpY3RzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2hhbmdlO1xufVxuXG5DaGFuZ2VzJDEucHJvdG90eXBlLnZhbGlkYXRlQ2hhbmdlcyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciBjYWxsYmFjayA9IG9wdHMuY29tcGxldGU7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoUG91Y2hEQi5fY2hhbmdlc0ZpbHRlclBsdWdpbikge1xuICAgIFBvdWNoREIuX2NoYW5nZXNGaWx0ZXJQbHVnaW4udmFsaWRhdGUob3B0cywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZG9DaGFuZ2VzKG9wdHMpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNlbGYuZG9DaGFuZ2VzKG9wdHMpO1xuICB9XG59O1xuXG5DaGFuZ2VzJDEucHJvdG90eXBlLmRvQ2hhbmdlcyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGNhbGxiYWNrID0gb3B0cy5jb21wbGV0ZTtcblxuICBvcHRzID0gY2xvbmUob3B0cyk7XG4gIGlmICgnbGl2ZScgaW4gb3B0cyAmJiAhKCdjb250aW51b3VzJyBpbiBvcHRzKSkge1xuICAgIG9wdHMuY29udGludW91cyA9IG9wdHMubGl2ZTtcbiAgfVxuICBvcHRzLnByb2Nlc3NDaGFuZ2UgPSBwcm9jZXNzQ2hhbmdlO1xuXG4gIGlmIChvcHRzLnNpbmNlID09PSAnbGF0ZXN0Jykge1xuICAgIG9wdHMuc2luY2UgPSAnbm93JztcbiAgfVxuICBpZiAoIW9wdHMuc2luY2UpIHtcbiAgICBvcHRzLnNpbmNlID0gMDtcbiAgfVxuICBpZiAob3B0cy5zaW5jZSA9PT0gJ25vdycpIHtcbiAgICB0aGlzLmRiLmluZm8oKS50aGVuKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChzZWxmLmlzQ2FuY2VsbGVkKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHtzdGF0dXM6ICdjYW5jZWxsZWQnfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wdHMuc2luY2UgPSBpbmZvLnVwZGF0ZV9zZXE7XG4gICAgICBzZWxmLmRvQ2hhbmdlcyhvcHRzKTtcbiAgICB9LCBjYWxsYmFjayk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKFBvdWNoREIuX2NoYW5nZXNGaWx0ZXJQbHVnaW4pIHtcbiAgICBQb3VjaERCLl9jaGFuZ2VzRmlsdGVyUGx1Z2luLm5vcm1hbGl6ZShvcHRzKTtcbiAgICBpZiAoUG91Y2hEQi5fY2hhbmdlc0ZpbHRlclBsdWdpbi5zaG91bGRGaWx0ZXIodGhpcywgb3B0cykpIHtcbiAgICAgIHJldHVybiBQb3VjaERCLl9jaGFuZ2VzRmlsdGVyUGx1Z2luLmZpbHRlcih0aGlzLCBvcHRzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgWydkb2NfaWRzJywgJ2ZpbHRlcicsICdzZWxlY3RvcicsICd2aWV3J10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5IGluIG9wdHMpIHtcbiAgICAgICAgZ3VhcmRlZENvbnNvbGUoJ3dhcm4nLFxuICAgICAgICAgICdUaGUgXCInICsga2V5ICsgJ1wiIG9wdGlvbiB3YXMgcGFzc2VkIGluIHRvIGNoYW5nZXMvcmVwbGljYXRlLCAnICtcbiAgICAgICAgICAnYnV0IHBvdWNoZGItY2hhbmdlcy1maWx0ZXIgcGx1Z2luIGlzIG5vdCBpbnN0YWxsZWQsIHNvIGl0ICcgK1xuICAgICAgICAgICd3YXMgaWdub3JlZC4gUGxlYXNlIGluc3RhbGwgdGhlIHBsdWdpbiB0byBlbmFibGUgZmlsdGVyaW5nLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICghKCdkZXNjZW5kaW5nJyBpbiBvcHRzKSkge1xuICAgIG9wdHMuZGVzY2VuZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gMCBhbmQgMSBzaG91bGQgcmV0dXJuIDEgZG9jdW1lbnRcbiAgb3B0cy5saW1pdCA9IG9wdHMubGltaXQgPT09IDAgPyAxIDogb3B0cy5saW1pdDtcbiAgb3B0cy5jb21wbGV0ZSA9IGNhbGxiYWNrO1xuICB2YXIgbmV3UHJvbWlzZSA9IHRoaXMuZGIuX2NoYW5nZXMob3B0cyk7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChuZXdQcm9taXNlICYmIHR5cGVvZiBuZXdQcm9taXNlLmNhbmNlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBjYW5jZWwgPSBzZWxmLmNhbmNlbDtcbiAgICBzZWxmLmNhbmNlbCA9IGdldEFyZ3VtZW50cyhmdW5jdGlvbiAoYXJncykge1xuICAgICAgbmV3UHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgIGNhbmNlbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxufTtcblxuLypcbiAqIEEgZ2VuZXJpYyBwb3VjaCBhZGFwdGVyXG4gKi9cblxuZnVuY3Rpb24gY29tcGFyZShsZWZ0LCByaWdodCkge1xuICByZXR1cm4gbGVmdCA8IHJpZ2h0ID8gLTEgOiBsZWZ0ID4gcmlnaHQgPyAxIDogMDtcbn1cblxuLy8gV3JhcHBlciBmb3IgZnVuY3Rpb25zIHRoYXQgY2FsbCB0aGUgYnVsa2RvY3MgYXBpIHdpdGggYSBzaW5nbGUgZG9jLFxuLy8gaWYgdGhlIGZpcnN0IHJlc3VsdCBpcyBhbiBlcnJvciwgcmV0dXJuIGFuIGVycm9yXG5mdW5jdGlvbiB5YW5rRXJyb3IoY2FsbGJhY2ssIGRvY0lkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgaWYgKGVyciB8fCAocmVzdWx0c1swXSAmJiByZXN1bHRzWzBdLmVycm9yKSkge1xuICAgICAgZXJyID0gZXJyIHx8IHJlc3VsdHNbMF07XG4gICAgICBlcnIuZG9jSWQgPSBkb2NJZDtcbiAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMubGVuZ3RoID8gcmVzdWx0c1swXSAgOiByZXN1bHRzKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIGNsZWFuIGRvY3MgZ2l2ZW4gdG8gdXMgYnkgdGhlIHVzZXJcbmZ1bmN0aW9uIGNsZWFuRG9jcyhkb2NzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkb2MgPSBkb2NzW2ldO1xuICAgIGlmIChkb2MuX2RlbGV0ZWQpIHtcbiAgICAgIGRlbGV0ZSBkb2MuX2F0dGFjaG1lbnRzOyAvLyBpZ25vcmUgYXR0cyBmb3IgZGVsZXRlZCBkb2NzXG4gICAgfSBlbHNlIGlmIChkb2MuX2F0dGFjaG1lbnRzKSB7XG4gICAgICAvLyBmaWx0ZXIgb3V0IGV4dHJhbmVvdXMga2V5cyBmcm9tIF9hdHRhY2htZW50c1xuICAgICAgdmFyIGF0dHMgPSBPYmplY3Qua2V5cyhkb2MuX2F0dGFjaG1lbnRzKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXR0cy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgYXR0ID0gYXR0c1tqXTtcbiAgICAgICAgZG9jLl9hdHRhY2htZW50c1thdHRdID0gcGljayhkb2MuX2F0dGFjaG1lbnRzW2F0dF0sXG4gICAgICAgICAgWydkYXRhJywgJ2RpZ2VzdCcsICdjb250ZW50X3R5cGUnLCAnbGVuZ3RoJywgJ3JldnBvcycsICdzdHViJ10pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBjb21wYXJlIHR3byBkb2NzLCBmaXJzdCBieSBfaWQgdGhlbiBieSBfcmV2XG5mdW5jdGlvbiBjb21wYXJlQnlJZFRoZW5SZXYoYSwgYikge1xuICB2YXIgaWRDb21wYXJlID0gY29tcGFyZShhLl9pZCwgYi5faWQpO1xuICBpZiAoaWRDb21wYXJlICE9PSAwKSB7XG4gICAgcmV0dXJuIGlkQ29tcGFyZTtcbiAgfVxuICB2YXIgYVN0YXJ0ID0gYS5fcmV2aXNpb25zID8gYS5fcmV2aXNpb25zLnN0YXJ0IDogMDtcbiAgdmFyIGJTdGFydCA9IGIuX3JldmlzaW9ucyA/IGIuX3JldmlzaW9ucy5zdGFydCA6IDA7XG4gIHJldHVybiBjb21wYXJlKGFTdGFydCwgYlN0YXJ0KTtcbn1cblxuLy8gZm9yIGV2ZXJ5IG5vZGUgaW4gYSByZXZpc2lvbiB0cmVlIGNvbXB1dGVzIGl0cyBkaXN0YW5jZSBmcm9tIHRoZSBjbG9zZXN0XG4vLyBsZWFmXG5mdW5jdGlvbiBjb21wdXRlSGVpZ2h0KHJldnMpIHtcbiAgdmFyIGhlaWdodCA9IHt9O1xuICB2YXIgZWRnZXMgPSBbXTtcbiAgdHJhdmVyc2VSZXZUcmVlKHJldnMsIGZ1bmN0aW9uIChpc0xlYWYsIHBvcywgaWQsIHBybnQpIHtcbiAgICB2YXIgcmV2JCQxID0gcG9zICsgXCItXCIgKyBpZDtcbiAgICBpZiAoaXNMZWFmKSB7XG4gICAgICBoZWlnaHRbcmV2JCQxXSA9IDA7XG4gICAgfVxuICAgIGlmIChwcm50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVkZ2VzLnB1c2goe2Zyb206IHBybnQsIHRvOiByZXYkJDF9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldiQkMTtcbiAgfSk7XG5cbiAgZWRnZXMucmV2ZXJzZSgpO1xuICBlZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgaWYgKGhlaWdodFtlZGdlLmZyb21dID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhlaWdodFtlZGdlLmZyb21dID0gMSArIGhlaWdodFtlZGdlLnRvXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0W2VkZ2UuZnJvbV0gPSBNYXRoLm1pbihoZWlnaHRbZWRnZS5mcm9tXSwgMSArIGhlaWdodFtlZGdlLnRvXSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZnVuY3Rpb24gYWxsRG9jc0tleXNQYXJzZShvcHRzKSB7XG4gIHZhciBrZXlzID0gICgnbGltaXQnIGluIG9wdHMpID9cbiAgICBvcHRzLmtleXMuc2xpY2Uob3B0cy5za2lwLCBvcHRzLmxpbWl0ICsgb3B0cy5za2lwKSA6XG4gICAgKG9wdHMuc2tpcCA+IDApID8gb3B0cy5rZXlzLnNsaWNlKG9wdHMuc2tpcCkgOiBvcHRzLmtleXM7XG4gIG9wdHMua2V5cyA9IGtleXM7XG4gIG9wdHMuc2tpcCA9IDA7XG4gIGRlbGV0ZSBvcHRzLmxpbWl0O1xuICBpZiAob3B0cy5kZXNjZW5kaW5nKSB7XG4gICAga2V5cy5yZXZlcnNlKCk7XG4gICAgb3B0cy5kZXNjZW5kaW5nID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gYWxsIGNvbXBhY3Rpb24gaXMgZG9uZSBpbiBhIHF1ZXVlLCB0byBhdm9pZCBhdHRhY2hpbmdcbi8vIHRvbyBtYW55IGxpc3RlbmVycyBhdCBvbmNlXG5mdW5jdGlvbiBkb05leHRDb21wYWN0aW9uKHNlbGYpIHtcbiAgdmFyIHRhc2sgPSBzZWxmLl9jb21wYWN0aW9uUXVldWVbMF07XG4gIHZhciBvcHRzID0gdGFzay5vcHRzO1xuICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICBzZWxmLmdldCgnX2xvY2FsL2NvbXBhY3Rpb24nKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KS50aGVuKGZ1bmN0aW9uIChkb2MpIHtcbiAgICBpZiAoZG9jICYmIGRvYy5sYXN0X3NlcSkge1xuICAgICAgb3B0cy5sYXN0X3NlcSA9IGRvYy5sYXN0X3NlcTtcbiAgICB9XG4gICAgc2VsZi5fY29tcGFjdChvcHRzLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICAgIH1cbiAgICAgIGltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX2NvbXBhY3Rpb25RdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoc2VsZi5fY29tcGFjdGlvblF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgIGRvTmV4dENvbXBhY3Rpb24oc2VsZik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYXR0YWNobWVudE5hbWVFcnJvcihuYW1lKSB7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIG5hbWUgKyAnIGlzIG5vdCBhIHZhbGlkIGF0dGFjaG1lbnQgbmFtZSwgYXR0YWNobWVudCAnICtcbiAgICAgICduYW1lcyBjYW5ub3Qgc3RhcnQgd2l0aCBcXCdfXFwnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmluaGVyaXRzKEFic3RyYWN0UG91Y2hEQiwgRUUpO1xuXG5mdW5jdGlvbiBBYnN0cmFjdFBvdWNoREIoKSB7XG4gIEVFLmNhbGwodGhpcyk7XG5cbiAgLy8gcmUtYmluZCBwcm90b3R5cGVkIG1ldGhvZHNcbiAgZm9yICh2YXIgcCBpbiBBYnN0cmFjdFBvdWNoREIucHJvdG90eXBlKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzW3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzW3BdID0gdGhpc1twXS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLnBvc3QgPVxuICBhZGFwdGVyRnVuKCdwb3N0JywgZnVuY3Rpb24gKGRvYywgb3B0cywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuICBpZiAodHlwZW9mIGRvYyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShkb2MpKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKE5PVF9BTl9PQkpFQ1QpKTtcbiAgfVxuICB0aGlzLmJ1bGtEb2NzKHtkb2NzOiBbZG9jXX0sIG9wdHMsIHlhbmtFcnJvcihjYWxsYmFjaywgZG9jLl9pZCkpO1xufSk7XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUucHV0ID0gYWRhcHRlckZ1bigncHV0JywgZnVuY3Rpb24gKGRvYywgb3B0cywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuICBpZiAodHlwZW9mIGRvYyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShkb2MpKSB7XG4gICAgcmV0dXJuIGNiKGNyZWF0ZUVycm9yKE5PVF9BTl9PQkpFQ1QpKTtcbiAgfVxuICBpbnZhbGlkSWRFcnJvcihkb2MuX2lkKTtcbiAgaWYgKGlzTG9jYWxJZChkb2MuX2lkKSAmJiB0eXBlb2YgdGhpcy5fcHV0TG9jYWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZG9jLl9kZWxldGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlTG9jYWwoZG9jLCBjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9wdXRMb2NhbChkb2MsIGNiKTtcbiAgICB9XG4gIH1cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAob3B0cy5mb3JjZSAmJiBkb2MuX3Jldikge1xuICAgIHRyYW5zZm9ybUZvcmNlT3B0aW9uVG9OZXdFZGl0c09wdGlvbigpO1xuICAgIHB1dERvYyhmdW5jdGlvbiAoZXJyKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZXJyID8gbnVsbCA6IHtvazogdHJ1ZSwgaWQ6IGRvYy5faWQsIHJldjogZG9jLl9yZXZ9O1xuICAgICAgY2IoZXJyLCByZXN1bHQpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHB1dERvYyhjYik7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1Gb3JjZU9wdGlvblRvTmV3RWRpdHNPcHRpb24oKSB7XG4gICAgdmFyIHBhcnRzID0gZG9jLl9yZXYuc3BsaXQoJy0nKTtcbiAgICB2YXIgb2xkUmV2SWQgPSBwYXJ0c1sxXTtcbiAgICB2YXIgb2xkUmV2TnVtID0gcGFyc2VJbnQocGFydHNbMF0sIDEwKTtcblxuICAgIHZhciBuZXdSZXZOdW0gPSBvbGRSZXZOdW0gKyAxO1xuICAgIHZhciBuZXdSZXZJZCA9IHJldigpO1xuXG4gICAgZG9jLl9yZXZpc2lvbnMgPSB7XG4gICAgICBzdGFydDogbmV3UmV2TnVtLFxuICAgICAgaWRzOiBbbmV3UmV2SWQsIG9sZFJldklkXVxuICAgIH07XG4gICAgZG9jLl9yZXYgPSBuZXdSZXZOdW0gKyAnLScgKyBuZXdSZXZJZDtcbiAgICBvcHRzLm5ld19lZGl0cyA9IGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHB1dERvYyhuZXh0KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmLl9wdXQgPT09ICdmdW5jdGlvbicgJiYgb3B0cy5uZXdfZWRpdHMgIT09IGZhbHNlKSB7XG4gICAgICBzZWxmLl9wdXQoZG9jLCBvcHRzLCBuZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5idWxrRG9jcyh7ZG9jczogW2RvY119LCBvcHRzLCB5YW5rRXJyb3IobmV4dCwgZG9jLl9pZCkpO1xuICAgIH1cbiAgfVxufSk7XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUucHV0QXR0YWNobWVudCA9XG4gIGFkYXB0ZXJGdW4oJ3B1dEF0dGFjaG1lbnQnLCBmdW5jdGlvbiAoZG9jSWQsIGF0dGFjaG1lbnRJZCwgcmV2JCQxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2IsIHR5cGUpIHtcbiAgdmFyIGFwaSA9IHRoaXM7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHR5cGUgPSBibG9iO1xuICAgIGJsb2IgPSByZXYkJDE7XG4gICAgcmV2JCQxID0gbnVsbDtcbiAgfVxuICAvLyBMZXRzIGZpeCBpbiBodHRwczovL2dpdGh1Yi5jb20vcG91Y2hkYi9wb3VjaGRiL2lzc3Vlcy8zMjY3XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdHlwZSA9IGJsb2I7XG4gICAgYmxvYiA9IHJldiQkMTtcbiAgICByZXYkJDEgPSBudWxsO1xuICB9XG4gIGlmICghdHlwZSkge1xuICAgIGd1YXJkZWRDb25zb2xlKCd3YXJuJywgJ0F0dGFjaG1lbnQnLCBhdHRhY2htZW50SWQsICdvbiBkb2N1bWVudCcsIGRvY0lkLCAnaXMgbWlzc2luZyBjb250ZW50X3R5cGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUF0dGFjaG1lbnQoZG9jKSB7XG4gICAgdmFyIHByZXZyZXZwb3MgPSAnX3JldicgaW4gZG9jID8gcGFyc2VJbnQoZG9jLl9yZXYsIDEwKSA6IDA7XG4gICAgZG9jLl9hdHRhY2htZW50cyA9IGRvYy5fYXR0YWNobWVudHMgfHwge307XG4gICAgZG9jLl9hdHRhY2htZW50c1thdHRhY2htZW50SWRdID0ge1xuICAgICAgY29udGVudF90eXBlOiB0eXBlLFxuICAgICAgZGF0YTogYmxvYixcbiAgICAgIHJldnBvczogKytwcmV2cmV2cG9zXG4gICAgfTtcbiAgICByZXR1cm4gYXBpLnB1dChkb2MpO1xuICB9XG5cbiAgcmV0dXJuIGFwaS5nZXQoZG9jSWQpLnRoZW4oZnVuY3Rpb24gKGRvYykge1xuICAgIGlmIChkb2MuX3JldiAhPT0gcmV2JCQxKSB7XG4gICAgICB0aHJvdyBjcmVhdGVFcnJvcihSRVZfQ09ORkxJQ1QpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVBdHRhY2htZW50KGRvYyk7XG4gIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgLy8gY3JlYXRlIG5ldyBkb2NcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChlcnIucmVhc29uID09PSBNSVNTSU5HX0RPQy5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQXR0YWNobWVudCh7X2lkOiBkb2NJZH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLnJlbW92ZUF0dGFjaG1lbnQgPVxuICBhZGFwdGVyRnVuKCdyZW1vdmVBdHRhY2htZW50JywgZnVuY3Rpb24gKGRvY0lkLCBhdHRhY2htZW50SWQsIHJldiQkMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHNlbGYuZ2V0KGRvY0lkLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob2JqLl9yZXYgIT09IHJldiQkMSkge1xuICAgICAgY2FsbGJhY2soY3JlYXRlRXJyb3IoUkVWX0NPTkZMSUNUKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghb2JqLl9hdHRhY2htZW50cykge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGRlbGV0ZSBvYmouX2F0dGFjaG1lbnRzW2F0dGFjaG1lbnRJZF07XG4gICAgaWYgKE9iamVjdC5rZXlzKG9iai5fYXR0YWNobWVudHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZGVsZXRlIG9iai5fYXR0YWNobWVudHM7XG4gICAgfVxuICAgIHNlbGYucHV0KG9iaiwgY2FsbGJhY2spO1xuICB9KTtcbn0pO1xuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLnJlbW92ZSA9XG4gIGFkYXB0ZXJGdW4oJ3JlbW92ZScsIGZ1bmN0aW9uIChkb2NPcklkLCBvcHRzT3JSZXYsIG9wdHMsIGNhbGxiYWNrKSB7XG4gIHZhciBkb2M7XG4gIGlmICh0eXBlb2Ygb3B0c09yUmV2ID09PSAnc3RyaW5nJykge1xuICAgIC8vIGlkLCByZXYsIG9wdHMsIGNhbGxiYWNrIHN0eWxlXG4gICAgZG9jID0ge1xuICAgICAgX2lkOiBkb2NPcklkLFxuICAgICAgX3Jldjogb3B0c09yUmV2XG4gICAgfTtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gZG9jLCBvcHRzLCBjYWxsYmFjayBzdHlsZVxuICAgIGRvYyA9IGRvY09ySWQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzT3JSZXYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0c09yUmV2O1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzID0gb3B0c09yUmV2O1xuICAgIH1cbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgb3B0cy53YXNfZGVsZXRlID0gdHJ1ZTtcbiAgdmFyIG5ld0RvYyA9IHtfaWQ6IGRvYy5faWQsIF9yZXY6IChkb2MuX3JldiB8fCBvcHRzLnJldil9O1xuICBuZXdEb2MuX2RlbGV0ZWQgPSB0cnVlO1xuICBpZiAoaXNMb2NhbElkKG5ld0RvYy5faWQpICYmIHR5cGVvZiB0aGlzLl9yZW1vdmVMb2NhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0aGlzLl9yZW1vdmVMb2NhbChkb2MsIGNhbGxiYWNrKTtcbiAgfVxuICB0aGlzLmJ1bGtEb2NzKHtkb2NzOiBbbmV3RG9jXX0sIG9wdHMsIHlhbmtFcnJvcihjYWxsYmFjaywgbmV3RG9jLl9pZCkpO1xufSk7XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUucmV2c0RpZmYgPVxuICBhZGFwdGVyRnVuKCdyZXZzRGlmZicsIGZ1bmN0aW9uIChyZXEsIG9wdHMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cbiAgdmFyIGlkcyA9IE9iamVjdC5rZXlzKHJlcSk7XG5cbiAgaWYgKCFpZHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHt9KTtcbiAgfVxuXG4gIHZhciBjb3VudCA9IDA7XG4gIHZhciBtaXNzaW5nID0gbmV3IEV4cG9ydGVkTWFwKCk7XG5cbiAgZnVuY3Rpb24gYWRkVG9NaXNzaW5nKGlkLCByZXZJZCkge1xuICAgIGlmICghbWlzc2luZy5oYXMoaWQpKSB7XG4gICAgICBtaXNzaW5nLnNldChpZCwge21pc3Npbmc6IFtdfSk7XG4gICAgfVxuICAgIG1pc3NpbmcuZ2V0KGlkKS5taXNzaW5nLnB1c2gocmV2SWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0RvYyhpZCwgcmV2X3RyZWUpIHtcbiAgICAvLyBJcyB0aGlzIGZhc3QgZW5vdWdoPyBNYXliZSB3ZSBzaG91bGQgc3dpdGNoIHRvIGEgc2V0IHNpbXVsYXRlZCBieSBhIG1hcFxuICAgIHZhciBtaXNzaW5nRm9ySWQgPSByZXFbaWRdLnNsaWNlKDApO1xuICAgIHRyYXZlcnNlUmV2VHJlZShyZXZfdHJlZSwgZnVuY3Rpb24gKGlzTGVhZiwgcG9zLCByZXZIYXNoLCBjdHgsXG4gICAgICBvcHRzKSB7XG4gICAgICAgIHZhciByZXYkJDEgPSBwb3MgKyAnLScgKyByZXZIYXNoO1xuICAgICAgICB2YXIgaWR4ID0gbWlzc2luZ0ZvcklkLmluZGV4T2YocmV2JCQxKTtcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBtaXNzaW5nRm9ySWQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAob3B0cy5zdGF0dXMgIT09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgYWRkVG9NaXNzaW5nKGlkLCByZXYkJDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIFRyYXZlcnNpbmcgdGhlIHRyZWUgaXMgc3luY2hyb25vdXMsIHNvIG5vdyBgbWlzc2luZ0ZvcklkYCBjb250YWluc1xuICAgIC8vIHJldmlzaW9ucyB0aGF0IHdlcmUgbm90IGZvdW5kIGluIHRoZSB0cmVlXG4gICAgbWlzc2luZ0ZvcklkLmZvckVhY2goZnVuY3Rpb24gKHJldiQkMSkge1xuICAgICAgYWRkVG9NaXNzaW5nKGlkLCByZXYkJDEpO1xuICAgIH0pO1xuICB9XG5cbiAgaWRzLm1hcChmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLl9nZXRSZXZpc2lvblRyZWUoaWQsIGZ1bmN0aW9uIChlcnIsIHJldl90cmVlKSB7XG4gICAgICBpZiAoZXJyICYmIGVyci5zdGF0dXMgPT09IDQwNCAmJiBlcnIubWVzc2FnZSA9PT0gJ21pc3NpbmcnKSB7XG4gICAgICAgIG1pc3Npbmcuc2V0KGlkLCB7bWlzc2luZzogcmVxW2lkXX0pO1xuICAgICAgfSBlbHNlIGlmIChlcnIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzRG9jKGlkLCByZXZfdHJlZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgrK2NvdW50ID09PSBpZHMubGVuZ3RoKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgTGF6eU1hcCB0byBvYmplY3RcbiAgICAgICAgdmFyIG1pc3NpbmdPYmogPSB7fTtcbiAgICAgICAgbWlzc2luZy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgbWlzc2luZ09ialtrZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbWlzc2luZ09iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIHRoaXMpO1xufSk7XG5cbi8vIF9idWxrX2dldCBBUEkgZm9yIGZhc3RlciByZXBsaWNhdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYXBhY2hlL2NvdWNoZGItY2h0dHBkL3B1bGwvMzNcbi8vIEF0IHRoZSBcImFic3RyYWN0XCIgbGV2ZWwsIGl0IHdpbGwganVzdCBydW4gbXVsdGlwbGUgZ2V0KClzIGluXG4vLyBwYXJhbGxlbCwgYmVjYXVzZSB0aGlzIGlzbid0IG11Y2ggb2YgYSBwZXJmb3JtYW5jZSBjb3N0XG4vLyBmb3IgbG9jYWwgZGF0YWJhc2VzIChleGNlcHQgdGhlIGNvc3Qgb2YgbXVsdGlwbGUgdHJhbnNhY3Rpb25zLCB3aGljaCBpc1xuLy8gc21hbGwpLiBUaGUgaHR0cCBhZGFwdGVyIG92ZXJyaWRlcyB0aGlzIGluIG9yZGVyXG4vLyB0byBkbyBhIG1vcmUgZWZmaWNpZW50IHNpbmdsZSBIVFRQIHJlcXVlc3QuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLmJ1bGtHZXQgPVxuICBhZGFwdGVyRnVuKCdidWxrR2V0JywgZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGJ1bGtHZXQodGhpcywgb3B0cywgY2FsbGJhY2spO1xufSk7XG5cbi8vIGNvbXBhY3Qgb25lIGRvY3VtZW50IGFuZCBmaXJlIGNhbGxiYWNrXG4vLyBieSBjb21wYWN0aW5nIHdlIG1lYW4gcmVtb3ZpbmcgYWxsIHJldmlzaW9ucyB3aGljaFxuLy8gYXJlIGZ1cnRoZXIgZnJvbSB0aGUgbGVhZiBpbiByZXZpc2lvbiB0cmVlIHRoYW4gbWF4X2hlaWdodFxuQWJzdHJhY3RQb3VjaERCLnByb3RvdHlwZS5jb21wYWN0RG9jdW1lbnQgPVxuICBhZGFwdGVyRnVuKCdjb21wYWN0RG9jdW1lbnQnLCBmdW5jdGlvbiAoZG9jSWQsIG1heEhlaWdodCwgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9nZXRSZXZpc2lvblRyZWUoZG9jSWQsIGZ1bmN0aW9uIChlcnIsIHJldlRyZWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICB9XG4gICAgdmFyIGhlaWdodCA9IGNvbXB1dGVIZWlnaHQocmV2VHJlZSk7XG4gICAgdmFyIGNhbmRpZGF0ZXMgPSBbXTtcbiAgICB2YXIgcmV2cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGhlaWdodCkuZm9yRWFjaChmdW5jdGlvbiAocmV2JCQxKSB7XG4gICAgICBpZiAoaGVpZ2h0W3JldiQkMV0gPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgY2FuZGlkYXRlcy5wdXNoKHJldiQkMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cmF2ZXJzZVJldlRyZWUocmV2VHJlZSwgZnVuY3Rpb24gKGlzTGVhZiwgcG9zLCByZXZIYXNoLCBjdHgsIG9wdHMpIHtcbiAgICAgIHZhciByZXYkJDEgPSBwb3MgKyAnLScgKyByZXZIYXNoO1xuICAgICAgaWYgKG9wdHMuc3RhdHVzID09PSAnYXZhaWxhYmxlJyAmJiBjYW5kaWRhdGVzLmluZGV4T2YocmV2JCQxKSAhPT0gLTEpIHtcbiAgICAgICAgcmV2cy5wdXNoKHJldiQkMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2VsZi5fZG9Db21wYWN0aW9uKGRvY0lkLCByZXZzLCBjYWxsYmFjayk7XG4gIH0pO1xufSk7XG5cbi8vIGNvbXBhY3QgdGhlIHdob2xlIGRhdGFiYXNlIHVzaW5nIHNpbmdsZSBkb2N1bWVudFxuLy8gY29tcGFjdGlvblxuQWJzdHJhY3RQb3VjaERCLnByb3RvdHlwZS5jb21wYWN0ID1cbiAgYWRhcHRlckZ1bignY29tcGFjdCcsIGZ1bmN0aW9uIChvcHRzLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBzZWxmLl9jb21wYWN0aW9uUXVldWUgPSBzZWxmLl9jb21wYWN0aW9uUXVldWUgfHwgW107XG4gIHNlbGYuX2NvbXBhY3Rpb25RdWV1ZS5wdXNoKHtvcHRzOiBvcHRzLCBjYWxsYmFjazogY2FsbGJhY2t9KTtcbiAgaWYgKHNlbGYuX2NvbXBhY3Rpb25RdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICBkb05leHRDb21wYWN0aW9uKHNlbGYpO1xuICB9XG59KTtcbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUuX2NvbXBhY3QgPSBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2hhbmdlc09wdHMgPSB7XG4gICAgcmV0dXJuX2RvY3M6IGZhbHNlLFxuICAgIGxhc3Rfc2VxOiBvcHRzLmxhc3Rfc2VxIHx8IDBcbiAgfTtcbiAgdmFyIHByb21pc2VzID0gW107XG5cbiAgZnVuY3Rpb24gb25DaGFuZ2Uocm93KSB7XG4gICAgcHJvbWlzZXMucHVzaChzZWxmLmNvbXBhY3REb2N1bWVudChyb3cuaWQsIDApKTtcbiAgfVxuICBmdW5jdGlvbiBvbkNvbXBsZXRlKHJlc3ApIHtcbiAgICB2YXIgbGFzdFNlcSA9IHJlc3AubGFzdF9zZXE7XG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHVwc2VydChzZWxmLCAnX2xvY2FsL2NvbXBhY3Rpb24nLCBmdW5jdGlvbiBkZWx0YUZ1bmMoZG9jKSB7XG4gICAgICAgIGlmICghZG9jLmxhc3Rfc2VxIHx8IGRvYy5sYXN0X3NlcSA8IGxhc3RTZXEpIHtcbiAgICAgICAgICBkb2MubGFzdF9zZXEgPSBsYXN0U2VxO1xuICAgICAgICAgIHJldHVybiBkb2M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBzb21lYm9keSBlbHNlIGdvdCBoZXJlIGZpcnN0LCBkb24ndCB1cGRhdGVcbiAgICAgIH0pO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwge29rOiB0cnVlfSk7XG4gICAgfSkuY2F0Y2goY2FsbGJhY2spO1xuICB9XG4gIHNlbGYuY2hhbmdlcyhjaGFuZ2VzT3B0cylcbiAgICAub24oJ2NoYW5nZScsIG9uQ2hhbmdlKVxuICAgIC5vbignY29tcGxldGUnLCBvbkNvbXBsZXRlKVxuICAgIC5vbignZXJyb3InLCBjYWxsYmFjayk7XG59O1xuXG4vKiBCZWdpbiBhcGkgd3JhcHBlcnMuIFNwZWNpZmljIGZ1bmN0aW9uYWxpdHkgdG8gc3RvcmFnZSBiZWxvbmdzIGluIHRoZVxuICAgX1ttZXRob2RdICovXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLmdldCA9IGFkYXB0ZXJGdW4oJ2dldCcsIGZ1bmN0aW9uIChpZCwgb3B0cywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBjYihjcmVhdGVFcnJvcihJTlZBTElEX0lEKSk7XG4gIH1cbiAgaWYgKGlzTG9jYWxJZChpZCkgJiYgdHlwZW9mIHRoaXMuX2dldExvY2FsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldExvY2FsKGlkLCBjYik7XG4gIH1cbiAgdmFyIGxlYXZlcyA9IFtdLCBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiBmaW5pc2hPcGVuUmV2cygpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGNvdW50ID0gbGVhdmVzLmxlbmd0aDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWNvdW50KSB7XG4gICAgICByZXR1cm4gY2IobnVsbCwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICAvLyBvcmRlciB3aXRoIG9wZW5fcmV2cyBpcyB1bnNwZWNpZmllZFxuICAgIGxlYXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChsZWFmKSB7XG4gICAgICBzZWxmLmdldChpZCwge1xuICAgICAgICByZXY6IGxlYWYsXG4gICAgICAgIHJldnM6IG9wdHMucmV2cyxcbiAgICAgICAgbGF0ZXN0OiBvcHRzLmxhdGVzdCxcbiAgICAgICAgYXR0YWNobWVudHM6IG9wdHMuYXR0YWNobWVudHMsXG4gICAgICAgIGJpbmFyeTogb3B0cy5iaW5hcnlcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIGRvYykge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgIC8vIHVzaW5nIGxhdGVzdD10cnVlIGNhbiBwcm9kdWNlIGR1cGxpY2F0ZXNcbiAgICAgICAgICB2YXIgZXhpc3Rpbmc7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZXN1bHQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0W2ldLm9rICYmIHJlc3VsdFtpXS5vay5fcmV2ID09PSBkb2MuX3Jldikge1xuICAgICAgICAgICAgICBleGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7b2s6IGRvY30pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7bWlzc2luZzogbGVhZn0pO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50LS07XG4gICAgICAgIGlmICghY291bnQpIHtcbiAgICAgICAgICBjYihudWxsLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChvcHRzLm9wZW5fcmV2cykge1xuICAgIGlmIChvcHRzLm9wZW5fcmV2cyA9PT0gXCJhbGxcIikge1xuICAgICAgdGhpcy5fZ2V0UmV2aXNpb25UcmVlKGlkLCBmdW5jdGlvbiAoZXJyLCByZXZfdHJlZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGxlYXZlcyA9IGNvbGxlY3RMZWF2ZXMocmV2X3RyZWUpLm1hcChmdW5jdGlvbiAobGVhZikge1xuICAgICAgICAgIHJldHVybiBsZWFmLnJldjtcbiAgICAgICAgfSk7XG4gICAgICAgIGZpbmlzaE9wZW5SZXZzKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0cy5vcGVuX3JldnMpKSB7XG4gICAgICAgIGxlYXZlcyA9IG9wdHMub3Blbl9yZXZzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlYXZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBsID0gbGVhdmVzW2ldO1xuICAgICAgICAgIC8vIGxvb2tzIGxpa2UgaXQncyB0aGUgb25seSB0aGluZyBjb3VjaGRiIGNoZWNrc1xuICAgICAgICAgIGlmICghKHR5cGVvZiAobCkgPT09IFwic3RyaW5nXCIgJiYgL15cXGQrLS8udGVzdChsKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYihjcmVhdGVFcnJvcihJTlZBTElEX1JFVikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5pc2hPcGVuUmV2cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNiKGNyZWF0ZUVycm9yKFVOS05PV05fRVJST1IsICdmdW5jdGlvbl9jbGF1c2UnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjsgLy8gb3Blbl9yZXZzIGRvZXMgbm90IGxpa2Ugb3RoZXIgb3B0aW9uc1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2dldChpZCwgb3B0cywgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgaWYgKGVycikge1xuICAgICAgZXJyLmRvY0lkID0gaWQ7XG4gICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICB9XG5cbiAgICB2YXIgZG9jID0gcmVzdWx0LmRvYztcbiAgICB2YXIgbWV0YWRhdGEgPSByZXN1bHQubWV0YWRhdGE7XG4gICAgdmFyIGN0eCA9IHJlc3VsdC5jdHg7XG5cbiAgICBpZiAob3B0cy5jb25mbGljdHMpIHtcbiAgICAgIHZhciBjb25mbGljdHMgPSBjb2xsZWN0Q29uZmxpY3RzKG1ldGFkYXRhKTtcbiAgICAgIGlmIChjb25mbGljdHMubGVuZ3RoKSB7XG4gICAgICAgIGRvYy5fY29uZmxpY3RzID0gY29uZmxpY3RzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0RlbGV0ZWQobWV0YWRhdGEsIGRvYy5fcmV2KSkge1xuICAgICAgZG9jLl9kZWxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5yZXZzIHx8IG9wdHMucmV2c19pbmZvKSB7XG4gICAgICB2YXIgc3BsaXR0ZWRSZXYgPSBkb2MuX3Jldi5zcGxpdCgnLScpO1xuICAgICAgdmFyIHJldk5vICAgICAgID0gcGFyc2VJbnQoc3BsaXR0ZWRSZXZbMF0sIDEwKTtcbiAgICAgIHZhciByZXZIYXNoICAgICA9IHNwbGl0dGVkUmV2WzFdO1xuXG4gICAgICB2YXIgcGF0aHMgPSByb290VG9MZWFmKG1ldGFkYXRhLnJldl90cmVlKTtcbiAgICAgIHZhciBwYXRoID0gbnVsbDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoc1tpXTtcbiAgICAgICAgdmFyIGhhc2hJbmRleCA9IGN1cnJlbnRQYXRoLmlkcy5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguaWQ7IH0pXG4gICAgICAgICAgLmluZGV4T2YocmV2SGFzaCk7XG4gICAgICAgIHZhciBoYXNoRm91bmRBdFJldlBvcyA9IGhhc2hJbmRleCA9PT0gKHJldk5vIC0gMSk7XG5cbiAgICAgICAgaWYgKGhhc2hGb3VuZEF0UmV2UG9zIHx8ICghcGF0aCAmJiBoYXNoSW5kZXggIT09IC0xKSkge1xuICAgICAgICAgIHBhdGggPSBjdXJyZW50UGF0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghcGF0aCkge1xuICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ2ludmFsaWQgcmV2IHRyZWUnKTtcbiAgICAgICAgZXJyLmRvY0lkID0gaWQ7XG4gICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW5kZXhPZlJldiA9IHBhdGguaWRzLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5pZDsgfSlcbiAgICAgICAgLmluZGV4T2YoZG9jLl9yZXYuc3BsaXQoJy0nKVsxXSkgKyAxO1xuICAgICAgdmFyIGhvd01hbnkgPSBwYXRoLmlkcy5sZW5ndGggLSBpbmRleE9mUmV2O1xuICAgICAgcGF0aC5pZHMuc3BsaWNlKGluZGV4T2ZSZXYsIGhvd01hbnkpO1xuICAgICAgcGF0aC5pZHMucmV2ZXJzZSgpO1xuXG4gICAgICBpZiAob3B0cy5yZXZzKSB7XG4gICAgICAgIGRvYy5fcmV2aXNpb25zID0ge1xuICAgICAgICAgIHN0YXJ0OiAocGF0aC5wb3MgKyBwYXRoLmlkcy5sZW5ndGgpIC0gMSxcbiAgICAgICAgICBpZHM6IHBhdGguaWRzLm1hcChmdW5jdGlvbiAocmV2JCQxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV2JCQxLmlkO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAob3B0cy5yZXZzX2luZm8pIHtcbiAgICAgICAgdmFyIHBvcyA9ICBwYXRoLnBvcyArIHBhdGguaWRzLmxlbmd0aDtcbiAgICAgICAgZG9jLl9yZXZzX2luZm8gPSBwYXRoLmlkcy5tYXAoZnVuY3Rpb24gKHJldiQkMSkge1xuICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXY6IHBvcyArICctJyArIHJldiQkMS5pZCxcbiAgICAgICAgICAgIHN0YXR1czogcmV2JCQxLm9wdHMuc3RhdHVzXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuYXR0YWNobWVudHMgJiYgZG9jLl9hdHRhY2htZW50cykge1xuICAgICAgdmFyIGF0dGFjaG1lbnRzID0gZG9jLl9hdHRhY2htZW50cztcbiAgICAgIHZhciBjb3VudCA9IE9iamVjdC5rZXlzKGF0dGFjaG1lbnRzKS5sZW5ndGg7XG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGRvYyk7XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhhdHRhY2htZW50cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuX2dldEF0dGFjaG1lbnQoZG9jLl9pZCwga2V5LCBhdHRhY2htZW50c1trZXldLCB7XG4gICAgICAgICAgLy8gUHJldmlvdXNseSB0aGUgcmV2aXNpb24gaGFuZGxpbmcgd2FzIGRvbmUgaW4gYWRhcHRlci5qc1xuICAgICAgICAgIC8vIGdldEF0dGFjaG1lbnQsIGhvd2V2ZXIgc2luY2UgaWRiLW5leHQgZG9lc250IHdlIG5lZWQgdG9cbiAgICAgICAgICAvLyBwYXNzIHRoZSByZXYgdGhyb3VnaFxuICAgICAgICAgIHJldjogZG9jLl9yZXYsXG4gICAgICAgICAgYmluYXJ5OiBvcHRzLmJpbmFyeSxcbiAgICAgICAgICBjdHg6IGN0eFxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgdmFyIGF0dCA9IGRvYy5fYXR0YWNobWVudHNba2V5XTtcbiAgICAgICAgICBhdHQuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgZGVsZXRlIGF0dC5zdHViO1xuICAgICAgICAgIGRlbGV0ZSBhdHQubGVuZ3RoO1xuICAgICAgICAgIGlmICghLS1jb3VudCkge1xuICAgICAgICAgICAgY2IobnVsbCwgZG9jKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgc2VsZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2MuX2F0dGFjaG1lbnRzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkb2MuX2F0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICBpZiAoZG9jLl9hdHRhY2htZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBkb2MuX2F0dGFjaG1lbnRzW2tleV0uc3R1YiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYihudWxsLCBkb2MpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gVE9ETzogSSBkb250IGxpa2UgdGhpcywgaXQgZm9yY2VzIGFuIGV4dHJhIHJlYWQgZm9yIGV2ZXJ5XG4vLyBhdHRhY2htZW50IHJlYWQgYW5kIGVuZm9yY2VzIGEgY29uZnVzaW5nIGFwaSBiZXR3ZWVuXG4vLyBhZGFwdGVyLmpzIGFuZCB0aGUgYWRhcHRlciBpbXBsZW1lbnRhdGlvblxuQWJzdHJhY3RQb3VjaERCLnByb3RvdHlwZS5nZXRBdHRhY2htZW50ID1cbiAgYWRhcHRlckZ1bignZ2V0QXR0YWNobWVudCcsIGZ1bmN0aW9uIChkb2NJZCwgYXR0YWNobWVudElkLCBvcHRzLCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChvcHRzIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9XG4gIHRoaXMuX2dldChkb2NJZCwgb3B0cywgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgfVxuICAgIGlmIChyZXMuZG9jLl9hdHRhY2htZW50cyAmJiByZXMuZG9jLl9hdHRhY2htZW50c1thdHRhY2htZW50SWRdKSB7XG4gICAgICBvcHRzLmN0eCA9IHJlcy5jdHg7XG4gICAgICBvcHRzLmJpbmFyeSA9IHRydWU7XG4gICAgICBzZWxmLl9nZXRBdHRhY2htZW50KGRvY0lkLCBhdHRhY2htZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5kb2MuX2F0dGFjaG1lbnRzW2F0dGFjaG1lbnRJZF0sIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKE1JU1NJTkdfRE9DKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLmFsbERvY3MgPVxuICBhZGFwdGVyRnVuKCdhbGxEb2NzJywgZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cbiAgb3B0cy5za2lwID0gdHlwZW9mIG9wdHMuc2tpcCAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRzLnNraXAgOiAwO1xuICBpZiAob3B0cy5zdGFydF9rZXkpIHtcbiAgICBvcHRzLnN0YXJ0a2V5ID0gb3B0cy5zdGFydF9rZXk7XG4gIH1cbiAgaWYgKG9wdHMuZW5kX2tleSkge1xuICAgIG9wdHMuZW5ka2V5ID0gb3B0cy5lbmRfa2V5O1xuICB9XG4gIGlmICgna2V5cycgaW4gb3B0cykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRzLmtleXMpKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobmV3IFR5cGVFcnJvcignb3B0aW9ucy5rZXlzIG11c3QgYmUgYW4gYXJyYXknKSk7XG4gICAgfVxuICAgIHZhciBpbmNvbXBhdGlibGVPcHQgPVxuICAgICAgWydzdGFydGtleScsICdlbmRrZXknLCAna2V5J10uZmlsdGVyKGZ1bmN0aW9uIChpbmNvbXBhdGlibGVPcHQpIHtcbiAgICAgIHJldHVybiBpbmNvbXBhdGlibGVPcHQgaW4gb3B0cztcbiAgICB9KVswXTtcbiAgICBpZiAoaW5jb21wYXRpYmxlT3B0KSB7XG4gICAgICBjYWxsYmFjayhjcmVhdGVFcnJvcihRVUVSWV9QQVJTRV9FUlJPUixcbiAgICAgICAgJ1F1ZXJ5IHBhcmFtZXRlciBgJyArIGluY29tcGF0aWJsZU9wdCArXG4gICAgICAgICdgIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggbXVsdGktZ2V0J1xuICAgICAgKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghaXNSZW1vdGUodGhpcykpIHtcbiAgICAgIGFsbERvY3NLZXlzUGFyc2Uob3B0cyk7XG4gICAgICBpZiAob3B0cy5rZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWxsRG9jcyh7bGltaXQ6IDB9LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2FsbERvY3Mob3B0cywgY2FsbGJhY2spO1xufSk7XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uIChvcHRzLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgLy8gQnkgZGVmYXVsdCBzZXQgcmV0dXJuX2RvY3MgdG8gZmFsc2UgaWYgdGhlIGNhbGxlciBoYXMgb3B0cy5saXZlID0gdHJ1ZSxcbiAgLy8gdGhpcyB3aWxsIHByZXZlbnQgdXMgZnJvbSBjb2xsZWN0aW5nIHRoZSBzZXQgb2YgY2hhbmdlcyBpbmRlZmluaXRlbHlcbiAgLy8gcmVzdWx0aW5nIGluIGdyb3dpbmcgbWVtb3J5XG4gIG9wdHMucmV0dXJuX2RvY3MgPSAoJ3JldHVybl9kb2NzJyBpbiBvcHRzKSA/IG9wdHMucmV0dXJuX2RvY3MgOiAhb3B0cy5saXZlO1xuXG4gIHJldHVybiBuZXcgQ2hhbmdlcyQxKHRoaXMsIG9wdHMsIGNhbGxiYWNrKTtcbn07XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUuY2xvc2UgPSBhZGFwdGVyRnVuKCdjbG9zZScsIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLl9jbG9zZWQgPSB0cnVlO1xuICB0aGlzLmVtaXQoJ2Nsb3NlZCcpO1xuICByZXR1cm4gdGhpcy5fY2xvc2UoY2FsbGJhY2spO1xufSk7XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUuaW5mbyA9IGFkYXB0ZXJGdW4oJ2luZm8nLCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9pbmZvKGZ1bmN0aW9uIChlcnIsIGluZm8pIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICB9XG4gICAgLy8gYXNzdW1lIHdlIGtub3cgYmV0dGVyIHRoYW4gdGhlIGFkYXB0ZXIsIHVubGVzcyBpdCBpbmZvcm1zIHVzXG4gICAgaW5mby5kYl9uYW1lID0gaW5mby5kYl9uYW1lIHx8IHNlbGYubmFtZTtcbiAgICBpbmZvLmF1dG9fY29tcGFjdGlvbiA9ICEhKHNlbGYuYXV0b19jb21wYWN0aW9uICYmICFpc1JlbW90ZShzZWxmKSk7XG4gICAgaW5mby5hZGFwdGVyID0gc2VsZi5hZGFwdGVyO1xuICAgIGNhbGxiYWNrKG51bGwsIGluZm8pO1xuICB9KTtcbn0pO1xuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLmlkID0gYWRhcHRlckZ1bignaWQnLCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2lkKGNhbGxiYWNrKTtcbn0pO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuQWJzdHJhY3RQb3VjaERCLnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKHR5cGVvZiB0aGlzLl90eXBlID09PSAnZnVuY3Rpb24nKSA/IHRoaXMuX3R5cGUoKSA6IHRoaXMuYWRhcHRlcjtcbn07XG5cbkFic3RyYWN0UG91Y2hEQi5wcm90b3R5cGUuYnVsa0RvY3MgPVxuICBhZGFwdGVyRnVuKCdidWxrRG9jcycsIGZ1bmN0aW9uIChyZXEsIG9wdHMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShyZXEpKSB7XG4gICAgcmVxID0ge1xuICAgICAgZG9jczogcmVxXG4gICAgfTtcbiAgfVxuXG4gIGlmICghcmVxIHx8ICFyZXEuZG9jcyB8fCAhQXJyYXkuaXNBcnJheShyZXEuZG9jcykpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soY3JlYXRlRXJyb3IoTUlTU0lOR19CVUxLX0RPQ1MpKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmRvY3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodHlwZW9mIHJlcS5kb2NzW2ldICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHJlcS5kb2NzW2ldKSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKE5PVF9BTl9PQkpFQ1QpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXR0YWNobWVudEVycm9yO1xuICByZXEuZG9jcy5mb3JFYWNoKGZ1bmN0aW9uIChkb2MpIHtcbiAgICBpZiAoZG9jLl9hdHRhY2htZW50cykge1xuICAgICAgT2JqZWN0LmtleXMoZG9jLl9hdHRhY2htZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBhdHRhY2htZW50RXJyb3IgPSBhdHRhY2htZW50RXJyb3IgfHwgYXR0YWNobWVudE5hbWVFcnJvcihuYW1lKTtcbiAgICAgICAgaWYgKCFkb2MuX2F0dGFjaG1lbnRzW25hbWVdLmNvbnRlbnRfdHlwZSkge1xuICAgICAgICAgIGd1YXJkZWRDb25zb2xlKCd3YXJuJywgJ0F0dGFjaG1lbnQnLCBuYW1lLCAnb24gZG9jdW1lbnQnLCBkb2MuX2lkLCAnaXMgbWlzc2luZyBjb250ZW50X3R5cGUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoYXR0YWNobWVudEVycm9yKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKEJBRF9SRVFVRVNULCBhdHRhY2htZW50RXJyb3IpKTtcbiAgfVxuXG4gIGlmICghKCduZXdfZWRpdHMnIGluIG9wdHMpKSB7XG4gICAgaWYgKCduZXdfZWRpdHMnIGluIHJlcSkge1xuICAgICAgb3B0cy5uZXdfZWRpdHMgPSByZXEubmV3X2VkaXRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzLm5ld19lZGl0cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgdmFyIGFkYXB0ZXIgPSB0aGlzO1xuICBpZiAoIW9wdHMubmV3X2VkaXRzICYmICFpc1JlbW90ZShhZGFwdGVyKSkge1xuICAgIC8vIGVuc3VyZSByZXZpc2lvbnMgb2YgdGhlIHNhbWUgZG9jIGFyZSBzb3J0ZWQsIHNvIHRoYXRcbiAgICAvLyB0aGUgbG9jYWwgYWRhcHRlciBwcm9jZXNzZXMgdGhlbSBjb3JyZWN0bHkgKCMyOTM1KVxuICAgIHJlcS5kb2NzLnNvcnQoY29tcGFyZUJ5SWRUaGVuUmV2KTtcbiAgfVxuXG4gIGNsZWFuRG9jcyhyZXEuZG9jcyk7XG5cbiAgLy8gaW4gdGhlIGNhc2Ugb2YgY29uZmxpY3RzLCB3ZSB3YW50IHRvIHJldHVybiB0aGUgX2lkcyB0byB0aGUgdXNlclxuICAvLyBob3dldmVyLCB0aGUgdW5kZXJseWluZyBhZGFwdGVyIG1heSBkZXN0cm95IHRoZSBkb2NzIGFycmF5LCBzb1xuICAvLyBjcmVhdGUgYSBjb3B5IGhlcmVcbiAgdmFyIGlkcyA9IHJlcS5kb2NzLm1hcChmdW5jdGlvbiAoZG9jKSB7XG4gICAgcmV0dXJuIGRvYy5faWQ7XG4gIH0pO1xuXG4gIHJldHVybiB0aGlzLl9idWxrRG9jcyhyZXEsIG9wdHMsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIH1cbiAgICBpZiAoIW9wdHMubmV3X2VkaXRzKSB7XG4gICAgICAvLyB0aGlzIGlzIHdoYXQgY291Y2ggZG9lcyB3aGVuIG5ld19lZGl0cyBpcyBmYWxzZVxuICAgICAgcmVzID0gcmVzLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5lcnJvcjtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBhZGQgaWRzIGZvciBlcnJvci9jb25mbGljdCByZXNwb25zZXMgKG5vdCByZXF1aXJlZCBmb3IgQ291Y2hEQilcbiAgICBpZiAoIWlzUmVtb3RlKGFkYXB0ZXIpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcmVzW2ldLmlkID0gcmVzW2ldLmlkIHx8IGlkc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFjayhudWxsLCByZXMpO1xuICB9KTtcbn0pO1xuXG5BYnN0cmFjdFBvdWNoREIucHJvdG90eXBlLnJlZ2lzdGVyRGVwZW5kZW50RGF0YWJhc2UgPVxuICBhZGFwdGVyRnVuKCdyZWdpc3RlckRlcGVuZGVudERhdGFiYXNlJywgZnVuY3Rpb24gKGRlcGVuZGVudERiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKSB7XG4gIHZhciBkZXBEQiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGRlcGVuZGVudERiLCB0aGlzLl9fb3B0cyk7XG5cbiAgZnVuY3Rpb24gZGlmZkZ1bihkb2MpIHtcbiAgICBkb2MuZGVwZW5kZW50RGJzID0gZG9jLmRlcGVuZGVudERicyB8fCB7fTtcbiAgICBpZiAoZG9jLmRlcGVuZGVudERic1tkZXBlbmRlbnREYl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gbm8gdXBkYXRlIHJlcXVpcmVkXG4gICAgfVxuICAgIGRvYy5kZXBlbmRlbnREYnNbZGVwZW5kZW50RGJdID0gdHJ1ZTtcbiAgICByZXR1cm4gZG9jO1xuICB9XG4gIHVwc2VydCh0aGlzLCAnX2xvY2FsL19wb3VjaF9kZXBlbmRlbnREYnMnLCBkaWZmRnVuKVxuICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHtkYjogZGVwREJ9KTtcbiAgICB9KS5jYXRjaChjYWxsYmFjayk7XG59KTtcblxuQWJzdHJhY3RQb3VjaERCLnByb3RvdHlwZS5kZXN0cm95ID1cbiAgYWRhcHRlckZ1bignZGVzdHJveScsIGZ1bmN0aW9uIChvcHRzLCBjYWxsYmFjaykge1xuXG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB1c2VQcmVmaXggPSAndXNlX3ByZWZpeCcgaW4gc2VsZiA/IHNlbGYudXNlX3ByZWZpeCA6IHRydWU7XG5cbiAgZnVuY3Rpb24gZGVzdHJveURiKCkge1xuICAgIC8vIGNhbGwgZGVzdHJveSBtZXRob2Qgb2YgdGhlIHBhcnRpY3VsYXIgYWRhcHRvclxuICAgIHNlbGYuX2Rlc3Ryb3kob3B0cywgZnVuY3Rpb24gKGVyciwgcmVzcCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICBzZWxmLmVtaXQoJ2Rlc3Ryb3llZCcpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcCB8fCB7ICdvayc6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaXNSZW1vdGUoc2VsZikpIHtcbiAgICAvLyBubyBuZWVkIHRvIGNoZWNrIGZvciBkZXBlbmRlbnQgREJzIGlmIGl0J3MgYSByZW1vdGUgREJcbiAgICByZXR1cm4gZGVzdHJveURiKCk7XG4gIH1cblxuICBzZWxmLmdldCgnX2xvY2FsL19wb3VjaF9kZXBlbmRlbnREYnMnLCBmdW5jdGlvbiAoZXJyLCBsb2NhbERvYykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGVyci5zdGF0dXMgIT09IDQwNCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH0gZWxzZSB7IC8vIG5vIGRlcGVuZGVuY2llc1xuICAgICAgICByZXR1cm4gZGVzdHJveURiKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkZXBlbmRlbnREYnMgPSBsb2NhbERvYy5kZXBlbmRlbnREYnM7XG4gICAgdmFyIFBvdWNoREIgPSBzZWxmLmNvbnN0cnVjdG9yO1xuICAgIHZhciBkZWxldGVkTWFwID0gT2JqZWN0LmtleXMoZGVwZW5kZW50RGJzKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIC8vIHVzZV9wcmVmaXggaXMgb25seSBmYWxzZSBpbiB0aGUgYnJvd3NlclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHZhciB0cnVlTmFtZSA9IHVzZVByZWZpeCA/XG4gICAgICAgIG5hbWUucmVwbGFjZShuZXcgUmVnRXhwKCdeJyArIFBvdWNoREIucHJlZml4KSwgJycpIDogbmFtZTtcbiAgICAgIHJldHVybiBuZXcgUG91Y2hEQih0cnVlTmFtZSwgc2VsZi5fX29wdHMpLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBQcm9taXNlLmFsbChkZWxldGVkTWFwKS50aGVuKGRlc3Ryb3lEYiwgY2FsbGJhY2spO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBUYXNrUXVldWUoKSB7XG4gIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICB0aGlzLmZhaWxlZCA9IGZhbHNlO1xuICB0aGlzLnF1ZXVlID0gW107XG59XG5cblRhc2tRdWV1ZS5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZ1bjtcbiAgaWYgKHRoaXMuZmFpbGVkKSB7XG4gICAgd2hpbGUgKChmdW4gPSB0aGlzLnF1ZXVlLnNoaWZ0KCkpKSB7XG4gICAgICBmdW4odGhpcy5mYWlsZWQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoKGZ1biA9IHRoaXMucXVldWUuc2hpZnQoKSkpIHtcbiAgICAgIGZ1bigpO1xuICAgIH1cbiAgfVxufTtcblxuVGFza1F1ZXVlLnByb3RvdHlwZS5mYWlsID0gZnVuY3Rpb24gKGVycikge1xuICB0aGlzLmZhaWxlZCA9IGVycjtcbiAgdGhpcy5leGVjdXRlKCk7XG59O1xuXG5UYXNrUXVldWUucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKGRiKSB7XG4gIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIHRoaXMuZGIgPSBkYjtcbiAgdGhpcy5leGVjdXRlKCk7XG59O1xuXG5UYXNrUXVldWUucHJvdG90eXBlLmFkZFRhc2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIHRoaXMucXVldWUucHVzaChmdW4pO1xuICBpZiAodGhpcy5mYWlsZWQpIHtcbiAgICB0aGlzLmV4ZWN1dGUoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGFyc2VBZGFwdGVyKG5hbWUsIG9wdHMpIHtcbiAgdmFyIG1hdGNoID0gbmFtZS5tYXRjaCgvKFthLXotXSopOlxcL1xcLyguKikvKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgLy8gdGhlIGh0dHAgYWRhcHRlciBleHBlY3RzIHRoZSBmdWxseSBxdWFsaWZpZWQgbmFtZVxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAvaHR0cHM/Ly50ZXN0KG1hdGNoWzFdKSA/IG1hdGNoWzFdICsgJzovLycgKyBtYXRjaFsyXSA6IG1hdGNoWzJdLFxuICAgICAgYWRhcHRlcjogbWF0Y2hbMV1cbiAgICB9O1xuICB9XG5cbiAgdmFyIGFkYXB0ZXJzID0gUG91Y2hEQi5hZGFwdGVycztcbiAgdmFyIHByZWZlcnJlZEFkYXB0ZXJzID0gUG91Y2hEQi5wcmVmZXJyZWRBZGFwdGVycztcbiAgdmFyIHByZWZpeCA9IFBvdWNoREIucHJlZml4O1xuICB2YXIgYWRhcHRlck5hbWUgPSBvcHRzLmFkYXB0ZXI7XG5cbiAgaWYgKCFhZGFwdGVyTmFtZSkgeyAvLyBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBhZGFwdGVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmZXJyZWRBZGFwdGVycy5sZW5ndGg7ICsraSkge1xuICAgICAgYWRhcHRlck5hbWUgPSBwcmVmZXJyZWRBZGFwdGVyc1tpXTtcbiAgICAgIC8vIGNoZWNrIGZvciBicm93c2VycyB0aGF0IGhhdmUgYmVlbiB1cGdyYWRlZCBmcm9tIHdlYnNxbC1vbmx5IHRvIHdlYnNxbCtpZGJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGFkYXB0ZXJOYW1lID09PSAnaWRiJyAmJiAnd2Vic3FsJyBpbiBhZGFwdGVycyAmJlxuICAgICAgICAgIGhhc0xvY2FsU3RvcmFnZSgpICYmIGxvY2FsU3RvcmFnZVsnX3BvdWNoX193ZWJzcWxkYl8nICsgcHJlZml4ICsgbmFtZV0pIHtcbiAgICAgICAgLy8gbG9nIGl0LCBiZWNhdXNlIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyBkdXJpbmcgZGV2ZWxvcG1lbnRcbiAgICAgICAgZ3VhcmRlZENvbnNvbGUoJ2xvZycsICdQb3VjaERCIGlzIGRvd25ncmFkaW5nIFwiJyArIG5hbWUgKyAnXCIgdG8gV2ViU1FMIHRvJyArXG4gICAgICAgICAgJyBhdm9pZCBkYXRhIGxvc3MsIGJlY2F1c2UgaXQgd2FzIGFscmVhZHkgb3BlbmVkIHdpdGggV2ViU1FMLicpO1xuICAgICAgICBjb250aW51ZTsgLy8ga2VlcCB1c2luZyB3ZWJzcWwgdG8gYXZvaWQgdXNlciBkYXRhIGxvc3NcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBhZGFwdGVyID0gYWRhcHRlcnNbYWRhcHRlck5hbWVdO1xuXG4gIC8vIGlmIGFkYXB0ZXIgaXMgaW52YWxpZCwgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93biBsYXRlclxuICB2YXIgdXNlUHJlZml4ID0gKGFkYXB0ZXIgJiYgJ3VzZV9wcmVmaXgnIGluIGFkYXB0ZXIpID9cbiAgICBhZGFwdGVyLnVzZV9wcmVmaXggOiB0cnVlO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogdXNlUHJlZml4ID8gKHByZWZpeCArIG5hbWUpIDogbmFtZSxcbiAgICBhZGFwdGVyOiBhZGFwdGVyTmFtZVxuICB9O1xufVxuXG4vLyBPSywgc28gaGVyZSdzIHRoZSBkZWFsLiBDb25zaWRlciB0aGlzIGNvZGU6XG4vLyAgICAgdmFyIGRiMSA9IG5ldyBQb3VjaERCKCdmb28nKTtcbi8vICAgICB2YXIgZGIyID0gbmV3IFBvdWNoREIoJ2ZvbycpO1xuLy8gICAgIGRiMS5kZXN0cm95KCk7XG4vLyBeIHRoZXNlIHR3byBib3RoIG5lZWQgdG8gZW1pdCAnZGVzdHJveWVkJyBldmVudHMsXG4vLyBhcyB3ZWxsIGFzIHRoZSBQb3VjaERCIGNvbnN0cnVjdG9yIGl0c2VsZi5cbi8vIFNvIHdlIGhhdmUgb25lIGRiIG9iamVjdCAod2hpY2hldmVyIG9uZSBnb3QgZGVzdHJveSgpIGNhbGxlZCBvbiBpdClcbi8vIHJlc3BvbnNpYmxlIGZvciBlbWl0dGluZyB0aGUgaW5pdGlhbCBldmVudCwgd2hpY2ggdGhlbiBnZXRzIGVtaXR0ZWRcbi8vIGJ5IHRoZSBjb25zdHJ1Y3Rvciwgd2hpY2ggdGhlbiBicm9hZGNhc3RzIGl0IHRvIGFueSBvdGhlciBkYnNcbi8vIHRoYXQgbWF5IGhhdmUgYmVlbiBjcmVhdGVkIHdpdGggdGhlIHNhbWUgbmFtZS5cbmZ1bmN0aW9uIHByZXBhcmVGb3JEZXN0cnVjdGlvbihzZWxmKSB7XG5cbiAgZnVuY3Rpb24gb25EZXN0cm95ZWQoZnJvbV9jb25zdHJ1Y3Rvcikge1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlZCcsIG9uQ2xvc2VkKTtcbiAgICBpZiAoIWZyb21fY29uc3RydWN0b3IpIHtcbiAgICAgIHNlbGYuY29uc3RydWN0b3IuZW1pdCgnZGVzdHJveWVkJywgc2VsZi5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNsb3NlZCgpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdkZXN0cm95ZWQnLCBvbkRlc3Ryb3llZCk7XG4gICAgc2VsZi5jb25zdHJ1Y3Rvci5lbWl0KCd1bnJlZicsIHNlbGYpO1xuICB9XG5cbiAgc2VsZi5vbmNlKCdkZXN0cm95ZWQnLCBvbkRlc3Ryb3llZCk7XG4gIHNlbGYub25jZSgnY2xvc2VkJywgb25DbG9zZWQpO1xuICBzZWxmLmNvbnN0cnVjdG9yLmVtaXQoJ3JlZicsIHNlbGYpO1xufVxuXG5pbmhlcml0cyhQb3VjaERCLCBBYnN0cmFjdFBvdWNoREIpO1xuZnVuY3Rpb24gUG91Y2hEQihuYW1lLCBvcHRzKSB7XG4gIC8vIEluIE5vZGUgb3VyIHRlc3Qgc3VpdGUgb25seSB0ZXN0cyB0aGlzIGZvciBQb3VjaEFsdCB1bmZvcnR1bmF0ZWx5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUG91Y2hEQikpIHtcbiAgICByZXR1cm4gbmV3IFBvdWNoREIobmFtZSwgb3B0cyk7XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIGlmIChuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSBuYW1lO1xuICAgIG5hbWUgPSBvcHRzLm5hbWU7XG4gICAgZGVsZXRlIG9wdHMubmFtZTtcbiAgfVxuXG4gIGlmIChvcHRzLmRldGVybWluaXN0aWNfcmV2cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgb3B0cy5kZXRlcm1pbmlzdGljX3JldnMgPSB0cnVlO1xuICB9XG5cbiAgdGhpcy5fX29wdHMgPSBvcHRzID0gY2xvbmUob3B0cyk7XG5cbiAgc2VsZi5hdXRvX2NvbXBhY3Rpb24gPSBvcHRzLmF1dG9fY29tcGFjdGlvbjtcbiAgc2VsZi5wcmVmaXggPSBQb3VjaERCLnByZWZpeDtcblxuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nL2ludmFsaWQgREIgbmFtZScpO1xuICB9XG5cbiAgdmFyIHByZWZpeGVkTmFtZSA9IChvcHRzLnByZWZpeCB8fCAnJykgKyBuYW1lO1xuICB2YXIgYmFja2VuZCA9IHBhcnNlQWRhcHRlcihwcmVmaXhlZE5hbWUsIG9wdHMpO1xuXG4gIG9wdHMubmFtZSA9IGJhY2tlbmQubmFtZTtcbiAgb3B0cy5hZGFwdGVyID0gb3B0cy5hZGFwdGVyIHx8IGJhY2tlbmQuYWRhcHRlcjtcblxuICBzZWxmLm5hbWUgPSBuYW1lO1xuICBzZWxmLl9hZGFwdGVyID0gb3B0cy5hZGFwdGVyO1xuICBQb3VjaERCLmVtaXQoJ2RlYnVnJywgWydhZGFwdGVyJywgJ1BpY2tlZCBhZGFwdGVyOiAnLCBvcHRzLmFkYXB0ZXJdKTtcblxuICBpZiAoIVBvdWNoREIuYWRhcHRlcnNbb3B0cy5hZGFwdGVyXSB8fFxuICAgICAgIVBvdWNoREIuYWRhcHRlcnNbb3B0cy5hZGFwdGVyXS52YWxpZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEFkYXB0ZXI6ICcgKyBvcHRzLmFkYXB0ZXIpO1xuICB9XG5cbiAgQWJzdHJhY3RQb3VjaERCLmNhbGwoc2VsZik7XG4gIHNlbGYudGFza3F1ZXVlID0gbmV3IFRhc2tRdWV1ZSgpO1xuXG4gIHNlbGYuYWRhcHRlciA9IG9wdHMuYWRhcHRlcjtcblxuICBQb3VjaERCLmFkYXB0ZXJzW29wdHMuYWRhcHRlcl0uY2FsbChzZWxmLCBvcHRzLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIHNlbGYudGFza3F1ZXVlLmZhaWwoZXJyKTtcbiAgICB9XG4gICAgcHJlcGFyZUZvckRlc3RydWN0aW9uKHNlbGYpO1xuXG4gICAgc2VsZi5lbWl0KCdjcmVhdGVkJywgc2VsZik7XG4gICAgUG91Y2hEQi5lbWl0KCdjcmVhdGVkJywgc2VsZi5uYW1lKTtcbiAgICBzZWxmLnRhc2txdWV1ZS5yZWFkeShzZWxmKTtcbiAgfSk7XG5cbn1cblxuLy8gQWJvcnRDb250cm9sbGVyIHdhcyBpbnRyb2R1Y2VkIHF1aXRlIGEgd2hpbGUgYWZ0ZXIgZmV0Y2ggYW5kXG4vLyBpc250IHJlcXVpcmVkIGZvciBQb3VjaERCIHRvIGZ1bmN0aW9uIHNvIHBvbHlmaWxsIGlmIG5lZWRlZFxudmFyIGEgPSAodHlwZW9mIEFib3J0Q29udHJvbGxlciAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBBYm9ydENvbnRyb2xsZXJcbiAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHthYm9ydDogZnVuY3Rpb24gKCkge319OyB9O1xuXG52YXIgZiQxID0gZmV0Y2g7XG52YXIgaCA9IEhlYWRlcnM7XG5cblBvdWNoREIuYWRhcHRlcnMgPSB7fTtcblBvdWNoREIucHJlZmVycmVkQWRhcHRlcnMgPSBbXTtcblxuUG91Y2hEQi5wcmVmaXggPSAnX3BvdWNoXyc7XG5cbnZhciBldmVudEVtaXR0ZXIgPSBuZXcgRUUoKTtcblxuZnVuY3Rpb24gc2V0VXBFdmVudEVtaXR0ZXIoUG91Y2gpIHtcbiAgT2JqZWN0LmtleXMoRUUucHJvdG90eXBlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAodHlwZW9mIEVFLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBQb3VjaFtrZXldID0gZXZlbnRFbWl0dGVyW2tleV0uYmluZChldmVudEVtaXR0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gdGhlc2UgYXJlIGNyZWF0ZWQgaW4gY29uc3RydWN0b3IuanMsIGFuZCBhbGxvdyB1cyB0byBub3RpZnkgZWFjaCBEQiB3aXRoXG4gIC8vIHRoZSBzYW1lIG5hbWUgdGhhdCBpdCB3YXMgZGVzdHJveWVkLCB2aWEgdGhlIGNvbnN0cnVjdG9yIG9iamVjdFxuICB2YXIgZGVzdHJ1Y3RMaXN0ZW5lcnMgPSBQb3VjaC5fZGVzdHJ1Y3Rpb25MaXN0ZW5lcnMgPSBuZXcgRXhwb3J0ZWRNYXAoKTtcblxuICBQb3VjaC5vbigncmVmJywgZnVuY3Rpb24gb25Db25zdHJ1Y3RvclJlZihkYikge1xuICAgIGlmICghZGVzdHJ1Y3RMaXN0ZW5lcnMuaGFzKGRiLm5hbWUpKSB7XG4gICAgICBkZXN0cnVjdExpc3RlbmVycy5zZXQoZGIubmFtZSwgW10pO1xuICAgIH1cbiAgICBkZXN0cnVjdExpc3RlbmVycy5nZXQoZGIubmFtZSkucHVzaChkYik7XG4gIH0pO1xuXG4gIFBvdWNoLm9uKCd1bnJlZicsIGZ1bmN0aW9uIG9uQ29uc3RydWN0b3JVbnJlZihkYikge1xuICAgIGlmICghZGVzdHJ1Y3RMaXN0ZW5lcnMuaGFzKGRiLm5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkYkxpc3QgPSBkZXN0cnVjdExpc3RlbmVycy5nZXQoZGIubmFtZSk7XG4gICAgdmFyIHBvcyA9IGRiTGlzdC5pbmRleE9mKGRiKTtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGJMaXN0LnNwbGljZShwb3MsIDEpO1xuICAgIGlmIChkYkxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGRlc3RydWN0TGlzdGVuZXJzLnNldChkYi5uYW1lLCBkYkxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cnVjdExpc3RlbmVycy5kZWxldGUoZGIubmFtZSk7XG4gICAgfVxuICB9KTtcblxuICBQb3VjaC5vbignZGVzdHJveWVkJywgZnVuY3Rpb24gb25Db25zdHJ1Y3RvckRlc3Ryb3llZChuYW1lKSB7XG4gICAgaWYgKCFkZXN0cnVjdExpc3RlbmVycy5oYXMobmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRiTGlzdCA9IGRlc3RydWN0TGlzdGVuZXJzLmdldChuYW1lKTtcbiAgICBkZXN0cnVjdExpc3RlbmVycy5kZWxldGUobmFtZSk7XG4gICAgZGJMaXN0LmZvckVhY2goZnVuY3Rpb24gKGRiKSB7XG4gICAgICBkYi5lbWl0KCdkZXN0cm95ZWQnLHRydWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuc2V0VXBFdmVudEVtaXR0ZXIoUG91Y2hEQik7XG5cblBvdWNoREIuYWRhcHRlciA9IGZ1bmN0aW9uIChpZCwgb2JqLCBhZGRUb1ByZWZlcnJlZEFkYXB0ZXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChvYmoudmFsaWQoKSkge1xuICAgIFBvdWNoREIuYWRhcHRlcnNbaWRdID0gb2JqO1xuICAgIGlmIChhZGRUb1ByZWZlcnJlZEFkYXB0ZXJzKSB7XG4gICAgICBQb3VjaERCLnByZWZlcnJlZEFkYXB0ZXJzLnB1c2goaWQpO1xuICAgIH1cbiAgfVxufTtcblxuUG91Y2hEQi5wbHVnaW4gPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7IC8vIGZ1bmN0aW9uIHN0eWxlIGZvciBwbHVnaW5zXG4gICAgb2JqKFBvdWNoREIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBsdWdpbjogZ290IFwiJyArIG9iaiArICdcIiwgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24nKTtcbiAgfSBlbHNlIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7IC8vIG9iamVjdCBzdHlsZSBmb3IgcGx1Z2luc1xuICAgICAgUG91Y2hEQi5wcm90b3R5cGVbaWRdID0gb2JqW2lkXTtcbiAgICB9KTtcbiAgfVxuICBpZiAodGhpcy5fX2RlZmF1bHRzKSB7XG4gICAgUG91Y2hEQi5fX2RlZmF1bHRzID0gJGluamVjdF9PYmplY3RfYXNzaWduKHt9LCB0aGlzLl9fZGVmYXVsdHMpO1xuICB9XG4gIHJldHVybiBQb3VjaERCO1xufTtcblxuUG91Y2hEQi5kZWZhdWx0cyA9IGZ1bmN0aW9uIChkZWZhdWx0T3B0cykge1xuICBmdW5jdGlvbiBQb3VjaEFsdChuYW1lLCBvcHRzKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBvdWNoQWx0KSkge1xuICAgICAgcmV0dXJuIG5ldyBQb3VjaEFsdChuYW1lLCBvcHRzKTtcbiAgICB9XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGlmIChuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgb3B0cyA9IG5hbWU7XG4gICAgICBuYW1lID0gb3B0cy5uYW1lO1xuICAgICAgZGVsZXRlIG9wdHMubmFtZTtcbiAgICB9XG5cbiAgICBvcHRzID0gJGluamVjdF9PYmplY3RfYXNzaWduKHt9LCBQb3VjaEFsdC5fX2RlZmF1bHRzLCBvcHRzKTtcbiAgICBQb3VjaERCLmNhbGwodGhpcywgbmFtZSwgb3B0cyk7XG4gIH1cblxuICBpbmhlcml0cyhQb3VjaEFsdCwgUG91Y2hEQik7XG5cbiAgUG91Y2hBbHQucHJlZmVycmVkQWRhcHRlcnMgPSBQb3VjaERCLnByZWZlcnJlZEFkYXB0ZXJzLnNsaWNlKCk7XG4gIE9iamVjdC5rZXlzKFBvdWNoREIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghKGtleSBpbiBQb3VjaEFsdCkpIHtcbiAgICAgIFBvdWNoQWx0W2tleV0gPSBQb3VjaERCW2tleV07XG4gICAgfVxuICB9KTtcblxuICAvLyBtYWtlIGRlZmF1bHQgb3B0aW9ucyB0cmFuc2l0aXZlXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3VjaGRiL3BvdWNoZGIvaXNzdWVzLzU5MjJcbiAgUG91Y2hBbHQuX19kZWZhdWx0cyA9ICRpbmplY3RfT2JqZWN0X2Fzc2lnbih7fSwgdGhpcy5fX2RlZmF1bHRzLCBkZWZhdWx0T3B0cyk7XG5cbiAgcmV0dXJuIFBvdWNoQWx0O1xufTtcblxuUG91Y2hEQi5mZXRjaCA9IGZ1bmN0aW9uICh1cmwsIG9wdHMpIHtcbiAgcmV0dXJuIGYkMSh1cmwsIG9wdHMpO1xufTtcblxuLy8gbWFuYWdlZCBhdXRvbWF0aWNhbGx5IGJ5IHNldC12ZXJzaW9uLmpzXG52YXIgdmVyc2lvbiA9IFwiNy4yLjJcIjtcblxuLy8gdGhpcyB3b3VsZCBqdXN0IGJlIFwicmV0dXJuIGRvY1tmaWVsZF1cIiwgYnV0IGZpZWxkc1xuLy8gY2FuIGJlIFwiZGVlcFwiIGR1ZSB0byBkb3Qgbm90YXRpb25cbmZ1bmN0aW9uIGdldEZpZWxkRnJvbURvYyhkb2MsIHBhcnNlZEZpZWxkKSB7XG4gIHZhciB2YWx1ZSA9IGRvYztcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhcnNlZEZpZWxkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHBhcnNlZEZpZWxkW2ldO1xuICAgIHZhbHVlID0gdmFsdWVba2V5XTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlJDEobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGxlZnQgPCByaWdodCA/IC0xIDogbGVmdCA+IHJpZ2h0ID8gMSA6IDA7XG59XG5cbi8vIENvbnZlcnRzIGEgc3RyaW5nIGluIGRvdCBub3RhdGlvbiB0byBhbiBhcnJheSBvZiBpdHMgY29tcG9uZW50cywgd2l0aCBiYWNrc2xhc2ggZXNjYXBpbmdcbmZ1bmN0aW9uIHBhcnNlRmllbGQoZmllbGROYW1lKSB7XG4gIC8vIGZpZWxkcyBtYXkgYmUgZGVlcCAoZS5nLiBcImZvby5iYXIuYmF6XCIpLCBzbyBwYXJzZVxuICB2YXIgZmllbGRzID0gW107XG4gIHZhciBjdXJyZW50ID0gJyc7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmaWVsZE5hbWUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgY2ggPSBmaWVsZE5hbWVbaV07XG4gICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgIGlmIChpID4gMCAmJiBmaWVsZE5hbWVbaSAtIDFdID09PSAnXFxcXCcpIHsgLy8gZXNjYXBlZCBkZWxpbWl0ZXJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuc3Vic3RyaW5nKDAsIGN1cnJlbnQubGVuZ3RoIC0gMSkgKyAnLic7XG4gICAgICB9IGVsc2UgeyAvLyBub3QgZXNjYXBlZCwgc28gZGVsaW1pdGVyXG4gICAgICAgIGZpZWxkcy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICBjdXJyZW50ID0gJyc7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gbm9ybWFsIGNoYXJhY3RlclxuICAgICAgY3VycmVudCArPSBjaDtcbiAgICB9XG4gIH1cbiAgZmllbGRzLnB1c2goY3VycmVudCk7XG4gIHJldHVybiBmaWVsZHM7XG59XG5cbnZhciBjb21iaW5hdGlvbkZpZWxkcyA9IFsnJG9yJywgJyRub3InLCAnJG5vdCddO1xuZnVuY3Rpb24gaXNDb21iaW5hdGlvbmFsRmllbGQoZmllbGQpIHtcbiAgcmV0dXJuIGNvbWJpbmF0aW9uRmllbGRzLmluZGV4T2YoZmllbGQpID4gLTE7XG59XG5cbmZ1bmN0aW9uIGdldEtleShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailbMF07XG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlKG9iaikge1xuICByZXR1cm4gb2JqW2dldEtleShvYmopXTtcbn1cblxuXG4vLyBmbGF0dGVuIGFuIGFycmF5IG9mIHNlbGVjdG9ycyBqb2luZWQgYnkgYW4gJGFuZCBvcGVyYXRvclxuZnVuY3Rpb24gbWVyZ2VBbmRlZFNlbGVjdG9ycyhzZWxlY3RvcnMpIHtcblxuICAvLyBzb3J0IHRvIGVuc3VyZSB0aGF0IGUuZy4gaWYgdGhlIHVzZXIgc3BlY2lmaWVkXG4gIC8vICRhbmQ6IFt7JGd0OiAnYSd9LCB7JGd0OiAnYid9XSwgdGhlbiBpdCdzIGNvbGxhcHNlZCBpbnRvXG4gIC8vIGp1c3QgeyRndDogJ2InfVxuICB2YXIgcmVzID0ge307XG5cbiAgc2VsZWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgT2JqZWN0LmtleXMoc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICB2YXIgbWF0Y2hlciA9IHNlbGVjdG9yW2ZpZWxkXTtcbiAgICAgIGlmICh0eXBlb2YgbWF0Y2hlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbWF0Y2hlciA9IHskZXE6IG1hdGNoZXJ9O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDb21iaW5hdGlvbmFsRmllbGQoZmllbGQpKSB7XG4gICAgICAgIGlmIChtYXRjaGVyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICByZXNbZmllbGRdID0gbWF0Y2hlci5tYXAoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZUFuZGVkU2VsZWN0b3JzKFttXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzW2ZpZWxkXSA9IG1lcmdlQW5kZWRTZWxlY3RvcnMoW21hdGNoZXJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZpZWxkTWF0Y2hlcnMgPSByZXNbZmllbGRdID0gcmVzW2ZpZWxkXSB8fCB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMobWF0Y2hlcikuZm9yRWFjaChmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBtYXRjaGVyW29wZXJhdG9yXTtcblxuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyRndCcgfHwgb3BlcmF0b3IgPT09ICckZ3RlJykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlR3RHdGUob3BlcmF0b3IsIHZhbHVlLCBmaWVsZE1hdGNoZXJzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnJGx0JyB8fCBvcGVyYXRvciA9PT0gJyRsdGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VMdEx0ZShvcGVyYXRvciwgdmFsdWUsIGZpZWxkTWF0Y2hlcnMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICckbmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VOZSh2YWx1ZSwgZmllbGRNYXRjaGVycyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJyRlcScpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZUVxKHZhbHVlLCBmaWVsZE1hdGNoZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmllbGRNYXRjaGVyc1tvcGVyYXRvcl0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cblxuXG4vLyBjb2xsYXBzZSBsb2dpY2FsbHkgZXF1aXZhbGVudCBndC9ndGUgdmFsdWVzXG5mdW5jdGlvbiBtZXJnZUd0R3RlKG9wZXJhdG9yLCB2YWx1ZSwgZmllbGRNYXRjaGVycykge1xuICBpZiAodHlwZW9mIGZpZWxkTWF0Y2hlcnMuJGVxICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjsgLy8gZG8gbm90aGluZ1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGRNYXRjaGVycy4kZ3RlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChvcGVyYXRvciA9PT0gJyRndGUnKSB7XG4gICAgICBpZiAodmFsdWUgPiBmaWVsZE1hdGNoZXJzLiRndGUpIHsgLy8gbW9yZSBzcGVjaWZpY2l0eVxuICAgICAgICBmaWVsZE1hdGNoZXJzLiRndGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBvcGVyYXRvciA9PT0gJyRndCdcbiAgICAgIGlmICh2YWx1ZSA+PSBmaWVsZE1hdGNoZXJzLiRndGUpIHsgLy8gbW9yZSBzcGVjaWZpY2l0eVxuICAgICAgICBkZWxldGUgZmllbGRNYXRjaGVycy4kZ3RlO1xuICAgICAgICBmaWVsZE1hdGNoZXJzLiRndCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZmllbGRNYXRjaGVycy4kZ3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKG9wZXJhdG9yID09PSAnJGd0ZScpIHtcbiAgICAgIGlmICh2YWx1ZSA+IGZpZWxkTWF0Y2hlcnMuJGd0KSB7IC8vIG1vcmUgc3BlY2lmaWNpdHlcbiAgICAgICAgZGVsZXRlIGZpZWxkTWF0Y2hlcnMuJGd0O1xuICAgICAgICBmaWVsZE1hdGNoZXJzLiRndGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBvcGVyYXRvciA9PT0gJyRndCdcbiAgICAgIGlmICh2YWx1ZSA+IGZpZWxkTWF0Y2hlcnMuJGd0KSB7IC8vIG1vcmUgc3BlY2lmaWNpdHlcbiAgICAgICAgZmllbGRNYXRjaGVycy4kZ3QgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZmllbGRNYXRjaGVyc1tvcGVyYXRvcl0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vLyBjb2xsYXBzZSBsb2dpY2FsbHkgZXF1aXZhbGVudCBsdC9sdGUgdmFsdWVzXG5mdW5jdGlvbiBtZXJnZUx0THRlKG9wZXJhdG9yLCB2YWx1ZSwgZmllbGRNYXRjaGVycykge1xuICBpZiAodHlwZW9mIGZpZWxkTWF0Y2hlcnMuJGVxICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjsgLy8gZG8gbm90aGluZ1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGRNYXRjaGVycy4kbHRlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChvcGVyYXRvciA9PT0gJyRsdGUnKSB7XG4gICAgICBpZiAodmFsdWUgPCBmaWVsZE1hdGNoZXJzLiRsdGUpIHsgLy8gbW9yZSBzcGVjaWZpY2l0eVxuICAgICAgICBmaWVsZE1hdGNoZXJzLiRsdGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBvcGVyYXRvciA9PT0gJyRndCdcbiAgICAgIGlmICh2YWx1ZSA8PSBmaWVsZE1hdGNoZXJzLiRsdGUpIHsgLy8gbW9yZSBzcGVjaWZpY2l0eVxuICAgICAgICBkZWxldGUgZmllbGRNYXRjaGVycy4kbHRlO1xuICAgICAgICBmaWVsZE1hdGNoZXJzLiRsdCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZmllbGRNYXRjaGVycy4kbHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKG9wZXJhdG9yID09PSAnJGx0ZScpIHtcbiAgICAgIGlmICh2YWx1ZSA8IGZpZWxkTWF0Y2hlcnMuJGx0KSB7IC8vIG1vcmUgc3BlY2lmaWNpdHlcbiAgICAgICAgZGVsZXRlIGZpZWxkTWF0Y2hlcnMuJGx0O1xuICAgICAgICBmaWVsZE1hdGNoZXJzLiRsdGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBvcGVyYXRvciA9PT0gJyRndCdcbiAgICAgIGlmICh2YWx1ZSA8IGZpZWxkTWF0Y2hlcnMuJGx0KSB7IC8vIG1vcmUgc3BlY2lmaWNpdHlcbiAgICAgICAgZmllbGRNYXRjaGVycy4kbHQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZmllbGRNYXRjaGVyc1tvcGVyYXRvcl0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vLyBjb21iaW5lICRuZSB2YWx1ZXMgaW50byBvbmUgYXJyYXlcbmZ1bmN0aW9uIG1lcmdlTmUodmFsdWUsIGZpZWxkTWF0Y2hlcnMpIHtcbiAgaWYgKCckbmUnIGluIGZpZWxkTWF0Y2hlcnMpIHtcbiAgICAvLyB0aGVyZSBhcmUgbWFueSB0aGluZ3MgdGhpcyBjb3VsZCBcIm5vdFwiIGJlXG4gICAgZmllbGRNYXRjaGVycy4kbmUucHVzaCh2YWx1ZSk7XG4gIH0gZWxzZSB7IC8vIGRvZXNuJ3QgZXhpc3QgeWV0XG4gICAgZmllbGRNYXRjaGVycy4kbmUgPSBbdmFsdWVdO1xuICB9XG59XG5cbi8vIGFkZCAkZXEgaW50byB0aGUgbWl4XG5mdW5jdGlvbiBtZXJnZUVxKHZhbHVlLCBmaWVsZE1hdGNoZXJzKSB7XG4gIC8vIHRoZXNlIGFsbCBoYXZlIGxlc3Mgc3BlY2lmaWNpdHkgdGhhbiB0aGUgJGVxXG4gIC8vIFRPRE86IGNoZWNrIGZvciB1c2VyIGVycm9ycyBoZXJlXG4gIGRlbGV0ZSBmaWVsZE1hdGNoZXJzLiRndDtcbiAgZGVsZXRlIGZpZWxkTWF0Y2hlcnMuJGd0ZTtcbiAgZGVsZXRlIGZpZWxkTWF0Y2hlcnMuJGx0O1xuICBkZWxldGUgZmllbGRNYXRjaGVycy4kbHRlO1xuICBkZWxldGUgZmllbGRNYXRjaGVycy4kbmU7XG4gIGZpZWxkTWF0Y2hlcnMuJGVxID0gdmFsdWU7XG59XG5cbi8vIzc0NTg6IGV4ZWN1dGUgZnVuY3Rpb24gbWVyZ2VBbmRlZFNlbGVjdG9ycyBvbiBuZXN0ZWQgJGFuZFxuZnVuY3Rpb24gbWVyZ2VBbmRlZFNlbGVjdG9yc05lc3RlZChvYmopIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmpbaV1bJyRhbmQnXSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpbaV0gPSBtZXJnZUFuZGVkU2VsZWN0b3JzKG9ialtpXVsnJGFuZCddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW3Byb3BdO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgbWVyZ2VBbmRlZFNlbGVjdG9yc05lc3RlZCh2YWx1ZSk7IC8vIDwtIHJlY3Vyc2l2ZSBjYWxsXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuLy8jNzQ1ODogZGV0ZXJtaW5lIGlkICRhbmQgaXMgcHJlc2VudCBpbiBzZWxlY3RvciAoYXQgYW55IGxldmVsKVxuZnVuY3Rpb24gaXNBbmRJblNlbGVjdG9yKG9iaiwgaXNBbmQpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICBpZiAocHJvcCA9PT0gJyRhbmQnKSB7XG4gICAgICAgICAgICBpc0FuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW3Byb3BdO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaXNBbmQgPSBpc0FuZEluU2VsZWN0b3IodmFsdWUsIGlzQW5kKTsgLy8gPC0gcmVjdXJzaXZlIGNhbGxcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBbmQ7XG59XG5cbi8vXG4vLyBub3JtYWxpemUgdGhlIHNlbGVjdG9yXG4vL1xuZnVuY3Rpb24gbWFzc2FnZVNlbGVjdG9yKGlucHV0KSB7XG4gIHZhciByZXN1bHQgPSBjbG9uZShpbnB1dCk7XG4gIHZhciB3YXNBbmRlZCA9IGZhbHNlO1xuICAgIC8vIzc0NTg6IGlmICRhbmQgaXMgcHJlc2VudCBpbiBzZWxlY3RvciAoYXQgYW55IGxldmVsKSBtZXJnZSBuZXN0ZWQgJGFuZFxuICAgIGlmIChpc0FuZEluU2VsZWN0b3IocmVzdWx0LCBmYWxzZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gbWVyZ2VBbmRlZFNlbGVjdG9yc05lc3RlZChyZXN1bHQpO1xuICAgICAgICBpZiAoJyRhbmQnIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbWVyZ2VBbmRlZFNlbGVjdG9ycyhyZXN1bHRbJyRhbmQnXSk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzQW5kZWQgPSB0cnVlO1xuICAgIH1cblxuICBbJyRvcicsICckbm9yJ10uZm9yRWFjaChmdW5jdGlvbiAob3JPck5vcikge1xuICAgIGlmIChvck9yTm9yIGluIHJlc3VsdCkge1xuICAgICAgLy8gbWVzc2FnZSBlYWNoIGluZGl2aWR1YWwgc2VsZWN0b3JcbiAgICAgIC8vIGUuZy4ge2ZvbzogJ2Jhcid9IGJlY29tZXMge2ZvbzogeyRlcTogJ2Jhcid9fVxuICAgICAgcmVzdWx0W29yT3JOb3JdLmZvckVhY2goZnVuY3Rpb24gKHN1YlNlbGVjdG9yKSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBPYmplY3Qua2V5cyhzdWJTZWxlY3Rvcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ldO1xuICAgICAgICAgIHZhciBtYXRjaGVyID0gc3ViU2VsZWN0b3JbZmllbGRdO1xuICAgICAgICAgIGlmICh0eXBlb2YgbWF0Y2hlciAhPT0gJ29iamVjdCcgfHwgbWF0Y2hlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3ViU2VsZWN0b3JbZmllbGRdID0geyRlcTogbWF0Y2hlcn07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICgnJG5vdCcgaW4gcmVzdWx0KSB7XG4gICAgLy9UaGlzIGZlZWxzIGEgbGl0dGxlIGxpa2UgZm9yY2luZywgYnV0IGl0IHdpbGwgd29yayBmb3Igbm93LFxuICAgIC8vSSB3b3VsZCBsaWtlIHRvIGNvbWUgYmFjayB0byB0aGlzIGFuZCBtYWtlIHRoZSBtZXJnaW5nIG9mIHNlbGVjdG9ycyBhIGxpdHRsZSBtb3JlIGdlbmVyaWNcbiAgICByZXN1bHRbJyRub3QnXSA9IG1lcmdlQW5kZWRTZWxlY3RvcnMoW3Jlc3VsdFsnJG5vdCddXSk7XG4gIH1cblxuICB2YXIgZmllbGRzID0gT2JqZWN0LmtleXMocmVzdWx0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmaWVsZCA9IGZpZWxkc1tpXTtcbiAgICB2YXIgbWF0Y2hlciA9IHJlc3VsdFtmaWVsZF07XG5cbiAgICBpZiAodHlwZW9mIG1hdGNoZXIgIT09ICdvYmplY3QnIHx8IG1hdGNoZXIgPT09IG51bGwpIHtcbiAgICAgIG1hdGNoZXIgPSB7JGVxOiBtYXRjaGVyfTtcbiAgICB9IGVsc2UgaWYgKCckbmUnIGluIG1hdGNoZXIgJiYgIXdhc0FuZGVkKSB7XG4gICAgICAvLyBJIHB1dCB0aGVzZSBpbiBhbiBhcnJheSwgc2luY2UgdGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmVcbiAgICAgIC8vIGJ1dCBpbiB0aGUgXCJtZXJnZUFuZGVkXCIgb3BlcmF0aW9uLCBJIGFscmVhZHkgdGFrZSBjYXJlIG9mIHRoYXRcbiAgICAgIG1hdGNoZXIuJG5lID0gW21hdGNoZXIuJG5lXTtcbiAgICB9XG4gICAgcmVzdWx0W2ZpZWxkXSA9IG1hdGNoZXI7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBwYWQoc3RyLCBwYWRXaXRoLCB1cFRvTGVuZ3RoKSB7XG4gIHZhciBwYWRkaW5nID0gJyc7XG4gIHZhciB0YXJnZXRMZW5ndGggPSB1cFRvTGVuZ3RoIC0gc3RyLmxlbmd0aDtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgd2hpbGUgKHBhZGRpbmcubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgcGFkZGluZyArPSBwYWRXaXRoO1xuICB9XG4gIHJldHVybiBwYWRkaW5nO1xufVxuXG5mdW5jdGlvbiBwYWRMZWZ0KHN0ciwgcGFkV2l0aCwgdXBUb0xlbmd0aCkge1xuICB2YXIgcGFkZGluZyA9IHBhZChzdHIsIHBhZFdpdGgsIHVwVG9MZW5ndGgpO1xuICByZXR1cm4gcGFkZGluZyArIHN0cjtcbn1cblxudmFyIE1JTl9NQUdOSVRVREUgPSAtMzI0OyAvLyB2ZXJpZmllZCBieSAtTnVtYmVyLk1JTl9WQUxVRVxudmFyIE1BR05JVFVERV9ESUdJVFMgPSAzOyAvLyBkaXR0b1xudmFyIFNFUCA9ICcnOyAvLyBzZXQgdG8gJ18nIGZvciBlYXNpZXIgZGVidWdnaW5nIFxuXG5mdW5jdGlvbiBjb2xsYXRlKGEsIGIpIHtcblxuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgYSA9IG5vcm1hbGl6ZUtleShhKTtcbiAgYiA9IG5vcm1hbGl6ZUtleShiKTtcblxuICB2YXIgYWkgPSBjb2xsYXRpb25JbmRleChhKTtcbiAgdmFyIGJpID0gY29sbGF0aW9uSW5kZXgoYik7XG4gIGlmICgoYWkgLSBiaSkgIT09IDApIHtcbiAgICByZXR1cm4gYWkgLSBiaTtcbiAgfVxuICBzd2l0Y2ggKHR5cGVvZiBhKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBhIC0gYjtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogMTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHN0cmluZ0NvbGxhdGUoYSwgYik7XG4gIH1cbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgPyBhcnJheUNvbGxhdGUoYSwgYikgOiBvYmplY3RDb2xsYXRlKGEsIGIpO1xufVxuXG4vLyBjb3VjaCBjb25zaWRlcnMgbnVsbC9OYU4vSW5maW5pdHkvLUluZmluaXR5ID09PSB1bmRlZmluZWQsXG4vLyBmb3IgdGhlIHB1cnBvc2VzIG9mIG1hcHJlZHVjZSBpbmRleGVzLiBhbHNvLCBkYXRlcyBnZXQgc3RyaW5naWZpZWQuXG5mdW5jdGlvbiBub3JtYWxpemVLZXkoa2V5KSB7XG4gIHN3aXRjaCAodHlwZW9mIGtleSkge1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgaWYgKGtleSA9PT0gSW5maW5pdHkgfHwga2V5ID09PSAtSW5maW5pdHkgfHwgaXNOYU4oa2V5KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXk7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHZhciBvcmlnS2V5ID0ga2V5O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgICB2YXIgbGVuID0ga2V5Lmxlbmd0aDtcbiAgICAgICAga2V5ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBrZXlbaV0gPSBub3JtYWxpemVLZXkob3JpZ0tleVtpXSk7XG4gICAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICB9IGVsc2UgaWYgKGtleSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGtleS50b0pTT04oKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSBudWxsKSB7IC8vIGdlbmVyaWMgb2JqZWN0XG4gICAgICAgIGtleSA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrIGluIG9yaWdLZXkpIHtcbiAgICAgICAgICBpZiAob3JpZ0tleS5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9yaWdLZXlba107XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAga2V5W2tdID0gbm9ybWFsaXplS2V5KHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGtleTtcbn1cblxuZnVuY3Rpb24gaW5kZXhpZnkoa2V5KSB7XG4gIGlmIChrZXkgIT09IG51bGwpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBrZXkpIHtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4ga2V5ID8gMSA6IDA7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gbnVtVG9JbmRleGFibGVTdHJpbmcoa2V5KTtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIC8vIFdlJ3ZlIHRvIGJlIHN1cmUgdGhhdCBrZXkgZG9lcyBub3QgY29udGFpbiBcXHUwMDAwXG4gICAgICAgIC8vIERvIG9yZGVyLXByZXNlcnZpbmcgcmVwbGFjZW1lbnRzOlxuICAgICAgICAvLyAwIC0+IDEsIDFcbiAgICAgICAgLy8gMSAtPiAxLCAyXG4gICAgICAgIC8vIDIgLT4gMiwgMlxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgIHJldHVybiBrZXlcbiAgICAgICAgICAucmVwbGFjZSgvXFx1MDAwMi9nLCAnXFx1MDAwMlxcdTAwMDInKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHUwMDAxL2csICdcXHUwMDAxXFx1MDAwMicpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcdTAwMDAvZywgJ1xcdTAwMDFcXHUwMDAxJyk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29udHJvbC1yZWdleCAqL1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGtleSk7XG4gICAgICAgIHZhciBhcnIgPSBpc0FycmF5ID8ga2V5IDogT2JqZWN0LmtleXMoa2V5KTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gdG9JbmRleGFibGVTdHJpbmcoYXJyW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgdmFyIG9iaktleSA9IGFycltpXTtcbiAgICAgICAgICAgIHJlc3VsdCArPSB0b0luZGV4YWJsZVN0cmluZyhvYmpLZXkpICtcbiAgICAgICAgICAgICAgICB0b0luZGV4YWJsZVN0cmluZyhrZXlbb2JqS2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLy8gY29udmVydCB0aGUgZ2l2ZW4ga2V5IHRvIGEgc3RyaW5nIHRoYXQgd291bGQgYmUgYXBwcm9wcmlhdGVcbi8vIGZvciBsZXhpY2FsIHNvcnRpbmcsIGUuZy4gd2l0aGluIGEgZGF0YWJhc2UsIHdoZXJlIHRoZVxuLy8gc29ydGluZyBpcyB0aGUgc2FtZSBnaXZlbiBieSB0aGUgY29sbGF0ZSgpIGZ1bmN0aW9uLlxuZnVuY3Rpb24gdG9JbmRleGFibGVTdHJpbmcoa2V5KSB7XG4gIHZhciB6ZXJvID0gJ1xcdTAwMDAnO1xuICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcbiAgcmV0dXJuIGNvbGxhdGlvbkluZGV4KGtleSkgKyBTRVAgKyBpbmRleGlmeShrZXkpICsgemVybztcbn1cblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoc3RyLCBpKSB7XG4gIHZhciBvcmlnaW5hbElkeCA9IGk7XG4gIHZhciBudW07XG4gIHZhciB6ZXJvID0gc3RyW2ldID09PSAnMSc7XG4gIGlmICh6ZXJvKSB7XG4gICAgbnVtID0gMDtcbiAgICBpKys7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5lZyA9IHN0cltpXSA9PT0gJzAnO1xuICAgIGkrKztcbiAgICB2YXIgbnVtQXNTdHJpbmcgPSAnJztcbiAgICB2YXIgbWFnQXNTdHJpbmcgPSBzdHIuc3Vic3RyaW5nKGksIGkgKyBNQUdOSVRVREVfRElHSVRTKTtcbiAgICB2YXIgbWFnbml0dWRlID0gcGFyc2VJbnQobWFnQXNTdHJpbmcsIDEwKSArIE1JTl9NQUdOSVRVREU7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobmVnKSB7XG4gICAgICBtYWduaXR1ZGUgPSAtbWFnbml0dWRlO1xuICAgIH1cbiAgICBpICs9IE1BR05JVFVERV9ESUdJVFM7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBjaCA9IHN0cltpXTtcbiAgICAgIGlmIChjaCA9PT0gJ1xcdTAwMDAnKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbnVtQXNTdHJpbmcgKz0gY2g7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIG51bUFzU3RyaW5nID0gbnVtQXNTdHJpbmcuc3BsaXQoJy4nKTtcbiAgICBpZiAobnVtQXNTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgICBudW0gPSBwYXJzZUludChudW1Bc1N0cmluZywgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgbnVtID0gcGFyc2VGbG9hdChudW1Bc1N0cmluZ1swXSArICcuJyArIG51bUFzU3RyaW5nWzFdKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobmVnKSB7XG4gICAgICBudW0gPSBudW0gLSAxMDtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobWFnbml0dWRlICE9PSAwKSB7XG4gICAgICAvLyBwYXJzZUZsb2F0IGlzIG1vcmUgcmVsaWFibGUgdGhhbiBwb3cgZHVlIHRvIHJvdW5kaW5nIGVycm9yc1xuICAgICAgLy8gZS5nLiBOdW1iZXIuTUFYX1ZBTFVFIHdvdWxkIHJldHVybiBJbmZpbml0eSBpZiB3ZSBkaWRcbiAgICAgIC8vIG51bSAqIE1hdGgucG93KDEwLCBtYWduaXR1ZGUpO1xuICAgICAgbnVtID0gcGFyc2VGbG9hdChudW0gKyAnZScgKyBtYWduaXR1ZGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge251bTogbnVtLCBsZW5ndGggOiBpIC0gb3JpZ2luYWxJZHh9O1xufVxuXG4vLyBtb3ZlIHVwIHRoZSBzdGFjayB3aGlsZSBwYXJzaW5nXG4vLyB0aGlzIGZ1bmN0aW9uIG1vdmVkIG91dHNpZGUgb2YgcGFyc2VJbmRleGFibGVTdHJpbmcgZm9yIHBlcmZvcm1hbmNlXG5mdW5jdGlvbiBwb3Aoc3RhY2ssIG1ldGFTdGFjaykge1xuICB2YXIgb2JqID0gc3RhY2sucG9wKCk7XG5cbiAgaWYgKG1ldGFTdGFjay5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdE1ldGFFbGVtZW50ID0gbWV0YVN0YWNrW21ldGFTdGFjay5sZW5ndGggLSAxXTtcbiAgICBpZiAob2JqID09PSBsYXN0TWV0YUVsZW1lbnQuZWxlbWVudCkge1xuICAgICAgLy8gcG9wcGluZyBhIG1ldGEtZWxlbWVudCwgZS5nLiBhbiBvYmplY3Qgd2hvc2UgdmFsdWUgaXMgYW5vdGhlciBvYmplY3RcbiAgICAgIG1ldGFTdGFjay5wb3AoKTtcbiAgICAgIGxhc3RNZXRhRWxlbWVudCA9IG1ldGFTdGFja1ttZXRhU3RhY2subGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHZhciBlbGVtZW50ID0gbGFzdE1ldGFFbGVtZW50LmVsZW1lbnQ7XG4gICAgdmFyIGxhc3RFbGVtZW50SW5kZXggPSBsYXN0TWV0YUVsZW1lbnQuaW5kZXg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQucHVzaChvYmopO1xuICAgIH0gZWxzZSBpZiAobGFzdEVsZW1lbnRJbmRleCA9PT0gc3RhY2subGVuZ3RoIC0gMikgeyAvLyBvYmogd2l0aCBrZXkrdmFsdWVcbiAgICAgIHZhciBrZXkgPSBzdGFjay5wb3AoKTtcbiAgICAgIGVsZW1lbnRba2V5XSA9IG9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhY2sucHVzaChvYmopOyAvLyBvYmogd2l0aCBrZXkgb25seVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUluZGV4YWJsZVN0cmluZyhzdHIpIHtcbiAgdmFyIHN0YWNrID0gW107XG4gIHZhciBtZXRhU3RhY2sgPSBbXTsgLy8gc3RhY2sgZm9yIGFycmF5cyBhbmQgb2JqZWN0c1xuICB2YXIgaSA9IDA7XG5cbiAgLyplc2xpbnQgbm8tY29uc3RhbnQtY29uZGl0aW9uOiBbXCJlcnJvclwiLCB7IFwiY2hlY2tMb29wc1wiOiBmYWxzZSB9XSovXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGNvbGxhdGlvbkluZGV4ID0gc3RyW2krK107XG4gICAgaWYgKGNvbGxhdGlvbkluZGV4ID09PSAnXFx1MDAwMCcpIHtcbiAgICAgIGlmIChzdGFjay5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9wKHN0YWNrLCBtZXRhU3RhY2spO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpdGNoIChjb2xsYXRpb25JbmRleCkge1xuICAgICAgY2FzZSAnMSc6XG4gICAgICAgIHN0YWNrLnB1c2gobnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMic6XG4gICAgICAgIHN0YWNrLnB1c2goc3RyW2ldID09PSAnMScpO1xuICAgICAgICBpKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMyc6XG4gICAgICAgIHZhciBwYXJzZWROdW0gPSBwYXJzZU51bWJlcihzdHIsIGkpO1xuICAgICAgICBzdGFjay5wdXNoKHBhcnNlZE51bS5udW0pO1xuICAgICAgICBpICs9IHBhcnNlZE51bS5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnNCc6XG4gICAgICAgIHZhciBwYXJzZWRTdHIgPSAnJztcbiAgICAgICAgLyplc2xpbnQgbm8tY29uc3RhbnQtY29uZGl0aW9uOiBbXCJlcnJvclwiLCB7IFwiY2hlY2tMb29wc1wiOiBmYWxzZSB9XSovXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgdmFyIGNoID0gc3RyW2ldO1xuICAgICAgICAgIGlmIChjaCA9PT0gJ1xcdTAwMDAnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyc2VkU3RyICs9IGNoO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBwZXJmb3JtIHRoZSByZXZlcnNlIG9mIHRoZSBvcmRlci1wcmVzZXJ2aW5nIHJlcGxhY2VtZW50XG4gICAgICAgIC8vIGFsZ29yaXRobSAoc2VlIGFib3ZlKVxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgIHBhcnNlZFN0ciA9IHBhcnNlZFN0ci5yZXBsYWNlKC9cXHUwMDAxXFx1MDAwMS9nLCAnXFx1MDAwMCcpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcdTAwMDFcXHUwMDAyL2csICdcXHUwMDAxJylcbiAgICAgICAgICAucmVwbGFjZSgvXFx1MDAwMlxcdTAwMDIvZywgJ1xcdTAwMDInKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4gICAgICAgIHN0YWNrLnB1c2gocGFyc2VkU3RyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc1JzpcbiAgICAgICAgdmFyIGFycmF5RWxlbWVudCA9IHsgZWxlbWVudDogW10sIGluZGV4OiBzdGFjay5sZW5ndGggfTtcbiAgICAgICAgc3RhY2sucHVzaChhcnJheUVsZW1lbnQuZWxlbWVudCk7XG4gICAgICAgIG1ldGFTdGFjay5wdXNoKGFycmF5RWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnNic6XG4gICAgICAgIHZhciBvYmpFbGVtZW50ID0geyBlbGVtZW50OiB7fSwgaW5kZXg6IHN0YWNrLmxlbmd0aCB9O1xuICAgICAgICBzdGFjay5wdXNoKG9iakVsZW1lbnQuZWxlbWVudCk7XG4gICAgICAgIG1ldGFTdGFjay5wdXNoKG9iakVsZW1lbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2JhZCBjb2xsYXRpb25JbmRleCBvciB1bmV4cGVjdGVkbHkgcmVhY2hlZCBlbmQgb2YgaW5wdXQ6ICcgK1xuICAgICAgICAgICAgY29sbGF0aW9uSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJheUNvbGxhdGUoYSwgYikge1xuICB2YXIgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBzb3J0ID0gY29sbGF0ZShhW2ldLCBiW2ldKTtcbiAgICBpZiAoc29ydCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHNvcnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiAoYS5sZW5ndGggPT09IGIubGVuZ3RoKSA/IDAgOlxuICAgIChhLmxlbmd0aCA+IGIubGVuZ3RoKSA/IDEgOiAtMTtcbn1cbmZ1bmN0aW9uIHN0cmluZ0NvbGxhdGUoYSwgYikge1xuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYWxlaGFydmV5L3BvdWNoZGIvaXNzdWVzLzQwXG4gIC8vIFRoaXMgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhlIENvdWNoREIgaW1wbGVtZW50YXRpb24sIGJ1dCBpdHMgdGhlXG4gIC8vIGJlc3Qgd2UgY2FuIGRvIGZvciBub3dcbiAgcmV0dXJuIChhID09PSBiKSA/IDAgOiAoKGEgPiBiKSA/IDEgOiAtMSk7XG59XG5mdW5jdGlvbiBvYmplY3RDb2xsYXRlKGEsIGIpIHtcbiAgdmFyIGFrID0gT2JqZWN0LmtleXMoYSksIGJrID0gT2JqZWN0LmtleXMoYik7XG4gIHZhciBsZW4gPSBNYXRoLm1pbihhay5sZW5ndGgsIGJrLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAvLyBGaXJzdCBzb3J0IHRoZSBrZXlzXG4gICAgdmFyIHNvcnQgPSBjb2xsYXRlKGFrW2ldLCBia1tpXSk7XG4gICAgaWYgKHNvcnQgIT09IDApIHtcbiAgICAgIHJldHVybiBzb3J0O1xuICAgIH1cbiAgICAvLyBpZiB0aGUga2V5cyBhcmUgZXF1YWwgc29ydCB0aGUgdmFsdWVzXG4gICAgc29ydCA9IGNvbGxhdGUoYVtha1tpXV0sIGJbYmtbaV1dKTtcbiAgICBpZiAoc29ydCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHNvcnQ7XG4gICAgfVxuXG4gIH1cbiAgcmV0dXJuIChhay5sZW5ndGggPT09IGJrLmxlbmd0aCkgPyAwIDpcbiAgICAoYWsubGVuZ3RoID4gYmsubGVuZ3RoKSA/IDEgOiAtMTtcbn1cbi8vIFRoZSBjb2xsYXRpb24gaXMgZGVmaW5lZCBieSBlcmxhbmdzIG9yZGVyZWQgdGVybXNcbi8vIHRoZSBhdG9tcyBudWxsLCB0cnVlLCBmYWxzZSBjb21lIGZpcnN0LCB0aGVuIG51bWJlcnMsIHN0cmluZ3MsXG4vLyBhcnJheXMsIHRoZW4gb2JqZWN0c1xuLy8gbnVsbC91bmRlZmluZWQvTmFOL0luZmluaXR5Ly1JbmZpbml0eSBhcmUgYWxsIGNvbnNpZGVyZWQgbnVsbFxuZnVuY3Rpb24gY29sbGF0aW9uSW5kZXgoeCkge1xuICB2YXIgaWQgPSBbJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ3N0cmluZycsICdvYmplY3QnXTtcbiAgdmFyIGlkeCA9IGlkLmluZGV4T2YodHlwZW9mIHgpO1xuICAvL2ZhbHNlIGlmIC0xIG90aGVyd2lzZSB0cnVlLCBidXQgZmFzdCEhISExXG4gIGlmICh+aWR4KSB7XG4gICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgICAgcmV0dXJuIDU7XG4gICAgfVxuICAgIHJldHVybiBpZHggPCAzID8gKGlkeCArIDIpIDogKGlkeCArIDMpO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIDU7XG4gIH1cbn1cblxuLy8gY29udmVyc2lvbjpcbi8vIHggeXl5IHp6Li4uenpcbi8vIHggPSAwIGZvciBuZWdhdGl2ZSwgMSBmb3IgMCwgMiBmb3IgcG9zaXRpdmVcbi8vIHkgPSBleHBvbmVudCAoZm9yIG5lZ2F0aXZlIG51bWJlcnMgbmVnYXRlZCkgbW92ZWQgc28gdGhhdCBpdCdzID49IDBcbi8vIHogPSBtYW50aXNzZVxuZnVuY3Rpb24gbnVtVG9JbmRleGFibGVTdHJpbmcobnVtKSB7XG5cbiAgaWYgKG51bSA9PT0gMCkge1xuICAgIHJldHVybiAnMSc7XG4gIH1cblxuICAvLyBjb252ZXJ0IG51bWJlciB0byBleHBvbmVudGlhbCBmb3JtYXQgZm9yIGVhc2llciBhbmRcbiAgLy8gbW9yZSBzdWNjaW5jdCBzdHJpbmcgc29ydGluZ1xuICB2YXIgZXhwRm9ybWF0ID0gbnVtLnRvRXhwb25lbnRpYWwoKS5zcGxpdCgvZVxcKz8vKTtcbiAgdmFyIG1hZ25pdHVkZSA9IHBhcnNlSW50KGV4cEZvcm1hdFsxXSwgMTApO1xuXG4gIHZhciBuZWcgPSBudW0gPCAwO1xuXG4gIHZhciByZXN1bHQgPSBuZWcgPyAnMCcgOiAnMic7XG5cbiAgLy8gZmlyc3Qgc29ydCBieSBtYWduaXR1ZGVcbiAgLy8gaXQncyBlYXNpZXIgaWYgYWxsIG1hZ25pdHVkZXMgYXJlIHBvc2l0aXZlXG4gIHZhciBtYWdGb3JDb21wYXJpc29uID0gKChuZWcgPyAtbWFnbml0dWRlIDogbWFnbml0dWRlKSAtIE1JTl9NQUdOSVRVREUpO1xuICB2YXIgbWFnU3RyaW5nID0gcGFkTGVmdCgobWFnRm9yQ29tcGFyaXNvbikudG9TdHJpbmcoKSwgJzAnLCBNQUdOSVRVREVfRElHSVRTKTtcblxuICByZXN1bHQgKz0gU0VQICsgbWFnU3RyaW5nO1xuXG4gIC8vIHRoZW4gc29ydCBieSB0aGUgZmFjdG9yXG4gIHZhciBmYWN0b3IgPSBNYXRoLmFicyhwYXJzZUZsb2F0KGV4cEZvcm1hdFswXSkpOyAvLyBbMS4uMTApXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChuZWcpIHsgLy8gZm9yIG5lZ2F0aXZlIHJldmVyc2Ugb3JkZXJpbmdcbiAgICBmYWN0b3IgPSAxMCAtIGZhY3RvcjtcbiAgfVxuXG4gIHZhciBmYWN0b3JTdHIgPSBmYWN0b3IudG9GaXhlZCgyMCk7XG5cbiAgLy8gc3RyaXAgemVyb3MgZnJvbSB0aGUgZW5kXG4gIGZhY3RvclN0ciA9IGZhY3RvclN0ci5yZXBsYWNlKC9cXC4/MCskLywgJycpO1xuXG4gIHJlc3VsdCArPSBTRVAgKyBmYWN0b3JTdHI7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gY3JlYXRlIGEgY29tcGFyYXRvciBiYXNlZCBvbiB0aGUgc29ydCBvYmplY3RcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkU29ydGVyKHNvcnQpIHtcblxuICBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlc0FzQXJyYXkoZG9jKSB7XG4gICAgcmV0dXJuIHNvcnQubWFwKGZ1bmN0aW9uIChzb3J0aW5nKSB7XG4gICAgICB2YXIgZmllbGROYW1lID0gZ2V0S2V5KHNvcnRpbmcpO1xuICAgICAgdmFyIHBhcnNlZEZpZWxkID0gcGFyc2VGaWVsZChmaWVsZE5hbWUpO1xuICAgICAgdmFyIGRvY0ZpZWxkVmFsdWUgPSBnZXRGaWVsZEZyb21Eb2MoZG9jLCBwYXJzZWRGaWVsZCk7XG4gICAgICByZXR1cm4gZG9jRmllbGRWYWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYVJvdywgYlJvdykge1xuICAgIHZhciBhRmllbGRWYWx1ZXMgPSBnZXRGaWVsZFZhbHVlc0FzQXJyYXkoYVJvdy5kb2MpO1xuICAgIHZhciBiRmllbGRWYWx1ZXMgPSBnZXRGaWVsZFZhbHVlc0FzQXJyYXkoYlJvdy5kb2MpO1xuICAgIHZhciBjb2xsYXRpb24gPSBjb2xsYXRlKGFGaWVsZFZhbHVlcywgYkZpZWxkVmFsdWVzKTtcbiAgICBpZiAoY29sbGF0aW9uICE9PSAwKSB7XG4gICAgICByZXR1cm4gY29sbGF0aW9uO1xuICAgIH1cbiAgICAvLyB0aGlzIGlzIHdoYXQgbWFuZ28gc2VlbXMgdG8gZG9cbiAgICByZXR1cm4gY29tcGFyZSQxKGFSb3cuZG9jLl9pZCwgYlJvdy5kb2MuX2lkKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmlsdGVySW5NZW1vcnlGaWVsZHMocm93cywgcmVxdWVzdERlZiwgaW5NZW1vcnlGaWVsZHMpIHtcbiAgcm93cyA9IHJvd3MuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICByZXR1cm4gcm93RmlsdGVyKHJvdy5kb2MsIHJlcXVlc3REZWYuc2VsZWN0b3IsIGluTWVtb3J5RmllbGRzKTtcbiAgfSk7XG5cbiAgaWYgKHJlcXVlc3REZWYuc29ydCkge1xuICAgIC8vIGluLW1lbW9yeSBzb3J0XG4gICAgdmFyIGZpZWxkU29ydGVyID0gY3JlYXRlRmllbGRTb3J0ZXIocmVxdWVzdERlZi5zb3J0KTtcbiAgICByb3dzID0gcm93cy5zb3J0KGZpZWxkU29ydGVyKTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3REZWYuc29ydFswXSAhPT0gJ3N0cmluZycgJiZcbiAgICAgICAgZ2V0VmFsdWUocmVxdWVzdERlZi5zb3J0WzBdKSA9PT0gJ2Rlc2MnKSB7XG4gICAgICByb3dzID0gcm93cy5yZXZlcnNlKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCdsaW1pdCcgaW4gcmVxdWVzdERlZiB8fCAnc2tpcCcgaW4gcmVxdWVzdERlZikge1xuICAgIC8vIGhhdmUgdG8gZG8gdGhlIGxpbWl0IGluLW1lbW9yeVxuICAgIHZhciBza2lwID0gcmVxdWVzdERlZi5za2lwIHx8IDA7XG4gICAgdmFyIGxpbWl0ID0gKCdsaW1pdCcgaW4gcmVxdWVzdERlZiA/IHJlcXVlc3REZWYubGltaXQgOiByb3dzLmxlbmd0aCkgKyBza2lwO1xuICAgIHJvd3MgPSByb3dzLnNsaWNlKHNraXAsIGxpbWl0KTtcbiAgfVxuICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gcm93RmlsdGVyKGRvYywgc2VsZWN0b3IsIGluTWVtb3J5RmllbGRzKSB7XG4gIHJldHVybiBpbk1lbW9yeUZpZWxkcy5ldmVyeShmdW5jdGlvbiAoZmllbGQpIHtcbiAgICB2YXIgbWF0Y2hlciA9IHNlbGVjdG9yW2ZpZWxkXTtcbiAgICB2YXIgcGFyc2VkRmllbGQgPSBwYXJzZUZpZWxkKGZpZWxkKTtcbiAgICB2YXIgZG9jRmllbGRWYWx1ZSA9IGdldEZpZWxkRnJvbURvYyhkb2MsIHBhcnNlZEZpZWxkKTtcbiAgICBpZiAoaXNDb21iaW5hdGlvbmFsRmllbGQoZmllbGQpKSB7XG4gICAgICByZXR1cm4gbWF0Y2hDb21pbmF0aW9uYWxTZWxlY3RvcihmaWVsZCwgbWF0Y2hlciwgZG9jKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hTZWxlY3RvcihtYXRjaGVyLCBkb2MsIHBhcnNlZEZpZWxkLCBkb2NGaWVsZFZhbHVlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoU2VsZWN0b3IobWF0Y2hlciwgZG9jLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICBpZiAoIW1hdGNoZXIpIHtcbiAgICAvLyBubyBmaWx0ZXJpbmcgbmVjZXNzYXJ5OyB0aGlzIGZpZWxkIGlzIGp1c3QgbmVlZGVkIGZvciBzb3J0aW5nXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBpcyBtYXRjaGVyIGFuIG9iamVjdCwgaWYgc28gY29udGludWUgcmVjdXJzaW9uXG4gIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobWF0Y2hlcikuZXZlcnkoZnVuY3Rpb24gKHVzZXJPcGVyYXRvcikge1xuICAgICAgdmFyIHVzZXJWYWx1ZSA9IG1hdGNoZXJbdXNlck9wZXJhdG9yXTtcbiAgICAgIHJldHVybiBtYXRjaCh1c2VyT3BlcmF0b3IsIGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBubyBtb3JlIGRlcHRoLCBObyBuZWVkIHRvIHJlY3Vyc2UgZnVydGhlclxuICByZXR1cm4gbWF0Y2hlciA9PT0gZG9jRmllbGRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hDb21pbmF0aW9uYWxTZWxlY3RvcihmaWVsZCwgbWF0Y2hlciwgZG9jKSB7XG5cbiAgaWYgKGZpZWxkID09PSAnJG9yJykge1xuICAgIHJldHVybiBtYXRjaGVyLnNvbWUoZnVuY3Rpb24gKG9yTWF0Y2hlcnMpIHtcbiAgICAgIHJldHVybiByb3dGaWx0ZXIoZG9jLCBvck1hdGNoZXJzLCBPYmplY3Qua2V5cyhvck1hdGNoZXJzKSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoZmllbGQgPT09ICckbm90Jykge1xuICAgIHJldHVybiAhcm93RmlsdGVyKGRvYywgbWF0Y2hlciwgT2JqZWN0LmtleXMobWF0Y2hlcikpO1xuICB9XG5cbiAgLy9gJG5vcmBcbiAgcmV0dXJuICFtYXRjaGVyLmZpbmQoZnVuY3Rpb24gKG9yTWF0Y2hlcnMpIHtcbiAgICByZXR1cm4gcm93RmlsdGVyKGRvYywgb3JNYXRjaGVycywgT2JqZWN0LmtleXMob3JNYXRjaGVycykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBtYXRjaCh1c2VyT3BlcmF0b3IsIGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICBpZiAoIW1hdGNoZXJzW3VzZXJPcGVyYXRvcl0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gb3BlcmF0b3IgXCInICsgdXNlck9wZXJhdG9yICtcbiAgICAgICdcIiAtIHNob3VsZCBiZSBvbmUgb2YgJGVxLCAkbHRlLCAkbHQsICRndCwgJGd0ZSwgJGV4aXN0cywgJG5lLCAkaW4sICcgK1xuICAgICAgJyRuaW4sICRzaXplLCAkbW9kLCAkcmVnZXgsICRlbGVtTWF0Y2gsICR0eXBlLCAkYWxsTWF0Y2ggb3IgJGFsbCcpO1xuICB9XG4gIHJldHVybiBtYXRjaGVyc1t1c2VyT3BlcmF0b3JdKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGZpZWxkRXhpc3RzKGRvY0ZpZWxkVmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBkb2NGaWVsZFZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiBkb2NGaWVsZFZhbHVlICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBmaWVsZElzTm90VW5kZWZpbmVkKGRvY0ZpZWxkVmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBkb2NGaWVsZFZhbHVlICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gbW9kRmllbGQoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSB7XG4gIHZhciBkaXZpc29yID0gdXNlclZhbHVlWzBdO1xuICB2YXIgbW9kID0gdXNlclZhbHVlWzFdO1xuICBpZiAoZGl2aXNvciA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQmFkIGRpdmlzb3IsIGNhbm5vdCBkaXZpZGUgYnkgemVybycpO1xuICB9XG5cbiAgaWYgKHBhcnNlSW50KGRpdmlzb3IsIDEwKSAhPT0gZGl2aXNvciApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rpdmlzb3IgaXMgbm90IGFuIGludGVnZXInKTtcbiAgfVxuXG4gIGlmIChwYXJzZUludChtb2QsIDEwKSAhPT0gbW9kICkge1xuICAgIHRocm93IG5ldyBFcnJvcignTW9kdWx1cyBpcyBub3QgYW4gaW50ZWdlcicpO1xuICB9XG5cbiAgaWYgKHBhcnNlSW50KGRvY0ZpZWxkVmFsdWUsIDEwKSAhPT0gZG9jRmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBkb2NGaWVsZFZhbHVlICUgZGl2aXNvciA9PT0gbW9kO1xufVxuXG5mdW5jdGlvbiBhcnJheUNvbnRhaW5zVmFsdWUoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSB7XG4gIHJldHVybiB1c2VyVmFsdWUuc29tZShmdW5jdGlvbiAodmFsKSB7XG4gICAgaWYgKGRvY0ZpZWxkVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIGRvY0ZpZWxkVmFsdWUuaW5kZXhPZih2YWwpID4gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY0ZpZWxkVmFsdWUgPT09IHZhbDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q29udGFpbnNBbGxWYWx1ZXMoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSB7XG4gIHJldHVybiB1c2VyVmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiBkb2NGaWVsZFZhbHVlLmluZGV4T2YodmFsKSA+IC0xO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYXJyYXlTaXplKGRvY0ZpZWxkVmFsdWUsIHVzZXJWYWx1ZSkge1xuICByZXR1cm4gZG9jRmllbGRWYWx1ZS5sZW5ndGggPT09IHVzZXJWYWx1ZTtcbn1cblxuZnVuY3Rpb24gcmVnZXhNYXRjaChkb2NGaWVsZFZhbHVlLCB1c2VyVmFsdWUpIHtcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCh1c2VyVmFsdWUpO1xuXG4gIHJldHVybiByZS50ZXN0KGRvY0ZpZWxkVmFsdWUpO1xufVxuXG5mdW5jdGlvbiB0eXBlTWF0Y2goZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSB7XG5cbiAgc3dpdGNoICh1c2VyVmFsdWUpIHtcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiBkb2NGaWVsZFZhbHVlID09PSBudWxsO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHR5cGVvZiAoZG9jRmllbGRWYWx1ZSkgPT09ICdib29sZWFuJztcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIHR5cGVvZiAoZG9jRmllbGRWYWx1ZSkgPT09ICdudW1iZXInO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdHlwZW9mIChkb2NGaWVsZFZhbHVlKSA9PT0gJ3N0cmluZyc7XG4gICAgY2FzZSAnYXJyYXknOlxuICAgICAgcmV0dXJuIGRvY0ZpZWxkVmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgcmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChkb2NGaWVsZFZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IodXNlclZhbHVlICsgJyBub3Qgc3VwcG9ydGVkIGFzIGEgdHlwZS4nICtcbiAgICAgICAgICAgICAgICAgICdQbGVhc2UgdXNlIG9uZSBvZiBvYmplY3QsIHN0cmluZywgYXJyYXksIG51bWJlciwgYm9vbGVhbiBvciBudWxsLicpO1xuXG59XG5cbnZhciBtYXRjaGVycyA9IHtcblxuICAnJGVsZW1NYXRjaCc6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZG9jRmllbGRWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZG9jRmllbGRWYWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRvY0ZpZWxkVmFsdWVbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZG9jRmllbGRWYWx1ZS5zb21lKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHJvd0ZpbHRlcih2YWwsIHVzZXJWYWx1ZSwgT2JqZWN0LmtleXModXNlclZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jRmllbGRWYWx1ZS5zb21lKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKHVzZXJWYWx1ZSwgZG9jLCBwYXJzZWRGaWVsZCwgdmFsKTtcbiAgICB9KTtcbiAgfSxcblxuICAnJGFsbE1hdGNoJzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkb2NGaWVsZFZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGRvY0ZpZWxkVmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkb2NGaWVsZFZhbHVlWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGRvY0ZpZWxkVmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gcm93RmlsdGVyKHZhbCwgdXNlclZhbHVlLCBPYmplY3Qua2V5cyh1c2VyVmFsdWUpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkb2NGaWVsZFZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBtYXRjaFNlbGVjdG9yKHVzZXJWYWx1ZSwgZG9jLCBwYXJzZWRGaWVsZCwgdmFsKTtcbiAgICB9KTtcbiAgfSxcblxuICAnJGVxJzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBmaWVsZElzTm90VW5kZWZpbmVkKGRvY0ZpZWxkVmFsdWUpICYmIGNvbGxhdGUoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSA9PT0gMDtcbiAgfSxcblxuICAnJGd0ZSc6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gZmllbGRJc05vdFVuZGVmaW5lZChkb2NGaWVsZFZhbHVlKSAmJiBjb2xsYXRlKGRvY0ZpZWxkVmFsdWUsIHVzZXJWYWx1ZSkgPj0gMDtcbiAgfSxcblxuICAnJGd0JzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBmaWVsZElzTm90VW5kZWZpbmVkKGRvY0ZpZWxkVmFsdWUpICYmIGNvbGxhdGUoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKSA+IDA7XG4gIH0sXG5cbiAgJyRsdGUnOiBmdW5jdGlvbiAoZG9jLCB1c2VyVmFsdWUsIHBhcnNlZEZpZWxkLCBkb2NGaWVsZFZhbHVlKSB7XG4gICAgcmV0dXJuIGZpZWxkSXNOb3RVbmRlZmluZWQoZG9jRmllbGRWYWx1ZSkgJiYgY29sbGF0ZShkb2NGaWVsZFZhbHVlLCB1c2VyVmFsdWUpIDw9IDA7XG4gIH0sXG5cbiAgJyRsdCc6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gZmllbGRJc05vdFVuZGVmaW5lZChkb2NGaWVsZFZhbHVlKSAmJiBjb2xsYXRlKGRvY0ZpZWxkVmFsdWUsIHVzZXJWYWx1ZSkgPCAwO1xuICB9LFxuXG4gICckZXhpc3RzJzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIC8vYSBmaWVsZCB0aGF0IGlzIG51bGwgaXMgc3RpbGwgY29uc2lkZXJlZCB0byBleGlzdFxuICAgIGlmICh1c2VyVmFsdWUpIHtcbiAgICAgIHJldHVybiBmaWVsZElzTm90VW5kZWZpbmVkKGRvY0ZpZWxkVmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiAhZmllbGRJc05vdFVuZGVmaW5lZChkb2NGaWVsZFZhbHVlKTtcbiAgfSxcblxuICAnJG1vZCc6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gZmllbGRFeGlzdHMoZG9jRmllbGRWYWx1ZSkgJiYgbW9kRmllbGQoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKTtcbiAgfSxcblxuICAnJG5lJzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIHJldHVybiB1c2VyVmFsdWUuZXZlcnkoZnVuY3Rpb24gKG5lVmFsdWUpIHtcbiAgICAgIHJldHVybiBjb2xsYXRlKGRvY0ZpZWxkVmFsdWUsIG5lVmFsdWUpICE9PSAwO1xuICAgIH0pO1xuICB9LFxuICAnJGluJzogZnVuY3Rpb24gKGRvYywgdXNlclZhbHVlLCBwYXJzZWRGaWVsZCwgZG9jRmllbGRWYWx1ZSkge1xuICAgIHJldHVybiBmaWVsZEV4aXN0cyhkb2NGaWVsZFZhbHVlKSAmJiBhcnJheUNvbnRhaW5zVmFsdWUoZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKTtcbiAgfSxcblxuICAnJG5pbic6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gZmllbGRFeGlzdHMoZG9jRmllbGRWYWx1ZSkgJiYgIWFycmF5Q29udGFpbnNWYWx1ZShkb2NGaWVsZFZhbHVlLCB1c2VyVmFsdWUpO1xuICB9LFxuXG4gICckc2l6ZSc6IGZ1bmN0aW9uIChkb2MsIHVzZXJWYWx1ZSwgcGFyc2VkRmllbGQsIGRvY0ZpZWxkVmFsdWUpIHtcbiAgICByZXR1cm4gZmllbGRFeGlzdHMoZG9jRmllbGRWYWx1ZSkgJiYgYXJyYXlTaXplKGRvY0ZpZWxkVmFsdWUsIHVzZXJWYWx1ZSk7XG4gIH0sXG5cbiAgJyRhbGwnOiBmdW5jdGlvbiAoZG9jLCB1c2VyVmFsdWUsIHBhcnNlZEZpZWxkLCBkb2NGaWVsZFZhbHVlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZG9jRmllbGRWYWx1ZSkgJiYgYXJyYXlDb250YWluc0FsbFZhbHVlcyhkb2NGaWVsZFZhbHVlLCB1c2VyVmFsdWUpO1xuICB9LFxuXG4gICckcmVnZXgnOiBmdW5jdGlvbiAoZG9jLCB1c2VyVmFsdWUsIHBhcnNlZEZpZWxkLCBkb2NGaWVsZFZhbHVlKSB7XG4gICAgcmV0dXJuIGZpZWxkRXhpc3RzKGRvY0ZpZWxkVmFsdWUpICYmIHJlZ2V4TWF0Y2goZG9jRmllbGRWYWx1ZSwgdXNlclZhbHVlKTtcbiAgfSxcblxuICAnJHR5cGUnOiBmdW5jdGlvbiAoZG9jLCB1c2VyVmFsdWUsIHBhcnNlZEZpZWxkLCBkb2NGaWVsZFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVNYXRjaChkb2NGaWVsZFZhbHVlLCB1c2VyVmFsdWUpO1xuICB9XG59O1xuXG4vLyByZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gZG9jIG1hdGNoZXMgdGhlIHN1cHBsaWVkIHNlbGVjdG9yXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZG9jLCBzZWxlY3Rvcikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ29iamVjdCcpIHtcbiAgICAvLyBtYXRjaCB0aGUgQ291Y2hEQiBlcnJvciBtZXNzYWdlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RvciBlcnJvcjogZXhwZWN0ZWQgYSBKU09OIG9iamVjdCcpO1xuICB9XG5cbiAgc2VsZWN0b3IgPSBtYXNzYWdlU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB2YXIgcm93ID0ge1xuICAgICdkb2MnOiBkb2NcbiAgfTtcblxuICB2YXIgcm93c01hdGNoZWQgPSBmaWx0ZXJJbk1lbW9yeUZpZWxkcyhbcm93XSwgeyAnc2VsZWN0b3InOiBzZWxlY3RvciB9LCBPYmplY3Qua2V5cyhzZWxlY3RvcikpO1xuICByZXR1cm4gcm93c01hdGNoZWQgJiYgcm93c01hdGNoZWQubGVuZ3RoID09PSAxO1xufVxuXG5mdW5jdGlvbiBldmFsRmlsdGVyKGlucHV0KSB7XG4gIHJldHVybiBzY29wZUV2YWwoJ1widXNlIHN0cmljdFwiO1xcbnJldHVybiAnICsgaW5wdXQgKyAnOycsIHt9KTtcbn1cblxuZnVuY3Rpb24gZXZhbFZpZXcoaW5wdXQpIHtcbiAgdmFyIGNvZGUgPSBbXG4gICAgJ3JldHVybiBmdW5jdGlvbihkb2MpIHsnLFxuICAgICcgIFwidXNlIHN0cmljdFwiOycsXG4gICAgJyAgdmFyIGVtaXR0ZWQgPSBmYWxzZTsnLFxuICAgICcgIHZhciBlbWl0ID0gZnVuY3Rpb24gKGEsIGIpIHsnLFxuICAgICcgICAgZW1pdHRlZCA9IHRydWU7JyxcbiAgICAnICB9OycsXG4gICAgJyAgdmFyIHZpZXcgPSAnICsgaW5wdXQgKyAnOycsXG4gICAgJyAgdmlldyhkb2MpOycsXG4gICAgJyAgaWYgKGVtaXR0ZWQpIHsnLFxuICAgICcgICAgcmV0dXJuIHRydWU7JyxcbiAgICAnICB9JyxcbiAgICAnfTsnXG4gIF0uam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHNjb3BlRXZhbChjb2RlLCB7fSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGlmIChvcHRzLnNlbGVjdG9yKSB7XG4gICAgaWYgKG9wdHMuZmlsdGVyICYmIG9wdHMuZmlsdGVyICE9PSAnX3NlbGVjdG9yJykge1xuICAgICAgdmFyIGZpbHRlck5hbWUgPSB0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdzdHJpbmcnID9cbiAgICAgICAgb3B0cy5maWx0ZXIgOiAnZnVuY3Rpb24nO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcignc2VsZWN0b3IgaW52YWxpZCBmb3IgZmlsdGVyIFwiJyArIGZpbHRlck5hbWUgKyAnXCInKSk7XG4gICAgfVxuICB9XG4gIGNhbGxiYWNrKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShvcHRzKSB7XG4gIGlmIChvcHRzLnZpZXcgJiYgIW9wdHMuZmlsdGVyKSB7XG4gICAgb3B0cy5maWx0ZXIgPSAnX3ZpZXcnO1xuICB9XG5cbiAgaWYgKG9wdHMuc2VsZWN0b3IgJiYgIW9wdHMuZmlsdGVyKSB7XG4gICAgb3B0cy5maWx0ZXIgPSAnX3NlbGVjdG9yJztcbiAgfVxuXG4gIGlmIChvcHRzLmZpbHRlciAmJiB0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKG9wdHMuZmlsdGVyID09PSAnX3ZpZXcnKSB7XG4gICAgICBvcHRzLnZpZXcgPSBub3JtYWxpemVEZXNpZ25Eb2NGdW5jdGlvbk5hbWUob3B0cy52aWV3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5maWx0ZXIgPSBub3JtYWxpemVEZXNpZ25Eb2NGdW5jdGlvbk5hbWUob3B0cy5maWx0ZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRGaWx0ZXIoY2hhbmdlc0hhbmRsZXIsIG9wdHMpIHtcbiAgcmV0dXJuIG9wdHMuZmlsdGVyICYmIHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ3N0cmluZycgJiZcbiAgICAhb3B0cy5kb2NfaWRzICYmICFpc1JlbW90ZShjaGFuZ2VzSGFuZGxlci5kYik7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihjaGFuZ2VzSGFuZGxlciwgb3B0cykge1xuICB2YXIgY2FsbGJhY2sgPSBvcHRzLmNvbXBsZXRlO1xuICBpZiAob3B0cy5maWx0ZXIgPT09ICdfdmlldycpIHtcbiAgICBpZiAoIW9wdHMudmlldyB8fCB0eXBlb2Ygb3B0cy52aWV3ICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGVyciA9IGNyZWF0ZUVycm9yKEJBRF9SRVFVRVNULFxuICAgICAgICAnYHZpZXdgIGZpbHRlciBwYXJhbWV0ZXIgbm90IGZvdW5kIG9yIGludmFsaWQuJyk7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICB9XG4gICAgLy8gZmV0Y2ggYSB2aWV3IGZyb20gYSBkZXNpZ24gZG9jLCBtYWtlIGl0IGJlaGF2ZSBsaWtlIGEgZmlsdGVyXG4gICAgdmFyIHZpZXdOYW1lID0gcGFyc2VEZXNpZ25Eb2NGdW5jdGlvbk5hbWUob3B0cy52aWV3KTtcbiAgICBjaGFuZ2VzSGFuZGxlci5kYi5nZXQoJ19kZXNpZ24vJyArIHZpZXdOYW1lWzBdLCBmdW5jdGlvbiAoZXJyLCBkZG9jKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChjaGFuZ2VzSGFuZGxlci5pc0NhbmNlbGxlZCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge3N0YXR1czogJ2NhbmNlbGxlZCd9KTtcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhnZW5lcmF0ZUVycm9yRnJvbVJlc3BvbnNlKGVycikpO1xuICAgICAgfVxuICAgICAgdmFyIG1hcEZ1biA9IGRkb2MgJiYgZGRvYy52aWV3cyAmJiBkZG9jLnZpZXdzW3ZpZXdOYW1lWzFdXSAmJlxuICAgICAgICBkZG9jLnZpZXdzW3ZpZXdOYW1lWzFdXS5tYXA7XG4gICAgICBpZiAoIW1hcEZ1bikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MsXG4gICAgICAgICAgKGRkb2Mudmlld3MgPyAnbWlzc2luZyBqc29uIGtleTogJyArIHZpZXdOYW1lWzFdIDpcbiAgICAgICAgICAgICdtaXNzaW5nIGpzb24ga2V5OiB2aWV3cycpKSk7XG4gICAgICB9XG4gICAgICBvcHRzLmZpbHRlciA9IGV2YWxWaWV3KG1hcEZ1bik7XG4gICAgICBjaGFuZ2VzSGFuZGxlci5kb0NoYW5nZXMob3B0cyk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAob3B0cy5zZWxlY3Rvcikge1xuICAgIG9wdHMuZmlsdGVyID0gZnVuY3Rpb24gKGRvYykge1xuICAgICAgcmV0dXJuIG1hdGNoZXNTZWxlY3Rvcihkb2MsIG9wdHMuc2VsZWN0b3IpO1xuICAgIH07XG4gICAgY2hhbmdlc0hhbmRsZXIuZG9DaGFuZ2VzKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIC8vIGZldGNoIGEgZmlsdGVyIGZyb20gYSBkZXNpZ24gZG9jXG4gICAgdmFyIGZpbHRlck5hbWUgPSBwYXJzZURlc2lnbkRvY0Z1bmN0aW9uTmFtZShvcHRzLmZpbHRlcik7XG4gICAgY2hhbmdlc0hhbmRsZXIuZGIuZ2V0KCdfZGVzaWduLycgKyBmaWx0ZXJOYW1lWzBdLCBmdW5jdGlvbiAoZXJyLCBkZG9jKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChjaGFuZ2VzSGFuZGxlci5pc0NhbmNlbGxlZCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge3N0YXR1czogJ2NhbmNlbGxlZCd9KTtcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhnZW5lcmF0ZUVycm9yRnJvbVJlc3BvbnNlKGVycikpO1xuICAgICAgfVxuICAgICAgdmFyIGZpbHRlckZ1biA9IGRkb2MgJiYgZGRvYy5maWx0ZXJzICYmIGRkb2MuZmlsdGVyc1tmaWx0ZXJOYW1lWzFdXTtcbiAgICAgIGlmICghZmlsdGVyRnVuKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjcmVhdGVFcnJvcihNSVNTSU5HX0RPQyxcbiAgICAgICAgICAoKGRkb2MgJiYgZGRvYy5maWx0ZXJzKSA/ICdtaXNzaW5nIGpzb24ga2V5OiAnICsgZmlsdGVyTmFtZVsxXVxuICAgICAgICAgICAgOiAnbWlzc2luZyBqc29uIGtleTogZmlsdGVycycpKSk7XG4gICAgICB9XG4gICAgICBvcHRzLmZpbHRlciA9IGV2YWxGaWx0ZXIoZmlsdGVyRnVuKTtcbiAgICAgIGNoYW5nZXNIYW5kbGVyLmRvQ2hhbmdlcyhvcHRzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUNoYW5nZXNGaWx0ZXJQbHVnaW4oUG91Y2hEQikge1xuICBQb3VjaERCLl9jaGFuZ2VzRmlsdGVyUGx1Z2luID0ge1xuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcbiAgICBub3JtYWxpemU6IG5vcm1hbGl6ZSxcbiAgICBzaG91bGRGaWx0ZXI6IHNob3VsZEZpbHRlcixcbiAgICBmaWx0ZXI6IGZpbHRlclxuICB9O1xufVxuXG4vLyBUT0RPOiByZW1vdmUgZnJvbSBwb3VjaGRiLWNvcmUgKGJyZWFraW5nKVxuUG91Y2hEQi5wbHVnaW4oYXBwbHlDaGFuZ2VzRmlsdGVyUGx1Z2luKTtcblxuUG91Y2hEQi52ZXJzaW9uID0gdmVyc2lvbjtcblxuZnVuY3Rpb24gdG9PYmplY3QoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbiAob2JqLCBpdGVtKSB7XG4gICAgb2JqW2l0ZW1dID0gdHJ1ZTtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59XG4vLyBMaXN0IG9mIHRvcCBsZXZlbCByZXNlcnZlZCB3b3JkcyBmb3IgZG9jXG52YXIgcmVzZXJ2ZWRXb3JkcyA9IHRvT2JqZWN0KFtcbiAgJ19pZCcsXG4gICdfcmV2JyxcbiAgJ19hdHRhY2htZW50cycsXG4gICdfZGVsZXRlZCcsXG4gICdfcmV2aXNpb25zJyxcbiAgJ19yZXZzX2luZm8nLFxuICAnX2NvbmZsaWN0cycsXG4gICdfZGVsZXRlZF9jb25mbGljdHMnLFxuICAnX2xvY2FsX3NlcScsXG4gICdfcmV2X3RyZWUnLFxuICAvL3JlcGxpY2F0aW9uIGRvY3VtZW50c1xuICAnX3JlcGxpY2F0aW9uX2lkJyxcbiAgJ19yZXBsaWNhdGlvbl9zdGF0ZScsXG4gICdfcmVwbGljYXRpb25fc3RhdGVfdGltZScsXG4gICdfcmVwbGljYXRpb25fc3RhdGVfcmVhc29uJyxcbiAgJ19yZXBsaWNhdGlvbl9zdGF0cycsXG4gIC8vIFNwZWNpZmljIHRvIENvdWNoYmFzZSBTeW5jIEdhdGV3YXlcbiAgJ19yZW1vdmVkJ1xuXSk7XG5cbi8vIExpc3Qgb2YgcmVzZXJ2ZWQgd29yZHMgdGhhdCBzaG91bGQgZW5kIHVwIHRoZSBkb2N1bWVudFxudmFyIGRhdGFXb3JkcyA9IHRvT2JqZWN0KFtcbiAgJ19hdHRhY2htZW50cycsXG4gIC8vcmVwbGljYXRpb24gZG9jdW1lbnRzXG4gICdfcmVwbGljYXRpb25faWQnLFxuICAnX3JlcGxpY2F0aW9uX3N0YXRlJyxcbiAgJ19yZXBsaWNhdGlvbl9zdGF0ZV90aW1lJyxcbiAgJ19yZXBsaWNhdGlvbl9zdGF0ZV9yZWFzb24nLFxuICAnX3JlcGxpY2F0aW9uX3N0YXRzJ1xuXSk7XG5cbmZ1bmN0aW9uIHBhcnNlUmV2aXNpb25JbmZvKHJldiQkMSkge1xuICBpZiAoIS9eXFxkKy0vLnRlc3QocmV2JCQxKSkge1xuICAgIHJldHVybiBjcmVhdGVFcnJvcihJTlZBTElEX1JFVik7XG4gIH1cbiAgdmFyIGlkeCA9IHJldiQkMS5pbmRleE9mKCctJyk7XG4gIHZhciBsZWZ0ID0gcmV2JCQxLnN1YnN0cmluZygwLCBpZHgpO1xuICB2YXIgcmlnaHQgPSByZXYkJDEuc3Vic3RyaW5nKGlkeCArIDEpO1xuICByZXR1cm4ge1xuICAgIHByZWZpeDogcGFyc2VJbnQobGVmdCwgMTApLFxuICAgIGlkOiByaWdodFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlUmV2VHJlZUZyb21SZXZpc2lvbnMocmV2aXNpb25zLCBvcHRzKSB7XG4gIHZhciBwb3MgPSByZXZpc2lvbnMuc3RhcnQgLSByZXZpc2lvbnMuaWRzLmxlbmd0aCArIDE7XG5cbiAgdmFyIHJldmlzaW9uSWRzID0gcmV2aXNpb25zLmlkcztcbiAgdmFyIGlkcyA9IFtyZXZpc2lvbklkc1swXSwgb3B0cywgW11dO1xuXG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByZXZpc2lvbklkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlkcyA9IFtyZXZpc2lvbklkc1tpXSwge3N0YXR1czogJ21pc3NpbmcnfSwgW2lkc11dO1xuICB9XG5cbiAgcmV0dXJuIFt7XG4gICAgcG9zOiBwb3MsXG4gICAgaWRzOiBpZHNcbiAgfV07XG59XG5cbi8vIFByZXByb2Nlc3MgZG9jdW1lbnRzLCBwYXJzZSB0aGVpciByZXZpc2lvbnMsIGFzc2lnbiBhbiBpZCBhbmQgYVxuLy8gcmV2aXNpb24gZm9yIG5ldyB3cml0ZXMgdGhhdCBhcmUgbWlzc2luZyB0aGVtLCBldGNcbmZ1bmN0aW9uIHBhcnNlRG9jKGRvYywgbmV3RWRpdHMsIGRiT3B0cykge1xuICBpZiAoIWRiT3B0cykge1xuICAgIGRiT3B0cyA9IHtcbiAgICAgIGRldGVybWluaXN0aWNfcmV2czogdHJ1ZVxuICAgIH07XG4gIH1cblxuICB2YXIgblJldk51bTtcbiAgdmFyIG5ld1JldklkO1xuICB2YXIgcmV2SW5mbztcbiAgdmFyIG9wdHMgPSB7c3RhdHVzOiAnYXZhaWxhYmxlJ307XG4gIGlmIChkb2MuX2RlbGV0ZWQpIHtcbiAgICBvcHRzLmRlbGV0ZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKG5ld0VkaXRzKSB7XG4gICAgaWYgKCFkb2MuX2lkKSB7XG4gICAgICBkb2MuX2lkID0gdXVpZCgpO1xuICAgIH1cbiAgICBuZXdSZXZJZCA9IHJldihkb2MsIGRiT3B0cy5kZXRlcm1pbmlzdGljX3JldnMpO1xuICAgIGlmIChkb2MuX3Jldikge1xuICAgICAgcmV2SW5mbyA9IHBhcnNlUmV2aXNpb25JbmZvKGRvYy5fcmV2KTtcbiAgICAgIGlmIChyZXZJbmZvLmVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXZJbmZvO1xuICAgICAgfVxuICAgICAgZG9jLl9yZXZfdHJlZSA9IFt7XG4gICAgICAgIHBvczogcmV2SW5mby5wcmVmaXgsXG4gICAgICAgIGlkczogW3JldkluZm8uaWQsIHtzdGF0dXM6ICdtaXNzaW5nJ30sIFtbbmV3UmV2SWQsIG9wdHMsIFtdXV1dXG4gICAgICB9XTtcbiAgICAgIG5SZXZOdW0gPSByZXZJbmZvLnByZWZpeCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvYy5fcmV2X3RyZWUgPSBbe1xuICAgICAgICBwb3M6IDEsXG4gICAgICAgIGlkcyA6IFtuZXdSZXZJZCwgb3B0cywgW11dXG4gICAgICB9XTtcbiAgICAgIG5SZXZOdW0gPSAxO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZG9jLl9yZXZpc2lvbnMpIHtcbiAgICAgIGRvYy5fcmV2X3RyZWUgPSBtYWtlUmV2VHJlZUZyb21SZXZpc2lvbnMoZG9jLl9yZXZpc2lvbnMsIG9wdHMpO1xuICAgICAgblJldk51bSA9IGRvYy5fcmV2aXNpb25zLnN0YXJ0O1xuICAgICAgbmV3UmV2SWQgPSBkb2MuX3JldmlzaW9ucy5pZHNbMF07XG4gICAgfVxuICAgIGlmICghZG9jLl9yZXZfdHJlZSkge1xuICAgICAgcmV2SW5mbyA9IHBhcnNlUmV2aXNpb25JbmZvKGRvYy5fcmV2KTtcbiAgICAgIGlmIChyZXZJbmZvLmVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXZJbmZvO1xuICAgICAgfVxuICAgICAgblJldk51bSA9IHJldkluZm8ucHJlZml4O1xuICAgICAgbmV3UmV2SWQgPSByZXZJbmZvLmlkO1xuICAgICAgZG9jLl9yZXZfdHJlZSA9IFt7XG4gICAgICAgIHBvczogblJldk51bSxcbiAgICAgICAgaWRzOiBbbmV3UmV2SWQsIG9wdHMsIFtdXVxuICAgICAgfV07XG4gICAgfVxuICB9XG5cbiAgaW52YWxpZElkRXJyb3IoZG9jLl9pZCk7XG5cbiAgZG9jLl9yZXYgPSBuUmV2TnVtICsgJy0nICsgbmV3UmV2SWQ7XG5cbiAgdmFyIHJlc3VsdCA9IHttZXRhZGF0YSA6IHt9LCBkYXRhIDoge319O1xuICBmb3IgKHZhciBrZXkgaW4gZG9jKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRvYywga2V5KSkge1xuICAgICAgdmFyIHNwZWNpYWxLZXkgPSBrZXlbMF0gPT09ICdfJztcbiAgICAgIGlmIChzcGVjaWFsS2V5ICYmICFyZXNlcnZlZFdvcmRzW2tleV0pIHtcbiAgICAgICAgdmFyIGVycm9yID0gY3JlYXRlRXJyb3IoRE9DX1ZBTElEQVRJT04sIGtleSk7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSBET0NfVkFMSURBVElPTi5tZXNzYWdlICsgJzogJyArIGtleTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9IGVsc2UgaWYgKHNwZWNpYWxLZXkgJiYgIWRhdGFXb3Jkc1trZXldKSB7XG4gICAgICAgIHJlc3VsdC5tZXRhZGF0YVtrZXkuc2xpY2UoMSldID0gZG9jW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuZGF0YVtrZXldID0gZG9jW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmFzZTY0KGRhdGEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGhpc0F0b2IoZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgZXJyID0gY3JlYXRlRXJyb3IoQkFEX0FSRyxcbiAgICAgICdBdHRhY2htZW50IGlzIG5vdCBhIHZhbGlkIGJhc2U2NCBzdHJpbmcnKTtcbiAgICByZXR1cm4ge2Vycm9yOiBlcnJ9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXByb2Nlc3NTdHJpbmcoYXR0LCBibG9iVHlwZSwgY2FsbGJhY2spIHtcbiAgdmFyIGFzQmluYXJ5ID0gcGFyc2VCYXNlNjQoYXR0LmRhdGEpO1xuICBpZiAoYXNCaW5hcnkuZXJyb3IpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soYXNCaW5hcnkuZXJyb3IpO1xuICB9XG5cbiAgYXR0Lmxlbmd0aCA9IGFzQmluYXJ5Lmxlbmd0aDtcbiAgaWYgKGJsb2JUeXBlID09PSAnYmxvYicpIHtcbiAgICBhdHQuZGF0YSA9IGJpblN0cmluZ1RvQmx1ZmZlcihhc0JpbmFyeSwgYXR0LmNvbnRlbnRfdHlwZSk7XG4gIH0gZWxzZSBpZiAoYmxvYlR5cGUgPT09ICdiYXNlNjQnKSB7XG4gICAgYXR0LmRhdGEgPSB0aGlzQnRvYShhc0JpbmFyeSk7XG4gIH0gZWxzZSB7IC8vIGJpbmFyeVxuICAgIGF0dC5kYXRhID0gYXNCaW5hcnk7XG4gIH1cbiAgYmluYXJ5TWQ1KGFzQmluYXJ5LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgYXR0LmRpZ2VzdCA9ICdtZDUtJyArIHJlc3VsdDtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2Vzc0Jsb2IoYXR0LCBibG9iVHlwZSwgY2FsbGJhY2spIHtcbiAgYmluYXJ5TWQ1KGF0dC5kYXRhLCBmdW5jdGlvbiAobWQ1KSB7XG4gICAgYXR0LmRpZ2VzdCA9ICdtZDUtJyArIG1kNTtcbiAgICAvLyBzaXplIGlzIGZvciBibG9icyAoYnJvd3NlciksIGxlbmd0aCBpcyBmb3IgYnVmZmVycyAobm9kZSlcbiAgICBhdHQubGVuZ3RoID0gYXR0LmRhdGEuc2l6ZSB8fCBhdHQuZGF0YS5sZW5ndGggfHwgMDtcbiAgICBpZiAoYmxvYlR5cGUgPT09ICdiaW5hcnknKSB7XG4gICAgICBibG9iVG9CaW5hcnlTdHJpbmcoYXR0LmRhdGEsIGZ1bmN0aW9uIChiaW5TdHJpbmcpIHtcbiAgICAgICAgYXR0LmRhdGEgPSBiaW5TdHJpbmc7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGJsb2JUeXBlID09PSAnYmFzZTY0Jykge1xuICAgICAgYmxvYlRvQmFzZTY0KGF0dC5kYXRhLCBmdW5jdGlvbiAoYjY0KSB7XG4gICAgICAgIGF0dC5kYXRhID0gYjY0O1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2Vzc0F0dGFjaG1lbnQoYXR0LCBibG9iVHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKGF0dC5zdHViKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBhdHQuZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaW5wdXQgaXMgYSBiYXNlNjQgc3RyaW5nXG4gICAgcHJlcHJvY2Vzc1N0cmluZyhhdHQsIGJsb2JUeXBlLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7IC8vIGlucHV0IGlzIGEgYmxvYlxuICAgIHByZXByb2Nlc3NCbG9iKGF0dCwgYmxvYlR5cGUsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwcm9jZXNzQXR0YWNobWVudHMoZG9jSW5mb3MsIGJsb2JUeXBlLCBjYWxsYmFjaykge1xuXG4gIGlmICghZG9jSW5mb3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH1cblxuICB2YXIgZG9jdiA9IDA7XG4gIHZhciBvdmVyYWxsRXJyO1xuXG4gIGRvY0luZm9zLmZvckVhY2goZnVuY3Rpb24gKGRvY0luZm8pIHtcbiAgICB2YXIgYXR0YWNobWVudHMgPSBkb2NJbmZvLmRhdGEgJiYgZG9jSW5mby5kYXRhLl9hdHRhY2htZW50cyA/XG4gICAgICBPYmplY3Qua2V5cyhkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzKSA6IFtdO1xuICAgIHZhciByZWN2ID0gMDtcblxuICAgIGlmICghYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NlZEF0dGFjaG1lbnQoZXJyKSB7XG4gICAgICBvdmVyYWxsRXJyID0gZXJyO1xuICAgICAgcmVjdisrO1xuICAgICAgaWYgKHJlY3YgPT09IGF0dGFjaG1lbnRzLmxlbmd0aCkge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIGRvY0luZm8uZGF0YS5fYXR0YWNobWVudHMpIHtcbiAgICAgIGlmIChkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcHJlcHJvY2Vzc0F0dGFjaG1lbnQoZG9jSW5mby5kYXRhLl9hdHRhY2htZW50c1trZXldLFxuICAgICAgICAgIGJsb2JUeXBlLCBwcm9jZXNzZWRBdHRhY2htZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgZG9jdisrO1xuICAgIGlmIChkb2NJbmZvcy5sZW5ndGggPT09IGRvY3YpIHtcbiAgICAgIGlmIChvdmVyYWxsRXJyKSB7XG4gICAgICAgIGNhbGxiYWNrKG92ZXJhbGxFcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRG9jKHJldkxpbWl0LCBwcmV2LCBkb2NJbmZvLCByZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgIGksIGNiLCB3cml0ZURvYywgbmV3RWRpdHMpIHtcblxuICBpZiAocmV2RXhpc3RzKHByZXYucmV2X3RyZWUsIGRvY0luZm8ubWV0YWRhdGEucmV2KSAmJiAhbmV3RWRpdHMpIHtcbiAgICByZXN1bHRzW2ldID0gZG9jSW5mbztcbiAgICByZXR1cm4gY2IoKTtcbiAgfVxuXG4gIC8vIHNvbWV0aW1lcyB0aGlzIGlzIHByZS1jYWxjdWxhdGVkLiBoaXN0b3JpY2FsbHkgbm90IGFsd2F5c1xuICB2YXIgcHJldmlvdXNXaW5uaW5nUmV2ID0gcHJldi53aW5uaW5nUmV2IHx8IHdpbm5pbmdSZXYocHJldik7XG4gIHZhciBwcmV2aW91c2x5RGVsZXRlZCA9ICdkZWxldGVkJyBpbiBwcmV2ID8gcHJldi5kZWxldGVkIDpcbiAgICBpc0RlbGV0ZWQocHJldiwgcHJldmlvdXNXaW5uaW5nUmV2KTtcbiAgdmFyIGRlbGV0ZWQgPSAnZGVsZXRlZCcgaW4gZG9jSW5mby5tZXRhZGF0YSA/IGRvY0luZm8ubWV0YWRhdGEuZGVsZXRlZCA6XG4gICAgaXNEZWxldGVkKGRvY0luZm8ubWV0YWRhdGEpO1xuICB2YXIgaXNSb290ID0gL14xLS8udGVzdChkb2NJbmZvLm1ldGFkYXRhLnJldik7XG5cbiAgaWYgKHByZXZpb3VzbHlEZWxldGVkICYmICFkZWxldGVkICYmIG5ld0VkaXRzICYmIGlzUm9vdCkge1xuICAgIHZhciBuZXdEb2MgPSBkb2NJbmZvLmRhdGE7XG4gICAgbmV3RG9jLl9yZXYgPSBwcmV2aW91c1dpbm5pbmdSZXY7XG4gICAgbmV3RG9jLl9pZCA9IGRvY0luZm8ubWV0YWRhdGEuaWQ7XG4gICAgZG9jSW5mbyA9IHBhcnNlRG9jKG5ld0RvYywgbmV3RWRpdHMpO1xuICB9XG5cbiAgdmFyIG1lcmdlZCA9IG1lcmdlKHByZXYucmV2X3RyZWUsIGRvY0luZm8ubWV0YWRhdGEucmV2X3RyZWVbMF0sIHJldkxpbWl0KTtcblxuICB2YXIgaW5Db25mbGljdCA9IG5ld0VkaXRzICYmICgoXG4gICAgKHByZXZpb3VzbHlEZWxldGVkICYmIGRlbGV0ZWQgJiYgbWVyZ2VkLmNvbmZsaWN0cyAhPT0gJ25ld19sZWFmJykgfHxcbiAgICAoIXByZXZpb3VzbHlEZWxldGVkICYmIG1lcmdlZC5jb25mbGljdHMgIT09ICduZXdfbGVhZicpIHx8XG4gICAgKHByZXZpb3VzbHlEZWxldGVkICYmICFkZWxldGVkICYmIG1lcmdlZC5jb25mbGljdHMgPT09ICduZXdfYnJhbmNoJykpKTtcblxuICBpZiAoaW5Db25mbGljdCkge1xuICAgIHZhciBlcnIgPSBjcmVhdGVFcnJvcihSRVZfQ09ORkxJQ1QpO1xuICAgIHJlc3VsdHNbaV0gPSBlcnI7XG4gICAgcmV0dXJuIGNiKCk7XG4gIH1cblxuICB2YXIgbmV3UmV2ID0gZG9jSW5mby5tZXRhZGF0YS5yZXY7XG4gIGRvY0luZm8ubWV0YWRhdGEucmV2X3RyZWUgPSBtZXJnZWQudHJlZTtcbiAgZG9jSW5mby5zdGVtbWVkUmV2cyA9IG1lcmdlZC5zdGVtbWVkUmV2cyB8fCBbXTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHByZXYucmV2X21hcCkge1xuICAgIGRvY0luZm8ubWV0YWRhdGEucmV2X21hcCA9IHByZXYucmV2X21hcDsgLy8gdXNlZCBvbmx5IGJ5IGxldmVsZGJcbiAgfVxuXG4gIC8vIHJlY2FsY3VsYXRlXG4gIHZhciB3aW5uaW5nUmV2JCQxID0gd2lubmluZ1Jldihkb2NJbmZvLm1ldGFkYXRhKTtcbiAgdmFyIHdpbm5pbmdSZXZJc0RlbGV0ZWQgPSBpc0RlbGV0ZWQoZG9jSW5mby5tZXRhZGF0YSwgd2lubmluZ1JldiQkMSk7XG5cbiAgLy8gY2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2YgZG9jdW1lbnRzIHRoYXQgd2VyZSBhZGRlZC9yZW1vdmVkLFxuICAvLyBmcm9tIHRoZSBwZXJzcGVjdGl2ZSBvZiB0b3RhbF9yb3dzL2RvY19jb3VudFxuICB2YXIgZGVsdGEgPSAocHJldmlvdXNseURlbGV0ZWQgPT09IHdpbm5pbmdSZXZJc0RlbGV0ZWQpID8gMCA6XG4gICAgcHJldmlvdXNseURlbGV0ZWQgPCB3aW5uaW5nUmV2SXNEZWxldGVkID8gLTEgOiAxO1xuXG4gIHZhciBuZXdSZXZJc0RlbGV0ZWQ7XG4gIGlmIChuZXdSZXYgPT09IHdpbm5pbmdSZXYkJDEpIHtcbiAgICAvLyBpZiB0aGUgbmV3IHJldiBpcyB0aGUgc2FtZSBhcyB0aGUgd2lubmluZyByZXYsIHdlIGNhbiByZXVzZSB0aGF0IHZhbHVlXG4gICAgbmV3UmV2SXNEZWxldGVkID0gd2lubmluZ1JldklzRGVsZXRlZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBpZiB0aGV5J3JlIG5vdCB0aGUgc2FtZSwgdGhlbiB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlXG4gICAgbmV3UmV2SXNEZWxldGVkID0gaXNEZWxldGVkKGRvY0luZm8ubWV0YWRhdGEsIG5ld1Jldik7XG4gIH1cblxuICB3cml0ZURvYyhkb2NJbmZvLCB3aW5uaW5nUmV2JCQxLCB3aW5uaW5nUmV2SXNEZWxldGVkLCBuZXdSZXZJc0RlbGV0ZWQsXG4gICAgdHJ1ZSwgZGVsdGEsIGksIGNiKTtcbn1cblxuZnVuY3Rpb24gcm9vdElzTWlzc2luZyhkb2NJbmZvKSB7XG4gIHJldHVybiBkb2NJbmZvLm1ldGFkYXRhLnJldl90cmVlWzBdLmlkc1sxXS5zdGF0dXMgPT09ICdtaXNzaW5nJztcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0RvY3MocmV2TGltaXQsIGRvY0luZm9zLCBhcGksIGZldGNoZWREb2NzLCB0eCwgcmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgIHdyaXRlRG9jLCBvcHRzLCBvdmVyYWxsQ2FsbGJhY2spIHtcblxuICAvLyBEZWZhdWx0IHRvIDEwMDAgbG9jYWxseVxuICByZXZMaW1pdCA9IHJldkxpbWl0IHx8IDEwMDA7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0RG9jKGRvY0luZm8sIHJlc3VsdHNJZHgsIGNhbGxiYWNrKSB7XG4gICAgLy8gQ2FudCBpbnNlcnQgbmV3IGRlbGV0ZWQgZG9jdW1lbnRzXG4gICAgdmFyIHdpbm5pbmdSZXYkJDEgPSB3aW5uaW5nUmV2KGRvY0luZm8ubWV0YWRhdGEpO1xuICAgIHZhciBkZWxldGVkID0gaXNEZWxldGVkKGRvY0luZm8ubWV0YWRhdGEsIHdpbm5pbmdSZXYkJDEpO1xuICAgIGlmICgnd2FzX2RlbGV0ZScgaW4gb3B0cyAmJiBkZWxldGVkKSB7XG4gICAgICByZXN1bHRzW3Jlc3VsdHNJZHhdID0gY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MsICdkZWxldGVkJyk7XG4gICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyA0NzEyIC0gZGV0ZWN0IHdoZXRoZXIgYSBuZXcgZG9jdW1lbnQgd2FzIGluc2VydGVkIHdpdGggYSBfcmV2XG4gICAgdmFyIGluQ29uZmxpY3QgPSBuZXdFZGl0cyAmJiByb290SXNNaXNzaW5nKGRvY0luZm8pO1xuXG4gICAgaWYgKGluQ29uZmxpY3QpIHtcbiAgICAgIHZhciBlcnIgPSBjcmVhdGVFcnJvcihSRVZfQ09ORkxJQ1QpO1xuICAgICAgcmVzdWx0c1tyZXN1bHRzSWR4XSA9IGVycjtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IGRlbGV0ZWQgPyAwIDogMTtcblxuICAgIHdyaXRlRG9jKGRvY0luZm8sIHdpbm5pbmdSZXYkJDEsIGRlbGV0ZWQsIGRlbGV0ZWQsIGZhbHNlLFxuICAgICAgZGVsdGEsIHJlc3VsdHNJZHgsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBuZXdFZGl0cyA9IG9wdHMubmV3X2VkaXRzO1xuICB2YXIgaWRzVG9Eb2NzID0gbmV3IEV4cG9ydGVkTWFwKCk7XG5cbiAgdmFyIGRvY3NEb25lID0gMDtcbiAgdmFyIGRvY3NUb0RvID0gZG9jSW5mb3MubGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGNoZWNrQWxsRG9jc0RvbmUoKSB7XG4gICAgaWYgKCsrZG9jc0RvbmUgPT09IGRvY3NUb0RvICYmIG92ZXJhbGxDYWxsYmFjaykge1xuICAgICAgb3ZlcmFsbENhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZG9jSW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudERvYywgcmVzdWx0c0lkeCkge1xuXG4gICAgaWYgKGN1cnJlbnREb2MuX2lkICYmIGlzTG9jYWxJZChjdXJyZW50RG9jLl9pZCkpIHtcbiAgICAgIHZhciBmdW4gPSBjdXJyZW50RG9jLl9kZWxldGVkID8gJ19yZW1vdmVMb2NhbCcgOiAnX3B1dExvY2FsJztcbiAgICAgIGFwaVtmdW5dKGN1cnJlbnREb2MsIHtjdHg6IHR4fSwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgIHJlc3VsdHNbcmVzdWx0c0lkeF0gPSBlcnIgfHwgcmVzO1xuICAgICAgICBjaGVja0FsbERvY3NEb25lKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaWQgPSBjdXJyZW50RG9jLm1ldGFkYXRhLmlkO1xuICAgIGlmIChpZHNUb0RvY3MuaGFzKGlkKSkge1xuICAgICAgZG9jc1RvRG8tLTsgLy8gZHVwbGljYXRlXG4gICAgICBpZHNUb0RvY3MuZ2V0KGlkKS5wdXNoKFtjdXJyZW50RG9jLCByZXN1bHRzSWR4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkc1RvRG9jcy5zZXQoaWQsIFtbY3VycmVudERvYywgcmVzdWx0c0lkeF1dKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGluIHRoZSBjYXNlIG9mIG5ld19lZGl0cywgdGhlIHVzZXIgY2FuIHByb3ZpZGUgbXVsdGlwbGUgZG9jc1xuICAvLyB3aXRoIHRoZSBzYW1lIGlkLiB0aGVzZSBuZWVkIHRvIGJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHlcbiAgaWRzVG9Eb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvY3MsIGlkKSB7XG4gICAgdmFyIG51bURvbmUgPSAwO1xuXG4gICAgZnVuY3Rpb24gZG9jV3JpdHRlbigpIHtcbiAgICAgIGlmICgrK251bURvbmUgPCBkb2NzLmxlbmd0aCkge1xuICAgICAgICBuZXh0RG9jKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja0FsbERvY3NEb25lKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5leHREb2MoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBkb2NzW251bURvbmVdO1xuICAgICAgdmFyIGN1cnJlbnREb2MgPSB2YWx1ZVswXTtcbiAgICAgIHZhciByZXN1bHRzSWR4ID0gdmFsdWVbMV07XG5cbiAgICAgIGlmIChmZXRjaGVkRG9jcy5oYXMoaWQpKSB7XG4gICAgICAgIHVwZGF0ZURvYyhyZXZMaW1pdCwgZmV0Y2hlZERvY3MuZ2V0KGlkKSwgY3VycmVudERvYywgcmVzdWx0cyxcbiAgICAgICAgICByZXN1bHRzSWR4LCBkb2NXcml0dGVuLCB3cml0ZURvYywgbmV3RWRpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRW5zdXJlIHN0ZW1taW5nIGFwcGxpZXMgdG8gbmV3IHdyaXRlcyBhcyB3ZWxsXG4gICAgICAgIHZhciBtZXJnZWQgPSBtZXJnZShbXSwgY3VycmVudERvYy5tZXRhZGF0YS5yZXZfdHJlZVswXSwgcmV2TGltaXQpO1xuICAgICAgICBjdXJyZW50RG9jLm1ldGFkYXRhLnJldl90cmVlID0gbWVyZ2VkLnRyZWU7XG4gICAgICAgIGN1cnJlbnREb2Muc3RlbW1lZFJldnMgPSBtZXJnZWQuc3RlbW1lZFJldnMgfHwgW107XG4gICAgICAgIGluc2VydERvYyhjdXJyZW50RG9jLCByZXN1bHRzSWR4LCBkb2NXcml0dGVuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbmV4dERvYygpO1xuICB9KTtcbn1cblxuLy8gSW5kZXhlZERCIHJlcXVpcmVzIGEgdmVyc2lvbmVkIGRhdGFiYXNlIHN0cnVjdHVyZSwgc28gd2UgdXNlIHRoZVxuLy8gdmVyc2lvbiBoZXJlIHRvIG1hbmFnZSBtaWdyYXRpb25zLlxudmFyIEFEQVBURVJfVkVSU0lPTiA9IDU7XG5cbi8vIFRoZSBvYmplY3Qgc3RvcmVzIGNyZWF0ZWQgZm9yIGVhY2ggZGF0YWJhc2Vcbi8vIERPQ19TVE9SRSBzdG9yZXMgdGhlIGRvY3VtZW50IG1ldGEgZGF0YSwgaXRzIHJldmlzaW9uIGhpc3RvcnkgYW5kIHN0YXRlXG4vLyBLZXllZCBieSBkb2N1bWVudCBpZFxudmFyIERPQ19TVE9SRSA9ICdkb2N1bWVudC1zdG9yZSc7XG4vLyBCWV9TRVFfU1RPUkUgc3RvcmVzIGEgcGFydGljdWxhciB2ZXJzaW9uIG9mIGEgZG9jdW1lbnQsIGtleWVkIGJ5IGl0c1xuLy8gc2VxdWVuY2UgaWRcbnZhciBCWV9TRVFfU1RPUkUgPSAnYnktc2VxdWVuY2UnO1xuLy8gV2hlcmUgd2Ugc3RvcmUgYXR0YWNobWVudHNcbnZhciBBVFRBQ0hfU1RPUkUgPSAnYXR0YWNoLXN0b3JlJztcbi8vIFdoZXJlIHdlIHN0b3JlIG1hbnktdG8tbWFueSByZWxhdGlvbnNcbi8vIGJldHdlZW4gYXR0YWNobWVudCBkaWdlc3RzIGFuZCBzZXFzXG52YXIgQVRUQUNIX0FORF9TRVFfU1RPUkUgPSAnYXR0YWNoLXNlcS1zdG9yZSc7XG5cbi8vIFdoZXJlIHdlIHN0b3JlIGRhdGFiYXNlLXdpZGUgbWV0YSBkYXRhIGluIGEgc2luZ2xlIHJlY29yZFxuLy8ga2V5ZWQgYnkgaWQ6IE1FVEFfU1RPUkVcbnZhciBNRVRBX1NUT1JFID0gJ21ldGEtc3RvcmUnO1xuLy8gV2hlcmUgd2Ugc3RvcmUgbG9jYWwgZG9jdW1lbnRzXG52YXIgTE9DQUxfU1RPUkUgPSAnbG9jYWwtc3RvcmUnO1xuLy8gV2hlcmUgd2UgZGV0ZWN0IGJsb2Igc3VwcG9ydFxudmFyIERFVEVDVF9CTE9CX1NVUFBPUlRfU1RPUkUgPSAnZGV0ZWN0LWJsb2Itc3VwcG9ydCc7XG5cbmZ1bmN0aW9uIHNhZmVKc29uUGFyc2Uoc3RyKSB7XG4gIC8vIFRoaXMgdHJ5L2NhdGNoIGd1YXJkcyBhZ2FpbnN0IHN0YWNrIG92ZXJmbG93IGVycm9ycy5cbiAgLy8gSlNPTi5wYXJzZSgpIGlzIGZhc3RlciB0aGFuIHZ1dnV6ZWxhLnBhcnNlKCkgYnV0IHZ1dnV6ZWxhXG4gIC8vIGNhbm5vdCBvdmVyZmxvdy5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdnV2dXplbGEucGFyc2Uoc3RyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzYWZlSnNvblN0cmluZ2lmeShqc29uKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzb24pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdnV2dXplbGEuc3RyaW5naWZ5KGpzb24pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlkYkVycm9yKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAndW5rbm93bl9lcnJvcic7XG4gICAgaWYgKGV2dC50YXJnZXQgJiYgZXZ0LnRhcmdldC5lcnJvcikge1xuICAgICAgbWVzc2FnZSA9IGV2dC50YXJnZXQuZXJyb3IubmFtZSB8fCBldnQudGFyZ2V0LmVycm9yLm1lc3NhZ2U7XG4gICAgfVxuICAgIGNhbGxiYWNrKGNyZWF0ZUVycm9yKElEQl9FUlJPUiwgbWVzc2FnZSwgZXZ0LnR5cGUpKTtcbiAgfTtcbn1cblxuLy8gVW5mb3J0dW5hdGVseSwgdGhlIG1ldGFkYXRhIGhhcyB0byBiZSBzdHJpbmdpZmllZFxuLy8gd2hlbiBpdCBpcyBwdXQgaW50byB0aGUgZGF0YWJhc2UsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4vLyBJbmRleGVkREIgY2FuIHRocm93IGVycm9ycyBmb3IgZGVlcGx5LW5lc3RlZCBvYmplY3RzLlxuLy8gT3JpZ2luYWxseSB3ZSBqdXN0IHVzZWQgSlNPTi5wYXJzZS9KU09OLnN0cmluZ2lmeTsgbm93XG4vLyB3ZSB1c2UgdGhpcyBjdXN0b20gdnV2dXplbGEgbGlicmFyeSB0aGF0IGF2b2lkcyByZWN1cnNpb24uXG4vLyBJZiB3ZSBjb3VsZCBkbyBpdCBhbGwgb3ZlciBhZ2Fpbiwgd2UnZCBwcm9iYWJseSB1c2UgYVxuLy8gZm9ybWF0IGZvciB0aGUgcmV2aXNpb24gdHJlZXMgb3RoZXIgdGhhbiBKU09OLlxuZnVuY3Rpb24gZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEsIHdpbm5pbmdSZXYsIGRlbGV0ZWQpIHtcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBzYWZlSnNvblN0cmluZ2lmeShtZXRhZGF0YSksXG4gICAgd2lubmluZ1Jldjogd2lubmluZ1JldixcbiAgICBkZWxldGVkT3JMb2NhbDogZGVsZXRlZCA/ICcxJyA6ICcwJyxcbiAgICBzZXE6IG1ldGFkYXRhLnNlcSwgLy8gaGlnaGVzdCBzZXEgZm9yIHRoaXMgZG9jXG4gICAgaWQ6IG1ldGFkYXRhLmlkXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlY29kZU1ldGFkYXRhKHN0b3JlZE9iamVjdCkge1xuICBpZiAoIXN0b3JlZE9iamVjdCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBtZXRhZGF0YSA9IHNhZmVKc29uUGFyc2Uoc3RvcmVkT2JqZWN0LmRhdGEpO1xuICBtZXRhZGF0YS53aW5uaW5nUmV2ID0gc3RvcmVkT2JqZWN0Lndpbm5pbmdSZXY7XG4gIG1ldGFkYXRhLmRlbGV0ZWQgPSBzdG9yZWRPYmplY3QuZGVsZXRlZE9yTG9jYWwgPT09ICcxJztcbiAgbWV0YWRhdGEuc2VxID0gc3RvcmVkT2JqZWN0LnNlcTtcbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuXG4vLyByZWFkIHRoZSBkb2MgYmFjayBvdXQgZnJvbSB0aGUgZGF0YWJhc2UuIHdlIGRvbid0IHN0b3JlIHRoZVxuLy8gX2lkIG9yIF9yZXYgYmVjYXVzZSB3ZSBhbHJlYWR5IGhhdmUgX2RvY19pZF9yZXYuXG5mdW5jdGlvbiBkZWNvZGVEb2MoZG9jKSB7XG4gIGlmICghZG9jKSB7XG4gICAgcmV0dXJuIGRvYztcbiAgfVxuICB2YXIgaWR4ID0gZG9jLl9kb2NfaWRfcmV2Lmxhc3RJbmRleE9mKCc6Jyk7XG4gIGRvYy5faWQgPSBkb2MuX2RvY19pZF9yZXYuc3Vic3RyaW5nKDAsIGlkeCAtIDEpO1xuICBkb2MuX3JldiA9IGRvYy5fZG9jX2lkX3Jldi5zdWJzdHJpbmcoaWR4ICsgMSk7XG4gIGRlbGV0ZSBkb2MuX2RvY19pZF9yZXY7XG4gIHJldHVybiBkb2M7XG59XG5cbi8vIFJlYWQgYSBibG9iIGZyb20gdGhlIGRhdGFiYXNlLCBlbmNvZGluZyBhcyBuZWNlc3Nhcnlcbi8vIGFuZCB0cmFuc2xhdGluZyBmcm9tIGJhc2U2NCBpZiB0aGUgSURCIGRvZXNuJ3Qgc3VwcG9ydFxuLy8gbmF0aXZlIEJsb2JzXG5mdW5jdGlvbiByZWFkQmxvYkRhdGEoYm9keSwgdHlwZSwgYXNCbG9iLCBjYWxsYmFjaykge1xuICBpZiAoYXNCbG9iKSB7XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICBjYWxsYmFjayhjcmVhdGVCbG9iKFsnJ10sIHt0eXBlOiB0eXBlfSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgIT09ICdzdHJpbmcnKSB7IC8vIHdlIGhhdmUgYmxvYiBzdXBwb3J0XG4gICAgICBjYWxsYmFjayhib2R5KTtcbiAgICB9IGVsc2UgeyAvLyBubyBibG9iIHN1cHBvcnRcbiAgICAgIGNhbGxiYWNrKGI2NFRvQmx1ZmZlcihib2R5LCB0eXBlKSk7XG4gICAgfVxuICB9IGVsc2UgeyAvLyBhcyBiYXNlNjQgc3RyaW5nXG4gICAgaWYgKCFib2R5KSB7XG4gICAgICBjYWxsYmFjaygnJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSAhPT0gJ3N0cmluZycpIHsgLy8gd2UgaGF2ZSBibG9iIHN1cHBvcnRcbiAgICAgIHJlYWRBc0JpbmFyeVN0cmluZyhib2R5LCBmdW5jdGlvbiAoYmluYXJ5KSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXNCdG9hKGJpbmFyeSkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHsgLy8gbm8gYmxvYiBzdXBwb3J0XG4gICAgICBjYWxsYmFjayhib2R5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hBdHRhY2htZW50c0lmTmVjZXNzYXJ5KGRvYywgb3B0cywgdHhuLCBjYikge1xuICB2YXIgYXR0YWNobWVudHMgPSBPYmplY3Qua2V5cyhkb2MuX2F0dGFjaG1lbnRzIHx8IHt9KTtcbiAgaWYgKCFhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2IgJiYgY2IoKTtcbiAgfVxuICB2YXIgbnVtRG9uZSA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgIGlmICgrK251bURvbmUgPT09IGF0dGFjaG1lbnRzLmxlbmd0aCAmJiBjYikge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEF0dGFjaG1lbnQoZG9jLCBhdHQpIHtcbiAgICB2YXIgYXR0T2JqID0gZG9jLl9hdHRhY2htZW50c1thdHRdO1xuICAgIHZhciBkaWdlc3QgPSBhdHRPYmouZGlnZXN0O1xuICAgIHZhciByZXEgPSB0eG4ub2JqZWN0U3RvcmUoQVRUQUNIX1NUT1JFKS5nZXQoZGlnZXN0KTtcbiAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGF0dE9iai5ib2R5ID0gZS50YXJnZXQucmVzdWx0LmJvZHk7XG4gICAgICBjaGVja0RvbmUoKTtcbiAgICB9O1xuICB9XG5cbiAgYXR0YWNobWVudHMuZm9yRWFjaChmdW5jdGlvbiAoYXR0KSB7XG4gICAgaWYgKG9wdHMuYXR0YWNobWVudHMgJiYgb3B0cy5pbmNsdWRlX2RvY3MpIHtcbiAgICAgIGZldGNoQXR0YWNobWVudChkb2MsIGF0dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvYy5fYXR0YWNobWVudHNbYXR0XS5zdHViID0gdHJ1ZTtcbiAgICAgIGNoZWNrRG9uZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIElEQi1zcGVjaWZpYyBwb3N0cHJvY2Vzc2luZyBuZWNlc3NhcnkgYmVjYXVzZVxuLy8gd2UgZG9uJ3Qga25vdyB3aGV0aGVyIHdlIHN0b3JlZCBhIHRydWUgQmxvYiBvclxuLy8gYSBiYXNlNjQtZW5jb2RlZCBzdHJpbmcsIGFuZCBpZiBpdCdzIGEgQmxvYiBpdFxuLy8gbmVlZHMgdG8gYmUgcmVhZCBvdXRzaWRlIG9mIHRoZSB0cmFuc2FjdGlvbiBjb250ZXh0XG5mdW5jdGlvbiBwb3N0UHJvY2Vzc0F0dGFjaG1lbnRzKHJlc3VsdHMsIGFzQmxvYikge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cy5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgIGlmIChyb3cuZG9jICYmIHJvdy5kb2MuX2F0dGFjaG1lbnRzKSB7XG4gICAgICB2YXIgYXR0TmFtZXMgPSBPYmplY3Qua2V5cyhyb3cuZG9jLl9hdHRhY2htZW50cyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXR0TmFtZXMubWFwKGZ1bmN0aW9uIChhdHQpIHtcbiAgICAgICAgdmFyIGF0dE9iaiA9IHJvdy5kb2MuX2F0dGFjaG1lbnRzW2F0dF07XG4gICAgICAgIGlmICghKCdib2R5JyBpbiBhdHRPYmopKSB7IC8vIGFscmVhZHkgcHJvY2Vzc2VkXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gYXR0T2JqLmJvZHk7XG4gICAgICAgIHZhciB0eXBlID0gYXR0T2JqLmNvbnRlbnRfdHlwZTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgcmVhZEJsb2JEYXRhKGJvZHksIHR5cGUsIGFzQmxvYiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJvdy5kb2MuX2F0dGFjaG1lbnRzW2F0dF0gPSAkaW5qZWN0X09iamVjdF9hc3NpZ24oXG4gICAgICAgICAgICAgIHBpY2soYXR0T2JqLCBbJ2RpZ2VzdCcsICdjb250ZW50X3R5cGUnXSksXG4gICAgICAgICAgICAgIHtkYXRhOiBkYXRhfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBhY3RSZXZzKHJldnMsIGRvY0lkLCB0eG4pIHtcblxuICB2YXIgcG9zc2libHlPcnBoYW5lZERpZ2VzdHMgPSBbXTtcbiAgdmFyIHNlcVN0b3JlID0gdHhuLm9iamVjdFN0b3JlKEJZX1NFUV9TVE9SRSk7XG4gIHZhciBhdHRTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShBVFRBQ0hfU1RPUkUpO1xuICB2YXIgYXR0QW5kU2VxU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQVRUQUNIX0FORF9TRVFfU1RPUkUpO1xuICB2YXIgY291bnQgPSByZXZzLmxlbmd0aDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgY291bnQtLTtcbiAgICBpZiAoIWNvdW50KSB7IC8vIGRvbmUgcHJvY2Vzc2luZyBhbGwgcmV2c1xuICAgICAgZGVsZXRlT3JwaGFuZWRBdHRhY2htZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZU9ycGhhbmVkQXR0YWNobWVudHMoKSB7XG4gICAgaWYgKCFwb3NzaWJseU9ycGhhbmVkRGlnZXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcG9zc2libHlPcnBoYW5lZERpZ2VzdHMuZm9yRWFjaChmdW5jdGlvbiAoZGlnZXN0KSB7XG4gICAgICB2YXIgY291bnRSZXEgPSBhdHRBbmRTZXFTdG9yZS5pbmRleCgnZGlnZXN0U2VxJykuY291bnQoXG4gICAgICAgIElEQktleVJhbmdlLmJvdW5kKFxuICAgICAgICAgIGRpZ2VzdCArICc6OicsIGRpZ2VzdCArICc6OlxcdWZmZmYnLCBmYWxzZSwgZmFsc2UpKTtcbiAgICAgIGNvdW50UmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBjb3VudCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgaWYgKCFjb3VudCkge1xuICAgICAgICAgIC8vIG9ycGhhbmVkXG4gICAgICAgICAgYXR0U3RvcmUuZGVsZXRlKGRpZ2VzdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICByZXZzLmZvckVhY2goZnVuY3Rpb24gKHJldiQkMSkge1xuICAgIHZhciBpbmRleCA9IHNlcVN0b3JlLmluZGV4KCdfZG9jX2lkX3JldicpO1xuICAgIHZhciBrZXkgPSBkb2NJZCArIFwiOjpcIiArIHJldiQkMTtcbiAgICBpbmRleC5nZXRLZXkoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHNlcSA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgIGlmICh0eXBlb2Ygc2VxICE9PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gY2hlY2tEb25lKCk7XG4gICAgICB9XG4gICAgICBzZXFTdG9yZS5kZWxldGUoc2VxKTtcblxuICAgICAgdmFyIGN1cnNvciA9IGF0dEFuZFNlcVN0b3JlLmluZGV4KCdzZXEnKVxuICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KHNlcSkpO1xuXG4gICAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgdmFyIGRpZ2VzdCA9IGN1cnNvci52YWx1ZS5kaWdlc3RTZXEuc3BsaXQoJzo6JylbMF07XG4gICAgICAgICAgcG9zc2libHlPcnBoYW5lZERpZ2VzdHMucHVzaChkaWdlc3QpO1xuICAgICAgICAgIGF0dEFuZFNlcVN0b3JlLmRlbGV0ZShjdXJzb3IucHJpbWFyeUtleSk7XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGRvbmVcbiAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgc3RvcmVzLCBtb2RlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR4bjogaWRiLnRyYW5zYWN0aW9uKHN0b3JlcywgbW9kZSlcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGVyclxuICAgIH07XG4gIH1cbn1cblxudmFyIGNoYW5nZXNIYW5kbGVyID0gbmV3IENoYW5nZXMoKTtcblxuZnVuY3Rpb24gaWRiQnVsa0RvY3MoZGJPcHRzLCByZXEsIG9wdHMsIGFwaSwgaWRiLCBjYWxsYmFjaykge1xuICB2YXIgZG9jSW5mb3MgPSByZXEuZG9jcztcbiAgdmFyIHR4bjtcbiAgdmFyIGRvY1N0b3JlO1xuICB2YXIgYnlTZXFTdG9yZTtcbiAgdmFyIGF0dGFjaFN0b3JlO1xuICB2YXIgYXR0YWNoQW5kU2VxU3RvcmU7XG4gIHZhciBtZXRhU3RvcmU7XG4gIHZhciBkb2NJbmZvRXJyb3I7XG4gIHZhciBtZXRhRG9jO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkb2NJbmZvcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBkb2MgPSBkb2NJbmZvc1tpXTtcbiAgICBpZiAoZG9jLl9pZCAmJiBpc0xvY2FsSWQoZG9jLl9pZCkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBkb2MgPSBkb2NJbmZvc1tpXSA9IHBhcnNlRG9jKGRvYywgb3B0cy5uZXdfZWRpdHMsIGRiT3B0cyk7XG4gICAgaWYgKGRvYy5lcnJvciAmJiAhZG9jSW5mb0Vycm9yKSB7XG4gICAgICBkb2NJbmZvRXJyb3IgPSBkb2M7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRvY0luZm9FcnJvcikge1xuICAgIHJldHVybiBjYWxsYmFjayhkb2NJbmZvRXJyb3IpO1xuICB9XG5cbiAgdmFyIGFsbERvY3NQcm9jZXNzZWQgPSBmYWxzZTtcbiAgdmFyIGRvY0NvdW50RGVsdGEgPSAwO1xuICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShkb2NJbmZvcy5sZW5ndGgpO1xuICB2YXIgZmV0Y2hlZERvY3MgPSBuZXcgRXhwb3J0ZWRNYXAoKTtcbiAgdmFyIHByZWNvbmRpdGlvbkVycm9yZWQgPSBmYWxzZTtcbiAgdmFyIGJsb2JUeXBlID0gYXBpLl9tZXRhLmJsb2JTdXBwb3J0ID8gJ2Jsb2InIDogJ2Jhc2U2NCc7XG5cbiAgcHJlcHJvY2Vzc0F0dGFjaG1lbnRzKGRvY0luZm9zLCBibG9iVHlwZSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIH1cbiAgICBzdGFydFRyYW5zYWN0aW9uKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0VHJhbnNhY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RvcmVzID0gW1xuICAgICAgRE9DX1NUT1JFLCBCWV9TRVFfU1RPUkUsXG4gICAgICBBVFRBQ0hfU1RPUkUsXG4gICAgICBMT0NBTF9TVE9SRSwgQVRUQUNIX0FORF9TRVFfU1RPUkUsXG4gICAgICBNRVRBX1NUT1JFXG4gICAgXTtcbiAgICB2YXIgdHhuUmVzdWx0ID0gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgc3RvcmVzLCAncmVhZHdyaXRlJyk7XG4gICAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHR4blJlc3VsdC5lcnJvcik7XG4gICAgfVxuICAgIHR4biA9IHR4blJlc3VsdC50eG47XG4gICAgdHhuLm9uYWJvcnQgPSBpZGJFcnJvcihjYWxsYmFjayk7XG4gICAgdHhuLm9udGltZW91dCA9IGlkYkVycm9yKGNhbGxiYWNrKTtcbiAgICB0eG4ub25jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICAgIGRvY1N0b3JlID0gdHhuLm9iamVjdFN0b3JlKERPQ19TVE9SRSk7XG4gICAgYnlTZXFTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShCWV9TRVFfU1RPUkUpO1xuICAgIGF0dGFjaFN0b3JlID0gdHhuLm9iamVjdFN0b3JlKEFUVEFDSF9TVE9SRSk7XG4gICAgYXR0YWNoQW5kU2VxU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQVRUQUNIX0FORF9TRVFfU1RPUkUpO1xuICAgIG1ldGFTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShNRVRBX1NUT1JFKTtcblxuICAgIG1ldGFTdG9yZS5nZXQoTUVUQV9TVE9SRSkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1ldGFEb2MgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICB1cGRhdGVEb2NDb3VudElmUmVhZHkoKTtcbiAgICB9O1xuXG4gICAgdmVyaWZ5QXR0YWNobWVudHMoZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBwcmVjb25kaXRpb25FcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG4gICAgICBmZXRjaEV4aXN0aW5nRG9jcygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25BbGxEb2NzUHJvY2Vzc2VkKCkge1xuICAgIGFsbERvY3NQcm9jZXNzZWQgPSB0cnVlO1xuICAgIHVwZGF0ZURvY0NvdW50SWZSZWFkeSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaWRiUHJvY2Vzc0RvY3MoKSB7XG4gICAgcHJvY2Vzc0RvY3MoZGJPcHRzLnJldnNfbGltaXQsIGRvY0luZm9zLCBhcGksIGZldGNoZWREb2NzLFxuICAgICAgICAgICAgICAgIHR4biwgcmVzdWx0cywgd3JpdGVEb2MsIG9wdHMsIG9uQWxsRG9jc1Byb2Nlc3NlZCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEb2NDb3VudElmUmVhZHkoKSB7XG4gICAgaWYgKCFtZXRhRG9jIHx8ICFhbGxEb2NzUHJvY2Vzc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNhY2hpbmcgdGhlIGRvY0NvdW50IHNhdmVzIGEgbG90IG9mIHRpbWUgaW4gYWxsRG9jcygpIGFuZFxuICAgIC8vIGluZm8oKSwgd2hpY2ggaXMgd2h5IHdlIGdvIHRvIGFsbCB0aGUgdHJvdWJsZSBvZiBkb2luZyB0aGlzXG4gICAgbWV0YURvYy5kb2NDb3VudCArPSBkb2NDb3VudERlbHRhO1xuICAgIG1ldGFTdG9yZS5wdXQobWV0YURvYyk7XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEV4aXN0aW5nRG9jcygpIHtcblxuICAgIGlmICghZG9jSW5mb3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bUZldGNoZWQgPSAwO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgaWYgKCsrbnVtRmV0Y2hlZCA9PT0gZG9jSW5mb3MubGVuZ3RoKSB7XG4gICAgICAgIGlkYlByb2Nlc3NEb2NzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZE1ldGFkYXRhKGV2ZW50KSB7XG4gICAgICB2YXIgbWV0YWRhdGEgPSBkZWNvZGVNZXRhZGF0YShldmVudC50YXJnZXQucmVzdWx0KTtcblxuICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgIGZldGNoZWREb2NzLnNldChtZXRhZGF0YS5pZCwgbWV0YWRhdGEpO1xuICAgICAgfVxuICAgICAgY2hlY2tEb25lKCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGRvY0luZm9zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgZG9jSW5mbyA9IGRvY0luZm9zW2ldO1xuICAgICAgaWYgKGRvY0luZm8uX2lkICYmIGlzTG9jYWxJZChkb2NJbmZvLl9pZCkpIHtcbiAgICAgICAgY2hlY2tEb25lKCk7IC8vIHNraXAgbG9jYWwgZG9jc1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciByZXEgPSBkb2NTdG9yZS5nZXQoZG9jSW5mby5tZXRhZGF0YS5pZCk7XG4gICAgICByZXEub25zdWNjZXNzID0gcmVhZE1ldGFkYXRhO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgIGlmIChwcmVjb25kaXRpb25FcnJvcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2hhbmdlc0hhbmRsZXIubm90aWZ5KGFwaS5fbWV0YS5uYW1lKTtcbiAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeUF0dGFjaG1lbnQoZGlnZXN0LCBjYWxsYmFjaykge1xuXG4gICAgdmFyIHJlcSA9IGF0dGFjaFN0b3JlLmdldChkaWdlc3QpO1xuICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFlLnRhcmdldC5yZXN1bHQpIHtcbiAgICAgICAgdmFyIGVyciA9IGNyZWF0ZUVycm9yKE1JU1NJTkdfU1RVQixcbiAgICAgICAgICAndW5rbm93biBzdHViIGF0dGFjaG1lbnQgd2l0aCBkaWdlc3QgJyArXG4gICAgICAgICAgZGlnZXN0KTtcbiAgICAgICAgZXJyLnN0YXR1cyA9IDQxMjtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeUF0dGFjaG1lbnRzKGZpbmlzaCkge1xuXG5cbiAgICB2YXIgZGlnZXN0cyA9IFtdO1xuICAgIGRvY0luZm9zLmZvckVhY2goZnVuY3Rpb24gKGRvY0luZm8pIHtcbiAgICAgIGlmIChkb2NJbmZvLmRhdGEgJiYgZG9jSW5mby5kYXRhLl9hdHRhY2htZW50cykge1xuICAgICAgICBPYmplY3Qua2V5cyhkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuICAgICAgICAgIHZhciBhdHQgPSBkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzW2ZpbGVuYW1lXTtcbiAgICAgICAgICBpZiAoYXR0LnN0dWIpIHtcbiAgICAgICAgICAgIGRpZ2VzdHMucHVzaChhdHQuZGlnZXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZGlnZXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmaW5pc2goKTtcbiAgICB9XG4gICAgdmFyIG51bURvbmUgPSAwO1xuICAgIHZhciBlcnI7XG5cbiAgICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICBpZiAoKytudW1Eb25lID09PSBkaWdlc3RzLmxlbmd0aCkge1xuICAgICAgICBmaW5pc2goZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGlnZXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChkaWdlc3QpIHtcbiAgICAgIHZlcmlmeUF0dGFjaG1lbnQoZGlnZXN0LCBmdW5jdGlvbiAoYXR0RXJyKSB7XG4gICAgICAgIGlmIChhdHRFcnIgJiYgIWVycikge1xuICAgICAgICAgIGVyciA9IGF0dEVycjtcbiAgICAgICAgfVxuICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVEb2MoZG9jSW5mbywgd2lubmluZ1JldiQkMSwgd2lubmluZ1JldklzRGVsZXRlZCwgbmV3UmV2SXNEZWxldGVkLFxuICAgICAgICAgICAgICAgICAgICBpc1VwZGF0ZSwgZGVsdGEsIHJlc3VsdHNJZHgsIGNhbGxiYWNrKSB7XG5cbiAgICBkb2NJbmZvLm1ldGFkYXRhLndpbm5pbmdSZXYgPSB3aW5uaW5nUmV2JCQxO1xuICAgIGRvY0luZm8ubWV0YWRhdGEuZGVsZXRlZCA9IHdpbm5pbmdSZXZJc0RlbGV0ZWQ7XG5cbiAgICB2YXIgZG9jID0gZG9jSW5mby5kYXRhO1xuICAgIGRvYy5faWQgPSBkb2NJbmZvLm1ldGFkYXRhLmlkO1xuICAgIGRvYy5fcmV2ID0gZG9jSW5mby5tZXRhZGF0YS5yZXY7XG5cbiAgICBpZiAobmV3UmV2SXNEZWxldGVkKSB7XG4gICAgICBkb2MuX2RlbGV0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBoYXNBdHRhY2htZW50cyA9IGRvYy5fYXR0YWNobWVudHMgJiZcbiAgICAgIE9iamVjdC5rZXlzKGRvYy5fYXR0YWNobWVudHMpLmxlbmd0aDtcbiAgICBpZiAoaGFzQXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiB3cml0ZUF0dGFjaG1lbnRzKGRvY0luZm8sIHdpbm5pbmdSZXYkJDEsIHdpbm5pbmdSZXZJc0RlbGV0ZWQsXG4gICAgICAgIGlzVXBkYXRlLCByZXN1bHRzSWR4LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZG9jQ291bnREZWx0YSArPSBkZWx0YTtcbiAgICB1cGRhdGVEb2NDb3VudElmUmVhZHkoKTtcblxuICAgIGZpbmlzaERvYyhkb2NJbmZvLCB3aW5uaW5nUmV2JCQxLCB3aW5uaW5nUmV2SXNEZWxldGVkLFxuICAgICAgaXNVcGRhdGUsIHJlc3VsdHNJZHgsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaERvYyhkb2NJbmZvLCB3aW5uaW5nUmV2JCQxLCB3aW5uaW5nUmV2SXNEZWxldGVkLFxuICAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGUsIHJlc3VsdHNJZHgsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgZG9jID0gZG9jSW5mby5kYXRhO1xuICAgIHZhciBtZXRhZGF0YSA9IGRvY0luZm8ubWV0YWRhdGE7XG5cbiAgICBkb2MuX2RvY19pZF9yZXYgPSBtZXRhZGF0YS5pZCArICc6OicgKyBtZXRhZGF0YS5yZXY7XG4gICAgZGVsZXRlIGRvYy5faWQ7XG4gICAgZGVsZXRlIGRvYy5fcmV2O1xuXG4gICAgZnVuY3Rpb24gYWZ0ZXJQdXREb2MoZSkge1xuICAgICAgdmFyIHJldnNUb0RlbGV0ZSA9IGRvY0luZm8uc3RlbW1lZFJldnMgfHwgW107XG5cbiAgICAgIGlmIChpc1VwZGF0ZSAmJiBhcGkuYXV0b19jb21wYWN0aW9uKSB7XG4gICAgICAgIHJldnNUb0RlbGV0ZSA9IHJldnNUb0RlbGV0ZS5jb25jYXQoY29tcGFjdFRyZWUoZG9jSW5mby5tZXRhZGF0YSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmV2c1RvRGVsZXRlICYmIHJldnNUb0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29tcGFjdFJldnMocmV2c1RvRGVsZXRlLCBkb2NJbmZvLm1ldGFkYXRhLmlkLCB0eG4pO1xuICAgICAgfVxuXG4gICAgICBtZXRhZGF0YS5zZXEgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAvLyBDdXJyZW50IF9yZXYgaXMgY2FsY3VsYXRlZCBmcm9tIF9yZXZfdHJlZSBvbiByZWFkXG4gICAgICAvLyBkZWxldGUgbWV0YWRhdGEucmV2O1xuICAgICAgdmFyIG1ldGFkYXRhVG9TdG9yZSA9IGVuY29kZU1ldGFkYXRhKG1ldGFkYXRhLCB3aW5uaW5nUmV2JCQxLFxuICAgICAgICB3aW5uaW5nUmV2SXNEZWxldGVkKTtcbiAgICAgIHZhciBtZXRhRGF0YVJlcSA9IGRvY1N0b3JlLnB1dChtZXRhZGF0YVRvU3RvcmUpO1xuICAgICAgbWV0YURhdGFSZXEub25zdWNjZXNzID0gYWZ0ZXJQdXRNZXRhZGF0YTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZnRlclB1dERvY0Vycm9yKGUpIHtcbiAgICAgIC8vIENvbnN0cmFpbnRFcnJvciwgbmVlZCB0byB1cGRhdGUsIG5vdCBwdXQgKHNlZSAjMTYzOCBmb3IgZGV0YWlscylcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gYXZvaWQgdHJhbnNhY3Rpb24gYWJvcnRcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIGF2b2lkIHRyYW5zYWN0aW9uIG9uZXJyb3JcbiAgICAgIHZhciBpbmRleCA9IGJ5U2VxU3RvcmUuaW5kZXgoJ19kb2NfaWRfcmV2Jyk7XG4gICAgICB2YXIgZ2V0S2V5UmVxID0gaW5kZXguZ2V0S2V5KGRvYy5fZG9jX2lkX3Jldik7XG4gICAgICBnZXRLZXlSZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHB1dFJlcSA9IGJ5U2VxU3RvcmUucHV0KGRvYywgZS50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgcHV0UmVxLm9uc3VjY2VzcyA9IGFmdGVyUHV0RG9jO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZnRlclB1dE1ldGFkYXRhKCkge1xuICAgICAgcmVzdWx0c1tyZXN1bHRzSWR4XSA9IHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIGlkOiBtZXRhZGF0YS5pZCxcbiAgICAgICAgcmV2OiBtZXRhZGF0YS5yZXZcbiAgICAgIH07XG4gICAgICBmZXRjaGVkRG9jcy5zZXQoZG9jSW5mby5tZXRhZGF0YS5pZCwgZG9jSW5mby5tZXRhZGF0YSk7XG4gICAgICBpbnNlcnRBdHRhY2htZW50TWFwcGluZ3MoZG9jSW5mbywgbWV0YWRhdGEuc2VxLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgdmFyIHB1dFJlcSA9IGJ5U2VxU3RvcmUucHV0KGRvYyk7XG5cbiAgICBwdXRSZXEub25zdWNjZXNzID0gYWZ0ZXJQdXREb2M7XG4gICAgcHV0UmVxLm9uZXJyb3IgPSBhZnRlclB1dERvY0Vycm9yO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVBdHRhY2htZW50cyhkb2NJbmZvLCB3aW5uaW5nUmV2JCQxLCB3aW5uaW5nUmV2SXNEZWxldGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVXBkYXRlLCByZXN1bHRzSWR4LCBjYWxsYmFjaykge1xuXG5cbiAgICB2YXIgZG9jID0gZG9jSW5mby5kYXRhO1xuXG4gICAgdmFyIG51bURvbmUgPSAwO1xuICAgIHZhciBhdHRhY2htZW50cyA9IE9iamVjdC5rZXlzKGRvYy5fYXR0YWNobWVudHMpO1xuXG4gICAgZnVuY3Rpb24gY29sbGVjdFJlc3VsdHMoKSB7XG4gICAgICBpZiAobnVtRG9uZSA9PT0gYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGZpbmlzaERvYyhkb2NJbmZvLCB3aW5uaW5nUmV2JCQxLCB3aW5uaW5nUmV2SXNEZWxldGVkLFxuICAgICAgICAgIGlzVXBkYXRlLCByZXN1bHRzSWR4LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXR0YWNobWVudFNhdmVkKCkge1xuICAgICAgbnVtRG9uZSsrO1xuICAgICAgY29sbGVjdFJlc3VsdHMoKTtcbiAgICB9XG5cbiAgICBhdHRhY2htZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBhdHQgPSBkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzW2tleV07XG4gICAgICBpZiAoIWF0dC5zdHViKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXR0LmRhdGE7XG4gICAgICAgIGRlbGV0ZSBhdHQuZGF0YTtcbiAgICAgICAgYXR0LnJldnBvcyA9IHBhcnNlSW50KHdpbm5pbmdSZXYkJDEsIDEwKTtcbiAgICAgICAgdmFyIGRpZ2VzdCA9IGF0dC5kaWdlc3Q7XG4gICAgICAgIHNhdmVBdHRhY2htZW50KGRpZ2VzdCwgZGF0YSwgYXR0YWNobWVudFNhdmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bURvbmUrKztcbiAgICAgICAgY29sbGVjdFJlc3VsdHMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIG1hcCBzZXFzIHRvIGF0dGFjaG1lbnQgZGlnZXN0cywgd2hpY2hcbiAgLy8gd2Ugd2lsbCBuZWVkIGxhdGVyIGR1cmluZyBjb21wYWN0aW9uXG4gIGZ1bmN0aW9uIGluc2VydEF0dGFjaG1lbnRNYXBwaW5ncyhkb2NJbmZvLCBzZXEsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgYXR0c0FkZGVkID0gMDtcbiAgICB2YXIgYXR0c1RvQWRkID0gT2JqZWN0LmtleXMoZG9jSW5mby5kYXRhLl9hdHRhY2htZW50cyB8fCB7fSk7XG5cbiAgICBpZiAoIWF0dHNUb0FkZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgIGlmICgrK2F0dHNBZGRlZCA9PT0gYXR0c1RvQWRkLmxlbmd0aCkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZChhdHQpIHtcbiAgICAgIHZhciBkaWdlc3QgPSBkb2NJbmZvLmRhdGEuX2F0dGFjaG1lbnRzW2F0dF0uZGlnZXN0O1xuICAgICAgdmFyIHJlcSA9IGF0dGFjaEFuZFNlcVN0b3JlLnB1dCh7XG4gICAgICAgIHNlcTogc2VxLFxuICAgICAgICBkaWdlc3RTZXE6IGRpZ2VzdCArICc6OicgKyBzZXFcbiAgICAgIH0pO1xuXG4gICAgICByZXEub25zdWNjZXNzID0gY2hlY2tEb25lO1xuICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyB0aGlzIGNhbGxiYWNrIGlzIGZvciBhIGNvbnN0YWludCBlcnJvciwgd2hpY2ggd2UgaWdub3JlXG4gICAgICAgIC8vIGJlY2F1c2UgdGhpcyBkb2NpZC9yZXYgaGFzIGFscmVhZHkgYmVlbiBhc3NvY2lhdGVkIHdpdGhcbiAgICAgICAgLy8gdGhlIGRpZ2VzdCAoZS5nLiB3aGVuIG5ld19lZGl0cyA9PSBmYWxzZSlcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBhdm9pZCB0cmFuc2FjdGlvbiBhYm9ydFxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBhdm9pZCB0cmFuc2FjdGlvbiBvbmVycm9yXG4gICAgICAgIGNoZWNrRG9uZSgpO1xuICAgICAgfTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRzVG9BZGQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFkZChhdHRzVG9BZGRbaV0pOyAvLyBkbyBpbiBwYXJhbGxlbFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVBdHRhY2htZW50KGRpZ2VzdCwgZGF0YSwgY2FsbGJhY2spIHtcblxuXG4gICAgdmFyIGdldEtleVJlcSA9IGF0dGFjaFN0b3JlLmNvdW50KGRpZ2VzdCk7XG4gICAgZ2V0S2V5UmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgY291bnQgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7IC8vIGFscmVhZHkgZXhpc3RzXG4gICAgICB9XG4gICAgICB2YXIgbmV3QXR0ID0ge1xuICAgICAgICBkaWdlc3Q6IGRpZ2VzdCxcbiAgICAgICAgYm9keTogZGF0YVxuICAgICAgfTtcbiAgICAgIHZhciBwdXRSZXEgPSBhdHRhY2hTdG9yZS5wdXQobmV3QXR0KTtcbiAgICAgIHB1dFJlcS5vbnN1Y2Nlc3MgPSBjYWxsYmFjaztcbiAgICB9O1xuICB9XG59XG5cbi8vIEFic3RyYWN0aW9uIG92ZXIgSURCQ3Vyc29yIGFuZCBnZXRBbGwoKS9nZXRBbGxLZXlzKCkgdGhhdCBhbGxvd3MgdXMgdG8gYmF0Y2ggb3VyIG9wZXJhdGlvbnNcbi8vIHdoaWxlIGZhbGxpbmcgYmFjayB0byBhIG5vcm1hbCBJREJDdXJzb3Igb3BlcmF0aW9uIG9uIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBnZXRBbGwoKSBvclxuLy8gZ2V0QWxsS2V5cygpLiBUaGlzIGFsbG93cyBmb3IgYSBtdWNoIGZhc3RlciBpbXBsZW1lbnRhdGlvbiB0aGFuIGp1c3Qgc3RyYWlnaHQtdXAgY3Vyc29ycywgYmVjYXVzZVxuLy8gd2UncmUgbm90IHByb2Nlc3NpbmcgZWFjaCBkb2N1bWVudCBvbmUtYXQtYS10aW1lLlxuZnVuY3Rpb24gcnVuQmF0Y2hlZEN1cnNvcihvYmplY3RTdG9yZSwga2V5UmFuZ2UsIGRlc2NlbmRpbmcsIGJhdGNoU2l6ZSwgb25CYXRjaCkge1xuXG4gIGlmIChiYXRjaFNpemUgPT09IC0xKSB7XG4gICAgYmF0Y2hTaXplID0gMTAwMDtcbiAgfVxuXG4gIC8vIEJhaWwgb3V0IG9mIGdldEFsbCgpL2dldEFsbEtleXMoKSBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICAvLyAxKSBlaXRoZXIgbWV0aG9kIGlzIHVuc3VwcG9ydGVkIC0gd2UgbmVlZCBib3RoXG4gIC8vIDIpIGJhdGNoU2l6ZSBpcyAxIChtaWdodCBhcyB3ZWxsIHVzZSBJREJDdXJzb3IpXG4gIC8vIDMpIGRlc2NlbmRpbmcg4oCTIG5vIHJlYWwgd2F5IHRvIGRvIHRoaXMgdmlhIGdldEFsbCgpL2dldEFsbEtleXMoKVxuXG4gIHZhciB1c2VHZXRBbGwgPSB0eXBlb2Ygb2JqZWN0U3RvcmUuZ2V0QWxsID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIG9iamVjdFN0b3JlLmdldEFsbEtleXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICBiYXRjaFNpemUgPiAxICYmICFkZXNjZW5kaW5nO1xuXG4gIHZhciBrZXlzQmF0Y2g7XG4gIHZhciB2YWx1ZXNCYXRjaDtcbiAgdmFyIHBzZXVkb0N1cnNvcjtcblxuICBmdW5jdGlvbiBvbkdldEFsbChlKSB7XG4gICAgdmFsdWVzQmF0Y2ggPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgaWYgKGtleXNCYXRjaCkge1xuICAgICAgb25CYXRjaChrZXlzQmF0Y2gsIHZhbHVlc0JhdGNoLCBwc2V1ZG9DdXJzb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uR2V0QWxsS2V5cyhlKSB7XG4gICAga2V5c0JhdGNoID0gZS50YXJnZXQucmVzdWx0O1xuICAgIGlmICh2YWx1ZXNCYXRjaCkge1xuICAgICAgb25CYXRjaChrZXlzQmF0Y2gsIHZhbHVlc0JhdGNoLCBwc2V1ZG9DdXJzb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRpbnVlUHNldWRvQ3Vyc29yKCkge1xuICAgIGlmICgha2V5c0JhdGNoLmxlbmd0aCkgeyAvLyBubyBtb3JlIHJlc3VsdHNcbiAgICAgIHJldHVybiBvbkJhdGNoKCk7XG4gICAgfVxuICAgIC8vIGZldGNoIG5leHQgYmF0Y2gsIGV4Y2x1c2l2ZSBzdGFydFxuICAgIHZhciBsYXN0S2V5ID0ga2V5c0JhdGNoW2tleXNCYXRjaC5sZW5ndGggLSAxXTtcbiAgICB2YXIgbmV3S2V5UmFuZ2U7XG4gICAgaWYgKGtleVJhbmdlICYmIGtleVJhbmdlLnVwcGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXdLZXlSYW5nZSA9IElEQktleVJhbmdlLmJvdW5kKGxhc3RLZXksIGtleVJhbmdlLnVwcGVyLFxuICAgICAgICAgIHRydWUsIGtleVJhbmdlLnVwcGVyT3Blbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgPT09IFwiRGF0YUVycm9yXCIgJiYgZS5jb2RlID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG9uQmF0Y2goKTsgLy8gd2UncmUgZG9uZSwgc3RhcnRrZXkgYW5kIGVuZGtleSBhcmUgZXF1YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdLZXlSYW5nZSA9IElEQktleVJhbmdlLmxvd2VyQm91bmQobGFzdEtleSwgdHJ1ZSk7XG4gICAgfVxuICAgIGtleVJhbmdlID0gbmV3S2V5UmFuZ2U7XG4gICAga2V5c0JhdGNoID0gbnVsbDtcbiAgICB2YWx1ZXNCYXRjaCA9IG51bGw7XG4gICAgb2JqZWN0U3RvcmUuZ2V0QWxsKGtleVJhbmdlLCBiYXRjaFNpemUpLm9uc3VjY2VzcyA9IG9uR2V0QWxsO1xuICAgIG9iamVjdFN0b3JlLmdldEFsbEtleXMoa2V5UmFuZ2UsIGJhdGNoU2l6ZSkub25zdWNjZXNzID0gb25HZXRBbGxLZXlzO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DdXJzb3IoZSkge1xuICAgIHZhciBjdXJzb3IgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgaWYgKCFjdXJzb3IpIHsgLy8gZG9uZVxuICAgICAgcmV0dXJuIG9uQmF0Y2goKTtcbiAgICB9XG4gICAgLy8gcmVndWxhciBJREJDdXJzb3IgYWN0cyBsaWtlIGEgYmF0Y2ggd2hlcmUgYmF0Y2ggc2l6ZSBpcyBhbHdheXMgMVxuICAgIG9uQmF0Y2goW2N1cnNvci5rZXldLCBbY3Vyc29yLnZhbHVlXSwgY3Vyc29yKTtcbiAgfVxuXG4gIGlmICh1c2VHZXRBbGwpIHtcbiAgICBwc2V1ZG9DdXJzb3IgPSB7XCJjb250aW51ZVwiOiBjb250aW51ZVBzZXVkb0N1cnNvcn07XG4gICAgb2JqZWN0U3RvcmUuZ2V0QWxsKGtleVJhbmdlLCBiYXRjaFNpemUpLm9uc3VjY2VzcyA9IG9uR2V0QWxsO1xuICAgIG9iamVjdFN0b3JlLmdldEFsbEtleXMoa2V5UmFuZ2UsIGJhdGNoU2l6ZSkub25zdWNjZXNzID0gb25HZXRBbGxLZXlzO1xuICB9IGVsc2UgaWYgKGRlc2NlbmRpbmcpIHtcbiAgICBvYmplY3RTdG9yZS5vcGVuQ3Vyc29yKGtleVJhbmdlLCAncHJldicpLm9uc3VjY2VzcyA9IG9uQ3Vyc29yO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFN0b3JlLm9wZW5DdXJzb3Ioa2V5UmFuZ2UpLm9uc3VjY2VzcyA9IG9uQ3Vyc29yO1xuICB9XG59XG5cbi8vIHNpbXBsZSBzaGltIGZvciBvYmplY3RTdG9yZS5nZXRBbGwoKSwgZmFsbGluZyBiYWNrIHRvIElEQkN1cnNvclxuZnVuY3Rpb24gZ2V0QWxsKG9iamVjdFN0b3JlLCBrZXlSYW5nZSwgb25TdWNjZXNzKSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0U3RvcmUuZ2V0QWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gdXNlIG5hdGl2ZSBnZXRBbGxcbiAgICBvYmplY3RTdG9yZS5nZXRBbGwoa2V5UmFuZ2UpLm9uc3VjY2VzcyA9IG9uU3VjY2VzcztcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbCBiYWNrIHRvIGN1cnNvcnNcbiAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIG9uQ3Vyc29yKGUpIHtcbiAgICB2YXIgY3Vyc29yID0gZS50YXJnZXQucmVzdWx0O1xuICAgIGlmIChjdXJzb3IpIHtcbiAgICAgIHZhbHVlcy5wdXNoKGN1cnNvci52YWx1ZSk7XG4gICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25TdWNjZXNzKHtcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgcmVzdWx0OiB2YWx1ZXNcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb2JqZWN0U3RvcmUub3BlbkN1cnNvcihrZXlSYW5nZSkub25zdWNjZXNzID0gb25DdXJzb3I7XG59XG5cbmZ1bmN0aW9uIGFsbERvY3NLZXlzKGtleXMsIGRvY1N0b3JlLCBvbkJhdGNoKSB7XG4gIC8vIEl0J3Mgbm90IGd1YXJhbnRlZCB0byBiZSByZXR1cm5lZCBpbiByaWdodCBvcmRlciAgXG4gIHZhciB2YWx1ZXNCYXRjaCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XG4gIHZhciBjb3VudCA9IDA7XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5LCBpbmRleCkge1xuICAgIGRvY1N0b3JlLmdldChrZXkpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5yZXN1bHQpIHtcbiAgICAgICAgdmFsdWVzQmF0Y2hbaW5kZXhdID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlc0JhdGNoW2luZGV4XSA9IHtrZXk6IGtleSwgZXJyb3I6ICdub3RfZm91bmQnfTtcbiAgICAgIH1cbiAgICAgIGNvdW50Kys7XG4gICAgICBpZiAoY291bnQgPT09IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIG9uQmF0Y2goa2V5cywgdmFsdWVzQmF0Y2gsIHt9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlS2V5UmFuZ2Uoc3RhcnQsIGVuZCwgaW5jbHVzaXZlRW5kLCBrZXksIGRlc2NlbmRpbmcpIHtcbiAgdHJ5IHtcbiAgICBpZiAoc3RhcnQgJiYgZW5kKSB7XG4gICAgICBpZiAoZGVzY2VuZGluZykge1xuICAgICAgICByZXR1cm4gSURCS2V5UmFuZ2UuYm91bmQoZW5kLCBzdGFydCwgIWluY2x1c2l2ZUVuZCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIElEQktleVJhbmdlLmJvdW5kKHN0YXJ0LCBlbmQsIGZhbHNlLCAhaW5jbHVzaXZlRW5kKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXJ0KSB7XG4gICAgICBpZiAoZGVzY2VuZGluZykge1xuICAgICAgICByZXR1cm4gSURCS2V5UmFuZ2UudXBwZXJCb3VuZChzdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSURCS2V5UmFuZ2UubG93ZXJCb3VuZChzdGFydCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbmQpIHtcbiAgICAgIGlmIChkZXNjZW5kaW5nKSB7XG4gICAgICAgIHJldHVybiBJREJLZXlSYW5nZS5sb3dlckJvdW5kKGVuZCwgIWluY2x1c2l2ZUVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSURCS2V5UmFuZ2UudXBwZXJCb3VuZChlbmQsICFpbmNsdXNpdmVFbmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5KSB7XG4gICAgICByZXR1cm4gSURCS2V5UmFuZ2Uub25seShrZXkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpZGJBbGxEb2NzKG9wdHMsIGlkYiwgY2FsbGJhY2spIHtcbiAgdmFyIHN0YXJ0ID0gJ3N0YXJ0a2V5JyBpbiBvcHRzID8gb3B0cy5zdGFydGtleSA6IGZhbHNlO1xuICB2YXIgZW5kID0gJ2VuZGtleScgaW4gb3B0cyA/IG9wdHMuZW5ka2V5IDogZmFsc2U7XG4gIHZhciBrZXkgPSAna2V5JyBpbiBvcHRzID8gb3B0cy5rZXkgOiBmYWxzZTtcbiAgdmFyIGtleXMgPSAna2V5cycgaW4gb3B0cyA/IG9wdHMua2V5cyA6IGZhbHNlOyBcbiAgdmFyIHNraXAgPSBvcHRzLnNraXAgfHwgMDtcbiAgdmFyIGxpbWl0ID0gdHlwZW9mIG9wdHMubGltaXQgPT09ICdudW1iZXInID8gb3B0cy5saW1pdCA6IC0xO1xuICB2YXIgaW5jbHVzaXZlRW5kID0gb3B0cy5pbmNsdXNpdmVfZW5kICE9PSBmYWxzZTtcblxuICB2YXIga2V5UmFuZ2UgOyBcbiAgdmFyIGtleVJhbmdlRXJyb3I7XG4gIGlmICgha2V5cykge1xuICAgIGtleVJhbmdlID0gY3JlYXRlS2V5UmFuZ2Uoc3RhcnQsIGVuZCwgaW5jbHVzaXZlRW5kLCBrZXksIG9wdHMuZGVzY2VuZGluZyk7XG4gICAga2V5UmFuZ2VFcnJvciA9IGtleVJhbmdlICYmIGtleVJhbmdlLmVycm9yO1xuICAgIGlmIChrZXlSYW5nZUVycm9yICYmIFxuICAgICAgIShrZXlSYW5nZUVycm9yLm5hbWUgPT09IFwiRGF0YUVycm9yXCIgJiYga2V5UmFuZ2VFcnJvci5jb2RlID09PSAwKSkge1xuICAgICAgLy8gRGF0YUVycm9yIHdpdGggZXJyb3IgY29kZSAwIGluZGljYXRlcyBzdGFydCBpcyBsZXNzIHRoYW4gZW5kLCBzb1xuICAgICAgLy8gY2FuIGp1c3QgZG8gYW4gZW1wdHkgcXVlcnkuIEVsc2UgbmVlZCB0byB0aHJvd1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKElEQl9FUlJPUixcbiAgICAgICAga2V5UmFuZ2VFcnJvci5uYW1lLCBrZXlSYW5nZUVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc3RvcmVzID0gW0RPQ19TVE9SRSwgQllfU0VRX1NUT1JFLCBNRVRBX1NUT1JFXTtcblxuICBpZiAob3B0cy5hdHRhY2htZW50cykge1xuICAgIHN0b3Jlcy5wdXNoKEFUVEFDSF9TVE9SRSk7XG4gIH1cbiAgdmFyIHR4blJlc3VsdCA9IG9wZW5UcmFuc2FjdGlvblNhZmVseShpZGIsIHN0b3JlcywgJ3JlYWRvbmx5Jyk7XG4gIGlmICh0eG5SZXN1bHQuZXJyb3IpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sodHhuUmVzdWx0LmVycm9yKTtcbiAgfVxuICB2YXIgdHhuID0gdHhuUmVzdWx0LnR4bjtcbiAgdHhuLm9uY29tcGxldGUgPSBvblR4bkNvbXBsZXRlO1xuICB0eG4ub25hYm9ydCA9IGlkYkVycm9yKGNhbGxiYWNrKTtcbiAgdmFyIGRvY1N0b3JlID0gdHhuLm9iamVjdFN0b3JlKERPQ19TVE9SRSk7XG4gIHZhciBzZXFTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShCWV9TRVFfU1RPUkUpO1xuICB2YXIgbWV0YVN0b3JlID0gdHhuLm9iamVjdFN0b3JlKE1FVEFfU1RPUkUpO1xuICB2YXIgZG9jSWRSZXZJbmRleCA9IHNlcVN0b3JlLmluZGV4KCdfZG9jX2lkX3JldicpO1xuICB2YXIgcmVzdWx0cyA9IFtdO1xuICB2YXIgZG9jQ291bnQ7XG4gIHZhciB1cGRhdGVTZXE7XG5cbiAgbWV0YVN0b3JlLmdldChNRVRBX1NUT1JFKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgIGRvY0NvdW50ID0gZS50YXJnZXQucmVzdWx0LmRvY0NvdW50O1xuICB9O1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAob3B0cy51cGRhdGVfc2VxKSB7XG4gICAgZ2V0TWF4VXBkYXRlU2VxKHNlcVN0b3JlLCBmdW5jdGlvbiAoZSkgeyBcbiAgICAgIGlmIChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdXBkYXRlU2VxID0gZS50YXJnZXQucmVzdWx0WzBdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWF4VXBkYXRlU2VxKG9iamVjdFN0b3JlLCBvblN1Y2Nlc3MpIHtcbiAgICBmdW5jdGlvbiBvbkN1cnNvcihlKSB7XG4gICAgICB2YXIgY3Vyc29yID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgdmFyIG1heEtleSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjdXJzb3IgJiYgY3Vyc29yLmtleSkge1xuICAgICAgICBtYXhLZXkgPSBjdXJzb3Iua2V5O1xuICAgICAgfSBcbiAgICAgIHJldHVybiBvblN1Y2Nlc3Moe1xuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICByZXN1bHQ6IFttYXhLZXldXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBvYmplY3RTdG9yZS5vcGVuQ3Vyc29yKG51bGwsICdwcmV2Jykub25zdWNjZXNzID0gb25DdXJzb3I7XG4gIH1cblxuICAvLyBpZiB0aGUgdXNlciBzcGVjaWZpZXMgaW5jbHVkZV9kb2NzPXRydWUsIHRoZW4gd2UgZG9uJ3RcbiAgLy8gd2FudCB0byBibG9jayB0aGUgbWFpbiBjdXJzb3Igd2hpbGUgd2UncmUgZmV0Y2hpbmcgdGhlIGRvY1xuICBmdW5jdGlvbiBmZXRjaERvY0FzeW5jaHJvbm91c2x5KG1ldGFkYXRhLCByb3csIHdpbm5pbmdSZXYkJDEpIHtcbiAgICB2YXIga2V5ID0gbWV0YWRhdGEuaWQgKyBcIjo6XCIgKyB3aW5uaW5nUmV2JCQxO1xuICAgIGRvY0lkUmV2SW5kZXguZ2V0KGtleSkub25zdWNjZXNzID0gIGZ1bmN0aW9uIG9uR2V0RG9jKGUpIHtcbiAgICAgIHJvdy5kb2MgPSBkZWNvZGVEb2MoZS50YXJnZXQucmVzdWx0KSB8fCB7fTtcbiAgICAgIGlmIChvcHRzLmNvbmZsaWN0cykge1xuICAgICAgICB2YXIgY29uZmxpY3RzID0gY29sbGVjdENvbmZsaWN0cyhtZXRhZGF0YSk7XG4gICAgICAgIGlmIChjb25mbGljdHMubGVuZ3RoKSB7XG4gICAgICAgICAgcm93LmRvYy5fY29uZmxpY3RzID0gY29uZmxpY3RzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmZXRjaEF0dGFjaG1lbnRzSWZOZWNlc3Nhcnkocm93LmRvYywgb3B0cywgdHhuKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsRG9jc0lubmVyKHdpbm5pbmdSZXYkJDEsIG1ldGFkYXRhKSB7XG4gICAgdmFyIHJvdyA9IHtcbiAgICAgIGlkOiBtZXRhZGF0YS5pZCxcbiAgICAgIGtleTogbWV0YWRhdGEuaWQsXG4gICAgICB2YWx1ZToge1xuICAgICAgICByZXY6IHdpbm5pbmdSZXYkJDFcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZWxldGVkID0gbWV0YWRhdGEuZGVsZXRlZDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgaWYgKGtleXMpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vIGRlbGV0ZWQgZG9jcyBhcmUgb2theSB3aXRoIFwia2V5c1wiIHJlcXVlc3RzXG4gICAgICAgIHJvdy52YWx1ZS5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgcm93LmRvYyA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChza2lwLS0gPD0gMCkge1xuICAgICAgcmVzdWx0cy5wdXNoKHJvdyk7XG4gICAgICBpZiAob3B0cy5pbmNsdWRlX2RvY3MpIHtcbiAgICAgICAgZmV0Y2hEb2NBc3luY2hyb25vdXNseShtZXRhZGF0YSwgcm93LCB3aW5uaW5nUmV2JCQxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzQmF0Y2goYmF0Y2hWYWx1ZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYmF0Y2hWYWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gbGltaXQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB2YXIgYmF0Y2hWYWx1ZSA9IGJhdGNoVmFsdWVzW2ldO1xuICAgICAgaWYgKGJhdGNoVmFsdWUuZXJyb3IgJiYga2V5cykge1xuICAgICAgICAvLyBrZXkgd2FzIG5vdCBmb3VuZCB3aXRoIFwia2V5c1wiIHJlcXVlc3RzXG4gICAgICAgIHJlc3VsdHMucHVzaChiYXRjaFZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgbWV0YWRhdGEgPSBkZWNvZGVNZXRhZGF0YShiYXRjaFZhbHVlKTtcbiAgICAgIHZhciB3aW5uaW5nUmV2JCQxID0gbWV0YWRhdGEud2lubmluZ1JldjtcbiAgICAgIGFsbERvY3NJbm5lcih3aW5uaW5nUmV2JCQxLCBtZXRhZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25CYXRjaChiYXRjaEtleXMsIGJhdGNoVmFsdWVzLCBjdXJzb3IpIHtcbiAgICBpZiAoIWN1cnNvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwcm9jZXNzQmF0Y2goYmF0Y2hWYWx1ZXMpO1xuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA8IGxpbWl0KSB7XG4gICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkdldEFsbChlKSB7XG4gICAgdmFyIHZhbHVlcyA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICBpZiAob3B0cy5kZXNjZW5kaW5nKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMucmV2ZXJzZSgpO1xuICAgIH1cbiAgICBwcm9jZXNzQmF0Y2godmFsdWVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUmVzdWx0c1JlYWR5KCkge1xuICAgIHZhciByZXR1cm5WYWwgPSB7XG4gICAgICB0b3RhbF9yb3dzOiBkb2NDb3VudCxcbiAgICAgIG9mZnNldDogb3B0cy5za2lwLFxuICAgICAgcm93czogcmVzdWx0c1xuICAgIH07XG4gICAgXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKG9wdHMudXBkYXRlX3NlcSAmJiB1cGRhdGVTZXEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuVmFsLnVwZGF0ZV9zZXEgPSB1cGRhdGVTZXE7XG4gICAgfVxuICAgIGNhbGxiYWNrKG51bGwsIHJldHVyblZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBvblR4bkNvbXBsZXRlKCkge1xuICAgIGlmIChvcHRzLmF0dGFjaG1lbnRzKSB7XG4gICAgICBwb3N0UHJvY2Vzc0F0dGFjaG1lbnRzKHJlc3VsdHMsIG9wdHMuYmluYXJ5KS50aGVuKG9uUmVzdWx0c1JlYWR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25SZXN1bHRzUmVhZHkoKTtcbiAgICB9XG4gIH1cblxuICAvLyBkb24ndCBib3RoZXIgZG9pbmcgYW55IHJlcXVlc3RzIGlmIHN0YXJ0ID4gZW5kIG9yIGxpbWl0ID09PSAwXG4gIGlmIChrZXlSYW5nZUVycm9yIHx8IGxpbWl0ID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChrZXlzKSB7XG4gICAgcmV0dXJuIGFsbERvY3NLZXlzKG9wdHMua2V5cywgZG9jU3RvcmUsIG9uQmF0Y2gpO1xuICB9XG4gIGlmIChsaW1pdCA9PT0gLTEpIHsgLy8ganVzdCBmZXRjaCBldmVyeXRoaW5nXG4gICAgcmV0dXJuIGdldEFsbChkb2NTdG9yZSwga2V5UmFuZ2UsIG9uR2V0QWxsKTtcbiAgfVxuICAvLyBlbHNlIGRvIGEgY3Vyc29yXG4gIC8vIGNob29zZSBhIGJhdGNoIHNpemUgYmFzZWQgb24gdGhlIHNraXAsIHNpbmNlIHdlJ2xsIG5lZWQgdG8gc2tpcCB0aGF0IG1hbnlcbiAgcnVuQmF0Y2hlZEN1cnNvcihkb2NTdG9yZSwga2V5UmFuZ2UsIG9wdHMuZGVzY2VuZGluZywgbGltaXQgKyBza2lwLCBvbkJhdGNoKTtcbn1cblxuLy9cbi8vIEJsb2JzIGFyZSBub3Qgc3VwcG9ydGVkIGluIGFsbCB2ZXJzaW9ucyBvZiBJbmRleGVkREIsIG5vdGFibHlcbi8vIENocm9tZSA8MzcgYW5kIEFuZHJvaWQgPDUuIEluIHRob3NlIHZlcnNpb25zLCBzdG9yaW5nIGEgYmxvYiB3aWxsIHRocm93LlxuLy9cbi8vIFZhcmlvdXMgb3RoZXIgYmxvYiBidWdzIGV4aXN0IGluIENocm9tZSB2MzctNDIgKGluY2x1c2l2ZSkuXG4vLyBEZXRlY3RpbmcgdGhlbSBpcyBleHBlbnNpdmUgYW5kIGNvbmZ1c2luZyB0byB1c2VycywgYW5kIENocm9tZSAzNy00MlxuLy8gaXMgYXQgdmVyeSBsb3cgdXNhZ2Ugd29ybGR3aWRlLCBzbyB3ZSBkbyBhIGhhY2t5IHVzZXJBZ2VudCBjaGVjayBpbnN0ZWFkLlxuLy9cbi8vIGNvbnRlbnQtdHlwZSBidWc6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00MDgxMjBcbi8vIDQwNCBidWc6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NDc5MTZcbi8vIEZpbGVSZWFkZXIgYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ3ODM2XG4vL1xuZnVuY3Rpb24gY2hlY2tCbG9iU3VwcG9ydCh0eG4pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIGJsb2IkJDEgPSBjcmVhdGVCbG9iKFsnJ10pO1xuICAgIHZhciByZXEgPSB0eG4ub2JqZWN0U3RvcmUoREVURUNUX0JMT0JfU1VQUE9SVF9TVE9SRSkucHV0KGJsb2IkJDEsICdrZXknKTtcblxuICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWF0Y2hlZENocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgICAgdmFyIG1hdGNoZWRFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLy8pO1xuICAgICAgLy8gTVMgRWRnZSBwcmV0ZW5kcyB0byBiZSBDaHJvbWUgNDI6XG4gICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2hoODY5MzAxJTI4dj12cy44NSUyOS5hc3B4XG4gICAgICByZXNvbHZlKG1hdGNoZWRFZGdlIHx8ICFtYXRjaGVkQ2hyb21lIHx8XG4gICAgICAgIHBhcnNlSW50KG1hdGNoZWRDaHJvbWVbMV0sIDEwKSA+PSA0Myk7XG4gICAgfTtcblxuICAgIHJlcS5vbmVycm9yID0gdHhuLm9uYWJvcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gSWYgdGhlIHRyYW5zYWN0aW9uIGFib3J0cyBub3cgaXRzIGR1ZSB0byBub3QgYmVpbmcgYWJsZSB0b1xuICAgICAgLy8gd3JpdGUgdG8gdGhlIGRhdGFiYXNlLCBsaWtlbHkgZHVlIHRvIHRoZSBkaXNrIGJlaW5nIGZ1bGxcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICB9O1xuICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBlcnJvciwgc28gYXNzdW1lIHVuc3VwcG9ydGVkXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb3VudERvY3ModHhuLCBjYikge1xuICB2YXIgaW5kZXggPSB0eG4ub2JqZWN0U3RvcmUoRE9DX1NUT1JFKS5pbmRleCgnZGVsZXRlZE9yTG9jYWwnKTtcbiAgaW5kZXguY291bnQoSURCS2V5UmFuZ2Uub25seSgnMCcpKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNiKGUudGFyZ2V0LnJlc3VsdCk7XG4gIH07XG59XG5cbi8vIFRoaXMgdGFzayBxdWV1ZSBlbnN1cmVzIHRoYXQgSURCIG9wZW4gY2FsbHMgYXJlIGRvbmUgaW4gdGhlaXIgb3duIHRpY2tcblxudmFyIHJ1bm5pbmcgPSBmYWxzZTtcbnZhciBxdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiB0cnlDb2RlKGZ1biwgZXJyLCByZXMsIFBvdWNoREIpIHtcbiAgdHJ5IHtcbiAgICBmdW4oZXJyLCByZXMpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBTaG91bGRuJ3QgaGFwcGVuLCBidXQgaW4gc29tZSBvZGQgY2FzZXNcbiAgICAvLyBJbmRleGVkREIgaW1wbGVtZW50YXRpb25zIG1pZ2h0IHRocm93IGEgc3luY1xuICAgIC8vIGVycm9yLCBpbiB3aGljaCBjYXNlIHRoaXMgd2lsbCBhdCBsZWFzdCBsb2cgaXQuXG4gICAgUG91Y2hEQi5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlOZXh0KCkge1xuICBpZiAocnVubmluZyB8fCAhcXVldWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJ1bm5pbmcgPSB0cnVlO1xuICBxdWV1ZS5zaGlmdCgpKCk7XG59XG5cbmZ1bmN0aW9uIGVucXVldWVUYXNrKGFjdGlvbiwgY2FsbGJhY2ssIFBvdWNoREIpIHtcbiAgcXVldWUucHVzaChmdW5jdGlvbiBydW5BY3Rpb24oKSB7XG4gICAgYWN0aW9uKGZ1bmN0aW9uIHJ1bkNhbGxiYWNrKGVyciwgcmVzKSB7XG4gICAgICB0cnlDb2RlKGNhbGxiYWNrLCBlcnIsIHJlcywgUG91Y2hEQik7XG4gICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICBpbW1lZGlhdGUoZnVuY3Rpb24gcnVuTmV4dCgpIHtcbiAgICAgICAgYXBwbHlOZXh0KFBvdWNoREIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhcHBseU5leHQoKTtcbn1cblxuZnVuY3Rpb24gY2hhbmdlcyhvcHRzLCBhcGksIGRiTmFtZSwgaWRiKSB7XG4gIG9wdHMgPSBjbG9uZShvcHRzKTtcblxuICBpZiAob3B0cy5jb250aW51b3VzKSB7XG4gICAgdmFyIGlkID0gZGJOYW1lICsgJzonICsgdXVpZCgpO1xuICAgIGNoYW5nZXNIYW5kbGVyLmFkZExpc3RlbmVyKGRiTmFtZSwgaWQsIGFwaSwgb3B0cyk7XG4gICAgY2hhbmdlc0hhbmRsZXIubm90aWZ5KGRiTmFtZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VzSGFuZGxlci5yZW1vdmVMaXN0ZW5lcihkYk5hbWUsIGlkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIGRvY0lkcyA9IG9wdHMuZG9jX2lkcyAmJiBuZXcgRXhwb3J0ZWRTZXQob3B0cy5kb2NfaWRzKTtcblxuICBvcHRzLnNpbmNlID0gb3B0cy5zaW5jZSB8fCAwO1xuICB2YXIgbGFzdFNlcSA9IG9wdHMuc2luY2U7XG5cbiAgdmFyIGxpbWl0ID0gJ2xpbWl0JyBpbiBvcHRzID8gb3B0cy5saW1pdCA6IC0xO1xuICBpZiAobGltaXQgPT09IDApIHtcbiAgICBsaW1pdCA9IDE7IC8vIHBlciBDb3VjaERCIF9jaGFuZ2VzIHNwZWNcbiAgfVxuXG4gIHZhciByZXN1bHRzID0gW107XG4gIHZhciBudW1SZXN1bHRzID0gMDtcbiAgdmFyIGZpbHRlciA9IGZpbHRlckNoYW5nZShvcHRzKTtcbiAgdmFyIGRvY0lkc1RvTWV0YWRhdGEgPSBuZXcgRXhwb3J0ZWRNYXAoKTtcblxuICB2YXIgdHhuO1xuICB2YXIgYnlTZXFTdG9yZTtcbiAgdmFyIGRvY1N0b3JlO1xuICB2YXIgZG9jSWRSZXZJbmRleDtcblxuICBmdW5jdGlvbiBvbkJhdGNoKGJhdGNoS2V5cywgYmF0Y2hWYWx1ZXMsIGN1cnNvcikge1xuICAgIGlmICghY3Vyc29yIHx8ICFiYXRjaEtleXMubGVuZ3RoKSB7IC8vIGRvbmVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgd2lubmluZ0RvY3MgPSBuZXcgQXJyYXkoYmF0Y2hLZXlzLmxlbmd0aCk7XG4gICAgdmFyIG1ldGFkYXRhcyA9IG5ldyBBcnJheShiYXRjaEtleXMubGVuZ3RoKTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NNZXRhZGF0YUFuZFdpbm5pbmdEb2MobWV0YWRhdGEsIHdpbm5pbmdEb2MpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBvcHRzLnByb2Nlc3NDaGFuZ2Uod2lubmluZ0RvYywgbWV0YWRhdGEsIG9wdHMpO1xuICAgICAgbGFzdFNlcSA9IGNoYW5nZS5zZXEgPSBtZXRhZGF0YS5zZXE7XG5cbiAgICAgIHZhciBmaWx0ZXJlZCA9IGZpbHRlcihjaGFuZ2UpO1xuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJlZCA9PT0gJ29iamVjdCcpIHsgLy8gYW55dGhpbmcgYnV0IHRydWUvZmFsc2UgaW5kaWNhdGVzIGVycm9yXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChmaWx0ZXJlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmlsdGVyZWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgbnVtUmVzdWx0cysrO1xuICAgICAgaWYgKG9wdHMucmV0dXJuX2RvY3MpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNoYW5nZSk7XG4gICAgICB9XG4gICAgICAvLyBwcm9jZXNzIHRoZSBhdHRhY2htZW50IGltbWVkaWF0ZWx5XG4gICAgICAvLyBmb3IgdGhlIGJlbmVmaXQgb2YgbGl2ZSBsaXN0ZW5lcnNcbiAgICAgIGlmIChvcHRzLmF0dGFjaG1lbnRzICYmIG9wdHMuaW5jbHVkZV9kb2NzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIGZldGNoQXR0YWNobWVudHNJZk5lY2Vzc2FyeSh3aW5uaW5nRG9jLCBvcHRzLCB0eG4sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBvc3RQcm9jZXNzQXR0YWNobWVudHMoW2NoYW5nZV0sIG9wdHMuYmluYXJ5KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShjaGFuZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGFuZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmF0Y2hEb25lKCkge1xuICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gd2lubmluZ0RvY3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKG51bVJlc3VsdHMgPT09IGxpbWl0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdpbm5pbmdEb2MgPSB3aW5uaW5nRG9jc1tpXTtcbiAgICAgICAgaWYgKCF3aW5uaW5nRG9jKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbWV0YWRhdGFzW2ldO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHByb2Nlc3NNZXRhZGF0YUFuZFdpbm5pbmdEb2MobWV0YWRhdGEsIHdpbm5pbmdEb2MpKTtcbiAgICAgIH1cblxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoY2hhbmdlc1tpXSkge1xuICAgICAgICAgICAgb3B0cy5vbkNoYW5nZShjaGFuZ2VzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKG9wdHMuY29tcGxldGUpO1xuXG4gICAgICBpZiAobnVtUmVzdWx0cyAhPT0gbGltaXQpIHtcbiAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmV0Y2ggYWxsIG1ldGFkYXRhcy93aW5uaW5nZG9jcyBmcm9tIHRoaXMgYmF0Y2ggaW4gcGFyYWxsZWwsIHRoZW4gcHJvY2Vzc1xuICAgIC8vIHRoZW0gYWxsIG9ubHkgb25jZSBhbGwgZGF0YSBoYXMgYmVlbiBjb2xsZWN0ZWQuIFRoaXMgaXMgZG9uZSBpbiBwYXJhbGxlbFxuICAgIC8vIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBkb2luZyBpdCBvbmUtYXQtYS10aW1lLlxuICAgIHZhciBudW1Eb25lID0gMDtcbiAgICBiYXRjaFZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuICAgICAgdmFyIGRvYyA9IGRlY29kZURvYyh2YWx1ZSk7XG4gICAgICB2YXIgc2VxID0gYmF0Y2hLZXlzW2ldO1xuICAgICAgZmV0Y2hXaW5uaW5nRG9jQW5kTWV0YWRhdGEoZG9jLCBzZXEsIGZ1bmN0aW9uIChtZXRhZGF0YSwgd2lubmluZ0RvYykge1xuICAgICAgICBtZXRhZGF0YXNbaV0gPSBtZXRhZGF0YTtcbiAgICAgICAgd2lubmluZ0RvY3NbaV0gPSB3aW5uaW5nRG9jO1xuICAgICAgICBpZiAoKytudW1Eb25lID09PSBiYXRjaEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgb25CYXRjaERvbmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkdldE1ldGFkYXRhKGRvYywgc2VxLCBtZXRhZGF0YSwgY2IpIHtcbiAgICBpZiAobWV0YWRhdGEuc2VxICE9PSBzZXEpIHtcbiAgICAgIC8vIHNvbWUgb3RoZXIgc2VxIGlzIGxhdGVyXG4gICAgICByZXR1cm4gY2IoKTtcbiAgICB9XG5cbiAgICBpZiAobWV0YWRhdGEud2lubmluZ1JldiA9PT0gZG9jLl9yZXYpIHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHdpbm5pbmcgZG9jXG4gICAgICByZXR1cm4gY2IobWV0YWRhdGEsIGRvYyk7XG4gICAgfVxuXG4gICAgLy8gZmV0Y2ggd2lubmluZyBkb2MgaW4gc2VwYXJhdGUgcmVxdWVzdFxuICAgIHZhciBkb2NJZFJldiA9IGRvYy5faWQgKyAnOjonICsgbWV0YWRhdGEud2lubmluZ1JldjtcbiAgICB2YXIgcmVxID0gZG9jSWRSZXZJbmRleC5nZXQoZG9jSWRSZXYpO1xuICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgY2IobWV0YWRhdGEsIGRlY29kZURvYyhlLnRhcmdldC5yZXN1bHQpKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hXaW5uaW5nRG9jQW5kTWV0YWRhdGEoZG9jLCBzZXEsIGNiKSB7XG4gICAgaWYgKGRvY0lkcyAmJiAhZG9jSWRzLmhhcyhkb2MuX2lkKSkge1xuICAgICAgcmV0dXJuIGNiKCk7XG4gICAgfVxuXG4gICAgdmFyIG1ldGFkYXRhID0gZG9jSWRzVG9NZXRhZGF0YS5nZXQoZG9jLl9pZCk7XG4gICAgaWYgKG1ldGFkYXRhKSB7IC8vIGNhY2hlZFxuICAgICAgcmV0dXJuIG9uR2V0TWV0YWRhdGEoZG9jLCBzZXEsIG1ldGFkYXRhLCBjYik7XG4gICAgfVxuICAgIC8vIG1ldGFkYXRhIG5vdCBjYWNoZWQsIGhhdmUgdG8gZ28gZmV0Y2ggaXRcbiAgICBkb2NTdG9yZS5nZXQoZG9jLl9pZCkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1ldGFkYXRhID0gZGVjb2RlTWV0YWRhdGEoZS50YXJnZXQucmVzdWx0KTtcbiAgICAgIGRvY0lkc1RvTWV0YWRhdGEuc2V0KGRvYy5faWQsIG1ldGFkYXRhKTtcbiAgICAgIG9uR2V0TWV0YWRhdGEoZG9jLCBzZXEsIG1ldGFkYXRhLCBjYik7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBvcHRzLmNvbXBsZXRlKG51bGwsIHtcbiAgICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgICBsYXN0X3NlcTogbGFzdFNlcVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25UeG5Db21wbGV0ZSgpIHtcbiAgICBpZiAoIW9wdHMuY29udGludW91cyAmJiBvcHRzLmF0dGFjaG1lbnRzKSB7XG4gICAgICAvLyBjYW5ub3QgZ3VhcmFudGVlIHRoYXQgcG9zdFByb2Nlc3Npbmcgd2FzIGFscmVhZHkgZG9uZSxcbiAgICAgIC8vIHNvIGRvIGl0IGFnYWluXG4gICAgICBwb3N0UHJvY2Vzc0F0dGFjaG1lbnRzKHJlc3VsdHMpLnRoZW4oZmluaXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmluaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG9iamVjdFN0b3JlcyA9IFtET0NfU1RPUkUsIEJZX1NFUV9TVE9SRV07XG4gIGlmIChvcHRzLmF0dGFjaG1lbnRzKSB7XG4gICAgb2JqZWN0U3RvcmVzLnB1c2goQVRUQUNIX1NUT1JFKTtcbiAgfVxuICB2YXIgdHhuUmVzdWx0ID0gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgb2JqZWN0U3RvcmVzLCAncmVhZG9ubHknKTtcbiAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgIHJldHVybiBvcHRzLmNvbXBsZXRlKHR4blJlc3VsdC5lcnJvcik7XG4gIH1cbiAgdHhuID0gdHhuUmVzdWx0LnR4bjtcbiAgdHhuLm9uYWJvcnQgPSBpZGJFcnJvcihvcHRzLmNvbXBsZXRlKTtcbiAgdHhuLm9uY29tcGxldGUgPSBvblR4bkNvbXBsZXRlO1xuXG4gIGJ5U2VxU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQllfU0VRX1NUT1JFKTtcbiAgZG9jU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoRE9DX1NUT1JFKTtcbiAgZG9jSWRSZXZJbmRleCA9IGJ5U2VxU3RvcmUuaW5kZXgoJ19kb2NfaWRfcmV2Jyk7XG5cbiAgdmFyIGtleVJhbmdlID0gKG9wdHMuc2luY2UgJiYgIW9wdHMuZGVzY2VuZGluZykgP1xuICAgIElEQktleVJhbmdlLmxvd2VyQm91bmQob3B0cy5zaW5jZSwgdHJ1ZSkgOiBudWxsO1xuXG4gIHJ1bkJhdGNoZWRDdXJzb3IoYnlTZXFTdG9yZSwga2V5UmFuZ2UsIG9wdHMuZGVzY2VuZGluZywgbGltaXQsIG9uQmF0Y2gpO1xufVxuXG52YXIgY2FjaGVkREJzID0gbmV3IEV4cG9ydGVkTWFwKCk7XG52YXIgYmxvYlN1cHBvcnRQcm9taXNlO1xudmFyIG9wZW5SZXFMaXN0ID0gbmV3IEV4cG9ydGVkTWFwKCk7XG5cbmZ1bmN0aW9uIElkYlBvdWNoKG9wdHMsIGNhbGxiYWNrKSB7XG4gIHZhciBhcGkgPSB0aGlzO1xuXG4gIGVucXVldWVUYXNrKGZ1bmN0aW9uICh0aGlzQ2FsbGJhY2spIHtcbiAgICBpbml0KGFwaSwgb3B0cywgdGhpc0NhbGxiYWNrKTtcbiAgfSwgY2FsbGJhY2ssIGFwaS5jb25zdHJ1Y3Rvcik7XG59XG5cbmZ1bmN0aW9uIGluaXQoYXBpLCBvcHRzLCBjYWxsYmFjaykge1xuXG4gIHZhciBkYk5hbWUgPSBvcHRzLm5hbWU7XG5cbiAgdmFyIGlkYiA9IG51bGw7XG4gIGFwaS5fbWV0YSA9IG51bGw7XG5cbiAgLy8gY2FsbGVkIHdoZW4gY3JlYXRpbmcgYSBmcmVzaCBuZXcgZGF0YWJhc2VcbiAgZnVuY3Rpb24gY3JlYXRlU2NoZW1hKGRiKSB7XG4gICAgdmFyIGRvY1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoRE9DX1NUT1JFLCB7a2V5UGF0aCA6ICdpZCd9KTtcbiAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShCWV9TRVFfU1RPUkUsIHthdXRvSW5jcmVtZW50OiB0cnVlfSlcbiAgICAgIC5jcmVhdGVJbmRleCgnX2RvY19pZF9yZXYnLCAnX2RvY19pZF9yZXYnLCB7dW5pcXVlOiB0cnVlfSk7XG4gICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoQVRUQUNIX1NUT1JFLCB7a2V5UGF0aDogJ2RpZ2VzdCd9KTtcbiAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShNRVRBX1NUT1JFLCB7a2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogZmFsc2V9KTtcbiAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShERVRFQ1RfQkxPQl9TVVBQT1JUX1NUT1JFKTtcblxuICAgIC8vIGFkZGVkIGluIHYyXG4gICAgZG9jU3RvcmUuY3JlYXRlSW5kZXgoJ2RlbGV0ZWRPckxvY2FsJywgJ2RlbGV0ZWRPckxvY2FsJywge3VuaXF1ZSA6IGZhbHNlfSk7XG5cbiAgICAvLyBhZGRlZCBpbiB2M1xuICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKExPQ0FMX1NUT1JFLCB7a2V5UGF0aDogJ19pZCd9KTtcblxuICAgIC8vIGFkZGVkIGluIHY0XG4gICAgdmFyIGF0dEFuZFNlcVN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoQVRUQUNIX0FORF9TRVFfU1RPUkUsXG4gICAgICB7YXV0b0luY3JlbWVudDogdHJ1ZX0pO1xuICAgIGF0dEFuZFNlcVN0b3JlLmNyZWF0ZUluZGV4KCdzZXEnLCAnc2VxJyk7XG4gICAgYXR0QW5kU2VxU3RvcmUuY3JlYXRlSW5kZXgoJ2RpZ2VzdFNlcScsICdkaWdlc3RTZXEnLCB7dW5pcXVlOiB0cnVlfSk7XG4gIH1cblxuICAvLyBtaWdyYXRpb24gdG8gdmVyc2lvbiAyXG4gIC8vIHVuZm9ydHVuYXRlbHkgXCJkZWxldGVkT3JMb2NhbFwiIGlzIGEgbWlzbm9tZXIgbm93IHRoYXQgd2Ugbm8gbG9uZ2VyXG4gIC8vIHN0b3JlIGxvY2FsIGRvY3MgaW4gdGhlIG1haW4gZG9jLXN0b3JlLCBidXQgd2hhZGR5YWdvbm5hZG9cbiAgZnVuY3Rpb24gYWRkRGVsZXRlZE9yTG9jYWxJbmRleCh0eG4sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRvY1N0b3JlID0gdHhuLm9iamVjdFN0b3JlKERPQ19TVE9SRSk7XG4gICAgZG9jU3RvcmUuY3JlYXRlSW5kZXgoJ2RlbGV0ZWRPckxvY2FsJywgJ2RlbGV0ZWRPckxvY2FsJywge3VuaXF1ZSA6IGZhbHNlfSk7XG5cbiAgICBkb2NTdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICB2YXIgZGVsZXRlZCA9IGlzRGVsZXRlZChtZXRhZGF0YSk7XG4gICAgICAgIG1ldGFkYXRhLmRlbGV0ZWRPckxvY2FsID0gZGVsZXRlZCA/IFwiMVwiIDogXCIwXCI7XG4gICAgICAgIGRvY1N0b3JlLnB1dChtZXRhZGF0YSk7XG4gICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWlncmF0aW9uIHRvIHZlcnNpb24gMyAocGFydCAxKVxuICBmdW5jdGlvbiBjcmVhdGVMb2NhbFN0b3JlU2NoZW1hKGRiKSB7XG4gICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoTE9DQUxfU1RPUkUsIHtrZXlQYXRoOiAnX2lkJ30pXG4gICAgICAuY3JlYXRlSW5kZXgoJ19kb2NfaWRfcmV2JywgJ19kb2NfaWRfcmV2Jywge3VuaXF1ZTogdHJ1ZX0pO1xuICB9XG5cbiAgLy8gbWlncmF0aW9uIHRvIHZlcnNpb24gMyAocGFydCAyKVxuICBmdW5jdGlvbiBtaWdyYXRlTG9jYWxTdG9yZSh0eG4sIGNiKSB7XG4gICAgdmFyIGxvY2FsU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoTE9DQUxfU1RPUkUpO1xuICAgIHZhciBkb2NTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShET0NfU1RPUkUpO1xuICAgIHZhciBzZXFTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShCWV9TRVFfU1RPUkUpO1xuXG4gICAgdmFyIGN1cnNvciA9IGRvY1N0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICB2YXIgZG9jSWQgPSBtZXRhZGF0YS5pZDtcbiAgICAgICAgdmFyIGxvY2FsID0gaXNMb2NhbElkKGRvY0lkKTtcbiAgICAgICAgdmFyIHJldiQkMSA9IHdpbm5pbmdSZXYobWV0YWRhdGEpO1xuICAgICAgICBpZiAobG9jYWwpIHtcbiAgICAgICAgICB2YXIgZG9jSWRSZXYgPSBkb2NJZCArIFwiOjpcIiArIHJldiQkMTtcbiAgICAgICAgICAvLyByZW1vdmUgYWxsIHNlcSBlbnRyaWVzXG4gICAgICAgICAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoaXMgZG9jSWRcbiAgICAgICAgICB2YXIgc3RhcnQgPSBkb2NJZCArIFwiOjpcIjtcbiAgICAgICAgICB2YXIgZW5kID0gZG9jSWQgKyBcIjo6flwiO1xuICAgICAgICAgIHZhciBpbmRleCA9IHNlcVN0b3JlLmluZGV4KCdfZG9jX2lkX3JldicpO1xuICAgICAgICAgIHZhciByYW5nZSA9IElEQktleVJhbmdlLmJvdW5kKHN0YXJ0LCBlbmQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgdmFyIHNlcUN1cnNvciA9IGluZGV4Lm9wZW5DdXJzb3IocmFuZ2UpO1xuICAgICAgICAgIHNlcUN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2VxQ3Vyc29yID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgaWYgKCFzZXFDdXJzb3IpIHtcbiAgICAgICAgICAgICAgLy8gZG9uZVxuICAgICAgICAgICAgICBkb2NTdG9yZS5kZWxldGUoY3Vyc29yLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gc2VxQ3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZGF0YS5fZG9jX2lkX3JldiA9PT0gZG9jSWRSZXYpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JlLnB1dChkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXFTdG9yZS5kZWxldGUoc2VxQ3Vyc29yLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICBzZXFDdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNiKSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1pZ3JhdGlvbiB0byB2ZXJzaW9uIDQgKHBhcnQgMSlcbiAgZnVuY3Rpb24gYWRkQXR0YWNoQW5kU2VxU3RvcmUoZGIpIHtcbiAgICB2YXIgYXR0QW5kU2VxU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShBVFRBQ0hfQU5EX1NFUV9TVE9SRSxcbiAgICAgIHthdXRvSW5jcmVtZW50OiB0cnVlfSk7XG4gICAgYXR0QW5kU2VxU3RvcmUuY3JlYXRlSW5kZXgoJ3NlcScsICdzZXEnKTtcbiAgICBhdHRBbmRTZXFTdG9yZS5jcmVhdGVJbmRleCgnZGlnZXN0U2VxJywgJ2RpZ2VzdFNlcScsIHt1bmlxdWU6IHRydWV9KTtcbiAgfVxuXG4gIC8vIG1pZ3JhdGlvbiB0byB2ZXJzaW9uIDQgKHBhcnQgMilcbiAgZnVuY3Rpb24gbWlncmF0ZUF0dHNBbmRTZXFzKHR4biwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VxU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQllfU0VRX1NUT1JFKTtcbiAgICB2YXIgYXR0U3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQVRUQUNIX1NUT1JFKTtcbiAgICB2YXIgYXR0QW5kU2VxU3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoQVRUQUNIX0FORF9TRVFfU1RPUkUpO1xuXG4gICAgLy8gbmVlZCB0byBhY3R1YWxseSBwb3B1bGF0ZSB0aGUgdGFibGUuIHRoaXMgaXMgdGhlIGV4cGVuc2l2ZSBwYXJ0LFxuICAgIC8vIHNvIGFzIGFuIG9wdGltaXphdGlvbiwgY2hlY2sgZmlyc3QgdGhhdCB0aGlzIGRhdGFiYXNlIGV2ZW5cbiAgICAvLyBjb250YWlucyBhdHRhY2htZW50c1xuICAgIHZhciByZXEgPSBhdHRTdG9yZS5jb3VudCgpO1xuICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGNvdW50ID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgaWYgKCFjb3VudCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTsgLy8gZG9uZVxuICAgICAgfVxuXG4gICAgICBzZXFTdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTsgLy8gZG9uZVxuICAgICAgICB9XG4gICAgICAgIHZhciBkb2MgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgIHZhciBzZXEgPSBjdXJzb3IucHJpbWFyeUtleTtcbiAgICAgICAgdmFyIGF0dHMgPSBPYmplY3Qua2V5cyhkb2MuX2F0dGFjaG1lbnRzIHx8IHt9KTtcbiAgICAgICAgdmFyIGRpZ2VzdE1hcCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGF0dHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYXR0ID0gZG9jLl9hdHRhY2htZW50c1thdHRzW2pdXTtcbiAgICAgICAgICBkaWdlc3RNYXBbYXR0LmRpZ2VzdF0gPSB0cnVlOyAvLyB1bmlxIGRpZ2VzdHMsIGp1c3QgaW4gY2FzZVxuICAgICAgICB9XG4gICAgICAgIHZhciBkaWdlc3RzID0gT2JqZWN0LmtleXMoZGlnZXN0TWFwKTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGRpZ2VzdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgZGlnZXN0ID0gZGlnZXN0c1tqXTtcbiAgICAgICAgICBhdHRBbmRTZXFTdG9yZS5wdXQoe1xuICAgICAgICAgICAgc2VxOiBzZXEsXG4gICAgICAgICAgICBkaWdlc3RTZXE6IGRpZ2VzdCArICc6OicgKyBzZXFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1pZ3JhdGlvbiB0byB2ZXJzaW9uIDVcbiAgLy8gSW5zdGVhZCBvZiByZWx5aW5nIG9uIG9uLXRoZS1mbHkgbWlncmF0aW9uIG9mIG1ldGFkYXRhLFxuICAvLyB0aGlzIGJyaW5ncyB0aGUgZG9jLXN0b3JlIHRvIGl0cyBtb2Rlcm4gZm9ybTpcbiAgLy8gLSBtZXRhZGF0YS53aW5uaW5ncmV2XG4gIC8vIC0gbWV0YWRhdGEuc2VxXG4gIC8vIC0gc3RyaW5naWZ5IHRoZSBtZXRhZGF0YSB3aGVuIHN0b3JpbmcgaXRcbiAgZnVuY3Rpb24gbWlncmF0ZU1ldGFkYXRhKHR4bikge1xuXG4gICAgZnVuY3Rpb24gZGVjb2RlTWV0YWRhdGFDb21wYXQoc3RvcmVkT2JqZWN0KSB7XG4gICAgICBpZiAoIXN0b3JlZE9iamVjdC5kYXRhKSB7XG4gICAgICAgIC8vIG9sZCBmb3JtYXQsIHdoZW4gd2UgZGlkbid0IHN0b3JlIGl0IHN0cmluZ2lmaWVkXG4gICAgICAgIHN0b3JlZE9iamVjdC5kZWxldGVkID0gc3RvcmVkT2JqZWN0LmRlbGV0ZWRPckxvY2FsID09PSAnMSc7XG4gICAgICAgIHJldHVybiBzdG9yZWRPYmplY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVjb2RlTWV0YWRhdGEoc3RvcmVkT2JqZWN0KTtcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgdGhhdCBldmVyeSBtZXRhZGF0YSBoYXMgYSB3aW5uaW5nUmV2IGFuZCBzZXEsXG4gICAgLy8gd2hpY2ggd2FzIHByZXZpb3VzbHkgY3JlYXRlZCBvbi10aGUtZmx5IGJ1dCBiZXR0ZXIgdG8gbWlncmF0ZVxuICAgIHZhciBieVNlcVN0b3JlID0gdHhuLm9iamVjdFN0b3JlKEJZX1NFUV9TVE9SRSk7XG4gICAgdmFyIGRvY1N0b3JlID0gdHhuLm9iamVjdFN0b3JlKERPQ19TVE9SRSk7XG4gICAgdmFyIGN1cnNvciA9IGRvY1N0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBjdXJzb3IgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICByZXR1cm47IC8vIGRvbmVcbiAgICAgIH1cbiAgICAgIHZhciBtZXRhZGF0YSA9IGRlY29kZU1ldGFkYXRhQ29tcGF0KGN1cnNvci52YWx1ZSk7XG5cbiAgICAgIG1ldGFkYXRhLndpbm5pbmdSZXYgPSBtZXRhZGF0YS53aW5uaW5nUmV2IHx8XG4gICAgICAgIHdpbm5pbmdSZXYobWV0YWRhdGEpO1xuXG4gICAgICBmdW5jdGlvbiBmZXRjaE1ldGFkYXRhU2VxKCkge1xuICAgICAgICAvLyBtZXRhZGF0YS5zZXEgd2FzIGFkZGVkIHBvc3QtMy4yLjAsIHNvIGlmIGl0J3MgbWlzc2luZyxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBmZXRjaCBpdCBtYW51YWxseVxuICAgICAgICB2YXIgc3RhcnQgPSBtZXRhZGF0YS5pZCArICc6Oic7XG4gICAgICAgIHZhciBlbmQgPSBtZXRhZGF0YS5pZCArICc6OlxcdWZmZmYnO1xuICAgICAgICB2YXIgcmVxID0gYnlTZXFTdG9yZS5pbmRleCgnX2RvY19pZF9yZXYnKS5vcGVuQ3Vyc29yKFxuICAgICAgICAgIElEQktleVJhbmdlLmJvdW5kKHN0YXJ0LCBlbmQpKTtcblxuICAgICAgICB2YXIgbWV0YWRhdGFTZXEgPSAwO1xuICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5zZXEgPSBtZXRhZGF0YVNlcTtcbiAgICAgICAgICAgIHJldHVybiBvbkdldE1ldGFkYXRhU2VxKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzZXEgPSBjdXJzb3IucHJpbWFyeUtleTtcbiAgICAgICAgICBpZiAoc2VxID4gbWV0YWRhdGFTZXEpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhU2VxID0gc2VxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25HZXRNZXRhZGF0YVNlcSgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhVG9TdG9yZSA9IGVuY29kZU1ldGFkYXRhKG1ldGFkYXRhLFxuICAgICAgICAgIG1ldGFkYXRhLndpbm5pbmdSZXYsIG1ldGFkYXRhLmRlbGV0ZWQpO1xuXG4gICAgICAgIHZhciByZXEgPSBkb2NTdG9yZS5wdXQobWV0YWRhdGFUb1N0b3JlKTtcbiAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1ldGFkYXRhLnNlcSkge1xuICAgICAgICByZXR1cm4gb25HZXRNZXRhZGF0YVNlcSgpO1xuICAgICAgfVxuXG4gICAgICBmZXRjaE1ldGFkYXRhU2VxKCk7XG4gICAgfTtcblxuICB9XG5cbiAgYXBpLl9yZW1vdGUgPSBmYWxzZTtcbiAgYXBpLnR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdpZGInO1xuICB9O1xuXG4gIGFwaS5faWQgPSB0b1Byb21pc2UoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgYXBpLl9tZXRhLmluc3RhbmNlSWQpO1xuICB9KTtcblxuICBhcGkuX2J1bGtEb2NzID0gZnVuY3Rpb24gaWRiX2J1bGtEb2NzKHJlcSwgcmVxT3B0cywgY2FsbGJhY2spIHtcbiAgICBpZGJCdWxrRG9jcyhvcHRzLCByZXEsIHJlcU9wdHMsIGFwaSwgaWRiLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgLy8gRmlyc3Qgd2UgbG9vayB1cCB0aGUgbWV0YWRhdGEgaW4gdGhlIGlkcyBkYXRhYmFzZSwgdGhlbiB3ZSBmZXRjaCB0aGVcbiAgLy8gY3VycmVudCByZXZpc2lvbihzKSBmcm9tIHRoZSBieSBzZXF1ZW5jZSBzdG9yZVxuICBhcGkuX2dldCA9IGZ1bmN0aW9uIGlkYl9nZXQoaWQsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRvYztcbiAgICB2YXIgbWV0YWRhdGE7XG4gICAgdmFyIGVycjtcbiAgICB2YXIgdHhuID0gb3B0cy5jdHg7XG4gICAgaWYgKCF0eG4pIHtcbiAgICAgIHZhciB0eG5SZXN1bHQgPSBvcGVuVHJhbnNhY3Rpb25TYWZlbHkoaWRiLFxuICAgICAgICBbRE9DX1NUT1JFLCBCWV9TRVFfU1RPUkUsIEFUVEFDSF9TVE9SRV0sICdyZWFkb25seScpO1xuICAgICAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sodHhuUmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICAgIHR4biA9IHR4blJlc3VsdC50eG47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgY2FsbGJhY2soZXJyLCB7ZG9jOiBkb2MsIG1ldGFkYXRhOiBtZXRhZGF0YSwgY3R4OiB0eG59KTtcbiAgICB9XG5cbiAgICB0eG4ub2JqZWN0U3RvcmUoRE9DX1NUT1JFKS5nZXQoaWQpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBtZXRhZGF0YSA9IGRlY29kZU1ldGFkYXRhKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAvLyB3ZSBjYW4gZGV0ZXJtaW5lIHRoZSByZXN1bHQgaGVyZSBpZjpcbiAgICAgIC8vIDEuIHRoZXJlIGlzIG5vIHN1Y2ggZG9jdW1lbnRcbiAgICAgIC8vIDIuIHRoZSBkb2N1bWVudCBpcyBkZWxldGVkIGFuZCB3ZSBkb24ndCBhc2sgYWJvdXQgc3BlY2lmaWMgcmV2XG4gICAgICAvLyBXaGVuIHdlIGFzayB3aXRoIG9wdHMucmV2IHdlIGV4cGVjdCB0aGUgYW5zd2VyIHRvIGJlIGVpdGhlclxuICAgICAgLy8gZG9jIChwb3NzaWJseSB3aXRoIF9kZWxldGVkPXRydWUpIG9yIG1pc3NpbmcgZXJyb3JcbiAgICAgIGlmICghbWV0YWRhdGEpIHtcbiAgICAgICAgZXJyID0gY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MsICdtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybiBmaW5pc2goKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJldiQkMTtcbiAgICAgIGlmICghb3B0cy5yZXYpIHtcbiAgICAgICAgcmV2JCQxID0gbWV0YWRhdGEud2lubmluZ1JldjtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBpc0RlbGV0ZWQobWV0YWRhdGEpO1xuICAgICAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICAgIGVyciA9IGNyZWF0ZUVycm9yKE1JU1NJTkdfRE9DLCBcImRlbGV0ZWRcIik7XG4gICAgICAgICAgcmV0dXJuIGZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXYkJDEgPSBvcHRzLmxhdGVzdCA/IGxhdGVzdChvcHRzLnJldiwgbWV0YWRhdGEpIDogb3B0cy5yZXY7XG4gICAgICB9XG5cbiAgICAgIHZhciBvYmplY3RTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShCWV9TRVFfU1RPUkUpO1xuICAgICAgdmFyIGtleSA9IG1ldGFkYXRhLmlkICsgJzo6JyArIHJldiQkMTtcblxuICAgICAgb2JqZWN0U3RvcmUuaW5kZXgoJ19kb2NfaWRfcmV2JykuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZG9jID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICBpZiAoZG9jKSB7XG4gICAgICAgICAgZG9jID0gZGVjb2RlRG9jKGRvYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICBlcnIgPSBjcmVhdGVFcnJvcihNSVNTSU5HX0RPQywgJ21pc3NpbmcnKTtcbiAgICAgICAgICByZXR1cm4gZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluaXNoKCk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgYXBpLl9nZXRBdHRhY2htZW50ID0gZnVuY3Rpb24gKGRvY0lkLCBhdHRhY2hJZCwgYXR0YWNobWVudCwgb3B0cywgY2FsbGJhY2spIHtcbiAgICB2YXIgdHhuO1xuICAgIGlmIChvcHRzLmN0eCkge1xuICAgICAgdHhuID0gb3B0cy5jdHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0eG5SZXN1bHQgPSBvcGVuVHJhbnNhY3Rpb25TYWZlbHkoaWRiLFxuICAgICAgICBbRE9DX1NUT1JFLCBCWV9TRVFfU1RPUkUsIEFUVEFDSF9TVE9SRV0sICdyZWFkb25seScpO1xuICAgICAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sodHhuUmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICAgIHR4biA9IHR4blJlc3VsdC50eG47XG4gICAgfVxuICAgIHZhciBkaWdlc3QgPSBhdHRhY2htZW50LmRpZ2VzdDtcbiAgICB2YXIgdHlwZSA9IGF0dGFjaG1lbnQuY29udGVudF90eXBlO1xuXG4gICAgdHhuLm9iamVjdFN0b3JlKEFUVEFDSF9TVE9SRSkuZ2V0KGRpZ2VzdCkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBib2R5ID0gZS50YXJnZXQucmVzdWx0LmJvZHk7XG4gICAgICByZWFkQmxvYkRhdGEoYm9keSwgdHlwZSwgb3B0cy5iaW5hcnksIGZ1bmN0aW9uIChibG9iRGF0YSkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBibG9iRGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIGFwaS5faW5mbyA9IGZ1bmN0aW9uIGlkYl9pbmZvKGNhbGxiYWNrKSB7XG4gICAgdmFyIHVwZGF0ZVNlcTtcbiAgICB2YXIgZG9jQ291bnQ7XG5cbiAgICB2YXIgdHhuUmVzdWx0ID0gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgW01FVEFfU1RPUkUsIEJZX1NFUV9TVE9SRV0sICdyZWFkb25seScpO1xuICAgIGlmICh0eG5SZXN1bHQuZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0eG5SZXN1bHQuZXJyb3IpO1xuICAgIH1cbiAgICB2YXIgdHhuID0gdHhuUmVzdWx0LnR4bjtcbiAgICB0eG4ub2JqZWN0U3RvcmUoTUVUQV9TVE9SRSkuZ2V0KE1FVEFfU1RPUkUpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBkb2NDb3VudCA9IGUudGFyZ2V0LnJlc3VsdC5kb2NDb3VudDtcbiAgICB9O1xuICAgIHR4bi5vYmplY3RTdG9yZShCWV9TRVFfU1RPUkUpLm9wZW5DdXJzb3IobnVsbCwgJ3ByZXYnKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGN1cnNvciA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgIHVwZGF0ZVNlcSA9IGN1cnNvciA/IGN1cnNvci5rZXkgOiAwO1xuICAgIH07XG5cbiAgICB0eG4ub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgZG9jX2NvdW50OiBkb2NDb3VudCxcbiAgICAgICAgdXBkYXRlX3NlcTogdXBkYXRlU2VxLFxuICAgICAgICAvLyBmb3IgZGVidWdnaW5nXG4gICAgICAgIGlkYl9hdHRhY2htZW50X2Zvcm1hdDogKGFwaS5fbWV0YS5ibG9iU3VwcG9ydCA/ICdiaW5hcnknIDogJ2Jhc2U2NCcpXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIGFwaS5fYWxsRG9jcyA9IGZ1bmN0aW9uIGlkYl9hbGxEb2NzKG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWRiQWxsRG9jcyhvcHRzLCBpZGIsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBhcGkuX2NoYW5nZXMgPSBmdW5jdGlvbiBpZGJDaGFuZ2VzKG9wdHMpIHtcbiAgICByZXR1cm4gY2hhbmdlcyhvcHRzLCBhcGksIGRiTmFtZSwgaWRiKTtcbiAgfTtcblxuICBhcGkuX2Nsb3NlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9JbmRleGVkREIvSURCRGF0YWJhc2UjY2xvc2VcbiAgICAvLyBcIlJldHVybnMgaW1tZWRpYXRlbHkgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiBpbiBhIHNlcGFyYXRlIHRocmVhZC4uLlwiXG4gICAgaWRiLmNsb3NlKCk7XG4gICAgY2FjaGVkREJzLmRlbGV0ZShkYk5hbWUpO1xuICAgIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgYXBpLl9nZXRSZXZpc2lvblRyZWUgPSBmdW5jdGlvbiAoZG9jSWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHR4blJlc3VsdCA9IG9wZW5UcmFuc2FjdGlvblNhZmVseShpZGIsIFtET0NfU1RPUkVdLCAncmVhZG9ubHknKTtcbiAgICBpZiAodHhuUmVzdWx0LmVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodHhuUmVzdWx0LmVycm9yKTtcbiAgICB9XG4gICAgdmFyIHR4biA9IHR4blJlc3VsdC50eG47XG4gICAgdmFyIHJlcSA9IHR4bi5vYmplY3RTdG9yZShET0NfU1RPUkUpLmdldChkb2NJZCk7XG4gICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIGRvYyA9IGRlY29kZU1ldGFkYXRhKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgY2FsbGJhY2soY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGRvYy5yZXZfdHJlZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgcmV2aXNpb25zIG9mIGRvY3VtZW50IGRvY0lkXG4gIC8vIHdoaWNoIGFyZSBsaXN0ZWQgaW4gcmV2cyBhbmQgc2V0cyB0aGlzIGRvY3VtZW50XG4gIC8vIHJldmlzaW9uIHRvIHRvIHJldl90cmVlXG4gIGFwaS5fZG9Db21wYWN0aW9uID0gZnVuY3Rpb24gKGRvY0lkLCByZXZzLCBjYWxsYmFjaykge1xuICAgIHZhciBzdG9yZXMgPSBbXG4gICAgICBET0NfU1RPUkUsXG4gICAgICBCWV9TRVFfU1RPUkUsXG4gICAgICBBVFRBQ0hfU1RPUkUsXG4gICAgICBBVFRBQ0hfQU5EX1NFUV9TVE9SRVxuICAgIF07XG4gICAgdmFyIHR4blJlc3VsdCA9IG9wZW5UcmFuc2FjdGlvblNhZmVseShpZGIsIHN0b3JlcywgJ3JlYWR3cml0ZScpO1xuICAgIGlmICh0eG5SZXN1bHQuZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0eG5SZXN1bHQuZXJyb3IpO1xuICAgIH1cbiAgICB2YXIgdHhuID0gdHhuUmVzdWx0LnR4bjtcblxuICAgIHZhciBkb2NTdG9yZSA9IHR4bi5vYmplY3RTdG9yZShET0NfU1RPUkUpO1xuXG4gICAgZG9jU3RvcmUuZ2V0KGRvY0lkKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBtZXRhZGF0YSA9IGRlY29kZU1ldGFkYXRhKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgdHJhdmVyc2VSZXZUcmVlKG1ldGFkYXRhLnJldl90cmVlLCBmdW5jdGlvbiAoaXNMZWFmLCBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZIYXNoLCBjdHgsIG9wdHMpIHtcbiAgICAgICAgdmFyIHJldiQkMSA9IHBvcyArICctJyArIHJldkhhc2g7XG4gICAgICAgIGlmIChyZXZzLmluZGV4T2YocmV2JCQxKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcHRzLnN0YXR1cyA9ICdtaXNzaW5nJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb21wYWN0UmV2cyhyZXZzLCBkb2NJZCwgdHhuKTtcbiAgICAgIHZhciB3aW5uaW5nUmV2JCQxID0gbWV0YWRhdGEud2lubmluZ1JldjtcbiAgICAgIHZhciBkZWxldGVkID0gbWV0YWRhdGEuZGVsZXRlZDtcbiAgICAgIHR4bi5vYmplY3RTdG9yZShET0NfU1RPUkUpLnB1dChcbiAgICAgICAgZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEsIHdpbm5pbmdSZXYkJDEsIGRlbGV0ZWQpKTtcbiAgICB9O1xuICAgIHR4bi5vbmFib3J0ID0gaWRiRXJyb3IoY2FsbGJhY2spO1xuICAgIHR4bi5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9O1xuICB9O1xuXG5cbiAgYXBpLl9nZXRMb2NhbCA9IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2spIHtcbiAgICB2YXIgdHhuUmVzdWx0ID0gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgW0xPQ0FMX1NUT1JFXSwgJ3JlYWRvbmx5Jyk7XG4gICAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHR4blJlc3VsdC5lcnJvcik7XG4gICAgfVxuICAgIHZhciB0eCA9IHR4blJlc3VsdC50eG47XG4gICAgdmFyIHJlcSA9IHR4Lm9iamVjdFN0b3JlKExPQ0FMX1NUT1JFKS5nZXQoaWQpO1xuXG4gICAgcmVxLm9uZXJyb3IgPSBpZGJFcnJvcihjYWxsYmFjayk7XG4gICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgZG9jID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgY2FsbGJhY2soY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBkb2NbJ19kb2NfaWRfcmV2J107IC8vIGZvciBiYWNrd2FyZHMgY29tcGF0XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGRvYyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBhcGkuX3B1dExvY2FsID0gZnVuY3Rpb24gKGRvYywgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG4gICAgZGVsZXRlIGRvYy5fcmV2aXNpb25zOyAvLyBpZ25vcmUgdGhpcywgdHJ1c3QgdGhlIHJldlxuICAgIHZhciBvbGRSZXYgPSBkb2MuX3JldjtcbiAgICB2YXIgaWQgPSBkb2MuX2lkO1xuICAgIGlmICghb2xkUmV2KSB7XG4gICAgICBkb2MuX3JldiA9ICcwLTEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2MuX3JldiA9ICcwLScgKyAocGFyc2VJbnQob2xkUmV2LnNwbGl0KCctJylbMV0sIDEwKSArIDEpO1xuICAgIH1cblxuICAgIHZhciB0eCA9IG9wdHMuY3R4O1xuICAgIHZhciByZXQ7XG4gICAgaWYgKCF0eCkge1xuICAgICAgdmFyIHR4blJlc3VsdCA9IG9wZW5UcmFuc2FjdGlvblNhZmVseShpZGIsIFtMT0NBTF9TVE9SRV0sICdyZWFkd3JpdGUnKTtcbiAgICAgIGlmICh0eG5SZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHR4blJlc3VsdC5lcnJvcik7XG4gICAgICB9XG4gICAgICB0eCA9IHR4blJlc3VsdC50eG47XG4gICAgICB0eC5vbmVycm9yID0gaWRiRXJyb3IoY2FsbGJhY2spO1xuICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJldCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG9TdG9yZSA9IHR4Lm9iamVjdFN0b3JlKExPQ0FMX1NUT1JFKTtcbiAgICB2YXIgcmVxO1xuICAgIGlmIChvbGRSZXYpIHtcbiAgICAgIHJlcSA9IG9TdG9yZS5nZXQoaWQpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBvbGREb2MgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIGlmICghb2xkRG9jIHx8IG9sZERvYy5fcmV2ICE9PSBvbGRSZXYpIHtcbiAgICAgICAgICBjYWxsYmFjayhjcmVhdGVFcnJvcihSRVZfQ09ORkxJQ1QpKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXBkYXRlXG4gICAgICAgICAgdmFyIHJlcSA9IG9TdG9yZS5wdXQoZG9jKTtcbiAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0ID0ge29rOiB0cnVlLCBpZDogZG9jLl9pZCwgcmV2OiBkb2MuX3Jldn07XG4gICAgICAgICAgICBpZiAob3B0cy5jdHgpIHsgLy8gcmV0dXJuIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgeyAvLyBuZXcgZG9jXG4gICAgICByZXEgPSBvU3RvcmUuYWRkKGRvYyk7XG4gICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIGNvbnN0cmFpbnQgZXJyb3IsIGFscmVhZHkgZXhpc3RzXG4gICAgICAgIGNhbGxiYWNrKGNyZWF0ZUVycm9yKFJFVl9DT05GTElDVCkpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGF2b2lkIHRyYW5zYWN0aW9uIGFib3J0XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIGF2b2lkIHRyYW5zYWN0aW9uIG9uZXJyb3JcbiAgICAgIH07XG4gICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXQgPSB7b2s6IHRydWUsIGlkOiBkb2MuX2lkLCByZXY6IGRvYy5fcmV2fTtcbiAgICAgICAgaWYgKG9wdHMuY3R4KSB7IC8vIHJldHVybiBpbW1lZGlhdGVseVxuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJldCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGFwaS5fcmVtb3ZlTG9jYWwgPSBmdW5jdGlvbiAoZG9jLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICB2YXIgdHggPSBvcHRzLmN0eDtcbiAgICBpZiAoIXR4KSB7XG4gICAgICB2YXIgdHhuUmVzdWx0ID0gb3BlblRyYW5zYWN0aW9uU2FmZWx5KGlkYiwgW0xPQ0FMX1NUT1JFXSwgJ3JlYWR3cml0ZScpO1xuICAgICAgaWYgKHR4blJlc3VsdC5lcnJvcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sodHhuUmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICAgIHR4ID0gdHhuUmVzdWx0LnR4bjtcbiAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgcmV0O1xuICAgIHZhciBpZCA9IGRvYy5faWQ7XG4gICAgdmFyIG9TdG9yZSA9IHR4Lm9iamVjdFN0b3JlKExPQ0FMX1NUT1JFKTtcbiAgICB2YXIgcmVxID0gb1N0b3JlLmdldChpZCk7XG5cbiAgICByZXEub25lcnJvciA9IGlkYkVycm9yKGNhbGxiYWNrKTtcbiAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBvbGREb2MgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICBpZiAoIW9sZERvYyB8fCBvbGREb2MuX3JldiAhPT0gZG9jLl9yZXYpIHtcbiAgICAgICAgY2FsbGJhY2soY3JlYXRlRXJyb3IoTUlTU0lOR19ET0MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9TdG9yZS5kZWxldGUoaWQpO1xuICAgICAgICByZXQgPSB7b2s6IHRydWUsIGlkOiBpZCwgcmV2OiAnMC0wJ307XG4gICAgICAgIGlmIChvcHRzLmN0eCkgeyAvLyByZXR1cm4gaW1tZWRpYXRlbHlcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBhcGkuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgICBjaGFuZ2VzSGFuZGxlci5yZW1vdmVBbGxMaXN0ZW5lcnMoZGJOYW1lKTtcblxuICAgIC8vQ2xvc2Ugb3BlbiByZXF1ZXN0IGZvciBcImRiTmFtZVwiIGRhdGFiYXNlIHRvIGZpeCBpZSBkZWxheS5cbiAgICB2YXIgb3BlblJlcSA9IG9wZW5SZXFMaXN0LmdldChkYk5hbWUpO1xuICAgIGlmIChvcGVuUmVxICYmIG9wZW5SZXEucmVzdWx0KSB7XG4gICAgICBvcGVuUmVxLnJlc3VsdC5jbG9zZSgpO1xuICAgICAgY2FjaGVkREJzLmRlbGV0ZShkYk5hbWUpO1xuICAgIH1cbiAgICB2YXIgcmVxID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGRiTmFtZSk7XG5cbiAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy9SZW1vdmUgb3BlbiByZXF1ZXN0IGZyb20gdGhlIGxpc3QuXG4gICAgICBvcGVuUmVxTGlzdC5kZWxldGUoZGJOYW1lKTtcbiAgICAgIGlmIChoYXNMb2NhbFN0b3JhZ2UoKSAmJiAoZGJOYW1lIGluIGxvY2FsU3RvcmFnZSkpIHtcbiAgICAgICAgZGVsZXRlIGxvY2FsU3RvcmFnZVtkYk5hbWVdO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2sobnVsbCwgeyAnb2snOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICByZXEub25lcnJvciA9IGlkYkVycm9yKGNhbGxiYWNrKTtcbiAgfTtcblxuICB2YXIgY2FjaGVkID0gY2FjaGVkREJzLmdldChkYk5hbWUpO1xuXG4gIGlmIChjYWNoZWQpIHtcbiAgICBpZGIgPSBjYWNoZWQuaWRiO1xuICAgIGFwaS5fbWV0YSA9IGNhY2hlZC5nbG9iYWw7XG4gICAgcmV0dXJuIGltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCBhcGkpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHJlcSA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgQURBUFRFUl9WRVJTSU9OKTtcbiAgb3BlblJlcUxpc3Quc2V0KGRiTmFtZSwgcmVxKTtcblxuICByZXEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZGIgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgaWYgKGUub2xkVmVyc2lvbiA8IDEpIHtcbiAgICAgIHJldHVybiBjcmVhdGVTY2hlbWEoZGIpOyAvLyBuZXcgZGIsIGluaXRpYWwgc2NoZW1hXG4gICAgfVxuICAgIC8vIGRvIG1pZ3JhdGlvbnNcblxuICAgIHZhciB0eG4gPSBlLmN1cnJlbnRUYXJnZXQudHJhbnNhY3Rpb247XG4gICAgLy8gdGhlc2UgbWlncmF0aW9ucyBoYXZlIHRvIGJlIGRvbmUgaW4gdGhpcyBmdW5jdGlvbiwgYmVmb3JlXG4gICAgLy8gY29udHJvbCBpcyByZXR1cm5lZCB0byB0aGUgZXZlbnQgbG9vcCwgYmVjYXVzZSBJbmRleGVkREJcblxuICAgIGlmIChlLm9sZFZlcnNpb24gPCAzKSB7XG4gICAgICBjcmVhdGVMb2NhbFN0b3JlU2NoZW1hKGRiKTsgLy8gdjIgLT4gdjNcbiAgICB9XG4gICAgaWYgKGUub2xkVmVyc2lvbiA8IDQpIHtcbiAgICAgIGFkZEF0dGFjaEFuZFNlcVN0b3JlKGRiKTsgLy8gdjMgLT4gdjRcbiAgICB9XG5cbiAgICB2YXIgbWlncmF0aW9ucyA9IFtcbiAgICAgIGFkZERlbGV0ZWRPckxvY2FsSW5kZXgsIC8vIHYxIC0+IHYyXG4gICAgICBtaWdyYXRlTG9jYWxTdG9yZSwgICAgICAvLyB2MiAtPiB2M1xuICAgICAgbWlncmF0ZUF0dHNBbmRTZXFzLCAgICAgLy8gdjMgLT4gdjRcbiAgICAgIG1pZ3JhdGVNZXRhZGF0YSAgICAgICAgIC8vIHY0IC0+IHY1XG4gICAgXTtcblxuICAgIHZhciBpID0gZS5vbGRWZXJzaW9uO1xuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHZhciBtaWdyYXRpb24gPSBtaWdyYXRpb25zW2kgLSAxXTtcbiAgICAgIGkrKztcbiAgICAgIGlmIChtaWdyYXRpb24pIHtcbiAgICAgICAgbWlncmF0aW9uKHR4biwgbmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpO1xuICB9O1xuXG4gIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgaWRiID0gZS50YXJnZXQucmVzdWx0O1xuXG4gICAgaWRiLm9udmVyc2lvbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlkYi5jbG9zZSgpO1xuICAgICAgY2FjaGVkREJzLmRlbGV0ZShkYk5hbWUpO1xuICAgIH07XG5cbiAgICBpZGIub25hYm9ydCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBndWFyZGVkQ29uc29sZSgnZXJyb3InLCAnRGF0YWJhc2UgaGFzIGEgZ2xvYmFsIGZhaWx1cmUnLCBlLnRhcmdldC5lcnJvcik7XG4gICAgICBpZGIuY2xvc2UoKTtcbiAgICAgIGNhY2hlZERCcy5kZWxldGUoZGJOYW1lKTtcbiAgICB9O1xuXG4gICAgLy8gRG8gYSBmZXcgc2V0dXAgb3BlcmF0aW9ucyAoaW4gcGFyYWxsZWwgYXMgbXVjaCBhcyBwb3NzaWJsZSk6XG4gICAgLy8gMS4gRmV0Y2ggbWV0YSBkb2NcbiAgICAvLyAyLiBDaGVjayBibG9iIHN1cHBvcnRcbiAgICAvLyAzLiBDYWxjdWxhdGUgZG9jQ291bnRcbiAgICAvLyA0LiBHZW5lcmF0ZSBhbiBpbnN0YW5jZUlkIGlmIG5lY2Vzc2FyeVxuICAgIC8vIDUuIFN0b3JlIGRvY0NvdW50IGFuZCBpbnN0YW5jZUlkIG9uIG1ldGEgZG9jXG5cbiAgICB2YXIgdHhuID0gaWRiLnRyYW5zYWN0aW9uKFtcbiAgICAgIE1FVEFfU1RPUkUsXG4gICAgICBERVRFQ1RfQkxPQl9TVVBQT1JUX1NUT1JFLFxuICAgICAgRE9DX1NUT1JFXG4gICAgXSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgdmFyIHN0b3JlZE1ldGFEb2MgPSBmYWxzZTtcbiAgICB2YXIgbWV0YURvYztcbiAgICB2YXIgZG9jQ291bnQ7XG4gICAgdmFyIGJsb2JTdXBwb3J0O1xuICAgIHZhciBpbnN0YW5jZUlkO1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGVTZXR1cCgpIHtcbiAgICAgIGlmICh0eXBlb2YgYmxvYlN1cHBvcnQgPT09ICd1bmRlZmluZWQnIHx8ICFzdG9yZWRNZXRhRG9jKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS5fbWV0YSA9IHtcbiAgICAgICAgbmFtZTogZGJOYW1lLFxuICAgICAgICBpbnN0YW5jZUlkOiBpbnN0YW5jZUlkLFxuICAgICAgICBibG9iU3VwcG9ydDogYmxvYlN1cHBvcnRcbiAgICAgIH07XG5cbiAgICAgIGNhY2hlZERCcy5zZXQoZGJOYW1lLCB7XG4gICAgICAgIGlkYjogaWRiLFxuICAgICAgICBnbG9iYWw6IGFwaS5fbWV0YVxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjayhudWxsLCBhcGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3JlTWV0YURvY0lmUmVhZHkoKSB7XG4gICAgICBpZiAodHlwZW9mIGRvY0NvdW50ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgbWV0YURvYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGluc3RhbmNlS2V5ID0gZGJOYW1lICsgJ19pZCc7XG4gICAgICBpZiAoaW5zdGFuY2VLZXkgaW4gbWV0YURvYykge1xuICAgICAgICBpbnN0YW5jZUlkID0gbWV0YURvY1tpbnN0YW5jZUtleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXRhRG9jW2luc3RhbmNlS2V5XSA9IGluc3RhbmNlSWQgPSB1dWlkKCk7XG4gICAgICB9XG4gICAgICBtZXRhRG9jLmRvY0NvdW50ID0gZG9jQ291bnQ7XG4gICAgICB0eG4ub2JqZWN0U3RvcmUoTUVUQV9TVE9SRSkucHV0KG1ldGFEb2MpO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gZmV0Y2ggb3IgZ2VuZXJhdGUgdGhlIGluc3RhbmNlSWRcbiAgICAvL1xuICAgIHR4bi5vYmplY3RTdG9yZShNRVRBX1NUT1JFKS5nZXQoTUVUQV9TVE9SRSkub25zdWNjZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1ldGFEb2MgPSBlLnRhcmdldC5yZXN1bHQgfHwgeyBpZDogTUVUQV9TVE9SRSB9O1xuICAgICAgc3RvcmVNZXRhRG9jSWZSZWFkeSgpO1xuICAgIH07XG5cbiAgICAvL1xuICAgIC8vIGNvdW50RG9jc1xuICAgIC8vXG4gICAgY291bnREb2NzKHR4biwgZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICBkb2NDb3VudCA9IGNvdW50O1xuICAgICAgc3RvcmVNZXRhRG9jSWZSZWFkeSgpO1xuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvLyBjaGVjayBibG9iIHN1cHBvcnRcbiAgICAvL1xuICAgIGlmICghYmxvYlN1cHBvcnRQcm9taXNlKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgYmxvYiBzdXBwb3J0IGlzIG9ubHkgY2hlY2tlZCBvbmNlXG4gICAgICBibG9iU3VwcG9ydFByb21pc2UgPSBjaGVja0Jsb2JTdXBwb3J0KHR4bik7XG4gICAgfVxuXG4gICAgYmxvYlN1cHBvcnRQcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgYmxvYlN1cHBvcnQgPSB2YWw7XG4gICAgICBjb21wbGV0ZVNldHVwKCk7XG4gICAgfSk7XG5cbiAgICAvLyBvbmx5IHdoZW4gdGhlIG1ldGFkYXRhIHB1dCB0cmFuc2FjdGlvbiBoYXMgY29tcGxldGVkLFxuICAgIC8vIGNvbnNpZGVyIHRoZSBzZXR1cCBkb25lXG4gICAgdHhuLm9uY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yZWRNZXRhRG9jID0gdHJ1ZTtcbiAgICAgIGNvbXBsZXRlU2V0dXAoKTtcbiAgICB9O1xuICAgIHR4bi5vbmFib3J0ID0gaWRiRXJyb3IoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbXNnID0gZS50YXJnZXQuZXJyb3IgJiYgZS50YXJnZXQuZXJyb3IubWVzc2FnZTtcblxuICAgIGlmICghbXNnKSB7XG4gICAgICBtc2cgPSAnRmFpbGVkIHRvIG9wZW4gaW5kZXhlZERCLCBhcmUgeW91IGluIHByaXZhdGUgYnJvd3NpbmcgbW9kZT8nO1xuICAgIH0gZWxzZSBpZiAobXNnLmluZGV4T2YoXCJzdG9yZWQgZGF0YWJhc2UgaXMgYSBoaWdoZXIgdmVyc2lvblwiKSAhPT0gLTEpIHtcbiAgICAgIG1zZyA9IG5ldyBFcnJvcignVGhpcyBEQiB3YXMgY3JlYXRlZCB3aXRoIHRoZSBuZXdlciBcImluZGV4ZWRkYlwiIGFkYXB0ZXIsIGJ1dCB5b3UgYXJlIHRyeWluZyB0byBvcGVuIGl0IHdpdGggdGhlIG9sZGVyIFwiaWRiXCIgYWRhcHRlcicpO1xuICAgIH1cblxuICAgIGd1YXJkZWRDb25zb2xlKCdlcnJvcicsIG1zZyk7XG4gICAgY2FsbGJhY2soY3JlYXRlRXJyb3IoSURCX0VSUk9SLCBtc2cpKTtcbiAgfTtcbn1cblxuSWRiUG91Y2gudmFsaWQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIEZvbGxvd2luZyAjNzA4NSBidWdneSBpZGIgdmVyc2lvbnMgKHR5cGljYWxseSBTYWZhcmkgPCAxMC4xKSBhcmVcbiAgLy8gY29uc2lkZXJlZCB2YWxpZC5cblxuICAvLyBPbiBGaXJlZm94IFNlY3VyaXR5RXJyb3IgaXMgdGhyb3duIHdoaWxlIHJlZmVyZW5jaW5nIGluZGV4ZWREQiBpZiBjb29raWVzXG4gIC8vIGFyZSBub3QgYWxsb3dlZC4gYHR5cGVvZiBpbmRleGVkREJgIGFsc28gdHJpZ2dlcnMgdGhlIGVycm9yLlxuICB0cnkge1xuICAgIC8vIHNvbWUgb3V0ZGF0ZWQgaW1wbGVtZW50YXRpb25zIG9mIElEQiB0aGF0IGFwcGVhciBvbiBTYW1zdW5nXG4gICAgLy8gYW5kIEhUQyBBbmRyb2lkIGRldmljZXMgPDQuNCBhcmUgbWlzc2luZyBJREJLZXlSYW5nZVxuICAgIHJldHVybiB0eXBlb2YgaW5kZXhlZERCICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgSURCS2V5UmFuZ2UgIT09ICd1bmRlZmluZWQnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBJREJQb3VjaCAoUG91Y2hEQikge1xuICBQb3VjaERCLmFkYXB0ZXIoJ2lkYicsIElkYlBvdWNoLCB0cnVlKTtcbn1cblxuLy8gZGVhZCBzaW1wbGUgcHJvbWlzZSBwb29sLCBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vdGltZHAvZXM2LXByb21pc2UtcG9vbFxuLy8gYnV0IG11Y2ggc21hbGxlciBpbiBjb2RlIHNpemUuIGxpbWl0cyB0aGUgbnVtYmVyIG9mIGNvbmN1cnJlbnQgcHJvbWlzZXMgdGhhdCBhcmUgZXhlY3V0ZWRcblxuXG5mdW5jdGlvbiBwb29sKHByb21pc2VGYWN0b3JpZXMsIGxpbWl0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJ1bm5pbmcgPSAwO1xuICAgIHZhciBjdXJyZW50ID0gMDtcbiAgICB2YXIgZG9uZSA9IDA7XG4gICAgdmFyIGxlbiA9IHByb21pc2VGYWN0b3JpZXMubGVuZ3RoO1xuICAgIHZhciBlcnI7XG5cbiAgICBmdW5jdGlvbiBydW5OZXh0KCkge1xuICAgICAgcnVubmluZysrO1xuICAgICAgcHJvbWlzZUZhY3Rvcmllc1tjdXJyZW50KytdKCkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvTmV4dCgpIHtcbiAgICAgIGlmICgrK2RvbmUgPT09IGxlbikge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVuTmV4dEJhdGNoKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdWNjZXNzKCkge1xuICAgICAgcnVubmluZy0tO1xuICAgICAgZG9OZXh0KCk7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBmdW5jdGlvbiBvbkVycm9yKHRoaXNFcnIpIHtcbiAgICAgIHJ1bm5pbmctLTtcbiAgICAgIGVyciA9IGVyciB8fCB0aGlzRXJyO1xuICAgICAgZG9OZXh0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuTmV4dEJhdGNoKCkge1xuICAgICAgd2hpbGUgKHJ1bm5pbmcgPCBsaW1pdCAmJiBjdXJyZW50IDwgbGVuKSB7XG4gICAgICAgIHJ1bk5leHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBydW5OZXh0QmF0Y2goKTtcbiAgfSk7XG59XG5cbnZhciBDSEFOR0VTX0JBVENIX1NJWkUgPSAyNTtcbnZhciBNQVhfU0lNVUxUQU5FT1VTX1JFVlMgPSA1MDtcbnZhciBDSEFOR0VTX1RJTUVPVVRfQlVGRkVSID0gNTAwMDtcbnZhciBERUZBVUxUX0hFQVJUQkVBVCA9IDEwMDAwO1xuXG52YXIgc3VwcG9ydHNCdWxrR2V0TWFwID0ge307XG5cbmZ1bmN0aW9uIHJlYWRBdHRhY2htZW50c0FzQmxvYk9yQnVmZmVyKHJvdykge1xuICB2YXIgZG9jID0gcm93LmRvYyB8fCByb3cub2s7XG4gIHZhciBhdHRzID0gZG9jICYmIGRvYy5fYXR0YWNobWVudHM7XG4gIGlmICghYXR0cykge1xuICAgIHJldHVybjtcbiAgfVxuICBPYmplY3Qua2V5cyhhdHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuICAgIHZhciBhdHQgPSBhdHRzW2ZpbGVuYW1lXTtcbiAgICBhdHQuZGF0YSA9IGI2NFRvQmx1ZmZlcihhdHQuZGF0YSwgYXR0LmNvbnRlbnRfdHlwZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVEb2NJZChpZCkge1xuICBpZiAoL15fZGVzaWduLy50ZXN0KGlkKSkge1xuICAgIHJldHVybiAnX2Rlc2lnbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkLnNsaWNlKDgpKTtcbiAgfVxuICBpZiAoL15fbG9jYWwvLnRlc3QoaWQpKSB7XG4gICAgcmV0dXJuICdfbG9jYWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZC5zbGljZSg3KSk7XG4gIH1cbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG59XG5cbmZ1bmN0aW9uIHByZXByb2Nlc3NBdHRhY2htZW50cyQxKGRvYykge1xuICBpZiAoIWRvYy5fYXR0YWNobWVudHMgfHwgIU9iamVjdC5rZXlzKGRvYy5fYXR0YWNobWVudHMpKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKGRvYy5fYXR0YWNobWVudHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGF0dGFjaG1lbnQgPSBkb2MuX2F0dGFjaG1lbnRzW2tleV07XG4gICAgaWYgKGF0dGFjaG1lbnQuZGF0YSAmJiB0eXBlb2YgYXR0YWNobWVudC5kYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIGJsb2JUb0Jhc2U2NChhdHRhY2htZW50LmRhdGEsIHJlc29sdmUpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoYjY0KSB7XG4gICAgICAgIGF0dGFjaG1lbnQuZGF0YSA9IGI2NDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkpO1xufVxuXG5mdW5jdGlvbiBoYXNVcmxQcmVmaXgob3B0cykge1xuICBpZiAoIW9wdHMucHJlZml4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90b2NvbCA9IHBhcnNlVXJpKG9wdHMucHJlZml4KS5wcm90b2NvbDtcbiAgcmV0dXJuIHByb3RvY29sID09PSAnaHR0cCcgfHwgcHJvdG9jb2wgPT09ICdodHRwcyc7XG59XG5cbi8vIEdldCBhbGwgdGhlIGluZm9ybWF0aW9uIHlvdSBwb3NzaWJseSBjYW4gYWJvdXQgdGhlIFVSSSBnaXZlbiBieSBuYW1lIGFuZFxuLy8gcmV0dXJuIGl0IGFzIGEgc3VpdGFibGUgb2JqZWN0LlxuZnVuY3Rpb24gZ2V0SG9zdChuYW1lLCBvcHRzKSB7XG4gIC8vIGVuY29kZSBkYiBuYW1lIGlmIG9wdHMucHJlZml4IGlzIGEgdXJsICgjNTU3NClcbiAgaWYgKGhhc1VybFByZWZpeChvcHRzKSkge1xuICAgIHZhciBkYk5hbWUgPSBvcHRzLm5hbWUuc3Vic3RyKG9wdHMucHJlZml4Lmxlbmd0aCk7XG4gICAgLy8gRW5zdXJlIHByZWZpeCBoYXMgYSB0cmFpbGluZyBzbGFzaFxuICAgIHZhciBwcmVmaXggPSBvcHRzLnByZWZpeC5yZXBsYWNlKC9cXC8/JC8sICcvJyk7XG4gICAgbmFtZSA9IHByZWZpeCArIGVuY29kZVVSSUNvbXBvbmVudChkYk5hbWUpO1xuICB9XG5cbiAgdmFyIHVyaSA9IHBhcnNlVXJpKG5hbWUpO1xuICBpZiAodXJpLnVzZXIgfHwgdXJpLnBhc3N3b3JkKSB7XG4gICAgdXJpLmF1dGggPSB7dXNlcm5hbWU6IHVyaS51c2VyLCBwYXNzd29yZDogdXJpLnBhc3N3b3JkfTtcbiAgfVxuXG4gIC8vIFNwbGl0IHRoZSBwYXRoIHBhcnQgb2YgdGhlIFVSSSBpbnRvIHBhcnRzIHVzaW5nICcvJyBhcyB0aGUgZGVsaW1pdGVyXG4gIC8vIGFmdGVyIHJlbW92aW5nIGFueSBsZWFkaW5nICcvJyBhbmQgYW55IHRyYWlsaW5nICcvJ1xuICB2YXIgcGFydHMgPSB1cmkucGF0aC5yZXBsYWNlKC8oXlxcL3xcXC8kKS9nLCAnJykuc3BsaXQoJy8nKTtcblxuICB1cmkuZGIgPSBwYXJ0cy5wb3AoKTtcbiAgLy8gUHJldmVudCBkb3VibGUgZW5jb2Rpbmcgb2YgVVJJIGNvbXBvbmVudFxuICBpZiAodXJpLmRiLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICB1cmkuZGIgPSBlbmNvZGVVUklDb21wb25lbnQodXJpLmRiKTtcbiAgfVxuXG4gIHVyaS5wYXRoID0gcGFydHMuam9pbignLycpO1xuXG4gIHJldHVybiB1cmk7XG59XG5cbi8vIEdlbmVyYXRlIGEgVVJMIHdpdGggdGhlIGhvc3QgZGF0YSBnaXZlbiBieSBvcHRzIGFuZCB0aGUgZ2l2ZW4gcGF0aFxuZnVuY3Rpb24gZ2VuREJVcmwob3B0cywgcGF0aCkge1xuICByZXR1cm4gZ2VuVXJsKG9wdHMsIG9wdHMuZGIgKyAnLycgKyBwYXRoKTtcbn1cblxuLy8gR2VuZXJhdGUgYSBVUkwgd2l0aCB0aGUgaG9zdCBkYXRhIGdpdmVuIGJ5IG9wdHMgYW5kIHRoZSBnaXZlbiBwYXRoXG5mdW5jdGlvbiBnZW5Vcmwob3B0cywgcGF0aCkge1xuICAvLyBJZiB0aGUgaG9zdCBhbHJlYWR5IGhhcyBhIHBhdGgsIHRoZW4gd2UgbmVlZCB0byBoYXZlIGEgcGF0aCBkZWxpbWl0ZXJcbiAgLy8gT3RoZXJ3aXNlLCB0aGUgcGF0aCBkZWxpbWl0ZXIgaXMgdGhlIGVtcHR5IHN0cmluZ1xuICB2YXIgcGF0aERlbCA9ICFvcHRzLnBhdGggPyAnJyA6ICcvJztcblxuICAvLyBJZiB0aGUgaG9zdCBhbHJlYWR5IGhhcyBhIHBhdGgsIHRoZW4gd2UgbmVlZCB0byBoYXZlIGEgcGF0aCBkZWxpbWl0ZXJcbiAgLy8gT3RoZXJ3aXNlLCB0aGUgcGF0aCBkZWxpbWl0ZXIgaXMgdGhlIGVtcHR5IHN0cmluZ1xuICByZXR1cm4gb3B0cy5wcm90b2NvbCArICc6Ly8nICsgb3B0cy5ob3N0ICtcbiAgICAgICAgIChvcHRzLnBvcnQgPyAoJzonICsgb3B0cy5wb3J0KSA6ICcnKSArXG4gICAgICAgICAnLycgKyBvcHRzLnBhdGggKyBwYXRoRGVsICsgcGF0aDtcbn1cblxuZnVuY3Rpb24gcGFyYW1zVG9TdHIocGFyYW1zKSB7XG4gIHJldHVybiAnPycgKyBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcChmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBrICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trXSk7XG4gIH0pLmpvaW4oJyYnKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkQ2FjaGVCdXN0KG9wdHMpIHtcbiAgdmFyIHVhID0gKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQpID9cbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSA6ICcnO1xuICB2YXIgaXNJRSA9IHVhLmluZGV4T2YoJ21zaWUnKSAhPT0gLTE7XG4gIHZhciBpc1RyaWRlbnQgPSB1YS5pbmRleE9mKCd0cmlkZW50JykgIT09IC0xO1xuICB2YXIgaXNFZGdlID0gdWEuaW5kZXhPZignZWRnZScpICE9PSAtMTtcbiAgdmFyIGlzR0VUID0gISgnbWV0aG9kJyBpbiBvcHRzKSB8fCBvcHRzLm1ldGhvZCA9PT0gJ0dFVCc7XG4gIHJldHVybiAoaXNJRSB8fCBpc1RyaWRlbnQgfHwgaXNFZGdlKSAmJiBpc0dFVDtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgUG91Y2hEQiBBUEkgZm9yIGRlYWxpbmcgd2l0aCBDb3VjaERCIGluc3RhbmNlcyBvdmVyIEhUVFBcbmZ1bmN0aW9uIEh0dHBQb3VjaChvcHRzLCBjYWxsYmFjaykge1xuXG4gIC8vIFRoZSBmdW5jdGlvbnMgdGhhdCB3aWxsIGJlIHB1YmxpY2x5IGF2YWlsYWJsZSBmb3IgSHR0cFBvdWNoXG4gIHZhciBhcGkgPSB0aGlzO1xuXG4gIHZhciBob3N0ID0gZ2V0SG9zdChvcHRzLm5hbWUsIG9wdHMpO1xuICB2YXIgZGJVcmwgPSBnZW5EQlVybChob3N0LCAnJyk7XG5cbiAgb3B0cyA9IGNsb25lKG9wdHMpO1xuXG4gIHZhciBvdXJGZXRjaCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgaCgpO1xuXG4gICAgb3B0aW9ucy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcblxuICAgIGlmIChvcHRzLmF1dGggfHwgaG9zdC5hdXRoKSB7XG4gICAgICB2YXIgbkF1dGggPSBvcHRzLmF1dGggfHwgaG9zdC5hdXRoO1xuICAgICAgdmFyIHN0ciA9IG5BdXRoLnVzZXJuYW1lICsgJzonICsgbkF1dGgucGFzc3dvcmQ7XG4gICAgICB2YXIgdG9rZW4gPSB0aGlzQnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgdG9rZW4pO1xuICAgIH1cblxuICAgIHZhciBoZWFkZXJzID0gb3B0cy5oZWFkZXJzIHx8IHt9O1xuICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLmFwcGVuZChrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgfSk7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoc2hvdWxkQ2FjaGVCdXN0KG9wdGlvbnMpKSB7XG4gICAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdfbm9uY2U9JyArIERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgdmFyIGZldGNoRnVuID0gb3B0cy5mZXRjaCB8fCBmJDE7XG4gICAgcmV0dXJuIGZldGNoRnVuKHVybCwgb3B0aW9ucyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gYWRhcHRlckZ1biQkMShuYW1lLCBmdW4pIHtcbiAgICByZXR1cm4gYWRhcHRlckZ1bihuYW1lLCBnZXRBcmd1bWVudHMoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHNldHVwKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgIH0pO1xuICAgIH0pKS5iaW5kKGFwaSk7XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEpTT04odXJsLCBvcHRpb25zLCBjYWxsYmFjaykge1xuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBoKCk7XG5cbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycy5nZXQoJ0FjY2VwdCcpKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXJGZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXN1bHQub2sgPSByZXNwb25zZS5vaztcbiAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgIHJlc3VsdC5kYXRhID0ganNvbjtcbiAgICAgIGlmICghcmVzdWx0Lm9rKSB7XG4gICAgICAgIHJlc3VsdC5kYXRhLnN0YXR1cyA9IHJlc3VsdC5zdGF0dXM7XG4gICAgICAgIHZhciBlcnIgPSBnZW5lcmF0ZUVycm9yRnJvbVJlc3BvbnNlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdC5kYXRhKSkge1xuICAgICAgICByZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICh2LmVycm9yIHx8IHYubWlzc2luZykge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlRXJyb3JGcm9tUmVzcG9uc2Uodik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHNldHVwUHJvbWlzZTtcblxuICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICBpZiAob3B0cy5za2lwX3NldHVwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBzZXR1cCBpbiBwcm9jZXNzIG9yIHByZXZpb3VzIHN1Y2Nlc3NmdWwgc2V0dXBcbiAgICAvLyBkb25lIHRoZW4gd2Ugd2lsbCB1c2UgdGhhdFxuICAgIC8vIElmIHByZXZpb3VzIHNldHVwcyBoYXZlIGJlZW4gcmVqZWN0ZWQgd2Ugd2lsbCB0cnkgYWdhaW5cbiAgICBpZiAoc2V0dXBQcm9taXNlKSB7XG4gICAgICByZXR1cm4gc2V0dXBQcm9taXNlO1xuICAgIH1cblxuICAgIHNldHVwUHJvbWlzZSA9IGZldGNoSlNPTihkYlVybCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVyciAmJiBlcnIuc3RhdHVzICYmIGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAvLyBEb2VzbnQgZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBleHBsYWluRXJyb3IoNDA0LCAnUG91Y2hEQiBpcyBqdXN0IGRldGVjdGluZyBpZiB0aGUgcmVtb3RlIGV4aXN0cy4nKTtcbiAgICAgICAgcmV0dXJuIGZldGNoSlNPTihkYlVybCwge21ldGhvZDogJ1BVVCd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIC8vIElmIHdlIHRyeSB0byBjcmVhdGUgYSBkYXRhYmFzZSB0aGF0IGFscmVhZHkgZXhpc3RzLCBza2lwcGVkIGluXG4gICAgICAvLyBpc3RhbmJ1bCBzaW5jZSBpdHMgY2F0Y2hpbmcgYSByYWNlIGNvbmRpdGlvbi5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGVyciAmJiBlcnIuc3RhdHVzICYmIGVyci5zdGF0dXMgPT09IDQxMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuXG4gICAgc2V0dXBQcm9taXNlLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldHVwUHJvbWlzZSA9IG51bGw7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2V0dXBQcm9taXNlO1xuICB9XG5cbiAgaW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICBjYWxsYmFjayhudWxsLCBhcGkpO1xuICB9KTtcblxuICBhcGkuX3JlbW90ZSA9IHRydWU7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgYXBpLnR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdodHRwJztcbiAgfTtcblxuICBhcGkuaWQgPSBhZGFwdGVyRnVuJCQxKCdpZCcsIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIG91ckZldGNoKGdlblVybChob3N0LCAnJykpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIC8vIEJhZCByZXNwb25zZSBvciBtaXNzaW5nIGB1dWlkYCBzaG91bGQgbm90IHByZXZlbnQgSUQgZ2VuZXJhdGlvbi5cbiAgICAgIHZhciB1dWlkJCQxID0gKHJlc3VsdCAmJiByZXN1bHQudXVpZCkgP1xuICAgICAgICAgIChyZXN1bHQudXVpZCArIGhvc3QuZGIpIDogZ2VuREJVcmwoaG9zdCwgJycpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgdXVpZCQkMSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFNlbmRzIGEgUE9TVCByZXF1ZXN0IHRvIHRoZSBob3N0IGNhbGxpbmcgdGhlIGNvdWNoZGIgX2NvbXBhY3QgZnVuY3Rpb25cbiAgLy8gICAgdmVyc2lvbjogVGhlIHZlcnNpb24gb2YgQ291Y2hEQiBpdCBpcyBydW5uaW5nXG4gIGFwaS5jb21wYWN0ID0gYWRhcHRlckZ1biQkMSgnY29tcGFjdCcsIGZ1bmN0aW9uIChvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICBvcHRzID0gY2xvbmUob3B0cyk7XG5cbiAgICBmZXRjaEpTT04oZ2VuREJVcmwoaG9zdCwgJ19jb21wYWN0JyksIHttZXRob2Q6ICdQT1NUJ30pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gcGluZygpIHtcbiAgICAgICAgYXBpLmluZm8oZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgLy8gQ291Y2hEQiBtYXkgc2VuZCBhIFwiY29tcGFjdF9ydW5uaW5nOnRydWVcIiBpZiBpdCdzXG4gICAgICAgICAgLy8gYWxyZWFkeSBjb21wYWN0aW5nLiBQb3VjaERCIFNlcnZlciBkb2Vzbid0LlxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgaWYgKHJlcyAmJiAhcmVzLmNvbXBhY3RfcnVubmluZykge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwge29rOiB0cnVlfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGluZywgb3B0cy5pbnRlcnZhbCB8fCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBQaW5nIHRoZSBodHRwIGlmIGl0J3MgZmluaXNoZWQgY29tcGFjdGlvblxuICAgICAgcGluZygpO1xuICAgIH0pO1xuICB9KTtcblxuICBhcGkuYnVsa0dldCA9IGFkYXB0ZXJGdW4oJ2J1bGtHZXQnLCBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBkb0J1bGtHZXQoY2IpIHtcbiAgICAgIHZhciBwYXJhbXMgPSB7fTtcbiAgICAgIGlmIChvcHRzLnJldnMpIHtcbiAgICAgICAgcGFyYW1zLnJldnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKG9wdHMuYXR0YWNobWVudHMpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcGFyYW1zLmF0dGFjaG1lbnRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRzLmxhdGVzdCkge1xuICAgICAgICBwYXJhbXMubGF0ZXN0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZldGNoSlNPTihnZW5EQlVybChob3N0LCAnX2J1bGtfZ2V0JyArIHBhcmFtc1RvU3RyKHBhcmFtcykpLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGRvY3M6IG9wdHMuZG9jc30pXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKG9wdHMuYXR0YWNobWVudHMgJiYgb3B0cy5iaW5hcnkpIHtcbiAgICAgICAgICByZXN1bHQuZGF0YS5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgcmVzLmRvY3MuZm9yRWFjaChyZWFkQXR0YWNobWVudHNBc0Jsb2JPckJ1ZmZlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2IobnVsbCwgcmVzdWx0LmRhdGEpO1xuICAgICAgfSkuY2F0Y2goY2IpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZnVuY3Rpb24gZG9CdWxrR2V0U2hpbSgpIHtcbiAgICAgIC8vIGF2b2lkIFwidXJsIHRvbyBsb25nIGVycm9yXCIgYnkgc3BsaXR0aW5nIHVwIGludG8gbXVsdGlwbGUgcmVxdWVzdHNcbiAgICAgIHZhciBiYXRjaFNpemUgPSBNQVhfU0lNVUxUQU5FT1VTX1JFVlM7XG4gICAgICB2YXIgbnVtQmF0Y2hlcyA9IE1hdGguY2VpbChvcHRzLmRvY3MubGVuZ3RoIC8gYmF0Y2hTaXplKTtcbiAgICAgIHZhciBudW1Eb25lID0gMDtcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IEFycmF5KG51bUJhdGNoZXMpO1xuXG4gICAgICBmdW5jdGlvbiBvblJlc3VsdChiYXRjaE51bSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgLy8gZXJyIGlzIGltcG9zc2libGUgYmVjYXVzZSBzaGltIHJldHVybnMgYSBsaXN0IG9mIGVycnMgaW4gdGhhdCBjYXNlXG4gICAgICAgICAgcmVzdWx0c1tiYXRjaE51bV0gPSByZXMucmVzdWx0cztcbiAgICAgICAgICBpZiAoKytudW1Eb25lID09PSBudW1CYXRjaGVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCB7cmVzdWx0czogZmxhdHRlbihyZXN1bHRzKX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1CYXRjaGVzOyBpKyspIHtcbiAgICAgICAgdmFyIHN1Yk9wdHMgPSBwaWNrKG9wdHMsIFsncmV2cycsICdhdHRhY2htZW50cycsICdiaW5hcnknLCAnbGF0ZXN0J10pO1xuICAgICAgICBzdWJPcHRzLmRvY3MgPSBvcHRzLmRvY3Muc2xpY2UoaSAqIGJhdGNoU2l6ZSxcbiAgICAgICAgICBNYXRoLm1pbihvcHRzLmRvY3MubGVuZ3RoLCAoaSArIDEpICogYmF0Y2hTaXplKSk7XG4gICAgICAgIGJ1bGtHZXQoc2VsZiwgc3ViT3B0cywgb25SZXN1bHQoaSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1hcmsgdGhlIHdob2xlIGRhdGFiYXNlIGFzIGVpdGhlciBzdXBwb3J0aW5nIG9yIG5vdCBzdXBwb3J0aW5nIF9idWxrX2dldFxuICAgIHZhciBkYlVybCA9IGdlblVybChob3N0LCAnJyk7XG4gICAgdmFyIHN1cHBvcnRzQnVsa0dldCA9IHN1cHBvcnRzQnVsa0dldE1hcFtkYlVybF07XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0eXBlb2Ygc3VwcG9ydHNCdWxrR2V0ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgZGF0YWJhc2Ugc3VwcG9ydHMgX2J1bGtfZ2V0XG4gICAgICBkb0J1bGtHZXQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBzdXBwb3J0c0J1bGtHZXRNYXBbZGJVcmxdID0gZmFsc2U7XG4gICAgICAgICAgZXhwbGFpbkVycm9yKFxuICAgICAgICAgICAgZXJyLnN0YXR1cyxcbiAgICAgICAgICAgICdQb3VjaERCIGlzIGp1c3QgZGV0ZWN0aW5nIGlmIHRoZSByZW1vdGUgJyArXG4gICAgICAgICAgICAnc3VwcG9ydHMgdGhlIF9idWxrX2dldCBBUEkuJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZG9CdWxrR2V0U2hpbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRzQnVsa0dldE1hcFtkYlVybF0gPSB0cnVlO1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc3VwcG9ydHNCdWxrR2V0KSB7XG4gICAgICBkb0J1bGtHZXQoY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb0J1bGtHZXRTaGltKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBDYWxscyBHRVQgb24gdGhlIGhvc3QsIHdoaWNoIGdldHMgYmFjayBhIEpTT04gc3RyaW5nIGNvbnRhaW5pbmdcbiAgLy8gICAgY291Y2hkYjogQSB3ZWxjb21lIHN0cmluZ1xuICAvLyAgICB2ZXJzaW9uOiBUaGUgdmVyc2lvbiBvZiBDb3VjaERCIGl0IGlzIHJ1bm5pbmdcbiAgYXBpLl9pbmZvID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgc2V0dXAoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvdXJGZXRjaChnZW5EQlVybChob3N0LCAnJykpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgIGluZm8uaG9zdCA9IGdlbkRCVXJsKGhvc3QsICcnKTtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGluZm8pO1xuICAgIH0pLmNhdGNoKGNhbGxiYWNrKTtcbiAgfTtcblxuICBhcGkuZmV0Y2ggPSBmdW5jdGlvbiAocGF0aCwgb3B0aW9ucykge1xuICAgIHJldHVybiBzZXR1cCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHVybCA9IHBhdGguc3Vic3RyaW5nKDAsIDEpID09PSAnLycgP1xuICAgICAgICBnZW5VcmwoaG9zdCwgcGF0aC5zdWJzdHJpbmcoMSkpIDpcbiAgICAgICAgZ2VuREJVcmwoaG9zdCwgcGF0aCk7XG4gICAgICByZXR1cm4gb3VyRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIGlkIGZyb20gdGhlIGRhdGFiYXNlIGdpdmVuIGJ5IGhvc3QuXG4gIC8vIFRoZSBpZCBjb3VsZCBiZSBzb2xlbHkgdGhlIF9pZCBpbiB0aGUgZGF0YWJhc2UsIG9yIGl0IG1heSBiZSBhXG4gIC8vIF9kZXNpZ24vSUQgb3IgX2xvY2FsL0lEIHBhdGhcbiAgYXBpLmdldCA9IGFkYXB0ZXJGdW4kJDEoJ2dldCcsIGZ1bmN0aW9uIChpZCwgb3B0cywgY2FsbGJhY2spIHtcbiAgICAvLyBJZiBubyBvcHRpb25zIHdlcmUgZ2l2ZW4sIHNldCB0aGUgY2FsbGJhY2sgdG8gdGhlIHNlY29uZCBwYXJhbWV0ZXJcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG4gICAgb3B0cyA9IGNsb25lKG9wdHMpO1xuXG4gICAgLy8gTGlzdCBvZiBwYXJhbWV0ZXJzIHRvIGFkZCB0byB0aGUgR0VUIHJlcXVlc3RcbiAgICB2YXIgcGFyYW1zID0ge307XG5cbiAgICBpZiAob3B0cy5yZXZzKSB7XG4gICAgICBwYXJhbXMucmV2cyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMucmV2c19pbmZvKSB7XG4gICAgICBwYXJhbXMucmV2c19pbmZvID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5sYXRlc3QpIHtcbiAgICAgIHBhcmFtcy5sYXRlc3QgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChvcHRzLm9wZW5fcmV2cykge1xuICAgICAgaWYgKG9wdHMub3Blbl9yZXZzICE9PSBcImFsbFwiKSB7XG4gICAgICAgIG9wdHMub3Blbl9yZXZzID0gSlNPTi5zdHJpbmdpZnkob3B0cy5vcGVuX3JldnMpO1xuICAgICAgfVxuICAgICAgcGFyYW1zLm9wZW5fcmV2cyA9IG9wdHMub3Blbl9yZXZzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnJldikge1xuICAgICAgcGFyYW1zLnJldiA9IG9wdHMucmV2O1xuICAgIH1cblxuICAgIGlmIChvcHRzLmNvbmZsaWN0cykge1xuICAgICAgcGFyYW1zLmNvbmZsaWN0cyA9IG9wdHMuY29uZmxpY3RzO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChvcHRzLnVwZGF0ZV9zZXEpIHtcbiAgICAgIHBhcmFtcy51cGRhdGVfc2VxID0gb3B0cy51cGRhdGVfc2VxO1xuICAgIH1cblxuICAgIGlkID0gZW5jb2RlRG9jSWQoaWQpO1xuXG4gICAgZnVuY3Rpb24gZmV0Y2hBdHRhY2htZW50cyhkb2MpIHtcbiAgICAgIHZhciBhdHRzID0gZG9jLl9hdHRhY2htZW50cztcbiAgICAgIHZhciBmaWxlbmFtZXMgPSBhdHRzICYmIE9iamVjdC5rZXlzKGF0dHMpO1xuICAgICAgaWYgKCFhdHRzIHx8ICFmaWxlbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHdlIGZldGNoIHRoZXNlIG1hbnVhbGx5IGluIHNlcGFyYXRlIFhIUnMsIGJlY2F1c2VcbiAgICAgIC8vIFN5bmMgR2F0ZXdheSB3b3VsZCBub3JtYWxseSBzZW5kIGl0IGJhY2sgYXMgbXVsdGlwYXJ0L21peGVkLFxuICAgICAgLy8gd2hpY2ggd2UgY2Fubm90IHBhcnNlLiBBbHNvLCB0aGlzIGlzIG1vcmUgZWZmaWNpZW50IHRoYW5cbiAgICAgIC8vIHJlY2VpdmluZyBhdHRhY2htZW50cyBhcyBiYXNlNjQtZW5jb2RlZCBzdHJpbmdzLlxuICAgICAgZnVuY3Rpb24gZmV0Y2hEYXRhKGZpbGVuYW1lKSB7XG4gICAgICAgIHZhciBhdHQgPSBhdHRzW2ZpbGVuYW1lXTtcbiAgICAgICAgdmFyIHBhdGggPSBlbmNvZGVEb2NJZChkb2MuX2lkKSArICcvJyArIGVuY29kZUF0dGFjaG1lbnRJZChmaWxlbmFtZSkgK1xuICAgICAgICAgICAgJz9yZXY9JyArIGRvYy5fcmV2O1xuICAgICAgICByZXR1cm4gb3VyRmV0Y2goZ2VuREJVcmwoaG9zdCwgcGF0aCkpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKCdidWZmZXInIGluIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYnVmZmVyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgIGlmIChvcHRzLmJpbmFyeSkge1xuICAgICAgICAgICAgdmFyIHR5cGVGaWVsZERlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJsb2IuX19wcm90b19fLCAndHlwZScpO1xuICAgICAgICAgICAgaWYgKCF0eXBlRmllbGREZXNjcmlwdG9yIHx8IHR5cGVGaWVsZERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgICAgICAgIGJsb2IudHlwZSA9IGF0dC5jb250ZW50X3R5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvYjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBibG9iVG9CYXNlNjQoYmxvYiwgcmVzb2x2ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBkZWxldGUgYXR0LnN0dWI7XG4gICAgICAgICAgZGVsZXRlIGF0dC5sZW5ndGg7XG4gICAgICAgICAgYXR0LmRhdGEgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb21pc2VGYWN0b3JpZXMgPSBmaWxlbmFtZXMubWFwKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBmZXRjaERhdGEoZmlsZW5hbWUpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFRoaXMgbGltaXRzIHRoZSBudW1iZXIgb2YgcGFyYWxsZWwgeGhyIHJlcXVlc3RzIHRvIDUgYW55IHRpbWVcbiAgICAgIC8vIHRvIGF2b2lkIGlzc3VlcyB3aXRoIG1heGltdW0gYnJvd3NlciByZXF1ZXN0IGxpbWl0c1xuICAgICAgcmV0dXJuIHBvb2wocHJvbWlzZUZhY3RvcmllcywgNSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hBbGxBdHRhY2htZW50cyhkb2NPckRvY3MpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRvY09yRG9jcykpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGRvY09yRG9jcy5tYXAoZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgIGlmIChkb2Mub2spIHtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaEF0dGFjaG1lbnRzKGRvYy5vayk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmV0Y2hBdHRhY2htZW50cyhkb2NPckRvY3MpO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSBnZW5EQlVybChob3N0LCBpZCArIHBhcmFtc1RvU3RyKHBhcmFtcykpO1xuICAgIGZldGNoSlNPTih1cmwpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAob3B0cy5hdHRhY2htZW50cykge1xuICAgICAgICAgIHJldHVybiBmZXRjaEFsbEF0dGFjaG1lbnRzKHJlcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlcy5kYXRhKTtcbiAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLmRvY0lkID0gaWQ7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuICAvLyBEZWxldGUgdGhlIGRvY3VtZW50IGdpdmVuIGJ5IGRvYyBmcm9tIHRoZSBkYXRhYmFzZSBnaXZlbiBieSBob3N0LlxuICBhcGkucmVtb3ZlID0gYWRhcHRlckZ1biQkMSgncmVtb3ZlJywgZnVuY3Rpb24gKGRvY09ySWQsIG9wdHNPclJldiwgb3B0cywgY2IpIHtcbiAgICB2YXIgZG9jO1xuICAgIGlmICh0eXBlb2Ygb3B0c09yUmV2ID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gaWQsIHJldiwgb3B0cywgY2FsbGJhY2sgc3R5bGVcbiAgICAgIGRvYyA9IHtcbiAgICAgICAgX2lkOiBkb2NPcklkLFxuICAgICAgICBfcmV2OiBvcHRzT3JSZXZcbiAgICAgIH07XG4gICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2IgPSBvcHRzO1xuICAgICAgICBvcHRzID0ge307XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvYywgb3B0cywgY2FsbGJhY2sgc3R5bGVcbiAgICAgIGRvYyA9IGRvY09ySWQ7XG4gICAgICBpZiAodHlwZW9mIG9wdHNPclJldiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYiA9IG9wdHNPclJldjtcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2IgPSBvcHRzO1xuICAgICAgICBvcHRzID0gb3B0c09yUmV2O1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZXYkJDEgPSAoZG9jLl9yZXYgfHwgb3B0cy5yZXYpO1xuICAgIHZhciB1cmwgPSBnZW5EQlVybChob3N0LCBlbmNvZGVEb2NJZChkb2MuX2lkKSkgKyAnP3Jldj0nICsgcmV2JCQxO1xuXG4gICAgZmV0Y2hKU09OKHVybCwge21ldGhvZDogJ0RFTEVURSd9LCBjYikuY2F0Y2goY2IpO1xuICB9KTtcblxuICBmdW5jdGlvbiBlbmNvZGVBdHRhY2htZW50SWQoYXR0YWNobWVudElkKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnRJZC5zcGxpdChcIi9cIikubWFwKGVuY29kZVVSSUNvbXBvbmVudCkuam9pbihcIi9cIik7XG4gIH1cblxuICAvLyBHZXQgdGhlIGF0dGFjaG1lbnRcbiAgYXBpLmdldEF0dGFjaG1lbnQgPSBhZGFwdGVyRnVuJCQxKCdnZXRBdHRhY2htZW50JywgZnVuY3Rpb24gKGRvY0lkLCBhdHRhY2htZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cbiAgICB2YXIgcGFyYW1zID0gb3B0cy5yZXYgPyAoJz9yZXY9JyArIG9wdHMucmV2KSA6ICcnO1xuICAgIHZhciB1cmwgPSBnZW5EQlVybChob3N0LCBlbmNvZGVEb2NJZChkb2NJZCkpICsgJy8nICtcbiAgICAgICAgZW5jb2RlQXR0YWNobWVudElkKGF0dGFjaG1lbnRJZCkgKyBwYXJhbXM7XG4gICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgIG91ckZldGNoKHVybCwge21ldGhvZDogJ0dFVCd9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAhcHJvY2Vzcy5icm93c2VyICYmIHR5cGVvZiByZXNwb25zZS5idWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYnVmZmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgLy8gVE9ETzogYWxzbyByZW1vdmVcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXByb2Nlc3MuYnJvd3Nlcikge1xuICAgICAgICBibG9iLnR5cGUgPSBjb250ZW50VHlwZTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKG51bGwsIGJsb2IpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFJlbW92ZSB0aGUgYXR0YWNobWVudCBnaXZlbiBieSB0aGUgaWQgYW5kIHJldlxuICBhcGkucmVtb3ZlQXR0YWNobWVudCA9ICBhZGFwdGVyRnVuJCQxKCdyZW1vdmVBdHRhY2htZW50JywgZnVuY3Rpb24gKGRvY0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXYkJDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2spIHtcbiAgICB2YXIgdXJsID0gZ2VuREJVcmwoaG9zdCwgZW5jb2RlRG9jSWQoZG9jSWQpICsgJy8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlQXR0YWNobWVudElkKGF0dGFjaG1lbnRJZCkpICsgJz9yZXY9JyArIHJldiQkMTtcbiAgICBmZXRjaEpTT04odXJsLCB7bWV0aG9kOiAnREVMRVRFJ30sIGNhbGxiYWNrKS5jYXRjaChjYWxsYmFjayk7XG4gIH0pO1xuXG4gIC8vIEFkZCB0aGUgYXR0YWNobWVudCBnaXZlbiBieSBibG9iIGFuZCBpdHMgY29udGVudFR5cGUgcHJvcGVydHlcbiAgLy8gdG8gdGhlIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIGlkLCB0aGUgcmV2aXNpb24gZ2l2ZW4gYnkgcmV2LCBhbmRcbiAgLy8gYWRkIGl0IHRvIHRoZSBkYXRhYmFzZSBnaXZlbiBieSBob3N0LlxuICBhcGkucHV0QXR0YWNobWVudCA9IGFkYXB0ZXJGdW4kJDEoJ3B1dEF0dGFjaG1lbnQnLCBmdW5jdGlvbiAoZG9jSWQsIGF0dGFjaG1lbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldiQkMSwgYmxvYixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IHR5cGU7XG4gICAgICB0eXBlID0gYmxvYjtcbiAgICAgIGJsb2IgPSByZXYkJDE7XG4gICAgICByZXYkJDEgPSBudWxsO1xuICAgIH1cbiAgICB2YXIgaWQgPSBlbmNvZGVEb2NJZChkb2NJZCkgKyAnLycgKyBlbmNvZGVBdHRhY2htZW50SWQoYXR0YWNobWVudElkKTtcbiAgICB2YXIgdXJsID0gZ2VuREJVcmwoaG9zdCwgaWQpO1xuICAgIGlmIChyZXYkJDEpIHtcbiAgICAgIHVybCArPSAnP3Jldj0nICsgcmV2JCQxO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYmxvYiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGlucHV0IGlzIGFzc3VtZWQgdG8gYmUgYSBiYXNlNjQgc3RyaW5nXG4gICAgICB2YXIgYmluYXJ5O1xuICAgICAgdHJ5IHtcbiAgICAgICAgYmluYXJ5ID0gdGhpc0F0b2IoYmxvYik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNyZWF0ZUVycm9yKEJBRF9BUkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQXR0YWNobWVudCBpcyBub3QgYSB2YWxpZCBiYXNlNjQgc3RyaW5nJykpO1xuICAgICAgfVxuICAgICAgYmxvYiA9IGJpbmFyeSA/IGJpblN0cmluZ1RvQmx1ZmZlcihiaW5hcnksIHR5cGUpIDogJyc7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBhdHRhY2htZW50XG4gICAgZmV0Y2hKU09OKHVybCwge1xuICAgICAgaGVhZGVyczogbmV3IGgoeydDb250ZW50LVR5cGUnOiB0eXBlfSksXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keTogYmxvYlxuICAgIH0sIGNhbGxiYWNrKS5jYXRjaChjYWxsYmFjayk7XG4gIH0pO1xuXG4gIC8vIFVwZGF0ZS9jcmVhdGUgbXVsdGlwbGUgZG9jdW1lbnRzIGdpdmVuIGJ5IHJlcSBpbiB0aGUgZGF0YWJhc2VcbiAgLy8gZ2l2ZW4gYnkgaG9zdC5cbiAgYXBpLl9idWxrRG9jcyA9IGZ1bmN0aW9uIChyZXEsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgLy8gSWYgbmV3X2VkaXRzPWZhbHNlIHRoZW4gaXQgcHJldmVudHMgdGhlIGRhdGFiYXNlIGZyb20gY3JlYXRpbmdcbiAgICAvLyBuZXcgcmV2aXNpb24gbnVtYmVycyBmb3IgdGhlIGRvY3VtZW50cy4gSW5zdGVhZCBpdCBqdXN0IHVzZXNcbiAgICAvLyB0aGUgb2xkIG9uZXMuIFRoaXMgaXMgdXNlZCBpbiBkYXRhYmFzZSByZXBsaWNhdGlvbi5cbiAgICByZXEubmV3X2VkaXRzID0gb3B0cy5uZXdfZWRpdHM7XG5cbiAgICBzZXR1cCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJlcS5kb2NzLm1hcChwcmVwcm9jZXNzQXR0YWNobWVudHMkMSkpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVXBkYXRlL2NyZWF0ZSB0aGUgZG9jdW1lbnRzXG4gICAgICByZXR1cm4gZmV0Y2hKU09OKGdlbkRCVXJsKGhvc3QsICdfYnVsa19kb2NzJyksIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcSlcbiAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9KS5jYXRjaChjYWxsYmFjayk7XG4gIH07XG5cblxuICAvLyBVcGRhdGUvY3JlYXRlIGRvY3VtZW50XG4gIGFwaS5fcHV0ID0gZnVuY3Rpb24gKGRvYywgb3B0cywgY2FsbGJhY2spIHtcbiAgICBzZXR1cCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByZXByb2Nlc3NBdHRhY2htZW50cyQxKGRvYyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZmV0Y2hKU09OKGdlbkRCVXJsKGhvc3QsIGVuY29kZURvY0lkKGRvYy5faWQpKSwge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkb2MpXG4gICAgICB9KTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdC5kYXRhKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBlcnIuZG9jSWQgPSBkb2MgJiYgZG9jLl9pZDtcbiAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgfSk7XG4gIH07XG5cblxuICAvLyBHZXQgYSBsaXN0aW5nIG9mIHRoZSBkb2N1bWVudHMgaW4gdGhlIGRhdGFiYXNlIGdpdmVuXG4gIC8vIGJ5IGhvc3QgYW5kIG9yZGVyZWQgYnkgaW5jcmVhc2luZyBpZC5cbiAgYXBpLmFsbERvY3MgPSBhZGFwdGVyRnVuJCQxKCdhbGxEb2NzJywgZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuICAgIG9wdHMgPSBjbG9uZShvcHRzKTtcblxuICAgIC8vIExpc3Qgb2YgcGFyYW1ldGVycyB0byBhZGQgdG8gdGhlIEdFVCByZXF1ZXN0XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIHZhciBib2R5O1xuICAgIHZhciBtZXRob2QgPSAnR0VUJztcblxuICAgIGlmIChvcHRzLmNvbmZsaWN0cykge1xuICAgICAgcGFyYW1zLmNvbmZsaWN0cyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKG9wdHMudXBkYXRlX3NlcSkge1xuICAgICAgcGFyYW1zLnVwZGF0ZV9zZXEgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlc2NlbmRpbmcpIHtcbiAgICAgIHBhcmFtcy5kZXNjZW5kaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5pbmNsdWRlX2RvY3MpIHtcbiAgICAgIHBhcmFtcy5pbmNsdWRlX2RvY3MgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGFkZGVkIGluIENvdWNoREIgMS42LjBcbiAgICBpZiAob3B0cy5hdHRhY2htZW50cykge1xuICAgICAgcGFyYW1zLmF0dGFjaG1lbnRzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5rZXkpIHtcbiAgICAgIHBhcmFtcy5rZXkgPSBKU09OLnN0cmluZ2lmeShvcHRzLmtleSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc3RhcnRfa2V5KSB7XG4gICAgICBvcHRzLnN0YXJ0a2V5ID0gb3B0cy5zdGFydF9rZXk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc3RhcnRrZXkpIHtcbiAgICAgIHBhcmFtcy5zdGFydGtleSA9IEpTT04uc3RyaW5naWZ5KG9wdHMuc3RhcnRrZXkpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuZF9rZXkpIHtcbiAgICAgIG9wdHMuZW5ka2V5ID0gb3B0cy5lbmRfa2V5O1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuZGtleSkge1xuICAgICAgcGFyYW1zLmVuZGtleSA9IEpTT04uc3RyaW5naWZ5KG9wdHMuZW5ka2V5KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuaW5jbHVzaXZlX2VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBhcmFtcy5pbmNsdXNpdmVfZW5kID0gISFvcHRzLmluY2x1c2l2ZV9lbmQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmxpbWl0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGFyYW1zLmxpbWl0ID0gb3B0cy5saW1pdDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuc2tpcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBhcmFtcy5za2lwID0gb3B0cy5za2lwO1xuICAgIH1cblxuICAgIHZhciBwYXJhbVN0ciA9IHBhcmFtc1RvU3RyKHBhcmFtcyk7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMua2V5cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGJvZHkgPSB7a2V5czogb3B0cy5rZXlzfTtcbiAgICB9XG5cbiAgICBmZXRjaEpTT04oZ2VuREJVcmwoaG9zdCwgJ19hbGxfZG9jcycgKyBwYXJhbVN0ciksIHtcbiAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICBpZiAob3B0cy5pbmNsdWRlX2RvY3MgJiYgb3B0cy5hdHRhY2htZW50cyAmJiBvcHRzLmJpbmFyeSkge1xuICAgICAgICByZXN1bHQuZGF0YS5yb3dzLmZvckVhY2gocmVhZEF0dGFjaG1lbnRzQXNCbG9iT3JCdWZmZXIpO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0LmRhdGEpO1xuICAgIH0pLmNhdGNoKGNhbGxiYWNrKTtcbiAgfSk7XG5cbiAgLy8gR2V0IGEgbGlzdCBvZiBjaGFuZ2VzIG1hZGUgdG8gZG9jdW1lbnRzIGluIHRoZSBkYXRhYmFzZSBnaXZlbiBieSBob3N0LlxuICAvLyBUT0RPIEFjY29yZGluZyB0byB0aGUgUkVBRE1FLCB0aGVyZSBzaG91bGQgYmUgdHdvIG90aGVyIG1ldGhvZHMgaGVyZSxcbiAgLy8gYXBpLmNoYW5nZXMuYWRkTGlzdGVuZXIgYW5kIGFwaS5jaGFuZ2VzLnJlbW92ZUxpc3RlbmVyLlxuICBhcGkuX2NoYW5nZXMgPSBmdW5jdGlvbiAob3B0cykge1xuXG4gICAgLy8gV2UgaW50ZXJuYWxseSBwYWdlIHRoZSByZXN1bHRzIG9mIGEgY2hhbmdlcyByZXF1ZXN0LCB0aGlzIG1lYW5zXG4gICAgLy8gaWYgdGhlcmUgaXMgYSBsYXJnZSBzZXQgb2YgY2hhbmdlcyB0byBiZSByZXR1cm5lZCB3ZSBjYW4gc3RhcnRcbiAgICAvLyBwcm9jZXNzaW5nIHRoZW0gcXVpY2tlciBpbnN0ZWFkIG9mIHdhaXRpbmcgb24gdGhlIGVudGlyZVxuICAgIC8vIHNldCBvZiBjaGFuZ2VzIHRvIHJldHVybiBhbmQgYXR0ZW1wdGluZyB0byBwcm9jZXNzIHRoZW0gYXQgb25jZVxuICAgIHZhciBiYXRjaFNpemUgPSAnYmF0Y2hfc2l6ZScgaW4gb3B0cyA/IG9wdHMuYmF0Y2hfc2l6ZSA6IENIQU5HRVNfQkFUQ0hfU0laRTtcblxuICAgIG9wdHMgPSBjbG9uZShvcHRzKTtcblxuICAgIGlmIChvcHRzLmNvbnRpbnVvdXMgJiYgISgnaGVhcnRiZWF0JyBpbiBvcHRzKSkge1xuICAgICAgb3B0cy5oZWFydGJlYXQgPSBERUZBVUxUX0hFQVJUQkVBVDtcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdFRpbWVvdXQgPSAoJ3RpbWVvdXQnIGluIG9wdHMpID8gb3B0cy50aW1lb3V0IDogMzAgKiAxMDAwO1xuXG4gICAgLy8gZW5zdXJlIENIQU5HRVNfVElNRU9VVF9CVUZGRVIgYXBwbGllc1xuICAgIGlmICgndGltZW91dCcgaW4gb3B0cyAmJiBvcHRzLnRpbWVvdXQgJiZcbiAgICAgIChyZXF1ZXN0VGltZW91dCAtIG9wdHMudGltZW91dCkgPCBDSEFOR0VTX1RJTUVPVVRfQlVGRkVSKSB7XG4gICAgICAgIHJlcXVlc3RUaW1lb3V0ID0gb3B0cy50aW1lb3V0ICsgQ0hBTkdFU19USU1FT1VUX0JVRkZFUjtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoJ2hlYXJ0YmVhdCcgaW4gb3B0cyAmJiBvcHRzLmhlYXJ0YmVhdCAmJlxuICAgICAgIChyZXF1ZXN0VGltZW91dCAtIG9wdHMuaGVhcnRiZWF0KSA8IENIQU5HRVNfVElNRU9VVF9CVUZGRVIpIHtcbiAgICAgICAgcmVxdWVzdFRpbWVvdXQgPSBvcHRzLmhlYXJ0YmVhdCArIENIQU5HRVNfVElNRU9VVF9CVUZGRVI7XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIGlmICgndGltZW91dCcgaW4gb3B0cyAmJiBvcHRzLnRpbWVvdXQpIHtcbiAgICAgIHBhcmFtcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0O1xuICAgIH1cblxuICAgIHZhciBsaW1pdCA9ICh0eXBlb2Ygb3B0cy5saW1pdCAhPT0gJ3VuZGVmaW5lZCcpID8gb3B0cy5saW1pdCA6IGZhbHNlO1xuICAgIHZhciBsZWZ0VG9GZXRjaCA9IGxpbWl0O1xuXG4gICAgaWYgKG9wdHMuc3R5bGUpIHtcbiAgICAgIHBhcmFtcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuaW5jbHVkZV9kb2NzIHx8IG9wdHMuZmlsdGVyICYmIHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGFyYW1zLmluY2x1ZGVfZG9jcyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuYXR0YWNobWVudHMpIHtcbiAgICAgIHBhcmFtcy5hdHRhY2htZW50cyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuY29udGludW91cykge1xuICAgICAgcGFyYW1zLmZlZWQgPSAnbG9uZ3BvbGwnO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnNlcV9pbnRlcnZhbCkge1xuICAgICAgcGFyYW1zLnNlcV9pbnRlcnZhbCA9IG9wdHMuc2VxX2ludGVydmFsO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmNvbmZsaWN0cykge1xuICAgICAgcGFyYW1zLmNvbmZsaWN0cyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVzY2VuZGluZykge1xuICAgICAgcGFyYW1zLmRlc2NlbmRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChvcHRzLnVwZGF0ZV9zZXEpIHtcbiAgICAgIHBhcmFtcy51cGRhdGVfc2VxID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoJ2hlYXJ0YmVhdCcgaW4gb3B0cykge1xuICAgICAgLy8gSWYgdGhlIGhlYXJ0YmVhdCB2YWx1ZSBpcyBmYWxzZSwgaXQgZGlzYWJsZXMgdGhlIGRlZmF1bHQgaGVhcnRiZWF0XG4gICAgICBpZiAob3B0cy5oZWFydGJlYXQpIHtcbiAgICAgICAgcGFyYW1zLmhlYXJ0YmVhdCA9IG9wdHMuaGVhcnRiZWF0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRzLmZpbHRlciAmJiB0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMudmlldyAmJiB0eXBlb2Ygb3B0cy52aWV3ID09PSAnc3RyaW5nJykge1xuICAgICAgcGFyYW1zLmZpbHRlciA9ICdfdmlldyc7XG4gICAgICBwYXJhbXMudmlldyA9IG9wdHMudmlldztcbiAgICB9XG5cbiAgICAvLyBJZiBvcHRzLnF1ZXJ5X3BhcmFtcyBleGlzdHMsIHBhc3MgaXQgdGhyb3VnaCB0byB0aGUgY2hhbmdlcyByZXF1ZXN0LlxuICAgIC8vIFRoZXNlIHBhcmFtZXRlcnMgbWF5IGJlIHVzZWQgYnkgdGhlIGZpbHRlciBvbiB0aGUgc291cmNlIGRhdGFiYXNlLlxuICAgIGlmIChvcHRzLnF1ZXJ5X3BhcmFtcyAmJiB0eXBlb2Ygb3B0cy5xdWVyeV9wYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBwYXJhbV9uYW1lIGluIG9wdHMucXVlcnlfcGFyYW1zKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChvcHRzLnF1ZXJ5X3BhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbV9uYW1lKSkge1xuICAgICAgICAgIHBhcmFtc1twYXJhbV9uYW1lXSA9IG9wdHMucXVlcnlfcGFyYW1zW3BhcmFtX25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG1ldGhvZCA9ICdHRVQnO1xuICAgIHZhciBib2R5O1xuXG4gICAgaWYgKG9wdHMuZG9jX2lkcykge1xuICAgICAgLy8gc2V0IHRoaXMgYXV0b21hZ2ljYWxseSBmb3IgdGhlIHVzZXI7IGl0J3MgYW5ub3lpbmcgdGhhdCBjb3VjaGRiXG4gICAgICAvLyByZXF1aXJlcyBib3RoIGEgXCJmaWx0ZXJcIiBhbmQgYSBcImRvY19pZHNcIiBwYXJhbS5cbiAgICAgIHBhcmFtcy5maWx0ZXIgPSAnX2RvY19pZHMnO1xuICAgICAgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgYm9keSA9IHtkb2NfaWRzOiBvcHRzLmRvY19pZHMgfTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBlbHNlIGlmIChvcHRzLnNlbGVjdG9yKSB7XG4gICAgICAvLyBzZXQgdGhpcyBhdXRvbWFnaWNhbGx5IGZvciB0aGUgdXNlciwgc2ltaWxhciB0byBhYm92ZVxuICAgICAgcGFyYW1zLmZpbHRlciA9ICdfc2VsZWN0b3InO1xuICAgICAgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgYm9keSA9IHtzZWxlY3Rvcjogb3B0cy5zZWxlY3RvciB9O1xuICAgIH1cblxuICAgIHZhciBjb250cm9sbGVyID0gbmV3IGEoKTtcbiAgICB2YXIgbGFzdEZldGNoZWRTZXE7XG5cbiAgICAvLyBHZXQgYWxsIHRoZSBjaGFuZ2VzIHN0YXJ0aW5nIHd0aWggdGhlIG9uZSBpbW1lZGlhdGVseSBhZnRlciB0aGVcbiAgICAvLyBzZXF1ZW5jZSBudW1iZXIgZ2l2ZW4gYnkgc2luY2UuXG4gICAgdmFyIGZldGNoRGF0YSA9IGZ1bmN0aW9uIChzaW5jZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChvcHRzLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGFyYW1zLnNpbmNlID0gc2luY2U7XG4gICAgICAvLyBcInNpbmNlXCIgY2FuIGJlIGFueSBraW5kIG9mIGpzb24gb2JqZWN0IGluIENsb3VkYW50L0NvdWNoREIgMi54XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKHR5cGVvZiBwYXJhbXMuc2luY2UgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcGFyYW1zLnNpbmNlID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zLnNpbmNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuZGVzY2VuZGluZykge1xuICAgICAgICBpZiAobGltaXQpIHtcbiAgICAgICAgICBwYXJhbXMubGltaXQgPSBsZWZ0VG9GZXRjaDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLmxpbWl0ID0gKCFsaW1pdCB8fCBsZWZ0VG9GZXRjaCA+IGJhdGNoU2l6ZSkgP1xuICAgICAgICAgIGJhdGNoU2l6ZSA6IGxlZnRUb0ZldGNoO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgdGhlIG9wdGlvbnMgZm9yIHRoZSBhamF4IGNhbGxcbiAgICAgIHZhciB1cmwgPSBnZW5EQlVybChob3N0LCAnX2NoYW5nZXMnICsgcGFyYW1zVG9TdHIocGFyYW1zKSk7XG4gICAgICB2YXIgZmV0Y2hPcHRzID0ge1xuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICAgIH07XG4gICAgICBsYXN0RmV0Y2hlZFNlcSA9IHNpbmNlO1xuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChvcHRzLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIGNoYW5nZXNcbiAgICAgIHNldHVwKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaEpTT04odXJsLCBmZXRjaE9wdHMsIGNhbGxiYWNrKTtcbiAgICAgIH0pLmNhdGNoKGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgLy8gSWYgb3B0cy5zaW5jZSBleGlzdHMsIGdldCBhbGwgdGhlIGNoYW5nZXMgZnJvbSB0aGUgc2VxdWVuY2VcbiAgICAvLyBudW1iZXIgZ2l2ZW4gYnkgb3B0cy5zaW5jZS4gT3RoZXJ3aXNlLCBnZXQgYWxsIHRoZSBjaGFuZ2VzXG4gICAgLy8gZnJvbSB0aGUgc2VxdWVuY2UgbnVtYmVyIDAuXG4gICAgdmFyIHJlc3VsdHMgPSB7cmVzdWx0czogW119O1xuXG4gICAgdmFyIGZldGNoZWQgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgIGlmIChvcHRzLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHJhd19yZXN1bHRzX2xlbmd0aCA9IDA7XG4gICAgICAvLyBJZiB0aGUgcmVzdWx0IG9mIHRoZSBhamF4IGNhbGwgKHJlcykgY29udGFpbnMgY2hhbmdlcyAocmVzLnJlc3VsdHMpXG4gICAgICBpZiAocmVzICYmIHJlcy5yZXN1bHRzKSB7XG4gICAgICAgIHJhd19yZXN1bHRzX2xlbmd0aCA9IHJlcy5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cy5sYXN0X3NlcSA9IHJlcy5sYXN0X3NlcTtcbiAgICAgICAgdmFyIHBlbmRpbmcgPSBudWxsO1xuICAgICAgICB2YXIgbGFzdFNlcSA9IG51bGw7XG4gICAgICAgIC8vIEF0dGFjaCAncGVuZGluZycgcHJvcGVydHkgaWYgc2VydmVyIHN1cHBvcnRzIGl0IChDb3VjaERCIDIuMCspXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodHlwZW9mIHJlcy5wZW5kaW5nID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHBlbmRpbmcgPSByZXMucGVuZGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdHMubGFzdF9zZXEgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiByZXN1bHRzLmxhc3Rfc2VxID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGxhc3RTZXEgPSByZXN1bHRzLmxhc3Rfc2VxO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZvciBlYWNoIGNoYW5nZVxuICAgICAgICB2YXIgcmVxID0ge307XG4gICAgICAgIHJlcS5xdWVyeSA9IG9wdHMucXVlcnlfcGFyYW1zO1xuICAgICAgICByZXMucmVzdWx0cyA9IHJlcy5yZXN1bHRzLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgICAgICAgIGxlZnRUb0ZldGNoLS07XG4gICAgICAgICAgdmFyIHJldCA9IGZpbHRlckNoYW5nZShvcHRzKShjKTtcbiAgICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICBpZiAob3B0cy5pbmNsdWRlX2RvY3MgJiYgb3B0cy5hdHRhY2htZW50cyAmJiBvcHRzLmJpbmFyeSkge1xuICAgICAgICAgICAgICByZWFkQXR0YWNobWVudHNBc0Jsb2JPckJ1ZmZlcihjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnJldHVybl9kb2NzKSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucmVzdWx0cy5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0cy5vbkNoYW5nZShjLCBwZW5kaW5nLCBsYXN0U2VxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGVycikge1xuICAgICAgICAvLyBJbiBjYXNlIG9mIGFuIGVycm9yLCBzdG9wIGxpc3RlbmluZyBmb3IgY2hhbmdlcyBhbmQgY2FsbFxuICAgICAgICAvLyBvcHRzLmNvbXBsZXRlXG4gICAgICAgIG9wdHMuYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIG9wdHMuY29tcGxldGUoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY2hhbmdlcyBmZWVkIG1heSBoYXZlIHRpbWVkIG91dCB3aXRoIG5vIHJlc3VsdHNcbiAgICAgIC8vIGlmIHNvIHJldXNlIGxhc3QgdXBkYXRlIHNlcXVlbmNlXG4gICAgICBpZiAocmVzICYmIHJlcy5sYXN0X3NlcSkge1xuICAgICAgICBsYXN0RmV0Y2hlZFNlcSA9IHJlcy5sYXN0X3NlcTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZpbmlzaGVkID0gKGxpbWl0ICYmIGxlZnRUb0ZldGNoIDw9IDApIHx8XG4gICAgICAgIChyZXMgJiYgcmF3X3Jlc3VsdHNfbGVuZ3RoIDwgYmF0Y2hTaXplKSB8fFxuICAgICAgICAob3B0cy5kZXNjZW5kaW5nKTtcblxuICAgICAgaWYgKChvcHRzLmNvbnRpbnVvdXMgJiYgIShsaW1pdCAmJiBsZWZ0VG9GZXRjaCA8PSAwKSkgfHwgIWZpbmlzaGVkKSB7XG4gICAgICAgIC8vIFF1ZXVlIGEgY2FsbCB0byBmZXRjaCBhZ2FpbiB3aXRoIHRoZSBuZXdlc3Qgc2VxdWVuY2UgbnVtYmVyXG4gICAgICAgIGltbWVkaWF0ZShmdW5jdGlvbiAoKSB7IGZldGNoRGF0YShsYXN0RmV0Y2hlZFNlcSwgZmV0Y2hlZCk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UncmUgZG9uZSwgY2FsbCB0aGUgY2FsbGJhY2tcbiAgICAgICAgb3B0cy5jb21wbGV0ZShudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2hEYXRhKG9wdHMuc2luY2UgfHwgMCwgZmV0Y2hlZCk7XG5cbiAgICAvLyBSZXR1cm4gYSBtZXRob2QgdG8gY2FuY2VsIHRoaXMgbWV0aG9kIGZyb20gcHJvY2Vzc2luZyBhbnkgbW9yZVxuICAgIHJldHVybiB7XG4gICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3B0cy5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gR2l2ZW4gYSBzZXQgb2YgZG9jdW1lbnQvcmV2aXNpb24gSURzIChnaXZlbiBieSByZXEpLCB0ZXRzIHRoZSBzdWJzZXQgb2ZcbiAgLy8gdGhvc2UgdGhhdCBkbyBOT1QgY29ycmVzcG9uZCB0byByZXZpc2lvbnMgc3RvcmVkIGluIHRoZSBkYXRhYmFzZS5cbiAgLy8gU2VlIGh0dHA6Ly93aWtpLmFwYWNoZS5vcmcvY291Y2hkYi9IdHRwUG9zdFJldnNEaWZmXG4gIGFwaS5yZXZzRGlmZiA9IGFkYXB0ZXJGdW4kJDEoJ3JldnNEaWZmJywgZnVuY3Rpb24gKHJlcSwgb3B0cywgY2FsbGJhY2spIHtcbiAgICAvLyBJZiBubyBvcHRpb25zIHdlcmUgZ2l2ZW4sIHNldCB0aGUgY2FsbGJhY2sgdG8gYmUgdGhlIHNlY29uZCBwYXJhbWV0ZXJcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG1pc3NpbmcgZG9jdW1lbnQvcmV2aXNpb24gSURzXG4gICAgZmV0Y2hKU09OKGdlbkRCVXJsKGhvc3QsICdfcmV2c19kaWZmJyksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxKVxuICAgIH0sIGNhbGxiYWNrKS5jYXRjaChjYWxsYmFjayk7XG4gIH0pO1xuXG4gIGFwaS5fY2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjaygpO1xuICB9O1xuXG4gIGFwaS5fZGVzdHJveSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGZldGNoSlNPTihnZW5EQlVybChob3N0LCAnJyksIHttZXRob2Q6ICdERUxFVEUnfSkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgY2FsbGJhY2sobnVsbCwganNvbik7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHtvazogdHJ1ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cblxuLy8gSHR0cFBvdWNoIGlzIGEgdmFsaWQgYWRhcHRlci5cbkh0dHBQb3VjaC52YWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBIdHRwUG91Y2gkMSAoUG91Y2hEQikge1xuICBQb3VjaERCLmFkYXB0ZXIoJ2h0dHAnLCBIdHRwUG91Y2gsIGZhbHNlKTtcbiAgUG91Y2hEQi5hZGFwdGVyKCdodHRwcycsIEh0dHBQb3VjaCwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBRdWVyeVBhcnNlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLnN0YXR1cyA9IDQwMDtcbiAgdGhpcy5uYW1lID0gJ3F1ZXJ5X3BhcnNlX2Vycm9yJztcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5lcnJvciA9IHRydWU7XG4gIHRyeSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgUXVlcnlQYXJzZUVycm9yKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuaW5oZXJpdHMoUXVlcnlQYXJzZUVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIE5vdEZvdW5kRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLnN0YXR1cyA9IDQwNDtcbiAgdGhpcy5uYW1lID0gJ25vdF9mb3VuZCc7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMuZXJyb3IgPSB0cnVlO1xuICB0cnkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIE5vdEZvdW5kRXJyb3IpO1xuICB9IGNhdGNoIChlKSB7fVxufVxuXG5pbmhlcml0cyhOb3RGb3VuZEVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIEJ1aWx0SW5FcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMuc3RhdHVzID0gNTAwO1xuICB0aGlzLm5hbWUgPSAnaW52YWxpZF92YWx1ZSc7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMuZXJyb3IgPSB0cnVlO1xuICB0cnkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEJ1aWx0SW5FcnJvcik7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbmluaGVyaXRzKEJ1aWx0SW5FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiBwcm9taXNlZENhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICBpbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXMpO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2socmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShmdW4pIHtcbiAgcmV0dXJuIGdldEFyZ3VtZW50cyhmdW5jdGlvbiAoYXJncykge1xuICAgIHZhciBjYiA9IGFyZ3MucG9wKCk7XG4gICAgdmFyIHByb21pc2UgPSBmdW4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvbWlzZWRDYWxsYmFjayhwcm9taXNlLCBjYik7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xuICB9KTtcbn1cblxuLy8gUHJvbWlzZSBmaW5hbGx5IHV0aWwgc2ltaWxhciB0byBRLmZpbmFsbHlcbmZ1bmN0aW9uIGZpbihwcm9taXNlLCBmaW5hbFByb21pc2VGYWN0b3J5KSB7XG4gIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgIHJldHVybiBmaW5hbFByb21pc2VGYWN0b3J5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGZpbmFsUHJvbWlzZUZhY3RvcnkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IHJlYXNvbjtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlcXVlbnRpYWxpemUocXVldWUsIHByb21pc2VGYWN0b3J5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiBxdWV1ZS5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb21pc2VGYWN0b3J5LmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgIH0pO1xuICB9O1xufVxuXG4vLyB1bmlxIGFuIGFycmF5IG9mIHN0cmluZ3MsIG9yZGVyIG5vdCBndWFyYW50ZWVkXG4vLyBzaW1pbGFyIHRvIHVuZGVyc2NvcmUvbG9kYXNoIF8udW5pcVxuZnVuY3Rpb24gdW5pcShhcnIpIHtcbiAgdmFyIHRoZVNldCA9IG5ldyBFeHBvcnRlZFNldChhcnIpO1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHRoZVNldC5zaXplKTtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIHRoZVNldC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbWFwVG9LZXlzQXJyYXkobWFwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobWFwLnNpemUpO1xuICB2YXIgaW5kZXggPSAtMTtcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBrZXk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWlsdEluRXJyb3IobmFtZSkge1xuICB2YXIgbWVzc2FnZSA9ICdidWlsdGluICcgKyBuYW1lICtcbiAgICAnIGZ1bmN0aW9uIHJlcXVpcmVzIG1hcCB2YWx1ZXMgdG8gYmUgbnVtYmVycycgK1xuICAgICcgb3IgbnVtYmVyIGFycmF5cyc7XG4gIHJldHVybiBuZXcgQnVpbHRJbkVycm9yKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBzdW0odmFsdWVzKSB7XG4gIHZhciByZXN1bHQgPSAwO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIG51bSA9IHZhbHVlc1tpXTtcbiAgICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG51bSkpIHtcbiAgICAgICAgLy8gbGlzdHMgb2YgbnVtYmVycyBhcmUgYWxzbyBhbGxvd2VkLCBzdW0gdGhlbSBzZXBhcmF0ZWx5XG4gICAgICAgIHJlc3VsdCA9IHR5cGVvZiByZXN1bHQgPT09ICdudW1iZXInID8gW3Jlc3VsdF0gOiByZXN1bHQ7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqTGVuID0gbnVtLmxlbmd0aDsgaiA8IGpMZW47IGorKykge1xuICAgICAgICAgIHZhciBqTnVtID0gbnVtW2pdO1xuICAgICAgICAgIGlmICh0eXBlb2Ygak51bSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUJ1aWx0SW5FcnJvcignX3N1bScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3VsdFtqXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGpOdW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRbal0gKz0gak51bTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIG5vdCBhcnJheS9udW1iZXJcbiAgICAgICAgdGhyb3cgY3JlYXRlQnVpbHRJbkVycm9yKCdfc3VtJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnbnVtYmVyJykge1xuICAgICAgcmVzdWx0ICs9IG51bTtcbiAgICB9IGVsc2UgeyAvLyBhZGQgbnVtYmVyIHRvIGFycmF5XG4gICAgICByZXN1bHRbMF0gKz0gbnVtO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgbG9nID0gZ3VhcmRlZENvbnNvbGUuYmluZChudWxsLCAnbG9nJyk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgdG9KU09OID0gSlNPTi5wYXJzZTtcblxuZnVuY3Rpb24gZXZhbEZ1bmN0aW9uV2l0aEV2YWwoZnVuYywgZW1pdCkge1xuICByZXR1cm4gc2NvcGVFdmFsKFxuICAgIFwicmV0dXJuIChcIiArIGZ1bmMucmVwbGFjZSgvO1xccyokLywgXCJcIikgKyBcIik7XCIsXG4gICAge1xuICAgICAgZW1pdDogZW1pdCxcbiAgICAgIHN1bTogc3VtLFxuICAgICAgbG9nOiBsb2csXG4gICAgICBpc0FycmF5OiBpc0FycmF5LFxuICAgICAgdG9KU09OOiB0b0pTT05cbiAgICB9XG4gICk7XG59XG5cbi8qXG4gKiBTaW1wbGUgdGFzayBxdWV1ZSB0byBzZXF1ZW50aWFsaXplIGFjdGlvbnMuIEFzc3VtZXNcbiAqIGNhbGxiYWNrcyB3aWxsIGV2ZW50dWFsbHkgZmlyZSAob25jZSkuXG4gKi9cblxuXG5mdW5jdGlvbiBUYXNrUXVldWUkMSgpIHtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwpIHtmdWxmaWxsKCk7IH0pO1xufVxuVGFza1F1ZXVlJDEucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChwcm9taXNlRmFjdG9yeSkge1xuICB0aGlzLnByb21pc2UgPSB0aGlzLnByb21pc2UuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIC8vIGp1c3QgcmVjb3ZlclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvbWlzZUZhY3RvcnkoKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzLnByb21pc2U7XG59O1xuVGFza1F1ZXVlJDEucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbn07XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShpbnB1dCkge1xuICBpZiAoIWlucHV0KSB7XG4gICAgcmV0dXJuICd1bmRlZmluZWQnOyAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBlbXB0eSByZWR1Y2VcbiAgfVxuICAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdCB3aXRoIG1hcHJlZHVjZSwgZnVuY3Rpb25zL3N0cmluZ3MgYXJlIHN0cmluZ2lmaWVkXG4gIC8vIGFzLWlzLiBldmVyeXRoaW5nIGVsc2UgaXMgSlNPTi1zdHJpbmdpZmllZC5cbiAgc3dpdGNoICh0eXBlb2YgaW5wdXQpIHtcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAvLyBlLmcuIGEgbWFwcmVkdWNlIG1hcFxuICAgICAgcmV0dXJuIGlucHV0LnRvU3RyaW5nKCk7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIC8vIGUuZy4gYSBtYXByZWR1Y2UgYnVpbHQtaW4gX3JlZHVjZSBmdW5jdGlvblxuICAgICAgcmV0dXJuIGlucHV0LnRvU3RyaW5nKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIGUuZy4gYSBKU09OIG9iamVjdCBpbiB0aGUgY2FzZSBvZiBtYW5nbyBxdWVyaWVzXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaW5wdXQpO1xuICB9XG59XG5cbi8qIGNyZWF0ZSBhIHN0cmluZyBzaWduYXR1cmUgZm9yIGEgdmlldyBzbyB3ZSBjYW4gY2FjaGUgaXQgYW5kIHVuaXEgaXQgKi9cbmZ1bmN0aW9uIGNyZWF0ZVZpZXdTaWduYXR1cmUobWFwRnVuLCByZWR1Y2VGdW4pIHtcbiAgLy8gdGhlIFwidW5kZWZpbmVkXCIgcGFydCBpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgcmV0dXJuIHN0cmluZ2lmeShtYXBGdW4pICsgc3RyaW5naWZ5KHJlZHVjZUZ1bikgKyAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlldyhzb3VyY2VEQiwgdmlld05hbWUsIG1hcEZ1biwgcmVkdWNlRnVuLCB0ZW1wb3JhcnksIGxvY2FsRG9jTmFtZSkge1xuICB2YXIgdmlld1NpZ25hdHVyZSA9IGNyZWF0ZVZpZXdTaWduYXR1cmUobWFwRnVuLCByZWR1Y2VGdW4pO1xuXG4gIHZhciBjYWNoZWRWaWV3cztcbiAgaWYgKCF0ZW1wb3JhcnkpIHtcbiAgICAvLyBjYWNoZSB0aGlzIHRvIGVuc3VyZSB3ZSBkb24ndCB0cnkgdG8gdXBkYXRlIHRoZSBzYW1lIHZpZXcgdHdpY2VcbiAgICBjYWNoZWRWaWV3cyA9IHNvdXJjZURCLl9jYWNoZWRWaWV3cyA9IHNvdXJjZURCLl9jYWNoZWRWaWV3cyB8fCB7fTtcbiAgICBpZiAoY2FjaGVkVmlld3Nbdmlld1NpZ25hdHVyZV0pIHtcbiAgICAgIHJldHVybiBjYWNoZWRWaWV3c1t2aWV3U2lnbmF0dXJlXTtcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvbWlzZUZvclZpZXcgPSBzb3VyY2VEQi5pbmZvKCkudGhlbihmdW5jdGlvbiAoaW5mbykge1xuXG4gICAgdmFyIGRlcERiTmFtZSA9IGluZm8uZGJfbmFtZSArICctbXJ2aWV3LScgK1xuICAgICAgKHRlbXBvcmFyeSA/ICd0ZW1wJyA6IHN0cmluZ01kNSh2aWV3U2lnbmF0dXJlKSk7XG5cbiAgICAvLyBzYXZlIHRoZSB2aWV3IG5hbWUgaW4gdGhlIHNvdXJjZSBkYiBzbyBpdCBjYW4gYmUgY2xlYW5lZCB1cCBpZiBuZWNlc3NhcnlcbiAgICAvLyAoZS5nLiB3aGVuIHRoZSBfZGVzaWduIGRvYyBpcyBkZWxldGVkLCByZW1vdmUgYWxsIGFzc29jaWF0ZWQgdmlldyBkYXRhKVxuICAgIGZ1bmN0aW9uIGRpZmZGdW5jdGlvbihkb2MpIHtcbiAgICAgIGRvYy52aWV3cyA9IGRvYy52aWV3cyB8fCB7fTtcbiAgICAgIHZhciBmdWxsVmlld05hbWUgPSB2aWV3TmFtZTtcbiAgICAgIGlmIChmdWxsVmlld05hbWUuaW5kZXhPZignLycpID09PSAtMSkge1xuICAgICAgICBmdWxsVmlld05hbWUgPSB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lO1xuICAgICAgfVxuICAgICAgdmFyIGRlcERicyA9IGRvYy52aWV3c1tmdWxsVmlld05hbWVdID0gZG9jLnZpZXdzW2Z1bGxWaWV3TmFtZV0gfHwge307XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChkZXBEYnNbZGVwRGJOYW1lXSkge1xuICAgICAgICByZXR1cm47IC8vIG5vIHVwZGF0ZSBuZWNlc3NhcnlcbiAgICAgIH1cbiAgICAgIGRlcERic1tkZXBEYk5hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIHJldHVybiB1cHNlcnQoc291cmNlREIsICdfbG9jYWwvJyArIGxvY2FsRG9jTmFtZSwgZGlmZkZ1bmN0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzb3VyY2VEQi5yZWdpc3RlckRlcGVuZGVudERhdGFiYXNlKGRlcERiTmFtZSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBkYiA9IHJlcy5kYjtcbiAgICAgICAgZGIuYXV0b19jb21wYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIHZpZXcgPSB7XG4gICAgICAgICAgbmFtZTogZGVwRGJOYW1lLFxuICAgICAgICAgIGRiOiBkYixcbiAgICAgICAgICBzb3VyY2VEQjogc291cmNlREIsXG4gICAgICAgICAgYWRhcHRlcjogc291cmNlREIuYWRhcHRlcixcbiAgICAgICAgICBtYXBGdW46IG1hcEZ1bixcbiAgICAgICAgICByZWR1Y2VGdW46IHJlZHVjZUZ1blxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmlldy5kYi5nZXQoJ19sb2NhbC9sYXN0U2VxJykuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgIGlmIChlcnIuc3RhdHVzICE9PSA0MDQpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGxhc3RTZXFEb2MpIHtcbiAgICAgICAgICB2aWV3LnNlcSA9IGxhc3RTZXFEb2MgPyBsYXN0U2VxRG9jLnNlcSA6IDA7XG4gICAgICAgICAgaWYgKGNhY2hlZFZpZXdzKSB7XG4gICAgICAgICAgICB2aWV3LmRiLm9uY2UoJ2Rlc3Ryb3llZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlZFZpZXdzW3ZpZXdTaWduYXR1cmVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2aWV3O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBpZiAoY2FjaGVkVmlld3MpIHtcbiAgICBjYWNoZWRWaWV3c1t2aWV3U2lnbmF0dXJlXSA9IHByb21pc2VGb3JWaWV3O1xuICB9XG4gIHJldHVybiBwcm9taXNlRm9yVmlldztcbn1cblxudmFyIHBlcnNpc3RlbnRRdWV1ZXMgPSB7fTtcbnZhciB0ZW1wVmlld1F1ZXVlID0gbmV3IFRhc2tRdWV1ZSQxKCk7XG52YXIgQ0hBTkdFU19CQVRDSF9TSVpFJDEgPSA1MDtcblxuZnVuY3Rpb24gcGFyc2VWaWV3TmFtZShuYW1lKSB7XG4gIC8vIGNhbiBiZSBlaXRoZXIgJ2Rkb2NuYW1lL3ZpZXduYW1lJyBvciBqdXN0ICd2aWV3bmFtZSdcbiAgLy8gKHdoZXJlIHRoZSBkZG9jIG5hbWUgaXMgdGhlIHNhbWUpXG4gIHJldHVybiBuYW1lLmluZGV4T2YoJy8nKSA9PT0gLTEgPyBbbmFtZSwgbmFtZV0gOiBuYW1lLnNwbGl0KCcvJyk7XG59XG5cbmZ1bmN0aW9uIGlzR2VuT25lKGNoYW5nZXMpIHtcbiAgLy8gb25seSByZXR1cm4gdHJ1ZSBpZiB0aGUgY3VycmVudCBjaGFuZ2UgaXMgMS1cbiAgLy8gYW5kIHRoZXJlIGFyZSBubyBvdGhlciBsZWFmc1xuICByZXR1cm4gY2hhbmdlcy5sZW5ndGggPT09IDEgJiYgL14xLS8udGVzdChjaGFuZ2VzWzBdLnJldik7XG59XG5cbmZ1bmN0aW9uIGVtaXRFcnJvcihkYiwgZSkge1xuICB0cnkge1xuICAgIGRiLmVtaXQoJ2Vycm9yJywgZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGd1YXJkZWRDb25zb2xlKCdlcnJvcicsXG4gICAgICAnVGhlIHVzZXJcXCdzIG1hcC9yZWR1Y2UgZnVuY3Rpb24gdGhyZXcgYW4gdW5jYXVnaHQgZXJyb3IuXFxuJyArXG4gICAgICAnWW91IGNhbiBkZWJ1ZyB0aGlzIGVycm9yIGJ5IGRvaW5nOlxcbicgK1xuICAgICAgJ215RGF0YWJhc2Uub24oXFwnZXJyb3JcXCcsIGZ1bmN0aW9uIChlcnIpIHsgZGVidWdnZXI7IH0pO1xcbicgK1xuICAgICAgJ1BsZWFzZSBkb3VibGUtY2hlY2sgeW91ciBtYXAvcmVkdWNlIGZ1bmN0aW9uLicpO1xuICAgIGd1YXJkZWRDb25zb2xlKCdlcnJvcicsIGUpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBcImFic3RyYWN0XCIgbWFwcmVkdWNlIG9iamVjdCBvZiB0aGUgZm9ybTpcbiAqXG4gKiAgIHtcbiAqICAgICBxdWVyeTogcXVlcnlGdW4sXG4gKiAgICAgdmlld0NsZWFudXA6IHZpZXdDbGVhbnVwRnVuXG4gKiAgIH1cbiAqXG4gKiBBcmd1bWVudHMgYXJlOlxuICpcbiAqIGxvY2FsRG9jOiBzdHJpbmdcbiAqICAgVGhpcyBpcyBmb3IgdGhlIGxvY2FsIGRvYyB0aGF0IGdldHMgc2F2ZWQgaW4gb3JkZXIgdG8gdHJhY2sgdGhlXG4gKiAgIFwiZGVwZW5kZW50XCIgREJzIGFuZCBjbGVhbiB0aGVtIHVwIGZvciB2aWV3Q2xlYW51cC4gSXQgc2hvdWxkIGJlXG4gKiAgIHVuaXF1ZSwgc28gdGhhdCBpbmRleGVyIHBsdWdpbnMgZG9uJ3QgY29sbGlkZSB3aXRoIGVhY2ggb3RoZXIuXG4gKiBtYXBwZXI6IGZ1bmN0aW9uIChtYXBGdW5EZWYsIGVtaXQpXG4gKiAgIFJldHVybnMgYSBtYXAgZnVuY3Rpb24gYmFzZWQgb24gdGhlIG1hcEZ1bkRlZiwgd2hpY2ggaW4gdGhlIGNhc2Ugb2ZcbiAqICAgbm9ybWFsIG1hcC9yZWR1Y2UgaXMganVzdCB0aGUgZGUtc3RyaW5naWZpZWQgZnVuY3Rpb24sIGJ1dCBtYXkgYmVcbiAqICAgc29tZXRoaW5nIGVsc2UsIHN1Y2ggYXMgYW4gb2JqZWN0IGluIHRoZSBjYXNlIG9mIHBvdWNoZGItZmluZC5cbiAqIHJlZHVjZXI6IGZ1bmN0aW9uIChyZWR1Y2VGdW5EZWYpXG4gKiAgIERpdHRvLCBidXQgZm9yIHJlZHVjaW5nLiBNb2R1bGVzIGRvbid0IGhhdmUgdG8gc3VwcG9ydCByZWR1Y2luZ1xuICogICAoZS5nLiBwb3VjaGRiLWZpbmQpLlxuICogZGRvY1ZhbGlkYXRvcjogZnVuY3Rpb24gKGRkb2MsIHZpZXdOYW1lKVxuICogICBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGRkb2Mgb3Igdmlld05hbWUgaXMgbm90IHZhbGlkLlxuICogICBUaGlzIGNvdWxkIGJlIGEgd2F5IHRvIGNvbW11bmljYXRlIHRvIHRoZSB1c2VyIHRoYXQgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZVxuICogICBpbmRleGVyIGlzIGludmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFic3RyYWN0TWFwUmVkdWNlKGxvY2FsRG9jTmFtZSwgbWFwcGVyLCByZWR1Y2VyLCBkZG9jVmFsaWRhdG9yKSB7XG5cbiAgZnVuY3Rpb24gdHJ5TWFwKGRiLCBmdW4sIGRvYykge1xuICAgIC8vIGVtaXQgYW4gZXZlbnQgaWYgdGhlcmUgd2FzIGFuIGVycm9yIHRocm93biBieSBhIG1hcCBmdW5jdGlvbi5cbiAgICAvLyBwdXR0aW5nIHRyeS9jYXRjaGVzIGluIGEgc2luZ2xlIGZ1bmN0aW9uIGFsc28gYXZvaWRzIGRlb3B0aW1pemF0aW9ucy5cbiAgICB0cnkge1xuICAgICAgZnVuKGRvYyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZW1pdEVycm9yKGRiLCBlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cnlSZWR1Y2UoZGIsIGZ1biwga2V5cywgdmFsdWVzLCByZXJlZHVjZSkge1xuICAgIC8vIHNhbWUgYXMgYWJvdmUsIGJ1dCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvciBhbiBlcnJvci4gdGhlcmUgYXJlIHR3byBzZXBhcmF0ZVxuICAgIC8vIGZ1bmN0aW9ucyB0byBhdm9pZCBleHRyYSBtZW1vcnkgYWxsb2NhdGlvbnMgc2luY2UgdGhlIHRyeUNvZGUoKSBjYXNlIGlzIHVzZWRcbiAgICAvLyBmb3IgY3VzdG9tIG1hcCBmdW5jdGlvbnMgKGNvbW1vbikgdnMgdGhpcyBmdW5jdGlvbiwgd2hpY2ggaXMgb25seSB1c2VkIGZvclxuICAgIC8vIGN1c3RvbSByZWR1Y2UgZnVuY3Rpb25zIChyYXJlKVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge291dHB1dCA6IGZ1bihrZXlzLCB2YWx1ZXMsIHJlcmVkdWNlKX07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZW1pdEVycm9yKGRiLCBlKTtcbiAgICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRCeUtleVRoZW5WYWx1ZSh4LCB5KSB7XG4gICAgdmFyIGtleUNvbXBhcmUgPSBjb2xsYXRlKHgua2V5LCB5LmtleSk7XG4gICAgcmV0dXJuIGtleUNvbXBhcmUgIT09IDAgPyBrZXlDb21wYXJlIDogY29sbGF0ZSh4LnZhbHVlLCB5LnZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWNlUmVzdWx0cyhyZXN1bHRzLCBsaW1pdCwgc2tpcCkge1xuICAgIHNraXAgPSBza2lwIHx8IDA7XG4gICAgaWYgKHR5cGVvZiBsaW1pdCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiByZXN1bHRzLnNsaWNlKHNraXAsIGxpbWl0ICsgc2tpcCk7XG4gICAgfSBlbHNlIGlmIChza2lwID4gMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHMuc2xpY2Uoc2tpcCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcm93VG9Eb2NJZChyb3cpIHtcbiAgICB2YXIgdmFsID0gcm93LnZhbHVlO1xuICAgIC8vIFVzZXJzIGNhbiBleHBsaWNpdGx5IHNwZWNpZnkgYSBqb2luZWQgZG9jIF9pZCwgb3IgaXRcbiAgICAvLyBkZWZhdWx0cyB0byB0aGUgZG9jIF9pZCB0aGF0IGVtaXR0ZWQgdGhlIGtleS92YWx1ZS5cbiAgICB2YXIgZG9jSWQgPSAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5faWQpIHx8IHJvdy5pZDtcbiAgICByZXR1cm4gZG9jSWQ7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXR0YWNobWVudHNBc0Jsb2JPckJ1ZmZlcihyZXMpIHtcbiAgICByZXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHZhciBhdHRzID0gcm93LmRvYyAmJiByb3cuZG9jLl9hdHRhY2htZW50cztcbiAgICAgIGlmICghYXR0cykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhhdHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuICAgICAgICB2YXIgYXR0ID0gYXR0c1tmaWxlbmFtZV07XG4gICAgICAgIGF0dHNbZmlsZW5hbWVdLmRhdGEgPSBiNjRUb0JsdWZmZXIoYXR0LmRhdGEsIGF0dC5jb250ZW50X3R5cGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3N0cHJvY2Vzc0F0dGFjaG1lbnRzKG9wdHMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlcykge1xuICAgICAgaWYgKG9wdHMuaW5jbHVkZV9kb2NzICYmIG9wdHMuYXR0YWNobWVudHMgJiYgb3B0cy5iaW5hcnkpIHtcbiAgICAgICAgcmVhZEF0dGFjaG1lbnRzQXNCbG9iT3JCdWZmZXIocmVzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEh0dHBQYXJhbShwYXJhbU5hbWUsIG9wdHMsIHBhcmFtcywgYXNKc29uKSB7XG4gICAgLy8gYWRkIGFuIGh0dHAgcGFyYW0gZnJvbSBvcHRzIHRvIHBhcmFtcywgb3B0aW9uYWxseSBqc29uLWVuY29kZWRcbiAgICB2YXIgdmFsID0gb3B0c1twYXJhbU5hbWVdO1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGFzSnNvbikge1xuICAgICAgICB2YWwgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodmFsKSk7XG4gICAgICB9XG4gICAgICBwYXJhbXMucHVzaChwYXJhbU5hbWUgKyAnPScgKyB2YWwpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvZXJjZUludGVnZXIoaW50ZWdlckNhbmRpZGF0ZSkge1xuICAgIGlmICh0eXBlb2YgaW50ZWdlckNhbmRpZGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBhc051bWJlciA9IE51bWJlcihpbnRlZ2VyQ2FuZGlkYXRlKTtcbiAgICAgIC8vIHByZXZlbnRzIGUuZy4gJzFmb28nIG9yICcxLjEnIGJlaW5nIGNvZXJjZWQgdG8gMVxuICAgICAgaWYgKCFpc05hTihhc051bWJlcikgJiYgYXNOdW1iZXIgPT09IHBhcnNlSW50KGludGVnZXJDYW5kaWRhdGUsIDEwKSkge1xuICAgICAgICByZXR1cm4gYXNOdW1iZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW50ZWdlckNhbmRpZGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb2VyY2VPcHRpb25zKG9wdHMpIHtcbiAgICBvcHRzLmdyb3VwX2xldmVsID0gY29lcmNlSW50ZWdlcihvcHRzLmdyb3VwX2xldmVsKTtcbiAgICBvcHRzLmxpbWl0ID0gY29lcmNlSW50ZWdlcihvcHRzLmxpbWl0KTtcbiAgICBvcHRzLnNraXAgPSBjb2VyY2VJbnRlZ2VyKG9wdHMuc2tpcCk7XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1Bvc2l0aXZlSW50ZWdlcihudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyKSB7XG4gICAgICBpZiAodHlwZW9mIG51bWJlciAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuICBuZXcgUXVlcnlQYXJzZUVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBpbnRlZ2VyOiBcIicgK1xuICAgICAgICAgIG51bWJlciArICdcIicpO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWVyeVBhcnNlRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHBvc2l0aXZlIGludGVnZXI6ICcgK1xuICAgICAgICAgICdcIicgKyBudW1iZXIgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1F1ZXJ5UGFyc2VFcnJvcihvcHRpb25zLCBmdW4pIHtcbiAgICB2YXIgc3RhcnRrZXlOYW1lID0gb3B0aW9ucy5kZXNjZW5kaW5nID8gJ2VuZGtleScgOiAnc3RhcnRrZXknO1xuICAgIHZhciBlbmRrZXlOYW1lID0gb3B0aW9ucy5kZXNjZW5kaW5nID8gJ3N0YXJ0a2V5JyA6ICdlbmRrZXknO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zW3N0YXJ0a2V5TmFtZV0gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygb3B0aW9uc1tlbmRrZXlOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGNvbGxhdGUob3B0aW9uc1tzdGFydGtleU5hbWVdLCBvcHRpb25zW2VuZGtleU5hbWVdKSA+IDApIHtcbiAgICAgIHRocm93IG5ldyBRdWVyeVBhcnNlRXJyb3IoJ05vIHJvd3MgY2FuIG1hdGNoIHlvdXIga2V5IHJhbmdlLCAnICtcbiAgICAgICAgJ3JldmVyc2UgeW91ciBzdGFydF9rZXkgYW5kIGVuZF9rZXkgb3Igc2V0IHtkZXNjZW5kaW5nIDogdHJ1ZX0nKTtcbiAgICB9IGVsc2UgaWYgKGZ1bi5yZWR1Y2UgJiYgb3B0aW9ucy5yZWR1Y2UgIT09IGZhbHNlKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmNsdWRlX2RvY3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IFF1ZXJ5UGFyc2VFcnJvcigne2luY2x1ZGVfZG9jczp0cnVlfSBpcyBpbnZhbGlkIGZvciByZWR1Y2UnKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5rZXlzICYmIG9wdGlvbnMua2V5cy5sZW5ndGggPiAxICYmXG4gICAgICAgICFvcHRpb25zLmdyb3VwICYmICFvcHRpb25zLmdyb3VwX2xldmVsKSB7XG4gICAgICAgIHRocm93IG5ldyBRdWVyeVBhcnNlRXJyb3IoJ011bHRpLWtleSBmZXRjaGVzIGZvciByZWR1Y2Ugdmlld3MgbXVzdCB1c2UgJyArXG4gICAgICAgICAgJ3tncm91cDogdHJ1ZX0nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgWydncm91cF9sZXZlbCcsICdsaW1pdCcsICdza2lwJ10uZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uTmFtZSkge1xuICAgICAgdmFyIGVycm9yID0gY2hlY2tQb3NpdGl2ZUludGVnZXIob3B0aW9uc1tvcHRpb25OYW1lXSk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBodHRwUXVlcnkoZGIsIGZ1biwgb3B0cykge1xuICAgIC8vIExpc3Qgb2YgcGFyYW1ldGVycyB0byBhZGQgdG8gdGhlIFBVVCByZXF1ZXN0XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIHZhciBib2R5O1xuICAgIHZhciBtZXRob2QgPSAnR0VUJztcbiAgICB2YXIgb2ssIHN0YXR1cztcblxuICAgIC8vIElmIG9wdHMucmVkdWNlIGV4aXN0cyBhbmQgaXMgZGVmaW5lZCwgdGhlbiBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAvLyBvZiBwYXJhbWV0ZXJzLlxuICAgIC8vIElmIHJlZHVjZT1mYWxzZSB0aGVuIHRoZSByZXN1bHRzIGFyZSB0aGF0IG9mIG9ubHkgdGhlIG1hcCBmdW5jdGlvblxuICAgIC8vIG5vdCB0aGUgZmluYWwgcmVzdWx0IG9mIG1hcCBhbmQgcmVkdWNlLlxuICAgIGFkZEh0dHBQYXJhbSgncmVkdWNlJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ2luY2x1ZGVfZG9jcycsIG9wdHMsIHBhcmFtcyk7XG4gICAgYWRkSHR0cFBhcmFtKCdhdHRhY2htZW50cycsIG9wdHMsIHBhcmFtcyk7XG4gICAgYWRkSHR0cFBhcmFtKCdsaW1pdCcsIG9wdHMsIHBhcmFtcyk7XG4gICAgYWRkSHR0cFBhcmFtKCdkZXNjZW5kaW5nJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ2dyb3VwJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ2dyb3VwX2xldmVsJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ3NraXAnLCBvcHRzLCBwYXJhbXMpO1xuICAgIGFkZEh0dHBQYXJhbSgnc3RhbGUnLCBvcHRzLCBwYXJhbXMpO1xuICAgIGFkZEh0dHBQYXJhbSgnY29uZmxpY3RzJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ3N0YXJ0a2V5Jywgb3B0cywgcGFyYW1zLCB0cnVlKTtcbiAgICBhZGRIdHRwUGFyYW0oJ3N0YXJ0X2tleScsIG9wdHMsIHBhcmFtcywgdHJ1ZSk7XG4gICAgYWRkSHR0cFBhcmFtKCdlbmRrZXknLCBvcHRzLCBwYXJhbXMsIHRydWUpO1xuICAgIGFkZEh0dHBQYXJhbSgnZW5kX2tleScsIG9wdHMsIHBhcmFtcywgdHJ1ZSk7XG4gICAgYWRkSHR0cFBhcmFtKCdpbmNsdXNpdmVfZW5kJywgb3B0cywgcGFyYW1zKTtcbiAgICBhZGRIdHRwUGFyYW0oJ2tleScsIG9wdHMsIHBhcmFtcywgdHJ1ZSk7XG4gICAgYWRkSHR0cFBhcmFtKCd1cGRhdGVfc2VxJywgb3B0cywgcGFyYW1zKTtcblxuICAgIC8vIEZvcm1hdCB0aGUgbGlzdCBvZiBwYXJhbWV0ZXJzIGludG8gYSB2YWxpZCBVUkkgcXVlcnkgc3RyaW5nXG4gICAgcGFyYW1zID0gcGFyYW1zLmpvaW4oJyYnKTtcbiAgICBwYXJhbXMgPSBwYXJhbXMgPT09ICcnID8gJycgOiAnPycgKyBwYXJhbXM7XG5cbiAgICAvLyBJZiBrZXlzIGFyZSBzdXBwbGllZCwgaXNzdWUgYSBQT1NUIHRvIGNpcmN1bXZlbnQgR0VUIHF1ZXJ5IHN0cmluZyBsaW1pdHNcbiAgICAvLyBzZWUgaHR0cDovL3dpa2kuYXBhY2hlLm9yZy9jb3VjaGRiL0hUVFBfdmlld19BUEkjUXVlcnlpbmdfT3B0aW9uc1xuICAgIGlmICh0eXBlb2Ygb3B0cy5rZXlzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIE1BWF9VUkxfTEVOR1RIID0gMjAwMDtcbiAgICAgIC8vIGFjY29yZGluZyB0byBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80MTcxODQvNjgwNzQyLFxuICAgICAgLy8gdGhlIGRlIGZhY3RvIFVSTCBsZW5ndGggbGltaXQgaXMgMjAwMCBjaGFyYWN0ZXJzXG5cbiAgICAgIHZhciBrZXlzQXNTdHJpbmcgPVxuICAgICAgICAna2V5cz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9wdHMua2V5cykpO1xuICAgICAgaWYgKGtleXNBc1N0cmluZy5sZW5ndGggKyBwYXJhbXMubGVuZ3RoICsgMSA8PSBNQVhfVVJMX0xFTkdUSCkge1xuICAgICAgICAvLyBJZiB0aGUga2V5cyBhcmUgc2hvcnQgZW5vdWdoLCBkbyBhIEdFVC4gd2UgZG8gdGhpcyB0byB3b3JrIGFyb3VuZFxuICAgICAgICAvLyBTYWZhcmkgbm90IHVuZGVyc3RhbmRpbmcgMzA0cyBvbiBQT1NUcyAoc2VlIHBvdWNoZGIvcG91Y2hkYiMxMjM5KVxuICAgICAgICBwYXJhbXMgKz0gKHBhcmFtc1swXSA9PT0gJz8nID8gJyYnIDogJz8nKSArIGtleXNBc1N0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9ICdQT1NUJztcbiAgICAgICAgaWYgKHR5cGVvZiBmdW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYm9keSA9IHtrZXlzOiBvcHRzLmtleXN9O1xuICAgICAgICB9IGVsc2UgeyAvLyBmdW4gaXMge21hcCA6IG1hcGZ1bn0sIHNvIGFwcGVuZCB0byB0aGlzXG4gICAgICAgICAgZnVuLmtleXMgPSBvcHRzLmtleXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgcmVmZXJlbmNpbmcgYSBxdWVyeSBkZWZpbmVkIGluIHRoZSBkZXNpZ24gZG9jXG4gICAgaWYgKHR5cGVvZiBmdW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgcGFydHMgPSBwYXJzZVZpZXdOYW1lKGZ1bik7XG4gICAgICByZXR1cm4gZGIuZmV0Y2goJ19kZXNpZ24vJyArIHBhcnRzWzBdICsgJy9fdmlldy8nICsgcGFydHNbMV0gKyBwYXJhbXMsIHtcbiAgICAgICAgaGVhZGVyczogbmV3IGgoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBvayA9IHJlc3BvbnNlLm9rO1xuICAgICAgICBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgICAgdGhyb3cgZ2VuZXJhdGVFcnJvckZyb21SZXNwb25zZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZhaWwgdGhlIGVudGlyZSByZXF1ZXN0IGlmIHRoZSByZXN1bHQgY29udGFpbnMgYW4gZXJyb3JcbiAgICAgICAgcmVzdWx0LnJvd3MuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKHJvdy52YWx1ZSAmJiByb3cudmFsdWUuZXJyb3IgJiYgcm93LnZhbHVlLmVycm9yID09PSBcImJ1aWx0aW5fcmVkdWNlX2Vycm9yXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyb3cucmVhc29uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSkudGhlbihwb3N0cHJvY2Vzc0F0dGFjaG1lbnRzKG9wdHMpKTtcbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgdXNpbmcgYSB0ZW1wb3JhcnkgdmlldywgdGVycmlibGUgZm9yIHBlcmZvcm1hbmNlLCBnb29kIGZvciB0ZXN0aW5nXG4gICAgYm9keSA9IGJvZHkgfHwge307XG4gICAgT2JqZWN0LmtleXMoZnVuKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bltrZXldKSkge1xuICAgICAgICBib2R5W2tleV0gPSBmdW5ba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHlba2V5XSA9IGZ1bltrZXldLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGIuZmV0Y2goJ190ZW1wX3ZpZXcnICsgcGFyYW1zLCB7XG4gICAgICBoZWFkZXJzOiBuZXcgaCh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIG9rID0gcmVzcG9uc2Uub2s7XG4gICAgICAgIHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRocm93IGdlbmVyYXRlRXJyb3JGcm9tUmVzcG9uc2UocmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkudGhlbihwb3N0cHJvY2Vzc0F0dGFjaG1lbnRzKG9wdHMpKTtcbiAgfVxuXG4gIC8vIGN1c3RvbSBhZGFwdGVycyBjYW4gZGVmaW5lIHRoZWlyIG93biBhcGkuX3F1ZXJ5XG4gIC8vIGFuZCBvdmVycmlkZSB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBmdW5jdGlvbiBjdXN0b21RdWVyeShkYiwgZnVuLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGRiLl9xdWVyeShmdW4sIG9wdHMsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gY3VzdG9tIGFkYXB0ZXJzIGNhbiBkZWZpbmUgdGhlaXIgb3duIGFwaS5fdmlld0NsZWFudXBcbiAgLy8gYW5kIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGZ1bmN0aW9uIGN1c3RvbVZpZXdDbGVhbnVwKGRiKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGRiLl92aWV3Q2xlYW51cChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRzVG8odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChyZWFzb24uc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyByZXR1cm5zIGEgcHJvbWlzZSBmb3IgYSBsaXN0IG9mIGRvY3MgdG8gdXBkYXRlLCBiYXNlZCBvbiB0aGUgaW5wdXQgZG9jSWQuXG4gIC8vIHRoZSBvcmRlciBkb2Vzbid0IG1hdHRlciwgYmVjYXVzZSBwb3N0LTMuMi4wLCBidWxrRG9jc1xuICAvLyBpcyBhbiBhdG9taWMgb3BlcmF0aW9uIGluIGFsbCB0aHJlZSBhZGFwdGVycy5cbiAgZnVuY3Rpb24gZ2V0RG9jc1RvUGVyc2lzdChkb2NJZCwgdmlldywgZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMpIHtcbiAgICB2YXIgbWV0YURvY0lkID0gJ19sb2NhbC9kb2NfJyArIGRvY0lkO1xuICAgIHZhciBkZWZhdWx0TWV0YURvYyA9IHtfaWQ6IG1ldGFEb2NJZCwga2V5czogW119O1xuICAgIHZhciBkb2NEYXRhID0gZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMuZ2V0KGRvY0lkKTtcbiAgICB2YXIgaW5kZXhhYmxlS2V5c1RvS2V5VmFsdWVzID0gZG9jRGF0YVswXTtcbiAgICB2YXIgY2hhbmdlcyA9IGRvY0RhdGFbMV07XG5cbiAgICBmdW5jdGlvbiBnZXRNZXRhRG9jKCkge1xuICAgICAgaWYgKGlzR2VuT25lKGNoYW5nZXMpKSB7XG4gICAgICAgIC8vIGdlbmVyYXRpb24gMSwgc28gd2UgY2FuIHNhZmVseSBhc3N1bWUgaW5pdGlhbCBzdGF0ZVxuICAgICAgICAvLyBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoYXZvaWRzIHVubmVjZXNzYXJ5IEdFVHMpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVmYXVsdE1ldGFEb2MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZpZXcuZGIuZ2V0KG1ldGFEb2NJZCkuY2F0Y2goZGVmYXVsdHNUbyhkZWZhdWx0TWV0YURvYykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEtleVZhbHVlRG9jcyhtZXRhRG9jKSB7XG4gICAgICBpZiAoIW1ldGFEb2Mua2V5cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gbm8ga2V5cywgbm8gbmVlZCBmb3IgYSBsb29rdXBcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7cm93czogW119KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2aWV3LmRiLmFsbERvY3Moe1xuICAgICAgICBrZXlzOiBtZXRhRG9jLmtleXMsXG4gICAgICAgIGluY2x1ZGVfZG9jczogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0tleVZhbHVlRG9jcyhtZXRhRG9jLCBrdkRvY3NSZXMpIHtcbiAgICAgIHZhciBrdkRvY3MgPSBbXTtcbiAgICAgIHZhciBvbGRLZXlzID0gbmV3IEV4cG9ydGVkU2V0KCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBrdkRvY3NSZXMucm93cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgcm93ID0ga3ZEb2NzUmVzLnJvd3NbaV07XG4gICAgICAgIHZhciBkb2MgPSByb3cuZG9jO1xuICAgICAgICBpZiAoIWRvYykgeyAvLyBkZWxldGVkXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAga3ZEb2NzLnB1c2goZG9jKTtcbiAgICAgICAgb2xkS2V5cy5hZGQoZG9jLl9pZCk7XG4gICAgICAgIGRvYy5fZGVsZXRlZCA9ICFpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMuaGFzKGRvYy5faWQpO1xuICAgICAgICBpZiAoIWRvYy5fZGVsZXRlZCkge1xuICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGluZGV4YWJsZUtleXNUb0tleVZhbHVlcy5nZXQoZG9jLl9pZCk7XG4gICAgICAgICAgaWYgKCd2YWx1ZScgaW4ga2V5VmFsdWUpIHtcbiAgICAgICAgICAgIGRvYy52YWx1ZSA9IGtleVZhbHVlLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG5ld0tleXMgPSBtYXBUb0tleXNBcnJheShpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMpO1xuICAgICAgbmV3S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKCFvbGRLZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgLy8gbmV3IGRvY1xuICAgICAgICAgIHZhciBrdkRvYyA9IHtcbiAgICAgICAgICAgIF9pZDoga2V5XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIga2V5VmFsdWUgPSBpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgaWYgKCd2YWx1ZScgaW4ga2V5VmFsdWUpIHtcbiAgICAgICAgICAgIGt2RG9jLnZhbHVlID0ga2V5VmFsdWUudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGt2RG9jcy5wdXNoKGt2RG9jKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtZXRhRG9jLmtleXMgPSB1bmlxKG5ld0tleXMuY29uY2F0KG1ldGFEb2Mua2V5cykpO1xuICAgICAga3ZEb2NzLnB1c2gobWV0YURvYyk7XG5cbiAgICAgIHJldHVybiBrdkRvY3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldE1ldGFEb2MoKS50aGVuKGZ1bmN0aW9uIChtZXRhRG9jKSB7XG4gICAgICByZXR1cm4gZ2V0S2V5VmFsdWVEb2NzKG1ldGFEb2MpLnRoZW4oZnVuY3Rpb24gKGt2RG9jc1Jlcykge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc0tleVZhbHVlRG9jcyhtZXRhRG9jLCBrdkRvY3NSZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB1cGRhdGVzIGFsbCBlbWl0dGVkIGtleS92YWx1ZSBkb2NzIGFuZCBtZXRhRG9jcyBpbiB0aGUgbXJ2aWV3IGRhdGFiYXNlXG4gIC8vIGZvciB0aGUgZ2l2ZW4gYmF0Y2ggb2YgZG9jdW1lbnRzIGZyb20gdGhlIHNvdXJjZSBkYXRhYmFzZVxuICBmdW5jdGlvbiBzYXZlS2V5VmFsdWVzKHZpZXcsIGRvY0lkc1RvQ2hhbmdlc0FuZEVtaXRzLCBzZXEpIHtcbiAgICB2YXIgc2VxRG9jSWQgPSAnX2xvY2FsL2xhc3RTZXEnO1xuICAgIHJldHVybiB2aWV3LmRiLmdldChzZXFEb2NJZClcbiAgICAgIC5jYXRjaChkZWZhdWx0c1RvKHtfaWQ6IHNlcURvY0lkLCBzZXE6IDB9KSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChsYXN0U2VxRG9jKSB7XG4gICAgICAgIHZhciBkb2NJZHMgPSBtYXBUb0tleXNBcnJheShkb2NJZHNUb0NoYW5nZXNBbmRFbWl0cyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChkb2NJZHMubWFwKGZ1bmN0aW9uIChkb2NJZCkge1xuICAgICAgICAgIHJldHVybiBnZXREb2NzVG9QZXJzaXN0KGRvY0lkLCB2aWV3LCBkb2NJZHNUb0NoYW5nZXNBbmRFbWl0cyk7XG4gICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uIChsaXN0T2ZEb2NzVG9QZXJzaXN0KSB7XG4gICAgICAgICAgdmFyIGRvY3NUb1BlcnNpc3QgPSBmbGF0dGVuKGxpc3RPZkRvY3NUb1BlcnNpc3QpO1xuICAgICAgICAgIGxhc3RTZXFEb2Muc2VxID0gc2VxO1xuICAgICAgICAgIGRvY3NUb1BlcnNpc3QucHVzaChsYXN0U2VxRG9jKTtcbiAgICAgICAgICAvLyB3cml0ZSBhbGwgZG9jcyBpbiBhIHNpbmdsZSBvcGVyYXRpb24sIHVwZGF0ZSB0aGUgc2VxIG9uY2VcbiAgICAgICAgICByZXR1cm4gdmlldy5kYi5idWxrRG9jcyh7ZG9jcyA6IGRvY3NUb1BlcnNpc3R9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFF1ZXVlKHZpZXcpIHtcbiAgICB2YXIgdmlld05hbWUgPSB0eXBlb2YgdmlldyA9PT0gJ3N0cmluZycgPyB2aWV3IDogdmlldy5uYW1lO1xuICAgIHZhciBxdWV1ZSA9IHBlcnNpc3RlbnRRdWV1ZXNbdmlld05hbWVdO1xuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHF1ZXVlID0gcGVyc2lzdGVudFF1ZXVlc1t2aWV3TmFtZV0gPSBuZXcgVGFza1F1ZXVlJDEoKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3KSB7XG4gICAgcmV0dXJuIHNlcXVlbnRpYWxpemUoZ2V0UXVldWUodmlldyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1cGRhdGVWaWV3SW5RdWV1ZSh2aWV3KTtcbiAgICB9KSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlld0luUXVldWUodmlldykge1xuICAgIC8vIGJpbmQgdGhlIGVtaXQgZnVuY3Rpb24gb25jZVxuICAgIHZhciBtYXBSZXN1bHRzO1xuICAgIHZhciBkb2M7XG5cbiAgICBmdW5jdGlvbiBlbWl0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBvdXRwdXQgPSB7aWQ6IGRvYy5faWQsIGtleTogbm9ybWFsaXplS2V5KGtleSl9O1xuICAgICAgLy8gRG9uJ3QgZXhwbGljaXRseSBzdG9yZSB0aGUgdmFsdWUgdW5sZXNzIGl0J3MgZGVmaW5lZCBhbmQgbm9uLW51bGwuXG4gICAgICAvLyBUaGlzIHNhdmVzIG9uIHN0b3JhZ2Ugc3BhY2UsIGJlY2F1c2Ugb2Z0ZW4gcGVvcGxlIGRvbid0IHVzZSBpdC5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG91dHB1dC52YWx1ZSA9IG5vcm1hbGl6ZUtleSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBtYXBSZXN1bHRzLnB1c2gob3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgbWFwRnVuID0gbWFwcGVyKHZpZXcubWFwRnVuLCBlbWl0KTtcblxuICAgIHZhciBjdXJyZW50U2VxID0gdmlldy5zZXEgfHwgMDtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDaGFuZ2UoZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMsIHNlcSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNhdmVLZXlWYWx1ZXModmlldywgZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMsIHNlcSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IG5ldyBUYXNrUXVldWUkMSgpO1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc05leHRCYXRjaCgpIHtcbiAgICAgIHJldHVybiB2aWV3LnNvdXJjZURCLmNoYW5nZXMoe1xuICAgICAgICByZXR1cm5fZG9jczogdHJ1ZSxcbiAgICAgICAgY29uZmxpY3RzOiB0cnVlLFxuICAgICAgICBpbmNsdWRlX2RvY3M6IHRydWUsXG4gICAgICAgIHN0eWxlOiAnYWxsX2RvY3MnLFxuICAgICAgICBzaW5jZTogY3VycmVudFNlcSxcbiAgICAgICAgbGltaXQ6IENIQU5HRVNfQkFUQ0hfU0laRSQxXG4gICAgICB9KS50aGVuKHByb2Nlc3NCYXRjaCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IHJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBkb2NJZHNUb0NoYW5nZXNBbmRFbWl0cyA9IGNyZWF0ZURvY0lkc1RvQ2hhbmdlc0FuZEVtaXRzKHJlc3VsdHMpO1xuICAgICAgcXVldWUuYWRkKHByb2Nlc3NDaGFuZ2UoZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMsIGN1cnJlbnRTZXEpKTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA8IENIQU5HRVNfQkFUQ0hfU0laRSQxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9jZXNzTmV4dEJhdGNoKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMocmVzdWx0cykge1xuICAgICAgdmFyIGRvY0lkc1RvQ2hhbmdlc0FuZEVtaXRzID0gbmV3IEV4cG9ydGVkTWFwKCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVzdWx0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY2hhbmdlID0gcmVzdWx0c1tpXTtcbiAgICAgICAgaWYgKGNoYW5nZS5kb2MuX2lkWzBdICE9PSAnXycpIHtcbiAgICAgICAgICBtYXBSZXN1bHRzID0gW107XG4gICAgICAgICAgZG9jID0gY2hhbmdlLmRvYztcblxuICAgICAgICAgIGlmICghZG9jLl9kZWxldGVkKSB7XG4gICAgICAgICAgICB0cnlNYXAodmlldy5zb3VyY2VEQiwgbWFwRnVuLCBkb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtYXBSZXN1bHRzLnNvcnQoc29ydEJ5S2V5VGhlblZhbHVlKTtcblxuICAgICAgICAgIHZhciBpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMgPSBjcmVhdGVJbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMobWFwUmVzdWx0cyk7XG4gICAgICAgICAgZG9jSWRzVG9DaGFuZ2VzQW5kRW1pdHMuc2V0KGNoYW5nZS5kb2MuX2lkLCBbXG4gICAgICAgICAgICBpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMsXG4gICAgICAgICAgICBjaGFuZ2UuY2hhbmdlc1xuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRTZXEgPSBjaGFuZ2Uuc2VxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRvY0lkc1RvQ2hhbmdlc0FuZEVtaXRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGV4YWJsZUtleXNUb0tleVZhbHVlcyhtYXBSZXN1bHRzKSB7XG4gICAgICB2YXIgaW5kZXhhYmxlS2V5c1RvS2V5VmFsdWVzID0gbmV3IEV4cG9ydGVkTWFwKCk7XG4gICAgICB2YXIgbGFzdEtleTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXBSZXN1bHRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBlbWl0dGVkS2V5VmFsdWUgPSBtYXBSZXN1bHRzW2ldO1xuICAgICAgICB2YXIgY29tcGxleEtleSA9IFtlbWl0dGVkS2V5VmFsdWUua2V5LCBlbWl0dGVkS2V5VmFsdWUuaWRdO1xuICAgICAgICBpZiAoaSA+IDAgJiYgY29sbGF0ZShlbWl0dGVkS2V5VmFsdWUua2V5LCBsYXN0S2V5KSA9PT0gMCkge1xuICAgICAgICAgIGNvbXBsZXhLZXkucHVzaChpKTsgLy8gZHVwIGtleStpZCwgc28gbWFrZSBpdCB1bmlxdWVcbiAgICAgICAgfVxuICAgICAgICBpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXMuc2V0KHRvSW5kZXhhYmxlU3RyaW5nKGNvbXBsZXhLZXkpLCBlbWl0dGVkS2V5VmFsdWUpO1xuICAgICAgICBsYXN0S2V5ID0gZW1pdHRlZEtleVZhbHVlLmtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmRleGFibGVLZXlzVG9LZXlWYWx1ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2Nlc3NOZXh0QmF0Y2goKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBxdWV1ZS5maW5pc2goKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZpZXcuc2VxID0gY3VycmVudFNlcTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZHVjZVZpZXcodmlldywgcmVzdWx0cywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmdyb3VwX2xldmVsID09PSAwKSB7XG4gICAgICBkZWxldGUgb3B0aW9ucy5ncm91cF9sZXZlbDtcbiAgICB9XG5cbiAgICB2YXIgc2hvdWxkR3JvdXAgPSBvcHRpb25zLmdyb3VwIHx8IG9wdGlvbnMuZ3JvdXBfbGV2ZWw7XG5cbiAgICB2YXIgcmVkdWNlRnVuID0gcmVkdWNlcih2aWV3LnJlZHVjZUZ1bik7XG5cbiAgICB2YXIgZ3JvdXBzID0gW107XG4gICAgdmFyIGx2bCA9IGlzTmFOKG9wdGlvbnMuZ3JvdXBfbGV2ZWwpID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDpcbiAgICAgIG9wdGlvbnMuZ3JvdXBfbGV2ZWw7XG4gICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgbGFzdCA9IGdyb3Vwc1tncm91cHMubGVuZ3RoIC0gMV07XG4gICAgICB2YXIgZ3JvdXBLZXkgPSBzaG91bGRHcm91cCA/IGUua2V5IDogbnVsbDtcblxuICAgICAgLy8gb25seSBzZXQgZ3JvdXBfbGV2ZWwgZm9yIGFycmF5IGtleXNcbiAgICAgIGlmIChzaG91bGRHcm91cCAmJiBBcnJheS5pc0FycmF5KGdyb3VwS2V5KSkge1xuICAgICAgICBncm91cEtleSA9IGdyb3VwS2V5LnNsaWNlKDAsIGx2bCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXN0ICYmIGNvbGxhdGUobGFzdC5ncm91cEtleSwgZ3JvdXBLZXkpID09PSAwKSB7XG4gICAgICAgIGxhc3Qua2V5cy5wdXNoKFtlLmtleSwgZS5pZF0pO1xuICAgICAgICBsYXN0LnZhbHVlcy5wdXNoKGUudmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBncm91cHMucHVzaCh7XG4gICAgICAgIGtleXM6IFtbZS5rZXksIGUuaWRdXSxcbiAgICAgICAgdmFsdWVzOiBbZS52YWx1ZV0sXG4gICAgICAgIGdyb3VwS2V5OiBncm91cEtleVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBncm91cHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBlID0gZ3JvdXBzW2ldO1xuICAgICAgdmFyIHJlZHVjZVRyeSA9IHRyeVJlZHVjZSh2aWV3LnNvdXJjZURCLCByZWR1Y2VGdW4sIGUua2V5cywgZS52YWx1ZXMsIGZhbHNlKTtcbiAgICAgIGlmIChyZWR1Y2VUcnkuZXJyb3IgJiYgcmVkdWNlVHJ5LmVycm9yIGluc3RhbmNlb2YgQnVpbHRJbkVycm9yKSB7XG4gICAgICAgIC8vIENvdWNoREIgcmV0dXJucyBhbiBlcnJvciBpZiBhIGJ1aWx0LWluIGVycm9ycyBvdXRcbiAgICAgICAgdGhyb3cgcmVkdWNlVHJ5LmVycm9yO1xuICAgICAgfVxuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgLy8gQ291Y2hEQiBqdXN0IHNldHMgdGhlIHZhbHVlIHRvIG51bGwgaWYgYSBub24tYnVpbHQtaW4gZXJyb3JzIG91dFxuICAgICAgICB2YWx1ZTogcmVkdWNlVHJ5LmVycm9yID8gbnVsbCA6IHJlZHVjZVRyeS5vdXRwdXQsXG4gICAgICAgIGtleTogZS5ncm91cEtleVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIG5vIHRvdGFsX3Jvd3Mvb2Zmc2V0IHdoZW4gcmVkdWNpbmdcbiAgICByZXR1cm4ge3Jvd3M6IHNsaWNlUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zLmxpbWl0LCBvcHRpb25zLnNraXApfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXJ5Vmlldyh2aWV3LCBvcHRzKSB7XG4gICAgcmV0dXJuIHNlcXVlbnRpYWxpemUoZ2V0UXVldWUodmlldyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBxdWVyeVZpZXdJblF1ZXVlKHZpZXcsIG9wdHMpO1xuICAgIH0pKCk7XG4gIH1cblxuICBmdW5jdGlvbiBxdWVyeVZpZXdJblF1ZXVlKHZpZXcsIG9wdHMpIHtcbiAgICB2YXIgdG90YWxSb3dzO1xuICAgIHZhciBzaG91bGRSZWR1Y2UgPSB2aWV3LnJlZHVjZUZ1biAmJiBvcHRzLnJlZHVjZSAhPT0gZmFsc2U7XG4gICAgdmFyIHNraXAgPSBvcHRzLnNraXAgfHwgMDtcbiAgICBpZiAodHlwZW9mIG9wdHMua2V5cyAhPT0gJ3VuZGVmaW5lZCcgJiYgIW9wdHMua2V5cy5sZW5ndGgpIHtcbiAgICAgIC8vIGVxdWl2YWxlbnQgcXVlcnlcbiAgICAgIG9wdHMubGltaXQgPSAwO1xuICAgICAgZGVsZXRlIG9wdHMua2V5cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZXRjaEZyb21WaWV3KHZpZXdPcHRzKSB7XG4gICAgICB2aWV3T3B0cy5pbmNsdWRlX2RvY3MgPSB0cnVlO1xuICAgICAgcmV0dXJuIHZpZXcuZGIuYWxsRG9jcyh2aWV3T3B0cykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRvdGFsUm93cyA9IHJlcy50b3RhbF9yb3dzO1xuICAgICAgICByZXR1cm4gcmVzLnJvd3MubWFwKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgIC8vIGltcGxpY2l0IG1pZ3JhdGlvbiAtIGluIG9sZGVyIHZlcnNpb25zIG9mIFBvdWNoREIsXG4gICAgICAgICAgLy8gd2UgZXhwbGljaXRseSBzdG9yZWQgdGhlIGRvYyBhcyB7aWQ6IC4uLiwga2V5OiAuLi4sIHZhbHVlOiAuLi59XG4gICAgICAgICAgLy8gdGhpcyBpcyB0ZXN0ZWQgaW4gYSBtaWdyYXRpb24gdGVzdFxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgaWYgKCd2YWx1ZScgaW4gcmVzdWx0LmRvYyAmJiB0eXBlb2YgcmVzdWx0LmRvYy52YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHJlc3VsdC5kb2MudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVzdWx0LmRvYy52YWx1ZSkuc29ydCgpO1xuICAgICAgICAgICAgLy8gdGhpcyBkZXRlY3Rpb24gbWV0aG9kIGlzIG5vdCBwZXJmZWN0LCBidXQgaXQncyB1bmxpa2VseSB0aGUgdXNlclxuICAgICAgICAgICAgLy8gZW1pdHRlZCBhIHZhbHVlIHdoaWNoIHdhcyBhbiBvYmplY3Qgd2l0aCB0aGVzZSAzIGV4YWN0IGtleXNcbiAgICAgICAgICAgIHZhciBleHBlY3RlZEtleXMgPSBbJ2lkJywgJ2tleScsICd2YWx1ZSddO1xuICAgICAgICAgICAgaWYgKCEoa2V5cyA8IGV4cGVjdGVkS2V5cyB8fCBrZXlzID4gZXhwZWN0ZWRLZXlzKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvYy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcGFyc2VkS2V5QW5kRG9jSWQgPSBwYXJzZUluZGV4YWJsZVN0cmluZyhyZXN1bHQuZG9jLl9pZCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcGFyc2VkS2V5QW5kRG9jSWRbMF0sXG4gICAgICAgICAgICBpZDogcGFyc2VkS2V5QW5kRG9jSWRbMV0sXG4gICAgICAgICAgICB2YWx1ZTogKCd2YWx1ZScgaW4gcmVzdWx0LmRvYyA/IHJlc3VsdC5kb2MudmFsdWUgOiBudWxsKVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NYXBSZXN1bHRzUmVhZHkocm93cykge1xuICAgICAgdmFyIGZpbmFsUmVzdWx0cztcbiAgICAgIGlmIChzaG91bGRSZWR1Y2UpIHtcbiAgICAgICAgZmluYWxSZXN1bHRzID0gcmVkdWNlVmlldyh2aWV3LCByb3dzLCBvcHRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbmFsUmVzdWx0cyA9IHtcbiAgICAgICAgICB0b3RhbF9yb3dzOiB0b3RhbFJvd3MsXG4gICAgICAgICAgb2Zmc2V0OiBza2lwLFxuICAgICAgICAgIHJvd3M6IHJvd3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKG9wdHMudXBkYXRlX3NlcSkge1xuICAgICAgICBmaW5hbFJlc3VsdHMudXBkYXRlX3NlcSA9IHZpZXcuc2VxO1xuICAgICAgfVxuICAgICAgaWYgKG9wdHMuaW5jbHVkZV9kb2NzKSB7XG4gICAgICAgIHZhciBkb2NJZHMgPSB1bmlxKHJvd3MubWFwKHJvd1RvRG9jSWQpKTtcblxuICAgICAgICByZXR1cm4gdmlldy5zb3VyY2VEQi5hbGxEb2NzKHtcbiAgICAgICAgICBrZXlzOiBkb2NJZHMsXG4gICAgICAgICAgaW5jbHVkZV9kb2NzOiB0cnVlLFxuICAgICAgICAgIGNvbmZsaWN0czogb3B0cy5jb25mbGljdHMsXG4gICAgICAgICAgYXR0YWNobWVudHM6IG9wdHMuYXR0YWNobWVudHMsXG4gICAgICAgICAgYmluYXJ5OiBvcHRzLmJpbmFyeVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhbGxEb2NzUmVzKSB7XG4gICAgICAgICAgdmFyIGRvY0lkc1RvRG9jcyA9IG5ldyBFeHBvcnRlZE1hcCgpO1xuICAgICAgICAgIGFsbERvY3NSZXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgIGRvY0lkc1RvRG9jcy5zZXQocm93LmlkLCByb3cuZG9jKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgdmFyIGRvY0lkID0gcm93VG9Eb2NJZChyb3cpO1xuICAgICAgICAgICAgdmFyIGRvYyA9IGRvY0lkc1RvRG9jcy5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgaWYgKGRvYykge1xuICAgICAgICAgICAgICByb3cuZG9jID0gZG9jO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBmaW5hbFJlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZpbmFsUmVzdWx0cztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMua2V5cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBrZXlzID0gb3B0cy5rZXlzO1xuICAgICAgdmFyIGZldGNoUHJvbWlzZXMgPSBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB2aWV3T3B0cyA9IHtcbiAgICAgICAgICBzdGFydGtleSA6IHRvSW5kZXhhYmxlU3RyaW5nKFtrZXldKSxcbiAgICAgICAgICBlbmRrZXkgICA6IHRvSW5kZXhhYmxlU3RyaW5nKFtrZXksIHt9XSlcbiAgICAgICAgfTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChvcHRzLnVwZGF0ZV9zZXEpIHtcbiAgICAgICAgICB2aWV3T3B0cy51cGRhdGVfc2VxID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2hGcm9tVmlldyh2aWV3T3B0cyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChmZXRjaFByb21pc2VzKS50aGVuKGZsYXR0ZW4pLnRoZW4ob25NYXBSZXN1bHRzUmVhZHkpO1xuICAgIH0gZWxzZSB7IC8vIG5vcm1hbCBxdWVyeSwgbm8gJ2tleXMnXG4gICAgICB2YXIgdmlld09wdHMgPSB7XG4gICAgICAgIGRlc2NlbmRpbmcgOiBvcHRzLmRlc2NlbmRpbmdcbiAgICAgIH07XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChvcHRzLnVwZGF0ZV9zZXEpIHtcbiAgICAgICAgdmlld09wdHMudXBkYXRlX3NlcSA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgc3RhcnRrZXk7XG4gICAgICB2YXIgZW5ka2V5O1xuICAgICAgaWYgKCdzdGFydF9rZXknIGluIG9wdHMpIHtcbiAgICAgICAgc3RhcnRrZXkgPSBvcHRzLnN0YXJ0X2tleTtcbiAgICAgIH1cbiAgICAgIGlmICgnc3RhcnRrZXknIGluIG9wdHMpIHtcbiAgICAgICAgc3RhcnRrZXkgPSBvcHRzLnN0YXJ0a2V5O1xuICAgICAgfVxuICAgICAgaWYgKCdlbmRfa2V5JyBpbiBvcHRzKSB7XG4gICAgICAgIGVuZGtleSA9IG9wdHMuZW5kX2tleTtcbiAgICAgIH1cbiAgICAgIGlmICgnZW5ka2V5JyBpbiBvcHRzKSB7XG4gICAgICAgIGVuZGtleSA9IG9wdHMuZW5ka2V5O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzdGFydGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmlld09wdHMuc3RhcnRrZXkgPSBvcHRzLmRlc2NlbmRpbmcgP1xuICAgICAgICAgIHRvSW5kZXhhYmxlU3RyaW5nKFtzdGFydGtleSwge31dKSA6XG4gICAgICAgICAgdG9JbmRleGFibGVTdHJpbmcoW3N0YXJ0a2V5XSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVuZGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGluY2x1c2l2ZUVuZCA9IG9wdHMuaW5jbHVzaXZlX2VuZCAhPT0gZmFsc2U7XG4gICAgICAgIGlmIChvcHRzLmRlc2NlbmRpbmcpIHtcbiAgICAgICAgICBpbmNsdXNpdmVFbmQgPSAhaW5jbHVzaXZlRW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlld09wdHMuZW5ka2V5ID0gdG9JbmRleGFibGVTdHJpbmcoXG4gICAgICAgICAgaW5jbHVzaXZlRW5kID8gW2VuZGtleSwge31dIDogW2VuZGtleV0pO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvcHRzLmtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGtleVN0YXJ0ID0gdG9JbmRleGFibGVTdHJpbmcoW29wdHMua2V5XSk7XG4gICAgICAgIHZhciBrZXlFbmQgPSB0b0luZGV4YWJsZVN0cmluZyhbb3B0cy5rZXksIHt9XSk7XG4gICAgICAgIGlmICh2aWV3T3B0cy5kZXNjZW5kaW5nKSB7XG4gICAgICAgICAgdmlld09wdHMuZW5ka2V5ID0ga2V5U3RhcnQ7XG4gICAgICAgICAgdmlld09wdHMuc3RhcnRrZXkgPSBrZXlFbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmlld09wdHMuc3RhcnRrZXkgPSBrZXlTdGFydDtcbiAgICAgICAgICB2aWV3T3B0cy5lbmRrZXkgPSBrZXlFbmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghc2hvdWxkUmVkdWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5saW1pdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB2aWV3T3B0cy5saW1pdCA9IG9wdHMubGltaXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmlld09wdHMuc2tpcCA9IHNraXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmV0Y2hGcm9tVmlldyh2aWV3T3B0cykudGhlbihvbk1hcFJlc3VsdHNSZWFkeSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaHR0cFZpZXdDbGVhbnVwKGRiKSB7XG4gICAgcmV0dXJuIGRiLmZldGNoKCdfdmlld19jbGVhbnVwJywge1xuICAgICAgaGVhZGVyczogbmV3IGgoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbFZpZXdDbGVhbnVwKGRiKSB7XG4gICAgcmV0dXJuIGRiLmdldCgnX2xvY2FsLycgKyBsb2NhbERvY05hbWUpLnRoZW4oZnVuY3Rpb24gKG1ldGFEb2MpIHtcbiAgICAgIHZhciBkb2NzVG9WaWV3cyA9IG5ldyBFeHBvcnRlZE1hcCgpO1xuICAgICAgT2JqZWN0LmtleXMobWV0YURvYy52aWV3cykuZm9yRWFjaChmdW5jdGlvbiAoZnVsbFZpZXdOYW1lKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBhcnNlVmlld05hbWUoZnVsbFZpZXdOYW1lKTtcbiAgICAgICAgdmFyIGRlc2lnbkRvY05hbWUgPSAnX2Rlc2lnbi8nICsgcGFydHNbMF07XG4gICAgICAgIHZhciB2aWV3TmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICB2YXIgdmlld3MgPSBkb2NzVG9WaWV3cy5nZXQoZGVzaWduRG9jTmFtZSk7XG4gICAgICAgIGlmICghdmlld3MpIHtcbiAgICAgICAgICB2aWV3cyA9IG5ldyBFeHBvcnRlZFNldCgpO1xuICAgICAgICAgIGRvY3NUb1ZpZXdzLnNldChkZXNpZ25Eb2NOYW1lLCB2aWV3cyk7XG4gICAgICAgIH1cbiAgICAgICAgdmlld3MuYWRkKHZpZXdOYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9wdHMgPSB7XG4gICAgICAgIGtleXMgOiBtYXBUb0tleXNBcnJheShkb2NzVG9WaWV3cyksXG4gICAgICAgIGluY2x1ZGVfZG9jcyA6IHRydWVcbiAgICAgIH07XG4gICAgICByZXR1cm4gZGIuYWxsRG9jcyhvcHRzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIHZpZXdzVG9TdGF0dXMgPSB7fTtcbiAgICAgICAgcmVzLnJvd3MuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgdmFyIGRkb2NOYW1lID0gcm93LmtleS5zdWJzdHJpbmcoOCk7IC8vIGN1dHMgb2ZmICdfZGVzaWduLydcbiAgICAgICAgICBkb2NzVG9WaWV3cy5nZXQocm93LmtleSkuZm9yRWFjaChmdW5jdGlvbiAodmlld05hbWUpIHtcbiAgICAgICAgICAgIHZhciBmdWxsVmlld05hbWUgPSBkZG9jTmFtZSArICcvJyArIHZpZXdOYW1lO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoIW1ldGFEb2Mudmlld3NbZnVsbFZpZXdOYW1lXSkge1xuICAgICAgICAgICAgICAvLyBuZXcgZm9ybWF0LCB3aXRob3V0IHNsYXNoZXMsIHRvIHN1cHBvcnQgUG91Y2hEQiAyLjIuMFxuICAgICAgICAgICAgICAvLyBtaWdyYXRpb24gdGVzdCBpbiBwb3VjaGRiJ3MgYnJvd3Nlci5taWdyYXRpb24uanMgdmVyaWZpZXMgdGhpc1xuICAgICAgICAgICAgICBmdWxsVmlld05hbWUgPSB2aWV3TmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2aWV3REJOYW1lcyA9IE9iamVjdC5rZXlzKG1ldGFEb2Mudmlld3NbZnVsbFZpZXdOYW1lXSk7XG4gICAgICAgICAgICAvLyBkZXNpZ24gZG9jIGRlbGV0ZWQsIG9yIHZpZXcgZnVuY3Rpb24gbm9uZXhpc3RlbnRcbiAgICAgICAgICAgIHZhciBzdGF0dXNJc0dvb2QgPSByb3cuZG9jICYmIHJvdy5kb2Mudmlld3MgJiZcbiAgICAgICAgICAgICAgcm93LmRvYy52aWV3c1t2aWV3TmFtZV07XG4gICAgICAgICAgICB2aWV3REJOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICh2aWV3REJOYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdzVG9TdGF0dXNbdmlld0RCTmFtZV0gPVxuICAgICAgICAgICAgICAgIHZpZXdzVG9TdGF0dXNbdmlld0RCTmFtZV0gfHwgc3RhdHVzSXNHb29kO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZGJzVG9EZWxldGUgPSBPYmplY3Qua2V5cyh2aWV3c1RvU3RhdHVzKS5maWx0ZXIoXG4gICAgICAgICAgZnVuY3Rpb24gKHZpZXdEQk5hbWUpIHsgcmV0dXJuICF2aWV3c1RvU3RhdHVzW3ZpZXdEQk5hbWVdOyB9KTtcbiAgICAgICAgdmFyIGRlc3Ryb3lQcm9taXNlcyA9IGRic1RvRGVsZXRlLm1hcChmdW5jdGlvbiAodmlld0RCTmFtZSkge1xuICAgICAgICAgIHJldHVybiBzZXF1ZW50aWFsaXplKGdldFF1ZXVlKHZpZXdEQk5hbWUpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGRiLmNvbnN0cnVjdG9yKHZpZXdEQk5hbWUsIGRiLl9fb3B0cykuZGVzdHJveSgpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZGVzdHJveVByb21pc2VzKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4ge29rOiB0cnVlfTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LCBkZWZhdWx0c1RvKHtvazogdHJ1ZX0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXJ5UHJvbWlzZWQoZGIsIGZ1biwgb3B0cykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHR5cGVvZiBkYi5fcXVlcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjdXN0b21RdWVyeShkYiwgZnVuLCBvcHRzKTtcbiAgICB9XG4gICAgaWYgKGlzUmVtb3RlKGRiKSkge1xuICAgICAgcmV0dXJuIGh0dHBRdWVyeShkYiwgZnVuLCBvcHRzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZ1biAhPT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRlbXBfdmlld1xuICAgICAgY2hlY2tRdWVyeVBhcnNlRXJyb3Iob3B0cywgZnVuKTtcblxuICAgICAgdGVtcFZpZXdRdWV1ZS5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3JlYXRlVmlld1Byb21pc2UgPSBjcmVhdGVWaWV3KFxuICAgICAgICAgIC8qIHNvdXJjZURCICovIGRiLFxuICAgICAgICAgIC8qIHZpZXdOYW1lICovICd0ZW1wX3ZpZXcvdGVtcF92aWV3JyxcbiAgICAgICAgICAvKiBtYXBGdW4gKi8gZnVuLm1hcCxcbiAgICAgICAgICAvKiByZWR1Y2VGdW4gKi8gZnVuLnJlZHVjZSxcbiAgICAgICAgICAvKiB0ZW1wb3JhcnkgKi8gdHJ1ZSxcbiAgICAgICAgICAvKiBsb2NhbERvY05hbWUgKi8gbG9jYWxEb2NOYW1lKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVZpZXdQcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gZmluKHVwZGF0ZVZpZXcodmlldykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlWaWV3KHZpZXcsIG9wdHMpO1xuICAgICAgICAgIH0pLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlldy5kYi5kZXN0cm95KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGVtcFZpZXdRdWV1ZS5maW5pc2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcGVyc2lzdGVudCB2aWV3XG4gICAgICB2YXIgZnVsbFZpZXdOYW1lID0gZnVuO1xuICAgICAgdmFyIHBhcnRzID0gcGFyc2VWaWV3TmFtZShmdWxsVmlld05hbWUpO1xuICAgICAgdmFyIGRlc2lnbkRvY05hbWUgPSBwYXJ0c1swXTtcbiAgICAgIHZhciB2aWV3TmFtZSA9IHBhcnRzWzFdO1xuICAgICAgcmV0dXJuIGRiLmdldCgnX2Rlc2lnbi8nICsgZGVzaWduRG9jTmFtZSkudGhlbihmdW5jdGlvbiAoZG9jKSB7XG4gICAgICAgIHZhciBmdW4gPSBkb2Mudmlld3MgJiYgZG9jLnZpZXdzW3ZpZXdOYW1lXTtcblxuICAgICAgICBpZiAoIWZ1bikge1xuICAgICAgICAgIC8vIGJhc2ljIHZhbGlkYXRvcjsgaXQncyBhc3N1bWVkIHRoYXQgZXZlcnkgc3ViY2xhc3Mgd291bGQgd2FudCB0aGlzXG4gICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXJyb3IoJ2Rkb2MgJyArIGRvYy5faWQgKyAnIGhhcyBubyB2aWV3IG5hbWVkICcgK1xuICAgICAgICAgICAgdmlld05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGRvY1ZhbGlkYXRvcihkb2MsIHZpZXdOYW1lKTtcbiAgICAgICAgY2hlY2tRdWVyeVBhcnNlRXJyb3Iob3B0cywgZnVuKTtcblxuICAgICAgICB2YXIgY3JlYXRlVmlld1Byb21pc2UgPSBjcmVhdGVWaWV3KFxuICAgICAgICAgIC8qIHNvdXJjZURCICovIGRiLFxuICAgICAgICAgIC8qIHZpZXdOYW1lICovIGZ1bGxWaWV3TmFtZSxcbiAgICAgICAgICAvKiBtYXBGdW4gKi8gZnVuLm1hcCxcbiAgICAgICAgICAvKiByZWR1Y2VGdW4gKi8gZnVuLnJlZHVjZSxcbiAgICAgICAgICAvKiB0ZW1wb3JhcnkgKi8gZmFsc2UsXG4gICAgICAgICAgLyogbG9jYWxEb2NOYW1lICovIGxvY2FsRG9jTmFtZSk7XG4gICAgICAgIHJldHVybiBjcmVhdGVWaWV3UHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgICAgaWYgKG9wdHMuc3RhbGUgPT09ICdvaycgfHwgb3B0cy5zdGFsZSA9PT0gJ3VwZGF0ZV9hZnRlcicpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnN0YWxlID09PSAndXBkYXRlX2FmdGVyJykge1xuICAgICAgICAgICAgICBpbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXcodmlldyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5Vmlldyh2aWV3LCBvcHRzKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBzdGFsZSBub3Qgb2tcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVWaWV3KHZpZXcpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcXVlcnlWaWV3KHZpZXcsIG9wdHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFic3RyYWN0UXVlcnkoZnVuLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYiA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuICAgIG9wdHMgPSBvcHRzID8gY29lcmNlT3B0aW9ucyhvcHRzKSA6IHt9O1xuXG4gICAgaWYgKHR5cGVvZiBmdW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZ1biA9IHttYXAgOiBmdW59O1xuICAgIH1cblxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcXVlcnlQcm9taXNlZChkYiwgZnVuLCBvcHRzKTtcbiAgICB9KTtcbiAgICBwcm9taXNlZENhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHZhciBhYnN0cmFjdFZpZXdDbGVhbnVwID0gY2FsbGJhY2tpZnkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYiA9IHRoaXM7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodHlwZW9mIGRiLl92aWV3Q2xlYW51cCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGN1c3RvbVZpZXdDbGVhbnVwKGRiKTtcbiAgICB9XG4gICAgaWYgKGlzUmVtb3RlKGRiKSkge1xuICAgICAgcmV0dXJuIGh0dHBWaWV3Q2xlYW51cChkYik7XG4gICAgfVxuICAgIHJldHVybiBsb2NhbFZpZXdDbGVhbnVwKGRiKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYWJzdHJhY3RRdWVyeSxcbiAgICB2aWV3Q2xlYW51cDogYWJzdHJhY3RWaWV3Q2xlYW51cFxuICB9O1xufVxuXG52YXIgYnVpbHRJblJlZHVjZSA9IHtcbiAgX3N1bTogZnVuY3Rpb24gKGtleXMsIHZhbHVlcykge1xuICAgIHJldHVybiBzdW0odmFsdWVzKTtcbiAgfSxcblxuICBfY291bnQ6IGZ1bmN0aW9uIChrZXlzLCB2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzLmxlbmd0aDtcbiAgfSxcblxuICBfc3RhdHM6IGZ1bmN0aW9uIChrZXlzLCB2YWx1ZXMpIHtcbiAgICAvLyBubyBuZWVkIHRvIGltcGxlbWVudCByZXJlZHVjZT10cnVlLCBiZWNhdXNlIFBvdWNoXG4gICAgLy8gd2lsbCBuZXZlciBjYWxsIGl0XG4gICAgZnVuY3Rpb24gc3Vtc3FyKHZhbHVlcykge1xuICAgICAgdmFyIF9zdW1zcXIgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgbnVtID0gdmFsdWVzW2ldO1xuICAgICAgICBfc3Vtc3FyICs9IChudW0gKiBudW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zdW1zcXI7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzdW0gICAgIDogc3VtKHZhbHVlcyksXG4gICAgICBtaW4gICAgIDogTWF0aC5taW4uYXBwbHkobnVsbCwgdmFsdWVzKSxcbiAgICAgIG1heCAgICAgOiBNYXRoLm1heC5hcHBseShudWxsLCB2YWx1ZXMpLFxuICAgICAgY291bnQgICA6IHZhbHVlcy5sZW5ndGgsXG4gICAgICBzdW1zcXIgOiBzdW1zcXIodmFsdWVzKVxuICAgIH07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEJ1aWx0SW4ocmVkdWNlRnVuU3RyaW5nKSB7XG4gIGlmICgvXl9zdW0vLnRlc3QocmVkdWNlRnVuU3RyaW5nKSkge1xuICAgIHJldHVybiBidWlsdEluUmVkdWNlLl9zdW07XG4gIH0gZWxzZSBpZiAoL15fY291bnQvLnRlc3QocmVkdWNlRnVuU3RyaW5nKSkge1xuICAgIHJldHVybiBidWlsdEluUmVkdWNlLl9jb3VudDtcbiAgfSBlbHNlIGlmICgvXl9zdGF0cy8udGVzdChyZWR1Y2VGdW5TdHJpbmcpKSB7XG4gICAgcmV0dXJuIGJ1aWx0SW5SZWR1Y2UuX3N0YXRzO1xuICB9IGVsc2UgaWYgKC9eXy8udGVzdChyZWR1Y2VGdW5TdHJpbmcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHJlZHVjZUZ1blN0cmluZyArICcgaXMgbm90IGEgc3VwcG9ydGVkIHJlZHVjZSBmdW5jdGlvbi4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBwZXIobWFwRnVuLCBlbWl0KSB7XG4gIC8vIGZvciB0ZW1wX3ZpZXdzIG9uZSBjYW4gdXNlIGVtaXQoZG9jLCBlbWl0KSwgc2VlICMzOFxuICBpZiAodHlwZW9mIG1hcEZ1biA9PT0gXCJmdW5jdGlvblwiICYmIG1hcEZ1bi5sZW5ndGggPT09IDIpIHtcbiAgICB2YXIgb3JpZ01hcCA9IG1hcEZ1bjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRvYykge1xuICAgICAgcmV0dXJuIG9yaWdNYXAoZG9jLCBlbWl0KTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBldmFsRnVuY3Rpb25XaXRoRXZhbChtYXBGdW4udG9TdHJpbmcoKSwgZW1pdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVkdWNlcihyZWR1Y2VGdW4pIHtcbiAgdmFyIHJlZHVjZUZ1blN0cmluZyA9IHJlZHVjZUZ1bi50b1N0cmluZygpO1xuICB2YXIgYnVpbHRJbiA9IGdldEJ1aWx0SW4ocmVkdWNlRnVuU3RyaW5nKTtcbiAgaWYgKGJ1aWx0SW4pIHtcbiAgICByZXR1cm4gYnVpbHRJbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXZhbEZ1bmN0aW9uV2l0aEV2YWwocmVkdWNlRnVuU3RyaW5nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZG9jVmFsaWRhdG9yKGRkb2MsIHZpZXdOYW1lKSB7XG4gIHZhciBmdW4gPSBkZG9jLnZpZXdzICYmIGRkb2Mudmlld3Nbdmlld05hbWVdO1xuICBpZiAodHlwZW9mIGZ1bi5tYXAgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IE5vdEZvdW5kRXJyb3IoJ2Rkb2MgJyArIGRkb2MuX2lkICsgJyBoYXMgbm8gc3RyaW5nIHZpZXcgbmFtZWQgJyArXG4gICAgICB2aWV3TmFtZSArICcsIGluc3RlYWQgZm91bmQgb2JqZWN0IG9mIHR5cGU6ICcgKyB0eXBlb2YgZnVuLm1hcCk7XG4gIH1cbn1cblxudmFyIGxvY2FsRG9jTmFtZSA9ICdtcnZpZXdzJztcbnZhciBhYnN0cmFjdCA9IGNyZWF0ZUFic3RyYWN0TWFwUmVkdWNlKGxvY2FsRG9jTmFtZSwgbWFwcGVyLCByZWR1Y2VyLCBkZG9jVmFsaWRhdG9yKTtcblxuZnVuY3Rpb24gcXVlcnkoZnVuLCBvcHRzLCBjYWxsYmFjaykge1xuICByZXR1cm4gYWJzdHJhY3QucXVlcnkuY2FsbCh0aGlzLCBmdW4sIG9wdHMsIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gdmlld0NsZWFudXAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGFic3RyYWN0LnZpZXdDbGVhbnVwLmNhbGwodGhpcywgY2FsbGJhY2spO1xufVxuXG52YXIgbWFwcmVkdWNlID0ge1xuICBxdWVyeTogcXVlcnksXG4gIHZpZXdDbGVhbnVwOiB2aWV3Q2xlYW51cFxufTtcblxuZnVuY3Rpb24gaXNHZW5PbmUkMShyZXYkJDEpIHtcbiAgcmV0dXJuIC9eMS0vLnRlc3QocmV2JCQxKTtcbn1cblxuZnVuY3Rpb24gZmlsZUhhc0NoYW5nZWQobG9jYWxEb2MsIHJlbW90ZURvYywgZmlsZW5hbWUpIHtcbiAgcmV0dXJuICFsb2NhbERvYy5fYXR0YWNobWVudHMgfHxcbiAgICAgICAgICFsb2NhbERvYy5fYXR0YWNobWVudHNbZmlsZW5hbWVdIHx8XG4gICAgICAgICBsb2NhbERvYy5fYXR0YWNobWVudHNbZmlsZW5hbWVdLmRpZ2VzdCAhPT0gcmVtb3RlRG9jLl9hdHRhY2htZW50c1tmaWxlbmFtZV0uZGlnZXN0O1xufVxuXG5mdW5jdGlvbiBnZXREb2NBdHRhY2htZW50cyhkYiwgZG9jKSB7XG4gIHZhciBmaWxlbmFtZXMgPSBPYmplY3Qua2V5cyhkb2MuX2F0dGFjaG1lbnRzKTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKGZpbGVuYW1lcy5tYXAoZnVuY3Rpb24gKGZpbGVuYW1lKSB7XG4gICAgcmV0dXJuIGRiLmdldEF0dGFjaG1lbnQoZG9jLl9pZCwgZmlsZW5hbWUsIHtyZXY6IGRvYy5fcmV2fSk7XG4gIH0pKTtcbn1cblxuZnVuY3Rpb24gZ2V0RG9jQXR0YWNobWVudHNGcm9tVGFyZ2V0T3JTb3VyY2UodGFyZ2V0LCBzcmMsIGRvYykge1xuICB2YXIgZG9DaGVja0ZvckxvY2FsQXR0YWNobWVudHMgPSBpc1JlbW90ZShzcmMpICYmICFpc1JlbW90ZSh0YXJnZXQpO1xuICB2YXIgZmlsZW5hbWVzID0gT2JqZWN0LmtleXMoZG9jLl9hdHRhY2htZW50cyk7XG5cbiAgaWYgKCFkb0NoZWNrRm9yTG9jYWxBdHRhY2htZW50cykge1xuICAgIHJldHVybiBnZXREb2NBdHRhY2htZW50cyhzcmMsIGRvYyk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0LmdldChkb2MuX2lkKS50aGVuKGZ1bmN0aW9uIChsb2NhbERvYykge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChmaWxlbmFtZXMubWFwKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuICAgICAgaWYgKGZpbGVIYXNDaGFuZ2VkKGxvY2FsRG9jLCBkb2MsIGZpbGVuYW1lKSkge1xuICAgICAgICByZXR1cm4gc3JjLmdldEF0dGFjaG1lbnQoZG9jLl9pZCwgZmlsZW5hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0LmdldEF0dGFjaG1lbnQobG9jYWxEb2MuX2lkLCBmaWxlbmFtZSk7XG4gICAgfSkpO1xuICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZXJyb3Iuc3RhdHVzICE9PSA0MDQpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBnZXREb2NBdHRhY2htZW50cyhzcmMsIGRvYyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWxrR2V0T3B0cyhkaWZmcykge1xuICB2YXIgcmVxdWVzdHMgPSBbXTtcbiAgT2JqZWN0LmtleXMoZGlmZnMpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIG1pc3NpbmdSZXZzID0gZGlmZnNbaWRdLm1pc3Npbmc7XG4gICAgbWlzc2luZ1JldnMuZm9yRWFjaChmdW5jdGlvbiAobWlzc2luZ1Jldikge1xuICAgICAgcmVxdWVzdHMucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcmV2OiBtaXNzaW5nUmV2XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb2NzOiByZXF1ZXN0cyxcbiAgICByZXZzOiB0cnVlLFxuICAgIGxhdGVzdDogdHJ1ZVxuICB9O1xufVxuXG4vL1xuLy8gRmV0Y2ggYWxsIHRoZSBkb2N1bWVudHMgZnJvbSB0aGUgc3JjIGFzIGRlc2NyaWJlZCBpbiB0aGUgXCJkaWZmc1wiLFxuLy8gd2hpY2ggaXMgYSBtYXBwaW5nIG9mIGRvY3MgSURzIHRvIHJldmlzaW9ucy4gSWYgdGhlIHN0YXRlIGV2ZXJcbi8vIGNoYW5nZXMgdG8gXCJjYW5jZWxsZWRcIiwgdGhlbiB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkLlxuLy8gRWxzZSBpdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggYSBsaXN0IG9mIGZldGNoZWQgZG9jdW1lbnRzLlxuLy9cbmZ1bmN0aW9uIGdldERvY3Moc3JjLCB0YXJnZXQsIGRpZmZzLCBzdGF0ZSkge1xuICBkaWZmcyA9IGNsb25lKGRpZmZzKTsgLy8gd2UgZG8gbm90IG5lZWQgdG8gbW9kaWZ5IHRoaXNcblxuICB2YXIgcmVzdWx0RG9jcyA9IFtdLFxuICAgICAgb2sgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIGdldEFsbERvY3MoKSB7XG5cbiAgICB2YXIgYnVsa0dldE9wdHMgPSBjcmVhdGVCdWxrR2V0T3B0cyhkaWZmcyk7XG5cbiAgICBpZiAoIWJ1bGtHZXRPcHRzLmRvY3MubGVuZ3RoKSB7IC8vIG9wdGltaXphdGlvbjogc2tpcCBlbXB0eSByZXF1ZXN0c1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBzcmMuYnVsa0dldChidWxrR2V0T3B0cykudGhlbihmdW5jdGlvbiAoYnVsa0dldFJlc3BvbnNlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChzdGF0ZS5jYW5jZWxsZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5jZWxsZWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChidWxrR2V0UmVzcG9uc2UucmVzdWx0cy5tYXAoZnVuY3Rpb24gKGJ1bGtHZXRJbmZvKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChidWxrR2V0SW5mby5kb2NzLm1hcChmdW5jdGlvbiAoZG9jKSB7XG4gICAgICAgICAgdmFyIHJlbW90ZURvYyA9IGRvYy5vaztcblxuICAgICAgICAgIGlmIChkb2MuZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdoZW4gQVVUT19DT01QQUNUSU9OIGlzIHNldCwgZG9jcyBjYW4gYmUgcmV0dXJuZWQgd2hpY2ggbG9va1xuICAgICAgICAgICAgLy8gbGlrZSB0aGlzOiB7XCJtaXNzaW5nXCI6XCIxLTdjM2FjMjU2YjY5M2M0NjJhZjg0NDJmOTkyYjgzNjk2XCJ9XG4gICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcmVtb3RlRG9jIHx8ICFyZW1vdGVEb2MuX2F0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVtb3RlRG9jO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBnZXREb2NBdHRhY2htZW50c0Zyb21UYXJnZXRPclNvdXJjZSh0YXJnZXQsIHNyYywgcmVtb3RlRG9jKVxuICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChhdHRhY2htZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lcyA9IE9iamVjdC5rZXlzKHJlbW90ZURvYy5fYXR0YWNobWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGF0dGFjaG1lbnQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ID0gcmVtb3RlRG9jLl9hdHRhY2htZW50c1tmaWxlbmFtZXNbaV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHQuc3R1YjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHQuZGF0YSA9IGF0dGFjaG1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVEb2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgICAgfSkpXG5cbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgIHJlc3VsdERvY3MgPSByZXN1bHREb2NzLmNvbmNhdChmbGF0dGVuKHJlc3VsdHMpLmZpbHRlcihCb29sZWFuKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0F0dGFjaG1lbnRzKGRvYykge1xuICAgIHJldHVybiBkb2MuX2F0dGFjaG1lbnRzICYmIE9iamVjdC5rZXlzKGRvYy5fYXR0YWNobWVudHMpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNDb25mbGljdHMoZG9jKSB7XG4gICAgcmV0dXJuIGRvYy5fY29uZmxpY3RzICYmIGRvYy5fY29uZmxpY3RzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaFJldmlzaW9uT25lRG9jcyhpZHMpIHtcbiAgICAvLyBPcHRpbWl6YXRpb246IGZldGNoIGdlbi0xIGRvY3MgYW5kIGF0dGFjaG1lbnRzIGluXG4gICAgLy8gYSBzaW5nbGUgcmVxdWVzdCB1c2luZyBfYWxsX2RvY3NcbiAgICByZXR1cm4gc3JjLmFsbERvY3Moe1xuICAgICAga2V5czogaWRzLFxuICAgICAgaW5jbHVkZV9kb2NzOiB0cnVlLFxuICAgICAgY29uZmxpY3RzOiB0cnVlXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICBpZiAoc3RhdGUuY2FuY2VsbGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuY2VsbGVkJyk7XG4gICAgICB9XG4gICAgICByZXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgaWYgKHJvdy5kZWxldGVkIHx8ICFyb3cuZG9jIHx8ICFpc0dlbk9uZSQxKHJvdy52YWx1ZS5yZXYpIHx8XG4gICAgICAgICAgICBoYXNBdHRhY2htZW50cyhyb3cuZG9jKSB8fCBoYXNDb25mbGljdHMocm93LmRvYykpIHtcbiAgICAgICAgICAvLyBpZiBhbnkgb2YgdGhlc2UgY29uZGl0aW9ucyBhcHBseSwgd2UgbmVlZCB0byBmZXRjaCB1c2luZyBnZXQoKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0cmlwIF9jb25mbGljdHMgYXJyYXkgdG8gYXBwZWFzZSBDU0cgKCM1NzkzKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHJvdy5kb2MuX2NvbmZsaWN0cykge1xuICAgICAgICAgIGRlbGV0ZSByb3cuZG9jLl9jb25mbGljdHM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgZG9jIHdlIGdvdCBiYWNrIGZyb20gYWxsRG9jcygpIGlzIHN1ZmZpY2llbnRcbiAgICAgICAgcmVzdWx0RG9jcy5wdXNoKHJvdy5kb2MpO1xuICAgICAgICBkZWxldGUgZGlmZnNbcm93LmlkXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmV2aXNpb25PbmVEb2NzKCkge1xuICAgIC8vIGZpbHRlciBvdXQgdGhlIGdlbmVyYXRpb24gMSBkb2NzIGFuZCBnZXQgdGhlbVxuICAgIC8vIGxlYXZpbmcgdGhlIG5vbi1nZW5lcmF0aW9uIG9uZSBkb2NzIHRvIGJlIGdvdCBvdGhlcndpc2VcbiAgICB2YXIgaWRzID0gT2JqZWN0LmtleXMoZGlmZnMpLmZpbHRlcihmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHZhciBtaXNzaW5nID0gZGlmZnNbaWRdLm1pc3Npbmc7XG4gICAgICByZXR1cm4gbWlzc2luZy5sZW5ndGggPT09IDEgJiYgaXNHZW5PbmUkMShtaXNzaW5nWzBdKTtcbiAgICB9KTtcbiAgICBpZiAoaWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmZXRjaFJldmlzaW9uT25lRG9jcyhpZHMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHVyblJlc3VsdCgpIHtcbiAgICByZXR1cm4geyBvazpvaywgZG9jczpyZXN1bHREb2NzIH07XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihnZXRSZXZpc2lvbk9uZURvY3MpXG4gICAgLnRoZW4oZ2V0QWxsRG9jcylcbiAgICAudGhlbihyZXR1cm5SZXN1bHQpO1xufVxuXG52YXIgQ0hFQ0tQT0lOVF9WRVJTSU9OID0gMTtcbnZhciBSRVBMSUNBVE9SID0gXCJwb3VjaGRiXCI7XG4vLyBUaGlzIGlzIGFuIGFyYml0cmFyeSBudW1iZXIgdG8gbGltaXQgdGhlXG4vLyBhbW91bnQgb2YgcmVwbGljYXRpb24gaGlzdG9yeSB3ZSBzYXZlIGluIHRoZSBjaGVja3BvaW50LlxuLy8gSWYgd2Ugc2F2ZSB0b28gbXVjaCwgdGhlIGNoZWNrcG9pbmcgZG9jcyB3aWxsIGJlY29tZSB2ZXJ5IGJpZyxcbi8vIGlmIHdlIHNhdmUgZmV3ZXIsIHdlJ2xsIHJ1biBhIGdyZWF0ZXIgcmlzayBvZiBoYXZpbmcgdG9cbi8vIHJlYWQgYWxsIHRoZSBjaGFuZ2VzIGZyb20gMCB3aGVuIGNoZWNrcG9pbnQgUFVUcyBmYWlsXG4vLyBDb3VjaERCIDIuMCBoYXMgYSBtb3JlIGludm9sdmVkIGhpc3RvcnkgcHJ1bmluZyxcbi8vIGJ1dCBsZXQncyBnbyBmb3IgdGhlIHNpbXBsZSB2ZXJzaW9uIGZvciBub3cuXG52YXIgQ0hFQ0tQT0lOVF9ISVNUT1JZX1NJWkUgPSA1O1xudmFyIExPV0VTVF9TRVEgPSAwO1xuXG5mdW5jdGlvbiB1cGRhdGVDaGVja3BvaW50KGRiLCBpZCwgY2hlY2twb2ludCwgc2Vzc2lvbiwgcmV0dXJuVmFsdWUpIHtcbiAgcmV0dXJuIGRiLmdldChpZCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIGlmIChkYi5hZGFwdGVyID09PSAnaHR0cCcgfHwgZGIuYWRhcHRlciA9PT0gJ2h0dHBzJykge1xuICAgICAgICBleHBsYWluRXJyb3IoXG4gICAgICAgICAgNDA0LCAnUG91Y2hEQiBpcyBqdXN0IGNoZWNraW5nIGlmIGEgcmVtb3RlIGNoZWNrcG9pbnQgZXhpc3RzLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlc3Npb25faWQ6IHNlc3Npb24sXG4gICAgICAgIF9pZDogaWQsXG4gICAgICAgIGhpc3Rvcnk6IFtdLFxuICAgICAgICByZXBsaWNhdG9yOiBSRVBMSUNBVE9SLFxuICAgICAgICB2ZXJzaW9uOiBDSEVDS1BPSU5UX1ZFUlNJT05cbiAgICAgIH07XG4gICAgfVxuICAgIHRocm93IGVycjtcbiAgfSkudGhlbihmdW5jdGlvbiAoZG9jKSB7XG4gICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBjaGVja3BvaW50IGhhcyBub3QgY2hhbmdlZCwgZG8gbm90IHVwZGF0ZVxuICAgIGlmIChkb2MubGFzdF9zZXEgPT09IGNoZWNrcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaWx0ZXIgb3V0IGN1cnJlbnQgZW50cnkgZm9yIHRoaXMgcmVwbGljYXRpb25cbiAgICBkb2MuaGlzdG9yeSA9IChkb2MuaGlzdG9yeSB8fCBbXSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5zZXNzaW9uX2lkICE9PSBzZXNzaW9uO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIHRoZSBsYXRlc3QgY2hlY2twb2ludCB0byBoaXN0b3J5XG4gICAgZG9jLmhpc3RvcnkudW5zaGlmdCh7XG4gICAgICBsYXN0X3NlcTogY2hlY2twb2ludCxcbiAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25cbiAgICB9KTtcblxuICAgIC8vIEp1c3QgdGFrZSB0aGUgbGFzdCBwaWVjZXMgaW4gaGlzdG9yeSwgdG9cbiAgICAvLyBhdm9pZCByZWFsbHkgYmlnIGNoZWNrcG9pbnQgZG9jcy5cbiAgICAvLyBzZWUgY29tbWVudCBvbiBoaXN0b3J5IHNpemUgYWJvdmVcbiAgICBkb2MuaGlzdG9yeSA9IGRvYy5oaXN0b3J5LnNsaWNlKDAsIENIRUNLUE9JTlRfSElTVE9SWV9TSVpFKTtcblxuICAgIGRvYy52ZXJzaW9uID0gQ0hFQ0tQT0lOVF9WRVJTSU9OO1xuICAgIGRvYy5yZXBsaWNhdG9yID0gUkVQTElDQVRPUjtcblxuICAgIGRvYy5zZXNzaW9uX2lkID0gc2Vzc2lvbjtcbiAgICBkb2MubGFzdF9zZXEgPSBjaGVja3BvaW50O1xuXG4gICAgcmV0dXJuIGRiLnB1dChkb2MpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgLy8gcmV0cnk7IHNvbWVvbmUgaXMgdHJ5aW5nIHRvIHdyaXRlIGEgY2hlY2twb2ludCBzaW11bHRhbmVvdXNseVxuICAgICAgICByZXR1cm4gdXBkYXRlQ2hlY2twb2ludChkYiwgaWQsIGNoZWNrcG9pbnQsIHNlc3Npb24sIHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIENoZWNrcG9pbnRlcihzcmMsIHRhcmdldCwgaWQsIHJldHVyblZhbHVlLCBvcHRzKSB7XG4gIHRoaXMuc3JjID0gc3JjO1xuICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgdGhpcy5pZCA9IGlkO1xuICB0aGlzLnJldHVyblZhbHVlID0gcmV0dXJuVmFsdWU7XG4gIHRoaXMub3B0cyA9IG9wdHMgfHwge307XG59XG5cbkNoZWNrcG9pbnRlci5wcm90b3R5cGUud3JpdGVDaGVja3BvaW50ID0gZnVuY3Rpb24gKGNoZWNrcG9pbnQsIHNlc3Npb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXR1cm4gdGhpcy51cGRhdGVUYXJnZXQoY2hlY2twb2ludCwgc2Vzc2lvbikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNlbGYudXBkYXRlU291cmNlKGNoZWNrcG9pbnQsIHNlc3Npb24pO1xuICB9KTtcbn07XG5cbkNoZWNrcG9pbnRlci5wcm90b3R5cGUudXBkYXRlVGFyZ2V0ID0gZnVuY3Rpb24gKGNoZWNrcG9pbnQsIHNlc3Npb24pIHtcbiAgaWYgKHRoaXMub3B0cy53cml0ZVRhcmdldENoZWNrcG9pbnQpIHtcbiAgICByZXR1cm4gdXBkYXRlQ2hlY2twb2ludCh0aGlzLnRhcmdldCwgdGhpcy5pZCwgY2hlY2twb2ludCxcbiAgICAgIHNlc3Npb24sIHRoaXMucmV0dXJuVmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gIH1cbn07XG5cbkNoZWNrcG9pbnRlci5wcm90b3R5cGUudXBkYXRlU291cmNlID0gZnVuY3Rpb24gKGNoZWNrcG9pbnQsIHNlc3Npb24pIHtcbiAgaWYgKHRoaXMub3B0cy53cml0ZVNvdXJjZUNoZWNrcG9pbnQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIHVwZGF0ZUNoZWNrcG9pbnQodGhpcy5zcmMsIHRoaXMuaWQsIGNoZWNrcG9pbnQsXG4gICAgICBzZXNzaW9uLCB0aGlzLnJldHVyblZhbHVlKVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGlzRm9yYmlkZGVuRXJyb3IoZXJyKSkge1xuICAgICAgICAgIHNlbGYub3B0cy53cml0ZVNvdXJjZUNoZWNrcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG59O1xuXG52YXIgY29tcGFyaXNvbnMgPSB7XG4gIFwidW5kZWZpbmVkXCI6IGZ1bmN0aW9uICh0YXJnZXREb2MsIHNvdXJjZURvYykge1xuICAgIC8vIFRoaXMgaXMgdGhlIHByZXZpb3VzIGNvbXBhcmlzb24gZnVuY3Rpb25cbiAgICBpZiAoY29sbGF0ZSh0YXJnZXREb2MubGFzdF9zZXEsIHNvdXJjZURvYy5sYXN0X3NlcSkgPT09IDApIHtcbiAgICAgIHJldHVybiBzb3VyY2VEb2MubGFzdF9zZXE7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIDA7XG4gIH0sXG4gIFwiMVwiOiBmdW5jdGlvbiAodGFyZ2V0RG9jLCBzb3VyY2VEb2MpIHtcbiAgICAvLyBUaGlzIGlzIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uIHBvcnRlZCBmcm9tIENvdWNoREJcbiAgICByZXR1cm4gY29tcGFyZVJlcGxpY2F0aW9uTG9ncyhzb3VyY2VEb2MsIHRhcmdldERvYykubGFzdF9zZXE7XG4gIH1cbn07XG5cbkNoZWNrcG9pbnRlci5wcm90b3R5cGUuZ2V0Q2hlY2twb2ludCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmIChzZWxmLm9wdHMgJiYgc2VsZi5vcHRzLndyaXRlU291cmNlQ2hlY2twb2ludCAmJiAhc2VsZi5vcHRzLndyaXRlVGFyZ2V0Q2hlY2twb2ludCkge1xuICAgIHJldHVybiBzZWxmLnNyYy5nZXQoc2VsZi5pZCkudGhlbihmdW5jdGlvbiAoc291cmNlRG9jKSB7XG4gICAgICByZXR1cm4gc291cmNlRG9jLmxhc3Rfc2VxIHx8IExPV0VTVF9TRVE7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoZXJyLnN0YXR1cyAhPT0gNDA0KSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBMT1dFU1RfU0VRO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNlbGYudGFyZ2V0LmdldChzZWxmLmlkKS50aGVuKGZ1bmN0aW9uICh0YXJnZXREb2MpIHtcbiAgICBpZiAoc2VsZi5vcHRzICYmIHNlbGYub3B0cy53cml0ZVRhcmdldENoZWNrcG9pbnQgJiYgIXNlbGYub3B0cy53cml0ZVNvdXJjZUNoZWNrcG9pbnQpIHtcbiAgICAgIHJldHVybiB0YXJnZXREb2MubGFzdF9zZXEgfHwgTE9XRVNUX1NFUTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZi5zcmMuZ2V0KHNlbGYuaWQpLnRoZW4oZnVuY3Rpb24gKHNvdXJjZURvYykge1xuICAgICAgLy8gU2luY2Ugd2UgY2FuJ3QgbWlncmF0ZSBhbiBvbGQgdmVyc2lvbiBkb2MgdG8gYSBuZXcgb25lXG4gICAgICAvLyAobm8gc2Vzc2lvbiBpZCksIHdlIGp1c3QgZ28gd2l0aCB0aGUgbG93ZXN0IHNlcSBpbiB0aGlzIGNhc2VcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHRhcmdldERvYy52ZXJzaW9uICE9PSBzb3VyY2VEb2MudmVyc2lvbikge1xuICAgICAgICByZXR1cm4gTE9XRVNUX1NFUTtcbiAgICAgIH1cblxuICAgICAgdmFyIHZlcnNpb247XG4gICAgICBpZiAodGFyZ2V0RG9jLnZlcnNpb24pIHtcbiAgICAgICAgdmVyc2lvbiA9IHRhcmdldERvYy52ZXJzaW9uLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ZXJzaW9uID0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKHZlcnNpb24gaW4gY29tcGFyaXNvbnMpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmlzb25zW3ZlcnNpb25dKHRhcmdldERvYywgc291cmNlRG9jKTtcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICByZXR1cm4gTE9XRVNUX1NFUTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA0ICYmIHRhcmdldERvYy5sYXN0X3NlcSkge1xuICAgICAgICByZXR1cm4gc2VsZi5zcmMucHV0KHtcbiAgICAgICAgICBfaWQ6IHNlbGYuaWQsXG4gICAgICAgICAgbGFzdF9zZXE6IExPV0VTVF9TRVFcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIExPV0VTVF9TRVE7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpZiAoaXNGb3JiaWRkZW5FcnJvcihlcnIpKSB7XG4gICAgICAgICAgICBzZWxmLm9wdHMud3JpdGVTb3VyY2VDaGVja3BvaW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0RG9jLmxhc3Rfc2VxO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIHJldHVybiBMT1dFU1RfU0VRO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIuc3RhdHVzICE9PSA0MDQpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIExPV0VTVF9TRVE7XG4gIH0pO1xufTtcbi8vIFRoaXMgY2hlY2twb2ludCBjb21wYXJpc29uIGlzIHBvcnRlZCBmcm9tIENvdWNoREJzIHNvdXJjZVxuLy8gdGhleSBjb21lIGZyb20gaGVyZTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hcGFjaGUvY291Y2hkYi1jb3VjaC1yZXBsaWNhdG9yL2Jsb2IvbWFzdGVyL3NyYy9jb3VjaF9yZXBsaWNhdG9yLmVybCNMODYzLUw5MDZcblxuZnVuY3Rpb24gY29tcGFyZVJlcGxpY2F0aW9uTG9ncyhzcmNEb2MsIHRndERvYykge1xuICBpZiAoc3JjRG9jLnNlc3Npb25faWQgPT09IHRndERvYy5zZXNzaW9uX2lkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3Rfc2VxOiBzcmNEb2MubGFzdF9zZXEsXG4gICAgICBoaXN0b3J5OiBzcmNEb2MuaGlzdG9yeVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gY29tcGFyZVJlcGxpY2F0aW9uSGlzdG9yeShzcmNEb2MuaGlzdG9yeSwgdGd0RG9jLmhpc3RvcnkpO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlUmVwbGljYXRpb25IaXN0b3J5KHNvdXJjZUhpc3RvcnksIHRhcmdldEhpc3RvcnkpIHtcbiAgLy8gdGhlIGVybGFuZyBsb29wIHZpYSBmdW5jdGlvbiBhcmd1bWVudHMgaXMgbm90IHNvIGVhc3kgdG8gcmVwZWF0IGluIEpTXG4gIC8vIHRoZXJlZm9yZSwgZG9pbmcgdGhpcyBhcyByZWN1cnNpb25cbiAgdmFyIFMgPSBzb3VyY2VIaXN0b3J5WzBdO1xuICB2YXIgc291cmNlUmVzdCA9IHNvdXJjZUhpc3Rvcnkuc2xpY2UoMSk7XG4gIHZhciBUID0gdGFyZ2V0SGlzdG9yeVswXTtcbiAgdmFyIHRhcmdldFJlc3QgPSB0YXJnZXRIaXN0b3J5LnNsaWNlKDEpO1xuXG4gIGlmICghUyB8fCB0YXJnZXRIaXN0b3J5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYXN0X3NlcTogTE9XRVNUX1NFUSxcbiAgICAgIGhpc3Rvcnk6IFtdXG4gICAgfTtcbiAgfVxuXG4gIHZhciBzb3VyY2VJZCA9IFMuc2Vzc2lvbl9pZDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChoYXNTZXNzaW9uSWQoc291cmNlSWQsIHRhcmdldEhpc3RvcnkpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3Rfc2VxOiBTLmxhc3Rfc2VxLFxuICAgICAgaGlzdG9yeTogc291cmNlSGlzdG9yeVxuICAgIH07XG4gIH1cblxuICB2YXIgdGFyZ2V0SWQgPSBULnNlc3Npb25faWQ7XG4gIGlmIChoYXNTZXNzaW9uSWQodGFyZ2V0SWQsIHNvdXJjZVJlc3QpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3Rfc2VxOiBULmxhc3Rfc2VxLFxuICAgICAgaGlzdG9yeTogdGFyZ2V0UmVzdFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gY29tcGFyZVJlcGxpY2F0aW9uSGlzdG9yeShzb3VyY2VSZXN0LCB0YXJnZXRSZXN0KTtcbn1cblxuZnVuY3Rpb24gaGFzU2Vzc2lvbklkKHNlc3Npb25JZCwgaGlzdG9yeSkge1xuICB2YXIgcHJvcHMgPSBoaXN0b3J5WzBdO1xuICB2YXIgcmVzdCA9IGhpc3Rvcnkuc2xpY2UoMSk7XG5cbiAgaWYgKCFzZXNzaW9uSWQgfHwgaGlzdG9yeS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2Vzc2lvbklkID09PSBwcm9wcy5zZXNzaW9uX2lkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gaGFzU2Vzc2lvbklkKHNlc3Npb25JZCwgcmVzdCk7XG59XG5cbmZ1bmN0aW9uIGlzRm9yYmlkZGVuRXJyb3IoZXJyKSB7XG4gIHJldHVybiB0eXBlb2YgZXJyLnN0YXR1cyA9PT0gJ251bWJlcicgJiYgTWF0aC5mbG9vcihlcnIuc3RhdHVzIC8gMTAwKSA9PT0gNDtcbn1cblxudmFyIFNUQVJUSU5HX0JBQ0tfT0ZGID0gMDtcblxuZnVuY3Rpb24gYmFja09mZihvcHRzLCByZXR1cm5WYWx1ZSwgZXJyb3IsIGNhbGxiYWNrKSB7XG4gIGlmIChvcHRzLnJldHJ5ID09PSBmYWxzZSkge1xuICAgIHJldHVyblZhbHVlLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIHJldHVyblZhbHVlLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIHJldHVybjtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBvcHRzLmJhY2tfb2ZmX2Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0cy5iYWNrX29mZl9mdW5jdGlvbiA9IGRlZmF1bHRCYWNrT2ZmO1xuICB9XG4gIHJldHVyblZhbHVlLmVtaXQoJ3JlcXVlc3RFcnJvcicsIGVycm9yKTtcbiAgaWYgKHJldHVyblZhbHVlLnN0YXRlID09PSAnYWN0aXZlJyB8fCByZXR1cm5WYWx1ZS5zdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgcmV0dXJuVmFsdWUuZW1pdCgncGF1c2VkJywgZXJyb3IpO1xuICAgIHJldHVyblZhbHVlLnN0YXRlID0gJ3N0b3BwZWQnO1xuICAgIHZhciBiYWNrT2ZmU2V0ID0gZnVuY3Rpb24gYmFja29mZlRpbWVTZXQoKSB7XG4gICAgICBvcHRzLmN1cnJlbnRfYmFja19vZmYgPSBTVEFSVElOR19CQUNLX09GRjtcbiAgICB9O1xuICAgIHZhciByZW1vdmVCYWNrT2ZmU2V0dGVyID0gZnVuY3Rpb24gcmVtb3ZlQmFja09mZlRpbWVTZXQoKSB7XG4gICAgICByZXR1cm5WYWx1ZS5yZW1vdmVMaXN0ZW5lcignYWN0aXZlJywgYmFja09mZlNldCk7XG4gICAgfTtcbiAgICByZXR1cm5WYWx1ZS5vbmNlKCdwYXVzZWQnLCByZW1vdmVCYWNrT2ZmU2V0dGVyKTtcbiAgICByZXR1cm5WYWx1ZS5vbmNlKCdhY3RpdmUnLCBiYWNrT2ZmU2V0KTtcbiAgfVxuXG4gIG9wdHMuY3VycmVudF9iYWNrX29mZiA9IG9wdHMuY3VycmVudF9iYWNrX29mZiB8fCBTVEFSVElOR19CQUNLX09GRjtcbiAgb3B0cy5jdXJyZW50X2JhY2tfb2ZmID0gb3B0cy5iYWNrX29mZl9mdW5jdGlvbihvcHRzLmN1cnJlbnRfYmFja19vZmYpO1xuICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBvcHRzLmN1cnJlbnRfYmFja19vZmYpO1xufVxuXG5mdW5jdGlvbiBzb3J0T2JqZWN0UHJvcGVydGllc0J5S2V5KHF1ZXJ5UGFyYW1zKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcykuc29ydChjb2xsYXRlKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSBxdWVyeVBhcmFtc1trZXldO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cblxuLy8gR2VuZXJhdGUgYSB1bmlxdWUgaWQgcGFydGljdWxhciB0byB0aGlzIHJlcGxpY2F0aW9uLlxuLy8gTm90IGd1YXJhbnRlZWQgdG8gYWxpZ24gcGVyZmVjdGx5IHdpdGggQ291Y2hEQidzIHJlcCBpZHMuXG5mdW5jdGlvbiBnZW5lcmF0ZVJlcGxpY2F0aW9uSWQoc3JjLCB0YXJnZXQsIG9wdHMpIHtcbiAgdmFyIGRvY0lkcyA9IG9wdHMuZG9jX2lkcyA/IG9wdHMuZG9jX2lkcy5zb3J0KGNvbGxhdGUpIDogJyc7XG4gIHZhciBmaWx0ZXJGdW4gPSBvcHRzLmZpbHRlciA/IG9wdHMuZmlsdGVyLnRvU3RyaW5nKCkgOiAnJztcbiAgdmFyIHF1ZXJ5UGFyYW1zID0gJyc7XG4gIHZhciBmaWx0ZXJWaWV3TmFtZSA9ICAnJztcbiAgdmFyIHNlbGVjdG9yID0gJyc7XG5cbiAgLy8gcG9zc2liaWxpdHkgZm9yIGNoZWNrcG9pbnRzIHRvIGJlIGxvc3QgaGVyZSBhcyBiZWhhdmlvdXIgb2ZcbiAgLy8gSlNPTi5zdHJpbmdpZnkgaXMgbm90IHN0YWJsZSAoc2VlICM2MjI2KVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKG9wdHMuc2VsZWN0b3IpIHtcbiAgICBzZWxlY3RvciA9IEpTT04uc3RyaW5naWZ5KG9wdHMuc2VsZWN0b3IpO1xuICB9XG5cbiAgaWYgKG9wdHMuZmlsdGVyICYmIG9wdHMucXVlcnlfcGFyYW1zKSB7XG4gICAgcXVlcnlQYXJhbXMgPSBKU09OLnN0cmluZ2lmeShzb3J0T2JqZWN0UHJvcGVydGllc0J5S2V5KG9wdHMucXVlcnlfcGFyYW1zKSk7XG4gIH1cblxuICBpZiAob3B0cy5maWx0ZXIgJiYgb3B0cy5maWx0ZXIgPT09ICdfdmlldycpIHtcbiAgICBmaWx0ZXJWaWV3TmFtZSA9IG9wdHMudmlldy50b1N0cmluZygpO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKFtzcmMuaWQoKSwgdGFyZ2V0LmlkKCldKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICB2YXIgcXVlcnlEYXRhID0gcmVzWzBdICsgcmVzWzFdICsgZmlsdGVyRnVuICsgZmlsdGVyVmlld05hbWUgK1xuICAgICAgcXVlcnlQYXJhbXMgKyBkb2NJZHMgKyBzZWxlY3RvcjtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIGJpbmFyeU1kNShxdWVyeURhdGEsIHJlc29sdmUpO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uIChtZDVzdW0pIHtcbiAgICAvLyBjYW4ndCB1c2Ugc3RyYWlnaHQtdXAgbWQ1IGFscGhhYmV0LCBiZWNhdXNlXG4gICAgLy8gdGhlIGNoYXIgJy8nIGlzIGludGVycHJldGVkIGFzIGJlaW5nIGZvciBhdHRhY2htZW50cyxcbiAgICAvLyBhbmQgKyBpcyBhbHNvIG5vdCB1cmwtc2FmZVxuICAgIG1kNXN1bSA9IG1kNXN1bS5yZXBsYWNlKC9cXC8vZywgJy4nKS5yZXBsYWNlKC9cXCsvZywgJ18nKTtcbiAgICByZXR1cm4gJ19sb2NhbC8nICsgbWQ1c3VtO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGljYXRlKHNyYywgdGFyZ2V0LCBvcHRzLCByZXR1cm5WYWx1ZSwgcmVzdWx0KSB7XG4gIHZhciBiYXRjaGVzID0gW107ICAgICAgICAgICAgICAgLy8gbGlzdCBvZiBiYXRjaGVzIHRvIGJlIHByb2Nlc3NlZFxuICB2YXIgY3VycmVudEJhdGNoOyAgICAgICAgICAgICAgIC8vIHRoZSBiYXRjaCBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkXG4gIHZhciBwZW5kaW5nQmF0Y2ggPSB7XG4gICAgc2VxOiAwLFxuICAgIGNoYW5nZXM6IFtdLFxuICAgIGRvY3M6IFtdXG4gIH07IC8vIG5leHQgYmF0Y2gsIG5vdCB5ZXQgcmVhZHkgdG8gYmUgcHJvY2Vzc2VkXG4gIHZhciB3cml0aW5nQ2hlY2twb2ludCA9IGZhbHNlOyAgLy8gdHJ1ZSB3aGlsZSBjaGVja3BvaW50IGlzIGJlaW5nIHdyaXR0ZW5cbiAgdmFyIGNoYW5nZXNDb21wbGV0ZWQgPSBmYWxzZTsgICAvLyB0cnVlIHdoZW4gYWxsIGNoYW5nZXMgcmVjZWl2ZWRcbiAgdmFyIHJlcGxpY2F0aW9uQ29tcGxldGVkID0gZmFsc2U7IC8vIHRydWUgd2hlbiByZXBsaWNhdGlvbiBoYXMgY29tcGxldGVkXG4gIHZhciBsYXN0X3NlcSA9IDA7XG4gIHZhciBjb250aW51b3VzID0gb3B0cy5jb250aW51b3VzIHx8IG9wdHMubGl2ZSB8fCBmYWxzZTtcbiAgdmFyIGJhdGNoX3NpemUgPSBvcHRzLmJhdGNoX3NpemUgfHwgMTAwO1xuICB2YXIgYmF0Y2hlc19saW1pdCA9IG9wdHMuYmF0Y2hlc19saW1pdCB8fCAxMDtcbiAgdmFyIGNoYW5nZXNQZW5kaW5nID0gZmFsc2U7ICAgICAvLyB0cnVlIHdoaWxlIHNyYy5jaGFuZ2VzIGlzIHJ1bm5pbmdcbiAgdmFyIGRvY19pZHMgPSBvcHRzLmRvY19pZHM7XG4gIHZhciBzZWxlY3RvciA9IG9wdHMuc2VsZWN0b3I7XG4gIHZhciByZXBJZDtcbiAgdmFyIGNoZWNrcG9pbnRlcjtcbiAgdmFyIGNoYW5nZWREb2NzID0gW107XG4gIC8vIExpa2UgY291Y2hkYiwgZXZlcnkgcmVwbGljYXRpb24gZ2V0cyBhIHVuaXF1ZSBzZXNzaW9uIGlkXG4gIHZhciBzZXNzaW9uID0gdXVpZCgpO1xuXG4gIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgb2s6IHRydWUsXG4gICAgc3RhcnRfdGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgIGRvY3NfcmVhZDogMCxcbiAgICBkb2NzX3dyaXR0ZW46IDAsXG4gICAgZG9jX3dyaXRlX2ZhaWx1cmVzOiAwLFxuICAgIGVycm9yczogW11cbiAgfTtcblxuICB2YXIgY2hhbmdlc09wdHMgPSB7fTtcbiAgcmV0dXJuVmFsdWUucmVhZHkoc3JjLCB0YXJnZXQpO1xuXG4gIGZ1bmN0aW9uIGluaXRDaGVja3BvaW50ZXIoKSB7XG4gICAgaWYgKGNoZWNrcG9pbnRlcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gZ2VuZXJhdGVSZXBsaWNhdGlvbklkKHNyYywgdGFyZ2V0LCBvcHRzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHJlcElkID0gcmVzO1xuXG4gICAgICB2YXIgY2hlY2twb2ludE9wdHMgPSB7fTtcbiAgICAgIGlmIChvcHRzLmNoZWNrcG9pbnQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNoZWNrcG9pbnRPcHRzID0geyB3cml0ZVNvdXJjZUNoZWNrcG9pbnQ6IGZhbHNlLCB3cml0ZVRhcmdldENoZWNrcG9pbnQ6IGZhbHNlIH07XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuY2hlY2twb2ludCA9PT0gJ3NvdXJjZScpIHtcbiAgICAgICAgY2hlY2twb2ludE9wdHMgPSB7IHdyaXRlU291cmNlQ2hlY2twb2ludDogdHJ1ZSwgd3JpdGVUYXJnZXRDaGVja3BvaW50OiBmYWxzZSB9O1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmNoZWNrcG9pbnQgPT09ICd0YXJnZXQnKSB7XG4gICAgICAgIGNoZWNrcG9pbnRPcHRzID0geyB3cml0ZVNvdXJjZUNoZWNrcG9pbnQ6IGZhbHNlLCB3cml0ZVRhcmdldENoZWNrcG9pbnQ6IHRydWUgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrcG9pbnRPcHRzID0geyB3cml0ZVNvdXJjZUNoZWNrcG9pbnQ6IHRydWUsIHdyaXRlVGFyZ2V0Q2hlY2twb2ludDogdHJ1ZSB9O1xuICAgICAgfVxuXG4gICAgICBjaGVja3BvaW50ZXIgPSBuZXcgQ2hlY2twb2ludGVyKHNyYywgdGFyZ2V0LCByZXBJZCwgcmV0dXJuVmFsdWUsIGNoZWNrcG9pbnRPcHRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlRG9jcygpIHtcbiAgICBjaGFuZ2VkRG9jcyA9IFtdO1xuXG4gICAgaWYgKGN1cnJlbnRCYXRjaC5kb2NzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZG9jcyA9IGN1cnJlbnRCYXRjaC5kb2NzO1xuICAgIHZhciBidWxrT3B0cyA9IHt0aW1lb3V0OiBvcHRzLnRpbWVvdXR9O1xuICAgIHJldHVybiB0YXJnZXQuYnVsa0RvY3Moe2RvY3M6IGRvY3MsIG5ld19lZGl0czogZmFsc2V9LCBidWxrT3B0cykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChyZXR1cm5WYWx1ZS5jYW5jZWxsZWQpIHtcbiAgICAgICAgY29tcGxldGVSZXBsaWNhdGlvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbmNlbGxlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBgcmVzYCBkb2Vzbid0IGluY2x1ZGUgZnVsbCBkb2N1bWVudHMgKHdoaWNoIGxpdmUgaW4gYGRvY3NgKSwgc28gd2UgY3JlYXRlIGEgbWFwIG9mIFxuICAgICAgLy8gKGlkIC0+IGVycm9yKSwgYW5kIGNoZWNrIGZvciBlcnJvcnMgd2hpbGUgaXRlcmF0aW5nIG92ZXIgYGRvY3NgXG4gICAgICB2YXIgZXJyb3JzQnlJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICByZXMuZm9yRWFjaChmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcnNCeUlkW3Jlcy5pZF0gPSByZXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZXJyb3JzTm8gPSBPYmplY3Qua2V5cyhlcnJvcnNCeUlkKS5sZW5ndGg7XG4gICAgICByZXN1bHQuZG9jX3dyaXRlX2ZhaWx1cmVzICs9IGVycm9yc05vO1xuICAgICAgcmVzdWx0LmRvY3Nfd3JpdHRlbiArPSBkb2NzLmxlbmd0aCAtIGVycm9yc05vO1xuXG4gICAgICBkb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvYykge1xuICAgICAgICB2YXIgZXJyb3IgPSBlcnJvcnNCeUlkW2RvYy5faWRdO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgIC8vIE5vcm1hbGl6ZSBlcnJvciBuYW1lLiBpLmUuICdVbmF1dGhvcml6ZWQnIC0+ICd1bmF1dGhvcml6ZWQnIChlZyBTeW5jIEdhdGV3YXkpXG4gICAgICAgICAgdmFyIGVycm9yTmFtZSA9IChlcnJvci5uYW1lIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmIChlcnJvck5hbWUgPT09ICd1bmF1dGhvcml6ZWQnIHx8IGVycm9yTmFtZSA9PT0gJ2ZvcmJpZGRlbicpIHtcbiAgICAgICAgICAgIHJldHVyblZhbHVlLmVtaXQoJ2RlbmllZCcsIGNsb25lKGVycm9yKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFuZ2VkRG9jcy5wdXNoKGRvYyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgcmVzdWx0LmRvY193cml0ZV9mYWlsdXJlcyArPSBkb2NzLmxlbmd0aDtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaEJhdGNoKCkge1xuICAgIGlmIChjdXJyZW50QmF0Y2guZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSBnZXR0aW5nIGRvY3MuJyk7XG4gICAgfVxuICAgIHJlc3VsdC5sYXN0X3NlcSA9IGxhc3Rfc2VxID0gY3VycmVudEJhdGNoLnNlcTtcbiAgICB2YXIgb3V0UmVzdWx0ID0gY2xvbmUocmVzdWx0KTtcbiAgICBpZiAoY2hhbmdlZERvY3MubGVuZ3RoKSB7XG4gICAgICBvdXRSZXN1bHQuZG9jcyA9IGNoYW5nZWREb2NzO1xuICAgICAgLy8gQXR0YWNoICdwZW5kaW5nJyBwcm9wZXJ0eSBpZiBzZXJ2ZXIgc3VwcG9ydHMgaXQgKENvdWNoREIgMi4wKylcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50QmF0Y2gucGVuZGluZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgb3V0UmVzdWx0LnBlbmRpbmcgPSBjdXJyZW50QmF0Y2gucGVuZGluZztcbiAgICAgICAgZGVsZXRlIGN1cnJlbnRCYXRjaC5wZW5kaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuVmFsdWUuZW1pdCgnY2hhbmdlJywgb3V0UmVzdWx0KTtcbiAgICB9XG4gICAgd3JpdGluZ0NoZWNrcG9pbnQgPSB0cnVlO1xuICAgIHJldHVybiBjaGVja3BvaW50ZXIud3JpdGVDaGVja3BvaW50KGN1cnJlbnRCYXRjaC5zZXEsXG4gICAgICAgIHNlc3Npb24pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGluZ0NoZWNrcG9pbnQgPSBmYWxzZTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgICBjb21wbGV0ZVJlcGxpY2F0aW9uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuY2VsbGVkJyk7XG4gICAgICB9XG4gICAgICBjdXJyZW50QmF0Y2ggPSB1bmRlZmluZWQ7XG4gICAgICBnZXRDaGFuZ2VzKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgb25DaGVja3BvaW50RXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpZmZzKCkge1xuICAgIHZhciBkaWZmID0ge307XG4gICAgY3VycmVudEJhdGNoLmNoYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAvLyBDb3VjaGJhc2UgU3luYyBHYXRld2F5IGVtaXRzIHRoZXNlLCBidXQgd2UgY2FuIGlnbm9yZSB0aGVtXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChjaGFuZ2UuaWQgPT09IFwiX3VzZXIvXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlmZltjaGFuZ2UuaWRdID0gY2hhbmdlLmNoYW5nZXMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LnJldjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0YXJnZXQucmV2c0RpZmYoZGlmZikudGhlbihmdW5jdGlvbiAoZGlmZnMpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgICBjb21wbGV0ZVJlcGxpY2F0aW9uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuY2VsbGVkJyk7XG4gICAgICB9XG4gICAgICAvLyBjdXJyZW50QmF0Y2guZGlmZnMgZWxlbWVudHMgYXJlIGRlbGV0ZWQgYXMgdGhlIGRvY3VtZW50cyBhcmUgd3JpdHRlblxuICAgICAgY3VycmVudEJhdGNoLmRpZmZzID0gZGlmZnM7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYXRjaERvY3MoKSB7XG4gICAgcmV0dXJuIGdldERvY3Moc3JjLCB0YXJnZXQsIGN1cnJlbnRCYXRjaC5kaWZmcywgcmV0dXJuVmFsdWUpLnRoZW4oZnVuY3Rpb24gKGdvdCkge1xuICAgICAgY3VycmVudEJhdGNoLmVycm9yID0gIWdvdC5vaztcbiAgICAgIGdvdC5kb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvYykge1xuICAgICAgICBkZWxldGUgY3VycmVudEJhdGNoLmRpZmZzW2RvYy5faWRdO1xuICAgICAgICByZXN1bHQuZG9jc19yZWFkKys7XG4gICAgICAgIGN1cnJlbnRCYXRjaC5kb2NzLnB1c2goZG9jKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnROZXh0QmF0Y2goKSB7XG4gICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCB8fCBjdXJyZW50QmF0Y2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGJhdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBwcm9jZXNzUGVuZGluZ0JhdGNoKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdXJyZW50QmF0Y2ggPSBiYXRjaGVzLnNoaWZ0KCk7XG4gICAgZ2V0RGlmZnMoKVxuICAgICAgLnRoZW4oZ2V0QmF0Y2hEb2NzKVxuICAgICAgLnRoZW4od3JpdGVEb2NzKVxuICAgICAgLnRoZW4oZmluaXNoQmF0Y2gpXG4gICAgICAudGhlbihzdGFydE5leHRCYXRjaClcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGFib3J0UmVwbGljYXRpb24oJ2JhdGNoIHByb2Nlc3NpbmcgdGVybWluYXRlZCB3aXRoIGVycm9yJywgZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBmdW5jdGlvbiBwcm9jZXNzUGVuZGluZ0JhdGNoKGltbWVkaWF0ZSQkMSkge1xuICAgIGlmIChwZW5kaW5nQmF0Y2guY2hhbmdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChiYXRjaGVzLmxlbmd0aCA9PT0gMCAmJiAhY3VycmVudEJhdGNoKSB7XG4gICAgICAgIGlmICgoY29udGludW91cyAmJiBjaGFuZ2VzT3B0cy5saXZlKSB8fCBjaGFuZ2VzQ29tcGxldGVkKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWUuc3RhdGUgPSAncGVuZGluZyc7XG4gICAgICAgICAgcmV0dXJuVmFsdWUuZW1pdCgncGF1c2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICBjb21wbGV0ZVJlcGxpY2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgaW1tZWRpYXRlJCQxIHx8XG4gICAgICBjaGFuZ2VzQ29tcGxldGVkIHx8XG4gICAgICBwZW5kaW5nQmF0Y2guY2hhbmdlcy5sZW5ndGggPj0gYmF0Y2hfc2l6ZVxuICAgICkge1xuICAgICAgYmF0Y2hlcy5wdXNoKHBlbmRpbmdCYXRjaCk7XG4gICAgICBwZW5kaW5nQmF0Y2ggPSB7XG4gICAgICAgIHNlcTogMCxcbiAgICAgICAgY2hhbmdlczogW10sXG4gICAgICAgIGRvY3M6IFtdXG4gICAgICB9O1xuICAgICAgaWYgKHJldHVyblZhbHVlLnN0YXRlID09PSAncGVuZGluZycgfHwgcmV0dXJuVmFsdWUuc3RhdGUgPT09ICdzdG9wcGVkJykge1xuICAgICAgICByZXR1cm5WYWx1ZS5zdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgICByZXR1cm5WYWx1ZS5lbWl0KCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0TmV4dEJhdGNoKCk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBhYm9ydFJlcGxpY2F0aW9uKHJlYXNvbiwgZXJyKSB7XG4gICAgaWYgKHJlcGxpY2F0aW9uQ29tcGxldGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZXJyLm1lc3NhZ2UpIHtcbiAgICAgIGVyci5tZXNzYWdlID0gcmVhc29uO1xuICAgIH1cbiAgICByZXN1bHQub2sgPSBmYWxzZTtcbiAgICByZXN1bHQuc3RhdHVzID0gJ2Fib3J0aW5nJztcbiAgICBiYXRjaGVzID0gW107XG4gICAgcGVuZGluZ0JhdGNoID0ge1xuICAgICAgc2VxOiAwLFxuICAgICAgY2hhbmdlczogW10sXG4gICAgICBkb2NzOiBbXVxuICAgIH07XG4gICAgY29tcGxldGVSZXBsaWNhdGlvbihlcnIpO1xuICB9XG5cblxuICBmdW5jdGlvbiBjb21wbGV0ZVJlcGxpY2F0aW9uKGZhdGFsRXJyb3IpIHtcbiAgICBpZiAocmVwbGljYXRpb25Db21wbGV0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgcmVzdWx0LnN0YXR1cyA9ICdjYW5jZWxsZWQnO1xuICAgICAgaWYgKHdyaXRpbmdDaGVja3BvaW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnN0YXR1cyA9IHJlc3VsdC5zdGF0dXMgfHwgJ2NvbXBsZXRlJztcbiAgICByZXN1bHQuZW5kX3RpbWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmVzdWx0Lmxhc3Rfc2VxID0gbGFzdF9zZXE7XG4gICAgcmVwbGljYXRpb25Db21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKGZhdGFsRXJyb3IpIHtcbiAgICAgIC8vIG5lZWQgdG8gZXh0ZW5kIHRoZSBlcnJvciBiZWNhdXNlIEZpcmVmb3ggY29uc2lkZXJzIFwiLnJlc3VsdFwiIHJlYWQtb25seVxuICAgICAgZmF0YWxFcnJvciA9IGNyZWF0ZUVycm9yKGZhdGFsRXJyb3IpO1xuICAgICAgZmF0YWxFcnJvci5yZXN1bHQgPSByZXN1bHQ7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSBlcnJvciBuYW1lLiBpLmUuICdVbmF1dGhvcml6ZWQnIC0+ICd1bmF1dGhvcml6ZWQnIChlZyBTeW5jIEdhdGV3YXkpXG4gICAgICB2YXIgZXJyb3JOYW1lID0gKGZhdGFsRXJyb3IubmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChlcnJvck5hbWUgPT09ICd1bmF1dGhvcml6ZWQnIHx8IGVycm9yTmFtZSA9PT0gJ2ZvcmJpZGRlbicpIHtcbiAgICAgICAgcmV0dXJuVmFsdWUuZW1pdCgnZXJyb3InLCBmYXRhbEVycm9yKTtcbiAgICAgICAgcmV0dXJuVmFsdWUucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrT2ZmKG9wdHMsIHJldHVyblZhbHVlLCBmYXRhbEVycm9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVwbGljYXRlKHNyYywgdGFyZ2V0LCBvcHRzLCByZXR1cm5WYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5WYWx1ZS5lbWl0KCdjb21wbGV0ZScsIHJlc3VsdCk7XG4gICAgICByZXR1cm5WYWx1ZS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uQ2hhbmdlKGNoYW5nZSwgcGVuZGluZywgbGFzdFNlcSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChyZXR1cm5WYWx1ZS5jYW5jZWxsZWQpIHtcbiAgICAgIHJldHVybiBjb21wbGV0ZVJlcGxpY2F0aW9uKCk7XG4gICAgfVxuICAgIC8vIEF0dGFjaCAncGVuZGluZycgcHJvcGVydHkgaWYgc2VydmVyIHN1cHBvcnRzIGl0IChDb3VjaERCIDIuMCspXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHR5cGVvZiBwZW5kaW5nID09PSAnbnVtYmVyJykge1xuICAgICAgcGVuZGluZ0JhdGNoLnBlbmRpbmcgPSBwZW5kaW5nO1xuICAgIH1cblxuICAgIHZhciBmaWx0ZXIgPSBmaWx0ZXJDaGFuZ2Uob3B0cykoY2hhbmdlKTtcbiAgICBpZiAoIWZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwZW5kaW5nQmF0Y2guc2VxID0gY2hhbmdlLnNlcSB8fCBsYXN0U2VxO1xuICAgIHBlbmRpbmdCYXRjaC5jaGFuZ2VzLnB1c2goY2hhbmdlKTtcbiAgICBpbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzc1BlbmRpbmdCYXRjaChiYXRjaGVzLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VzT3B0cy5saXZlKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gb25DaGFuZ2VzQ29tcGxldGUoY2hhbmdlcykge1xuICAgIGNoYW5nZXNQZW5kaW5nID0gZmFsc2U7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuIGNvbXBsZXRlUmVwbGljYXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBubyByZXN1bHRzIHdlcmUgcmV0dXJuZWQgdGhlbiB3ZSdyZSBkb25lLFxuICAgIC8vIGVsc2UgZmV0Y2ggbW9yZVxuICAgIGlmIChjaGFuZ2VzLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgY2hhbmdlc09wdHMuc2luY2UgPSBjaGFuZ2VzLnJlc3VsdHNbY2hhbmdlcy5yZXN1bHRzLmxlbmd0aCAtIDFdLnNlcTtcbiAgICAgIGdldENoYW5nZXMoKTtcbiAgICAgIHByb2Nlc3NQZW5kaW5nQmF0Y2godHJ1ZSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY29udGludW91cykge1xuICAgICAgICAgIGNoYW5nZXNPcHRzLmxpdmUgPSB0cnVlO1xuICAgICAgICAgIGdldENoYW5nZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFuZ2VzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzUGVuZGluZ0JhdGNoKHRydWUpO1xuICAgICAgfTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBjaGVja3BvaW50IHNvIHdlIHN0YXJ0IGZyb20gdGhlIHJpZ2h0IHNlcSBuZXh0IHRpbWVcbiAgICAgIGlmICghY3VycmVudEJhdGNoICYmIGNoYW5nZXMucmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgd3JpdGluZ0NoZWNrcG9pbnQgPSB0cnVlO1xuICAgICAgICBjaGVja3BvaW50ZXIud3JpdGVDaGVja3BvaW50KGNoYW5nZXMubGFzdF9zZXEsXG4gICAgICAgICAgICBzZXNzaW9uKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3cml0aW5nQ2hlY2twb2ludCA9IGZhbHNlO1xuICAgICAgICAgIHJlc3VsdC5sYXN0X3NlcSA9IGxhc3Rfc2VxID0gY2hhbmdlcy5sYXN0X3NlcTtcbiAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gob25DaGVja3BvaW50RXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uQ2hhbmdlc0Vycm9yKGVycikge1xuICAgIGNoYW5nZXNQZW5kaW5nID0gZmFsc2U7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuIGNvbXBsZXRlUmVwbGljYXRpb24oKTtcbiAgICB9XG4gICAgYWJvcnRSZXBsaWNhdGlvbignY2hhbmdlcyByZWplY3RlZCcsIGVycik7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldENoYW5nZXMoKSB7XG4gICAgaWYgKCEoXG4gICAgICAhY2hhbmdlc1BlbmRpbmcgJiZcbiAgICAgICFjaGFuZ2VzQ29tcGxldGVkICYmXG4gICAgICBiYXRjaGVzLmxlbmd0aCA8IGJhdGNoZXNfbGltaXRcbiAgICAgICkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2hhbmdlc1BlbmRpbmcgPSB0cnVlO1xuICAgIGZ1bmN0aW9uIGFib3J0Q2hhbmdlcygpIHtcbiAgICAgIGNoYW5nZXMuY2FuY2VsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgICAgcmV0dXJuVmFsdWUucmVtb3ZlTGlzdGVuZXIoJ2NhbmNlbCcsIGFib3J0Q2hhbmdlcyk7XG4gICAgfVxuXG4gICAgaWYgKHJldHVyblZhbHVlLl9jaGFuZ2VzKSB7IC8vIHJlbW92ZSBvbGQgY2hhbmdlcygpIGFuZCBsaXN0ZW5lcnNcbiAgICAgIHJldHVyblZhbHVlLnJlbW92ZUxpc3RlbmVyKCdjYW5jZWwnLCByZXR1cm5WYWx1ZS5fYWJvcnRDaGFuZ2VzKTtcbiAgICAgIHJldHVyblZhbHVlLl9jaGFuZ2VzLmNhbmNlbCgpO1xuICAgIH1cbiAgICByZXR1cm5WYWx1ZS5vbmNlKCdjYW5jZWwnLCBhYm9ydENoYW5nZXMpO1xuXG4gICAgdmFyIGNoYW5nZXMgPSBzcmMuY2hhbmdlcyhjaGFuZ2VzT3B0cylcbiAgICAgIC5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGNoYW5nZXMudGhlbihyZW1vdmVMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXIpO1xuICAgIGNoYW5nZXMudGhlbihvbkNoYW5nZXNDb21wbGV0ZSlcbiAgICAgIC5jYXRjaChvbkNoYW5nZXNFcnJvcik7XG5cbiAgICBpZiAob3B0cy5yZXRyeSkge1xuICAgICAgLy8gc2F2ZSBmb3IgbGF0ZXIgc28gd2UgY2FuIGNhbmNlbCBpZiBuZWNlc3NhcnlcbiAgICAgIHJldHVyblZhbHVlLl9jaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIHJldHVyblZhbHVlLl9hYm9ydENoYW5nZXMgPSBhYm9ydENoYW5nZXM7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzdGFydENoYW5nZXMoKSB7XG4gICAgaW5pdENoZWNrcG9pbnRlcigpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAocmV0dXJuVmFsdWUuY2FuY2VsbGVkKSB7XG4gICAgICAgIGNvbXBsZXRlUmVwbGljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoZWNrcG9pbnRlci5nZXRDaGVja3BvaW50KCkudGhlbihmdW5jdGlvbiAoY2hlY2twb2ludCkge1xuICAgICAgICBsYXN0X3NlcSA9IGNoZWNrcG9pbnQ7XG4gICAgICAgIGNoYW5nZXNPcHRzID0ge1xuICAgICAgICAgIHNpbmNlOiBsYXN0X3NlcSxcbiAgICAgICAgICBsaW1pdDogYmF0Y2hfc2l6ZSxcbiAgICAgICAgICBiYXRjaF9zaXplOiBiYXRjaF9zaXplLFxuICAgICAgICAgIHN0eWxlOiAnYWxsX2RvY3MnLFxuICAgICAgICAgIGRvY19pZHM6IGRvY19pZHMsXG4gICAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICAgIHJldHVybl9kb2NzOiB0cnVlIC8vIHJlcXVpcmVkIHNvIHdlIGtub3cgd2hlbiB3ZSdyZSBkb25lXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvcHRzLmZpbHRlcikge1xuICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByZXF1aXJlZCBmb3IgdGhlIGNsaWVudC1zaWRlIGZpbHRlciBpbiBvbkNoYW5nZVxuICAgICAgICAgICAgY2hhbmdlc09wdHMuaW5jbHVkZV9kb2NzID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBkZG9jIGZpbHRlclxuICAgICAgICAgICAgY2hhbmdlc09wdHMuZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgnaGVhcnRiZWF0JyBpbiBvcHRzKSB7XG4gICAgICAgICAgY2hhbmdlc09wdHMuaGVhcnRiZWF0ID0gb3B0cy5oZWFydGJlYXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd0aW1lb3V0JyBpbiBvcHRzKSB7XG4gICAgICAgICAgY2hhbmdlc09wdHMudGltZW91dCA9IG9wdHMudGltZW91dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5xdWVyeV9wYXJhbXMpIHtcbiAgICAgICAgICBjaGFuZ2VzT3B0cy5xdWVyeV9wYXJhbXMgPSBvcHRzLnF1ZXJ5X3BhcmFtcztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy52aWV3KSB7XG4gICAgICAgICAgY2hhbmdlc09wdHMudmlldyA9IG9wdHMudmlldztcbiAgICAgICAgfVxuICAgICAgICBnZXRDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBhYm9ydFJlcGxpY2F0aW9uKCdnZXRDaGVja3BvaW50IHJlamVjdGVkIHdpdGggJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGZ1bmN0aW9uIG9uQ2hlY2twb2ludEVycm9yKGVycikge1xuICAgIHdyaXRpbmdDaGVja3BvaW50ID0gZmFsc2U7XG4gICAgYWJvcnRSZXBsaWNhdGlvbignd3JpdGVDaGVja3BvaW50IGNvbXBsZXRlZCB3aXRoIGVycm9yJywgZXJyKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAocmV0dXJuVmFsdWUuY2FuY2VsbGVkKSB7IC8vIGNhbmNlbGxlZCBpbW1lZGlhdGVseVxuICAgIGNvbXBsZXRlUmVwbGljYXRpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJldHVyblZhbHVlLl9hZGRlZExpc3RlbmVycykge1xuICAgIHJldHVyblZhbHVlLm9uY2UoJ2NhbmNlbCcsIGNvbXBsZXRlUmVwbGljYXRpb24pO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm5WYWx1ZS5vbmNlKCdlcnJvcicsIG9wdHMuY29tcGxldGUpO1xuICAgICAgcmV0dXJuVmFsdWUub25jZSgnY29tcGxldGUnLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIG9wdHMuY29tcGxldGUobnVsbCwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm5WYWx1ZS5fYWRkZWRMaXN0ZW5lcnMgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzLnNpbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0YXJ0Q2hhbmdlcygpO1xuICB9IGVsc2Uge1xuICAgIGluaXRDaGVja3BvaW50ZXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRpbmdDaGVja3BvaW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybiBjaGVja3BvaW50ZXIud3JpdGVDaGVja3BvaW50KG9wdHMuc2luY2UsIHNlc3Npb24pO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGluZ0NoZWNrcG9pbnQgPSBmYWxzZTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHJldHVyblZhbHVlLmNhbmNlbGxlZCkge1xuICAgICAgICBjb21wbGV0ZVJlcGxpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxhc3Rfc2VxID0gb3B0cy5zaW5jZTtcbiAgICAgIHN0YXJ0Q2hhbmdlcygpO1xuICAgIH0pLmNhdGNoKG9uQ2hlY2twb2ludEVycm9yKTtcbiAgfVxufVxuXG4vLyBXZSBjcmVhdGUgYSBiYXNpYyBwcm9taXNlIHNvIHRoZSBjYWxsZXIgY2FuIGNhbmNlbCB0aGUgcmVwbGljYXRpb24gcG9zc2libHlcbi8vIGJlZm9yZSB3ZSBoYXZlIGFjdHVhbGx5IHN0YXJ0ZWQgbGlzdGVuaW5nIHRvIGNoYW5nZXMgZXRjXG5pbmhlcml0cyhSZXBsaWNhdGlvbiwgRUUpO1xuZnVuY3Rpb24gUmVwbGljYXRpb24oKSB7XG4gIEVFLmNhbGwodGhpcyk7XG4gIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gIHRoaXMuc3RhdGUgPSAncGVuZGluZyc7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG4gICAgc2VsZi5vbmNlKCdjb21wbGV0ZScsIGZ1bGZpbGwpO1xuICAgIHNlbGYub25jZSgnZXJyb3InLCByZWplY3QpO1xuICB9KTtcbiAgc2VsZi50aGVuID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgfTtcbiAgc2VsZi5jYXRjaCA9IGZ1bmN0aW9uIChyZWplY3QpIHtcbiAgICByZXR1cm4gcHJvbWlzZS5jYXRjaChyZWplY3QpO1xuICB9O1xuICAvLyBBcyB3ZSBhbGxvdyBlcnJvciBoYW5kbGluZyB2aWEgXCJlcnJvclwiIGV2ZW50IGFzIHdlbGwsXG4gIC8vIHB1dCBhIHN0dWIgaW4gaGVyZSBzbyB0aGF0IHJlamVjdGluZyBuZXZlciB0aHJvd3MgVW5oYW5kbGVkRXJyb3IuXG4gIHNlbGYuY2F0Y2goZnVuY3Rpb24gKCkge30pO1xufVxuXG5SZXBsaWNhdGlvbi5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhbmNlbGxlZCA9IHRydWU7XG4gIHRoaXMuc3RhdGUgPSAnY2FuY2VsbGVkJztcbiAgdGhpcy5lbWl0KCdjYW5jZWwnKTtcbn07XG5cblJlcGxpY2F0aW9uLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzcmMsIHRhcmdldCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChzZWxmLl9yZWFkeUNhbGxlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLl9yZWFkeUNhbGxlZCA9IHRydWU7XG5cbiAgZnVuY3Rpb24gb25EZXN0cm95KCkge1xuICAgIHNlbGYuY2FuY2VsKCk7XG4gIH1cbiAgc3JjLm9uY2UoJ2Rlc3Ryb3llZCcsIG9uRGVzdHJveSk7XG4gIHRhcmdldC5vbmNlKCdkZXN0cm95ZWQnLCBvbkRlc3Ryb3kpO1xuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGVzdHJveWVkJywgb25EZXN0cm95KTtcbiAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIoJ2Rlc3Ryb3llZCcsIG9uRGVzdHJveSk7XG4gIH1cbiAgc2VsZi5vbmNlKCdjb21wbGV0ZScsIGNsZWFudXApO1xufTtcblxuZnVuY3Rpb24gdG9Qb3VjaChkYiwgb3B0cykge1xuICB2YXIgUG91Y2hDb25zdHJ1Y3RvciA9IG9wdHMuUG91Y2hDb25zdHJ1Y3RvcjtcbiAgaWYgKHR5cGVvZiBkYiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IFBvdWNoQ29uc3RydWN0b3IoZGIsIG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXBsaWNhdGVXcmFwcGVyKHNyYywgdGFyZ2V0LCBvcHRzLCBjYWxsYmFjaykge1xuXG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRzID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIGlmIChvcHRzLmRvY19pZHMgJiYgIUFycmF5LmlzQXJyYXkob3B0cy5kb2NfaWRzKSkge1xuICAgIHRocm93IGNyZWF0ZUVycm9yKEJBRF9SRVFVRVNULFxuICAgICAgICAgICAgICAgICAgICAgICBcImBkb2NfaWRzYCBmaWx0ZXIgcGFyYW1ldGVyIGlzIG5vdCBhIGxpc3QuXCIpO1xuICB9XG5cbiAgb3B0cy5jb21wbGV0ZSA9IGNhbGxiYWNrO1xuICBvcHRzID0gY2xvbmUob3B0cyk7XG4gIG9wdHMuY29udGludW91cyA9IG9wdHMuY29udGludW91cyB8fCBvcHRzLmxpdmU7XG4gIG9wdHMucmV0cnkgPSAoJ3JldHJ5JyBpbiBvcHRzKSA/IG9wdHMucmV0cnkgOiBmYWxzZTtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgb3B0cy5Qb3VjaENvbnN0cnVjdG9yID0gb3B0cy5Qb3VjaENvbnN0cnVjdG9yIHx8IHRoaXM7XG4gIHZhciByZXBsaWNhdGVSZXQgPSBuZXcgUmVwbGljYXRpb24ob3B0cyk7XG4gIHZhciBzcmNQb3VjaCA9IHRvUG91Y2goc3JjLCBvcHRzKTtcbiAgdmFyIHRhcmdldFBvdWNoID0gdG9Qb3VjaCh0YXJnZXQsIG9wdHMpO1xuICByZXBsaWNhdGUoc3JjUG91Y2gsIHRhcmdldFBvdWNoLCBvcHRzLCByZXBsaWNhdGVSZXQpO1xuICByZXR1cm4gcmVwbGljYXRlUmV0O1xufVxuXG5pbmhlcml0cyhTeW5jLCBFRSk7XG5mdW5jdGlvbiBzeW5jKHNyYywgdGFyZ2V0LCBvcHRzLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRzID0ge307XG4gIH1cbiAgb3B0cyA9IGNsb25lKG9wdHMpO1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICBvcHRzLlBvdWNoQ29uc3RydWN0b3IgPSBvcHRzLlBvdWNoQ29uc3RydWN0b3IgfHwgdGhpcztcbiAgc3JjID0gdG9Qb3VjaChzcmMsIG9wdHMpO1xuICB0YXJnZXQgPSB0b1BvdWNoKHRhcmdldCwgb3B0cyk7XG4gIHJldHVybiBuZXcgU3luYyhzcmMsIHRhcmdldCwgb3B0cywgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBTeW5jKHNyYywgdGFyZ2V0LCBvcHRzLCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuY2FuY2VsZWQgPSBmYWxzZTtcblxuICB2YXIgb3B0c1B1c2ggPSBvcHRzLnB1c2ggPyAkaW5qZWN0X09iamVjdF9hc3NpZ24oe30sIG9wdHMsIG9wdHMucHVzaCkgOiBvcHRzO1xuICB2YXIgb3B0c1B1bGwgPSBvcHRzLnB1bGwgPyAkaW5qZWN0X09iamVjdF9hc3NpZ24oe30sIG9wdHMsIG9wdHMucHVsbCkgOiBvcHRzO1xuXG4gIHRoaXMucHVzaCA9IHJlcGxpY2F0ZVdyYXBwZXIoc3JjLCB0YXJnZXQsIG9wdHNQdXNoKTtcbiAgdGhpcy5wdWxsID0gcmVwbGljYXRlV3JhcHBlcih0YXJnZXQsIHNyYywgb3B0c1B1bGwpO1xuXG4gIHRoaXMucHVzaFBhdXNlZCA9IHRydWU7XG4gIHRoaXMucHVsbFBhdXNlZCA9IHRydWU7XG5cbiAgZnVuY3Rpb24gcHVsbENoYW5nZShjaGFuZ2UpIHtcbiAgICBzZWxmLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgIGRpcmVjdGlvbjogJ3B1bGwnLFxuICAgICAgY2hhbmdlOiBjaGFuZ2VcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoQ2hhbmdlKGNoYW5nZSkge1xuICAgIHNlbGYuZW1pdCgnY2hhbmdlJywge1xuICAgICAgZGlyZWN0aW9uOiAncHVzaCcsXG4gICAgICBjaGFuZ2U6IGNoYW5nZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hEZW5pZWQoZG9jKSB7XG4gICAgc2VsZi5lbWl0KCdkZW5pZWQnLCB7XG4gICAgICBkaXJlY3Rpb246ICdwdXNoJyxcbiAgICAgIGRvYzogZG9jXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gcHVsbERlbmllZChkb2MpIHtcbiAgICBzZWxmLmVtaXQoJ2RlbmllZCcsIHtcbiAgICAgIGRpcmVjdGlvbjogJ3B1bGwnLFxuICAgICAgZG9jOiBkb2NcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoUGF1c2VkKCkge1xuICAgIHNlbGYucHVzaFBhdXNlZCA9IHRydWU7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHNlbGYucHVsbFBhdXNlZCkge1xuICAgICAgc2VsZi5lbWl0KCdwYXVzZWQnKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcHVsbFBhdXNlZCgpIHtcbiAgICBzZWxmLnB1bGxQYXVzZWQgPSB0cnVlO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChzZWxmLnB1c2hQYXVzZWQpIHtcbiAgICAgIHNlbGYuZW1pdCgncGF1c2VkJyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHB1c2hBY3RpdmUoKSB7XG4gICAgc2VsZi5wdXNoUGF1c2VkID0gZmFsc2U7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHNlbGYucHVsbFBhdXNlZCkge1xuICAgICAgc2VsZi5lbWl0KCdhY3RpdmUnLCB7XG4gICAgICAgIGRpcmVjdGlvbjogJ3B1c2gnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcHVsbEFjdGl2ZSgpIHtcbiAgICBzZWxmLnB1bGxQYXVzZWQgPSBmYWxzZTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoc2VsZi5wdXNoUGF1c2VkKSB7XG4gICAgICBzZWxmLmVtaXQoJ2FjdGl2ZScsIHtcbiAgICAgICAgZGlyZWN0aW9uOiAncHVsbCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZW1vdmVkID0ge307XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQWxsKHR5cGUpIHsgLy8gdHlwZSBpcyAncHVzaCcgb3IgJ3B1bGwnXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCwgZnVuYykge1xuICAgICAgdmFyIGlzQ2hhbmdlID0gZXZlbnQgPT09ICdjaGFuZ2UnICYmXG4gICAgICAgIChmdW5jID09PSBwdWxsQ2hhbmdlIHx8IGZ1bmMgPT09IHB1c2hDaGFuZ2UpO1xuICAgICAgdmFyIGlzRGVuaWVkID0gZXZlbnQgPT09ICdkZW5pZWQnICYmXG4gICAgICAgIChmdW5jID09PSBwdWxsRGVuaWVkIHx8IGZ1bmMgPT09IHB1c2hEZW5pZWQpO1xuICAgICAgdmFyIGlzUGF1c2VkID0gZXZlbnQgPT09ICdwYXVzZWQnICYmXG4gICAgICAgIChmdW5jID09PSBwdWxsUGF1c2VkIHx8IGZ1bmMgPT09IHB1c2hQYXVzZWQpO1xuICAgICAgdmFyIGlzQWN0aXZlID0gZXZlbnQgPT09ICdhY3RpdmUnICYmXG4gICAgICAgIChmdW5jID09PSBwdWxsQWN0aXZlIHx8IGZ1bmMgPT09IHB1c2hBY3RpdmUpO1xuXG4gICAgICBpZiAoaXNDaGFuZ2UgfHwgaXNEZW5pZWQgfHwgaXNQYXVzZWQgfHwgaXNBY3RpdmUpIHtcbiAgICAgICAgaWYgKCEoZXZlbnQgaW4gcmVtb3ZlZCkpIHtcbiAgICAgICAgICByZW1vdmVkW2V2ZW50XSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZWRbZXZlbnRdW3R5cGVdID0gdHJ1ZTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlbW92ZWRbZXZlbnRdKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAvLyBib3RoIHB1c2ggYW5kIHB1bGwgaGF2ZSBhc2tlZCB0byBiZSByZW1vdmVkXG4gICAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmIChvcHRzLmxpdmUpIHtcbiAgICB0aGlzLnB1c2gub24oJ2NvbXBsZXRlJywgc2VsZi5wdWxsLmNhbmNlbC5iaW5kKHNlbGYucHVsbCkpO1xuICAgIHRoaXMucHVsbC5vbignY29tcGxldGUnLCBzZWxmLnB1c2guY2FuY2VsLmJpbmQoc2VsZi5wdXNoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRPbmVMaXN0ZW5lcihlZSwgZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgaWYgKGVlLmxpc3RlbmVycyhldmVudCkuaW5kZXhPZihsaXN0ZW5lcikgPT0gLTEpIHtcbiAgICAgIGVlLm9uKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5vbignbmV3TGlzdGVuZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBhZGRPbmVMaXN0ZW5lcihzZWxmLnB1bGwsICdjaGFuZ2UnLCBwdWxsQ2hhbmdlKTtcbiAgICAgIGFkZE9uZUxpc3RlbmVyKHNlbGYucHVzaCwgJ2NoYW5nZScsIHB1c2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09ICdkZW5pZWQnKSB7XG4gICAgICBhZGRPbmVMaXN0ZW5lcihzZWxmLnB1bGwsICdkZW5pZWQnLCBwdWxsRGVuaWVkKTtcbiAgICAgIGFkZE9uZUxpc3RlbmVyKHNlbGYucHVzaCwgJ2RlbmllZCcsIHB1c2hEZW5pZWQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09ICdhY3RpdmUnKSB7XG4gICAgICBhZGRPbmVMaXN0ZW5lcihzZWxmLnB1bGwsICdhY3RpdmUnLCBwdWxsQWN0aXZlKTtcbiAgICAgIGFkZE9uZUxpc3RlbmVyKHNlbGYucHVzaCwgJ2FjdGl2ZScsIHB1c2hBY3RpdmUpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09ICdwYXVzZWQnKSB7XG4gICAgICBhZGRPbmVMaXN0ZW5lcihzZWxmLnB1bGwsICdwYXVzZWQnLCBwdWxsUGF1c2VkKTtcbiAgICAgIGFkZE9uZUxpc3RlbmVyKHNlbGYucHVzaCwgJ3BhdXNlZCcsIHB1c2hQYXVzZWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy5vbigncmVtb3ZlTGlzdGVuZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBzZWxmLnB1bGwucmVtb3ZlTGlzdGVuZXIoJ2NoYW5nZScsIHB1bGxDaGFuZ2UpO1xuICAgICAgc2VsZi5wdXNoLnJlbW92ZUxpc3RlbmVyKCdjaGFuZ2UnLCBwdXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnZGVuaWVkJykge1xuICAgICAgc2VsZi5wdWxsLnJlbW92ZUxpc3RlbmVyKCdkZW5pZWQnLCBwdWxsRGVuaWVkKTtcbiAgICAgIHNlbGYucHVzaC5yZW1vdmVMaXN0ZW5lcignZGVuaWVkJywgcHVzaERlbmllZCk7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgIHNlbGYucHVsbC5yZW1vdmVMaXN0ZW5lcignYWN0aXZlJywgcHVsbEFjdGl2ZSk7XG4gICAgICBzZWxmLnB1c2gucmVtb3ZlTGlzdGVuZXIoJ2FjdGl2ZScsIHB1c2hBY3RpdmUpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09ICdwYXVzZWQnKSB7XG4gICAgICBzZWxmLnB1bGwucmVtb3ZlTGlzdGVuZXIoJ3BhdXNlZCcsIHB1bGxQYXVzZWQpO1xuICAgICAgc2VsZi5wdXNoLnJlbW92ZUxpc3RlbmVyKCdwYXVzZWQnLCBwdXNoUGF1c2VkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHRoaXMucHVsbC5vbigncmVtb3ZlTGlzdGVuZXInLCByZW1vdmVBbGwoJ3B1bGwnKSk7XG4gIHRoaXMucHVzaC5vbigncmVtb3ZlTGlzdGVuZXInLCByZW1vdmVBbGwoJ3B1c2gnKSk7XG5cbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLmFsbChbXG4gICAgdGhpcy5wdXNoLFxuICAgIHRoaXMucHVsbFxuICBdKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgdmFyIG91dCA9IHtcbiAgICAgIHB1c2g6IHJlc3BbMF0sXG4gICAgICBwdWxsOiByZXNwWzFdXG4gICAgfTtcbiAgICBzZWxmLmVtaXQoJ2NvbXBsZXRlJywgb3V0KTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgfVxuICAgIHNlbGYucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIG91dDtcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYuY2FuY2VsKCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAvLyBpZiB0aGVyZSdzIGEgY2FsbGJhY2ssIHRoZW4gdGhlIGNhbGxiYWNrIGNhbiByZWNlaXZlXG4gICAgICAvLyB0aGUgZXJyb3IgZXZlbnRcbiAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gY2FsbGJhY2ssIHRoZW4gd2UncmUgc2FmZSB0byBlbWl0IGFuIGVycm9yXG4gICAgICAvLyBldmVudCwgd2hpY2ggd291bGQgb3RoZXJ3aXNlIHRocm93IGFuIHVuaGFuZGxlZCBlcnJvclxuICAgICAgLy8gZHVlIHRvICdlcnJvcicgYmVpbmcgYSBzcGVjaWFsIGV2ZW50IGluIEV2ZW50RW1pdHRlcnNcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIH1cbiAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgLy8gbm8gc2Vuc2UgdGhyb3dpbmcgaWYgd2UncmUgYWxyZWFkeSBlbWl0dGluZyBhbiAnZXJyb3InIGV2ZW50XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9KTtcblxuICB0aGlzLnRoZW4gPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyKSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbihzdWNjZXNzLCBlcnIpO1xuICB9O1xuXG4gIHRoaXMuY2F0Y2ggPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgcmV0dXJuIHByb21pc2UuY2F0Y2goZXJyKTtcbiAgfTtcbn1cblxuU3luYy5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuY2FuY2VsZWQpIHtcbiAgICB0aGlzLmNhbmNlbGVkID0gdHJ1ZTtcbiAgICB0aGlzLnB1c2guY2FuY2VsKCk7XG4gICAgdGhpcy5wdWxsLmNhbmNlbCgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZXBsaWNhdGlvbihQb3VjaERCKSB7XG4gIFBvdWNoREIucmVwbGljYXRlID0gcmVwbGljYXRlV3JhcHBlcjtcbiAgUG91Y2hEQi5zeW5jID0gc3luYztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUG91Y2hEQi5wcm90b3R5cGUsICdyZXBsaWNhdGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucmVwbGljYXRlTWV0aG9kcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5yZXBsaWNhdGVNZXRob2RzID0ge1xuICAgICAgICAgIGZyb206IGZ1bmN0aW9uIChvdGhlciwgb3B0cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbnN0cnVjdG9yLnJlcGxpY2F0ZShvdGhlciwgc2VsZiwgb3B0cywgY2FsbGJhY2spO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdG86IGZ1bmN0aW9uIChvdGhlciwgb3B0cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbnN0cnVjdG9yLnJlcGxpY2F0ZShzZWxmLCBvdGhlciwgb3B0cywgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlcGxpY2F0ZU1ldGhvZHM7XG4gICAgfVxuICB9KTtcblxuICBQb3VjaERCLnByb3RvdHlwZS5zeW5jID0gZnVuY3Rpb24gKGRiTmFtZSwgb3B0cywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5zeW5jKHRoaXMsIGRiTmFtZSwgb3B0cywgY2FsbGJhY2spO1xuICB9O1xufVxuXG5Qb3VjaERCLnBsdWdpbihJREJQb3VjaClcbiAgLnBsdWdpbihIdHRwUG91Y2gkMSlcbiAgLnBsdWdpbihtYXByZWR1Y2UpXG4gIC5wbHVnaW4ocmVwbGljYXRpb24pO1xuXG4vLyBQdWxsIGZyb20gc3JjIGJlY2F1c2UgcG91Y2hkYi1ub2RlL3BvdWNoZGItYnJvd3NlciB0aGVtc2VsdmVzXG5cbmV4cG9ydCBkZWZhdWx0IFBvdWNoREI7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDsgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG5cbiAgcmV0dXJuIChidGhbYnVmW2kgKyAwXV0gKyBidGhbYnVmW2kgKyAxXV0gKyBidGhbYnVmW2kgKyAyXV0gKyBidGhbYnVmW2kgKyAzXV0gKyAnLScgKyBidGhbYnVmW2kgKyA0XV0gKyBidGhbYnVmW2kgKyA1XV0gKyAnLScgKyBidGhbYnVmW2kgKyA2XV0gKyBidGhbYnVmW2kgKyA3XV0gKyAnLScgKyBidGhbYnVmW2kgKyA4XV0gKyBidGhbYnVmW2kgKyA5XV0gKyAnLScgKyBidGhbYnVmW2kgKyAxMF1dICsgYnRoW2J1ZltpICsgMTFdXSArIGJ0aFtidWZbaSArIDEyXV0gKyBidGhbYnVmW2kgKyAxM11dICsgYnRoW2J1ZltpICsgMTRdXSArIGJ0aFtidWZbaSArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ5dGVzVG9VdWlkOyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdjEgfSBmcm9tICcuL3YxLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjMgfSBmcm9tICcuL3YzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjQgfSBmcm9tICcuL3Y0LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjUgfSBmcm9tICcuL3Y1LmpzJzsiLCIvKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KG1zZy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyArK2kpIHtcbiAgICAgIGJ5dGVzW2ldID0gbXNnLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhbiBhcnJheSBvZiBieXRlc1xuICovXG5cblxuZnVuY3Rpb24gbWQ1VG9IZXhFbmNvZGVkQXJyYXkoaW5wdXQpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcbiAgICB2YXIgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgdmFyIGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgdmFyIGEgPSAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG5cbiAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5cblxuZnVuY3Rpb24gYnl0ZXNUb1dvcmRzKGlucHV0KSB7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZDU7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4vLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IE47ICsrX2kpIHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQzMkFycmF5KDE2KTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgYXJyW2pdID0gYnl0ZXNbX2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMl0gPDwgOCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1bX2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBOOyArK19pMikge1xuICAgIHZhciBXID0gbmV3IFVpbnQzMkFycmF5KDgwKTtcblxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfdCA9IDE2OyBfdCA8IDgwOyArK190KSB7XG4gICAgICBXW190XSA9IFJPVEwoV1tfdCAtIDNdIF4gV1tfdCAtIDhdIF4gV1tfdCAtIDE0XSBeIFdbX3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIHZhciBhID0gSFswXTtcbiAgICB2YXIgYiA9IEhbMV07XG4gICAgdmFyIGMgPSBIWzJdO1xuICAgIHZhciBkID0gSFszXTtcbiAgICB2YXIgZSA9IEhbNF07XG5cbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hhMTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBieXRlc1RvVXVpZCBmcm9tICcuL2J5dGVzVG9VdWlkLmpzJzsgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcblxudmFyIF9jbG9ja3NlcTsgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG5cblxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwOyAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgdmFyIGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIHZhciB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2MTsiLCJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBtZDUgZnJvbSAnLi9tZDUuanMnO1xudmFyIHYzID0gdjM1KCd2MycsIDB4MzAsIG1kNSk7XG5leHBvcnQgZGVmYXVsdCB2MzsiLCJpbXBvcnQgYnl0ZXNUb1V1aWQgZnJvbSAnLi9ieXRlc1RvVXVpZC5qcyc7XG5cbmZ1bmN0aW9uIHV1aWRUb0J5dGVzKHV1aWQpIHtcbiAgLy8gTm90ZTogV2UgYXNzdW1lIHdlJ3JlIGJlaW5nIHBhc3NlZCBhIHZhbGlkIHV1aWQgc3RyaW5nXG4gIHZhciBieXRlcyA9IFtdO1xuICB1dWlkLnJlcGxhY2UoL1thLWZBLUYwLTldezJ9L2csIGZ1bmN0aW9uIChoZXgpIHtcbiAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleCwgMTYpKTtcbiAgfSk7XG4gIHJldHVybiBieXRlcztcbn1cblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIHZhciBieXRlcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZXM7XG59XG5cbmV4cG9ydCB2YXIgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgdmFyIFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24sIGhhc2hmdW5jKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlVVVJRCh2YWx1ZSwgbmFtZXNwYWNlLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBvZmYgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSBuYW1lc3BhY2UgPSB1dWlkVG9CeXRlcyhuYW1lc3BhY2UpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCd2YWx1ZSBtdXN0IGJlIGFuIGFycmF5IG9mIGJ5dGVzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5hbWVzcGFjZSkgfHwgbmFtZXNwYWNlLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignbmFtZXNwYWNlIG11c3QgYmUgdXVpZCBzdHJpbmcgb3IgYW4gQXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMnKTtcbiAgICB9IC8vIFBlciA0LjNcblxuXG4gICAgdmFyIGJ5dGVzID0gaGFzaGZ1bmMobmFtZXNwYWNlLmNvbmNhdCh2YWx1ZSkpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG5cbiAgICBpZiAoYnVmKSB7XG4gICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCAxNjsgKytpZHgpIHtcbiAgICAgICAgYnVmW29mZiArIGlkeF0gPSBieXRlc1tpZHhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IGJ5dGVzVG9VdWlkIGZyb20gJy4vYnl0ZXNUb1V1aWQuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgVWludDhBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW3N0YXJ0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IHNoYTEgZnJvbSAnLi9zaGExLmpzJztcbnZhciB2NSA9IHYzNSgndjUnLCAweDUwLCBzaGExKTtcbmV4cG9ydCBkZWZhdWx0IHY1OyIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKGZhY3RvcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAod2l0aCBzdXBwb3J0IGZvciB3ZWIgd29ya2VycylcbiAgICAgICAgdmFyIGdsb2I7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGdsb2IgPSB3aW5kb3c7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGdsb2IgPSBzZWxmO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYi5TcGFya01ENSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KGZ1bmN0aW9uICh1bmRlZmluZWQpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgICogRmFzdGVzdCBtZDUgaW1wbGVtZW50YXRpb24gYXJvdW5kIChKS00gbWQ1KS5cbiAgICAgKiBDcmVkaXRzOiBKb3NlcGggTXllcnNcbiAgICAgKlxuICAgICAqIEBzZWUgaHR0cDovL3d3dy5teWVyc2RhaWx5Lm9yZy9qb3NlcGgvamF2YXNjcmlwdC9tZDUtdGV4dC5odG1sXG4gICAgICogQHNlZSBodHRwOi8vanNwZXJmLmNvbS9tZDUtc2hvb3RvdXQvN1xuICAgICAqL1xuXG4gICAgLyogdGhpcyBmdW5jdGlvbiBpcyBtdWNoIGZhc3RlcixcbiAgICAgIHNvIGlmIHBvc3NpYmxlIHdlIHVzZSBpdC4gU29tZSBJRXNcbiAgICAgIGFyZSB0aGUgb25seSBvbmVzIEkga25vdyBvZiB0aGF0XG4gICAgICBuZWVkIHRoZSBpZGlvdGljIHNlY29uZCBmdW5jdGlvbixcbiAgICAgIGdlbmVyYXRlZCBieSBhbiBpZiBjbGF1c2UuICAqL1xuICAgIHZhciBhZGQzMiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSArIGIpICYgMHhGRkZGRkZGRjtcbiAgICB9LFxuICAgICAgICBoZXhfY2hyID0gWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJ107XG5cblxuICAgIGZ1bmN0aW9uIGNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIGEgPSBhZGQzMihhZGQzMihhLCBxKSwgYWRkMzIoeCwgdCkpO1xuICAgICAgICByZXR1cm4gYWRkMzIoKGEgPDwgcykgfCAoYSA+Pj4gKDMyIC0gcykpLCBiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZDVjeWNsZSh4LCBrKSB7XG4gICAgICAgIHZhciBhID0geFswXSxcbiAgICAgICAgICAgIGIgPSB4WzFdLFxuICAgICAgICAgICAgYyA9IHhbMl0sXG4gICAgICAgICAgICBkID0geFszXTtcblxuICAgICAgICBhICs9IChiICYgYyB8IH5iICYgZCkgKyBrWzBdIC0gNjgwODc2OTM2IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA3IHwgYSA+Pj4gMjUpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBiIHwgfmEgJiBjKSArIGtbMV0gLSAzODk1NjQ1ODYgfCAwO1xuICAgICAgICBkICA9IChkIDw8IDEyIHwgZCA+Pj4gMjApICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBhIHwgfmQgJiBiKSArIGtbMl0gKyA2MDYxMDU4MTkgfCAwO1xuICAgICAgICBjICA9IChjIDw8IDE3IHwgYyA+Pj4gMTUpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBkIHwgfmMgJiBhKSArIGtbM10gLSAxMDQ0NTI1MzMwIHwgMDtcbiAgICAgICAgYiAgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgfCAwO1xuICAgICAgICBhICs9IChiICYgYyB8IH5iICYgZCkgKyBrWzRdIC0gMTc2NDE4ODk3IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA3IHwgYSA+Pj4gMjUpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBiIHwgfmEgJiBjKSArIGtbNV0gKyAxMjAwMDgwNDI2IHwgMDtcbiAgICAgICAgZCAgPSAoZCA8PCAxMiB8IGQgPj4+IDIwKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYSB8IH5kICYgYikgKyBrWzZdIC0gMTQ3MzIzMTM0MSB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGQgfCB+YyAmIGEpICsga1s3XSAtIDQ1NzA1OTgzIHwgMDtcbiAgICAgICAgYiAgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgfCAwO1xuICAgICAgICBhICs9IChiICYgYyB8IH5iICYgZCkgKyBrWzhdICsgMTc3MDAzNTQxNiB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNyB8IGEgPj4+IDI1KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYiB8IH5hICYgYykgKyBrWzldIC0gMTk1ODQxNDQxNyB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgMTIgfCBkID4+PiAyMCkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCAmIGEgfCB+ZCAmIGIpICsga1sxMF0gLSA0MjA2MyB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGQgfCB+YyAmIGEpICsga1sxMV0gLSAxOTkwNDA0MTYyIHwgMDtcbiAgICAgICAgYiAgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgfCAwO1xuICAgICAgICBhICs9IChiICYgYyB8IH5iICYgZCkgKyBrWzEyXSArIDE4MDQ2MDM2ODIgfCAwO1xuICAgICAgICBhICA9IChhIDw8IDcgfCBhID4+PiAyNSkgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYSAmIGIgfCB+YSAmIGMpICsga1sxM10gLSA0MDM0MTEwMSB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgMTIgfCBkID4+PiAyMCkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCAmIGEgfCB+ZCAmIGIpICsga1sxNF0gLSAxNTAyMDAyMjkwIHwgMDtcbiAgICAgICAgYyAgPSAoYyA8PCAxNyB8IGMgPj4+IDE1KSArIGQgfCAwO1xuICAgICAgICBiICs9IChjICYgZCB8IH5jICYgYSkgKyBrWzE1XSArIDEyMzY1MzUzMjkgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIyIHwgYiA+Pj4gMTApICsgYyB8IDA7XG5cbiAgICAgICAgYSArPSAoYiAmIGQgfCBjICYgfmQpICsga1sxXSAtIDE2NTc5NjUxMCB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNSB8IGEgPj4+IDI3KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYyB8IGIgJiB+YykgKyBrWzZdIC0gMTA2OTUwMTYzMiB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgOSB8IGQgPj4+IDIzKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYiB8IGEgJiB+YikgKyBrWzExXSArIDY0MzcxNzcxMyB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTQgfCBjID4+PiAxOCkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGEgfCBkICYgfmEpICsga1swXSAtIDM3Mzg5NzMwMiB8IDA7XG4gICAgICAgIGIgID0gKGIgPDwgMjAgfCBiID4+PiAxMikgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiAmIGQgfCBjICYgfmQpICsga1s1XSAtIDcwMTU1ODY5MSB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNSB8IGEgPj4+IDI3KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYyB8IGIgJiB+YykgKyBrWzEwXSArIDM4MDE2MDgzIHwgMDtcbiAgICAgICAgZCAgPSAoZCA8PCA5IHwgZCA+Pj4gMjMpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBiIHwgYSAmIH5iKSArIGtbMTVdIC0gNjYwNDc4MzM1IHwgMDtcbiAgICAgICAgYyAgPSAoYyA8PCAxNCB8IGMgPj4+IDE4KSArIGQgfCAwO1xuICAgICAgICBiICs9IChjICYgYSB8IGQgJiB+YSkgKyBrWzRdIC0gNDA1NTM3ODQ4IHwgMDtcbiAgICAgICAgYiAgPSAoYiA8PCAyMCB8IGIgPj4+IDEyKSArIGMgfCAwO1xuICAgICAgICBhICs9IChiICYgZCB8IGMgJiB+ZCkgKyBrWzldICsgNTY4NDQ2NDM4IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBjIHwgYiAmIH5jKSArIGtbMTRdIC0gMTAxOTgwMzY5MCB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgOSB8IGQgPj4+IDIzKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYiB8IGEgJiB+YikgKyBrWzNdIC0gMTg3MzYzOTYxIHwgMDtcbiAgICAgICAgYyAgPSAoYyA8PCAxNCB8IGMgPj4+IDE4KSArIGQgfCAwO1xuICAgICAgICBiICs9IChjICYgYSB8IGQgJiB+YSkgKyBrWzhdICsgMTE2MzUzMTUwMSB8IDA7XG4gICAgICAgIGIgID0gKGIgPDwgMjAgfCBiID4+PiAxMikgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiAmIGQgfCBjICYgfmQpICsga1sxM10gLSAxNDQ0NjgxNDY3IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBjIHwgYiAmIH5jKSArIGtbMl0gLSA1MTQwMzc4NCB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgOSB8IGQgPj4+IDIzKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYiB8IGEgJiB+YikgKyBrWzddICsgMTczNTMyODQ3MyB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTQgfCBjID4+PiAxOCkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGEgfCBkICYgfmEpICsga1sxMl0gLSAxOTI2NjA3NzM0IHwgMDtcbiAgICAgICAgYiAgPSAoYiA8PCAyMCB8IGIgPj4+IDEyKSArIGMgfCAwO1xuXG4gICAgICAgIGEgKz0gKGIgXiBjIF4gZCkgKyBrWzVdIC0gMzc4NTU4IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA0IHwgYSA+Pj4gMjgpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgXiBiIF4gYykgKyBrWzhdIC0gMjAyMjU3NDQ2MyB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgMTEgfCBkID4+PiAyMSkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCBeIGEgXiBiKSArIGtbMTFdICsgMTgzOTAzMDU2MiB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbMTRdIC0gMzUzMDk1NTYgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiBeIGMgXiBkKSArIGtbMV0gLSAxNTMwOTkyMDYwIHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA0IHwgYSA+Pj4gMjgpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgXiBiIF4gYykgKyBrWzRdICsgMTI3Mjg5MzM1MyB8IDA7XG4gICAgICAgIGQgID0gKGQgPDwgMTEgfCBkID4+PiAyMSkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCBeIGEgXiBiKSArIGtbN10gLSAxNTU0OTc2MzIgfCAwO1xuICAgICAgICBjICA9IChjIDw8IDE2IHwgYyA+Pj4gMTYpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgXiBkIF4gYSkgKyBrWzEwXSAtIDEwOTQ3MzA2NDAgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiBeIGMgXiBkKSArIGtbMTNdICsgNjgxMjc5MTc0IHwgMDtcbiAgICAgICAgYSAgPSAoYSA8PCA0IHwgYSA+Pj4gMjgpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgXiBiIF4gYykgKyBrWzBdIC0gMzU4NTM3MjIyIHwgMDtcbiAgICAgICAgZCAgPSAoZCA8PCAxMSB8IGQgPj4+IDIxKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkIF4gYSBeIGIpICsga1szXSAtIDcyMjUyMTk3OSB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbNl0gKyA3NjAyOTE4OSB8IDA7XG4gICAgICAgIGIgID0gKGIgPDwgMjMgfCBiID4+PiA5KSArIGMgfCAwO1xuICAgICAgICBhICs9IChiIF4gYyBeIGQpICsga1s5XSAtIDY0MDM2NDQ4NyB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNCB8IGEgPj4+IDI4KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhIF4gYiBeIGMpICsga1sxMl0gLSA0MjE4MTU4MzUgfCAwO1xuICAgICAgICBkICA9IChkIDw8IDExIHwgZCA+Pj4gMjEpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgXiBhIF4gYikgKyBrWzE1XSArIDUzMDc0MjUyMCB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbMl0gLSA5OTUzMzg2NTEgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIHwgMDtcblxuICAgICAgICBhICs9IChjIF4gKGIgfCB+ZCkpICsga1swXSAtIDE5ODYzMDg0NCB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgfCAwO1xuICAgICAgICBkICs9IChiIF4gKGEgfCB+YykpICsga1s3XSArIDExMjY4OTE0MTUgfCAwO1xuICAgICAgICBkICA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzE0XSAtIDE0MTYzNTQ5MDUgfCAwO1xuICAgICAgICBjICA9IChjIDw8IDE1IHwgYyA+Pj4gMTcpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGQgXiAoYyB8IH5hKSkgKyBrWzVdIC0gNTc0MzQwNTUgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIxIHxiID4+PiAxMSkgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYyBeIChiIHwgfmQpKSArIGtbMTJdICsgMTcwMDQ4NTU3MSB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgfCAwO1xuICAgICAgICBkICs9IChiIF4gKGEgfCB+YykpICsga1szXSAtIDE4OTQ5ODY2MDYgfCAwO1xuICAgICAgICBkICA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzEwXSAtIDEwNTE1MjMgfCAwO1xuICAgICAgICBjICA9IChjIDw8IDE1IHwgYyA+Pj4gMTcpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGQgXiAoYyB8IH5hKSkgKyBrWzFdIC0gMjA1NDkyMjc5OSB8IDA7XG4gICAgICAgIGIgID0gKGIgPDwgMjEgfGIgPj4+IDExKSArIGMgfCAwO1xuICAgICAgICBhICs9IChjIF4gKGIgfCB+ZCkpICsga1s4XSArIDE4NzMzMTMzNTkgfCAwO1xuICAgICAgICBhICA9IChhIDw8IDYgfCBhID4+PiAyNikgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYiBeIChhIHwgfmMpKSArIGtbMTVdIC0gMzA2MTE3NDQgfCAwO1xuICAgICAgICBkICA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzZdIC0gMTU2MDE5ODM4MCB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTUgfCBjID4+PiAxNykgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoZCBeIChjIHwgfmEpKSArIGtbMTNdICsgMTMwOTE1MTY0OSB8IDA7XG4gICAgICAgIGIgID0gKGIgPDwgMjEgfGIgPj4+IDExKSArIGMgfCAwO1xuICAgICAgICBhICs9IChjIF4gKGIgfCB+ZCkpICsga1s0XSAtIDE0NTUyMzA3MCB8IDA7XG4gICAgICAgIGEgID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgfCAwO1xuICAgICAgICBkICs9IChiIF4gKGEgfCB+YykpICsga1sxMV0gLSAxMTIwMjEwMzc5IHwgMDtcbiAgICAgICAgZCAgPSAoZCA8PCAxMCB8IGQgPj4+IDIyKSArIGEgfCAwO1xuICAgICAgICBjICs9IChhIF4gKGQgfCB+YikpICsga1syXSArIDcxODc4NzI1OSB8IDA7XG4gICAgICAgIGMgID0gKGMgPDwgMTUgfCBjID4+PiAxNykgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoZCBeIChjIHwgfmEpKSArIGtbOV0gLSAzNDM0ODU1NTEgfCAwO1xuICAgICAgICBiICA9IChiIDw8IDIxIHwgYiA+Pj4gMTEpICsgYyB8IDA7XG5cbiAgICAgICAgeFswXSA9IGEgKyB4WzBdIHwgMDtcbiAgICAgICAgeFsxXSA9IGIgKyB4WzFdIHwgMDtcbiAgICAgICAgeFsyXSA9IGMgKyB4WzJdIHwgMDtcbiAgICAgICAgeFszXSA9IGQgKyB4WzNdIHwgMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZDVibGsocykge1xuICAgICAgICB2YXIgbWQ1YmxrcyA9IFtdLFxuICAgICAgICAgICAgaTsgLyogQW5keSBLaW5nIHNhaWQgZG8gaXQgdGhpcyB3YXkuICovXG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDY0OyBpICs9IDQpIHtcbiAgICAgICAgICAgIG1kNWJsa3NbaSA+PiAyXSA9IHMuY2hhckNvZGVBdChpKSArIChzLmNoYXJDb2RlQXQoaSArIDEpIDw8IDgpICsgKHMuY2hhckNvZGVBdChpICsgMikgPDwgMTYpICsgKHMuY2hhckNvZGVBdChpICsgMykgPDwgMjQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZDVibGtzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNWJsa19hcnJheShhKSB7XG4gICAgICAgIHZhciBtZDVibGtzID0gW10sXG4gICAgICAgICAgICBpOyAvKiBBbmR5IEtpbmcgc2FpZCBkbyBpdCB0aGlzIHdheS4gKi9cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7IGkgKz0gNCkge1xuICAgICAgICAgICAgbWQ1Ymxrc1tpID4+IDJdID0gYVtpXSArIChhW2kgKyAxXSA8PCA4KSArIChhW2kgKyAyXSA8PCAxNikgKyAoYVtpICsgM10gPDwgMjQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZDVibGtzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNTEocykge1xuICAgICAgICB2YXIgbiA9IHMubGVuZ3RoLFxuICAgICAgICAgICAgc3RhdGUgPSBbMTczMjU4NDE5MywgLTI3MTczMzg3OSwgLTE3MzI1ODQxOTQsIDI3MTczMzg3OF0sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgICAgdGFpbCxcbiAgICAgICAgICAgIHRtcCxcbiAgICAgICAgICAgIGxvLFxuICAgICAgICAgICAgaGk7XG5cbiAgICAgICAgZm9yIChpID0gNjQ7IGkgPD0gbjsgaSArPSA2NCkge1xuICAgICAgICAgICAgbWQ1Y3ljbGUoc3RhdGUsIG1kNWJsayhzLnN1YnN0cmluZyhpIC0gNjQsIGkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcyA9IHMuc3Vic3RyaW5nKGkgLSA2NCk7XG4gICAgICAgIGxlbmd0aCA9IHMubGVuZ3RoO1xuICAgICAgICB0YWlsID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRhaWxbaSA+PiAyXSB8PSBzLmNoYXJDb2RlQXQoaSkgPDwgKChpICUgNCkgPDwgMyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFpbFtpID4+IDJdIHw9IDB4ODAgPDwgKChpICUgNCkgPDwgMyk7XG4gICAgICAgIGlmIChpID4gNTUpIHtcbiAgICAgICAgICAgIG1kNWN5Y2xlKHN0YXRlLCB0YWlsKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGFpbFtpXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZXdhcmUgdGhhdCB0aGUgZmluYWwgbGVuZ3RoIG1pZ2h0IG5vdCBmaXQgaW4gMzIgYml0cyBzbyB3ZSB0YWtlIGNhcmUgb2YgdGhhdFxuICAgICAgICB0bXAgPSBuICogODtcbiAgICAgICAgdG1wID0gdG1wLnRvU3RyaW5nKDE2KS5tYXRjaCgvKC4qPykoLnswLDh9KSQvKTtcbiAgICAgICAgbG8gPSBwYXJzZUludCh0bXBbMl0sIDE2KTtcbiAgICAgICAgaGkgPSBwYXJzZUludCh0bXBbMV0sIDE2KSB8fCAwO1xuXG4gICAgICAgIHRhaWxbMTRdID0gbG87XG4gICAgICAgIHRhaWxbMTVdID0gaGk7XG5cbiAgICAgICAgbWQ1Y3ljbGUoc3RhdGUsIHRhaWwpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1MV9hcnJheShhKSB7XG4gICAgICAgIHZhciBuID0gYS5sZW5ndGgsXG4gICAgICAgICAgICBzdGF0ZSA9IFsxNzMyNTg0MTkzLCAtMjcxNzMzODc5LCAtMTczMjU4NDE5NCwgMjcxNzMzODc4XSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgICB0YWlsLFxuICAgICAgICAgICAgdG1wLFxuICAgICAgICAgICAgbG8sXG4gICAgICAgICAgICBoaTtcblxuICAgICAgICBmb3IgKGkgPSA2NDsgaSA8PSBuOyBpICs9IDY0KSB7XG4gICAgICAgICAgICBtZDVjeWNsZShzdGF0ZSwgbWQ1YmxrX2FycmF5KGEuc3ViYXJyYXkoaSAtIDY0LCBpKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90IHN1cmUgaWYgaXQgaXMgYSBidWcsIGhvd2V2ZXIgSUUxMCB3aWxsIGFsd2F5cyBwcm9kdWNlIGEgc3ViIGFycmF5IG9mIGxlbmd0aCAxXG4gICAgICAgIC8vIGNvbnRhaW5pbmcgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgcGFyZW50IGFycmF5IGlmIHRoZSBzdWIgYXJyYXkgc3BlY2lmaWVkIHN0YXJ0c1xuICAgICAgICAvLyBiZXlvbmQgdGhlIGxlbmd0aCBvZiB0aGUgcGFyZW50IGFycmF5IC0gd2VpcmQuXG4gICAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvNzcxNDUyL3R5cGVkLWFycmF5LXN1YmFycmF5LWlzc3VlXG4gICAgICAgIGEgPSAoaSAtIDY0KSA8IG4gPyBhLnN1YmFycmF5KGkgLSA2NCkgOiBuZXcgVWludDhBcnJheSgwKTtcblxuICAgICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgICAgdGFpbCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0YWlsW2kgPj4gMl0gfD0gYVtpXSA8PCAoKGkgJSA0KSA8PCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhaWxbaSA+PiAyXSB8PSAweDgwIDw8ICgoaSAlIDQpIDw8IDMpO1xuICAgICAgICBpZiAoaSA+IDU1KSB7XG4gICAgICAgICAgICBtZDVjeWNsZShzdGF0ZSwgdGFpbCk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRhaWxbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmV3YXJlIHRoYXQgdGhlIGZpbmFsIGxlbmd0aCBtaWdodCBub3QgZml0IGluIDMyIGJpdHMgc28gd2UgdGFrZSBjYXJlIG9mIHRoYXRcbiAgICAgICAgdG1wID0gbiAqIDg7XG4gICAgICAgIHRtcCA9IHRtcC50b1N0cmluZygxNikubWF0Y2goLyguKj8pKC57MCw4fSkkLyk7XG4gICAgICAgIGxvID0gcGFyc2VJbnQodG1wWzJdLCAxNik7XG4gICAgICAgIGhpID0gcGFyc2VJbnQodG1wWzFdLCAxNikgfHwgMDtcblxuICAgICAgICB0YWlsWzE0XSA9IGxvO1xuICAgICAgICB0YWlsWzE1XSA9IGhpO1xuXG4gICAgICAgIG1kNWN5Y2xlKHN0YXRlLCB0YWlsKTtcblxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmhleChuKSB7XG4gICAgICAgIHZhciBzID0gJycsXG4gICAgICAgICAgICBqO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgNDsgaiArPSAxKSB7XG4gICAgICAgICAgICBzICs9IGhleF9jaHJbKG4gPj4gKGogKiA4ICsgNCkpICYgMHgwRl0gKyBoZXhfY2hyWyhuID4+IChqICogOCkpICYgMHgwRl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGV4KHgpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4W2ldID0gcmhleCh4W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJbiBzb21lIGNhc2VzIHRoZSBmYXN0IGFkZDMyIGZ1bmN0aW9uIGNhbm5vdCBiZSB1c2VkLi5cbiAgICBpZiAoaGV4KG1kNTEoJ2hlbGxvJykpICE9PSAnNWQ0MTQwMmFiYzRiMmE3NmI5NzE5ZDkxMTAxN2M1OTInKSB7XG4gICAgICAgIGFkZDMyID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgICAgICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEFycmF5QnVmZmVyIHNsaWNlIHBvbHlmaWxsLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHRhdWJlcnQvbm9kZS1hcnJheWJ1ZmZlci1zbGljZVxuICAgICAqL1xuXG4gICAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgIUFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xhbXAodmFsLCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAodmFsIHwgMCkgfHwgMDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwgKyBsZW5ndGgsIDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbih2YWwsIGxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luID0gY2xhbXAoZnJvbSwgbGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBudW0sXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXksXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUFycmF5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gY2xhbXAodG8sIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJlZ2luID4gZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbnVtID0gZW5kIC0gYmVnaW47XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gbmV3IEFycmF5QnVmZmVyKG51bSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgc291cmNlQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLCBiZWdpbiwgbnVtKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcnJheS5zZXQoc291cmNlQXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXJzLlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gdG9VdGY4KHN0cikge1xuICAgICAgICBpZiAoL1tcXHUwMDgwLVxcdUZGRkZdLy50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgIHN0ciA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXRmOFN0cjJBcnJheUJ1ZmZlcihzdHIsIHJldHVyblVJbnQ4QXJyYXkpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHN0ci5sZW5ndGgsXG4gICAgICAgICAgIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoKSxcbiAgICAgICAgICAgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmZiksXG4gICAgICAgICAgIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhcnJbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5VSW50OEFycmF5ID8gYXJyIDogYnVmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcnJheUJ1ZmZlcjJVdGY4U3RyKGJ1ZmYpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoYnVmZikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmNhdGVuYXRlQXJyYXlCdWZmZXJzKGZpcnN0LCBzZWNvbmQsIHJldHVyblVJbnQ4QXJyYXkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGZpcnN0LmJ5dGVMZW5ndGggKyBzZWNvbmQuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgcmVzdWx0LnNldChuZXcgVWludDhBcnJheShmaXJzdCkpO1xuICAgICAgICByZXN1bHQuc2V0KG5ldyBVaW50OEFycmF5KHNlY29uZCksIGZpcnN0LmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5VSW50OEFycmF5ID8gcmVzdWx0IDogcmVzdWx0LmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoZXhUb0JpbmFyeVN0cmluZyhoZXgpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW10sXG4gICAgICAgICAgICBsZW5ndGggPSBoZXgubGVuZ3RoLFxuICAgICAgICAgICAgeDtcblxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgbGVuZ3RoIC0gMTsgeCArPSAyKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoeCwgMiksIDE2KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGJ5dGVzKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNwYXJrTUQ1IE9PUCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGNsYXNzIHRvIHBlcmZvcm0gYW4gaW5jcmVtZW50YWwgbWQ1LCBvdGhlcndpc2UgdXNlIHRoZVxuICAgICAqIHN0YXRpYyBtZXRob2RzIGluc3RlYWQuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBTcGFya01ENSgpIHtcbiAgICAgICAgLy8gY2FsbCByZXNldCB0byBpbml0IHRoZSBpbnN0YW5jZVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIHN0cmluZy5cbiAgICAgKiBBIGNvbnZlcnNpb24gd2lsbCBiZSBhcHBsaWVkIGlmIGFuIHV0Zjggc3RyaW5nIGlzIGRldGVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGJlIGFwcGVuZGVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTcGFya01ENX0gVGhlIGluc3RhbmNlIGl0c2VsZlxuICAgICAqL1xuICAgIFNwYXJrTUQ1LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIC8vIENvbnZlcnRzIHRoZSBzdHJpbmcgdG8gdXRmOCBieXRlcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgLy8gVGhlbiBhcHBlbmQgYXMgYmluYXJ5XG4gICAgICAgIHRoaXMuYXBwZW5kQmluYXJ5KHRvVXRmOChzdHIpKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIGJpbmFyeSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudHMgVGhlIGJpbmFyeSBzdHJpbmcgdG8gYmUgYXBwZW5kZWRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NwYXJrTUQ1fSBUaGUgaW5zdGFuY2UgaXRzZWxmXG4gICAgICovXG4gICAgU3BhcmtNRDUucHJvdG90eXBlLmFwcGVuZEJpbmFyeSA9IGZ1bmN0aW9uIChjb250ZW50cykge1xuICAgICAgICB0aGlzLl9idWZmICs9IGNvbnRlbnRzO1xuICAgICAgICB0aGlzLl9sZW5ndGggKz0gY29udGVudHMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLl9idWZmLmxlbmd0aCxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgZm9yIChpID0gNjQ7IGkgPD0gbGVuZ3RoOyBpICs9IDY0KSB7XG4gICAgICAgICAgICBtZDVjeWNsZSh0aGlzLl9oYXNoLCBtZDVibGsodGhpcy5fYnVmZi5zdWJzdHJpbmcoaSAtIDY0LCBpKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnVmZiA9IHRoaXMuX2J1ZmYuc3Vic3RyaW5nKGkgLSA2NCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmlzaGVzIHRoZSBpbmNyZW1lbnRhbCBjb21wdXRhdGlvbiwgcmVzZXRpbmcgdGhlIGludGVybmFsIHN0YXRlIGFuZFxuICAgICAqIHJldHVybmluZyB0aGUgcmVzdWx0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByYXcgVHJ1ZSB0byBnZXQgdGhlIHJhdyBzdHJpbmcsIGZhbHNlIHRvIGdldCB0aGUgaGV4IHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0XG4gICAgICovXG4gICAgU3BhcmtNRDUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgdmFyIGJ1ZmYgPSB0aGlzLl9idWZmLFxuICAgICAgICAgICAgbGVuZ3RoID0gYnVmZi5sZW5ndGgsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgdGFpbCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIHJldDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRhaWxbaSA+PiAyXSB8PSBidWZmLmNoYXJDb2RlQXQoaSkgPDwgKChpICUgNCkgPDwgMyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maW5pc2godGFpbCwgbGVuZ3RoKTtcbiAgICAgICAgcmV0ID0gaGV4KHRoaXMuX2hhc2gpO1xuXG4gICAgICAgIGlmIChyYXcpIHtcbiAgICAgICAgICAgIHJldCA9IGhleFRvQmluYXJ5U3RyaW5nKHJldCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgY29tcHV0YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTcGFya01ENX0gVGhlIGluc3RhbmNlIGl0c2VsZlxuICAgICAqL1xuICAgIFNwYXJrTUQ1LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYnVmZiA9ICcnO1xuICAgICAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9oYXNoID0gWzE3MzI1ODQxOTMsIC0yNzE3MzM4NzksIC0xNzMyNTg0MTk0LCAyNzE3MzM4NzhdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgY29tcHV0YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBzdGF0ZVxuICAgICAqL1xuICAgIFNwYXJrTUQ1LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1ZmY6IHRoaXMuX2J1ZmYsXG4gICAgICAgICAgICBsZW5ndGg6IHRoaXMuX2xlbmd0aCxcbiAgICAgICAgICAgIGhhc2g6IHRoaXMuX2hhc2guc2xpY2UoKVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgY29tcHV0YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgVGhlIHN0YXRlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTcGFya01ENX0gVGhlIGluc3RhbmNlIGl0c2VsZlxuICAgICAqL1xuICAgIFNwYXJrTUQ1LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB0aGlzLl9idWZmID0gc3RhdGUuYnVmZjtcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICB0aGlzLl9oYXNoID0gc3RhdGUuaGFzaDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgbWVtb3J5IHVzZWQgYnkgdGhlIGluY3JlbWVudGFsIGJ1ZmZlciBhbmQgb3RoZXIgYWRkaXRpb25hbFxuICAgICAqIHJlc291cmNlcy4gSWYgeW91IHBsYW4gdG8gdXNlIHRoZSBpbnN0YW5jZSBhZ2FpbiwgdXNlIHJlc2V0IGluc3RlYWQuXG4gICAgICovXG4gICAgU3BhcmtNRDUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYXNoO1xuICAgICAgICBkZWxldGUgdGhpcy5fYnVmZjtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xlbmd0aDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluaXNoIHRoZSBmaW5hbCBjYWxjdWxhdGlvbiBiYXNlZCBvbiB0aGUgdGFpbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9ICB0YWlsICAgVGhlIHRhaWwgKHdpbGwgYmUgbW9kaWZpZWQpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgbGVuZ3RoIG9mIHRoZSByZW1haW5pbmcgYnVmZmVyXG4gICAgICovXG4gICAgU3BhcmtNRDUucHJvdG90eXBlLl9maW5pc2ggPSBmdW5jdGlvbiAodGFpbCwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBpID0gbGVuZ3RoLFxuICAgICAgICAgICAgdG1wLFxuICAgICAgICAgICAgbG8sXG4gICAgICAgICAgICBoaTtcblxuICAgICAgICB0YWlsW2kgPj4gMl0gfD0gMHg4MCA8PCAoKGkgJSA0KSA8PCAzKTtcbiAgICAgICAgaWYgKGkgPiA1NSkge1xuICAgICAgICAgICAgbWQ1Y3ljbGUodGhpcy5faGFzaCwgdGFpbCk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHRhaWxbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gdGhlIGZpbmFsIGNvbXB1dGF0aW9uIGJhc2VkIG9uIHRoZSB0YWlsIGFuZCBsZW5ndGhcbiAgICAgICAgLy8gQmV3YXJlIHRoYXQgdGhlIGZpbmFsIGxlbmd0aCBtYXkgbm90IGZpdCBpbiAzMiBiaXRzIHNvIHdlIHRha2UgY2FyZSBvZiB0aGF0XG4gICAgICAgIHRtcCA9IHRoaXMuX2xlbmd0aCAqIDg7XG4gICAgICAgIHRtcCA9IHRtcC50b1N0cmluZygxNikubWF0Y2goLyguKj8pKC57MCw4fSkkLyk7XG4gICAgICAgIGxvID0gcGFyc2VJbnQodG1wWzJdLCAxNik7XG4gICAgICAgIGhpID0gcGFyc2VJbnQodG1wWzFdLCAxNikgfHwgMDtcblxuICAgICAgICB0YWlsWzE0XSA9IGxvO1xuICAgICAgICB0YWlsWzE1XSA9IGhpO1xuICAgICAgICBtZDVjeWNsZSh0aGlzLl9oYXNoLCB0YWlsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIG1kNSBoYXNoIG9uIGEgc3RyaW5nLlxuICAgICAqIEEgY29udmVyc2lvbiB3aWxsIGJlIGFwcGxpZWQgaWYgdXRmOCBzdHJpbmcgaXMgZGV0ZWN0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIHN0ciBUaGUgc3RyaW5nXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcmF3XSBUcnVlIHRvIGdldCB0aGUgcmF3IHN0cmluZywgZmFsc2UgdG8gZ2V0IHRoZSBoZXggc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBTcGFya01ENS5oYXNoID0gZnVuY3Rpb24gKHN0ciwgcmF3KSB7XG4gICAgICAgIC8vIENvbnZlcnRzIHRoZSBzdHJpbmcgdG8gdXRmOCBieXRlcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgLy8gVGhlbiBjb21wdXRlIGl0IHVzaW5nIHRoZSBiaW5hcnkgZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIFNwYXJrTUQ1Lmhhc2hCaW5hcnkodG9VdGY4KHN0ciksIHJhdyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBtZDUgaGFzaCBvbiBhIGJpbmFyeSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGNvbnRlbnQgVGhlIGJpbmFyeSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyYXddICAgICBUcnVlIHRvIGdldCB0aGUgcmF3IHN0cmluZywgZmFsc2UgdG8gZ2V0IHRoZSBoZXggc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBTcGFya01ENS5oYXNoQmluYXJ5ID0gZnVuY3Rpb24gKGNvbnRlbnQsIHJhdykge1xuICAgICAgICB2YXIgaGFzaCA9IG1kNTEoY29udGVudCksXG4gICAgICAgICAgICByZXQgPSBoZXgoaGFzaCk7XG5cbiAgICAgICAgcmV0dXJuIHJhdyA/IGhleFRvQmluYXJ5U3RyaW5nKHJldCkgOiByZXQ7XG4gICAgfTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU3BhcmtNRDUgT09QIGltcGxlbWVudGF0aW9uIGZvciBhcnJheSBidWZmZXJzLlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgY2xhc3MgdG8gcGVyZm9ybSBhbiBpbmNyZW1lbnRhbCBtZDUgT05MWSBmb3IgYXJyYXkgYnVmZmVycy5cbiAgICAgKi9cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY2FsbCByZXNldCB0byBpbml0IHRoZSBpbnN0YW5jZVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYW4gYXJyYXkgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyIFRoZSBhcnJheSB0byBiZSBhcHBlbmRlZFxuICAgICAqXG4gICAgICogQHJldHVybiB7U3BhcmtNRDUuQXJyYXlCdWZmZXJ9IFRoZSBpbnN0YW5jZSBpdHNlbGZcbiAgICAgKi9cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICB2YXIgYnVmZiA9IGNvbmNhdGVuYXRlQXJyYXlCdWZmZXJzKHRoaXMuX2J1ZmYuYnVmZmVyLCBhcnIsIHRydWUpLFxuICAgICAgICAgICAgbGVuZ3RoID0gYnVmZi5sZW5ndGgsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSBhcnIuYnl0ZUxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSA2NDsgaSA8PSBsZW5ndGg7IGkgKz0gNjQpIHtcbiAgICAgICAgICAgIG1kNWN5Y2xlKHRoaXMuX2hhc2gsIG1kNWJsa19hcnJheShidWZmLnN1YmFycmF5KGkgLSA2NCwgaSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2J1ZmYgPSAoaSAtIDY0KSA8IGxlbmd0aCA/IG5ldyBVaW50OEFycmF5KGJ1ZmYuYnVmZmVyLnNsaWNlKGkgLSA2NCkpIDogbmV3IFVpbnQ4QXJyYXkoMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmlzaGVzIHRoZSBpbmNyZW1lbnRhbCBjb21wdXRhdGlvbiwgcmVzZXRpbmcgdGhlIGludGVybmFsIHN0YXRlIGFuZFxuICAgICAqIHJldHVybmluZyB0aGUgcmVzdWx0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByYXcgVHJ1ZSB0byBnZXQgdGhlIHJhdyBzdHJpbmcsIGZhbHNlIHRvIGdldCB0aGUgaGV4IHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0XG4gICAgICovXG4gICAgU3BhcmtNRDUuQXJyYXlCdWZmZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgdmFyIGJ1ZmYgPSB0aGlzLl9idWZmLFxuICAgICAgICAgICAgbGVuZ3RoID0gYnVmZi5sZW5ndGgsXG4gICAgICAgICAgICB0YWlsID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHJldDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRhaWxbaSA+PiAyXSB8PSBidWZmW2ldIDw8ICgoaSAlIDQpIDw8IDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmluaXNoKHRhaWwsIGxlbmd0aCk7XG4gICAgICAgIHJldCA9IGhleCh0aGlzLl9oYXNoKTtcblxuICAgICAgICBpZiAocmF3KSB7XG4gICAgICAgICAgICByZXQgPSBoZXhUb0JpbmFyeVN0cmluZyhyZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGNvbXB1dGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U3BhcmtNRDUuQXJyYXlCdWZmZXJ9IFRoZSBpbnN0YW5jZSBpdHNlbGZcbiAgICAgKi9cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2J1ZmYgPSBuZXcgVWludDhBcnJheSgwKTtcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faGFzaCA9IFsxNzMyNTg0MTkzLCAtMjcxNzMzODc5LCAtMTczMjU4NDE5NCwgMjcxNzMzODc4XTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGNvbXB1dGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgc3RhdGVcbiAgICAgKi9cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlci5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFNwYXJrTUQ1LnByb3RvdHlwZS5nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuXG4gICAgICAgIC8vIENvbnZlcnQgYnVmZmVyIHRvIGEgc3RyaW5nXG4gICAgICAgIHN0YXRlLmJ1ZmYgPSBhcnJheUJ1ZmZlcjJVdGY4U3RyKHN0YXRlLmJ1ZmYpO1xuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGNvbXB1dGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIFRoZSBzdGF0ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U3BhcmtNRDUuQXJyYXlCdWZmZXJ9IFRoZSBpbnN0YW5jZSBpdHNlbGZcbiAgICAgKi9cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gYnVmZmVyXG4gICAgICAgIHN0YXRlLmJ1ZmYgPSB1dGY4U3RyMkFycmF5QnVmZmVyKHN0YXRlLmJ1ZmYsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBTcGFya01ENS5wcm90b3R5cGUuc2V0U3RhdGUuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfTtcblxuICAgIFNwYXJrTUQ1LkFycmF5QnVmZmVyLnByb3RvdHlwZS5kZXN0cm95ID0gU3BhcmtNRDUucHJvdG90eXBlLmRlc3Ryb3k7XG5cbiAgICBTcGFya01ENS5BcnJheUJ1ZmZlci5wcm90b3R5cGUuX2ZpbmlzaCA9IFNwYXJrTUQ1LnByb3RvdHlwZS5fZmluaXNoO1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIG1kNSBoYXNoIG9uIGFuIGFycmF5IGJ1ZmZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFyciBUaGUgYXJyYXkgYnVmZmVyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgICAgW3Jhd10gVHJ1ZSB0byBnZXQgdGhlIHJhdyBzdHJpbmcsIGZhbHNlIHRvIGdldCB0aGUgaGV4IG9uZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0XG4gICAgICovXG4gICAgU3BhcmtNRDUuQXJyYXlCdWZmZXIuaGFzaCA9IGZ1bmN0aW9uIChhcnIsIHJhdykge1xuICAgICAgICB2YXIgaGFzaCA9IG1kNTFfYXJyYXkobmV3IFVpbnQ4QXJyYXkoYXJyKSksXG4gICAgICAgICAgICByZXQgPSBoZXgoaGFzaCk7XG5cbiAgICAgICAgcmV0dXJuIHJhdyA/IGhleFRvQmluYXJ5U3RyaW5nKHJldCkgOiByZXQ7XG4gICAgfTtcblxuICAgIHJldHVybiBTcGFya01ENTtcbn0pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTdHJpbmdpZnkvcGFyc2UgZnVuY3Rpb25zIHRoYXQgZG9uJ3Qgb3BlcmF0ZVxuICogcmVjdXJzaXZlbHksIHNvIHRoZXkgYXZvaWQgY2FsbCBzdGFjayBleGNlZWRlZFxuICogZXJyb3JzLlxuICovXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpbnB1dCkge1xuICB2YXIgcXVldWUgPSBbXTtcbiAgcXVldWUucHVzaCh7b2JqOiBpbnB1dH0pO1xuXG4gIHZhciByZXMgPSAnJztcbiAgdmFyIG5leHQsIG9iaiwgcHJlZml4LCB2YWwsIGksIGFycmF5UHJlZml4LCBrZXlzLCBrLCBrZXksIHZhbHVlLCBvYmpQcmVmaXg7XG4gIHdoaWxlICgobmV4dCA9IHF1ZXVlLnBvcCgpKSkge1xuICAgIG9iaiA9IG5leHQub2JqO1xuICAgIHByZWZpeCA9IG5leHQucHJlZml4IHx8ICcnO1xuICAgIHZhbCA9IG5leHQudmFsIHx8ICcnO1xuICAgIHJlcyArPSBwcmVmaXg7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmVzICs9IHZhbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICByZXMgKz0gdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgcmVzICs9ICdudWxsJztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcXVldWUucHVzaCh7dmFsOiAnXSd9KTtcbiAgICAgIGZvciAoaSA9IG9iai5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhcnJheVByZWZpeCA9IGkgPT09IDAgPyAnJyA6ICcsJztcbiAgICAgICAgcXVldWUucHVzaCh7b2JqOiBvYmpbaV0sIHByZWZpeDogYXJyYXlQcmVmaXh9KTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlLnB1c2goe3ZhbDogJ1snfSk7XG4gICAgfSBlbHNlIHsgLy8gb2JqZWN0XG4gICAgICBrZXlzID0gW107XG4gICAgICBmb3IgKGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICBrZXlzLnB1c2goayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHF1ZXVlLnB1c2goe3ZhbDogJ30nfSk7XG4gICAgICBmb3IgKGkgPSBrZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIG9ialByZWZpeCA9IChpID4gMCA/ICcsJyA6ICcnKTtcbiAgICAgICAgb2JqUHJlZml4ICs9IEpTT04uc3RyaW5naWZ5KGtleSkgKyAnOic7XG4gICAgICAgIHF1ZXVlLnB1c2goe29iajogdmFsdWUsIHByZWZpeDogb2JqUHJlZml4fSk7XG4gICAgICB9XG4gICAgICBxdWV1ZS5wdXNoKHt2YWw6ICd7J30pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuLy8gQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIHRoZSBwYXJzZSBmdW5jdGlvbi5cbi8vIFRoaXMgcG9wIGZ1bmN0aW9uIGlzIGJhc2ljYWxseSBjb3BpZWQgZnJvbVxuLy8gcG91Y2hDb2xsYXRlLnBhcnNlSW5kZXhhYmxlU3RyaW5nXG5mdW5jdGlvbiBwb3Aob2JqLCBzdGFjaywgbWV0YVN0YWNrKSB7XG4gIHZhciBsYXN0TWV0YUVsZW1lbnQgPSBtZXRhU3RhY2tbbWV0YVN0YWNrLmxlbmd0aCAtIDFdO1xuICBpZiAob2JqID09PSBsYXN0TWV0YUVsZW1lbnQuZWxlbWVudCkge1xuICAgIC8vIHBvcHBpbmcgYSBtZXRhLWVsZW1lbnQsIGUuZy4gYW4gb2JqZWN0IHdob3NlIHZhbHVlIGlzIGFub3RoZXIgb2JqZWN0XG4gICAgbWV0YVN0YWNrLnBvcCgpO1xuICAgIGxhc3RNZXRhRWxlbWVudCA9IG1ldGFTdGFja1ttZXRhU3RhY2subGVuZ3RoIC0gMV07XG4gIH1cbiAgdmFyIGVsZW1lbnQgPSBsYXN0TWV0YUVsZW1lbnQuZWxlbWVudDtcbiAgdmFyIGxhc3RFbGVtZW50SW5kZXggPSBsYXN0TWV0YUVsZW1lbnQuaW5kZXg7XG4gIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgZWxlbWVudC5wdXNoKG9iaik7XG4gIH0gZWxzZSBpZiAobGFzdEVsZW1lbnRJbmRleCA9PT0gc3RhY2subGVuZ3RoIC0gMikgeyAvLyBvYmogd2l0aCBrZXkrdmFsdWVcbiAgICB2YXIga2V5ID0gc3RhY2sucG9wKCk7XG4gICAgZWxlbWVudFtrZXldID0gb2JqO1xuICB9IGVsc2Uge1xuICAgIHN0YWNrLnB1c2gob2JqKTsgLy8gb2JqIHdpdGgga2V5IG9ubHlcbiAgfVxufVxuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgc3RhY2sgPSBbXTtcbiAgdmFyIG1ldGFTdGFjayA9IFtdOyAvLyBzdGFjayBmb3IgYXJyYXlzIGFuZCBvYmplY3RzXG4gIHZhciBpID0gMDtcbiAgdmFyIGNvbGxhdGlvbkluZGV4LHBhcnNlZE51bSxudW1DaGFyO1xuICB2YXIgcGFyc2VkU3RyaW5nLGxhc3RDaCxudW1Db25zZWN1dGl2ZVNsYXNoZXMsY2g7XG4gIHZhciBhcnJheUVsZW1lbnQsIG9iakVsZW1lbnQ7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29sbGF0aW9uSW5kZXggPSBzdHJbaSsrXTtcbiAgICBpZiAoY29sbGF0aW9uSW5kZXggPT09ICd9JyB8fFxuICAgICAgICBjb2xsYXRpb25JbmRleCA9PT0gJ10nIHx8XG4gICAgICAgIHR5cGVvZiBjb2xsYXRpb25JbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChzdGFjay5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9wKHN0YWNrLnBvcCgpLCBzdGFjaywgbWV0YVN0YWNrKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAoY29sbGF0aW9uSW5kZXgpIHtcbiAgICAgIGNhc2UgJyAnOlxuICAgICAgY2FzZSAnXFx0JzpcbiAgICAgIGNhc2UgJ1xcbic6XG4gICAgICBjYXNlICc6JzpcbiAgICAgIGNhc2UgJywnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ24nOlxuICAgICAgICBpICs9IDM7IC8vICd1bGwnXG4gICAgICAgIHBvcChudWxsLCBzdGFjaywgbWV0YVN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0JzpcbiAgICAgICAgaSArPSAzOyAvLyAncnVlJ1xuICAgICAgICBwb3AodHJ1ZSwgc3RhY2ssIG1ldGFTdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZic6XG4gICAgICAgIGkgKz0gNDsgLy8gJ2Fsc2UnXG4gICAgICAgIHBvcChmYWxzZSwgc3RhY2ssIG1ldGFTdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMCc6XG4gICAgICBjYXNlICcxJzpcbiAgICAgIGNhc2UgJzInOlxuICAgICAgY2FzZSAnMyc6XG4gICAgICBjYXNlICc0JzpcbiAgICAgIGNhc2UgJzUnOlxuICAgICAgY2FzZSAnNic6XG4gICAgICBjYXNlICc3JzpcbiAgICAgIGNhc2UgJzgnOlxuICAgICAgY2FzZSAnOSc6XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgcGFyc2VkTnVtID0gJyc7XG4gICAgICAgIGktLTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBudW1DaGFyID0gc3RyW2krK107XG4gICAgICAgICAgaWYgKC9bXFxkXFwuXFwtZVxcK10vLnRlc3QobnVtQ2hhcikpIHtcbiAgICAgICAgICAgIHBhcnNlZE51bSArPSBudW1DaGFyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9wKHBhcnNlRmxvYXQocGFyc2VkTnVtKSwgc3RhY2ssIG1ldGFTdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnXCInOlxuICAgICAgICBwYXJzZWRTdHJpbmcgPSAnJztcbiAgICAgICAgbGFzdENoID0gdm9pZCAwO1xuICAgICAgICBudW1Db25zZWN1dGl2ZVNsYXNoZXMgPSAwO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGNoID0gc3RyW2krK107XG4gICAgICAgICAgaWYgKGNoICE9PSAnXCInIHx8IChsYXN0Q2ggPT09ICdcXFxcJyAmJlxuICAgICAgICAgICAgICBudW1Db25zZWN1dGl2ZVNsYXNoZXMgJSAyID09PSAxKSkge1xuICAgICAgICAgICAgcGFyc2VkU3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbGFzdENoID0gY2g7XG4gICAgICAgICAgICBpZiAobGFzdENoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgbnVtQ29uc2VjdXRpdmVTbGFzaGVzKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBudW1Db25zZWN1dGl2ZVNsYXNoZXMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9wKEpTT04ucGFyc2UoJ1wiJyArIHBhcnNlZFN0cmluZyArICdcIicpLCBzdGFjaywgbWV0YVN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdbJzpcbiAgICAgICAgYXJyYXlFbGVtZW50ID0geyBlbGVtZW50OiBbXSwgaW5kZXg6IHN0YWNrLmxlbmd0aCB9O1xuICAgICAgICBzdGFjay5wdXNoKGFycmF5RWxlbWVudC5lbGVtZW50KTtcbiAgICAgICAgbWV0YVN0YWNrLnB1c2goYXJyYXlFbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd7JzpcbiAgICAgICAgb2JqRWxlbWVudCA9IHsgZWxlbWVudDoge30sIGluZGV4OiBzdGFjay5sZW5ndGggfTtcbiAgICAgICAgc3RhY2sucHVzaChvYmpFbGVtZW50LmVsZW1lbnQpO1xuICAgICAgICBtZXRhU3RhY2sucHVzaChvYmpFbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ3VuZXhwZWN0ZWRseSByZWFjaGVkIGVuZCBvZiBpbnB1dDogJyArIGNvbGxhdGlvbkluZGV4KTtcbiAgICB9XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9