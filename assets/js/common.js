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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/common.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/common.js":
/*!******************************!*\
  !*** ./assets/src/common.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _common_navBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/navBar */ \"./assets/src/common/navBar.js\");\n/* harmony import */ var _login_AppleAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/AppleAuth */ \"./assets/src/login/AppleAuth.js\");\n/* harmony import */ var _login_GoogleAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/GoogleAuth */ \"./assets/src/login/GoogleAuth.js\");\n\n\n\n\nvar _window = window,\n    $ = _window.$;\n\nvar Common = function Common() {\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Common);\n\n  $(document).ready(function () {\n    _common_navBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n    _login_AppleAuth__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\n    _login_GoogleAuth__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init();\n  });\n  $(window).on('resize scroll', function () {\n    _common_navBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fixedNavBarMenu();\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Common());\n\n//# sourceURL=webpack:///./assets/src/common.js?");

/***/ }),

/***/ "./assets/src/common/navBar.js":
/*!*************************************!*\
  !*** ./assets/src/common/navBar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$,\n    jQuery = _window.jQuery;\n\nvar NavBar = /*#__PURE__*/function () {\n  function NavBar() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NavBar);\n\n    this.jNavEl = null;\n    this.jUberBannerDesktop = null;\n    this.jUberBannerMobile = null;\n    this.jNavPhantomEl = null;\n    this.heightTrigger = 0;\n    this.setupUberBanner = this.setupUberBanner.bind(this);\n    this.bindEvents = this.bindEvents.bind(this);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(NavBar, [{\n    key: \"init\",\n    value: function init() {\n      this.jNavEl = $('.pepo-nav');\n      this.jUberBannerDesktop = $('.uber-banner-desktop');\n      this.jUberBannerMobile = $('.uber-banner-mobile');\n      this.jNavPhantomEl = $('.navbar-phatom-el');\n      this.bindEvents();\n    }\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      $(\"#toggle-menu\").on('click', function () {\n        $(this).toggleClass(\"is-active\");\n      });\n      $('nav .downloadApp.web').on('click', function (e) {\n        $('#downloadModal').modal('show');\n        e.preventDefault();\n        e.stopPropagation();\n        return false;\n      });\n      $('.loginApp').on('click', function (e) {\n        $('#loginModal').modal('show');\n        e.preventDefault();\n        e.stopPropagation();\n      });\n    }\n  }, {\n    key: \"setupUberBanner\",\n    value: function setupUberBanner() {\n      if (this.jUberBannerDesktop.length === 0 && this.jUberBannerMobile.length === 0) {\n        this.heightTrigger = 0;\n      } else {\n        this.heightTrigger = Math.max(this.jUberBannerDesktop.outerHeight(), this.jUberBannerMobile.outerHeight());\n      }\n    }\n  }, {\n    key: \"fixedNavBarMenu\",\n    value: function fixedNavBarMenu() {\n      this.setupUberBanner();\n      var scrollTop = $(window).scrollTop();\n\n      if (scrollTop > this.heightTrigger) {\n        this.jNavPhantomEl.height(this.jNavEl.outerHeight());\n        this.jNavEl.addClass('nav-box-shadow fixed-top');\n      } else {\n        this.jNavPhantomEl.height(0);\n        this.jNavEl.removeClass('nav-box-shadow fixed-top');\n      }\n    }\n  }]);\n\n  return NavBar;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new NavBar());\n\n//# sourceURL=webpack:///./assets/src/common/navBar.js?");

/***/ }),

/***/ "./assets/src/login/AppleAuth.js":
/*!***************************************!*\
  !*** ./assets/src/login/AppleAuth.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$;\nvar APPLE_CLIENT_ID = 'com.pepo.staging.signin';\nvar APPLE_REDIRECT_URL = 'http://pepodev.com/connect/apple/oauth';\n\nvar AppleAuth = function AppleAuth() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AppleAuth);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    $.ajax({\n      url: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',\n      dataType: 'script',\n      cache: true,\n      success: function success() {\n        AppleID.auth.init({\n          clientId: APPLE_CLIENT_ID,\n          scope: 'email name',\n          redirectURI: APPLE_REDIRECT_URL,\n          state: 'some string',\n          responseMode: 'form_post'\n        });\n\n        _this.bindEvents();\n      }\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"bindEvents\", function () {\n    $('#apple-signin').click(function (e) {\n      try {\n        AppleID.auth.signIn().then(function (res) {\n          console.log(res);\n        })[\"catch\"](function (e) {\n          console.log(e);\n        });\n      } catch (error) {\n        console.log(error);\n      }\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new AppleAuth());\n\n//# sourceURL=webpack:///./assets/src/login/AppleAuth.js?");

/***/ }),

/***/ "./assets/src/login/GoogleAuth.js":
/*!****************************************!*\
  !*** ./assets/src/login/GoogleAuth.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar _window = window,\n    $ = _window.$;\nvar GOOGLE_CLIENT_ID = '1069543169353-3gmkmqqdc92egbu1dftpug0v3qu72jc5.apps.googleusercontent.com';\nvar GOOGLE_REDIRECT_URL = 'http://pepodev.com/connect/google/oauth';\n\nvar GoogleAuth = /*#__PURE__*/function () {\n  function GoogleAuth() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GoogleAuth);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"init\", function () {\n      try {\n        gapi.load('auth2', function () {\n          gapi.auth2.init({\n            client_id: GOOGLE_CLIENT_ID,\n            scope: \"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read\",\n            ux_mode: 'redirect',\n            redirect_uri: GOOGLE_REDIRECT_URL\n          }).then(function (res) {\n            _this.GoogleAuthObject = gapi.auth2.getAuthInstance();\n\n            _this.bindEvents();\n          });\n        });\n      } catch (e) {\n        console.log(\"Error occurred \", e);\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"bindEvents\", function () {\n      $('#google-sign-in').on('click', function () {\n        _this.GoogleAuthObject.signIn().then(function (res) {});\n      });\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GoogleAuth, [{\n    key: \"construtor\",\n    value: function construtor() {\n      this.GoogleAuthObject = null;\n    }\n  }]);\n\n  return GoogleAuth;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new GoogleAuth());\n\n//# sourceURL=webpack:///./assets/src/login/GoogleAuth.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ })

/******/ });