var jsii$calc$ =
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
/**
 * A little calculator that could.
 */
class Calculator {
    /**
     * Adds two numbers.
     * @param lhs Left-hand side
     * @param rhs Right-hand side
     * @returns The sum of the two numbers
     */
    add(lhs, rhs) {
        return lhs + rhs;
    }
    /**
     * Subtracts two numbers.
     * @param lhs Left-hand side
     * @param rhs Right-hand side
     * @returns The subtraction of lhs from rhs
     */
    sub(lhs, rhs) {
        return lhs - rhs;
    }
    /**
     * Multiplies two numbers.
     * @param lhs Left-hand side
     * @param rhs Right-hand side
     * @returns The multiplication of the two numbers
     */
    mul(lhs, rhs) {
        return lhs * rhs;
    }
}
exports.Calculator = Calculator;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjdiZmJmZDFmYmM0NDRlMmExZTYiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9jYWxjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0dBRUc7QUFDSDtJQUNFOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztDQUNGO0FBOUJELGdDQThCQyIsImZpbGUiOiJqc2lpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjdiZmJmZDFmYmM0NDRlMmExZTYiLCIvKipcbiAqIEEgbGl0dGxlIGNhbGN1bGF0b3IgdGhhdCBjb3VsZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3Ige1xuICAvKipcbiAgICogQWRkcyB0d28gbnVtYmVycy5cbiAgICogQHBhcmFtIGxocyBMZWZ0LWhhbmQgc2lkZVxuICAgKiBAcGFyYW0gcmhzIFJpZ2h0LWhhbmQgc2lkZVxuICAgKiBAcmV0dXJucyBUaGUgc3VtIG9mIHRoZSB0d28gbnVtYmVyc1xuICAgKi9cbiAgYWRkKGxoczogbnVtYmVyLCByaHM6IG51bWJlcikge1xuICAgIHJldHVybiBsaHMgKyByaHNcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdHdvIG51bWJlcnMuXG4gICAqIEBwYXJhbSBsaHMgTGVmdC1oYW5kIHNpZGVcbiAgICogQHBhcmFtIHJocyBSaWdodC1oYW5kIHNpZGVcbiAgICogQHJldHVybnMgVGhlIHN1YnRyYWN0aW9uIG9mIGxocyBmcm9tIHJoc1xuICAgKi9cbiAgc3ViKGxoczogbnVtYmVyLCByaHM6IG51bWJlcikge1xuICAgIHJldHVybiBsaHMgLSByaHNcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBudW1iZXJzLlxuICAgKiBAcGFyYW0gbGhzIExlZnQtaGFuZCBzaWRlXG4gICAqIEBwYXJhbSByaHMgUmlnaHQtaGFuZCBzaWRlXG4gICAqIEByZXR1cm5zIFRoZSBtdWx0aXBsaWNhdGlvbiBvZiB0aGUgdHdvIG51bWJlcnNcbiAgICovXG4gIG11bChsaHM6IG51bWJlciwgcmhzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbGhzICogcmhzXG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L2NhbGMvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9

