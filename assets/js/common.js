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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _common_navBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/navBar */ \"./assets/src/common/navBar.js\");\n/* harmony import */ var _login_AppleAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/AppleAuth */ \"./assets/src/login/AppleAuth.js\");\n/* harmony import */ var _login_GoogleAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/GoogleAuth */ \"./assets/src/login/GoogleAuth.js\");\n/* harmony import */ var _login_GithubAuth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/GithubAuth */ \"./assets/src/login/GithubAuth.js\");\n/* harmony import */ var _login_TwitterAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/TwitterAuth */ \"./assets/src/login/TwitterAuth.js\");\n\n\n\n\n\n\nvar _window = window,\n    $ = _window.$;\n\nvar Common = function Common() {\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Common);\n\n  /* All document on ready tasks should be initiated from here */\n  $(document).ready(function () {\n    _common_navBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n    _login_AppleAuth__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\n    _login_GithubAuth__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init();\n    _login_TwitterAuth__WEBPACK_IMPORTED_MODULE_5__[\"default\"].init();\n    _login_GoogleAuth__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init();\n  });\n  $(window).on('resize scroll', function () {\n    _common_navBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fixedNavBarMenu();\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Common());\n\n//# sourceURL=webpack:///./assets/src/common.js?");

/***/ }),

/***/ "./assets/src/common/navBar.js":
/*!*************************************!*\
  !*** ./assets/src/common/navBar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$,\n    jQuery = _window.jQuery;\n\nvar NavBar = /*#__PURE__*/function () {\n  function NavBar() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NavBar);\n\n    this.jNavEl = null;\n    this.jUberBannerDesktop = null;\n    this.jUberBannerMobile = null;\n    this.jNavPhantomEl = null;\n    this.heightTrigger = 0;\n    this.setupUberBanner = this.setupUberBanner.bind(this);\n    this.bindEvents = this.bindEvents.bind(this);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(NavBar, [{\n    key: \"init\",\n    value: function init() {\n      this.jNavEl = $('.pepo-nav');\n      this.jUberBannerDesktop = $('.uber-banner-desktop');\n      this.jUberBannerMobile = $('.uber-banner-mobile');\n      this.jNavPhantomEl = $('.navbar-phatom-el');\n      this.bindEvents();\n    }\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      $(\"#toggle-menu\").on('click', function () {\n        $(this).toggleClass(\"is-active\");\n      });\n      $('nav .downloadApp.web').on('click', function (e) {\n        $('#downloadModal').modal('show');\n        e.preventDefault();\n        e.stopPropagation();\n        return false;\n      });\n      $('.loginApp').on('click', function (e) {\n        $('#loginModal').modal('show');\n        e.preventDefault();\n        e.stopPropagation();\n      });\n      $('#logoutApp').on('click', function (e) {\n        $('#loginModal').modal('show');\n        e.preventDefault();\n        e.stopPropagation();\n      });\n    }\n  }, {\n    key: \"setupUberBanner\",\n    value: function setupUberBanner() {\n      if (this.jUberBannerDesktop.length === 0 && this.jUberBannerMobile.length === 0) {\n        this.heightTrigger = 0;\n      } else {\n        this.heightTrigger = Math.max(this.jUberBannerDesktop.outerHeight(), this.jUberBannerMobile.outerHeight());\n      }\n    }\n  }, {\n    key: \"fixedNavBarMenu\",\n    value: function fixedNavBarMenu() {\n      this.setupUberBanner();\n      var scrollTop = $(window).scrollTop();\n\n      if (scrollTop > this.heightTrigger) {\n        this.jNavPhantomEl.height(this.jNavEl.outerHeight());\n        this.jNavEl.addClass('nav-box-shadow fixed-top');\n      } else {\n        this.jNavPhantomEl.height(0);\n        this.jNavEl.removeClass('nav-box-shadow fixed-top');\n      }\n    }\n  }]);\n\n  return NavBar;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new NavBar());\n\n//# sourceURL=webpack:///./assets/src/common/navBar.js?");

/***/ }),

