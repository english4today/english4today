(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sign$45up$45success"],{

/***/ "./src/db/db.js":
/*!**********************!*\
  !*** ./src/db/db.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _getUserDbName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getUserDbName */ "./src/db/getUserDbName.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ "../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);




let db
let remoteDB
let syncHandler

const createLocalPouchDb = (dbName) => {
    const PouchDB =
    process.env.JEST_WORKER_ID !== undefined
        ? __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js")
        : __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js").default
    const newDb = new PouchDB(dbName).setMaxListeners(
        _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.maxNumberOfListeners
    )

    newDb
        .changes({
            since: "now",
            live: true,
            include_docs: true,
        })
        .on("change", () => {
            if (process.env.JEST_WORKER_ID !== undefined) {
                return
            }
            const authStore = __webpack_require__(/*! ../auth */ "./src/auth.js").default
            authStore.update((value) => ({
                ...value,
                dbUpdatedAt: Date.now(),
            }))
        })

    return newDb
}

if (true) {
    const authStore = __webpack_require__(/*! ../auth */ "./src/auth.js").default
    const PouchDB = __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js").default

    // Connect to remote database
    remoteDB = new PouchDB(
        `${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/${js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb")}`,
        { skip_setup: true, live: true }
    )

    // Connect to local database
    db = createLocalPouchDb(_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.local)
    window._DB = db

    // Detect fake user session
    if (js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb") === Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])("---fakeUser")) {
        authStore.update((value) => ({
            ...value,
            user: { name: "---fakeUser" },
            online: true,
        }))
    }

    // Detect existing user session
    if (js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb") && _settings__WEBPACK_IMPORTED_MODULE_0__["default"].features.authEnabled) {
        fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, { credentials: "include" })
            .then((data) => data.json())
            .then((user) => {
                if (user.userCtx.name === null) {
                    return
                }
                authStore.update((value) => ({
                    ...value,
                    user: { name: user.userCtx.name },
                }))
                startSync()
            })
    } else {
    // Without a sessios, there is no sync
        authStore.update((value) => ({
            ...value,
            online: false,
        }))
    }

    // Fake login for testing purposes
    window._fakeLogin = () => {
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set("loginDb", Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])("---fakeUser"), {
            expires: _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.auth.expireDays,
        })
        window.location.href = "/course/spanish-from-english/"
    }

    // Add login function
    window._Login = async (username, password) => {
        if (window._test_credentials_correct === false) {
            throw new Error("Incorrect username or password")
        }

        if (window._test_credentials_correct === true) {
            return window._fakeLogin()
        }

        const response = await (
            await fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
        ).json()

        if (response.error) {
            if (response.error === "unauthorized") {
                throw new Error("Username or password is incorrect")
            }
            throw new Error("Couldn't log in. Please try again later")
        }

        authStore.update((value) => ({
            ...value,
            online: null,
        }))
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set("loginDb", Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])(username), {
            expires: _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.auth.expireDays,
        })
        window.location.reload(false)
        window.location.href = "/course/spanish-from-english/"
    }

    // Logout
    window._Logout = async () => {
        try {
            if (syncHandler) {
                await syncHandler.cancel()
                await fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, {
                    method: "delete",
                })
            }
        } finally {
            js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.remove("loginDb")
            authStore.update((value) => ({
                ...value,
                user: null,
                online: null,
            }))
            await db.destroy()
            window.location.reload(false)
        }
    }

    // Keep databases in sync
    const startSync = () => {
        syncHandler = db
            .sync(remoteDB)
            .on("complete", function () {
                authStore.update((value) => ({ ...value, online: true }))
            })
            .on("error", function () {
                authStore.update((value) => ({ ...value, online: false }))
            })
    }
}

if (process.env.JEST_WORKER_ID !== undefined) {
    // This is a test database for Jest tests that can reset itself
    db = createLocalPouchDb(_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.local)
    db.__reset = async () => {
        const allDocs = await db.allDocs()
        await Promise.all(
            allDocs.rows.map(function (row) {
                return db.remove(row.id, row.value.rev)
            })
        )
    }
}

