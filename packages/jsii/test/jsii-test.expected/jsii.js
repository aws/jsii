var jsii$jsii_test$ =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mydep = __webpack_require__(1);
const my_bundled_dep_1 = __webpack_require__(2);
class Token {
}
exports.Token = Token;
class TestClass3 {
    constructor() {
        this.hello = '';
    }
}
exports.TestClass3 = TestClass3;
class TestClass2 {
    // last argument is union, but it's optional, so the resulting jsii will just not include it.
    constructor(arg1 = 'hello', arg2, arg3, arg4, arg5) {
        this.a = 0;
        this.b = '';
        this.c = new TestClass3();
        arg1;
        arg2;
        arg3;
        arg4;
        arg5;
        my_bundled_dep_1.hi();
    }
}
exports.TestClass2 = TestClass2;
class BaseClass {
    constructor() {
        this.baseProp = '';
    }
}
exports.BaseClass = BaseClass;
/**
 * This is the comment section
 * @link http://amazon.com
 * @description Description
 * @author benisrae
 */
class TestClass extends BaseClass {
    constructor() {
        // properties
        super(...arguments);
        /**
         * This is documentation for readonlyString
         */
        this.readonlyString = '';
        this.mutableNumber = 0;
        // list
        this.listOfStrings = [];
        this.listOfComplex = [];
        // map
        /**
         * And a comment
         * @description Map of booleans here
         */
        this.mapOfBooleans = {};
        this.mapOfComplex = {};
        // refs
        this.stringOrRef = '';
        this.jsonProperty = {};
        this.optionalAsUnion = '';
        this.arrayOfOptionals = new Array();
        this.readonlyMapOfOptionalsOrRefs = {};
    }
    /**
     * Read only boolean.
     */
    get readonlyBoolean() {
        return false;
    }
    /**
     * Sets the mutable complex object.
     */
    set mutableComplex(value) {
        value;
    }
    /**
     * Documentation for getter
     * @example This is an example
     */
    get mutableComplex() {
        return new TestClass2("hello", new TestClass3(), 122);
    }
    _ignored() {
        // this method should not be included
    }
    // methods
    /**
     * Documentation for method
     */
    methodWithNoParameters() { }
    /**
     * Documentation for methodWithParams
     * @param param1 Doc for param1
     * @param param2 Doc for param2
     */
    methodWithParams(param1, param2, param3, param4) {
        param1;
        param2;
        param3;
        param4;
        this.notVisible();
        return true;
    }
    notVisible() {
    }
    /**
     * Docs on getter prevail.
     */
    get getterBeforeSetter() {
        return 'hello';
    }
    /**
     * Docs on setter are not allowed.
     */
    set getterBeforeSetter(value) {
        value;
    }
    get arrayGetter() {
        return [];
    }
    get mapGetter() {
        return { "hello": { a: 1, b: 'hello', c: { hello: 'hello' } } };
    }
}
exports.TestClass = TestClass;
/**
 * This is the documentation for this enum.
 */