/***/ "./assets/src/login/AppleAuth.js":
/*!***************************************!*\
  !*** ./assets/src/login/AppleAuth.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$;\nvar APPLE_CLIENT_ID = 'com.pepo.staging.signin';\nvar APPLE_REDIRECT_URL = 'http://stagingpepo.com/connect/apple/oauth';\n\nvar AppleAuth = function AppleAuth() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AppleAuth);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    $.ajax({\n      url: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',\n      dataType: 'script',\n      cache: true,\n      success: function success() {\n        AppleID.auth.init({\n          clientId: APPLE_CLIENT_ID,\n          scope: 'email name',\n          redirectURI: APPLE_REDIRECT_URL,\n          state: 'some string',\n          responseMode: 'form_post'\n        });\n\n        _this.bindEvents();\n      }\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"bindEvents\", function () {\n    $('#apple-signin').click(function (e) {\n      AppleID.auth.signIn();\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"logout\", function () {\n    $.ajax({\n      url: '/auth/apple-disconnect',\n      type: \"POST\",\n      success: function success() {\n        console.log(\"logged out\");\n      }\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new AppleAuth());\n\n//# sourceURL=webpack:///./assets/src/login/AppleAuth.js?");

/***/ }),

/***/ "./assets/src/login/GithubAuth.js":
/*!****************************************!*\
  !*** ./assets/src/login/GithubAuth.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qs */ \"./node_modules/qs/lib/index.js\");\n/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar _window = window,\n    $ = _window.$;\nvar GITHUB_CLIENT_ID = 'dac2bcce562025beaf89';\nvar GITHUB_REDIRECT_URL = 'http://pepodev.com/connect/github/oauth';\nvar GITHUB_BASE_URL = 'https://github.com/login/oauth';\n\nvar GithubAuth = function GithubAuth() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GithubAuth);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    var params = {\n      client_id: GITHUB_CLIENT_ID,\n      redirect_uri: GITHUB_REDIRECT_URL,\n      scope: 'read:user user:email',\n      response_type: 'code'\n    };\n    var queryParams = qs__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(params);\n    _this.githubRedirectURL = GITHUB_BASE_URL + '/authorize?' + queryParams;\n\n    _this.bindEvents();\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"bindEvents\", function () {\n    $('#github-signin').click(function (e) {\n      window.location = _this.githubRedirectURL;\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"logout\", function () {\n    $.ajax({\n      url: '/auth/github-disconnect',\n      type: \"POST\",\n      success: function success() {\n        console.log(\"logged out\");\n      }\n    });\n  });\n\n  this.githubRedirectURL = '';\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new GithubAuth());\n\n//# sourceURL=webpack:///./assets/src/login/GithubAuth.js?");

/***/ }),

/***/ "./assets/src/login/GoogleAuth.js":
/*!****************************************!*\
  !*** ./assets/src/login/GoogleAuth.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$;\n\nvar GoogleAuth = function GoogleAuth() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GoogleAuth);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    _this.bindEvents();\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"bindEvents\", function () {\n    $('#google-sign-in').on('click', function () {\n      _this.disableLoginBtns();\n\n      _this.getRedirectUrl();\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"disableLoginBtns\", function () {\n    $(\"#google-sign-in\").removeClass().addClass(\"disableClick\");\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"enableLoginBtns\", function () {\n    $(\"#google-sign-in\").removeClass().addClass(\"enableClick\");\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"getRedirectUrl\", function () {\n    $.ajax({\n      url: '/api/web/auth/google/request-token',\n      method: 'GET'\n    }).then(\n    /* success callback */\n    function (response) {\n      _this.onSuccess(response);\n    },\n    /* error callback */\n    function (error) {\n      _this.onError(error);\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"onSuccess\", function (response) {\n    _this.enableLoginBtns();\n\n    if (response && response.success) {\n      console.log(\"*** sucesss\", response);\n      var authUrl = response && response.data && response.data.redirect_url;\n      authUrl = authUrl + '&state=' + window.location;\n      window.location = authUrl;\n    }\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"onError\", function (error) {\n    _this.enableLoginBtns();\n\n    console.log(\"*** error *** \");\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"logout\", function () {\n    $.ajax({\n      url: '/auth/google-disconnect',\n      type: \"POST\",\n      success: function success() {\n        console.log(\"logged out\");\n      }\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new GoogleAuth());\n\n//# sourceURL=webpack:///./assets/src/login/GoogleAuth.js?");

/***/ }),

