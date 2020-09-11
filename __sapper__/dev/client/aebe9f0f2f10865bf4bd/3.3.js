(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "../../node_modules/hast-util-embedded/index.js":
/*!*************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-embedded/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var is = __webpack_require__(/*! hast-util-is-element */ "../../node_modules/hast-util-is-element/index.js")

module.exports = embedded

var names = [
  'audio',
  'canvas',
  'embed',
  'iframe',
  'img',
  'math',
  'object',
  'picture',
  'svg',
  'video'
]

function embedded(node) {
  return is(node, names)
}


/***/ }),

/***/ "../../node_modules/hast-util-has-property/index.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-has-property/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var own = {}.hasOwnProperty

module.exports = hasProperty

// Check if `node` has a set `name` property.
function hasProperty(node, name) {
  var props
  var value

  if (!node || !name || typeof node !== 'object' || node.type !== 'element') {
    return false
  }

  props = node.properties
  value = props && own.call(props, name) && props[name]

  return value !== null && value !== undefined && value !== false
}


/***/ }),

/***/ "../../node_modules/hast-util-is-body-ok-link/index.js":
/*!********************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-is-body-ok-link/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview
 *   Check if a `link` element is “Body OK”.
 * @longdescription
 *   ## Use
 *
 *   ```js
 *   var h = require('hastscript')
 *   var ok = require('hast-util-is-body-ok-link')
 *
 *   ok(h('link', {itemProp: 'foo'})) //=> true
 *   ok(h('link', {rel: ['stylesheet'], href: 'index.css'})) //=> true
 *   ok(h('link', {rel: ['author'], href: 'index.css'})) //=> false
 *   ```
 *
 *   ## API
 *
 *   ### `isBodyOkLink(node)`
 *
 *   * Return `true` for `link` elements with an `itemProp`
 *   * Return `true` for `link` elements with a `rel` list where one or more
 *     entries are `pingback`, `prefetch`, or `stylesheet`.
 */



var is = __webpack_require__(/*! hast-util-is-element */ "../../node_modules/hast-util-is-element/index.js")
var has = __webpack_require__(/*! hast-util-has-property */ "../../node_modules/hast-util-has-property/index.js")

module.exports = ok

var list = ['pingback', 'prefetch', 'stylesheet']

function ok(node) {
  var length
  var index
  var rel

  if (!is(node, 'link')) {
    return false
  }

  if (has(node, 'itemProp')) {
    return true
  }

  rel = (node.properties || {}).rel || []
  length = rel.length
  index = -1

  if (rel.length === 0) {
    return false
  }

  while (++index < length) {
    if (list.indexOf(rel[index]) === -1) {
      return false
    }
  }

  return true
}


/***/ }),

/***/ "../../node_modules/hast-util-is-element/index.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-is-element/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isElement

// Check if if `node` is an `element` and, if `tagNames` is given, `node`
// matches them `tagNames`.
function isElement(node, tagNames) {
  var name

  if (
    !(
      tagNames === null ||
      tagNames === undefined ||
      typeof tagNames === 'string' ||
      (typeof tagNames === 'object' && tagNames.length !== 0)
    )
  ) {
    throw new Error(
      'Expected `string` or `Array.<string>` for `tagNames`, not `' +
        tagNames +
        '`'
    )
  }

  if (
    !node ||
    typeof node !== 'object' ||
    node.type !== 'element' ||
    typeof node.tagName !== 'string'
  ) {
    return false
  }

  if (tagNames === null || tagNames === undefined) {
    return true
  }

  name = node.tagName

  if (typeof tagNames === 'string') {
    return name === tagNames
  }

  return tagNames.indexOf(name) !== -1
}


/***/ }),

/***/ "../../node_modules/hast-util-phrasing/index.js":
/*!*************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-phrasing/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(/*! hast-util-is-element */ "../../node_modules/hast-util-is-element/index.js")
var has = __webpack_require__(/*! hast-util-has-property */ "../../node_modules/hast-util-has-property/index.js")
var embedded = __webpack_require__(/*! hast-util-embedded */ "../../node_modules/hast-util-embedded/index.js")
var bodyOKLink = __webpack_require__(/*! hast-util-is-body-ok-link */ "../../node_modules/hast-util-is-body-ok-link/index.js")

module.exports = phrasing

var list = [
  'a',
  'abbr',
  // `area` is in fact only phrasing if it is inside a `map` element.
  // However, since `area`s are required to be inside a `map` element, and it’s
  // a rather involved check, it’s ignored here for now.
  'area',
  'b',
  'bdi',
  'bdo',
  'br',
  'button',
  'cite',
  'code',
  'data',
  'datalist',
  'del',
  'dfn',
  'em',
  'i',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'map',
  'mark',
  'meter',
  'noscript',
  'output',
  'progress',
  'q',
  'ruby',
  's',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'template',
  'textarea',
  'time',
  'u',
  'var',
  'wbr'
]

function phrasing(node) {
  return (
    node.type === 'text' ||
    is(node, list) ||
    embedded(node) ||
    bodyOKLink(node) ||
    (is(node, 'meta') && has(node, 'itemProp'))
  )
}


/***/ }),

/***/ "../../node_modules/hast-util-whitespace/index.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/hast-util-whitespace/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = interElementWhiteSpace

// HTML white-space expression.
// See <https://html.spec.whatwg.org/#space-character>.
var re = /[ \t\n\f\r]/g

function interElementWhiteSpace(node) {
  var value

  if (node && typeof node === 'object' && node.type === 'text') {
    value = node.value || ''
  } else if (typeof node === 'string') {
    value = node
  } else {
    return false
  }

  return value.replace(re, '') === ''
}


/***/ }),

/***/ "../../node_modules/html-whitespace-sensitive-tag-names/index.json":
/*!********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/html-whitespace-sensitive-tag-names/index.json ***!
  \********************************************************************************************************************/
/*! exports provided: 0, 1, 2, 3, default */
/***/ (function(module) {

module.exports = JSON.parse("[\"script\",\"style\",\"pre\",\"textarea\"]");

/***/ }),

/***/ "../../node_modules/rehype-format/index.js":
/*!********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/rehype-format/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var minify = __webpack_require__(/*! rehype-minify-whitespace */ "../../node_modules/rehype-minify-whitespace/index.js")({newlines: true})
var visit = __webpack_require__(/*! unist-util-visit-parents */ "../../node_modules/unist-util-visit-parents/index.js")
var embedded = __webpack_require__(/*! hast-util-embedded */ "../../node_modules/hast-util-embedded/index.js")
var phrasing = __webpack_require__(/*! hast-util-phrasing */ "../../node_modules/hast-util-phrasing/index.js")
var whitespace = __webpack_require__(/*! hast-util-whitespace */ "../../node_modules/hast-util-whitespace/index.js")
var is = __webpack_require__(/*! hast-util-is-element */ "../../node_modules/hast-util-is-element/index.js")
var sensitive = __webpack_require__(/*! html-whitespace-sensitive-tag-names */ "../../node_modules/html-whitespace-sensitive-tag-names/index.json")
var repeat = __webpack_require__(/*! repeat-string */ "../../node_modules/repeat-string/index.js")

