(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["development"],{

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

/***/ "./src/components/Mascot.svelte":
/*!**************************************!*\
  !*** ./src/components/Mascot.svelte ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src/components/Mascot.svelte generated by Svelte v3.25.0 */


const file = "src/components/Mascot.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-1ceej21-style";
	style.textContent = ".glow.svelte-1ceej21{filter:drop-shadow(0 0 2em #ffffff1c)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFzY290LnN2ZWx0ZSIsInNvdXJjZXMiOlsiTWFzY290LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBleHBvcnQgbGV0IHNoYWRvdyA9IHRydWVcbiAgZXhwb3J0IGxldCBnbG93ID0gZmFsc2VcbiAgbGV0IGltYWdlVVJMID1cbiAgICBzaGFkb3cgPT09IHRydWVcbiAgICAgID8gXCJpbWFnZXMvbWFzY290LWpldHBhY2suc3ZnXCJcbiAgICAgIDogXCJpbWFnZXMvbWFzY290LWpldHBhY2stbm9zaGFkb3cuc3ZnXCJcbjwvc2NyaXB0PlxuXG48aW1nIGRhdGEtdGVzdD1cIm1hc2NvdC1qZXRwYWNrXCIgc3JjPVwie2ltYWdlVVJMfVwiIGFsdD1cIlwiIGNsYXNzOmdsb3cgLz5cblxuPHN0eWxlPi5nbG93IHtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMmVtICNmZmZmZmYxYyk7IH1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV08sS0FBSyxlQUFDLENBQUMsQUFDWixNQUFNLENBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQUFBRSxDQUFDIn0= */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function create_fragment(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "IMG", {
				"data-test": true,
				src: true,
				alt: true,
				class: true
			});

			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "data-test", "mascot-jetpack");
			if (img.src !== (img_src_value = /*imageURL*/ ctx[1])) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "svelte-1ceej21");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(img, "glow", /*glow*/ ctx[0]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 9, 0, 191);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*glow*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(img, "glow", /*glow*/ ctx[0]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Mascot", slots, []);
	let { shadow = true } = $$props;
	let { glow = false } = $$props;

	let imageURL = shadow === true
	? "images/mascot-jetpack.svg"
	: "images/mascot-jetpack-noshadow.svg";

	const writable_props = ["shadow", "glow"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Mascot> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("shadow" in $$props) $$invalidate(2, shadow = $$props.shadow);
		if ("glow" in $$props) $$invalidate(0, glow = $$props.glow);
	};

	$$self.$capture_state = () => ({ shadow, glow, imageURL });

	$$self.$inject_state = $$props => {
		if ("shadow" in $$props) $$invalidate(2, shadow = $$props.shadow);
		if ("glow" in $$props) $$invalidate(0, glow = $$props.glow);
		if ("imageURL" in $$props) $$invalidate(1, imageURL = $$props.imageURL);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [glow, imageURL, shadow];
}

class Mascot extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1ceej21-style")) add_css();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { shadow: 2, glow: 0 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Mascot",
			options,
			id: create_fragment.name
		});
	}

	get shadow() {
		throw new Error("<Mascot>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shadow(value) {
		throw new Error("<Mascot>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get glow() {
		throw new Error("<Mascot>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set glow(value) {
		throw new Error("<Mascot>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Mascot);

/***/ }),

/***/ "./src/components/TwitterButton.svelte":
/*!*********************************************!*\
  !*** ./src/components/TwitterButton.svelte ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var lluis_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lluis/Button */ "../lluis/Button.svelte");
/* harmony import */ var lluis_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lluis/Icon */ "../lluis/Icon.svelte");
/* src/components/TwitterButton.svelte generated by Svelte v3.25.0 */




const file = "src/components/TwitterButton.svelte";

// (6:0) <Button   color="#55acee"   textColor="white"   target="_blank"   href="https://twitter.com/intent/tweet?hashtags=LibreLingo%2Copensource&url=https%3A%2F%2Flibrelingo.app&text=LibreLingo%20-%20an%20experiment%20to%20create%20a%20community-owned%20language%20learning%20tool%0A">
function create_default_slot(ctx) {
	let icon;
	let t0;
	let div;
	let t1;
	let current;

	icon = new lluis_Icon__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { icon: "twitter", prefix: "fab" },
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Tweet about LibreLingo");
			this.h();
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(icon.$$.fragment, nodes);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", {});
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(div_nodes, "Tweet about LibreLingo");
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 11, 2, 408);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t1);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(6:0) <Button   color=\\\"#55acee\\\"   textColor=\\\"white\\\"   target=\\\"_blank\\\"   href=\\\"https://twitter.com/intent/tweet?hashtags=LibreLingo%2Copensource&url=https%3A%2F%2Flibrelingo.app&text=LibreLingo%20-%20an%20experiment%20to%20create%20a%20community-owned%20language%20learning%20tool%0A\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let button;
	let current;

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				color: "#55acee",
				textColor: "white",
				target: "_blank",
				href: "https://twitter.com/intent/tweet?hashtags=LibreLingo%2Copensource&url=https%3A%2F%2Flibrelingo.app&text=LibreLingo%20-%20an%20experiment%20to%20create%20a%20community-owned%20language%20learning%20tool%0A",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const button_changes = {};

			if (dirty & /*$$scope*/ 1) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("TwitterButton", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TwitterButton> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Button: lluis_Button__WEBPACK_IMPORTED_MODULE_1__["default"], Icon: lluis_Icon__WEBPACK_IMPORTED_MODULE_2__["default"] });
	return [];
}

class TwitterButton extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "TwitterButton",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (TwitterButton);

/***/ }),

/***/ "./src/routes/development.svelte":
/*!***************************************!*\
  !*** ./src/routes/development.svelte ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NavBar */ "./src/components/NavBar.svelte");
/* harmony import */ var _components_Mascot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Mascot */ "./src/components/Mascot.svelte");
/* harmony import */ var _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TwitterButton */ "./src/components/TwitterButton.svelte");
/* harmony import */ var _components_GitHubButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/GitHubButton */ "./src/components/GitHubButton.svelte");
/* harmony import */ var lluis_Column__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lluis/Column */ "../lluis/Column.svelte");
/* harmony import */ var lluis_Columns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lluis/Columns */ "../lluis/Columns.svelte");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var lodash_shuffle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash.shuffle */ "../../node_modules/lodash.shuffle/index.js");
/* harmony import */ var lodash_shuffle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_shuffle__WEBPACK_IMPORTED_MODULE_8__);
/* src/routes/development.svelte generated by Svelte v3.25.0 */