/***/ "./assets/src/login/TwitterAuth.js":
/*!*****************************************!*\
  !*** ./assets/src/login/TwitterAuth.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _window = window,\n    $ = _window.$;\n\nvar TwitterAuth = function TwitterAuth() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TwitterAuth);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function () {\n    _this.bindEvents();\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"disableLoginBtns\", function () {\n    $(\"#twitter-signin\").removeClass().addClass(\"disableClick\");\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"enableLoginBtns\", function () {\n    $(\"#twitter-signin\").removeClass().addClass(\"enableClick\");\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"getRedirectUrl\", function () {\n    $.ajax({\n      type: \"GET\",\n      url: '/api/web/auth/twitter/request-token'\n    }).then(function (response) {\n      _this.enableLoginBtns();\n\n      if (response && response.success) {\n        _this.storeCurrentURL();\n\n        var authUrl = response && response.data && response.data.redirect_url;\n        authUrl = authUrl + '&state=' + window.location;\n        window.location = authUrl;\n      }\n    }, function (error) {\n      _this.enableLoginBtns();\n\n      console.log(\" *** error *** \", error);\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"bindEvents\", function () {\n    $('#twitter-signin').click(function (e) {\n      _this.disableLoginBtns();\n\n      _this.getRedirectUrl();\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"storeCurrentURL\", function () {\n    document.cookie = \"state=\" + window.location;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"logout\", function () {\n    $.ajax({\n      url: '/auth/twitter-disconnect',\n      type: \"POST\",\n      success: function success() {\n        console.log(\"logged out\");\n      }\n    });\n  });\n\n  this.twitterRedirectURL = '';\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new TwitterAuth());\n\n//# sourceURL=webpack:///./assets/src/login/TwitterAuth.js?");

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

/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar replace = String.prototype.replace;\nvar percentTwenties = /%20/g;\n\nmodule.exports = {\n    'default': 'RFC3986',\n    formatters: {\n        RFC1738: function (value) {\n            return replace.call(value, percentTwenties, '+');\n        },\n        RFC3986: function (value) {\n            return value;\n        }\n    },\n    RFC1738: 'RFC1738',\n    RFC3986: 'RFC3986'\n};\n\n\n//# sourceURL=webpack:///./node_modules/qs/lib/formats.js?");

/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stringify = __webpack_require__(/*! ./stringify */ \"./node_modules/qs/lib/stringify.js\");\nvar parse = __webpack_require__(/*! ./parse */ \"./node_modules/qs/lib/parse.js\");\nvar formats = __webpack_require__(/*! ./formats */ \"./node_modules/qs/lib/formats.js\");\n\nmodule.exports = {\n    formats: formats,\n    parse: parse,\n    stringify: stringify\n};\n\n\n//# sourceURL=webpack:///./node_modules/qs/lib/index.js?");

