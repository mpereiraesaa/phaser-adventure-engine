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
var ctx = __webpack_require__(/*! ./_ctx */ 19);
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
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 95);
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
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 95);
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
/* 18 */,
/* 19 */
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
/* 20 */
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
/* 21 */
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
var ctx = __webpack_require__(/*! ./_ctx */ 19);
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
  var ctx = __webpack_require__(/*! ./_ctx */ 19);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 32);
  var hide = __webpack_require__(/*! ./_hide */ 12);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
  var toLength = __webpack_require__(/*! ./_to-length */ 8);
  var toIndex = __webpack_require__(/*! ./_to-index */ 121);
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
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 111);
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

var Map = __webpack_require__(/*! ./es6.map */ 116);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 51)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 119))());

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
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 97);
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
var dPs = __webpack_require__(/*! ./_object-dps */ 98);
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
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 97);
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

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var call = __webpack_require__(/*! ./_iter-call */ 109);
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
var cof = __webpack_require__(/*! ./_cof */ 20);
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
var cof = __webpack_require__(/*! ./_cof */ 20);
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
var cof = __webpack_require__(/*! ./_cof */ 20);
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
var cof = __webpack_require__(/*! ./_cof */ 20);
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
var ctx = __webpack_require__(/*! ./_ctx */ 19);
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
var wksExt = __webpack_require__(/*! ./_wks-ext */ 96);
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
        set = __webpack_require__(/*! ./_ctx */ 19)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
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
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 226);

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
var step = __webpack_require__(/*! ./_iter-step */ 112);
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

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var invoke = __webpack_require__(/*! ./_invoke */ 102);
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
  if (__webpack_require__(/*! ./_cof */ 20)(process) == 'process') {
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
var isNode = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

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
var toIndex = __webpack_require__(/*! ./_to-index */ 121);
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
/*!********************************************************************!*\
  !*** ./node_modules/script-loader!./assets/lib/spriter/spriter.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! !./node_modules/script-loader/addScript.js */ 348)(__webpack_require__(/*! !./node_modules/raw-loader!./assets/lib/spriter/spriter.js */ 349))

/***/ }),
/* 93 */
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

__webpack_require__(/*! script-loader!../../assets/lib/spriter/spriter.js */ 92);

var _ActorConfig = __webpack_require__(/*! ./ActorConfig */ 131);

var _ActorConfig2 = _interopRequireDefault(_ActorConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerActor = function (_Spriter$SpriterGroup) {
  _inherits(PlayerActor, _Spriter$SpriterGroup);

  function PlayerActor(game, actorDefinition) {
    _classCallCheck(this, PlayerActor);

    var _this = _possibleConstructorReturn(this, (PlayerActor.__proto__ || Object.getPrototypeOf(PlayerActor)).call(this, game, actorDefinition.spriterData, actorDefinition.textureKey, _ActorConfig2.default.ENTITY, _ActorConfig2.default.START_ANIMATION_INDEX));

    if (actorDefinition.isSmall) {
      _this.scaleX = 90 / _this.width;
      _this.scaleY = 120 / _this.height;

      _this.scale.setTo(_this.scaleX, _this.scaleY);
    }

    if (actorDefinition.isMediumSize) {
      _this.scaleX = 270 / _this.width;
      _this.scaleY = 300 / _this.height;

      _this.scale.setTo(_this.scaleX, _this.scaleY);
    }

    console.debug("PlayerActor initialised");
    _this.initSignalListeners();

    window.player = _this;
    _this._animationSpeed = 0.6;

    // player bounds - circle
    _this.drawBounds();
    return _this;
  }

  _createClass(PlayerActor, [{
    key: "drawBounds",
    value: function drawBounds() {
      var _this2 = this;

      this.bounds = null;
      this.boundsGrp = this.game.make.group(null);
      var bmd = this.game.make.bitmapData(60, 60);
      var maskBitmap = this.game.make.bitmapData(60, 60);

      bmd.circle(30, 30, 30, "rgba(43, 41, 42, 0.3)");
      bmd.circle(30, 30, 20, "rgba(43, 41, 42, 0.7)");

      maskBitmap.circle(30, 30, 30, "rgba(224, 119, 44, 0.5)");

      this.maskImg = this.game.make.image(0, 0, maskBitmap);
      this.maskImg.width = this.maskImg.width + this.maskImg.width;
      this.maskImg.anchor.set(0.5);
      this.maskImg.visible = false;

      this.bounds = this.game.make.sprite(0, 0, bmd);
      this.bounds.width = this.bounds.width + this.bounds.width;
      this.bounds.anchor.set(0.5);

      this.boundsGrp.add(this.bounds);
      this.boundsGrp.add(this.maskImg);

      // Add input
      this.bounds.inputEnabled = true;
      this.bounds.input.useHandCursor = true;

      this.bounds.events.onInputOver.add(function (sprite) {
        _this2.maskImg.visible = true;
      }, this);

      this.bounds.events.onInputOut.add(function (sprite) {
        _this2.maskImg.visible = false;
      }, this);

      window.boundsGrp = this.boundsGrp;

      this.addAt(this.boundsGrp, 0);
    }
  }, {
    key: "update",
    value: function update() {
      this.updateAnimation();

      if (this.walkTween && this.walkTween.isRunning) {
        this.calcAngle(this.xyPoint);

        if (this.angleTo != this.walkTween.angleToBegin) {
          this.lookAt();
        }
      }
    }
  }, {
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
  }, {
    key: "calcAngle",
    value: function calcAngle(pointer) {
      if (pointer) {
        this.angleTo = Phaser.Math.angleBetween(this.x, this.y, pointer.x, pointer.y) * 180 / Math.PI;
      }

      if (this.angleTo > -100 && this.angleTo < -80) {
        this.angleTo = "UPPER";
      } else if (this.angleTo < -10 && this.angleTo > -80) {
        this.angleTo = "UPPER_RIGHT";
      } else if (this.angleTo < -110 && this.angleTo > -170) {
        this.angleTo = "UPPER_LEFT";
      } else if (this.angleTo > -10 && this.angleTo < 10) {
        this.angleTo = "RIGHT";
      } else if (this.angleTo > -180 && this.angleTo < -170 || this.angleTo > 170 && this.angleTo < 180 || this.angleTo === 180) {
        this.angleTo = "LEFT";
      } else if (this.angleTo > 80 && this.angleTo < 100) {
        this.angleTo = "LOWER";
      } else if (this.angleTo > 10 && this.angleTo < 80) {
        this.angleTo = "LOWER_RIGHT";
      } else if (this.angleTo > 100 && this.angleTo < 170) {
        this.angleTo = "LOWER_LEFT";
      }
    }
  }, {
    key: "lookAt",
    value: function lookAt() {
      if (this.angleTo == "UPPER") {
        this.playAnimationById(_ActorConfig2.default.BACK_ANIMATION_INDEX);
        console.log("ANGULO SUPERIOR");
      } else if (this.angleTo == "UPPER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.BACKRIGHT_ANIMATION_INDEX);
        console.log("ANGULO SUPERIOR DERECHO");
      } else if (this.angleTo == "UPPER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.BACKLEFT_ANIMATION_INDEX);
        console.log("ANGULO SUPERIOR IZQUIERDO");
      } else if (this.angleTo == "RIGHT") {
        this.playAnimationById(_ActorConfig2.default.RIGHT_ANIMATION_INDEX);
        console.log("ANGULO DERECHO");
      } else if (this.angleTo == "LEFT") {
        this.playAnimationById(_ActorConfig2.default.LEFT_ANIMATION_INDEX);
        console.log("ANGULO IZQUIERDO");
      } else if (this.angleTo == "LOWER") {
        this.playAnimationById(_ActorConfig2.default.FRONT_ANIMATION_INDEX);
        console.log("ANGULO INFERIOR");
      } else if (this.angleTo == "LOWER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.FRONTRIGHT_ANIMATION_INDEX);
        console.log("ANGULO INFERIOR DERECHO");
      } else if (this.angleTo == "LOWER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.FRONTLEFT_ANIMATION_INDEX);
        console.log("ANGULO INFERIOR IZQUIERDO");
      }
    }
  }, {
    key: "stopAndLookAt",
    value: function stopAndLookAt(tween) {
      if (tween.angleToBegin == "UPPER") {
        this.playAnimationById(_ActorConfig2.default.BACK_IDLE_INDEX);
        console.log("ANGULO SUPERIOR");
      } else if (tween.angleToBegin == "UPPER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.BACKRIGHT_IDLE_INDEX);
        console.log("ANGULO SUPERIOR DERECHO");
      } else if (tween.angleToBegin == "UPPER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.BACKLEFT_IDLE_INDEX);
        console.log("ANGULO SUPERIOR IZQUIERDO");
      } else if (tween.angleToBegin == "RIGHT") {
        this.playAnimationById(_ActorConfig2.default.RIGHT_IDLE_INDEX);
        console.log("ANGULO DERECHO");
      } else if (tween.angleToBegin == "LEFT") {
        this.playAnimationById(_ActorConfig2.default.LEFT_IDLE_INDEX);
        console.log("ANGULO IZQUIERDO");
      } else if (tween.angleToBegin == "LOWER") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO INFERIOR");
      } else if (tween.angleToBegin == "LOWER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.FRONTRIGHT_IDLE_INDEX);
        console.log("ANGULO INFERIOR DERECHO");
      } else if (tween.angleToBegin == "LOWER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.FRONTLEFT_IDLE_INDEX);
        console.log("ANGULO INFERIOR IZQUIERDO");
      }
    }
  }, {
    key: "movementComplete",
    value: function movementComplete(player, tween) {
      this.stopAndLookAt(tween);
    }
  }, {
    key: "initSignalListeners",
    value: function initSignalListeners() {
      this.game.pncPlugin.signals.sceneTappedSignal.add(function (pointer, navmesh) {
        var outOfBounds = navmesh.isPointerOutOfBounds(pointer);

        if (outOfBounds) {
          return false;
        }

        this.xyPoint = { x: pointer.x, y: pointer.y };

        console.debug("Movement signal received");
        if (!navmesh) {
          return;
        }

        if (this.walkTween && this.walkTween.isRunning) {
          this.walkTween.stop();
        }

        this.walkTween = this.game.add.tween(this);
        this.walkTween.onComplete.add(this.movementComplete, this);

        this.calcAngle(pointer);
        this.walkTween.angleToBegin = this.angleTo;

        this.lookAt();

        var path = navmesh.findPath();

        this.game.network.sendKeyMessage({
          willMove: true,
          x: pointer.x,
          y: pointer.y,
          path: path,
          clientWidth: game.width,
          clientHeight: game.height
        });

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

  return PlayerActor;
}(Spriter.SpriterGroup);

exports.default = PlayerActor;

/***/ }),
/* 94 */
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
/* 95 */
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
/* 96 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 102);
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
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 106 */
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
/* 107 */
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
/* 108 */
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
/* 109 */
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
/* 110 */
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
/* 111 */
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
/* 112 */
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
/* 113 */
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
/* 114 */
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
/* 115 */
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
/* 116 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 117);
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
/* 117 */
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
var ctx = __webpack_require__(/*! ./_ctx */ 19);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 78);
var step = __webpack_require__(/*! ./_iter-step */ 112);
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
/* 118 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 117);
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
/* 119 */
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
var assign = __webpack_require__(/*! ./_object-assign */ 100);
var weak = __webpack_require__(/*! ./_collection-weak */ 120);
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
/* 120 */
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
/* 121 */
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
/* 122 */
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
/* 123 */
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
var ctx = __webpack_require__(/*! ./_ctx */ 19);
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
/* 124 */
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
/* 125 */
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
/* 126 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50);
var from = __webpack_require__(/*! ./_array-from-iterable */ 127);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 127 */
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
/* 128 */
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
/* 129 */,
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

__webpack_require__(/*! script-loader!../../assets/lib/spriter/spriter.js */ 92);

var _ActorConfig = __webpack_require__(/*! ./ActorConfig */ 131);

var _ActorConfig2 = _interopRequireDefault(_ActorConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actor = function (_Spriter$SpriterGroup) {
  _inherits(Actor, _Spriter$SpriterGroup);

  function Actor(game, actorDefinition) {
    _classCallCheck(this, Actor);

    var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, game, actorDefinition.spriterData, actorDefinition.textureKey, _ActorConfig2.default.ENTITY, _ActorConfig2.default.START_ANIMATION_INDEX));

    if (actorDefinition.isSmall) {
      _this.scaleX = 90 / _this.width;
      _this.scaleY = 120 / _this.height;

      _this.scale.setTo(_this.scaleX, _this.scaleY);
    }

    console.debug("Actor initialised");

    window.player = _this;
    _this._animationSpeed = 0.6;
    _this.id = 1;

    // player bounds - circle
    _this.drawBounds();
    return _this;
  }

  _createClass(Actor, [{
    key: "drawBounds",
    value: function drawBounds() {
      var _this2 = this;

      this.bounds = null;
      this.boundsGrp = this.game.make.group(null);
      var bmd = this.game.make.bitmapData(60, 60);
      var maskBitmap = this.game.make.bitmapData(60, 60);

      bmd.circle(30, 30, 30, "rgba(43, 41, 42, 0.3)");
      bmd.circle(30, 30, 20, "rgba(43, 41, 42, 0.7)");

      maskBitmap.circle(30, 30, 30, "rgba(224, 119, 44, 0.5)");

      this.maskImg = this.game.make.image(0, 0, maskBitmap);
      this.maskImg.width = this.maskImg.width + this.maskImg.width;
      this.maskImg.anchor.set(0.5);
      this.maskImg.visible = false;

      this.bounds = this.game.make.sprite(0, 0, bmd);
      this.bounds.width = this.bounds.width + this.bounds.width;
      this.bounds.anchor.set(0.5);

      this.boundsGrp.add(this.bounds);
      this.boundsGrp.add(this.maskImg);

      // Add input
      this.bounds.inputEnabled = true;
      this.bounds.input.useHandCursor = true;

      this.bounds.events.onInputOver.add(function (sprite) {
        _this2.maskImg.visible = true;
      }, this);

      this.bounds.events.onInputOut.add(function (sprite) {
        _this2.maskImg.visible = false;
      }, this);

      window.boundsGrp = this.boundsGrp;

      this.addAt(this.boundsGrp, 0);
    }
  }, {
    key: "update",
    value: function update() {
      this.updateAnimation();

      if (this.walkTween && this.walkTween.isRunning) {
        this.calcAngle(this.xyPoint);

        if (this.angleTo != this.walkTween.angleToBegin) {
          this.lookAt();
        }
      }
    }
  }, {
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
  }, {
    key: "calcAngle",
    value: function calcAngle(pointer) {
      if (pointer) {
        this.angleTo = Phaser.Math.angleBetween(this.x, this.y, pointer.x, pointer.y) * 180 / Math.PI;
      }

      if (this.angleTo > -100 && this.angleTo < -80) {
        this.angleTo = "UPPER";
      } else if (this.angleTo < -10 && this.angleTo > -80) {
        this.angleTo = "UPPER_RIGHT";
      } else if (this.angleTo < -110 && this.angleTo > -170) {
        this.angleTo = "UPPER_LEFT";
      } else if (this.angleTo > -10 && this.angleTo < 10) {
        this.angleTo = "RIGHT";
      } else if (this.angleTo > -180 && this.angleTo < -170 || this.angleTo > 170 && this.angleTo < 180 || this.angleTo === 180) {
        this.angleTo = "LEFT";
      } else if (this.angleTo > 80 && this.angleTo < 100) {
        this.angleTo = "LOWER";
      } else if (this.angleTo > 10 && this.angleTo < 80) {
        this.angleTo = "LOWER_RIGHT";
      } else if (this.angleTo > 100 && this.angleTo < 170) {
        this.angleTo = "LOWER_LEFT";
      }
    }
  }, {
    key: "lookAt",
    value: function lookAt() {
      if (this.angleTo == "UPPER") {
        this.playAnimationById(_ActorConfig2.default.BACK_IDLE_INDEX);
        console.log("ANGULO SUPERIOR");
      } else if (this.angleTo == "UPPER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.BACKRIGHT_ANIMATION_INDEX);
        console.log("ANGULO SUPERIOR DERECHO");
      } else if (this.angleTo == "UPPER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.BACKLEFT_ANIMATION_INDEX);
        console.log("ANGULO SUPERIOR IZQUIERDO");
      } else if (this.angleTo == "RIGHT") {
        this.playAnimationById(_ActorConfig2.default.RIGHT_ANIMATION_INDEX);
        console.log("ANGULO DERECHO");
      } else if (this.angleTo == "LEFT") {
        this.playAnimationById(_ActorConfig2.default.LEFT_ANIMATION_INDEX);
        console.log("ANGULO IZQUIERDO");
      } else if (this.angleTo == "LOWER") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO INFERIOR");
      } else if (this.angleTo == "LOWER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.FRONTLEFT_ANIMATION_INDEX);
        console.log("ANGULO INFERIOR DERECHO");
      } else if (this.angleTo == "LOWER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.FRONTLEFT_ANIMATION_INDEX);
        console.log("ANGULO INFERIOR IZQUIERDO");
      }
    }
  }, {
    key: "stopAndLookAt",
    value: function stopAndLookAt(tween) {
      if (tween.angleToBegin == "UPPER") {
        this.playAnimationById(_ActorConfig2.default.BACK_IDLE_INDEX);
        console.log("ANGULO SUPERIOR");
      } else if (tween.angleToBegin == "UPPER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.BACK_IDLE_INDEX);
        console.log("ANGULO SUPERIOR DERECHO");
      } else if (tween.angleToBegin == "UPPER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.BACK_IDLE_INDEX);
        console.log("ANGULO SUPERIOR IZQUIERDO");
      } else if (tween.angleToBegin == "RIGHT") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO DERECHO");
      } else if (tween.angleToBegin == "LEFT") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO IZQUIERDO");
      } else if (tween.angleToBegin == "LOWER") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO INFERIOR");
      } else if (tween.angleToBegin == "LOWER_RIGHT") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO INFERIOR DERECHO");
      } else if (tween.angleToBegin == "LOWER_LEFT") {
        this.playAnimationById(_ActorConfig2.default.FRONT_IDLE_INDEX);
        console.log("ANGULO INFERIOR IZQUIERDO");
      }
    }
  }, {
    key: "movementComplete",
    value: function movementComplete(player, tween) {
      this.stopAndLookAt(tween);
    }
  }, {
    key: "moveTo",
    value: function moveTo(goTo, path) {
      this.xyPoint = goTo;

      console.debug("Other Player movement signal received");
      if (!path) {
        return;
      }

      if (this.walkTween && this.walkTween.isRunning) {
        this.walkTween.stop();
      }

      this.walkTween = this.game.add.tween(this);
      this.walkTween.onComplete.add(this.movementComplete, this);

      this.calcAngle(goTo);
      this.walkTween.angleToBegin = this.angleTo;

      this.lookAt();

      var pointer;
      for (var i = 0; i < path.length; i++) {
        pointer = path[i];
        var distance = Phaser.Math.distance(path[i - 1] != undefined ? path[i - 1].x : this.x, path[i - 1] != undefined ? path[i - 1].y : this.y, pointer.x, pointer.y);
        this.walkTween.to({ x: pointer.x, y: pointer.y }, distance * 7);
      }

      this.walkTween.start();
    }
  }]);

  return Actor;
}(Spriter.SpriterGroup);

exports.default = Actor;

/***/ }),
/* 131 */
/*!***********************************!*\
  !*** ./src/engine/ActorConfig.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    FRONTRIGHT_ANIMATION_INDEX: 0,
    FRONTRIGHT_IDLE_INDEX: 1,
    FRONTLEFT_IDLE_INDEX: 2,
    FRONTLEFT_ANIMATION_INDEX: 3,
    FRONT_ANIMATION_INDEX: 4,
    FRONT_IDLE_INDEX: 5,
    BACK_ANIMATION_INDEX: 6,
    BACK_IDLE_INDEX: 7,
    BACKRIGHT_ANIMATION_INDEX: 8,
    BACKRIGHT_IDLE_INDEX: 9,
    BACKLEFT_IDLE_INDEX: 10,
    BACKLEFT_ANIMATION_INDEX: 11,
    RIGHT_ANIMATION_INDEX: 12,
    RIGHT_IDLE_INDEX: 13,
    LEFT_IDLE_INDEX: 14,
    LEFT_ANIMATION_INDEX: 15,
    ENTITY: 'entity_000',
    START_ANIMATION_INDEX: 1
};

/***/ }),
/* 132 */
/*!****************************!*\
  !*** ./src/sprites/Hud.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hud = function (_Phaser$Group) {
  _inherits(Hud, _Phaser$Group);

  function Hud(game) {
    _classCallCheck(this, Hud);

    var _this = _possibleConstructorReturn(this, (Hud.__proto__ || Object.getPrototypeOf(Hud)).call(this, game, null));

    _this.margins = { left: 20, right: 50, top: 20, bottom: 220 };

    _this.camera_width = game.camera.width;
    _this.camera_height = game.camera.height;
    _this.camera_center = new _phaser2.default.Point(_this.camera_width / 2, _this.camera_height / 2);

    // define the HUD regions (begin and end points)
    _this.regions = {
      top_left: {
        begin: { x: _this.margins.left, y: _this.margins.top },
        end: {
          x: _this.camera_width / 3 - _this.margins.right,
          y: _this.margins.top
        },
        elements: []
      },
      center_top: {
        begin: {
          x: _this.camera_width / 3 + _this.margins.left,
          y: _this.margins.top
        },
        end: {
          x: 2 * _this.camera_width / 3 - _this.margins.right,
          y: _this.margins.top
        },
        elements: []
      },
      top_right: {
        begin: {
          x: 2 * _this.camera_width / 3 + _this.margins.left,
          y: _this.margins.top
        },
        end: { x: _this.camera_width - _this.margins.right, y: _this.margins.top },
        elements: []
      },
      center_right: {
        begin: {
          x: _this.camera_width - _this.margins.right,
          y: _this.camera_height / 3 + _this.margins.top
        },
        end: {
          x: _this.camera_width - _this.margins.right,
          y: 2 * _this.camera_height / 3 + _this.margins.top
        },
        elements: []
      },
      bottom_right: {
        begin: {
          x: 2 * _this.camera_width / 3 + _this.margins.left,
          y: _this.camera_height - _this.margins.bottom
        },
        end: {
          x: _this.camera_width - _this.margins.right,
          y: _this.camera_height - _this.margins.bottom
        },
        elements: []
      },
      center_bottom: {
        begin: {
          x: _this.camera_width / 3 + _this.margins.left,
          y: _this.camera_height - _this.margins.bottom
        },
        end: {
          x: 2 * _this.camera_width / 3 - _this.margins.right,
          y: _this.camera_height - _this.margins.bottom
        },
        elements: []
      },
      bottom_left: {
        begin: {
          x: _this.margins.left,
          y: _this.camera_height - _this.margins.bottom
        },
        end: {
          x: _this.camera_width / 3 - _this.margins.right,
          y: _this.camera_height - _this.margins.bottom
        },
        elements: []
      },
      center_left: {
        begin: {
          x: _this.margins.left,
          y: _this.camera_height / 3 + _this.margins.top
        },
        end: {
          x: _this.margins.left,
          y: 2 * _this.camera_height / 3 - _this.margins.bottom
        },
        elements: []
      },
      center: {
        begin: {
          x: _this.camera_width / 3 + _this.margins.left,
          y: _this.camera_center.y
        },
        end: {
          x: 2 * _this.camera_width / 3 - _this.margins.right,
          y: _this.camera_center.y
        },
        elements: []
      }
    };

    // Hud Components
    _this.myHouseIcon = new _phaser2.default.Image(game, _this.regions.top_left.begin.x, _this.regions.top_left.begin.y, "my-house-btn");

    _this.OtherHousesIcon = new _phaser2.default.Image(game, _this.regions.top_left.begin.x + _this.myHouseIcon.width + 30, _this.regions.top_left.begin.y, "view-houses-icon");

    _this.videoRoomsIcon = new _phaser2.default.Image(game, _this.OtherHousesIcon.x + _this.OtherHousesIcon.width + 30, _this.regions.center_top.begin.y, "video-room-icon");

    _this.chatRoomsIcon = new _phaser2.default.Image(game, _this.videoRoomsIcon.x + _this.videoRoomsIcon.width + 30, _this.regions.center_top.begin.y, "chat-rooms-icon");

    _this.storeIcon = new _phaser2.default.Image(game, _this.chatRoomsIcon.x + _this.chatRoomsIcon.width + 30, _this.regions.center_top.begin.y, "store-icon");

    _this.settingsIcon = new _phaser2.default.Image(game, _this.storeIcon.x + _this.storeIcon.width + 30, _this.regions.top_right.begin.y - 15, "settings-icon");

    _this.friendsIcon = new _phaser2.default.Image(game, 0 + _this.game.width, _this.regions.bottom_right.begin.y, "friends-icon");

    // Add data state info to handle state switch
    _this.OtherHousesIcon.data = { state: "SelectorBoot" };

    // Add to itself
    _this.add(_this.chatRoomsIcon);
    _this.add(_this.friendsIcon);
    _this.add(_this.myHouseIcon);
    _this.add(_this.OtherHousesIcon);
    _this.add(_this.settingsIcon);
    _this.add(_this.storeIcon);
    _this.add(_this.videoRoomsIcon);

    // Add control input to they
    _this.setAll("inputEnabled", true);
    _this.setAll("input.useHandCursor", true);

    _this.onChildInputOver.add(_this.zoomIn, _this);
    _this.onChildInputOut.add(_this.zoomOut, _this);
    _this.OtherHousesIcon.events.onInputDown.add(_this.runState, _this);

    _this.resizeIcon(_this.chatRoomsIcon);
    _this.resizeIcon(_this.friendsIcon, 100, 70);
    _this.resizeIcon(_this.myHouseIcon);
    _this.resizeIcon(_this.OtherHousesIcon, 150, 75);
    _this.resizeIcon(_this.settingsIcon, 50, 50);
    _this.resizeIcon(_this.storeIcon);
    _this.resizeIcon(_this.videoRoomsIcon);
    return _this;
  }

  _createClass(Hud, [{
    key: "resizeIcon",
    value: function resizeIcon(img, sizeW, sizeH) {
      var w = sizeW ? sizeW : 80;
      var h = sizeH ? sizeH : 80;
      var scaleX = w / img.width;
      var scaleY = h / img.height;

      img.scale.setTo(scaleX, scaleY);
    }
  }, {
    key: "runState",
    value: function runState(el) {
      game.state.start(el.data.state);
    }
  }, {
    key: "zoomOut",
    value: function zoomOut(sprite) {
      sprite.scale.setTo(sprite.scale.x - 0.05, sprite.scale.y - 0.05);
    }
  }, {
    key: "zoomIn",
    value: function zoomIn(sprite) {
      sprite.scale.setTo(sprite.scale.x + 0.05, sprite.scale.y + 0.05);
    }
  }]);

  return Hud;
}(_phaser2.default.Group);

exports.default = Hud;

/***/ }),
/* 133 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */134);
module.exports = __webpack_require__(/*! /var/www/project-phaser/src/main.js */336);


/***/ }),
/* 134 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 135);

__webpack_require__(/*! regenerator-runtime/runtime */ 332);