const file = "src/routes/development.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-18jyvrv-style";
	style.textContent = "@keyframes svelte-18jyvrv-spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.card.svelte-18jyvrv.svelte-18jyvrv{background:white}.tag.svelte-18jyvrv.svelte-18jyvrv{color:white;text-shadow:1px 1px 0 #0a0a0a}.title.svelte-18jyvrv img.svelte-18jyvrv{height:3em}.project-introduction.svelte-18jyvrv.svelte-18jyvrv{margin-bottom:4em}h2.svelte-18jyvrv.svelte-18jyvrv{margin-bottom:1em}h3.svelte-18jyvrv.svelte-18jyvrv{margin-bottom:1em}.screenshot.svelte-18jyvrv.svelte-18jyvrv{box-shadow:0 0 2em #ffffff42}.is-centered-both-ways.svelte-18jyvrv.svelte-18jyvrv{display:flex;align-items:center;justify-content:center;height:100%}.development-progress.svelte-18jyvrv.svelte-18jyvrv{margin-top:4em;margin-bottom:4em}.hero.svelte-18jyvrv.svelte-18jyvrv{padding-bottom:5em;min-height:100vh}.hero.svelte-18jyvrv .link.svelte-18jyvrv{color:white;text-decoration:underline;text-decoration-style:dotted}@media screen and (max-width: 768px){.mascot.svelte-18jyvrv.svelte-18jyvrv{width:45%;margin:auto}.columns.svelte-18jyvrv.svelte-18jyvrv{margin-bottom:6em}}@media screen and (min-width: 769px){.buttons-bottom.svelte-18jyvrv.svelte-18jyvrv{margin-top:6em}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2ZWxvcG1lbnQuc3ZlbHRlIiwic291cmNlcyI6WyJkZXZlbG9wbWVudC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IE5hdkJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9OYXZCYXJcIlxuICBpbXBvcnQgTWFzY290IGZyb20gXCIuLi9jb21wb25lbnRzL01hc2NvdFwiXG4gIGltcG9ydCBUd2l0dGVyQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnRzL1R3aXR0ZXJCdXR0b25cIlxuICBpbXBvcnQgR2l0SHViQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnRzL0dpdEh1YkJ1dHRvblwiXG4gIGltcG9ydCBDb2x1bW4gZnJvbSBcImxsdWlzL0NvbHVtblwiXG4gIGltcG9ydCBDb2x1bW5zIGZyb20gXCJsbHVpcy9Db2x1bW5zXCJcbiAgaW1wb3J0IHsgXyB9IGZyb20gXCJzdmVsdGUtaTE4blwiXG5cbiAgaW1wb3J0IHNodWZmbGUgZnJvbSBcImxvZGFzaC5zaHVmZmxlXCJcblxuICBjb25zdCBBUElfVVJMID1cbiAgICBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3Mva2FudG9yZC9MaWJyZUxpbmdvL2lzc3Vlcz9wZXJfcGFnZT0xMDBcIlxuICBsZXQgaXNzdWVzID0gbnVsbFxuXG4gIGlmIChwcm9jZXNzLmJyb3dzZXIgPT09IHRydWUpIHtcbiAgICBmZXRjaChBUElfVVJMKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaXNzdWVzID0gc2h1ZmZsZShyZXMpXG4gICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICh7IHN0YXRlLCBwdWxsX3JlcXVlc3QsIGxhYmVscyB9KSA9PlxuICAgICAgICAgICAgICBzdGF0ZSA9PT0gXCJvcGVuXCIgJiYgIXB1bGxfcmVxdWVzdCAmJiBsYWJlbHMubGVuZ3RoICE9PSAwXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zbGljZSgwLCAxMClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4gKGlzc3VlcyA9IFtdKSlcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPkxpYnJlTGluZ28gLSBEZXZlbG9wbWVudDwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG57I2lmIGlzc3VlcyA9PT0gbnVsbH1cbiAgPGRpdiBjbGFzcz1cInBhZ2Vsb2FkZXIgaXMtYWN0aXZlXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPkxpYnJlTGluZ288L3NwYW4+XG4gIDwvZGl2Plxuey9pZn1cblxuPHNlY3Rpb24gY2xhc3M9XCJoZXJvIGlzLXByaW1hcnlcIj5cbiAgPGRpdiBjbGFzcz1cImhlcm8taGVhZFwiPlxuICAgIDxOYXZCYXIgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBwcm9qZWN0LWludHJvZHVjdGlvblwiPlxuICAgICAgICA8Q29sdW1uIHNpemU9XCIxLzNcIj5cbiAgICAgICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvbG9nby5zdmdcIiBhbHQ9XCJMaWJyZUxpbmdvXCIgLz5cbiAgICAgICAgICA8L2gxPlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgICAgPENvbHVtbj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJzdWJ0aXRsZVwiPnskXygnaW5kZXguc3VidGl0bGUnKX08L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zXCI+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLWludmVydGVkIGlzLW91dGxpbmVkXCJcbiAgICAgICAgICAgICAgaHJlZj1cImNvdXJzZS9zcGFuaXNoLWZyb20tZW5nbGlzaFwiPlxuICAgICAgICAgICAgICB7JF8oJ2luZGV4LnN0YXJ0X3NwYW5pc2hfY291cnNlJyl9XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLWludmVydGVkIGlzLW91dGxpbmVkIGlzLWhpZGRlblwiXG4gICAgICAgICAgICAgIGhyZWY9XCJjb3Vyc2UvZ2VybWFuLWZyb20tZW5nbGlzaFwiPlxuICAgICAgICAgICAgICB7JF8oJ2luZGV4LnN0YXJ0X2dlcm1hbl9jb3Vyc2UnKX1cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGlzLXByaW1hcnkgaXMtaW52ZXJ0ZWQgaXMtb3V0bGluZWRcIiBocmVmPVwiYWJvdXRcIj5cbiAgICAgICAgICAgICAgeyRfKCdpbmRleC5hYm91dF9saWJyZWxpbmdvJyl9XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8VHdpdHRlckJ1dHRvbiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGgyIGNsYXNzPVwiaXMtc2l6ZS0yIGlzLXNpemUtMy1tb2JpbGVcIj5SZWNlbnQgbWFqb3IgbmV3IGZlYXR1cmVzPC9oMj5cblxuICAgICAgPENvbHVtbnM+XG4gICAgICAgIDxDb2x1bW4gc2l6ZT1cIjEvNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXNjb3RcIj5cbiAgICAgICAgICAgIDxNYXNjb3Qgc2hhZG93PVwie2ZhbHNlfVwiIGdsb3c9XCJ7dHJ1ZX1cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbHVtbj5cblxuICAgICAgICA8Q29sdW1uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcy1jZW50ZXJlZC1ib3RoLXdheXNcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzcz1cImlzLXNpemUtMyBpcy1zaXplLTQtbW9iaWxlXCI+XG4gICAgICAgICAgICAgICAgQSBuZXcgbWFzY290IGRlc2lnbmVkIGJ5XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2Nhcm9saW5lZGVsZXNhbGxlLmNvbS9cIlxuICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiPlxuICAgICAgICAgICAgICAgICAgQ2Fyb2xpbmUgRGVsZXNhbGxlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9rYW50b3JkL0xpYnJlTGluZ28vaXNzdWVzLzM2N1wiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImxpbmtcIj5cbiAgICAgICAgICAgICAgICAgIFdhbnQgdG8gaGVscCBuYW1pbmcgaXQ/XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2x1bW4+XG4gICAgICA8L0NvbHVtbnM+XG5cbiAgICAgIDxDb2x1bW5zPlxuICAgICAgICA8Q29sdW1uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIgaGFzLXRleHQtY2VudGVyZWQgaXMtY2VudGVyZWQtYm90aC13YXlzXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpcy1zaXplLTNcIj5TcGFjZWQgcmVwZXRpdGlvbjwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sdW1uPlxuXG4gICAgICAgIDxDb2x1bW4gc2l6ZVRhYmxldD1cIjEvM1wiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cImltYWdlcy9zY3JlZW5zaG90LXNwYWNlZC1yZXBldGl0aW9uLnBuZ1wiXG4gICAgICAgICAgICBhbHQ9XCJcIlxuICAgICAgICAgICAgY2xhc3M9XCJzY3JlZW5zaG90XCIgLz5cbiAgICAgICAgPC9Db2x1bW4+XG4gICAgICA8L0NvbHVtbnM+XG5cbiAgICAgIDxDb2x1bW5zIHJldmVyc2VkPlxuICAgICAgICA8Q29sdW1uIHNpemVUYWJsZXQ9XCIxLzNcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCJpbWFnZXMvc2NyZWVuc2hvdC1jaGlwcy1jaGFsbGVuZ2UucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgICAgICBjbGFzcz1cInNjcmVlbnNob3RcIiAvPlxuICAgICAgICA8L0NvbHVtbj5cblxuICAgICAgICA8Q29sdW1uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYXMtdGV4dC1jZW50ZXJlZCBpcy1jZW50ZXJlZC1ib3RoLXdheXNcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImlzLXNpemUtM1wiPlByYWN0aWNlIHdvcmQgb3JkZXI8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvQ29sdW1ucz5cblxuICAgICAgPENvbHVtbnM+XG4gICAgICAgIDxDb2x1bW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhhcy10ZXh0LWNlbnRlcmVkIGlzLWNlbnRlcmVkLWJvdGgtd2F5c1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaXMtc2l6ZS0zXCI+Q291cnNlIGVkaXRvcjwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sdW1uPlxuXG4gICAgICAgIDxDb2x1bW4gc2l6ZVRhYmxldD1cIjEvM1wiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cImltYWdlcy9zY3JlZW5zaG90LWNvdXJzZS1lZGl0b3IucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgICAgICBjbGFzcz1cInNjcmVlbnNob3RcIiAvPlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvQ29sdW1ucz5cblxuICAgICAgPENvbHVtbnMgcmV2ZXJzZWQ9XCJcIj5cbiAgICAgICAgPENvbHVtbiBzaXplVGFibGV0PVwiMS8zXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL3NjcmVlbnNob3QtZGljdGlvbmFyeS5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2NyZWVuc2hvdFwiIC8+XG4gICAgICAgIDwvQ29sdW1uPlxuXG4gICAgICAgIDxDb2x1bW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhhcy10ZXh0LWNlbnRlcmVkIGlzLWNlbnRlcmVkLWJvdGgtd2F5c1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaXMtc2l6ZS0zXCI+QnVpbHQtaW4gbWluaS1kaWN0aW9uYXJ5PC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2x1bW4+XG4gICAgICA8L0NvbHVtbnM+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXZlbG9wbWVudC1wcm9ncmVzc1wiPlxuICAgICAgICA8aDMgY2xhc3M9XCJpcy1zaXplLTNcIj5Qcm9ncmVzcyB0b3dhcmRzIGFscGhhIHJlbGVhc2U8L2gzPlxuICAgICAgICA8cHJvZ3Jlc3MgY2xhc3M9XCJwcm9ncmVzcyBpcy1tZWRpdW0gaXMtaW5mb1wiIHZhbHVlPVwiNzVcIiBtYXg9XCIxMDBcIj5cbiAgICAgICAgICA0NSVcbiAgICAgICAgPC9wcm9ncmVzcz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucyBidXR0b25zLWJvdHRvbVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXByaW1hcnkgaXMtaW52ZXJ0ZWQgaXMtb3V0bGluZWRcIlxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2xpYnJlbGluZ28ucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L1wiPlxuICAgICAgICAgIERldmVsb3BtZW50IGRvY3VtZW50YXRpb25cbiAgICAgICAgPC9hPlxuICAgICAgICA8R2l0SHViQnV0dG9uIHNpemU9XCJkZWZhdWx0XCIgLz5cbiAgICAgICAgPFR3aXR0ZXJCdXR0b24gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG5cbnsjaWYgaXNzdWVzICE9PSBudWxsICYmIGlzc3Vlcy5sZW5ndGh9XG4gIDxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgIDxoMyBjbGFzcz1cImlzLXNpemUtM1wiPlxuICAgICAgICBMb29raW5nIGZvciBhIGNoYWxsYW5nZT8gQ2hlY2sgb3V0IHRoZXNlIGlzc3VlczpcbiAgICAgIDwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1tdWx0aWxpbmVcIj5cbiAgICAgICAgeyNlYWNoIGlzc3VlcyBhcyB7IHRpdGxlLCBodG1sX3VybCwgbGFiZWxzIH19XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy1vbmUtdGhpcmRcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJ7aHRtbF91cmx9XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtaGVhZGVyLXRpdGxlXCI+e3RpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCBsYWJlbHMgYXMgeyBuYW1lLCBjb2xvciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwie2BiYWNrZ3JvdW5kLWNvbG9yOiAjJHtjb2xvcn1gfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3Rlci1pdGVtXCI+Q29udHJpYnV0ZSB0byB0aGlzIGlzc3VlPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7L2VhY2h9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9zZWN0aW9uPlxuey9pZn1cblxuPHN0eWxlPkBrZXlmcmFtZXMgc3BpbkFyb3VuZCB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpOyB9IH1cblxuLmNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTsgfVxuXG4udGFnIHtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAwICMwYTBhMGE7IH1cblxuLnRpdGxlIGltZyB7XG4gIGhlaWdodDogM2VtOyB9XG5cbi5wcm9qZWN0LWludHJvZHVjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDRlbTsgfVxuXG5oMiB7XG4gIG1hcmdpbi1ib3R0b206IDFlbTsgfVxuXG5oMyB7XG4gIG1hcmdpbi1ib3R0b206IDFlbTsgfVxuXG4uc2NyZWVuc2hvdCB7XG4gIGJveC1zaGFkb3c6IDAgMCAyZW0gI2ZmZmZmZjQyOyB9XG5cbi5pcy1jZW50ZXJlZC1ib3RoLXdheXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlOyB9XG5cbi5kZXZlbG9wbWVudC1wcm9ncmVzcyB7XG4gIG1hcmdpbi10b3A6IDRlbTtcbiAgbWFyZ2luLWJvdHRvbTogNGVtOyB9XG5cbi5oZXJvIHtcbiAgcGFkZGluZy1ib3R0b206IDVlbTtcbiAgbWluLWhlaWdodDogMTAwdmg7IH1cbiAgLmhlcm8gLmxpbmsge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB0ZXh0LWRlY29yYXRpb24tc3R5bGU6IGRvdHRlZDsgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAubWFzY290IHtcbiAgICB3aWR0aDogNDUlO1xuICAgIG1hcmdpbjogYXV0bzsgfVxuICAuY29sdW1ucyB7XG4gICAgbWFyZ2luLWJvdHRvbTogNmVtOyB9IH1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY5cHgpIHtcbiAgLmJ1dHRvbnMtYm90dG9tIHtcbiAgICBtYXJnaW4tdG9wOiA2ZW07IH0gfVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxT08sV0FBVyx5QkFBVyxDQUFDLEFBQzVCLElBQUksQUFBQyxDQUFDLEFBQ0osU0FBUyxDQUFFLE9BQU8sSUFBSSxDQUFDLEFBQUUsQ0FBQyxBQUM1QixFQUFFLEFBQUMsQ0FBQyxBQUNGLFNBQVMsQ0FBRSxPQUFPLE1BQU0sQ0FBQyxBQUFFLENBQUMsQUFBQyxDQUFDLEFBRWxDLEtBQUssOEJBQUMsQ0FBQyxBQUNMLFVBQVUsQ0FBRSxLQUFLLEFBQUUsQ0FBQyxBQUV0QixJQUFJLDhCQUFDLENBQUMsQUFDSixLQUFLLENBQUUsS0FBSyxDQUNaLFdBQVcsQ0FBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEFBQUUsQ0FBQyxBQUVuQyxxQkFBTSxDQUFDLEdBQUcsZUFBQyxDQUFDLEFBQ1YsTUFBTSxDQUFFLEdBQUcsQUFBRSxDQUFDLEFBRWhCLHFCQUFxQiw4QkFBQyxDQUFDLEFBQ3JCLGFBQWEsQ0FBRSxHQUFHLEFBQUUsQ0FBQyxBQUV2QixFQUFFLDhCQUFDLENBQUMsQUFDRixhQUFhLENBQUUsR0FBRyxBQUFFLENBQUMsQUFFdkIsRUFBRSw4QkFBQyxDQUFDLEFBQ0YsYUFBYSxDQUFFLEdBQUcsQUFBRSxDQUFDLEFBRXZCLFdBQVcsOEJBQUMsQ0FBQyxBQUNYLFVBQVUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEFBQUUsQ0FBQyxBQUVsQyxzQkFBc0IsOEJBQUMsQ0FBQyxBQUN0QixPQUFPLENBQUUsSUFBSSxDQUNiLFdBQVcsQ0FBRSxNQUFNLENBQ25CLGVBQWUsQ0FBRSxNQUFNLENBQ3ZCLE1BQU0sQ0FBRSxJQUFJLEFBQUUsQ0FBQyxBQUVqQixxQkFBcUIsOEJBQUMsQ0FBQyxBQUNyQixVQUFVLENBQUUsR0FBRyxDQUNmLGFBQWEsQ0FBRSxHQUFHLEFBQUUsQ0FBQyxBQUV2QixLQUFLLDhCQUFDLENBQUMsQUFDTCxjQUFjLENBQUUsR0FBRyxDQUNuQixVQUFVLENBQUUsS0FBSyxBQUFFLENBQUMsQUFDcEIsb0JBQUssQ0FBQyxLQUFLLGVBQUMsQ0FBQyxBQUNYLEtBQUssQ0FBRSxLQUFLLENBQ1osZUFBZSxDQUFFLFNBQVMsQ0FDMUIscUJBQXFCLENBQUUsTUFBTSxBQUFFLENBQUMsQUFFcEMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxDQUFDLEFBQUMsQ0FBQyxBQUNwQyxPQUFPLDhCQUFDLENBQUMsQUFDUCxLQUFLLENBQUUsR0FBRyxDQUNWLE1BQU0sQ0FBRSxJQUFJLEFBQUUsQ0FBQyxBQUNqQixRQUFRLDhCQUFDLENBQUMsQUFDUixhQUFhLENBQUUsR0FBRyxBQUFFLENBQUMsQUFBQyxDQUFDLEFBRTNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDcEMsZUFBZSw4QkFBQyxDQUFDLEFBQ2YsVUFBVSxDQUFFLEdBQUcsQUFBRSxDQUFDLEFBQUMsQ0FBQyJ9 */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i].name;
	child_ctx[8] = list[i].color;
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i].title;
	child_ctx[3] = list[i].html_url;
	child_ctx[4] = list[i].labels;
	return child_ctx;
}