/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/qs/lib/utils.js\");\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar defaults = {\n    allowDots: false,\n    allowPrototypes: false,\n    arrayLimit: 20,\n    decoder: utils.decode,\n    delimiter: '&',\n    depth: 5,\n    parameterLimit: 1000,\n    plainObjects: false,\n    strictNullHandling: false\n};\n\nvar parseValues = function parseQueryStringValues(str, options) {\n    var obj = {};\n    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\\?/, '') : str;\n    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;\n    var parts = cleanStr.split(options.delimiter, limit);\n\n    for (var i = 0; i < parts.length; ++i) {\n        var part = parts[i];\n\n        var bracketEqualsPos = part.indexOf(']=');\n        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;\n\n        var key, val;\n        if (pos === -1) {\n            key = options.decoder(part, defaults.decoder);\n            val = options.strictNullHandling ? null : '';\n        } else {\n            key = options.decoder(part.slice(0, pos), defaults.decoder);\n            val = options.decoder(part.slice(pos + 1), defaults.decoder);\n        }\n        if (has.call(obj, key)) {\n            obj[key] = [].concat(obj[key]).concat(val);\n        } else {\n            obj[key] = val;\n        }\n    }\n\n    return obj;\n};\n\nvar parseObject = function (chain, val, options) {\n    var leaf = val;\n\n    for (var i = chain.length - 1; i >= 0; --i) {\n        var obj;\n        var root = chain[i];\n\n        if (root === '[]') {\n            obj = [];\n            obj = obj.concat(leaf);\n        } else {\n            obj = options.plainObjects ? Object.create(null) : {};\n            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;\n            var index = parseInt(cleanRoot, 10);\n            if (\n                !isNaN(index)\n                && root !== cleanRoot\n                && String(index) === cleanRoot\n                && index >= 0\n                && (options.parseArrays && index <= options.arrayLimit)\n            ) {\n                obj = [];\n                obj[index] = leaf;\n            } else {\n                obj[cleanRoot] = leaf;\n            }\n        }\n\n        leaf = obj;\n    }\n\n    return leaf;\n};\n\nvar parseKeys = function parseQueryStringKeys(givenKey, val, options) {\n    if (!givenKey) {\n        return;\n    }\n\n    // Transform dot notation to bracket notation\n    var key = options.allowDots ? givenKey.replace(/\\.([^.[]+)/g, '[$1]') : givenKey;\n\n    // The regex chunks\n\n    var brackets = /(\\[[^[\\]]*])/;\n    var child = /(\\[[^[\\]]*])/g;\n\n    // Get the parent\n\n    var segment = brackets.exec(key);\n    var parent = segment ? key.slice(0, segment.index) : key;\n\n    // Stash the parent if it exists\n\n    var keys = [];\n    if (parent) {\n        // If we aren't using plain objects, optionally prefix keys\n        // that would overwrite object prototype properties\n        if (!options.plainObjects && has.call(Object.prototype, parent)) {\n            if (!options.allowPrototypes) {\n                return;\n            }\n        }\n\n        keys.push(parent);\n    }\n\n    // Loop through children appending to the array until we hit depth\n\n    var i = 0;\n    while ((segment = child.exec(key)) !== null && i < options.depth) {\n        i += 1;\n        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {\n            if (!options.allowPrototypes) {\n                return;\n            }\n        }\n        keys.push(segment[1]);\n    }\n\n    // If there's a remainder, just add whatever is left\n\n    if (segment) {\n        keys.push('[' + key.slice(segment.index) + ']');\n    }\n\n    return parseObject(keys, val, options);\n};\n\nmodule.exports = function (str, opts) {\n    var options = opts ? utils.assign({}, opts) : {};\n\n    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {\n        throw new TypeError('Decoder has to be a function.');\n    }\n\n    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;\n    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;\n    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;\n    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;\n    options.parseArrays = options.parseArrays !== false;\n    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;\n    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;\n    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;\n    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;\n    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;\n    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;\n\n    if (str === '' || str === null || typeof str === 'undefined') {\n        return options.plainObjects ? Object.create(null) : {};\n    }\n\n    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;\n    var obj = options.plainObjects ? Object.create(null) : {};\n\n    // Iterate over the keys and setup the new object\n\n    var keys = Object.keys(tempObj);\n    for (var i = 0; i < keys.length; ++i) {\n        var key = keys[i];\n        var newObj = parseKeys(key, tempObj[key], options);\n        obj = utils.merge(obj, newObj, options);\n    }\n\n    return utils.compact(obj);\n};\n\n\n//# sourceURL=webpack:///./node_modules/qs/lib/parse.js?");