/* harmony default export */ __webpack_exports__["default"] = (db);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "./src/db/getUserDbName.js":
/*!*********************************!*\
  !*** ./src/db/getUserDbName.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const hashUsername = (username) =>
    username
        .split("")
        .map((c) => c.charCodeAt(0).toString(16))
        .join("")

/* harmony default export */ __webpack_exports__["default"] = ((username) => `userdb-${hashUsername(username)}`);


/***/ }),

/***/ "./src/routes/sign-up-success.svelte":
/*!*******************************************!*\
  !*** ./src/routes/sign-up-success.svelte ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _db_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/db.js */ "./src/db/db.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hotkeys-js */ "../../node_modules/hotkeys-js/dist/hotkeys.esm.js");
/* harmony import */ var _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/NavBar.svelte */ "./src/components/NavBar.svelte");
/* harmony import */ var lluis_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lluis/Button */ "../lluis/Button.svelte");
/* src/routes/sign-up-success.svelte generated by Svelte v3.25.0 */







const file = "src/routes/sign-up-success.svelte";

// (15:4) <Button href="/login">
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Log in");
		},
		l: function claim(nodes) {
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "Log in");
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(15:4) <Button href=\\\"/login\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let navbar;
	let t0;
	let section;
	let div;
	let h2;
	let t1;
	let t2;
	let p;
	let t3;
	let t4;
	let button;
	let current;
	navbar = new _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({ props: { dark: true }, $$inline: true });

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				href: "/login",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(navbar.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Registration successsful!");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("You can now log in.");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(navbar.$$.fragment, nodes);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, "Registration successsful!");
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "P", {});
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, "You can now log in.");
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "is-size-2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 12, 4, 281);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 13, 4, 338);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 11, 2, 253);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 10, 0, 225);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(navbar, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, div, null);
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(navbar, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
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
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Sign_up_success", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sign_up_success> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ db: _db_db_js__WEBPACK_IMPORTED_MODULE_1__["default"], onMount: svelte__WEBPACK_IMPORTED_MODULE_2__["onMount"], hotkeys: hotkeys_js__WEBPACK_IMPORTED_MODULE_3__["default"], NavBar: _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_4__["default"], Button: lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"] });
	return [];
}

