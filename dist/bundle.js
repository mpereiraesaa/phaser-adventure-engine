webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 22);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 51)('wks');
var uid = __webpack_require__(/*! ./_uid */ 33);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 93);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var SRC = __webpack_require__(/*! ./_uid */ 33)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 22).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var defined = __webpack_require__(/*! ./_defined */ 24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var has = __webpack_require__(/*! ./_has */ 11);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 93);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 68)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */,
/* 22 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 23 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 22);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 27 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var asc = __webpack_require__(/*! ./_array-species-create */ 85);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 28 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 6)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 34);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 61);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 91);
  var ctx = __webpack_require__(/*! ./_ctx */ 18);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 32);
  var hide = __webpack_require__(/*! ./_hide */ 12);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
  var toLength = __webpack_require__(/*! ./_to-length */ 8);
  var toIndex = __webpack_require__(/*! ./_to-index */ 119);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
  var has = __webpack_require__(/*! ./_has */ 11);
  var classof = __webpack_require__(/*! ./_classof */ 50);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 82);
  var create = __webpack_require__(/*! ./_object-create */ 37);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 84);
  var uid = __webpack_require__(/*! ./_uid */ 33);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 27);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 52);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 87);
  var Iterators = __webpack_require__(/*! ./_iterators */ 45);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 86);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 109);
  var $DP = __webpack_require__(/*! ./_object-dp */ 7);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 29 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 114);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 51)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 117))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 30 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 33)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 11);
var setDesc = __webpack_require__(/*! ./_object-dp */ 7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 31 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 35 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 95);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 69);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 96);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 69);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 68)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 66)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 95);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 69).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 40 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 41 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var call = __webpack_require__(/*! ./_iter-call */ 107);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 82);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 84);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 42 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 43 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f;
var has = __webpack_require__(/*! ./_has */ 11);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 24);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 72);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 45 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 46 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 47 */,
/* 48 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 50 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 19);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 51 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 52 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 19);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 56 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 57 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 58 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 24);
var wks = __webpack_require__(/*! ./_wks */ 5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 59 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var meta = __webpack_require__(/*! ./_meta */ 30);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 61 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var uid = __webpack_require__(/*! ./_uid */ 33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 62 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 34) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 63 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 65 */,
/* 66 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 67 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 22);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 94);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 51)('keys');
var uid = __webpack_require__(/*! ./_uid */ 33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 69 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 70 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 71 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 18)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 72 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 73 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 71).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 74 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 75 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 76 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 77 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var defined = __webpack_require__(/*! ./_defined */ 24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 78 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 79);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 79 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 37);
var descriptor = __webpack_require__(/*! ./_property-desc */ 32);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 12)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 80 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 81 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 82 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 84 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 50);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
module.exports = __webpack_require__(/*! ./_core */ 22).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 85 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 225);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 86 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 87 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 31);
var step = __webpack_require__(/*! ./_iter-step */ 110);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 78)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var invoke = __webpack_require__(/*! ./_invoke */ 100);
var html = __webpack_require__(/*! ./_html */ 70);
var cel = __webpack_require__(/*! ./_dom-create */ 66);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 89 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 88).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 90 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 91 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toIndex = __webpack_require__(/*! ./_to-index */ 119);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 86);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 92 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

/***/ }),
/* 93 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 66)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 94 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 95 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 11);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 68)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 96 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 97 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 98 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 99 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 100);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 100 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 101 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 72);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 102 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 72) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 103 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 104 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 105 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 106 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 75);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 107 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 108 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 109 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 110 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 111 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 57)
});


/***/ }),
/* 112 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 113 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 90);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 114 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 115);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 115 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var create = __webpack_require__(/*! ./_object-create */ 37);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 78);
var step = __webpack_require__(/*! ./_iter-step */ 110);
var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var fastKey = __webpack_require__(/*! ./_meta */ 30).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 116 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 115);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 117 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 27)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var meta = __webpack_require__(/*! ./_meta */ 30);
var assign = __webpack_require__(/*! ./_object-assign */ 98);
var weak = __webpack_require__(/*! ./_collection-weak */ 118);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 60)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 118 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var getWeak = __webpack_require__(/*! ./_meta */ 30).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 27);
var $has = __webpack_require__(/*! ./_has */ 11);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 119 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 120 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 121 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 122 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var repeat = __webpack_require__(/*! ./_string-repeat */ 74);
var defined = __webpack_require__(/*! ./_defined */ 24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 123 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var isEnum = __webpack_require__(/*! ./_object-pie */ 49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 124 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50);
var from = __webpack_require__(/*! ./_array-from-iterable */ 125);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 125 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 126 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 127 */,
/* 128 */,
/* 129 */
/*!************************************!*\
  !*** ./src/engine/PNCAdventure.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scene = __webpack_require__(/*! ./Scene */ 343);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Plugin) {
  _inherits(_class, _Phaser$Plugin);

  function _class(game, parent) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, parent));

    console.debug("Point and click adventure plugin initialised");
    _this.scenes = {};
    _this.initSignals();
    _this.navGraph;
    return _this;
  }

  _createClass(_class, [{
    key: "initSignals",
    value: function initSignals() {
      this.signals = {
        sceneTappedSignal: new Phaser.Signal(),
        playerMovementSignal: new Phaser.Signal(),
        navGraphUpdated: new Phaser.Signal()
      };

      this.signals.navGraphUpdated.add(function (graph) {
        this.navGraph = graph;
      }, this);
    }

    /**
     * addScene - adds a new scene to the game
     * @param {String} key - the name to refer to this scene
     * @param {Object} sceneDefinition - JSON object with scene data
     * @param {boolean} switchTo - whether to switch to this scene immediately or not
     * @return {Phaser.Plugin.PNCAdventure.Scene} the resulting scene state object
     */

  }, {
    key: "addScene",
    value: function addScene(key, sceneDefinition, switchTo) {
      if (this.scenes[key] !== undefined) {
        console.error("Scene " + key + " already exists");
        return false;
      }
      this.scenes[key] = new _Scene2.default(key, sceneDefinition);
      this.game.state.add("PNC." + key, this.scenes[key], switchTo);
      return this.scenes[key];
    }

    /**
     * adds an actor to the scene
     * @param {Phaser.Plugin.PNCAdventure.Scene} scene - the scene to add the actor to
     * @param {Object} actorDefinition - json data for this actor
     */

  }, {
    key: "addActor",
    value: function addActor(scene, actorDefinition) {
      return scene.initActor(actorDefinition);
    }
  }]);

  return _class;
}(Phaser.Plugin);

exports.default = _class;

/***/ }),
/* 130 */
/*!*****************************!*\
  !*** ./src/engine/Actor.js ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
  _inherits(_class, _Phaser$Sprite);

  /**
   * Actor object extends the Phaser.Sprite object and represents a character
   */
  function _class(game, actorDefinition) {
    _classCallCheck(this, _class);

    if (actorDefinition === undefined) {
      actorDefinition = {
        x: 0,
        y: 0,
        image: "",
        frame: 0
      };
    }

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, actorDefinition.x, actorDefinition.y, actorDefinition.image, actorDefinition.frame));

    _this.anchor.setTo(0.5, 1);

    _this.walkSpeed = 50;
    _this.averageWalkSpeed = 100;

    console.debug("Actor initialised");
    return _this;
  }

  _createClass(_class, [{
    key: "walkTo",
    value: function walkTo(point, walkSpeed) {
      if (!walkSpeed) {
        walkSpeed = this.walkSpeed;
      }
      if (this.walkingTween) {
        this.walkingTween.stop();
        this.walkingTween = null;
      }
      var distance = Phaser.Math.distance(this.x, this.y, point.x, point.y);
      this.walkingTween = this.game.add.tween(this).to({
        x: point.x,
        y: point.y
      }, distance * this.averageWalkSpeed * (1 / walkSpeed)).start();
    }
  }, {
    key: "walkPath",
    value: function walkPath(path, polys, finalPoint, walkSpeed) {
      if (!walkSpeed) {
        walkSpeed = this.walkSpeed;
      }
      if (this.walkingTween) {
        this.walkingTween.stop();
        this.walkingTween = null;
      }
      this.walkingTween = this.game.add.tween(this);

      for (var i = 0; i < path.length; i++) {
        var point = polys[path[i]].centroid;
        var distance = Phaser.Math.distance(this.x, this.y, point.x, point.y);
        if (i == path.length - 1 && polys[path[i]].contains(finalPoint.x, finalPoint.y)) {
          this.walkingTween.to({
            x: finalPoint.x,
            y: finalPoint.y
          }, distance * walkSpeed / 10, Phaser.Easing.Linear.None);
        } else {
          if (distance != 0) {
            this.walkingTween.to({
              x: point.x,
              y: point.y
            }, distance * walkSpeed / 10, Phaser.Easing.Linear.None);
          }
        }
      }

      this.walkingTween.start();
    }
  }]);

  return _class;
}(Phaser.Sprite);

exports.default = _class;

/***/ }),
/* 131 */
/*!******************************************!*\
  !*** ./src/plugins/slick-ui/src/Core.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./Plugin */ 348);

__webpack_require__(/*! ./Container/Container */ 349);

__webpack_require__(/*! ./Element/Button */ 350);

__webpack_require__(/*! ./Element/Checkbox */ 351);

__webpack_require__(/*! ./Element/DisplayObject */ 352);

__webpack_require__(/*! ./Element/Panel */ 353);

__webpack_require__(/*! ./Element/Slider */ 354);

__webpack_require__(/*! ./Element/Text */ 355);

__webpack_require__(/*! ./Element/TextField */ 356);

__webpack_require__(/*! ./Keyboard/Key */ 357);

__webpack_require__(/*! ./Keyboard/Keyboard */ 358);

__webpack_require__(/*! ./Element/Renderer/ButtonRenderer */ 359);

__webpack_require__(/*! ./Element/Renderer/CheckboxRenderer */ 360);

__webpack_require__(/*! ./Element/Renderer/KeyRenderer */ 361);

__webpack_require__(/*! ./Element/Renderer/KeyboardRenderer */ 362);

__webpack_require__(/*! ./Element/Renderer/PanelRenderer */ 363);

__webpack_require__(/*! ./Element/Renderer/SliderRenderer */ 364);

__webpack_require__(/*! ./Element/Renderer/TextFieldRenderer */ 365);

/***/ }),
/* 132 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */133);
module.exports = __webpack_require__(/*! /var/www/project-phaser/src/main.js */335);


/***/ }),
/* 133 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 134);

__webpack_require__(/*! regenerator-runtime/runtime */ 331);

__webpack_require__(/*! core-js/fn/regexp/escape */ 332);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 47)))

/***/ }),
/* 134 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 135);
__webpack_require__(/*! ./modules/es6.object.create */ 137);
__webpack_require__(/*! ./modules/es6.object.define-property */ 138);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 139);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 140);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 141);
__webpack_require__(/*! ./modules/es6.object.keys */ 142);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 143);
__webpack_require__(/*! ./modules/es6.object.freeze */ 144);
__webpack_require__(/*! ./modules/es6.object.seal */ 145);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 146);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 147);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 148);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 149);
__webpack_require__(/*! ./modules/es6.object.assign */ 150);
__webpack_require__(/*! ./modules/es6.object.is */ 151);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 153);
__webpack_require__(/*! ./modules/es6.object.to-string */ 154);
__webpack_require__(/*! ./modules/es6.function.bind */ 155);
__webpack_require__(/*! ./modules/es6.function.name */ 156);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 157);
__webpack_require__(/*! ./modules/es6.parse-int */ 158);
__webpack_require__(/*! ./modules/es6.parse-float */ 159);
__webpack_require__(/*! ./modules/es6.number.constructor */ 160);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 161);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 162);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 163);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 164);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 165);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 166);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 167);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 168);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 169);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 170);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 171);
__webpack_require__(/*! ./modules/es6.math.acosh */ 172);
__webpack_require__(/*! ./modules/es6.math.asinh */ 173);
__webpack_require__(/*! ./modules/es6.math.atanh */ 174);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 175);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 176);
__webpack_require__(/*! ./modules/es6.math.cosh */ 177);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 178);
__webpack_require__(/*! ./modules/es6.math.fround */ 179);
__webpack_require__(/*! ./modules/es6.math.hypot */ 180);
__webpack_require__(/*! ./modules/es6.math.imul */ 181);
__webpack_require__(/*! ./modules/es6.math.log10 */ 182);
__webpack_require__(/*! ./modules/es6.math.log1p */ 183);
__webpack_require__(/*! ./modules/es6.math.log2 */ 184);
__webpack_require__(/*! ./modules/es6.math.sign */ 185);
__webpack_require__(/*! ./modules/es6.math.sinh */ 186);
__webpack_require__(/*! ./modules/es6.math.tanh */ 187);
__webpack_require__(/*! ./modules/es6.math.trunc */ 188);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 189);
__webpack_require__(/*! ./modules/es6.string.raw */ 190);
__webpack_require__(/*! ./modules/es6.string.trim */ 191);
__webpack_require__(/*! ./modules/es6.string.iterator */ 192);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 193);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 194);
__webpack_require__(/*! ./modules/es6.string.includes */ 195);
__webpack_require__(/*! ./modules/es6.string.repeat */ 196);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 197);
__webpack_require__(/*! ./modules/es6.string.anchor */ 198);
__webpack_require__(/*! ./modules/es6.string.big */ 199);
__webpack_require__(/*! ./modules/es6.string.blink */ 200);
__webpack_require__(/*! ./modules/es6.string.bold */ 201);
__webpack_require__(/*! ./modules/es6.string.fixed */ 202);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 203);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 204);
__webpack_require__(/*! ./modules/es6.string.italics */ 205);
__webpack_require__(/*! ./modules/es6.string.link */ 206);
__webpack_require__(/*! ./modules/es6.string.small */ 207);
__webpack_require__(/*! ./modules/es6.string.strike */ 208);
__webpack_require__(/*! ./modules/es6.string.sub */ 209);
__webpack_require__(/*! ./modules/es6.string.sup */ 210);
__webpack_require__(/*! ./modules/es6.date.now */ 211);
__webpack_require__(/*! ./modules/es6.date.to-json */ 212);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 213);
__webpack_require__(/*! ./modules/es6.date.to-string */ 215);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 216);
__webpack_require__(/*! ./modules/es6.array.is-array */ 218);
__webpack_require__(/*! ./modules/es6.array.from */ 219);
__webpack_require__(/*! ./modules/es6.array.of */ 220);
__webpack_require__(/*! ./modules/es6.array.join */ 221);
__webpack_require__(/*! ./modules/es6.array.slice */ 222);
__webpack_require__(/*! ./modules/es6.array.sort */ 223);
__webpack_require__(/*! ./modules/es6.array.for-each */ 224);
__webpack_require__(/*! ./modules/es6.array.map */ 226);
__webpack_require__(/*! ./modules/es6.array.filter */ 227);
__webpack_require__(/*! ./modules/es6.array.some */ 228);
__webpack_require__(/*! ./modules/es6.array.every */ 229);
__webpack_require__(/*! ./modules/es6.array.reduce */ 230);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 231);
__webpack_require__(/*! ./modules/es6.array.index-of */ 232);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 233);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 234);
__webpack_require__(/*! ./modules/es6.array.fill */ 235);
__webpack_require__(/*! ./modules/es6.array.find */ 236);
__webpack_require__(/*! ./modules/es6.array.find-index */ 237);
__webpack_require__(/*! ./modules/es6.array.species */ 238);
__webpack_require__(/*! ./modules/es6.array.iterator */ 87);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 239);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 240);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 111);
__webpack_require__(/*! ./modules/es6.regexp.match */ 241);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 242);
__webpack_require__(/*! ./modules/es6.regexp.search */ 243);
__webpack_require__(/*! ./modules/es6.regexp.split */ 244);
__webpack_require__(/*! ./modules/es6.promise */ 245);
__webpack_require__(/*! ./modules/es6.map */ 114);
__webpack_require__(/*! ./modules/es6.set */ 116);
__webpack_require__(/*! ./modules/es6.weak-map */ 117);
__webpack_require__(/*! ./modules/es6.weak-set */ 246);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 247);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 248);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 249);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 250);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 251);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 252);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 253);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 254);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 255);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 256);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 257);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 258);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 259);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 260);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 261);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 262);
__webpack_require__(/*! ./modules/es6.reflect.get */ 263);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 264);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 265);
__webpack_require__(/*! ./modules/es6.reflect.has */ 266);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 267);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 268);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 269);
__webpack_require__(/*! ./modules/es6.reflect.set */ 270);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 271);
__webpack_require__(/*! ./modules/es7.array.includes */ 272);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 273);
__webpack_require__(/*! ./modules/es7.array.flatten */ 274);
__webpack_require__(/*! ./modules/es7.string.at */ 275);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 276);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 277);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 278);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 279);
__webpack_require__(/*! ./modules/es7.string.match-all */ 280);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 281);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 282);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 283);
__webpack_require__(/*! ./modules/es7.object.values */ 284);
__webpack_require__(/*! ./modules/es7.object.entries */ 285);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 286);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 287);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 288);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 289);
__webpack_require__(/*! ./modules/es7.map.to-json */ 290);
__webpack_require__(/*! ./modules/es7.set.to-json */ 291);
__webpack_require__(/*! ./modules/es7.map.of */ 292);
__webpack_require__(/*! ./modules/es7.set.of */ 293);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 294);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 295);
__webpack_require__(/*! ./modules/es7.map.from */ 296);
__webpack_require__(/*! ./modules/es7.set.from */ 297);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 298);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 299);
__webpack_require__(/*! ./modules/es7.global */ 300);
__webpack_require__(/*! ./modules/es7.system.global */ 301);
__webpack_require__(/*! ./modules/es7.error.is-error */ 302);
__webpack_require__(/*! ./modules/es7.math.clamp */ 303);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 304);
__webpack_require__(/*! ./modules/es7.math.degrees */ 305);
__webpack_require__(/*! ./modules/es7.math.fscale */ 306);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 307);
__webpack_require__(/*! ./modules/es7.math.isubh */ 308);
__webpack_require__(/*! ./modules/es7.math.imulh */ 309);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 310);
__webpack_require__(/*! ./modules/es7.math.radians */ 311);
__webpack_require__(/*! ./modules/es7.math.scale */ 312);
__webpack_require__(/*! ./modules/es7.math.umulh */ 313);
__webpack_require__(/*! ./modules/es7.math.signbit */ 314);
__webpack_require__(/*! ./modules/es7.promise.finally */ 315);
__webpack_require__(/*! ./modules/es7.promise.try */ 316);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 317);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 318);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 319);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 320);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 321);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 322);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 323);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 324);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 325);
__webpack_require__(/*! ./modules/es7.asap */ 326);
__webpack_require__(/*! ./modules/es7.observable */ 327);
__webpack_require__(/*! ./modules/web.timers */ 328);
__webpack_require__(/*! ./modules/web.immediate */ 329);
__webpack_require__(/*! ./modules/web.dom.iterable */ 330);
module.exports = __webpack_require__(/*! ./modules/_core */ 22);


/***/ }),
/* 135 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var META = __webpack_require__(/*! ./_meta */ 30).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 51);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var uid = __webpack_require__(/*! ./_uid */ 33);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 94);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 67);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 136);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var _create = __webpack_require__(/*! ./_object-create */ 37);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 97);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $DP = __webpack_require__(/*! ./_object-dp */ 7);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 49).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 34)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 136 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 137 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 37) });


/***/ }),
/* 138 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f });


/***/ }),
/* 139 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 96) });


/***/ }),
/* 140 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 26)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 141 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 26)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 142 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);

__webpack_require__(/*! ./_object-sap */ 26)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 143 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 26)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 97).f;
});