// ================== jsii type info - BEGIN =========================
jsii$calc$.Calculator.__jsii__ = {"fqn":"jsii$calc$.Calculator"};
jsii$calc$.__jsii__ = {"schema":"jsii/1.0","types":{"jsii$calc$.Calculator":{"docs":{"comment":"A little calculator that could."},"kind":"class","methods":[{"parameters":[{"docs":{"param":"lhs Left-hand side","comment":"Left-hand side"},"name":"lhs","type":{"primitive":"number"}},{"docs":{"param":"rhs Right-hand side","comment":"Right-hand side"},"name":"rhs","type":{"primitive":"number"}}],"docs":{"param":"rhs Right-hand side","returns":"The sum of the two numbers","comment":"Adds two numbers."},"name":"add","returns":{"primitive":"number"}},{"parameters":[{"docs":{"param":"lhs Left-hand side","comment":"Left-hand side"},"name":"lhs","type":{"primitive":"number"}},{"docs":{"param":"rhs Right-hand side","comment":"Right-hand side"},"name":"rhs","type":{"primitive":"number"}}],"docs":{"param":"rhs Right-hand side","returns":"The subtraction of lhs from rhs","comment":"Subtracts two numbers."},"name":"sub","returns":{"primitive":"number"}},{"parameters":[{"docs":{"param":"lhs Left-hand side","comment":"Left-hand side"},"name":"lhs","type":{"primitive":"number"}},{"docs":{"param":"rhs Right-hand side","comment":"Right-hand side"},"name":"rhs","type":{"primitive":"number"}}],"docs":{"param":"rhs Right-hand side","returns":"The multiplication of the two numbers","comment":"Multiplies two numbers."},"name":"mul","returns":{"primitive":"number"}}],"fqn":"jsii$calc$.Calculator","module":"jsii$calc$","namespace":"jsii$calc$","name":"Calculator","initializer":{"initializer":true}}},"nametree":{"jsii$calc$":{"Calculator":{"_":"jsii$calc$.Calculator"}}},"typecount":1,"name":"jsii$calc$","package":"calc","version":"1.0.0","names":{"js":"calc"},"nativenames":{"jsii$calc$":{"js":"calc"}},"code":"var jsii$calc$ =\n/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * A little calculator that could.\n */\nclass Calculator {\n    /**\n     * Adds two numbers.\n     * @param lhs Left-hand side\n     * @param rhs Right-hand side\n     * @returns The sum of the two numbers\n     */\n    add(lhs, rhs) {\n        return lhs + rhs;\n    }\n    /**\n     * Subtracts two numbers.\n     * @param lhs Left-hand side\n     * @param rhs Right-hand side\n     * @returns The subtraction of lhs from rhs\n     */\n    sub(lhs, rhs) {\n        return lhs - rhs;\n    }\n    /**\n     * Multiplies two numbers.\n     * @param lhs Left-hand side\n     * @param rhs Right-hand side\n     * @returns The multiplication of the two numbers\n     */\n    mul(lhs, rhs) {\n        return lhs * rhs;\n    }\n}\nexports.Calculator = Calculator;\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjdiZmJmZDFmYmM0NDRlMmExZTYiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9jYWxjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0dBRUc7QUFDSDtJQUNFOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztDQUNGO0FBOUJELGdDQThCQyIsImZpbGUiOiJqc2lpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjdiZmJmZDFmYmM0NDRlMmExZTYiLCIvKipcbiAqIEEgbGl0dGxlIGNhbGN1bGF0b3IgdGhhdCBjb3VsZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3Ige1xuICAvKipcbiAgICogQWRkcyB0d28gbnVtYmVycy5cbiAgICogQHBhcmFtIGxocyBMZWZ0LWhhbmQgc2lkZVxuICAgKiBAcGFyYW0gcmhzIFJpZ2h0LWhhbmQgc2lkZVxuICAgKiBAcmV0dXJucyBUaGUgc3VtIG9mIHRoZSB0d28gbnVtYmVyc1xuICAgKi9cbiAgYWRkKGxoczogbnVtYmVyLCByaHM6IG51bWJlcikge1xuICAgIHJldHVybiBsaHMgKyByaHNcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdHdvIG51bWJlcnMuXG4gICAqIEBwYXJhbSBsaHMgTGVmdC1oYW5kIHNpZGVcbiAgICogQHBhcmFtIHJocyBSaWdodC1oYW5kIHNpZGVcbiAgICogQHJldHVybnMgVGhlIHN1YnRyYWN0aW9uIG9mIGxocyBmcm9tIHJoc1xuICAgKi9cbiAgc3ViKGxoczogbnVtYmVyLCByaHM6IG51bWJlcikge1xuICAgIHJldHVybiBsaHMgLSByaHNcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBudW1iZXJzLlxuICAgKiBAcGFyYW0gbGhzIExlZnQtaGFuZCBzaWRlXG4gICAqIEBwYXJhbSByaHMgUmlnaHQtaGFuZCBzaWRlXG4gICAqIEByZXR1cm5zIFRoZSBtdWx0aXBsaWNhdGlvbiBvZiB0aGUgdHdvIG51bWJlcnNcbiAgICovXG4gIG11bChsaHM6IG51bWJlciwgcmhzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbGhzICogcmhzXG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L2NhbGMvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9"};
// ================== jsii type info - END =========================