// (35:0) {#if issues === null}
function create_if_block_1(ctx) {
	let div;
	let span;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("LibreLingo");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "SPAN", { class: true });
			var span_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span_nodes, "LibreLingo");
			span_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "title");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 36, 4, 980);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "pageloader is-active");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 35, 2, 941);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span, t);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(35:0) {#if issues === null}",
		ctx
	});

	return block;
}

// (48:8) <Column size="1/3">
function create_default_slot_16(ctx) {
	let h1;
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "H1", { class: true });
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(h1_nodes, "IMG", { src: true, alt: true, class: true });
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "images/logo.svg")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "LibreLingo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 49, 12, 1290);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "title svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 48, 10, 1259);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, h1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, img);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(h1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_16.name,
		type: "slot",
		source: "(48:8) <Column size=\\\"1/3\\\">",
		ctx
	});

	return block;
}

// (53:8) <Column>
function create_default_slot_15(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[1]("index.subtitle") + "";
	let t0;
	let t1;
	let div;
	let a0;
	let t2_value = /*$_*/ ctx[1]("index.start_spanish_course") + "";
	let t2;
	let t3;
	let a1;
	let t4_value = /*$_*/ ctx[1]("index.start_german_course") + "";
	let t4;
	let t5;
	let a2;
	let t6_value = /*$_*/ ctx[1]("index.about_librelingo") + "";
	let t6;
	let t7;
	let twitterbutton;
	let current;
	twitterbutton = new _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(twitterbutton.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, t0_value);
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "A", { class: true, href: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, t2_value);
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "A", { class: true, href: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, t4_value);
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			a2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "A", { class: true, href: true });
			var a2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a2);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a2_nodes, t6_value);
			a2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(twitterbutton.$$.fragment, div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "subtitle svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 53, 10, 1398);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "class", "button is-primary is-inverted is-outlined");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "course/spanish-from-english");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 55, 12, 1491);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "class", "button is-primary is-inverted is-outlined is-hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "course/german-from-english");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 60, 12, 1686);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a2, "class", "button is-primary is-inverted is-outlined");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a2, "href", "about");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a2, file, 65, 12, 1889);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "buttons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 54, 10, 1457);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, a2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a2, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(twitterbutton, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*$_*/ 2) && t0_value !== (t0_value = /*$_*/ ctx[1]("index.subtitle") + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);
			if ((!current || dirty & /*$_*/ 2) && t2_value !== (t2_value = /*$_*/ ctx[1]("index.start_spanish_course") + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, t2_value);
			if ((!current || dirty & /*$_*/ 2) && t4_value !== (t4_value = /*$_*/ ctx[1]("index.start_german_course") + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t4, t4_value);
			if ((!current || dirty & /*$_*/ 2) && t6_value !== (t6_value = /*$_*/ ctx[1]("index.about_librelingo") + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t6, t6_value);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(twitterbutton.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(twitterbutton.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(twitterbutton);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_15.name,
		type: "slot",
		source: "(53:8) <Column>",
		ctx
	});

	return block;
}

// (79:8) <Column size="1/4">
function create_default_slot_14(ctx) {
	let div;
	let mascot;
	let current;

	mascot = new _components_Mascot__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { shadow: false, glow: true },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(mascot.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(mascot.$$.fragment, div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "mascot svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 79, 10, 2267);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(mascot, div, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(mascot.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(mascot.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(mascot);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_14.name,
		type: "slot",
		source: "(79:8) <Column size=\\\"1/4\\\">",
		ctx
	});

	return block;
}

// (85:8) <Column>
function create_default_slot_13(ctx) {
	let div1;
	let div0;
	let h3;
	let t0;
	let a0;
	let t1;
	let t2;
	let p;
	let a1;
	let t3;

	const block = {
		c: function create() {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("A new mascot designed by\n                ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Caroline Delesalle");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Want to help naming it?");
			this.h();
		},
		l: function claim(nodes) {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", {});
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "A new mascot designed by\n                ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(h3_nodes, "A", { href: true, target: true, class: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, "Caroline Delesalle");
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "P", {});
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(p_nodes, "A", { href: true, class: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, "Want to help naming it?");
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "https://carolinedelesalle.com/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "class", "link svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 89, 16, 2570);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 is-size-4-mobile svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 87, 14, 2473);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "https://github.com/kantord/LibreLingo/issues/367");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "class", "link svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 97, 16, 2807);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 96, 14, 2787);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 86, 12, 2453);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "is-centered-both-ways svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 85, 10, 2405);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t3);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_13.name,
		type: "slot",
		source: "(85:8) <Column>",
		ctx
	});

	return block;
}