__webpack_require__(/*! core-js/fn/regexp/escape */ 333);

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
/* 135 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 136);
__webpack_require__(/*! ./modules/es6.object.create */ 138);
__webpack_require__(/*! ./modules/es6.object.define-property */ 139);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 140);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 141);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 142);
__webpack_require__(/*! ./modules/es6.object.keys */ 143);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 144);
__webpack_require__(/*! ./modules/es6.object.freeze */ 145);
__webpack_require__(/*! ./modules/es6.object.seal */ 146);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 147);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 148);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 149);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 150);
__webpack_require__(/*! ./modules/es6.object.assign */ 151);
__webpack_require__(/*! ./modules/es6.object.is */ 152);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 154);
__webpack_require__(/*! ./modules/es6.object.to-string */ 155);
__webpack_require__(/*! ./modules/es6.function.bind */ 156);
__webpack_require__(/*! ./modules/es6.function.name */ 157);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 158);
__webpack_require__(/*! ./modules/es6.parse-int */ 159);
__webpack_require__(/*! ./modules/es6.parse-float */ 160);
__webpack_require__(/*! ./modules/es6.number.constructor */ 161);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 162);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 163);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 164);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 165);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 166);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 167);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 168);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 169);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 170);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 171);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 172);
__webpack_require__(/*! ./modules/es6.math.acosh */ 173);
__webpack_require__(/*! ./modules/es6.math.asinh */ 174);
__webpack_require__(/*! ./modules/es6.math.atanh */ 175);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 176);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 177);
__webpack_require__(/*! ./modules/es6.math.cosh */ 178);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 179);
__webpack_require__(/*! ./modules/es6.math.fround */ 180);
__webpack_require__(/*! ./modules/es6.math.hypot */ 181);
__webpack_require__(/*! ./modules/es6.math.imul */ 182);
__webpack_require__(/*! ./modules/es6.math.log10 */ 183);
__webpack_require__(/*! ./modules/es6.math.log1p */ 184);
__webpack_require__(/*! ./modules/es6.math.log2 */ 185);
__webpack_require__(/*! ./modules/es6.math.sign */ 186);
__webpack_require__(/*! ./modules/es6.math.sinh */ 187);
__webpack_require__(/*! ./modules/es6.math.tanh */ 188);
__webpack_require__(/*! ./modules/es6.math.trunc */ 189);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 190);
__webpack_require__(/*! ./modules/es6.string.raw */ 191);
__webpack_require__(/*! ./modules/es6.string.trim */ 192);
__webpack_require__(/*! ./modules/es6.string.iterator */ 193);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 194);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 195);
__webpack_require__(/*! ./modules/es6.string.includes */ 196);
__webpack_require__(/*! ./modules/es6.string.repeat */ 197);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 198);
__webpack_require__(/*! ./modules/es6.string.anchor */ 199);
__webpack_require__(/*! ./modules/es6.string.big */ 200);
__webpack_require__(/*! ./modules/es6.string.blink */ 201);
__webpack_require__(/*! ./modules/es6.string.bold */ 202);
__webpack_require__(/*! ./modules/es6.string.fixed */ 203);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 204);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 205);
__webpack_require__(/*! ./modules/es6.string.italics */ 206);
__webpack_require__(/*! ./modules/es6.string.link */ 207);
__webpack_require__(/*! ./modules/es6.string.small */ 208);
__webpack_require__(/*! ./modules/es6.string.strike */ 209);
__webpack_require__(/*! ./modules/es6.string.sub */ 210);
__webpack_require__(/*! ./modules/es6.string.sup */ 211);
__webpack_require__(/*! ./modules/es6.date.now */ 212);
__webpack_require__(/*! ./modules/es6.date.to-json */ 213);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 214);
__webpack_require__(/*! ./modules/es6.date.to-string */ 216);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 217);
__webpack_require__(/*! ./modules/es6.array.is-array */ 219);
__webpack_require__(/*! ./modules/es6.array.from */ 220);
__webpack_require__(/*! ./modules/es6.array.of */ 221);
__webpack_require__(/*! ./modules/es6.array.join */ 222);
__webpack_require__(/*! ./modules/es6.array.slice */ 223);
__webpack_require__(/*! ./modules/es6.array.sort */ 224);
__webpack_require__(/*! ./modules/es6.array.for-each */ 225);
__webpack_require__(/*! ./modules/es6.array.map */ 227);
__webpack_require__(/*! ./modules/es6.array.filter */ 228);
__webpack_require__(/*! ./modules/es6.array.some */ 229);
__webpack_require__(/*! ./modules/es6.array.every */ 230);
__webpack_require__(/*! ./modules/es6.array.reduce */ 231);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 232);
__webpack_require__(/*! ./modules/es6.array.index-of */ 233);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 234);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 235);
__webpack_require__(/*! ./modules/es6.array.fill */ 236);
__webpack_require__(/*! ./modules/es6.array.find */ 237);
__webpack_require__(/*! ./modules/es6.array.find-index */ 238);
__webpack_require__(/*! ./modules/es6.array.species */ 239);
__webpack_require__(/*! ./modules/es6.array.iterator */ 87);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 240);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 241);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 113);
__webpack_require__(/*! ./modules/es6.regexp.match */ 242);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 243);
__webpack_require__(/*! ./modules/es6.regexp.search */ 244);
__webpack_require__(/*! ./modules/es6.regexp.split */ 245);
__webpack_require__(/*! ./modules/es6.promise */ 246);
__webpack_require__(/*! ./modules/es6.map */ 116);
__webpack_require__(/*! ./modules/es6.set */ 118);
__webpack_require__(/*! ./modules/es6.weak-map */ 119);
__webpack_require__(/*! ./modules/es6.weak-set */ 247);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 248);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 249);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 250);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 251);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 252);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 253);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 254);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 255);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 256);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 257);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 258);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 259);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 260);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 261);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 262);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 263);
__webpack_require__(/*! ./modules/es6.reflect.get */ 264);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 265);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 266);
__webpack_require__(/*! ./modules/es6.reflect.has */ 267);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 268);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 269);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 270);
__webpack_require__(/*! ./modules/es6.reflect.set */ 271);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 272);
__webpack_require__(/*! ./modules/es7.array.includes */ 273);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 274);
__webpack_require__(/*! ./modules/es7.array.flatten */ 275);
__webpack_require__(/*! ./modules/es7.string.at */ 276);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 277);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 278);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 279);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 280);
__webpack_require__(/*! ./modules/es7.string.match-all */ 281);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 282);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 283);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 284);
__webpack_require__(/*! ./modules/es7.object.values */ 285);
__webpack_require__(/*! ./modules/es7.object.entries */ 286);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 287);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 288);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 289);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 290);
__webpack_require__(/*! ./modules/es7.map.to-json */ 291);
__webpack_require__(/*! ./modules/es7.set.to-json */ 292);
__webpack_require__(/*! ./modules/es7.map.of */ 293);
__webpack_require__(/*! ./modules/es7.set.of */ 294);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 295);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 296);
__webpack_require__(/*! ./modules/es7.map.from */ 297);
__webpack_require__(/*! ./modules/es7.set.from */ 298);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 299);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 300);
__webpack_require__(/*! ./modules/es7.global */ 301);
__webpack_require__(/*! ./modules/es7.system.global */ 302);
__webpack_require__(/*! ./modules/es7.error.is-error */ 303);
__webpack_require__(/*! ./modules/es7.math.clamp */ 304);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 305);
__webpack_require__(/*! ./modules/es7.math.degrees */ 306);
__webpack_require__(/*! ./modules/es7.math.fscale */ 307);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 308);
__webpack_require__(/*! ./modules/es7.math.isubh */ 309);
__webpack_require__(/*! ./modules/es7.math.imulh */ 310);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 311);
__webpack_require__(/*! ./modules/es7.math.radians */ 312);
__webpack_require__(/*! ./modules/es7.math.scale */ 313);
__webpack_require__(/*! ./modules/es7.math.umulh */ 314);
__webpack_require__(/*! ./modules/es7.math.signbit */ 315);
__webpack_require__(/*! ./modules/es7.promise.finally */ 316);
__webpack_require__(/*! ./modules/es7.promise.try */ 317);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 318);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 319);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 320);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 321);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 322);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 323);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 324);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 325);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 326);
__webpack_require__(/*! ./modules/es7.asap */ 327);
__webpack_require__(/*! ./modules/es7.observable */ 328);
__webpack_require__(/*! ./modules/web.timers */ 329);
__webpack_require__(/*! ./modules/web.immediate */ 330);
__webpack_require__(/*! ./modules/web.dom.iterable */ 331);
module.exports = __webpack_require__(/*! ./modules/_core */ 22);


/***/ }),
/* 136 */
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
var wksExt = __webpack_require__(/*! ./_wks-ext */ 96);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 67);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 137);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var _create = __webpack_require__(/*! ./_object-create */ 37);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 99);
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
/* 137 */
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
/* 138 */
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
/* 139 */
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
/* 140 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 98) });


/***/ }),
/* 141 */
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
/* 142 */
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
/* 143 */
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
/* 144 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 26)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 99).f;
});


/***/ }),
/* 145 */
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
/* 146 */
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
/* 147 */
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
/* 148 */
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
/* 149 */
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
/* 150 */
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
/* 151 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 100) });


/***/ }),
/* 152 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 153) });


/***/ }),
/* 153 */
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
/* 154 */
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
/* 155 */
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
/* 156 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 101) });


/***/ }),
/* 157 */
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
/* 158 */
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
/* 159 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 103);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 160 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 104);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 161 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var cof = __webpack_require__(/*! ./_cof */ 20);
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
/* 162 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 25);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 105);
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
/* 163 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 105);
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
/* 164 */
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
/* 165 */
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
/* 166 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 106) });


/***/ }),
/* 167 */
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
/* 168 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 106);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 169 */
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
/* 170 */
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
/* 171 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 104);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 172 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 103);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 173 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 107);
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
/* 174 */
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
/* 175 */
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
/* 176 */
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
/* 177 */
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
/* 178 */
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
/* 179 */
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
/* 180 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 108) });


/***/ }),
/* 181 */
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
/* 182 */
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
/* 183 */
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
/* 184 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 107) });


/***/ }),
/* 185 */
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
/* 186 */
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
/* 187 */
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
/* 188 */
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
/* 189 */
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
/* 190 */
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
/* 191 */
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
/* 192 */
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
/* 193 */
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
/* 194 */
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
/* 195 */
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
/* 196 */
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
/* 197 */
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
/* 198 */
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
/* 199 */
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
/* 200 */
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
/* 201 */
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
/* 202 */
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
/* 203 */
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
/* 204 */
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
/* 205 */
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
/* 206 */
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
/* 207 */
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
/* 208 */
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
/* 209 */
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
/* 210 */
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
/* 211 */
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
/* 212 */
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
/* 213 */
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
/* 214 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 215);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 215 */
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
/* 216 */
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
/* 217 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 218));


/***/ }),
/* 218 */
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
/* 219 */
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
/* 220 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 19);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 109);
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
/* 221 */
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
/* 222 */
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
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 48) != Object || !__webpack_require__(/*! ./_strict-method */ 21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 223 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 70);
var cof = __webpack_require__(/*! ./_cof */ 20);
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
/* 224 */
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
}) || !__webpack_require__(/*! ./_strict-method */ 21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 225 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 27)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
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
/* 227 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 27)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 27)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 229 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 27)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 230 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 27)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 231 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 110);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 232 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 110);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 233 */
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

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 234 */
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

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 21)($native)), 'Array', {
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
/* 235 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 111) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('copyWithin');


/***/ }),
/* 236 */
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
/* 237 */
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
/* 238 */
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
/* 239 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 39)('Array');


/***/ }),
/* 240 */
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
/* 241 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 113);
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
/* 242 */
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
/* 243 */
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
/* 244 */
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
/* 245 */
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
/* 246 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 19);
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
var perform = __webpack_require__(/*! ./_perform */ 114);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 115);
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
/* 247 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 120);
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
/* 248 */
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
/* 249 */
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
/* 250 */
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
/* 251 */
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
/* 252 */
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
/* 253 */
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
/* 254 */
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
/* 255 */
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
/* 256 */
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
/* 257 */
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
/* 258 */
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
/* 259 */
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
/* 260 */
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
var bind = __webpack_require__(/*! ./_bind */ 101);
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
/* 261 */
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
/* 262 */
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
/* 263 */
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
/* 264 */
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
/* 265 */
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
/* 266 */
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
/* 267 */
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
/* 268 */
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
/* 269 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 122) });


/***/ }),
/* 270 */
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
/* 271 */
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
/* 272 */
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
/* 273 */
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
/* 274 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 123);
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
/* 275 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 123);
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
/* 276 */
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
/* 277 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 124);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 278 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 124);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 279 */
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
/* 280 */
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
/* 281 */
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
/* 282 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 67)('asyncIterator');


/***/ }),
/* 283 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 67)('observable');


/***/ }),
/* 284 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 122);
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
/* 285 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 125)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 286 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 125)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 287 */
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
/* 288 */
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
/* 289 */
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
/* 290 */
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
/* 291 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 126)('Map') });


/***/ }),
/* 292 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 126)('Set') });


/***/ }),
/* 293 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Map');


/***/ }),
/* 294 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Set');


/***/ }),
/* 295 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakMap');


/***/ }),
/* 296 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakSet');


/***/ }),
/* 297 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Map');


/***/ }),
/* 298 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Set');


/***/ }),
/* 299 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakMap');


/***/ }),
/* 300 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakSet');


/***/ }),
/* 301 */
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
/* 302 */
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
/* 303 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 304 */
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
/* 305 */
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
/* 306 */
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
/* 307 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 128);
var fround = __webpack_require__(/*! ./_math-fround */ 108);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 308 */
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
/* 309 */
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
/* 310 */
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
/* 311 */
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
/* 312 */
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
/* 313 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 128) });


/***/ }),
/* 314 */
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
/* 315 */
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
/* 316 */
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
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 115);

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
/* 317 */
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
var perform = __webpack_require__(/*! ./_perform */ 114);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 318 */
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
/* 319 */
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
/* 320 */
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
/* 321 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 118);
var from = __webpack_require__(/*! ./_array-from-iterable */ 127);
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
/* 322 */
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
/* 323 */
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
/* 324 */
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
/* 325 */
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
/* 326 */
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
/* 327 */
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
var isNode = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 328 */
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
/* 329 */
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
/* 330 */
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
/* 331 */
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
/* 332 */
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
/* 333 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 334);
module.exports = __webpack_require__(/*! ../../modules/_core */ 22).RegExp.escape;


/***/ }),
/* 334 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 335)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 335 */
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
/* 336 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 129);

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _Network = __webpack_require__(/*! ./Network */ 340);

var _Network2 = _interopRequireDefault(_Network);

var _config = __webpack_require__(/*! ./config */ 381);

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
      new _Network2.default(_this);
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
      new _Network2.default(this);
    },

    receivedEvent: function receivedEvent(id) {
      console.log('Received Event: ' + id);
    }
  };

  app.initialize();
}

/***/ }),
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */
/*!************************!*\
  !*** ./src/Network.js ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(/*! ./index */ 341);

var _index2 = _interopRequireDefault(_index);

var _pubnub = __webpack_require__(/*! pubnub */ 380);

var _pubnub2 = _interopRequireDefault(_pubnub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = function () {
  function Network(game) {
    _classCallCheck(this, Network);

    this.game = game;
    this.syncOtherPlayerFrameDelay = 0;
    this.currentChannelName = 'alpha';
    this.uniqueID = _pubnub2.default.generateUUID();
    this.updateOccupancyCounter = false;
    this.checkIfJoined = false;
    this.otherPlayers = null;
    this.player = null;
    this.scene = {};
    this.frameCounter = 0;

    // wrapped network into phaser game object
    this.game.network = this;

    // Setup your PubNub Keys
    window.pubnub = this.pubnub = new _pubnub2.default({
      publishKey: 'pub-c-83603ce4-b7ec-4da7-bb8a-9b5997f8ae7c',
      subscribeKey: 'sub-c-da7cca86-dbb5-11e7-9445-0e38ba8011c7',
      uuid: this.uniqueID
    });

    // Subscribe to the two PubNub Channels
    this.pubnub.subscribe({
      channels: [this.currentChannelName],
      withPresence: true
    });

    this.keyMessages = [];

    this.listener = {
      status: this.listenerStatus.bind(this),
      message: this.listenerMessage.bind(this),
      presence: this.listenerPresence.bind(this)
    };

    this.installEvents();
  }

  _createClass(Network, [{
    key: 'listenerStatus',
    value: function listenerStatus() {
      (0, _index2.default)(this.game);
    }
  }, {
    key: 'listenerMessage',
    value: function listenerMessage(messageEvent) {
      if (messageEvent.message.uuid === this.uniqueID) {
        return; // this blocks drawing a new character set by the server for ourselve, to lower latency
      }
      if (this.otherPlayers) {
        // If player exists
        if (messageEvent.channel === this.currentChannelName) {
          // If the messages channel is equal to your current channel
          if (!this.otherPlayers.has(messageEvent.message.uuid)) {
            // If the message isn't equal to your uuid
            this.game.pncPlugin.addOtherCharacter(this.scene, messageEvent.message.uuid);
            this.sendKeyMessage({}); // Send publish to all clients about user information
            var otherplayer = this.otherPlayers.get(messageEvent.message.uuid);
            otherplayer.position.set(messageEvent.message.position.x, messageEvent.message.position.y); // set the position of each player according to x y
            otherplayer.initialRemoteFrame = messageEvent.message.frameCounter;
            otherplayer.initialLocalFrame = this.frameCounter;
            otherplayer.totalRecvedFrameDelay = 0;
            otherplayer.totalRecvedFrames = 0;
          }
          if (messageEvent.message.position && this.otherPlayers.has(messageEvent.message.uuid)) {
            // If the message contains the position of the player and the player has a uuid that matches with one in the level
            this.keyMessages.push(messageEvent);
          }
        }
      }
    }
  }, {
    key: 'checkFlag',
    value: function checkFlag() {
      var textResponse1 = void 0;
      // Function that reruns until response
      if (this.otherPlayers && this.checkIfJoined === true) {
        // If the globalother heros exists and if the player joined equals true
        clearInterval(this.occupancyCounter); // Destroy the timer for that scene
        this.updateOccupancyCounter = true; // Update the variable that stops the timer from running
        // Run PubNub HereNow function that controls the occupancy
        this.pubnub.hereNow({
          includeUUIDs: true,
          includeState: true
        }, function (status, response) {
          // If I get a valid response from the channel change the text objects to the correct occupancy count
          if (typeof response.channels.alpha !== "undefined") {
            textResponse1 = response.channels.alpha.occupancy.toString();
          } else {
            textResponse1 = "0";
          }
          window.text1 = 'Level 1 Occupancy: ' + textResponse1;
        });
      }
    }
  }, {
    key: 'listenerPresence',
    value: function listenerPresence(presenceEvent) {
      // PubNub on presence message / event
      this.occupancyCounter;

      if (this.updateOccupancyCounter === false) {
        this.occupancyCounter = setInterval(this.checkFlag, 200); // Start timer to run the checkflag function above
      }

      if (presenceEvent.action === "join") {
        // If we recieve a presence event that says a player joined the channel from the pubnub servers
        this.checkIfJoined = true;
        this.checkFlag();
        // text = presenceEvent.totalOccupancy.toString()
        if (presenceEvent.uuid !== this.uniqueID) {
          this.sendKeyMessage({}); // Send message of players location on screen
        }
      } else if (presenceEvent.action === "leave" || presenceEvent.action === "timeout") {
        this.checkFlag();
        try {
          if (this.game.pncPlugin) {
            this.game.pncPlugin.removeOtherCharacter(this.scene, presenceEvent.uuid);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, {
    key: 'sendKeyMessage',
    value: function sendKeyMessage(keyMessage) {
      try {
        if (this.player) {
          this.pubnub.publish({
            message: {
              uuid: this.uniqueID,
              keyMessage: keyMessage,
              position: this.player.position,
              frameCounter: this.frameCounter
            },
            channel: this.currentChannelName,
            sendByPost: false // true to send via posts
          });
        }
        console.log("send message!");
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: 'globalUnsubscribe',
    value: function globalUnsubscribe() {
      try {
        console.log('unsubscribing', this.currentChannelName);
        this.pubnub.unsubscribe({
          channels: [this.currentChannelName],
          withPresence: true
        });
        this.pubnub.removeListener(this.listener);
      } catch (err) {
        console.log("Failed to UnSub");
      }
    }
  }, {
    key: 'installEvents',
    value: function installEvents() {
      var _this = this;

      // If person leaves or refreshes the window, run the unsubscribe function
      window.addEventListener("beforeunload", function () {
        navigator.sendBeacon('https://pubsub.pubnub.com/v2/presence/sub_key/mySubKey/channel/ch1/leave?uuid=' + _this.uniqueID); // pub
        _this.globalUnsubscribe();
      });

      this.pubnub.addListener(this.listener);
    }
  }]);

  return Network;
}();

exports.default = Network;

/***/ }),
/* 341 */
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

var _Index = __webpack_require__(/*! ./states/Lobby/Index */ 342);

var _Index2 = __webpack_require__(/*! ./states/Selector/Index */ 352);

var _Index3 = __webpack_require__(/*! ./states/TestStage/Index */ 376);

__webpack_require__(/*! script-loader!../assets/lib/spriter/spriter.js */ 92);

var Start = function Start(game, networkInstance) {
  game.state.add("SelectorBoot", _Index2.Selector.BootState, false);
  game.state.add("SelectorSplash", _Index2.Selector.SplashState, false);
  game.state.add("SelectorGame", _Index2.Selector.GameState, false);

  game.state.add("TestStageBoot", _Index3.TestStage.BootState, false);
  game.state.add("TestStageSplash", _Index3.TestStage.SplashState, false);
  game.state.add("TestStageGame", _Index3.TestStage.GameState, false);

  game.state.add("LobbyBoot", _Index.Lobby.BootState, false);
  game.state.add("LobbySplash", _Index.Lobby.SplashState, false);
  game.state.add("LobbyGame", _Index.Lobby.GameState, false);

  // This allows two windows to run update function at same time.
  game.state.disableVisibilityChange = true;

  game.state.start("LobbyBoot");
};

exports.default = Start;

/***/ }),
/* 342 */
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

var _Boot = __webpack_require__(/*! ./Boot */ 343);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 350);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 351);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lobby = exports.Lobby = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 343 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _PNCAdventure = __webpack_require__(/*! ../../engine/PNCAdventure */ 344);

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

      // Player Sprites
      this.load.atlas("playerAtlas", "./assets/images/player/Girl_1/Mimi.png", "./assets/images/player/Girl_1/Mimi.json");
      this.load.xml("playerXml", "./assets/images/player/Girl_1/Mimi.scml");
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
/* 344 */
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

var _Scene = __webpack_require__(/*! ./Scene */ 345);

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
        otherPlayerMovementSignal: new Phaser.Signal(),
        navGraphUpdated: new Phaser.Signal()
      };

      this.signals.navGraphUpdated.add(function (graph) {
        this.navGraph = graph;
      }, this);
    }
  }, {
    key: "destroyScene",
    value: function destroyScene() {
      this.signals.sceneTappedSignal.removeAll();
      this.signals.playerMovementSignal.removeAll();
      this.signals.otherPlayerMovementSignal.removeAll();
      this.signals.navGraphUpdated.removeAll();
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
      // if (this.scenes[key] !== undefined) {
      //   console.error("Scene " + key + " already exists");
      //   return false;
      // }
      this.scenes[key] = new _Scene2.default(key, sceneDefinition);
      this.game.state.add("PNC." + key, this.scenes[key], switchTo);
      return this.scenes[key];
    }
  }, {
    key: "addOtherCharacter",
    value: function addOtherCharacter(scene, uuid) {
      return scene.addCharacter(uuid);
    }
  }, {
    key: "removeOtherCharacter",
    value: function removeOtherCharacter(scene, uuid) {
      return scene.removeCharacter(uuid);
    }
  }, {
    key: "addObject",
    value: function addObject(scene, gameObject) {
      return scene.initObjects(gameObject);
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
/* 345 */
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

var _Navmesh = __webpack_require__(/*! ./Navmesh */ 346);

var _Navmesh2 = _interopRequireDefault(_Navmesh);

var _Actor = __webpack_require__(/*! ./Actor */ 130);

var _Actor2 = _interopRequireDefault(_Actor);

var _PlayerActor = __webpack_require__(/*! ./PlayerActor */ 93);

var _PlayerActor2 = _interopRequireDefault(_PlayerActor);

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
    _this.objects = [];
    _this.player = null;
    _this.willMove = null;

    _this.spriterLoader = new Spriter.Loader();

    _this.spriterFile = new Spriter.SpriterXml(game.cache.getXML("playerXml"),
    /* optional parameters */{
      imageNameType: Spriter.eImageNameType.NAME_ONLY
    });

    // Now create Player and add it onto the game
    _this.spriterData = _this.spriterLoader.load(_this.spriterFile);
    return _this;
  }

  _createClass(Scene, [{
    key: "preload",
    value: function preload() {
      /*
      Hacky implementation for now - need to standardise scenedef and process this separately
       */
      // Default player
      // this.game.load.atlas("playerAtlas", "./assets/images/player/player.png", "./assets/images/player/player.json");
      // this.game.load.json("playerJson", "./assets/images/player/player.scon");

      if (this.sceneDefinition.bg) {
        this.game.load.image(this.key + "bg", this.sceneDefinition.bg);
      }
      if (this.sceneDefinition.player) {
        this.game.load.image(this.sceneDefinition.player.image, this.sceneDefinition.player.image);
      }
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      document.getElementById("chat-bar").style.display = "none";
    }
  }, {
    key: "create",
    value: function create() {
      console.debug("Scene initialised");
      document.getElementById("chat-bar").style.display = "block";
      this.camera.flash("#000000");
      this.createSceneHierarchy();
      this.game.network.scene = this;

      // Chat vars
      this.chatGroup = this.game.make.group(null);
      this.chatMessages = this.game.make.group(null);
      this.messages = [];

      // Trigger chat enter event
      this.setupChatLog();
      this.chatEvent();

      this.game.network.otherPlayers = new Map();

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

      if (this.objects.length) {
        for (var i = 0; i < this.objects.length; i++) {
          this.layers.background.add(this.objects[i]);
        }
      }
    }
  }, {
    key: "chatEvent",
    value: function chatEvent() {
      var _this2 = this;

      document.getElementById("chat-bar").addEventListener("keypress", function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
          // 13 is enter
          // code for enter
          var message = document.getElementById("chat-input-text").value;

          _this2.pushMessages({ author: _this2.game.network.uniqueID, text: message });

          document.getElementById("chat-input-text").value = "";

          _this2.game.network.sendKeyMessage({
            chatbox: true,
            message: message
          });
        }
      });
    }
  }, {
    key: "animateActors",
    value: function animateActors() {
      var i = 0;
      for (; i < this.layers.actors.children.length; i++) {
        this.layers.actors.children[i].updateAnimation();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.game.network.frameCounter++;
      this.handleInput();

      if (this.background.input.pointerOver()) {
        this.navmesh.updatePointerLocation(this.background.input.pointerX(), this.background.input.pointerY());
      }
      this.navmesh.updateCharacterLocation(this.actors[0].x, this.actors[0].y);

      // Animate actors on screen
      this.animateActors();

      // We check for depth of players
      this.layers.actors.sort("y", Phaser.Group.SORT_ASCENDING);
    }
  }, {
    key: "findActor",
    value: function findActor(id) {
      return this.actors.find(function (actor) {
        return actor.id == id;
      });
    }
  }, {
    key: "setNavGraph",
    value: function setNavGraph(graph) {
      this.graph = graph;
    }
  }, {
    key: "addNavmeshPoly",
    value: function addNavmeshPoly(poly) {
      this.navmesh.push(poly);
    }
  }, {
    key: "setNavmeshPolys",
    value: function setNavmeshPolys(navmeshPolys) {
      this.navmesh = navmeshPolys;
    }
  }, {
    key: "loadJSONPolyData",
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
    key: "addLayer",
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
    key: "createSceneHierarchy",
    value: function createSceneHierarchy() {
      this.sceneGroup = this.game.add.group();

      this.addLayer("background");
      this.addLayer("actors");
    }
  }, {
    key: "handleKeyMessages",
    value: function handleKeyMessages() {
      var _this3 = this;

      var earlyMessages = [];
      var lateMessages = [];

      this.game.network.keyMessages.forEach(function (messageEvent) {
        if (_this3.game.network.otherPlayers) {
          if (messageEvent.channel === _this3.game.network.currentChannelName) {
            if (_this3.game.network.otherPlayers.has(messageEvent.message.uuid)) {
              _this3.addCharacter(messageEvent.message.uuid);

              var otherplayer = _this3.game.network.otherPlayers.get(messageEvent.message.uuid);
              // otherplayer.position.set(messageEvent.message.position.x, messageEvent.message.position.y);
              otherplayer.initialRemoteFrame = messageEvent.message.frameCounter;
              otherplayer.initialLocalFrame = _this3.game.network.frameCounter;
              _this3.game.network.sendKeyMessage({});
            }

            if (messageEvent.message.keyMessage.chatbox) {
              _this3.pushMessages({
                author: messageEvent.message.uuid,
                text: messageEvent.message.keyMessage.message
              });
            }

            if (messageEvent.message.position && _this3.game.network.otherPlayers.has(messageEvent.message.uuid)) {
              _this3.game.network.keyMessages.push(messageEvent);
              var _otherplayer = _this3.game.network.otherPlayers.get(messageEvent.message.uuid);
              var frameDelta = messageEvent.message.frameCounter - _otherplayer.lastKeyFrame;
              var initDelta = _otherplayer.initialRemoteFrame - _otherplayer.initialLocalFrame;
              var frameDelay = messageEvent.message.frameCounter - _this3.game.network.frameCounter - initDelta + _this3.game.network.syncOtherPlayerFrameDelay;

              if (frameDelay > 0) {
                if (!messageEvent.hasOwnProperty("frameDelay")) {
                  messageEvent.frameDelay = frameDelay;
                  _otherplayer.totalRecvedFrameDelay += frameDelay;
                  _otherplayer.totalRecvedFrames++;
                }

                earlyMessages.push(messageEvent);
                return;
              } else if (frameDelay < 0) {
                _otherplayer.totalRecvedFrameDelay += frameDelay;
                _otherplayer.totalRecvedFrames++;
                lateMessages.push(messageEvent);
                return;
              }

              _otherplayer.lastKeyFrame = messageEvent.message.frameCounter;

              if (messageEvent.message.keyMessage.willMove) {
                if (messageEvent.message.keyMessage.x && messageEvent.message.keyMessage.y && messageEvent.message.keyMessage.path) {
                  _otherplayer.willMove = {
                    x: messageEvent.message.keyMessage.x,
                    y: messageEvent.message.keyMessage.y,
                    path: messageEvent.message.keyMessage.path,
                    clientWidth: messageEvent.message.keyMessage.clientWidth,
                    clientHeight: messageEvent.message.keyMessage.clientHeight
                  };
                }
              }
            }
          }
        }
      });

      if (lateMessages.length > 0) {
        console.log({ lateMessages: lateMessages, earlyMessages: earlyMessages });
      }

      this.game.network.keyMessages.length = 0;

      earlyMessages.forEach(function (em) {
        _this3.game.network.keyMessages.push(em);
      });
    }
  }, {
    key: "resetPath",
    value: function resetPath(path, clientRes) {
      var result = [];
      for (var i = 0; i < path.length; i++) {
        result[i] = {
          x: path[i].x / clientRes.clientWidth * this.game.width,
          y: path[i].y / clientRes.clientHeight * this.game.height
        };
      }

      return result;
    }
  }, {
    key: "handleInput",
    value: function handleInput() {
      this.handleKeyMessages();

      if (this.player) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.game.network.otherPlayers.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var uuid = _step.value;

            var otherplayer = this.game.network.otherPlayers.get(uuid);
            if (otherplayer.willMove) {
              var clientRes = {
                clientWidth: otherplayer.willMove.clientWidth,
                clientHeight: otherplayer.willMove.clientHeight
              };
              var path = this.resetPath(otherplayer.willMove.path, clientRes);

              otherplayer.moveTo({ x: otherplayer.willMove.x, y: otherplayer.willMove.y }, path);
              otherplayer.willMove = null;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    /**
     * initBackground - create the background sprite
     */

  }, {
    key: "initBackground",
    value: function initBackground() {
      this.background = this.game.add.sprite(0, 0, this.key + "bg");
      this.scaleX = this.game.width / this.background.width;
      this.scaleY = this.game.height / this.background.height;

      this.background.scale.setTo(this.scaleX, this.scaleY);
      this.layers.background.add(this.background);
      this.background.inputEnabled = true;
      this.background.events.onInputUp.add(function (sprite, pointer, g) {
        this.game.pncPlugin.signals.sceneTappedSignal.dispatch(pointer, this.navmesh);
      }, this);
    }
  }, {
    key: "setupChatLog",
    value: function setupChatLog() {
      var box = null;
      var topY = 0 + 100;
      var topX = 50;

      box = this.game.make.graphics(topX, topY);
      box.drawRect(0, 0, this.game.width / 2, this.game.height / 3);
      box.inputEnabled = false;

      this.chatGroup.add(box);

      this.chatGroup.add(this.chatMessages);

      this.objects.push(this.chatGroup);
    }
  }, {
    key: "clearMessages",
    value: function clearMessages() {
      while (this.chatMessages.children.length != 0) {
        this.chatMessages.children[0].destroy();
      }
    }
  }, {
    key: "pushMessages",
    value: function pushMessages(msg) {
      var _this4 = this;

      if (this.messages.length == 5) {
        this.messages.shift();

        // Tween out that first old message.
        var endTween = game.add.tween(this.chatMessages.children[0]).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);

        endTween.start();

        endTween.onComplete.add(function () {
          _this4.chatMessages.children[0].destroy();

          _this4.clearMessages();
        }, this);
      }

      this.messages.push(msg);
      this.clearMessages();
      this.renderMessages();
    }
  }, {
    key: "renderMessages",
    value: function renderMessages() {
      var i = 0;
      var textStyle = {
        font: "16px Courier",
        fill: "rgba(0,0,0,0.7)",
        fontWeight: "600",
        align: "left",
        boundsAlignH: "left"
      };

      for (; i < this.messages.length; i++) {
        var text = game.make.text(this.chatGroup.children[0].x, this.chatGroup.children[0].y + i * 24, this.messages[i].author + ": " + this.messages[i].text, textStyle);

        text.addColor('blue', 0);
        text.addColor('blue', this.messages[i].author.length);

        text.addColor('rgba(0,0,0,0.7)', this.messages[i].author.length);
        text.addColor('rgba(0,0,0,0.7)', this.messages[i].author.length + this.messages[i].text.length);

        text.setTextBounds(16, 16, this.game.width, this.game.height);

        this.chatMessages.add(text);
      }

      this.chatMessages.children[i - 1].alpha = 0;

      var startTween = game.add.tween(this.chatMessages.children[i - 1]).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0);

      startTween.start();
    }

    /**
     * initialises an actor into the scene. This does not directly create an actor object.
     * If scene is active, it is added immediately. If inactive, adds to actors array to be added later.
     * @param  {[type]} actorDefinition [description]
     * @return {[type]}                 [description]
     */

  }, {
    key: "initActor",
    value: function initActor(actorDefinition) {
      // if this state is not active defer actor creation until it is
      if (!this.state) {
        this.actors.push(actorDefinition);
      } else {
        this.addActorToScene(actorDefinition);
      }
    }
  }, {
    key: "addCharacter",
    value: function addCharacter(uuid) {
      if (this.game.network.otherPlayers.has(uuid)) {
        return;
      }

      var actorDefinition = {
        spriterData: this.spriterData,
        textureKey: "playerAtlas",
        isSmall: true,
        spawnX: 200,
        spawnY: 600,
        type: _Actor2.default,
        uuid: uuid
      };

      if (!this.state) {
        this.actors.push(actorDefinition);
      } else {
        this.addActorToScene(actorDefinition);
      }
    }
  }, {
    key: "initObjects",
    value: function initObjects(gameObject) {
      // if this state is not active defer object creation until it is
      if (!this.state) {
        this.objects.push(gameObject);
      } else {
        this.layers.background.add(gameObject);
      }
    }
  }, {
    key: "removeCharacter",
    value: function removeCharacter(uuid) {
      if (!this.game.network.otherPlayers.has(uuid)) {
        return;
      }

      this.game.network.otherPlayers.get(uuid).destroy();
      this.game.network.otherPlayers.delete(uuid);
    }

    /**
     * Creates the actor object and adds to the actors layer.
     * @param {Object} actorDefinition - the actor definition data
     */

  }, {
    key: "addActorToScene",
    value: function addActorToScene(actorDefinition) {
      var _this5 = this;

      var actor;

      if (actorDefinition.type === undefined) {
        actor = new _PlayerActor2.default(game, actorDefinition);
        this.game.network.player = actor;
        this.player = actor;
      } else {
        actorDefinition.id = 1;
        actor = new actorDefinition.type(game, actorDefinition);
      }

      if (actorDefinition.uuid) {
        this.game.network.otherPlayers.set(actorDefinition.uuid, actor);
      }

      // Set spawn position for actor
      actor.position.setTo(actorDefinition.spawnX, actorDefinition.spawnY);

      actor.onVariableSet.add(function (spriter, variable) {
        _this5._text = variable.string;
      }, this);

      this.layers.actors.add(actor);

      this.game.network.sendKeyMessage({});

      return actor;
    }
  }]);

  return Scene;
}(Phaser.State);