module.exports = format

var double = '\n\n'
var single = '\n'
var space = ' '
var re = / *\n/g

function format(options) {
  var settings = options || {}
  var indent = settings.indent || 2
  var indentInitial = settings.indentInitial
  var blanks = settings.blanks || []

  if (typeof indent === 'number') {
    indent = repeat(space, indent)
  }

  // Default to indenting the initial level.
  if (indentInitial === null || indentInitial === undefined) {
    indentInitial = true
  }

  return transform

  function transform(tree) {
    var head = false

    minify(tree)

    visit(tree, visitor)

    function visitor(node, parents) {
      var children = node.children || []
      var length = children.length
      var level = parents.length
      var index = -1
      var result
      var previous
      var child
      var newline

      if (is(node, 'head')) {
        head = true
      }

      if (head && is(node, 'body')) {
        head = false
      }

      if (is(node, sensitive)) {
        return visit.SKIP
      }

      // Don’t indent content of whitespace-sensitive nodes / inlines.
      if (!length || !padding(node, head)) {
        return
      }

      if (!indentInitial) {
        level--
      }

      // Indent newlines in `text`.
      while (++index < length) {
        child = children[index]

        if (child.type === 'text' || child.type === 'comment') {
          if (child.value.indexOf('\n') !== -1) {
            newline = true
          }

          child.value = child.value.replace(re, '$&' + repeat(indent, level))
        }
      }

      result = []
      index = -1

      while (++index < length) {
        child = children[index]

        if (padding(child, head) || (newline && index === 0)) {
          addBreak(result, level, child)
          newline = true
        }

        previous = child
        result.push(child)
      }

      if (newline || padding(previous, head)) {
        // Ignore trailing whitespace (if that already existed), as we’ll add
        // properly indented whitespace.
        if (whitespace(previous)) {
          result.pop()
          previous = result[result.length - 1]
        }

        addBreak(result, level - 1)
        newline = true
      }

      node.children = result
    }
  }

  function blank(node) {
    return (
      node &&
      node.type === 'element' &&
      blanks.length !== 0 &&
      blanks.indexOf(node.tagName) !== -1
    )
  }

  function addBreak(list, level, next) {
    var tail = list[list.length - 1]
    var previous = whitespace(tail) ? list[list.length - 2] : tail
    var replace =
      (blank(previous) && blank(next) ? double : single) + repeat(indent, level)

    if (tail && tail.type === 'text') {
      if (whitespace(tail)) {
        tail.value = replace
      } else {
        tail.value += replace
      }
    } else {
      list.push({type: 'text', value: replace})
    }
  }
}

function padding(node, head) {
  if (node.type === 'root') {
    return true
  }

  if (node.type === 'element') {
    return head || is(node, 'script') || embedded(node) || !phrasing(node)
  }

  return false
}


/***/ }),

/***/ "../../node_modules/rehype-minify-whitespace/block.js":
/*!*******************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/rehype-minify-whitespace/block.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
module.exports = [
  // Contribute whitespace intrinsically.
  'br',
  'wbr',
  // Similar to block.
  'li',
  'table',
  'caption',
  'colgroup',
  'col',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'td',
  'th',
  'summary',
  'optgroup',
  'option',
  // Page
  'html',
  'head',
  'body',
  // Flow content
  'address',
  'blockquote',
  'center', // Legacy
  'dialog',
  'div',
  'figure',
  'figcaption',
  'footer',
  'form',
  'header',
  'hr',
  'legend',
  'listing', // Legacy
  'main',
  'p',
  'plaintext', // Legacy
  'pre',
  'xmp', // Legacy
  // Sections and headings
  'article',
  'aside',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hgroup',
  'nav',
  'section',
  // Lists
  'dir', // Legacy
  'dd',
  'dl',
  'dt',
  'menu',
  'ol',
  'ul',
  // Block-like:
  'li',
  'th',
  'td'
]


/***/ }),

/***/ "../../node_modules/rehype-minify-whitespace/content.js":
/*!*********************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/rehype-minify-whitespace/content.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [
  // Form.
  'button',
  'input',
  'select',
  'textarea'
]


/***/ }),

/***/ "../../node_modules/rehype-minify-whitespace/index.js":
/*!*******************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/rehype-minify-whitespace/index.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview
 *   Collapse white-space.
 *
 *   Normally, collapses to a single space.
 *   If `newlines: true`, collapses white-space containing newlines to `'\n'`
 *   instead of `' '`.
 * @example
 *   <h1>Heading</h1>
 *   <p><strong>This</strong> and <em>that</em></p>
 */



var collapseWhiteSpace = __webpack_require__(/*! collapse-white-space */ "../../node_modules/collapse-white-space/index.js")
var is = __webpack_require__(/*! hast-util-is-element */ "../../node_modules/hast-util-is-element/index.js")
var embedded = __webpack_require__(/*! hast-util-embedded */ "../../node_modules/hast-util-embedded/index.js")
var convert = __webpack_require__(/*! unist-util-is/convert */ "../../node_modules/unist-util-is/convert.js")
var whitespace = __webpack_require__(/*! hast-util-whitespace */ "../../node_modules/hast-util-whitespace/index.js")
var blocks = __webpack_require__(/*! ./block */ "../../node_modules/rehype-minify-whitespace/block.js")
var contents = __webpack_require__(/*! ./content */ "../../node_modules/rehype-minify-whitespace/content.js")
var skippables = __webpack_require__(/*! ./skippable */ "../../node_modules/rehype-minify-whitespace/skippable.js")

module.exports = minifyWhitespace

var ignorableNode = convert(['doctype', 'comment'])
var parent = convert(['element', 'root'])
var root = convert(['root'])
var element = convert(['element'])
var text = convert(['text'])

function minifyWhitespace(options) {
  var collapse = (options || {}).newlines
    ? collapseToNewLines
    : collapseWhiteSpace

  return transform

  function transform(tree) {
    minify(tree, {collapse: collapse, whitespace: 'normal'})
  }
}

function minify(node, options) {
  var settings

  if (parent(node)) {
    settings = Object.assign({}, options)

    if (root(node) || blocklike(node)) {
      settings.before = true
      settings.after = true
    }

    settings.whitespace = inferWhiteSpace(node, options)

    return all(node, settings)
  }

  if (text(node)) {
    if (options.whitespace === 'normal') {
      return minifyText(node, options)
    }

    // Naïve collapse, but no trimming:
    if (options.whitespace === 'nowrap') {
      node.value = options.collapse(node.value)
    }

    // The `pre-wrap` or `pre` whitespace settings are neither collapsed nor
    // trimmed.
  }

  return {
    remove: false,
    ignore: ignorableNode(node),
    stripAtStart: false
  }
}

function minifyText(node, options) {
  var value = options.collapse(node.value)
  var start = 0
  var end = value.length
  var result = {remove: false, ignore: false, stripAtStart: false}

  if (options.before && removable(value.charAt(0))) {
    start++
  }

  if (start !== end && removable(value.charAt(end - 1))) {
    if (options.after) {
      end--
    } else {
      result.stripAtStart = true
    }
  }

  if (start === end) {
    result.remove = true
  } else {
    node.value = value.slice(start, end)
  }

  return result
}