// (78:6) <Columns>
function create_default_slot_12(ctx) {
	let column0;
	let t;
	let column1;
	let current;

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				size: "1/4",
				$$slots: { default: [create_default_slot_14] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_13] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_12.name,
		type: "slot",
		source: "(78:6) <Columns>",
		ctx
	});

	return block;
}

// (110:8) <Column>
function create_default_slot_11(ctx) {
	let div;
	let h3;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Spaced repetition");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Spaced repetition");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 111, 12, 3180);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", " has-text-centered is-centered-both-ways svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 110, 10, 3113);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_11.name,
		type: "slot",
		source: "(110:8) <Column>",
		ctx
	});

	return block;
}

// (116:8) <Column sizeTablet="1/3">
function create_default_slot_10(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "IMG", { src: true, alt: true, class: true });
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "images/screenshot-spaced-repetition.png")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "screenshot svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 116, 10, 3305);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_10.name,
		type: "slot",
		source: "(116:8) <Column sizeTablet=\\\"1/3\\\">",
		ctx
	});

	return block;
}

// (109:6) <Columns>
function create_default_slot_9(ctx) {
	let column0;
	let t;
	let column1;
	let current;

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_11] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				sizeTablet: "1/3",
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9.name,
		type: "slot",
		source: "(109:6) <Columns>",
		ctx
	});

	return block;
}

// (125:8) <Column sizeTablet="1/3">
function create_default_slot_8(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "IMG", { src: true, alt: true, class: true });
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "images/screenshot-chips-challenge.png")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "screenshot svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 125, 10, 3526);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8.name,
		type: "slot",
		source: "(125:8) <Column sizeTablet=\\\"1/3\\\">",
		ctx
	});

	return block;
}

// (132:8) <Column>
function create_default_slot_7(ctx) {
	let div;
	let h3;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Practice word order");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Practice word order");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 133, 12, 3752);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "has-text-centered is-centered-both-ways svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 132, 10, 3686);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7.name,
		type: "slot",
		source: "(132:8) <Column>",
		ctx
	});

	return block;
}

// (124:6) <Columns reversed>
function create_default_slot_6(ctx) {
	let column0;
	let t;
	let column1;
	let current;

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				sizeTablet: "1/3",
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(124:6) <Columns reversed>",
		ctx
	});

	return block;
}

// (140:8) <Column>
function create_default_slot_5(ctx) {
	let div;
	let h3;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Course editor");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Course editor");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 141, 12, 3961);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "has-text-centered is-centered-both-ways svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 140, 10, 3895);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(140:8) <Column>",
		ctx
	});

	return block;
}

// (146:8) <Column sizeTablet="1/3">
function create_default_slot_4(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "IMG", { src: true, alt: true, class: true });
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "images/screenshot-course-editor.png")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "screenshot svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 146, 10, 4082);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(146:8) <Column sizeTablet=\\\"1/3\\\">",
		ctx
	});

	return block;
}

// (139:6) <Columns>
function create_default_slot_3(ctx) {
	let column0;
	let t;
	let column1;
	let current;

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				sizeTablet: "1/3",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(139:6) <Columns>",
		ctx
	});

	return block;
}

// (155:8) <Column sizeTablet="1/3">
function create_default_slot_2(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "IMG", { src: true, alt: true, class: true });
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "images/screenshot-dictionary.png")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "class", "screenshot svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 155, 10, 4302);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(img);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(155:8) <Column sizeTablet=\\\"1/3\\\">",
		ctx
	});

	return block;
}

// (162:8) <Column>
function create_default_slot_1(ctx) {
	let div;
	let h3;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Built-in mini-dictionary");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Built-in mini-dictionary");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 163, 12, 4523);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "has-text-centered is-centered-both-ways svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 162, 10, 4457);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(162:8) <Column>",
		ctx
	});

	return block;
}

// (154:6) <Columns reversed="">
function create_default_slot(ctx) {
	let column0;
	let t;
	let column1;
	let current;

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				sizeTablet: "1/3",
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(154:6) <Columns reversed=\\\"\\\">",
		ctx
	});

	return block;
}

// (191:0) {#if issues !== null && issues.length}
function create_if_block(ctx) {
	let section;
	let div1;
	let h3;
	let t0;
	let t1;
	let div0;
	let each_value = /*issues*/ ctx[0];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Looking for a challange? Check out these issues:");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Looking for a challange? Check out these issues:");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div0_nodes);
			}

			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 193, 6, 5298);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "columns is-multiline svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 196, 6, 5396);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 192, 4, 5268);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 191, 2, 5238);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*issues*/ 1) {
				each_value = /*issues*/ ctx[0];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(191:0) {#if issues !== null && issues.length}",
		ctx
	});

	return block;
}