exports.default = Scene;

/***/ }),
/* 346 */
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

var _constellation = __webpack_require__(/*! ./lib/constellation */ 347);

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

        if (distanceWaypoint < distanceDirect) {
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
/* 347 */
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
/* 348 */
/*!*************************************************!*\
  !*** ./node_modules/script-loader/addScript.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 349 */
/*!*****************************************************************!*\
  !*** ./node_modules/raw-loader!./assets/lib/spriter/spriter.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "var __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Spriter;\n(function (Spriter) {\n    var IdNameMap = (function () {\n        function IdNameMap() {\n            this._items = [];\n            this._itemNames = []; // keys are names and returned value is index into _tems array\n        }\n        // -------------------------------------------------------------------------\n        IdNameMap.prototype.add = function (item, id, name) {\n            if (id === undefined) {\n                id = this._items.length;\n            }\n            if (name === undefined || name === null) {\n                name = \"item_\" + id;\n            }\n            this._items[id] = item;\n            this._itemNames[name] = id;\n        };\n        // -------------------------------------------------------------------------\n        IdNameMap.prototype.getById = function (id) {\n            return this._items[id];\n        };\n        // -------------------------------------------------------------------------\n        IdNameMap.prototype.getByName = function (name) {\n            var id = this._itemNames[name];\n            // TODO remove\n            if (typeof id !== \"number\") {\n                console.warn(\"item \" + name + \"  not found!\");\n            }\n            return (typeof id === \"number\") ? this._items[id] : null;\n        };\n        Object.defineProperty(IdNameMap.prototype, \"length\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._items.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return IdNameMap;\n    }());\n    Spriter.IdNameMap = IdNameMap;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var LineStepper = (function () {\n        // -------------------------------------------------------------------------\n        function LineStepper() {\n            this.reset();\n        }\n        Object.defineProperty(LineStepper.prototype, \"current\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._line.at(this._currentIndex);\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(LineStepper.prototype, \"currentIndex\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._currentIndex;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(LineStepper.prototype, \"next\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._line.at(this._nextIndex);\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(LineStepper.prototype, \"nextIndex\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._nextIndex;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(LineStepper.prototype, \"lastTime\", {\n            // -------------------------------------------------------------------------\n            set: function (time) {\n                this._lastTime = time;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(LineStepper.prototype, \"line\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._line;\n            },\n            // -------------------------------------------------------------------------\n            set: function (line) {\n                this._line = line;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        LineStepper.prototype.reset = function () {\n            this._lastTime = -1;\n            this._currentIndex = -1;\n            this._nextIndex = 0;\n        };\n        // -------------------------------------------------------------------------\n        LineStepper.prototype.step = function (time) {\n            var index = this._nextIndex;\n            // get key at current position\n            var key = this._line.keys[index];\n            var keyTime = key.time;\n            // if current key time is bigger than time for stepTo, then we must first go till end of timeline and then continue from beginning\n            var loop = time < this._lastTime;\n            if ((!loop && (keyTime > this._lastTime && keyTime <= time)) ||\n                (loop && (keyTime > this._lastTime || keyTime <= time))) {\n                this._lastTime = keyTime;\n                this._currentIndex = index;\n                if ((++index) >= this._line.keys.length) {\n                    index = 0;\n                }\n                this._nextIndex = index;\n                return key;\n            }\n            return null;\n        };\n        return LineStepper;\n    }());\n    Spriter.LineStepper = LineStepper;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var NodeListBin = (function () {\n        // -------------------------------------------------------------------------\n        function NodeListBin(spriterBinFile, nodeList) {\n            this._file = spriterBinFile;\n            this._nodeList = nodeList;\n        }\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.length = function () {\n            return this._nodeList.length;\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.processed = function () {\n            this._file.processed();\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getChildNodes = function (index, elementName) {\n            return this._file.getNodesForElement(this._nodeList[index], elementName);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getFolder = function (index) {\n            return this._file.getFolder(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getFile = function (index) {\n            return this._file.getFile(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTag = function (index) {\n            return this._file.getTag(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getEntity = function (index) {\n            return this._file.getEntity(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getObjectInfo = function (index) {\n            return this._file.getObjectInfo(this._nodeList[index], index);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getCharMap = function (index) {\n            return this._file.getCharMap(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getCharMapEntry = function (index, charMap, spriter) {\n            this._file.getCharMapEntry(this._nodeList[index], charMap, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getVariable = function (index) {\n            return this._file.getVariable(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getAnimation = function (index) {\n            return this._file.getAnimation(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getMainline = function (index) {\n            return this._file.getBaseline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getMainlineKey = function (index) {\n            return this._file.getMainlineKey(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getRef = function (index) {\n            return this._file.getRef(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTimeline = function (index) {\n            return this._file.getTimeline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getSoundline = function (index) {\n            return this._file.getBaseline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getEventline = function (index) {\n            return this._file.getBaseline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTagline = function (index) {\n            return this._file.getBaseline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getVarline = function (index) {\n            return this._file.getVarline(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getKey = function (index) {\n            return this._file.getKey(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTagKey = function (index) {\n            return this._file.getTagKey(this._nodeList[index]);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getVariableKey = function (index, type) {\n            return this._file.getVariableKey(this._nodeList[index], type);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTimelineKey = function (index, spriter) {\n            return this._file.getTimelineKey(this._nodeList[index], index, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListBin.prototype.getTagChanges = function (spriter) {\n            var tags = 0;\n            for (var i = 0; i < this.length(); i++) {\n                var tagIndex = this._file.getTagChange(this._nodeList[i]);\n                tags |= (1 << tagIndex);\n            }\n            return tags;\n        };\n        return NodeListBin;\n    }());\n    Spriter.NodeListBin = NodeListBin;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var NodeListJSON = (function () {\n        // -------------------------------------------------------------------------\n        function NodeListJSON(spriterJSONFile, nodeList) {\n            this._file = spriterJSONFile;\n            this._nodeList = nodeList;\n            if (!Array.isArray(nodeList)) {\n                nodeList.length = 1;\n            }\n        }\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.length = function () {\n            return this._nodeList.length;\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.processed = function () {\n            this._file.processed();\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getNode = function (index) {\n            if (Array.isArray(this._nodeList)) {\n                return this._nodeList[index];\n            }\n            else {\n                return this._nodeList;\n            }\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getChildNodes = function (index, elementName) {\n            return this._file.getNodesForElement(this.getNode(index), elementName);\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getFolder = function (index) {\n            return this._file.getFolder(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getFile = function (index) {\n            return this._file.getFile(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTag = function (index) {\n            return this._file.getTag(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getEntity = function (index) {\n            return this._file.getEntity(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getObjectInfo = function (index) {\n            return this._file.getObjectInfo(this.getNode(index), index);\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getCharMap = function (index) {\n            return this._file.getCharMap(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getCharMapEntry = function (index, charMap, spriter) {\n            this._file.getCharMapEntry(this.getNode(index), charMap, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getVariable = function (index) {\n            return this._file.getVariable(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getAnimation = function (index) {\n            return this._file.getAnimation(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getMainline = function (index) {\n            return this._file.getBaseline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getMainlineKey = function (index) {\n            return this._file.getMainlineKey(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getRef = function (index) {\n            return this._file.getRef(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTimeline = function (index) {\n            return this._file.getTimeline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getSoundline = function (index) {\n            return this._file.getBaseline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getEventline = function (index) {\n            return this._file.getBaseline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTagline = function (index) {\n            return this._file.getBaseline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getVarline = function (index) {\n            return this._file.getVarline(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getKey = function (index) {\n            return this._file.getKey(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTagKey = function (index) {\n            return this._file.getTagKey(this.getNode(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getVariableKey = function (index, type) {\n            return this._file.getVariableKey(this.getNode(index), type);\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTimelineKey = function (index, spriter) {\n            return this._file.getTimelineKey(this.getNode(index), index, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListJSON.prototype.getTagChanges = function (spriter) {\n            var tags = 0;\n            for (var i = 0; i < this.length(); i++) {\n                var tagIndex = this._file.getTagChange(this.getNode(i));\n                tags |= (1 << tagIndex);\n            }\n            return tags;\n        };\n        return NodeListJSON;\n    }());\n    Spriter.NodeListJSON = NodeListJSON;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var NodeListXml = (function () {\n        // -------------------------------------------------------------------------\n        function NodeListXml(spriterXmlFile, nodeList) {\n            this._file = spriterXmlFile;\n            this._nodeList = nodeList;\n        }\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.length = function () {\n            return this._nodeList.length;\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.processed = function () {\n            this._file.processed();\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getChildNodes = function (index, elementName) {\n            return this._file.getNodesForElement(this._nodeList.item(index), elementName);\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getFolder = function (index) {\n            return this._file.getFolder(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getFile = function (index) {\n            return this._file.getFile(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTag = function (index) {\n            return this._file.getTag(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getEntity = function (index) {\n            return this._file.getEntity(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getObjectInfo = function (index) {\n            return this._file.getObjectInfo(this._nodeList.item(index), index);\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getCharMap = function (index) {\n            return this._file.getCharMap(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getCharMapEntry = function (index, charMap, spriter) {\n            this._file.getCharMapEntry(this._nodeList.item(index), charMap, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getVariable = function (index) {\n            return this._file.getVariable(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getAnimation = function (index) {\n            return this._file.getAnimation(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getMainline = function (index) {\n            return this._file.getBaseline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getMainlineKey = function (index) {\n            return this._file.getMainlineKey(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getRef = function (index) {\n            return this._file.getRef(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTimeline = function (index) {\n            return this._file.getTimeline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getSoundline = function (index) {\n            return this._file.getBaseline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getEventline = function (index) {\n            return this._file.getBaseline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTagline = function (index) {\n            return this._file.getBaseline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getVarline = function (index) {\n            return this._file.getVarline(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getKey = function (index) {\n            return this._file.getKey(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTagKey = function (index) {\n            return this._file.getTagKey(this._nodeList.item(index));\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getVariableKey = function (index, type) {\n            return this._file.getVariableKey(this._nodeList.item(index), type);\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTimelineKey = function (index, spriter) {\n            return this._file.getTimelineKey(this._nodeList.item(index), index, spriter);\n        };\n        // -------------------------------------------------------------------------\n        NodeListXml.prototype.getTagChanges = function (spriter) {\n            var tags = 0;\n            for (var i = 0; i < this.length(); i++) {\n                var tagIndex = this._file.getTagChange(this._nodeList.item(i));\n                tags |= (1 << tagIndex);\n            }\n            return tags;\n        };\n        return NodeListXml;\n    }());\n    Spriter.NodeListXml = NodeListXml;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    (function (eFileType) {\n        eFileType[eFileType[\"XML\"] = 0] = \"XML\";\n        eFileType[eFileType[\"JSON\"] = 1] = \"JSON\";\n        eFileType[eFileType[\"BIN\"] = 2] = \"BIN\";\n    })(Spriter.eFileType || (Spriter.eFileType = {}));\n    var eFileType = Spriter.eFileType;\n    (function (eImageNameType) {\n        eImageNameType[eImageNameType[\"ORIGINAL\"] = 0] = \"ORIGINAL\";\n        eImageNameType[eImageNameType[\"NAME_ONLY\"] = 1] = \"NAME_ONLY\";\n        eImageNameType[eImageNameType[\"NAME_AND_EXTENSION\"] = 2] = \"NAME_AND_EXTENSION\";\n        eImageNameType[eImageNameType[\"FULL_PATH_NO_EXTENSION\"] = 3] = \"FULL_PATH_NO_EXTENSION\";\n    })(Spriter.eImageNameType || (Spriter.eImageNameType = {}));\n    var eImageNameType = Spriter.eImageNameType;\n    var SpriterFile = (function () {\n        // -------------------------------------------------------------------------\n        function SpriterFile(options) {\n            var hasOptions = typeof options !== \"undefined\" && options !== null;\n            // type of image names (path / name / extension)\n            this._imageNameType = (hasOptions && typeof options.imageNameType !== \"undefined\") ? options.imageNameType : eImageNameType.NAME_ONLY;\n            // min defs are present?\n            this._minDefs = (hasOptions && typeof options.minDefs !== \"undefined\") ? options.minDefs : null;\n        }\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.processed = function () {\n            this.popMinDefsStack();\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.setMinimized = function (minimized) {\n            this._minimized = minimized;\n            if (minimized) {\n                this._minDefsStack = [];\n                if (this._minDefs === null) {\n                    console.error(\"Spriter file is minimized - you must provide object with name definitions\");\n                    return;\n                }\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.getFileName = function (path) {\n            var name;\n            switch (this._imageNameType) {\n                case eImageNameType.NAME_ONLY:\n                    name = (path.split('\\\\').pop().split('/').pop().split('.'))[0];\n                    break;\n                case eImageNameType.NAME_AND_EXTENSION:\n                    name = path.split('\\\\').pop().split('/').pop();\n                    break;\n                case eImageNameType.FULL_PATH_NO_EXTENSION:\n                    name = (path.split('.'))[0];\n                    break;\n                case eImageNameType.ORIGINAL:\n                    name = path;\n                    break;\n            }\n            return name;\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.translateElementName = function (elementName) {\n            if (this._minimized) {\n                if (this._minDefs[\"name\"] !== elementName) {\n                    console.warn(\"current definition is \" + this._minDefs[\"name\"]);\n                    return elementName;\n                }\n                if (this._minDefs[\"minName\"] !== null) {\n                    elementName = this._minDefs[\"minName\"];\n                }\n            }\n            return elementName;\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.translateChildElementName = function (elementName) {\n            if (this._minimized && this._minDefs !== null) {\n                var elements = this._minDefs[\"childElements\"];\n                if (elements !== null) {\n                    elementName = elements[elementName] === null ? elementName : elements[elementName][\"minName\"];\n                }\n            }\n            return elementName;\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.translateAttributeName = function (attributeName) {\n            if (this._minimized && this._minDefs !== null) {\n                var attributes = this._minDefs[\"attributes\"];\n                if (attributes !== null) {\n                    attributeName = attributes[attributeName] === null ? attributeName : attributes[attributeName];\n                }\n            }\n            return attributeName;\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.setMinDefsToElementName = function (tagName) {\n            if (this._minimized) {\n                // save current level of min defs\n                this._minDefsStack.push(this._minDefs);\n                // get child definition and set it as current\n                var minDef = this._minDefs[\"childElements\"][tagName];\n                this._minDefs = minDef;\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterFile.prototype.popMinDefsStack = function () {\n            if (this._minimized) {\n                this._minDefs = this._minDefsStack.pop();\n            }\n        };\n        return SpriterFile;\n    }());\n    Spriter.SpriterFile = SpriterFile;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"SpriterFile.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var SpriterBin = (function (_super) {\n        __extends(SpriterBin, _super);\n        // -------------------------------------------------------------------------\n        function SpriterBin(binData) {\n            _super.call(this, null);\n            this._elements = {\n                \"spriter_data\": 1,\n                \"folder\": 2,\n                \"file\": 3,\n                \"entity\": 4,\n                \"obj_info\": 5,\n                \"frames\": 6,\n                \"i\": 7,\n                \"animation\": 8,\n                \"mainline\": 9,\n                \"key\": 10,\n                \"bone_ref\": 11,\n                \"object_ref\": 12,\n                \"timeline\": 13,\n                \"bone\": 14,\n                \"object\": 15\n            };\n            this._smallOffset = false;\n            this._bin = new DataView(binData);\n            this._smallOffset = this._bin.getUint8(0) === 1;\n        }\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getType = function () {\n            return Spriter.eFileType.BIN;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readUint8 = function () {\n            return this._bin.getUint8(this._tmpPosition++);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readInt8 = function () {\n            return this._bin.getInt8(this._tmpPosition++);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readUint16 = function () {\n            var value = this._bin.getUint16(this._tmpPosition, true);\n            this._tmpPosition += 2;\n            return value;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readInt16 = function () {\n            var value = this._bin.getInt16(this._tmpPosition, true);\n            this._tmpPosition += 2;\n            return value;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readUint32 = function () {\n            var value = this._bin.getUint32(this._tmpPosition, true);\n            this._tmpPosition += 4;\n            return value;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readInt32 = function () {\n            var value = this._bin.getInt32(this._tmpPosition, true);\n            this._tmpPosition += 4;\n            return value;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readFixed16_16 = function () {\n            var value = this._bin.getInt32(this._tmpPosition, true);\n            this._tmpPosition += 4;\n            return value / 65536;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readFixed1_7 = function () {\n            var value = this._bin.getInt8(this._tmpPosition++) & 0xFF;\n            return value / 128;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.readString = function () {\n            var chars = [];\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                chars.push(this._bin.getUint8(this._tmpPosition++));\n            }\n            return String.fromCharCode.apply(null, chars);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getNodes = function (nodeName) {\n            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(1, this._elements[nodeName]));\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getNodesForElement = function (elementPosition, nodeName) {\n            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(elementPosition, this._elements[nodeName]));\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getSubNodesOfElementType = function (positon, elementType) {\n            var result = [];\n            var subelementsCount = this._bin.getUint8(positon + 1);\n            positon += 2;\n            for (var i = 0; i < subelementsCount; i++) {\n                var subelementOffset = this._smallOffset ? this._bin.getUint16(positon + i * 2, true) : this._bin.getUint32(positon + i * 4, true);\n                var subelementType = this._bin.getUint8(positon + subelementOffset);\n                if (subelementType === elementType) {\n                    result.push(positon + subelementOffset);\n                }\n            }\n            return result;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getAttribsPosition = function (position) {\n            var subelementsCount = this._bin.getUint8(position + 1);\n            return position + 2 + subelementsCount * (this._smallOffset ? 2 : 4);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getFolder = function (position) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var name = \"\";\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_FOLDER_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_FOLDER_NAME:\n                        name = this.readString();\n                        break;\n                }\n            }\n            return new Spriter.Folder(id, name);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getFile = function (position) {\n            console.log(\"skip sound loading\");\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var name = \"\";\n            var pivotX = 0;\n            var pivotY = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_FILE_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_FILE_NAME:\n                        name = this.readString();\n                        break;\n                    case SpriterBin.ATTR_FILE_PIVOT_X:\n                        pivotX = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_FILE_PIVOT_Y:\n                        pivotY = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_FILE_WIDTH:\n                    case SpriterBin.ATTR_FILE_HEIGHT:\n                        // ignore - just skip\n                        this._tmpPosition += 2;\n                        break;\n                }\n            }\n            return new Spriter.File(id, this.getFileName(name), pivotX, 1 - pivotY);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getTag = function (position) {\n            console.error(\"implement loading Tag\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getEntity = function (position) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var name = \"\";\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_ENTITY_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_ENTITY_NAME:\n                        name = this.readString();\n                        break;\n                }\n            }\n            return new Spriter.Entity(id, name);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getObjectInfo = function (position, index) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var name = \"\";\n            var type = 0 /* SPRITE */;\n            var width = 0;\n            var height = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_OBJ_INFO_NAME:\n                        name = this.readString();\n                        break;\n                    case SpriterBin.ATTR_OBJ_INFO_TYPE:\n                        if (this.readUint8() === 1) {\n                            type = 1 /* BONE */;\n                        }\n                        break;\n                    case SpriterBin.ATTR_OBJ_INFO_WIDTH:\n                        width = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_OBJ_INFO_HEIGHT:\n                        height = this.readFixed16_16();\n                        break;\n                }\n            }\n            console.error(\"add loading of pivots\");\n            return new Spriter.ObjectInfo(index, name, type, width, height, 0, 0);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getCharMap = function (position) {\n            console.error(\"add loading of charmaps\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getCharMapEntry = function (position, charMap, spriter) {\n            console.error(\"add loading of charmap entries\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getVariable = function (position) {\n            console.error(\"add loading of variables\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getAnimation = function (position) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var name = \"\";\n            var length = 0;\n            var interval = 0;\n            var looping = Spriter.eAnimationLooping.LOOPING;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_ANIMATION_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_ANIMATION_NAME:\n                        name = this.readString();\n                        break;\n                    case SpriterBin.ATTR_ANIMATION_LENGTH:\n                        length = this.readUint32();\n                        break;\n                    case SpriterBin.ATTR_ANIMATION_INTERVAL:\n                        // ignore - skip\n                        this._tmpPosition += 2;\n                        break;\n                    case SpriterBin.ATTR_ANIMATION_LOOPING:\n                        looping = (this.readUint8() === 1) ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING;\n                        break;\n                }\n            }\n            return new Spriter.Animation(id, name, length, looping);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getMainlineKey = function (position) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var time = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_MAINLINE_KEY_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_MAINLINE_KEY_TIME:\n                        time = this.readUint32();\n                        break;\n                }\n            }\n            return new Spriter.KeyMainline(id, time);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getRef = function (position) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var parent = -1;\n            var timeline = 0;\n            var key = 0;\n            var z_index = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_BONE_REF_ID:\n                    case SpriterBin.ATTR_OBJ_REF_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_BONE_REF_PARENT:\n                    case SpriterBin.ATTR_OBJ_REF_PARENT:\n                        parent = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_BONE_REF_TIMELINE:\n                    case SpriterBin.ATTR_OBJ_REF_TIMELINE:\n                        timeline = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_BONE_REF_KEY:\n                    case SpriterBin.ATTR_OBJ_REF_KEY:\n                        key = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_OBJ_REF_Z:\n                        z_index = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_OBJ_REF_NAME:\n                        // waste\n                        this.readString();\n                        break;\n                    case SpriterBin.ATTR_OBJ_REF_FOLDER:\n                    case SpriterBin.ATTR_OBJ_REF_FILE:\n                        ++this._tmpPosition;\n                        break;\n                    case SpriterBin.ATTR_OBJ_REF_ABS_X:\n                    case SpriterBin.ATTR_OBJ_REF_ABS_Y:\n                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X:\n                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y:\n                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X:\n                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y:\n                    case SpriterBin.ATTR_OBJ_REF_ANGLE:\n                        // skip\n                        this._tmpPosition += 4;\n                        break;\n                    case SpriterBin.ATTR_OBJ_REF_ALPHA:\n                        // skip\n                        ++this._tmpPosition;\n                        break;\n                }\n            }\n            return new Spriter.Ref(id, parent, timeline, key, z_index);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getTimeline = function (position) {\n            console.error(\"add loading of all types of objects\");\n            this._tmpPosition = this.getAttribsPosition(position);\n            var id = 0;\n            var name = \"\";\n            var obj = 0;\n            var type = 0 /* SPRITE */;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_TIMELINE_ID:\n                        id = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_NAME:\n                        name = this.readString();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_OBJ:\n                        obj = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_OBJ_TYPE:\n                        if (this.readUint8() === 1) {\n                            type = 1 /* BONE */;\n                        }\n                        break;\n                }\n            }\n            return new Spriter.Timeline(id, name, type, obj);\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getBaseline = function (position) {\n            console.error(\"add loading of baselines\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getVarline = function (position) {\n            console.error(\"add loading of varlines\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getKey = function (position) {\n            console.error(\"add loading of keys\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getTagKey = function (position) {\n            console.error(\"add loading of tag keys\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getVariableKey = function (position, type) {\n            console.error(\"add loading of variable keys\");\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getTimelineKey = function (position, index, spriter) {\n            this._tmpPosition = this.getAttribsPosition(position);\n            var time = 0;\n            var spin = 1;\n            // curve and params\n            var curve = 0 /* LINEAR */;\n            var c1 = 0;\n            var c2 = 0;\n            var c3 = 0;\n            var c4 = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_TIMELINE_KEY_ID:\n                        // skip\n                        ++this._tmpPosition;\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_KEY_TIME:\n                        time = this.readUint32();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_KEY_SPIN:\n                        spin = this.readInt8();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_KEY_CURVE:\n                        curve = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_KEY_C1:\n                        c1 = this.readFixed1_7();\n                        break;\n                    case SpriterBin.ATTR_TIMELINE_KEY_C2:\n                        c2 = this.readFixed1_7();\n                        break;\n                }\n            }\n            // get child element\n            position += 2;\n            var offset = position + (this._smallOffset ? this._bin.getUint16(position, true) : this._bin.getUint32(position, true));\n            var elementType = this._bin.getUint8(offset);\n            var key = null;\n            var keyDataElm = null;\n            var sprite = false;\n            if (elementType === 14 /* bone */) {\n                key = new Spriter.KeyBone(index, time, spin);\n            }\n            else if (elementType === 15 /* object */) {\n                key = new Spriter.KeyObject(index, time, spin);\n                sprite = true;\n            }\n            // other curve than linear?\n            if (curve !== 0 /* LINEAR */) {\n                key.setCurve(curve, c1, c2, c3, c4);\n            }\n            this._tmpPosition = this.getAttribsPosition(offset);\n            // spatial info\n            var info = key.info;\n            info.x = 0; //this.parseFloat(keyDataElm, \"x\");\n            info.y = 0; //-this.parseFloat(keyDataElm, \"y\");\n            info.scaleX = 1; // this.parseFloat(keyDataElm, \"scale_x\", 1);\n            info.scaleY = 1; //this.parseFloat(keyDataElm, \"scale_y\", 1);\n            info.angle = 0; //360 - this.parseFloat(keyDataElm, \"angle\");\n            info.alpha = 1; //this.parseFloat(keyDataElm, \"a\", 1);\n            var pivotX = 0;\n            var hasPivotX = false;\n            var pivotY = 0;\n            var hasPivotY = false;\n            var folder = 0;\n            var file = 0;\n            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {\n                switch (this._bin.getUint8(this._tmpPosition++)) {\n                    case SpriterBin.ATTR_BONE_X:\n                    case SpriterBin.ATTR_OBJ_X:\n                        info.x = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_BONE_Y:\n                    case SpriterBin.ATTR_OBJ_Y:\n                        info.y = -this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_BONE_ANGLE:\n                    case SpriterBin.ATTR_OBJ_ANGLE:\n                        info.angle = 360 - this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_BONE_SCALE_X:\n                    case SpriterBin.ATTR_OBJ_SCALE_X:\n                        info.scaleX = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_BONE_SCALE_Y:\n                    case SpriterBin.ATTR_OBJ_SCALE_Y:\n                        info.scaleY = this.readFixed16_16();\n                        break;\n                    case SpriterBin.ATTR_OBJ_FOLDER:\n                        folder = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_OBJ_FILE:\n                        file = this.readUint8();\n                        break;\n                    case SpriterBin.ATTR_OBJ_PIVOT_X:\n                        pivotX = this.readFixed16_16();\n                        hasPivotX = true;\n                        break;\n                    case SpriterBin.ATTR_OBJ_PIVOT_Y:\n                        pivotY = this.readFixed16_16();\n                        hasPivotY = true;\n                        break;\n                    case SpriterBin.ATTR_OBJ_ALPHA:\n                        info.alpha = this.readFixed1_7();\n                        break;\n                }\n            }\n            if (sprite) {\n                key.setFolderAndFile(folder, file);\n                // set pivot in spatial info different from default (based on pivot in file)\n                var fileObj = spriter.getFolderById(folder).getFileById(file);\n                info.pivotX = hasPivotX ? pivotX : fileObj.pivotX;\n                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping\n                info.pivotY = 1 - (hasPivotY ? pivotY : 1 - fileObj.pivotY);\n            }\n            return key;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBin.prototype.getTagChange = function (position) {\n            console.error(\"add loading of tag changes\");\n            return null;\n        };\n        // spriter data\n        SpriterBin.ATTR_VERSION = 0;\n        SpriterBin.ATTR_GENERATOR = 1;\n        SpriterBin.ATTR_GENERATOR_VERSION = 2;\n        // folder\n        SpriterBin.ATTR_FOLDER_ID = 0;\n        SpriterBin.ATTR_FOLDER_NAME = 1;\n        // file\n        SpriterBin.ATTR_FILE_ID = 0;\n        SpriterBin.ATTR_FILE_NAME = 1;\n        SpriterBin.ATTR_FILE_WIDTH = 2;\n        SpriterBin.ATTR_FILE_HEIGHT = 3;\n        SpriterBin.ATTR_FILE_PIVOT_X = 4;\n        SpriterBin.ATTR_FILE_PIVOT_Y = 5;\n        // entity\n        SpriterBin.ATTR_ENTITY_ID = 0;\n        SpriterBin.ATTR_ENTITY_NAME = 1;\n        // obj_info\n        SpriterBin.ATTR_OBJ_INFO_NAME = 0;\n        SpriterBin.ATTR_OBJ_INFO_TYPE = 1;\n        SpriterBin.ATTR_OBJ_INFO_WIDTH = 2;\n        SpriterBin.ATTR_OBJ_INFO_HEIGHT = 3;\n        // frames\n        SpriterBin.ATTR_FRAMES_I_FOLDER = 0;\n        SpriterBin.ATTR_FRAMES_I_FILE = 1;\n        // animation\n        SpriterBin.ATTR_ANIMATION_ID = 0;\n        SpriterBin.ATTR_ANIMATION_NAME = 1;\n        SpriterBin.ATTR_ANIMATION_LENGTH = 2;\n        SpriterBin.ATTR_ANIMATION_INTERVAL = 3;\n        SpriterBin.ATTR_ANIMATION_LOOPING = 4;\n        // key\n        SpriterBin.ATTR_MAINLINE_KEY_ID = 0;\n        SpriterBin.ATTR_MAINLINE_KEY_TIME = 1;\n        // bone_ref\n        SpriterBin.ATTR_BONE_REF_ID = 0;\n        SpriterBin.ATTR_BONE_REF_PARENT = 1;\n        SpriterBin.ATTR_BONE_REF_TIMELINE = 2;\n        SpriterBin.ATTR_BONE_REF_KEY = 3;\n        // object_ref\n        SpriterBin.ATTR_OBJ_REF_ID = 4;\n        SpriterBin.ATTR_OBJ_REF_PARENT = 5;\n        SpriterBin.ATTR_OBJ_REF_TIMELINE = 6;\n        SpriterBin.ATTR_OBJ_REF_KEY = 7;\n        SpriterBin.ATTR_OBJ_REF_NAME = 8;\n        SpriterBin.ATTR_OBJ_REF_Z = 9;\n        SpriterBin.ATTR_OBJ_REF_FOLDER = 10;\n        SpriterBin.ATTR_OBJ_REF_FILE = 11;\n        SpriterBin.ATTR_OBJ_REF_ABS_X = 12;\n        SpriterBin.ATTR_OBJ_REF_ABS_Y = 13;\n        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X = 14;\n        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y = 15;\n        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X = 16;\n        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y = 17;\n        SpriterBin.ATTR_OBJ_REF_ANGLE = 18;\n        SpriterBin.ATTR_OBJ_REF_ALPHA = 19;\n        // timeline\n        SpriterBin.ATTR_TIMELINE_ID = 0;\n        SpriterBin.ATTR_TIMELINE_NAME = 1;\n        SpriterBin.ATTR_TIMELINE_OBJ = 2;\n        SpriterBin.ATTR_TIMELINE_OBJ_TYPE = 3;\n        // key\n        SpriterBin.ATTR_TIMELINE_KEY_ID = 0;\n        SpriterBin.ATTR_TIMELINE_KEY_TIME = 1;\n        SpriterBin.ATTR_TIMELINE_KEY_SPIN = 2;\n        SpriterBin.ATTR_TIMELINE_KEY_CURVE = 3;\n        SpriterBin.ATTR_TIMELINE_KEY_C1 = 4;\n        SpriterBin.ATTR_TIMELINE_KEY_C2 = 5;\n        // bone\n        SpriterBin.ATTR_BONE_X = 0;\n        SpriterBin.ATTR_BONE_Y = 1;\n        SpriterBin.ATTR_BONE_ANGLE = 2;\n        SpriterBin.ATTR_BONE_SCALE_X = 3;\n        SpriterBin.ATTR_BONE_SCALE_Y = 4;\n        // object\n        SpriterBin.ATTR_OBJ_FOLDER = 5;\n        SpriterBin.ATTR_OBJ_FILE = 6;\n        SpriterBin.ATTR_OBJ_X = 7;\n        SpriterBin.ATTR_OBJ_Y = 8;\n        SpriterBin.ATTR_OBJ_SCALE_X = 9;\n        SpriterBin.ATTR_OBJ_SCALE_Y = 10;\n        SpriterBin.ATTR_OBJ_PIVOT_X = 11;\n        SpriterBin.ATTR_OBJ_PIVOT_Y = 12;\n        SpriterBin.ATTR_OBJ_ANGLE = 13;\n        SpriterBin.ATTR_OBJ_ALPHA = 14;\n        return SpriterBin;\n    }(Spriter.SpriterFile));\n    Spriter.SpriterBin = SpriterBin;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"SpriterFile.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var SpriterJSON = (function (_super) {\n        __extends(SpriterJSON, _super);\n        // -------------------------------------------------------------------------\n        function SpriterJSON(JSONData, options) {\n            _super.call(this, options);\n            this._json = JSONData;\n            var minimized = JSONData[\"min\"] !== undefined;\n            this.setMinimized(minimized);\n        }\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getType = function () {\n            return Spriter.eFileType.JSON;\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.parseInt = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = 0; }\n            var value = element[this.translateAttributeName(attributeName)];\n            if (value === undefined) {\n                return defaultValue;\n            }\n            return typeof (value) === \"number\" ? value : parseInt(value);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.parseFloat = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = 0; }\n            var value = element[this.translateAttributeName(attributeName)];\n            if (value === undefined) {\n                return defaultValue;\n            }\n            return typeof (value) === \"number\" ? value : parseFloat(value);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.parseBoolean = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = false; }\n            var value = element[this.translateAttributeName(attributeName)];\n            if (value === undefined) {\n                return defaultValue;\n            }\n            return typeof (value) === \"boolean\" ? value : (value === \"true\");\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.parseString = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = \"\"; }\n            var value = element[this.translateAttributeName(attributeName)];\n            return value === undefined ? defaultValue : value;\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getNodes = function (nodeName) {\n            this.setMinDefsToElementName(nodeName);\n            var translatedName = this.translateElementName(nodeName);\n            return new Spriter.NodeListJSON(this, (this._json[translatedName] !== undefined) ? this._json[translatedName] : []);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getNodesForElement = function (element, nodeName) {\n            this.setMinDefsToElementName(nodeName);\n            var translatedName = this.translateElementName(nodeName);\n            return new Spriter.NodeListJSON(this, (element[translatedName] !== undefined) ? element[translatedName] : []);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getFolder = function (element) {\n            return new Spriter.Folder(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getFile = function (element) {\n            if (element[\"type\"] !== undefined && element[\"type\"] === \"sound\") {\n                return null;\n            }\n            return new Spriter.File(this.parseInt(element, \"id\"), this.getFileName(this.parseString(element, \"name\")), this.parseFloat(element, \"pivot_x\"), 1 - this.parseFloat(element, \"pivot_y\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getTag = function (element) {\n            return new Spriter.Item(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getEntity = function (element) {\n            return new Spriter.Entity(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getObjectInfo = function (element, index) {\n            return new Spriter.ObjectInfo(index, this.parseString(element, \"name\"), Spriter.Types.getObjectTypeForName(this.parseString(element, \"type\")), this.parseFloat(element, \"w\"), this.parseFloat(element, \"h\"), this.parseFloat(element, \"pivot_x\"), this.parseFloat(element, \"pivot_y\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getCharMap = function (element) {\n            return new Spriter.CharMap(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getCharMapEntry = function (element, charMap, spriter) {\n            var sourceName = spriter.getFolderById(this.parseInt(element, \"folder\")).\n                getFileById(this.parseInt(element, \"file\")).name;\n            var target = null;\n            if (element[\"target_folder\"] !== undefined && element[\"target_file\"] !== undefined) {\n                target = spriter.getFolderById(this.parseInt(element, \"target_folder\")).\n                    getFileById(this.parseInt(element, \"target_file\"));\n            }\n            charMap.put(sourceName, target);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getVariable = function (element) {\n            var type = Spriter.Types.getVariableTypeForName(this.parseString(element, \"type\"));\n            return new Spriter.Variable(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), type, (type === 2 /* STRING */) ? this.parseString(element, \"default\") : this.parseFloat(element, \"default\", 0));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getAnimation = function (element) {\n            return new Spriter.Animation(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), this.parseFloat(element, \"length\"), this.parseBoolean(element, \"looping\", true) === true ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getMainlineKey = function (element) {\n            return new Spriter.KeyMainline(this.parseInt(element, \"id\"), this.parseFloat(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getRef = function (element) {\n            return new Spriter.Ref(this.parseInt(element, \"id\"), this.parseInt(element, \"parent\", -1), this.parseInt(element, \"timeline\"), this.parseInt(element, \"key\"), this.parseInt(element, \"z_index\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getTimeline = function (element) {\n            return new Spriter.Timeline(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), Spriter.Types.getObjectTypeForName(this.parseString(element, \"object_type\", \"sprite\")), this.parseInt(element, \"obj\", -1));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getBaseline = function (element) {\n            return new Spriter.Baseline(this.parseInt(element, \"id\"), this.parseString(element, \"name\", null));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getVarline = function (element) {\n            return new Spriter.Varline(this.parseInt(element, \"id\"), this.parseInt(element, \"def\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getKey = function (element) {\n            return new Spriter.Key(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getTagKey = function (element) {\n            return new Spriter.KeyTag(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getVariableKey = function (element, type) {\n            return new Spriter.KeyVariable(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"), (type === 2 /* STRING */) ? this.parseString(element, \"val\") : this.parseFloat(element, \"val\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getTimelineKey = function (element, index, spriter) {\n            var time = this.parseInt(element, \"time\");\n            var spin = this.parseInt(element, \"spin\", 1);\n            // curve and params\n            var curve = this.parseString(element, \"curve_type\", \"linear\");\n            var c1 = this.parseFloat(element, \"c1\", 0);\n            var c2 = this.parseFloat(element, \"c2\", 0);\n            var c3 = this.parseFloat(element, \"c3\", 0);\n            var c4 = this.parseFloat(element, \"c4\", 0);\n            // sprite or bone key?\n            var boneTag = this.translateChildElementName(\"bone\");\n            var objectTag = this.translateChildElementName(\"object\");\n            var key = null;\n            var keyDataElm = null;\n            var sprite = false;\n            if (element[boneTag] !== undefined) {\n                keyDataElm = element[boneTag];\n                key = new Spriter.KeyBone(index, time, spin);\n                this.setMinDefsToElementName(\"bone\");\n            }\n            else if (element[objectTag] !== undefined) {\n                keyDataElm = element[objectTag];\n                key = new Spriter.KeyObject(index, time, spin);\n                this.setMinDefsToElementName(\"object\");\n                sprite = true;\n            }\n            // other curve than linear?\n            if (curve !== \"linear\") {\n                key.setCurve(Spriter.Types.getCurveTypeForName(curve), c1, c2, c3, c4);\n            }\n            // spatial info\n            var info = key.info;\n            info.x = this.parseFloat(keyDataElm, \"x\");\n            info.y = -this.parseFloat(keyDataElm, \"y\");\n            info.scaleX = this.parseFloat(keyDataElm, \"scale_x\", 1);\n            info.scaleY = this.parseFloat(keyDataElm, \"scale_y\", 1);\n            info.angle = 360 - this.parseFloat(keyDataElm, \"angle\");\n            info.alpha = this.parseFloat(keyDataElm, \"a\", 1);\n            if (sprite) {\n                // sprite specific - set file and folder\n                var folderId = this.parseInt(keyDataElm, \"folder\");\n                var fileId = this.parseInt(keyDataElm, \"file\");\n                key.setFolderAndFile(folderId, fileId);\n                // set pivot in spatial info different from default (based on pivot in file)\n                var file = spriter.getFolderById(folderId).getFileById(fileId);\n                info.pivotX = this.parseFloat(keyDataElm, \"pivot_x\", file.pivotX);\n                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping\n                info.pivotY = 1 - this.parseFloat(keyDataElm, \"pivot_y\", 1 - file.pivotY);\n            }\n            this.popMinDefsStack();\n            return key;\n        };\n        // -------------------------------------------------------------------------\n        SpriterJSON.prototype.getTagChange = function (element) {\n            return this.parseInt(element, \"t\");\n        };\n        return SpriterJSON;\n    }(Spriter.SpriterFile));\n    Spriter.SpriterJSON = SpriterJSON;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"SpriterFile.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var SpriterXml = (function (_super) {\n        __extends(SpriterXml, _super);\n        // -------------------------------------------------------------------------\n        function SpriterXml(xmlData, options) {\n            _super.call(this, options);\n            this._xml = xmlData;\n            var minimized = xmlData.documentElement.hasAttribute(\"min\");\n            this.setMinimized(minimized);\n        }\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getType = function () {\n            return Spriter.eFileType.XML;\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.parseInt = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = 0; }\n            var value = element.getAttribute(this.translateAttributeName(attributeName));\n            return value !== null ? parseInt(value) : defaultValue;\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.parseFloat = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = 0; }\n            var value = element.getAttribute(this.translateAttributeName(attributeName));\n            return value !== null ? parseFloat(value) : defaultValue;\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.parseString = function (element, attributeName, defaultValue) {\n            if (defaultValue === void 0) { defaultValue = \"\"; }\n            var value = element.getAttribute(this.translateAttributeName(attributeName));\n            return value !== null ? value : defaultValue;\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getNodes = function (nodeName) {\n            this.setMinDefsToElementName(nodeName);\n            var translatedName = this.translateElementName(nodeName);\n            return new Spriter.NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getNodesForElement = function (element, nodeName) {\n            this.setMinDefsToElementName(nodeName);\n            var translatedName = this.translateElementName(nodeName);\n            return new Spriter.NodeListXml(this, element.getElementsByTagName(translatedName));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getFolder = function (element) {\n            return new Spriter.Folder(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getFile = function (element) {\n            if (element.hasAttribute(\"type\") && element.getAttribute(\"type\") === \"sound\") {\n                return null;\n            }\n            return new Spriter.File(this.parseInt(element, \"id\"), this.getFileName(this.parseString(element, \"name\")), this.parseFloat(element, \"pivot_x\"), 1 - this.parseFloat(element, \"pivot_y\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getTag = function (element) {\n            return new Spriter.Item(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getEntity = function (element) {\n            return new Spriter.Entity(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getObjectInfo = function (element, index) {\n            return new Spriter.ObjectInfo(index, this.parseString(element, \"name\"), Spriter.Types.getObjectTypeForName(this.parseString(element, \"type\")), this.parseFloat(element, \"w\"), this.parseFloat(element, \"h\"), this.parseFloat(element, \"pivot_x\"), this.parseFloat(element, \"pivot_y\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getCharMap = function (element) {\n            return new Spriter.CharMap(this.parseInt(element, \"id\"), this.parseString(element, \"name\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getCharMapEntry = function (element, charMap, spriter) {\n            var sourceName = spriter.getFolderById(this.parseInt(element, \"folder\")).\n                getFileById(this.parseInt(element, \"file\")).name;\n            var target = null;\n            if (element.hasAttribute(\"target_folder\") && element.hasAttribute(\"target_file\")) {\n                target = spriter.getFolderById(this.parseInt(element, \"target_folder\")).\n                    getFileById(this.parseInt(element, \"target_file\"));\n            }\n            charMap.put(sourceName, target);\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getVariable = function (element) {\n            var type = Spriter.Types.getVariableTypeForName(this.parseString(element, \"type\"));\n            return new Spriter.Variable(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), type, (type === 2 /* STRING */) ? this.parseString(element, \"default\") : this.parseFloat(element, \"default\", 0));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getAnimation = function (element) {\n            return new Spriter.Animation(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), this.parseFloat(element, \"length\"), this.parseString(element, \"looping\", \"true\") === \"true\" ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getMainlineKey = function (element) {\n            return new Spriter.KeyMainline(this.parseInt(element, \"id\"), this.parseFloat(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getRef = function (element) {\n            return new Spriter.Ref(this.parseInt(element, \"id\"), this.parseInt(element, \"parent\", -1), this.parseInt(element, \"timeline\"), this.parseInt(element, \"key\"), this.parseInt(element, \"z_index\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getTimeline = function (element) {\n            return new Spriter.Timeline(this.parseInt(element, \"id\"), this.parseString(element, \"name\"), Spriter.Types.getObjectTypeForName(this.parseString(element, \"object_type\", \"sprite\")), this.parseInt(element, \"obj\", -1));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getBaseline = function (element) {\n            return new Spriter.Baseline(this.parseInt(element, \"id\"), this.parseString(element, \"name\", null));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getVarline = function (element) {\n            return new Spriter.Varline(this.parseInt(element, \"id\"), this.parseInt(element, \"def\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getKey = function (element) {\n            return new Spriter.Key(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getTagKey = function (element) {\n            return new Spriter.KeyTag(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getVariableKey = function (element, type) {\n            return new Spriter.KeyVariable(this.parseInt(element, \"id\"), this.parseInt(element, \"time\"), (type === 2 /* STRING */) ? this.parseString(element, \"val\") : this.parseFloat(element, \"val\"));\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getTimelineKey = function (element, index, spriter) {\n            var time = this.parseInt(element, \"time\");\n            var spin = this.parseInt(element, \"spin\", 1);\n            // curve and params\n            var curve = this.parseString(element, \"curve_type\", \"linear\");\n            var c1 = this.parseFloat(element, \"c1\", 0);\n            var c2 = this.parseFloat(element, \"c2\", 0);\n            var c3 = this.parseFloat(element, \"c3\", 0);\n            var c4 = this.parseFloat(element, \"c4\", 0);\n            // sprite or bone key?\n            var boneTag = this.translateChildElementName(\"bone\");\n            var objectTag = this.translateChildElementName(\"object\");\n            var key = null;\n            var keyDataElm = (element.firstElementChild);\n            var sprite = false;\n            if (keyDataElm.tagName === boneTag) {\n                key = new Spriter.KeyBone(index, time, spin);\n                this.setMinDefsToElementName(\"bone\");\n            }\n            else if (keyDataElm.tagName === objectTag) {\n                this.setMinDefsToElementName(\"object\");\n                key = new Spriter.KeyObject(index, time, spin);\n                sprite = true;\n            }\n            // other curve than linear?\n            if (curve !== \"linear\") {\n                key.setCurve(Spriter.Types.getCurveTypeForName(curve), c1, c2, c3, c4);\n            }\n            // spatial info\n            var info = key.info;\n            info.x = this.parseFloat(keyDataElm, \"x\");\n            info.y = -this.parseFloat(keyDataElm, \"y\");\n            info.scaleX = this.parseFloat(keyDataElm, \"scale_x\", 1);\n            info.scaleY = this.parseFloat(keyDataElm, \"scale_y\", 1);\n            info.angle = 360 - this.parseFloat(keyDataElm, \"angle\");\n            info.alpha = this.parseFloat(keyDataElm, \"a\", 1);\n            if (sprite) {\n                // sprite specific - set file and folder\n                var folderId = this.parseInt(keyDataElm, \"folder\");\n                var fileId = this.parseInt(keyDataElm, \"file\");\n                key.setFolderAndFile(folderId, fileId);\n                // set pivot in spatial info different from default (based on pivot in file)\n                var file = spriter.getFolderById(folderId).getFileById(fileId);\n                info.pivotX = this.parseFloat(keyDataElm, \"pivot_x\", file.pivotX);\n                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping\n                info.pivotY = 1 - this.parseFloat(keyDataElm, \"pivot_y\", 1 - file.pivotY);\n            }\n            this.popMinDefsStack();\n            return key;\n        };\n        // -------------------------------------------------------------------------\n        SpriterXml.prototype.getTagChange = function (element) {\n            return this.parseInt(element, \"t\");\n        };\n        return SpriterXml;\n    }(Spriter.SpriterFile));\n    Spriter.SpriterXml = SpriterXml;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Item = (function () {\n        // -------------------------------------------------------------------------\n        function Item(id, name) {\n            this._id = id;\n            this._name = name;\n        }\n        Object.defineProperty(Item.prototype, \"id\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._id;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Item.prototype, \"name\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._name;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Item;\n    }());\n    Spriter.Item = Item;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"../IdNameMap.ts\" />\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    (function (eAnimationLooping) {\n        eAnimationLooping[eAnimationLooping[\"NO_LOOPING\"] = 0] = \"NO_LOOPING\";\n        eAnimationLooping[eAnimationLooping[\"LOOPING\"] = 1] = \"LOOPING\";\n    })(Spriter.eAnimationLooping || (Spriter.eAnimationLooping = {}));\n    var eAnimationLooping = Spriter.eAnimationLooping;\n    ;\n    var Animation = (function (_super) {\n        __extends(Animation, _super);\n        // -------------------------------------------------------------------------\n        function Animation(id, name, length, loopType) {\n            _super.call(this, id, name);\n            this._length = length;\n            this._loopType = loopType;\n            this._timelines = new Spriter.IdNameMap();\n            this._lines = new Spriter.IdNameMap();\n        }\n        Object.defineProperty(Animation.prototype, \"mainline\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._mainline;\n            },\n            // -------------------------------------------------------------------------\n            set: function (mainline) {\n                this._mainline = mainline;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        Animation.prototype.addTimeline = function (timeline) {\n            this._timelines.add(timeline, timeline.id, timeline.name);\n        };\n        // -------------------------------------------------------------------------\n        Animation.prototype.getTimelineById = function (id) {\n            return this._timelines.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Animation.prototype.getTimelineByName = function (name) {\n            return this._timelines.getByName(name);\n        };\n        // -------------------------------------------------------------------------\n        Animation.prototype.addLine = function (line) {\n            this._lines.add(line, this._lines.length, line.name);\n        };\n        // -------------------------------------------------------------------------\n        Animation.prototype.getLineById = function (id) {\n            return this._lines.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Animation.prototype.getLineByName = function (name) {\n            return this._lines.getByName(name);\n        };\n        Object.defineProperty(Animation.prototype, \"linesLength\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._lines.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Animation.prototype, \"length\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Animation.prototype, \"loopType\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._loopType;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Animation;\n    }(Spriter.Item));\n    Spriter.Animation = Animation;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"../IdNameMap.ts\" />\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var Entity = (function (_super) {\n        __extends(Entity, _super);\n        // -------------------------------------------------------------------------\n        function Entity(id, name) {\n            _super.call(this, id, name);\n            this._objectInfos = new Spriter.IdNameMap();\n            this._charMaps = new Spriter.IdNameMap();\n            this._variables = new Spriter.IdNameMap();\n            this._animations = new Spriter.IdNameMap();\n        }\n        // -------------------------------------------------------------------------\n        Entity.prototype.addObjectInfo = function (objectInfo) {\n            this._objectInfos.add(objectInfo, objectInfo.id, objectInfo.name);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getObjectInfoById = function (id) {\n            return this._objectInfos.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getObjectInfoByName = function (name) {\n            return this._objectInfos.getByName(name);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.addCharMap = function (charMap) {\n            this._charMaps.add(charMap, charMap.id, charMap.name);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getCharMapById = function (id) {\n            return this._charMaps.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getCharMapByName = function (name) {\n            return this._charMaps.getByName(name);\n        };\n        Object.defineProperty(Entity.prototype, \"charMapsLength\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._charMaps.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        Entity.prototype.addVariable = function (variable) {\n            this._variables.add(variable, variable.id, variable.name);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getVariableById = function (id) {\n            return this._variables.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getVariableByName = function (name) {\n            return this._variables.getByName(name);\n        };\n        Object.defineProperty(Entity.prototype, \"variablesLength\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._variables.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        Entity.prototype.addAnimation = function (animation) {\n            this._animations.add(animation, animation.id, animation.name);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getAnimationById = function (id) {\n            return this._animations.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Entity.prototype.getAnimationByName = function (name) {\n            return this._animations.getByName(name);\n        };\n        Object.defineProperty(Entity.prototype, \"animationsLength\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._animations.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Entity;\n    }(Spriter.Item));\n    Spriter.Entity = Entity;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var File = (function (_super) {\n        __extends(File, _super);\n        // -------------------------------------------------------------------------\n        function File(id, name, pivotX, pivotY) {\n            _super.call(this, id, name);\n            this._pivotX = pivotX;\n            this._pivotY = pivotY;\n        }\n        Object.defineProperty(File.prototype, \"pivotX\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._pivotX;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(File.prototype, \"pivotY\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._pivotY;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return File;\n    }(Spriter.Item));\n    Spriter.File = File;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"../IdNameMap.ts\" />\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var Folder = (function (_super) {\n        __extends(Folder, _super);\n        // -------------------------------------------------------------------------\n        function Folder(id, name) {\n            _super.call(this, id, name);\n            this._files = new Spriter.IdNameMap();\n        }\n        // -------------------------------------------------------------------------\n        Folder.prototype.addFile = function (file) {\n            this._files.add(file, file.id, file.name);\n        };\n        // -------------------------------------------------------------------------\n        Folder.prototype.getFileById = function (id) {\n            return this._files.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Folder.prototype.getFileByName = function (name) {\n            return this._files.getByName(name);\n        };\n        return Folder;\n    }(Spriter.Item));\n    Spriter.Folder = Folder;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var CharMap = (function (_super) {\n        __extends(CharMap, _super);\n        function CharMap() {\n            _super.apply(this, arguments);\n        }\n        // -------------------------------------------------------------------------\n        CharMap.prototype.put = function (key, value) {\n            if (this._map === undefined) {\n                this._map = {};\n            }\n            if (this._map[key] !== undefined) {\n                console.error(\"Key with name \" + key + \" already exists\");\n            }\n            this._map[key] = value;\n        };\n        // -------------------------------------------------------------------------\n        CharMap.prototype.value = function (key) {\n            return this._map[key];\n        };\n        return CharMap;\n    }(Spriter.Item));\n    Spriter.CharMap = CharMap;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var CharMapStack = (function () {\n        // -------------------------------------------------------------------------\n        function CharMapStack(entity) {\n            this._stack = [];\n            this._length = 0;\n            this._entity = entity;\n        }\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.reset = function () {\n            this._length = 0;\n        };\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.push = function (charMapName) {\n            var charMap = this.getCharMap(charMapName);\n            this._stack[this._length++] = charMap;\n        };\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.remove = function (charMapName) {\n            var charMap = this.getCharMap(charMapName);\n            var index = this.findCharMap(charMap);\n            // shift all items down\n            if (index !== -1) {\n                for (var i = index; i < this._length - 2; i++) {\n                    this._stack[i] = this._stack[i + 1];\n                }\n                this._stack[--this._length] = null;\n            }\n        };\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.getFile = function (file) {\n            for (var i = this._length - 1; i >= 0; i--) {\n                var value = this._stack[i].value(file.name);\n                if (value !== undefined) {\n                    return value;\n                }\n            }\n            return file;\n        };\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.getCharMap = function (charMapName) {\n            var charMap = this._entity.getCharMapByName(charMapName);\n            if (charMapName === null) {\n                console.error(\"charmap with name \" + charMapName + \" does not exist\");\n            }\n            return charMap;\n        };\n        // -------------------------------------------------------------------------\n        CharMapStack.prototype.findCharMap = function (charMap) {\n            for (var i = 0; i < this._length; i++) {\n                if (this._stack[i] === charMap) {\n                    return i;\n                }\n            }\n            return -1;\n        };\n        return CharMapStack;\n    }());\n    Spriter.CharMapStack = CharMapStack;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Key = (function () {\n        // -------------------------------------------------------------------------\n        function Key(id, time) {\n            this._id = id;\n            this._time = time;\n        }\n        Object.defineProperty(Key.prototype, \"id\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._id;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Key.prototype, \"time\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._time;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Key;\n    }());\n    Spriter.Key = Key;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var KeyMainline = (function (_super) {\n        __extends(KeyMainline, _super);\n        function KeyMainline() {\n            _super.apply(this, arguments);\n            this._boneRefs = [];\n            this._objectRefs = [];\n        }\n        Object.defineProperty(KeyMainline.prototype, \"boneRefs\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._boneRefs;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        KeyMainline.prototype.addBoneRef = function (boneRef) {\n            this._boneRefs.push(boneRef);\n        };\n        Object.defineProperty(KeyMainline.prototype, \"objectRefs\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._objectRefs;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        KeyMainline.prototype.addObjectRef = function (objectRef) {\n            this._objectRefs.push(objectRef);\n        };\n        return KeyMainline;\n    }(Spriter.Key));\n    Spriter.KeyMainline = KeyMainline;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var KeyTag = (function (_super) {\n        __extends(KeyTag, _super);\n        function KeyTag() {\n            _super.apply(this, arguments);\n        }\n        Object.defineProperty(KeyTag.prototype, \"tagsOn\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._tagsOn;\n            },\n            // -------------------------------------------------------------------------\n            set: function (tagsOn) {\n                this._tagsOn = tagsOn;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return KeyTag;\n    }(Spriter.Key));\n    Spriter.KeyTag = KeyTag;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var KeyVariable = (function (_super) {\n        __extends(KeyVariable, _super);\n        // -------------------------------------------------------------------------\n        function KeyVariable(id, time, value) {\n            _super.call(this, id, time);\n            this._value = value;\n        }\n        Object.defineProperty(KeyVariable.prototype, \"value\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._value;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return KeyVariable;\n    }(Spriter.Key));\n    Spriter.KeyVariable = KeyVariable;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    (function (eTimelineType) {\n        eTimelineType[eTimelineType[\"UNKNOWN\"] = 0] = \"UNKNOWN\";\n        eTimelineType[eTimelineType[\"MAIN_LINE\"] = 1] = \"MAIN_LINE\";\n        eTimelineType[eTimelineType[\"TIME_LINE\"] = 2] = \"TIME_LINE\";\n        eTimelineType[eTimelineType[\"SOUND_LINE\"] = 3] = \"SOUND_LINE\";\n        eTimelineType[eTimelineType[\"EVENT_LINE\"] = 4] = \"EVENT_LINE\";\n        eTimelineType[eTimelineType[\"TAG_LINE\"] = 5] = \"TAG_LINE\";\n        eTimelineType[eTimelineType[\"VAR_LINE\"] = 6] = \"VAR_LINE\";\n    })(Spriter.eTimelineType || (Spriter.eTimelineType = {}));\n    var eTimelineType = Spriter.eTimelineType;\n    var Baseline = (function (_super) {\n        __extends(Baseline, _super);\n        // -------------------------------------------------------------------------\n        function Baseline(id, name) {\n            if (name === void 0) { name = null; }\n            _super.call(this, id, name);\n            this._type = eTimelineType.UNKNOWN;\n        }\n        Object.defineProperty(Baseline.prototype, \"type\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._type;\n            },\n            // -------------------------------------------------------------------------\n            set: function (type) {\n                this._type = type;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Baseline.prototype, \"keys\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._keys;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        Baseline.prototype.add = function (key) {\n            if (this._keys === null || this._keys === undefined) {\n                this._keys = [];\n            }\n            this._keys.push(key);\n        };\n        // -------------------------------------------------------------------------\n        Baseline.prototype.at = function (index, loop) {\n            if (loop === void 0) { loop = true; }\n            if (index < 0) {\n                return null;\n            }\n            var length = this._keys.length;\n            if (index >= length) {\n                if (loop) {\n                    index = index % length;\n                }\n                else {\n                    index = length - 1;\n                }\n            }\n            return this._keys[index];\n        };\n        return Baseline;\n    }(Spriter.Item));\n    Spriter.Baseline = Baseline;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    // -------------------------------------------------------------------------\n    function linear(a, b, t) {\n        return ((b - a) * t) + a;\n    }\n    Spriter.linear = linear;\n    // -------------------------------------------------------------------------\n    function quadratic(a, b, c, t) {\n        return linear(linear(a, b, t), linear(b, c, t), t);\n    }\n    Spriter.quadratic = quadratic;\n    // -------------------------------------------------------------------------\n    function cubic(a, b, c, d, t) {\n        return linear(quadratic(a, b, c, t), quadratic(b, c, d, t), t);\n    }\n    Spriter.cubic = cubic;\n    // -------------------------------------------------------------------------\n    function quartic(a, b, c, d, e, t) {\n        return linear(cubic(a, b, c, d, t), cubic(b, c, d, e, t), t);\n    }\n    Spriter.quartic = quartic;\n    // -------------------------------------------------------------------------\n    function quintic(a, b, c, d, e, f, t) {\n        return linear(quartic(a, b, c, d, e, t), quartic(b, c, d, e, f, t), t);\n    }\n    Spriter.quintic = quintic;\n    // -------------------------------------------------------------------------\n    // B(t) = (1 − t)^3 * P0 + 3(1 − t)^2 * t * P1 + 3(1 − t) *  t^2 * P2 + t^3 * P3  , 0 ≤ t ≤ 1.\n    function bezierCoord(p1, p2, t) {\n        // p0 = 0, p3 = 1\n        var p0 = 0;\n        var p3 = 1;\n        var u = 1 - t;\n        var t2 = t * t;\n        var u2 = u * u;\n        var u3 = u2 * u;\n        var t3 = t2 * t;\n        return 0 + 3 * u2 * t * p1 + 3 * u * t2 * p2 + t3 * p3;\n    }\n    // -------------------------------------------------------------------------\n    function bezier(p1x, p1y, p2x, p2y, t) {\n        var epsilon = 0.001;\n        var maxIterations = 10;\n        // binary search\n        //establish bounds\n        var lower = 0;\n        var upper = 1;\n        var percent = (upper + lower) / 2;\n        //initial x\n        var x = bezierCoord(p1x, p2x, percent);\n        //loop until returned x - t is less than epsilon\n        var iterations = 0;\n        while (Math.abs(t - x) > epsilon && iterations < maxIterations) {\n            if (t > x) {\n                lower = percent;\n            }\n            else {\n                upper = percent;\n            }\n            percent = (upper + lower) / 2;\n            x = bezierCoord(p1x, p2x, percent);\n            ++iterations;\n        }\n        //we're within tolerance of the desired x value. Return the y value.\n        return bezierCoord(p1y, p2y, percent);\n    }\n    Spriter.bezier = bezier;\n    // -------------------------------------------------------------------------\n    function angleLinear(angleA, angleB, spin, t) {\n        // no spin\n        if (spin === 0) {\n            return angleA;\n        }\n        // spin left\n        if (spin > 0) {\n            if (angleB > angleA) {\n                angleB -= 360;\n            }\n        }\n        else {\n            if (angleB < angleA) {\n                angleB += 360;\n            }\n        }\n        return this.linear(angleA, angleB, t);\n    }\n    Spriter.angleLinear = angleLinear;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var Variable = (function (_super) {\n        __extends(Variable, _super);\n        // -------------------------------------------------------------------------\n        function Variable(id, name, type, defaultValue) {\n            _super.call(this, id, name);\n            this._type = type;\n            this._default = defaultValue;\n            this.reset();\n        }\n        // -------------------------------------------------------------------------\n        Variable.prototype.clone = function () {\n            return new Variable(this.id, this.name, this.type, this._default);\n        };\n        // -------------------------------------------------------------------------\n        Variable.prototype.reset = function () {\n            this.value = this._default;\n        };\n        Object.defineProperty(Variable.prototype, \"type\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._type;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Variable.prototype, \"value\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._value;\n            },\n            // -------------------------------------------------------------------------\n            set: function (value) {\n                if (this._type === 0 /* INT */) {\n                    this._value = Math.floor(value);\n                }\n                else {\n                    this._value = value;\n                }\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Variable.prototype, \"int\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._value;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Variable.prototype, \"float\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._value;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Variable.prototype, \"string\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._value;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Variable;\n    }(Spriter.Item));\n    Spriter.Variable = Variable;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Varline = (function (_super) {\n        __extends(Varline, _super);\n        // -------------------------------------------------------------------------\n        function Varline(id, varDefId) {\n            _super.call(this, id, null);\n            this._varDefId = varDefId;\n            this.type = Spriter.eTimelineType.VAR_LINE;\n        }\n        Object.defineProperty(Varline.prototype, \"varDefId\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._varDefId;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Varline;\n    }(Spriter.Baseline));\n    Spriter.Varline = Varline;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"Item.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var ObjectInfo = (function (_super) {\n        __extends(ObjectInfo, _super);\n        // -------------------------------------------------------------------------\n        function ObjectInfo(id, name, type, width, height, pivotX, pivotY) {\n            _super.call(this, id, name);\n            this._type = type;\n            this._width = width;\n            this._height = height;\n            this._pivotX = pivotX;\n            this._pivotY = pivotY;\n        }\n        Object.defineProperty(ObjectInfo.prototype, \"type\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._type;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(ObjectInfo.prototype, \"width\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._width;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(ObjectInfo.prototype, \"height\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._height;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(ObjectInfo.prototype, \"pivotX\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._pivotX;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(ObjectInfo.prototype, \"pivotY\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._pivotY;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return ObjectInfo;\n    }(Spriter.Item));\n    Spriter.ObjectInfo = ObjectInfo;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Types = (function () {\n        function Types() {\n        }\n        // -------------------------------------------------------------------------\n        Types.getObjectTypeForName = function (typeName) {\n            var type = Types.nameToObjectType[typeName];\n            if (type === undefined) {\n                console.error(\"Unknown type of object: \" + typeName);\n            }\n            return type;\n        };\n        // -------------------------------------------------------------------------\n        Types.getCurveTypeForName = function (typeName) {\n            var type = Types.nameToCurveType[typeName];\n            if (type === undefined) {\n                console.error(\"Unknown type of curve: \" + typeName);\n            }\n            return type;\n        };\n        // -------------------------------------------------------------------------\n        Types.getVariableTypeForName = function (typeName) {\n            var type = Types.nameToVariableType[typeName];\n            if (type === undefined) {\n                console.error(\"Unknown type of variable: \" + typeName);\n            }\n            return type;\n        };\n        Types.nameToObjectType = {\n            \"sprite\": 0 /* SPRITE */,\n            \"bone\": 1 /* BONE */,\n            \"box\": 2 /* BOX */,\n            \"point\": 3 /* POINT */,\n            \"sound\": 4 /* SOUND */\n        };\n        Types.nameToCurveType = {\n            \"instant\": 1 /* INSTANT */,\n            \"linear\": 0 /* LINEAR */,\n            \"quadratic\": 2 /* QUADRATIC */,\n            \"cubic\": 3 /* CUBIC */,\n            \"quartic\": 4 /* QUARTIC */,\n            \"quintic\": 5 /* QUINTIC */,\n            \"bezier\": 6 /* BEZIER */\n        };\n        Types.nameToVariableType = {\n            \"int\": 0 /* INT */,\n            \"float\": 1 /* FLOAT */,\n            \"string\": 2 /* STRING */\n        };\n        return Types;\n    }());\n    Spriter.Types = Types;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Ref = (function () {\n        // -------------------------------------------------------------------------\n        function Ref(id, parent, timeline, key, z) {\n            if (z === void 0) { z = 0; }\n            this.id = id;\n            this.parent = parent;\n            this.timeline = timeline;\n            this.key = key;\n            this.z = z;\n        }\n        return Ref;\n    }());\n    Spriter.Ref = Ref;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Timeline = (function (_super) {\n        __extends(Timeline, _super);\n        // -------------------------------------------------------------------------\n        function Timeline(id, name, type, objectRef) {\n            if (type === void 0) { type = 0 /* SPRITE */; }\n            if (objectRef === void 0) { objectRef = -1; }\n            _super.call(this, id, name);\n            this.type = Spriter.eTimelineType.TIME_LINE;\n            this._objectType = type;\n            this._objectRef = objectRef;\n        }\n        Object.defineProperty(Timeline.prototype, \"objectType\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._objectType;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(Timeline.prototype, \"objectRef\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._objectRef;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Timeline;\n    }(Spriter.Baseline));\n    Spriter.Timeline = Timeline;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var KeyTimeline = (function (_super) {\n        __extends(KeyTimeline, _super);\n        // -------------------------------------------------------------------------\n        function KeyTimeline(id, time, spin) {\n            _super.call(this, id, time);\n            this._info = new Spriter.SpatialInfo();\n            this._spin = spin;\n            this.setCurve(0 /* LINEAR */);\n        }\n        // -------------------------------------------------------------------------\n        KeyTimeline.prototype.setCurve = function (curveType, c1, c2, c3, c4) {\n            if (c1 === void 0) { c1 = 0; }\n            if (c2 === void 0) { c2 = 0; }\n            if (c3 === void 0) { c3 = 0; }\n            if (c4 === void 0) { c4 = 0; }\n            this._curveType = curveType;\n            this._c1 = c1;\n            this._c2 = c2;\n            this._c3 = c3;\n            this._c4 = c4;\n        };\n        Object.defineProperty(KeyTimeline.prototype, \"spin\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._spin;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"curveType\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._curveType;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"c1\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._c1;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"c2\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._c2;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"c3\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._c3;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"c4\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._c4;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyTimeline.prototype, \"info\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._info;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return KeyTimeline;\n    }(Spriter.Key));\n    Spriter.KeyTimeline = KeyTimeline;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var SpatialInfo = (function () {\n        function SpatialInfo() {\n            this.x = 0;\n            this.y = 0;\n            this.scaleX = 1;\n            this.scaleY = 1;\n            this.pivotX = 0;\n            this.pivotY = 0;\n            this.alpha = 1;\n            this.angle = 0;\n        }\n        return SpatialInfo;\n    }());\n    Spriter.SpatialInfo = SpatialInfo;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"KeyTimeline.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var KeyObject = (function (_super) {\n        __extends(KeyObject, _super);\n        function KeyObject() {\n            _super.apply(this, arguments);\n        }\n        // -------------------------------------------------------------------------\n        KeyObject.prototype.setFolderAndFile = function (folder, file) {\n            this._folder = folder;\n            this._file = file;\n        };\n        Object.defineProperty(KeyObject.prototype, \"folder\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._folder;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(KeyObject.prototype, \"file\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._file;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return KeyObject;\n    }(Spriter.KeyTimeline));\n    Spriter.KeyObject = KeyObject;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"KeyTimeline.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var KeyBone = (function (_super) {\n        __extends(KeyBone, _super);\n        function KeyBone() {\n            _super.apply(this, arguments);\n        }\n        return KeyBone;\n    }(Spriter.KeyTimeline));\n    Spriter.KeyBone = KeyBone;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var Loader = (function () {\n        function Loader() {\n        }\n        // -------------------------------------------------------------------------\n        Loader.prototype.load = function (file) {\n            this._spriter = new Spriter.Spriter();\n            this._fileType = file.getType();\n            // folders and files\n            var folders = file.getNodes(\"folder\");\n            this.loadFolders(this._spriter, folders);\n            folders.processed();\n            // tags\n            var tags = file.getNodes(\"tag_list\");\n            this.loadTags(this._spriter, tags);\n            tags.processed();\n            // entity\n            var entities = file.getNodes(\"entity\");\n            this.loadEntities(this._spriter, entities);\n            entities.processed();\n            return this._spriter;\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadFolders = function (spriter, folders) {\n            // through all folders\n            for (var i = 0; i < folders.length(); i++) {\n                var folder = folders.getFolder(i);\n                // images in folder - ignore sounds\n                var files = folders.getChildNodes(i, \"file\");\n                this.loadFiles(folder, files);\n                files.processed();\n                // add folder to spriter object\n                spriter.addFolder(folder);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadFiles = function (folder, files) {\n            for (var f = 0; f < files.length(); f++) {\n                var file = files.getFile(f);\n                // null is returned if file is not image but sound\n                if (file !== null) {\n                    folder.addFile(file);\n                }\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadTags = function (spriter, tags) {\n            // no tags\n            if (tags.length() === 0) {\n                return;\n            }\n            // different structure for json than for xml\n            var tagDefs;\n            if (this._fileType !== Spriter.eFileType.JSON) {\n                tagDefs = tags.getChildNodes(0, \"i\");\n            }\n            else {\n                tagDefs = tags;\n            }\n            for (var i = 0; i < tagDefs.length(); i++) {\n                var tag = tagDefs.getTag(i);\n                spriter.addTag(tag);\n            }\n            // different structure for json than for xml\n            if (this._fileType !== Spriter.eFileType.JSON) {\n                tagDefs.processed();\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadEntities = function (spriter, entities) {\n            for (var i = 0; i < entities.length(); i++) {\n                var entity = entities.getEntity(i);\n                // bones, boxes, ...\n                var objInfos = entities.getChildNodes(i, \"obj_info\");\n                this.loadObjInfo(entity, objInfos);\n                objInfos.processed();\n                // character maps\n                var charMaps = entities.getChildNodes(i, \"character_map\");\n                this.loadCharMaps(entity, charMaps);\n                charMaps.processed();\n                // variable definitions\n                var variables = entities.getChildNodes(i, \"var_defs\");\n                this.loadVariables(entity, variables);\n                variables.processed();\n                // animations\n                var animations = entities.getChildNodes(i, \"animation\");\n                this.loadAnimations(entity, animations);\n                animations.processed();\n                spriter.addEntity(entity);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadObjInfo = function (entity, objInfos) {\n            for (var i = 0; i < objInfos.length(); i++) {\n                var objInfo = objInfos.getObjectInfo(i);\n                entity.addObjectInfo(objInfo);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadCharMaps = function (entity, charMaps) {\n            for (var i = 0; i < charMaps.length(); i++) {\n                var charMap = charMaps.getCharMap(i);\n                var charMapEntries = charMaps.getChildNodes(i, \"map\");\n                this.loadCharMapEntries(charMap, charMapEntries);\n                charMapEntries.processed();\n                entity.addCharMap(charMap);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadCharMapEntries = function (charMap, charMapEntries) {\n            for (var i = 0; i < charMapEntries.length(); i++) {\n                charMapEntries.getCharMapEntry(i, charMap, this._spriter);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadVariables = function (entity, variables) {\n            // no variables\n            if (variables.length() === 0) {\n                return;\n            }\n            // different structure for json than for xml\n            var varDefs;\n            if (this._fileType !== Spriter.eFileType.JSON) {\n                varDefs = variables.getChildNodes(0, \"i\");\n            }\n            else {\n                varDefs = variables;\n            }\n            for (var i = 0; i < varDefs.length(); i++) {\n                var varDef = varDefs.getVariable(i);\n                entity.addVariable(varDef);\n            }\n            // different structure for json than for xml\n            if (this._fileType !== Spriter.eFileType.JSON) {\n                varDefs.processed();\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadAnimations = function (entity, animations) {\n            for (var i = 0; i < animations.length(); i++) {\n                var animation = animations.getAnimation(i);\n                // main line keys\n                var mainlines = animations.getChildNodes(i, \"mainline\");\n                this.loadMainline(animation, mainlines);\n                mainlines.processed();\n                // timelines\n                var timelines = animations.getChildNodes(i, \"timeline\");\n                this.loadTimelines(animation, timelines);\n                timelines.processed();\n                // sound lines\n                var soundlines = animations.getChildNodes(i, \"soundline\");\n                this.loadSoundlines(animation, soundlines);\n                soundlines.processed();\n                // event lines\n                var eventlines = animations.getChildNodes(i, \"eventline\");\n                this.loadEventlines(animation, eventlines);\n                eventlines.processed();\n                // get meta tag\n                var meta = animations.getChildNodes(i, \"meta\");\n                if (meta.length() > 0) {\n                    // var lines\n                    // OMG - typo in attribute name in JSOUN export... what the hell! TODO - remove when corrected\n                    var varlines = meta.getChildNodes(0, (this._fileType !== Spriter.eFileType.JSON) ? \"varline\" : \"valline\");\n                    this.loadVarlines(entity, animation, varlines);\n                    varlines.processed();\n                    // tag lines\n                    var taglines = meta.getChildNodes(0, \"tagline\");\n                    this.loadTaglines(animation, taglines);\n                    taglines.processed();\n                }\n                meta.processed();\n                // add completely built animation to entity\n                entity.addAnimation(animation);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadMainline = function (animation, mainlines) {\n            var mainline = mainlines.getMainline(0);\n            mainline.type = Spriter.eTimelineType.MAIN_LINE;\n            var mainlineKeys = mainlines.getChildNodes(0, \"key\");\n            this.loadMainlineKeys(mainline, mainlineKeys);\n            mainlineKeys.processed();\n            animation.mainline = mainline;\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadMainlineKeys = function (mainline, mainlineKeys) {\n            for (var i = 0; i < mainlineKeys.length(); i++) {\n                var mainLineKey = mainlineKeys.getMainlineKey(i);\n                // load bone refs\n                var boneRefs = mainlineKeys.getChildNodes(i, \"bone_ref\");\n                for (var b = 0; b < boneRefs.length(); b++) {\n                    mainLineKey.addBoneRef(boneRefs.getRef(b));\n                }\n                boneRefs.processed();\n                // load sprite refs (object refs)\n                var spriteRefs = mainlineKeys.getChildNodes(i, \"object_ref\");\n                for (var s = 0; s < spriteRefs.length(); s++) {\n                    mainLineKey.addObjectRef(spriteRefs.getRef(s));\n                }\n                spriteRefs.processed();\n                mainline.add(mainLineKey);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadTimelines = function (animation, aTimelines) {\n            for (var i = 0; i < aTimelines.length(); i++) {\n                var timeline = aTimelines.getTimeline(i);\n                var keys = aTimelines.getChildNodes(i, \"key\");\n                this.loadTimelineKeys(timeline, keys);\n                keys.processed();\n                animation.addTimeline(timeline);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadTimelineKeys = function (aTimeline, aKeys) {\n            for (var i = 0; i < aKeys.length(); i++) {\n                var key = aKeys.getTimelineKey(i, this._spriter);\n                aTimeline.add(key);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadSoundlines = function (animation, soundlines) {\n            for (var i = 0; i < soundlines.length(); i++) {\n                var soundline = soundlines.getSoundline(i);\n                soundline.type = Spriter.eTimelineType.SOUND_LINE;\n                var keys = soundlines.getChildNodes(i, \"key\");\n                this.loadKeys(soundline, keys);\n                keys.processed();\n                animation.addLine(soundline);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadKeys = function (timeline, keys) {\n            for (var i = 0; i < keys.length(); i++) {\n                var key = keys.getKey(i);\n                timeline.add(key);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadEventlines = function (animation, eventlines) {\n            for (var i = 0; i < eventlines.length(); i++) {\n                var eventline = eventlines.getEventline(i);\n                eventline.type = Spriter.eTimelineType.EVENT_LINE;\n                var keys = eventlines.getChildNodes(i, \"key\");\n                this.loadKeys(eventline, keys);\n                keys.processed();\n                animation.addLine(eventline);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadTaglines = function (animation, taglines) {\n            for (var i = 0; i < taglines.length(); i++) {\n                var tagline = taglines.getTagline(i);\n                tagline.type = Spriter.eTimelineType.TAG_LINE;\n                var keys = taglines.getChildNodes(i, \"key\");\n                this.loadTagKeys(tagline, keys);\n                keys.processed();\n                animation.addLine(tagline);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadTagKeys = function (tagline, keys) {\n            for (var i = 0; i < keys.length(); i++) {\n                var key = keys.getTagKey(i);\n                var tagChangeElements = keys.getChildNodes(i, \"tag\");\n                var tagChanges = tagChangeElements.getTagChanges(this._spriter);\n                tagChangeElements.processed();\n                key.tagsOn = tagChanges;\n                tagline.add(key);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadVarlines = function (entity, animation, varlines) {\n            for (var i = 0; i < varlines.length(); i++) {\n                var varline = varlines.getVarline(i);\n                var type = entity.getVariableById(varline.varDefId).type;\n                var keys = varlines.getChildNodes(i, \"key\");\n                this.loadVariableKeys(varline, keys, type);\n                keys.processed();\n                animation.addLine(varline);\n            }\n        };\n        // -------------------------------------------------------------------------\n        Loader.prototype.loadVariableKeys = function (varline, keys, type) {\n            for (var i = 0; i < keys.length(); i++) {\n                var key = keys.getVariableKey(i, type);\n                varline.add(key);\n            }\n        };\n        return Loader;\n    }());\n    Spriter.Loader = Loader;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter_1) {\n    var Spriter = (function () {\n        // -------------------------------------------------------------------------\n        function Spriter() {\n            this._folders = new Spriter_1.IdNameMap();\n            this._tags = new Spriter_1.IdNameMap();\n            this._entities = new Spriter_1.IdNameMap();\n        }\n        // -------------------------------------------------------------------------\n        Spriter.prototype.addFolder = function (folder) {\n            this._folders.add(folder, folder.id, folder.name);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getFolderById = function (id) {\n            return this._folders.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getFolderByName = function (name) {\n            return this._folders.getByName(name);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.addEntity = function (entity) {\n            this._entities.add(entity, entity.id, entity.name);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getEntityById = function (id) {\n            return this._entities.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getEntityByName = function (name) {\n            return this._entities.getByName(name);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.addTag = function (tag) {\n            this._tags.add(tag, tag.id, tag.name);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getTagById = function (id) {\n            return this._tags.getById(id);\n        };\n        // -------------------------------------------------------------------------\n        Spriter.prototype.getTagByName = function (name) {\n            return this._tags.getByName(name);\n        };\n        Object.defineProperty(Spriter.prototype, \"tagsLength\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._tags.length;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        return Spriter;\n    }());\n    Spriter_1.Spriter = Spriter;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var SpriterBone = (function () {\n        // -------------------------------------------------------------------------\n        function SpriterBone() {\n            this.timeline = -1;\n            this.timelineKey = -1;\n            this.transformed = new Spriter.SpatialInfo();\n        }\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.setOn = function (on) {\n            this._on = on;\n        };\n        Object.defineProperty(SpriterBone.prototype, \"on\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._on;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.setKey = function (entity, animation, timelineId, keyId) {\n            this.timeline = timelineId;\n            this.timelineKey = keyId;\n            var timeline = animation.getTimelineById(timelineId);\n            this.name = timeline.name;\n            this.objectInfo = (timeline.objectRef === -1) ? null : entity.getObjectInfoById(timeline.objectRef);\n            var keyFrom = timeline.at(keyId);\n            // in the end loop to first key. If animation is not looping, then repeat last key\n            var keyTo = (timeline.at(keyId + 1, animation.loopType !== Spriter.eAnimationLooping.NO_LOOPING));\n            this.key = keyFrom;\n            this.timeFrom = keyFrom.time;\n            this.timeTo = keyTo.time;\n            // if loop to key 0\n            if (this.timeTo < this.timeFrom) {\n                this.timeTo = animation.length;\n            }\n            this.from = keyFrom.info;\n            this.to = keyTo.info;\n            // create update mask\n            this.updateMask = 0;\n            if (Math.abs(this.from.x - this.to.x) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_X;\n            }\n            if (Math.abs(this.from.y - this.to.y) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_Y;\n            }\n            if (Math.abs(this.from.scaleX - this.to.scaleX) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_SCALE_X;\n            }\n            if (Math.abs(this.from.scaleY - this.to.scaleY) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_SCALE_Y;\n            }\n            if (Math.abs(this.from.pivotX - this.to.pivotX) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_PIVOT_X;\n            }\n            if (Math.abs(this.from.pivotY - this.to.pivotY) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_PIVOT_Y;\n            }\n            if (Math.abs(this.from.alpha - this.to.alpha) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_ALPHA;\n            }\n            if (Math.abs(this.from.angle - this.to.angle) > 0.001) {\n                this.updateMask += SpriterBone.UPDATE_ANGLE;\n            }\n            // init data\n            this.transformed.x = this.from.x;\n            this.transformed.y = this.from.y;\n            this.transformed.scaleX = this.from.scaleX;\n            this.transformed.scaleY = this.from.scaleY;\n            this.transformed.pivotX = this.from.pivotX;\n            this.transformed.pivotY = this.from.pivotY;\n            this.transformed.angle = this.from.angle;\n            this.transformed.alpha = this.from.alpha;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.tween = function (time) {\n            // calculate normalized time\n            //var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);\n            var t = (this.updateMask > 0) ? this.getTweenTime(time) : 0;\n            this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ?\n                Spriter.linear(this.from.x, this.to.x, t) : this.from.x;\n            this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?\n                Spriter.linear(this.from.y, this.to.y, t) : this.from.y;\n            this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?\n                Spriter.linear(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;\n            this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?\n                Spriter.linear(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;\n            this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?\n                Spriter.linear(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;\n            this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?\n                Spriter.linear(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;\n            this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?\n                Spriter.linear(this.from.alpha, this.to.alpha, t) : this.from.alpha;\n            this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?\n                Spriter.angleLinear(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.update = function (parent) {\n            this.transformed.angle *= Phaser.Math.sign(parent.scaleX) * Phaser.Math.sign(parent.scaleY);\n            this.transformed.angle += parent.angle;\n            this.transformed.scaleX *= parent.scaleX;\n            this.transformed.scaleY *= parent.scaleY;\n            this.scalePosition(parent.scaleX, parent.scaleY);\n            this.rotatePosition(parent.angle);\n            this.translatePosition(parent.x, parent.y);\n            this.transformed.alpha *= parent.alpha;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.scalePosition = function (parentScaleX, parentScaleY) {\n            this.transformed.x *= parentScaleX;\n            this.transformed.y *= parentScaleY;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.rotatePosition = function (parentAngle) {\n            var x = this.transformed.x;\n            var y = this.transformed.y;\n            if (x !== 0 || y !== 0) {\n                var rads = parentAngle * (Math.PI / 180);\n                var cos = Math.cos(rads);\n                var sin = Math.sin(rads);\n                this.transformed.x = x * cos - y * sin;\n                this.transformed.y = x * sin + y * cos;\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.translatePosition = function (parentX, parentY) {\n            this.transformed.x += parentX;\n            this.transformed.y += parentY;\n        };\n        // -------------------------------------------------------------------------\n        SpriterBone.prototype.getTweenTime = function (time) {\n            if (this.key.curveType === 1 /* INSTANT */) {\n                return 0;\n            }\n            var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);\n            switch (this.key.curveType) {\n                case 0 /* LINEAR */:\n                    return t;\n                case 2 /* QUADRATIC */:\n                    return Spriter.quadratic(0, this.key.c1, 1, t);\n                case 3 /* CUBIC */:\n                    return Spriter.cubic(0, this.key.c1, this.key.c2, 1, t);\n                case 4 /* QUARTIC */:\n                    return Spriter.quartic(0, this.key.c1, this.key.c2, this.key.c3, 1, t);\n                case 5 /* QUINTIC */:\n                    return Spriter.quintic(0, this.key.c1, this.key.c2, this.key.c3, this.key.c4, 1, t);\n                case 6 /* BEZIER */:\n                    return Spriter.bezier(this.key.c1, this.key.c2, this.key.c3, this.key.c4, t);\n            }\n            return 0;\n        };\n        SpriterBone.UPDATE_X = 1;\n        SpriterBone.UPDATE_Y = 2;\n        SpriterBone.UPDATE_SCALE_X = 4;\n        SpriterBone.UPDATE_SCALE_Y = 8;\n        SpriterBone.UPDATE_PIVOT_X = 16;\n        SpriterBone.UPDATE_PIVOT_Y = 32;\n        SpriterBone.UPDATE_ANGLE = 64;\n        SpriterBone.UPDATE_ALPHA = 128;\n        return SpriterBone;\n    }());\n    Spriter.SpriterBone = SpriterBone;\n})(Spriter || (Spriter = {}));\nvar Spriter;\n(function (Spriter) {\n    var SpriterGroup = (function (_super) {\n        __extends(SpriterGroup, _super);\n        // -------------------------------------------------------------------------\n        function SpriterGroup(game, spriter, texutreKey, entityName, animation, animationSpeedPercent) {\n            _super.call(this, game, null);\n            // onLoop(SpriterGroup);\n            this.onLoop = new Phaser.Signal();\n            // onFinish(SpriterGroup);\n            this.onFinish = new Phaser.Signal();\n            // onSound(SpriterGroup, string); // string for line name which equals soud name without extension\n            this.onSound = new Phaser.Signal();\n            // onEvent(SpriterGroup, string); // string for line name which equals event name\n            this.onEvent = new Phaser.Signal();\n            // onTagChange(SpriterGroup, string, boolean); // string for tag name, boolean for change (true = set / false = unset)\n            this.onTagChange = new Phaser.Signal();\n            // onVariableSet(SpriterGroup, Variable); // Variable is Spriter variable def with access to value\n            this.onVariableSet = new Phaser.Signal();\n            // onBoxUpdated(SpriterGroup, SpriterObject);\n            this.onBoxUpdated = new Phaser.Signal();\n            // onPointUpdated(SpriterGroup, SpriterObject);\n            this.onPointUpdated = new Phaser.Signal();\n            this._mainlineStepper = new Spriter.LineStepper();\n            this._lineSteppers = [];\n            this._lineSteppersCount = 0;\n            this._bones = [];\n            this._objects = [];\n            this._tags = 0; // up to 32 tags - 1 per bit\n            this._vars = [];\n            this._paused = false;\n            this._spriter = spriter;\n            this._entityName = entityName;\n            this._entity = spriter.getEntityByName(entityName);\n            this._textureKey = texutreKey;\n            this._root = new Spriter.SpatialInfo();\n            // clone variables\n            for (var i = 0; i < this._entity.variablesLength; i++) {\n                this._vars[i] = this._entity.getVariableById(i).clone();\n            }\n            // create charmap stack\n            this._charMapStack = new Spriter.CharMapStack(this._entity);\n            // set animation speed\n            if (animationSpeedPercent === undefined) {\n                animationSpeedPercent = 100;\n            }\n            this.setAnimationSpeedPercent(animationSpeedPercent);\n            // set animation\n            if (animation === undefined || animation === null) {\n                // set first animation\n                this.playAnimationById(0);\n            }\n            else if (typeof animation === \"number\") {\n                this.playAnimationById(animation);\n            }\n            else {\n                this.playAnimationByName(animation);\n            }\n        }\n        Object.defineProperty(SpriterGroup.prototype, \"spriter\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._spriter;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(SpriterGroup.prototype, \"entity\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._entity;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(SpriterGroup.prototype, \"charMapStack\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._charMapStack;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(SpriterGroup.prototype, \"paused\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._paused;\n            },\n            // -------------------------------------------------------------------------\n            set: function (paused) {\n                this._paused = paused;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(SpriterGroup.prototype, \"animationsCount\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._entity.animationsLength;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        Object.defineProperty(SpriterGroup.prototype, \"currentAnimationName\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._animationName;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.pushCharMap = function (charMapName) {\n            this._charMapStack.push(charMapName);\n            this.resetSprites();\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.removeCharMap = function (charMapName) {\n            this._charMapStack.remove(charMapName);\n            this.resetSprites();\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.clearCharMaps = function () {\n            this._charMapStack.reset();\n            this.resetSprites();\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.resetSprites = function () {\n            for (var i = 0; i < this._objects.length; i++) {\n                this._objects[i].resetFile();\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.isTagOn = function (tagName) {\n            return this.isTagOnById(this._spriter.getTagByName(tagName).id);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.isTagOnById = function (tagId) {\n            return (this._tags & (1 << tagId)) > 0;\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.getVariable = function (varName) {\n            return this.getVariableById(this._entity.getVariableByName(varName).id);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.getVariableById = function (varId) {\n            return this._vars[varId];\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.getObject = function (objectName) {\n            for (var i = 0; i < this._objects.length; i++) {\n                var object = this._objects[i];\n                if (object.name === objectName) {\n                    return object;\n                }\n            }\n            return null;\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.setAnimationSpeedPercent = function (animationSpeedPercent) {\n            if (animationSpeedPercent === void 0) { animationSpeedPercent = 100; }\n            this._animationSpeed = animationSpeedPercent / 100;\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.playAnimationById = function (animationId) {\n            var animation = this._entity.getAnimationById(animationId);\n            if (animation === undefined || animation === null) {\n                console.warn(\"Animation \" + animationId + \" for entity \" + this._entityName + \" does not exist!\");\n                return;\n            }\n            this.playAnimation(animation);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.playAnimationByName = function (animationName) {\n            var animation = this._entity.getAnimationByName(animationName);\n            if (animation === undefined || animation === null) {\n                console.warn(\"Animation \" + animationName + \" for entity \" + this._entityName + \" does not exist!\");\n                return;\n            }\n            this.playAnimation(animation);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.playAnimation = function (animation) {\n            this._animationName = animation.name;\n            this._animation = animation;\n            this._finished = false;\n            // reset time to beginning of animation and find first from and to keys\n            this._mainlineStepper.reset();\n            this._mainlineStepper.line = this._animation.mainline;\n            this._time = 0;\n            // reset all additional time lines (soundline, varline, tagline, eventline)\n            this.resetLines();\n            // reset tags\n            this._tags = 0;\n            // reset variables to defaults\n            for (var i = 0; i < this._vars.length; i++) {\n                this._vars[i].reset();\n            }\n            // create bones and sprites - based on data in mainLine key 0\n            this.loadKeys(this._animation.mainline.at(0), true);\n            // first update - to set correct positions\n            this.updateCharacter();\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.resetLines = function () {\n            // reset steppers\n            this._lineSteppersCount = 0;\n            // go through all lines (sounds, events, tags, vars)\n            for (var i = 0; i < this._animation.linesLength; i++) {\n                var line = this._animation.getLineById(i);\n                // if not enough line steppers in array, add new one\n                if (this._lineSteppersCount >= this._lineSteppers.length) {\n                    this._lineSteppers[this._lineSteppersCount] = new Spriter.LineStepper();\n                }\n                // get free stepper\n                var stepper = this._lineSteppers[this._lineSteppersCount++];\n                stepper.reset();\n                stepper.line = line;\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.setBones = function (bones, force) {\n            if (force === void 0) { force = false; }\n            // switch off all existing bones\n            for (var i = 0; i < this._bones.length; i++) {\n                if (this._bones[i] !== undefined) {\n                    this._bones[i].setOn(false);\n                }\n            }\n            // go through all bones and add new ones if necessary and activate used ones\n            for (var i = 0; i < bones.length; i++) {\n                var ref = bones[i];\n                // if bone does not exist add it and make active, else make it active only\n                if (this._bones[ref.id] === undefined) {\n                    var newBone = new Spriter.SpriterBone();\n                    newBone.type = 1 /* BONE */;\n                    this._bones[ref.id] = newBone;\n                }\n                var bone = this._bones[ref.id];\n                bone.setOn(true);\n                bone.parent = ref.parent;\n                if (bone.timelineKey !== ref.key || bone.timeline !== ref.timeline || force) {\n                    bone.setKey(this._entity, this._animation, ref.timeline, ref.key);\n                }\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.setObjects = function (objects, force) {\n            if (force === void 0) { force = false; }\n            // switch off (kill) all existing sprites\n            for (var i = 0; i < this._objects.length; i++) {\n                if (this._objects[i] !== undefined) {\n                    this._objects[i].setOn(false);\n                }\n            }\n            // go through all objects/sprites and add new ones if necessary and activate used ones\n            var zChange = false;\n            for (var i = 0; i < objects.length; i++) {\n                var ref = objects[i];\n                var object = null;\n                var sprite = null;\n                // if sprite does not exist add it and make active, else make it active only\n                if (this._objects[ref.id] === undefined) {\n                    sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);\n                    object = new Spriter.SpriterObject(this, sprite);\n                    this._objects[ref.id] = object;\n                    this.add(sprite);\n                }\n                else {\n                    object = this._objects[ref.id];\n                    sprite = object.sprite;\n                }\n                object.parent = ref.parent;\n                object.type = this._animation.getTimelineById(ref.timeline).objectType;\n                // is it sprite or any other type of object? (box / point)\n                if (object.type === 0 /* SPRITE */) {\n                    object.setOn(true);\n                    if (object.sprite.z !== ref.z) {\n                        object.sprite.z = ref.z;\n                        zChange = true;\n                    }\n                }\n                else {\n                    object.setOn(true, true);\n                }\n                if (object.timelineKey !== ref.key || object.timeline !== ref.timeline || force) {\n                    object.setKey(this._entity, this._animation, ref.timeline, ref.key);\n                }\n            }\n            // need to sort sprites?\n            if (zChange) {\n                this.sort();\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.loadKeys = function (keyMainline, force) {\n            if (force === void 0) { force = false; }\n            this.setBones(keyMainline.boneRefs, force);\n            this.setObjects(keyMainline.objectRefs, force);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.updateAnimation = function () {\n            if (this._paused || this._finished) {\n                return;\n            }\n            var mainlineStepper = this._mainlineStepper;\n            // check if in the end of animation and whether to loop or not\n            if (this._time > this._animation.length) {\n                if (this._animation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {\n                    this._time = this._animation.length;\n                    this._finished = true;\n                }\n                else {\n                    this._time -= this._animation.length;\n                    this.onLoop.dispatch(this);\n                }\n            }\n            // consume all new keys\n            var key;\n            while ((key = mainlineStepper.step(this._time)) !== null) {\n                //console.log(\"got key at: \" + key.time + \" time: \" + this._time);\n                this.loadKeys(key);\n                mainlineStepper.lastTime = key.time;\n            }\n            this.updateCharacter();\n            this.updateLines();\n            if (this._finished) {\n                this.onFinish.dispatch(this);\n            }\n            this._time += (this.game.time.physicsElapsedMS * this._animationSpeed);\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.updateCharacter = function () {\n            for (var i = 0; i < this._bones.length; i++) {\n                var bone = this._bones[i];\n                if (bone.on) {\n                    var parentSpatial = (bone.parent === -1) ? this._root : this._bones[bone.parent].transformed;\n                    bone.tween(this._time);\n                    bone.update(parentSpatial);\n                }\n            }\n            for (var i = 0; i < this._objects.length; i++) {\n                var object = this._objects[i];\n                if (object.on) {\n                    var parentSpatial = (object.parent === -1) ? this._root : this._bones[object.parent].transformed;\n                    object.tween(this._time);\n                    object.update(parentSpatial);\n                    if (object.type === 0 /* SPRITE */) {\n                        object.updateSprite();\n                    }\n                    else if (object.type === 2 /* BOX */) {\n                        this.onBoxUpdated.dispatch(this, object);\n                    }\n                    else if (object.type === 3 /* POINT */) {\n                        this.onPointUpdated.dispatch(this, object);\n                    }\n                }\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterGroup.prototype.updateLines = function () {\n            for (var i = this._lineSteppersCount - 1; i >= 0; i--) {\n                var lineStepper = this._lineSteppers[i];\n                var line = lineStepper.line;\n                var key;\n                while ((key = lineStepper.step(this._time)) !== null) {\n                    switch (line.type) {\n                        case Spriter.eTimelineType.SOUND_LINE:\n                            //console.log(\"sound: \" + line.name + \" - key: \" + key.id + \", time: \" + key.time);\n                            this.onSound.dispatch(this, line.name);\n                            break;\n                        case Spriter.eTimelineType.EVENT_LINE:\n                            //console.log(\"event: \" + line.name + \" - key: \" + key.id + \", time: \" + key.time);\n                            this.onEvent.dispatch(this, line.name);\n                            break;\n                        case Spriter.eTimelineType.TAG_LINE:\n                            var tagsOn = key.tagsOn;\n                            var tagChanges = this._tags ^ tagsOn;\n                            this._tags = tagsOn;\n                            // go through all changes\n                            for (var j = 0; j < this._spriter.tagsLength; j++) {\n                                var mask = 1 << j;\n                                if (tagChanges & mask) {\n                                    //console.log(\"tag change: \" + this._spriter.getTagById(j).name + \" value: \" + ((tagsOn & mask) > 0) + \" - key: \" + key.id + \", time: \" + key.time);\n                                    this.onTagChange.dispatch(this, this._spriter.getTagById(j).name, (tagsOn & mask) > 0);\n                                }\n                            }\n                            break;\n                        case Spriter.eTimelineType.VAR_LINE:\n                            var newVal = key.value;\n                            var variable = this._vars[line.varDefId];\n                            variable.value = newVal;\n                            //console.log(\"var set: \" + variable.name + \" value: \" + variable.value + \" - key: \" + key.id + \", time: \" + key.time);\n                            this.onVariableSet.dispatch(this, variable);\n                            break;\n                    }\n                    lineStepper.lastTime = key.time;\n                }\n            }\n        };\n        return SpriterGroup;\n    }(Phaser.Group));\n    Spriter.SpriterGroup = SpriterGroup;\n})(Spriter || (Spriter = {}));\n/// <reference path=\"SpriterBone.ts\" />\nvar Spriter;\n(function (Spriter) {\n    var SpriterObject = (function (_super) {\n        __extends(SpriterObject, _super);\n        // -------------------------------------------------------------------------\n        function SpriterObject(parent, sprite) {\n            _super.call(this);\n            this._spriter = parent.spriter;\n            this._charMapStack = parent.charMapStack;\n            this._sprite = sprite;\n        }\n        Object.defineProperty(SpriterObject.prototype, \"sprite\", {\n            // -------------------------------------------------------------------------\n            get: function () {\n                return this._sprite;\n            },\n            enumerable: true,\n            configurable: true\n        });\n        // -------------------------------------------------------------------------\n        SpriterObject.prototype.setOn = function (on, hideSprite) {\n            if (hideSprite === void 0) { hideSprite = false; }\n            _super.prototype.setOn.call(this, on);\n            // hide sprite for non-sprite objects\n            this._sprite.exists = on && !hideSprite;\n            this._sprite.visible = (on && !this._hide && !hideSprite);\n        };\n        // -------------------------------------------------------------------------\n        SpriterObject.prototype.setKey = function (entity, animation, timelineId, keyId) {\n            _super.prototype.setKey.call(this, entity, animation, timelineId, keyId);\n            // set sprite - skip invisible objects - boxes, points\n            if (this.type === 0 /* SPRITE */) {\n                var spriteKey = this.key;\n                var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);\n                this._file = file;\n                this.setFile(file);\n            }\n            else {\n                this._file = null;\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterObject.prototype.resetFile = function () {\n            if (this.type === 0 /* SPRITE */) {\n                this.setFile(this._file);\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterObject.prototype.setFile = function (file) {\n            file = this._charMapStack.getFile(file);\n            if (file !== null) {\n                this._hide = false;\n                this._sprite.frameName = file.name;\n            }\n            else {\n                this._hide = true;\n                this._sprite.visible = false;\n            }\n        };\n        // -------------------------------------------------------------------------\n        SpriterObject.prototype.updateSprite = function () {\n            var t = this.transformed;\n            var s = this.sprite;\n            s.position.set(t.x, t.y);\n            s.scale.set(t.scaleX, t.scaleY);\n            s.anchor.set(t.pivotX, t.pivotY);\n            s.alpha = t.alpha;\n            s.angle = t.angle;\n        };\n        return SpriterObject;\n    }(Spriter.SpriterBone));\n    Spriter.SpriterObject = SpriterObject;\n})(Spriter || (Spriter = {}));\n//# sourceMappingURL=spriter.js.map"

/***/ }),
/* 350 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 94);

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
/* 351 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _Hud = __webpack_require__(/*! ../../sprites/Hud */ 132);

