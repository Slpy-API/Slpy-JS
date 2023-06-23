import 'core-js/es/string/includes.js';
import 'core-js/es/array/includes.js';
import 'core-js/es/typed-array/includes.js'
import 'core-js/es/set/index.js';
import 'core-js/es/array/flat-map.js';
import 'core-js/es/array/find.js';
import 'core-js/es/array/from.js'
import 'core-js/es/typed-array/uint8-array.js';
import 'core-js/es/object/define-property.js';
import 'pepjs'
import 'classlist-polyfill'

if (typeof window.ResizeObserver === 'undefined') {
    /* Polyfill service v3.111.0
     * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
     * 
     * Features requested: ResizeObserver
     * 
     * - _ESAbstract.Call, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
     * - _ESAbstract.CreateMethodProperty, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
     * - Object.keys, License: MIT (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames")
     * - _ESAbstract.Get, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
     * - _ESAbstract.HasOwnProperty, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor")
     * - _ESAbstract.IsArray, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.IsCallable, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
     * - _ESAbstract.SameValueNonNumber, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes", "_ESAbstract.SameValueZero")
     * - _ESAbstract.ToBoolean, License: CC0 (required by "ResizeObserver", "WeakMap", "_ESAbstract.IteratorStep", "_ESAbstract.IteratorComplete")
     * - _ESAbstract.ToObject, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
     * - _ESAbstract.GetV, License: CC0 (required by "ResizeObserver", "WeakMap", "_ESAbstract.IteratorClose", "_ESAbstract.GetMethod")
     * - _ESAbstract.GetMethod, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive")
     * - _ESAbstract.Type, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
     * - _ESAbstract.GetPrototypeFromConstructor, License: CC0 (required by "ResizeObserver", "WeakMap", "_ESAbstract.OrdinaryCreateFromConstructor")
     * - _ESAbstract.OrdinaryCreateFromConstructor, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.IteratorClose, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.IteratorComplete, License: CC0 (required by "ResizeObserver", "WeakMap", "_ESAbstract.IteratorStep")
     * - _ESAbstract.IteratorNext, License: CC0 (required by "ResizeObserver", "WeakMap", "_ESAbstract.IteratorStep")
     * - _ESAbstract.IteratorStep, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.IteratorValue, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.OrdinaryToPrimitive, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive")
     * - _ESAbstract.SameValue, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - _ESAbstract.SameValueZero, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
     * - _ESAbstract.ToInteger, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes", "_ESAbstract.ToLength")
     * - _ESAbstract.ToLength, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
     * - _ESAbstract.ToPrimitive, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey", "_ESAbstract.ToString")
     * - _ESAbstract.ToString, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey")
     * - Array.prototype.includes, License: MIT (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyNames")
     * - Object.getOwnPropertyNames, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol")
     * - _ESAbstract.ToPropertyKey, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol", "Object.getOwnPropertyDescriptor")
     * - Object.getOwnPropertyDescriptor, License: CC0 (required by "ResizeObserver", "WeakMap", "Symbol")
     * - Symbol, License: MIT (required by "ResizeObserver", "WeakMap", "_ESAbstract.GetIterator", "Symbol.iterator")
     * - Symbol.iterator, License: MIT (required by "ResizeObserver", "WeakMap", "_ESAbstract.GetIterator")
     * - _ESAbstract.GetIterator, License: CC0 (required by "ResizeObserver", "WeakMap")
     * - Symbol.toStringTag, License: MIT (required by "ResizeObserver", "WeakMap")
     * - WeakMap, License: MIT (required by "ResizeObserver")
     * - ResizeObserver, License: Apache-2.0 */

    (function (self, undefined) {

        // _ESAbstract.Call
        /* global IsCallable */
        // 7.3.12. Call ( F, V [ , argumentsList ] )
        function Call(F, V /* [, argumentsList] */) { // eslint-disable-line no-unused-vars
            // 1. If argumentsList is not present, set argumentsList to a new empty List.
            var argumentsList = arguments.length > 2 ? arguments[2] : [];
            // 2. If IsCallable(F) is false, throw a TypeError exception.
            if (IsCallable(F) === false) {
                throw new TypeError(Object.prototype.toString.call(F) + 'is not a function.');
            }
            // 3. Return ? F.[[Call]](V, argumentsList).
            return F.apply(V, argumentsList);
        }

        // _ESAbstract.CreateMethodProperty
        // 7.3.5. CreateMethodProperty ( O, P, V )
        function CreateMethodProperty(O, P, V) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(O) is Object.
            // 2. Assert: IsPropertyKey(P) is true.
            // 3. Let newDesc be the PropertyDescriptor{[[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}.
            var newDesc = {
                value: V,
                writable: true,
                enumerable: false,
                configurable: true
            };
            // 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
            Object.defineProperty(O, P, newDesc);
        }

        // Object.keys
        /* global CreateMethodProperty */
        CreateMethodProperty(Object, "keys", (function () {
            'use strict';

            // modified from https://github.com/es-shims/object-keys

            var has = Object.prototype.hasOwnProperty;
            var toStr = Object.prototype.toString;
            var isEnumerable = Object.prototype.propertyIsEnumerable;
            var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
            var hasPrototypeEnumBug = isEnumerable.call(function () { }, 'prototype');
            function hasProtoEnumBug() {
                // Object.create polyfill creates an enumerable __proto__
                var createdObj;
                try {
                    createdObj = Object.create({});
                } catch (e) {
                    // If this fails the polyfil isn't loaded yet, but will be.
                    // Can't add it to depedencies because of it would create a circular depedency.
                    return true;
                }

                return isEnumerable.call(createdObj, '__proto__')
            }

            var dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];
            var equalsConstructorPrototype = function (o) {
                var ctor = o.constructor;
                return ctor && ctor.prototype === o;
            };
            var excludedKeys = {
                $console: true,
                $external: true,
                $frame: true,
                $frameElement: true,
                $frames: true,
                $innerHeight: true,
                $innerWidth: true,
                $outerHeight: true,
                $outerWidth: true,
                $pageXOffset: true,
                $pageYOffset: true,
                $parent: true,
                $scrollLeft: true,
                $scrollTop: true,
                $scrollX: true,
                $scrollY: true,
                $self: true,
                $webkitIndexedDB: true,
                $webkitStorageInfo: true,
                $window: true
            };
            var hasAutomationEqualityBug = (function () {
                if (typeof window === 'undefined') { return false; }
                for (var k in window) {
                    try {
                        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                            try {
                                equalsConstructorPrototype(window[k]);
                            } catch (e) {
                                return true;
                            }
                        }
                    } catch (e) {
                        return true;
                    }
                }
                return false;
            }());
            var equalsConstructorPrototypeIfNotBuggy = function (o) {
                if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
                    return equalsConstructorPrototype(o);
                }
                try {
                    return equalsConstructorPrototype(o);
                } catch (e) {
                    return false;
                }
            };

            function isArgumentsObject(value) {
                var str = toStr.call(value);
                var isArgs = str === '[object Arguments]';
                if (!isArgs) {
                    isArgs = str !== '[object Array]' &&
                        value !== null &&
                        typeof value === 'object' &&
                        typeof value.length === 'number' &&
                        value.length >= 0 &&
                        toStr.call(value.callee) === '[object Function]';
                }
                return isArgs;
            }

            return function keys(object) {
                var isFunction = toStr.call(object) === '[object Function]';
                var isArguments = isArgumentsObject(object);
                var isString = toStr.call(object) === '[object String]';
                var theKeys = [];

                if (object === undefined || object === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var skipPrototype = hasPrototypeEnumBug && isFunction;
                if (isString && object.length > 0 && !has.call(object, 0)) {
                    for (var i = 0; i < object.length; ++i) {
                        theKeys.push(String(i));
                    }
                }

                if (isArguments && object.length > 0) {
                    for (var j = 0; j < object.length; ++j) {
                        theKeys.push(String(j));
                    }
                } else {
                    for (var name in object) {
                        if (!(hasProtoEnumBug() && name === '__proto__') && !(skipPrototype && name === 'prototype') && has.call(object, name)) {
                            theKeys.push(String(name));
                        }
                    }
                }

                if (hasDontEnumBug) {
                    var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

                    for (var k = 0; k < dontEnums.length; ++k) {
                        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                            theKeys.push(dontEnums[k]);
                        }
                    }
                }
                return theKeys;
            };
        }()));

        // _ESAbstract.Get
        // 7.3.1. Get ( O, P )
        function Get(O, P) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(O) is Object.
            // 2. Assert: IsPropertyKey(P) is true.
            // 3. Return ? O.[[Get]](P, O).
            return O[P];
        }

        // _ESAbstract.HasOwnProperty
        // 7.3.11 HasOwnProperty (O, P)
        function HasOwnProperty(o, p) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(O) is Object.
            // 2. Assert: IsPropertyKey(P) is true.
            // 3. Let desc be ? O.[[GetOwnProperty]](P).
            // 4. If desc is undefined, return false.
            // 5. Return true.
            // Polyfill.io - As we expect user agents to support ES3 fully we can skip the above steps and use Object.prototype.hasOwnProperty to do them for us.
            return Object.prototype.hasOwnProperty.call(o, p);
        }

        // _ESAbstract.IsArray
        // 7.2.2. IsArray ( argument )
        function IsArray(argument) { // eslint-disable-line no-unused-vars
            // 1. If Type(argument) is not Object, return false.
            // 2. If argument is an Array exotic object, return true.
            // 3. If argument is a Proxy exotic object, then
            // a. If argument.[[ProxyHandler]] is null, throw a TypeError exception.
            // b. Let target be argument.[[ProxyTarget]].
            // c. Return ? IsArray(target).
            // 4. Return false.

            // Polyfill.io - We can skip all the above steps and check the string returned from Object.prototype.toString().
            return Object.prototype.toString.call(argument) === '[object Array]';
        }

        // _ESAbstract.IsCallable
        // 7.2.3. IsCallable ( argument )
        function IsCallable(argument) { // eslint-disable-line no-unused-vars
            // 1. If Type(argument) is not Object, return false.
            // 2. If argument has a [[Call]] internal method, return true.
            // 3. Return false.

            // Polyfill.io - Only function objects have a [[Call]] internal method. This means we can simplify this function to check that the argument has a type of function.
            return typeof argument === 'function';
        }

        // _ESAbstract.SameValueNonNumber
        // 7.2.12. SameValueNonNumber ( x, y )
        function SameValueNonNumber(x, y) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(x) is not Number.
            // 2. Assert: Type(x) is the same as Type(y).
            // 3. If Type(x) is Undefined, return true.
            // 4. If Type(x) is Null, return true.
            // 5. If Type(x) is String, then
            // a. If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return true; otherwise, return false.
            // 6. If Type(x) is Boolean, then
            // a. If x and y are both true or both false, return true; otherwise, return false.
            // 7. If Type(x) is Symbol, then
            // a. If x and y are both the same Symbol value, return true; otherwise, return false.
            // 8. If x and y are the same Object value, return true. Otherwise, return false.

            // Polyfill.io - We can skip all above steps because the === operator does it all for us.
            return x === y;
        }

        // _ESAbstract.ToBoolean
        // 7.1.2. ToBoolean ( argument )
        // The abstract operation ToBoolean converts argument to a value of type Boolean according to Table 9:
        /*
        --------------------------------------------------------------------------------------------------------------
        | Argument Type | Result                                                                                     |
        --------------------------------------------------------------------------------------------------------------
        | Undefined     | Return false.                                                                              |
        | Null          | Return false.                                                                              |
        | Boolean       | Return argument.                                                                           |
        | Number        | If argument is +0, -0, or NaN, return false; otherwise return true.                        |
        | String        | If argument is the empty String (its length is zero), return false; otherwise return true. |
        | Symbol        | Return true.                                                                               |
        | Object        | Return true.                                                                               |
        --------------------------------------------------------------------------------------------------------------
        */
        function ToBoolean(argument) { // eslint-disable-line no-unused-vars
            return Boolean(argument);
        }

        // _ESAbstract.ToObject
        // 7.1.13 ToObject ( argument )
        // The abstract operation ToObject converts argument to a value of type Object according to Table 12:
        // Table 12: ToObject Conversions
        /*
        |----------------------------------------------------------------------------------------------------------------------------------------------------|
        | Argument Type | Result                                                                                                                             |
        |----------------------------------------------------------------------------------------------------------------------------------------------------|
        | Undefined     | Throw a TypeError exception.                                                                                                       |
        | Null          | Throw a TypeError exception.                                                                                                       |
        | Boolean       | Return a new Boolean object whose [[BooleanData]] internal slot is set to argument. See 19.3 for a description of Boolean objects. |
        | Number        | Return a new Number object whose [[NumberData]] internal slot is set to argument. See 20.1 for a description of Number objects.    |
        | String        | Return a new String object whose [[StringData]] internal slot is set to argument. See 21.1 for a description of String objects.    |
        | Symbol        | Return a new Symbol object whose [[SymbolData]] internal slot is set to argument. See 19.4 for a description of Symbol objects.    |
        | Object        | Return argument.                                                                                                                   |
        |----------------------------------------------------------------------------------------------------------------------------------------------------|
        */
        function ToObject(argument) { // eslint-disable-line no-unused-vars
            if (argument === null || argument === undefined) {
                throw TypeError();
            }
            return Object(argument);
        }

        // _ESAbstract.GetV
        /* global ToObject */
        // 7.3.2 GetV (V, P)
        function GetV(v, p) { // eslint-disable-line no-unused-vars
            // 1. Assert: IsPropertyKey(P) is true.
            // 2. Let O be ? ToObject(V).
            var o = ToObject(v);
            // 3. Return ? O.[[Get]](P, V).
            return o[p];
        }

        // _ESAbstract.GetMethod
        /* global GetV, IsCallable */
        // 7.3.9. GetMethod ( V, P )
        function GetMethod(V, P) { // eslint-disable-line no-unused-vars
            // 1. Assert: IsPropertyKey(P) is true.
            // 2. Let func be ? GetV(V, P).
            var func = GetV(V, P);
            // 3. If func is either undefined or null, return undefined.
            if (func === null || func === undefined) {
                return undefined;
            }
            // 4. If IsCallable(func) is false, throw a TypeError exception.
            if (IsCallable(func) === false) {
                throw new TypeError('Method not callable: ' + P);
            }
            // 5. Return func.
            return func;
        }

        // _ESAbstract.Type
        // "Type(x)" is used as shorthand for "the type of x"...
        function Type(x) { // eslint-disable-line no-unused-vars
            switch (typeof x) {
                case 'undefined':
                    return 'undefined';
                case 'boolean':
                    return 'boolean';
                case 'number':
                    return 'number';
                case 'string':
                    return 'string';
                case 'symbol':
                    return 'symbol';
                default:
                    // typeof null is 'object'
                    if (x === null) return 'null';
                    // Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
                    if ('Symbol' in self && (x instanceof self.Symbol || x.constructor === self.Symbol)) return 'symbol';

                    return 'object';
            }
        }

        // _ESAbstract.GetPrototypeFromConstructor
        /* global Get, Type */
        // 9.1.14. GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
        function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
            // 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
            // 2. Assert: IsCallable(constructor) is true.
            // 3. Let proto be ? Get(constructor, "prototype").
            var proto = Get(constructor, "prototype");
            // 4. If Type(proto) is not Object, then
            if (Type(proto) !== 'object') {
                // a. Let realm be ? GetFunctionRealm(constructor).
                // b. Set proto to realm's intrinsic object named intrinsicDefaultProto.
                proto = intrinsicDefaultProto;
            }
            // 5. Return proto.
            return proto;
        }

        // _ESAbstract.OrdinaryCreateFromConstructor
        /* global GetPrototypeFromConstructor */
        // 9.1.13. OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
        function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
            var internalSlotsList = arguments[2] || {};
            // 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
            // The corresponding object must be an intrinsic that is intended to be used as the[[Prototype]] value of an object.

            // 2. Let proto be ? GetPrototypeFromConstructor(constructor, intrinsicDefaultProto).
            var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

            // 3. Return ObjectCreate(proto, internalSlotsList).
            // Polyfill.io - We do not pass internalSlotsList to Object.create because Object.create does not use the default ordinary object definitions specified in 9.1.
            var obj = Object.create(proto);
            for (var name in internalSlotsList) {
                if (Object.prototype.hasOwnProperty.call(internalSlotsList, name)) {
                    Object.defineProperty(obj, name, {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: internalSlotsList[name]
                    });
                }
            }
            return obj;
        }

        // _ESAbstract.IteratorClose
        /* global GetMethod, Type, Call */
        // 7.4.6. IteratorClose ( iteratorRecord, completion )
        function IteratorClose(iteratorRecord, completion) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(iteratorRecord.[[Iterator]]) is Object.
            if (Type(iteratorRecord['[[Iterator]]']) !== 'object') {
                throw new Error(Object.prototype.toString.call(iteratorRecord['[[Iterator]]']) + 'is not an Object.');
            }
            // 2. Assert: completion is a Completion Record.
            // Polyfill.io - Ignoring this step as there is no way to check if something is a Completion Record in userland JavaScript.

            // 3. Let iterator be iteratorRecord.[[Iterator]].
            var iterator = iteratorRecord['[[Iterator]]'];
            // 4. Let return be ? GetMethod(iterator, "return").
            // Polyfill.io - We name it  returnMethod because return is a keyword and can not be used as an identifier (E.G. variable name, function name etc).
            var returnMethod = GetMethod(iterator, "return");
            // 5. If return is undefined, return Completion(completion).
            if (returnMethod === undefined) {
                return completion;
            }
            // 6. Let innerResult be Call(return, iterator, « »).
            try {
                var innerResult = Call(returnMethod, iterator);
            } catch (error) {
                var innerException = error;
            }
            // 7. If completion.[[Type]] is throw, return Completion(completion).
            if (completion) {
                return completion;
            }
            // 8. If innerResult.[[Type]] is throw, return Completion(innerResult).
            if (innerException) {
                throw innerException;
            }
            // 9. If Type(innerResult.[[Value]]) is not Object, throw a TypeError exception.
            if (Type(innerResult) !== 'object') {
                throw new TypeError("Iterator's return method returned a non-object.");
            }
            // 10. Return Completion(completion).
            return completion;
        }

        // _ESAbstract.IteratorComplete
        /* global Type, ToBoolean, Get */
        // 7.4.3 IteratorComplete ( iterResult )
        function IteratorComplete(iterResult) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(iterResult) is Object.
            if (Type(iterResult) !== 'object') {
                throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
            }
            // 2. Return ToBoolean(? Get(iterResult, "done")).
            return ToBoolean(Get(iterResult, "done"));
        }

        // _ESAbstract.IteratorNext
        /* global Call, Type */
        // 7.4.2. IteratorNext ( iteratorRecord [ , value ] )
        function IteratorNext(iteratorRecord /* [, value] */) { // eslint-disable-line no-unused-vars
            // 1. If value is not present, then
            if (arguments.length < 2) {
                // a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « »).
                var result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]']);
                // 2. Else,
            } else {
                // a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « value »).
                result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]'], [arguments[1]]);
            }
            // 3. If Type(result) is not Object, throw a TypeError exception.
            if (Type(result) !== 'object') {
                throw new TypeError('bad iterator');
            }
            // 4. Return result.
            return result;
        }

        // _ESAbstract.IteratorStep
        /* global IteratorNext, IteratorComplete */
        // 7.4.5. IteratorStep ( iteratorRecord )
        function IteratorStep(iteratorRecord) { // eslint-disable-line no-unused-vars
            // 1. Let result be ? IteratorNext(iteratorRecord).
            var result = IteratorNext(iteratorRecord);
            // 2. Let done be ? IteratorComplete(result).
            var done = IteratorComplete(result);
            // 3. If done is true, return false.
            if (done === true) {
                return false;
            }
            // 4. Return result.
            return result;
        }

        // _ESAbstract.IteratorValue
        /* global Type, Get */
        // 7.4.4 IteratorValue ( iterResult )
        function IteratorValue(iterResult) { // eslint-disable-line no-unused-vars
            // Assert: Type(iterResult) is Object.
            if (Type(iterResult) !== 'object') {
                throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
            }
            // Return ? Get(iterResult, "value").
            return Get(iterResult, "value");
        }

        // _ESAbstract.OrdinaryToPrimitive
        /* global Get, IsCallable, Call, Type */
        // 7.1.1.1. OrdinaryToPrimitive ( O, hint )
        function OrdinaryToPrimitive(O, hint) { // eslint-disable-line no-unused-vars
            // 1. Assert: Type(O) is Object.
            // 2. Assert: Type(hint) is String and its value is either "string" or "number".
            // 3. If hint is "string", then
            if (hint === 'string') {
                // a. Let methodNames be « "toString", "valueOf" ».
                var methodNames = ['toString', 'valueOf'];
                // 4. Else,
            } else {
                // a. Let methodNames be « "valueOf", "toString" ».
                methodNames = ['valueOf', 'toString'];
            }
            // 5. For each name in methodNames in List order, do
            for (var i = 0; i < methodNames.length; ++i) {
                var name = methodNames[i];
                // a. Let method be ? Get(O, name).
                var method = Get(O, name);
                // b. If IsCallable(method) is true, then
                if (IsCallable(method)) {
                    // i. Let result be ? Call(method, O).
                    var result = Call(method, O);
                    // ii. If Type(result) is not Object, return result.
                    if (Type(result) !== 'object') {
                        return result;
                    }
                }
            }
            // 6. Throw a TypeError exception.
            throw new TypeError('Cannot convert to primitive.');
        }

        // _ESAbstract.SameValue
        /* global Type, SameValueNonNumber */
        // 7.2.10. SameValue ( x, y )
        function SameValue(x, y) { // eslint-disable-line no-unused-vars
            // 1. If Type(x) is different from Type(y), return false.
            if (Type(x) !== Type(y)) {
                return false;
            }
            // 2. If Type(x) is Number, then
            if (Type(x) === 'number') {
                // a. If x is NaN and y is NaN, return true.
                if (isNaN(x) && isNaN(y)) {
                    return true;
                }
                // Polyfill.io - 0 === -0 is true, but they are not the same value.
                // b. If x is +0 and y is -0, return false.
                // c. If x is -0 and y is +0, return false.
                if (x === 0 && y === 0 && 1 / x !== 1 / y) {
                    return false;
                }
                // d. If x is the same Number value as y, return true.
                if (x === y) {
                    return true;
                }
                // e. Return false.
                return false;
            }
            // 3. Return SameValueNonNumber(x, y).
            return SameValueNonNumber(x, y);
        }

        // _ESAbstract.SameValueZero
        /* global Type, SameValueNonNumber */
        // 7.2.11. SameValueZero ( x, y )
        function SameValueZero(x, y) { // eslint-disable-line no-unused-vars
            // 1. If Type(x) is different from Type(y), return false.
            if (Type(x) !== Type(y)) {
                return false;
            }
            // 2. If Type(x) is Number, then
            if (Type(x) === 'number') {
                // a. If x is NaN and y is NaN, return true.
                if (isNaN(x) && isNaN(y)) {
                    return true;
                }
                // b. If x is +0 and y is -0, return true.
                if (1 / x === Infinity && 1 / y === -Infinity) {
                    return true;
                }
                // c. If x is -0 and y is +0, return true.
                if (1 / x === -Infinity && 1 / y === Infinity) {
                    return true;
                }
                // d. If x is the same Number value as y, return true.
                if (x === y) {
                    return true;
                }
                // e. Return false.
                return false;
            }
            // 3. Return SameValueNonNumber(x, y).
            return SameValueNonNumber(x, y);
        }

        // _ESAbstract.ToInteger
        /* global Type */
        // 7.1.4. ToInteger ( argument )
        function ToInteger(argument) { // eslint-disable-line no-unused-vars
            if (Type(argument) === 'symbol') {
                throw new TypeError('Cannot convert a Symbol value to a number');
            }

            // 1. Let number be ? ToNumber(argument).
            var number = Number(argument);
            // 2. If number is NaN, return +0.
            if (isNaN(number)) {
                return 0;
            }
            // 3. If number is +0, -0, +∞, or -∞, return number.
            if (1 / number === Infinity || 1 / number === -Infinity || number === Infinity || number === -Infinity) {
                return number;
            }
            // 4. Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
            return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
        }

        // _ESAbstract.ToLength
        /* global ToInteger */
        // 7.1.15. ToLength ( argument )
        function ToLength(argument) { // eslint-disable-line no-unused-vars
            // 1. Let len be ? ToInteger(argument).
            var len = ToInteger(argument);
            // 2. If len ≤ +0, return +0.
            if (len <= 0) {
                return 0;
            }
            // 3. Return min(len, 253-1).
            return Math.min(len, Math.pow(2, 53) - 1);
        }

        // _ESAbstract.ToPrimitive
        /* global Type, GetMethod, Call, OrdinaryToPrimitive */
        // 7.1.1. ToPrimitive ( input [ , PreferredType ] )
        function ToPrimitive(input /* [, PreferredType] */) { // eslint-disable-line no-unused-vars
            var PreferredType = arguments.length > 1 ? arguments[1] : undefined;
            // 1. Assert: input is an ECMAScript language value.
            // 2. If Type(input) is Object, then
            if (Type(input) === 'object') {
                // a. If PreferredType is not present, let hint be "default".
                if (arguments.length < 2) {
                    var hint = 'default';
                    // b. Else if PreferredType is hint String, let hint be "string".
                } else if (PreferredType === String) {
                    hint = 'string';
                    // c. Else PreferredType is hint Number, let hint be "number".
                } else if (PreferredType === Number) {
                    hint = 'number';
                }
                // d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
                var exoticToPrim = typeof self.Symbol === 'function' && typeof self.Symbol.toPrimitive === 'symbol' ? GetMethod(input, self.Symbol.toPrimitive) : undefined;
                // e. If exoticToPrim is not undefined, then
                if (exoticToPrim !== undefined) {
                    // i. Let result be ? Call(exoticToPrim, input, « hint »).
                    var result = Call(exoticToPrim, input, [hint]);
                    // ii. If Type(result) is not Object, return result.
                    if (Type(result) !== 'object') {
                        return result;
                    }
                    // iii. Throw a TypeError exception.
                    throw new TypeError('Cannot convert exotic object to primitive.');
                }
                // f. If hint is "default", set hint to "number".
                if (hint === 'default') {
                    hint = 'number';
                }
                // g. Return ? OrdinaryToPrimitive(input, hint).
                return OrdinaryToPrimitive(input, hint);
            }
            // 3. Return input
            return input;
        }

        // _ESAbstract.ToString
        /* global Type, ToPrimitive */
        // 7.1.12. ToString ( argument )
        // The abstract operation ToString converts argument to a value of type String according to Table 11:
        // Table 11: ToString Conversions
        /*
        |---------------|--------------------------------------------------------|
        | Argument Type | Result                                                 |
        |---------------|--------------------------------------------------------|
        | Undefined     | Return "undefined".                                    |
        |---------------|--------------------------------------------------------|
        | Null	        | Return "null".                                         |
        |---------------|--------------------------------------------------------|
        | Boolean       | If argument is true, return "true".                    |
        |               | If argument is false, return "false".                  |
        |---------------|--------------------------------------------------------|
        | Number        | Return NumberToString(argument).                       |
        |---------------|--------------------------------------------------------|
        | String        | Return argument.                                       |
        |---------------|--------------------------------------------------------|
        | Symbol        | Throw a TypeError exception.                           |
        |---------------|--------------------------------------------------------|
        | Object        | Apply the following steps:                             |
        |               | Let primValue be ? ToPrimitive(argument, hint String). |
        |               | Return ? ToString(primValue).                          |
        |---------------|--------------------------------------------------------|
        */
        function ToString(argument) { // eslint-disable-line no-unused-vars
            switch (Type(argument)) {
                case 'symbol':
                    throw new TypeError('Cannot convert a Symbol value to a string');
                case 'object':
                    var primValue = ToPrimitive(argument, String);
                    return ToString(primValue); // eslint-disable-line no-unused-vars
                default:
                    return String(argument);
            }
        }

        // Array.prototype.includes
        /* global CreateMethodProperty, Get, SameValueZero, ToInteger, ToLength, ToObject, ToString */
        // 22.1.3.11. Array.prototype.includes ( searchElement [ , fromIndex ] )
        CreateMethodProperty(Array.prototype, 'includes', function includes(searchElement /* [ , fromIndex ] */) {
            'use strict';
            // 1. Let O be ? ToObject(this value).
            var O = ToObject(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = ToLength(Get(O, "length"));
            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
            var n = ToInteger(arguments[1]);
            // 5. If n ≥ 0, then
            if (n >= 0) {
                // a. Let k be n.
                var k = n;
                // 6. Else n < 0,
            } else {
                // a. Let k be len + n.
                k = len + n;
                // b. If k < 0, let k be 0.
                if (k < 0) {
                    k = 0;
                }
            }
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                var elementK = Get(O, ToString(k));
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (SameValueZero(searchElement, elementK)) {
                    return true;
                }
                // c. Increase k by 1.
                k = k + 1;
            }
            // 8. Return false.
            return false;
        });

        // Object.getOwnPropertyNames
        /* global CreateMethodProperty, ToObject */
        (function () {
            var toString = {}.toString;
            var split = "".split;
            var concat = [].concat;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var nativeGetOwnPropertyNames = Object.getOwnPropertyNames || Object.keys;
            var cachedWindowNames =
                typeof self === "object" ? nativeGetOwnPropertyNames(self) : [];

            // 19.1.2.10 Object.getOwnPropertyNames ( O )
            CreateMethodProperty(
                Object,
                "getOwnPropertyNames",
                function getOwnPropertyNames(O) {
                    var object = ToObject(O);

                    if (toString.call(object) === "[object Window]") {
                        try {
                            return nativeGetOwnPropertyNames(object);
                        } catch (e) {
                            // IE bug where layout engine calls userland Object.getOwnPropertyNames for cross-domain `window` objects
                            return concat.call([], cachedWindowNames);
                        }
                    }

                    // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
                    object =
                        toString.call(object) == "[object String]"
                            ? split.call(object, "")
                            : Object(object);

                    var result = nativeGetOwnPropertyNames(object);
                    var extraNonEnumerableKeys = ["length", "prototype"];
                    for (var i = 0; i < extraNonEnumerableKeys.length; i++) {
                        var key = extraNonEnumerableKeys[i];
                        if (hasOwnProperty.call(object, key) && !result.includes(key)) {
                            result.push(key);
                        }
                    }

                    if (result.includes("__proto__")) {
                        var index = result.indexOf("__proto__");
                        result.splice(index, 1);
                    }

                    return result;
                }
            );
        })();

        // _ESAbstract.ToPropertyKey
        /* globals ToPrimitive, Type, ToString */
        // 7.1.14. ToPropertyKey ( argument )
        function ToPropertyKey(argument) { // eslint-disable-line no-unused-vars
            // 1. Let key be ? ToPrimitive(argument, hint String).
            var key = ToPrimitive(argument, String);
            // 2. If Type(key) is Symbol, then
            if (Type(key) === 'symbol') {
                // a. Return key.
                return key;
            }
            // 3. Return ! ToString(key).
            return ToString(key);
        }

        // Object.getOwnPropertyDescriptor
        /* global CreateMethodProperty, ToObject, ToPropertyKey, HasOwnProperty, Type */
        (function () {
            var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

            var supportsDOMDescriptors = (function () {
                try {
                    return Object.defineProperty(document.createElement('div'), 'one', {
                        get: function () {
                            return 1;
                        }
                    }).one === 1;
                } catch (e) {
                    return false;
                }
            });

            var toString = ({}).toString;
            var split = ''.split;

            // 19.1.2.8 Object.getOwnPropertyDescriptor ( O, P )
            CreateMethodProperty(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(O, P) {
                // 1. Let obj be ? ToObject(O).
                var obj = ToObject(O);
                // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
                obj = (Type(obj) === 'string' || obj instanceof String) && toString.call(O) == '[object String]' ? split.call(O, '') : Object(O);

                // 2. Let key be ? ToPropertyKey(P).
                var key = ToPropertyKey(P);

                // 3. Let desc be ? obj.[[GetOwnProperty]](key).
                // 4. Return FromPropertyDescriptor(desc).
                // Polyfill.io Internet Explorer 8 natively supports property descriptors only on DOM objects.
                // We will fallback to the polyfill implementation if the native implementation throws an error.
                if (supportsDOMDescriptors) {
                    try {
                        return nativeGetOwnPropertyDescriptor(obj, key);
                        // eslint-disable-next-line no-empty
                    } catch (error) { }
                }
                if (HasOwnProperty(obj, key)) {
                    return {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: obj[key]
                    };
                }
            });
        }());

        // Symbol
        // A modification of https://github.com/WebReflection/get-own-property-symbols
        // (C) Andrea Giammarchi - MIT Licensed

        /* global Type */
        (function (Object, GOPS, global) {
            'use strict'; //so that ({}).toString.call(null) returns the correct [object Null] rather than [object Window]

            var supportsGetters = (function () {
                // supports getters
                try {
                    var a = {};
                    Object.defineProperty(a, "t", {
                        configurable: true,
                        enumerable: false,
                        get: function () {
                            return true;
                        },
                        set: undefined
                    });
                    return !!a.t;
                } catch (e) {
                    return false;
                }
            }());

            var setDescriptor;
            var id = 0;
            var random = '' + Math.random();
            var prefix = '__\x01symbol:';
            var prefixLength = prefix.length;
            var internalSymbol = '__\x01symbol@@' + random;
            var emptySymbolLookup = {};
            var DP = 'defineProperty';
            var DPies = 'defineProperties';
            var GOPN = 'getOwnPropertyNames';
            var GOPD = 'getOwnPropertyDescriptor';
            var PIE = 'propertyIsEnumerable';
            var ObjectProto = Object.prototype;
            var hOP = ObjectProto.hasOwnProperty;
            var pIE = ObjectProto[PIE];
            var toString = ObjectProto.toString;
            var concat = Array.prototype.concat;
            var cachedWindowNames = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(self) : [];
            var nGOPN = Object[GOPN];
            var gOPN = function getOwnPropertyNames(obj) {
                if (toString.call(obj) === '[object Window]') {
                    try {
                        return nGOPN(obj);
                    } catch (e) {
                        // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
                        return concat.call([], cachedWindowNames);
                    }
                }
                return nGOPN(obj);
            };
            var gOPD = Object[GOPD];
            var objectCreate = Object.create;
            var objectKeys = Object.keys;
            var freeze = Object.freeze || Object;
            var objectDefineProperty = Object[DP];
            var $defineProperties = Object[DPies];
            var descriptor = gOPD(Object, GOPN);
            var addInternalIfNeeded = function (o, uid, enumerable) {
                if (!hOP.call(o, internalSymbol)) {
                    try {
                        objectDefineProperty(o, internalSymbol, {
                            enumerable: false,
                            configurable: false,
                            writable: false,
                            value: {}
                        });
                    } catch (e) {
                        o[internalSymbol] = {};
                    }
                }
                o[internalSymbol]['@@' + uid] = enumerable;
            };
            var createWithSymbols = function (proto, descriptors) {
                var self = objectCreate(proto);
                gOPN(descriptors).forEach(function (key) {
                    if (propertyIsEnumerable.call(descriptors, key)) {
                        $defineProperty(self, key, descriptors[key]);
                    }
                });
                return self;
            };
            var copyAsNonEnumerable = function (descriptor) {
                var newDescriptor = objectCreate(descriptor);
                newDescriptor.enumerable = false;
                return newDescriptor;
            };
            var get = function get() { };
            var onlyNonSymbols = function (name) {
                return name != internalSymbol &&
                    !hOP.call(source, name);
            };
            var onlySymbols = function (name) {
                return name != internalSymbol &&
                    hOP.call(source, name);
            };
            var propertyIsEnumerable = function propertyIsEnumerable(key) {
                var uid = '' + key;
                return onlySymbols(uid) ? (
                    hOP.call(this, uid) &&
                    this[internalSymbol] && this[internalSymbol]['@@' + uid]
                ) : pIE.call(this, key);
            };
            var setAndGetSymbol = function (uid) {
                var descriptor = {
                    enumerable: false,
                    configurable: true,
                    get: get,
                    set: function (value) {
                        setDescriptor(this, uid, {
                            enumerable: false,
                            configurable: true,
                            writable: true,
                            value: value
                        });
                        addInternalIfNeeded(this, uid, true);
                    }
                };
                try {
                    objectDefineProperty(ObjectProto, uid, descriptor);
                } catch (e) {
                    ObjectProto[uid] = descriptor.value;
                }
                source[uid] = objectDefineProperty(
                    Object(uid),
                    'constructor',
                    sourceConstructor
                );
                var description = gOPD(Symbol.prototype, 'description');
                if (description) {
                    objectDefineProperty(
                        source[uid],
                        'description',
                        description
                    );
                }
                return freeze(source[uid]);
            };

            var symbolDescription = function (s) {
                var sym = thisSymbolValue(s);

                // 3. Return sym.[[Description]].
                if (supportsInferredNames) {
                    var name = getInferredName(sym);
                    if (name !== "") {
                        return name.slice(1, -1); // name.slice('['.length, -']'.length);
                    }
                }

                if (emptySymbolLookup[sym] !== undefined) {
                    return emptySymbolLookup[sym];
                }

                var string = sym.toString();
                var randomStartIndex = string.lastIndexOf("0.");
                string = string.slice(10, randomStartIndex);

                if (string === "") {
                    return undefined;
                }
                return string;
            };

            var Symbol = function Symbol() {
                var description = arguments[0];
                if (this instanceof Symbol) {
                    throw new TypeError('Symbol is not a constructor');
                }

                var uid = prefix.concat(description || '', random, ++id);

                if (description !== undefined && (description === null || isNaN(description) || String(description) === "")) {
                    emptySymbolLookup[uid] = String(description);
                }

                var that = setAndGetSymbol(uid);

                if (!supportsGetters) {
                    Object.defineProperty(that, "description", {
                        configurable: true,
                        enumerable: false,
                        value: symbolDescription(that)
                    });
                }

                return that;
            };

            var source = objectCreate(null);
            var sourceConstructor = { value: Symbol };
            var sourceMap = function (uid) {
                return source[uid];
            };
            var $defineProperty = function defineProperty(o, key, descriptor) {
                var uid = '' + key;
                if (onlySymbols(uid)) {
                    setDescriptor(o, uid, descriptor.enumerable ?
                        copyAsNonEnumerable(descriptor) : descriptor);
                    addInternalIfNeeded(o, uid, !!descriptor.enumerable);
                } else {
                    objectDefineProperty(o, key, descriptor);
                }
                return o;
            };

            var onlyInternalSymbols = function (obj) {
                return function (name) {
                    return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
                };
            };
            var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
                return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
            }
                ;

            descriptor.value = $defineProperty;
            objectDefineProperty(Object, DP, descriptor);

            descriptor.value = $getOwnPropertySymbols;
            objectDefineProperty(Object, GOPS, descriptor);

            descriptor.value = function getOwnPropertyNames(o) {
                return gOPN(o).filter(onlyNonSymbols);
            };
            objectDefineProperty(Object, GOPN, descriptor);

            descriptor.value = function defineProperties(o, descriptors) {
                var symbols = $getOwnPropertySymbols(descriptors);
                if (symbols.length) {
                    objectKeys(descriptors).concat(symbols).forEach(function (uid) {
                        if (propertyIsEnumerable.call(descriptors, uid)) {
                            $defineProperty(o, uid, descriptors[uid]);
                        }
                    });
                } else {
                    $defineProperties(o, descriptors);
                }
                return o;
            };
            objectDefineProperty(Object, DPies, descriptor);

            descriptor.value = propertyIsEnumerable;
            objectDefineProperty(ObjectProto, PIE, descriptor);

            descriptor.value = Symbol;
            objectDefineProperty(global, 'Symbol', descriptor);

            // defining `Symbol.for(key)`
            descriptor.value = function (key) {
                var uid = prefix.concat(prefix, key, random);
                return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
            };
            objectDefineProperty(Symbol, 'for', descriptor);

            // defining `Symbol.keyFor(symbol)`
            descriptor.value = function (symbol) {
                if (onlyNonSymbols(symbol))
                    throw new TypeError(symbol + ' is not a symbol');
                return hOP.call(source, symbol) ?
                    symbol.slice(prefixLength * 2, -random.length) :
                    void 0
                    ;
            };
            objectDefineProperty(Symbol, 'keyFor', descriptor);

            descriptor.value = function getOwnPropertyDescriptor(o, key) {
                var descriptor = gOPD(o, key);
                if (descriptor && onlySymbols(key)) {
                    descriptor.enumerable = propertyIsEnumerable.call(o, key);
                }
                return descriptor;
            };
            objectDefineProperty(Object, GOPD, descriptor);

            descriptor.value = function create(proto, descriptors) {
                return arguments.length === 1 || typeof descriptors === "undefined" ?
                    objectCreate(proto) :
                    createWithSymbols(proto, descriptors);
            };

            objectDefineProperty(Object, 'create', descriptor);

            var strictModeSupported = (function () { 'use strict'; return this; }).call(null) === null;
            if (strictModeSupported) {
                descriptor.value = function () {
                    var str = toString.call(this);
                    return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
                };
            } else {
                descriptor.value = function () {
                    // https://github.com/Financial-Times/polyfill-library/issues/164#issuecomment-486965300
                    // Polyfill.io this code is here for the situation where a browser does not
                    // support strict mode and is executing `Object.prototype.toString.call(null)`.
                    // This code ensures that we return the correct result in that situation however,
                    // this code also introduces a bug where it will return the incorrect result for
                    // `Object.prototype.toString.call(window)`. We can't have the correct result for
                    // both `window` and `null`, so we have opted for `null` as we believe this is the more
                    // common situation.
                    if (this === window) {
                        return '[object Null]';
                    }

                    var str = toString.call(this);
                    return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
                };
            }
            objectDefineProperty(ObjectProto, 'toString', descriptor);

            setDescriptor = function (o, key, descriptor) {
                var protoDescriptor = gOPD(ObjectProto, key);
                delete ObjectProto[key];
                objectDefineProperty(o, key, descriptor);
                if (o !== ObjectProto) {
                    objectDefineProperty(ObjectProto, key, protoDescriptor);
                }
            };

            // The abstract operation thisSymbolValue(value) performs the following steps:
            function thisSymbolValue(value) {
                // 1. If Type(value) is Symbol, return value.
                if (Type(value) === "symbol") {
                    return value;
                }
                // 2. If Type(value) is Object and value has a [[SymbolData]] internal slot, then
                // a. Let s be value.[[SymbolData]].
                // b. Assert: Type(s) is Symbol.
                // c. Return s.
                // 3. Throw a TypeError exception.
                throw TypeError(value + " is not a symbol");
            }

            // Symbol.prototype.description
            if (function () {
                // supports getters
                try {
                    var a = {};
                    Object.defineProperty(a, "t", {
                        configurable: true,
                        enumerable: false,
                        get: function () {
                            return true;
                        },
                        set: undefined
                    });
                    return !!a.t;
                } catch (e) {
                    return false;
                }
            }()) {
                var getInferredName;
                try {
                    // eslint-disable-next-line no-new-func
                    getInferredName = Function("s", "var v = s.valueOf(); return { [v]() {} }[v].name;");
                    // eslint-disable-next-line no-empty
                } catch (e) { }

                var inferred = function () { };
                var supportsInferredNames = getInferredName && inferred.name === "inferred" ? getInferredName : null;


                // 19.4.3.2 get Symbol.prototype.description
                Object.defineProperty(global.Symbol.prototype, "description", {
                    configurable: true,
                    enumerable: false,
                    get: function () {
                        // 1. Let s be the this value.
                        var s = this;
                        return symbolDescription(s);
                    }
                });
            }

        }(Object, 'getOwnPropertySymbols', self));

        // Symbol.iterator
        Object.defineProperty(self.Symbol, 'iterator', { value: self.Symbol('iterator') });

        // _ESAbstract.GetIterator
        /* global GetMethod, Symbol, Call, Type, GetV */
        // 7.4.1. GetIterator ( obj [ , method ] )
        // The abstract operation GetIterator with argument obj and optional argument method performs the following steps:
        function GetIterator(obj /*, method */) { // eslint-disable-line no-unused-vars
            // 1. If method is not present, then
            // a. Set method to ? GetMethod(obj, @@iterator).
            var method = arguments.length > 1 ? arguments[1] : GetMethod(obj, Symbol.iterator);
            // 2. Let iterator be ? Call(method, obj).
            var iterator = Call(method, obj);
            // 3. If Type(iterator) is not Object, throw a TypeError exception.
            if (Type(iterator) !== 'object') {
                throw new TypeError('bad iterator');
            }
            // 4. Let nextMethod be ? GetV(iterator, "next").
            var nextMethod = GetV(iterator, "next");
            // 5. Let iteratorRecord be Record {[[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false}.
            var iteratorRecord = Object.create(null);
            iteratorRecord['[[Iterator]]'] = iterator;
            iteratorRecord['[[NextMethod]]'] = nextMethod;
            iteratorRecord['[[Done]]'] = false;
            // 6. Return iteratorRecord.
            return iteratorRecord;
        }

        // Symbol.toStringTag
        /* global Symbol */
        Object.defineProperty(Symbol, 'toStringTag', {
            value: Symbol('toStringTag')
        });

        // WeakMap
        /* globals Symbol, OrdinaryCreateFromConstructor, IsCallable, GetIterator, IteratorStep, IteratorValue, IteratorClose, Get, Call, CreateMethodProperty, Type, SameValue */
        (function (global) {
            // Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
            var undefMarker = Symbol('undef');
            // 23.3.1.1 WeakMap ( [ iterable ] )
            var WeakMap = function WeakMap(/* iterable */) {
                // 1. If NewTarget is undefined, throw a TypeError exception.
                if (!(this instanceof WeakMap)) {
                    throw new TypeError('Constructor WeakMap requires "new"');
                }
                // 2. Let map be ? OrdinaryCreateFromConstructor(NewTarget, "%WeakMapPrototype%", « [[WeakMapData]] »).
                var map = OrdinaryCreateFromConstructor(this, WeakMap.prototype, {
                    _keys: [],
                    _values: [],
                    _es6WeakMap: true
                });

                // 3. Set map.[[WeakMapData]] to a new empty List.
                // Polyfill.io - This step was done as part of step two.

                // 4. If iterable is not present, let iterable be undefined.
                var iterable = arguments.length > 0 ? arguments[0] : undefined;

                // 5. If iterable is either undefined or null, return map.
                if (iterable === null || iterable === undefined) {
                    return map;
                }

                // 6. Let adder be ? Get(map, "set").
                var adder = Get(map, "set");

                // 7. If IsCallable(adder) is false, throw a TypeError exception.
                if (!IsCallable(adder)) {
                    throw new TypeError("WeakMap.prototype.set is not a function");
                }

                // 8. Let iteratorRecord be ? GetIterator(iterable).
                try {
                    var iteratorRecord = GetIterator(iterable);
                    // 9. Repeat,
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        // a. Let next be ? IteratorStep(iteratorRecord).
                        var next = IteratorStep(iteratorRecord);
                        // b. If next is false, return map.
                        if (next === false) {
                            return map;
                        }
                        // c. Let nextItem be ? IteratorValue(next).
                        var nextItem = IteratorValue(next);
                        // d. If Type(nextItem) is not Object, then
                        if (Type(nextItem) !== 'object') {
                            // i. Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
                            try {
                                throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
                            } catch (error) {
                                // ii. Return ? IteratorClose(iteratorRecord, error).
                                return IteratorClose(iteratorRecord, error);
                            }
                        }
                        try {
                            // Polyfill.io - The try catch accounts for steps: f, h, and j.

                            // e. Let k be Get(nextItem, "0").
                            var k = Get(nextItem, "0");
                            // f. If k is an abrupt completion, return ? IteratorClose(iteratorRecord, k).
                            // g. Let v be Get(nextItem, "1").
                            var v = Get(nextItem, "1");
                            // h. If v is an abrupt completion, return ? IteratorClose(iteratorRecord, v).
                            // i. Let status be Call(adder, map, « k.[[Value]], v.[[Value]] »).
                            Call(adder, map, [k, v]);
                        } catch (e) {
                            // j. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
                            return IteratorClose(iteratorRecord, e);
                        }
                    }
                } catch (e) {
                    // Polyfill.io - For user agents which do not have iteration methods on argument objects or arrays, we can special case those.
                    if (Array.isArray(iterable) ||
                        Object.prototype.toString.call(iterable) === '[object Arguments]' ||
                        // IE 7 & IE 8 return '[object Object]' for the arguments object, we can detect by checking for the existence of the callee property
                        (!!iterable.callee)) {
                        var index;
                        var length = iterable.length;
                        for (index = 0; index < length; index++) {
                            k = iterable[index][0];
                            v = iterable[index][1];
                            Call(adder, map, [k, v]);
                        }
                    }
                }
                return map;
            };

            // 23.3.2.1 WeakMap.prototype
            // The initial value of WeakMap.prototype is the intrinsic object %WeakMapPrototype%.
            // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
            Object.defineProperty(WeakMap, 'prototype', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: {}
            });

            // 23.3.3.1 WeakMap.prototype.constructor
            CreateMethodProperty(WeakMap.prototype, 'constructor', WeakMap);

            // 23.3.3.2 WeakMap.prototype.delete ( key )
            CreateMethodProperty(WeakMap.prototype, 'delete', function (key) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method WeakMap.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[WeakMapData]] internal slot, throw a TypeError exception.
                if (M._es6WeakMap !== true) {
                    throw new TypeError('Method WeakMap.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[WeakMapData]].
                var entries = M._keys;
                // 5. If Type(key) is not Object, return false.
                if (Type(key) !== 'object') {
                    return false;
                }
                // 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    // a. If p.[[Key]] is not empty and SameValue(p.[[Key]], key) is true, then
                    if (M._keys[i] !== undefMarker && SameValue(M._keys[i], key)) {
                        // i. Set p.[[Key]] to empty.
                        this._keys[i] = undefMarker;
                        // ii. Set p.[[Value]] to empty.
                        this._values[i] = undefMarker;
                        this._size = --this._size;
                        // iii. Return true.
                        return true;
                    }
                }
                // 7. Return false.
                return false;
            });

            // 23.3.3.3 WeakMap.prototype.get ( key )
            CreateMethodProperty(WeakMap.prototype, 'get', function get(key) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method WeakMap.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[WeakMapData]] internal slot, throw a TypeError exception.
                if (M._es6WeakMap !== true) {
                    throw new TypeError('Method WeakMap.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[WeakMapData]].
                var entries = M._keys;
                // 5. If Type(key) is not Object, return undefined.
                if (Type(key) !== 'object') {
                    return undefined;
                }
                // 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    // a. If p.[[Key]] is not empty and SameValue(p.[[Key]], key) is true, return p.[[Value]].
                    if (M._keys[i] !== undefMarker && SameValue(M._keys[i], key)) {
                        return M._values[i];
                    }
                }
                // 7. Return undefined.
                return undefined;
            });

            // 23.3.3.4 WeakMap.prototype.has ( key )
            CreateMethodProperty(WeakMap.prototype, 'has', function has(key) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (typeof M !== 'object') {
                    throw new TypeError('Method WeakMap.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[WeakMapData]] internal slot, throw a TypeError exception.
                if (M._es6WeakMap !== true) {
                    throw new TypeError('Method WeakMap.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[WeakMapData]].
                var entries = M._keys;
                // 5. If Type(key) is not Object, return false.
                if (Type(key) !== 'object') {
                    return false;
                }
                // 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    // a. If p.[[Key]] is not empty and SameValue(p.[[Key]], key) is true, return true.
                    if (M._keys[i] !== undefMarker && SameValue(M._keys[i], key)) {
                        return true;
                    }
                }
                // 7. Return false.
                return false;
            });

            // 23.3.3.5 WeakMap.prototype.set ( key, value )
            CreateMethodProperty(WeakMap.prototype, 'set', function set(key, value) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method WeakMap.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[WeakMapData]] internal slot, throw a TypeError exception.
                if (M._es6WeakMap !== true) {
                    throw new TypeError('Method WeakMap.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[WeakMapData]].
                var entries = M._keys;
                // 5. If Type(key) is not Object, throw a TypeError exception.
                if (Type(key) !== 'object') {
                    throw new TypeError("Invalid value used as weak map key");
                }
                // 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    // a. If p.[[Key]] is not empty and SameValue(p.[[Key]], key) is true, then
                    if (M._keys[i] !== undefMarker && SameValue(M._keys[i], key)) {
                        // i. Set p.[[Value]] to value.
                        M._values[i] = value;
                        // ii. Return M.
                        return M;
                    }
                }
                // 7. Let p be the Record {[[Key]]: key, [[Value]]: value}.
                var p = {
                    '[[Key]]': key,
                    '[[Value]]': value
                };
                // 8. Append p as the last element of entries.
                M._keys.push(p['[[Key]]']);
                M._values.push(p['[[Value]]']);
                // 9. Return M.
                return M;
            });

            // 23.3.3.6 WeakMap.prototype [ @@toStringTag ]
            // The initial value of the @@toStringTag property is the String value "WeakMap".
            // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
            Object.defineProperty(WeakMap.prototype, Symbol.toStringTag, {
                configurable: true,
                enumerable: false,
                writable: false,
                value: 'WeakMap'
            });

            // Polyfill.io - Safari 8 implements WeakMap.name but as a non-writable property, which means it would throw an error if we try and write to it here.
            if (!('name' in WeakMap)) {
                // 19.2.4.2 name
                Object.defineProperty(WeakMap, 'name', {
                    configurable: true,
                    enumerable: false,
                    writable: false,
                    value: 'WeakMap'
                });
            }

            // Export the object
            try {
                CreateMethodProperty(global, 'WeakMap', WeakMap);
            } catch (e) {
                // IE8 throws an error here if we set enumerable to false.
                // More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
                global.WeakMap = WeakMap;
            }
        }(self));

        // ResizeObserver
        (function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
                typeof define === 'function' && define.amd ? define(['exports'], factory) :
                    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ResizeObserver = {}));
        }(this, (function (exports) {
            'use strict';

            var resizeObservers = [];

            var hasActiveObservations = function () {
                return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
            };

            var hasSkippedObservations = function () {
                return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
            };

            var msg = 'ResizeObserver loop completed with undelivered notifications.';
            var deliverResizeLoopError = function () {
                var event;
                if (typeof ErrorEvent === 'function') {
                    event = new ErrorEvent('error', {
                        message: msg
                    });
                }
                else {
                    event = document.createEvent('Event');
                    event.initEvent('error', false, false);
                    event.message = msg;
                }
                window.dispatchEvent(event);
            };

            var ResizeObserverBoxOptions;
            (function (ResizeObserverBoxOptions) {
                ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
                ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
                ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
            })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

            var freeze = function (obj) { return Object.freeze(obj); };

            var ResizeObserverSize = (function () {
                function ResizeObserverSize(inlineSize, blockSize) {
                    this.inlineSize = inlineSize;
                    this.blockSize = blockSize;
                    freeze(this);
                }
                return ResizeObserverSize;
            }());

            var DOMRectReadOnly = (function () {
                function DOMRectReadOnly(x, y, width, height) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.top = this.y;
                    this.left = this.x;
                    this.bottom = this.top + this.height;
                    this.right = this.left + this.width;
                    return freeze(this);
                }
                DOMRectReadOnly.prototype.toJSON = function () {
                    var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
                    return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
                };
                DOMRectReadOnly.fromRect = function (rectangle) {
                    return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                };
                return DOMRectReadOnly;
            }());

            var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
            var isHidden = function (target) {
                if (isSVG(target)) {
                    var _a = target.getBBox(), width = _a.width, height = _a.height;
                    return !width && !height;
                }
                var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
                return !(offsetWidth || offsetHeight || target.getClientRects().length);
            };
            var isElement = function (obj) {
                var _a, _b;
                if (obj instanceof Element) {
                    return true;
                }
                var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
                return !!(scope && obj instanceof scope.Element);
            };
            var isReplacedElement = function (target) {
                switch (target.tagName) {
                    case 'INPUT':
                        if (target.type !== 'image') {
                            break;
                        }
                    case 'VIDEO':
                    case 'AUDIO':
                    case 'EMBED':
                    case 'OBJECT':
                    case 'CANVAS':
                    case 'IFRAME':
                    case 'IMG':
                        return true;
                }
                return false;
            };

            var global = typeof window !== 'undefined' ? window : {};

            var cache = new WeakMap();
            var scrollRegexp = /auto|scroll/;
            var verticalRegexp = /^tb|vertical/;
            var IE = (/msie|trident/i).test(global.navigator && global.navigator.userAgent);
            var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
            var size = function (inlineSize, blockSize, switchSizes) {
                if (inlineSize === void 0) { inlineSize = 0; }
                if (blockSize === void 0) { blockSize = 0; }
                if (switchSizes === void 0) { switchSizes = false; }
                return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
            };
            var zeroBoxes = freeze({
                devicePixelContentBoxSize: size(),
                borderBoxSize: size(),
                contentBoxSize: size(),
                contentRect: new DOMRectReadOnly(0, 0, 0, 0)
            });
            var calculateBoxSizes = function (target, forceRecalculation) {
                if (forceRecalculation === void 0) { forceRecalculation = false; }
                if (cache.has(target) && !forceRecalculation) {
                    return cache.get(target);
                }
                if (isHidden(target)) {
                    cache.set(target, zeroBoxes);
                    return zeroBoxes;
                }
                var cs = getComputedStyle(target);
                var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
                var removePadding = !IE && cs.boxSizing === 'border-box';
                var switchSizes = verticalRegexp.test(cs.writingMode || '');
                var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
                var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
                var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
                var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
                var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
                var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
                var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
                var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
                var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
                var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
                var horizontalPadding = paddingLeft + paddingRight;
                var verticalPadding = paddingTop + paddingBottom;
                var horizontalBorderArea = borderLeft + borderRight;
                var verticalBorderArea = borderTop + borderBottom;
                var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
                var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
                var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
                var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
                var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
                var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
                var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
                var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
                var boxes = freeze({
                    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
                    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
                    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
                    contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
                });
                cache.set(target, boxes);
                return boxes;
            };
            var calculateBoxSize = function (target, observedBox, forceRecalculation) {
                var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
                switch (observedBox) {
                    case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
                        return devicePixelContentBoxSize;
                    case ResizeObserverBoxOptions.BORDER_BOX:
                        return borderBoxSize;
                    default:
                        return contentBoxSize;
                }
            };

            var ResizeObserverEntry = (function () {
                function ResizeObserverEntry(target) {
                    var boxes = calculateBoxSizes(target);
                    this.target = target;
                    this.contentRect = boxes.contentRect;
                    this.borderBoxSize = freeze([boxes.borderBoxSize]);
                    this.contentBoxSize = freeze([boxes.contentBoxSize]);
                    this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
                }
                return ResizeObserverEntry;
            }());

            var calculateDepthForNode = function (node) {
                if (isHidden(node)) {
                    return Infinity;
                }
                var depth = 0;
                var parent = node.parentNode;
                while (parent) {
                    depth += 1;
                    parent = parent.parentNode;
                }
                return depth;
            };

            var broadcastActiveObservations = function () {
                var shallowestDepth = Infinity;
                var callbacks = [];
                resizeObservers.forEach(function processObserver(ro) {
                    if (ro.activeTargets.length === 0) {
                        return;
                    }
                    var entries = [];
                    ro.activeTargets.forEach(function processTarget(ot) {
                        var entry = new ResizeObserverEntry(ot.target);
                        var targetDepth = calculateDepthForNode(ot.target);
                        entries.push(entry);
                        ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
                        if (targetDepth < shallowestDepth) {
                            shallowestDepth = targetDepth;
                        }
                    });
                    callbacks.push(function resizeObserverCallback() {
                        ro.callback.call(ro.observer, entries, ro.observer);
                    });
                    ro.activeTargets.splice(0, ro.activeTargets.length);
                });
                for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                    var callback = callbacks_1[_i];
                    callback();
                }
                return shallowestDepth;
            };

            var gatherActiveObservationsAtDepth = function (depth) {
                resizeObservers.forEach(function processObserver(ro) {
                    ro.activeTargets.splice(0, ro.activeTargets.length);
                    ro.skippedTargets.splice(0, ro.skippedTargets.length);
                    ro.observationTargets.forEach(function processTarget(ot) {
                        if (ot.isActive()) {
                            if (calculateDepthForNode(ot.target) > depth) {
                                ro.activeTargets.push(ot);
                            }
                            else {
                                ro.skippedTargets.push(ot);
                            }
                        }
                    });
                });
            };

            var process = function () {
                var depth = 0;
                gatherActiveObservationsAtDepth(depth);
                while (hasActiveObservations()) {
                    depth = broadcastActiveObservations();
                    gatherActiveObservationsAtDepth(depth);
                }
                if (hasSkippedObservations()) {
                    deliverResizeLoopError();
                }
                return depth > 0;
            };

            var trigger;
            var callbacks = [];
            var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
            var queueMicroTask = function (callback) {
                if (!trigger) {
                    var toggle_1 = 0;
                    var el_1 = document.createTextNode('');
                    var config = { characterData: true };
                    new MutationObserver(function () { return notify(); }).observe(el_1, config);
                    trigger = function () { el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++); };
                }
                callbacks.push(callback);
                trigger();
            };

            var queueResizeObserver = function (cb) {
                queueMicroTask(function ResizeObserver() {
                    requestAnimationFrame(cb);
                });
            };

            var watching = 0;
            var isWatching = function () { return !!watching; };
            var CATCH_PERIOD = 250;
            var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
            var events = [
                'resize',
                'load',
                'transitionend',
                'animationend',
                'animationstart',
                'animationiteration',
                'keyup',
                'keydown',
                'mouseup',
                'mousedown',
                'mouseover',
                'mouseout',
                'blur',
                'focus'
            ];
            var time = function (timeout) {
                if (timeout === void 0) { timeout = 0; }
                return Date.now() + timeout;
            };
            var scheduled = false;
            var Scheduler = (function () {
                function Scheduler() {
                    var _this = this;
                    this.stopped = true;
                    this.listener = function () { return _this.schedule(); };
                }
                Scheduler.prototype.run = function (timeout) {
                    var _this = this;
                    if (timeout === void 0) { timeout = CATCH_PERIOD; }
                    if (scheduled) {
                        return;
                    }
                    scheduled = true;
                    var until = time(timeout);
                    queueResizeObserver(function () {
                        var elementsHaveResized = false;
                        try {
                            elementsHaveResized = process();
                        }
                        finally {
                            scheduled = false;
                            timeout = until - time();
                            if (!isWatching()) {
                                return;
                            }
                            if (elementsHaveResized) {
                                _this.run(1000);
                            }
                            else if (timeout > 0) {
                                _this.run(timeout);
                            }
                            else {
                                _this.start();
                            }
                        }
                    });
                };
                Scheduler.prototype.schedule = function () {
                    this.stop();
                    this.run();
                };
                Scheduler.prototype.observe = function () {
                    var _this = this;
                    var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
                    document.body ? cb() : global.addEventListener('DOMContentLoaded', cb);
                };
                Scheduler.prototype.start = function () {
                    var _this = this;
                    if (this.stopped) {
                        this.stopped = false;
                        this.observer = new MutationObserver(this.listener);
                        this.observe();
                        events.forEach(function (name) { return global.addEventListener(name, _this.listener, true); });
                    }
                };
                Scheduler.prototype.stop = function () {
                    var _this = this;
                    if (!this.stopped) {
                        this.observer && this.observer.disconnect();
                        events.forEach(function (name) { return global.removeEventListener(name, _this.listener, true); });
                        this.stopped = true;
                    }
                };
                return Scheduler;
            }());
            var scheduler = new Scheduler();
            var updateCount = function (n) {
                !watching && n > 0 && scheduler.start();
                watching += n;
                !watching && scheduler.stop();
            };

            var skipNotifyOnElement = function (target) {
                return !isSVG(target)
                    && !isReplacedElement(target)
                    && getComputedStyle(target).display === 'inline';
            };
            var ResizeObservation = (function () {
                function ResizeObservation(target, observedBox) {
                    this.target = target;
                    this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
                    this.lastReportedSize = {
                        inlineSize: 0,
                        blockSize: 0
                    };
                }
                ResizeObservation.prototype.isActive = function () {
                    var size = calculateBoxSize(this.target, this.observedBox, true);
                    if (skipNotifyOnElement(this.target)) {
                        this.lastReportedSize = size;
                    }
                    if (this.lastReportedSize.inlineSize !== size.inlineSize
                        || this.lastReportedSize.blockSize !== size.blockSize) {
                        return true;
                    }
                    return false;
                };
                return ResizeObservation;
            }());

            var ResizeObserverDetail = (function () {
                function ResizeObserverDetail(resizeObserver, callback) {
                    this.activeTargets = [];
                    this.skippedTargets = [];
                    this.observationTargets = [];
                    this.observer = resizeObserver;
                    this.callback = callback;
                }
                return ResizeObserverDetail;
            }());

            var observerMap = new WeakMap();
            var getObservationIndex = function (observationTargets, target) {
                for (var i = 0; i < observationTargets.length; i += 1) {
                    if (observationTargets[i].target === target) {
                        return i;
                    }
                }
                return -1;
            };
            var ResizeObserverController = (function () {
                function ResizeObserverController() {
                }
                ResizeObserverController.connect = function (resizeObserver, callback) {
                    var detail = new ResizeObserverDetail(resizeObserver, callback);
                    observerMap.set(resizeObserver, detail);
                };
                ResizeObserverController.observe = function (resizeObserver, target, options) {
                    var detail = observerMap.get(resizeObserver);
                    var firstObservation = detail.observationTargets.length === 0;
                    if (getObservationIndex(detail.observationTargets, target) < 0) {
                        firstObservation && resizeObservers.push(detail);
                        detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                        updateCount(1);
                        scheduler.schedule();
                    }
                };
                ResizeObserverController.unobserve = function (resizeObserver, target) {
                    var detail = observerMap.get(resizeObserver);
                    var index = getObservationIndex(detail.observationTargets, target);
                    var lastObservation = detail.observationTargets.length === 1;
                    if (index >= 0) {
                        lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                        detail.observationTargets.splice(index, 1);
                        updateCount(-1);
                    }
                };
                ResizeObserverController.disconnect = function (resizeObserver) {
                    var _this = this;
                    var detail = observerMap.get(resizeObserver);
                    detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
                    detail.activeTargets.splice(0, detail.activeTargets.length);
                };
                return ResizeObserverController;
            }());

            var ResizeObserver = (function () {
                function ResizeObserver(callback) {
                    if (arguments.length === 0) {
                        throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
                    }
                    if (typeof callback !== 'function') {
                        throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
                    }
                    ResizeObserverController.connect(this, callback);
                }
                ResizeObserver.prototype.observe = function (target, options) {
                    if (arguments.length === 0) {
                        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
                    }
                    if (!isElement(target)) {
                        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
                    }
                    ResizeObserverController.observe(this, target, options);
                };
                ResizeObserver.prototype.unobserve = function (target) {
                    if (arguments.length === 0) {
                        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
                    }
                    if (!isElement(target)) {
                        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
                    }
                    ResizeObserverController.unobserve(this, target);
                };
                ResizeObserver.prototype.disconnect = function () {
                    ResizeObserverController.disconnect(this);
                };
                ResizeObserver.toString = function () {
                    return 'function ResizeObserver () { [polyfill code] }';
                };
                return ResizeObserver;
            }());

            exports.ResizeObserver = ResizeObserver;
            exports.ResizeObserverEntry = ResizeObserverEntry;
            exports.ResizeObserverSize = ResizeObserverSize;

            Object.defineProperty(exports, '__esModule', { value: true });

        })));
        ; self.ResizeObserverEntry = ResizeObserver.ResizeObserverEntry; self.ResizeObserver = ResizeObserver.ResizeObserver;
    })(self);
}

