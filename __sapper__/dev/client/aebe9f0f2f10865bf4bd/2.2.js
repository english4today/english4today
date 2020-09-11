(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "../../node_modules/detab/index.js":
/*!************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/detab/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = detab

var repeat = __webpack_require__(/*! repeat-string */ "../../node_modules/repeat-string/index.js")

var tab = 0x09
var lineFeed = 0x0a
var carriageReturn = 0x0d

// Replace tabs with spaces, being smart about which column the tab is at and
// which size should be used.
function detab(value, size) {
  var string = typeof value === 'string'
  var length = string && value.length
  var start = 0
  var index = -1
  var column = -1
  var tabSize = size || 4
  var results = []
  var code
  var add

  if (!string) {
    throw new Error('detab expected string')
  }

  while (++index < length) {
    code = value.charCodeAt(index)

    if (code === tab) {
      add = tabSize - ((column + 1) % tabSize)
      column += add
      results.push(value.slice(start, index) + repeat(' ', add))
      start = index + 1
    } else if (code === lineFeed || code === carriageReturn) {
      column = -1
    } else {
      column++
    }
  }

  results.push(value.slice(start))

  return results.join('')
}


/***/ }),

/***/ "../../node_modules/mdast-util-definitions/index.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-definitions/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__(/*! unist-util-visit */ "../../node_modules/unist-util-visit/index.js")

module.exports = getDefinitionFactory

var own = {}.hasOwnProperty

// Get a definition in `node` by `identifier`.
function getDefinitionFactory(node, options) {
  return getterFactory(gather(node, options))
}

// Gather all definitions in `node`
function gather(node, options) {
  var cache = {}

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node')
  }

  visit(node, 'definition', options && options.commonmark ? commonmark : normal)

  return cache

  function commonmark(definition) {
    var id = normalise(definition.identifier)
    if (!own.call(cache, id)) {
      cache[id] = definition
    }
  }

  function normal(definition) {
    cache[normalise(definition.identifier)] = definition
  }
}

// Factory to get a node from the given definition-cache.
function getterFactory(cache) {
  return getter

  // Get a node from the bound definition-cache.
  function getter(identifier) {
    var id = identifier && normalise(identifier)
    return id && own.call(cache, id) ? cache[id] : null
  }
}

function normalise(identifier) {
  return identifier.toUpperCase()
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/index.js":
/*!*************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(/*! ./lib */ "../../node_modules/mdast-util-to-hast/lib/index.js")


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/all.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/all.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = all

var one = __webpack_require__(/*! ./one */ "../../node_modules/mdast-util-to-hast/lib/one.js")

function all(h, parent) {
  var nodes = parent.children || []
  var length = nodes.length
  var values = []
  var index = -1
  var result
  var head

  while (++index < length) {
    result = one(h, nodes[index], parent)

    if (result) {
      if (index && nodes[index - 1].type === 'break') {
        if (result.value) {
          result.value = result.value.replace(/^\s+/, '')
        }

        head = result.children && result.children[0]

        if (head && head.value) {
          head.value = head.value.replace(/^\s+/, '')
        }
      }

      values = values.concat(result)
    }
  }

  return values
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/footer.js":
/*!******************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/footer.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = generateFootnotes

var thematicBreak = __webpack_require__(/*! ./handlers/thematic-break */ "../../node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js")
var list = __webpack_require__(/*! ./handlers/list */ "../../node_modules/mdast-util-to-hast/lib/handlers/list.js")
var wrap = __webpack_require__(/*! ./wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")

function generateFootnotes(h) {
  var footnoteById = h.footnoteById
  var footnoteOrder = h.footnoteOrder
  var length = footnoteOrder.length
  var index = -1
  var listItems = []
  var def
  var backReference
  var content
  var tail

  while (++index < length) {
    def = footnoteById[footnoteOrder[index].toUpperCase()]

    if (!def) {
      continue
    }

    content = def.children.concat()
    tail = content[content.length - 1]
    backReference = {
      type: 'link',
      url: '#fnref-' + def.identifier,
      data: {hProperties: {className: ['footnote-backref']}},
      children: [{type: 'text', value: '↩'}]
    }

    if (!tail || tail.type !== 'paragraph') {
      tail = {type: 'paragraph', children: []}
      content.push(tail)
    }

    tail.children.push(backReference)

    listItems.push({
      type: 'listItem',
      data: {hProperties: {id: 'fn-' + def.identifier}},
      children: content,
      position: def.position
    })
  }

  if (listItems.length === 0) {
    return null
  }

  return h(
    null,
    'div',
    {className: ['footnotes']},
    wrap(
      [
        thematicBreak(h),
        list(h, {type: 'list', ordered: true, children: listItems})
      ],
      true
    )
  )
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/blockquote.js":
/*!*******************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = blockquote

var wrap = __webpack_require__(/*! ../wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function blockquote(h, node) {
  return h(node, 'blockquote', wrap(all(h, node), true))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/break.js":
/*!**************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/break.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = hardBreak

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

function hardBreak(h, node) {
  return [h(node, 'br'), u('text', '\n')]
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/code.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/code.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = code

var detab = __webpack_require__(/*! detab */ "../../node_modules/detab/index.js")
var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

function code(h, node) {
  var value = node.value ? detab(node.value + '\n') : ''
  var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)
  var props = {}

  if (lang) {
    props.className = ['language-' + lang]
  }

  return h(node.position, 'pre', [h(node, 'code', props, [u('text', value)])])
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/delete.js":
/*!***************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/delete.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = strikethrough

var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function strikethrough(h, node) {
  return h(node, 'del', all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/emphasis.js":
/*!*****************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = emphasis

var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function emphasis(h, node) {
  return h(node, 'em', all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js":
/*!***************************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = footnoteReference

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

function footnoteReference(h, node) {
  var footnoteOrder = h.footnoteOrder
  var identifier = String(node.identifier)

  if (footnoteOrder.indexOf(identifier) === -1) {
    footnoteOrder.push(identifier)
  }

  return h(node.position, 'sup', {id: 'fnref-' + identifier}, [
    h(node, 'a', {href: '#fn-' + identifier, className: ['footnote-ref']}, [
      u('text', node.label || identifier)
    ])
  ])
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/footnote.js":
/*!*****************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/footnote.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = footnote

var footnoteReference = __webpack_require__(/*! ./footnote-reference */ "../../node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js")

function footnote(h, node) {
  var footnoteById = h.footnoteById
  var footnoteOrder = h.footnoteOrder
  var identifier = 1

  while (identifier in footnoteById) {
    identifier++
  }

  identifier = String(identifier)

  // No need to check if `identifier` exists in `footnoteOrder`, it’s guaranteed
  // to not exist because we just generated it.
  footnoteOrder.push(identifier)

  footnoteById[identifier] = {
    type: 'footnoteDefinition',
    identifier: identifier,
    children: [{type: 'paragraph', children: node.children}],
    position: node.position
  }

  return footnoteReference(h, {
    type: 'footnoteReference',
    identifier: identifier,
    position: node.position
  })
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/heading.js":
/*!****************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/heading.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = heading

var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function heading(h, node) {
  return h(node, 'h' + node.depth, all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/html.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/html.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = html

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

// Return either a `raw` node in dangerous mode, otherwise nothing.
function html(h, node) {
  return h.dangerous ? h.augment(node, u('raw', node.value)) : null
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/image-reference.js":
/*!************************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = imageReference

var normalize = __webpack_require__(/*! mdurl/encode */ "../../node_modules/mdurl/encode.js")
var revert = __webpack_require__(/*! ../revert */ "../../node_modules/mdast-util-to-hast/lib/revert.js")

function imageReference(h, node) {
  var def = h.definition(node.identifier)
  var props

  if (!def) {
    return revert(h, node)
  }

  props = {src: normalize(def.url || ''), alt: node.alt}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'img', props)
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/image.js":
/*!**************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/image.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalize = __webpack_require__(/*! mdurl/encode */ "../../node_modules/mdurl/encode.js")

module.exports = image

function image(h, node) {
  var props = {src: normalize(node.url), alt: node.alt}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'img', props)
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/index.js":
/*!**************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/index.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  blockquote: __webpack_require__(/*! ./blockquote */ "../../node_modules/mdast-util-to-hast/lib/handlers/blockquote.js"),
  break: __webpack_require__(/*! ./break */ "../../node_modules/mdast-util-to-hast/lib/handlers/break.js"),
  code: __webpack_require__(/*! ./code */ "../../node_modules/mdast-util-to-hast/lib/handlers/code.js"),
  delete: __webpack_require__(/*! ./delete */ "../../node_modules/mdast-util-to-hast/lib/handlers/delete.js"),
  emphasis: __webpack_require__(/*! ./emphasis */ "../../node_modules/mdast-util-to-hast/lib/handlers/emphasis.js"),
  footnoteReference: __webpack_require__(/*! ./footnote-reference */ "../../node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js"),
  footnote: __webpack_require__(/*! ./footnote */ "../../node_modules/mdast-util-to-hast/lib/handlers/footnote.js"),
  heading: __webpack_require__(/*! ./heading */ "../../node_modules/mdast-util-to-hast/lib/handlers/heading.js"),
  html: __webpack_require__(/*! ./html */ "../../node_modules/mdast-util-to-hast/lib/handlers/html.js"),
  imageReference: __webpack_require__(/*! ./image-reference */ "../../node_modules/mdast-util-to-hast/lib/handlers/image-reference.js"),
  image: __webpack_require__(/*! ./image */ "../../node_modules/mdast-util-to-hast/lib/handlers/image.js"),
  inlineCode: __webpack_require__(/*! ./inline-code */ "../../node_modules/mdast-util-to-hast/lib/handlers/inline-code.js"),
  linkReference: __webpack_require__(/*! ./link-reference */ "../../node_modules/mdast-util-to-hast/lib/handlers/link-reference.js"),
  link: __webpack_require__(/*! ./link */ "../../node_modules/mdast-util-to-hast/lib/handlers/link.js"),
  listItem: __webpack_require__(/*! ./list-item */ "../../node_modules/mdast-util-to-hast/lib/handlers/list-item.js"),
  list: __webpack_require__(/*! ./list */ "../../node_modules/mdast-util-to-hast/lib/handlers/list.js"),
  paragraph: __webpack_require__(/*! ./paragraph */ "../../node_modules/mdast-util-to-hast/lib/handlers/paragraph.js"),
  root: __webpack_require__(/*! ./root */ "../../node_modules/mdast-util-to-hast/lib/handlers/root.js"),
  strong: __webpack_require__(/*! ./strong */ "../../node_modules/mdast-util-to-hast/lib/handlers/strong.js"),
  table: __webpack_require__(/*! ./table */ "../../node_modules/mdast-util-to-hast/lib/handlers/table.js"),
  text: __webpack_require__(/*! ./text */ "../../node_modules/mdast-util-to-hast/lib/handlers/text.js"),
  thematicBreak: __webpack_require__(/*! ./thematic-break */ "../../node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js"),
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
}