var _Hud2 = _interopRequireDefault(_Hud);

var _PlayerActor = __webpack_require__(/*! ../../engine/PlayerActor */ 93);

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
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "shutdown",
    value: function shutdown() {
      document.getElementById("chat-container").style.display = "none";
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      this.camera.flash('#000000');
      document.getElementById("chat-container").style.display = "block";

      this.background = this.game.add.sprite(0, 0, "lobby-bg");
      this.scaleX = this.game.width / this.background.width;
      this.scaleY = this.game.height / this.background.height;
      this.hud = this.game.add.group();

      // create Spriter loader - class that can change Spriter file into internal structure
      var spriterLoader = new Spriter.Loader();
      var spriterData = 0,
          charmapID = 0,
          animation = 0;
      var charMaps = ["Green", "Brush"];

      this.hud.add(this.background);
      this.hud.add(new _Hud2.default(game));

      // Scale background
      this.hud.scale.setTo(this.scaleX, this.scaleY);

      var spriterFile = new Spriter.SpriterXml(this.cache.getXML("playerXml"),
      /* optional parameters */{
        imageNameType: Spriter.eImageNameType.NAME_ONLY
      });

      spriterData = spriterLoader.load(spriterFile);

      // create actual renderable object - it is extension of Phaser.Group
      this.player = new _PlayerActor2.default(this.game, {
        spriterData: spriterData,
        textureKey: "playerAtlas",
        entity: "entity_000",
        animation: 0,
        animationSpeed: 100,
        isMediumSize: true
      });

      this.player.position.setTo(420, 400);

      // adds SpriterGroup to Phaser.World to appear on screen
      this.world.add(this.player);

      // Spriter animation can send info on when sounds, events, tags, variable - here we are listening to Phaser.Signals when animation variable is set
      this.player.onVariableSet.add(function (spriter, variable) {
        _this2._text = variable.string;
      }, this);

      // // cycle animations
      // var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      // key.onDown.add(()=> {
      //   animation = (animation + 1) % this._spriterGroup.animationsCount;
      //   this._spriterGroup.playAnimationById(animation);
      // }, this);

      // // on C key cycle through all charmaps
      // key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
      // key.onDown.add(()=> {
      //   if (charmapID >= this._spriterGroup.entity.charMapsLength) {
      //     this._spriterGroup.clearCharMaps();
      //     charmapID = 0;
      //   } else {
      //     this._spriterGroup.pushCharMap(charMaps[charmapID]);
      //     ++charmapID;
      //   }
      // }, this);

      // // on I key show / hide item attached to point
      // key = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
      // key.onDown.add(()=> {
      //   this._item.exists = !this._item.exists;
      // }, this);
    }
  }, {
    key: "update",
    value: function update() {
      this.player.updateAnimation();
    }
  }, {
    key: "render",
    value: function render() {}
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 352 */
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

var _Boot = __webpack_require__(/*! ./Boot */ 353);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 354);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 355);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Selector = exports.Selector = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 353 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

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
/* 354 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 94);

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
/* 355 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

__webpack_require__(/*! ../../plugins/slick-ui/src/Core */ 356);

