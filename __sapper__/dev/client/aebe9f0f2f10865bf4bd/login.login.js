(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

/***/ "./src/routes/login.svelte":
/*!*********************************!*\
  !*** ./src/routes/login.svelte ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _db_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/db.js */ "./src/db/db.js");
/* harmony import */ var _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/NavBar.svelte */ "./src/components/NavBar.svelte");
/* harmony import */ var lluis_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lluis/Button */ "../lluis/Button.svelte");
/* harmony import */ var lluis_FormField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lluis/FormField */ "../lluis/FormField.svelte");
/* src/routes/login.svelte generated by Svelte v3.25.0 */






const file = "src/routes/login.svelte";

// (46:6) {#if error !== null}
function create_if_block(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*error*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "P", { class: true });
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, /*error*/ ctx[0]);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(p, "class", "help is-danger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 46, 8, 905);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, /*error*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(p);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(46:6) {#if error !== null}",
		ctx
	});

	return block;
}

// (50:6) <Button on:click="{handleLogin}" submit>
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
		source: "(50:6) <Button on:click=\\\"{handleLogin}\\\" submit>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let navbar;
	let t1;
	let section;
	let div;
	let form;
	let h2;
	let t2;
	let t3;
	let formfield0;
	let updating_value;
	let t4;
	let formfield1;
	let updating_value_1;
	let t5;
	let t6;
	let button;
	let current;
	let mounted;
	let dispose;
	navbar = new _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({ props: { dark: true }, $$inline: true });

	function formfield0_value_binding(value) {
		/*formfield0_value_binding*/ ctx[4].call(null, value);
	}

	let formfield0_props = {
		name: "Username",
		icon: "user",
		id: "username"
	};

	if (/*username*/ ctx[1] !== void 0) {
		formfield0_props.value = /*username*/ ctx[1];
	}

	formfield0 = new lluis_FormField__WEBPACK_IMPORTED_MODULE_4__["default"]({ props: formfield0_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(formfield0, "value", formfield0_value_binding));

	function formfield1_value_binding(value) {
		/*formfield1_value_binding*/ ctx[5].call(null, value);
	}

	let formfield1_props = {
		name: "Password",
		icon: "lock",
		id: "password",
		type: "password"
	};

	if (/*password*/ ctx[2] !== void 0) {
		formfield1_props.value = /*password*/ ctx[2];
	}

	formfield1 = new lluis_FormField__WEBPACK_IMPORTED_MODULE_4__["default"]({ props: formfield1_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(formfield1, "value", formfield1_value_binding));
	let if_block = /*error*/ ctx[0] !== null && create_if_block(ctx);

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				submit: true,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button.$on("click", /*handleLogin*/ ctx[3]);

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(navbar.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("form");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Log in");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(formfield0.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(formfield1.$$.fragment);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])("[data-svelte=\"svelte-nuxzs8\"]", document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(navbar.$$.fragment, nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "FORM", {});
			var form_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(form);
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, "Log in");
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(formfield0.$$.fragment, form_nodes);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(formfield1.$$.fragment, form_nodes);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			if (if_block) if_block.l(form_nodes);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, form_nodes);
			form_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			document.title = "Log in - LibreLingo";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "is-size-2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 30, 6, 573);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form, file, 29, 4, 519);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 27, 2, 490);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 25, 0, 461);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(navbar, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, form);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(formfield0, form, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(formfield1, form, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t5);
			if (if_block) if_block.m(form, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, form, null);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*handleLogin*/ ctx[3]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const formfield0_changes = {};

			if (!updating_value && dirty & /*username*/ 2) {
				updating_value = true;
				formfield0_changes.value = /*username*/ ctx[1];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value = false);
			}

			formfield0.$set(formfield0_changes);
			const formfield1_changes = {};

			if (!updating_value_1 && dirty & /*password*/ 4) {
				updating_value_1 = true;
				formfield1_changes.value = /*password*/ ctx[2];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value_1 = false);
			}

			formfield1.$set(formfield1_changes);

			if (/*error*/ ctx[0] !== null) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(form, t6);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			const button_changes = {};

			if (dirty & /*$$scope*/ 64) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(formfield0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(formfield1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(navbar.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(formfield0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(formfield1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(navbar, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(formfield0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(formfield1);
			if (if_block) if_block.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
			mounted = false;
			dispose();
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
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Login", slots, []);
	let error = null;
	let username = "";
	let password = "";

	const handleLogin = async () => {
		try {
			await window._Login(username, password);
		} catch(e) {
			$$invalidate(0, error = e);
		}
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Login> was created with unknown prop '${key}'`);
	});

	function formfield0_value_binding(value) {
		username = value;
		$$invalidate(1, username);
	}

	function formfield1_value_binding(value) {
		password = value;
		$$invalidate(2, password);
	}

	$$self.$capture_state = () => ({
		db: _db_db_js__WEBPACK_IMPORTED_MODULE_1__["default"],
		NavBar: _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Button: lluis_Button__WEBPACK_IMPORTED_MODULE_3__["default"],
		FormField: lluis_FormField__WEBPACK_IMPORTED_MODULE_4__["default"],
		error,
		username,
		password,
		handleLogin
	});

	$$self.$inject_state = $$props => {
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("username" in $$props) $$invalidate(1, username = $$props.username);
		if ("password" in $$props) $$invalidate(2, password = $$props.password);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		error,
		username,
		password,
		handleLogin,
		formfield0_value_binding,
		formfield1_value_binding
	];
}

class Login extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Login",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2xvZ2luLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQzhCO0FBQ29CO0FBQ2Y7QUFDTTs7Ozs7Ozs7Ozs7OEVBMENOLEdBQUs7Ozs7Ozs2RkFBTCxHQUFLOzs7Ozs7Ozs7Ozs7OzhHQUFMLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFWbkIsR0FBUTt3Q0FBUixHQUFROzs7Ozs7Ozs7Ozs7Ozs7OztrQkFPUixHQUFRO3dDQUFSLEdBQVE7Ozs7OzBCQUVsQixHQUFLLFFBQUssSUFBSTs7Ozs7Ozs7Ozs7cUNBSUEsR0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lMQXBCQyxHQUFXOzs7Ozs7Ozs7NENBTzNCLEdBQVE7Ozs7Ozs7Ozs0Q0FPUixHQUFROzs7Ozs7aUJBRWxCLEdBQUssUUFBSyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdkNuQixLQUFLLEdBQUcsSUFBSTtLQUNaLFFBQVEsR0FBRyxFQUFFO0tBQ2IsUUFBUSxHQUFHLEVBQUU7O09BRVgsV0FBVzs7U0FFUCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRO1VBQy9CLENBQUM7bUJBQ1IsS0FBSyxHQUFHLENBQUM7Ozs7Ozs7Ozs7O0VBc0JNLFFBQVE7Ozs7O0VBT1IsUUFBUSIsImZpbGUiOiJhZWJlOWYwZjJmMTA4NjViZjRiZC9sb2dpbi5sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCBkYiBmcm9tIFwiLi4vZGIvZGIuanNcIlxuICBpbXBvcnQgTmF2QmFyIGZyb20gXCIuLi9jb21wb25lbnRzL05hdkJhci5zdmVsdGVcIlxuICBpbXBvcnQgQnV0dG9uIGZyb20gXCJsbHVpcy9CdXR0b25cIlxuICBpbXBvcnQgRm9ybUZpZWxkIGZyb20gXCJsbHVpcy9Gb3JtRmllbGRcIlxuXG4gIGxldCBlcnJvciA9IG51bGxcbiAgbGV0IHVzZXJuYW1lID0gXCJcIlxuICBsZXQgcGFzc3dvcmQgPSBcIlwiXG5cbiAgY29uc3QgaGFuZGxlTG9naW4gPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdpbmRvdy5fTG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVycm9yID0gZVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPkxvZyBpbiAtIExpYnJlTGluZ288L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPE5hdkJhciBkYXJrIC8+XG5cbjxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cblxuICAgIDxmb3JtIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD1cIntoYW5kbGVMb2dpbn1cIj5cbiAgICAgIDxoMiBjbGFzcz1cImlzLXNpemUtMlwiPkxvZyBpbjwvaDI+XG5cbiAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgbmFtZT1cIlVzZXJuYW1lXCJcbiAgICAgICAgaWNvbj1cInVzZXJcIlxuICAgICAgICBpZD1cInVzZXJuYW1lXCJcbiAgICAgICAgYmluZDp2YWx1ZT1cInt1c2VybmFtZX1cIiAvPlxuXG4gICAgICA8Rm9ybUZpZWxkXG4gICAgICAgIG5hbWU9XCJQYXNzd29yZFwiXG4gICAgICAgIGljb249XCJsb2NrXCJcbiAgICAgICAgaWQ9XCJwYXNzd29yZFwiXG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgIGJpbmQ6dmFsdWU9XCJ7cGFzc3dvcmR9XCIgLz5cblxuICAgICAgeyNpZiBlcnJvciAhPT0gbnVsbH1cbiAgICAgICAgPHAgY2xhc3M9XCJoZWxwIGlzLWRhbmdlclwiPntlcnJvcn08L3A+XG4gICAgICB7L2lmfVxuXG4gICAgICA8QnV0dG9uIG9uOmNsaWNrPVwie2hhbmRsZUxvZ2lufVwiIHN1Ym1pdD5Mb2cgaW48L0J1dHRvbj5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuXG48L3NlY3Rpb24+XG4iXSwic291cmNlUm9vdCI6IiJ9