// Return nothing for nodes that are ignored.
function ignore() {
  return null
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/inline-code.js":
/*!********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineCode

var collapse = __webpack_require__(/*! collapse-white-space */ "../../node_modules/collapse-white-space/index.js")
var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

function inlineCode(h, node) {
  return h(node, 'code', [u('text', collapse(node.value))])
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/link-reference.js":
/*!***********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = linkReference

var normalize = __webpack_require__(/*! mdurl/encode */ "../../node_modules/mdurl/encode.js")
var revert = __webpack_require__(/*! ../revert */ "../../node_modules/mdast-util-to-hast/lib/revert.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function linkReference(h, node) {
  var def = h.definition(node.identifier)
  var props

  if (!def) {
    return revert(h, node)
  }

  props = {href: normalize(def.url || '')}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'a', props, all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/link.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/link.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalize = __webpack_require__(/*! mdurl/encode */ "../../node_modules/mdurl/encode.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

module.exports = link

function link(h, node) {
  var props = {href: normalize(node.url)}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'a', props, all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/list-item.js":
/*!******************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/list-item.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = listItem

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var wrap = __webpack_require__(/*! ../wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function listItem(h, node, parent) {
  var children = node.children
  var head = children[0]
  var raw = all(h, node)
  var loose = parent ? listLoose(parent) : listItemLoose(node)
  var props = {}
  var result
  var container
  var index
  var length
  var child

  // Tight lists should not render `paragraph` nodes as `p` elements.
  if (loose) {
    result = raw
  } else {
    result = []
    length = raw.length
    index = -1

    while (++index < length) {
      child = raw[index]

      if (child.tagName === 'p') {
        result = result.concat(child.children)
      } else {
        result.push(child)
      }
    }
  }

  if (typeof node.checked === 'boolean') {
    if (loose && (!head || head.type !== 'paragraph')) {
      result.unshift(h(null, 'p', []))
    }

    container = loose ? result[0].children : result

    if (container.length !== 0) {
      container.unshift(u('text', ' '))
    }

    container.unshift(
      h(null, 'input', {
        type: 'checkbox',
        checked: node.checked,
        disabled: true
      })
    )

    // According to github-markdown-css, this class hides bullet.
    // See: <https://github.com/sindresorhus/github-markdown-css>.
    props.className = ['task-list-item']
  }

  if (loose && result.length !== 0) {
    result = wrap(result, true)
  }

  return h(node, 'li', props, result)
}

function listLoose(node) {
  var loose = node.spread
  var children = node.children
  var length = children.length
  var index = -1

  while (!loose && ++index < length) {
    loose = listItemLoose(children[index])
  }

  return loose
}

function listItemLoose(node) {
  var spread = node.spread

  return spread === undefined || spread === null
    ? node.children.length > 1
    : spread
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/list.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/list.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = list

var wrap = __webpack_require__(/*! ../wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function list(h, node) {
  var props = {}
  var name = node.ordered ? 'ol' : 'ul'
  var items
  var index = -1
  var length

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start
  }

  items = all(h, node)
  length = items.length

  // Like GitHub, add a class for custom styling.
  while (++index < length) {
    if (
      items[index].properties.className &&
      items[index].properties.className.indexOf('task-list-item') !== -1
    ) {
      props.className = ['contains-task-list']
      break
    }
  }

  return h(node, name, props, wrap(items, true))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/paragraph.js":
/*!******************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = paragraph

var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function paragraph(h, node) {
  return h(node, 'p', all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/root.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/root.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = root

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var wrap = __webpack_require__(/*! ../wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function root(h, node) {
  return h.augment(node, u('root', wrap(all(h, node))))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/strong.js":
/*!***************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/strong.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = strong

var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function strong(h, node) {
  return h(node, 'strong', all(h, node))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/table.js":
/*!**************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/table.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = table

var position = __webpack_require__(/*! unist-util-position */ "../../node_modules/unist-util-position/index.js")
var wrap = __webpack_require__(/*! ../wrap */ "../../node_modules/mdast-util-to-hast/lib/wrap.js")
var all = __webpack_require__(/*! ../all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

function table(h, node) {
  var rows = node.children
  var index = rows.length
  var align = node.align
  var alignLength = align.length
  var result = []
  var pos
  var row
  var out
  var name
  var cell

  while (index--) {
    row = rows[index].children
    name = index === 0 ? 'th' : 'td'
    pos = alignLength
    out = []

    while (pos--) {
      cell = row[pos]
      out[pos] = h(cell, name, {align: align[pos]}, cell ? all(h, cell) : [])
    }

    result[index] = h(rows[index], 'tr', wrap(out, true))
  }

  return h(
    node,
    'table',
    wrap(
      [
        h(result[0].position, 'thead', wrap([result[0]], true)),
        h(
          {
            start: position.start(result[1]),
            end: position.end(result[result.length - 1])
          },
          'tbody',
          wrap(result.slice(1), true)
        )
      ],
      true
    )
  )
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/text.js":
/*!*************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/text.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = text

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var trimLines = __webpack_require__(/*! trim-lines */ "../../node_modules/trim-lines/index.js")

function text(h, node) {
  return h.augment(node, u('text', trimLines(node.value)))
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js":
/*!***********************************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = thematicBreak

function thematicBreak(h, node) {
  return h(node, 'hr')
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/index.js":
/*!*****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = toHast

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var visit = __webpack_require__(/*! unist-util-visit */ "../../node_modules/unist-util-visit/index.js")
var position = __webpack_require__(/*! unist-util-position */ "../../node_modules/unist-util-position/index.js")
var generated = __webpack_require__(/*! unist-util-generated */ "../../node_modules/unist-util-generated/index.js")
var definitions = __webpack_require__(/*! mdast-util-definitions */ "../../node_modules/mdast-util-definitions/index.js")
var one = __webpack_require__(/*! ./one */ "../../node_modules/mdast-util-to-hast/lib/one.js")
var footer = __webpack_require__(/*! ./footer */ "../../node_modules/mdast-util-to-hast/lib/footer.js")
var handlers = __webpack_require__(/*! ./handlers */ "../../node_modules/mdast-util-to-hast/lib/handlers/index.js")

var own = {}.hasOwnProperty

var deprecationWarningIssued = false

// Factory to transform.
function factory(tree, options) {
  var settings = options || {}

  // Issue a warning if the deprecated tag 'allowDangerousHTML' is used
  if (settings.allowDangerousHTML !== undefined && !deprecationWarningIssued) {
    deprecationWarningIssued = true
    console.warn(
      'mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead'
    )
  }

  var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML
  var footnoteById = {}

  h.dangerous = dangerous
  h.definition = definitions(tree, settings)
  h.footnoteById = footnoteById
  h.footnoteOrder = []
  h.augment = augment
  h.handlers = Object.assign({}, handlers, settings.handlers)
  h.unknownHandler = settings.unknownHandler

  visit(tree, 'footnoteDefinition', onfootnotedefinition)

  return h

  // Finalise the created `right`, a hast node, from `left`, an mdast node.
  function augment(left, right) {
    var data
    var ctx

    // Handle `data.hName`, `data.hProperties, `data.hChildren`.
    if (left && 'data' in left) {
      data = left.data

      if (right.type === 'element' && data.hName) {
        right.tagName = data.hName
      }

      if (right.type === 'element' && data.hProperties) {
        right.properties = Object.assign({}, right.properties, data.hProperties)
      }

      if (right.children && data.hChildren) {
        right.children = data.hChildren
      }
    }

    ctx = left && left.position ? left : {position: left}

    if (!generated(ctx)) {
      right.position = {
        start: position.start(ctx),
        end: position.end(ctx)
      }
    }

    return right
  }

  // Create an element for `node`.
  function h(node, tagName, props, children) {
    if (
      (children === undefined || children === null) &&
      typeof props === 'object' &&
      'length' in props
    ) {
      children = props
      props = {}
    }

    return augment(node, {
      type: 'element',
      tagName: tagName,
      properties: props || {},
      children: children || []
    })
  }

  function onfootnotedefinition(definition) {
    var id = String(definition.identifier).toUpperCase()

    // Mimick CM behavior of link definitions.
    // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8d48e57/index.js#L26>.
    if (!own.call(footnoteById, id)) {
      footnoteById[id] = definition
    }
  }
}

// Transform `tree`, which is an mdast node, to a hast node.
function toHast(tree, options) {
  var h = factory(tree, options)
  var node = one(h, tree)
  var foot = footer(h)

  if (foot) {
    node.children = node.children.concat(u('text', '\n'), foot)
  }

  return node
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/one.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/one.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = one

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var all = __webpack_require__(/*! ./all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

var own = {}.hasOwnProperty

// Transform an unknown node.
function unknown(h, node) {
  if (text(node)) {
    return h.augment(node, u('text', node.value))
  }

  return h(node, 'div', all(h, node))
}

// Visit a node.
function one(h, node, parent) {
  var type = node && node.type
  var fn = own.call(h.handlers, type) ? h.handlers[type] : h.unknownHandler

  // Fail on non-nodes.
  if (!type) {
    throw new Error('Expected node, got `' + node + '`')
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}

// Check if the node should be renderered as a text node.
function text(node) {
  var data = node.data || {}

  if (
    own.call(data, 'hName') ||
    own.call(data, 'hProperties') ||
    own.call(data, 'hChildren')
  ) {
    return false
  }

  return 'value' in node
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/revert.js":
/*!******************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/revert.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = revert

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")
var all = __webpack_require__(/*! ./all */ "../../node_modules/mdast-util-to-hast/lib/all.js")

// Return the content of a reference without definition as Markdown.
function revert(h, node) {
  var subtype = node.referenceType
  var suffix = ']'
  var contents
  var head
  var tail

  if (subtype === 'collapsed') {
    suffix += '[]'
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']'
  }

  if (node.type === 'imageReference') {
    return u('text', '![' + node.alt + suffix)
  }

  contents = all(h, node)
  head = contents[0]

  if (head && head.type === 'text') {
    head.value = '[' + head.value
  } else {
    contents.unshift(u('text', '['))
  }

  tail = contents[contents.length - 1]

  if (tail && tail.type === 'text') {
    tail.value += suffix
  } else {
    contents.push(u('text', suffix))
  }

  return contents
}


/***/ }),

/***/ "../../node_modules/mdast-util-to-hast/lib/wrap.js":
/*!****************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdast-util-to-hast/lib/wrap.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = wrap

var u = __webpack_require__(/*! unist-builder */ "../../node_modules/unist-builder/index.js")

// Wrap `nodes` with line feeds between each entry.
// Optionally adds line feeds at the start and end.
function wrap(nodes, loose) {
  var result = []
  var index = -1
  var length = nodes.length

  if (loose) {
    result.push(u('text', '\n'))
  }

  while (++index < length) {
    if (index) {
      result.push(u('text', '\n'))
    }

    result.push(nodes[index])
  }

  if (loose && nodes.length !== 0) {
    result.push(u('text', '\n'))
  }

  return result
}


/***/ }),