var _phaserScrollable = __webpack_require__(/*! ../../plugins/phaser-scrollable */ 375);

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
/* 356 */
/*!******************************************!*\
  !*** ./src/plugins/slick-ui/src/Core.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./Plugin */ 357);

__webpack_require__(/*! ./Container/Container */ 358);

__webpack_require__(/*! ./Element/Button */ 359);

__webpack_require__(/*! ./Element/Checkbox */ 360);

__webpack_require__(/*! ./Element/DisplayObject */ 361);

__webpack_require__(/*! ./Element/Panel */ 362);

__webpack_require__(/*! ./Element/Slider */ 363);

__webpack_require__(/*! ./Element/Text */ 364);

__webpack_require__(/*! ./Element/TextField */ 365);

__webpack_require__(/*! ./Keyboard/Key */ 366);

__webpack_require__(/*! ./Keyboard/Keyboard */ 367);

__webpack_require__(/*! ./Element/Renderer/ButtonRenderer */ 368);

__webpack_require__(/*! ./Element/Renderer/CheckboxRenderer */ 369);

__webpack_require__(/*! ./Element/Renderer/KeyRenderer */ 370);

__webpack_require__(/*! ./Element/Renderer/KeyboardRenderer */ 371);

__webpack_require__(/*! ./Element/Renderer/PanelRenderer */ 372);