/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/qs/lib/utils.js\");\nvar formats = __webpack_require__(/*! ./formats */ \"./node_modules/qs/lib/formats.js\");\n\nvar arrayPrefixGenerators = {\n    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching\n        return prefix + '[]';\n    },\n    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching\n        return prefix + '[' + key + ']';\n    },\n    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching\n        return prefix;\n    }\n};\n\nvar toISO = Date.prototype.toISOString;\n\nvar defaults = {\n    delimiter: '&',\n    encode: true,\n    encoder: utils.encode,\n    encodeValuesOnly: false,\n    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching\n        return toISO.call(date);\n    },\n    skipNulls: false,\n    strictNullHandling: false\n};\n\nvar stringify = function stringify( // eslint-disable-line func-name-matching\n    object,\n    prefix,\n    generateArrayPrefix,\n    strictNullHandling,\n    skipNulls,\n    encoder,\n    filter,\n    sort,\n    allowDots,\n    serializeDate,\n    formatter,\n    encodeValuesOnly\n) {\n    var obj = object;\n    if (typeof filter === 'function') {\n        obj = filter(prefix, obj);\n    } else if (obj instanceof Date) {\n        obj = serializeDate(obj);\n    } else if (obj === null) {\n        if (strictNullHandling) {\n            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;\n        }\n\n        obj = '';\n    }\n\n    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {\n        if (encoder) {\n            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);\n            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];\n        }\n        return [formatter(prefix) + '=' + formatter(String(obj))];\n    }\n\n    var values = [];\n\n    if (typeof obj === 'undefined') {\n        return values;\n    }\n\n    var objKeys;\n    if (Array.isArray(filter)) {\n        objKeys = filter;\n    } else {\n        var keys = Object.keys(obj);\n        objKeys = sort ? keys.sort(sort) : keys;\n    }\n\n    for (var i = 0; i < objKeys.length; ++i) {\n        var key = objKeys[i];\n\n        if (skipNulls && obj[key] === null) {\n            continue;\n        }\n\n        if (Array.isArray(obj)) {\n            values = values.concat(stringify(\n                obj[key],\n                generateArrayPrefix(prefix, key),\n                generateArrayPrefix,\n                strictNullHandling,\n                skipNulls,\n                encoder,\n                filter,\n                sort,\n                allowDots,\n                serializeDate,\n                formatter,\n                encodeValuesOnly\n            ));\n        } else {\n            values = values.concat(stringify(\n                obj[key],\n                prefix + (allowDots ? '.' + key : '[' + key + ']'),\n                generateArrayPrefix,\n                strictNullHandling,\n                skipNulls,\n                encoder,\n                filter,\n                sort,\n                allowDots,\n                serializeDate,\n                formatter,\n                encodeValuesOnly\n            ));\n        }\n    }\n\n    return values;\n};\n\nmodule.exports = function (object, opts) {\n    var obj = object;\n    var options = opts ? utils.assign({}, opts) : {};\n\n    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {\n        throw new TypeError('Encoder has to be a function.');\n    }\n\n    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;\n    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;\n    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;\n    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;\n    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;\n    var sort = typeof options.sort === 'function' ? options.sort : null;\n    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;\n    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;\n    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;\n    if (typeof options.format === 'undefined') {\n        options.format = formats['default'];\n    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {\n        throw new TypeError('Unknown format option provided.');\n    }\n    var formatter = formats.formatters[options.format];\n    var objKeys;\n    var filter;\n\n    if (typeof options.filter === 'function') {\n        filter = options.filter;\n        obj = filter('', obj);\n    } else if (Array.isArray(options.filter)) {\n        filter = options.filter;\n        objKeys = filter;\n    }\n\n    var keys = [];\n\n    if (typeof obj !== 'object' || obj === null) {\n        return '';\n    }\n\n    var arrayFormat;\n    if (options.arrayFormat in arrayPrefixGenerators) {\n        arrayFormat = options.arrayFormat;\n    } else if ('indices' in options) {\n        arrayFormat = options.indices ? 'indices' : 'repeat';\n    } else {\n        arrayFormat = 'indices';\n    }\n\n    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];\n\n    if (!objKeys) {\n        objKeys = Object.keys(obj);\n    }\n\n    if (sort) {\n        objKeys.sort(sort);\n    }\n\n    for (var i = 0; i < objKeys.length; ++i) {\n        var key = objKeys[i];\n\n        if (skipNulls && obj[key] === null) {\n            continue;\n        }\n\n        keys = keys.concat(stringify(\n            obj[key],\n            key,\n            generateArrayPrefix,\n            strictNullHandling,\n            skipNulls,\n            encode ? encoder : null,\n            filter,\n            sort,\n            allowDots,\n            serializeDate,\n            formatter,\n            encodeValuesOnly\n        ));\n    }\n\n    var joined = keys.join(delimiter);\n    var prefix = options.addQueryPrefix === true ? '?' : '';\n\n    return joined.length > 0 ? prefix + joined : '';\n};\n\n\n//# sourceURL=webpack:///./node_modules/qs/lib/stringify.js?");