/***/ }),
/* 144 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 145 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 146 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 147 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 148 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 149 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 150 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 98) });


/***/ }),
/* 151 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 152) });


/***/ }),
/* 152 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 153 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 71).set });


/***/ }),
/* 154 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 50);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 155 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 99) });


/***/ }),
/* 156 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 157 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 158 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 101);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 159 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 102);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 160 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var cof = __webpack_require__(/*! ./_cof */ 19);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 37)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 13)(global, NUMBER, $Number);
}


/***/ }),
/* 161 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 103);
var repeat = __webpack_require__(/*! ./_string-repeat */ 74);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 162 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 103);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 163 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 164 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 165 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 104) });


/***/ }),
/* 166 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 167 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 104);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 168 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 169 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 170 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 102);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 171 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 101);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 172 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 105);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 173 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 174 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 175 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 75);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 176 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 177 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 178 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 76);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 179 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 106) });


/***/ }),
/* 180 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 181 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 182 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 183 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 105) });


/***/ }),
/* 184 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 185 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 75) });


/***/ }),
/* 186 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 76);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 187 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 76);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 188 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 189 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 190 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 191 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 44)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 192 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 77)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 78)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 193 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 77)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 194 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 80);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 195 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 80);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 196 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 74)
});


/***/ }),
/* 197 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 80);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 198 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 199 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 200 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 201 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 202 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 203 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 204 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 205 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 206 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 207 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 208 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 209 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 210 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 211 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 212 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 213 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 214);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 214 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 215 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 216 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 217));


/***/ }),
/* 217 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 218 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 54) });


/***/ }),
/* 219 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 107);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 82);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var createProperty = __webpack_require__(/*! ./_create-property */ 83);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 84);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 56)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 220 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 83);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 221 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 48) != Object || !__webpack_require__(/*! ./_strict-method */ 20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 222 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 70);
var cof = __webpack_require__(/*! ./_cof */ 19);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 223 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 224 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 27)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 225 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 226 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 27)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 27)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 27)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 229 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 27)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 230 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 108);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 231 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 108);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 232 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 233 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 234 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 109) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('copyWithin');


/***/ }),
/* 235 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 86) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('fill');


/***/ }),
/* 236 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 27)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 237 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 27)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 238 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 39)('Array');


/***/ }),
/* 239 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73);
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 13)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 39)('RegExp');


/***/ }),
/* 240 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 111);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 241 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 242 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 243 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 244 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 245 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var classof = __webpack_require__(/*! ./_classof */ 50);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var task = __webpack_require__(/*! ./_task */ 88).set;
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 90);
var perform = __webpack_require__(/*! ./_perform */ 112);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 113);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 43)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 39)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 22)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 56)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 246 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 118);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 60)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 247 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 91);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 39)(ARRAY_BUFFER);


/***/ }),
/* 248 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 61).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 91).DataView
});


/***/ }),
/* 249 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 252 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 257 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 258 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 259 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 37);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 99);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 260 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 261 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 262 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 79)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 263 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 264 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 265 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 266 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 267 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 268 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 120) });


/***/ }),
/* 269 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 270 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 271 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 71);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 272 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('includes');


/***/ }),
/* 273 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 121);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 85);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatMap');


/***/ }),
/* 274 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 121);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 85);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatten');


/***/ }),
/* 275 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 77)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 276 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 122);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 277 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 122);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 278 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 279 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 280 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var getFlags = __webpack_require__(/*! ./_flags */ 57);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 79)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 281 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 67)('asyncIterator');


/***/ }),
/* 282 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 67)('observable');


/***/ }),
/* 283 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 120);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var createProperty = __webpack_require__(/*! ./_create-property */ 83);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 284 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 123)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 285 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 123)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 286 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 287 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 288 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 289 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 290 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 124)('Map') });


/***/ }),
/* 291 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 124)('Set') });


/***/ }),
/* 292 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Map');


/***/ }),
/* 293 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Set');


/***/ }),
/* 294 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakMap');


/***/ }),
/* 295 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakSet');


/***/ }),
/* 296 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Map');


/***/ }),
/* 297 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Set');


/***/ }),
/* 298 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakMap');


/***/ }),
/* 299 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakSet');


/***/ }),
/* 300 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 301 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 302 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 303 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 304 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 305 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 306 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 126);
var fround = __webpack_require__(/*! ./_math-fround */ 106);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 307 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 308 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 309 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 310 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 311 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 312 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 126) });


/***/ }),
/* 313 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 314 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 315 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 22);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 113);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 316 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 90);
var perform = __webpack_require__(/*! ./_perform */ 112);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 317 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 318 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 319 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 320 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 116);
var from = __webpack_require__(/*! ./_array-from-iterable */ 125);
var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 321 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 322 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 323 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 324 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 325 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 29);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 326 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 327 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 22);
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var hide = __webpack_require__(/*! ./_hide */ 12);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 39)('Observable');


/***/ }),
/* 328 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 329 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 88);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 330 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 87);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 331 */
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

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
  runtime.wrap = wrap;

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
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
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
  runtime.awrap = function(arg) {
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
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

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
        if (delegate.iterator.return) {
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
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
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
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
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

  runtime.keys = function(object) {
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
        var i = -1, next = function next() {
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
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
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
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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

        return !! caught;
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
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

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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

    delegateYield: function(iterable, resultName, nextLoc) {
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
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 47)))

/***/ }),
/* 332 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 333);
module.exports = __webpack_require__(/*! ../../modules/_core */ 22).RegExp.escape;


/***/ }),
/* 333 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 334)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 334 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 335 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 127);

__webpack_require__(/*! p2 */ 128);

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _index = __webpack_require__(/*! ./index */ 340);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(/*! ./config */ 376);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var docElement = document.documentElement;
    var width = docElement.clientWidth;
    var height = docElement.clientHeight;

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, width, height, _phaser2.default.CANVAS, 'content', null));

    if (!window.cordova) {
      (0, _index2.default)(_this);
    }
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

window.game = new Game();

if (window.cordova) {
  var app = {
    initialize: function initialize() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    onDeviceReady: function onDeviceReady() {
      this.receivedEvent('deviceready');

      // When the device is ready, start Phaser Boot state.
      (0, _index2.default)(this);
    },

    receivedEvent: function receivedEvent(id) {
      console.log('Received Event: ' + id);
    }
  };

  app.initialize();
}

/***/ }),
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = __webpack_require__(/*! ./states/Lobby/Index */ 341);

var _Index2 = __webpack_require__(/*! ./states/Selector/Index */ 366);

var _Index3 = __webpack_require__(/*! ./states/TestStage/Index */ 371);

var Start = function Start(game) {
  game.state.add("SelectorBoot", _Index2.Selector.BootState, false);
  game.state.add("SelectorSplash", _Index2.Selector.SplashState, false);
  game.state.add("SelectorGame", _Index2.Selector.GameState, false);

  game.state.add("TestStageBoot", _Index3.TestStage.BootState, false);
  game.state.add("TestStageSplash", _Index3.TestStage.SplashState, false);
  game.state.add("TestStageGame", _Index3.TestStage.GameState, false);

  game.state.add("LobbyBoot", _Index.Lobby.BootState, false);
  game.state.add("LobbySplash", _Index.Lobby.SplashState, false);
  game.state.add("LobbyGame", _Index.Lobby.GameState, false);

  game.state.start("LobbyBoot");
};

exports.default = Start;

/***/ }),
/* 341 */
/*!***********************************!*\
  !*** ./src/states/Lobby/Index.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lobby = undefined;

var _Boot = __webpack_require__(/*! ./Boot */ 342);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 346);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 347);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lobby = exports.Lobby = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 342 */
/*!**********************************!*\
  !*** ./src/states/Lobby/Boot.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _PNCAdventure = __webpack_require__(/*! ../../engine/PNCAdventure */ 129);

var _PNCAdventure2 = _interopRequireDefault(_PNCAdventure);

var _webfontloader = __webpack_require__(/*! webfontloader */ 65);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#000000';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'Loading Main Level', { font: '16px Arial', fill: '#000000', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      // load your assets
      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');

      // Hud stuff
      this.load.image("chat-rooms-icon", "./assets/images/lobby/chat_rooms.png");
      this.load.image("friends-icon", "./assets/images/lobby/friends-logo.png");
      this.load.image("grass-tex", "./assets/images/lobby/grass.jpg");
      this.load.image("my-house-btn", "./assets/images/lobby/house_btn.png");
      this.load.image("view-houses-icon", "./assets/images/lobby/houses_rooms.png");
      this.load.image("settings-icon", "./assets/images/lobby/settings-logo.png");
      this.load.image("store-icon", "./assets/images/lobby/store.png");
      this.load.image("video-room-icon", "./assets/images/lobby/video_rooms.png");

      this.load.image("lobby-bg", "./assets/images/lobby/lobby_bg.png");
    }
  }, {
    key: 'create',
    value: function create() {
      // Register the plugin with Phaser
      this.game.pncPlugin = this.game.plugins.add(_PNCAdventure2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('LobbySplash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 343 */
/*!*****************************!*\
  !*** ./src/engine/Scene.js ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Navmesh = __webpack_require__(/*! ./Navmesh */ 344);

var _Navmesh2 = _interopRequireDefault(_Navmesh);

var _Actor = __webpack_require__(/*! ./Actor */ 130);

var _Actor2 = _interopRequireDefault(_Actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_Phaser$State) {
  _inherits(Scene, _Phaser$State);

  function Scene(key, sceneDefinition) {
    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

    _this.key = key;
    _this.sceneDefinition = sceneDefinition;
    _this.preloadItems = [];
    _this.actors = [];
    return _this;
  }

  _createClass(Scene, [{
    key: 'preload',
    value: function preload() {
      /*
      Hacky implementation for now - need to standardise scenedef and process this separately
       */
      if (this.sceneDefinition.bg) {
        this.game.load.image(this.key + "bg", this.sceneDefinition.bg);
      }
      if (this.sceneDefinition.player) {
        this.game.load.image(this.sceneDefinition.player.image, this.sceneDefinition.player.image);
      }
    }
  }, {
    key: 'create',
    value: function create() {
      console.debug("Scene initialised");
      this.createSceneHierarchy();
      if (this.sceneDefinition.bg) {
        this.initBackground();
      }
      if (this.actors.length > 0) {
        for (var i = 0; i < this.actors.length; i++) {
          this.actors[i] = this.addActorToScene(this.actors[i]);
        }
      }

      if (_Navmesh2.default) {
        this.navmesh = new _Navmesh2.default(game);

        this.navmesh.backgroundScale = { x: this.scaleX, y: this.scaleY };

        if (this.sceneDefinition.navmeshPoints) {
          this.navmeshPoints = this.sceneDefinition.navmeshPoints;
          this.navmesh.loadPolygonFromNodes(this.navmeshPoints);
        }
        if (this.sceneDefinition.shape) {
          this.navmesh.loadSolidPolygonFromNodes(this.sceneDefinition.shape);
        }
        if (this.sceneDefinition.points) {
          var nodes = this.sceneDefinition.points;
          for (var i = 0; i < nodes.length; i++) {
            this.navmesh.addPoint(nodes[i]);
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.background.input.pointerOver()) {
        this.navmesh.updatePointerLocation(this.background.input.pointerX(), this.background.input.pointerY());
      }
      this.navmesh.updateCharacterLocation(this.actors[0].x, this.actors[0].y);
    }
  }, {
    key: 'setNavGraph',
    value: function setNavGraph(graph) {
      this.graph = graph;
    }
  }, {
    key: 'addNavmeshPoly',
    value: function addNavmeshPoly(poly) {
      this.navmesh.push(poly);
    }
  }, {
    key: 'setNavmeshPolys',
    value: function setNavmeshPolys(navmeshPolys) {
      this.navmesh = navmeshPolys;
    }
  }, {
    key: 'loadJSONPolyData',
    value: function loadJSONPolyData(data) {
      this.navmesh = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i]._points) {
          data[i].points = data[i]._points;
          data[i]._points = null;
        }

        var poly = new Phaser.Polygon(data[i].points);
        poly.centroid = data[i].centroid;

        this.navmesh.push(poly);
      }
      if (!data.length && data[0].points) {
        return;
      }
    }
  }, {
    key: 'addLayer',
    value: function addLayer(name) {
      if (this.layers === undefined) {
        this.layers = {};
      } else if (this.layers[name] !== undefined) {
        console.error("Layer " + name + " already exists");
        return;
      }
      console.debug("Layer " + name + " added");
      this.layers[name] = this.game.add.group();
      this.sceneGroup.add(this.layers[name]);
      return this.layers[name];
    }
  }, {
    key: 'createSceneHierarchy',
    value: function createSceneHierarchy() {
      this.sceneGroup = this.game.add.group();

      this.addLayer("background");
      this.addLayer("actors");
    }

    /**
     * initBackground - create the background sprite
     */

  }, {
    key: 'initBackground',
    value: function initBackground() {
      this.background = this.game.add.sprite(0, 0, this.key + "bg");
      this.scaleX = this.game.width / this.background.width;
      this.scaleY = this.game.height / this.background.height;

      this.background.scale.setTo(this.scaleX, this.scaleY);
      this.layers.background.add(this.background);
      this.background.inputEnabled = true;
      this.background.events.onInputUp.add(function (sprite, pointer, g) {
        console.log('x: ' + pointer.x + ', y: ' + pointer.y);
        this.game.pncPlugin.signals.sceneTappedSignal.dispatch(pointer, this.navmesh);
      }, this);
    }

    /**
     * initialises an actor into the scene. This does not directly create an actor object.
     * If scene is active, it is added immediately. If inactive, adds to actors array to be added later.
     * @param  {[type]} actorDefinition [description]
     * @return {[type]}                 [description]
     */

  }, {
    key: 'initActor',
    value: function initActor(actorDefinition) {
      // if this state is not active defer actor creation until it is
      if (!this.state) {
        this.actors.push(actorDefinition);
      } else {
        this.addActorToScene(actorDefinition);
      }
    }

    /**
     * Creates the actor object and adds to the actors layer.
     * @param {Object} actorDefinition - the actor definition data
     */

  }, {
    key: 'addActorToScene',
    value: function addActorToScene(actorDefinition) {
      var actor;

      if (actorDefinition.type === undefined) {
        actor = new _Actor2.default(game, actorDefinition);
        this.layers.actors.add(actor);
      } else {
        actor = new actorDefinition.type(game, actorDefinition);
        this.layers.actors.add(actor);
      }

      return actor;
    }
  }]);

  return Scene;
}(Phaser.State);

exports.default = Scene;

/***/ }),
/* 344 */
/*!*******************************!*\
  !*** ./src/engine/Navmesh.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constellation = __webpack_require__(/*! ./lib/constellation */ 345);

