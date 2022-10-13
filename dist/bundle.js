/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar rules_1 = __webpack_require__(/*! ./rules */ \"./src/rules/index.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nfunction fill(arr, value) {\r\n    for (var i = 0; i < arr.length; i++) {\r\n        arr[i] = value;\r\n    }\r\n    return arr;\r\n}\r\nvar getColor = function (value) {\r\n    switch (value) {\r\n        case -1:\r\n            return '#000000';\r\n        case 1:\r\n            return '#e2bd3b';\r\n        case 2:\r\n            return '#67b4b0';\r\n        case 3:\r\n            return '#008e59';\r\n        case 4:\r\n            return '#c43739';\r\n        case 5:\r\n            return '#3a89b0';\r\n        case 6:\r\n            return '#89303f';\r\n        default:\r\n            return '#155461';\r\n    }\r\n};\r\nvar cellularAutomata = /** @class */ (function () {\r\n    function cellularAutomata(row, col, rules) {\r\n        this.threshold = 200;\r\n        this.canvas = document.querySelector('#canvas');\r\n        this.size = 5;\r\n        this.row = row;\r\n        this.col = col;\r\n        this.rules = rules;\r\n        this.grid = fill(new Array(row), 0).map(function () { return fill(new Array(col), 0); });\r\n        this.canvas.width = row * this.size;\r\n        this.canvas.height = col * this.size;\r\n        this.tempGrid = fill(new Array(row), 0).map(function () {\r\n            return fill(new Array(col), 0);\r\n        });\r\n        this.init();\r\n        //this.initCanvas();\r\n        this.canvasPrint();\r\n    }\r\n    cellularAutomata.prototype.init = function () {\r\n        var count = 0;\r\n        for (var i = 0; i < this.row; i++) {\r\n            for (var j = 0; j < this.col; j++) {\r\n                var random = Math.floor(Math.random() * 10000);\r\n                if (random > 9950) {\r\n                    this.grid[i][j] = 1;\r\n                }\r\n                else {\r\n                    this.grid[i][j] = 0;\r\n                }\r\n            }\r\n        }\r\n    };\r\n    cellularAutomata.prototype.initCanvas = function () {\r\n        var context = this.canvas.getContext('2d');\r\n        var width = this.canvas.width;\r\n        var height = this.canvas.height;\r\n        for (var i = 0; i <= this.row; i++) {\r\n            context.beginPath();\r\n            context.moveTo(i * this.size, 0);\r\n            context.lineTo(i * this.size, width);\r\n            context.stroke();\r\n            context.moveTo(0, i * this.size);\r\n            context.lineTo(height, i * this.size);\r\n            context.stroke();\r\n            context.closePath();\r\n        }\r\n    };\r\n    cellularAutomata.prototype.update = function () {\r\n        for (var i = 0; i < this.row; i++) {\r\n            for (var j = 0; j < this.col; j++) {\r\n                if (this.grid[i][j] > 0) {\r\n                    this.grid[i][j] += 1;\r\n                }\r\n                this.tempGrid[i][j] = this.grid[i][j];\r\n                for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {\r\n                    var rule = _a[_i];\r\n                    if (rule.judge(this.grid, i, j, {\r\n                        row: this.row,\r\n                        col: this.col\r\n                    })) {\r\n                        rule.applyAction(this.tempGrid, i, j);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        var temp = this.grid;\r\n        this.grid = this.tempGrid;\r\n        this.tempGrid = temp;\r\n    };\r\n    cellularAutomata.prototype.canvasPrint = function () {\r\n        var context = this.canvas.getContext('2d');\r\n        for (var i = 0; i < this.row; i++) {\r\n            for (var j = 0; j < this.col; j++) {\r\n                if (this.grid[i][j] !== 0) {\r\n                    context.fillStyle = getColor(this.grid[i][j]);\r\n                    context.fillRect(i * this.size + 1, j * this.size + 1, this.size, this.size);\r\n                }\r\n                else {\r\n                    context.fillStyle = 'white';\r\n                    context.fillRect(i * this.size + 1, j * this.size + 1, this.size, this.size);\r\n                }\r\n            }\r\n        }\r\n    };\r\n    cellularAutomata.prototype.print = function (tick) {\r\n        var _this = this;\r\n        var count = 0;\r\n        var id = setInterval(function () {\r\n            if (count < tick) {\r\n                _this.update();\r\n                _this.canvasPrint();\r\n                count++;\r\n            }\r\n            else {\r\n                clearInterval(id);\r\n            }\r\n        }, 100);\r\n    };\r\n    return cellularAutomata;\r\n}());\r\n// 过于拥挤导致死亡\r\nvar rule1 = new rules_1.Rule(function (grid, row, col, env) {\r\n    if (grid[row][col] > 0) {\r\n        var sum = (0, utils_1.neighborhood)(grid, row, col, env);\r\n        if (sum < 2 || sum > 3) {\r\n            return true;\r\n        }\r\n    }\r\n    return false;\r\n}, function (grid, row, col) {\r\n    grid[row][col] = 0;\r\n});\r\nvar rule2 = new rules_1.Rule(function (grid, row, col, env) {\r\n    if (grid[row][col] === 0) {\r\n        var n = (0, utils_1.neighborhood)(grid, row, col, env);\r\n        if (n === 3 || n === 2) {\r\n            return true;\r\n        }\r\n    }\r\n    return false;\r\n}, function (grid, row, col) {\r\n    grid[row][col] = 1;\r\n});\r\n// 产生新元胞\r\nvar rule3 = new rules_1.Rule(function (grid, row, col, env) {\r\n    if (grid[row][col] === 0) {\r\n        var sum = (0, utils_1.neighborhood)(grid, row, col, env);\r\n        if (sum > 0 && sum <= 3) {\r\n            var random = Math.floor(Math.random() * 100);\r\n            if (random % 3 > 0) {\r\n                return false;\r\n            }\r\n            return true;\r\n        }\r\n        else if (sum > 4 && sum < 6) {\r\n            var random = Math.floor(Math.random() * 100);\r\n            if (random % 6 > 0) {\r\n                return false;\r\n            }\r\n            return true;\r\n        }\r\n    }\r\n    return false;\r\n}, function (grid, row, col) {\r\n    grid[row][col] = 1;\r\n});\r\n// 元胞达到寿命上限，死亡\r\nvar rule4 = new rules_1.Rule(function (grid, row, col, env) {\r\n    if (grid[row][col] >= 6) {\r\n        return true;\r\n    }\r\n    return false;\r\n}, function (grid, row, col) {\r\n    grid[row][col] = 0;\r\n});\r\nvar ca = new cellularAutomata(100, 100, [rule1, rule2, rule4]);\r\nca.print(6000);\r\n\n\n//# sourceURL=webpack://ca/./src/index.ts?");