/***/ "../../node_modules/mdurl/encode.js":
/*!*************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/mdurl/encode.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),

/***/ "../../node_modules/remark-rehype/index.js":
/*!********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/remark-rehype/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mdast2hast = __webpack_require__(/*! mdast-util-to-hast */ "../../node_modules/mdast-util-to-hast/index.js")

module.exports = remark2rehype

// Attacher.
// If a destination is given, runs the destination with the new hast tree
// (bridge mode).
// Without destination, returns the tree: further plugins run on that tree
// (mutate mode).
function remark2rehype(destination, options) {
  if (destination && !destination.process) {
    options = destination
    destination = null
  }

  return destination ? bridge(destination, options) : mutate(options)
}

// Bridge mode.
// Runs the destination with the new hast tree.
function bridge(destination, options) {
  return transformer

  function transformer(node, file, next) {
    destination.run(mdast2hast(node, options), file, done)

    function done(err) {
      next(err)
    }
  }
}

// Mutate-mode.
// Further transformers run on the hast tree.
function mutate(options) {
  return transformer

  function transformer(node) {
    return mdast2hast(node, options)
  }
}


/***/ }),

/***/ "../../node_modules/trim-lines/index.js":
/*!*****************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/trim-lines/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = trimLines

var ws = /[ \t]*\n+[ \t]*/g
var newline = '\n'

function trimLines(value) {
  return String(value).replace(ws, newline)
}


/***/ }),

/***/ "../../node_modules/unist-builder/index.js":
/*!********************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/unist-builder/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = u

function u(type, props, value) {
  var node

  if (
    (value === null || value === undefined) &&
    (typeof props !== 'object' || Array.isArray(props))
  ) {
    value = props
    props = {}
  }

  node = Object.assign({type: String(type)}, props)

  if (Array.isArray(value)) {
    node.children = value
  } else if (value !== null && value !== undefined) {
    node.value = String(value)
  }

  return node
}


/***/ }),

/***/ "../../node_modules/unist-util-generated/index.js":
/*!***************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/unist-util-generated/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = generated

function generated(node) {
  var position = optional(optional(node).position)
  var start = optional(position.start)
  var end = optional(position.end)

  return !start.line || !start.column || !end.line || !end.column
}

function optional(value) {
  return value && typeof value === 'object' ? value : {}
}


/***/ }),

