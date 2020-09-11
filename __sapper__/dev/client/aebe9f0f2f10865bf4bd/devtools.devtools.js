(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["devtools"],{

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

/***/ "./src/routes/devtools.svelte":
/*!************************************!*\
  !*** ./src/routes/devtools.svelte ***!
  \************************************/
/*! exports provided: default, preload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NavBar */ "./src/components/NavBar.svelte");
/* harmony import */ var _components_Mascot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Mascot */ "./src/components/Mascot.svelte");
/* harmony import */ var _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TwitterButton */ "./src/components/TwitterButton.svelte");
/* harmony import */ var _components_GitHubButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/GitHubButton */ "./src/components/GitHubButton.svelte");
/* harmony import */ var lluis_Column__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lluis/Column */ "../lluis/Column.svelte");
/* harmony import */ var lluis_Columns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lluis/Columns */ "../lluis/Columns.svelte");
/* src/routes/devtools.svelte generated by Svelte v3.25.0 */








const file = "src/routes/devtools.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (43:8) {#each testSkills as testSkill}
function create_each_block(ctx) {
	let li;
	let a;
	let t0;
	let b;
	let t1_value = /*testSkill*/ ctx[1] + "";
	let t1;
	let a_href_value;
	let t2;

	const block = {
		c: function create() {
			li = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Test skill:\n              ");
			b = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("b");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			li = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "LI", {});
			var li_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li_nodes, "A", { target: true, href: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Test skill:\n              ");
			b = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a_nodes, "B", {});
			var b_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(b);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(b_nodes, t1_value);
			b_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(li_nodes);
			li_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(b, file, 46, 14, 1229);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value = "/course/test/skill/" + /*testSkill*/ ctx[1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 44, 12, 1131);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li, file, 43, 10, 1114);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, li, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, b);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(b, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*testSkills*/ 1 && t1_value !== (t1_value = /*testSkill*/ ctx[1] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t1, t1_value);

			if (dirty & /*testSkills*/ 1 && a_href_value !== (a_href_value = "/course/test/skill/" + /*testSkill*/ ctx[1])) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(li);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(43:8) {#each testSkills as testSkill}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let navbar;
	let t1;
	let section;
	let div1;
	let div0;
	let h1;
	let t2;
	let t3;
	let h2;
	let t4;
	let t5;
	let ul;
	let li;
	let a;
	let t6;
	let t7;
	let current;
	navbar = new _components_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"]({ props: { dark: true }, $$inline: true });
	let each_value = /*testSkills*/ ctx[0];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(navbar.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Development tools");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Test pages");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Test course");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])("[data-svelte=\"svelte-c6wh3i\"]", document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(navbar.$$.fragment, nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "H1", { class: true });
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h1_nodes, "Development tools");
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, "Test pages");
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "UL", {});
			var ul_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(ul);
			li = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", {});
			var li_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li_nodes, "A", { href: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Test course");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			li_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			document.title = "LibreLingo - Development";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "is-size-1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 36, 6, 888);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "is-size-2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 37, 6, 939);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "/course/test");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 40, 10, 1011);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li, file, 39, 8, 996);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 38, 6, 983);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "content");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 35, 4, 860);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 34, 2, 832);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 33, 0, 804);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(navbar, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, ul);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t7);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*testSkills*/ 1) {
				each_value = /*testSkills*/ ctx[0];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(navbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(navbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(navbar, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
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

async function preload(page, session) {
	if (false) {}
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Devtools", slots, []);
	let { testSkills = [] } = $$props;
	const writable_props = ["testSkills"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Devtools> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("testSkills" in $$props) $$invalidate(0, testSkills = $$props.testSkills);
	};

	$$self.$capture_state = () => ({
		preload,
		NavBar: _components_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"],
		Mascot: _components_Mascot__WEBPACK_IMPORTED_MODULE_2__["default"],
		TwitterButton: _components_TwitterButton__WEBPACK_IMPORTED_MODULE_3__["default"],
		GitHubButton: _components_GitHubButton__WEBPACK_IMPORTED_MODULE_4__["default"],
		Column: lluis_Column__WEBPACK_IMPORTED_MODULE_5__["default"],
		Columns: lluis_Columns__WEBPACK_IMPORTED_MODULE_6__["default"],
		testSkills
	});

	$$self.$inject_state = $$props => {
		if ("testSkills" in $$props) $$invalidate(0, testSkills = $$props.testSkills);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [testSkills];
}

class Devtools extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { testSkills: 0 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Devtools",
			options,
			id: create_fragment.name
		});
	}

	get testSkills() {
		throw new Error("<Devtools>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set testSkills(value) {
		throw new Error("<Devtools>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Devtools);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tYXAtYWdlLWNsZWFuZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWltaWMtZm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcC1kZWZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9wLW1lbW9pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFzY290LnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ud2l0dGVyQnV0dG9uLnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2RldnRvb2xzLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtDQUFrQyxtQkFBTyxDQUFDLG9EQUFTO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNGYTtBQUNiLGdCQUFnQixtQkFBTyxDQUFDLHNEQUFVO0FBQ2xDLHNCQUFzQixtQkFBTyxDQUFDLHlFQUFpQjs7QUFFL0M7O0FBRUEsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhEQUE4RCxTQUFTLE1BQU0sU0FBUzs7QUFFdEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxZQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywwQ0FBMEM7QUFDbEY7O0FBRUEsNEJBQTRCLDhCQUE4QixLQUFLO0FBQy9ELFFBQVEsS0FBSzs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDckVhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWYTtBQUNiLFlBQVksbUJBQU8sQ0FBQyw0Q0FBSztBQUN6QixnQkFBZ0IsbUJBQU8sQ0FBQyxzREFBVTs7QUFFbEM7O0FBRUEsdUJBQXVCLDBDQUEwQyxLQUFLO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpRENqQ3NDLEdBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BUmpDLE1BQU0sR0FBRyxJQUFJO09BQ2IsSUFBSSxHQUFHLEtBQUs7O0tBQ25CLFFBQVEsR0FDVixNQUFNLEtBQUssSUFBSTtHQUNYLDJCQUEyQjtHQUMzQixvQ0FBb0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xUO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2VZO0FBQ0E7QUFDYztBQUNGO0FBQ3BCO0FBQ0U7Ozs7Ozs7Ozs7Ozs7Ozs4QkF3Qm5CLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvSUFGOEIsR0FBUzs7Ozs7Ozs7Ozs7OzswRUFFaEQsR0FBUzs7MEdBRjhCLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBRm5ELEdBQVU7Ozs7Z0NBQWYsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUFDLEdBQVU7Ozs7K0JBQWYsTUFBSTs7Ozs7Ozs7Ozs7Ozs7OztvQ0FBSixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXpDVSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU87VUFDckIsRUFBRSxFOzs7Ozs7T0FzQmIsVUFBVSIsImZpbGUiOiJhZWJlOWYwZjJmMTA4NjViZjRiZC9kZXZ0b29scy5kZXZ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwX2RlZmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInAtZGVmZXJcIikpO1xuZnVuY3Rpb24gbWFwQWdlQ2xlYW5lcihtYXAsIHByb3BlcnR5ID0gJ21heEFnZScpIHtcbiAgICBsZXQgcHJvY2Vzc2luZ0tleTtcbiAgICBsZXQgcHJvY2Vzc2luZ1RpbWVyO1xuICAgIGxldCBwcm9jZXNzaW5nRGVmZXJyZWQ7XG4gICAgY29uc3QgY2xlYW51cCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhbiBpdGVtLCB3ZSBjYW4gc2FmZWx5IGV4aXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR1cFRpbWVyID0gKGl0ZW0pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZCA9IHBfZGVmZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGl0ZW1bMV1bcHJvcGVydHldIC0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmIChkZWxheSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpdGVtIGltbWVkaWF0ZWx5IGlmIHRoZSBkZWxheSBpcyBlcXVhbCB0byBvciBiZWxvdyAwXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIGN1cnJlbnQgcHJvY2Vzc2VkIGtleVxuICAgICAgICAgICAgcHJvY2Vzc2luZ0tleSA9IGl0ZW1bMF07XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gd2hlbiB0aGUgdGltZW91dCBmaXJlc1xuICAgICAgICAgICAgICAgIG1hcC5kZWxldGUoaXRlbVswXSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtdHlwZS1wcmVkaWNhdGVzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3NpbmdUaW1lci51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIERvbid0IGhvbGQgdXAgdGhlIHByb2Nlc3MgZnJvbSBleGl0aW5nXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZ1RpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc2luZ0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBtYXApIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBzZXR1cFRpbWVyKGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmcgaWYgYW4gZXJyb3Igb2NjdXJzLCB0aGlzIG1lYW5zIHRoZSB0aW1lciB3YXMgY2xlYW5lZCB1cCBhbmQgd2Ugc2hvdWxkIHN0b3AgcHJvY2Vzc2luZ1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2Nlc3NpbmdUaW1lcik7XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbFNldCA9IG1hcC5zZXQuYmluZChtYXApO1xuICAgIG1hcC5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3QsIHJlbW92ZSBpdCBzbyB3ZSBjYW4gYWRkIGl0IGJhY2sgYXQgdGhlIGVuZCBvZiB0aGUgbWFwLlxuICAgICAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGBtYXAuc2V0YFxuICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNldChrZXksIHZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhIGtleSBhbmQgdGhlIGtleSBhZGRlZCBpcyB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5LCBzdG9wIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgJiYgcHJvY2Vzc2luZ0tleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBydW4gdGhlIGNsZWFudXAgbWV0aG9kIGluIGNhc2UgaXQgd2Fzbid0IHN0YXJ0ZWQgeWV0XG4gICAgICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgcmV0dXJuIG1hcDtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IG1hcEFnZUNsZWFuZXI7XG4vLyBBZGQgc3VwcG9ydCBmb3IgQ0pTXG5tb2R1bGUuZXhwb3J0cyA9IG1hcEFnZUNsZWFuZXI7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbWFwQWdlQ2xlYW5lcjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1pbWljRm4gPSByZXF1aXJlKCdtaW1pYy1mbicpO1xuY29uc3QgbWFwQWdlQ2xlYW5lciA9IHJlcXVpcmUoJ21hcC1hZ2UtY2xlYW5lcicpO1xuXG5jb25zdCBjYWNoZVN0b3JlID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgbWVtID0gKGZuLCBvcHRpb25zID0ge30pID0+IHtcblx0Ly8gQXV0b21hdGljYWxseSB1c2UgV2Vha01hcCB1bmxlc3MgdGhlIHVzZXIgcHJvdmlkZWQgdGhlaXIgb3duIGNhY2hlXG5cdGNvbnN0IHdlYWtDYWNoZSA9IG9wdGlvbnMuY2FjaGUgfHwgbmV3IFdlYWtNYXAoKTtcblx0Y29uc3Qge1xuXHRcdGNhY2hlS2V5ID0gKFtmaXJzdEFyZ3VtZW50XSkgPT4gZmlyc3RBcmd1bWVudCxcblx0XHRjYWNoZSA9IG5ldyBNYXAoKSxcblx0XHRtYXhBZ2Vcblx0fSA9IG9wdGlvbnM7XG5cblx0aWYgKHR5cGVvZiBtYXhBZ2UgPT09ICdudW1iZXInKSB7XG5cdFx0bWFwQWdlQ2xlYW5lcihjYWNoZSk7XG5cdH1cblxuXHRjb25zdCBtZW1vaXplZCA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0Y29uc3Qga2V5ID0gY2FjaGVLZXkoYXJndW1lbnRzXyk7XG5cblx0XHQvLyBQcmVmZXIgV2Vha01hcCBpZiB0aGUga2V5IGFsbG93cyBpdFxuXHRcdGNvbnN0IGJlc3RDYWNoZSA9IGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykgP1xuXHRcdFx0d2Vha0NhY2hlIDpcblx0XHRcdGNhY2hlO1xuXG5cdFx0aWYgKGJlc3RDYWNoZS5oYXMoa2V5KSkge1xuXHRcdFx0cmV0dXJuIGJlc3RDYWNoZS5nZXQoa2V5KS5kYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNhY2hlSXRlbSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXG5cdFx0YmVzdENhY2hlLnNldChrZXksIHtcblx0XHRcdGRhdGE6IGNhY2hlSXRlbSxcblx0XHRcdG1heEFnZTogbWF4QWdlID8gRGF0ZS5ub3coKSArIG1heEFnZSA6IEluZmluaXR5XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2FjaGVJdGVtO1xuXHR9O1xuXG5cdHRyeSB7XG5cdFx0Ly8gVGhlIGJlbG93IGNhbGwgd2lsbCB0aHJvdyBpbiBzb21lIGhvc3QgZW52aXJvbm1lbnRzXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvbWltaWMtZm4vaXNzdWVzLzEwXG5cdFx0bWltaWNGbihtZW1vaXplZCwgZm4pO1xuXHR9IGNhdGNoIChfKSB7fVxuXG5cdGNhY2hlU3RvcmUuc2V0KG1lbW9pemVkLCBjYWNoZSk7XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZW07XG5cbm1vZHVsZS5leHBvcnRzLmNsZWFyID0gZm4gPT4ge1xuXHRpZiAoIWNhY2hlU3RvcmUuaGFzKGZuKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBjbGVhciBhIGZ1bmN0aW9uIHRoYXQgd2FzIG5vdCBtZW1vaXplZCEnKTtcblx0fVxuXG5cdGNvbnN0IGNhY2hlID0gY2FjaGVTdG9yZS5nZXQoZm4pO1xuXHRpZiAodHlwZW9mIGNhY2hlLmNsZWFyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Y2FjaGUuY2xlYXIoKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29weVByb3BlcnR5ID0gKHRvLCBmcm9tLCBwcm9wZXJ0eSwgaWdub3JlTm9uQ29uZmlndXJhYmxlKSA9PiB7XG5cdC8vIGBGdW5jdGlvbiNsZW5ndGhgIHNob3VsZCByZWZsZWN0IHRoZSBwYXJhbWV0ZXJzIG9mIGB0b2Agbm90IGBmcm9tYCBzaW5jZSB3ZSBrZWVwIGl0cyBib2R5LlxuXHQvLyBgRnVuY3Rpb24jcHJvdG90eXBlYCBpcyBub24td3JpdGFibGUgYW5kIG5vbi1jb25maWd1cmFibGUgc28gY2FuIG5ldmVyIGJlIG1vZGlmaWVkLlxuXHRpZiAocHJvcGVydHkgPT09ICdsZW5ndGgnIHx8IHByb3BlcnR5ID09PSAncHJvdG90eXBlJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHRvRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG8sIHByb3BlcnR5KTtcblx0Y29uc3QgZnJvbURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZyb20sIHByb3BlcnR5KTtcblxuXHRpZiAoIWNhbkNvcHlQcm9wZXJ0eSh0b0Rlc2NyaXB0b3IsIGZyb21EZXNjcmlwdG9yKSAmJiBpZ25vcmVOb25Db25maWd1cmFibGUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHByb3BlcnR5LCBmcm9tRGVzY3JpcHRvcik7XG59O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5KClgIHRocm93cyBpZiB0aGUgcHJvcGVydHkgZXhpc3RzLCBpcyBub3QgY29uZmlndXJhYmxlIGFuZCBlaXRoZXI6XG4vLyAgLSBvbmUgaXRzIGRlc2NyaXB0b3JzIGlzIGNoYW5nZWRcbi8vICAtIGl0IGlzIG5vbi13cml0YWJsZSBhbmQgaXRzIHZhbHVlIGlzIGNoYW5nZWRcbmNvbnN0IGNhbkNvcHlQcm9wZXJ0eSA9IGZ1bmN0aW9uICh0b0Rlc2NyaXB0b3IsIGZyb21EZXNjcmlwdG9yKSB7XG5cdHJldHVybiB0b0Rlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCB8fCB0b0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlIHx8IChcblx0XHR0b0Rlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZyb21EZXNjcmlwdG9yLndyaXRhYmxlICYmXG5cdFx0dG9EZXNjcmlwdG9yLmVudW1lcmFibGUgPT09IGZyb21EZXNjcmlwdG9yLmVudW1lcmFibGUgJiZcblx0XHR0b0Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmcm9tRGVzY3JpcHRvci5jb25maWd1cmFibGUgJiZcblx0XHQodG9EZXNjcmlwdG9yLndyaXRhYmxlIHx8IHRvRGVzY3JpcHRvci52YWx1ZSA9PT0gZnJvbURlc2NyaXB0b3IudmFsdWUpXG5cdCk7XG59O1xuXG5jb25zdCBjaGFuZ2VQcm90b3R5cGUgPSAodG8sIGZyb20pID0+IHtcblx0Y29uc3QgZnJvbVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihmcm9tKTtcblx0aWYgKGZyb21Qcm90b3R5cGUgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0bykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YodG8sIGZyb21Qcm90b3R5cGUpO1xufTtcblxuY29uc3Qgd3JhcHBlZFRvU3RyaW5nID0gKHdpdGhOYW1lLCBmcm9tQm9keSkgPT4gYC8qIFdyYXBwZWQgJHt3aXRoTmFtZX0qL1xcbiR7ZnJvbUJvZHl9YDtcblxuY29uc3QgdG9TdHJpbmdEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycpO1xuY29uc3QgdG9TdHJpbmdOYW1lID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcsICduYW1lJyk7XG5cbi8vIFdlIGNhbGwgYGZyb20udG9TdHJpbmcoKWAgZWFybHkgKG5vdCBsYXppbHkpIHRvIGVuc3VyZSBgZnJvbWAgY2FuIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuLy8gV2UgdXNlIGBiaW5kKClgIGluc3RlYWQgb2YgYSBjbG9zdXJlIGZvciB0aGUgc2FtZSByZWFzb24uXG4vLyBDYWxsaW5nIGBmcm9tLnRvU3RyaW5nKClgIGVhcmx5IGFsc28gYWxsb3dzIGNhY2hpbmcgaXQgaW4gY2FzZSBgdG8udG9TdHJpbmcoKWAgaXMgY2FsbGVkIHNldmVyYWwgdGltZXMuXG5jb25zdCBjaGFuZ2VUb1N0cmluZyA9ICh0bywgZnJvbSwgbmFtZSkgPT4ge1xuXHRjb25zdCB3aXRoTmFtZSA9IG5hbWUgPT09ICcnID8gJycgOiBgd2l0aCAke25hbWUudHJpbSgpfSgpIGA7XG5cdGNvbnN0IG5ld1RvU3RyaW5nID0gd3JhcHBlZFRvU3RyaW5nLmJpbmQobnVsbCwgd2l0aE5hbWUsIGZyb20udG9TdHJpbmcoKSk7XG5cdC8vIEVuc3VyZSBgdG8udG9TdHJpbmcudG9TdHJpbmdgIGlzIG5vbi1lbnVtZXJhYmxlIGFuZCBoYXMgdGhlIHNhbWUgYHNhbWVgXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdUb1N0cmluZywgJ25hbWUnLCB0b1N0cmluZ05hbWUpO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sICd0b1N0cmluZycsIHsuLi50b1N0cmluZ0Rlc2NyaXB0b3IsIHZhbHVlOiBuZXdUb1N0cmluZ30pO1xufTtcblxuY29uc3QgbWltaWNGbiA9ICh0bywgZnJvbSwge2lnbm9yZU5vbkNvbmZpZ3VyYWJsZSA9IGZhbHNlfSA9IHt9KSA9PiB7XG5cdGNvbnN0IHtuYW1lfSA9IHRvO1xuXG5cdGZvciAoY29uc3QgcHJvcGVydHkgb2YgUmVmbGVjdC5vd25LZXlzKGZyb20pKSB7XG5cdFx0Y29weVByb3BlcnR5KHRvLCBmcm9tLCBwcm9wZXJ0eSwgaWdub3JlTm9uQ29uZmlndXJhYmxlKTtcblx0fVxuXG5cdGNoYW5nZVByb3RvdHlwZSh0bywgZnJvbSk7XG5cdGNoYW5nZVRvU3RyaW5nKHRvLCBmcm9tLCBuYW1lKTtcblxuXHRyZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1pbWljRm47XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblx0Y29uc3QgcmV0ID0ge307XG5cblx0cmV0LnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0cmV0LnJlc29sdmUgPSByZXNvbHZlO1xuXHRcdHJldC5yZWplY3QgPSByZWplY3Q7XG5cdH0pO1xuXG5cdHJldHVybiByZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgbWVtID0gcmVxdWlyZSgnbWVtJyk7XG5jb25zdCBtaW1pY0ZuID0gcmVxdWlyZSgnbWltaWMtZm4nKTtcblxuY29uc3QgbWVtb2l6ZWRGdW5jdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBwTWVtb2l6ZSA9IChmbiwge2NhY2hlUHJvbWlzZVJlamVjdGlvbiA9IGZhbHNlLCAuLi5vcHRpb25zfSA9IHt9KSA9PiB7XG5cdGNvbnN0IGNhY2hlID0gb3B0aW9ucy5jYWNoZSB8fCBuZXcgTWFwKCk7XG5cdGNvbnN0IGNhY2hlS2V5ID0gb3B0aW9ucy5jYWNoZUtleSB8fCAoKFtmaXJzdEFyZ3VtZW50XSkgPT4gZmlyc3RBcmd1bWVudCk7XG5cblx0Y29uc3QgbWVtb2l6ZWQgPSBtZW0oZm4sIHtcblx0XHQuLi5vcHRpb25zLFxuXHRcdGNhY2hlLFxuXHRcdGNhY2hlS2V5XG5cdH0pO1xuXG5cdGNvbnN0IG1lbW9pemVkQWRhcHRlciA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0Y29uc3QgY2FjaGVJdGVtID0gbWVtb2l6ZWQuYXBwbHkodGhpcywgYXJndW1lbnRzXyk7XG5cblx0XHRpZiAoIWNhY2hlUHJvbWlzZVJlamVjdGlvbiAmJiBjYWNoZUl0ZW0gJiYgY2FjaGVJdGVtLmNhdGNoKSB7XG5cdFx0XHRjYWNoZUl0ZW0uY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRjYWNoZS5kZWxldGUoY2FjaGVLZXkoYXJndW1lbnRzXykpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhY2hlSXRlbTtcblx0fTtcblxuXHRtaW1pY0ZuKG1lbW9pemVkQWRhcHRlciwgZm4pO1xuXHRtZW1vaXplZEZ1bmN0aW9ucy5zZXQobWVtb2l6ZWRBZGFwdGVyLCBtZW1vaXplZCk7XG5cblx0cmV0dXJuIG1lbW9pemVkQWRhcHRlcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcE1lbW9pemU7XG5cbm1vZHVsZS5leHBvcnRzLmNsZWFyID0gbWVtb2l6ZWQgPT4ge1xuXHRpZiAoIW1lbW9pemVkRnVuY3Rpb25zLmhhcyhtZW1vaXplZCkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgY2xlYXIgYSBmdW5jdGlvbiB0aGF0IHdhcyBub3QgbWVtb2l6ZWQhJyk7XG5cdH1cblxuXHRtZW0uY2xlYXIobWVtb2l6ZWRGdW5jdGlvbnMuZ2V0KG1lbW9pemVkKSk7XG59O1xuIiwiPHNjcmlwdD5cbiAgZXhwb3J0IGxldCBzaGFkb3cgPSB0cnVlXG4gIGV4cG9ydCBsZXQgZ2xvdyA9IGZhbHNlXG4gIGxldCBpbWFnZVVSTCA9XG4gICAgc2hhZG93ID09PSB0cnVlXG4gICAgICA/IFwiaW1hZ2VzL21hc2NvdC1qZXRwYWNrLnN2Z1wiXG4gICAgICA6IFwiaW1hZ2VzL21hc2NvdC1qZXRwYWNrLW5vc2hhZG93LnN2Z1wiXG48L3NjcmlwdD5cblxuPGltZyBkYXRhLXRlc3Q9XCJtYXNjb3QtamV0cGFja1wiIHNyYz1cIntpbWFnZVVSTH1cIiBhbHQ9XCJcIiBjbGFzczpnbG93IC8+XG5cbjxzdHlsZT4uZ2xvdyB7XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDJlbSAjZmZmZmZmMWMpOyB9XG48L3N0eWxlPlxuIiwiPHNjcmlwdD5cbiAgaW1wb3J0IEJ1dHRvbiBmcm9tIFwibGx1aXMvQnV0dG9uXCJcbiAgaW1wb3J0IEljb24gZnJvbSBcImxsdWlzL0ljb25cIlxuPC9zY3JpcHQ+XG5cbjxCdXR0b25cbiAgY29sb3I9XCIjNTVhY2VlXCJcbiAgdGV4dENvbG9yPVwid2hpdGVcIlxuICB0YXJnZXQ9XCJfYmxhbmtcIlxuICBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/aGFzaHRhZ3M9TGlicmVMaW5nbyUyQ29wZW5zb3VyY2UmdXJsPWh0dHBzJTNBJTJGJTJGbGlicmVsaW5nby5hcHAmdGV4dD1MaWJyZUxpbmdvJTIwLSUyMGFuJTIwZXhwZXJpbWVudCUyMHRvJTIwY3JlYXRlJTIwYSUyMGNvbW11bml0eS1vd25lZCUyMGxhbmd1YWdlJTIwbGVhcm5pbmclMjB0b29sJTBBXCI+XG4gIDxJY29uIGljb249XCJ0d2l0dGVyXCIgcHJlZml4PVwiZmFiXCIgLz5cbiAgPGRpdj5Ud2VldCBhYm91dCBMaWJyZUxpbmdvPC9kaXY+XG48L0J1dHRvbj5cbiIsIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZChwYWdlLCBzZXNzaW9uKSB7XG4gICAgaWYgKCFwcm9jZXNzLmJyb3dzZXIpIHtcbiAgICAgIGNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpXG4gICAgICBjb25zdCB1dGlsID0gcmVxdWlyZShcInV0aWxcIilcbiAgICAgIGNvbnN0IHJlYWRkaXIgPSB1dGlsLnByb21pc2lmeShmcy5yZWFkZGlyKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXN0U2tpbGxzOiAoYXdhaXQgcmVhZGRpcihcIi4vc3JjL2NvdXJzZXMvdGVzdC9jaGFsbGVuZ2VzXCIpKS5tYXAoXG4gICAgICAgICAgKGZuYW1lKSA9PiBmbmFtZS5zcGxpdChcIi5cIilbMF1cbiAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgTmF2QmFyIGZyb20gXCIuLi9jb21wb25lbnRzL05hdkJhclwiXG4gIGltcG9ydCBNYXNjb3QgZnJvbSBcIi4uL2NvbXBvbmVudHMvTWFzY290XCJcbiAgaW1wb3J0IFR3aXR0ZXJCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvVHdpdHRlckJ1dHRvblwiXG4gIGltcG9ydCBHaXRIdWJCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvR2l0SHViQnV0dG9uXCJcbiAgaW1wb3J0IENvbHVtbiBmcm9tIFwibGx1aXMvQ29sdW1uXCJcbiAgaW1wb3J0IENvbHVtbnMgZnJvbSBcImxsdWlzL0NvbHVtbnNcIlxuXG4gIGV4cG9ydCBsZXQgdGVzdFNraWxscyA9IFtdXG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+TGlicmVMaW5nbyAtIERldmVsb3BtZW50PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxOYXZCYXIgZGFyayAvPlxuXG48c2VjdGlvbiBjbGFzcz1cInNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICA8aDEgY2xhc3M9XCJpcy1zaXplLTFcIj5EZXZlbG9wbWVudCB0b29sczwvaDE+XG4gICAgICA8aDIgY2xhc3M9XCJpcy1zaXplLTJcIj5UZXN0IHBhZ2VzPC9oMj5cbiAgICAgIDx1bD5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIGhyZWY9XCIvY291cnNlL3Rlc3RcIj5UZXN0IGNvdXJzZTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgeyNlYWNoIHRlc3RTa2lsbHMgYXMgdGVzdFNraWxsfVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIvY291cnNlL3Rlc3Qvc2tpbGwve3Rlc3RTa2lsbH1cIj5cbiAgICAgICAgICAgICAgVGVzdCBza2lsbDpcbiAgICAgICAgICAgICAgPGI+e3Rlc3RTa2lsbH08L2I+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgey9lYWNofVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG4iXSwic291cmNlUm9vdCI6IiJ9