__webpack_require__(/*! ./Element/Renderer/SliderRenderer */ 373);

__webpack_require__(/*! ./Element/Renderer/TextFieldRenderer */ 374);

/***/ }),
/* 357 */
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
/* 358 */
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
/* 359 */
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
/* 360 */
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
/* 361 */
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
/* 362 */
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
/* 363 */
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
/* 364 */
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
/* 365 */
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
/* 366 */
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
/* 367 */
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
/* 368 */
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
/* 369 */
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
/* 370 */
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
/* 371 */
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
/* 372 */
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
/* 373 */
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
/* 374 */
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
/* 375 */
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
/* 376 */
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

var _Boot = __webpack_require__(/*! ./Boot */ 377);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./Splash */ 378);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./Game */ 379);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestStage = exports.TestStage = { BootState: _Boot2.default, SplashState: _Splash2.default, GameState: _Game2.default };

/***/ }),
/* 377 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

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
    key: "init",
    value: function init() {
      this.stage.backgroundColor = "#EEE";
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: "preload",
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ["Bangers"]
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, "loading test stage", { font: "16px Arial", fill: "#000000", align: "center" });
      text.anchor.setTo(0.5, 0.5);

      // load your assets
      this.load.image("loaderBg", "./assets/images/loader-bg.png");
      this.load.image("loaderBar", "./assets/images/loader-bar.png");

      // Player Sprites
      this.load.atlas("playerAtlas", "./assets/images/player/Girl_1/Mimi.png", "./assets/images/player/Girl_1/Mimi.json");
      this.load.xml("playerXml", "./assets/images/player/Girl_1/Mimi.scml");

      this.load.json("map", "./assets/tilemaps/maps/salt_lake_v1.json");
      this.load.json("salt_lake_shape_1", "./assets/tilemaps/maps/salt_lake/shape1.json");
      this.load.json("map_points", "./assets/tilemaps/maps/salt_lake/points.json");
    }
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "render",
    value: function render() {
      if (this.fontsReady) {
        this.state.start("TestStageSplash");
      }
    }
  }, {
    key: "fontsLoaded",
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 378 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 94);

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
/* 379 */
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

var _phaser = __webpack_require__(/*! phaser */ 18);

var _phaser2 = _interopRequireDefault(_phaser);

var _PlayerActor = __webpack_require__(/*! ../../engine/PlayerActor */ 93);

var _PlayerActor2 = _interopRequireDefault(_PlayerActor);

var _Actor = __webpack_require__(/*! ../../engine/Actor */ 130);

var _Actor2 = _interopRequireDefault(_Actor);

var _Hud = __webpack_require__(/*! ../../sprites/Hud */ 132);

