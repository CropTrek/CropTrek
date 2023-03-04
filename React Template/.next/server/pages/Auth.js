"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/Auth";
exports.ids = ["pages/Auth"];
exports.modules = {

/***/ "./pages/Auth.js":
/*!***********************!*\
  !*** ./pages/Auth.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"C:\\\\PI-CropTrek\\\\CropTrek\\\\React Template\\\\pages\\\\Auth.js\";\n\n\n\n\nconst Auth = () => {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Container, {\n    style: {\n      marginTop: \"30px\"\n    },\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form, {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {\n        className: \"mb-3\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Label, {\n          children: \"Name\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 10,\n          columnNumber: 9\n        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Control, {\n          type: \"text\",\n          placeholder: \"Enter your name\",\n          name: \"name\",\n          onChange: e => handleChange(e)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 11,\n          columnNumber: 9\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 9,\n        columnNumber: 9\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {\n        className: \"mb-3\",\n        controlId: \"formBasicEmail\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Label, {\n          children: \"Email address\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 14,\n          columnNumber: 9\n        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Control, {\n          type: \"email\",\n          placeholder: \"Enter email\",\n          name: \"email\",\n          onChange: e => handleChange(e)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 15,\n          columnNumber: 9\n        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Text, {\n          className: \"text-muted\",\n          children: \"We'll never share your email with anyone else.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 16,\n          columnNumber: 9\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 13,\n        columnNumber: 7\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {\n        className: \"mb-3\",\n        controlId: \"formBasicPassword\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Label, {\n          children: \"Password\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 21,\n          columnNumber: 9\n        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Control, {\n          type: \"password\",\n          placeholder: \"Enter your password\",\n          name: \"password\",\n          onChange: e => handleChange(e)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 22,\n          columnNumber: 9\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 20,\n        columnNumber: 7\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {\n        variant: \"primary\",\n        type: \"submit\",\n        children: \"Log In\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 24,\n        columnNumber: 7\n      }, undefined)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 7,\n      columnNumber: 9\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 9\n  }, undefined);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Auth);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9BdXRoLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBRUEsTUFBTUksSUFBSSxHQUFDLE1BQUk7RUFDWCxvQkFDSSw4REFBQyxzREFBRDtJQUFXLEtBQUssRUFBRTtNQUFFQyxTQUFTLEVBQUU7SUFBYixDQUFsQjtJQUFBLHVCQUNBLDhEQUFDLGlEQUFEO01BQUEsd0JBRUEsOERBQUMsdURBQUQ7UUFBWSxTQUFTLEVBQUMsTUFBdEI7UUFBQSx3QkFDQSw4REFBQyx1REFBRDtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBQUE7UUFBQSxhQURBLGVBRUEsOERBQUMseURBQUQ7VUFBYyxJQUFJLEVBQUMsTUFBbkI7VUFBMEIsV0FBVyxFQUFDLGlCQUF0QztVQUF3RCxJQUFJLEVBQUMsTUFBN0Q7VUFBb0UsUUFBUSxFQUFHQyxDQUFELElBQUtDLFlBQVksQ0FBQ0QsQ0FBRDtRQUEvRjtVQUFBO1VBQUE7VUFBQTtRQUFBLGFBRkE7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBLGFBRkEsZUFNRiw4REFBQyx1REFBRDtRQUFZLFNBQVMsRUFBQyxNQUF0QjtRQUE2QixTQUFTLEVBQUMsZ0JBQXZDO1FBQUEsd0JBQ0UsOERBQUMsdURBQUQ7VUFBQTtRQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUEsYUFERixlQUVFLDhEQUFDLHlEQUFEO1VBQWMsSUFBSSxFQUFDLE9BQW5CO1VBQTJCLFdBQVcsRUFBQyxhQUF2QztVQUFxRCxJQUFJLEVBQUMsT0FBMUQ7VUFBa0UsUUFBUSxFQUFHQSxDQUFELElBQUtDLFlBQVksQ0FBQ0QsQ0FBRDtRQUE3RjtVQUFBO1VBQUE7VUFBQTtRQUFBLGFBRkYsZUFHRSw4REFBQyxzREFBRDtVQUFXLFNBQVMsRUFBQyxZQUFyQjtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBQUE7UUFBQSxhQUhGO01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQSxhQU5FLGVBYUYsOERBQUMsdURBQUQ7UUFBWSxTQUFTLEVBQUMsTUFBdEI7UUFBNkIsU0FBUyxFQUFDLG1CQUF2QztRQUFBLHdCQUNFLDhEQUFDLHVEQUFEO1VBQUE7UUFBQTtVQUFBO1VBQUE7VUFBQTtRQUFBLGFBREYsZUFFRSw4REFBQyx5REFBRDtVQUFjLElBQUksRUFBQyxVQUFuQjtVQUE4QixXQUFXLEVBQUMscUJBQTFDO1VBQWdFLElBQUksRUFBQyxVQUFyRTtVQUFnRixRQUFRLEVBQUdBLENBQUQsSUFBS0MsWUFBWSxDQUFDRCxDQUFEO1FBQTNHO1VBQUE7VUFBQTtVQUFBO1FBQUEsYUFGRjtNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUEsYUFiRSxlQWlCRiw4REFBQyxtREFBRDtRQUFRLE9BQU8sRUFBQyxTQUFoQjtRQUEwQixJQUFJLEVBQUMsUUFBL0I7UUFBQTtNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUEsYUFqQkU7SUFBQTtNQUFBO01BQUE7TUFBQTtJQUFBO0VBREE7SUFBQTtJQUFBO0lBQUE7RUFBQSxhQURKO0FBMEJILENBM0JEOztBQTZCQSxpRUFBZUYsSUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL29yZ2FyaXVtLXJlYWN0Ly4vcGFnZXMvQXV0aC5qcz84ZmY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uLCBDb250YWluZXIsIEZvcm0gIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xyXG5cclxuY29uc3QgQXV0aD0oKT0+e1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxDb250YWluZXIgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjMwcHhcIiB9fT5cclxuICAgICAgICA8Rm9ybT5cclxuXHJcbiAgICAgICAgPEZvcm0uR3JvdXAgY2xhc3NOYW1lPVwibWItM1wiID5cclxuICAgICAgICA8Rm9ybS5MYWJlbD5OYW1lPC9Gb3JtLkxhYmVsPlxyXG4gICAgICAgIDxGb3JtLkNvbnRyb2wgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgbmFtZVwiIG5hbWU9XCJuYW1lXCIgb25DaGFuZ2U9eyhlKT0+aGFuZGxlQ2hhbmdlKGUpfS8+XHJcbiAgICAgIDwvRm9ybS5Hcm91cD5cclxuICAgICAgPEZvcm0uR3JvdXAgY2xhc3NOYW1lPVwibWItM1wiIGNvbnRyb2xJZD1cImZvcm1CYXNpY0VtYWlsXCI+XHJcbiAgICAgICAgPEZvcm0uTGFiZWw+RW1haWwgYWRkcmVzczwvRm9ybS5MYWJlbD5cclxuICAgICAgICA8Rm9ybS5Db250cm9sIHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgZW1haWxcIiBuYW1lPVwiZW1haWxcIiBvbkNoYW5nZT17KGUpPT5oYW5kbGVDaGFuZ2UoZSl9IC8+XHJcbiAgICAgICAgPEZvcm0uVGV4dCBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkXCI+XHJcbiAgICAgICAgICBXZSdsbCBuZXZlciBzaGFyZSB5b3VyIGVtYWlsIHdpdGggYW55b25lIGVsc2UuXHJcbiAgICAgICAgPC9Gb3JtLlRleHQ+XHJcbiAgICAgIDwvRm9ybS5Hcm91cD4gICAgXHJcbiAgICAgIDxGb3JtLkdyb3VwIGNsYXNzTmFtZT1cIm1iLTNcIiBjb250cm9sSWQ9XCJmb3JtQmFzaWNQYXNzd29yZFwiPlxyXG4gICAgICAgIDxGb3JtLkxhYmVsPlBhc3N3b3JkPC9Gb3JtLkxhYmVsPlxyXG4gICAgICAgIDxGb3JtLkNvbnRyb2wgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgb25DaGFuZ2U9eyhlKT0+aGFuZGxlQ2hhbmdlKGUpfS8+XHJcbiAgICAgIDwvRm9ybS5Hcm91cD5cclxuICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiAgPlxyXG4gICAgICAgIExvZyBJblxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgXHJcbiAgICA8L0Zvcm0+XHJcbiAgICA8L0NvbnRhaW5lcj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGg7Il0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwiQ29udGFpbmVyIiwiRm9ybSIsIkF1dGgiLCJtYXJnaW5Ub3AiLCJlIiwiaGFuZGxlQ2hhbmdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/Auth.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/Auth.js"));
module.exports = __webpack_exports__;

})();