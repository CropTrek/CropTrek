"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/services",{

/***/ "./Redux/Actions/FarmsActions.js":
/*!***************************************!*\
  !*** ./Redux/Actions/FarmsActions.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchProducts\": function() { return /* binding */ fetchProducts; },\n/* harmony export */   \"populateProducts\": function() { return /* binding */ populateProducts; }\n/* harmony export */ });\n/* harmony import */ var C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/slicedToArray.js */ \"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/asyncToGenerator.js */ \"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/@babel/runtime/regenerator/index.js */ \"./node_modules/next/dist/compiled/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n\n\n\n\nvar initialState = {\n  products: [],\n  errors: \"\"\n};\nvar productsSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__.createSlice)({\n  name: \"products\",\n  initialState: initialState,\n  reducers: {\n    populateProducts: function populateProducts(state, action) {\n      state.products = action.payload;\n    }\n  }\n});\nvar fetchProducts = function fetchProducts() {\n  return /*#__PURE__*/function () {\n    var _ref = (0,C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(dispatch) {\n      var _yield$axios$get, _yield$axios$get2, res, error;\n\n      return C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return axios.get('http://localhost:5000/farms');\n\n            case 2:\n              _yield$axios$get = _context.sent;\n              _yield$axios$get2 = (0,C_Users_MSI_Documents_GitHub_Full_Stack_Project_F_Society_React_Template_node_modules_next_dist_compiled_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_yield$axios$get, 2);\n              res = _yield$axios$get2[0];\n              error = _yield$axios$get2[1];\n\n              if (error) {\n                dispatch(setErrors(error));\n              } else {\n                dispatch(populateProducts(res));\n              }\n\n            case 7:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n};\nvar populateProducts = productsSlice.actions.populateProducts;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (productsSlice.reducer);\n\n;\r\n    // Wrapped in an IIFE to avoid polluting the global scope\r\n    ;\r\n    (function () {\r\n        var _a, _b;\r\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\r\n        // to extract CSS. For backwards compatibility, we need to check we're in a\r\n        // browser context before continuing.\r\n        if (typeof self !== 'undefined' &&\r\n            // AMP / No-JS mode does not inject these helpers:\r\n            '$RefreshHelpers$' in self) {\r\n            // @ts-ignore __webpack_module__ is global\r\n            var currentExports = module.exports;\r\n            // @ts-ignore __webpack_module__ is global\r\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\r\n            // This cannot happen in MainTemplate because the exports mismatch between\r\n            // templating and execution.\r\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\r\n            // A module can be accepted automatically based on its exports, e.g. when\r\n            // it is a Refresh Boundary.\r\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\r\n                // Save the previous exports on update so we can compare the boundary\r\n                // signatures.\r\n                module.hot.dispose(function (data) {\r\n                    data.prevExports = currentExports;\r\n                });\r\n                // Unconditionally accept an update to this module, we'll check if it's\r\n                // still a Refresh Boundary later.\r\n                // @ts-ignore importMeta is replaced in the loader\r\n                module.hot.accept();\r\n                // This field is set when the previous version of this module was a\r\n                // Refresh Boundary, letting us know we need to check for invalidation or\r\n                // enqueue an update.\r\n                if (prevExports !== null) {\r\n                    // A boundary can become ineligible if its exports are incompatible\r\n                    // with the previous exports.\r\n                    //\r\n                    // For example, if you add/remove/change exports, we'll want to\r\n                    // re-execute the importing modules, and force those components to\r\n                    // re-render. Similarly, if you convert a class component to a\r\n                    // function, we want to invalidate the boundary.\r\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\r\n                        module.hot.invalidate();\r\n                    }\r\n                    else {\r\n                        self.$RefreshHelpers$.scheduleUpdate();\r\n                    }\r\n                }\r\n            }\r\n            else {\r\n                // Since we just executed the code for the module, it's possible that the\r\n                // new exports made it ineligible for being a boundary.\r\n                // We only care about the case when we were _previously_ a boundary,\r\n                // because we already accepted this update (accidental side effect).\r\n                var isNoLongerABoundary = prevExports !== null;\r\n                if (isNoLongerABoundary) {\r\n                    module.hot.invalidate();\r\n                }\r\n            }\r\n        }\r\n    })();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9SZWR1eC9BY3Rpb25zL0Zhcm1zQWN0aW9ucy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFFQSxJQUFJQyxZQUFZLEdBQUc7RUFDakJDLFFBQVEsRUFBRSxFQURPO0VBR2pCQyxNQUFNLEVBQUU7QUFIUyxDQUFuQjtBQUtBLElBQU1DLGFBQWEsR0FBR0osNkRBQVcsQ0FBQztFQUNoQ0ssSUFBSSxFQUFFLFVBRDBCO0VBRWhDSixZQUFZLEVBQVpBLFlBRmdDO0VBR2hDSyxRQUFRLEVBQUU7SUFDUkMsZ0JBRFEsNEJBQ1NDLEtBRFQsRUFDZ0JDLE1BRGhCLEVBQ3dCO01BQzlCRCxLQUFLLENBQUNOLFFBQU4sR0FBaUJPLE1BQU0sQ0FBQ0MsT0FBeEI7SUFDRDtFQUhPO0FBSHNCLENBQUQsQ0FBakM7QUFVTyxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0VBQUE7SUFBQSxvWkFBTSxpQkFBT0MsUUFBUDtNQUFBOztNQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Y0FBQSxPQUNMQyxLQUFLLENBQUNDLEdBQU4sQ0FBVSw2QkFBVixDQURLOztZQUFBO2NBQUE7Y0FBQTtjQUMxQkMsR0FEMEI7Y0FDckJDLEtBRHFCOztjQUVqQyxJQUFJQSxLQUFKLEVBQVc7Z0JBQ1RKLFFBQVEsQ0FBQ0ssU0FBUyxDQUFDRCxLQUFELENBQVYsQ0FBUjtjQUNELENBRkQsTUFFTztnQkFDTEosUUFBUSxDQUFDTCxnQkFBZ0IsQ0FBQ1EsR0FBRCxDQUFqQixDQUFSO2NBQ0Q7O1lBTmdDO1lBQUE7Y0FBQTtVQUFBO1FBQUE7TUFBQTtJQUFBLENBQU47O0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSxDQUF0QjtBQVNBLElBQ0xSLGdCQURLLEdBR0hILGFBQWEsQ0FBQ2MsT0FIWCxDQUNMWCxnQkFESzs7QUFJUCwrREFBZUgsYUFBYSxDQUFDZSxPQUE3QiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9SZWR1eC9BY3Rpb25zL0Zhcm1zQWN0aW9ucy5qcz83NThkIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBjcmVhdGVTbGljZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XHJcblxyXG5sZXQgaW5pdGlhbFN0YXRlID0ge1xyXG4gIHByb2R1Y3RzOiBbXSxcclxuXHJcbiAgZXJyb3JzOiBcIlwiLFxyXG59O1xyXG5jb25zdCBwcm9kdWN0c1NsaWNlID0gY3JlYXRlU2xpY2Uoe1xyXG4gIG5hbWU6IFwicHJvZHVjdHNcIixcclxuICBpbml0aWFsU3RhdGUsXHJcbiAgcmVkdWNlcnM6IHtcclxuICAgIHBvcHVsYXRlUHJvZHVjdHMoc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBzdGF0ZS5wcm9kdWN0cyA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSxcclxuICAgIFxyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0cyA9ICgpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xyXG4gIGNvbnN0IFtyZXMsIGVycm9yXSA9ICBhd2FpdCBheGlvcy5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9mYXJtcycpO1xyXG4gIGlmIChlcnJvcikge1xyXG4gICAgZGlzcGF0Y2goc2V0RXJyb3JzKGVycm9yKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRpc3BhdGNoKHBvcHVsYXRlUHJvZHVjdHMocmVzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHtcclxuICBwb3B1bGF0ZVByb2R1Y3RzLFxyXG4gIFxyXG59ID0gcHJvZHVjdHNTbGljZS5hY3Rpb25zO1xyXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0c1NsaWNlLnJlZHVjZXI7Il0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiaW5pdGlhbFN0YXRlIiwicHJvZHVjdHMiLCJlcnJvcnMiLCJwcm9kdWN0c1NsaWNlIiwibmFtZSIsInJlZHVjZXJzIiwicG9wdWxhdGVQcm9kdWN0cyIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImZldGNoUHJvZHVjdHMiLCJkaXNwYXRjaCIsImF4aW9zIiwiZ2V0IiwicmVzIiwiZXJyb3IiLCJzZXRFcnJvcnMiLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Redux/Actions/FarmsActions.js\n"));

/***/ })

});