// (208:22) {#each labels as { name, color }}
function create_each_block_1(ctx) {
	let div;
	let t0_value = /*name*/ ctx[7] + "";
	let t0;
	let t1;
	let div_style_value;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true, style: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(div_nodes, t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "tag svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "style", div_style_value = `background-color: #${/*color*/ ctx[8]}`);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 208, 24, 5928);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*issues*/ 1 && t0_value !== (t0_value = /*name*/ ctx[7] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);

			if (dirty & /*issues*/ 1 && div_style_value !== (div_style_value = `background-color: #${/*color*/ ctx[8]}`)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "style", div_style_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(208:22) {#each labels as { name, color }}",
		ctx
	});

	return block;
}

// (198:8) {#each issues as { title, html_url, labels }}
function create_each_block(ctx) {
	let div5;
	let a;
	let div4;
	let header;
	let p;
	let t0_value = /*title*/ ctx[2] + "";
	let t0;
	let t1;
	let div2;
	let div1;
	let div0;
	let t2;
	let footer;
	let div3;
	let t3;
	let a_href_value;
	let t4;
	let each_value_1 = /*labels*/ ctx[4];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			header = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("header");
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("footer");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Contribute to this issue");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "A", { href: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			header = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "HEADER", { class: true });
			var header_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(header);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(header_nodes, "P", { class: true });
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, t0_value);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			header_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div0_nodes);
			}

			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "FOOTER", { class: true });
			var footer_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(footer);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(footer_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(div3_nodes, "Contribute to this issue");
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			footer_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(p, "class", "card-header-title");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 202, 18, 5659);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(header, "class", "card-header");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(header, file, 201, 16, 5612);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "tags");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 206, 20, 5829);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "content");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 205, 18, 5787);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "card-content");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 204, 16, 5742);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "card-footer-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 218, 18, 6270);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(footer, "class", "card-footer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(footer, file, 217, 16, 6223);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "card svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 200, 14, 5577);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value = /*html_url*/ ctx[3]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 199, 12, 5541);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "column is-one-third");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 198, 10, 5495);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, header);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(header, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, footer);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(footer, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t4);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*issues*/ 1 && t0_value !== (t0_value = /*title*/ ctx[2] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);

			if (dirty & /*issues*/ 1) {
				each_value_1 = /*labels*/ ctx[4];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty & /*issues*/ 1 && a_href_value !== (a_href_value = /*html_url*/ ctx[3])) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(198:8) {#each issues as { title, html_url, labels }}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let t1;
	let section;
	let div0;
	let navbar;
	let t2;
	let div6;
	let div2;
	let div1;
	let column0;
	let t3;
	let column1;
	let t4;
	let div5;
	let h2;
	let t5;
	let t6;
	let columns0;
	let t7;
	let columns1;
	let t8;
	let columns2;
	let t9;
	let columns3;
	let t10;
	let columns4;
	let t11;
	let div3;
	let h3;
	let t12;
	let t13;
	let progress;
	let t14;
	let t15;
	let div4;
	let a;
	let t16;
	let t17;
	let githubbutton;
	let t18;
	let twitterbutton;
	let t19;
	let if_block1_anchor;
	let current;
	let if_block0 = /*issues*/ ctx[0] === null && create_if_block_1(ctx);
	navbar = new _components_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });

	column0 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				size: "1/3",
				$$slots: { default: [create_default_slot_16] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_15] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	columns0 = new lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				$$slots: { default: [create_default_slot_12] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	columns1 = new lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	columns2 = new lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				reversed: true,
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	columns3 = new lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	columns4 = new lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				reversed: "",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	githubbutton = new _components_GitHubButton__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { size: "default" },
			$$inline: true
		});

	twitterbutton = new _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__["default"]({ $$inline: true });
	let if_block1 = /*issues*/ ctx[0] !== null && /*issues*/ ctx[0].length && create_if_block(ctx);

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(navbar.$$.fragment);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Recent major new features");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns0.$$.fragment);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns1.$$.fragment);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns2.$$.fragment);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns3.$$.fragment);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns4.$$.fragment);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Progress towards alpha release");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			progress = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("progress");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("45%");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Development documentation");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(githubbutton.$$.fragment);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(twitterbutton.$$.fragment);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])("[data-svelte=\"svelte-c6wh3i\"]", document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			if (if_block0) if_block0.l(nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(navbar.$$.fragment, div0_nodes);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(section_nodes);
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, div1_nodes);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, div1_nodes);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div6_nodes);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, "Recent major new features");
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns0.$$.fragment, div5_nodes);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns1.$$.fragment, div5_nodes);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns2.$$.fragment, div5_nodes);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns3.$$.fragment, div5_nodes);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns4.$$.fragment, div5_nodes);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "H3", { class: true });
			var h3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h3);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h3_nodes, "Progress towards alpha release");
			h3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			progress = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "PROGRESS", { class: true, value: true, max: true });
			var progress_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(progress);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(progress_nodes, "45%");
			progress_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "A", { class: true, href: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Development documentation");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(githubbutton.$$.fragment, div4_nodes);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(twitterbutton.$$.fragment, div4_nodes);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		h: function hydrate() {
			document.title = "LibreLingo - Development";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "hero-head");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 41, 2, 1070);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "columns project-introduction svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 46, 6, 1178);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 45, 4, 1148);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "is-size-2 is-size-3-mobile svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 75, 6, 2142);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h3, "class", "is-size-3 svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h3, file, 169, 8, 4677);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(progress, "class", "progress is-medium is-info");
			progress.value = "75";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(progress, "max", "100");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(progress, file, 170, 8, 4743);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "development-progress svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 168, 6, 4634);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "button is-primary is-inverted is-outlined");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "https://librelingo.readthedocs.io/en/latest/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 176, 8, 4909);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "buttons buttons-bottom svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 175, 6, 4864);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 74, 4, 2112);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "hero-body");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 44, 2, 1120);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "hero is-primary svelte-18jyvrv");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 40, 0, 1034);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(navbar, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns0, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns1, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns2, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns3, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns4, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h3, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, progress);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(progress, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(githubbutton, div4, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(twitterbutton, div4, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t19, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*issues*/ ctx[0] === null) {
				if (if_block0) {
					
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(t1.parentNode, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			const column0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope, $_*/ 2050) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
			const columns0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				columns0_changes.$$scope = { dirty, ctx };
			}

			columns0.$set(columns0_changes);
			const columns1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				columns1_changes.$$scope = { dirty, ctx };
			}

			columns1.$set(columns1_changes);
			const columns2_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				columns2_changes.$$scope = { dirty, ctx };
			}

			columns2.$set(columns2_changes);
			const columns3_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				columns3_changes.$$scope = { dirty, ctx };
			}

			columns3.$set(columns3_changes);
			const columns4_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				columns4_changes.$$scope = { dirty, ctx };
			}

			columns4.$set(columns4_changes);

			if (/*issues*/ ctx[0] !== null && /*issues*/ ctx[0].length) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(githubbutton.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(twitterbutton.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(githubbutton.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(twitterbutton.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(navbar);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(githubbutton);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(twitterbutton);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t19);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const API_URL = "https://api.github.com/repos/kantord/LibreLingo/issues?per_page=100";

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_store"])(svelte_i18n__WEBPACK_IMPORTED_MODULE_7__["_"], "_");
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_7__["_"], $$value => $$invalidate(1, $_ = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Development", slots, []);
	let issues = null;

	if (true) {
		fetch(API_URL).then(res => res.json()).then(res => {
			$$invalidate(0, issues = lodash_shuffle__WEBPACK_IMPORTED_MODULE_8___default()(res).filter(({ state, pull_request, labels }) => state === "open" && !pull_request && labels.length !== 0).slice(0, 10));
		}).catch(() => $$invalidate(0, issues = []));
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Development> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		NavBar: _components_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"],
		Mascot: _components_Mascot__WEBPACK_IMPORTED_MODULE_2__["default"],
		TwitterButton: _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__["default"],
		GitHubButton: _components_GitHubButton__WEBPACK_IMPORTED_MODULE_4__["default"],
		Column: lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"],
		Columns: lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"],
		_: svelte_i18n__WEBPACK_IMPORTED_MODULE_7__["_"],
		shuffle: (lodash_shuffle__WEBPACK_IMPORTED_MODULE_8___default()),
		API_URL,
		issues,
		$_
	});

	$$self.$inject_state = $$props => {
		if ("issues" in $$props) $$invalidate(0, issues = $$props.issues);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [issues, $_];
}

class Development extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-18jyvrv-style")) add_css();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Development",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Development);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tYXAtYWdlLWNsZWFuZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWltaWMtZm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcC1kZWZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wLW1lbW9pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFzY290LnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ud2l0dGVyQnV0dG9uLnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2RldmVsb3BtZW50LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtDQUFrQyxtQkFBTyxDQUFDLG9EQUFTO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNGYTtBQUNiLGdCQUFnQixtQkFBTyxDQUFDLHNEQUFVO0FBQ2xDLHNCQUFzQixtQkFBTyxDQUFDLHlFQUFpQjs7QUFFL0M7O0FBRUEsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhEQUE4RCxTQUFTLE1BQU0sU0FBUzs7QUFFdEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxZQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywwQ0FBMEM7QUFDbEY7O0FBRUEsNEJBQTRCLDhCQUE4QixLQUFLO0FBQy9ELFFBQVEsS0FBSzs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDckVhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWYTtBQUNiLFlBQVksbUJBQU8sQ0FBQyw0Q0FBSztBQUN6QixnQkFBZ0IsbUJBQU8sQ0FBQyxzREFBVTs7QUFFbEM7O0FBRUEsdUJBQXVCLDBDQUEwQyxLQUFLO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpRENqQ3NDLEdBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BUmpDLE1BQU0sR0FBRyxJQUFJO09BQ2IsSUFBSSxHQUFHLEtBQUs7O0tBQ25CLFFBQVEsR0FDVixNQUFNLEtBQUssSUFBSTtHQUNYLDJCQUEyQjtHQUMzQixvQ0FBb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xUO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRFk7QUFDQTtBQUNjO0FBQ0Y7QUFDcEI7QUFDRTtBQUNKO0FBRUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQTRDTixHQUFFLElBQUMsZ0JBQWdCOzs7Ozt1QkFLcEMsR0FBRSxJQUFDLDRCQUE0Qjs7Ozt1QkFLL0IsR0FBRSxJQUFDLDJCQUEyQjs7Ozt1QkFHOUIsR0FBRSxJQUFDLHdCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5RUFiVixHQUFFLElBQUMsZ0JBQWdCO3lFQUtwQyxHQUFFLElBQUMsNEJBQTRCO3lFQUsvQixHQUFFLElBQUMsMkJBQTJCO3lFQUc5QixHQUFFLElBQUMsd0JBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWNiLEtBQUssUUFBVSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBcUhqQyxHQUFNOzs7O2dDQUFYLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQUFDLEdBQU07Ozs7K0JBQVgsTUFBSTs7Ozs7Ozs7Ozs7Ozs7OztvQ0FBSixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFjYSxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29JQUR5QixHQUFLOzs7Ozs7Ozs7aUVBQ2xDLEdBQUk7O3NHQUR5QixHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBUmIsR0FBSzs7Ozs7Ozs7Ozs7OytCQUt4QixHQUFNOzs7O2tDQUFYLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBUk4sR0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUFHa0IsR0FBSzs7OzhCQUt4QixHQUFNOzs7O2lDQUFYLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBQUosTUFBSTs7OzZFQVJOLEdBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFyS3pCLEdBQU0sUUFBSyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkE0SmYsR0FBTSxRQUFLLElBQUksZUFBSSxHQUFNLElBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTVKaEMsR0FBTSxRQUFLLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkE0SmYsR0FBTSxRQUFLLElBQUksZUFBSSxHQUFNLElBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bbkw3QixPQUFPLEdBQ1gscUVBQXFFOzs7Ozs7OztLQUNuRSxNQUFNLEdBQUcsSUFBSTs7S0FFYixJQUF3QjtFQUMxQixLQUFLLENBQUMsT0FBTyxFQUNWLElBQUksQ0FBRSxHQUFHLElBQUssR0FBRyxDQUFDLElBQUksSUFDdEIsSUFBSSxDQUFFLEdBQUc7bUJBQ1IsTUFBTSxHQUFHLHFEQUFPLENBQUMsR0FBRyxFQUNqQixNQUFNLElBQ0YsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE9BQzVCLEtBQUssS0FBSyxNQUFNLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUUzRCxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUU7S0FFZixLQUFLLHVCQUFRLE1BQU0iLCJmaWxlIjoiYWViZTlmMGYyZjEwODY1YmY0YmQvZGV2ZWxvcG1lbnQuZGV2ZWxvcG1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcF9kZWZlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJwLWRlZmVyXCIpKTtcbmZ1bmN0aW9uIG1hcEFnZUNsZWFuZXIobWFwLCBwcm9wZXJ0eSA9ICdtYXhBZ2UnKSB7XG4gICAgbGV0IHByb2Nlc3NpbmdLZXk7XG4gICAgbGV0IHByb2Nlc3NpbmdUaW1lcjtcbiAgICBsZXQgcHJvY2Vzc2luZ0RlZmVycmVkO1xuICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IHByb2Nlc3NpbmcgYW4gaXRlbSwgd2UgY2FuIHNhZmVseSBleGl0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dXBUaW1lciA9IChpdGVtKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSBwX2RlZmVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBpdGVtWzFdW3Byb3BlcnR5XSAtIERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAoZGVsYXkgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSBpbW1lZGlhdGVseSBpZiB0aGUgZGVsYXkgaXMgZXF1YWwgdG8gb3IgYmVsb3cgMFxuICAgICAgICAgICAgICAgIG1hcC5kZWxldGUoaXRlbVswXSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHByb2Nlc3NlZCBrZXlcbiAgICAgICAgICAgIHByb2Nlc3NpbmdLZXkgPSBpdGVtWzBdO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpdGVtIHdoZW4gdGhlIHRpbWVvdXQgZmlyZXNcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzaW5nRGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzaW5nVGltZXIudW5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBob2xkIHVwIHRoZSBwcm9jZXNzIGZyb20gZXhpdGluZ1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NpbmdEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgbWFwKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgc2V0dXBUaW1lcihlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFuIGVycm9yIG9jY3VycywgdGhpcyBtZWFucyB0aGUgdGltZXIgd2FzIGNsZWFuZWQgdXAgYW5kIHdlIHNob3VsZCBzdG9wIHByb2Nlc3NpbmdcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzaW5nS2V5ID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgICAgICBwcm9jZXNzaW5nS2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAocHJvY2Vzc2luZ1RpbWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChwcm9jZXNzaW5nVGltZXIpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzaW5nRGVmZXJyZWQgIT09IHVuZGVmaW5lZCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmVhcmx5LWV4aXRcbiAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZWplY3QodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb3JpZ2luYWxTZXQgPSBtYXAuc2V0LmJpbmQobWFwKTtcbiAgICBtYXAuc2V0ID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0LCByZW1vdmUgaXQgc28gd2UgY2FuIGFkZCBpdCBiYWNrIGF0IHRoZSBlbmQgb2YgdGhlIG1hcC5cbiAgICAgICAgICAgIG1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYWxsIHRoZSBvcmlnaW5hbCBgbWFwLnNldGBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxTZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IHByb2Nlc3NpbmcgYSBrZXkgYW5kIHRoZSBrZXkgYWRkZWQgaXMgdGhlIGN1cnJlbnQgcHJvY2Vzc2VkIGtleSwgc3RvcCBwcm9jZXNzaW5nIGl0XG4gICAgICAgIGlmIChwcm9jZXNzaW5nS2V5ICYmIHByb2Nlc3NpbmdLZXkgPT09IGtleSkge1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbHdheXMgcnVuIHRoZSBjbGVhbnVwIG1ldGhvZCBpbiBjYXNlIGl0IHdhc24ndCBzdGFydGVkIHlldFxuICAgICAgICBjbGVhbnVwKCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHJldHVybiBtYXA7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBtYXBBZ2VDbGVhbmVyO1xuLy8gQWRkIHN1cHBvcnQgZm9yIENKU1xubW9kdWxlLmV4cG9ydHMgPSBtYXBBZ2VDbGVhbmVyO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IG1hcEFnZUNsZWFuZXI7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBtaW1pY0ZuID0gcmVxdWlyZSgnbWltaWMtZm4nKTtcbmNvbnN0IG1hcEFnZUNsZWFuZXIgPSByZXF1aXJlKCdtYXAtYWdlLWNsZWFuZXInKTtcblxuY29uc3QgY2FjaGVTdG9yZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IG1lbSA9IChmbiwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdC8vIEF1dG9tYXRpY2FsbHkgdXNlIFdlYWtNYXAgdW5sZXNzIHRoZSB1c2VyIHByb3ZpZGVkIHRoZWlyIG93biBjYWNoZVxuXHRjb25zdCB3ZWFrQ2FjaGUgPSBvcHRpb25zLmNhY2hlIHx8IG5ldyBXZWFrTWFwKCk7XG5cdGNvbnN0IHtcblx0XHRjYWNoZUtleSA9IChbZmlyc3RBcmd1bWVudF0pID0+IGZpcnN0QXJndW1lbnQsXG5cdFx0Y2FjaGUgPSBuZXcgTWFwKCksXG5cdFx0bWF4QWdlXG5cdH0gPSBvcHRpb25zO1xuXG5cdGlmICh0eXBlb2YgbWF4QWdlID09PSAnbnVtYmVyJykge1xuXHRcdG1hcEFnZUNsZWFuZXIoY2FjaGUpO1xuXHR9XG5cblx0Y29uc3QgbWVtb2l6ZWQgPSBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdGNvbnN0IGtleSA9IGNhY2hlS2V5KGFyZ3VtZW50c18pO1xuXG5cdFx0Ly8gUHJlZmVyIFdlYWtNYXAgaWYgdGhlIGtleSBhbGxvd3MgaXRcblx0XHRjb25zdCBiZXN0Q2FjaGUgPSBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpID9cblx0XHRcdHdlYWtDYWNoZSA6XG5cdFx0XHRjYWNoZTtcblxuXHRcdGlmIChiZXN0Q2FjaGUuaGFzKGtleSkpIHtcblx0XHRcdHJldHVybiBiZXN0Q2FjaGUuZ2V0KGtleSkuZGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCBjYWNoZUl0ZW0gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHNfKTtcblxuXHRcdGJlc3RDYWNoZS5zZXQoa2V5LCB7XG5cdFx0XHRkYXRhOiBjYWNoZUl0ZW0sXG5cdFx0XHRtYXhBZ2U6IG1heEFnZSA/IERhdGUubm93KCkgKyBtYXhBZ2UgOiBJbmZpbml0eVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhY2hlSXRlbTtcblx0fTtcblxuXHR0cnkge1xuXHRcdC8vIFRoZSBiZWxvdyBjYWxsIHdpbGwgdGhyb3cgaW4gc29tZSBob3N0IGVudmlyb25tZW50c1xuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL21pbWljLWZuL2lzc3Vlcy8xMFxuXHRcdG1pbWljRm4obWVtb2l6ZWQsIGZuKTtcblx0fSBjYXRjaCAoXykge31cblxuXHRjYWNoZVN0b3JlLnNldChtZW1vaXplZCwgY2FjaGUpO1xuXG5cdHJldHVybiBtZW1vaXplZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtO1xuXG5tb2R1bGUuZXhwb3J0cy5jbGVhciA9IGZuID0+IHtcblx0aWYgKCFjYWNoZVN0b3JlLmhhcyhmbikpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgY2xlYXIgYSBmdW5jdGlvbiB0aGF0IHdhcyBub3QgbWVtb2l6ZWQhJyk7XG5cdH1cblxuXHRjb25zdCBjYWNoZSA9IGNhY2hlU3RvcmUuZ2V0KGZuKTtcblx0aWYgKHR5cGVvZiBjYWNoZS5jbGVhciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGNhY2hlLmNsZWFyKCk7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvcHlQcm9wZXJ0eSA9ICh0bywgZnJvbSwgcHJvcGVydHksIGlnbm9yZU5vbkNvbmZpZ3VyYWJsZSkgPT4ge1xuXHQvLyBgRnVuY3Rpb24jbGVuZ3RoYCBzaG91bGQgcmVmbGVjdCB0aGUgcGFyYW1ldGVycyBvZiBgdG9gIG5vdCBgZnJvbWAgc2luY2Ugd2Uga2VlcCBpdHMgYm9keS5cblx0Ly8gYEZ1bmN0aW9uI3Byb3RvdHlwZWAgaXMgbm9uLXdyaXRhYmxlIGFuZCBub24tY29uZmlndXJhYmxlIHNvIGNhbiBuZXZlciBiZSBtb2RpZmllZC5cblx0aWYgKHByb3BlcnR5ID09PSAnbGVuZ3RoJyB8fCBwcm9wZXJ0eSA9PT0gJ3Byb3RvdHlwZScpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCB0b0Rlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvLCBwcm9wZXJ0eSk7XG5cdGNvbnN0IGZyb21EZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmcm9tLCBwcm9wZXJ0eSk7XG5cblx0aWYgKCFjYW5Db3B5UHJvcGVydHkodG9EZXNjcmlwdG9yLCBmcm9tRGVzY3JpcHRvcikgJiYgaWdub3JlTm9uQ29uZmlndXJhYmxlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBwcm9wZXJ0eSwgZnJvbURlc2NyaXB0b3IpO1xufTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpYCB0aHJvd3MgaWYgdGhlIHByb3BlcnR5IGV4aXN0cywgaXMgbm90IGNvbmZpZ3VyYWJsZSBhbmQgZWl0aGVyOlxuLy8gIC0gb25lIGl0cyBkZXNjcmlwdG9ycyBpcyBjaGFuZ2VkXG4vLyAgLSBpdCBpcyBub24td3JpdGFibGUgYW5kIGl0cyB2YWx1ZSBpcyBjaGFuZ2VkXG5jb25zdCBjYW5Db3B5UHJvcGVydHkgPSBmdW5jdGlvbiAodG9EZXNjcmlwdG9yLCBmcm9tRGVzY3JpcHRvcikge1xuXHRyZXR1cm4gdG9EZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgdG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fCAoXG5cdFx0dG9EZXNjcmlwdG9yLndyaXRhYmxlID09PSBmcm9tRGVzY3JpcHRvci53cml0YWJsZSAmJlxuXHRcdHRvRGVzY3JpcHRvci5lbnVtZXJhYmxlID09PSBmcm9tRGVzY3JpcHRvci5lbnVtZXJhYmxlICYmXG5cdFx0dG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9PT0gZnJvbURlc2NyaXB0b3IuY29uZmlndXJhYmxlICYmXG5cdFx0KHRvRGVzY3JpcHRvci53cml0YWJsZSB8fCB0b0Rlc2NyaXB0b3IudmFsdWUgPT09IGZyb21EZXNjcmlwdG9yLnZhbHVlKVxuXHQpO1xufTtcblxuY29uc3QgY2hhbmdlUHJvdG90eXBlID0gKHRvLCBmcm9tKSA9PiB7XG5cdGNvbnN0IGZyb21Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnJvbSk7XG5cdGlmIChmcm9tUHJvdG90eXBlID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodG8pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKHRvLCBmcm9tUHJvdG90eXBlKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRUb1N0cmluZyA9ICh3aXRoTmFtZSwgZnJvbUJvZHkpID0+IGAvKiBXcmFwcGVkICR7d2l0aE5hbWV9Ki9cXG4ke2Zyb21Cb2R5fWA7XG5cbmNvbnN0IHRvU3RyaW5nRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnKTtcbmNvbnN0IHRvU3RyaW5nTmFtZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLCAnbmFtZScpO1xuXG4vLyBXZSBjYWxsIGBmcm9tLnRvU3RyaW5nKClgIGVhcmx5IChub3QgbGF6aWx5KSB0byBlbnN1cmUgYGZyb21gIGNhbiBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbi8vIFdlIHVzZSBgYmluZCgpYCBpbnN0ZWFkIG9mIGEgY2xvc3VyZSBmb3IgdGhlIHNhbWUgcmVhc29uLlxuLy8gQ2FsbGluZyBgZnJvbS50b1N0cmluZygpYCBlYXJseSBhbHNvIGFsbG93cyBjYWNoaW5nIGl0IGluIGNhc2UgYHRvLnRvU3RyaW5nKClgIGlzIGNhbGxlZCBzZXZlcmFsIHRpbWVzLlxuY29uc3QgY2hhbmdlVG9TdHJpbmcgPSAodG8sIGZyb20sIG5hbWUpID0+IHtcblx0Y29uc3Qgd2l0aE5hbWUgPSBuYW1lID09PSAnJyA/ICcnIDogYHdpdGggJHtuYW1lLnRyaW0oKX0oKSBgO1xuXHRjb25zdCBuZXdUb1N0cmluZyA9IHdyYXBwZWRUb1N0cmluZy5iaW5kKG51bGwsIHdpdGhOYW1lLCBmcm9tLnRvU3RyaW5nKCkpO1xuXHQvLyBFbnN1cmUgYHRvLnRvU3RyaW5nLnRvU3RyaW5nYCBpcyBub24tZW51bWVyYWJsZSBhbmQgaGFzIHRoZSBzYW1lIGBzYW1lYFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3VG9TdHJpbmcsICduYW1lJywgdG9TdHJpbmdOYW1lKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCAndG9TdHJpbmcnLCB7Li4udG9TdHJpbmdEZXNjcmlwdG9yLCB2YWx1ZTogbmV3VG9TdHJpbmd9KTtcbn07XG5cbmNvbnN0IG1pbWljRm4gPSAodG8sIGZyb20sIHtpZ25vcmVOb25Db25maWd1cmFibGUgPSBmYWxzZX0gPSB7fSkgPT4ge1xuXHRjb25zdCB7bmFtZX0gPSB0bztcblxuXHRmb3IgKGNvbnN0IHByb3BlcnR5IG9mIFJlZmxlY3Qub3duS2V5cyhmcm9tKSkge1xuXHRcdGNvcHlQcm9wZXJ0eSh0bywgZnJvbSwgcHJvcGVydHksIGlnbm9yZU5vbkNvbmZpZ3VyYWJsZSk7XG5cdH1cblxuXHRjaGFuZ2VQcm90b3R5cGUodG8sIGZyb20pO1xuXHRjaGFuZ2VUb1N0cmluZyh0bywgZnJvbSwgbmFtZSk7XG5cblx0cmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaW1pY0ZuO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cdGNvbnN0IHJldCA9IHt9O1xuXG5cdHJldC5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHJldC5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRyZXQucmVqZWN0ID0gcmVqZWN0O1xuXHR9KTtcblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1lbSA9IHJlcXVpcmUoJ21lbScpO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoJ21pbWljLWZuJyk7XG5cbmNvbnN0IG1lbW9pemVkRnVuY3Rpb25zID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgcE1lbW9pemUgPSAoZm4sIHtjYWNoZVByb21pc2VSZWplY3Rpb24gPSBmYWxzZSwgLi4ub3B0aW9uc30gPSB7fSkgPT4ge1xuXHRjb25zdCBjYWNoZSA9IG9wdGlvbnMuY2FjaGUgfHwgbmV3IE1hcCgpO1xuXHRjb25zdCBjYWNoZUtleSA9IG9wdGlvbnMuY2FjaGVLZXkgfHwgKChbZmlyc3RBcmd1bWVudF0pID0+IGZpcnN0QXJndW1lbnQpO1xuXG5cdGNvbnN0IG1lbW9pemVkID0gbWVtKGZuLCB7XG5cdFx0Li4ub3B0aW9ucyxcblx0XHRjYWNoZSxcblx0XHRjYWNoZUtleVxuXHR9KTtcblxuXHRjb25zdCBtZW1vaXplZEFkYXB0ZXIgPSBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdGNvbnN0IGNhY2hlSXRlbSA9IG1lbW9pemVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXG5cdFx0aWYgKCFjYWNoZVByb21pc2VSZWplY3Rpb24gJiYgY2FjaGVJdGVtICYmIGNhY2hlSXRlbS5jYXRjaCkge1xuXHRcdFx0Y2FjaGVJdGVtLmNhdGNoKCgpID0+IHtcblx0XHRcdFx0Y2FjaGUuZGVsZXRlKGNhY2hlS2V5KGFyZ3VtZW50c18pKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZUl0ZW07XG5cdH07XG5cblx0bWltaWNGbihtZW1vaXplZEFkYXB0ZXIsIGZuKTtcblx0bWVtb2l6ZWRGdW5jdGlvbnMuc2V0KG1lbW9pemVkQWRhcHRlciwgbWVtb2l6ZWQpO1xuXG5cdHJldHVybiBtZW1vaXplZEFkYXB0ZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBNZW1vaXplO1xuXG5tb2R1bGUuZXhwb3J0cy5jbGVhciA9IG1lbW9pemVkID0+IHtcblx0aWYgKCFtZW1vaXplZEZ1bmN0aW9ucy5oYXMobWVtb2l6ZWQpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGNsZWFyIGEgZnVuY3Rpb24gdGhhdCB3YXMgbm90IG1lbW9pemVkIScpO1xuXHR9XG5cblx0bWVtLmNsZWFyKG1lbW9pemVkRnVuY3Rpb25zLmdldChtZW1vaXplZCkpO1xufTtcbiIsIjxzY3JpcHQ+XG4gIGV4cG9ydCBsZXQgc2hhZG93ID0gdHJ1ZVxuICBleHBvcnQgbGV0IGdsb3cgPSBmYWxzZVxuICBsZXQgaW1hZ2VVUkwgPVxuICAgIHNoYWRvdyA9PT0gdHJ1ZVxuICAgICAgPyBcImltYWdlcy9tYXNjb3QtamV0cGFjay5zdmdcIlxuICAgICAgOiBcImltYWdlcy9tYXNjb3QtamV0cGFjay1ub3NoYWRvdy5zdmdcIlxuPC9zY3JpcHQ+XG5cbjxpbWcgZGF0YS10ZXN0PVwibWFzY290LWpldHBhY2tcIiBzcmM9XCJ7aW1hZ2VVUkx9XCIgYWx0PVwiXCIgY2xhc3M6Z2xvdyAvPlxuXG48c3R5bGU+Lmdsb3cge1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAyZW0gI2ZmZmZmZjFjKTsgfVxuPC9zdHlsZT5cbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCBCdXR0b24gZnJvbSBcImxsdWlzL0J1dHRvblwiXG4gIGltcG9ydCBJY29uIGZyb20gXCJsbHVpcy9JY29uXCJcbjwvc2NyaXB0PlxuXG48QnV0dG9uXG4gIGNvbG9yPVwiIzU1YWNlZVwiXG4gIHRleHRDb2xvcj1cIndoaXRlXCJcbiAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P2hhc2h0YWdzPUxpYnJlTGluZ28lMkNvcGVuc291cmNlJnVybD1odHRwcyUzQSUyRiUyRmxpYnJlbGluZ28uYXBwJnRleHQ9TGlicmVMaW5nbyUyMC0lMjBhbiUyMGV4cGVyaW1lbnQlMjB0byUyMGNyZWF0ZSUyMGElMjBjb21tdW5pdHktb3duZWQlMjBsYW5ndWFnZSUyMGxlYXJuaW5nJTIwdG9vbCUwQVwiPlxuICA8SWNvbiBpY29uPVwidHdpdHRlclwiIHByZWZpeD1cImZhYlwiIC8+XG4gIDxkaXY+VHdlZXQgYWJvdXQgTGlicmVMaW5nbzwvZGl2PlxuPC9CdXR0b24+XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgTmF2QmFyIGZyb20gXCIuLi9jb21wb25lbnRzL05hdkJhclwiXG4gIGltcG9ydCBNYXNjb3QgZnJvbSBcIi4uL2NvbXBvbmVudHMvTWFzY290XCJcbiAgaW1wb3J0IFR3aXR0ZXJCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvVHdpdHRlckJ1dHRvblwiXG4gIGltcG9ydCBHaXRIdWJCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvR2l0SHViQnV0dG9uXCJcbiAgaW1wb3J0IENvbHVtbiBmcm9tIFwibGx1aXMvQ29sdW1uXCJcbiAgaW1wb3J0IENvbHVtbnMgZnJvbSBcImxsdWlzL0NvbHVtbnNcIlxuICBpbXBvcnQgeyBfIH0gZnJvbSBcInN2ZWx0ZS1pMThuXCJcblxuICBpbXBvcnQgc2h1ZmZsZSBmcm9tIFwibG9kYXNoLnNodWZmbGVcIlxuXG4gIGNvbnN0IEFQSV9VUkwgPVxuICAgIFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9rYW50b3JkL0xpYnJlTGluZ28vaXNzdWVzP3Blcl9wYWdlPTEwMFwiXG4gIGxldCBpc3N1ZXMgPSBudWxsXG5cbiAgaWYgKHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSkge1xuICAgIGZldGNoKEFQSV9VUkwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpc3N1ZXMgPSBzaHVmZmxlKHJlcylcbiAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKHsgc3RhdGUsIHB1bGxfcmVxdWVzdCwgbGFiZWxzIH0pID0+XG4gICAgICAgICAgICAgIHN0YXRlID09PSBcIm9wZW5cIiAmJiAhcHVsbF9yZXF1ZXN0ICYmIGxhYmVscy5sZW5ndGggIT09IDBcbiAgICAgICAgICApXG4gICAgICAgICAgLnNsaWNlKDAsIDEwKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiAoaXNzdWVzID0gW10pKVxuICB9XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+TGlicmVMaW5nbyAtIERldmVsb3BtZW50PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbnsjaWYgaXNzdWVzID09PSBudWxsfVxuICA8ZGl2IGNsYXNzPVwicGFnZWxvYWRlciBpcy1hY3RpdmVcIj5cbiAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+TGlicmVMaW5nbzwvc3Bhbj5cbiAgPC9kaXY+XG57L2lmfVxuXG48c2VjdGlvbiBjbGFzcz1cImhlcm8gaXMtcHJpbWFyeVwiPlxuICA8ZGl2IGNsYXNzPVwiaGVyby1oZWFkXCI+XG4gICAgPE5hdkJhciAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImhlcm8tYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIHByb2plY3QtaW50cm9kdWN0aW9uXCI+XG4gICAgICAgIDxDb2x1bW4gc2l6ZT1cIjEvM1wiPlxuICAgICAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cImltYWdlcy9sb2dvLnN2Z1wiIGFsdD1cIkxpYnJlTGluZ29cIiAvPlxuICAgICAgICAgIDwvaDE+XG4gICAgICAgIDwvQ29sdW1uPlxuICAgICAgICA8Q29sdW1uPlxuICAgICAgICAgIDxoMiBjbGFzcz1cInN1YnRpdGxlXCI+eyRfKCdpbmRleC5zdWJ0aXRsZScpfTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXByaW1hcnkgaXMtaW52ZXJ0ZWQgaXMtb3V0bGluZWRcIlxuICAgICAgICAgICAgICBocmVmPVwiY291cnNlL3NwYW5pc2gtZnJvbS1lbmdsaXNoXCI+XG4gICAgICAgICAgICAgIHskXygnaW5kZXguc3RhcnRfc3BhbmlzaF9jb3Vyc2UnKX1cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXByaW1hcnkgaXMtaW52ZXJ0ZWQgaXMtb3V0bGluZWQgaXMtaGlkZGVuXCJcbiAgICAgICAgICAgICAgaHJlZj1cImNvdXJzZS9nZXJtYW4tZnJvbS1lbmdsaXNoXCI+XG4gICAgICAgICAgICAgIHskXygnaW5kZXguc3RhcnRfZ2VybWFuX2NvdXJzZScpfVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1pbnZlcnRlZCBpcy1vdXRsaW5lZFwiIGhyZWY9XCJhYm91dFwiPlxuICAgICAgICAgICAgICB7JF8oJ2luZGV4LmFib3V0X2xpYnJlbGluZ28nKX1cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxUd2l0dGVyQnV0dG9uIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sdW1uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDIgY2xhc3M9XCJpcy1zaXplLTIgaXMtc2l6ZS0zLW1vYmlsZVwiPlJlY2VudCBtYWpvciBuZXcgZmVhdHVyZXM8L2gyPlxuXG4gICAgICA8Q29sdW1ucz5cbiAgICAgICAgPENvbHVtbiBzaXplPVwiMS80XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1hc2NvdFwiPlxuICAgICAgICAgICAgPE1hc2NvdCBzaGFkb3c9XCJ7ZmFsc2V9XCIgZ2xvdz1cInt0cnVlfVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sdW1uPlxuXG4gICAgICAgIDxDb2x1bW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlzLWNlbnRlcmVkLWJvdGgtd2F5c1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaXMtc2l6ZS0zIGlzLXNpemUtNC1tb2JpbGVcIj5cbiAgICAgICAgICAgICAgICBBIG5ldyBtYXNjb3QgZGVzaWduZWQgYnlcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vY2Fyb2xpbmVkZWxlc2FsbGUuY29tL1wiXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaW5rXCI+XG4gICAgICAgICAgICAgICAgICBDYXJvbGluZSBEZWxlc2FsbGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2thbnRvcmQvTGlicmVMaW5nby9pc3N1ZXMvMzY3XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiPlxuICAgICAgICAgICAgICAgICAgV2FudCB0byBoZWxwIG5hbWluZyBpdD9cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvQ29sdW1ucz5cblxuICAgICAgPENvbHVtbnM+XG4gICAgICAgIDxDb2x1bW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiBoYXMtdGV4dC1jZW50ZXJlZCBpcy1jZW50ZXJlZC1ib3RoLXdheXNcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImlzLXNpemUtM1wiPlNwYWNlZCByZXBldGl0aW9uPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2x1bW4+XG5cbiAgICAgICAgPENvbHVtbiBzaXplVGFibGV0PVwiMS8zXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL3NjcmVlbnNob3Qtc3BhY2VkLXJlcGV0aXRpb24ucG5nXCJcbiAgICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgICAgICBjbGFzcz1cInNjcmVlbnNob3RcIiAvPlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvQ29sdW1ucz5cblxuICAgICAgPENvbHVtbnMgcmV2ZXJzZWQ+XG4gICAgICAgIDxDb2x1bW4gc2l6ZVRhYmxldD1cIjEvM1wiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cImltYWdlcy9zY3JlZW5zaG90LWNoaXBzLWNoYWxsZW5nZS5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2NyZWVuc2hvdFwiIC8+XG4gICAgICAgIDwvQ29sdW1uPlxuXG4gICAgICAgIDxDb2x1bW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhhcy10ZXh0LWNlbnRlcmVkIGlzLWNlbnRlcmVkLWJvdGgtd2F5c1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaXMtc2l6ZS0zXCI+UHJhY3RpY2Ugd29yZCBvcmRlcjwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sdW1uPlxuICAgICAgPC9Db2x1bW5zPlxuXG4gICAgICA8Q29sdW1ucz5cbiAgICAgICAgPENvbHVtbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFzLXRleHQtY2VudGVyZWQgaXMtY2VudGVyZWQtYm90aC13YXlzXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpcy1zaXplLTNcIj5Db3Vyc2UgZWRpdG9yPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2x1bW4+XG5cbiAgICAgICAgPENvbHVtbiBzaXplVGFibGV0PVwiMS8zXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL3NjcmVlbnNob3QtY291cnNlLWVkaXRvci5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2NyZWVuc2hvdFwiIC8+XG4gICAgICAgIDwvQ29sdW1uPlxuICAgICAgPC9Db2x1bW5zPlxuXG4gICAgICA8Q29sdW1ucyByZXZlcnNlZD1cIlwiPlxuICAgICAgICA8Q29sdW1uIHNpemVUYWJsZXQ9XCIxLzNcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCJpbWFnZXMvc2NyZWVuc2hvdC1kaWN0aW9uYXJ5LnBuZ1wiXG4gICAgICAgICAgICBhbHQ9XCJcIlxuICAgICAgICAgICAgY2xhc3M9XCJzY3JlZW5zaG90XCIgLz5cbiAgICAgICAgPC9Db2x1bW4+XG5cbiAgICAgICAgPENvbHVtbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFzLXRleHQtY2VudGVyZWQgaXMtY2VudGVyZWQtYm90aC13YXlzXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpcy1zaXplLTNcIj5CdWlsdC1pbiBtaW5pLWRpY3Rpb25hcnk8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbHVtbj5cbiAgICAgIDwvQ29sdW1ucz5cblxuICAgICAgPGRpdiBjbGFzcz1cImRldmVsb3BtZW50LXByb2dyZXNzXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cImlzLXNpemUtM1wiPlByb2dyZXNzIHRvd2FyZHMgYWxwaGEgcmVsZWFzZTwvaDM+XG4gICAgICAgIDxwcm9ncmVzcyBjbGFzcz1cInByb2dyZXNzIGlzLW1lZGl1bSBpcy1pbmZvXCIgdmFsdWU9XCI3NVwiIG1heD1cIjEwMFwiPlxuICAgICAgICAgIDQ1JVxuICAgICAgICA8L3Byb2dyZXNzPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zIGJ1dHRvbnMtYm90dG9tXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1pbnZlcnRlZCBpcy1vdXRsaW5lZFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vbGlicmVsaW5nby5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvXCI+XG4gICAgICAgICAgRGV2ZWxvcG1lbnQgZG9jdW1lbnRhdGlvblxuICAgICAgICA8L2E+XG4gICAgICAgIDxHaXRIdWJCdXR0b24gc2l6ZT1cImRlZmF1bHRcIiAvPlxuICAgICAgICA8VHdpdHRlckJ1dHRvbiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cblxueyNpZiBpc3N1ZXMgIT09IG51bGwgJiYgaXNzdWVzLmxlbmd0aH1cbiAgPHNlY3Rpb24gY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGgzIGNsYXNzPVwiaXMtc2l6ZS0zXCI+XG4gICAgICAgIExvb2tpbmcgZm9yIGEgY2hhbGxhbmdlPyBDaGVjayBvdXQgdGhlc2UgaXNzdWVzOlxuICAgICAgPC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLW11bHRpbGluZVwiPlxuICAgICAgICB7I2VhY2ggaXNzdWVzIGFzIHsgdGl0bGUsIGh0bWxfdXJsLCBsYWJlbHMgfX1cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW9uZS10aGlyZFwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIntodG1sX3VybH1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC1oZWFkZXItdGl0bGVcIj57dGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgeyNlYWNoIGxhYmVscyBhcyB7IG5hbWUsIGNvbG9yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ7YGJhY2tncm91bmQtY29sb3I6ICMke2NvbG9yfWB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyLWl0ZW1cIj5Db250cmlidXRlIHRvIHRoaXMgaXNzdWU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvZWFjaH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L3NlY3Rpb24+XG57L2lmfVxuXG48c3R5bGU+QGtleWZyYW1lcyBzcGluQXJvdW5kIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7IH0gfVxuXG4uY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlOyB9XG5cbi50YWcge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtc2hhZG93OiAxcHggMXB4IDAgIzBhMGEwYTsgfVxuXG4udGl0bGUgaW1nIHtcbiAgaGVpZ2h0OiAzZW07IH1cblxuLnByb2plY3QtaW50cm9kdWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogNGVtOyB9XG5cbmgyIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtOyB9XG5cbmgzIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtOyB9XG5cbi5zY3JlZW5zaG90IHtcbiAgYm94LXNoYWRvdzogMCAwIDJlbSAjZmZmZmZmNDI7IH1cblxuLmlzLWNlbnRlcmVkLWJvdGgtd2F5cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7IH1cblxuLmRldmVsb3BtZW50LXByb2dyZXNzIHtcbiAgbWFyZ2luLXRvcDogNGVtO1xuICBtYXJnaW4tYm90dG9tOiA0ZW07IH1cblxuLmhlcm8ge1xuICBwYWRkaW5nLWJvdHRvbTogNWVtO1xuICBtaW4taGVpZ2h0OiAxMDB2aDsgfVxuICAuaGVybyAubGluayB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIHRleHQtZGVjb3JhdGlvbi1zdHlsZTogZG90dGVkOyB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5tYXNjb3Qge1xuICAgIHdpZHRoOiA0NSU7XG4gICAgbWFyZ2luOiBhdXRvOyB9XG4gIC5jb2x1bW5zIHtcbiAgICBtYXJnaW4tYm90dG9tOiA2ZW07IH0gfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjlweCkge1xuICAuYnV0dG9ucy1ib3R0b20ge1xuICAgIG1hcmdpbi10b3A6IDZlbTsgfSB9XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==