//polyfill for getRootNode
if (!Node.prototype.getRootNode) {
    Node.prototype.getRootNode = function (options) {
        var node = this;
        var parentNode = node.parentNode;

        while (parentNode) {
            node = parentNode;
            parentNode = node.parentNode;
        }

        if (options && options.composed) {
            var doc = node.ownerDocument;
            if (doc && doc.defaultView && doc.defaultView.frameElement) {
                return doc.defaultView.frameElement.getRootNode(options);
            }
        }

        return node;
    }
}

if (typeof window.ShadowRoot === 'undefined') {
    window.ShadowRoot = function () {
        this.toString = function () {
            return '[object ShadowRoot]';
        }
    }
}

if (typeof window.MutationObserver === 'undefined') {
    (function () {
        var MutationObserver;

        if (window.MutationObserver != null) {
            return;
        }

        MutationObserver = (function () {
            function MutationObserver(callBack) {
                this.callBack = callBack;
            }

            MutationObserver.prototype.observe = function (element, options) {
                this.element = element;
                return this.interval = setInterval((function (_this) {
                    return function () {
                        var html;
                        html = _this.element.innerHTML;
                        if (html !== _this.oldHtml) {
                            _this.oldHtml = html;
                            return _this.callBack.apply(null);
                        }
                    };
                })(this), 200);
            };

            MutationObserver.prototype.disconnect = function () {
                return window.clearInterval(this.interval);
            };

            return MutationObserver;

        })();

        window.MutationObserver = MutationObserver;

    }).call(this);
}