var _constellation2 = _interopRequireDefault(_constellation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navmesh = function () {
  function Navmesh(game) {
    _classCallCheck(this, Navmesh);

    this.backgroundScale = {};
    console.debug("Navmesh initialised");
    this.directPath = false;
    this.game = game;
    this.initData();
    this.initGraphics();
  }

  _createClass(Navmesh, [{
    key: "initSignals",
    value: function initSignals() {
      this.game.pncPlugin.signals.sceneTappedSignal.add(this.addPoint, this, 5000);

      this.confirmKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.confirmKey.onDown.add(this.addPolygon, this);

      this.undoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.undoKey.onDown.add(this.undo, this);
    }
  }, {
    key: "initGraphics",
    value: function initGraphics() {
      this.graphics = this.game.add.graphics(0, 0);
      this.graphics.alpha = 0.5;

      // By default we disable debug navmesh points and make it invisible
      this.graphics.visible = false;
    }
  }, {
    key: "removeSignals",
    value: function removeSignals() {
      this.confirmKey.onDown.remove(this.addPolygon, this);
      this.undoKey.onDown.remove(this.undo, this);

      this.game.pncPlugin.signals.sceneTappedSignal.remove(this.addPoint, this, 5000);
    }
  }, {
    key: "initData",
    value: function initData() {
      this.debugEnabled = false;

      this.toggleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.toggleKey.onDown.add(this.toggleTool, this);

      this.grid = new _constellation2.default.Grid();
      this.currentNodes = [];
      this.currentPolygons = [];
      this.edgeDistanceThreshold = 10;
      this.pointerLocation = { x: 0, y: 0 };
      this.characterLocation = { x: 0, y: 0 };
      this.nearestNodeToPointer = null;
      this.intersectorLine = new Phaser.Line(0, 0, 0, 0);
    }
  }, {
    key: "toggleTool",
    value: function toggleTool() {
      if (this.debugEnabled) {
        this.removeSignals();
        this.debugEnabled = false;
        this.graphics.alpha = 0.25;
        this.graphics.visible = false;
      } else {
        this.initSignals();
        this.debugEnabled = true;
        this.graphics.visible = true;
        this.graphics.alpha = 0.5;
      }
    }
  }, {
    key: "isPointerOutOfBounds",
    value: function isPointerOutOfBounds(pointer) {
      var hit = false;

      hit = this.grid.hitTestPointInPolygons({
        x: pointer.x,
        y: pointer.y
      });

      console.log(hit);

      if (hit) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "findPath",
    value: function findPath() {
      this.characterNodeId = this.grid.addNode(this.characterLocation.x, this.characterLocation.y, { id: "character" });
      this.pointerNodeId = this.grid.addNode(this.pointerLocation.x, this.pointerLocation.y, { id: "pointer" });

      var lineOfSightPoints = this.intersectorLine.coordinatesOnLine();

      lineOfSightPoints.pop();
      lineOfSightPoints.shift();

      var hit = false;
      var intersectsGap = false;
      var direct = true;
      var crossingPoints = [];
      for (var i = 0; i < lineOfSightPoints.length; i++) {
        hit = this.grid.hitTestPointInPolygons({
          x: lineOfSightPoints[i][0],
          y: lineOfSightPoints[i][1]
        });
        if (hit === true) {
          if (intersectsGap) {
            crossingPoints.push({
              x: lineOfSightPoints[i][0],
              y: lineOfSightPoints[i][1]
            });
          }
          intersectsGap = false;
        } else {
          direct = false;
          if (!intersectsGap) {
            crossingPoints.push({
              x: lineOfSightPoints[i][0],
              y: lineOfSightPoints[i][1]
            });
          }
          intersectsGap = true;
        }
      }
      console.log(crossingPoints);
      var path = [];

      if (direct) {
        this.directPath = direct;
        console.log("direct path");
        var _nodes = this.getCurrentNodes();

        var waypoint = this.grid.getNearestFromArrayNodeToPoint(this.characterLocation, _nodes);

        var distanceWaypoint = Phaser.Math.distance(waypoint.x, waypoint.y, this.pointerLocation.x, this.pointerLocation.y);

        var distanceDirect = Phaser.Math.distance(this.characterLocation.x, this.characterLocation.y, this.pointerLocation.x, this.pointerLocation.y);

        if (distanceWaypoint < distanceDirect + 20) {
          path.push(waypoint);
        }

        path.push(this.pointerLocation);
      } else {
        this.directPath = direct;
        console.log("intersects obstacle");
        var snap;
        for (var i = 0; i < crossingPoints.length; i++) {
          snap = this.grid.snapPointToGrid(crossingPoints[i]);
          this.grid.addNode(snap.point.x, snap.point.y, {
            id: "intersection" + i
          });
          for (var j = 0; j < snap.segment.length; j++) {
            this.grid.joinNodes("intersection" + i, snap.segment[j]);
          }

          // exit points
          if (i % 2 === 0 && i > 0) {
            this.grid.joinNodes("intersection" + (i - 1), "intersection" + i);
          }
        }

        this.grid.joinNodes("character", "intersection0");

        this.grid.joinNodes("pointer", "intersection" + (crossingPoints.length - 1));

        var thePath = this.grid.findPath("character", "pointer");

        path = thePath.nodes;

        path.shift();

        this.grid.removeNodes("character");
        this.grid.removeNodes("pointer");

        for (var i = 0; i < crossingPoints.length; i++) {
          this.grid.removeNodes("intersection" + i);
        }
      }

      return path;
    }
  }, {
    key: "undo",
    value: function undo() {}
  }, {
    key: "addPoint",
    value: function addPoint(pointer) {
      var data = null;
      if (pointer.data) {
        data = pointer.data;
      }
      this.game.pncPlugin.signals.sceneTappedSignal.halt();
      var node = this.grid.addNode(pointer.x * this.backgroundScale.x, pointer.y * this.backgroundScale.y, data);
      this.currentNodes.push(node.id);
      this.drawAll();
      return node;
    }
  }, {
    key: "loadPolygonFromNodes",
    value: function loadPolygonFromNodes(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        this.addPoint(nodes[i]);
      }
      this.addPolygon();
    }
  }, {
    key: "loadSolidPolygonFromNodes",
    value: function loadSolidPolygonFromNodes(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        this.addPoint(nodes[i]);
      }
      this.addPolygon(null, null, true);
    }
  }, {
    key: "outputNodesAsJson",
    value: function outputNodesAsJson(nodes) {
      if (nodes === undefined) {
        nodes = this.currentNodes;
      }
      var points = [];
      var node;
      for (var i = 0; i < nodes.length; i++) {
        node = this.grid.getNodeById(nodes[i]);
        points.push({ x: node.x, y: node.y });
      }
      console.log(JSON.stringify(points));
    }
  }, {
    key: "addPolygon",
    value: function addPolygon(e, nodes, solid) {
      var data = {};
      if (solid) {
        data = { solid: true };
      } else {
        data = null;
      }

      if (nodes == undefined) {
        nodes = this.currentNodes;
      }
      this.outputNodesAsJson();
      var polygon = this.grid.addPolygon(nodes, data);
      var nodes_keys = Object.keys(this.grid.nodes);
      if (polygon !== null) {
        for (var i = 1; i < polygon.nodes.length; i++) {
          this.grid.joinNodes(polygon.nodes[i - 1], polygon.nodes[i]);
        }

        if (solid) {
          this.grid.joinNodes(polygon.nodes[polygon.nodes.length - 1], polygon.nodes[0]);
        }

        this.currentNodes = [];
        this.currentPolygons.push(polygon.id);
        console.debug(this.currentPolygons);
        console.debug(this.getCurrentPolygons());
      }
      this.drawAll();
      return polygon;
    }
  }, {
    key: "drawAll",
    value: function drawAll() {
      this.graphics.clear();
      this.drawCurrentPolygons();
      this.drawCurrentNodes();
      this.drawPointerLocation();
      this.drawCharacterLocation();
    }
  }, {
    key: "getCurrentNodes",
    value: function getCurrentNodes() {
      return this.grid.getNodes(this.currentNodes);
    }
  }, {
    key: "getCurrentPolygons",
    value: function getCurrentPolygons() {
      return this.grid.getPolygons(this.currentPolygons);
    }
  }, {
    key: "drawCurrentNodes",
    value: function drawCurrentNodes() {
      var nodes = this.getCurrentNodes();
      for (var i = 0; i < nodes.length; i++) {
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawCircle(nodes[i].x, nodes[i].y, 10);
        this.graphics.endFill();
      }
    }
  }, {
    key: "drawCurrentPolygons",
    value: function drawCurrentPolygons() {
      var polys = this.getCurrentPolygons();
      for (var i = 0; i < polys.length; i++) {
        // Draw phaser polygon
        var polyNodes = this.grid.getNodes(polys[i].nodes);
        this.graphics.beginFill(0x0000ff + 0x100000 * i - 0x001000 * i);
        this.graphics.drawPolygon(polyNodes);
        this.graphics.endFill();

        // Draw boundary nodes
        for (var j = 0; j < polyNodes.length; j++) {
          this.graphics.beginFill(0xff00ff);
          this.graphics.drawCircle(polyNodes[j].x, polyNodes[j].y, 10);
          this.graphics.endFill();
        }
      }
    }
  }, {
    key: "drawPointerLocation",
    value: function drawPointerLocation() {
      this.graphics.beginFill(0xff5533);
      this.graphics.drawCircle(this.pointerLocation.x, this.pointerLocation.y, 4);
      this.graphics.endFill();

      if (this.nearestNodeToPointer != null) {
        this.graphics.moveTo(this.pointerLocation.x, this.pointerLocation.y);
        this.graphics.lineStyle(1, 0xff0000, 1);
        this.graphics.lineTo(this.nearestNodeToPointer.x, this.nearestNodeToPointer.y);
        this.graphics.endFill();
      }
    }
  }, {
    key: "drawCharacterLocation",
    value: function drawCharacterLocation() {
      this.graphics.beginFill(0xff5533);
      this.graphics.drawCircle(this.characterLocation.x, this.characterLocation.y, 4);
      this.graphics.endFill();

      if (this.nearestNodeToCharacter != null) {
        this.graphics.moveTo(this.characterLocation.x, this.characterLocation.y);
        this.graphics.lineStyle(1, 0xff0000, 1);
        this.graphics.lineTo(this.nearestNodeToCharacter.x, this.nearestNodeToCharacter.y);
        this.graphics.endFill();

        this.graphics.moveTo(this.intersectorLine.start.x, this.intersectorLine.start.y);
        this.graphics.lineStyle(1, 0x55322f, 1);
        this.graphics.lineTo(this.intersectorLine.end.x, this.intersectorLine.end.y);
        this.graphics.endFill();
      }
    }
  }, {
    key: "updatePointerLocation",
    value: function updatePointerLocation(x, y) {
      var inGrid = this.grid.hitTestPointInPolygons({ x: x, y: y });
      var pointer;
      if (!inGrid) {
        pointer = this.grid.snapPointToGrid({ x: x, y: y });
        pointer = pointer.point;
      } else {
        pointer = new _constellation2.default.Point(x, y);
      }

      this.intersectorLine.setTo(this.characterLocation.x, this.characterLocation.y, pointer.x, pointer.y);

      this.pointerLocation = { x: pointer.x, y: pointer.y };
      this.nearestNodeToPointer = this.grid.getNearestNodeToPoint(this.pointerLocation);
      this.drawAll();
    }
  }, {
    key: "updateCharacterLocation",
    value: function updateCharacterLocation(x, y) {
      this.characterLocation = { x: x, y: y };
      this.nearestNodeToCharacter = this.grid.getNearestNodeToPoint(this.characterLocation);
      this.drawAll();
    }
  }]);

  return Navmesh;
}();

exports.default = Navmesh;