var _Hud2 = _interopRequireDefault(_Hud);

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
    key: "init",
    value: function init() {
      this.game.renderer.renderSession.roundPixels = true; // Make the phaser sprites look smoother
    }
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "shutdown",
    value: function shutdown() {
      this.game.pncPlugin.destroyScene();
    }
  }, {
    key: "create",
    value: function create() {
      var spriterLoader = new Spriter.Loader();
      var spriterData = 0;
      var room = 0;
      var sceneDefinition = {};
      var shape = game.cache.getJSON("map");
      var map_points = game.cache.getJSON("map_points");
      var navmeshPoints = [];
      var hud = null;
      var spriterFile = null;
      this.actor = null;
      this.key = "test-bg";
      var bannerText = "Press W to enter debug background mode.";

      shape.layers[1].objects.map(function (point) {
        for (var i = 0; i < point.polyline.length; i++) {
          navmeshPoints.push({
            x: point.x + point.polyline[i].x,
            y: point.y + point.polyline[i].y
          });
        }
      });

      sceneDefinition = {
        bg: "./assets/images/salt_lake.png",
        navmeshPoints: navmeshPoints,
        shape: this.game.cache.getJSON("salt_lake_shape_1"),
        points: map_points
      };

      // creates a scene and immediately switches to it
      room = this.game.pncPlugin.addScene(this.key, sceneDefinition, true);

      var banner = new _phaser2.default.Text(game, this.world.centerX, this.game.height - 30, bannerText);
      banner.padding.set(10, 16);
      banner.fontSize = 20;
      banner.fill = "#000";
      banner.smoothed = false;
      banner.anchor.setTo(0.5);

      hud = new _Hud2.default(game);

      this.game.pncPlugin.addObject(room, banner);
      this.game.pncPlugin.addObject(room, hud);

      spriterFile = new Spriter.SpriterXml(this.cache.getXML("playerXml"),
      /* optional parameters */{
        imageNameType: Spriter.eImageNameType.NAME_ONLY
      });

      // Now create Player and add it onto the game
      spriterData = spriterLoader.load(spriterFile);

      // adds actor using PlayerActor prototype which adds listeners for movement input
      this.game.pncPlugin.addActor(room, {
        spriterData: spriterData,
        textureKey: "playerAtlas",
        isSmall: true,
        spawnX: 200,
        spawnY: 600
      });
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
/* 380 */
/*!****************************************************!*\
  !*** ./node_modules/pubnub/dist/web/pubnub.min.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PubNub=t():e.PubNub=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){if(!navigator||!navigator.sendBeacon)return!1;navigator.sendBeacon(e)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),c=r(u),l=n(39),h=r(l),f=n(40),d=r(f),p=n(41),g=(n(5),function(e){function t(e){i(this,t);var n=e.listenToBrowserNetworkEvents,r=void 0===n||n;e.db=d.default,e.sdkFamily="Web",e.networking=new h.default({del:p.del,get:p.get,post:p.post,sendBeacon:a});var o=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r&&(window.addEventListener("offline",function(){o.networkDownDetected()}),window.addEventListener("online",function(){o.networkUpDetected()})),o}return o(t,e),t}(c.default));t.default=g,e.exports=t.default},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),u=i(a),c=n(6),l=i(c),h=n(8),f=i(h),d=n(9),p=i(d),g=n(16),y=i(g),b=n(17),v=r(b),_=n(18),m=r(_),k=n(19),P=r(k),S=n(20),O=r(S),w=n(21),T=r(w),M=n(22),C=r(M),E=n(23),N=r(E),x=n(24),R=r(x),A=n(25),K=r(A),D=n(26),j=r(D),U=n(27),G=r(U),I=n(28),B=r(I),H=n(29),L=r(H),F=n(30),q=r(F),z=n(31),X=r(z),W=n(32),J=r(W),V=n(33),$=r(V),Q=n(34),Y=r(Q),Z=n(35),ee=r(Z),te=n(36),ne=r(te),re=n(37),ie=r(re),se=n(12),oe=r(se),ae=n(38),ue=r(ae),ce=n(13),le=i(ce),he=n(10),fe=i(he),de=(n(5),n(3)),pe=i(de),ge=function(){function e(t){var n=this;s(this,e);var r=t.db,i=t.networking,o=this._config=new u.default({setup:t,db:r}),a=new l.default({config:o});i.init(o);var c={config:o,networking:i,crypto:a},h=y.default.bind(this,c,oe),d=y.default.bind(this,c,j),g=y.default.bind(this,c,B),b=y.default.bind(this,c,q),_=y.default.bind(this,c,ue),k=this._listenerManager=new p.default,S=new f.default({timeEndpoint:h,leaveEndpoint:d,heartbeatEndpoint:g,setStateEndpoint:b,subscribeEndpoint:_,crypto:c.crypto,config:c.config,listenerManager:k});this.addListener=k.addListener.bind(k),this.removeListener=k.removeListener.bind(k),this.removeAllListeners=k.removeAllListeners.bind(k),this.channelGroups={listGroups:y.default.bind(this,c,O),listChannels:y.default.bind(this,c,T),addChannels:y.default.bind(this,c,v),removeChannels:y.default.bind(this,c,m),deleteGroup:y.default.bind(this,c,P)},this.push={addChannels:y.default.bind(this,c,C),removeChannels:y.default.bind(this,c,N),deleteDevice:y.default.bind(this,c,K),listChannels:y.default.bind(this,c,R)},this.hereNow=y.default.bind(this,c,X),this.whereNow=y.default.bind(this,c,G),this.getState=y.default.bind(this,c,L),this.setState=S.adaptStateChange.bind(S),this.grant=y.default.bind(this,c,$),this.audit=y.default.bind(this,c,J),this.publish=y.default.bind(this,c,Y),this.fire=function(e,t){return e.replicate=!1,e.storeInHistory=!1,n.publish(e,t)},this.history=y.default.bind(this,c,ee),this.deleteMessages=y.default.bind(this,c,ne),this.fetchMessages=y.default.bind(this,c,ie),this.time=h,this.subscribe=S.adaptSubscribeChange.bind(S),this.unsubscribe=S.adaptUnsubscribeChange.bind(S),this.disconnect=S.disconnect.bind(S),this.reconnect=S.reconnect.bind(S),this.destroy=function(e){S.unsubscribeAll(e),S.disconnect()},this.stop=this.destroy,this.unsubscribeAll=S.unsubscribeAll.bind(S),this.getSubscribedChannels=S.getSubscribedChannels.bind(S),this.getSubscribedChannelGroups=S.getSubscribedChannelGroups.bind(S),this.encrypt=a.encrypt.bind(a),this.decrypt=a.decrypt.bind(a),this.getAuthKey=c.config.getAuthKey.bind(c.config),this.setAuthKey=c.config.setAuthKey.bind(c.config),this.setCipherKey=c.config.setCipherKey.bind(c.config),this.getUUID=c.config.getUUID.bind(c.config),this.setUUID=c.config.setUUID.bind(c.config),this.getFilterExpression=c.config.getFilterExpression.bind(c.config),this.setFilterExpression=c.config.setFilterExpression.bind(c.config),this.setHeartbeatInterval=c.config.setHeartbeatInterval.bind(c.config)}return o(e,[{key:"getVersion",value:function(){return this._config.getVersion()}},{key:"networkDownDetected",value:function(){this._listenerManager.announceNetworkDown(),this._config.restore?this.disconnect():this.destroy(!0)}},{key:"networkUpDetected",value:function(){this._listenerManager.announceNetworkUp(),this.reconnect()}}],[{key:"generateUUID",value:function(){return pe.default.createUUID()}}]),e}();ge.OPERATIONS=le.default,ge.CATEGORIES=fe.default,t.default=ge,e.exports=t.default},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(3),o=function(e){return e&&e.__esModule?e:{default:e}}(s),a=(n(5),function(){function e(t){var n=t.setup,i=t.db;r(this,e),this._db=i,this.instanceId="pn-"+o.default.createUUID(),this.secretKey=n.secretKey||n.secret_key,this.subscribeKey=n.subscribeKey||n.subscribe_key,this.publishKey=n.publishKey||n.publish_key,this.sdkName=n.sdkName,this.sdkFamily=n.sdkFamily,this.partnerId=n.partnerId,this.setAuthKey(n.authKey),this.setCipherKey(n.cipherKey),this.setFilterExpression(n.filterExpression),this.origin=n.origin||"pubsub.pndsn.com",this.secure=n.ssl||!1,this.restore=n.restore||!1,this.proxy=n.proxy,this.keepAlive=n.keepAlive,this.keepAliveSettings=n.keepAliveSettings,this.autoNetworkDetection=n.autoNetworkDetection||!1,this.dedupeOnSubscribe=n.dedupeOnSubscribe||!1,this.maximumCacheSize=n.maximumCacheSize||100,this.customEncrypt=n.customEncrypt,this.customDecrypt=n.customDecrypt,"undefined"!=typeof location&&"https:"===location.protocol&&(this.secure=!0),this.logVerbosity=n.logVerbosity||!1,this.suppressLeaveEvents=n.suppressLeaveEvents||!1,this.announceFailedHeartbeats=n.announceFailedHeartbeats||!0,this.announceSuccessfulHeartbeats=n.announceSuccessfulHeartbeats||!1,this.useInstanceId=n.useInstanceId||!1,this.useRequestId=n.useRequestId||!1,this.requestMessageCountThreshold=n.requestMessageCountThreshold,this.setTransactionTimeout(n.transactionalRequestTimeout||15e3),this.setSubscribeTimeout(n.subscribeRequestTimeout||31e4),this.setSendBeaconConfig(n.useSendBeacon||!0),this.setPresenceTimeout(n.presenceTimeout||300),null!=n.heartbeatInterval&&this.setHeartbeatInterval(n.heartbeatInterval),this.setUUID(this._decideUUID(n.uuid))}return i(e,[{key:"getAuthKey",value:function(){return this.authKey}},{key:"setAuthKey",value:function(e){return this.authKey=e,this}},{key:"setCipherKey",value:function(e){return this.cipherKey=e,this}},{key:"getUUID",value:function(){return this.UUID}},{key:"setUUID",value:function(e){return this._db&&this._db.set&&this._db.set(this.subscribeKey+"uuid",e),this.UUID=e,this}},{key:"getFilterExpression",value:function(){return this.filterExpression}},{key:"setFilterExpression",value:function(e){return this.filterExpression=e,this}},{key:"getPresenceTimeout",value:function(){return this._presenceTimeout}},{key:"setPresenceTimeout",value:function(e){return this._presenceTimeout=e,this.setHeartbeatInterval(this._presenceTimeout/2-1),this}},{key:"getHeartbeatInterval",value:function(){return this._heartbeatInterval}},{key:"setHeartbeatInterval",value:function(e){return this._heartbeatInterval=e,this}},{key:"getSubscribeTimeout",value:function(){return this._subscribeRequestTimeout}},{key:"setSubscribeTimeout",value:function(e){return this._subscribeRequestTimeout=e,this}},{key:"getTransactionTimeout",value:function(){return this._transactionalRequestTimeout}},{key:"setTransactionTimeout",value:function(e){return this._transactionalRequestTimeout=e,this}},{key:"isSendBeaconEnabled",value:function(){return this._useSendBeacon}},{key:"setSendBeaconConfig",value:function(e){return this._useSendBeacon=e,this}},{key:"getVersion",value:function(){return"4.19.0"}},{key:"_decideUUID",value:function(e){return e||(this._db&&this._db.get&&this._db.get(this.subscribeKey+"uuid")?this._db.get(this.subscribeKey+"uuid"):"pn-"+o.default.createUUID())}}]),e}());t.default=a,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default={createUUID:function(){return i.default.uuid?i.default.uuid():(0,i.default)()}},e.exports=t.default},function(e,t,n){var r,i,s;!function(n,o){i=[t],r=o,void 0!==(s="function"==typeof r?r.apply(t,i):r)&&(e.exports=s)}(0,function(e){function t(){var e,t,n="";for(e=0;e<32;e++)t=16*Math.random()|0,8!==e&&12!==e&&16!==e&&20!==e||(n+="-"),n+=(12===e?4:16===e?3&t|8:t).toString(16);return n}function n(e,t){var n=r[t||"all"];return n&&n.test(e)||!1}var r={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i};t.isUUID=n,t.VERSION="0.1.0",e.uuid=t,e.isUUID=n})},function(e,t){"use strict";e.exports={}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),a=(r(o),n(7)),u=r(a),c=function(){function e(t){var n=t.config;i(this,e),this._config=n,this._iv="0123456789012345",this._allowedKeyEncodings=["hex","utf8","base64","binary"],this._allowedKeyLengths=[128,256],this._allowedModes=["ecb","cbc"],this._defaultOptions={encryptKey:!0,keyEncoding:"utf8",keyLength:256,mode:"cbc"}}return s(e,[{key:"HMACSHA256",value:function(e){return u.default.HmacSHA256(e,this._config.secretKey).toString(u.default.enc.Base64)}},{key:"SHA256",value:function(e){return u.default.SHA256(e).toString(u.default.enc.Hex)}},{key:"_parseOptions",value:function(e){var t=e||{};return t.hasOwnProperty("encryptKey")||(t.encryptKey=this._defaultOptions.encryptKey),t.hasOwnProperty("keyEncoding")||(t.keyEncoding=this._defaultOptions.keyEncoding),t.hasOwnProperty("keyLength")||(t.keyLength=this._defaultOptions.keyLength),t.hasOwnProperty("mode")||(t.mode=this._defaultOptions.mode),-1===this._allowedKeyEncodings.indexOf(t.keyEncoding.toLowerCase())&&(t.keyEncoding=this._defaultOptions.keyEncoding),-1===this._allowedKeyLengths.indexOf(parseInt(t.keyLength,10))&&(t.keyLength=this._defaultOptions.keyLength),-1===this._allowedModes.indexOf(t.mode.toLowerCase())&&(t.mode=this._defaultOptions.mode),t}},{key:"_decodeKey",value:function(e,t){return"base64"===t.keyEncoding?u.default.enc.Base64.parse(e):"hex"===t.keyEncoding?u.default.enc.Hex.parse(e):e}},{key:"_getPaddedKey",value:function(e,t){return e=this._decodeKey(e,t),t.encryptKey?u.default.enc.Utf8.parse(this.SHA256(e).slice(0,32)):e}},{key:"_getMode",value:function(e){return"ecb"===e.mode?u.default.mode.ECB:u.default.mode.CBC}},{key:"_getIV",value:function(e){return"cbc"===e.mode?u.default.enc.Utf8.parse(this._iv):null}},{key:"encrypt",value:function(e,t,n){return this._config.customEncrypt?this._config.customEncrypt(e):this.pnEncrypt(e,t,n)}},{key:"decrypt",value:function(e,t,n){return this._config.customDecrypt?this._config.customDecrypt(e):this.pnDecrypt(e,t,n)}},{key:"pnEncrypt",value:function(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),s=this._getPaddedKey(t||this._config.cipherKey,n);return u.default.AES.encrypt(e,s,{iv:r,mode:i}).ciphertext.toString(u.default.enc.Base64)||e}},{key:"pnDecrypt",value:function(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),s=this._getPaddedKey(t||this._config.cipherKey,n);try{var o=u.default.enc.Base64.parse(e),a=u.default.AES.decrypt({ciphertext:o},s,{iv:r,mode:i}).toString(u.default.enc.Utf8);return JSON.parse(a)}catch(e){return null}}}]),e}();t.default=c,e.exports=t.default},function(e,t){"use strict";var n=n||function(e,t){var n={},r=n.lib={},i=function(){},s=r.Base={extend:function(e){i.prototype=this;var t=new i;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},o=r.WordArray=s.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:4*e.length},toString:function(e){return(e||u).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes;if(e=e.sigBytes,this.clamp(),r%4)for(var i=0;i<e;i++)t[r+i>>>2]|=(n[i>>>2]>>>24-i%4*8&255)<<24-(r+i)%4*8;else if(65535<n.length)for(i=0;i<e;i+=4)t[r+i>>>2]=n[i>>>2];else t.push.apply(t,n);return this.sigBytes+=e,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=s.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n=[],r=0;r<t;r+=4)n.push(4294967296*e.random()|0);return new o.init(n,t)}}),a=n.enc={},u=a.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++){var i=t[r>>>2]>>>24-r%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;return new o.init(n,t/2)}},c=a.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++)n.push(String.fromCharCode(t[r>>>2]>>>24-r%4*8&255));return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(255&e.charCodeAt(r))<<24-r%4*8;return new o.init(n,t)}},l=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(c.stringify(e)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(e){return c.parse(unescape(encodeURIComponent(e)))}},h=r.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,r=n.words,i=n.sigBytes,s=this.blockSize,a=i/(4*s),a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0);if(t=a*s,i=e.min(4*t,i),t){for(var u=0;u<t;u+=s)this._doProcessBlock(r,u);u=r.splice(0,t),n.sigBytes-=i}return new o.init(u,i)},clone:function(){var e=s.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=h.extend({cfg:s.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new f.HMAC.init(e,n).finalize(t)}}});var f=n.algo={};return n}(Math);!function(e){for(var t=n,r=t.lib,i=r.WordArray,s=r.Hasher,r=t.algo,o=[],a=[],u=function(e){return 4294967296*(e-(0|e))|0},c=2,l=0;64>l;){var h;e:{h=c;for(var f=e.sqrt(h),d=2;d<=f;d++)if(!(h%d)){h=!1;break e}h=!0}h&&(8>l&&(o[l]=u(e.pow(c,.5))),a[l]=u(e.pow(c,1/3)),l++),c++}var p=[],r=r.SHA256=s.extend({_doReset:function(){this._hash=new i.init(o.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],s=n[2],o=n[3],u=n[4],c=n[5],l=n[6],h=n[7],f=0;64>f;f++){if(16>f)p[f]=0|e[t+f];else{var d=p[f-15],g=p[f-2];p[f]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+p[f-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+p[f-16]}d=h+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&c^~u&l)+a[f]+p[f],g=((r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22))+(r&i^r&s^i&s),h=l,l=c,c=u,u=o+d|0,o=s,s=i,i=r,r=d+g|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+s|0,n[3]=n[3]+o|0,n[4]=n[4]+u|0,n[5]=n[5]+c|0,n[6]=n[6]+l|0,n[7]=n[7]+h|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return n[i>>>5]|=128<<24-i%32,n[14+(i+64>>>9<<4)]=e.floor(r/4294967296),n[15+(i+64>>>9<<4)]=r,t.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var e=s.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=s._createHelper(r),t.HmacSHA256=s._createHmacHelper(r)}(Math),function(){var e=n,t=e.enc.Utf8;e.algo.HMAC=e.lib.Base.extend({init:function(e,n){e=this._hasher=new e.init,"string"==typeof n&&(n=t.parse(n));var r=e.blockSize,i=4*r;n.sigBytes>i&&(n=e.finalize(n)),n.clamp();for(var s=this._oKey=n.clone(),o=this._iKey=n.clone(),a=s.words,u=o.words,c=0;c<r;c++)a[c]^=1549556828,u[c]^=909522486;s.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher;return e=t.finalize(e),t.reset(),t.finalize(this._oKey.clone().concat(e))}})}(),function(){var e=n,t=e.lib.WordArray;e.enc.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp(),e=[];for(var i=0;i<n;i+=3)for(var s=(t[i>>>2]>>>24-i%4*8&255)<<16|(t[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|t[i+2>>>2]>>>24-(i+2)%4*8&255,o=0;4>o&&i+.75*o<n;o++)e.push(r.charAt(s>>>6*(3-o)&63));if(t=r.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function(e){var n=e.length,r=this._map,i=r.charAt(64);i&&-1!=(i=e.indexOf(i))&&(n=i);for(var i=[],s=0,o=0;o<n;o++)if(o%4){var a=r.indexOf(e.charAt(o-1))<<o%4*2,u=r.indexOf(e.charAt(o))>>>6-o%4*2;i[s>>>2]|=(a|u)<<24-s%4*8,s++}return t.create(i,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){function t(e,t,n,r,i,s,o){return((e=e+(t&n|~t&r)+i+o)<<s|e>>>32-s)+t}function r(e,t,n,r,i,s,o){return((e=e+(t&r|n&~r)+i+o)<<s|e>>>32-s)+t}function i(e,t,n,r,i,s,o){return((e=e+(t^n^r)+i+o)<<s|e>>>32-s)+t}function s(e,t,n,r,i,s,o){return((e=e+(n^(t|~r))+i+o)<<s|e>>>32-s)+t}for(var o=n,a=o.lib,u=a.WordArray,c=a.Hasher,a=o.algo,l=[],h=0;64>h;h++)l[h]=4294967296*e.abs(e.sin(h+1))|0;a=a.MD5=c.extend({_doReset:function(){this._hash=new u.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,n){for(var o=0;16>o;o++){var a=n+o,u=e[a];e[a]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var o=this._hash.words,a=e[n+0],u=e[n+1],c=e[n+2],h=e[n+3],f=e[n+4],d=e[n+5],p=e[n+6],g=e[n+7],y=e[n+8],b=e[n+9],v=e[n+10],_=e[n+11],m=e[n+12],k=e[n+13],P=e[n+14],S=e[n+15],O=o[0],w=o[1],T=o[2],M=o[3],O=t(O,w,T,M,a,7,l[0]),M=t(M,O,w,T,u,12,l[1]),T=t(T,M,O,w,c,17,l[2]),w=t(w,T,M,O,h,22,l[3]),O=t(O,w,T,M,f,7,l[4]),M=t(M,O,w,T,d,12,l[5]),T=t(T,M,O,w,p,17,l[6]),w=t(w,T,M,O,g,22,l[7]),O=t(O,w,T,M,y,7,l[8]),M=t(M,O,w,T,b,12,l[9]),T=t(T,M,O,w,v,17,l[10]),w=t(w,T,M,O,_,22,l[11]),O=t(O,w,T,M,m,7,l[12]),M=t(M,O,w,T,k,12,l[13]),T=t(T,M,O,w,P,17,l[14]),w=t(w,T,M,O,S,22,l[15]),O=r(O,w,T,M,u,5,l[16]),M=r(M,O,w,T,p,9,l[17]),T=r(T,M,O,w,_,14,l[18]),w=r(w,T,M,O,a,20,l[19]),O=r(O,w,T,M,d,5,l[20]),M=r(M,O,w,T,v,9,l[21]),T=r(T,M,O,w,S,14,l[22]),w=r(w,T,M,O,f,20,l[23]),O=r(O,w,T,M,b,5,l[24]),M=r(M,O,w,T,P,9,l[25]),T=r(T,M,O,w,h,14,l[26]),w=r(w,T,M,O,y,20,l[27]),O=r(O,w,T,M,k,5,l[28]),M=r(M,O,w,T,c,9,l[29]),T=r(T,M,O,w,g,14,l[30]),w=r(w,T,M,O,m,20,l[31]),O=i(O,w,T,M,d,4,l[32]),M=i(M,O,w,T,y,11,l[33]),T=i(T,M,O,w,_,16,l[34]),w=i(w,T,M,O,P,23,l[35]),O=i(O,w,T,M,u,4,l[36]),M=i(M,O,w,T,f,11,l[37]),T=i(T,M,O,w,g,16,l[38]),w=i(w,T,M,O,v,23,l[39]),O=i(O,w,T,M,k,4,l[40]),M=i(M,O,w,T,a,11,l[41]),T=i(T,M,O,w,h,16,l[42]),w=i(w,T,M,O,p,23,l[43]),O=i(O,w,T,M,b,4,l[44]),M=i(M,O,w,T,m,11,l[45]),T=i(T,M,O,w,S,16,l[46]),w=i(w,T,M,O,c,23,l[47]),O=s(O,w,T,M,a,6,l[48]),M=s(M,O,w,T,g,10,l[49]),T=s(T,M,O,w,P,15,l[50]),w=s(w,T,M,O,d,21,l[51]),O=s(O,w,T,M,m,6,l[52]),M=s(M,O,w,T,h,10,l[53]),T=s(T,M,O,w,v,15,l[54]),w=s(w,T,M,O,u,21,l[55]),O=s(O,w,T,M,y,6,l[56]),M=s(M,O,w,T,S,10,l[57]),T=s(T,M,O,w,p,15,l[58]),w=s(w,T,M,O,k,21,l[59]),O=s(O,w,T,M,f,6,l[60]),M=s(M,O,w,T,_,10,l[61]),T=s(T,M,O,w,c,15,l[62]),w=s(w,T,M,O,b,21,l[63]);o[0]=o[0]+O|0,o[1]=o[1]+w|0,o[2]=o[2]+T|0,o[3]=o[3]+M|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;n[i>>>5]|=128<<24-i%32;var s=e.floor(r/4294967296);for(n[15+(i+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),n[14+(i+64>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(n.length+1),this._process(),t=this._hash,n=t.words,r=0;4>r;r++)i=n[r],n[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);return t},clone:function(){var e=c.clone.call(this);return e._hash=this._hash.clone(),e}}),o.MD5=c._createHelper(a),o.HmacMD5=c._createHmacHelper(a)}(Math),function(){var e=n,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,s=t.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=n.hasher.create(),s=i.create(),o=s.words,a=n.keySize,n=n.iterations;o.length<a;){u&&r.update(u);var u=r.update(e).finalize(t);r.reset();for(var c=1;c<n;c++)u=r.finalize(u),r.reset();s.concat(u)}return s.sigBytes=4*a,s}});e.EvpKDF=function(e,t,n){return s.create(n).compute(e,t)}}(),n.lib.Cipher||function(e){var t=n,r=t.lib,i=r.Base,s=r.WordArray,o=r.BufferedBlockAlgorithm,a=t.enc.Base64,u=t.algo.EvpKDF,c=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(t,n,r){return("string"==typeof n?g:p).encrypt(e,t,n,r)},decrypt:function(t,n,r){return("string"==typeof n?g:p).decrypt(e,t,n,r)}}}});r.StreamCipher=c.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=t.mode={},h=function(e,t,n){var r=this._iv;r?this._iv=void 0:r=this._prevBlock;for(var i=0;i<n;i++)e[t+i]^=r[i]},f=(r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}})).extend();f.Encryptor=f.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize;h.call(this,e,t,r),n.encryptBlock(e,t),this._prevBlock=e.slice(t,t+r)}}),f.Decryptor=f.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=e.slice(t,t+r);n.decryptBlock(e,t),h.call(this,e,t,r),this._prevBlock=i}}),l=l.CBC=f,f=(t.pad={}).Pkcs7={pad:function(e,t){for(var n=4*t,n=n-e.sigBytes%n,r=n<<24|n<<16|n<<8|n,i=[],o=0;o<n;o+=4)i.push(r);n=s.create(i,n),e.concat(n)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},r.BlockCipher=c.extend({cfg:c.cfg.extend({mode:l,padding:f}),reset:function(){c.reset.call(this);var e=this.cfg,t=e.iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=e.createEncryptor;else n=e.createDecryptor,this._minBufferSize=1;this._mode=n.call(e,this,t&&t.words)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else t=this._process(!0),e.unpad(t);return t},blockSize:4});var d=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),l=(t.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return e=e.salt,(e?s.create([1398893684,1701076831]).concat(e).concat(t):t).toString(a)},parse:function(e){e=a.parse(e);var t=e.words;if(1398893684==t[0]&&1701076831==t[1]){var n=s.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16}return d.create({ciphertext:e,salt:n})}},p=r.SerializableCipher=i.extend({cfg:i.extend({format:l}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r);return t=i.finalize(t),i=i.cfg,d.create({ciphertext:t,key:n,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),t=(t.kdf={}).OpenSSL={execute:function(e,t,n,r){return r||(r=s.random(8)),e=u.create({keySize:t+n}).compute(e,r),n=s.create(e.words.slice(t),4*n),e.sigBytes=4*t,d.create({key:e,iv:n,salt:r})}},g=r.PasswordBasedCipher=p.extend({cfg:p.cfg.extend({kdf:t}),encrypt:function(e,t,n,r){return r=this.cfg.extend(r),n=r.kdf.execute(n,e.keySize,e.ivSize),r.iv=n.iv,e=p.encrypt.call(this,e,t,n.key,r),e.mixIn(n),e},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),n=r.kdf.execute(n,e.keySize,e.ivSize,t.salt),r.iv=n.iv,p.decrypt.call(this,e,t,n.key,r)}})}(),function(){for(var e=n,t=e.lib.BlockCipher,r=e.algo,i=[],s=[],o=[],a=[],u=[],c=[],l=[],h=[],f=[],d=[],p=[],g=0;256>g;g++)p[g]=128>g?g<<1:g<<1^283;for(var y=0,b=0,g=0;256>g;g++){var v=b^b<<1^b<<2^b<<3^b<<4,v=v>>>8^255&v^99;i[y]=v,s[v]=y;var _=p[y],m=p[_],k=p[m],P=257*p[v]^16843008*v;o[y]=P<<24|P>>>8,a[y]=P<<16|P>>>16,u[y]=P<<8|P>>>24,c[y]=P,P=16843009*k^65537*m^257*_^16843008*y,l[v]=P<<24|P>>>8,h[v]=P<<16|P>>>16,f[v]=P<<8|P>>>24,d[v]=P,y?(y=_^p[p[p[k^_]]],b^=p[p[b]]):y=b=1}var S=[0,1,2,4,8,16,32,64,128,27,54],r=r.AES=t.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes/4,e=4*((this._nRounds=n+6)+1),r=this._keySchedule=[],s=0;s<e;s++)if(s<n)r[s]=t[s];else{var o=r[s-1];s%n?6<n&&4==s%n&&(o=i[o>>>24]<<24|i[o>>>16&255]<<16|i[o>>>8&255]<<8|i[255&o]):(o=o<<8|o>>>24,o=i[o>>>24]<<24|i[o>>>16&255]<<16|i[o>>>8&255]<<8|i[255&o],o^=S[s/n|0]<<24),r[s]=r[s-n]^o}for(t=this._invKeySchedule=[],n=0;n<e;n++)s=e-n,o=n%4?r[s]:r[s-4],t[n]=4>n||4>=s?o:l[i[o>>>24]]^h[i[o>>>16&255]]^f[i[o>>>8&255]]^d[i[255&o]]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,o,a,u,c,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,l,h,f,d,s),n=e[t+1],e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,s,o,a){for(var u=this._nRounds,c=e[t]^n[0],l=e[t+1]^n[1],h=e[t+2]^n[2],f=e[t+3]^n[3],d=4,p=1;p<u;p++)var g=r[c>>>24]^i[l>>>16&255]^s[h>>>8&255]^o[255&f]^n[d++],y=r[l>>>24]^i[h>>>16&255]^s[f>>>8&255]^o[255&c]^n[d++],b=r[h>>>24]^i[f>>>16&255]^s[c>>>8&255]^o[255&l]^n[d++],f=r[f>>>24]^i[c>>>16&255]^s[l>>>8&255]^o[255&h]^n[d++],c=g,l=y,h=b;g=(a[c>>>24]<<24|a[l>>>16&255]<<16|a[h>>>8&255]<<8|a[255&f])^n[d++],y=(a[l>>>24]<<24|a[h>>>16&255]<<16|a[f>>>8&255]<<8|a[255&c])^n[d++],b=(a[h>>>24]<<24|a[f>>>16&255]<<16|a[c>>>8&255]<<8|a[255&l])^n[d++],f=(a[f>>>24]<<24|a[c>>>16&255]<<16|a[l>>>8&255]<<8|a[255&h])^n[d++],e[t]=g,e[t+1]=y,e[t+2]=b,e[t+3]=f},keySize:8});e.AES=t._createHelper(r)}(),n.mode.ECB=function(){var e=n.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function(e,t){this._cipher.encryptBlock(e,t)}}),e.Decryptor=e.extend({processBlock:function(e,t){this._cipher.decryptBlock(e,t)}}),e}(),e.exports=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(6),a=(r(o),n(2)),u=(r(a),n(9)),c=(r(u),n(11)),l=r(c),h=n(14),f=r(h),d=n(15),p=r(d),g=(n(5),n(10)),y=r(g),b=function(){function e(t){var n=t.subscribeEndpoint,r=t.leaveEndpoint,s=t.heartbeatEndpoint,o=t.setStateEndpoint,a=t.timeEndpoint,u=t.config,c=t.crypto,h=t.listenerManager;i(this,e),this._listenerManager=h,this._config=u,this._leaveEndpoint=r,this._heartbeatEndpoint=s,this._setStateEndpoint=o,this._subscribeEndpoint=n,this._crypto=c,this._channels={},this._presenceChannels={},this._channelGroups={},this._presenceChannelGroups={},this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[],this._currentTimetoken=0,this._lastTimetoken=0,this._storedTimetoken=null,this._subscriptionStatusAnnounced=!1,this._isOnline=!0,this._reconnectionManager=new l.default({timeEndpoint:a}),this._dedupingManager=new f.default({config:u})}return s(e,[{key:"adaptStateChange",value:function(e,t){var n=this,r=e.state,i=e.channels,s=void 0===i?[]:i,o=e.channelGroups,a=void 0===o?[]:o;return s.forEach(function(e){e in n._channels&&(n._channels[e].state=r)}),a.forEach(function(e){e in n._channelGroups&&(n._channelGroups[e].state=r)}),this._setStateEndpoint({state:r,channels:s,channelGroups:a},t)}},{key:"adaptSubscribeChange",value:function(e){var t=this,n=e.timetoken,r=e.channels,i=void 0===r?[]:r,s=e.channelGroups,o=void 0===s?[]:s,a=e.withPresence,u=void 0!==a&&a;if(!this._config.subscribeKey||""===this._config.subscribeKey)return void(console&&console.log&&console.log("subscribe key missing; aborting subscribe"));n&&(this._lastTimetoken=this._currentTimetoken,this._currentTimetoken=n),"0"!==this._currentTimetoken&&(this._storedTimetoken=this._currentTimetoken,this._currentTimetoken=0),i.forEach(function(e){t._channels[e]={state:{}},u&&(t._presenceChannels[e]={}),t._pendingChannelSubscriptions.push(e)}),o.forEach(function(e){t._channelGroups[e]={state:{}},u&&(t._presenceChannelGroups[e]={}),t._pendingChannelGroupSubscriptions.push(e)}),this._subscriptionStatusAnnounced=!1,this.reconnect()}},{key:"adaptUnsubscribeChange",value:function(e,t){var n=this,r=e.channels,i=void 0===r?[]:r,s=e.channelGroups,o=void 0===s?[]:s,a=[],u=[];i.forEach(function(e){e in n._channels&&(delete n._channels[e],a.push(e)),e in n._presenceChannels&&(delete n._presenceChannels[e],a.push(e))}),o.forEach(function(e){e in n._channelGroups&&(delete n._channelGroups[e],u.push(e)),e in n._presenceChannelGroups&&(delete n._channelGroups[e],u.push(e))}),
0===a.length&&0===u.length||(!1!==this._config.suppressLeaveEvents||t||this._leaveEndpoint({channels:a,channelGroups:u},function(e){e.affectedChannels=a,e.affectedChannelGroups=u,e.currentTimetoken=n._currentTimetoken,e.lastTimetoken=n._lastTimetoken,n._listenerManager.announceStatus(e)}),0===Object.keys(this._channels).length&&0===Object.keys(this._presenceChannels).length&&0===Object.keys(this._channelGroups).length&&0===Object.keys(this._presenceChannelGroups).length&&(this._lastTimetoken=0,this._currentTimetoken=0,this._storedTimetoken=null,this._region=null,this._reconnectionManager.stopPolling()),this.reconnect())}},{key:"unsubscribeAll",value:function(e){this.adaptUnsubscribeChange({channels:this.getSubscribedChannels(),channelGroups:this.getSubscribedChannelGroups()},e)}},{key:"getSubscribedChannels",value:function(){return Object.keys(this._channels)}},{key:"getSubscribedChannelGroups",value:function(){return Object.keys(this._channelGroups)}},{key:"reconnect",value:function(){this._startSubscribeLoop(),this._registerHeartbeatTimer()}},{key:"disconnect",value:function(){this._stopSubscribeLoop(),this._stopHeartbeatTimer(),this._reconnectionManager.stopPolling()}},{key:"_registerHeartbeatTimer",value:function(){this._stopHeartbeatTimer(),0!==this._config.getHeartbeatInterval()&&(this._performHeartbeatLoop(),this._heartbeatTimer=setInterval(this._performHeartbeatLoop.bind(this),1e3*this._config.getHeartbeatInterval()))}},{key:"_stopHeartbeatTimer",value:function(){this._heartbeatTimer&&(clearInterval(this._heartbeatTimer),this._heartbeatTimer=null)}},{key:"_performHeartbeatLoop",value:function(){var e=this,t=Object.keys(this._channels),n=Object.keys(this._channelGroups),r={};if(0!==t.length||0!==n.length){t.forEach(function(t){var n=e._channels[t].state;Object.keys(n).length&&(r[t]=n)}),n.forEach(function(t){var n=e._channelGroups[t].state;Object.keys(n).length&&(r[t]=n)});var i=function(t){t.error&&e._config.announceFailedHeartbeats&&e._listenerManager.announceStatus(t),t.error&&e._config.autoNetworkDetection&&e._isOnline&&(e._isOnline=!1,e.disconnect(),e._listenerManager.announceNetworkDown(),e.reconnect()),!t.error&&e._config.announceSuccessfulHeartbeats&&e._listenerManager.announceStatus(t)};this._heartbeatEndpoint({channels:t,channelGroups:n,state:r},i.bind(this))}}},{key:"_startSubscribeLoop",value:function(){this._stopSubscribeLoop();var e=[],t=[];if(Object.keys(this._channels).forEach(function(t){return e.push(t)}),Object.keys(this._presenceChannels).forEach(function(t){return e.push(t+"-pnpres")}),Object.keys(this._channelGroups).forEach(function(e){return t.push(e)}),Object.keys(this._presenceChannelGroups).forEach(function(e){return t.push(e+"-pnpres")}),0!==e.length||0!==t.length){var n={channels:e,channelGroups:t,timetoken:this._currentTimetoken,filterExpression:this._config.filterExpression,region:this._region};this._subscribeCall=this._subscribeEndpoint(n,this._processSubscribeResponse.bind(this))}}},{key:"_processSubscribeResponse",value:function(e,t){var n=this;if(e.error)return void(e.category===y.default.PNTimeoutCategory?this._startSubscribeLoop():e.category===y.default.PNNetworkIssuesCategory?(this.disconnect(),e.error&&this._config.autoNetworkDetection&&this._isOnline&&(this._isOnline=!1,this._listenerManager.announceNetworkDown()),this._reconnectionManager.onReconnection(function(){n._config.autoNetworkDetection&&!n._isOnline&&(n._isOnline=!0,n._listenerManager.announceNetworkUp()),n.reconnect(),n._subscriptionStatusAnnounced=!0;var t={category:y.default.PNReconnectedCategory,operation:e.operation,lastTimetoken:n._lastTimetoken,currentTimetoken:n._currentTimetoken};n._listenerManager.announceStatus(t)}),this._reconnectionManager.startPolling(),this._listenerManager.announceStatus(e)):e.category===y.default.PNBadRequestCategory?(this._stopHeartbeatTimer(),this._listenerManager.announceStatus(e)):this._listenerManager.announceStatus(e));if(this._storedTimetoken?(this._currentTimetoken=this._storedTimetoken,this._storedTimetoken=null):(this._lastTimetoken=this._currentTimetoken,this._currentTimetoken=t.metadata.timetoken),!this._subscriptionStatusAnnounced){var r={};r.category=y.default.PNConnectedCategory,r.operation=e.operation,r.affectedChannels=this._pendingChannelSubscriptions,r.subscribedChannels=this.getSubscribedChannels(),r.affectedChannelGroups=this._pendingChannelGroupSubscriptions,r.lastTimetoken=this._lastTimetoken,r.currentTimetoken=this._currentTimetoken,this._subscriptionStatusAnnounced=!0,this._listenerManager.announceStatus(r),this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[]}var i=t.messages||[],s=this._config,o=s.requestMessageCountThreshold,a=s.dedupeOnSubscribe;if(o&&i.length>=o){var u={};u.category=y.default.PNRequestMessageCountExceededCategory,u.operation=e.operation,this._listenerManager.announceStatus(u)}i.forEach(function(e){var t=e.channel,r=e.subscriptionMatch,i=e.publishMetaData;if(t===r&&(r=null),a){if(n._dedupingManager.isDuplicate(e))return;n._dedupingManager.addEntry(e)}if(p.default.endsWith(e.channel,"-pnpres")){var s={};s.channel=null,s.subscription=null,s.actualChannel=null!=r?t:null,s.subscribedChannel=null!=r?r:t,t&&(s.channel=t.substring(0,t.lastIndexOf("-pnpres"))),r&&(s.subscription=r.substring(0,r.lastIndexOf("-pnpres"))),s.action=e.payload.action,s.state=e.payload.data,s.timetoken=i.publishTimetoken,s.occupancy=e.payload.occupancy,s.uuid=e.payload.uuid,s.timestamp=e.payload.timestamp,e.payload.join&&(s.join=e.payload.join),e.payload.leave&&(s.leave=e.payload.leave),e.payload.timeout&&(s.timeout=e.payload.timeout),n._listenerManager.announcePresence(s)}else{var o={};o.channel=null,o.subscription=null,o.actualChannel=null!=r?t:null,o.subscribedChannel=null!=r?r:t,o.channel=t,o.subscription=r,o.timetoken=i.publishTimetoken,o.publisher=e.issuingClientId,e.userMetadata&&(o.userMetadata=e.userMetadata),n._config.cipherKey?o.message=n._crypto.decrypt(e.payload):o.message=e.payload,n._listenerManager.announceMessage(o)}}),this._region=t.metadata.region,this._startSubscribeLoop()}},{key:"_stopSubscribeLoop",value:function(){this._subscribeCall&&("function"==typeof this._subscribeCall.abort&&this._subscribeCall.abort(),this._subscribeCall=null)}}]),e}();t.default=b,e.exports=t.default},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=(n(5),n(10)),o=function(e){return e&&e.__esModule?e:{default:e}}(s),a=function(){function e(){r(this,e),this._listeners=[]}return i(e,[{key:"addListener",value:function(e){this._listeners.push(e)}},{key:"removeListener",value:function(e){var t=[];this._listeners.forEach(function(n){n!==e&&t.push(n)}),this._listeners=t}},{key:"removeAllListeners",value:function(){this._listeners=[]}},{key:"announcePresence",value:function(e){this._listeners.forEach(function(t){t.presence&&t.presence(e)})}},{key:"announceStatus",value:function(e){this._listeners.forEach(function(t){t.status&&t.status(e)})}},{key:"announceMessage",value:function(e){this._listeners.forEach(function(t){t.message&&t.message(e)})}},{key:"announceNetworkUp",value:function(){var e={};e.category=o.default.PNNetworkUpCategory,this.announceStatus(e)}},{key:"announceNetworkDown",value:function(){var e={};e.category=o.default.PNNetworkDownCategory,this.announceStatus(e)}}]),e}();t.default=a,e.exports=t.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNNetworkUpCategory:"PNNetworkUpCategory",PNNetworkDownCategory:"PNNetworkDownCategory",PNNetworkIssuesCategory:"PNNetworkIssuesCategory",PNTimeoutCategory:"PNTimeoutCategory",PNBadRequestCategory:"PNBadRequestCategory",PNAccessDeniedCategory:"PNAccessDeniedCategory",PNUnknownCategory:"PNUnknownCategory",PNReconnectedCategory:"PNReconnectedCategory",PNConnectedCategory:"PNConnectedCategory",PNRequestMessageCountExceededCategory:"PNRequestMessageCountExceededCategory"},e.exports=t.default},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(12),o=(function(e){e&&e.__esModule}(s),n(5),function(){function e(t){var n=t.timeEndpoint;r(this,e),this._timeEndpoint=n}return i(e,[{key:"onReconnection",value:function(e){this._reconnectionCallback=e}},{key:"startPolling",value:function(){this._timeTimer=setInterval(this._performTimeLoop.bind(this),3e3)}},{key:"stopPolling",value:function(){clearInterval(this._timeTimer)}},{key:"_performTimeLoop",value:function(){var e=this;this._timeEndpoint(function(t){t.error||(clearInterval(e._timeTimer),e._reconnectionCallback())})}}]),e}());t.default=o,e.exports=t.default},function(e,t,n){"use strict";function r(){return h.default.PNTimeOperation}function i(){return"/time/0"}function s(e){return e.config.getTransactionTimeout()}function o(){return{}}function a(){return!1}function u(e,t){return{timetoken:t[0]}}function c(){}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.getURL=i,t.getRequestTimeout=s,t.prepareParams=o,t.isAuthSupported=a,t.handleResponse=u,t.validateParams=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNTimeOperation:"PNTimeOperation",PNHistoryOperation:"PNHistoryOperation",PNDeleteMessagesOperation:"PNDeleteMessagesOperation",PNFetchMessagesOperation:"PNFetchMessagesOperation",PNSubscribeOperation:"PNSubscribeOperation",PNUnsubscribeOperation:"PNUnsubscribeOperation",PNPublishOperation:"PNPublishOperation",PNPushNotificationEnabledChannelsOperation:"PNPushNotificationEnabledChannelsOperation",PNRemoveAllPushNotificationsOperation:"PNRemoveAllPushNotificationsOperation",PNWhereNowOperation:"PNWhereNowOperation",PNSetStateOperation:"PNSetStateOperation",PNHereNowOperation:"PNHereNowOperation",PNGetStateOperation:"PNGetStateOperation",PNHeartbeatOperation:"PNHeartbeatOperation",PNChannelGroupsOperation:"PNChannelGroupsOperation",PNRemoveGroupOperation:"PNRemoveGroupOperation",PNChannelsForGroupOperation:"PNChannelsForGroupOperation",PNAddChannelsToGroupOperation:"PNAddChannelsToGroupOperation",PNRemoveChannelsFromGroupOperation:"PNRemoveChannelsFromGroupOperation",PNAccessManagerGrant:"PNAccessManagerGrant",PNAccessManagerAudit:"PNAccessManagerAudit"},e.exports=t.default},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),o=(function(e){e&&e.__esModule}(s),n(5),function(e){var t=0;if(0===e.length)return t;for(var n=0;n<e.length;n+=1){t=(t<<5)-t+e.charCodeAt(n),t&=t}return t}),a=function(){function e(t){var n=t.config;r(this,e),this.hashHistory=[],this._config=n}return i(e,[{key:"getKey",value:function(e){var t=o(JSON.stringify(e.payload)).toString();return e.publishMetaData.publishTimetoken+"-"+t}},{key:"isDuplicate",value:function(e){return this.hashHistory.includes(this.getKey(e))}},{key:"addEntry",value:function(e){this.hashHistory.length>=this._config.maximumCacheSize&&this.hashHistory.shift(),this.hashHistory.push(this.getKey(e))}},{key:"clearHistory",value:function(){this.hashHistory=[]}}]),e}();t.default=a,e.exports=t.default},function(e,t){"use strict";function n(e){var t=[];return Object.keys(e).forEach(function(e){return t.push(e)}),t}function r(e){return encodeURIComponent(e).replace(/[!~*'()]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){return n(e).sort()}function s(e){return i(e).map(function(t){return t+"="+r(e[t])}).join("&")}function o(e,t){return-1!==e.indexOf(t,this.length-t.length)}function a(){var e=void 0,t=void 0;return{promise:new Promise(function(n,r){e=n,t=r}),reject:t,fulfill:e}}e.exports={signPamFromParams:s,endsWith:o,createPromise:a,encodeString:r}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){return e.type=t,e.error=!0,e}function u(e){return a({message:e},"validationError")}function c(e,t,n){return e.usePost&&e.usePost(t,n)?e.postURL(t,n):e.getURL(t,n)}function l(e){if(e.sdkName)return e.sdkName;var t="PubNub-JS-"+e.sdkFamily;return e.partnerId&&(t+="-"+e.partnerId),t+="/"+e.getVersion()}function h(e,t,n){var r=e.config,i=e.crypto;n.timestamp=Math.floor((new Date).getTime()/1e3);var s=r.subscribeKey+"\n"+r.publishKey+"\n"+t+"\n";s+=g.default.signPamFromParams(n);var o=i.HMACSHA256(s);o=o.replace(/\+/g,"-"),o=o.replace(/\//g,"_"),n.signature=o}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.networking,r=e.config,i=null,s=null,o={};t.getOperation()===v.default.PNTimeOperation||t.getOperation()===v.default.PNChannelGroupsOperation?i=arguments.length<=2?void 0:arguments[2]:(o=arguments.length<=2?void 0:arguments[2],i=arguments.length<=3?void 0:arguments[3]),"undefined"==typeof Promise||i||(s=g.default.createPromise());var a=t.validateParams(e,o);if(!a){var f=t.prepareParams(e,o),p=c(t,e,o),y=void 0,b={url:p,operation:t.getOperation(),timeout:t.getRequestTimeout(e)};f.uuid=r.UUID,f.pnsdk=l(r),r.useInstanceId&&(f.instanceid=r.instanceId),r.useRequestId&&(f.requestid=d.default.createUUID()),t.isAuthSupported()&&r.getAuthKey()&&(f.auth=r.getAuthKey()),r.secretKey&&h(e,p,f);var m=function(n,r){if(n.error)return void(i?i(n):s&&s.reject(new _("PubNub call failed, check status for details",n)));var a=t.handleResponse(e,r,o);i?i(n,a):s&&s.fulfill(a)};if(t.usePost&&t.usePost(e,o)){var k=t.postPayload(e,o);y=n.POST(f,k,b,m)}else y=t.useDelete&&t.useDelete()?n.DELETE(f,b,m):n.GET(f,b,m);return t.getOperation()===v.default.PNSubscribeOperation?y:s?s.promise:void 0}return i?i(u(a)):s?(s.reject(new _("Validation failed, check status for details",u(a))),s.promise):void 0};var f=n(3),d=r(f),p=(n(5),n(15)),g=r(p),y=n(2),b=(r(y),n(13)),v=r(b),_=function(e){function t(e,n){i(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.name=r.constructor.name,r.status=n,r.message=e,r}return o(t,e),t}(Error);e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNAddChannelsToGroupOperation}function s(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group"}function o(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n)}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channels;return{add:(void 0===n?[]:n).join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNRemoveChannelsFromGroupOperation}function s(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group"}function o(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n)}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channels;return{remove:(void 0===n?[]:n).join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNRemoveGroupOperation}function s(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group"}function o(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n)+"/remove"}function a(){return!0}function u(e){return e.config.getTransactionTimeout()}function c(){return{}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(){return h.default.PNChannelGroupsOperation}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function s(e){return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group"}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(){return{}}function c(e,t){return{groups:t.payload.groups}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNChannelsForGroupOperation}function s(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group"}function o(e,t){var n=t.channelGroup;return"/v1/channel-registration/sub-key/"+e.config.subscribeKey+"/channel-group/"+p.default.encodeString(n)}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(){return{}}function l(e,t){return{channels:t.payload.channels}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation}function i(e,t){var n=t.device,r=t.pushGateway,i=t.channels,s=e.config;return n?r?i&&0!==i.length?s.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(e,t){var n=t.pushGateway,r=t.channels;return{type:n,add:(void 0===r?[]:r).join(",")}}function c(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation}function i(e,t){var n=t.device,r=t.pushGateway,i=t.channels,s=e.config;return n?r?i&&0!==i.length?s.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(e,t){var n=t.pushGateway,r=t.channels;return{type:n,remove:(void 0===r?[]:r).join(",")}}function c(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(){return h.default.PNPushNotificationEnabledChannelsOperation}function i(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(e,t){return{type:t.pushGateway}}function c(e,t){return{channels:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(){return h.default.PNRemoveAllPushNotificationsOperation}function i(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device;return"/v1/push/sub-key/"+e.config.subscribeKey+"/devices/"+n+"/remove"}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(e,t){return{type:t.pushGateway}}function c(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNUnsubscribeOperation}function s(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function o(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,s=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(s)+"/leave"}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(){return h.default.PNWhereNowOperation}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r;return"/v2/presence/sub-key/"+n.subscribeKey+"/uuid/"+i}function o(e){return e.config.getTransactionTimeout()}function a(){return!0}function u(){return{}}function c(e,t){return t.payload?{channels:t.payload.channels}:{channels:[]}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNHeartbeatOperation}function s(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function o(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,s=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(s)+"/heartbeat"}function a(){return!0}function u(e){return e.config.getTransactionTimeout()}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.state,s=void 0===i?{}:i,o=e.config,a={};return r.length>0&&(a["channel-group"]=r.join(",")),a.state=JSON.stringify(s),a.heartbeat=o.getPresenceTimeout(),a}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNGetStateOperation}function s(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function o(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r,s=t.channels,o=void 0===s?[]:s,a=o.length>0?o.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(a)+"/uuid/"+i}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,s=n.channelGroups,o=void 0===s?[]:s,a={};return 1===i.length&&0===o.length?a[i[0]]=t.payload:a=t.payload,{channels:a}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNSetStateOperation}function s(e,t){var n=e.config,r=t.state,i=t.channels,s=void 0===i?[]:i,o=t.channelGroups,a=void 0===o?[]:o;return r?n.subscribeKey?0===s.length&&0===a.length?"Please provide a list of channels and/or channel-groups":void 0:"Missing Subscribe Key":"Missing State"}function o(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,s=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+p.default.encodeString(s)+"/uuid/"+n.UUID+"/data"}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.state,r=t.channelGroups,i=void 0===r?[]:r,s={};return s.state=JSON.stringify(n),i.length>0&&(s["channel-group"]=i.join(",")),s}function l(e,t){return{state:t.payload}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNHereNowOperation}function s(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function o(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,s=t.channelGroups,o=void 0===s?[]:s,a="/v2/presence/sub-key/"+n.subscribeKey;if(i.length>0||o.length>0){var u=i.length>0?i.join(","):",";a+="/channel/"+p.default.encodeString(u)}return a}function a(e){return e.config.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.includeUUIDs,s=void 0===i||i,o=t.includeState,a=void 0!==o&&o,u={};return s||(u.disable_uuids=1),a&&(u.state=1),r.length>0&&(u["channel-group"]=r.join(",")),u}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,s=n.channelGroups,o=void 0===s?[]:s,a=n.includeUUIDs,u=void 0===a||a,c=n.includeState,l=void 0!==c&&c;return i.length>1||o.length>0||0===o.length&&0===i.length?function(){var e={};return e.totalChannels=t.payload.total_channels,e.totalOccupancy=t.payload.total_occupancy,e.channels={},Object.keys(t.payload.channels).forEach(function(n){var r=t.payload.channels[n],i=[];return e.channels[n]={occupants:i,name:n,occupancy:r.occupancy},u&&r.uuids.forEach(function(e){l?i.push({state:e.state,uuid:e.uuid}):i.push({state:null,uuid:e})}),e}),e}():function(){var e={},n=[];return e.totalChannels=1,e.totalOccupancy=t.occupancy,e.channels={},e.channels[i[0]]={occupants:n,name:i[0],occupancy:t.occupancy},u&&t.uuids&&t.uuids.forEach(function(e){l?n.push({state:e.state,uuid:e.uuid}):n.push({state:null,uuid:e})}),e}()}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(){return h.default.PNAccessManagerAudit}function i(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function s(e){return"/v2/auth/audit/sub-key/"+e.config.subscribeKey}function o(e){return e.config.getTransactionTimeout()}function a(){return!1}function u(e,t){var n=t.channel,r=t.channelGroup,i=t.authKeys,s=void 0===i?[]:i,o={};return n&&(o.channel=n),r&&(o["channel-group"]=r),s.length>0&&(o.auth=s.join(",")),o}function c(e,t){return t.payload}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(){return h.default.PNAccessManagerGrant}function i(e){var t=e.config;return t.subscribeKey?t.publishKey?t.secretKey?void 0:"Missing Secret Key":"Missing Publish Key":"Missing Subscribe Key"}function s(e){return"/v2/auth/grant/sub-key/"+e.config.subscribeKey}function o(e){return e.config.getTransactionTimeout()}function a(){return!1}function u(e,t){var n=t.channels,r=void 0===n?[]:n,i=t.channelGroups,s=void 0===i?[]:i,o=t.ttl,a=t.read,u=void 0!==a&&a,c=t.write,l=void 0!==c&&c,h=t.manage,f=void 0!==h&&h,d=t.authKeys,p=void 0===d?[]:d,g={};return g.r=u?"1":"0",g.w=l?"1":"0",g.m=f?"1":"0",r.length>0&&(g.channel=r.join(",")),s.length>0&&(g["channel-group"]=s.join(",")),p.length>0&&(g.auth=p.join(",")),(o||0===o)&&(g.ttl=o),g}function c(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=r,t.validateParams=i,t.getURL=s,t.getRequestTimeout=o,t.isAuthSupported=a,t.prepareParams=u,t.handleResponse=c;var l=(n(5),n(13)),h=function(e){return e&&e.__esModule?e:{default:e}}(l)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.crypto,r=e.config,i=JSON.stringify(t);return r.cipherKey&&(i=n.encrypt(i),i=JSON.stringify(i)),i}function s(){return b.default.PNPublishOperation}function o(e,t){var n=e.config,r=t.message;return t.channel?r?n.subscribeKey?void 0:"Missing Subscribe Key":"Missing Message":"Missing Channel"}function a(e,t){var n=t.sendByPost;return void 0!==n&&n}function u(e,t){var n=e.config,r=t.channel,s=t.message,o=i(e,s);return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+_.default.encodeString(r)+"/0/"+_.default.encodeString(o)}function c(e,t){var n=e.config,r=t.channel;return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+_.default.encodeString(r)+"/0"}function l(e){return e.config.getTransactionTimeout()}function h(){return!0}function f(e,t){return i(e,t.message)}function d(e,t){var n=t.meta,r=t.replicate,i=void 0===r||r,s=t.storeInHistory,o=t.ttl,a={};return null!=s&&(a.store=s?"1":"0"),o&&(a.ttl=o),!1===i&&(a.norep="true"),n&&"object"===(void 0===n?"undefined":g(n))&&(a.meta=JSON.stringify(n)),a}function p(e,t){return{timetoken:t[2]}}Object.defineProperty(t,"__esModule",{value:!0})
;var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.getOperation=s,t.validateParams=o,t.usePost=a,t.getURL=u,t.postURL=c,t.getRequestTimeout=l,t.isAuthSupported=h,t.postPayload=f,t.prepareParams=d,t.handleResponse=p;var y=(n(5),n(13)),b=r(y),v=n(15),_=r(v)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.config,r=e.crypto;if(!n.cipherKey)return t;try{return r.decrypt(t)}catch(e){return t}}function s(){return d.default.PNHistoryOperation}function o(e,t){var n=t.channel,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channel"}function a(e,t){var n=t.channel;return"/v2/history/sub-key/"+e.config.subscribeKey+"/channel/"+g.default.encodeString(n)}function u(e){return e.config.getTransactionTimeout()}function c(){return!0}function l(e,t){var n=t.start,r=t.end,i=t.reverse,s=t.count,o=void 0===s?100:s,a=t.stringifiedTimeToken,u=void 0!==a&&a,c={include_token:"true"};return c.count=o,n&&(c.start=n),r&&(c.end=r),u&&(c.string_message_token="true"),null!=i&&(c.reverse=i.toString()),c}function h(e,t){var n={messages:[],startTimeToken:t[1],endTimeToken:t[2]};return t[0].forEach(function(t){var r={timetoken:t.timetoken,entry:i(e,t.message)};n.messages.push(r)}),n}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=s,t.validateParams=o,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(5),n(13)),d=r(f),p=n(15),g=r(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return d.default.PNDeleteMessagesOperation}function s(e,t){var n=t.channel,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channel"}function o(){return!0}function a(e,t){var n=t.channel,r=t.start,i=t.end,s=e.config,o="";return r&&(o="?start="+r),i&&(o+=(""!==o?"&":"?")+"end="+i),"/v3/history/sub-key/"+s.subscribeKey+"/channel/"+g.default.encodeString(n)+o}function u(e){return e.config.getTransactionTimeout()}function c(){return!0}function l(e,t){var n=t.start,r=t.end,i={};return n&&(i.start=n),r&&(i.end=r),{}}function h(e,t){return t.payload}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.useDelete=o,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(5),n(13)),d=r(f),p=n(15),g=r(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.config,r=e.crypto;if(!n.cipherKey)return t;try{return r.decrypt(t)}catch(e){return t}}function s(){return d.default.PNFetchMessagesOperation}function o(e,t){var n=t.channels,r=e.config;return n&&0!==n.length?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channels"}function a(e,t){var n=t.channels,r=void 0===n?[]:n,i=e.config,s=r.length>0?r.join(","):",";return"/v3/history/sub-key/"+i.subscribeKey+"/channel/"+g.default.encodeString(s)}function u(e){return e.config.getTransactionTimeout()}function c(){return!0}function l(e,t){var n=t.start,r=t.end,i=t.count,s={};return i&&(s.max=i),n&&(s.start=n),r&&(s.end=r),s}function h(e,t){var n={channels:{}};return Object.keys(t.channels||{}).forEach(function(r){n.channels[r]=[],(t.channels[r]||[]).forEach(function(t){var s={};s.channel=r,s.subscription=null,s.timetoken=t.timetoken,s.message=i(e,t.message),n.channels[r].push(s)})}),n}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=s,t.validateParams=o,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(5),n(13)),d=r(f),p=n(15),g=r(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNSubscribeOperation}function s(e){if(!e.config.subscribeKey)return"Missing Subscribe Key"}function o(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,s=i.length>0?i.join(","):",";return"/v2/subscribe/"+n.subscribeKey+"/"+p.default.encodeString(s)+"/0"}function a(e){return e.config.getSubscribeTimeout()}function u(){return!0}function c(e,t){var n=e.config,r=t.channelGroups,i=void 0===r?[]:r,s=t.timetoken,o=t.filterExpression,a=t.region,u={heartbeat:n.getPresenceTimeout()};return i.length>0&&(u["channel-group"]=i.join(",")),o&&o.length>0&&(u["filter-expr"]=o),s&&(u.tt=s),a&&(u.tr=a),u}function l(e,t){var n=[];t.m.forEach(function(e){var t={publishTimetoken:e.p.t,region:e.p.r},r={shard:parseInt(e.a,10),subscriptionMatch:e.b,channel:e.c,payload:e.d,flags:e.f,issuingClientId:e.i,subscribeKey:e.k,originationTimetoken:e.o,userMetadata:e.u,publishMetaData:t};n.push(r)});var r={timetoken:t.t.t,region:t.t.r};return{messages:n,metadata:r}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=s,t.getURL=o,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(5),n(13)),f=r(h),d=n(15),p=r(d)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),a=(r(o),n(10)),u=r(a),c=(n(5),function(){function e(t){var n=this;i(this,e),this._modules={},Object.keys(t).forEach(function(e){n._modules[e]=t[e].bind(n)})}return s(e,[{key:"init",value:function(e){this._config=e,this._maxSubDomain=20,this._currentSubDomain=Math.floor(Math.random()*this._maxSubDomain),this._providedFQDN=(this._config.secure?"https://":"http://")+this._config.origin,this._coreParams={},this.shiftStandardOrigin()}},{key:"nextOrigin",value:function(){if(-1===this._providedFQDN.indexOf("pubsub."))return this._providedFQDN;var e=void 0;return this._currentSubDomain=this._currentSubDomain+1,this._currentSubDomain>=this._maxSubDomain&&(this._currentSubDomain=1),e=this._currentSubDomain.toString(),this._providedFQDN.replace("pubsub","ps"+e)}},{key:"shiftStandardOrigin",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._standardOrigin=this.nextOrigin(e),this._standardOrigin}},{key:"getStandardOrigin",value:function(){return this._standardOrigin}},{key:"POST",value:function(e,t,n,r){return this._modules.post(e,t,n,r)}},{key:"GET",value:function(e,t,n){return this._modules.get(e,t,n)}},{key:"DELETE",value:function(e,t,n){return this._modules.del(e,t,n)}},{key:"_detectErrorCategory",value:function(e){if("ENOTFOUND"===e.code)return u.default.PNNetworkIssuesCategory;if("ECONNREFUSED"===e.code)return u.default.PNNetworkIssuesCategory;if("ECONNRESET"===e.code)return u.default.PNNetworkIssuesCategory;if("EAI_AGAIN"===e.code)return u.default.PNNetworkIssuesCategory;if(0===e.status||e.hasOwnProperty("status")&&void 0===e.status)return u.default.PNNetworkIssuesCategory;if(e.timeout)return u.default.PNTimeoutCategory;if(e.response){if(e.response.badRequest)return u.default.PNBadRequestCategory;if(e.response.forbidden)return u.default.PNAccessDeniedCategory}return u.default.PNUnknownCategory}}]),e}());t.default=c,e.exports=t.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={get:function(e){try{return localStorage.getItem(e)}catch(e){return null}},set:function(e,t){try{return localStorage.setItem(e,t)}catch(e){return null}}},e.exports=t.default},function(e,t,n){"use strict";function r(e){var t=(new Date).getTime(),n=(new Date).toISOString(),r=function(){return console&&console.log?console:window&&window.console&&window.console.log?window.console:console}();r.log("<<<<<"),r.log("["+n+"]","\n",e.url,"\n",e.qs),r.log("-----"),e.on("response",function(n){var i=(new Date).getTime(),s=i-t,o=(new Date).toISOString();r.log(">>>>>>"),r.log("["+o+" / "+s+"]","\n",e.url,"\n",e.qs,"\n",n.text),r.log("-----")})}function i(e,t,n){var i=this;return this._config.logVerbosity&&(e=e.use(r)),this._config.proxy&&this._modules.proxy&&(e=this._modules.proxy.call(this,e)),this._config.keepAlive&&this._modules.keepAlive&&(e=this._modules.keepAlive(e)),e.timeout(t.timeout).end(function(e,r){var s={};if(s.error=null!==e,s.operation=t.operation,r&&r.status&&(s.statusCode=r.status),e)return s.errorData=e,s.category=i._detectErrorCategory(e),n(s,null);var o=JSON.parse(r.text);return o.error&&1===o.error&&o.status&&o.message&&o.service?(s.errorData=o,s.statusCode=o.status,s.error=!0,s.category=i._detectErrorCategory(s),n(s,null)):n(s,o)})}function s(e,t,n){var r=c.default.get(this.getStandardOrigin()+t.url).query(e);return i.call(this,r,t,n)}function o(e,t,n,r){var s=c.default.post(this.getStandardOrigin()+n.url).query(e).send(t);return i.call(this,s,n,r)}function a(e,t,n){var r=c.default.delete(this.getStandardOrigin()+t.url).query(e);return i.call(this,r,t,n)}Object.defineProperty(t,"__esModule",{value:!0}),t.get=s,t.post=o,t.del=a;var u=n(42),c=function(e){return e&&e.__esModule?e:{default:e}}(u);n(5)},function(e,t,n){function r(){}function i(e){if(!b(e))return e;var t=[];for(var n in e)s(t,n,e[n]);return t.join("&")}function s(e,t,n){if(null!=n)if(Array.isArray(n))n.forEach(function(n){s(e,t,n)});else if(b(n))for(var r in n)s(e,t+"["+r+"]",n[r]);else e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));else null===n&&e.push(encodeURIComponent(t))}function o(e){for(var t,n,r={},i=e.split("&"),s=0,o=i.length;s<o;++s)t=i[s],n=t.indexOf("="),-1==n?r[decodeURIComponent(t)]="":r[decodeURIComponent(t.slice(0,n))]=decodeURIComponent(t.slice(n+1));return r}function a(e){var t,n,r,i,s=e.split(/\r?\n/),o={};s.pop();for(var a=0,u=s.length;a<u;++a)n=s[a],t=n.indexOf(":"),r=n.slice(0,t).toLowerCase(),i=_(n.slice(t+1)),o[r]=i;return o}function u(e){return/[\/+]json\b/.test(e)}function c(e){return e.split(/ *; */).shift()}function l(e){return e.split(/ *; */).reduce(function(e,t){var n=t.split(/ *= */),r=n.shift(),i=n.shift();return r&&i&&(e[r]=i),e},{})}function h(e,t){t=t||{},this.req=e,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this._setStatusProperties(this.xhr.status),this.header=this.headers=a(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function f(e,t){var n=this;this._query=this._query||[],this.method=e,this.url=t,this.header={},this._header={},this.on("end",function(){var e=null,t=null;try{t=new h(n)}catch(t){return e=new Error("Parser is unable to parse the response"),e.parse=!0,e.original=t,e.rawResponse=n.xhr&&n.xhr.responseText?n.xhr.responseText:null,e.statusCode=n.xhr&&n.xhr.status?n.xhr.status:null,n.callback(e)}n.emit("response",t);var r;try{(t.status<200||t.status>=300)&&(r=new Error(t.statusText||"Unsuccessful HTTP response"),r.original=e,r.response=t,r.status=t.status)}catch(e){r=e}r?n.callback(r,t):n.callback(null,t)})}function d(e,t){var n=v("DELETE",e);return t&&n.end(t),n}var p;"undefined"!=typeof window?p=window:"undefined"!=typeof self?p=self:(console.warn("Using browser-only version of superagent in non-browser environment"),p=this);var g=n(43),y=n(44),b=n(45),v=e.exports=n(46).bind(null,f);v.getXHR=function(){if(!(!p.XMLHttpRequest||p.location&&"file:"==p.location.protocol&&p.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}throw Error("Browser-only verison of superagent could not find XHR")};var _="".trim?function(e){return e.trim()}:function(e){return e.replace(/(^\s*|\s*$)/g,"")};v.serializeObject=i,v.parseString=o,v.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},v.serialize={"application/x-www-form-urlencoded":i,"application/json":JSON.stringify},v.parse={"application/x-www-form-urlencoded":o,"application/json":JSON.parse},h.prototype.get=function(e){return this.header[e.toLowerCase()]},h.prototype._setHeaderProperties=function(e){var t=this.header["content-type"]||"";this.type=c(t);var n=l(t);for(var r in n)this[r]=n[r]},h.prototype._parseBody=function(e){var t=v.parse[this.type];return!t&&u(this.type)&&(t=v.parse["application/json"]),t&&e&&(e.length||e instanceof Object)?t(e):null},h.prototype._setStatusProperties=function(e){1223===e&&(e=204);var t=e/100|0;this.status=this.statusCode=e,this.statusType=t,this.info=1==t,this.ok=2==t,this.clientError=4==t,this.serverError=5==t,this.error=(4==t||5==t)&&this.toError(),this.accepted=202==e,this.noContent=204==e,this.badRequest=400==e,this.unauthorized=401==e,this.notAcceptable=406==e,this.notFound=404==e,this.forbidden=403==e},h.prototype.toError=function(){var e=this.req,t=e.method,n=e.url,r="cannot "+t+" "+n+" ("+this.status+")",i=new Error(r);return i.status=this.status,i.method=t,i.url=n,i},v.Response=h,g(f.prototype);for(var m in y)f.prototype[m]=y[m];f.prototype.type=function(e){return this.set("Content-Type",v.types[e]||e),this},f.prototype.responseType=function(e){return this._responseType=e,this},f.prototype.accept=function(e){return this.set("Accept",v.types[e]||e),this},f.prototype.auth=function(e,t,n){switch(n||(n={type:"basic"}),n.type){case"basic":var r=btoa(e+":"+t);this.set("Authorization","Basic "+r);break;case"auto":this.username=e,this.password=t}return this},f.prototype.query=function(e){return"string"!=typeof e&&(e=i(e)),e&&this._query.push(e),this},f.prototype.attach=function(e,t,n){return this._getFormData().append(e,t,n||t.name),this},f.prototype._getFormData=function(){return this._formData||(this._formData=new p.FormData),this._formData},f.prototype.callback=function(e,t){var n=this._callback;this.clearTimeout(),n(e,t)},f.prototype.crossDomainError=function(){var e=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");e.crossDomain=!0,e.status=this.status,e.method=this.method,e.url=this.url,this.callback(e)},f.prototype._timeoutError=function(){var e=this._timeout,t=new Error("timeout of "+e+"ms exceeded");t.timeout=e,this.callback(t)},f.prototype._appendQueryString=function(){var e=this._query.join("&");e&&(this.url+=~this.url.indexOf("?")?"&"+e:"?"+e)},f.prototype.end=function(e){var t=this,n=this.xhr=v.getXHR(),i=this._timeout,s=this._formData||this._data;this._callback=e||r,n.onreadystatechange=function(){if(4==n.readyState){var e;try{e=n.status}catch(t){e=0}if(0==e){if(t.timedout)return t._timeoutError();if(t._aborted)return;return t.crossDomainError()}t.emit("end")}};var o=function(e,n){n.total>0&&(n.percent=n.loaded/n.total*100),n.direction=e,t.emit("progress",n)};if(this.hasListeners("progress"))try{n.onprogress=o.bind(null,"download"),n.upload&&(n.upload.onprogress=o.bind(null,"upload"))}catch(e){}if(i&&!this._timer&&(this._timer=setTimeout(function(){t.timedout=!0,t.abort()},i)),this._appendQueryString(),this.username&&this.password?n.open(this.method,this.url,!0,this.username,this.password):n.open(this.method,this.url,!0),this._withCredentials&&(n.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof s&&!this._isHost(s)){var a=this._header["content-type"],c=this._serializer||v.serialize[a?a.split(";")[0]:""];!c&&u(a)&&(c=v.serialize["application/json"]),c&&(s=c(s))}for(var l in this.header)null!=this.header[l]&&n.setRequestHeader(l,this.header[l]);return this._responseType&&(n.responseType=this._responseType),this.emit("request",this),n.send(void 0!==s?s:null),this},v.Request=f,v.get=function(e,t,n){var r=v("GET",e);return"function"==typeof t&&(n=t,t=null),t&&r.query(t),n&&r.end(n),r},v.head=function(e,t,n){var r=v("HEAD",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},v.options=function(e,t,n){var r=v("OPTIONS",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},v.del=d,v.delete=d,v.patch=function(e,t,n){var r=v("PATCH",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},v.post=function(e,t,n){var r=v("POST",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},v.put=function(e,t,n){var r=v("PUT",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r}},function(e,t,n){function r(e){if(e)return i(e)}function i(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},r.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var r,i=0;i<n.length;i++)if((r=n[i])===t||r.fn===t){n.splice(i,1);break}return this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks["$"+e];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,t)}return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},function(e,t,n){var r=n(45);t.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},t.parse=function(e){return this._parser=e,this},t.serialize=function(e){return this._serializer=e,this},t.timeout=function(e){return this._timeout=e,this},t.then=function(e,t){if(!this._fullfilledPromise){var n=this;this._fullfilledPromise=new Promise(function(e,t){n.end(function(n,r){n?t(n):e(r)})})}return this._fullfilledPromise.then(e,t)},t.catch=function(e){return this.then(void 0,e)},t.use=function(e){return e(this),this},t.get=function(e){return this._header[e.toLowerCase()]},t.getHeader=t.get,t.set=function(e,t){if(r(e)){for(var n in e)this.set(n,e[n]);return this}return this._header[e.toLowerCase()]=t,this.header[e]=t,this},t.unset=function(e){return delete this._header[e.toLowerCase()],delete this.header[e],this},t.field=function(e,t){if(null===e||void 0===e)throw new Error(".field(name, val) name can not be empty");if(r(e)){for(var n in e)this.field(n,e[n]);return this}if(null===t||void 0===t)throw new Error(".field(name, val) val can not be empty");return this._getFormData().append(e,t),this},t.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},t.withCredentials=function(){return this._withCredentials=!0,this},t.redirects=function(e){return this._maxRedirects=e,this},t.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},t._isHost=function(e){switch({}.toString.call(e)){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}},t.send=function(e){var t=r(e),n=this._header["content-type"];if(t&&r(this._data))for(var i in e)this._data[i]=e[i];else"string"==typeof e?(n||this.type("form"),n=this._header["content-type"],this._data="application/x-www-form-urlencoded"==n?this._data?this._data+"&"+e:e:(this._data||"")+e):this._data=e;return!t||this._isHost(e)?this:(n||this.type("json"),this)}},function(e,t){function n(e){return null!==e&&"object"==typeof e}e.exports=n},function(e,t){function n(e,t,n){return"function"==typeof n?new e("GET",t).end(n):2==arguments.length?new e("GET",t):new e(t,n)}e.exports=n}])});

/***/ }),
/* 381 */
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
],[133]);
//# sourceMappingURL=bundle.js.map