function all(parent, options) {
  var before = options.before
  var after = options.after
  var children = parent.children
  var length = children.length
  var index = -1
  var result

  while (++index < length) {
    result = minify(
      children[index],
      Object.assign({}, options, {
        before: before,
        after: collapsableAfter(children, index, after)
      })
    )

    if (result.remove) {
      children.splice(index, 1)
      index--
      length--
    } else if (!result.ignore) {
      before = result.stripAtStart
    }

    // If this element, such as a `<select>` or `<img>`, contributes content
    // somehow, allow whitespace again.
    if (content(children[index])) {
      before = false
    }
  }

  return {
    remove: false,
    ignore: false,
    stripAtStart: before || after
  }
}

function collapsableAfter(nodes, index, after) {
  var length = nodes.length
  var node
  var result

  while (++index < length) {
    node = nodes[index]
    result = inferBoundary(node)

    if (result === undefined && node.children && !skippable(node)) {
      result = collapsableAfter(node.children, -1)
    }

    if (typeof result === 'boolean') {
      return result
    }
  }

  return after
}

// Infer two types of boundaries:
//
// 1. `true` — boundary for which whitespace around it does not contribute
//    anything
// 2. `false` — boundary for which whitespace around it *does* contribute
//
// No result (`undefined`) is returned if it is unknown.
function inferBoundary(node) {
  if (element(node)) {
    if (content(node)) {
      return false
    }

    if (blocklike(node)) {
      return true
    }

    // Unknown: either depends on siblings if embedded or metadata, or on
    // children.
  } else if (text(node)) {
    if (!whitespace(node)) {
      return false
    }
  } else if (!ignorableNode(node)) {
    return false
  }
}

// Infer whether a node is skippable.
function content(node) {
  return embedded(node) || is(node, contents)
}

// See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
function blocklike(node) {
  return is(node, blocks)
}

function skippable(node) {
  /* istanbul ignore next - currently only used on elements, but just to make sure. */
  var props = node.properties || {}

  return ignorableNode(node) || is(node, skippables) || props.hidden
}

function removable(character) {
  return character === ' ' || character === '\n'
}

// Collapse to spaces, or line feeds if they’re in a run.
function collapseToNewLines(value) {
  return String(value).replace(/\s+/g, replace)

  function replace($0) {
    return $0.indexOf('\n') === -1 ? ' ' : '\n'
  }
}

// We don’t support void elements here (so `nobr wbr` -> `normal` is ignored).
function inferWhiteSpace(node, options) {
  var props = node.properties || {}

  switch (node.tagName) {
    case 'listing':
    case 'plaintext':
    case 'xmp':
      return 'pre'
    case 'nobr':
      return 'nowrap'
    case 'pre':
      return props.wrap ? 'pre-wrap' : 'pre'
    case 'td':
    case 'th':
      return props.noWrap ? 'nowrap' : options.whitespace
    case 'textarea':
      return 'pre-wrap'
    default:
      return options.whitespace
  }
}


/***/ }),