/***/ "../../node_modules/unist-util-position/index.js":
/*!**************************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/unist-util-position/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var start = factory('start')
var end = factory('end')

module.exports = position

position.start = start
position.end = end

function position(node) {
  return {start: start(node), end: end(node)}
}

function factory(type) {
  point.displayName = type

  return point

  function point(node) {
    var point = (node && node.position && node.position[type]) || {}

    return {
      line: point.line || null,
      column: point.column || null,
      offset: isNaN(point.offset) ? null : point.offset
    }
  }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9kZXRhYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWRlZmluaXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2FsbC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2Jsb2NrcXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9icmVhay5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2NvZGUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9kZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9lbXBoYXNpcy5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2Zvb3Rub3RlLXJlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2Zvb3Rub3RlLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaGFuZGxlcnMvaGVhZGluZy5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9pbWFnZS1yZWZlcmVuY2UuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9pbWFnZS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaGFuZGxlcnMvaW5saW5lLWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9saW5rLXJlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL2xpbmsuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9saXN0LWl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9oYW5kbGVycy9saXN0LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaGFuZGxlcnMvcGFyYWdyYXBoLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaGFuZGxlcnMvcm9vdC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL3N0cm9uZy5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL3RhYmxlLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaGFuZGxlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLWhhc3QvbGliL2hhbmRsZXJzL3RoZW1hdGljLWJyZWFrLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8taGFzdC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9vbmUuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi9yZXZlcnQuanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1oYXN0L2xpYi93cmFwLmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL21kdXJsL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9yZW1hcmstcmVoeXBlL2luZGV4LmpzIiwid2VicGFjazovLy8vaG9tZS90cnVjbngvRlBUL2VuZ2xpc2gvZW5nbGlzaDR0b2RheS5naXRodWIuaW8vbm9kZV9tb2R1bGVzL3RyaW0tbGluZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9ob21lL3RydWNueC9GUFQvZW5nbGlzaC9lbmdsaXNoNHRvZGF5LmdpdGh1Yi5pby9ub2RlX21vZHVsZXMvdW5pc3QtYnVpbGRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLWdlbmVyYXRlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLXBvc2l0aW9uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBWTs7QUFFWjs7QUFFQSxhQUFhLG1CQUFPLENBQUMsZ0VBQWU7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7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bnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZGV0YWJcblxudmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKVxuXG52YXIgdGFiID0gMHgwOVxudmFyIGxpbmVGZWVkID0gMHgwYVxudmFyIGNhcnJpYWdlUmV0dXJuID0gMHgwZFxuXG4vLyBSZXBsYWNlIHRhYnMgd2l0aCBzcGFjZXMsIGJlaW5nIHNtYXJ0IGFib3V0IHdoaWNoIGNvbHVtbiB0aGUgdGFiIGlzIGF0IGFuZFxuLy8gd2hpY2ggc2l6ZSBzaG91bGQgYmUgdXNlZC5cbmZ1bmN0aW9uIGRldGFiKHZhbHVlLCBzaXplKSB7XG4gIHZhciBzdHJpbmcgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG4gIHZhciBsZW5ndGggPSBzdHJpbmcgJiYgdmFsdWUubGVuZ3RoXG4gIHZhciBzdGFydCA9IDBcbiAgdmFyIGluZGV4ID0gLTFcbiAgdmFyIGNvbHVtbiA9IC0xXG4gIHZhciB0YWJTaXplID0gc2l6ZSB8fCA0XG4gIHZhciByZXN1bHRzID0gW11cbiAgdmFyIGNvZGVcbiAgdmFyIGFkZFxuXG4gIGlmICghc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZXRhYiBleHBlY3RlZCBzdHJpbmcnKVxuICB9XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleClcblxuICAgIGlmIChjb2RlID09PSB0YWIpIHtcbiAgICAgIGFkZCA9IHRhYlNpemUgLSAoKGNvbHVtbiArIDEpICUgdGFiU2l6ZSlcbiAgICAgIGNvbHVtbiArPSBhZGRcbiAgICAgIHJlc3VsdHMucHVzaCh2YWx1ZS5zbGljZShzdGFydCwgaW5kZXgpICsgcmVwZWF0KCcgJywgYWRkKSlcbiAgICAgIHN0YXJ0ID0gaW5kZXggKyAxXG4gICAgfSBlbHNlIGlmIChjb2RlID09PSBsaW5lRmVlZCB8fCBjb2RlID09PSBjYXJyaWFnZVJldHVybikge1xuICAgICAgY29sdW1uID0gLTFcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uKytcbiAgICB9XG4gIH1cblxuICByZXN1bHRzLnB1c2godmFsdWUuc2xpY2Uoc3RhcnQpKVxuXG4gIHJldHVybiByZXN1bHRzLmpvaW4oJycpXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHZpc2l0ID0gcmVxdWlyZSgndW5pc3QtdXRpbC12aXNpdCcpXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RGVmaW5pdGlvbkZhY3RvcnlcblxudmFyIG93biA9IHt9Lmhhc093blByb3BlcnR5XG5cbi8vIEdldCBhIGRlZmluaXRpb24gaW4gYG5vZGVgIGJ5IGBpZGVudGlmaWVyYC5cbmZ1bmN0aW9uIGdldERlZmluaXRpb25GYWN0b3J5KG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGdldHRlckZhY3RvcnkoZ2F0aGVyKG5vZGUsIG9wdGlvbnMpKVxufVxuXG4vLyBHYXRoZXIgYWxsIGRlZmluaXRpb25zIGluIGBub2RlYFxuZnVuY3Rpb24gZ2F0aGVyKG5vZGUsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlID0ge31cblxuICBpZiAoIW5vZGUgfHwgIW5vZGUudHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbWRhc3QtdXRpbC1kZWZpbml0aW9ucyBleHBlY3RlZCBub2RlJylcbiAgfVxuXG4gIHZpc2l0KG5vZGUsICdkZWZpbml0aW9uJywgb3B0aW9ucyAmJiBvcHRpb25zLmNvbW1vbm1hcmsgPyBjb21tb25tYXJrIDogbm9ybWFsKVxuXG4gIHJldHVybiBjYWNoZVxuXG4gIGZ1bmN0aW9uIGNvbW1vbm1hcmsoZGVmaW5pdGlvbikge1xuICAgIHZhciBpZCA9IG5vcm1hbGlzZShkZWZpbml0aW9uLmlkZW50aWZpZXIpXG4gICAgaWYgKCFvd24uY2FsbChjYWNoZSwgaWQpKSB7XG4gICAgICBjYWNoZVtpZF0gPSBkZWZpbml0aW9uXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsKGRlZmluaXRpb24pIHtcbiAgICBjYWNoZVtub3JtYWxpc2UoZGVmaW5pdGlvbi5pZGVudGlmaWVyKV0gPSBkZWZpbml0aW9uXG4gIH1cbn1cblxuLy8gRmFjdG9yeSB0byBnZXQgYSBub2RlIGZyb20gdGhlIGdpdmVuIGRlZmluaXRpb24tY2FjaGUuXG5mdW5jdGlvbiBnZXR0ZXJGYWN0b3J5KGNhY2hlKSB7XG4gIHJldHVybiBnZXR0ZXJcblxuICAvLyBHZXQgYSBub2RlIGZyb20gdGhlIGJvdW5kIGRlZmluaXRpb24tY2FjaGUuXG4gIGZ1bmN0aW9uIGdldHRlcihpZGVudGlmaWVyKSB7XG4gICAgdmFyIGlkID0gaWRlbnRpZmllciAmJiBub3JtYWxpc2UoaWRlbnRpZmllcilcbiAgICByZXR1cm4gaWQgJiYgb3duLmNhbGwoY2FjaGUsIGlkKSA/IGNhY2hlW2lkXSA6IG51bGxcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpc2UoaWRlbnRpZmllcikge1xuICByZXR1cm4gaWRlbnRpZmllci50b1VwcGVyQ2FzZSgpXG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWInKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYWxsXG5cbnZhciBvbmUgPSByZXF1aXJlKCcuL29uZScpXG5cbmZ1bmN0aW9uIGFsbChoLCBwYXJlbnQpIHtcbiAgdmFyIG5vZGVzID0gcGFyZW50LmNoaWxkcmVuIHx8IFtdXG4gIHZhciBsZW5ndGggPSBub2Rlcy5sZW5ndGhcbiAgdmFyIHZhbHVlcyA9IFtdXG4gIHZhciBpbmRleCA9IC0xXG4gIHZhciByZXN1bHRcbiAgdmFyIGhlYWRcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdCA9IG9uZShoLCBub2Rlc1tpbmRleF0sIHBhcmVudClcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChpbmRleCAmJiBub2Rlc1tpbmRleCAtIDFdLnR5cGUgPT09ICdicmVhaycpIHtcbiAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHJlc3VsdC52YWx1ZS5yZXBsYWNlKC9eXFxzKy8sICcnKVxuICAgICAgICB9XG5cbiAgICAgICAgaGVhZCA9IHJlc3VsdC5jaGlsZHJlbiAmJiByZXN1bHQuY2hpbGRyZW5bMF1cblxuICAgICAgICBpZiAoaGVhZCAmJiBoZWFkLnZhbHVlKSB7XG4gICAgICAgICAgaGVhZC52YWx1ZSA9IGhlYWQudmFsdWUucmVwbGFjZSgvXlxccysvLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHJlc3VsdClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsdWVzXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUZvb3Rub3Rlc1xuXG52YXIgdGhlbWF0aWNCcmVhayA9IHJlcXVpcmUoJy4vaGFuZGxlcnMvdGhlbWF0aWMtYnJlYWsnKVxudmFyIGxpc3QgPSByZXF1aXJlKCcuL2hhbmRsZXJzL2xpc3QnKVxudmFyIHdyYXAgPSByZXF1aXJlKCcuL3dyYXAnKVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUZvb3Rub3RlcyhoKSB7XG4gIHZhciBmb290bm90ZUJ5SWQgPSBoLmZvb3Rub3RlQnlJZFxuICB2YXIgZm9vdG5vdGVPcmRlciA9IGguZm9vdG5vdGVPcmRlclxuICB2YXIgbGVuZ3RoID0gZm9vdG5vdGVPcmRlci5sZW5ndGhcbiAgdmFyIGluZGV4ID0gLTFcbiAgdmFyIGxpc3RJdGVtcyA9IFtdXG4gIHZhciBkZWZcbiAgdmFyIGJhY2tSZWZlcmVuY2VcbiAgdmFyIGNvbnRlbnRcbiAgdmFyIHRhaWxcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRlZiA9IGZvb3Rub3RlQnlJZFtmb290bm90ZU9yZGVyW2luZGV4XS50b1VwcGVyQ2FzZSgpXVxuXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgY29udGVudCA9IGRlZi5jaGlsZHJlbi5jb25jYXQoKVxuICAgIHRhaWwgPSBjb250ZW50W2NvbnRlbnQubGVuZ3RoIC0gMV1cbiAgICBiYWNrUmVmZXJlbmNlID0ge1xuICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgdXJsOiAnI2ZucmVmLScgKyBkZWYuaWRlbnRpZmllcixcbiAgICAgIGRhdGE6IHtoUHJvcGVydGllczoge2NsYXNzTmFtZTogWydmb290bm90ZS1iYWNrcmVmJ119fSxcbiAgICAgIGNoaWxkcmVuOiBbe3R5cGU6ICd0ZXh0JywgdmFsdWU6ICfihqknfV1cbiAgICB9XG5cbiAgICBpZiAoIXRhaWwgfHwgdGFpbC50eXBlICE9PSAncGFyYWdyYXBoJykge1xuICAgICAgdGFpbCA9IHt0eXBlOiAncGFyYWdyYXBoJywgY2hpbGRyZW46IFtdfVxuICAgICAgY29udGVudC5wdXNoKHRhaWwpXG4gICAgfVxuXG4gICAgdGFpbC5jaGlsZHJlbi5wdXNoKGJhY2tSZWZlcmVuY2UpXG5cbiAgICBsaXN0SXRlbXMucHVzaCh7XG4gICAgICB0eXBlOiAnbGlzdEl0ZW0nLFxuICAgICAgZGF0YToge2hQcm9wZXJ0aWVzOiB7aWQ6ICdmbi0nICsgZGVmLmlkZW50aWZpZXJ9fSxcbiAgICAgIGNoaWxkcmVuOiBjb250ZW50LFxuICAgICAgcG9zaXRpb246IGRlZi5wb3NpdGlvblxuICAgIH0pXG4gIH1cblxuICBpZiAobGlzdEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gaChcbiAgICBudWxsLFxuICAgICdkaXYnLFxuICAgIHtjbGFzc05hbWU6IFsnZm9vdG5vdGVzJ119LFxuICAgIHdyYXAoXG4gICAgICBbXG4gICAgICAgIHRoZW1hdGljQnJlYWsoaCksXG4gICAgICAgIGxpc3QoaCwge3R5cGU6ICdsaXN0Jywgb3JkZXJlZDogdHJ1ZSwgY2hpbGRyZW46IGxpc3RJdGVtc30pXG4gICAgICBdLFxuICAgICAgdHJ1ZVxuICAgIClcbiAgKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZVxuXG52YXIgd3JhcCA9IHJlcXVpcmUoJy4uL3dyYXAnKVxudmFyIGFsbCA9IHJlcXVpcmUoJy4uL2FsbCcpXG5cbmZ1bmN0aW9uIGJsb2NrcXVvdGUoaCwgbm9kZSkge1xuICByZXR1cm4gaChub2RlLCAnYmxvY2txdW90ZScsIHdyYXAoYWxsKGgsIG5vZGUpLCB0cnVlKSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhcmRCcmVha1xuXG52YXIgdSA9IHJlcXVpcmUoJ3VuaXN0LWJ1aWxkZXInKVxuXG5mdW5jdGlvbiBoYXJkQnJlYWsoaCwgbm9kZSkge1xuICByZXR1cm4gW2gobm9kZSwgJ2JyJyksIHUoJ3RleHQnLCAnXFxuJyldXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlXG5cbnZhciBkZXRhYiA9IHJlcXVpcmUoJ2RldGFiJylcbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG5cbmZ1bmN0aW9uIGNvZGUoaCwgbm9kZSkge1xuICB2YXIgdmFsdWUgPSBub2RlLnZhbHVlID8gZGV0YWIobm9kZS52YWx1ZSArICdcXG4nKSA6ICcnXG4gIHZhciBsYW5nID0gbm9kZS5sYW5nICYmIG5vZGUubGFuZy5tYXRjaCgvXlteIFxcdF0rKD89WyBcXHRdfCQpLylcbiAgdmFyIHByb3BzID0ge31cblxuICBpZiAobGFuZykge1xuICAgIHByb3BzLmNsYXNzTmFtZSA9IFsnbGFuZ3VhZ2UtJyArIGxhbmddXG4gIH1cblxuICByZXR1cm4gaChub2RlLnBvc2l0aW9uLCAncHJlJywgW2gobm9kZSwgJ2NvZGUnLCBwcm9wcywgW3UoJ3RleHQnLCB2YWx1ZSldKV0pXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpa2V0aHJvdWdoXG5cbnZhciBhbGwgPSByZXF1aXJlKCcuLi9hbGwnKVxuXG5mdW5jdGlvbiBzdHJpa2V0aHJvdWdoKGgsIG5vZGUpIHtcbiAgcmV0dXJuIGgobm9kZSwgJ2RlbCcsIGFsbChoLCBub2RlKSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcGhhc2lzXG5cbnZhciBhbGwgPSByZXF1aXJlKCcuLi9hbGwnKVxuXG5mdW5jdGlvbiBlbXBoYXNpcyhoLCBub2RlKSB7XG4gIHJldHVybiBoKG5vZGUsICdlbScsIGFsbChoLCBub2RlKSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvb3Rub3RlUmVmZXJlbmNlXG5cbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG5cbmZ1bmN0aW9uIGZvb3Rub3RlUmVmZXJlbmNlKGgsIG5vZGUpIHtcbiAgdmFyIGZvb3Rub3RlT3JkZXIgPSBoLmZvb3Rub3RlT3JkZXJcbiAgdmFyIGlkZW50aWZpZXIgPSBTdHJpbmcobm9kZS5pZGVudGlmaWVyKVxuXG4gIGlmIChmb290bm90ZU9yZGVyLmluZGV4T2YoaWRlbnRpZmllcikgPT09IC0xKSB7XG4gICAgZm9vdG5vdGVPcmRlci5wdXNoKGlkZW50aWZpZXIpXG4gIH1cblxuICByZXR1cm4gaChub2RlLnBvc2l0aW9uLCAnc3VwJywge2lkOiAnZm5yZWYtJyArIGlkZW50aWZpZXJ9LCBbXG4gICAgaChub2RlLCAnYScsIHtocmVmOiAnI2ZuLScgKyBpZGVudGlmaWVyLCBjbGFzc05hbWU6IFsnZm9vdG5vdGUtcmVmJ119LCBbXG4gICAgICB1KCd0ZXh0Jywgbm9kZS5sYWJlbCB8fCBpZGVudGlmaWVyKVxuICAgIF0pXG4gIF0pXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmb290bm90ZVxuXG52YXIgZm9vdG5vdGVSZWZlcmVuY2UgPSByZXF1aXJlKCcuL2Zvb3Rub3RlLXJlZmVyZW5jZScpXG5cbmZ1bmN0aW9uIGZvb3Rub3RlKGgsIG5vZGUpIHtcbiAgdmFyIGZvb3Rub3RlQnlJZCA9IGguZm9vdG5vdGVCeUlkXG4gIHZhciBmb290bm90ZU9yZGVyID0gaC5mb290bm90ZU9yZGVyXG4gIHZhciBpZGVudGlmaWVyID0gMVxuXG4gIHdoaWxlIChpZGVudGlmaWVyIGluIGZvb3Rub3RlQnlJZCkge1xuICAgIGlkZW50aWZpZXIrK1xuICB9XG5cbiAgaWRlbnRpZmllciA9IFN0cmluZyhpZGVudGlmaWVyKVxuXG4gIC8vIE5vIG5lZWQgdG8gY2hlY2sgaWYgYGlkZW50aWZpZXJgIGV4aXN0cyBpbiBgZm9vdG5vdGVPcmRlcmAsIGl04oCZcyBndWFyYW50ZWVkXG4gIC8vIHRvIG5vdCBleGlzdCBiZWNhdXNlIHdlIGp1c3QgZ2VuZXJhdGVkIGl0LlxuICBmb290bm90ZU9yZGVyLnB1c2goaWRlbnRpZmllcilcblxuICBmb290bm90ZUJ5SWRbaWRlbnRpZmllcl0gPSB7XG4gICAgdHlwZTogJ2Zvb3Rub3RlRGVmaW5pdGlvbicsXG4gICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICBjaGlsZHJlbjogW3t0eXBlOiAncGFyYWdyYXBoJywgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW59XSxcbiAgICBwb3NpdGlvbjogbm9kZS5wb3NpdGlvblxuICB9XG5cbiAgcmV0dXJuIGZvb3Rub3RlUmVmZXJlbmNlKGgsIHtcbiAgICB0eXBlOiAnZm9vdG5vdGVSZWZlcmVuY2UnLFxuICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgcG9zaXRpb246IG5vZGUucG9zaXRpb25cbiAgfSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRpbmdcblxudmFyIGFsbCA9IHJlcXVpcmUoJy4uL2FsbCcpXG5cbmZ1bmN0aW9uIGhlYWRpbmcoaCwgbm9kZSkge1xuICByZXR1cm4gaChub2RlLCAnaCcgKyBub2RlLmRlcHRoLCBhbGwoaCwgbm9kZSkpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBodG1sXG5cbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG5cbi8vIFJldHVybiBlaXRoZXIgYSBgcmF3YCBub2RlIGluIGRhbmdlcm91cyBtb2RlLCBvdGhlcndpc2Ugbm90aGluZy5cbmZ1bmN0aW9uIGh0bWwoaCwgbm9kZSkge1xuICByZXR1cm4gaC5kYW5nZXJvdXMgPyBoLmF1Z21lbnQobm9kZSwgdSgncmF3Jywgbm9kZS52YWx1ZSkpIDogbnVsbFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaW1hZ2VSZWZlcmVuY2VcblxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ21kdXJsL2VuY29kZScpXG52YXIgcmV2ZXJ0ID0gcmVxdWlyZSgnLi4vcmV2ZXJ0JylcblxuZnVuY3Rpb24gaW1hZ2VSZWZlcmVuY2UoaCwgbm9kZSkge1xuICB2YXIgZGVmID0gaC5kZWZpbml0aW9uKG5vZGUuaWRlbnRpZmllcilcbiAgdmFyIHByb3BzXG5cbiAgaWYgKCFkZWYpIHtcbiAgICByZXR1cm4gcmV2ZXJ0KGgsIG5vZGUpXG4gIH1cblxuICBwcm9wcyA9IHtzcmM6IG5vcm1hbGl6ZShkZWYudXJsIHx8ICcnKSwgYWx0OiBub2RlLmFsdH1cblxuICBpZiAoZGVmLnRpdGxlICE9PSBudWxsICYmIGRlZi50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHJvcHMudGl0bGUgPSBkZWYudGl0bGVcbiAgfVxuXG4gIHJldHVybiBoKG5vZGUsICdpbWcnLCBwcm9wcylcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgbm9ybWFsaXplID0gcmVxdWlyZSgnbWR1cmwvZW5jb2RlJylcblxubW9kdWxlLmV4cG9ydHMgPSBpbWFnZVxuXG5mdW5jdGlvbiBpbWFnZShoLCBub2RlKSB7XG4gIHZhciBwcm9wcyA9IHtzcmM6IG5vcm1hbGl6ZShub2RlLnVybCksIGFsdDogbm9kZS5hbHR9XG5cbiAgaWYgKG5vZGUudGl0bGUgIT09IG51bGwgJiYgbm9kZS50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHJvcHMudGl0bGUgPSBub2RlLnRpdGxlXG4gIH1cblxuICByZXR1cm4gaChub2RlLCAnaW1nJywgcHJvcHMpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vYmxvY2txdW90ZScpLFxuICBicmVhazogcmVxdWlyZSgnLi9icmVhaycpLFxuICBjb2RlOiByZXF1aXJlKCcuL2NvZGUnKSxcbiAgZGVsZXRlOiByZXF1aXJlKCcuL2RlbGV0ZScpLFxuICBlbXBoYXNpczogcmVxdWlyZSgnLi9lbXBoYXNpcycpLFxuICBmb290bm90ZVJlZmVyZW5jZTogcmVxdWlyZSgnLi9mb290bm90ZS1yZWZlcmVuY2UnKSxcbiAgZm9vdG5vdGU6IHJlcXVpcmUoJy4vZm9vdG5vdGUnKSxcbiAgaGVhZGluZzogcmVxdWlyZSgnLi9oZWFkaW5nJyksXG4gIGh0bWw6IHJlcXVpcmUoJy4vaHRtbCcpLFxuICBpbWFnZVJlZmVyZW5jZTogcmVxdWlyZSgnLi9pbWFnZS1yZWZlcmVuY2UnKSxcbiAgaW1hZ2U6IHJlcXVpcmUoJy4vaW1hZ2UnKSxcbiAgaW5saW5lQ29kZTogcmVxdWlyZSgnLi9pbmxpbmUtY29kZScpLFxuICBsaW5rUmVmZXJlbmNlOiByZXF1aXJlKCcuL2xpbmstcmVmZXJlbmNlJyksXG4gIGxpbms6IHJlcXVpcmUoJy4vbGluaycpLFxuICBsaXN0SXRlbTogcmVxdWlyZSgnLi9saXN0LWl0ZW0nKSxcbiAgbGlzdDogcmVxdWlyZSgnLi9saXN0JyksXG4gIHBhcmFncmFwaDogcmVxdWlyZSgnLi9wYXJhZ3JhcGgnKSxcbiAgcm9vdDogcmVxdWlyZSgnLi9yb290JyksXG4gIHN0cm9uZzogcmVxdWlyZSgnLi9zdHJvbmcnKSxcbiAgdGFibGU6IHJlcXVpcmUoJy4vdGFibGUnKSxcbiAgdGV4dDogcmVxdWlyZSgnLi90ZXh0JyksXG4gIHRoZW1hdGljQnJlYWs6IHJlcXVpcmUoJy4vdGhlbWF0aWMtYnJlYWsnKSxcbiAgdG9tbDogaWdub3JlLFxuICB5YW1sOiBpZ25vcmUsXG4gIGRlZmluaXRpb246IGlnbm9yZSxcbiAgZm9vdG5vdGVEZWZpbml0aW9uOiBpZ25vcmVcbn1cblxuLy8gUmV0dXJuIG5vdGhpbmcgZm9yIG5vZGVzIHRoYXQgYXJlIGlnbm9yZWQuXG5mdW5jdGlvbiBpZ25vcmUoKSB7XG4gIHJldHVybiBudWxsXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBpbmxpbmVDb2RlXG5cbnZhciBjb2xsYXBzZSA9IHJlcXVpcmUoJ2NvbGxhcHNlLXdoaXRlLXNwYWNlJylcbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG5cbmZ1bmN0aW9uIGlubGluZUNvZGUoaCwgbm9kZSkge1xuICByZXR1cm4gaChub2RlLCAnY29kZScsIFt1KCd0ZXh0JywgY29sbGFwc2Uobm9kZS52YWx1ZSkpXSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbmtSZWZlcmVuY2VcblxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ21kdXJsL2VuY29kZScpXG52YXIgcmV2ZXJ0ID0gcmVxdWlyZSgnLi4vcmV2ZXJ0JylcbnZhciBhbGwgPSByZXF1aXJlKCcuLi9hbGwnKVxuXG5mdW5jdGlvbiBsaW5rUmVmZXJlbmNlKGgsIG5vZGUpIHtcbiAgdmFyIGRlZiA9IGguZGVmaW5pdGlvbihub2RlLmlkZW50aWZpZXIpXG4gIHZhciBwcm9wc1xuXG4gIGlmICghZGVmKSB7XG4gICAgcmV0dXJuIHJldmVydChoLCBub2RlKVxuICB9XG5cbiAgcHJvcHMgPSB7aHJlZjogbm9ybWFsaXplKGRlZi51cmwgfHwgJycpfVxuXG4gIGlmIChkZWYudGl0bGUgIT09IG51bGwgJiYgZGVmLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwcm9wcy50aXRsZSA9IGRlZi50aXRsZVxuICB9XG5cbiAgcmV0dXJuIGgobm9kZSwgJ2EnLCBwcm9wcywgYWxsKGgsIG5vZGUpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCdtZHVybC9lbmNvZGUnKVxudmFyIGFsbCA9IHJlcXVpcmUoJy4uL2FsbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gbGlua1xuXG5mdW5jdGlvbiBsaW5rKGgsIG5vZGUpIHtcbiAgdmFyIHByb3BzID0ge2hyZWY6IG5vcm1hbGl6ZShub2RlLnVybCl9XG5cbiAgaWYgKG5vZGUudGl0bGUgIT09IG51bGwgJiYgbm9kZS50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHJvcHMudGl0bGUgPSBub2RlLnRpdGxlXG4gIH1cblxuICByZXR1cm4gaChub2RlLCAnYScsIHByb3BzLCBhbGwoaCwgbm9kZSkpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0SXRlbVxuXG52YXIgdSA9IHJlcXVpcmUoJ3VuaXN0LWJ1aWxkZXInKVxudmFyIHdyYXAgPSByZXF1aXJlKCcuLi93cmFwJylcbnZhciBhbGwgPSByZXF1aXJlKCcuLi9hbGwnKVxuXG5mdW5jdGlvbiBsaXN0SXRlbShoLCBub2RlLCBwYXJlbnQpIHtcbiAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICB2YXIgaGVhZCA9IGNoaWxkcmVuWzBdXG4gIHZhciByYXcgPSBhbGwoaCwgbm9kZSlcbiAgdmFyIGxvb3NlID0gcGFyZW50ID8gbGlzdExvb3NlKHBhcmVudCkgOiBsaXN0SXRlbUxvb3NlKG5vZGUpXG4gIHZhciBwcm9wcyA9IHt9XG4gIHZhciByZXN1bHRcbiAgdmFyIGNvbnRhaW5lclxuICB2YXIgaW5kZXhcbiAgdmFyIGxlbmd0aFxuICB2YXIgY2hpbGRcblxuICAvLyBUaWdodCBsaXN0cyBzaG91bGQgbm90IHJlbmRlciBgcGFyYWdyYXBoYCBub2RlcyBhcyBgcGAgZWxlbWVudHMuXG4gIGlmIChsb29zZSkge1xuICAgIHJlc3VsdCA9IHJhd1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IFtdXG4gICAgbGVuZ3RoID0gcmF3Lmxlbmd0aFxuICAgIGluZGV4ID0gLTFcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBjaGlsZCA9IHJhd1tpbmRleF1cblxuICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdwJykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNoaWxkcmVuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2hpbGQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBub2RlLmNoZWNrZWQgPT09ICdib29sZWFuJykge1xuICAgIGlmIChsb29zZSAmJiAoIWhlYWQgfHwgaGVhZC50eXBlICE9PSAncGFyYWdyYXBoJykpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KGgobnVsbCwgJ3AnLCBbXSkpXG4gICAgfVxuXG4gICAgY29udGFpbmVyID0gbG9vc2UgPyByZXN1bHRbMF0uY2hpbGRyZW4gOiByZXN1bHRcblxuICAgIGlmIChjb250YWluZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb250YWluZXIudW5zaGlmdCh1KCd0ZXh0JywgJyAnKSlcbiAgICB9XG5cbiAgICBjb250YWluZXIudW5zaGlmdChcbiAgICAgIGgobnVsbCwgJ2lucHV0Jywge1xuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICBjaGVja2VkOiBub2RlLmNoZWNrZWQsXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgICB9KVxuICAgIClcblxuICAgIC8vIEFjY29yZGluZyB0byBnaXRodWItbWFya2Rvd24tY3NzLCB0aGlzIGNsYXNzIGhpZGVzIGJ1bGxldC5cbiAgICAvLyBTZWU6IDxodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2dpdGh1Yi1tYXJrZG93bi1jc3M+LlxuICAgIHByb3BzLmNsYXNzTmFtZSA9IFsndGFzay1saXN0LWl0ZW0nXVxuICB9XG5cbiAgaWYgKGxvb3NlICYmIHJlc3VsdC5sZW5ndGggIT09IDApIHtcbiAgICByZXN1bHQgPSB3cmFwKHJlc3VsdCwgdHJ1ZSlcbiAgfVxuXG4gIHJldHVybiBoKG5vZGUsICdsaScsIHByb3BzLCByZXN1bHQpXG59XG5cbmZ1bmN0aW9uIGxpc3RMb29zZShub2RlKSB7XG4gIHZhciBsb29zZSA9IG5vZGUuc3ByZWFkXG4gIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgdmFyIGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICB2YXIgaW5kZXggPSAtMVxuXG4gIHdoaWxlICghbG9vc2UgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGxvb3NlID0gbGlzdEl0ZW1Mb29zZShjaGlsZHJlbltpbmRleF0pXG4gIH1cblxuICByZXR1cm4gbG9vc2Vcbn1cblxuZnVuY3Rpb24gbGlzdEl0ZW1Mb29zZShub2RlKSB7XG4gIHZhciBzcHJlYWQgPSBub2RlLnNwcmVhZFxuXG4gIHJldHVybiBzcHJlYWQgPT09IHVuZGVmaW5lZCB8fCBzcHJlYWQgPT09IG51bGxcbiAgICA/IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMVxuICAgIDogc3ByZWFkXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0XG5cbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vd3JhcCcpXG52YXIgYWxsID0gcmVxdWlyZSgnLi4vYWxsJylcblxuZnVuY3Rpb24gbGlzdChoLCBub2RlKSB7XG4gIHZhciBwcm9wcyA9IHt9XG4gIHZhciBuYW1lID0gbm9kZS5vcmRlcmVkID8gJ29sJyA6ICd1bCdcbiAgdmFyIGl0ZW1zXG4gIHZhciBpbmRleCA9IC0xXG4gIHZhciBsZW5ndGhcblxuICBpZiAodHlwZW9mIG5vZGUuc3RhcnQgPT09ICdudW1iZXInICYmIG5vZGUuc3RhcnQgIT09IDEpIHtcbiAgICBwcm9wcy5zdGFydCA9IG5vZGUuc3RhcnRcbiAgfVxuXG4gIGl0ZW1zID0gYWxsKGgsIG5vZGUpXG4gIGxlbmd0aCA9IGl0ZW1zLmxlbmd0aFxuXG4gIC8vIExpa2UgR2l0SHViLCBhZGQgYSBjbGFzcyBmb3IgY3VzdG9tIHN0eWxpbmcuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKFxuICAgICAgaXRlbXNbaW5kZXhdLnByb3BlcnRpZXMuY2xhc3NOYW1lICYmXG4gICAgICBpdGVtc1tpbmRleF0ucHJvcGVydGllcy5jbGFzc05hbWUuaW5kZXhPZigndGFzay1saXN0LWl0ZW0nKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIHByb3BzLmNsYXNzTmFtZSA9IFsnY29udGFpbnMtdGFzay1saXN0J11cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGgobm9kZSwgbmFtZSwgcHJvcHMsIHdyYXAoaXRlbXMsIHRydWUpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcGFyYWdyYXBoXG5cbnZhciBhbGwgPSByZXF1aXJlKCcuLi9hbGwnKVxuXG5mdW5jdGlvbiBwYXJhZ3JhcGgoaCwgbm9kZSkge1xuICByZXR1cm4gaChub2RlLCAncCcsIGFsbChoLCBub2RlKSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3RcblxudmFyIHUgPSByZXF1aXJlKCd1bmlzdC1idWlsZGVyJylcbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vd3JhcCcpXG52YXIgYWxsID0gcmVxdWlyZSgnLi4vYWxsJylcblxuZnVuY3Rpb24gcm9vdChoLCBub2RlKSB7XG4gIHJldHVybiBoLmF1Z21lbnQobm9kZSwgdSgncm9vdCcsIHdyYXAoYWxsKGgsIG5vZGUpKSkpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJvbmdcblxudmFyIGFsbCA9IHJlcXVpcmUoJy4uL2FsbCcpXG5cbmZ1bmN0aW9uIHN0cm9uZyhoLCBub2RlKSB7XG4gIHJldHVybiBoKG5vZGUsICdzdHJvbmcnLCBhbGwoaCwgbm9kZSkpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB0YWJsZVxuXG52YXIgcG9zaXRpb24gPSByZXF1aXJlKCd1bmlzdC11dGlsLXBvc2l0aW9uJylcbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vd3JhcCcpXG52YXIgYWxsID0gcmVxdWlyZSgnLi4vYWxsJylcblxuZnVuY3Rpb24gdGFibGUoaCwgbm9kZSkge1xuICB2YXIgcm93cyA9IG5vZGUuY2hpbGRyZW5cbiAgdmFyIGluZGV4ID0gcm93cy5sZW5ndGhcbiAgdmFyIGFsaWduID0gbm9kZS5hbGlnblxuICB2YXIgYWxpZ25MZW5ndGggPSBhbGlnbi5sZW5ndGhcbiAgdmFyIHJlc3VsdCA9IFtdXG4gIHZhciBwb3NcbiAgdmFyIHJvd1xuICB2YXIgb3V0XG4gIHZhciBuYW1lXG4gIHZhciBjZWxsXG5cbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICByb3cgPSByb3dzW2luZGV4XS5jaGlsZHJlblxuICAgIG5hbWUgPSBpbmRleCA9PT0gMCA/ICd0aCcgOiAndGQnXG4gICAgcG9zID0gYWxpZ25MZW5ndGhcbiAgICBvdXQgPSBbXVxuXG4gICAgd2hpbGUgKHBvcy0tKSB7XG4gICAgICBjZWxsID0gcm93W3Bvc11cbiAgICAgIG91dFtwb3NdID0gaChjZWxsLCBuYW1lLCB7YWxpZ246IGFsaWduW3Bvc119LCBjZWxsID8gYWxsKGgsIGNlbGwpIDogW10pXG4gICAgfVxuXG4gICAgcmVzdWx0W2luZGV4XSA9IGgocm93c1tpbmRleF0sICd0cicsIHdyYXAob3V0LCB0cnVlKSlcbiAgfVxuXG4gIHJldHVybiBoKFxuICAgIG5vZGUsXG4gICAgJ3RhYmxlJyxcbiAgICB3cmFwKFxuICAgICAgW1xuICAgICAgICBoKHJlc3VsdFswXS5wb3NpdGlvbiwgJ3RoZWFkJywgd3JhcChbcmVzdWx0WzBdXSwgdHJ1ZSkpLFxuICAgICAgICBoKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiBwb3NpdGlvbi5zdGFydChyZXN1bHRbMV0pLFxuICAgICAgICAgICAgZW5kOiBwb3NpdGlvbi5lbmQocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSlcbiAgICAgICAgICB9LFxuICAgICAgICAgICd0Ym9keScsXG4gICAgICAgICAgd3JhcChyZXN1bHQuc2xpY2UoMSksIHRydWUpXG4gICAgICAgIClcbiAgICAgIF0sXG4gICAgICB0cnVlXG4gICAgKVxuICApXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXh0XG5cbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG52YXIgdHJpbUxpbmVzID0gcmVxdWlyZSgndHJpbS1saW5lcycpXG5cbmZ1bmN0aW9uIHRleHQoaCwgbm9kZSkge1xuICByZXR1cm4gaC5hdWdtZW50KG5vZGUsIHUoJ3RleHQnLCB0cmltTGluZXMobm9kZS52YWx1ZSkpKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gdGhlbWF0aWNCcmVha1xuXG5mdW5jdGlvbiB0aGVtYXRpY0JyZWFrKGgsIG5vZGUpIHtcbiAgcmV0dXJuIGgobm9kZSwgJ2hyJylcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSGFzdFxuXG52YXIgdSA9IHJlcXVpcmUoJ3VuaXN0LWJ1aWxkZXInKVxudmFyIHZpc2l0ID0gcmVxdWlyZSgndW5pc3QtdXRpbC12aXNpdCcpXG52YXIgcG9zaXRpb24gPSByZXF1aXJlKCd1bmlzdC11dGlsLXBvc2l0aW9uJylcbnZhciBnZW5lcmF0ZWQgPSByZXF1aXJlKCd1bmlzdC11dGlsLWdlbmVyYXRlZCcpXG52YXIgZGVmaW5pdGlvbnMgPSByZXF1aXJlKCdtZGFzdC11dGlsLWRlZmluaXRpb25zJylcbnZhciBvbmUgPSByZXF1aXJlKCcuL29uZScpXG52YXIgZm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXInKVxudmFyIGhhbmRsZXJzID0gcmVxdWlyZSgnLi9oYW5kbGVycycpXG5cbnZhciBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG52YXIgZGVwcmVjYXRpb25XYXJuaW5nSXNzdWVkID0gZmFsc2VcblxuLy8gRmFjdG9yeSB0byB0cmFuc2Zvcm0uXG5mdW5jdGlvbiBmYWN0b3J5KHRyZWUsIG9wdGlvbnMpIHtcbiAgdmFyIHNldHRpbmdzID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIElzc3VlIGEgd2FybmluZyBpZiB0aGUgZGVwcmVjYXRlZCB0YWcgJ2FsbG93RGFuZ2Vyb3VzSFRNTCcgaXMgdXNlZFxuICBpZiAoc2V0dGluZ3MuYWxsb3dEYW5nZXJvdXNIVE1MICE9PSB1bmRlZmluZWQgJiYgIWRlcHJlY2F0aW9uV2FybmluZ0lzc3VlZCkge1xuICAgIGRlcHJlY2F0aW9uV2FybmluZ0lzc3VlZCA9IHRydWVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnbWRhc3QtdXRpbC10by1oYXN0OiBkZXByZWNhdGlvbjogYGFsbG93RGFuZ2Vyb3VzSFRNTGAgaXMgbm9uc3RhbmRhcmQsIHVzZSBgYWxsb3dEYW5nZXJvdXNIdG1sYCBpbnN0ZWFkJ1xuICAgIClcbiAgfVxuXG4gIHZhciBkYW5nZXJvdXMgPSBzZXR0aW5ncy5hbGxvd0Rhbmdlcm91c0h0bWwgfHwgc2V0dGluZ3MuYWxsb3dEYW5nZXJvdXNIVE1MXG4gIHZhciBmb290bm90ZUJ5SWQgPSB7fVxuXG4gIGguZGFuZ2Vyb3VzID0gZGFuZ2Vyb3VzXG4gIGguZGVmaW5pdGlvbiA9IGRlZmluaXRpb25zKHRyZWUsIHNldHRpbmdzKVxuICBoLmZvb3Rub3RlQnlJZCA9IGZvb3Rub3RlQnlJZFxuICBoLmZvb3Rub3RlT3JkZXIgPSBbXVxuICBoLmF1Z21lbnQgPSBhdWdtZW50XG4gIGguaGFuZGxlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBoYW5kbGVycywgc2V0dGluZ3MuaGFuZGxlcnMpXG4gIGgudW5rbm93bkhhbmRsZXIgPSBzZXR0aW5ncy51bmtub3duSGFuZGxlclxuXG4gIHZpc2l0KHRyZWUsICdmb290bm90ZURlZmluaXRpb24nLCBvbmZvb3Rub3RlZGVmaW5pdGlvbilcblxuICByZXR1cm4gaFxuXG4gIC8vIEZpbmFsaXNlIHRoZSBjcmVhdGVkIGByaWdodGAsIGEgaGFzdCBub2RlLCBmcm9tIGBsZWZ0YCwgYW4gbWRhc3Qgbm9kZS5cbiAgZnVuY3Rpb24gYXVnbWVudChsZWZ0LCByaWdodCkge1xuICAgIHZhciBkYXRhXG4gICAgdmFyIGN0eFxuXG4gICAgLy8gSGFuZGxlIGBkYXRhLmhOYW1lYCwgYGRhdGEuaFByb3BlcnRpZXMsIGBkYXRhLmhDaGlsZHJlbmAuXG4gICAgaWYgKGxlZnQgJiYgJ2RhdGEnIGluIGxlZnQpIHtcbiAgICAgIGRhdGEgPSBsZWZ0LmRhdGFcblxuICAgICAgaWYgKHJpZ2h0LnR5cGUgPT09ICdlbGVtZW50JyAmJiBkYXRhLmhOYW1lKSB7XG4gICAgICAgIHJpZ2h0LnRhZ05hbWUgPSBkYXRhLmhOYW1lXG4gICAgICB9XG5cbiAgICAgIGlmIChyaWdodC50eXBlID09PSAnZWxlbWVudCcgJiYgZGF0YS5oUHJvcGVydGllcykge1xuICAgICAgICByaWdodC5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgcmlnaHQucHJvcGVydGllcywgZGF0YS5oUHJvcGVydGllcylcbiAgICAgIH1cblxuICAgICAgaWYgKHJpZ2h0LmNoaWxkcmVuICYmIGRhdGEuaENoaWxkcmVuKSB7XG4gICAgICAgIHJpZ2h0LmNoaWxkcmVuID0gZGF0YS5oQ2hpbGRyZW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdHggPSBsZWZ0ICYmIGxlZnQucG9zaXRpb24gPyBsZWZ0IDoge3Bvc2l0aW9uOiBsZWZ0fVxuXG4gICAgaWYgKCFnZW5lcmF0ZWQoY3R4KSkge1xuICAgICAgcmlnaHQucG9zaXRpb24gPSB7XG4gICAgICAgIHN0YXJ0OiBwb3NpdGlvbi5zdGFydChjdHgpLFxuICAgICAgICBlbmQ6IHBvc2l0aW9uLmVuZChjdHgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJpZ2h0XG4gIH1cblxuICAvLyBDcmVhdGUgYW4gZWxlbWVudCBmb3IgYG5vZGVgLlxuICBmdW5jdGlvbiBoKG5vZGUsIHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIGlmIChcbiAgICAgIChjaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkcmVuID09PSBudWxsKSAmJlxuICAgICAgdHlwZW9mIHByb3BzID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ2xlbmd0aCcgaW4gcHJvcHNcbiAgICApIHtcbiAgICAgIGNoaWxkcmVuID0gcHJvcHNcbiAgICAgIHByb3BzID0ge31cbiAgICB9XG5cbiAgICByZXR1cm4gYXVnbWVudChub2RlLCB7XG4gICAgICB0eXBlOiAnZWxlbWVudCcsXG4gICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgcHJvcGVydGllczogcHJvcHMgfHwge30sXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4gfHwgW11cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25mb290bm90ZWRlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBpZCA9IFN0cmluZyhkZWZpbml0aW9uLmlkZW50aWZpZXIpLnRvVXBwZXJDYXNlKClcblxuICAgIC8vIE1pbWljayBDTSBiZWhhdmlvciBvZiBsaW5rIGRlZmluaXRpb25zLlxuICAgIC8vIFNlZTogPGh0dHBzOi8vZ2l0aHViLmNvbS9zeW50YXgtdHJlZS9tZGFzdC11dGlsLWRlZmluaXRpb25zL2Jsb2IvOGQ0OGU1Ny9pbmRleC5qcyNMMjY+LlxuICAgIGlmICghb3duLmNhbGwoZm9vdG5vdGVCeUlkLCBpZCkpIHtcbiAgICAgIGZvb3Rub3RlQnlJZFtpZF0gPSBkZWZpbml0aW9uXG4gICAgfVxuICB9XG59XG5cbi8vIFRyYW5zZm9ybSBgdHJlZWAsIHdoaWNoIGlzIGFuIG1kYXN0IG5vZGUsIHRvIGEgaGFzdCBub2RlLlxuZnVuY3Rpb24gdG9IYXN0KHRyZWUsIG9wdGlvbnMpIHtcbiAgdmFyIGggPSBmYWN0b3J5KHRyZWUsIG9wdGlvbnMpXG4gIHZhciBub2RlID0gb25lKGgsIHRyZWUpXG4gIHZhciBmb290ID0gZm9vdGVyKGgpXG5cbiAgaWYgKGZvb3QpIHtcbiAgICBub2RlLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbi5jb25jYXQodSgndGV4dCcsICdcXG4nKSwgZm9vdClcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBvbmVcblxudmFyIHUgPSByZXF1aXJlKCd1bmlzdC1idWlsZGVyJylcbnZhciBhbGwgPSByZXF1aXJlKCcuL2FsbCcpXG5cbnZhciBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG4vLyBUcmFuc2Zvcm0gYW4gdW5rbm93biBub2RlLlxuZnVuY3Rpb24gdW5rbm93bihoLCBub2RlKSB7XG4gIGlmICh0ZXh0KG5vZGUpKSB7XG4gICAgcmV0dXJuIGguYXVnbWVudChub2RlLCB1KCd0ZXh0Jywgbm9kZS52YWx1ZSkpXG4gIH1cblxuICByZXR1cm4gaChub2RlLCAnZGl2JywgYWxsKGgsIG5vZGUpKVxufVxuXG4vLyBWaXNpdCBhIG5vZGUuXG5mdW5jdGlvbiBvbmUoaCwgbm9kZSwgcGFyZW50KSB7XG4gIHZhciB0eXBlID0gbm9kZSAmJiBub2RlLnR5cGVcbiAgdmFyIGZuID0gb3duLmNhbGwoaC5oYW5kbGVycywgdHlwZSkgPyBoLmhhbmRsZXJzW3R5cGVdIDogaC51bmtub3duSGFuZGxlclxuXG4gIC8vIEZhaWwgb24gbm9uLW5vZGVzLlxuICBpZiAoIXR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vZGUsIGdvdCBgJyArIG5vZGUgKyAnYCcpXG4gIH1cblxuICByZXR1cm4gKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuIDogdW5rbm93bikoaCwgbm9kZSwgcGFyZW50KVxufVxuXG4vLyBDaGVjayBpZiB0aGUgbm9kZSBzaG91bGQgYmUgcmVuZGVyZXJlZCBhcyBhIHRleHQgbm9kZS5cbmZ1bmN0aW9uIHRleHQobm9kZSkge1xuICB2YXIgZGF0YSA9IG5vZGUuZGF0YSB8fCB7fVxuXG4gIGlmIChcbiAgICBvd24uY2FsbChkYXRhLCAnaE5hbWUnKSB8fFxuICAgIG93bi5jYWxsKGRhdGEsICdoUHJvcGVydGllcycpIHx8XG4gICAgb3duLmNhbGwoZGF0YSwgJ2hDaGlsZHJlbicpXG4gICkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuICd2YWx1ZScgaW4gbm9kZVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcmV2ZXJ0XG5cbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG52YXIgYWxsID0gcmVxdWlyZSgnLi9hbGwnKVxuXG4vLyBSZXR1cm4gdGhlIGNvbnRlbnQgb2YgYSByZWZlcmVuY2Ugd2l0aG91dCBkZWZpbml0aW9uIGFzIE1hcmtkb3duLlxuZnVuY3Rpb24gcmV2ZXJ0KGgsIG5vZGUpIHtcbiAgdmFyIHN1YnR5cGUgPSBub2RlLnJlZmVyZW5jZVR5cGVcbiAgdmFyIHN1ZmZpeCA9ICddJ1xuICB2YXIgY29udGVudHNcbiAgdmFyIGhlYWRcbiAgdmFyIHRhaWxcblxuICBpZiAoc3VidHlwZSA9PT0gJ2NvbGxhcHNlZCcpIHtcbiAgICBzdWZmaXggKz0gJ1tdJ1xuICB9IGVsc2UgaWYgKHN1YnR5cGUgPT09ICdmdWxsJykge1xuICAgIHN1ZmZpeCArPSAnWycgKyAobm9kZS5sYWJlbCB8fCBub2RlLmlkZW50aWZpZXIpICsgJ10nXG4gIH1cblxuICBpZiAobm9kZS50eXBlID09PSAnaW1hZ2VSZWZlcmVuY2UnKSB7XG4gICAgcmV0dXJuIHUoJ3RleHQnLCAnIVsnICsgbm9kZS5hbHQgKyBzdWZmaXgpXG4gIH1cblxuICBjb250ZW50cyA9IGFsbChoLCBub2RlKVxuICBoZWFkID0gY29udGVudHNbMF1cblxuICBpZiAoaGVhZCAmJiBoZWFkLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGhlYWQudmFsdWUgPSAnWycgKyBoZWFkLnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgY29udGVudHMudW5zaGlmdCh1KCd0ZXh0JywgJ1snKSlcbiAgfVxuXG4gIHRhaWwgPSBjb250ZW50c1tjb250ZW50cy5sZW5ndGggLSAxXVxuXG4gIGlmICh0YWlsICYmIHRhaWwudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgdGFpbC52YWx1ZSArPSBzdWZmaXhcbiAgfSBlbHNlIHtcbiAgICBjb250ZW50cy5wdXNoKHUoJ3RleHQnLCBzdWZmaXgpKVxuICB9XG5cbiAgcmV0dXJuIGNvbnRlbnRzXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwXG5cbnZhciB1ID0gcmVxdWlyZSgndW5pc3QtYnVpbGRlcicpXG5cbi8vIFdyYXAgYG5vZGVzYCB3aXRoIGxpbmUgZmVlZHMgYmV0d2VlbiBlYWNoIGVudHJ5LlxuLy8gT3B0aW9uYWxseSBhZGRzIGxpbmUgZmVlZHMgYXQgdGhlIHN0YXJ0IGFuZCBlbmQuXG5mdW5jdGlvbiB3cmFwKG5vZGVzLCBsb29zZSkge1xuICB2YXIgcmVzdWx0ID0gW11cbiAgdmFyIGluZGV4ID0gLTFcbiAgdmFyIGxlbmd0aCA9IG5vZGVzLmxlbmd0aFxuXG4gIGlmIChsb29zZSkge1xuICAgIHJlc3VsdC5wdXNoKHUoJ3RleHQnLCAnXFxuJykpXG4gIH1cblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpbmRleCkge1xuICAgICAgcmVzdWx0LnB1c2godSgndGV4dCcsICdcXG4nKSlcbiAgICB9XG5cbiAgICByZXN1bHQucHVzaChub2Rlc1tpbmRleF0pXG4gIH1cblxuICBpZiAobG9vc2UgJiYgbm9kZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgcmVzdWx0LnB1c2godSgndGV4dCcsICdcXG4nKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cbiIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBlbmNvZGVDYWNoZSA9IHt9O1xuXG5cbi8vIENyZWF0ZSBhIGxvb2t1cCBhcnJheSB3aGVyZSBhbnl0aGluZyBidXQgY2hhcmFjdGVycyBpbiBgY2hhcnNgIHN0cmluZ1xuLy8gYW5kIGFscGhhbnVtZXJpYyBjaGFycyBpcyBwZXJjZW50LWVuY29kZWQuXG4vL1xuZnVuY3Rpb24gZ2V0RW5jb2RlQ2FjaGUoZXhjbHVkZSkge1xuICB2YXIgaSwgY2gsIGNhY2hlID0gZW5jb2RlQ2FjaGVbZXhjbHVkZV07XG4gIGlmIChjYWNoZSkgeyByZXR1cm4gY2FjaGU7IH1cblxuICBjYWNoZSA9IGVuY29kZUNhY2hlW2V4Y2x1ZGVdID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IDEyODsgaSsrKSB7XG4gICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuXG4gICAgaWYgKC9eWzAtOWEtel0kL2kudGVzdChjaCkpIHtcbiAgICAgIC8vIGFsd2F5cyBhbGxvdyB1bmVuY29kZWQgYWxwaGFudW1lcmljIGNoYXJhY3RlcnNcbiAgICAgIGNhY2hlLnB1c2goY2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZS5wdXNoKCclJyArICgnMCcgKyBpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtMikpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleGNsdWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FjaGVbZXhjbHVkZS5jaGFyQ29kZUF0KGkpXSA9IGV4Y2x1ZGVbaV07XG4gIH1cblxuICByZXR1cm4gY2FjaGU7XG59XG5cblxuLy8gRW5jb2RlIHVuc2FmZSBjaGFyYWN0ZXJzIHdpdGggcGVyY2VudC1lbmNvZGluZywgc2tpcHBpbmcgYWxyZWFkeVxuLy8gZW5jb2RlZCBzZXF1ZW5jZXMuXG4vL1xuLy8gIC0gc3RyaW5nICAgICAgIC0gc3RyaW5nIHRvIGVuY29kZVxuLy8gIC0gZXhjbHVkZSAgICAgIC0gbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIGlnbm9yZSAoaW4gYWRkaXRpb24gdG8gYS16QS1aMC05KVxuLy8gIC0ga2VlcEVzY2FwZWQgIC0gZG9uJ3QgZW5jb2RlICclJyBpbiBhIGNvcnJlY3QgZXNjYXBlIHNlcXVlbmNlIChkZWZhdWx0OiB0cnVlKVxuLy9cbmZ1bmN0aW9uIGVuY29kZShzdHJpbmcsIGV4Y2x1ZGUsIGtlZXBFc2NhcGVkKSB7XG4gIHZhciBpLCBsLCBjb2RlLCBuZXh0Q29kZSwgY2FjaGUsXG4gICAgICByZXN1bHQgPSAnJztcblxuICBpZiAodHlwZW9mIGV4Y2x1ZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZW5jb2RlKHN0cmluZywga2VlcEVzY2FwZWQpXG4gICAga2VlcEVzY2FwZWQgID0gZXhjbHVkZTtcbiAgICBleGNsdWRlID0gZW5jb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2VlcEVzY2FwZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAga2VlcEVzY2FwZWQgPSB0cnVlO1xuICB9XG5cbiAgY2FjaGUgPSBnZXRFbmNvZGVDYWNoZShleGNsdWRlKTtcblxuICBmb3IgKGkgPSAwLCBsID0gc3RyaW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvZGUgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChrZWVwRXNjYXBlZCAmJiBjb2RlID09PSAweDI1IC8qICUgKi8gJiYgaSArIDIgPCBsKSB7XG4gICAgICBpZiAoL15bMC05YS1mXXsyfSQvaS50ZXN0KHN0cmluZy5zbGljZShpICsgMSwgaSArIDMpKSkge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGksIGkgKyAzKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA8IDEyOCkge1xuICAgICAgcmVzdWx0ICs9IGNhY2hlW2NvZGVdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhERkZGKSB7XG4gICAgICBpZiAoY29kZSA+PSAweEQ4MDAgJiYgY29kZSA8PSAweERCRkYgJiYgaSArIDEgPCBsKSB7XG4gICAgICAgIG5leHRDb2RlID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBpZiAobmV4dENvZGUgPj0gMHhEQzAwICYmIG5leHRDb2RlIDw9IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdCArPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nW2ldICsgc3RyaW5nW2kgKyAxXSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyVFRiVCRiVCRCc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ1tpXSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5lbmNvZGUuZGVmYXVsdENoYXJzICAgPSBcIjsvPzpAJj0rJCwtXy4hfionKCkjXCI7XG5lbmNvZGUuY29tcG9uZW50Q2hhcnMgPSBcIi1fLiF+KicoKVwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBtZGFzdDJoYXN0ID0gcmVxdWlyZSgnbWRhc3QtdXRpbC10by1oYXN0JylcblxubW9kdWxlLmV4cG9ydHMgPSByZW1hcmsycmVoeXBlXG5cbi8vIEF0dGFjaGVyLlxuLy8gSWYgYSBkZXN0aW5hdGlvbiBpcyBnaXZlbiwgcnVucyB0aGUgZGVzdGluYXRpb24gd2l0aCB0aGUgbmV3IGhhc3QgdHJlZVxuLy8gKGJyaWRnZSBtb2RlKS5cbi8vIFdpdGhvdXQgZGVzdGluYXRpb24sIHJldHVybnMgdGhlIHRyZWU6IGZ1cnRoZXIgcGx1Z2lucyBydW4gb24gdGhhdCB0cmVlXG4vLyAobXV0YXRlIG1vZGUpLlxuZnVuY3Rpb24gcmVtYXJrMnJlaHlwZShkZXN0aW5hdGlvbiwgb3B0aW9ucykge1xuICBpZiAoZGVzdGluYXRpb24gJiYgIWRlc3RpbmF0aW9uLnByb2Nlc3MpIHtcbiAgICBvcHRpb25zID0gZGVzdGluYXRpb25cbiAgICBkZXN0aW5hdGlvbiA9IG51bGxcbiAgfVxuXG4gIHJldHVybiBkZXN0aW5hdGlvbiA/IGJyaWRnZShkZXN0aW5hdGlvbiwgb3B0aW9ucykgOiBtdXRhdGUob3B0aW9ucylcbn1cblxuLy8gQnJpZGdlIG1vZGUuXG4vLyBSdW5zIHRoZSBkZXN0aW5hdGlvbiB3aXRoIHRoZSBuZXcgaGFzdCB0cmVlLlxuZnVuY3Rpb24gYnJpZGdlKGRlc3RpbmF0aW9uLCBvcHRpb25zKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1lclxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKG5vZGUsIGZpbGUsIG5leHQpIHtcbiAgICBkZXN0aW5hdGlvbi5ydW4obWRhc3QyaGFzdChub2RlLCBvcHRpb25zKSwgZmlsZSwgZG9uZSlcblxuICAgIGZ1bmN0aW9uIGRvbmUoZXJyKSB7XG4gICAgICBuZXh0KGVycilcbiAgICB9XG4gIH1cbn1cblxuLy8gTXV0YXRlLW1vZGUuXG4vLyBGdXJ0aGVyIHRyYW5zZm9ybWVycyBydW4gb24gdGhlIGhhc3QgdHJlZS5cbmZ1bmN0aW9uIG11dGF0ZShvcHRpb25zKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1lclxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKG5vZGUpIHtcbiAgICByZXR1cm4gbWRhc3QyaGFzdChub2RlLCBvcHRpb25zKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB0cmltTGluZXNcblxudmFyIHdzID0gL1sgXFx0XSpcXG4rWyBcXHRdKi9nXG52YXIgbmV3bGluZSA9ICdcXG4nXG5cbmZ1bmN0aW9uIHRyaW1MaW5lcyh2YWx1ZSkge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHdzLCBuZXdsaW5lKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gdVxuXG5mdW5jdGlvbiB1KHR5cGUsIHByb3BzLCB2YWx1ZSkge1xuICB2YXIgbm9kZVxuXG4gIGlmIChcbiAgICAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgJiZcbiAgICAodHlwZW9mIHByb3BzICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHByb3BzKSlcbiAgKSB7XG4gICAgdmFsdWUgPSBwcm9wc1xuICAgIHByb3BzID0ge31cbiAgfVxuXG4gIG5vZGUgPSBPYmplY3QuYXNzaWduKHt0eXBlOiBTdHJpbmcodHlwZSl9LCBwcm9wcylcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBub2RlLmNoaWxkcmVuID0gdmFsdWVcbiAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbm9kZS52YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZWRcblxuZnVuY3Rpb24gZ2VuZXJhdGVkKG5vZGUpIHtcbiAgdmFyIHBvc2l0aW9uID0gb3B0aW9uYWwob3B0aW9uYWwobm9kZSkucG9zaXRpb24pXG4gIHZhciBzdGFydCA9IG9wdGlvbmFsKHBvc2l0aW9uLnN0YXJ0KVxuICB2YXIgZW5kID0gb3B0aW9uYWwocG9zaXRpb24uZW5kKVxuXG4gIHJldHVybiAhc3RhcnQubGluZSB8fCAhc3RhcnQuY29sdW1uIHx8ICFlbmQubGluZSB8fCAhZW5kLmNvbHVtblxufVxuXG5mdW5jdGlvbiBvcHRpb25hbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHZhbHVlIDoge31cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgc3RhcnQgPSBmYWN0b3J5KCdzdGFydCcpXG52YXIgZW5kID0gZmFjdG9yeSgnZW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpdGlvblxuXG5wb3NpdGlvbi5zdGFydCA9IHN0YXJ0XG5wb3NpdGlvbi5lbmQgPSBlbmRcblxuZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xuICByZXR1cm4ge3N0YXJ0OiBzdGFydChub2RlKSwgZW5kOiBlbmQobm9kZSl9XG59XG5cbmZ1bmN0aW9uIGZhY3RvcnkodHlwZSkge1xuICBwb2ludC5kaXNwbGF5TmFtZSA9IHR5cGVcblxuICByZXR1cm4gcG9pbnRcblxuICBmdW5jdGlvbiBwb2ludChub2RlKSB7XG4gICAgdmFyIHBvaW50ID0gKG5vZGUgJiYgbm9kZS5wb3NpdGlvbiAmJiBub2RlLnBvc2l0aW9uW3R5cGVdKSB8fCB7fVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IHBvaW50LmxpbmUgfHwgbnVsbCxcbiAgICAgIGNvbHVtbjogcG9pbnQuY29sdW1uIHx8IG51bGwsXG4gICAgICBvZmZzZXQ6IGlzTmFOKHBvaW50Lm9mZnNldCkgPyBudWxsIDogcG9pbnQub2Zmc2V0XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9