/***/ }),

/***/ "./src/rules/index.ts":
/*!****************************!*\
  !*** ./src/rules/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Rule = void 0;\r\nvar Rule = /** @class */ (function () {\r\n    function Rule(rule, action) {\r\n        this.rule = rule;\r\n        this.action = action;\r\n    }\r\n    Rule.prototype.judge = function (grid, row, col, env) {\r\n        return this.rule(grid, row, col, env);\r\n    };\r\n    Rule.prototype.applyAction = function (grid, row, col) {\r\n        this.action(grid, row, col);\r\n    };\r\n    return Rule;\r\n}());\r\nexports.Rule = Rule;\r\n\n\n//# sourceURL=webpack://ca/./src/rules/index.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.neighborhood = exports.mod = void 0;\r\nfunction mod(n, m) {\r\n    return ((n % m) + m) % m;\r\n}\r\nexports.mod = mod;\r\nfunction neighborhood(grid, row, col, env) {\r\n    return (grid[row][mod(col + 1, env.col)] +\r\n        grid[row][mod(col - 1, env.col)] +\r\n        grid[mod(row + 1, env.col)][col] +\r\n        grid[mod(row - 1, env.col)][col] +\r\n        grid[mod(row + 1, env.col)][mod(col + 1, env.col)] +\r\n        grid[mod(row + 1, env.col)][mod(col - 1, env.col)] +\r\n        grid[mod(row - 1, env.col)][mod(col + 1, env.col)] +\r\n        grid[mod(row - 1, env.col)][mod(col - 1, env.col)]);\r\n}\r\nexports.neighborhood = neighborhood;\r\n\n\n//# sourceURL=webpack://ca/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;