/***/ "../../node_modules/rehype-minify-whitespace/skippable.js":
/*!***********************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/rehype-minify-whitespace/skippable.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [
  'area',
  'base',
  'basefont',
  'dialog',
  'datalist',
  'head',
  'link',
  'meta',
  'noembed',
  'noframes',
  'param',
  'rp',
  'script',
  'source',
  'style',
  'template',
  'track',
  'title'
]


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtZW1iZWRkZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhhcy1wcm9wZXJ0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtaXMtYm9keS1vay1saW5rL2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1pcy1lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1waHJhc2luZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtd2hpdGVzcGFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9yZWh5cGUtZm9ybWF0L2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3JlaHlwZS1taW5pZnktd2hpdGVzcGFjZS9ibG9jay5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9yZWh5cGUtbWluaWZ5LXdoaXRlc3BhY2UvY29udGVudC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9yZWh5cGUtbWluaWZ5LXdoaXRlc3BhY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvcmVoeXBlLW1pbmlmeS13aGl0ZXNwYWNlL3NraXBwYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQVk7O0FBRVosU0FBUyxtQkFBTyxDQUFDLDhFQUFzQjs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JCWTs7QUFFWixZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DLG1CQUFtQix1Q0FBdUM7QUFDMUQsbUJBQW1CLG1DQUFtQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixTQUFTLG1CQUFPLENBQUMsOEVBQXNCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyxrRkFBd0I7O0FBRTFDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZWJlOWYwZjJmMTA4NjViZjRiZC8zLjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxudmFyIGlzID0gcmVxdWlyZSgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtYmVkZGVkXG5cbnZhciBuYW1lcyA9IFtcbiAgJ2F1ZGlvJyxcbiAgJ2NhbnZhcycsXG4gICdlbWJlZCcsXG4gICdpZnJhbWUnLFxuICAnaW1nJyxcbiAgJ21hdGgnLFxuICAnb2JqZWN0JyxcbiAgJ3BpY3R1cmUnLFxuICAnc3ZnJyxcbiAgJ3ZpZGVvJ1xuXVxuXG5mdW5jdGlvbiBlbWJlZGRlZChub2RlKSB7XG4gIHJldHVybiBpcyhub2RlLCBuYW1lcylcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNQcm9wZXJ0eVxuXG4vLyBDaGVjayBpZiBgbm9kZWAgaGFzIGEgc2V0IGBuYW1lYCBwcm9wZXJ0eS5cbmZ1bmN0aW9uIGhhc1Byb3BlcnR5KG5vZGUsIG5hbWUpIHtcbiAgdmFyIHByb3BzXG4gIHZhciB2YWx1ZVxuXG4gIGlmICghbm9kZSB8fCAhbmFtZSB8fCB0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcgfHwgbm9kZS50eXBlICE9PSAnZWxlbWVudCcpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHByb3BzID0gbm9kZS5wcm9wZXJ0aWVzXG4gIHZhbHVlID0gcHJvcHMgJiYgb3duLmNhbGwocHJvcHMsIG5hbWUpICYmIHByb3BzW25hbWVdXG5cbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IGZhbHNlXG59XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqICAgQ2hlY2sgaWYgYSBgbGlua2AgZWxlbWVudCBpcyDigJxCb2R5IE9L4oCdLlxuICogQGxvbmdkZXNjcmlwdGlvblxuICogICAjIyBVc2VcbiAqXG4gKiAgIGBgYGpzXG4gKiAgIHZhciBoID0gcmVxdWlyZSgnaGFzdHNjcmlwdCcpXG4gKiAgIHZhciBvayA9IHJlcXVpcmUoJ2hhc3QtdXRpbC1pcy1ib2R5LW9rLWxpbmsnKVxuICpcbiAqICAgb2soaCgnbGluaycsIHtpdGVtUHJvcDogJ2Zvbyd9KSkgLy89PiB0cnVlXG4gKiAgIG9rKGgoJ2xpbmsnLCB7cmVsOiBbJ3N0eWxlc2hlZXQnXSwgaHJlZjogJ2luZGV4LmNzcyd9KSkgLy89PiB0cnVlXG4gKiAgIG9rKGgoJ2xpbmsnLCB7cmVsOiBbJ2F1dGhvciddLCBocmVmOiAnaW5kZXguY3NzJ30pKSAvLz0+IGZhbHNlXG4gKiAgIGBgYFxuICpcbiAqICAgIyMgQVBJXG4gKlxuICogICAjIyMgYGlzQm9keU9rTGluayhub2RlKWBcbiAqXG4gKiAgICogUmV0dXJuIGB0cnVlYCBmb3IgYGxpbmtgIGVsZW1lbnRzIHdpdGggYW4gYGl0ZW1Qcm9wYFxuICogICAqIFJldHVybiBgdHJ1ZWAgZm9yIGBsaW5rYCBlbGVtZW50cyB3aXRoIGEgYHJlbGAgbGlzdCB3aGVyZSBvbmUgb3IgbW9yZVxuICogICAgIGVudHJpZXMgYXJlIGBwaW5nYmFja2AsIGBwcmVmZXRjaGAsIG9yIGBzdHlsZXNoZWV0YC5cbiAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGlzID0gcmVxdWlyZSgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKVxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhc3QtdXRpbC1oYXMtcHJvcGVydHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9rXG5cbnZhciBsaXN0ID0gWydwaW5nYmFjaycsICdwcmVmZXRjaCcsICdzdHlsZXNoZWV0J11cblxuZnVuY3Rpb24gb2sobm9kZSkge1xuICB2YXIgbGVuZ3RoXG4gIHZhciBpbmRleFxuICB2YXIgcmVsXG5cbiAgaWYgKCFpcyhub2RlLCAnbGluaycpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAoaGFzKG5vZGUsICdpdGVtUHJvcCcpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJlbCA9IChub2RlLnByb3BlcnRpZXMgfHwge30pLnJlbCB8fCBbXVxuICBsZW5ndGggPSByZWwubGVuZ3RoXG4gIGluZGV4ID0gLTFcblxuICBpZiAocmVsLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAobGlzdC5pbmRleE9mKHJlbFtpbmRleF0pID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRWxlbWVudFxuXG4vLyBDaGVjayBpZiBpZiBgbm9kZWAgaXMgYW4gYGVsZW1lbnRgIGFuZCwgaWYgYHRhZ05hbWVzYCBpcyBnaXZlbiwgYG5vZGVgXG4vLyBtYXRjaGVzIHRoZW0gYHRhZ05hbWVzYC5cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlLCB0YWdOYW1lcykge1xuICB2YXIgbmFtZVxuXG4gIGlmIChcbiAgICAhKFxuICAgICAgdGFnTmFtZXMgPT09IG51bGwgfHxcbiAgICAgIHRhZ05hbWVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHR5cGVvZiB0YWdOYW1lcyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICh0eXBlb2YgdGFnTmFtZXMgPT09ICdvYmplY3QnICYmIHRhZ05hbWVzLmxlbmd0aCAhPT0gMClcbiAgICApXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdFeHBlY3RlZCBgc3RyaW5nYCBvciBgQXJyYXkuPHN0cmluZz5gIGZvciBgdGFnTmFtZXNgLCBub3QgYCcgK1xuICAgICAgICB0YWdOYW1lcyArXG4gICAgICAgICdgJ1xuICAgIClcbiAgfVxuXG4gIGlmIChcbiAgICAhbm9kZSB8fFxuICAgIHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fFxuICAgIG5vZGUudHlwZSAhPT0gJ2VsZW1lbnQnIHx8XG4gICAgdHlwZW9mIG5vZGUudGFnTmFtZSAhPT0gJ3N0cmluZydcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodGFnTmFtZXMgPT09IG51bGwgfHwgdGFnTmFtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBuYW1lID0gbm9kZS50YWdOYW1lXG5cbiAgaWYgKHR5cGVvZiB0YWdOYW1lcyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmFtZSA9PT0gdGFnTmFtZXNcbiAgfVxuXG4gIHJldHVybiB0YWdOYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMVxufVxuIiwidmFyIGlzID0gcmVxdWlyZSgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKVxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhc3QtdXRpbC1oYXMtcHJvcGVydHknKVxudmFyIGVtYmVkZGVkID0gcmVxdWlyZSgnaGFzdC11dGlsLWVtYmVkZGVkJylcbnZhciBib2R5T0tMaW5rID0gcmVxdWlyZSgnaGFzdC11dGlsLWlzLWJvZHktb2stbGluaycpXG5cbm1vZHVsZS5leHBvcnRzID0gcGhyYXNpbmdcblxudmFyIGxpc3QgPSBbXG4gICdhJyxcbiAgJ2FiYnInLFxuICAvLyBgYXJlYWAgaXMgaW4gZmFjdCBvbmx5IHBocmFzaW5nIGlmIGl0IGlzIGluc2lkZSBhIGBtYXBgIGVsZW1lbnQuXG4gIC8vIEhvd2V2ZXIsIHNpbmNlIGBhcmVhYHMgYXJlIHJlcXVpcmVkIHRvIGJlIGluc2lkZSBhIGBtYXBgIGVsZW1lbnQsIGFuZCBpdOKAmXNcbiAgLy8gYSByYXRoZXIgaW52b2x2ZWQgY2hlY2ssIGl04oCZcyBpZ25vcmVkIGhlcmUgZm9yIG5vdy5cbiAgJ2FyZWEnLFxuICAnYicsXG4gICdiZGknLFxuICAnYmRvJyxcbiAgJ2JyJyxcbiAgJ2J1dHRvbicsXG4gICdjaXRlJyxcbiAgJ2NvZGUnLFxuICAnZGF0YScsXG4gICdkYXRhbGlzdCcsXG4gICdkZWwnLFxuICAnZGZuJyxcbiAgJ2VtJyxcbiAgJ2knLFxuICAnaW5wdXQnLFxuICAnaW5zJyxcbiAgJ2tiZCcsXG4gICdrZXlnZW4nLFxuICAnbGFiZWwnLFxuICAnbWFwJyxcbiAgJ21hcmsnLFxuICAnbWV0ZXInLFxuICAnbm9zY3JpcHQnLFxuICAnb3V0cHV0JyxcbiAgJ3Byb2dyZXNzJyxcbiAgJ3EnLFxuICAncnVieScsXG4gICdzJyxcbiAgJ3NhbXAnLFxuICAnc2NyaXB0JyxcbiAgJ3NlbGVjdCcsXG4gICdzbWFsbCcsXG4gICdzcGFuJyxcbiAgJ3N0cm9uZycsXG4gICdzdWInLFxuICAnc3VwJyxcbiAgJ3RlbXBsYXRlJyxcbiAgJ3RleHRhcmVhJyxcbiAgJ3RpbWUnLFxuICAndScsXG4gICd2YXInLFxuICAnd2JyJ1xuXVxuXG5mdW5jdGlvbiBwaHJhc2luZyhub2RlKSB7XG4gIHJldHVybiAoXG4gICAgbm9kZS50eXBlID09PSAndGV4dCcgfHxcbiAgICBpcyhub2RlLCBsaXN0KSB8fFxuICAgIGVtYmVkZGVkKG5vZGUpIHx8XG4gICAgYm9keU9LTGluayhub2RlKSB8fFxuICAgIChpcyhub2RlLCAnbWV0YScpICYmIGhhcyhub2RlLCAnaXRlbVByb3AnKSlcbiAgKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJFbGVtZW50V2hpdGVTcGFjZVxuXG4vLyBIVE1MIHdoaXRlLXNwYWNlIGV4cHJlc3Npb24uXG4vLyBTZWUgPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3NwYWNlLWNoYXJhY3Rlcj4uXG52YXIgcmUgPSAvWyBcXHRcXG5cXGZcXHJdL2dcblxuZnVuY3Rpb24gaW50ZXJFbGVtZW50V2hpdGVTcGFjZShub2RlKSB7XG4gIHZhciB2YWx1ZVxuXG4gIGlmIChub2RlICYmIHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBub2RlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIHZhbHVlID0gbm9kZS52YWx1ZSB8fCAnJ1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gbm9kZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmUsICcnKSA9PT0gJydcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgbWluaWZ5ID0gcmVxdWlyZSgncmVoeXBlLW1pbmlmeS13aGl0ZXNwYWNlJykoe25ld2xpbmVzOiB0cnVlfSlcbnZhciB2aXNpdCA9IHJlcXVpcmUoJ3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cycpXG52YXIgZW1iZWRkZWQgPSByZXF1aXJlKCdoYXN0LXV0aWwtZW1iZWRkZWQnKVxudmFyIHBocmFzaW5nID0gcmVxdWlyZSgnaGFzdC11dGlsLXBocmFzaW5nJylcbnZhciB3aGl0ZXNwYWNlID0gcmVxdWlyZSgnaGFzdC11dGlsLXdoaXRlc3BhY2UnKVxudmFyIGlzID0gcmVxdWlyZSgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKVxudmFyIHNlbnNpdGl2ZSA9IHJlcXVpcmUoJ2h0bWwtd2hpdGVzcGFjZS1zZW5zaXRpdmUtdGFnLW5hbWVzJylcbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXRcblxudmFyIGRvdWJsZSA9ICdcXG5cXG4nXG52YXIgc2luZ2xlID0gJ1xcbidcbnZhciBzcGFjZSA9ICcgJ1xudmFyIHJlID0gLyAqXFxuL2dcblxuZnVuY3Rpb24gZm9ybWF0KG9wdGlvbnMpIHtcbiAgdmFyIHNldHRpbmdzID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgaW5kZW50ID0gc2V0dGluZ3MuaW5kZW50IHx8IDJcbiAgdmFyIGluZGVudEluaXRpYWwgPSBzZXR0aW5ncy5pbmRlbnRJbml0aWFsXG4gIHZhciBibGFua3MgPSBzZXR0aW5ncy5ibGFua3MgfHwgW11cblxuICBpZiAodHlwZW9mIGluZGVudCA9PT0gJ251bWJlcicpIHtcbiAgICBpbmRlbnQgPSByZXBlYXQoc3BhY2UsIGluZGVudClcbiAgfVxuXG4gIC8vIERlZmF1bHQgdG8gaW5kZW50aW5nIHRoZSBpbml0aWFsIGxldmVsLlxuICBpZiAoaW5kZW50SW5pdGlhbCA9PT0gbnVsbCB8fCBpbmRlbnRJbml0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICBpbmRlbnRJbml0aWFsID0gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIHRyYW5zZm9ybVxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybSh0cmVlKSB7XG4gICAgdmFyIGhlYWQgPSBmYWxzZVxuXG4gICAgbWluaWZ5KHRyZWUpXG5cbiAgICB2aXNpdCh0cmVlLCB2aXNpdG9yKVxuXG4gICAgZnVuY3Rpb24gdmlzaXRvcihub2RlLCBwYXJlbnRzKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuIHx8IFtdXG4gICAgICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoXG4gICAgICB2YXIgbGV2ZWwgPSBwYXJlbnRzLmxlbmd0aFxuICAgICAgdmFyIGluZGV4ID0gLTFcbiAgICAgIHZhciByZXN1bHRcbiAgICAgIHZhciBwcmV2aW91c1xuICAgICAgdmFyIGNoaWxkXG4gICAgICB2YXIgbmV3bGluZVxuXG4gICAgICBpZiAoaXMobm9kZSwgJ2hlYWQnKSkge1xuICAgICAgICBoZWFkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaGVhZCAmJiBpcyhub2RlLCAnYm9keScpKSB7XG4gICAgICAgIGhlYWQgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXMobm9kZSwgc2Vuc2l0aXZlKSkge1xuICAgICAgICByZXR1cm4gdmlzaXQuU0tJUFxuICAgICAgfVxuXG4gICAgICAvLyBEb27igJl0IGluZGVudCBjb250ZW50IG9mIHdoaXRlc3BhY2Utc2Vuc2l0aXZlIG5vZGVzIC8gaW5saW5lcy5cbiAgICAgIGlmICghbGVuZ3RoIHx8ICFwYWRkaW5nKG5vZGUsIGhlYWQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoIWluZGVudEluaXRpYWwpIHtcbiAgICAgICAgbGV2ZWwtLVxuICAgICAgfVxuXG4gICAgICAvLyBJbmRlbnQgbmV3bGluZXMgaW4gYHRleHRgLlxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgY2hpbGQgPSBjaGlsZHJlbltpbmRleF1cblxuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ3RleHQnIHx8IGNoaWxkLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgICAgIGlmIChjaGlsZC52YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG5ld2xpbmUgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hpbGQudmFsdWUgPSBjaGlsZC52YWx1ZS5yZXBsYWNlKHJlLCAnJCYnICsgcmVwZWF0KGluZGVudCwgbGV2ZWwpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCA9IFtdXG4gICAgICBpbmRleCA9IC0xXG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGRyZW5baW5kZXhdXG5cbiAgICAgICAgaWYgKHBhZGRpbmcoY2hpbGQsIGhlYWQpIHx8IChuZXdsaW5lICYmIGluZGV4ID09PSAwKSkge1xuICAgICAgICAgIGFkZEJyZWFrKHJlc3VsdCwgbGV2ZWwsIGNoaWxkKVxuICAgICAgICAgIG5ld2xpbmUgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91cyA9IGNoaWxkXG4gICAgICAgIHJlc3VsdC5wdXNoKGNoaWxkKVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3bGluZSB8fCBwYWRkaW5nKHByZXZpb3VzLCBoZWFkKSkge1xuICAgICAgICAvLyBJZ25vcmUgdHJhaWxpbmcgd2hpdGVzcGFjZSAoaWYgdGhhdCBhbHJlYWR5IGV4aXN0ZWQpLCBhcyB3ZeKAmWxsIGFkZFxuICAgICAgICAvLyBwcm9wZXJseSBpbmRlbnRlZCB3aGl0ZXNwYWNlLlxuICAgICAgICBpZiAod2hpdGVzcGFjZShwcmV2aW91cykpIHtcbiAgICAgICAgICByZXN1bHQucG9wKClcbiAgICAgICAgICBwcmV2aW91cyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEJyZWFrKHJlc3VsdCwgbGV2ZWwgLSAxKVxuICAgICAgICBuZXdsaW5lID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBub2RlLmNoaWxkcmVuID0gcmVzdWx0XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmxhbmsobm9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICBub2RlICYmXG4gICAgICBub2RlLnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgICAgYmxhbmtzLmxlbmd0aCAhPT0gMCAmJlxuICAgICAgYmxhbmtzLmluZGV4T2Yobm9kZS50YWdOYW1lKSAhPT0gLTFcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBhZGRCcmVhayhsaXN0LCBsZXZlbCwgbmV4dCkge1xuICAgIHZhciB0YWlsID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXG4gICAgdmFyIHByZXZpb3VzID0gd2hpdGVzcGFjZSh0YWlsKSA/IGxpc3RbbGlzdC5sZW5ndGggLSAyXSA6IHRhaWxcbiAgICB2YXIgcmVwbGFjZSA9XG4gICAgICAoYmxhbmsocHJldmlvdXMpICYmIGJsYW5rKG5leHQpID8gZG91YmxlIDogc2luZ2xlKSArIHJlcGVhdChpbmRlbnQsIGxldmVsKVxuXG4gICAgaWYgKHRhaWwgJiYgdGFpbC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIGlmICh3aGl0ZXNwYWNlKHRhaWwpKSB7XG4gICAgICAgIHRhaWwudmFsdWUgPSByZXBsYWNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWlsLnZhbHVlICs9IHJlcGxhY2VcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5wdXNoKHt0eXBlOiAndGV4dCcsIHZhbHVlOiByZXBsYWNlfSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFkZGluZyhub2RlLCBoZWFkKSB7XG4gIGlmIChub2RlLnR5cGUgPT09ICdyb290Jykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAobm9kZS50eXBlID09PSAnZWxlbWVudCcpIHtcbiAgICByZXR1cm4gaGVhZCB8fCBpcyhub2RlLCAnc2NyaXB0JykgfHwgZW1iZWRkZWQobm9kZSkgfHwgIXBocmFzaW5nKG5vZGUpXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cbiIsIi8vIFNlZTogPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3RoZS1jc3MtdXNlci1hZ2VudC1zdHlsZS1zaGVldC1hbmQtcHJlc2VudGF0aW9uYWwtaGludHM+XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gQ29udHJpYnV0ZSB3aGl0ZXNwYWNlIGludHJpbnNpY2FsbHkuXG4gICdicicsXG4gICd3YnInLFxuICAvLyBTaW1pbGFyIHRvIGJsb2NrLlxuICAnbGknLFxuICAndGFibGUnLFxuICAnY2FwdGlvbicsXG4gICdjb2xncm91cCcsXG4gICdjb2wnLFxuICAndGhlYWQnLFxuICAndGJvZHknLFxuICAndGZvb3QnLFxuICAndHInLFxuICAndGQnLFxuICAndGgnLFxuICAnc3VtbWFyeScsXG4gICdvcHRncm91cCcsXG4gICdvcHRpb24nLFxuICAvLyBQYWdlXG4gICdodG1sJyxcbiAgJ2hlYWQnLFxuICAnYm9keScsXG4gIC8vIEZsb3cgY29udGVudFxuICAnYWRkcmVzcycsXG4gICdibG9ja3F1b3RlJyxcbiAgJ2NlbnRlcicsIC8vIExlZ2FjeVxuICAnZGlhbG9nJyxcbiAgJ2RpdicsXG4gICdmaWd1cmUnLFxuICAnZmlnY2FwdGlvbicsXG4gICdmb290ZXInLFxuICAnZm9ybScsXG4gICdoZWFkZXInLFxuICAnaHInLFxuICAnbGVnZW5kJyxcbiAgJ2xpc3RpbmcnLCAvLyBMZWdhY3lcbiAgJ21haW4nLFxuICAncCcsXG4gICdwbGFpbnRleHQnLCAvLyBMZWdhY3lcbiAgJ3ByZScsXG4gICd4bXAnLCAvLyBMZWdhY3lcbiAgLy8gU2VjdGlvbnMgYW5kIGhlYWRpbmdzXG4gICdhcnRpY2xlJyxcbiAgJ2FzaWRlJyxcbiAgJ2gxJyxcbiAgJ2gyJyxcbiAgJ2gzJyxcbiAgJ2g0JyxcbiAgJ2g1JyxcbiAgJ2g2JyxcbiAgJ2hncm91cCcsXG4gICduYXYnLFxuICAnc2VjdGlvbicsXG4gIC8vIExpc3RzXG4gICdkaXInLCAvLyBMZWdhY3lcbiAgJ2RkJyxcbiAgJ2RsJyxcbiAgJ2R0JyxcbiAgJ21lbnUnLFxuICAnb2wnLFxuICAndWwnLFxuICAvLyBCbG9jay1saWtlOlxuICAnbGknLFxuICAndGgnLFxuICAndGQnXG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gRm9ybS5cbiAgJ2J1dHRvbicsXG4gICdpbnB1dCcsXG4gICdzZWxlY3QnLFxuICAndGV4dGFyZWEnXG5dXG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqICAgQ29sbGFwc2Ugd2hpdGUtc3BhY2UuXG4gKlxuICogICBOb3JtYWxseSwgY29sbGFwc2VzIHRvIGEgc2luZ2xlIHNwYWNlLlxuICogICBJZiBgbmV3bGluZXM6IHRydWVgLCBjb2xsYXBzZXMgd2hpdGUtc3BhY2UgY29udGFpbmluZyBuZXdsaW5lcyB0byBgJ1xcbidgXG4gKiAgIGluc3RlYWQgb2YgYCcgJ2AuXG4gKiBAZXhhbXBsZVxuICogICA8aDE+SGVhZGluZzwvaDE+XG4gKiAgIDxwPjxzdHJvbmc+VGhpczwvc3Ryb25nPiBhbmQgPGVtPnRoYXQ8L2VtPjwvcD5cbiAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGNvbGxhcHNlV2hpdGVTcGFjZSA9IHJlcXVpcmUoJ2NvbGxhcHNlLXdoaXRlLXNwYWNlJylcbnZhciBpcyA9IHJlcXVpcmUoJ2hhc3QtdXRpbC1pcy1lbGVtZW50JylcbnZhciBlbWJlZGRlZCA9IHJlcXVpcmUoJ2hhc3QtdXRpbC1lbWJlZGRlZCcpXG52YXIgY29udmVydCA9IHJlcXVpcmUoJ3VuaXN0LXV0aWwtaXMvY29udmVydCcpXG52YXIgd2hpdGVzcGFjZSA9IHJlcXVpcmUoJ2hhc3QtdXRpbC13aGl0ZXNwYWNlJylcbnZhciBibG9ja3MgPSByZXF1aXJlKCcuL2Jsb2NrJylcbnZhciBjb250ZW50cyA9IHJlcXVpcmUoJy4vY29udGVudCcpXG52YXIgc2tpcHBhYmxlcyA9IHJlcXVpcmUoJy4vc2tpcHBhYmxlJylcblxubW9kdWxlLmV4cG9ydHMgPSBtaW5pZnlXaGl0ZXNwYWNlXG5cbnZhciBpZ25vcmFibGVOb2RlID0gY29udmVydChbJ2RvY3R5cGUnLCAnY29tbWVudCddKVxudmFyIHBhcmVudCA9IGNvbnZlcnQoWydlbGVtZW50JywgJ3Jvb3QnXSlcbnZhciByb290ID0gY29udmVydChbJ3Jvb3QnXSlcbnZhciBlbGVtZW50ID0gY29udmVydChbJ2VsZW1lbnQnXSlcbnZhciB0ZXh0ID0gY29udmVydChbJ3RleHQnXSlcblxuZnVuY3Rpb24gbWluaWZ5V2hpdGVzcGFjZShvcHRpb25zKSB7XG4gIHZhciBjb2xsYXBzZSA9IChvcHRpb25zIHx8IHt9KS5uZXdsaW5lc1xuICAgID8gY29sbGFwc2VUb05ld0xpbmVzXG4gICAgOiBjb2xsYXBzZVdoaXRlU3BhY2VcblxuICByZXR1cm4gdHJhbnNmb3JtXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtKHRyZWUpIHtcbiAgICBtaW5pZnkodHJlZSwge2NvbGxhcHNlOiBjb2xsYXBzZSwgd2hpdGVzcGFjZTogJ25vcm1hbCd9KVxuICB9XG59XG5cbmZ1bmN0aW9uIG1pbmlmeShub2RlLCBvcHRpb25zKSB7XG4gIHZhciBzZXR0aW5nc1xuXG4gIGlmIChwYXJlbnQobm9kZSkpIHtcbiAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpXG5cbiAgICBpZiAocm9vdChub2RlKSB8fCBibG9ja2xpa2Uobm9kZSkpIHtcbiAgICAgIHNldHRpbmdzLmJlZm9yZSA9IHRydWVcbiAgICAgIHNldHRpbmdzLmFmdGVyID0gdHJ1ZVxuICAgIH1cblxuICAgIHNldHRpbmdzLndoaXRlc3BhY2UgPSBpbmZlcldoaXRlU3BhY2Uobm9kZSwgb3B0aW9ucylcblxuICAgIHJldHVybiBhbGwobm9kZSwgc2V0dGluZ3MpXG4gIH1cblxuICBpZiAodGV4dChub2RlKSkge1xuICAgIGlmIChvcHRpb25zLndoaXRlc3BhY2UgPT09ICdub3JtYWwnKSB7XG4gICAgICByZXR1cm4gbWluaWZ5VGV4dChub2RlLCBvcHRpb25zKVxuICAgIH1cblxuICAgIC8vIE5hw692ZSBjb2xsYXBzZSwgYnV0IG5vIHRyaW1taW5nOlxuICAgIGlmIChvcHRpb25zLndoaXRlc3BhY2UgPT09ICdub3dyYXAnKSB7XG4gICAgICBub2RlLnZhbHVlID0gb3B0aW9ucy5jb2xsYXBzZShub2RlLnZhbHVlKVxuICAgIH1cblxuICAgIC8vIFRoZSBgcHJlLXdyYXBgIG9yIGBwcmVgIHdoaXRlc3BhY2Ugc2V0dGluZ3MgYXJlIG5laXRoZXIgY29sbGFwc2VkIG5vclxuICAgIC8vIHRyaW1tZWQuXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZTogZmFsc2UsXG4gICAgaWdub3JlOiBpZ25vcmFibGVOb2RlKG5vZGUpLFxuICAgIHN0cmlwQXRTdGFydDogZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBtaW5pZnlUZXh0KG5vZGUsIG9wdGlvbnMpIHtcbiAgdmFyIHZhbHVlID0gb3B0aW9ucy5jb2xsYXBzZShub2RlLnZhbHVlKVxuICB2YXIgc3RhcnQgPSAwXG4gIHZhciBlbmQgPSB2YWx1ZS5sZW5ndGhcbiAgdmFyIHJlc3VsdCA9IHtyZW1vdmU6IGZhbHNlLCBpZ25vcmU6IGZhbHNlLCBzdHJpcEF0U3RhcnQ6IGZhbHNlfVxuXG4gIGlmIChvcHRpb25zLmJlZm9yZSAmJiByZW1vdmFibGUodmFsdWUuY2hhckF0KDApKSkge1xuICAgIHN0YXJ0KytcbiAgfVxuXG4gIGlmIChzdGFydCAhPT0gZW5kICYmIHJlbW92YWJsZSh2YWx1ZS5jaGFyQXQoZW5kIC0gMSkpKSB7XG4gICAgaWYgKG9wdGlvbnMuYWZ0ZXIpIHtcbiAgICAgIGVuZC0tXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5zdHJpcEF0U3RhcnQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSBlbmQpIHtcbiAgICByZXN1bHQucmVtb3ZlID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIG5vZGUudmFsdWUgPSB2YWx1ZS5zbGljZShzdGFydCwgZW5kKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBhbGwocGFyZW50LCBvcHRpb25zKSB7XG4gIHZhciBiZWZvcmUgPSBvcHRpb25zLmJlZm9yZVxuICB2YXIgYWZ0ZXIgPSBvcHRpb25zLmFmdGVyXG4gIHZhciBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlblxuICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoXG4gIHZhciBpbmRleCA9IC0xXG4gIHZhciByZXN1bHRcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdCA9IG1pbmlmeShcbiAgICAgIGNoaWxkcmVuW2luZGV4XSxcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgYmVmb3JlOiBiZWZvcmUsXG4gICAgICAgIGFmdGVyOiBjb2xsYXBzYWJsZUFmdGVyKGNoaWxkcmVuLCBpbmRleCwgYWZ0ZXIpXG4gICAgICB9KVxuICAgIClcblxuICAgIGlmIChyZXN1bHQucmVtb3ZlKSB7XG4gICAgICBjaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICBpbmRleC0tXG4gICAgICBsZW5ndGgtLVxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdC5pZ25vcmUpIHtcbiAgICAgIGJlZm9yZSA9IHJlc3VsdC5zdHJpcEF0U3RhcnRcbiAgICB9XG5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQsIHN1Y2ggYXMgYSBgPHNlbGVjdD5gIG9yIGA8aW1nPmAsIGNvbnRyaWJ1dGVzIGNvbnRlbnRcbiAgICAvLyBzb21laG93LCBhbGxvdyB3aGl0ZXNwYWNlIGFnYWluLlxuICAgIGlmIChjb250ZW50KGNoaWxkcmVuW2luZGV4XSkpIHtcbiAgICAgIGJlZm9yZSA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmU6IGZhbHNlLFxuICAgIGlnbm9yZTogZmFsc2UsXG4gICAgc3RyaXBBdFN0YXJ0OiBiZWZvcmUgfHwgYWZ0ZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBjb2xsYXBzYWJsZUFmdGVyKG5vZGVzLCBpbmRleCwgYWZ0ZXIpIHtcbiAgdmFyIGxlbmd0aCA9IG5vZGVzLmxlbmd0aFxuICB2YXIgbm9kZVxuICB2YXIgcmVzdWx0XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBub2RlID0gbm9kZXNbaW5kZXhdXG4gICAgcmVzdWx0ID0gaW5mZXJCb3VuZGFyeShub2RlKVxuXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmIG5vZGUuY2hpbGRyZW4gJiYgIXNraXBwYWJsZShub2RlKSkge1xuICAgICAgcmVzdWx0ID0gY29sbGFwc2FibGVBZnRlcihub2RlLmNoaWxkcmVuLCAtMSlcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFmdGVyXG59XG5cbi8vIEluZmVyIHR3byB0eXBlcyBvZiBib3VuZGFyaWVzOlxuLy9cbi8vIDEuIGB0cnVlYCDigJQgYm91bmRhcnkgZm9yIHdoaWNoIHdoaXRlc3BhY2UgYXJvdW5kIGl0IGRvZXMgbm90IGNvbnRyaWJ1dGVcbi8vICAgIGFueXRoaW5nXG4vLyAyLiBgZmFsc2VgIOKAlCBib3VuZGFyeSBmb3Igd2hpY2ggd2hpdGVzcGFjZSBhcm91bmQgaXQgKmRvZXMqIGNvbnRyaWJ1dGVcbi8vXG4vLyBObyByZXN1bHQgKGB1bmRlZmluZWRgKSBpcyByZXR1cm5lZCBpZiBpdCBpcyB1bmtub3duLlxuZnVuY3Rpb24gaW5mZXJCb3VuZGFyeShub2RlKSB7XG4gIGlmIChlbGVtZW50KG5vZGUpKSB7XG4gICAgaWYgKGNvbnRlbnQobm9kZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChibG9ja2xpa2Uobm9kZSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLy8gVW5rbm93bjogZWl0aGVyIGRlcGVuZHMgb24gc2libGluZ3MgaWYgZW1iZWRkZWQgb3IgbWV0YWRhdGEsIG9yIG9uXG4gICAgLy8gY2hpbGRyZW4uXG4gIH0gZWxzZSBpZiAodGV4dChub2RlKSkge1xuICAgIGlmICghd2hpdGVzcGFjZShub2RlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9IGVsc2UgaWYgKCFpZ25vcmFibGVOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLy8gSW5mZXIgd2hldGhlciBhIG5vZGUgaXMgc2tpcHBhYmxlLlxuZnVuY3Rpb24gY29udGVudChub2RlKSB7XG4gIHJldHVybiBlbWJlZGRlZChub2RlKSB8fCBpcyhub2RlLCBjb250ZW50cylcbn1cblxuLy8gU2VlOiA8aHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jdGhlLWNzcy11c2VyLWFnZW50LXN0eWxlLXNoZWV0LWFuZC1wcmVzZW50YXRpb25hbC1oaW50cz5cbmZ1bmN0aW9uIGJsb2NrbGlrZShub2RlKSB7XG4gIHJldHVybiBpcyhub2RlLCBibG9ja3MpXG59XG5cbmZ1bmN0aW9uIHNraXBwYWJsZShub2RlKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0IC0gY3VycmVudGx5IG9ubHkgdXNlZCBvbiBlbGVtZW50cywgYnV0IGp1c3QgdG8gbWFrZSBzdXJlLiAqL1xuICB2YXIgcHJvcHMgPSBub2RlLnByb3BlcnRpZXMgfHwge31cblxuICByZXR1cm4gaWdub3JhYmxlTm9kZShub2RlKSB8fCBpcyhub2RlLCBza2lwcGFibGVzKSB8fCBwcm9wcy5oaWRkZW5cbn1cblxuZnVuY3Rpb24gcmVtb3ZhYmxlKGNoYXJhY3Rlcikge1xuICByZXR1cm4gY2hhcmFjdGVyID09PSAnICcgfHwgY2hhcmFjdGVyID09PSAnXFxuJ1xufVxuXG4vLyBDb2xsYXBzZSB0byBzcGFjZXMsIG9yIGxpbmUgZmVlZHMgaWYgdGhleeKAmXJlIGluIGEgcnVuLlxuZnVuY3Rpb24gY29sbGFwc2VUb05ld0xpbmVzKHZhbHVlKSB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1xccysvZywgcmVwbGFjZSlcblxuICBmdW5jdGlvbiByZXBsYWNlKCQwKSB7XG4gICAgcmV0dXJuICQwLmluZGV4T2YoJ1xcbicpID09PSAtMSA/ICcgJyA6ICdcXG4nXG4gIH1cbn1cblxuLy8gV2UgZG9u4oCZdCBzdXBwb3J0IHZvaWQgZWxlbWVudHMgaGVyZSAoc28gYG5vYnIgd2JyYCAtPiBgbm9ybWFsYCBpcyBpZ25vcmVkKS5cbmZ1bmN0aW9uIGluZmVyV2hpdGVTcGFjZShub2RlLCBvcHRpb25zKSB7XG4gIHZhciBwcm9wcyA9IG5vZGUucHJvcGVydGllcyB8fCB7fVxuXG4gIHN3aXRjaCAobm9kZS50YWdOYW1lKSB7XG4gICAgY2FzZSAnbGlzdGluZyc6XG4gICAgY2FzZSAncGxhaW50ZXh0JzpcbiAgICBjYXNlICd4bXAnOlxuICAgICAgcmV0dXJuICdwcmUnXG4gICAgY2FzZSAnbm9icic6XG4gICAgICByZXR1cm4gJ25vd3JhcCdcbiAgICBjYXNlICdwcmUnOlxuICAgICAgcmV0dXJuIHByb3BzLndyYXAgPyAncHJlLXdyYXAnIDogJ3ByZSdcbiAgICBjYXNlICd0ZCc6XG4gICAgY2FzZSAndGgnOlxuICAgICAgcmV0dXJuIHByb3BzLm5vV3JhcCA/ICdub3dyYXAnIDogb3B0aW9ucy53aGl0ZXNwYWNlXG4gICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgcmV0dXJuICdwcmUtd3JhcCdcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG9wdGlvbnMud2hpdGVzcGFjZVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2FyZWEnLFxuICAnYmFzZScsXG4gICdiYXNlZm9udCcsXG4gICdkaWFsb2cnLFxuICAnZGF0YWxpc3QnLFxuICAnaGVhZCcsXG4gICdsaW5rJyxcbiAgJ21ldGEnLFxuICAnbm9lbWJlZCcsXG4gICdub2ZyYW1lcycsXG4gICdwYXJhbScsXG4gICdycCcsXG4gICdzY3JpcHQnLFxuICAnc291cmNlJyxcbiAgJ3N0eWxlJyxcbiAgJ3RlbXBsYXRlJyxcbiAgJ3RyYWNrJyxcbiAgJ3RpdGxlJ1xuXVxuIl0sInNvdXJjZVJvb3QiOiIifQ==