/***/ }),
/* 345 */
/*!*****************************************!*\
  !*** ./src/engine/lib/constellation.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Constellation.js 0.2.0

// (c) 2011-2013 Greg MacWilliam
// Constellation may be freely distributed under the MIT license
// Docs: https://github.com/gmac/constellation.js

(function (context, factory) {

	var C = factory(Math.sqrt, Math.min, Math.max, Math.abs);

	if (true) module.exports = C;else if (typeof define === "function" && define.amd) define(C);else context.Const = C;
})(undefined, function (sqrt, min, max, abs) {

	// Top-level namespace:
	// all public Constellation classes and modules will attach to this.
	var Const = {};

	// Type-assessment & argument utils:
	function isArray(obj) {
		return obj instanceof Array;
	}

	function isFunction(obj) {
		return typeof obj === 'function';
	}

	function getArgsArray(args) {
		return Array.prototype.slice.call(args);
	}

	function isSameSegment(a, b, c, d) {
		return a === c && b === d || a === d && b === c;
	}

	function mapIds(list, rewrite) {
		if (!rewrite) list = list.slice();

		for (var i = 0, len = list.length; i < len; i++) {
			var id = list[i].id;
			if (id) list[i] = id;
		}
		return list;
	}

	// Const._c / Underscore shim
	// --------------------------
	// Based on methods of Underscore.js
	// Implementations are unique to Constellation.
	var _c = Const.utils = {

		// Gets the number of items in an array, or number of properties on an object.
		size: function size(obj) {
			// Array.
			if (isArray(obj)) {
				return obj.length;
			}

			// Object.
			var num = 0;
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) num++;
			}
			return num;
		},

		// Tests if an array contains a value.
		contains: function contains(obj, item) {
			if (isArray(obj)) {

				// Test with native indexOf method.	
				if (isFunction(Array.prototype.indexOf)) {
					return obj.indexOf(item) >= 0;
				}

				// Brute-force search method.
				var len = obj.length;
				var i = 0;

				while (i < len) {
					if (obj[i++] === item) return true;
				}
			}

			return obj && obj.hasOwnProperty(item);
		},

		// Runs an iterator function over each item in an array or object.
		each: function each(obj, iteratorFunct, context) {
			var i = 0;

			if (isArray(obj)) {
				// Array.
				var len = obj.length;
				while (i < len) {
					iteratorFunct.call(context, obj[i], i++);
				}
			} else {
				// Object.
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						iteratorFunct.call(context, obj[i], i);
					}
				}
			}
			return obj;
		},

		// Runs a mutator function over each item in an array or object, setting the result as the new value.
		map: function map(obj, mutatorFunct, context) {
			var i = 0;

			if (isArray(obj)) {
				// Array.
				var len = obj.length;
				while (i < len) {
					obj[i] = mutatorFunct.call(context, obj[i], i++);
				}
			} else {
				// Object.
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						obj[i] = mutatorFunct.call(context, obj[i], i);
					}
				}
			}
			return obj;
		},

		// Runs a test function on each item in the array,
		// then returns true if all items pass the test.
		all: function all(array, testFunct, context) {
			var len = array.length;
			var i = 0;

			while (i < len) {
				if (!testFunct.call(context, array[i], i++)) {
					return false;
				}
			}
			return true;
		},

		// Formats a collection of object values into an array.
		toArray: function toArray(obj) {
			var array = [];

			for (var i in obj) {
				if (obj.hasOwnProperty(i)) array.push(obj[i]);
			}
			return array;
		}
	};

	// Const.Point
	// -----------
	var Point = Const.Point = function (x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
	};

	// Const.Rect
	// ----------
	var Rect = Const.Rect = function (x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = w || 0;
		this.height = h || 0;
	};

	// Const Geom Methods
	// ------------------
	// Tests the distance between two points.
	Const.distance = function (a, b) {
		var x = b.x - a.x;
		var y = b.y - a.y;
		return sqrt(x * x + y * y);
	};

	// Tests for counter-clockwise winding among three points.
	// @param x: Point X of triangle XYZ.
	// @param y: Point Y of triangle XYZ.
	// @param z: Point Z of triangle XYZ.
	// @param exclusive boolean: when true, equal points will be excluded from the test.
	Const.ccw = function (x, y, z, exclusive) {
		return exclusive ? (z.y - x.y) * (y.x - x.x) > (y.y - x.y) * (z.x - x.x) : (z.y - x.y) * (y.x - x.x) >= (y.y - x.y) * (z.x - x.x);
	};

	// Tests for intersection between line segments AB and CD.
	// @param a: Point A of line AB.
	// @param b: Point B of line AB.
	// @param c: Point C of line CD.
	// @param d: Point D of line CD.
	// @return: true if AB intersects CD.
	Const.intersect = function (a, b, c, d) {
		return Const.ccw(a, c, d) !== Const.ccw(b, c, d) && Const.ccw(a, b, c) !== Const.ccw(a, b, d);
	};

	// Convert degrees to radians.
	// @param degrees value.
	// @return radians equivalent.
	Const.degreesToRadians = function (degrees) {
		return degrees * Math.PI / 180;
	};

	// Convert radians to degrees.
	// @param radians value.
	// @return degrees equivalent.
	Const.radiansToDegrees = function (radians) {
		return radians * 180 / Math.PI;
	};

	// Calculates the angle (in radians) between line segment AB and the positive X-origin.
	// @param a: Point A of line AB.
	// @param b: Point B of line AB.
	// @return angle (in radians).
	Const.angleRadians = function (a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x);
	};

	// Calculates the angle (in degrees) between line segment AB and the positive X-origin.
	// Degree value is adjusted to fall within a 0-360 range.
	// @param a: Point A of line AB.
	// @param b: Point B of line AB.
	// @return: angle degrees (0-360 range)
	Const.angleDegrees = function (a, b) {
		var degrees = Const.radiansToDegrees(Const.angleRadians(a, b));
		return degrees < 0 ? degrees + 360 : degrees;
	};

	// Gets the index of the circle sector that an angle falls into.
	// This is useful for applying view states to a graphic while moving it around the grid.
	// Ex: create 8 walk cycles
	// @param radians: angle radians to test.
	// @param sectors: number of sectors to divide the circle into. Default is 8.
	// @param offset: offsets the origin of the sector divides within the circle. Default is PI*2/16.
	// @return sector index (a number between 0 and X-1, where X is number of sectors).
	Const.angleSector = function (radians, sectors, offset) {
		var circ = Math.PI * 2;
		sectors = sectors || 8;
		offset = offset || circ / (sectors * 2);
		if (radians < 0) radians = circ + radians;
		radians += offset;
		if (radians > circ) radians -= circ;
		return Math.floor(radians / (circ / sectors));
	};

	// Gets the rectangular bounds of a point ring.
	// @param points: The ring of points to measure bounding on.
	// @return: a new Rect object of the ring's maximum extent.
	Const.getRectForPointRing = function (points) {
		var first = points[0];
		var minX = first.x;
		var maxX = first.x;
		var minY = first.y;
		var maxY = first.y;

		_c.each(points, function (pt) {
			minX = min(minX, pt.x);
			maxX = max(maxX, pt.x);
			minY = min(minY, pt.y);
			maxY = max(maxY, pt.y);
		});

		return new Rect(minX, minY, maxX - minX, maxY - minY);
	};

	// Tests if point P falls within a rectangle.
	// @param p: The point to test.
	// @param rect: The Rect object to test against.
	// @return: true if point falls within rectangle.
	Const.hitTestRect = function (p, rect) {
		var minX = min(rect.x, rect.x + rect.width);
		var maxX = max(rect.x, rect.x + rect.width);
		var minY = min(rect.y, rect.y + rect.height);
		var maxY = max(rect.y, rect.y + rect.height);

		return p.x >= minX && p.y >= minY && p.x <= maxX && p.y <= maxY;
	};

	// Tests if point P falls within a polygonal region; test performed by ray casting.
	// @param p: The point to test.
	// @param points: An array of points forming a polygonal shape.
	// @return: true if point falls within point ring.
	Const.hitTestPointRing = function (p, points) {
		var origin = new Point(0, p.y);
		var hits = 0;

		// Test intersection of an external ray against each polygon side.
		for (var i = 0, sides = points.length; i < sides; i++) {
			var s1 = points[i];
			var s2 = points[(i + 1) % sides];
			origin.x = min(origin.x, min(s1.x, s2.x) - 1);
			hits += this.intersect(origin, p, s1, s2) ? 1 : 0;
		}

		// Return true if an odd number of hits were found.
		return hits % 2 > 0;
	};

	// Snaps point P to the nearest position along line segment AB.
	// @param p: Point P to snap to line segment AB.
	// @param a: Point A of line segment AB.
	// @param b: Point B of line segment AB.
	// @return: new Point object with snapped coordinates.
	Const.snapPointToLineSegment = function (p, a, b) {
		var ap1 = p.x - a.x;
		var ap2 = p.y - a.y;
		var ab1 = b.x - a.x;
		var ab2 = b.y - a.y;
		var mag = ab1 * ab1 + ab2 * ab2;
		var dot = ap1 * ab1 + ap2 * ab2;
		var t = dot / mag;

		if (t < 0) {
			return new Point(a.x, a.y);
		} else if (t > 1) {
			return new Point(b.x, b.y);
		}
		return new Point(a.x + ab1 * t, a.y + ab2 * t);
	};

	// Finds the nearest point within an array of points to target P.
	// @param p: Point P to test against.
	// @param points: Array of Points to find the nearest point within.
	// @return: nearest Point to P, or null if no points were available.
	Const.getNearestPointToPoint = function (p, points) {
		var bestPt = null;
		var bestDist = Infinity;
		var i = points.length - 1;
		var a, dist;

		// Sort points by horizontal offset from P.
		points.sort(function (a, b) {
			a = abs(p.x - a.x);
			b = abs(p.x - b.x);
			return b - a;
		});

		while (i >= 0) {
			a = points[i--];
			if (abs(p.x - a.x) < bestDist) {
				dist = Const.distance(p, a);
				if (dist < bestDist) {
					bestPt = a;
					bestDist = dist;
				}
			} else {
				break;
			}
		}

		return bestPt;
	};

	// Const.Node
	// ----------
	var Node = Const.Node = function (id, x, y, data, to) {
		this.id = id;
		this.x = x || 0;
		this.y = y || 0;
		this.to = to || {};
		this.data = data || null;
	};

	Node.prototype = {
		toPoint: function toPoint() {
			return {
				x: this.x,
				y: this.y,
				data: this.data || null
			};
		}
	};

	// Const.Polygon
	// -------------
	var Polygon = Const.Polygon = function (id, nodes, data) {
		this.id = id;
		this.nodes = nodes.slice();
		this.data = data || null;
	};

	// Const.Path
	// ----------
	var Path = Const.Path = function (nodes, weight, estimate) {
		this.nodes = nodes || [];
		this.weight = weight || 0;
		this.estimate = estimate || 0;
	};

	Path.prototype = {
		copy: function copy(weight, estimate) {
			return new Path(this.nodes.slice(), weight || this.weight, estimate || this.estimate);
		},
		last: function last() {
			return this.nodes[this.nodes.length - 1];
		},
		contains: function contains(node) {
			return _c.contains(node);
		},
		prioratize: function prioratize(a, b) {
			return b.estimate - a.estimate;
		}
	};

	// Const.Grid
	// ----------
	var Grid = Const.Grid = function (data) {
		this.reset(data);
	};

	Grid.prototype = {
		nodes: {},
		polys: {},
		_i: 0,

		// Creates a raw data representation of the grid:
		toJSON: function toJSON() {
			return {
				nodes: this.nodes,
				polys: this.polys,
				i: this._i
			};
		},

		// Clears all existing node and polygon references from the grid.
		reset: function reset(data) {
			this.nodes = {};
			this.polys = {};
			this._i = 0;

			if (data) {
				this._i = data.i || 0;

				_c.each(data.nodes || {}, function (node) {
					this.nodes[node.id] = node;
				}, this);

				_c.each(data.polys || {}, function (poly) {
					this.polys[poly.id] = poly;
				}, this);
			}
		},

		// Adds a new node to the grid at the specified X and Y coordinates.
		addNode: function addNode(x, y, data) {
			if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object') {
				data = x;
				x = 0;
			}
			var node = new Node(data && data.id || 'n' + this._i++, x, y, data);
			this.nodes[node.id] = node;
			return node;
		},

		// Gets a node by id reference.
		getNodeById: function getNodeById(id) {
			return this.nodes.hasOwnProperty(id) ? this.nodes[id] : null;
		},

		// Gets a collection of nodes by id references.
		getNodes: function getNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			return _c.map(ids.slice(), function (id) {
				return this.getNodeById(id);
			}, this);
		},

		// Counts the number of nodes defined within the grid.
		getNumNodes: function getNumNodes() {
			return _c.size(this.nodes);
		},

		// Tests if a node id or array of node ids are defined.
		hasNodes: function hasNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			return _c.all(ids, function (id) {
				return this.nodes.hasOwnProperty(id);
			}, this);
		},

		// Joins nodes within a selection group.
		// Selection group may be an array of node ids, or an object of id keys.
		joinNodes: function joinNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			var change = false;

			// Group must contain two or more nodes to join...
			if (ids.length > 1 && this.hasNodes(ids)) {

				// Loop through selection group of nodes...
				_c.each(ids, function (id) {
					var node = this.nodes[id];
					var len = ids.length;
					var j = 0;

					while (j < len) {
						id = ids[j++];
						if (id !== node.id) {
							node.to[id] = 1;
							change = true;
						}
					}
				}, this);
			}

			return change;
		},

		// Splits apart nodes within a selection group.
		// Selection group may be an array of node ids, or an object of id keys.
		splitNodes: function splitNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			// Alias 'detach' method for a single node reference.
			if (ids.length < 2) {
				return this.detachNodes(ids);
			}

			var change = false;

			// Decouple group node references.
			_c.each(ids, function (id) {
				var node = this.nodes[id];

				if (node && node.to) {
					for (id in node.to) {
						if (_c.contains(ids, id)) {
							delete node.to[id];
							change = true;
						}
					}
				}
			}, this);

			return change;
		},

		// Detachs a node from the grid.
		// Each node's connections will be severed from all joining nodes.
		detachNodes: function detachNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			var change = false;

			_c.each(ids, function (id) {
				var local = this.nodes[id];
				var foreign, j;

				if (local && local.to) {
					// Break all connections between target and its neighbors.
					for (j in local.to) {
						// Delete local reference.
						delete local.to[j];

						// Find foreign node.
						foreign = this.nodes[j];

						// Delete foreign key relationship.
						if (foreign && foreign.to) {
							delete foreign.to[id];
						}
					}
					change = true;
				}
			}, this);

			return change;
		},

		// Detaches and removes a collection of nodes from the grid.
		removeNodes: function removeNodes(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			var change = this.detachNodes(ids);

			_c.each(ids, function (id) {
				var poly, j;

				if (this.nodes.hasOwnProperty(id)) {
					// Detach and remove the node.
					delete this.nodes[id];

					// Remove any dependent polygons.
					for (j in this.polys) {
						poly = this.polys[j];

						if (poly && _c.contains(poly.nodes, id)) {
							delete this.polys[j];
						}
					}
					change = true;
				}
			}, this);

			return change;
		},

		// Adds a polygon to the grid, formed by a collection of node ids.
		addPolygon: function addPolygon(nodes, data) {
			if (nodes.length >= 3 && this.hasNodes(nodes)) {
				var poly = new Polygon('p' + this._i++, nodes, data);
				this.polys[poly.id] = poly;
				return poly;
			}
			return null;
		},

		// Gets a polygon by id reference.
		getPolygonById: function getPolygonById(id) {
			return this.polys.hasOwnProperty(id) ? this.polys[id] : null;
		},

		// Gets a collection of polygons by id references.
		getPolygons: function getPolygons(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			return _c.map(ids.slice(), this.getPolygonById, this);
		},

		// Gets an array of nodes representing a polygon in the grid.
		getNodesForPolygon: function getNodesForPolygon(id) {
			if (this.polys.hasOwnProperty(id)) {
				return _c.map(this.polys[id].nodes.slice(), this.getNodeById, this);
			}
			return null;
		},

		// Counts the number of polygons defined in the grid.
		getNumPolygons: function getNumPolygons() {
			return _c.size(this.polys);
		},

		// Removes a collection of polygons from the grid.
		removePolygons: function removePolygons(ids, rest) {
			if (!isArray(ids) || rest) {
				ids = getArgsArray(arguments);
			}

			var change = false;

			_c.each(ids, function (id) {
				if (this.polys.hasOwnProperty(id)) {
					delete this.polys[id];
					change = true;
				}
			}, this);

			return change;
		},

		// Finds the shortest path between two nodes among the grid of nodes.
		// @param start: The node id within the seach grid to start at.
		// @param goal: The node id within the search grid to reach via shortest path.
		// @attr this.nodes: The grid of nodes to search, formatted as:
		/* {
  	n1: {id:"n1", x:25, y:25, to:{n2:1, n3:1}},
  	n2: {id:"n2", x:110, y:110, to:{n1:1}},
  	n3: {id:"n3", x:50, y:180, to:{n1:1}},
  };*/
		// @return: A report on the search, including:
		//  @attr length: length of completed path.
		//  @attr cycles: number of cycles required to complete the search.
		//  @attr nodes: an array of path nodes, formatted as [startNode, ...connections, goalNode].
		findPath: function findPath(start, goal, weightFunction, estimateFunction) {

			var queue = []; // Queue of paths to search, sorted by estimated weight (highest to lowest).
			var weights = {}; // Table of shortest weights found to each node id.
			var bestPath; // The best completed path found to goal.
			var searchPath; // A current path to be extended and searched.
			var searchNode; // A current node to extend outward and searched from.
			var branchPath; // A new path branch for the search queue.
			var branchWeight; // Current weight of a new branch being explored.
			var branchEstimate; // Estimated best-case weight of new branch reaching goal.
			var startNode = this.getNodeById(start);
			var goalNode = this.getNodeById(goal);
			var cycles = 0;
			var maxCycles = 1000;
			var i;

			// Default weight and estimate functions to use distance calculation.
			if (!isFunction(weightFunction)) weightFunction = Const.distance;
			if (!isFunction(estimateFunction)) estimateFunction = Const.distance;

			// Create initial search path with default weight from/to self.
			queue.push(new Path([startNode], weightFunction(startNode, startNode)));

			// While the queue contains paths:
			while (queue.length > 0 && cycles < maxCycles) {
				searchPath = queue.pop();
				startNode = searchPath.last();

				// Extend search path outward to the next set of connections, creating X new paths.
				for (i in startNode.to) {
					if (startNode.to.hasOwnProperty(i)) {
						searchNode = this.nodes[i];

						// Reject loops.
						if (!!searchNode && !searchPath.contains(searchNode)) {
							branchWeight = searchPath.weight + weightFunction(startNode, searchNode);

							// Test branch fitness.
							if (branchWeight <= (weights[searchNode.id] || branchWeight)) {
								weights[searchNode.id] = branchWeight;
								branchEstimate = branchWeight + estimateFunction(searchNode, goalNode);

								// Test for viable path to goal.
								if (!bestPath || branchEstimate < bestPath.weight) {

									// Create a new branch path extended to search node.
									branchPath = searchPath.copy(branchWeight, branchEstimate);
									branchPath.nodes.push(searchNode);

									// Test if goal has been reached.
									if (searchNode.id === goalNode.id) {
										bestPath = branchPath; // Retain best completed path.
									} else {
										queue.push(branchPath); // Queue additional search path.
									}
								}
							}
						}
					}
				}

				// Sort queue by estimate to complete, highest to lowest.
				queue.sort(Path.prototype.prioratize);

				// Count search cycle.
				cycles++;
			}

			// Return best discovered path.
			return {
				cycles: cycles,
				valid: !!bestPath,
				nodes: bestPath ? bestPath.nodes : [],
				weight: bestPath ? bestPath.weight : 0
			};
		},

		// Finds a path between two points with the fewest number of connections.
		findPathWithFewestNodes: function findPathWithFewestNodes(start, goal) {
			var step = function step() {
				return 1;
			};
			return this.findPath(start, goal, step, step);
		},

		// Snaps the provided point to the nearest position within the node grid.
		// @param pt  The point to snap into the grid.
		// @param meta  Specify true to return full meta data on the snapped point/segment.
		// @return  A new point with the snapped position, or the original point if no grid was searched.
		snapPointToGrid: function snapPointToGrid(pt) {
			var bestPoint = null;
			var bestDistance = Infinity;
			var bestSegment = [];
			var tested = {};

			_c.each(this.nodes, function (local, id) {
				if (pt.id === id) return;

				// Loop through each node's connections.
				for (var i in local.to) {
					if (local.to.hasOwnProperty(i) && !tested.hasOwnProperty(i + ' ' + local.id)) {
						var foreign = this.nodes[i];
						var snapped = Const.snapPointToLineSegment(pt, local, foreign);
						var offset = Const.distance(pt, snapped);
						tested[local.id + ' ' + foreign.id] = true;

						if (!bestPoint || offset < bestDistance) {
							bestPoint = snapped;
							bestDistance = offset;
							bestSegment[0] = local.id;
							bestSegment[1] = foreign.id;
						}
					}
				}
			}, this);

			return {
				offset: isFinite(bestDistance) ? bestDistance : 0,
				point: bestPoint || pt,
				segment: bestSegment
			};
		},

		snapPoint: function snapPoint(pt) {
			var snapped = this.snapPointToGrid(pt);
			return snapped.point || pt;
		},

		// Finds the nearest node to the specified node.
		// @param origin: The origin node to search from.
		// @return: The nearest other grid node to the specified target.
		getNearestNodeToNode: function getNearestNodeToNode(id) {
			var nodes = [];
			var target = this.getNodeById(id);

			if (target) {
				_c.each(this.nodes, function (node) {
					if (node.id !== target.id) {
						nodes.push(node);
					}
				}, this);

				return Const.getNearestPointToPoint(target, nodes);
			}
			return null;
		},
		getNearestNodeToNodeNotSameXY: function getNearestNodeToNodeNotSameXY(id) {
			var nodes = [];
			var target = this.getNodeById(id);

			if (target) {
				_c.each(this.nodes, function (node) {
					if (node.id !== target.id && node.x !== target.x && node.y !== target.y) {
						nodes.push(node);
					}
				}, this);

				return Const.getNearestPointToPoint(target, nodes);
			}
			return null;
		},
		// Finds the nearest node to a specified point within the grid.
		// @param pt: Point to test.
		// @return: Nearest Node to target Point.
		getNearestNodeToPoint: function getNearestNodeToPoint(pt) {
			return Const.getNearestPointToPoint(pt, _c.toArray(this.nodes));
		},
		getNearestFromArrayNodeToPoint: function getNearestFromArrayNodeToPoint(pt, _nodes) {
			return Const.getNearestPointToPoint(pt, _nodes);
		},
		// Tests if a Point intersects any Polygon in the grid.
		// @param pt: Point to test.
		// @return: True if the point intersects any polygon.
		hitTestPointInPolygons: function hitTestPointInPolygons(pt) {
			return !!this.getPolygonsOverPoint2(pt).length;
		},

		// Tests a Point for intersections with all Polygons in the grid, and returns their ids.
		// @param pt  The point to snap into the grid.
		// @return  Array of Polygon ids that hit the specified Point.
		getPolygonsOverPoint: function getPolygonsOverPoint(pt) {
			var hits = [];
			for (var id in this.polys) {
				if (this.polys.hasOwnProperty(id) && Const.hitTestPointRing(pt, this.getNodesForPolygon(id))) {
					hits.push(id);
				}
			}
			return hits;
		},
		checkIsWalkable: function checkIsWalkable(poly_to_ignore, point) {
			for (var id in this.polys) {
				if (poly_to_ignore != id) {
					if (this.polys[id].data) {
						if (Const.hitTestPointRing(point, this.getNodesForPolygon(id))) {
							return false;
						}
					}
				}
			}
			return true;
		},
		// Tests a Point for intersections with all Polygons with attr SOLID, 
		getPolygonsOverPoint2: function getPolygonsOverPoint2(pt) {
			var hits = [];
			for (var id in this.polys) {
				if (this.polys.hasOwnProperty(id) && Const.hitTestPointRing(pt, this.getNodesForPolygon(id))) {
					if (this.checkIsWalkable(id, pt)) {
						hits.push(id);
					} else {
						// Not a walkable area just try another the next point
						break;
					}
				}
			}
			return hits;
		},

		// Tests a Polygon for intersections with all nodes in the grid, and returns their ids.
		// @param id  The polygon id to test.
		// @return  Array of node ids that fall within the specified Polygon.
		getNodesInPolygon: function getNodesInPolygon(id) {
			var hits = [];
			var poly = this.getPolygonById(id);
			var points = this.getNodesForPolygon(id);
			var rect = Const.getRectForPointRing(points);

			if (poly) {
				_c.each(this.nodes, function (node) {
					// Run incrementally costly tests:
					// - node in shape?
					// - OR...
					// node in rect AND node within ring?
					if (_c.contains(poly.nodes, node.id) || Const.hitTestRect(node, rect) && Const.hitTestPointRing(node, points)) {
						hits.push(node.id);
					}
				}, this);
			}

			return hits;
		},

		// Tests a Rect for intersections with all nodes in the grid, and returns their ids.
		// @param id  The polygon id to test.
		// @return  Array of node ids that fall within the specified Rect.
		getNodesInRect: function getNodesInRect(rect) {
			var hits = [];

			_c.each(this.nodes, function (node) {
				if (Const.hitTestRect(node, rect)) {
					hits.push(node.id);
				}
			}, this);

			return hits;
		},

		// Finds all adjacent line segments shared by two polygons.
		// @param p1  First polygon to compare.
		// @param p2  Second polygon to compare.
		// @returns  Array of arrays, each containing two node ids for a line segment.
		getAdjacentPolygonSegments: function getAdjacentPolygonSegments(p1, p2) {
			var result = [];
			var ring1 = this.getNodesForPolygon(p1);
			var ring2 = this.getNodesForPolygon(p2);
			var len1 = ring1.length;
			var len2 = ring2.length;

			for (var i = 0; i < len1; i++) {
				var a1 = ring1[i].id;
				var b1 = ring1[(i + 1) % len1].id;

				for (var j = 0; j < len2; j++) {
					var a2 = ring2[j].id;
					var b2 = ring2[(j + 1) % len2].id;

					if (isSameSegment(a1, b1, a2, b2)) {
						result.push([a1, b1]);
					}
				}
			}
			return result;
		},

		// Gets an array of polygon ids that contain the specified line segment:
		getPolygonsWithLineSegment: function getPolygonsWithLineSegment(n1, n2) {
			var result = [];

			_c.each(this.polys, function (poly, id) {
				// Loop through all polygon ring node pairs:
				for (var i = 0, len = poly.nodes.length; i < len; i++) {
					var a = poly.nodes[i];
					var b = poly.nodes[(i + 1) % len];

					// Retain polygon id if it matches the specified segment:
					if (isSameSegment(a, b, n1, n2)) {
						result.push(id);
					}
				}
			});
			return result;
		},

		// Maps the grid into descrete node fragments.
		// Each fragment contains the IDs of contiguously joined nodes.
		getContiguousNodesMap: function getContiguousNodesMap() {
			var fragments = [];
			var mapped = {};
			var grid = this;

			function followNode(node, fragment) {
				// Record node as mapped and belonging to the current fragment:
				mapped[node.id] = fragment[node.id] = 1;

				for (var id in node.to) {
					if (node.to.hasOwnProperty(id) && !fragment.hasOwnProperty(id)) {
						fragment = followNode(grid.getNodeById(id), fragment);
					}
				}
				return fragment;
			}

			_c.each(this.nodes, function (node) {
				if (!mapped.hasOwnProperty(node.id)) {
					fragments.push(followNode(node, {}));
				}
			});

			return fragments;
		},

		// Creates a path between two external (non-grid) points, using the grid to navigate between them.
		// Start and goal points will be integrated as best as possible into the grid, then route between.
		// @param a  Starting Point object to path from.
		// @param b  Goal Point object to bridge to.
		// @param confineToGrid  Specify TRUE to lock final route point to within the grid.
		// @return  an array of Point objects specifying a path to follow.
		bridgePoints: function bridgePoints(a, b, confineToGrid) {

			// 1) Connect points through common polygon.
			// 2) Connect points through adjacent polygon.
			// 3) Snap points to grid, connect anchors to segment and related polys.
			// 4) Direct connect points on common line segment.
			// 5) Direct connect points in common polygon.

			// Connect points through a common polygon:
			// Get polygon intersections for each point.
			var polysA = this.getPolygonsOverPoint(a);
			var polysB = this.getPolygonsOverPoint(b);

			// Test if points can be bridged through the polygon grid:
			// If so, a direction connection can be made.
			if (testBridgeViaPolys(this, a, b, polysA, polysB)) {
				return [a, b];
			}

			// Connect temporary anchors to the node grid via polygons:
			var anchorA = createBridgeAnchor(this, a, polysA);
			var anchorB = createBridgeAnchor(this, b, polysB);

			if (testBridgeViaAnchors(anchorA, anchorB)) {
				this.joinNodes(anchorA.id, anchorB.id);
			}

			// Find path then remove nodes:
			var path = this.findPath(anchorA.id, anchorB.id);
			this.removeNodes(anchorA.id, anchorB.id);

			if (path.valid) {
				path = _c.map(path.nodes, function (node) {
					return node.toPoint();
				});

				// Add start point:
				if (Const.distance(a, anchorA) > 1) {
					path.unshift(a);
				}

				// Add goal point:
				if (!confineToGrid && Const.distance(b, anchorB) > 1) {
					path.push(b);
				}

				return path;
			}

			// Return empty array if errors were encountered:
			return [];
		}
	};

	function testBridgeViaPolys(grid, a, b, polysA, polysB) {
		// If both points have polygon intersections,
		if (polysA.length && polysB.length) {

			// search for a common polygon:
			for (var i = 0; i < polysA.length; i++) {
				if (_c.contains(polysB, polysA[i])) {
					return true;
				}
			}

			// Then check polygons for adjacent sides,
			var adjacent = grid.getAdjacentPolygonSegments(polysA, polysB);

			// search adjacent sides for an intersection with segment AB:
			for (i = 0; i < adjacent.length; i++) {
				var n = _c.map(adjacent[i], grid.getNodeById, grid);
				if (Const.intersect(a, b, n[0], n[1])) {
					return true;
				}
			}
		}
		return false;
	}

	function createBridgeAnchor(grid, pt, polys) {
		var anchor = grid.addNode(pt.x, pt.y, {});

		// Attach to grid if there are no polygons to hook into:
		// this may generate some new polygons for the point.
		if (!polys.length) {
			var snap = grid.snapPointToGrid(pt);

			if (snap.point) {
				anchor.x = snap.point.x;
				anchor.y = snap.point.y;
				anchor.snap = snap;

				// Attach to snapped segment:
				for (var i = 0, len = snap.segment.length; i < len; i++) {
					grid.joinNodes(anchor.id, snap.segment[i]);
				}

				// Find polygons for new segment:
				polys = grid.getPolygonsWithLineSegment(snap.segment[0], snap.segment[1]);
			}
		}

		// Attach node to related polygon geometry:
		if (polys.length) {
			anchor.poly = polys;

			_c.each(polys, function (id) {
				var nodes = grid.getPolygonById(id).nodes;

				for (var i = 0, len = nodes.length; i < len; i++) {
					grid.joinNodes(anchor.id, nodes[i]);
				}
			});
		}

		return anchor;
	}

	function testBridgeViaAnchors(anchor1, anchor2) {
		// Test for common line segment:
		if (anchor1.snap && anchor2.snap) {
			var s1 = anchor1.snap.segment;
			var s2 = anchor2.snap.segment;
			if (isSameSegment(s1[0], s1[1], s2[0], s2[1])) {
				return true;
			}
		}

		// Test for common polygon:
		if (anchor1.poly && anchor2.poly) {
			for (var i in anchor1.poly) {
				if (_c.contains(anchor2.poly, anchor1.poly[i])) {
					return true;
				}
			}
		}

		return false;
	}

	return Const;
});

/***/ }),
/* 346 */
/*!************************************!*\
  !*** ./src/states/Lobby/Splash.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      (0, _utils.centerGameObjects)([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar);
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('LobbyGame');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 347 */
/*!**********************************!*\
  !*** ./src/states/Lobby/Game.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

__webpack_require__(/*! ../../plugins/slick-ui/src/Core */ 131);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