/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar hexTable = (function () {\n    var array = [];\n    for (var i = 0; i < 256; ++i) {\n        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());\n    }\n\n    return array;\n}());\n\nvar compactQueue = function compactQueue(queue) {\n    var obj;\n\n    while (queue.length) {\n        var item = queue.pop();\n        obj = item.obj[item.prop];\n\n        if (Array.isArray(obj)) {\n            var compacted = [];\n\n            for (var j = 0; j < obj.length; ++j) {\n                if (typeof obj[j] !== 'undefined') {\n                    compacted.push(obj[j]);\n                }\n            }\n\n            item.obj[item.prop] = compacted;\n        }\n    }\n\n    return obj;\n};\n\nvar arrayToObject = function arrayToObject(source, options) {\n    var obj = options && options.plainObjects ? Object.create(null) : {};\n    for (var i = 0; i < source.length; ++i) {\n        if (typeof source[i] !== 'undefined') {\n            obj[i] = source[i];\n        }\n    }\n\n    return obj;\n};\n\nvar merge = function merge(target, source, options) {\n    if (!source) {\n        return target;\n    }\n\n    if (typeof source !== 'object') {\n        if (Array.isArray(target)) {\n            target.push(source);\n        } else if (typeof target === 'object') {\n            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {\n                target[source] = true;\n            }\n        } else {\n            return [target, source];\n        }\n\n        return target;\n    }\n\n    if (typeof target !== 'object') {\n        return [target].concat(source);\n    }\n\n    var mergeTarget = target;\n    if (Array.isArray(target) && !Array.isArray(source)) {\n        mergeTarget = arrayToObject(target, options);\n    }\n\n    if (Array.isArray(target) && Array.isArray(source)) {\n        source.forEach(function (item, i) {\n            if (has.call(target, i)) {\n                if (target[i] && typeof target[i] === 'object') {\n                    target[i] = merge(target[i], item, options);\n                } else {\n                    target.push(item);\n                }\n            } else {\n                target[i] = item;\n            }\n        });\n        return target;\n    }\n\n    return Object.keys(source).reduce(function (acc, key) {\n        var value = source[key];\n\n        if (has.call(acc, key)) {\n            acc[key] = merge(acc[key], value, options);\n        } else {\n            acc[key] = value;\n        }\n        return acc;\n    }, mergeTarget);\n};\n\nvar assign = function assignSingleSource(target, source) {\n    return Object.keys(source).reduce(function (acc, key) {\n        acc[key] = source[key];\n        return acc;\n    }, target);\n};\n\nvar decode = function (str) {\n    try {\n        return decodeURIComponent(str.replace(/\\+/g, ' '));\n    } catch (e) {\n        return str;\n    }\n};\n\nvar encode = function encode(str) {\n    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.\n    // It has been adapted here for stricter adherence to RFC 3986\n    if (str.length === 0) {\n        return str;\n    }\n\n    var string = typeof str === 'string' ? str : String(str);\n\n    var out = '';\n    for (var i = 0; i < string.length; ++i) {\n        var c = string.charCodeAt(i);\n\n        if (\n            c === 0x2D // -\n            || c === 0x2E // .\n            || c === 0x5F // _\n            || c === 0x7E // ~\n            || (c >= 0x30 && c <= 0x39) // 0-9\n            || (c >= 0x41 && c <= 0x5A) // a-z\n            || (c >= 0x61 && c <= 0x7A) // A-Z\n        ) {\n            out += string.charAt(i);\n            continue;\n        }\n\n        if (c < 0x80) {\n            out = out + hexTable[c];\n            continue;\n        }\n\n        if (c < 0x800) {\n            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);\n            continue;\n        }\n\n        if (c < 0xD800 || c >= 0xE000) {\n            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);\n            continue;\n        }\n\n        i += 1;\n        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));\n        out += hexTable[0xF0 | (c >> 18)]\n            + hexTable[0x80 | ((c >> 12) & 0x3F)]\n            + hexTable[0x80 | ((c >> 6) & 0x3F)]\n            + hexTable[0x80 | (c & 0x3F)];\n    }\n\n    return out;\n};\n\nvar compact = function compact(value) {\n    var queue = [{ obj: { o: value }, prop: 'o' }];\n    var refs = [];\n\n    for (var i = 0; i < queue.length; ++i) {\n        var item = queue[i];\n        var obj = item.obj[item.prop];\n\n        var keys = Object.keys(obj);\n        for (var j = 0; j < keys.length; ++j) {\n            var key = keys[j];\n            var val = obj[key];\n            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {\n                queue.push({ obj: obj, prop: key });\n                refs.push(val);\n            }\n        }\n    }\n\n    return compactQueue(queue);\n};\n\nvar isRegExp = function isRegExp(obj) {\n    return Object.prototype.toString.call(obj) === '[object RegExp]';\n};\n\nvar isBuffer = function isBuffer(obj) {\n    if (obj === null || typeof obj === 'undefined') {\n        return false;\n    }\n\n    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));\n};\n\nmodule.exports = {\n    arrayToObject: arrayToObject,\n    assign: assign,\n    compact: compact,\n    decode: decode,\n    encode: encode,\n    isBuffer: isBuffer,\n    isRegExp: isRegExp,\n    merge: merge\n};\n\n\n//# sourceURL=webpack:///./node_modules/qs/lib/utils.js?");

/***/ })

/******/ });