// Function to detect IE10
function isIE10() {
    return window.navigator.userAgent.indexOf("MSIE 10") !== -1;
}


if (typeof window.Worker === 'undefined' || isIE10()) {
    window.Worker = function (scriptUrl) {
        this._scriptUrl = scriptUrl;
        this.onmessage = null;
    };

    window.Worker.prototype.postMessage = function (msg) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this._scriptUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var scriptText = xhr.responseText;
                var data = (function () {
                    return (new Function('return ' + scriptText))();
                })();
                if (_this.onmessage) {
                    _this.onmessage({ data: data });
                }
            }
        };
        xhr.send();
    };
}

if (typeof window.Buffer === 'undefined') {
    window.Buffer = {
        from: function (str, encoding) {
            function utf8ToBinaryString(str) {
                var binaryStr = '';
                for (var i = 0; i < str.length; i++) {
                    binaryStr += str.charCodeAt(i).toString(2).padStart(8, '0');
                }
                return binaryStr;
            }

            function binaryToBase64(binaryString) {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var result = '';

                var padding = binaryString.length % 6;
                if (padding) {
                    binaryString += '0'.repeat(6 - padding);
                }

                for (var i = 0; i < binaryString.length; i += 6) {
                    var int6 = parseInt(binaryString.slice(i, i + 6), 2);
                    result += characters.charAt(int6);
                }

                var remaining = str.length % 3;
                if (remaining) {
                    result += '='.repeat(3 - remaining);
                }

                return result;
            }

            var binaryString;
            if (encoding === 'binary') {
                binaryString = utf8ToBinaryString(str);
            } else {
                throw new Error('Unsupported encoding: ' + encoding);
            }

            return {
                toString: function (format) {
                    if (format === 'base64') {
                        return binaryToBase64(binaryString);
                    } else {
                        throw new Error('Unsupported format: ' + format);
                    }
                }
            };
        }
    };
}

/**
 * Minified by jsDelivr using UglifyJS v3.4.3.
 * Original file: /npm/requestanimationframe@0.0.23/app/requestAnimationFrame.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
if (typeof window.requestAnimationFrame === 'undefined') {
    !function (m) { !function () { if (!m.requestAnimationFrame) { if (m.webkitRequestAnimationFrame) return m.requestAnimationFrame = m.webkitRequestAnimationFrame, m.cancelAnimationFrame = m.webkitCancelAnimationFrame || m.webkitCancelRequestAnimationFrame; var a = 0; m.requestAnimationFrame = function (e) { var n = (new Date).getTime(), i = Math.max(0, 16 - (n - a)), t = m.setTimeout(function () { e(n + i) }, i); return a = n + i, t }, m.cancelAnimationFrame = function (e) { clearTimeout(e) } } }(), "function" == typeof define && define(function () { return m.requestAnimationFrame }) }(window);
    ;
}