/* Import Slick-UI GUI Plugin */


var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "func",
    value: function func(el) {
      game.state.start(el.data.state);
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      document.getElementById("chat-container").style.display = "none";
    }
  }, {
    key: "resizeIcon",
    value: function resizeIcon(img, sizeW, sizeH) {
      var w = sizeW ? sizeW : 80;
      var h = sizeH ? sizeH : 80;
      var scaleX = w / img.width;
      var scaleY = h / img.height;

      img.scale.setTo(scaleX, scaleY);
    }
  }, {
    key: "create",
    value: function create() {
      document.getElementById("chat-container").style.display = "block";

      this.margins = { left: 20, right: 50, top: 20, bottom: 220 };

      this.camera_width = this.game.camera.width;
      this.camera_height = this.game.camera.height;
      this.camera_center = new _phaser2.default.Point(this.camera_width / 2, this.camera_height / 2);

      // define the HUD regions (begin and end points)
      this.regions = {
        top_left: {
          begin: { x: this.margins.left, y: this.margins.top },
          end: {
            x: this.camera_width / 3 - this.margins.right,
            y: this.margins.top
          },
          elements: []
        },
        center_top: {
          begin: {
            x: this.camera_width / 3 + this.margins.left,
            y: this.margins.top
          },
          end: {
            x: 2 * this.camera_width / 3 - this.margins.right,
            y: this.margins.top
          },
          elements: []
        },
        top_right: {
          begin: {
            x: 2 * this.camera_width / 3 + this.margins.left,
            y: this.margins.top
          },
          end: { x: this.camera_width - this.margins.right, y: this.margins.top },
          elements: []
        },
        center_right: {
          begin: {
            x: this.camera_width - this.margins.right,
            y: this.camera_height / 3 + this.margins.top
          },
          end: {
            x: this.camera_width - this.margins.right,
            y: 2 * this.camera_height / 3 + this.margins.top
          },
          elements: []
        },
        bottom_right: {
          begin: {
            x: 2 * this.camera_width / 3 + this.margins.left,
            y: this.camera_height - this.margins.bottom
          },
          end: {
            x: this.camera_width - this.margins.right,
            y: this.camera_height - this.margins.bottom
          },
          elements: []
        },
        center_bottom: {
          begin: {
            x: this.camera_width / 3 + this.margins.left,
            y: this.camera_height - this.margins.bottom
          },
          end: {
            x: 2 * this.camera_width / 3 - this.margins.right,
            y: this.camera_height - this.margins.bottom
          },
          elements: []
        },
        bottom_left: {
          begin: {
            x: this.margins.left,
            y: this.camera_height - this.margins.bottom
          },
          end: {
            x: this.camera_width / 3 - this.margins.right,
            y: this.camera_height - this.margins.bottom
          },
          elements: []
        },
        center_left: {
          begin: {
            x: this.margins.left,
            y: this.camera_height / 3 + this.margins.top
          },
          end: {
            x: this.margins.left,
            y: 2 * this.camera_height / 3 - this.margins.bottom
          },
          elements: []
        },
        center: {
          begin: {
            x: this.camera_width / 3 + this.margins.left,
            y: this.camera_center.y
          },
          end: {
            x: 2 * this.camera_width / 3 - this.margins.right,
            y: this.camera_center.y
          },
          elements: []
        }
      };

      this.background = this.game.add.sprite(0, 0, "lobby-bg");
      this.scaleX = this.game.width / this.background.width;
      this.scaleY = this.game.height / this.background.height;

      // Group HUD / Icons
      this.hud = this.game.add.group();
      this.hudElements = this.game.add.group();

      this.myHouseIcon = this.game.add.image(this.regions.top_left.begin.x + 25, this.regions.top_left.begin.y, "my-house-btn");
      this.OtherHousesIcon = this.game.add.image(this.regions.top_left.begin.x + 175, this.regions.top_left.begin.y, "view-houses-icon");
      this.OtherHousesIcon.data = { state: "SelectorBoot" };

      this.videoRoomsIcon = this.game.add.image(this.regions.center_top.begin.x + 50, this.regions.center_top.begin.y, "video-room-icon");
      this.chatRoomsIcon = this.game.add.image(this.regions.center_top.begin.x + 200, this.regions.center_top.begin.y, "chat-rooms-icon");
      this.storeIcon = this.game.add.image(this.regions.center_top.begin.x + 350, this.regions.center_top.begin.y, "store-icon");
      this.settingsIcon = this.game.add.image(this.regions.top_right.end.x - 100, this.regions.top_right.begin.y - 15, "settings-icon");

      this.friendsIcon = this.game.add.image(this.regions.top_right.end.x - 125, this.regions.bottom_right.begin.y, "friends-icon");

      this.hudElements.add(this.chatRoomsIcon);
      this.hudElements.add(this.friendsIcon);
      this.hudElements.add(this.myHouseIcon);
      this.hudElements.add(this.OtherHousesIcon);
      this.hudElements.add(this.settingsIcon);
      this.hudElements.add(this.storeIcon);
      this.hudElements.add(this.videoRoomsIcon);

      this.hud.add(this.background);
      this.hud.add(this.hudElements);

      // Add control input to they
      this.hudElements.setAll("inputEnabled", true);
      this.hudElements.setAll("input.useHandCursor", true);

      this.myHouseIcon.events.onInputOver.add(this.listener, this);
      this.OtherHousesIcon.events.onInputOver.add(this.listener, this);
      this.videoRoomsIcon.events.onInputOver.add(this.listener, this);
      this.chatRoomsIcon.events.onInputOver.add(this.listener, this);
      this.storeIcon.events.onInputOver.add(this.listener, this);
      this.settingsIcon.events.onInputOver.add(this.listener, this);
      this.friendsIcon.events.onInputOver.add(this.listener, this);

      this.myHouseIcon.events.onInputOut.add(this.listenerOut, this);
      this.OtherHousesIcon.events.onInputOut.add(this.listenerOut, this);
      this.videoRoomsIcon.events.onInputOut.add(this.listenerOut, this);
      this.chatRoomsIcon.events.onInputOut.add(this.listenerOut, this);
      this.storeIcon.events.onInputOut.add(this.listenerOut, this);
      this.settingsIcon.events.onInputOut.add(this.listenerOut, this);
      this.friendsIcon.events.onInputOut.add(this.listenerOut, this);

      this.OtherHousesIcon.events.onInputDown.add(this.func, this);

      this.resizeIcon(this.chatRoomsIcon);
      this.resizeIcon(this.friendsIcon, 100, 70);
      this.resizeIcon(this.myHouseIcon);
      this.resizeIcon(this.OtherHousesIcon, 150, 75);
      this.resizeIcon(this.settingsIcon, 50, 50);
      this.resizeIcon(this.storeIcon);
      this.resizeIcon(this.videoRoomsIcon);

      // Reescaling Hud Too
      this.hud.scale.setTo(this.scaleX, this.scaleY);

      var bannerText = "Prototype";
      var banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
      banner.font = "Bangers";
      banner.padding.set(10, 16);
      banner.fontSize = 40;
      banner.fill = "#77BFA3";
      banner.smoothed = false;
      banner.anchor.setTo(0.5);

      // let bg = this.game.add.tileSprite(0,0, this.cache.getImage("background").width, this.cache.getImage("background").height, 'background')    // Stretch to fill all space as background

      // this.player = new Player({
      //   game: this.game,
      //   x: 250,
      //   y: 150,
      //   asset: 'player',
      //   frame: 18
      // })

      // this.game.add.existing(this.player)
      // this.game.physics.enable(this.player, Phaser.Physics.ARCADE)

      // this.game.input.onDown.add(this.player.moveCharacter, this);
      // this.bgGroup.scale.setTo(this.game.width / bg.width, this.game.height / bg.height)
    }
  }, {
    key: "listenerOut",
    value: function listenerOut(sprite) {
      sprite.scale.setTo(sprite.scale.x - 0.05, sprite.scale.y - 0.05);
    }
  }, {
    key: "listener",
    value: function listener(sprite) {
      sprite.scale.setTo(sprite.scale.x + 0.05, sprite.scale.y + 0.05);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {
      if (true) {
        // this.game.debug.inputInfo(32, 32);
        // this.game.debug.spriteInfo(this.player, 32, 32)
        // this.game.debug.body(this.player)
      }
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 348 */
/*!********************************************!*\
  !*** ./src/plugins/slick-ui/src/Plugin.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.SlickUI = {};

SlickUI.namespace = function (namespace) {
    var parts = namespace.split('.');
    var context = SlickUI;
    for (var i in parts) {
        var part = parts[i];
        context = context[part] = context[part] ? context[part] : {};
    }
    return SlickUI[namespace];
};

/**
 * Construct the plugin
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param game
 * @param parent
 * @constructor
 */
Phaser.Plugin.SlickUI = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);

    this.defaultRenderer = {
        "button": "SlickUI.Element.Renderer.ButtonRenderer",
        "checkbox": "SlickUI.Element.Renderer.CheckboxRenderer",
        "panel": "SlickUI.Element.Renderer.PanelRenderer",
        "slider": "SlickUI.Element.Renderer.SliderRenderer",
        "text_field": "SlickUI.Element.Renderer.TextFieldRenderer",
        "keyboard": "SlickUI.Element.Renderer.KeyboardRenderer",
        "key": "SlickUI.Element.Renderer.KeyRenderer"
    };

    this.renderer = {};
};

Phaser.Plugin.SlickUI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SlickUI.prototype.constructor = Phaser.Plugin.SamplePlugin;

/**
 * Call this method at the very bottom of your game's preloader method.
 *
 * @param theme
 */
Phaser.Plugin.SlickUI.prototype.load = function (theme) {
    this.container = new SlickUI.Container.Container(this);

    var themePath = theme.replace(/\/[^\/]+$/, '/');
    this.game.load.json('slick-ui-theme', theme);
    this.game.load.resetLocked = true;
    this.game.load.start();
    var isQueued = false;
    var queueAssets = function queueAssets() {
        if (!this.game.cache.checkJSONKey('slick-ui-theme') || isQueued) {
            return;
        }
        var theme = this.game.cache.getJSON('slick-ui-theme');
        for (var k in theme.images) {
            this.game.load.image('slick-ui-' + k, themePath + theme.images[k]);
        }
        for (k in theme.fonts) {
            this.game.load.bitmapFont(k, themePath + theme.fonts[k][0], themePath + theme.fonts[k][1]);
        }
        isQueued = true;
        this.game.load.onFileComplete.remove(queueAssets);
    };
    this.game.load.onFileComplete.add(queueAssets, this);
};

/**
 * Short-hand method for ui.container.add
 *
 * @param element
 */
Phaser.Plugin.SlickUI.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Get or create a renderer
 *
 * @param name
 */
Phaser.Plugin.SlickUI.prototype.getRenderer = function (name) {
    if (typeof this.renderer[name] != 'undefined') {
        return this.renderer[name];
    }
    var theme = this.game.cache.getJSON('slick-ui-theme');
    var resolveObject = function resolveObject(name) {
        var namespace = name.split('.');
        var context = window;
        for (var i in namespace) {
            context = context[namespace[i]];
        }
        return context;
    };

    if (typeof theme.renderer == 'undefined' || typeof theme.renderer[name] == 'undefined') {
        if (typeof this.defaultRenderer[name] == 'undefined') {
            throw new Error('Trying to access undefined renderer \'' + name + '\'.');
        }
        return this.renderer[name] = new (resolveObject(this.defaultRenderer[name]))(this.game);
    }
    return this.renderer[name] = new (resolveObject(theme.renderer[name]))(this.game);
};

/***/ }),
/* 349 */
/*!*********************************************************!*\
  !*** ./src/plugins/slick-ui/src/Container/Container.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Container');

/**
 * UI elements can be layered; for instance, you can layer a
 * button on top of a panel and layer that with some text to create complex
 * user interfaces using simple elements. This is done by creating tree-like
 * structures using Container objects. Every layerable object adds their own
 * Container to allow adding elements only to the container the parent
 * is located in.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param parent
 * @constructor
 */
SlickUI.Container.Container = function (parent) {
    this.root = null;
    if (!(parent instanceof SlickUI.Container.Container)) {
        this.root = parent;
        parent = null;
    }
    this.parent = parent;
    this.children = [];
    if (parent) {
        this.root = parent.root;
        this.displayGroup = this.root.game.add.group();
        parent.displayGroup.add(this.displayGroup);
        this.x = parent.x;
        this.y = parent.y;
        this.width = parent.width;
        this.height = parent.height;
    } else {
        this.displayGroup = this.root.game.add.group();
        this.x = 0;
        this.y = 0;
        this.width = this.root.game.width;
        this.height = this.root.game.height;
    }
};

/**
 * Add an element to the container
 *
 * @param element
 * @returns SlickUI.Container.Container
 */
SlickUI.Container.Container.prototype.add = function (element) {
    element.setContainer(this);
    if (typeof element.init == 'function') {
        element.init();
    }
    this.root.game.world.bringToTop(this.displayGroup);
    this.children.push(element);

    return element; // Allows chaining
};

/**
 * Removes an element from the container
 *
 * @param element
 * @returns SlickUI.Container.Container
 */
SlickUI.Container.Container.prototype.remove = function (element) {
    element.unsetContainer();

    var index = this.children.indexOf(element);
    if (index > -1) {
        this.children.splice(index, 1);
    }

    element.destroy();
};

/**
 * Removes the parent reference from the container
 */
SlickUI.Container.Container.prototype.removeParent = function () {

    if (this.parent) {
        this.parent.displayGroup.remove(this.displayGroup);
    } else {
        //Only remove if root is defined (has a parent?)
        if (this.root) {
            this.root.game.world.remove(this.displayGroup);
        }
    }

    this.root = undefined;
    this.parent = undefined;
};

/**
 * Destroys the container
 */
SlickUI.Container.Container.prototype.destroy = function () {

    this.removeParent();
    this.displayGroup.destroy();
};

/***/ }),
/* 350 */
/*!****************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Button.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Create an interactable button. After initialisation,
 * you can use Button.events to add mouse events to the button.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Button = function (x, y, width, height) {
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this._width = width;
    this._height = height;
    this.container = null;
};

/**
 * Internal Container handling.
 * 
 * @param container
 */
SlickUI.Element.Button.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Button.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Initialisation slices the button's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Button.prototype.init = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.button['border-x'] / 2);
    this.container.y += Math.round(theme.button['border-y'] / 2);
    this.container.width -= theme.button['border-x'];
    this.container.height -= theme.button['border-y'];

    var renderedSprites = this.container.root.getRenderer('button').render(width, height);
    this.spriteOff = renderedSprites[0];
    this.spriteOn = renderedSprites[1];

    this.sprite = this.container.root.game.make.button(x, y);
    this.sprite.loadTexture(this.spriteOff.texture);
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;

    var hover = false;
    this.sprite.events.onInputOver.add(function () {
        hover = true;
    }, this);
    this.sprite.events.onInputOut.add(function () {
        hover = false;
    }, this);

    this.sprite.events.onInputDown.add(function () {
        this.sprite.loadTexture(this.spriteOn.texture);
    }, this);

    this.sprite.events.onInputUp.add(function () {
        this.sprite.loadTexture(this.spriteOff.texture);
        if (!hover) {
            this.sprite.events.onInputUp.halt();
        }
    }, this);

    this.events = this.sprite.events;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.Button.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Destroys the current button
 */