class Sign_up_success extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Sign_up_success",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Sign_up_success);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** ./nextTick (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGIvZGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL2dldFVzZXJEYk5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9zaWduLXVwLXN1Y2Nlc3Muc3ZlbHRlIiwid2VicGFjazovLy8uL25leHRUaWNrIChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrQztBQUNTO0FBQ1o7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsbUVBQVM7QUFDM0IsVUFBVSxtQkFBTyxDQUFDLG1FQUFTO0FBQzNCO0FBQ0EsUUFBUSxpREFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1CQUFPLENBQUMsOEJBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQSxJQUFJLElBQXdCO0FBQzVCLHNCQUFzQixtQkFBTyxDQUFDLDhCQUFTO0FBQ3ZDLG9CQUFvQixtQkFBTyxDQUFDLG1FQUFTOztBQUVyQztBQUNBO0FBQ0EsV0FBVyxpREFBUSxpQkFBaUIsR0FBRyxnREFBTyxnQkFBZ0I7QUFDOUQsU0FBUztBQUNUOztBQUVBO0FBQ0EsNEJBQTRCLGlEQUFRO0FBQ3BDOztBQUVBO0FBQ0EsUUFBUSxnREFBTyxvQkFBb0IsOERBQWE7QUFDaEQ7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxRQUFRLGdEQUFPLG1CQUFtQixpREFBUTtBQUMxQyxpQkFBaUIsaURBQVEsaUJBQWlCLGFBQWEseUJBQXlCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRCxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxRQUFRLGdEQUFPLGdCQUFnQiw4REFBYTtBQUM1QyxxQkFBcUIsaURBQVE7QUFDN0IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsaURBQVEsaUJBQWlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRLGdEQUFPLGdCQUFnQiw4REFBYTtBQUM1QyxxQkFBcUIsaURBQVE7QUFDN0IsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGlEQUFRLGlCQUFpQjtBQUN4RDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxZQUFZLGdEQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMseUJBQXlCO0FBQ3ZFLGFBQWE7QUFDYjtBQUNBLDhDQUE4QywwQkFBMEI7QUFDeEUsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixpREFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSxpRUFBRTs7Ozs7Ozs7Ozs7Ozs7QUNuTGpCO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx1RkFBd0IsdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGpDO0FBQ0k7QUFDQTtBQUNnQjtBQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xuQyxlIiwiZmlsZSI6ImFlYmU5ZjBmMmYxMDg2NWJmNGJkL3NpZ24kNDV1cCQ0NXN1Y2Nlc3Muc2lnbiQ0NXVwJDQ1c3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXR0aW5ncyBmcm9tIFwiLi4vc2V0dGluZ3NcIlxuaW1wb3J0IGdldFVzZXJEYk5hbWUgZnJvbSBcIi4vZ2V0VXNlckRiTmFtZVwiXG5pbXBvcnQgQ29va2llcyBmcm9tIFwianMtY29va2llXCJcblxubGV0IGRiXG5sZXQgcmVtb3RlREJcbmxldCBzeW5jSGFuZGxlclxuXG5jb25zdCBjcmVhdGVMb2NhbFBvdWNoRGIgPSAoZGJOYW1lKSA9PiB7XG4gICAgY29uc3QgUG91Y2hEQiA9XG4gICAgcHJvY2Vzcy5lbnYuSkVTVF9XT1JLRVJfSUQgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHJlcXVpcmUoXCJwb3VjaGRiXCIpXG4gICAgICAgIDogcmVxdWlyZShcInBvdWNoZGJcIikuZGVmYXVsdFxuICAgIGNvbnN0IG5ld0RiID0gbmV3IFBvdWNoREIoZGJOYW1lKS5zZXRNYXhMaXN0ZW5lcnMoXG4gICAgICAgIHNldHRpbmdzLmRhdGFiYXNlLm1heE51bWJlck9mTGlzdGVuZXJzXG4gICAgKVxuXG4gICAgbmV3RGJcbiAgICAgICAgLmNoYW5nZXMoe1xuICAgICAgICAgICAgc2luY2U6IFwibm93XCIsXG4gICAgICAgICAgICBsaXZlOiB0cnVlLFxuICAgICAgICAgICAgaW5jbHVkZV9kb2NzOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAub24oXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkpFU1RfV09SS0VSX0lEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGF1dGhTdG9yZSA9IHJlcXVpcmUoXCIuLi9hdXRoXCIpLmRlZmF1bHRcbiAgICAgICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRiVXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4gbmV3RGJcbn1cblxuaWYgKHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IGF1dGhTdG9yZSA9IHJlcXVpcmUoXCIuLi9hdXRoXCIpLmRlZmF1bHRcbiAgICBjb25zdCBQb3VjaERCID0gcmVxdWlyZShcInBvdWNoZGJcIikuZGVmYXVsdFxuXG4gICAgLy8gQ29ubmVjdCB0byByZW1vdGUgZGF0YWJhc2VcbiAgICByZW1vdGVEQiA9IG5ldyBQb3VjaERCKFxuICAgICAgICBgJHtzZXR0aW5ncy5kYXRhYmFzZS5yZW1vdGV9LyR7Q29va2llcy5nZXQoXCJsb2dpbkRiXCIpfWAsXG4gICAgICAgIHsgc2tpcF9zZXR1cDogdHJ1ZSwgbGl2ZTogdHJ1ZSB9XG4gICAgKVxuXG4gICAgLy8gQ29ubmVjdCB0byBsb2NhbCBkYXRhYmFzZVxuICAgIGRiID0gY3JlYXRlTG9jYWxQb3VjaERiKHNldHRpbmdzLmRhdGFiYXNlLmxvY2FsKVxuICAgIHdpbmRvdy5fREIgPSBkYlxuXG4gICAgLy8gRGV0ZWN0IGZha2UgdXNlciBzZXNzaW9uXG4gICAgaWYgKENvb2tpZXMuZ2V0KFwibG9naW5EYlwiKSA9PT0gZ2V0VXNlckRiTmFtZShcIi0tLWZha2VVc2VyXCIpKSB7XG4gICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoe1xuICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICB1c2VyOiB7IG5hbWU6IFwiLS0tZmFrZVVzZXJcIiB9LFxuICAgICAgICAgICAgb25saW5lOiB0cnVlLFxuICAgICAgICB9KSlcbiAgICB9XG5cbiAgICAvLyBEZXRlY3QgZXhpc3RpbmcgdXNlciBzZXNzaW9uXG4gICAgaWYgKENvb2tpZXMuZ2V0KFwibG9naW5EYlwiKSAmJiBzZXR0aW5ncy5mZWF0dXJlcy5hdXRoRW5hYmxlZCkge1xuICAgICAgICBmZXRjaChgJHtzZXR0aW5ncy5kYXRhYmFzZS5yZW1vdGV9L19zZXNzaW9uYCwgeyBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIudXNlckN0eC5uYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHsgbmFtZTogdXNlci51c2VyQ3R4Lm5hbWUgfSxcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICBzdGFydFN5bmMoKVxuICAgICAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgIC8vIFdpdGhvdXQgYSBzZXNzaW9zLCB0aGVyZSBpcyBubyBzeW5jXG4gICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoe1xuICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICBvbmxpbmU6IGZhbHNlLFxuICAgICAgICB9KSlcbiAgICB9XG5cbiAgICAvLyBGYWtlIGxvZ2luIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgd2luZG93Ll9mYWtlTG9naW4gPSAoKSA9PiB7XG4gICAgICAgIENvb2tpZXMuc2V0KFwibG9naW5EYlwiLCBnZXRVc2VyRGJOYW1lKFwiLS0tZmFrZVVzZXJcIiksIHtcbiAgICAgICAgICAgIGV4cGlyZXM6IHNldHRpbmdzLmRhdGFiYXNlLmF1dGguZXhwaXJlRGF5cyxcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb3Vyc2Uvc3BhbmlzaC1mcm9tLWVuZ2xpc2gvXCJcbiAgICB9XG5cbiAgICAvLyBBZGQgbG9naW4gZnVuY3Rpb25cbiAgICB3aW5kb3cuX0xvZ2luID0gYXN5bmMgKHVzZXJuYW1lLCBwYXNzd29yZCkgPT4ge1xuICAgICAgICBpZiAod2luZG93Ll90ZXN0X2NyZWRlbnRpYWxzX2NvcnJlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuX3Rlc3RfY3JlZGVudGlhbHNfY29ycmVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fZmFrZUxvZ2luKClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgZmV0Y2goYCR7c2V0dGluZ3MuZGF0YWJhc2UucmVtb3RlfS9fc2Vzc2lvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmpzb24oKVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yID09PSBcInVuYXV0aG9yaXplZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBsb2cgaW4uIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXJcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoe1xuICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICBvbmxpbmU6IG51bGwsXG4gICAgICAgIH0pKVxuICAgICAgICBDb29raWVzLnNldChcImxvZ2luRGJcIiwgZ2V0VXNlckRiTmFtZSh1c2VybmFtZSksIHtcbiAgICAgICAgICAgIGV4cGlyZXM6IHNldHRpbmdzLmRhdGFiYXNlLmF1dGguZXhwaXJlRGF5cyxcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZChmYWxzZSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb3Vyc2Uvc3BhbmlzaC1mcm9tLWVuZ2xpc2gvXCJcbiAgICB9XG5cbiAgICAvLyBMb2dvdXRcbiAgICB3aW5kb3cuX0xvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzeW5jSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHN5bmNIYW5kbGVyLmNhbmNlbCgpXG4gICAgICAgICAgICAgICAgYXdhaXQgZmV0Y2goYCR7c2V0dGluZ3MuZGF0YWJhc2UucmVtb3RlfS9fc2Vzc2lvbmAsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBDb29raWVzLnJlbW92ZShcImxvZ2luRGJcIilcbiAgICAgICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgICAgIHVzZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgb25saW5lOiBudWxsLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBhd2FpdCBkYi5kZXN0cm95KClcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZWVwIGRhdGFiYXNlcyBpbiBzeW5jXG4gICAgY29uc3Qgc3RhcnRTeW5jID0gKCkgPT4ge1xuICAgICAgICBzeW5jSGFuZGxlciA9IGRiXG4gICAgICAgICAgICAuc3luYyhyZW1vdGVEQilcbiAgICAgICAgICAgIC5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHsgLi4udmFsdWUsIG9ubGluZTogdHJ1ZSB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXV0aFN0b3JlLnVwZGF0ZSgodmFsdWUpID0+ICh7IC4uLnZhbHVlLCBvbmxpbmU6IGZhbHNlIH0pKVxuICAgICAgICAgICAgfSlcbiAgICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5KRVNUX1dPUktFUl9JRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gVGhpcyBpcyBhIHRlc3QgZGF0YWJhc2UgZm9yIEplc3QgdGVzdHMgdGhhdCBjYW4gcmVzZXQgaXRzZWxmXG4gICAgZGIgPSBjcmVhdGVMb2NhbFBvdWNoRGIoc2V0dGluZ3MuZGF0YWJhc2UubG9jYWwpXG4gICAgZGIuX19yZXNldCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsRG9jcyA9IGF3YWl0IGRiLmFsbERvY3MoKVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIGFsbERvY3Mucm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYi5yZW1vdmUocm93LmlkLCByb3cudmFsdWUucmV2KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGJcbiIsImNvbnN0IGhhc2hVc2VybmFtZSA9ICh1c2VybmFtZSkgPT5cbiAgICB1c2VybmFtZVxuICAgICAgICAuc3BsaXQoXCJcIilcbiAgICAgICAgLm1hcCgoYykgPT4gYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSlcbiAgICAgICAgLmpvaW4oXCJcIilcblxuZXhwb3J0IGRlZmF1bHQgKHVzZXJuYW1lKSA9PiBgdXNlcmRiLSR7aGFzaFVzZXJuYW1lKHVzZXJuYW1lKX1gXG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgZGIgZnJvbSBcIi4uL2RiL2RiLmpzXCJcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIlxuICBpbXBvcnQgaG90a2V5cyBmcm9tIFwiaG90a2V5cy1qc1wiXG4gIGltcG9ydCBOYXZCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2QmFyLnN2ZWx0ZVwiXG4gIGltcG9ydCBCdXR0b24gZnJvbSBcImxsdWlzL0J1dHRvblwiXG48L3NjcmlwdD5cblxuPE5hdkJhciBkYXJrIC8+XG5cbjxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGgyIGNsYXNzPVwiaXMtc2l6ZS0yXCI+UmVnaXN0cmF0aW9uIHN1Y2Nlc3NzZnVsITwvaDI+XG4gICAgPHA+WW91IGNhbiBub3cgbG9nIGluLjwvcD5cbiAgICA8QnV0dG9uIGhyZWY9XCIvbG9naW5cIj5Mb2cgaW48L0J1dHRvbj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9