var TestEnum;
(function (TestEnum) {
    /**
     * This is doc for Value1
     */
    TestEnum[TestEnum["Value1"] = 0] = "Value1";
    /**
     * Doc for value2
     * @author benisrae@
     */
    TestEnum[TestEnum["Value2"] = 1] = "Value2";
    TestEnum["Value3"] = "Hello";
})(TestEnum = exports.TestEnum || (exports.TestEnum = {}));
(function (TestEnum) {
    class SubTypeOfTestEnum {
        constructor() {
            this.myProp = 12;
        }
    }
    TestEnum.SubTypeOfTestEnum = SubTypeOfTestEnum;
})(TestEnum = exports.TestEnum || (exports.TestEnum = {}));
(function (TestClass2) {
    class SubTypeOfTestClass2 {
        constructor() {
            this.yourProp = "Hello";
        }
    }
    TestClass2.SubTypeOfTestClass2 = SubTypeOfTestClass2;
})(TestClass2 = exports.TestClass2 || (exports.TestClass2 = {}));
(function (TestClass2) {
    var SubTypeOfTestClass2;
    (function (SubTypeOfTestClass2) {
        class Foo {
        }
        SubTypeOfTestClass2.Foo = Foo;
    })(SubTypeOfTestClass2 = TestClass2.SubTypeOfTestClass2 || (TestClass2.SubTypeOfTestClass2 = {}));
})(TestClass2 = exports.TestClass2 || (exports.TestClass2 = {}));
//
// Const literals
// jsii allows constant literals and actually includes the values in the jsii spec
//
class TestClass4 {
    /**
     * p2 cannot be resolved, but it's optional, so we expect the typespec to just include p1
     */
    constructor(p1, p2, p3) {
        p1;
        p2;
        p3;
        TestClass4.NON_PRIMITIVE;
    }
}
// primitive consts values are allowed but only if they are simple literal data values
// no math, no evaluation. literally!!
TestClass4.STRING_CONST = 'Hello';
TestClass4.STRING_CONST_WITH_DOUBLE_QUOTES = "World";
TestClass4.NUMBER_CONST = 1234;
TestClass4.DOUBLE_CONST = 1234.44;
TestClass4.BOOLEAN_CONST_FALSE = false;
TestClass4.BOOLEAN_CONST_TRUE = false;
// ignored (with a warning) because it's a non-primitive literal
TestClass4.OBJ_LITERAL_CONST = { foo: 1234 };
TestClass4.NON_LITERAL_CONST = 123 + 45;
TestClass4.OBJ_CONST = new TestClass();
// private
TestClass4.NON_PRIMITIVE = new TestClass();
exports.TestClass4 = TestClass4;
//
// This is good since there are no namesapces without a type.
//
class A {
}
exports.A = A;
(function (A) {
    class B {
    }
    A.B = B;
})(A = exports.A || (exports.A = {}));
(function (A) {
    var B;
    (function (B) {
        class C {
        }
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A = exports.A || (exports.A = {}));
//
// Use a type from an external dependency as a base class
//
class ExposeExternalDependency extends mydep.MyDepType {
    constructor() {
        super(...arguments);
        this.froth = 0;
    }
}
exports.ExposeExternalDependency = ExposeExternalDependency;
class PropertyWithAnyValue {
    constructor() {
        this.myprop = undefined;
    }
}
exports.PropertyWithAnyValue = PropertyWithAnyValue;
// jsii also indicates whether properties have backing logic or just represent raw data
class HasLogic {
    constructor() {
        this.propWithoutLogic = '';
    }
    /**
     * This property will have logic=true
     */
    get propWithLogic() {
        return 12;
    }
    set propWithLogic(val) {
        val;
    }
}
exports.HasLogic = HasLogic;
class OptionalRef {
    constructor() {
        this.prop2 = new Token();
    }
}
exports.OptionalRef = OptionalRef;
class UnionProperties {
    constructor() {
        this.withPrimitive1 = '';
        this.withPrimitive2 = '';
        this.noPrimitive = new TestClass3();
    }
}
exports.UnionProperties = UnionProperties;
//
// jsii is expected to automatically copy the initializer from TestClass3
//
class EnsureInitializerBase {
    constructor(arg1, arg2) {
        arg1;
        arg2;
    }
}
exports.EnsureInitializerBase = EnsureInitializerBase;
class EnsureInitializer extends EnsureInitializerBase {
}
exports.EnsureInitializer = EnsureInitializer;
class EnsureInitializer2 extends EnsureInitializer {
}
exports.EnsureInitializer2 = EnsureInitializer2;
class EnsureInitializer3 extends EnsureInitializer2 {
    constructor(ihavemyowninitializer) {
        super('boo', false);
        ihavemyowninitializer;
    }
}
exports.EnsureInitializer3 = EnsureInitializer3;
// here initializer has only optional values
// in the meantime we still expect it to be cloned as is for lack of a evidence that we should do something else
class EnsureInitializerBase2 {
    constructor(arg1, arg2) {
        arg1;
        arg2;
    }
}
exports.EnsureInitializerBase2 = EnsureInitializerBase2;
class EnsureInitializer4 extends EnsureInitializerBase2 {
}
exports.EnsureInitializer4 = EnsureInitializer4;
class PropertiesInCtor {
    constructor(readonlyProp, readWriteProp, privateProp) {
        this.readonlyProp = readonlyProp;
        this.readWriteProp = readWriteProp;
        this.privateProp = privateProp;
        this.readWriteProp = this.privateProp;
    }
}
exports.PropertiesInCtor = PropertiesInCtor;
class MyAbstractClass {
    normalMethod() {
    }
}
exports.MyAbstractClass = MyAbstractClass;
class DerivedAbstract extends MyAbstractClass {
}
exports.DerivedAbstract = DerivedAbstract;
class ClassWithProtectedStuff {
    constructor(paramprop) {
        this.paramprop = paramprop;
        this.foo = 0;
    }
    get goo() {
        return 123;
    }
    set goo(val) {
        val;
    }
    protectedMethod(val) {
        val;
        return 123;
    }
}
exports.ClassWithProtectedStuff = ClassWithProtectedStuff;
class AsyncVirtualMethods {
    async overrideMe() {
        return 42;
    }
    dontOverrideMe() {
        return 42;
    }
}
exports.AsyncVirtualMethods = AsyncVirtualMethods;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jsii$my_dep$;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.hi = function () { return 'this is coming from a bundled dependency. this means that its code is going to be included in our bundle.js file'; };


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjMzYzU1ZDM1MjkzY2Y0YzkzYWEiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9qc2lpLXRlc3QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNpaSRteV9kZXAkXCIiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9qc2lpLXRlc3Qvbm9kZV9tb2R1bGVzL215LWJ1bmRsZWQtZGVwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEscUNBQStCO0FBQy9CLGdEQUFtQztBQUVuQztDQUFzQjtBQUF0QixzQkFBc0I7QUFFdEI7SUFBQTtRQUNJLFVBQUssR0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFFRDtJQUtJLDZGQUE2RjtJQUM3RixZQUFZLElBQUksR0FBRyxPQUFPLEVBQUUsSUFBZ0IsRUFBRSxJQUF3QixFQUFFLElBQWMsRUFBRSxJQUE4QjtRQUx0SCxNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsTUFBQyxHQUFXLEVBQUUsQ0FBQztRQUNmLE1BQUMsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBSTdCLElBQUksQ0FBQztRQUFDLElBQUksQ0FBQztRQUFDLElBQUksQ0FBQztR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RUFBRTtJQUNiLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFSRCxrREFRQzs7Ozs7OztBQzdWRCw4Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQSwwQkFBMEIsMkhBQTJIIiwiZmlsZSI6ImpzaWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMzNjNTVkMzUyOTNjZjRjOTNhYSIsImltcG9ydCAqIGFzIG15ZGVwIGZyb20gJ215LWRlcCdcbmltcG9ydCB7IGhpIH0gZnJvbSAnbXktYnVuZGxlZC1kZXAnXG5cbmV4cG9ydCBjbGFzcyBUb2tlbiB7IH1cblxuZXhwb3J0IGNsYXNzIFRlc3RDbGFzczMge1xuICAgIGhlbGxvOiBzdHJpbmcgPSAnJztcbn1cblxuZXhwb3J0IGNsYXNzIFRlc3RDbGFzczIge1xuICAgIGE6IG51bWJlciA9IDA7XG4gICAgYjogc3RyaW5nID0gJyc7XG4gICAgYzogVGVzdENsYXNzMyA9IG5ldyBUZXN0Q2xhc3MzKCk7XG5cbiAgICAvLyBsYXN0IGFyZ3VtZW50IGlzIHVuaW9uLCBidXQgaXQncyBvcHRpb25hbCwgc28gdGhlIHJlc3VsdGluZyBqc2lpIHdpbGwganVzdCBub3QgaW5jbHVkZSBpdC5cbiAgICBjb25zdHJ1Y3RvcihhcmcxID0gJ2hlbGxvJywgYXJnMjogVGVzdENsYXNzMywgYXJnMzogbnVtYmVyIHwgdW5kZWZpbmVkLCBhcmc0PzogYm9vbGVhbiwgYXJnNT86IFRlc3RDbGFzczMgfCBUZXN0Q2xhc3MyKSB7XG4gICAgICAgIGFyZzE7IGFyZzI7IGFyZzM7IGFyZzQ7IGFyZzU7XG4gICAgICAgIGhpKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUNsYXNzIHtcbiAgICBiYXNlUHJvcDogc3RyaW5nID0gJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbWVudCBzZWN0aW9uXG4gKiBAbGluayBodHRwOi8vYW1hem9uLmNvbVxuICogQGRlc2NyaXB0aW9uIERlc2NyaXB0aW9uXG4gKiBAYXV0aG9yIGJlbmlzcmFlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0Q2xhc3MgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG4gICAgLy8gcHJvcGVydGllc1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBkb2N1bWVudGF0aW9uIGZvciByZWFkb25seVN0cmluZ1xuICAgICAqL1xuICAgIHJlYWRvbmx5IHJlYWRvbmx5U3RyaW5nOiBzdHJpbmcgPSAnJztcbiAgICBtdXRhYmxlTnVtYmVyOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBvbmx5IGJvb2xlYW4uXG4gICAgICovXG4gICAgZ2V0IHJlYWRvbmx5Qm9vbGVhbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG11dGFibGUgY29tcGxleCBvYmplY3QuXG4gICAgICovXG4gICAgc2V0IG11dGFibGVDb21wbGV4KHZhbHVlOiBUZXN0Q2xhc3MyKSB7XG4gICAgICAgIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3VtZW50YXRpb24gZm9yIGdldHRlclxuICAgICAqIEBleGFtcGxlIFRoaXMgaXMgYW4gZXhhbXBsZVxuICAgICAqL1xuICAgIGdldCBtdXRhYmxlQ29tcGxleCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0Q2xhc3MyKFwiaGVsbG9cIiwgbmV3IFRlc3RDbGFzczMoKSwgMTIyKTtcbiAgICB9XG5cbiAgICBfaWdub3JlZCgpIHtcbiAgICAgICAgLy8gdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZFxuICAgIH1cblxuICAgIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcblxuICAgIG9wdGlvbmFsTXV0YWJsZUJvb2xlYW4/OiBib29sZWFuXG4gICAgcmVhZG9ubHkgb3B0aW9uYWxSZWFkb25seURhdGU/OiBEYXRlXG4gXG4gICAgLy8gbGlzdFxuXG4gICAgbGlzdE9mU3RyaW5nczogc3RyaW5nW10gID0gW107XG4gICAgb3B0aW9uYWxMaXN0T2ZOdW1iZXJzPzogbnVtYmVyW107XG4gICAgbGlzdE9mQ29tcGxleDogVGVzdENsYXNzMltdID0gW107XG5cbiAgICAvLyBtYXBcblxuICAgIC8qKlxuICAgICAqIEFuZCBhIGNvbW1lbnRcbiAgICAgKiBAZGVzY3JpcHRpb24gTWFwIG9mIGJvb2xlYW5zIGhlcmVcbiAgICAgKi9cbiAgICBtYXBPZkJvb2xlYW5zOiB7IFsga2V5OiBzdHJpbmcgXTogYm9vbGVhbiB9ID0ge307XG4gICAgbWFwT2ZDb21wbGV4OiB7IFsga2V5OiBzdHJpbmddOiBUZXN0Q2xhc3MzIH0gPSB7fTtcblxuICAgIC8vIHJlZnNcblxuICAgIHN0cmluZ09yUmVmOiBUb2tlbiB8IHN0cmluZyA9ICcnO1xuXG4gICAgLy8gbWV0aG9kc1xuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRhdGlvbiBmb3IgbWV0aG9kXG4gICAgICovXG4gICAgbWV0aG9kV2l0aE5vUGFyYW1ldGVycygpIHsgfVxuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRhdGlvbiBmb3IgbWV0aG9kV2l0aFBhcmFtc1xuICAgICAqIEBwYXJhbSBwYXJhbTEgRG9jIGZvciBwYXJhbTFcbiAgICAgKiBAcGFyYW0gcGFyYW0yIERvYyBmb3IgcGFyYW0yXG4gICAgICovXG4gICAgbWV0aG9kV2l0aFBhcmFtcyhwYXJhbTE6IHN0cmluZywgcGFyYW0yOiBudW1iZXIsIHBhcmFtMz86IFRlc3RDbGFzczMsIHBhcmFtND86IFRlc3RDbGFzczIpOiBib29sZWFuIHtcbiAgICAgICAgcGFyYW0xO1xuICAgICAgICBwYXJhbTI7XG4gICAgICAgIHBhcmFtMztcbiAgICAgICAgcGFyYW00O1xuICAgICAgICB0aGlzLm5vdFZpc2libGUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RWaXNpYmxlKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9jcyBvbiBnZXR0ZXIgcHJldmFpbC5cbiAgICAgKi9cbiAgICBnZXQgZ2V0dGVyQmVmb3JlU2V0dGVyKCkge1xuICAgICAgICByZXR1cm4gJ2hlbGxvJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3Mgb24gc2V0dGVyIGFyZSBub3QgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBzZXQgZ2V0dGVyQmVmb3JlU2V0dGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGFycmF5R2V0dGVyKCk6IFRlc3RFbnVtW10ge1xuICAgICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICBnZXQgbWFwR2V0dGVyKCk6IHsgW2tleTogc3RyaW5nXTogVGVzdENsYXNzMiB9IHtcbiAgICAgICAgcmV0dXJuIHsgXCJoZWxsb1wiOiB7IGE6IDEsIGI6ICdoZWxsbycsIGM6IHsgaGVsbG86ICdoZWxsbycgfSB9IH1cbiAgICB9XG5cbiAgICBqc29uUHJvcGVydHk6IG9iamVjdCA9IHt9O1xuXG4gICAgb3B0aW9uYWxCb29sZWFuT3JSZWY/OiBib29sZWFuIHwgVG9rZW5cblxuICAgIG9wdGlvbmFsQXNVbmlvbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gJyc7XG5cbiAgICBhcnJheU9mT3B0aW9uYWxzID0gbmV3IEFycmF5PFRlc3RDbGFzczMgfCB1bmRlZmluZWQ+KCk7XG4gICAgcmVhZG9ubHkgcmVhZG9ubHlNYXBPZk9wdGlvbmFsc09yUmVmczogeyBba2V5OiBzdHJpbmddOiAoc3RyaW5nIHwgdW5kZWZpbmVkKSB9ID0ge307XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhpcyBlbnVtLlxuICovXG5leHBvcnQgZW51bSBUZXN0RW51bSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBkb2MgZm9yIFZhbHVlMVxuICAgICAqL1xuICAgIFZhbHVlMSxcblxuICAgIC8qKlxuICAgICAqIERvYyBmb3IgdmFsdWUyXG4gICAgICogQGF1dGhvciBiZW5pc3JhZUBcbiAgICAgKi9cbiAgICBWYWx1ZTIsXG4gICAgVmFsdWUzID0gJ0hlbGxvJ1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIFRlc3RFbnVtIHtcbiAgICBleHBvcnQgY2xhc3MgU3ViVHlwZU9mVGVzdEVudW0ge1xuICAgICAgICBteVByb3AgPSAxMlxuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBUZXN0Q2xhc3MyIHtcbiAgICBleHBvcnQgY2xhc3MgU3ViVHlwZU9mVGVzdENsYXNzMiB7XG4gICAgICAgIHJlYWRvbmx5IHlvdXJQcm9wPzogc3RyaW5nID0gXCJIZWxsb1wiXG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFRlc3RDbGFzczIuU3ViVHlwZU9mVGVzdENsYXNzMiB7XG4gICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICAgIFxuICAgIH1cbn1cblxuLy9cbi8vIENvbnN0IGxpdGVyYWxzXG4vLyBqc2lpIGFsbG93cyBjb25zdGFudCBsaXRlcmFscyBhbmQgYWN0dWFsbHkgaW5jbHVkZXMgdGhlIHZhbHVlcyBpbiB0aGUganNpaSBzcGVjXG4vL1xuXG5leHBvcnQgY2xhc3MgVGVzdENsYXNzNCB7XG5cbiAgICAvLyBwcmltaXRpdmUgY29uc3RzIHZhbHVlcyBhcmUgYWxsb3dlZCBidXQgb25seSBpZiB0aGV5IGFyZSBzaW1wbGUgbGl0ZXJhbCBkYXRhIHZhbHVlc1xuICAgIC8vIG5vIG1hdGgsIG5vIGV2YWx1YXRpb24uIGxpdGVyYWxseSEhXG4gICAgc3RhdGljIHJlYWRvbmx5IFNUUklOR19DT05TVCA9ICdIZWxsbyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNUUklOR19DT05TVF9XSVRIX0RPVUJMRV9RVU9URVMgPSBcIldvcmxkXCI7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5VTUJFUl9DT05TVCA9IDEyMzQ7XG4gICAgc3RhdGljIHJlYWRvbmx5IERPVUJMRV9DT05TVCA9IDEyMzQuNDQ7XG4gICAgc3RhdGljIHJlYWRvbmx5IEJPT0xFQU5fQ09OU1RfRkFMU0UgPSBmYWxzZTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgQk9PTEVBTl9DT05TVF9UUlVFID0gZmFsc2U7XG5cbiAgICAvLyBpZ25vcmVkICh3aXRoIGEgd2FybmluZykgYmVjYXVzZSBpdCdzIGEgbm9uLXByaW1pdGl2ZSBsaXRlcmFsXG4gICAgc3RhdGljIHJlYWRvbmx5IE9CSl9MSVRFUkFMX0NPTlNUID0geyBmb286IDEyMzQgfTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTk9OX0xJVEVSQUxfQ09OU1QgPSAxMjMgKyA0NTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgT0JKX0NPTlNUID0gbmV3IFRlc3RDbGFzcygpO1xuXG4gICAgLy8gcHJpdmF0ZVxuICAgIHByaXZhdGUgc3RhdGljIE5PTl9QUklNSVRJVkUgPSBuZXcgVGVzdENsYXNzKCk7XG5cbiAgICAvKipcbiAgICAgKiBwMiBjYW5ub3QgYmUgcmVzb2x2ZWQsIGJ1dCBpdCdzIG9wdGlvbmFsLCBzbyB3ZSBleHBlY3QgdGhlIHR5cGVzcGVjIHRvIGp1c3QgaW5jbHVkZSBwMVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyPzogKCkgPT4gdm9pZCwgcDM/OiBzdHJpbmcpIHtcbiAgICAgICAgcDE7IHAyOyBwMzsgVGVzdENsYXNzNC5OT05fUFJJTUlUSVZFO1xuICAgIH1cbn1cblxuLy9cbi8vIFRoaXMgaXMgZ29vZCBzaW5jZSB0aGVyZSBhcmUgbm8gbmFtZXNhcGNlcyB3aXRob3V0IGEgdHlwZS5cbi8vXG5cbmV4cG9ydCBjbGFzcyBBIHsgfVxuZXhwb3J0IG5hbWVzcGFjZSBBIHsgZXhwb3J0IGNsYXNzIEIgeyB9IH1cbmV4cG9ydCBuYW1lc3BhY2UgQS5CIHsgZXhwb3J0IGNsYXNzIEMgeyB9IH1cblxuLy9cbi8vIFVzZSBhIHR5cGUgZnJvbSBhbiBleHRlcm5hbCBkZXBlbmRlbmN5IGFzIGEgYmFzZSBjbGFzc1xuLy9cblxuZXhwb3J0IGNsYXNzIEV4cG9zZUV4dGVybmFsRGVwZW5kZW5jeSBleHRlbmRzIG15ZGVwLk15RGVwVHlwZSB7XG4gICAgZnJvdGg6IG51bWJlciA9IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVdpdGhBbnlWYWx1ZSB7XG4gICAgbXlwcm9wOiBhbnkgPSB1bmRlZmluZWQ7XG59XG5cbi8vIGpzaWkgYWxzbyBpbmRpY2F0ZXMgd2hldGhlciBwcm9wZXJ0aWVzIGhhdmUgYmFja2luZyBsb2dpYyBvciBqdXN0IHJlcHJlc2VudCByYXcgZGF0YVxuXG5leHBvcnQgY2xhc3MgSGFzTG9naWMge1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIGhhdmUgbG9naWM9dHJ1ZVxuICAgICAqL1xuICAgIGdldCBwcm9wV2l0aExvZ2ljKCkge1xuICAgICAgICByZXR1cm4gMTJcbiAgICB9XG5cbiAgICBzZXQgcHJvcFdpdGhMb2dpYyh2YWw6IG51bWJlcikge1xuICAgICAgICB2YWw7XG4gICAgfVxuXG4gICAgcHJvcFdpdGhvdXRMb2dpYzogc3RyaW5nID0gJyc7XG59XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25hbFJlZiB7XG4gICAgcHJvcDE/OiBUb2tlblxuICAgIHByb3AyOiBUb2tlbiB8IHVuZGVmaW5lZCA9IG5ldyBUb2tlbigpO1xufVxuXG5leHBvcnQgY2xhc3MgVW5pb25Qcm9wZXJ0aWVzIHtcbiAgICB3aXRoUHJpbWl0aXZlMTogVG9rZW4gfCBzdHJpbmcgPSAnJztcbiAgICB3aXRoUHJpbWl0aXZlMjogc3RyaW5nIHwgVG9rZW4gPSAnJztcbiAgICBub1ByaW1pdGl2ZTogVG9rZW4gfCBUZXN0Q2xhc3MyIHwgVGVzdENsYXNzMyA9IG5ldyBUZXN0Q2xhc3MzKCk7XG59XG5cbi8vXG4vLyBqc2lpIGlzIGV4cGVjdGVkIHRvIGF1dG9tYXRpY2FsbHkgY29weSB0aGUgaW5pdGlhbGl6ZXIgZnJvbSBUZXN0Q2xhc3MzXG4vL1xuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihhcmcxOiBzdHJpbmcsIGFyZzI6IGJvb2xlYW4pIHtcbiAgICAgICAgYXJnMTsgYXJnMjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnN1cmVJbml0aWFsaXplciBleHRlbmRzIEVuc3VyZUluaXRpYWxpemVyQmFzZSB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIEVuc3VyZUluaXRpYWxpemVyMiBleHRlbmRzIEVuc3VyZUluaXRpYWxpemVyIHtcblxufVxuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXIzIGV4dGVuZHMgRW5zdXJlSW5pdGlhbGl6ZXIyIHtcbiAgICBjb25zdHJ1Y3RvcihpaGF2ZW15b3duaW5pdGlhbGl6ZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgc3VwZXIoJ2JvbycsIGZhbHNlKVxuICAgICAgICBpaGF2ZW15b3duaW5pdGlhbGl6ZXI7XG4gICAgfVxufVxuXG4vLyBoZXJlIGluaXRpYWxpemVyIGhhcyBvbmx5IG9wdGlvbmFsIHZhbHVlc1xuLy8gaW4gdGhlIG1lYW50aW1lIHdlIHN0aWxsIGV4cGVjdCBpdCB0byBiZSBjbG9uZWQgYXMgaXMgZm9yIGxhY2sgb2YgYSBldmlkZW5jZSB0aGF0IHdlIHNob3VsZCBkbyBzb21ldGhpbmcgZWxzZVxuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXJCYXNlMiB7XG4gICAgY29uc3RydWN0b3IoYXJnMT86IHN0cmluZywgYXJnMj86IGJvb2xlYW4pIHtcbiAgICAgICAgYXJnMTsgYXJnMjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnN1cmVJbml0aWFsaXplcjQgZXh0ZW5kcyBFbnN1cmVJbml0aWFsaXplckJhc2UyIHtcblxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydGllc0luQ3RvciB7XG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVhZG9ubHlQcm9wOiBzdHJpbmcsIHB1YmxpYyByZWFkV3JpdGVQcm9wOiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgcHJpdmF0ZVByb3A6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlYWRXcml0ZVByb3AgPSB0aGlzLnByaXZhdGVQcm9wO1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE15QWJzdHJhY3RDbGFzcyB7XG4gICAgbm9ybWFsTWV0aG9kKCkge1xuXG4gICAgfVxuXG4gICAgYWJzdHJhY3QgYWJzdHJhY3RNZXRob2QodmFsdWU6IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlcml2ZWRBYnN0cmFjdCBleHRlbmRzIE15QWJzdHJhY3RDbGFzcyB7XG59XG5cbmV4cG9ydCBjbGFzcyBDbGFzc1dpdGhQcm90ZWN0ZWRTdHVmZiB7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhcmFtcHJvcDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZm9vOiBudW1iZXIgPSAwO1xuXG4gICAgcHJvdGVjdGVkIGdldCBnb28oKSB7XG4gICAgICAgIHJldHVybiAxMjM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldCBnb28odmFsOiBudW1iZXIpIHtcbiAgICAgICAgdmFsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcm90ZWN0ZWRNZXRob2QodmFsOiBzdHJpbmcpOiBudW1iZXIgeyBcbiAgICAgICAgdmFsO1xuICAgICAgICByZXR1cm4gMTIzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFzeW5jVmlydHVhbE1ldGhvZHMge1xuICAgIGFzeW5jIG92ZXJyaWRlTWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIDQyXG4gICAgfVxuXG4gICAgZG9udE92ZXJyaWRlTWUoKSB7XG4gICAgICAgIHJldHVybiA0MjtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9qc2lpLXRlc3QvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IGpzaWkkbXlfZGVwJDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpzaWkkbXlfZGVwJFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuaGkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAndGhpcyBpcyBjb21pbmcgZnJvbSBhIGJ1bmRsZWQgZGVwZW5kZW5jeS4gdGhpcyBtZWFucyB0aGF0IGl0cyBjb2RlIGlzIGdvaW5nIHRvIGJlIGluY2x1ZGVkIGluIG91ciBidW5kbGUuanMgZmlsZSc7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Rlc3QvanNpaS10ZXN0L25vZGVfbW9kdWxlcy9teS1idW5kbGVkLWRlcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9

// ================== jsii type info - BEGIN =========================
jsii$jsii_test$.Token.__jsii__ = {"fqn":"jsii$jsii_test$.Token"};
jsii$jsii_test$.TestClass3.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass3"};
jsii$jsii_test$.TestClass2.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass2"};
jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2"};
jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo"};
jsii$jsii_test$.BaseClass.__jsii__ = {"fqn":"jsii$jsii_test$.BaseClass"};
jsii$jsii_test$.TestClass.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass"};
jsii$jsii_test$.TestEnum.__jsii__ = {"fqn":"jsii$jsii_test$.TestEnum"};
jsii$jsii_test$.TestEnum.SubTypeOfTestEnum.__jsii__ = {"fqn":"jsii$jsii_test$.TestEnum.SubTypeOfTestEnum"};
jsii$jsii_test$.TestClass4.__jsii__ = {"fqn":"jsii$jsii_test$.TestClass4"};
jsii$jsii_test$.A.__jsii__ = {"fqn":"jsii$jsii_test$.A"};
jsii$jsii_test$.A.B.__jsii__ = {"fqn":"jsii$jsii_test$.A.B"};
jsii$jsii_test$.A.B.C.__jsii__ = {"fqn":"jsii$jsii_test$.A.B.C"};
jsii$jsii_test$.ExposeExternalDependency.__jsii__ = {"fqn":"jsii$jsii_test$.ExposeExternalDependency"};
jsii$jsii_test$.PropertyWithAnyValue.__jsii__ = {"fqn":"jsii$jsii_test$.PropertyWithAnyValue"};
jsii$jsii_test$.HasLogic.__jsii__ = {"fqn":"jsii$jsii_test$.HasLogic"};
jsii$jsii_test$.OptionalRef.__jsii__ = {"fqn":"jsii$jsii_test$.OptionalRef"};
jsii$jsii_test$.UnionProperties.__jsii__ = {"fqn":"jsii$jsii_test$.UnionProperties"};
jsii$jsii_test$.EnsureInitializerBase.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializerBase"};
jsii$jsii_test$.EnsureInitializer.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializer"};
jsii$jsii_test$.EnsureInitializer2.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializer2"};
jsii$jsii_test$.EnsureInitializer3.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializer3"};
jsii$jsii_test$.EnsureInitializerBase2.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializerBase2"};
jsii$jsii_test$.EnsureInitializer4.__jsii__ = {"fqn":"jsii$jsii_test$.EnsureInitializer4"};
jsii$jsii_test$.PropertiesInCtor.__jsii__ = {"fqn":"jsii$jsii_test$.PropertiesInCtor"};
jsii$jsii_test$.MyAbstractClass.__jsii__ = {"fqn":"jsii$jsii_test$.MyAbstractClass"};
jsii$jsii_test$.DerivedAbstract.__jsii__ = {"fqn":"jsii$jsii_test$.DerivedAbstract"};
jsii$jsii_test$.ClassWithProtectedStuff.__jsii__ = {"fqn":"jsii$jsii_test$.ClassWithProtectedStuff"};
jsii$jsii_test$.AsyncVirtualMethods.__jsii__ = {"fqn":"jsii$jsii_test$.AsyncVirtualMethods"};
jsii$jsii_test$.__jsii__ = {"schema":"jsii/1.0","types":{"jsii$jsii_test$.Token":{"kind":"class","fqn":"jsii$jsii_test$.Token","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"Token","initializer":{"initializer":true}},"jsii$jsii_test$.TestClass3":{"kind":"class","properties":[{"name":"hello","type":{"primitive":"string"}}],"fqn":"jsii$jsii_test$.TestClass3","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"TestClass3","initializer":{"initializer":true}},"jsii$jsii_test$.TestClass2":{"subtypes":["jsii$jsii_test$.TestClass2.SubTypeOfTestClass2"],"kind":"class","properties":[{"name":"a","type":{"primitive":"number"}},{"name":"b","type":{"primitive":"string"}},{"name":"c","type":{"fqn":"jsii$jsii_test$.TestClass3"}}],"fqn":"jsii$jsii_test$.TestClass2","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"TestClass2","initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string"}},{"name":"arg2","type":{"fqn":"jsii$jsii_test$.TestClass3"}},{"name":"arg3","type":{"primitive":"number","optional":true}},{"name":"arg4","type":{"primitive":"boolean","optional":true}}],"initializer":true}},"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2":{"subtypes":["jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo"],"kind":"class","properties":[{"name":"yourProp","type":{"primitive":"string","optional":true},"immutable":true}],"fqn":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$.TestClass2","name":"SubTypeOfTestClass2","initializer":{"initializer":true},"parenttype":"jsii$jsii_test$.TestClass2"},"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo":{"kind":"class","fqn":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2","name":"Foo","initializer":{"initializer":true},"parenttype":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2"},"jsii$jsii_test$.BaseClass":{"kind":"class","properties":[{"name":"baseProp","type":{"primitive":"string"}}],"fqn":"jsii$jsii_test$.BaseClass","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"BaseClass","initializer":{"initializer":true}},"jsii$jsii_test$.TestClass":{"docs":{"link":"http://amazon.com","description":"Description","author":"benisrae","comment":"This is the comment section"},"kind":"class","properties":[{"docs":{"comment":"This is documentation for readonlyString"},"name":"readonlyString","type":{"primitive":"string"},"immutable":true},{"name":"mutableNumber","type":{"primitive":"number"}},{"docs":{"comment":"Read only boolean."},"name":"readonlyBoolean","type":{"primitive":"boolean"},"immutable":true},{"docs":{"example":"This is an example","comment":"Sets the mutable complex object.\nDocumentation for getter"},"name":"mutableComplex","type":{"fqn":"jsii$jsii_test$.TestClass2"}},{"name":"optionalMutableBoolean","type":{"primitive":"boolean","optional":true}},{"name":"optionalReadonlyDate","type":{"primitive":"date","optional":true},"immutable":true},{"name":"listOfStrings","type":{"collection":{"elementtype":{"primitive":"string"},"kind":"array"}}},{"name":"optionalListOfNumbers","type":{"collection":{"elementtype":{"primitive":"number"},"kind":"array"},"optional":true}},{"name":"listOfComplex","type":{"collection":{"elementtype":{"fqn":"jsii$jsii_test$.TestClass2"},"kind":"array"}}},{"docs":{"description":"Map of booleans here","comment":"And a comment"},"name":"mapOfBooleans","type":{"collection":{"elementtype":{"primitive":"boolean"},"kind":"map"}}},{"name":"mapOfComplex","type":{"collection":{"elementtype":{"fqn":"jsii$jsii_test$.TestClass3"},"kind":"map"}}},{"name":"stringOrRef","type":{"union":{"types":[{"primitive":"string"},{"fqn":"jsii$jsii_test$.Token"}]}}},{"docs":{"comment":"Docs on getter prevail.\nDocs on setter are not allowed."},"name":"getterBeforeSetter","type":{"primitive":"string"}},{"name":"arrayGetter","type":{"collection":{"elementtype":{"fqn":"jsii$jsii_test$.TestEnum"},"kind":"array"}},"immutable":true},{"name":"mapGetter","type":{"collection":{"elementtype":{"fqn":"jsii$jsii_test$.TestClass2"},"kind":"map"}},"immutable":true},{"name":"jsonProperty","type":{"primitive":"json"}},{"name":"optionalBooleanOrRef","type":{"union":{"types":[{"primitive":"boolean"},{"fqn":"jsii$jsii_test$.Token"}]},"optional":true}},{"name":"optionalAsUnion","type":{"primitive":"string","optional":true}},{"name":"arrayOfOptionals","type":{"collection":{"elementtype":{"fqn":"jsii$jsii_test$.TestClass3","optional":true},"kind":"array"}}},{"name":"readonlyMapOfOptionalsOrRefs","type":{"collection":{"elementtype":{"primitive":"string","optional":true},"kind":"map"}},"immutable":true}],"methods":[{"docs":{"comment":"Documentation for method"},"name":"methodWithNoParameters"},{"parameters":[{"docs":{"param":"param1 Doc for param1","comment":"Doc for param1"},"name":"param1","type":{"primitive":"string"}},{"docs":{"param":"param2 Doc for param2","comment":"Doc for param2"},"name":"param2","type":{"primitive":"number"}},{"name":"param3","type":{"fqn":"jsii$jsii_test$.TestClass3","optional":true}},{"name":"param4","type":{"fqn":"jsii$jsii_test$.TestClass2","optional":true}}],"docs":{"param":"param2 Doc for param2","comment":"Documentation for methodWithParams"},"name":"methodWithParams","returns":{"primitive":"boolean"}}],"fqn":"jsii$jsii_test$.TestClass","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"TestClass","base":{"fqn":"jsii$jsii_test$.BaseClass"},"initializer":{"initializer":true}},"jsii$jsii_test$.TestEnum":{"docs":{"comment":"This is the documentation for this enum."},"subtypes":["jsii$jsii_test$.TestEnum.SubTypeOfTestEnum"],"kind":"enum","members":[{"name":"Value1"},{"name":"Value2"},{"name":"Value3"}],"fqn":"jsii$jsii_test$.TestEnum","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"TestEnum"},"jsii$jsii_test$.TestEnum.SubTypeOfTestEnum":{"kind":"class","properties":[{"name":"myProp","type":{"primitive":"number"}}],"fqn":"jsii$jsii_test$.TestEnum.SubTypeOfTestEnum","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$.TestEnum","name":"SubTypeOfTestEnum","initializer":{"initializer":true},"parenttype":"jsii$jsii_test$.TestEnum"},"jsii$jsii_test$.TestClass4":{"kind":"class","consts":[{"name":"STRING_CONST","primitive":"string","stringValue":"Hello"},{"name":"STRING_CONST_WITH_DOUBLE_QUOTES","primitive":"string","stringValue":"World"},{"name":"NUMBER_CONST","primitive":"number","numberValue":1234},{"name":"DOUBLE_CONST","primitive":"number","numberValue":1234.44},{"name":"BOOLEAN_CONST_FALSE","primitive":"boolean","booleanValue":false},{"name":"BOOLEAN_CONST_TRUE","primitive":"boolean","booleanValue":false}],"fqn":"jsii$jsii_test$.TestClass4","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"TestClass4","initializer":{"parameters":[{"name":"p1","type":{"primitive":"string"}}],"docs":{"comment":"p2 cannot be resolved, but it's optional, so we expect the typespec to just include p1"},"initializer":true}},"jsii$jsii_test$.A":{"subtypes":["jsii$jsii_test$.A.B"],"kind":"class","fqn":"jsii$jsii_test$.A","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"A","initializer":{"initializer":true}},"jsii$jsii_test$.A.B":{"subtypes":["jsii$jsii_test$.A.B.C"],"kind":"class","fqn":"jsii$jsii_test$.A.B","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$.A","name":"B","initializer":{"initializer":true},"parenttype":"jsii$jsii_test$.A"},"jsii$jsii_test$.A.B.C":{"kind":"class","fqn":"jsii$jsii_test$.A.B.C","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$.A.B","name":"C","initializer":{"initializer":true},"parenttype":"jsii$jsii_test$.A.B"},"jsii$jsii_test$.ExposeExternalDependency":{"kind":"class","properties":[{"name":"froth","type":{"primitive":"number"}}],"fqn":"jsii$jsii_test$.ExposeExternalDependency","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"ExposeExternalDependency","base":{"fqn":"jsii$my_dep$.MyDepType"},"initializer":{"parameters":[{"name":"p","type":{"primitive":"number"}}],"initializer":true}},"jsii$jsii_test$.PropertyWithAnyValue":{"kind":"class","properties":[{"name":"myprop","type":{"primitive":"any"}}],"fqn":"jsii$jsii_test$.PropertyWithAnyValue","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"PropertyWithAnyValue","initializer":{"initializer":true}},"jsii$jsii_test$.HasLogic":{"kind":"class","properties":[{"docs":{"comment":"This property will have logic=true"},"name":"propWithLogic","type":{"primitive":"number"}},{"name":"propWithoutLogic","type":{"primitive":"string"}}],"fqn":"jsii$jsii_test$.HasLogic","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"HasLogic","initializer":{"initializer":true}},"jsii$jsii_test$.OptionalRef":{"kind":"class","properties":[{"name":"prop1","type":{"fqn":"jsii$jsii_test$.Token","optional":true}},{"name":"prop2","type":{"fqn":"jsii$jsii_test$.Token","optional":true}}],"fqn":"jsii$jsii_test$.OptionalRef","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"OptionalRef","initializer":{"initializer":true}},"jsii$jsii_test$.UnionProperties":{"kind":"class","properties":[{"name":"withPrimitive1","type":{"union":{"types":[{"primitive":"string"},{"fqn":"jsii$jsii_test$.Token"}]}}},{"name":"withPrimitive2","type":{"union":{"types":[{"primitive":"string"},{"fqn":"jsii$jsii_test$.Token"}]}}},{"name":"noPrimitive","type":{"union":{"types":[{"fqn":"jsii$jsii_test$.Token"},{"fqn":"jsii$jsii_test$.TestClass3"},{"fqn":"jsii$jsii_test$.TestClass2"}]}}}],"fqn":"jsii$jsii_test$.UnionProperties","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"UnionProperties","initializer":{"initializer":true}},"jsii$jsii_test$.EnsureInitializerBase":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializerBase","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializerBase","initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string"}},{"name":"arg2","type":{"primitive":"boolean"}}],"initializer":true}},"jsii$jsii_test$.EnsureInitializer":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializer","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializer","base":{"fqn":"jsii$jsii_test$.EnsureInitializerBase"},"initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string"}},{"name":"arg2","type":{"primitive":"boolean"}}],"initializer":true}},"jsii$jsii_test$.EnsureInitializer2":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializer2","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializer2","base":{"fqn":"jsii$jsii_test$.EnsureInitializer"},"initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string"}},{"name":"arg2","type":{"primitive":"boolean"}}],"initializer":true}},"jsii$jsii_test$.EnsureInitializer3":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializer3","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializer3","base":{"fqn":"jsii$jsii_test$.EnsureInitializer2"},"initializer":{"parameters":[{"name":"ihavemyowninitializer","type":{"primitive":"boolean"}}],"initializer":true}},"jsii$jsii_test$.EnsureInitializerBase2":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializerBase2","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializerBase2","initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string","optional":true}},{"name":"arg2","type":{"primitive":"boolean","optional":true}}],"initializer":true}},"jsii$jsii_test$.EnsureInitializer4":{"kind":"class","fqn":"jsii$jsii_test$.EnsureInitializer4","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"EnsureInitializer4","base":{"fqn":"jsii$jsii_test$.EnsureInitializerBase2"},"initializer":{"parameters":[{"name":"arg1","type":{"primitive":"string","optional":true}},{"name":"arg2","type":{"primitive":"boolean","optional":true}}],"initializer":true}},"jsii$jsii_test$.PropertiesInCtor":{"kind":"class","properties":[{"name":"readonlyProp","type":{"primitive":"string"},"immutable":true},{"name":"readWriteProp","type":{"primitive":"string"}}],"fqn":"jsii$jsii_test$.PropertiesInCtor","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"PropertiesInCtor","initializer":{"parameters":[{"name":"readonlyProp","type":{"primitive":"string"}},{"name":"readWriteProp","type":{"primitive":"string"}},{"name":"privateProp","type":{"primitive":"string"}}],"initializer":true}},"jsii$jsii_test$.MyAbstractClass":{"kind":"class","methods":[{"name":"normalMethod"},{"parameters":[{"name":"value","type":{"primitive":"number"}}],"name":"abstractMethod","abstract":true,"returns":{"primitive":"string"}}],"fqn":"jsii$jsii_test$.MyAbstractClass","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"MyAbstractClass","abstract":true,"initializer":{"initializer":true}},"jsii$jsii_test$.DerivedAbstract":{"kind":"class","fqn":"jsii$jsii_test$.DerivedAbstract","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"DerivedAbstract","base":{"fqn":"jsii$jsii_test$.MyAbstractClass"},"abstract":true,"initializer":{"initializer":true}},"jsii$jsii_test$.ClassWithProtectedStuff":{"kind":"class","properties":[{"name":"paramprop","type":{"primitive":"string"},"protected":true},{"name":"foo","type":{"primitive":"number"},"immutable":true,"protected":true},{"name":"goo","type":{"primitive":"number"},"protected":true}],"methods":[{"parameters":[{"name":"val","type":{"primitive":"string"}}],"name":"protectedMethod","protected":true,"returns":{"primitive":"number"}}],"fqn":"jsii$jsii_test$.ClassWithProtectedStuff","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"ClassWithProtectedStuff","initializer":{"parameters":[{"name":"paramprop","type":{"primitive":"string"}}],"initializer":true}},"jsii$jsii_test$.AsyncVirtualMethods":{"kind":"class","methods":[{"name":"overrideMe","returns":{"primitive":"number","promise":true}},{"name":"dontOverrideMe","returns":{"primitive":"number"}}],"fqn":"jsii$jsii_test$.AsyncVirtualMethods","module":"jsii$jsii_test$","namespace":"jsii$jsii_test$","name":"AsyncVirtualMethods","initializer":{"initializer":true}}},"nametree":{"jsii$jsii_test$":{"Token":{"_":"jsii$jsii_test$.Token"},"TestClass3":{"_":"jsii$jsii_test$.TestClass3"},"TestClass2":{"_":"jsii$jsii_test$.TestClass2","SubTypeOfTestClass2":{"_":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2","Foo":{"_":"jsii$jsii_test$.TestClass2.SubTypeOfTestClass2.Foo"}}},"BaseClass":{"_":"jsii$jsii_test$.BaseClass"},"TestClass":{"_":"jsii$jsii_test$.TestClass"},"TestEnum":{"_":"jsii$jsii_test$.TestEnum","SubTypeOfTestEnum":{"_":"jsii$jsii_test$.TestEnum.SubTypeOfTestEnum"}},"TestClass4":{"_":"jsii$jsii_test$.TestClass4"},"A":{"_":"jsii$jsii_test$.A","B":{"_":"jsii$jsii_test$.A.B","C":{"_":"jsii$jsii_test$.A.B.C"}}},"ExposeExternalDependency":{"_":"jsii$jsii_test$.ExposeExternalDependency"},"PropertyWithAnyValue":{"_":"jsii$jsii_test$.PropertyWithAnyValue"},"HasLogic":{"_":"jsii$jsii_test$.HasLogic"},"OptionalRef":{"_":"jsii$jsii_test$.OptionalRef"},"UnionProperties":{"_":"jsii$jsii_test$.UnionProperties"},"EnsureInitializerBase":{"_":"jsii$jsii_test$.EnsureInitializerBase"},"EnsureInitializer":{"_":"jsii$jsii_test$.EnsureInitializer"},"EnsureInitializer2":{"_":"jsii$jsii_test$.EnsureInitializer2"},"EnsureInitializer3":{"_":"jsii$jsii_test$.EnsureInitializer3"},"EnsureInitializerBase2":{"_":"jsii$jsii_test$.EnsureInitializerBase2"},"EnsureInitializer4":{"_":"jsii$jsii_test$.EnsureInitializer4"},"PropertiesInCtor":{"_":"jsii$jsii_test$.PropertiesInCtor"},"MyAbstractClass":{"_":"jsii$jsii_test$.MyAbstractClass"},"DerivedAbstract":{"_":"jsii$jsii_test$.DerivedAbstract"},"ClassWithProtectedStuff":{"_":"jsii$jsii_test$.ClassWithProtectedStuff"},"AsyncVirtualMethods":{"_":"jsii$jsii_test$.AsyncVirtualMethods"}}},"typecount":29,"name":"jsii$jsii_test$","package":"jsii-test","version":"42.42.42","dependencies":{"jsii$my_dep$":{"schema":"jsii/1.0","types":{"jsii$my_dep$.MyDepType":{"kind":"class","properties":[{"getter":true,"setter":true,"name":"foo","type":{"primitive":"string"}},{"getter":true,"setter":true,"name":"goo","type":{"fqn":"jsii$my_indirect_dep$.IndirectDep"}}],"fqn":"jsii$my_dep$.MyDepType","module":"jsii$my_dep$","namespace":"jsii$my_dep$","name":"MyDepType","initializer":{"parameters":[{"name":"p","type":{"primitive":"number"}}],"initializer":true}}},"nametree":{"jsii$my_dep$":{"MyDepType":{"_":"jsii$my_dep$.MyDepType"}}},"typecount":1,"name":"jsii$my_dep$","version":"2.5.2","package":"my-dep","dependencies":{"jsii$my_indirect_dep$":{"version":"1.1.1","module":"jsii$my_indirect_dep$","package":"my-indirect-dep","names":{"java":"com.acme.myindirectdep"}}},"names":{"java":"com.acme.mydep"}}},"bundled":{"my-bundled-dep":"1.2.3"},"names":{"java":"com.amazon.jsii.test","js":"jsii-test"},"nativenames":{"jsii$jsii_test$":{"java":"com.amazon.jsii.test","js":"jsii-test"},"jsii$my_dep$":{"java":"com.acme.mydep"}},"code":"var jsii$jsii_test$ =\n/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mydep = __webpack_require__(1);\nconst my_bundled_dep_1 = __webpack_require__(2);\nclass Token {\n}\nexports.Token = Token;\nclass TestClass3 {\n    constructor() {\n        this.hello = '';\n    }\n}\nexports.TestClass3 = TestClass3;\nclass TestClass2 {\n    // last argument is union, but it's optional, so the resulting jsii will just not include it.\n    constructor(arg1 = 'hello', arg2, arg3, arg4, arg5) {\n        this.a = 0;\n        this.b = '';\n        this.c = new TestClass3();\n        arg1;\n        arg2;\n        arg3;\n        arg4;\n        arg5;\n        my_bundled_dep_1.hi();\n    }\n}\nexports.TestClass2 = TestClass2;\nclass BaseClass {\n    constructor() {\n        this.baseProp = '';\n    }\n}\nexports.BaseClass = BaseClass;\n/**\n * This is the comment section\n * @link http://amazon.com\n * @description Description\n * @author benisrae\n */\nclass TestClass extends BaseClass {\n    constructor() {\n        // properties\n        super(...arguments);\n        /**\n         * This is documentation for readonlyString\n         */\n        this.readonlyString = '';\n        this.mutableNumber = 0;\n        // list\n        this.listOfStrings = [];\n        this.listOfComplex = [];\n        // map\n        /**\n         * And a comment\n         * @description Map of booleans here\n         */\n        this.mapOfBooleans = {};\n        this.mapOfComplex = {};\n        // refs\n        this.stringOrRef = '';\n        this.jsonProperty = {};\n        this.optionalAsUnion = '';\n        this.arrayOfOptionals = new Array();\n        this.readonlyMapOfOptionalsOrRefs = {};\n    }\n    /**\n     * Read only boolean.\n     */\n    get readonlyBoolean() {\n        return false;\n    }\n    /**\n     * Sets the mutable complex object.\n     */\n    set mutableComplex(value) {\n        value;\n    }\n    /**\n     * Documentation for getter\n     * @example This is an example\n     */\n    get mutableComplex() {\n        return new TestClass2(\"hello\", new TestClass3(), 122);\n    }\n    _ignored() {\n        // this method should not be included\n    }\n    // methods\n    /**\n     * Documentation for method\n     */\n    methodWithNoParameters() { }\n    /**\n     * Documentation for methodWithParams\n     * @param param1 Doc for param1\n     * @param param2 Doc for param2\n     */\n    methodWithParams(param1, param2, param3, param4) {\n        param1;\n        param2;\n        param3;\n        param4;\n        this.notVisible();\n        return true;\n    }\n    notVisible() {\n    }\n    /**\n     * Docs on getter prevail.\n     */\n    get getterBeforeSetter() {\n        return 'hello';\n    }\n    /**\n     * Docs on setter are not allowed.\n     */\n    set getterBeforeSetter(value) {\n        value;\n    }\n    get arrayGetter() {\n        return [];\n    }\n    get mapGetter() {\n        return { \"hello\": { a: 1, b: 'hello', c: { hello: 'hello' } } };\n    }\n}\nexports.TestClass = TestClass;\n/**\n * This is the documentation for this enum.\n */\nvar TestEnum;\n(function (TestEnum) {\n    /**\n     * This is doc for Value1\n     */\n    TestEnum[TestEnum[\"Value1\"] = 0] = \"Value1\";\n    /**\n     * Doc for value2\n     * @author benisrae@\n     */\n    TestEnum[TestEnum[\"Value2\"] = 1] = \"Value2\";\n    TestEnum[\"Value3\"] = \"Hello\";\n})(TestEnum = exports.TestEnum || (exports.TestEnum = {}));\n(function (TestEnum) {\n    class SubTypeOfTestEnum {\n        constructor() {\n            this.myProp = 12;\n        }\n    }\n    TestEnum.SubTypeOfTestEnum = SubTypeOfTestEnum;\n})(TestEnum = exports.TestEnum || (exports.TestEnum = {}));\n(function (TestClass2) {\n    class SubTypeOfTestClass2 {\n        constructor() {\n            this.yourProp = \"Hello\";\n        }\n    }\n    TestClass2.SubTypeOfTestClass2 = SubTypeOfTestClass2;\n})(TestClass2 = exports.TestClass2 || (exports.TestClass2 = {}));\n(function (TestClass2) {\n    var SubTypeOfTestClass2;\n    (function (SubTypeOfTestClass2) {\n        class Foo {\n        }\n        SubTypeOfTestClass2.Foo = Foo;\n    })(SubTypeOfTestClass2 = TestClass2.SubTypeOfTestClass2 || (TestClass2.SubTypeOfTestClass2 = {}));\n})(TestClass2 = exports.TestClass2 || (exports.TestClass2 = {}));\n//\n// Const literals\n// jsii allows constant literals and actually includes the values in the jsii spec\n//\nclass TestClass4 {\n    /**\n     * p2 cannot be resolved, but it's optional, so we expect the typespec to just include p1\n     */\n    constructor(p1, p2, p3) {\n        p1;\n        p2;\n        p3;\n        TestClass4.NON_PRIMITIVE;\n    }\n}\n// primitive consts values are allowed but only if they are simple literal data values\n// no math, no evaluation. literally!!\nTestClass4.STRING_CONST = 'Hello';\nTestClass4.STRING_CONST_WITH_DOUBLE_QUOTES = \"World\";\nTestClass4.NUMBER_CONST = 1234;\nTestClass4.DOUBLE_CONST = 1234.44;\nTestClass4.BOOLEAN_CONST_FALSE = false;\nTestClass4.BOOLEAN_CONST_TRUE = false;\n// ignored (with a warning) because it's a non-primitive literal\nTestClass4.OBJ_LITERAL_CONST = { foo: 1234 };\nTestClass4.NON_LITERAL_CONST = 123 + 45;\nTestClass4.OBJ_CONST = new TestClass();\n// private\nTestClass4.NON_PRIMITIVE = new TestClass();\nexports.TestClass4 = TestClass4;\n//\n// This is good since there are no namesapces without a type.\n//\nclass A {\n}\nexports.A = A;\n(function (A) {\n    class B {\n    }\n    A.B = B;\n})(A = exports.A || (exports.A = {}));\n(function (A) {\n    var B;\n    (function (B) {\n        class C {\n        }\n        B.C = C;\n    })(B = A.B || (A.B = {}));\n})(A = exports.A || (exports.A = {}));\n//\n// Use a type from an external dependency as a base class\n//\nclass ExposeExternalDependency extends mydep.MyDepType {\n    constructor() {\n        super(...arguments);\n        this.froth = 0;\n    }\n}\nexports.ExposeExternalDependency = ExposeExternalDependency;\nclass PropertyWithAnyValue {\n    constructor() {\n        this.myprop = undefined;\n    }\n}\nexports.PropertyWithAnyValue = PropertyWithAnyValue;\n// jsii also indicates whether properties have backing logic or just represent raw data\nclass HasLogic {\n    constructor() {\n        this.propWithoutLogic = '';\n    }\n    /**\n     * This property will have logic=true\n     */\n    get propWithLogic() {\n        return 12;\n    }\n    set propWithLogic(val) {\n        val;\n    }\n}\nexports.HasLogic = HasLogic;\nclass OptionalRef {\n    constructor() {\n        this.prop2 = new Token();\n    }\n}\nexports.OptionalRef = OptionalRef;\nclass UnionProperties {\n    constructor() {\n        this.withPrimitive1 = '';\n        this.withPrimitive2 = '';\n        this.noPrimitive = new TestClass3();\n    }\n}\nexports.UnionProperties = UnionProperties;\n//\n// jsii is expected to automatically copy the initializer from TestClass3\n//\nclass EnsureInitializerBase {\n    constructor(arg1, arg2) {\n        arg1;\n        arg2;\n    }\n}\nexports.EnsureInitializerBase = EnsureInitializerBase;\nclass EnsureInitializer extends EnsureInitializerBase {\n}\nexports.EnsureInitializer = EnsureInitializer;\nclass EnsureInitializer2 extends EnsureInitializer {\n}\nexports.EnsureInitializer2 = EnsureInitializer2;\nclass EnsureInitializer3 extends EnsureInitializer2 {\n    constructor(ihavemyowninitializer) {\n        super('boo', false);\n        ihavemyowninitializer;\n    }\n}\nexports.EnsureInitializer3 = EnsureInitializer3;\n// here initializer has only optional values\n// in the meantime we still expect it to be cloned as is for lack of a evidence that we should do something else\nclass EnsureInitializerBase2 {\n    constructor(arg1, arg2) {\n        arg1;\n        arg2;\n    }\n}\nexports.EnsureInitializerBase2 = EnsureInitializerBase2;\nclass EnsureInitializer4 extends EnsureInitializerBase2 {\n}\nexports.EnsureInitializer4 = EnsureInitializer4;\nclass PropertiesInCtor {\n    constructor(readonlyProp, readWriteProp, privateProp) {\n        this.readonlyProp = readonlyProp;\n        this.readWriteProp = readWriteProp;\n        this.privateProp = privateProp;\n        this.readWriteProp = this.privateProp;\n    }\n}\nexports.PropertiesInCtor = PropertiesInCtor;\nclass MyAbstractClass {\n    normalMethod() {\n    }\n}\nexports.MyAbstractClass = MyAbstractClass;\nclass DerivedAbstract extends MyAbstractClass {\n}\nexports.DerivedAbstract = DerivedAbstract;\nclass ClassWithProtectedStuff {\n    constructor(paramprop) {\n        this.paramprop = paramprop;\n        this.foo = 0;\n    }\n    get goo() {\n        return 123;\n    }\n    set goo(val) {\n        val;\n    }\n    protectedMethod(val) {\n        val;\n        return 123;\n    }\n}\nexports.ClassWithProtectedStuff = ClassWithProtectedStuff;\nclass AsyncVirtualMethods {\n    async overrideMe() {\n        return 42;\n    }\n    dontOverrideMe() {\n        return 42;\n    }\n}\nexports.AsyncVirtualMethods = AsyncVirtualMethods;\n\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports) {\n\nmodule.exports = jsii$my_dep$;\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nexports.__esModule = true;\nexports.hi = function () { return 'this is coming from a bundled dependency. this means that its code is going to be included in our bundle.js file'; };\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjMzYzU1ZDM1MjkzY2Y0YzkzYWEiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9qc2lpLXRlc3QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNpaSRteV9kZXAkXCIiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9qc2lpLXRlc3Qvbm9kZV9tb2R1bGVzL215LWJ1bmRsZWQtZGVwL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEscUNBQStCO0FBQy9CLGdEQUFtQztBQUVuQztDQUFzQjtBQUF0QixzQkFBc0I7QUFFdEI7SUFBQTtRQUNJLFVBQUssR0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUFBO0FBRkQsZ0NBRUM7QUFFRDtJQUtJLDZGQUE2RjtJQUM3RixZQUFZLElBQUksR0FBRyxPQUFPLEVBQUUsSUFBZ0IsRUFBRSxJQUF3QixFQUFFLElBQWMsRUFBRSxJQUE4QjtRQUx0SCxNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsTUFBQyxHQUFXLEVBQUUsQ0FBQztRQUNmLE1BQUMsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBSTdCLElBQUksQ0FBQztRQUFDLElBQUksQ0FBQztRQUFDLElBQUksQ0FBQztR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RUFBRTtJQUNiLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFSRCxrREFRQzs7Ozs7OztBQzdWRCw4Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQSwwQkFBMEIsMkhBQTJIIiwiZmlsZSI6ImpzaWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMzNjNTVkMzUyOTNjZjRjOTNhYSIsImltcG9ydCAqIGFzIG15ZGVwIGZyb20gJ215LWRlcCdcbmltcG9ydCB7IGhpIH0gZnJvbSAnbXktYnVuZGxlZC1kZXAnXG5cbmV4cG9ydCBjbGFzcyBUb2tlbiB7IH1cblxuZXhwb3J0IGNsYXNzIFRlc3RDbGFzczMge1xuICAgIGhlbGxvOiBzdHJpbmcgPSAnJztcbn1cblxuZXhwb3J0IGNsYXNzIFRlc3RDbGFzczIge1xuICAgIGE6IG51bWJlciA9IDA7XG4gICAgYjogc3RyaW5nID0gJyc7XG4gICAgYzogVGVzdENsYXNzMyA9IG5ldyBUZXN0Q2xhc3MzKCk7XG5cbiAgICAvLyBsYXN0IGFyZ3VtZW50IGlzIHVuaW9uLCBidXQgaXQncyBvcHRpb25hbCwgc28gdGhlIHJlc3VsdGluZyBqc2lpIHdpbGwganVzdCBub3QgaW5jbHVkZSBpdC5cbiAgICBjb25zdHJ1Y3RvcihhcmcxID0gJ2hlbGxvJywgYXJnMjogVGVzdENsYXNzMywgYXJnMzogbnVtYmVyIHwgdW5kZWZpbmVkLCBhcmc0PzogYm9vbGVhbiwgYXJnNT86IFRlc3RDbGFzczMgfCBUZXN0Q2xhc3MyKSB7XG4gICAgICAgIGFyZzE7IGFyZzI7IGFyZzM7IGFyZzQ7IGFyZzU7XG4gICAgICAgIGhpKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUNsYXNzIHtcbiAgICBiYXNlUHJvcDogc3RyaW5nID0gJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbWVudCBzZWN0aW9uXG4gKiBAbGluayBodHRwOi8vYW1hem9uLmNvbVxuICogQGRlc2NyaXB0aW9uIERlc2NyaXB0aW9uXG4gKiBAYXV0aG9yIGJlbmlzcmFlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0Q2xhc3MgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG4gICAgLy8gcHJvcGVydGllc1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBkb2N1bWVudGF0aW9uIGZvciByZWFkb25seVN0cmluZ1xuICAgICAqL1xuICAgIHJlYWRvbmx5IHJlYWRvbmx5U3RyaW5nOiBzdHJpbmcgPSAnJztcbiAgICBtdXRhYmxlTnVtYmVyOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBvbmx5IGJvb2xlYW4uXG4gICAgICovXG4gICAgZ2V0IHJlYWRvbmx5Qm9vbGVhbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG11dGFibGUgY29tcGxleCBvYmplY3QuXG4gICAgICovXG4gICAgc2V0IG11dGFibGVDb21wbGV4KHZhbHVlOiBUZXN0Q2xhc3MyKSB7XG4gICAgICAgIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3VtZW50YXRpb24gZm9yIGdldHRlclxuICAgICAqIEBleGFtcGxlIFRoaXMgaXMgYW4gZXhhbXBsZVxuICAgICAqL1xuICAgIGdldCBtdXRhYmxlQ29tcGxleCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0Q2xhc3MyKFwiaGVsbG9cIiwgbmV3IFRlc3RDbGFzczMoKSwgMTIyKTtcbiAgICB9XG5cbiAgICBfaWdub3JlZCgpIHtcbiAgICAgICAgLy8gdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZFxuICAgIH1cblxuICAgIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcblxuICAgIG9wdGlvbmFsTXV0YWJsZUJvb2xlYW4/OiBib29sZWFuXG4gICAgcmVhZG9ubHkgb3B0aW9uYWxSZWFkb25seURhdGU/OiBEYXRlXG4gXG4gICAgLy8gbGlzdFxuXG4gICAgbGlzdE9mU3RyaW5nczogc3RyaW5nW10gID0gW107XG4gICAgb3B0aW9uYWxMaXN0T2ZOdW1iZXJzPzogbnVtYmVyW107XG4gICAgbGlzdE9mQ29tcGxleDogVGVzdENsYXNzMltdID0gW107XG5cbiAgICAvLyBtYXBcblxuICAgIC8qKlxuICAgICAqIEFuZCBhIGNvbW1lbnRcbiAgICAgKiBAZGVzY3JpcHRpb24gTWFwIG9mIGJvb2xlYW5zIGhlcmVcbiAgICAgKi9cbiAgICBtYXBPZkJvb2xlYW5zOiB7IFsga2V5OiBzdHJpbmcgXTogYm9vbGVhbiB9ID0ge307XG4gICAgbWFwT2ZDb21wbGV4OiB7IFsga2V5OiBzdHJpbmddOiBUZXN0Q2xhc3MzIH0gPSB7fTtcblxuICAgIC8vIHJlZnNcblxuICAgIHN0cmluZ09yUmVmOiBUb2tlbiB8IHN0cmluZyA9ICcnO1xuXG4gICAgLy8gbWV0aG9kc1xuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRhdGlvbiBmb3IgbWV0aG9kXG4gICAgICovXG4gICAgbWV0aG9kV2l0aE5vUGFyYW1ldGVycygpIHsgfVxuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRhdGlvbiBmb3IgbWV0aG9kV2l0aFBhcmFtc1xuICAgICAqIEBwYXJhbSBwYXJhbTEgRG9jIGZvciBwYXJhbTFcbiAgICAgKiBAcGFyYW0gcGFyYW0yIERvYyBmb3IgcGFyYW0yXG4gICAgICovXG4gICAgbWV0aG9kV2l0aFBhcmFtcyhwYXJhbTE6IHN0cmluZywgcGFyYW0yOiBudW1iZXIsIHBhcmFtMz86IFRlc3RDbGFzczMsIHBhcmFtND86IFRlc3RDbGFzczIpOiBib29sZWFuIHtcbiAgICAgICAgcGFyYW0xO1xuICAgICAgICBwYXJhbTI7XG4gICAgICAgIHBhcmFtMztcbiAgICAgICAgcGFyYW00O1xuICAgICAgICB0aGlzLm5vdFZpc2libGUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RWaXNpYmxlKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9jcyBvbiBnZXR0ZXIgcHJldmFpbC5cbiAgICAgKi9cbiAgICBnZXQgZ2V0dGVyQmVmb3JlU2V0dGVyKCkge1xuICAgICAgICByZXR1cm4gJ2hlbGxvJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3Mgb24gc2V0dGVyIGFyZSBub3QgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBzZXQgZ2V0dGVyQmVmb3JlU2V0dGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGFycmF5R2V0dGVyKCk6IFRlc3RFbnVtW10ge1xuICAgICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICBnZXQgbWFwR2V0dGVyKCk6IHsgW2tleTogc3RyaW5nXTogVGVzdENsYXNzMiB9IHtcbiAgICAgICAgcmV0dXJuIHsgXCJoZWxsb1wiOiB7IGE6IDEsIGI6ICdoZWxsbycsIGM6IHsgaGVsbG86ICdoZWxsbycgfSB9IH1cbiAgICB9XG5cbiAgICBqc29uUHJvcGVydHk6IG9iamVjdCA9IHt9O1xuXG4gICAgb3B0aW9uYWxCb29sZWFuT3JSZWY/OiBib29sZWFuIHwgVG9rZW5cblxuICAgIG9wdGlvbmFsQXNVbmlvbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gJyc7XG5cbiAgICBhcnJheU9mT3B0aW9uYWxzID0gbmV3IEFycmF5PFRlc3RDbGFzczMgfCB1bmRlZmluZWQ+KCk7XG4gICAgcmVhZG9ubHkgcmVhZG9ubHlNYXBPZk9wdGlvbmFsc09yUmVmczogeyBba2V5OiBzdHJpbmddOiAoc3RyaW5nIHwgdW5kZWZpbmVkKSB9ID0ge307XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhpcyBlbnVtLlxuICovXG5leHBvcnQgZW51bSBUZXN0RW51bSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBkb2MgZm9yIFZhbHVlMVxuICAgICAqL1xuICAgIFZhbHVlMSxcblxuICAgIC8qKlxuICAgICAqIERvYyBmb3IgdmFsdWUyXG4gICAgICogQGF1dGhvciBiZW5pc3JhZUBcbiAgICAgKi9cbiAgICBWYWx1ZTIsXG4gICAgVmFsdWUzID0gJ0hlbGxvJ1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIFRlc3RFbnVtIHtcbiAgICBleHBvcnQgY2xhc3MgU3ViVHlwZU9mVGVzdEVudW0ge1xuICAgICAgICBteVByb3AgPSAxMlxuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBUZXN0Q2xhc3MyIHtcbiAgICBleHBvcnQgY2xhc3MgU3ViVHlwZU9mVGVzdENsYXNzMiB7XG4gICAgICAgIHJlYWRvbmx5IHlvdXJQcm9wPzogc3RyaW5nID0gXCJIZWxsb1wiXG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFRlc3RDbGFzczIuU3ViVHlwZU9mVGVzdENsYXNzMiB7XG4gICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICAgIFxuICAgIH1cbn1cblxuLy9cbi8vIENvbnN0IGxpdGVyYWxzXG4vLyBqc2lpIGFsbG93cyBjb25zdGFudCBsaXRlcmFscyBhbmQgYWN0dWFsbHkgaW5jbHVkZXMgdGhlIHZhbHVlcyBpbiB0aGUganNpaSBzcGVjXG4vL1xuXG5leHBvcnQgY2xhc3MgVGVzdENsYXNzNCB7XG5cbiAgICAvLyBwcmltaXRpdmUgY29uc3RzIHZhbHVlcyBhcmUgYWxsb3dlZCBidXQgb25seSBpZiB0aGV5IGFyZSBzaW1wbGUgbGl0ZXJhbCBkYXRhIHZhbHVlc1xuICAgIC8vIG5vIG1hdGgsIG5vIGV2YWx1YXRpb24uIGxpdGVyYWxseSEhXG4gICAgc3RhdGljIHJlYWRvbmx5IFNUUklOR19DT05TVCA9ICdIZWxsbyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNUUklOR19DT05TVF9XSVRIX0RPVUJMRV9RVU9URVMgPSBcIldvcmxkXCI7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5VTUJFUl9DT05TVCA9IDEyMzQ7XG4gICAgc3RhdGljIHJlYWRvbmx5IERPVUJMRV9DT05TVCA9IDEyMzQuNDQ7XG4gICAgc3RhdGljIHJlYWRvbmx5IEJPT0xFQU5fQ09OU1RfRkFMU0UgPSBmYWxzZTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgQk9PTEVBTl9DT05TVF9UUlVFID0gZmFsc2U7XG5cbiAgICAvLyBpZ25vcmVkICh3aXRoIGEgd2FybmluZykgYmVjYXVzZSBpdCdzIGEgbm9uLXByaW1pdGl2ZSBsaXRlcmFsXG4gICAgc3RhdGljIHJlYWRvbmx5IE9CSl9MSVRFUkFMX0NPTlNUID0geyBmb286IDEyMzQgfTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTk9OX0xJVEVSQUxfQ09OU1QgPSAxMjMgKyA0NTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgT0JKX0NPTlNUID0gbmV3IFRlc3RDbGFzcygpO1xuXG4gICAgLy8gcHJpdmF0ZVxuICAgIHByaXZhdGUgc3RhdGljIE5PTl9QUklNSVRJVkUgPSBuZXcgVGVzdENsYXNzKCk7XG5cbiAgICAvKipcbiAgICAgKiBwMiBjYW5ub3QgYmUgcmVzb2x2ZWQsIGJ1dCBpdCdzIG9wdGlvbmFsLCBzbyB3ZSBleHBlY3QgdGhlIHR5cGVzcGVjIHRvIGp1c3QgaW5jbHVkZSBwMVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyPzogKCkgPT4gdm9pZCwgcDM/OiBzdHJpbmcpIHtcbiAgICAgICAgcDE7IHAyOyBwMzsgVGVzdENsYXNzNC5OT05fUFJJTUlUSVZFO1xuICAgIH1cbn1cblxuLy9cbi8vIFRoaXMgaXMgZ29vZCBzaW5jZSB0aGVyZSBhcmUgbm8gbmFtZXNhcGNlcyB3aXRob3V0IGEgdHlwZS5cbi8vXG5cbmV4cG9ydCBjbGFzcyBBIHsgfVxuZXhwb3J0IG5hbWVzcGFjZSBBIHsgZXhwb3J0IGNsYXNzIEIgeyB9IH1cbmV4cG9ydCBuYW1lc3BhY2UgQS5CIHsgZXhwb3J0IGNsYXNzIEMgeyB9IH1cblxuLy9cbi8vIFVzZSBhIHR5cGUgZnJvbSBhbiBleHRlcm5hbCBkZXBlbmRlbmN5IGFzIGEgYmFzZSBjbGFzc1xuLy9cblxuZXhwb3J0IGNsYXNzIEV4cG9zZUV4dGVybmFsRGVwZW5kZW5jeSBleHRlbmRzIG15ZGVwLk15RGVwVHlwZSB7XG4gICAgZnJvdGg6IG51bWJlciA9IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVdpdGhBbnlWYWx1ZSB7XG4gICAgbXlwcm9wOiBhbnkgPSB1bmRlZmluZWQ7XG59XG5cbi8vIGpzaWkgYWxzbyBpbmRpY2F0ZXMgd2hldGhlciBwcm9wZXJ0aWVzIGhhdmUgYmFja2luZyBsb2dpYyBvciBqdXN0IHJlcHJlc2VudCByYXcgZGF0YVxuXG5leHBvcnQgY2xhc3MgSGFzTG9naWMge1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIGhhdmUgbG9naWM9dHJ1ZVxuICAgICAqL1xuICAgIGdldCBwcm9wV2l0aExvZ2ljKCkge1xuICAgICAgICByZXR1cm4gMTJcbiAgICB9XG5cbiAgICBzZXQgcHJvcFdpdGhMb2dpYyh2YWw6IG51bWJlcikge1xuICAgICAgICB2YWw7XG4gICAgfVxuXG4gICAgcHJvcFdpdGhvdXRMb2dpYzogc3RyaW5nID0gJyc7XG59XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25hbFJlZiB7XG4gICAgcHJvcDE/OiBUb2tlblxuICAgIHByb3AyOiBUb2tlbiB8IHVuZGVmaW5lZCA9IG5ldyBUb2tlbigpO1xufVxuXG5leHBvcnQgY2xhc3MgVW5pb25Qcm9wZXJ0aWVzIHtcbiAgICB3aXRoUHJpbWl0aXZlMTogVG9rZW4gfCBzdHJpbmcgPSAnJztcbiAgICB3aXRoUHJpbWl0aXZlMjogc3RyaW5nIHwgVG9rZW4gPSAnJztcbiAgICBub1ByaW1pdGl2ZTogVG9rZW4gfCBUZXN0Q2xhc3MyIHwgVGVzdENsYXNzMyA9IG5ldyBUZXN0Q2xhc3MzKCk7XG59XG5cbi8vXG4vLyBqc2lpIGlzIGV4cGVjdGVkIHRvIGF1dG9tYXRpY2FsbHkgY29weSB0aGUgaW5pdGlhbGl6ZXIgZnJvbSBUZXN0Q2xhc3MzXG4vL1xuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihhcmcxOiBzdHJpbmcsIGFyZzI6IGJvb2xlYW4pIHtcbiAgICAgICAgYXJnMTsgYXJnMjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnN1cmVJbml0aWFsaXplciBleHRlbmRzIEVuc3VyZUluaXRpYWxpemVyQmFzZSB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIEVuc3VyZUluaXRpYWxpemVyMiBleHRlbmRzIEVuc3VyZUluaXRpYWxpemVyIHtcblxufVxuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXIzIGV4dGVuZHMgRW5zdXJlSW5pdGlhbGl6ZXIyIHtcbiAgICBjb25zdHJ1Y3RvcihpaGF2ZW15b3duaW5pdGlhbGl6ZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgc3VwZXIoJ2JvbycsIGZhbHNlKVxuICAgICAgICBpaGF2ZW15b3duaW5pdGlhbGl6ZXI7XG4gICAgfVxufVxuXG4vLyBoZXJlIGluaXRpYWxpemVyIGhhcyBvbmx5IG9wdGlvbmFsIHZhbHVlc1xuLy8gaW4gdGhlIG1lYW50aW1lIHdlIHN0aWxsIGV4cGVjdCBpdCB0byBiZSBjbG9uZWQgYXMgaXMgZm9yIGxhY2sgb2YgYSBldmlkZW5jZSB0aGF0IHdlIHNob3VsZCBkbyBzb21ldGhpbmcgZWxzZVxuXG5leHBvcnQgY2xhc3MgRW5zdXJlSW5pdGlhbGl6ZXJCYXNlMiB7XG4gICAgY29uc3RydWN0b3IoYXJnMT86IHN0cmluZywgYXJnMj86IGJvb2xlYW4pIHtcbiAgICAgICAgYXJnMTsgYXJnMjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnN1cmVJbml0aWFsaXplcjQgZXh0ZW5kcyBFbnN1cmVJbml0aWFsaXplckJhc2UyIHtcblxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydGllc0luQ3RvciB7XG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVhZG9ubHlQcm9wOiBzdHJpbmcsIHB1YmxpYyByZWFkV3JpdGVQcm9wOiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgcHJpdmF0ZVByb3A6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlYWRXcml0ZVByb3AgPSB0aGlzLnByaXZhdGVQcm9wO1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE15QWJzdHJhY3RDbGFzcyB7XG4gICAgbm9ybWFsTWV0aG9kKCkge1xuXG4gICAgfVxuXG4gICAgYWJzdHJhY3QgYWJzdHJhY3RNZXRob2QodmFsdWU6IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlcml2ZWRBYnN0cmFjdCBleHRlbmRzIE15QWJzdHJhY3RDbGFzcyB7XG59XG5cbmV4cG9ydCBjbGFzcyBDbGFzc1dpdGhQcm90ZWN0ZWRTdHVmZiB7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhcmFtcHJvcDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZm9vOiBudW1iZXIgPSAwO1xuXG4gICAgcHJvdGVjdGVkIGdldCBnb28oKSB7XG4gICAgICAgIHJldHVybiAxMjM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldCBnb28odmFsOiBudW1iZXIpIHtcbiAgICAgICAgdmFsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcm90ZWN0ZWRNZXRob2QodmFsOiBzdHJpbmcpOiBudW1iZXIgeyBcbiAgICAgICAgdmFsO1xuICAgICAgICByZXR1cm4gMTIzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFzeW5jVmlydHVhbE1ldGhvZHMge1xuICAgIGFzeW5jIG92ZXJyaWRlTWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIDQyXG4gICAgfVxuXG4gICAgZG9udE92ZXJyaWRlTWUoKSB7XG4gICAgICAgIHJldHVybiA0MjtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9qc2lpLXRlc3QvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IGpzaWkkbXlfZGVwJDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpzaWkkbXlfZGVwJFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuaGkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAndGhpcyBpcyBjb21pbmcgZnJvbSBhIGJ1bmRsZWQgZGVwZW5kZW5jeS4gdGhpcyBtZWFucyB0aGF0IGl0cyBjb2RlIGlzIGdvaW5nIHRvIGJlIGluY2x1ZGVkIGluIG91ciBidW5kbGUuanMgZmlsZSc7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Rlc3QvanNpaS10ZXN0L25vZGVfbW9kdWxlcy9teS1idW5kbGVkLWRlcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9"};
// ================== jsii type info - END =========================