SlickUI.Element.Button.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Button.prototype, 'x', {
    get: function get() {
        return this._x - this.container.parent.x;
    },
    set: function set(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'y', {
    get: function get() {
        return this._y - this.container.parent.y;
    },
    set: function set(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'visible', {
    get: function get() {
        return this.container.displayGroup.visible;
    },
    set: function set(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'alpha', {
    get: function get() {
        return this.container.displayGroup.alpha;
    },
    set: function set(value) {
        this.container.displayGroup.alpha = value;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.Button.prototype, 'width', {
    get: function get() {
        return this.container.width;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._width = Math.round(value + theme.button['border-x']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

Object.defineProperty(SlickUI.Element.Button.prototype, 'height', {
    get: function get() {
        return this.container.height;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.button['border-y']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

/***/ }),
/* 351 */
/*!******************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Checkbox.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Checkboxes can be toggled on/off. Use the third
 * parameter to specify whether to use a checkbox,
 * radio or cross sprite. Use the defined constants
 * to do so.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param type
 * @constructor
 */
SlickUI.Element.Checkbox = function (x, y, type) {
    this._x = x;
    this._y = y;
    this.container = null;
    this._checked = false;
    this.type = type;

    if (typeof type == 'undefined') {
        this.type = SlickUI.Element.Checkbox.TYPE_CHECKBOX;
    }
};

SlickUI.Element.Checkbox.TYPE_CHECKBOX = 0;
SlickUI.Element.Checkbox.TYPE_RADIO = 1;
SlickUI.Element.Checkbox.TYPE_CROSS = 2;

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Checkbox.prototype.setContainer = function (container) {
    this.container = container;
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Checkbox.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Initializer
 */
SlickUI.Element.Checkbox.prototype.init = function () {
    var x = this.container.x + this._x;
    var y = this.container.y + this._y;

    var key;
    switch (this.type) {
        case SlickUI.Element.Checkbox.TYPE_RADIO:
            key = 'radio';
            break;
        case SlickUI.Element.Checkbox.TYPE_CROSS:
            key = 'cross';
            break;
        default:
            key = 'check';
            break;
    }
    var sprites = this.container.root.getRenderer('checkbox').render(key);
    this.sprite = this.container.root.game.make.sprite(0, 0, sprites[0].texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this._spriteOff = sprites[0];
    this._spriteOn = sprites[1];
    this.displayGroup = this.container.root.game.add.group();
    this.displayGroup.add(this.sprite);
    this.container.displayGroup.add(this.displayGroup);
    this.sprite.inputEnabled = true;
    this.sprite.fixedToCamera = true;
    this.input.useHandCursor = true;

    this.events.onInputDown.add(function () {
        this.checked = !this.checked;
    }, this);
};

/**
 * Destroys the current checkbox
 */
SlickUI.Element.Checkbox.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'x', {
    get: function get() {
        return this.displayGroup.x + this._x;
    },
    set: function set(value) {
        this.displayGroup.x = value - this._x;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'y', {
    get: function get() {
        return this.displayGroup.y + this._y;
    },
    set: function set(value) {
        this.displayGroup.y = value - this._y;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'checked', {
    get: function get() {
        return this._checked;
    },
    set: function set(value) {
        this._checked = value;
        if (value) {
            this.sprite.loadTexture(this._spriteOn.texture);
        } else {
            this.sprite.loadTexture(this._spriteOff.texture);
        }
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'visible', {
    get: function get() {
        return this.sprite.visible;
    },
    set: function set(value) {
        this.sprite.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'alpha', {
    get: function get() {
        return this.sprite.alpha;
    },
    set: function set(value) {
        this.sprite.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'events', {
    get: function get() {
        return this.sprite.events;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'input', {
    get: function get() {
        return this.sprite.input;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'width', {
    get: function get() {
        return this.sprite.width;
    },
    set: function set(value) {
        this.sprite.width = value;
    }
});

Object.defineProperty(SlickUI.Element.Checkbox.prototype, 'height', {
    get: function get() {
        return this.sprite.height;
    },
    set: function set(value) {
        this.sprite.height = value;
    }
});

/***/ }),
/* 352 */
/*!***********************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/DisplayObject.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Add any display object to the parent container. These will not
 * be sliced or resized. The width and height parameters are used
 * merely to define the size of the descending container.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param displayObject
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.DisplayObject = function (x, y, displayObject, width, height) {
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.displayObject = displayObject;
    this.container = null;
    this._width = width;
    this._height = height;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.DisplayObject.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);

    if (typeof this._width == 'undefined') {
        this._width = this.container.root.game.width;
    }
    if (typeof this._height == 'undefined') {
        this._height = this.container.root.game.height;
    }
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.DisplayObject.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Initializer
 */
SlickUI.Element.DisplayObject.prototype.init = function () {
    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    this.container.height = Math.min(this.container.parent.height - this._y, this._height);

    if (!this.displayObject instanceof Phaser.Sprite) {
        this.sprite = this.container.root.game.make.sprite(x, y, this.displayObject);
    } else {
        this.sprite = this.displayObject;
    }
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.DisplayObject.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Destroys the current DisplayObject
 */
SlickUI.Element.DisplayObject.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'x', {
    get: function get() {
        return this._x - this.container.parent.x;
    },
    set: function set(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'y', {
    get: function get() {
        return this._y - this.container.parent.y;
    },
    set: function set(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'visible', {
    get: function get() {
        return this.container.displayGroup.visible;
    },
    set: function set(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'alpha', {
    get: function get() {
        return this.container.displayGroup.alpha;
    },
    set: function set(value) {
        this.container.displayGroup.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'inputEnabled', {
    get: function get() {
        return this.sprite.inputEnabled;
    },
    set: function set(value) {
        this.sprite.inputEnabled = value;
        if (value) {
            this.input = this.sprite.input;
        } else {
            this.input = null;
        }
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'events', {
    get: function get() {
        return this.sprite.events;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'width', {
    get: function get() {
        return this.container.width;
    },
    set: function set(value) {
        this._width = value;
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

Object.defineProperty(SlickUI.Element.DisplayObject.prototype, 'height', {
    get: function get() {
        return this.container.height;
    },
    set: function set(value) {
        this._height = value;
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

/***/ }),
/* 353 */
/*!***************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Panel.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Panels are useful for adding several individual elements to
 * in an organized way
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Panel = function (x, y, width, height) {
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this._width = width;
    this._height = height;
    this.container = null;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Panel.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Panel.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Initialisation slices the panel's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.Panel.prototype.init = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.panel['border-x'] / 2);
    this.container.y += Math.round(theme.panel['border-y'] / 2);
    this.container.width -= theme.panel['border-x'];
    this.container.height -= theme.panel['border-y'];

    this._sprite = this.container.displayGroup.add(this.container.root.getRenderer('panel').render(width, height));
    this._sprite.x = x;
    this._sprite.y = y;
    this._sprite.fixedToCamera = true;
    this._offsetX = x;
    this._offsetY = y;
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.Panel.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Removes an element from the container
 *
 * @param element
 */
SlickUI.Element.Panel.prototype.remove = function (element) {
    this.container.remove(element);
};

/**
 * Destroys the panel, removing from world.
 */
SlickUI.Element.Panel.prototype.destroy = function () {

    this.container.displayGroup.removeAll(true);
    this.container.displayGroup.destroy();
    this.container.children = [];
    this.container = undefined;
    this.sprite = undefined;
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Panel.prototype, 'x', {
    get: function get() {
        return this._x - this.container.parent.x;
    },
    set: function set(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'y', {
    get: function get() {
        return this._y - this.container.parent.y;
    },
    set: function set(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'visible', {
    get: function get() {
        return this.container.displayGroup.visible;
    },
    set: function set(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'alpha', {
    get: function get() {
        return this.container.displayGroup.alpha;
    },
    set: function set(value) {
        this.container.displayGroup.alpha = value;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.Panel.prototype, 'width', {
    get: function get() {
        return this.container.width;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._width = Math.round(value + theme.panel['border-x']);
        this._sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this._sprite);
    }
});

Object.defineProperty(SlickUI.Element.Panel.prototype, 'height', {
    get: function get() {
        return this.container.height;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.panel['border-y']);
        this._sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this._sprite);
    }
});

/***/ }),
/* 354 */
/*!****************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Slider.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Create a slider to control defined values
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param size
 * @param value
 * @param vertical
 * @constructor
 */
SlickUI.Element.Slider = function (x, y, size, value, vertical) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._value = value;
    this._vertical = true === vertical;
    this.container = null;
    if (typeof value == 'undefined') {
        this._value = 1;
    }
    if (this._vertical) {
        this._value = Math.abs(this._value - 1);
    }
};

/**
 * Internal Container handling.
 * 
 * @param container
 */
SlickUI.Element.Slider.prototype.setContainer = function (container) {
    this.container = container;
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Slider.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Adds the slider and makes it interactable
 */
SlickUI.Element.Slider.prototype.init = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
    this.onDragStart = new Phaser.Signal();
    this.onDrag = new Phaser.Signal();
    this.onDragStop = new Phaser.Signal();
    this.displayGroup = game.add.group();

    var x = this.container.x + this._x;
    var y = this.container.y + this._y;
    var position = this._vertical ? y : x;
    var modulatingVariable = this._vertical ? 'y' : 'x';
    var size = Math.min(this.container.width - this._x, this._size);
    if (this._vertical) {
        size = Math.min(this.container.height - this._y, this._size);
    }
    var initialPosition = Math.min(1, Math.max(0, this._value)) * size + position;

    var renderedSprites = this.container.root.getRenderer('slider').render(size, this._vertical);
    var sprite_base = renderedSprites[0];
    var handle_off = renderedSprites[1];
    var handle_on = renderedSprites[2];
    sprite_base.x = x;
    sprite_base.y = y;

    var sprite_handle = this.container.root.game.make.sprite(this._vertical ? x : initialPosition, this._vertical ? initialPosition : y, handle_off.texture);
    sprite_handle.anchor.setTo(0.5);

    if (this._vertical) {
        sprite_handle.angle = 270;
    }
    sprite_base.fixedToCamera = true;
    sprite_handle.fixedToCamera = true;
    sprite_handle.inputEnabled = true;
    sprite_handle.input.useHandCursor = true;
    var dragging = false;

    var getValue = function getValue() {
        var value = (sprite_handle.cameraOffset[modulatingVariable] - position) / size;
        if (this._vertical) {
            value = Math.abs(value - 1);
        }
        return value;
    };

    sprite_handle.events.onInputDown.add(function () {
        sprite_handle.loadTexture(handle_on.texture);
        dragging = true;
        this.onDragStart.dispatch(getValue.apply(this));
    }, this);
    sprite_handle.events.onInputUp.add(function () {
        sprite_handle.loadTexture(handle_off.texture);
        dragging = false;
        this.onDragStop.dispatch(getValue.apply(this));
    }, this);

    this.container.root.game.input.addMoveCallback(function (pointer, pointer_x, pointer_y) {
        if (!dragging) {
            return;
        }
        var _pos = (this._vertical ? pointer_y : pointer_x) - this.displayGroup[modulatingVariable];
        sprite_handle.cameraOffset[modulatingVariable] = Math.min(position + size, Math.max(position, _pos - this.container.displayGroup[modulatingVariable]));
        this.onDrag.dispatch(getValue.apply(this));
    }, this);

    this.displayGroup.add(sprite_base);
    this.displayGroup.add(sprite_handle);
    this.container.displayGroup.add(this.displayGroup);
};

/**
 * Destroys the current slider
 */
SlickUI.Element.Slider.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Slider.prototype, 'x', {
    get: function get() {
        return this.displayGroup.x + this._x;
    },
    set: function set(value) {
        this.displayGroup.x = value - this._x;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'y', {
    get: function get() {
        return this.displayGroup.y + this._y;
    },
    set: function set(value) {
        this.displayGroup.y = value - this._y;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'alpha', {
    get: function get() {
        return this.displayGroup.alpha;
    },
    set: function set(value) {
        this.displayGroup.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Slider.prototype, 'visible', {
    get: function get() {
        return this.displayGroup.visible;
    },
    set: function set(value) {
        this.displayGroup.visible = value;
    }
});

/***/ }),
/* 355 */
/*!**************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Text.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Add text to a UI element
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param value
 * @param size
 * @param font
 * @param width
 * @param height
 * @constructor
 */
SlickUI.Element.Text = function (x, y, value, size, font, width, height) {
    this._x = x;
    this._y = y;
    this._value = value;
    this.width = width;
    this.height = height;
    this.font = font;
    this.size = size;
    this.container = null;
};

/**
 * Internal Container handling.
 *
 * @param container
 */
SlickUI.Element.Text.prototype.setContainer = function (container) {
    this.container = container;

    if (typeof this.width == 'undefined') {
        this.width = this.container.root.game.width;
    }
    if (typeof this.height == 'undefined') {
        this.height = this.container.root.game.height;
    }
    if (typeof this.size == 'undefined') {
        this.size = 16;
    }
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.Text.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Bitmap text objects don't work too well when moved around;
 * that's why we destroy it and re-create it.
 * Feel free to improve this code.
 *
 * @param x
 * @param y
 * @param recalculateWidth
 */
SlickUI.Element.Text.prototype.reset = function (x, y, recalculateWidth) {
    var width, height;
    width = Math.min(this.container.width - x, this.width);
    height = Math.min(this.container.height - y, this.height);
    if (typeof this.text != 'undefined') {
        if (recalculateWidth === false) {
            width = this.text.maxWidth;
            height = this.text.maxHeight;
        }
        this.text.destroy();
    }
    x += this.container.x;
    y += this.container.y;
    this.text = this.container.root.game.make.bitmapText(x, y, this.font, this._value, this.size);
    this.text.maxWidth = width;
    this.text.maxHeight = height;
    this.container.displayGroup.add(this.text);
    this.text.fixedToCamera = true;
};

/**
 * Initialize text
 */
SlickUI.Element.Text.prototype.init = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    if (typeof this.font == 'undefined') {
        this.font = Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1];
    }

    this.reset(this._x, this._y);
};

/**
 * Center the text horizontally relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerHorizontally = function () {
    this.text.cameraOffset.x = this.text.maxWidth / 2 - this.text.width / 2 + this.container.x;
    return this;
};

/**
 * Center the text vertically relative to parent container
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.centerVertically = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
    this.text.cameraOffset.y = this.container.height / 2 - this.text.height / 2 - Math.round(theme.button['border-y'] / 2) + this.container.y;
    return this;
};

/**
 * Center the text both horizontally and vertically
 *
 * @returns {SlickUI.Element.Text}
 */
SlickUI.Element.Text.prototype.center = function () {
    this.centerHorizontally();
    this.centerVertically();
    return this;
};

/**
 * Destroys the current text
 */
SlickUI.Element.Text.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.Text.prototype, 'x', {
    get: function get() {
        return this.text.cameraOffset.x - this.container.x;
    },
    set: function set(value) {
        this.text.cameraOffset.x = value + this.container.x;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'y', {
    get: function get() {
        return this.text.cameraOffset.y - this.container.y;
    },
    set: function set(value) {
        this.text.cameraOffset.y = value + this.container.y;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'alpha', {
    get: function get() {
        return this.text.alpha;
    },
    set: function set(value) {
        this.text.alpha = value;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'visible', {
    get: function get() {
        return this.text.visible;
    },
    set: function set(value) {
        this.text.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.Text.prototype, 'value', {
    get: function get() {
        return this.text.text;
    },
    set: function set(value) {
        this.text.text = value;
    }
});

/***/ }),
/* 356 */
/*!*******************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/TextField.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element');

/**
 * Create an interactable button. After initialisation,
 * you can use Button.events to add mouse events to the button.
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @param x
 * @param y
 * @param width
 * @param height
 * @param maxChars
 * @constructor
 */
SlickUI.Element.TextField = function (x, y, width, height, maxChars) {
    if (typeof maxChars == 'undefined') {
        maxChars = 7;
    }
    this._x = x;
    this._y = y;
    this._offsetX = x;
    this._offsetY = y;
    this._width = width;
    this._height = height;
    this.maxChars = maxChars;
    this.container = null;
    this.value = '';

    this.events = {
        onOK: new Phaser.Signal(),
        onToggle: new Phaser.Signal(),
        onKeyPress: new Phaser.Signal()
    };
};

/**
 * Internal Container handling.
 * 
 * @param container
 */
SlickUI.Element.TextField.prototype.setContainer = function (container) {
    this.container = new SlickUI.Container.Container(container);
};

/**
 * Removes parent reference for the current element.
 */
SlickUI.Element.TextField.prototype.unsetContainer = function () {
    this.container.removeParent();
};

/**
 * Initialisation slices the button's sprite up according to the
 * theme settings and adds it to the container.
 * Position and width will be calculated relatively to the
 * parent container.
 */
SlickUI.Element.TextField.prototype.init = function () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme');

    var x = this.container.x = this.container.parent.x + this._x;
    var y = this.container.y = this.container.parent.y + this._y;
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width);
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height);
    this.container.x += Math.round(theme.text_field['border-x'] / 2);
    this.container.y += Math.round(theme.text_field['border-y'] / 2);
    this.container.width -= theme.text_field['border-x'];
    this.container.height -= theme.text_field['border-y'];

    this.sprite = this.container.root.game.make.sprite(x, y, this.container.root.getRenderer('text_field').render(width, height).texture);
    this.sprite.inputEnabled = true;
    this.sprite.input.useHandCursor = true;
    this.container.displayGroup.add(this.sprite);
    this.sprite.x = x;
    this.sprite.y = y;
    this._offsetX = x;
    this._offsetY = y;
    this.sprite.fixedToCamera = true;

    var hover = false;
    this.sprite.events.onInputOver.add(function () {
        hover = true;
    }, this);
    this.sprite.events.onInputOut.add(function () {
        hover = false;
    }, this);

    var kb = new SlickUI.Keyboard.Keyboard(this.container.root, Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1]);
    kb.group.cameraOffset.y = this.container.root.game.height;
    kb.group.visible = false;
    var kbAnimating = false;

    this.sprite.events.onInputDown.add(function () {
        if (kbAnimating) {
            return;
        }
        kbAnimating = true;
        if (!kb.group.visible) {
            kb.group.visible = true;
            this.container.root.game.add.tween(kb.group.cameraOffset).to({ y: this.container.root.game.height - kb.height }, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                kbAnimating = false;
            });
            this.events.onToggle.dispatch(true);
        } else {
            this.container.root.game.add.tween(kb.group.cameraOffset).to({ y: this.container.root.game.height }, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                kbAnimating = false;
                kb.group.visible = false;
            });
            this.events.onToggle.dispatch(false);
        }
    }, this);

    this.text = this.add(new SlickUI.Element.Text(8, 0, "A")); // We put in a character to center it correctly
    this.text.centerVertically();
    this.text.text.text = this.value;

    kb.events.onKeyPress.add(function (key) {
        if (key == 'DEL') {
            this.value = this.value.substr(0, this.value.length - 1);
        } else {
            this.value = (this.value + key).substr(0, this.maxChars);
        }
        this.text.text.text = this.value;

        this.events.onKeyPress.dispatch(key);
    }, this);

    kb.events.onOK.add(function () {
        this.sprite.events.onInputDown.dispatch();

        this.events.onOK.dispatch();
    }, this);
};

/**
 * Add element to the container
 *
 * @param element
 * @returns {SlickUI.Container.Container}
 */
SlickUI.Element.TextField.prototype.add = function (element) {
    return this.container.add(element);
};

/**
 * Destroys the current text field
 */
SlickUI.Element.TextField.prototype.destroy = function () {
    this.container.destroy();
};

/* ------------------------------- */

/**
 * Setters / getters
 */
Object.defineProperty(SlickUI.Element.TextField.prototype, 'x', {
    get: function get() {
        return this._x - this.container.parent.x;
    },
    set: function set(value) {
        this._x = value;
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX;
    }
});

Object.defineProperty(SlickUI.Element.TextField.prototype, 'y', {
    get: function get() {
        return this._y - this.container.parent.y;
    },
    set: function set(value) {
        this._y = value;
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY;
    }
});

Object.defineProperty(SlickUI.Element.TextField.prototype, 'visible', {
    get: function get() {
        return this.container.displayGroup.visible;
    },
    set: function set(value) {
        this.container.displayGroup.visible = value;
    }
});

Object.defineProperty(SlickUI.Element.TextField.prototype, 'alpha', {
    get: function get() {
        return this.container.displayGroup.alpha;
    },
    set: function set(value) {
        this.container.displayGroup.alpha = value;
    }
});

// Try to avoid changing the width or height of elements.

Object.defineProperty(SlickUI.Element.TextField.prototype, 'width', {
    get: function get() {
        return this.container.width;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._width = Math.round(value + theme.text_field['border-x']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

Object.defineProperty(SlickUI.Element.TextField.prototype, 'height', {
    get: function get() {
        return this.container.height;
    },
    set: function set(value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme');
        this._height = Math.round(value + theme.text_field['border-y']);
        this.sprite.destroy();
        this.init();
        this.container.displayGroup.sendToBack(this.sprite);
    }
});

/***/ }),
/* 357 */
/*!**************************************************!*\
  !*** ./src/plugins/slick-ui/src/Keyboard/Key.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Keyboard');

/**
 * A key on the keyboard
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Keyboard.Key = function (plugin, x, y, width, height, font, fontSize, text) {
    this.group = plugin.game.add.group();
    this.font = font;
    this._x = x;
    this._y = y;
    this.plugin = plugin;
    this._width = width;
    this._height = height;
    this.fontSize = fontSize;
    this.text = text;
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Key.prototype.init = function () {
    var sprites = this.plugin.getRenderer('key').render(this._width, this._height);

    var keyUp = sprites[0];
    var keyDown = sprites[1];

    var base = this.plugin.game.make.sprite(this._x, this._y, keyUp.texture);
    var hover = false;
    base.inputEnabled = true;
    base.input.useHandCursor = true;
    base.events.onInputDown.add(function () {
        base.loadTexture(keyDown.texture);
    });
    base.events.onInputUp.add(function () {
        base.loadTexture(keyUp.texture);
        if (!hover) {
            base.events.onInputUp.halt();
        }
    });
    base.events.onInputOver.add(function () {
        hover = true;
    }, this);
    base.events.onInputOut.add(function () {
        hover = false;
    }, this);

    var text = this.plugin.game.make.bitmapText(this._x, this._y, this.font, this.text, this.fontSize);
    text.x += this._width / 2 - text.width / 2;
    text.y += this._height / 2 - this.fontSize / 2 - 4;

    this.group.add(base);
    this.group.add(text);

    this.events = base.events;
};

/***/ }),
/* 358 */
/*!*******************************************************!*\
  !*** ./src/plugins/slick-ui/src/Keyboard/Keyboard.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Keyboard');

/**
 * Textual input control in games
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Keyboard.Keyboard = function (plugin, font, fontSize, initialize) {
    this.group = plugin.game.add.group();
    this.keyGroupLower = plugin.game.make.group();
    this.keyGroupUpper = plugin.game.make.group();
    this.keyGroupCurrent = this.keyGroupLower;
    this.keyGroupUpper.visible = false;
    this.group.fixedToCamera = true;
    this.font = font;
    this.plugin = plugin;
    this.fontSize = fontSize;
    this.height = 160;
    this.events = {
        onKeyPress: new Phaser.Signal(),
        onOK: new Phaser.Signal()
    };

    if (typeof fontSize == 'undefined') {
        this.fontSize = 16;
    }

    if (false !== initialize) {
        this.create();
    }
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Keyboard.prototype.create = function () {
    var base = this.plugin.getRenderer('keyboard').render(this.height);
    this.group.add(base);
    this.group.add(this.keyGroupLower);
    this.group.add(this.keyGroupUpper);
    var keyboardWidth = 440;
    var offsetX = Math.round(this.plugin.game.width / 2 - keyboardWidth / 2);

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 16, 32, 32, this.font, this.fontSize, '1'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 16, 32, 32, this.font, this.fontSize, '2'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 16, 32, 32, this.font, this.fontSize, '3'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 16, 32, 32, this.font, this.fontSize, '4'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 16, 32, 32, this.font, this.fontSize, '5'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 16, 32, 32, this.font, this.fontSize, '6'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 16, 32, 32, this.font, this.fontSize, '7'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 16, 32, 32, this.font, this.fontSize, '8'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 16, 32, 32, this.font, this.fontSize, '9'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 16, 32, 32, this.font, this.fontSize, '0'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 360, 16, 64, 32, this.font, this.fontSize, 'DEL'), this.group);

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 52, 32, 32, this.font, this.fontSize, 'q'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 52, 32, 32, this.font, this.fontSize, 'w'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 52, 32, 32, this.font, this.fontSize, 'e'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 52, 32, 32, this.font, this.fontSize, 'r'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 52, 32, 32, this.font, this.fontSize, 't'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 52, 32, 32, this.font, this.fontSize, 'y'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 52, 32, 32, this.font, this.fontSize, 'u'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 52, 32, 32, this.font, this.fontSize, 'i'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 52, 32, 32, this.font, this.fontSize, 'o'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 52, 32, 32, this.font, this.fontSize, 'p'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 360, 52, 32, 32, this.font, this.fontSize, '!'), this.group);

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 88, 32, 32, this.font, this.fontSize, 'a'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 88, 32, 32, this.font, this.fontSize, 's'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 88, 32, 32, this.font, this.fontSize, 'd'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 88, 32, 32, this.font, this.fontSize, 'f'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 88, 32, 32, this.font, this.fontSize, 'g'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 88, 32, 32, this.font, this.fontSize, 'h'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 88, 32, 32, this.font, this.fontSize, 'j'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 88, 32, 32, this.font, this.fontSize, 'k'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 88, 32, 32, this.font, this.fontSize, 'l'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 88, 80, 32, this.font, this.fontSize, 'UPPER'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX - 40, 124, 36, 32, this.font, this.fontSize, 'OK'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 124, 32, 32, this.font, this.fontSize, 'z'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 124, 32, 32, this.font, this.fontSize, 'x'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 124, 32, 32, this.font, this.fontSize, 'c'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 124, 32, 32, this.font, this.fontSize, 'v'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 124, 32, 32, this.font, this.fontSize, 'b'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 124, 32, 32, this.font, this.fontSize, 'n'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 124, 32, 32, this.font, this.fontSize, 'm'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 124, 32, 32, this.font, this.fontSize, ','), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 124, 32, 32, this.font, this.fontSize, '.'), this.group);
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 124, 32, 32, this.font, this.fontSize, ' '), this.group);

    offsetX -= 32;

    this.keyGroupCurrent = this.keyGroupUpper;
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 52, 32, 32, this.font, this.fontSize, 'Q'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 52, 32, 32, this.font, this.fontSize, 'W'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 52, 32, 32, this.font, this.fontSize, 'E'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 52, 32, 32, this.font, this.fontSize, 'R'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 52, 32, 32, this.font, this.fontSize, 'T'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 52, 32, 32, this.font, this.fontSize, 'Y'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 52, 32, 32, this.font, this.fontSize, 'U'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 52, 32, 32, this.font, this.fontSize, 'I'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 52, 32, 32, this.font, this.fontSize, 'O'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 52, 32, 32, this.font, this.fontSize, 'P'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 88, 32, 32, this.font, this.fontSize, 'A'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 88, 32, 32, this.font, this.fontSize, 'S'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 88, 32, 32, this.font, this.fontSize, 'D'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 88, 32, 32, this.font, this.fontSize, 'F'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 88, 32, 32, this.font, this.fontSize, 'G'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 88, 32, 32, this.font, this.fontSize, 'H'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 88, 32, 32, this.font, this.fontSize, 'J'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 252, 88, 32, 32, this.font, this.fontSize, 'K'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 288, 88, 32, 32, this.font, this.fontSize, 'L'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 324, 88, 80, 32, this.font, this.fontSize, 'lower'));

    offsetX += 16;

    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX, 124, 32, 32, this.font, this.fontSize, 'Z'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 36, 124, 32, 32, this.font, this.fontSize, 'X'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 72, 124, 32, 32, this.font, this.fontSize, 'C'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 108, 124, 32, 32, this.font, this.fontSize, 'V'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 144, 124, 32, 32, this.font, this.fontSize, 'B'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 180, 124, 32, 32, this.font, this.fontSize, 'N'));
    this.addKey(new SlickUI.Keyboard.Key(this.plugin, offsetX + 216, 124, 32, 32, this.font, this.fontSize, 'M'));
};

/**
 * Creates the keyboard and all of its keys
 *
 * @returns SlickUI.Container.Container
 */
SlickUI.Keyboard.Keyboard.prototype.addKey = function (key, group) {
    key.init();
    if (typeof group == 'undefined') {
        group = this.keyGroupCurrent;
    }
    group.add(key.group);

    key.events.onInputUp.add(function () {
        if (key.text == 'UPPER' || key.text == 'lower') {
            this.toggleMode();
            return;
        }
        if (key.text == 'OK') {
            this.events.onOK.dispatch();
            return;
        }
        this.events.onKeyPress.dispatch(key.text);
    }, this);
};

SlickUI.Keyboard.Keyboard.prototype.toggleMode = function () {
    this.keyGroupUpper.visible = !this.keyGroupUpper.visible;
    this.keyGroupLower.visible = !this.keyGroupLower.visible;
};

/***/ }),
/* 359 */
/*!*********************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/ButtonRenderer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default button renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.ButtonRenderer = function (game) {
    this.game = game;
};

/**
 * Renders the states of the button and returns them as an array
 *
 * @returns Array (0: sprite for off state; 1: sprite for on state)
 */
SlickUI.Element.Renderer.ButtonRenderer.prototype.render = function (width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme');

    var context = this;
    var cutSprite = function cutSprite(button) {
        var bmd = context.game.add.bitmapData(width, height);

        bmd.copyRect(button, new Phaser.Rectangle(0, 0, theme.button['border-x'], theme.button['border-y'])); // Left corner
        bmd.copy(button, theme.button['border-x'] + 1, 0, 1, theme.button['border-y'], theme.button['border-x'], 0, width - theme.button['border-x'] * 2, theme.button['border-y']); // Top border

        bmd.copyRect(button, new Phaser.Rectangle(button.width - theme.button['border-x'], 0, theme.button['border-x'], theme.button['border-y']), width - theme.button['border-x']); // Right corner

        bmd.copy(button, 0, theme.button['border-y'] + 1, theme.button['border-x'], 1, 0, theme.button['border-y'], theme.button['border-x'], height - theme.button['border-y'] * 2); // Left border

        bmd.copy(button, button.width - theme.button['border-x'], theme.button['border-y'] + 1, theme.button['border-x'], 1, width - theme.button['border-x'], theme.button['border-y'], theme.button['border-x'], height - theme.button['border-y'] * 2); // Right border

        bmd.copyRect(button, new Phaser.Rectangle(0, button.height - theme.button['border-y'], theme.button['border-x'], theme.button['border-y']), 0, height - theme.button['border-y']); // Left bottom corner
        bmd.copyRect(button, new Phaser.Rectangle(button.width - theme.button['border-x'], button.height - theme.button['border-y'], theme.button['border-x'], theme.button['border-y']), width - theme.button['border-x'], height - theme.button['border-y']); // Right bottom corner
        bmd.copy(button, theme.button['border-x'] + 1, button.height - theme.button['border-y'], 1, theme.button['border-y'], theme.button['border-x'], height - theme.button['border-y'], width - theme.button['border-x'] * 2, theme.button['border-y']); // Bottom border

        bmd.copy(button, theme.button['border-x'], theme.button['border-y'], 1, 1, theme.button['border-x'], theme.button['border-y'], width - theme.button['border-x'] * 2, height - theme.button['border-y'] * 2); // Body
        return context.game.make.sprite(0, 0, bmd);
    };
    var off = cutSprite(this.game.make.sprite(0, 0, 'slick-ui-button_off'));
    var on = cutSprite(this.game.make.sprite(0, 0, 'slick-ui-button_on'));

    return [off, on];
};

/***/ }),
/* 360 */
/*!***********************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/CheckboxRenderer.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default checkbox renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.CheckboxRenderer = function (game) {
  this.game = game;
};

/**
 * Renders the states of the checkbox and returns them as an array
 *
 * @returns Array (0: sprite for off state; 1: sprite for on state)
 */
SlickUI.Element.Renderer.CheckboxRenderer.prototype.render = function (key) {
  var off = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_off');
  var on = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_on');

  return [off, on];
};

/***/ }),
/* 361 */
/*!******************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/KeyRenderer.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default key renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.KeyRenderer = function (game) {
  this.game = game;
};

/**
 * Renders the states of the key and returns them as an array
 *
 * @returns Array (0: sprite for up state; 1: sprite for down state)
 */
SlickUI.Element.Renderer.KeyRenderer.prototype.render = function (width, height) {
  var graphicsUp = this.game.make.graphics(0, 0);
  graphicsUp.beginFill(0xcfcfcf);
  graphicsUp.drawRoundedRect(0, 0, width, height, 5);
  graphicsUp.beginFill(0xffffff);
  graphicsUp.drawRoundedRect(1, 1, width - 2, height - 2, 5);

  var graphicsDown = this.game.make.graphics(0, 0);
  graphicsDown.beginFill(0x178ab8);
  graphicsDown.drawRoundedRect(0, 0, width, height, 5);
  graphicsDown.beginFill(0x1fa7e1);
  graphicsDown.drawRoundedRect(1, 1, width - 2, height - 2, 5);

  var keyUp = this.game.make.sprite(0, 0, graphicsUp.generateTexture());
  var keyDown = this.game.make.sprite(0, 0, graphicsDown.generateTexture());

  return [keyUp, keyDown];
};

/***/ }),
/* 362 */
/*!***********************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/KeyboardRenderer.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default keyboard renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.KeyboardRenderer = function (game) {
  this.game = game;
};

/**
 * Renders the base of the keyboard
 *
 * @returns Phaser.Sprite
 */
SlickUI.Element.Renderer.KeyboardRenderer.prototype.render = function (height) {
  var bmd = this.game.make.bitmapData(this.game.width, height);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.game.width, height);
  bmd.ctx.fillStyle = '#cccccc';
  bmd.ctx.fill();
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 2, this.game.width, height - 2);
  bmd.ctx.fillStyle = '#f0f0f0';
  bmd.ctx.fill();

  return this.game.make.sprite(0, 0, bmd);
};

/***/ }),
/* 363 */
/*!********************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/PanelRenderer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default panel renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.PanelRenderer = function (game) {
    this.game = game;
};

/**
 * Renders the panel and returns the sprite
 *
 * @returns Phaser.Sprite
 */
SlickUI.Element.Renderer.PanelRenderer.prototype.render = function (width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme');
    var bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    var panel = this.game.make.sprite(0, 0, 'slick-ui-panel');

    bmd.copyRect(panel, new Phaser.Rectangle(0, 0, theme.panel['border-x'], theme.panel['border-y'])); // Left corner
    bmd.copy(panel, theme.panel['border-x'] + 1, 0, 1, theme.panel['border-y'], theme.panel['border-x'], 0, width - theme.panel['border-x'] * 2, theme.panel['border-y']); // Top border

    bmd.copyRect(panel, new Phaser.Rectangle(panel.width - theme.panel['border-x'], 0, theme.panel['border-x'], theme.panel['border-y']), width - theme.panel['border-x']); // Right corner

    bmd.copy(panel, 0, theme.panel['border-y'] + 1, theme.panel['border-x'], 1, 0, theme.panel['border-y'], theme.panel['border-x'], height - theme.panel['border-y'] * 2); // Left border

    bmd.copy(panel, panel.width - theme.panel['border-x'], theme.panel['border-y'] + 1, theme.panel['border-x'], 1, width - theme.panel['border-x'], theme.panel['border-y'], theme.panel['border-x'], height - theme.panel['border-y'] * 2); // Right border

    bmd.copyRect(panel, new Phaser.Rectangle(0, panel.height - theme.panel['border-y'], theme.panel['border-x'], theme.panel['border-y']), 0, height - theme.panel['border-y']); // Left bottom corner
    bmd.copyRect(panel, new Phaser.Rectangle(panel.width - theme.panel['border-x'], panel.height - theme.panel['border-y'], theme.panel['border-x'], theme.panel['border-y']), width - theme.panel['border-x'], height - theme.panel['border-y']); // Right bottom corner
    bmd.copy(panel, theme.panel['border-x'] + 1, panel.height - theme.panel['border-y'], 1, theme.panel['border-y'], theme.panel['border-x'], height - theme.panel['border-y'], width - theme.panel['border-x'] * 2, theme.panel['border-y']); // Bottom border

    bmd.copy(panel, theme.panel['border-x'], theme.panel['border-y'], 1, 1, theme.panel['border-x'], theme.panel['border-y'], width - theme.panel['border-x'] * 2, height - theme.panel['border-y'] * 2); // Body

    return this.game.make.sprite(0, 0, bmd);
};

/***/ }),
/* 364 */
/*!*********************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/SliderRenderer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default slider renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.SliderRenderer = function (game) {
    this.game = game;
};

/**
 * Renders the slider and returns it's components as an array
 *
 * @returns Array (0: base; 1: handle off; 2: handle on)
 */
SlickUI.Element.Renderer.SliderRenderer.prototype.render = function (size, vertical) {
    var theme = this.game.cache.getJSON('slick-ui-theme');

    var sprite_base = this.game.make.sprite(0, 0, 'slick-ui-slider_base');
    var sprite_end = this.game.make.sprite(0, 0, 'slick-ui-slider_end');

    var bmd = this.game.add.bitmapData(size, sprite_end.height);
    bmd.copy(sprite_base, 0, 0, 1, sprite_base.height, 0, Math.round(sprite_end.height / 4), size, sprite_base.height);
    bmd.copy(sprite_end, 0, 0, sprite_end.width, sprite_end.height, 0, 0, sprite_end.width, sprite_end.height);
    bmd.copy(sprite_end, 0, 0, sprite_end.width, sprite_end.height, size - sprite_end.width, 0, sprite_end.width, sprite_end.height);

    var handle_off = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_off');
    var handle_on = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_on');

    sprite_base = this.game.make.sprite(0, 0, bmd);

    if (vertical) {
        sprite_base.angle = 90;
    }

    return [sprite_base, handle_off, handle_on];
};

/***/ }),
/* 365 */
/*!************************************************************************!*\
  !*** ./src/plugins/slick-ui/src/Element/Renderer/TextFieldRenderer.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


SlickUI.namespace('Element.Renderer');

/**
 * Default textField renderer
 *
 * @author Richard Snijders <richard@fizz.nl>
 * @constructor
 */
SlickUI.Element.Renderer.TextFieldRenderer = function (game) {
    this.game = game;
};

/**
 * Renders the textField and returns it as a sprite
 *
 * @returns Phaser.Sprite
 */
SlickUI.Element.Renderer.TextFieldRenderer.prototype.render = function (width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme');
    var bmd = this.game.add.bitmapData(width, height);
    var textField = this.game.make.sprite(0, 0, 'slick-ui-text_field');

    bmd.copyRect(textField, new Phaser.Rectangle(0, 0, theme.text_field['border-x'], theme.text_field['border-y'])); // Left corner
    bmd.copy(textField, theme.text_field['border-x'] + 1, 0, 1, theme.text_field['border-y'], theme.text_field['border-x'], 0, width - theme.text_field['border-x'] * 2, theme.text_field['border-y']); // Top border

    bmd.copyRect(textField, new Phaser.Rectangle(textField.width - theme.text_field['border-x'], 0, theme.text_field['border-x'], theme.text_field['border-y']), width - theme.text_field['border-x']); // Right corner

    bmd.copy(textField, 0, theme.text_field['border-y'] + 1, theme.text_field['border-x'], 1, 0, theme.text_field['border-y'], theme.text_field['border-x'], height - theme.text_field['border-y'] * 2); // Left border

    bmd.copy(textField, textField.width - theme.text_field['border-x'], theme.text_field['border-y'] + 1, theme.text_field['border-x'], 1, width - theme.text_field['border-x'], theme.text_field['border-y'], theme.text_field['border-x'], height - theme.text_field['border-y'] * 2); // Right border

    bmd.copyRect(textField, new Phaser.Rectangle(0, textField.height - theme.text_field['border-y'], theme.text_field['border-x'], theme.text_field['border-y']), 0, height - theme.text_field['border-y']); // Left bottom corner
    bmd.copyRect(textField, new Phaser.Rectangle(textField.width - theme.text_field['border-x'], textField.height - theme.text_field['border-y'], theme.text_field['border-x'], theme.text_field['border-y']), width - theme.text_field['border-x'], height - theme.text_field['border-y']); // Right bottom corner
    bmd.copy(textField, theme.text_field['border-x'] + 1, textField.height - theme.text_field['border-y'], 1, theme.text_field['border-y'], theme.text_field['border-x'], height - theme.text_field['border-y'], width - theme.text_field['border-x'] * 2, theme.text_field['border-y']); // Bottom border

    bmd.copy(textField, theme.text_field['border-x'], theme.text_field['border-y'], 1, 1, theme.text_field['border-x'], theme.text_field['border-y'], width - theme.text_field['border-x'] * 2, height - theme.text_field['border-y'] * 2); // Body
    return this.game.make.sprite(0, 0, bmd);
};

/***/ }),
/* 366 */
/*!**************************************!*\
  !*** ./src/states/Selector/Index.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selector = undefined;

var _Boot = __webpack_require__(/*! ./Boot */ 367);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 368);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 369);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Selector = exports.Selector = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 367 */
/*!*************************************!*\
  !*** ./src/states/Selector/Boot.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _PNCAdventure = __webpack_require__(/*! ../../engine/PNCAdventure */ 129);

var _PNCAdventure2 = _interopRequireDefault(_PNCAdventure);

var _webfontloader = __webpack_require__(/*! webfontloader */ 65);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#22C55C';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'Loading Main Level', { font: '16px Arial', fill: '#000000', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      // load your assets
      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');
      this.load.image('vertical-bar', './assets/images/scroll-box.png');

      this.load.image("selector-box", "./assets/images/select-box.png");

      this.load.spritesheet('button', './assets/buttons/button_sprite_sheet.png', 193, 71);
    }
  }, {
    key: 'create',
    value: function create() {}
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('SelectorSplash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 368 */
/*!***************************************!*\
  !*** ./src/states/Selector/Splash.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      (0, _utils.centerGameObjects)([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar);
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('SelectorGame');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 369 */
/*!*************************************!*\
  !*** ./src/states/Selector/Game.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

__webpack_require__(/*! ../../plugins/slick-ui/src/Core */ 131);

var _phaserScrollable = __webpack_require__(/*! ../../plugins/phaser-scrollable */ 370);

var _phaserScrollable2 = _interopRequireDefault(_phaserScrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


/* Import Slick-UI GUI Plugin */


var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "func",
    value: function func(el) {
      this.scroller.stop();
      game.state.start(el.data.state);
    }
  }, {
    key: "create",
    value: function create() {
      /* Scroll box group */
      this.scrollGroup = this.game.add.group();

      this.menuX = 55;
      this.menuY = 45;

      this.box = this.add.sprite(this.menuX, this.menuY, 'selector-box');
      var boxW = this.box.width - 80;
      var boxH = 40;

      this.scroller = game.add.existing(new _phaserScrollable2.default(this.menuX + 25, this.menuY + 25, this.box.width, this.box.height, {
        horizontalScroll: false,
        horizontalWheel: false,
        verticalWheel: true
      }));

      var group = this.game.make.group(null);
      var g = this.game.add.graphics(0, 0, group);
      g.beginFill(_phaser2.default.Color.hexToRGB("#8c1be2")).drawRect(0, 0, boxW, boxH / 2);

      var txt = this.game.add.text(boxW / 4, boxH / 3, "Stage Test", { font: "14px Arial", fill: "#fff" }, group);

      txt.anchor.set(0.5);
      var img = this.game.add.image(0, 0, group.generateTexture());
      img.data = { id: 1, state: "TestStageBoot" };

      img.inputEnabled = true;
      img.input.useHandCursor = true;
      img.events.onInputDown.add(this.func, this);

      this.scroller.addChildren(img);

      this.scroller.start();

      this.scrollGroup.add(this.box);
      this.scrollGroup.add(this.scroller);

      // let bg = this.game.add.tileSprite(0,0, this.cache.getImage("background").width, this.cache.getImage("background").height, 'background')    // Stretch to fill all space as background

      // this.player = new Player({
      //   game: this.game,
      //   x: 250,
      //   y: 150,
      //   asset: 'player',
      //   frame: 18
      // })

      // this.game.add.existing(this.player)
      // this.game.physics.enable(this.player, Phaser.Physics.ARCADE)

      // this.game.input.onDown.add(this.player.moveCharacter, this);
      // this.bgGroup.scale.setTo(this.game.width / bg.width, this.game.height / bg.height)
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {
      if (true) {
        // this.game.debug.inputInfo(32, 32);
        // this.game.debug.spriteInfo(this.player, 32, 32)
        // this.game.debug.body(this.player)
      }
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 370 */
/*!******************************************!*\
  !*** ./src/plugins/phaser-scrollable.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollableArea = function (_Phaser$Group) {
  _inherits(ScrollableArea, _Phaser$Group);

  function ScrollableArea(x, y, w, h, params) {
    _classCallCheck(this, ScrollableArea);

    params = params || {};

    var _this = _possibleConstructorReturn(this, (ScrollableArea.__proto__ || Object.getPrototypeOf(ScrollableArea)).call(this, game));

    _this._x = _this.x = x;
    _this._y = _this.y = y;
    _this._w = w;
    _this._h = h;

    _this.maskGraphics = game.add.graphics(x, y);
    _this.maskGraphics.beginFill(0x000000);
    _this.maskGraphics.drawRect(0, 0, w, h);
    _this.maskGraphics.alpha = 0.2;
    _this.maskGraphics.inputEnabled = false;
    _this.mask = _this.maskGraphics;

    // Draw a bar
    _this.bar = game.add.sprite(x + w - 70, y, 'vertical-bar');
    _this.bar.inputEnabled = true;

    _this.dragging = false;
    _this.pressedDown = false;
    _this.timestamp = 0;
    _this.callbackID = 0;

    _this.targetX = 0;
    _this.targetY = 0;

    _this.autoScrollX = false;
    _this.autoScrollY = false;

    _this.startX = 0;
    _this.startY = 0;

    _this.velocityX = 0;
    _this.velocityY = 0;

    _this.amplitudeX = 0;
    _this.amplitudeY = 0;

    _this.directionWheel = 0;

    _this.velocityWheelX = 0;
    _this.velocityWheelY = 0;

    _this.percentMovement = 0;
    _this.barHeightMax = h - 15;
    _this.barStartY = y - 5;
    _this.barStartX = x;

    _this.settings = {
      kineticMovement: true,
      timeConstantScroll: 325, //really mimic iOS
      horizontalScroll: true,
      verticalScroll: true,
      horizontalWheel: false,
      verticalWheel: true,
      deltaWheel: 40
    };

    _this.configure(params);
    return _this;
  }

  _createClass(ScrollableArea, [{
    key: 'addChildren',
    value: function addChildren(child) {
      this.maskGraphics.x = this.parent.x + this._x;
      this.maskGraphics.y = this.parent.y + this._y;
      this.add(child);
    }

    /**
     * Change Default Settings of the plugin
     *
     * @method ScrollableArea#configure
     * @param {Object}  [options] - Object that contain properties to change the behavior of the plugin.
     * @param {number}  [options.timeConstantScroll=325] - The rate of deceleration for the scrolling.
     * @param {boolean} [options.kineticMovement=true]   - Enable or Disable the kinematic motion.
     * @param {boolean} [options.horizontalScroll=true]  - Enable or Disable the horizontal scrolling.
     * @param {boolean} [options.verticalScroll=false]   - Enable or Disable the vertical scrolling.
     * @param {boolean} [options.horizontalWheel=true]   - Enable or Disable the horizontal scrolling with mouse wheel.
     * @param {boolean} [options.verticalWheel=false]    - Enable or Disable the vertical scrolling with mouse wheel.
     * @param {number}  [options.deltaWheel=40]          - Delta increment of the mouse wheel.
     */

  }, {
    key: 'configure',
    value: function configure(options) {
      if (options) {
        for (var property in options) {
          if (this.settings.hasOwnProperty(property)) {
            this.settings[property] = options[property];
          }
        }
      }
    }

    /**
     * Start the Plugin.
     *
     * @method ScrollableArea#start
     */

  }, {
    key: 'start',
    value: function start() {
      this.game.input.onDown.add(this.beginMove, this);
      this.callbackID = this.game.input.addMoveCallback(this.moveCanvas, this);
      this.game.input.onUp.add(this.endMove, this);
      this.game.input.mouse.mouseWheelCallback = this.mouseWheel.bind(this);
    }

    /**
     * Event triggered when a pointer is pressed down, resets the value of variables.
     */

  }, {
    key: 'beginMove',
    value: function beginMove() {
      if (this.allowScrollStopOnTouch && this.scrollTween) {
        this.scrollTween.pause();
      }

      if (this.bar.getBounds().contains(this.game.input.x, this.game.input.y)) {
        this.startedInside = true;

        this.startX = this.game.input.x;
        this.startY = this.game.input.y;
        this.pressedDown = true;
        this.timestamp = Date.now();
        this.velocityY = this.amplitudeY = this.velocityX = this.amplitudeX = 0;
      } else {
        this.startedInside = false;
      }
    }

    /**
     * Event triggered when the activePointer receives a DOM move event such as a mousemove or touchmove.
     * The camera moves according to the movement of the pointer, calculating the velocity.
     */

  }, {
    key: 'moveCanvas',
    value: function moveCanvas(pointer, x, y) {
      if (!this.pressedDown) return;

      this.now = Date.now();
      var elapsed = this.now - this.timestamp;
      this.timestamp = this.now;

      if (this.settings.horizontalScroll) {
        var delta = x - this.startX; //Compute move distance
        if (delta !== 0) this.dragging = true;
        this.startX = x;
        this.velocityX = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityX;
        this.x += delta;
      }

      if (this.settings.verticalScroll) {
        var delta = y - this.startY; //Compute move distance
        if (delta !== 0) this.dragging = true;
        this.startY = y;
        this.velocityY = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityY;
        this.y += delta;
      }

      this.limitMovement();
    }

    /**
     * Event triggered when a pointer is released, calculates the automatic scrolling.
     */

  }, {
    key: 'endMove',
    value: function endMove() {
      if (this.startedInside) {
        this.pressedDown = false;
        this.autoScrollX = false;
        this.autoScrollY = false;

        if (!this.settings.kineticMovement) return;

        this.now = Date.now();

        if (this.game.input.activePointer.withinGame) {
          if (this.velocityX > 10 || this.velocityX < -10) {
            this.amplitudeX = 0.8 * this.velocityX;
            this.targetX = Math.round(this.x + this.amplitudeX);
            this.autoScrollX = true;
          }

          if (this.velocityY > 10 || this.velocityY < -10) {
            this.amplitudeY = 0.8 * this.velocityY;
            this.targetY = Math.round(this.y + this.amplitudeY);
            this.autoScrollY = true;
          }
        }
        if (!this.game.input.activePointer.withinGame) {
          this.velocityWheelXAbs = Math.abs(this.velocityWheelX);
          this.velocityWheelYAbs = Math.abs(this.velocityWheelY);
          if (this.settings.horizontalScroll && (this.velocityWheelXAbs < 0.1 || !this.game.input.activePointer.withinGame)) {
            this.autoScrollX = true;
          }
          if (this.settings.verticalScroll && (this.velocityWheelYAbs < 0.1 || !this.game.input.activePointer.withinGame)) {
            this.autoScrollY = true;
          }
        }
      }
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(x, y, time, easing, allowScrollStopOnTouch) {
      if (this.scrollTween) {
        this.scrollTween.pause();
      }

      x = x > 0 ? -x : x;
      y = y > 0 ? -y : y;
      easing = easing || Phaser.Easing.Quadratic.Out;
      time = time || 1000;
      allowScrollStopOnTouch = allowScrollStopOnTouch || false;

      this.allowScrollStopOnTouch = allowScrollStopOnTouch;
      this.scrollTween = game.add.tween(this);
      this.scrollTween.to({ x: x, y: y }, time, easing).start();
    }
  }, {
    key: 'moveBar',
    value: function moveBar() {
      var y = Math.round(this.percentMovement / 100 * this.barHeightMax);

      this.barTween = this.game.add.tween(this.bar).to({ x: 0, y: y }, 40, Phaser.Easing.Linear.None, true);
    }

    /**
     * Event called after all the core subsystems and the State have updated, but before the render.
     * Create the deceleration effect.
     */

  }, {
    key: 'update',
    value: function update() {
      if (this.height > this.h) {
        this.elapsed = Date.now() - this.timestamp;
        this.velocityWheelXAbs = Math.abs(this.velocityWheelX);
        this.velocityWheelYAbs = Math.abs(this.velocityWheelY);

        if (this.autoScrollX && this.amplitudeX != 0) {
          var delta = -this.amplitudeX * Math.exp(-this.elapsed / this.settings.timeConstantScroll);
          if (delta > 0.5 || delta < -0.5) {
            this.x = this.targetX + delta;
          } else {
            this.autoScrollX = false;
            //this.x = -this.targetX;
          }
        }

        if (this.autoScrollY && this.amplitudeY != 0) {
          var delta = -this.amplitudeY * Math.exp(-this.elapsed / this.settings.timeConstantScroll);
          if (delta > 0.5 || delta < -0.5) {
            this.y = this.targetY + delta;
          } else {
            this.autoScrollY = false;
            //this.y = -this.targetY;
          }
        }

        if (!this.autoScrollX && !this.autoScrollY) {
          this.dragging = false;
        }

        if (this.settings.horizontalWheel && this.velocityWheelXAbs > 0.1) {
          this.dragging = true;
          this.amplitudeX = 0;
          this.autoScrollX = false;
          this.x += this.velocityWheelX;
          this.velocityWheelX *= 0.95;
        }

        if (this.settings.verticalWheel && this.velocityWheelYAbs > 0.1) {
          this.dragging = true;
          this.autoScrollY = false;
          this.y += this.velocityWheelY;
          this.velocityWheelY *= 0.95;

          this.moveBar();
        }

        this.percentMovement = Math.abs(this.y / this.height * 100);

        this.limitMovement();
      }
    }

    /**
     * Event called when the mousewheel is used, affect the direction of scrolling.
     */

  }, {
    key: 'mouseWheel',
    value: function mouseWheel(event) {
      if (!this.settings.horizontalWheel && !this.settings.verticalWheel) return;

      event.preventDefault();

      var delta = this.game.input.mouse.wheelDelta * 120 / this.settings.deltaWheel;

      if (this.directionWheel != this.game.input.mouse.wheelDelta) {
        this.velocityWheelX = 0;
        this.velocityWheelY = 0;
        this.directionWheel = this.game.input.mouse.wheelDelta;
      }

      if (this.settings.horizontalWheel) {
        this.autoScrollX = false;

        this.velocityWheelX += delta;
      }

      if (this.settings.verticalWheel) {
        this.autoScrollY = false;

        this.velocityWheelY += delta;
      }
    }

    /**
     * Stop the Plugin.
     *
     * @method ScrollableArea#stop
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.game.input.onDown.remove(this.beginMove, this);

      if (this.callbackID) {
        this.game.input.deleteMoveCallback(this.callbackID);
      } else {
        this.game.input.deleteMoveCallback(this.moveCanvas, this);
      }

      this.game.input.onUp.remove(this.endMove, this);

      this.game.input.mouse.mouseWheelCallback = null;
    }

    /**
     * Reposition the scroller
     */

  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      if (position.x) {
        this.x += position.x - this._x;
        this.maskGraphics.x = this._x = position.x;
      }
      if (position.y) {
        this.y += position.y - this._y;
        this.maskGraphics.y = this._y = position.y;
      }
    }

    /**
     * Prevent overscrolling.
     */

  }, {
    key: 'limitMovement',
    value: function limitMovement() {
      if (this.settings.horizontalScroll) {
        if (this.x > this._x) this.x = this._x;
        if (this.x < -(this.width - this._w - this._x)) {
          if (this.width > this._w) {
            this.x = -(this.width - this._w - this._x);
          } else {
            this.x = this._x;
          }
        }
      }

      if (this.settings.verticalScroll) {
        if (this.y > this._y) this.y = this._y;
        if (this.y < -(this.height - this._h - this._y)) {
          if (this.height > this._h) {
            this.y = -(this.height - this._h - this._y);
          } else {
            this.y = this._y;
          }
        }
      }
    }
  }]);

  return ScrollableArea;
}(Phaser.Group);

exports.default = ScrollableArea;

/***/ }),
/* 371 */
/*!***************************************!*\
  !*** ./src/states/TestStage/Index.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestStage = undefined;

var _Boot = __webpack_require__(/*! ./Boot */ 372);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 373);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 374);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestStage = exports.TestStage = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 372 */
/*!**************************************!*\
  !*** ./src/states/TestStage/Boot.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 65);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#EEE';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading test stage', { font: '16px Arial', fill: '#000000', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      // load your assets
      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');

      this.load.image('player', './assets/images/p1_front.png');
      this.load.json('map', './assets/tilemaps/maps/salt_lake_v1.json');
      this.load.json('salt_lake_shape_1', './assets/tilemaps/maps/salt_lake/shape1.json');
      this.load.json('salt_lake_points', './assets/tilemaps/maps/salt_lake/points.json');
    }
  }, {
    key: 'create',
    value: function create() {}
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('TestStageSplash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 373 */
/*!****************************************!*\
  !*** ./src/states/TestStage/Splash.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      (0, _utils.centerGameObjects)([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar);
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('TestStageGame');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 374 */
/*!**************************************!*\
  !*** ./src/states/TestStage/Game.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 21);

var _phaser2 = _interopRequireDefault(_phaser);

var _PlayerActor = __webpack_require__(/*! ../../engine/PlayerActor */ 375);

var _PlayerActor2 = _interopRequireDefault(_PlayerActor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      var bannerText = 'Prototype';
      var banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
      banner.font = 'Bangers';
      banner.padding.set(10, 16);
      banner.fontSize = 40;
      banner.fill = '#77BFA3';
      banner.smoothed = false;
      banner.anchor.setTo(0.5);

      var shape = game.cache.getJSON('map');
      var points = game.cache.getJSON('salt_lake_points');
      var navmeshPoints = [];

      shape.layers[1].objects.map(function (point) {
        for (var i = 0; i < point.polyline.length; i++) {
          navmeshPoints.push({ "x": point.x + point.polyline[i].x, "y": point.y + point.polyline[i].y });
        }
      });

      var sceneDefinition = {
        bg: './assets/images/salt_lake.png',
        navmeshPoints: navmeshPoints,
        shape: this.game.cache.getJSON('salt_lake_shape_1'),
        points: points

        // creates a scene and immediately switches to it
      };var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);

      // adds actor using PlayerActor prototype which adds listeners for movement input
      var actor = this.game.pncPlugin.addActor(room, {
        x: 200,
        y: 600,
        image: 'player',
        type: _PlayerActor2.default
      });

      // let bg = this.game.add.tileSprite(0,0, this.cache.getImage("background").width, this.cache.getImage("background").height, 'background')    // Stretch to fill all space as background

      // this.player = new Player({
      //   game: this.game,
      //   x: 250,
      //   y: 150,
      //   asset: 'player',
      //   frame: 18
      // })

      // this.game.add.existing(this.player)
      // this.game.physics.enable(this.player, Phaser.Physics.ARCADE)

      // this.game.input.onDown.add(this.player.moveCharacter, this);
      // this.bgGroup.scale.setTo(this.game.width / bg.width, this.game.height / bg.height)
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {
      if (true) {
        // this.game.debug.inputInfo(32, 32);
        // this.game.debug.spriteInfo(this.player, 32, 32)
        // this.game.debug.body(this.player)
      }
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 375 */
/*!***********************************!*\
  !*** ./src/engine/PlayerActor.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Actor2 = __webpack_require__(/*! ./Actor */ 130);

var _Actor3 = _interopRequireDefault(_Actor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Actor) {
  _inherits(_class, _Actor);

  function _class(game, actorDefinition) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, actorDefinition));

    console.debug("PlayerActor initialised");
    _this.initSignalListeners();
    return _this;
  }

  _createClass(_class, [{
    key: "lookAt",
    value: function lookAt(pointer) {
      var angle = Phaser.Math.angleBetween(this.x, this.y, pointer.x, pointer.y) * 180 / Math.PI;

      console.log("Angulo del puntero direccion en Grados: " + angle);

      if (angle > -100 && angle < -80) {
        console.log("ANGULO SUPERIOR");
      } else if (angle < -10 && angle > -80) {
        console.log("ANGULO SUPERIOR DERECHO");
      } else if (angle < -110 && angle > -170) {
        console.log("ANGULO SUPERIOR IZQUIERDO");
      } else if (angle > -10 && angle < 10) {
        console.log("ANGULO DERECHO");
      } else if (angle > -180 && angle < -170 || angle > 170 && angle < 180 || angle === 180) {
        console.log("ANGULO IZQUIERDO");
      } else if (angle > 80 && angle < 100) {
        console.log("ANGULO INFERIOR");
      } else if (angle > 10 && angle < 80) {
        console.log("ANGULO INFERIOR DERECHO");
      } else if (angle > 100 && angle < 170) {
        console.log("ANGULO INFERIOR IZQUIERDO");
      }
    }
  }, {
    key: "initSignalListeners",
    value: function initSignalListeners() {
      this.game.pncPlugin.signals.sceneTappedSignal.add(function (pointer, navmesh) {
        console.debug("Movement signal received");
        if (!navmesh) {
          return;
        }

        if (this.walkTween && this.walkTween.isRunning) {
          this.walkTween.stop();
        }

        this.walkTween = this.game.add.tween(this);

        this.lookAt(pointer);

        var outOfBounds = navmesh.isPointerOutOfBounds(pointer);

        if (outOfBounds) {
          return false;
        }

        var path = navmesh.findPath();
        console.log(path);

        var pointer;
        for (var i = 0; i < path.length; i++) {
          pointer = path[i];
          var distance = Phaser.Math.distance(path[i - 1] != undefined ? path[i - 1].x : this.x, path[i - 1] != undefined ? path[i - 1].y : this.y, pointer.x, pointer.y);
          this.walkTween.to({ x: pointer.x, y: pointer.y }, distance * 7);
        }

        this.walkTween.start();
      }, this);
    }
  }]);

  return _class;
}(_Actor3.default);

exports.default = _class;

/***/ }),
/* 376 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gameWidth: 760,
  gameHeight: 400,
  localStorageName: 'phaseres6webpack'
};

/***/ })
],[132]);
//# sourceMappingURL=bundle.js.map