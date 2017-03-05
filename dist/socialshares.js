/*! socialshares v2.0.4 - https://socialshar.es */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("socialshares", [], factory);
	else if(typeof exports === 'object')
		exports["socialshares"] = factory();
	else
		root["socialshares"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeStyles = exports.unmount = exports.mount = exports.configure = exports.config = undefined;
	
	var _objectAssign = __webpack_require__(2);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _domready = __webpack_require__(3);
	
	var _domready2 = _interopRequireDefault(_domready);
	
	var _services = __webpack_require__(4);
	
	var services = _interopRequireWildcard(_services);
	
	var _icons = __webpack_require__(5);
	
	var defaultIcons = _interopRequireWildcard(_icons);
	
	var _socialshares = __webpack_require__(29);
	
	var _socialshares2 = _interopRequireDefault(_socialshares);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var socialshares = {};
	var initialButtons = {};
	var stylesInjected = false;
	
	// Default Options
	socialshares.config = {
	  url: null,
	  title: null,
	  text: null,
	  size: 'medium',
	  theme: 'light',
	  icononly: false,
	  icons: defaultIcons,
	  responsive: true,
	  dialog: {
	    width: 680,
	    height: 450
	  }
	};
	
	// Method to allow configuring socialshares
	// This will merge into socialshares.config
	socialshares.configure = function (config) {
	  (0, _objectAssign2.default)(socialshares.config, config);
	
	  return socialshares.config;
	};
	
	// Identifies the service based on the button's class
	// and returns the metadata for that service.
	function getService(classList) {
	  var service = void 0;
	
	  Object.keys(services).forEach(function (key) {
	    if (classList.contains('socialshares-' + key)) {
	      service = services[key];
	      service.name = key;
	    }
	  });
	
	  return service;
	}
	
	// Get Page Meta Description
	function getPageDescription() {
	  var meta = document.querySelector('meta[name="description"]');
	  return meta ? meta.getAttribute('content') : null;
	}
	
	// Popup window helper
	function openDialog(url) {
	  var width = socialshares.config.dialog.width;
	  var height = socialshares.config.dialog.height;
	
	  // Center the popup
	  var top = window.screen.height / 2 - height / 2;
	  var left = window.screen.width / 2 - width / 2;
	
	  window.open(url, 'Share', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
	}
	
	socialshares.mount = function () {
	  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.socialshares';
	  var initialMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  (0, _domready2.default)(function () {
	    // Querying all sets of buttons allows embedding
	    // socialshares multiple times on the same page.
	    var buttons = document.querySelectorAll(selector);
	
	    if (!buttons) return;
	
	    var _loop = function _loop(i) {
	      var btnSet = buttons[i];
	
	      if (btnSet.hasAttribute('data-nomount') && initialMount) {
	        return 'continue';
	      }
	
	      // Inject styles
	      if (!stylesInjected) {
	        _socialshares2.default.use();
	        stylesInjected = true;
	      }
	
	      // Add base class
	      if (!btnSet.classList.contains('socialshares')) {
	        btnSet.classList.add('socialshares');
	      }
	
	      // Store initial DOM for unmount()
	      if (!initialButtons[selector]) {
	        initialButtons[selector] = [];
	      }
	      initialButtons[selector][i] = {
	        element: btnSet,
	        markup: btnSet.innerHTML
	      };
	
	      // Remove whitespace between buttons
	      // This allows more control over styling
	      // http://stackoverflow.com/a/27841683/4958776
	      btnSet.innerHTML = btnSet.innerHTML.replace(/>\s+</g, '><');
	
	      // Config
	
	      var url = btnSet.getAttribute('data-url') || socialshares.config.url || window.location.href;
	      var title = btnSet.getAttribute('data-title') || socialshares.config.title || document.title;
	      var text = btnSet.getAttribute('data-text') || socialshares.config.text || getPageDescription();
	      var size = btnSet.getAttribute('data-size') || socialshares.config.size;
	      var theme = btnSet.getAttribute('data-theme') || socialshares.config.theme;
	      var icononly = btnSet.getAttribute('data-icononly') === '' || btnSet.getAttribute('data-icononly') === 'true' || socialshares.config.icononly;
	      var responsive = void 0;
	      if (btnSet.getAttribute('data-responsive') === 'false') {
	        responsive = false;
	      } else if (btnSet.getAttribute('data-responsive') === '' || btnSet.getAttribute('data-responsive') === 'true') {
	        responsive = true;
	      } else {
	        responsive = socialshares.config.responsive;
	      }
	
	      // Buttons
	
	      var btns = btnSet.querySelectorAll('div[class^="socialshares-"]');
	      var hiddenServices = [];
	
	      var _loop2 = function _loop2(_i) {
	        var btn = btns[_i];
	
	        var service = getService(btn.classList);
	
	        if (service.name !== 'more') {
	          hiddenServices.push(service.name);
	        }
	
	        var icon = socialshares.config.icons[service.name];
	        if (service.name === 'reddit') {
	          icon = socialshares.config.icons.reddit[theme === 'light' ? 'color' : 'default'];
	        }
	        var icononlyBtn = btn.getAttribute('data-icononly') === '' || icononly;
	        var label = btn.getAttribute('data-label') || service.action;
	        var via = btn.getAttribute('data-via');
	        var shareUrl = service.makeUrl({ url: url, title: title, text: text, via: via, hiddenServices: hiddenServices });
	
	        // Base classname
	        btn.classList.add('socialshares-btn');
	
	        // Configurable modifier classnames
	        btn.classList.add('socialshares-btn-' + size);
	        btn.classList.add('socialshares-btn-' + theme);
	        if (icononlyBtn) btn.classList.add('socialshares-btn-icononly');
	
	        btn.setAttribute('role', 'button');
	        btn.setAttribute('tabindex', '0');
	
	        btn.addEventListener('click', function () {
	          openDialog(shareUrl);
	        });
	
	        // Buttons should be activated by the space bar and enter key
	        // Source: http://www.last-child.com/keyboard-accessibility-with-the-space-bar/
	        btn.addEventListener('keyup', function (event) {
	          if (event.keyCode !== 32 && event.keyCode !== 13) return;
	          openDialog(shareUrl);
	        });
	
	        btn.innerHTML = '\n          <span class="socialshares-btn-icon" role="presentation">' + icon + '</span>\n          <span class="socialshares-btn-text">' + label + '</span>\n        ';
	      };
	
	      for (var _i = 0; _i < btns.length; _i++) {
	        _loop2(_i);
	      }
	
	      // Weird bug in Safari requires a forced repaint of the layout after
	      // adding or removing the socialshares-btn-icononly classname.
	      // http://stackoverflow.com/a/3485654
	      var forceRepaint = function forceRepaint(element) {
	        element.style.display = 'none';
	        element.offsetHeight;
	        element.style.display = '';
	      };
	
	      // Shows or hides the label depending on if there is enough space
	      var makeResponsive = function makeResponsive() {
	        var isOverflowing = function isOverflowing() {
	          return btnSet.offsetWidth < btnSet.scrollWidth;
	        };
	
	        // Hide Labels
	        if (isOverflowing()) {
	          for (var _i2 = btns.length - 1; _i2 >= 0; _i2--) {
	            var btn = btns[_i2];
	
	            if (!btn.classList.contains('socialshares-btn-icononly')) {
	              btn.classList.add('socialshares-btn-icononly');
	              forceRepaint(btn);
	              if (!isOverflowing()) break;
	            }
	          }
	        }
	
	        // Show Labels
	        if (!isOverflowing()) {
	          for (var _i3 = 0; _i3 < btns.length; _i3++) {
	            var _btn = btns[_i3];
	
	            if (!_btn.hasAttribute('data-icononly') && _btn.classList.contains('socialshares-btn-icononly')) {
	              _btn.classList.remove('socialshares-btn-icononly');
	              forceRepaint(_btn);
	              if (isOverflowing()) {
	                _btn.classList.add('socialshares-btn-icononly');
	                forceRepaint(_btn);
	                break;
	              }
	            }
	          }
	        }
	      };
	
	      initialButtons[selector][i].handleResize = function () {
	        // Debounced
	        // https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
	        clearTimeout(initialButtons[selector][i].resizeTimeout);
	        initialButtons[selector][i].resizeTimeout = setTimeout(makeResponsive, 250);
	      };
	
	      if (responsive && !icononly) {
	        makeResponsive();
	
	        window.addEventListener('resize', initialButtons[selector][i].handleResize);
	      }
	    };
	
	    for (var i = 0; i < buttons.length; i++) {
	      var _ret = _loop(i);
	
	      if (_ret === 'continue') continue;
	    }
	  });
	};
	
	socialshares.unmount = function () {
	  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.socialshares';
	
	  (0, _domready2.default)(function () {
	    if (!Object.keys(initialButtons).length) return;
	
	    initialButtons[selector].forEach(function (btnSet) {
	      var responsive = btnSet.element.getAttribute('data-responsive') === '' || btnSet.element.getAttribute('data-responsive') === 'true' || socialshares.config.responsive;
	      btnSet.element.innerHTML = btnSet.markup;
	      if (responsive) {
	        window.removeEventListener('resize', btnSet.handleResize);
	      }
	    });
	  });
	};
	
	socialshares.removeStyles = function () {
	  if (stylesInjected) {
	    _socialshares2.default.unuse();
	    stylesInjected = false;
	  }
	};
	
	// Initialize
	socialshares.mount('.socialshares', true);
	
	var config = exports.config = socialshares.config;
	var configure = exports.configure = socialshares.configure;
	var mount = exports.mount = socialshares.mount;
	var unmount = exports.unmount = socialshares.unmount;
	var removeStyles = exports.removeStyles = socialshares.removeStyles;
	
	exports.default = socialshares;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {
	
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	
	}('domready', function () {
	
	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
	
	
	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })
	
	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }
	
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.more = exports.email = exports.vk = exports.slack = exports.pinterest = exports.linkedin = exports.tumblr = exports.reddit = exports.googleplus = exports.facebook = exports.twitter = undefined;
	
	var _objectAssign = __webpack_require__(2);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encodeParams(params) {
	  var newParams = (0, _objectAssign2.default)({}, params);
	
	  Object.keys(params).forEach(function (key) {
	    newParams[key] = encodeURIComponent(newParams[key]);
	  });
	
	  return newParams;
	}
	
	var twitter = exports.twitter = {
	  action: 'Tweet',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams = encodeParams(params),
	        url = _encodeParams.url,
	        title = _encodeParams.title,
	        text = _encodeParams.text,
	        via = _encodeParams.via;
	
	    var viaParam = params.via ? '&via=' + via : '';
	    var textParam = text === 'null' && title ? title : text;
	    return 'https://twitter.com/share?url=' + url + '&text=' + textParam + viaParam;
	  }
	};
	
	var facebook = exports.facebook = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams2 = encodeParams(params),
	        url = _encodeParams2.url;
	
	    return 'https://www.facebook.com/sharer/sharer.php?u=' + url;
	  }
	};
	
	var googleplus = exports.googleplus = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams3 = encodeParams(params),
	        url = _encodeParams3.url;
	
	    return 'https://plus.google.com/share?url=' + url;
	  }
	};
	
	var reddit = exports.reddit = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams4 = encodeParams(params),
	        url = _encodeParams4.url;
	
	    return 'https://www.reddit.com/submit?url=' + url;
	  }
	};
	
	var tumblr = exports.tumblr = {
	  action: 'Post',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams5 = encodeParams(params),
	        url = _encodeParams5.url;
	
	    return 'https://www.tumblr.com/share/link?url=' + url;
	  }
	};
	
	var linkedin = exports.linkedin = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams6 = encodeParams(params),
	        url = _encodeParams6.url;
	
	    return 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
	  }
	};
	
	var pinterest = exports.pinterest = {
	  action: 'Pin it',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams7 = encodeParams(params),
	        url = _encodeParams7.url;
	
	    return 'https://www.pinterest.com/pin/create/button/?url=' + url;
	  }
	};
	
	var slack = exports.slack = {
	  action: 'Slack it',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams8 = encodeParams(params),
	        url = _encodeParams8.url;
	
	    return 'http://slackbutton.herokuapp.com/post/new/?url=' + url;
	  }
	};
	
	var vk = exports.vk = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams9 = encodeParams(params),
	        url = _encodeParams9.url,
	        title = _encodeParams9.title,
	        text = _encodeParams9.text;
	
	    return 'http://vk.com/share.php?url=' + url + '&title=' + title + '&description=' + text;
	  }
	};
	
	var email = exports.email = {
	  action: 'Email',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams10 = encodeParams(params),
	        url = _encodeParams10.url,
	        title = _encodeParams10.title,
	        text = _encodeParams10.text;
	
	    return 'mailto:?subject=' + title + '&body=' + text + '%0' + url;
	  }
	};
	
	var more = exports.more = {
	  action: 'More',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams11 = encodeParams(params),
	        url = _encodeParams11.url,
	        title = _encodeParams11.title,
	        text = _encodeParams11.text;
	
	    var hiddenServices = params.hiddenServices;
	    if (hiddenServices.length === 10) hiddenServices = '';
	    return 'https://socialshar.es/share.html?url=' + url + '&title=' + title + '&text=' + text + '&hide-services=' + hiddenServices;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.more = exports.vk = exports.twitter = exports.tumblr = exports.slack = exports.reddit = exports.pinterest = exports.linkedin = exports.googleplus = exports.facebook = exports.email = undefined;
	
	var _email = __webpack_require__(6);
	
	var _email2 = _interopRequireDefault(_email);
	
	var _facebook = __webpack_require__(8);
	
	var _facebook2 = _interopRequireDefault(_facebook);
	
	var _googleplus = __webpack_require__(10);
	
	var _googleplus2 = _interopRequireDefault(_googleplus);
	
	var _linkedin = __webpack_require__(12);
	
	var _linkedin2 = _interopRequireDefault(_linkedin);
	
	var _pinterest = __webpack_require__(14);
	
	var _pinterest2 = _interopRequireDefault(_pinterest);
	
	var _reddit = __webpack_require__(16);
	
	var _reddit2 = _interopRequireDefault(_reddit);
	
	var _slack = __webpack_require__(19);
	
	var _slack2 = _interopRequireDefault(_slack);
	
	var _tumblr = __webpack_require__(21);
	
	var _tumblr2 = _interopRequireDefault(_tumblr);
	
	var _twitter = __webpack_require__(23);
	
	var _twitter2 = _interopRequireDefault(_twitter);
	
	var _vk = __webpack_require__(25);
	
	var _vk2 = _interopRequireDefault(_vk);
	
	var _more = __webpack_require__(27);
	
	var _more2 = _interopRequireDefault(_more);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var email = exports.email = _email2.default;
	var facebook = exports.facebook = _facebook2.default;
	var googleplus = exports.googleplus = _googleplus2.default;
	var linkedin = exports.linkedin = _linkedin2.default;
	var pinterest = exports.pinterest = _pinterest2.default;
	var reddit = exports.reddit = _reddit2.default;
	var slack = exports.slack = _slack2.default;
	var tumblr = exports.tumblr = _tumblr2.default;
	var twitter = exports.twitter = _twitter2.default;
	var vk = exports.vk = _vk2.default;
	var more = exports.more = _more2.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _email = __webpack_require__(7);
	
	var _email2 = _interopRequireDefault(_email);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _email2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z\"></path></svg>"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _facebook = __webpack_require__(9);
	
	var _facebook2 = _interopRequireDefault(_facebook);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _facebook2.default;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.476-1.195 1.176v1.54h2.39l-.31 2.416h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0\" fill-rule=\"nonzero\"></path></svg>"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _googleplus = __webpack_require__(11);
	
	var _googleplus2 = _interopRequireDefault(_googleplus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _googleplus2.default;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M5.09 7.273v1.745h2.89c-.116.75-.873 2.197-2.887 2.197-1.737 0-3.155-1.44-3.155-3.215S3.353 4.785 5.09 4.785c.99 0 1.652.422 2.03.786l1.382-1.33c-.887-.83-2.037-1.33-3.41-1.33C2.275 2.91 0 5.184 0 8s2.276 5.09 5.09 5.09c2.94 0 4.888-2.065 4.888-4.974 0-.334-.036-.59-.08-.843H5.09zm10.91 0h-1.455V5.818H13.09v1.455h-1.454v1.454h1.455v1.455h1.455V8.727H16\"></path></svg>"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _linkedin = __webpack_require__(13);
	
	var _linkedin2 = _interopRequireDefault(_linkedin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _linkedin2.default;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955a1.376 1.376 0 1 1-.001-2.751 1.376 1.376 0 0 1 .001 2.751zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z\" fill-rule=\"nonzero\"></path></svg>"

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pinterest = __webpack_require__(15);
	
	var _pinterest2 = _interopRequireDefault(_pinterest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _pinterest2.default;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M8 0a8 8 0 0 0-2.916 15.45c-.07-.633-.133-1.604.028-2.295.146-.625.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.11.646-1.943 1.448-1.943.683 0 1.012.513 1.012 1.127 0 .687-.436 1.713-.662 2.664-.19.797.4 1.445 1.185 1.445 1.42 0 2.514-1.498 2.514-3.662 0-1.915-1.376-3.254-3.342-3.254-2.276 0-3.61 1.707-3.61 3.472 0 .687.263 1.424.593 1.825.066.08.075.15.057.23-.06.252-.196.796-.223.907-.035.146-.115.178-.268.107-.998-.465-1.624-1.926-1.624-3.1 0-2.524 1.834-4.84 5.287-4.84 2.774 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.977-4.153 4.977-.81 0-1.572-.422-1.833-.92l-.5 1.902c-.18.695-.667 1.566-.994 2.097A8.001 8.001 0 1 0 7.999.001z\" fill-rule=\"nonzero\"></path></svg>"

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reddit = __webpack_require__(17);
	
	var _reddit2 = _interopRequireDefault(_reddit);
	
	var _redditColor = __webpack_require__(18);
	
	var _redditColor2 = _interopRequireDefault(_redditColor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { default: _reddit2.default, color: _redditColor2.default };

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1792 846q0 58-29.5 105.5T1683 1024q12 46 12 96 0 155-106.5 287T1298 1615.5 898 1692t-399.5-76.5-290-208.5T102 1120q0-47 11-94-51-25-82-73.5T0 846q0-82 58-140.5T199 647q85 0 145 63 218-152 515-162L975 27q3-13 15-21t26-5l369 81q18-37 54-59.5T1518 0q62 0 106 43.5t44 105.5-44 106-106 44-105.5-43.5T1369 150l-334-74-104 472q300 9 519 160 58-61 143-61 83 0 141 58.5t58 140.5zM418 1045q0 62 43.5 106t105.5 44 106-44 44-106-44-105.5T567 896q-61 0-105 44t-44 105zm810 355q11-11 11-26t-11-26q-10-10-25-10t-26 10q-41 42-121 62t-160 20-160-20-121-62q-11-10-26-10t-25 10q-11 10-11 25.5t11 26.5q43 43 118.5 68t122.5 29.5 91 4.5 91-4.5 122.5-29.5 118.5-68zm-3-205q62 0 105.5-44t43.5-106q0-61-44-105t-105-44q-62 0-106 43.5t-44 105.5 44 106 106 44z\"></path></svg>"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-4.771 0.104 53.521 44.858\"><path fill=\"#FFF\" d=\"M29.909 35.89c-1.999 1.997-5.218 2.382-7.921 2.382-2.7 0-5.922-.385-7.918-2.382M36.021 4.276L25.899 1.894l-3.93 11.996L25.9 1.894m18.241 3.201a3.99 3.99 0 1 1-7.98 0 3.991 3.991 0 0 1 7.98 0zm.661 23.906c0 8.262-10.263 14.961-22.922 14.961-12.66 0-22.922-6.698-22.922-14.961 0-8.262 10.262-14.961 22.922-14.961 12.659 0 22.922 6.698 22.922 14.961zM-.744 26.676a5.061 5.061 0 0 1-3.027-4.636 5.06 5.06 0 0 1 8.935-3.257m33.568.103a5.061 5.061 0 0 1 9.018 3.154 5.064 5.064 0 0 1-3.23 4.72\"></path><path d=\"M21.879 44.963c-13.191 0-23.922-7.16-23.922-15.961 0-.608.051-1.21.151-1.801a6.066 6.066 0 0 1-2.879-5.161 6.068 6.068 0 0 1 6.06-6.061c1.493 0 2.916.546 4.017 1.522 4.149-2.663 9.73-4.339 15.887-4.455L25.235.71l.882.208.021.005 9.421 2.218A5 5 0 0 1 40.151.105a4.996 4.996 0 0 1 4.99 4.991 4.996 4.996 0 0 1-4.99 4.99 4.995 4.995 0 0 1-4.99-4.984l-8.596-2.024-3.273 9.99c5.933.231 11.291 1.912 15.291 4.517a6.028 6.028 0 0 1 4.108-1.605 6.068 6.068 0 0 1 6.061 6.061 6.019 6.019 0 0 1-3.08 5.28c.087.553.132 1.113.132 1.681-.002 8.801-10.734 15.961-23.925 15.961zM.157 27.11a9.05 9.05 0 0 0-.2 1.892c0 7.699 9.834 13.961 21.922 13.961 12.088 0 21.922-6.263 21.922-13.961 0-.612-.062-1.215-.183-1.807a1.003 1.003 0 0 1-.099-.435c-.669-2.627-2.494-5.012-5.13-6.934a.992.992 0 0 1-.429-.304c-4.007-2.755-9.732-4.482-16.081-4.482-6.285 0-11.961 1.693-15.962 4.401a1.022 1.022 0 0 1-.401.279C2.823 21.643.951 24.044.256 26.694a.992.992 0 0 1-.084.384c-.005.011-.009.022-.015.032zm40.097-8.319c2.319 1.855 4.021 4.064 4.891 6.488a4.033 4.033 0 0 0 1.605-3.239 4.065 4.065 0 0 0-4.061-4.061 4.04 4.04 0 0 0-2.435.812zm-38.965-.812a4.065 4.065 0 0 0-4.06 4.061c0 1.213.54 2.34 1.436 3.1.899-2.405 2.618-4.596 4.946-6.433a4.066 4.066 0 0 0-2.322-.728zM40.15 2.104c-1.648 0-2.99 1.342-2.99 2.991s1.342 2.99 2.99 2.99 2.99-1.341 2.99-2.99-1.341-2.991-2.99-2.991zM21.988 39.271c-4.005 0-6.827-.875-8.626-2.675a1 1 0 0 1 1.415-1.414c1.405 1.405 3.763 2.089 7.211 2.089 3.447 0 5.807-.684 7.214-2.089a.999.999 0 1 1 1.413 1.414c-1.801 1.8-4.622 2.675-8.627 2.675z\"></path><path fill=\"#FF4500\" d=\"M30.097 22.35c-2.038 0-3.749 1.707-3.749 3.745 0 2.037 1.711 3.688 3.749 3.688s3.688-1.651 3.688-3.688c0-2.038-1.651-3.745-3.688-3.745zm-16.158 0c-2.036 0-3.745 1.709-3.745 3.745s1.708 3.688 3.745 3.688 3.688-1.652 3.688-3.688-1.652-3.745-3.688-3.745z\"></path></svg>"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slack = __webpack_require__(20);
	
	var _slack2 = _interopRequireDefault(_slack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slack2.default;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid\"><path d=\"M165.964 15.838c-3.89-11.975-16.752-18.528-28.725-14.636-11.975 3.89-18.528 16.752-14.636 28.725l58.947 181.365c4.048 11.187 16.132 17.473 27.732 14.135 12.1-3.483 19.475-16.334 15.614-28.217L165.964 15.838\" fill=\"#DFA22F\"></path><path d=\"M74.626 45.516C70.734 33.542 57.873 26.989 45.9 30.879 33.924 34.77 27.37 47.631 31.263 59.606l58.948 181.366c4.047 11.186 16.132 17.473 27.732 14.132 12.099-3.481 19.474-16.332 15.613-28.217L74.626 45.516\" fill=\"#3CB187\"></path><path d=\"M240.162 166.045c11.975-3.89 18.526-16.75 14.636-28.726-3.89-11.973-16.752-18.527-28.725-14.636L44.708 181.632c-11.187 4.046-17.473 16.13-14.135 27.73 3.483 12.099 16.334 19.475 28.217 15.614l181.372-58.93\" fill=\"#CE1E5B\"></path><path d=\"M82.508 217.27l43.347-14.084-14.086-43.352-43.35 14.09 14.089 43.347\" fill=\"#392538\"></path><path d=\"M173.847 187.591c16.388-5.323 31.62-10.273 43.348-14.084l-14.088-43.36-43.35 14.09 14.09 43.354\" fill=\"#BB242A\"></path><path d=\"M210.484 74.706c11.974-3.89 18.527-16.751 14.637-28.727-3.89-11.973-16.752-18.526-28.727-14.636L15.028 90.293C3.842 94.337-2.445 106.422.896 118.022c3.481 12.098 16.332 19.474 28.217 15.613l181.371-58.93\" fill=\"#72C5CD\"></path><path d=\"M52.822 125.933c11.805-3.836 27.025-8.782 43.354-14.086-5.323-16.39-10.273-31.622-14.084-43.352l-43.36 14.092 14.09 43.346\" fill=\"#248C73\"></path><path d=\"M144.16 96.256l43.356-14.088a546179.21 546179.21 0 0 0-14.089-43.36L130.07 52.9l14.09 43.356\" fill=\"#62803A\"></path></svg>"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tumblr = __webpack_require__(22);
	
	var _tumblr2 = _interopRequireDefault(_tumblr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _tumblr2.default;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M9.708 16c-3.396 0-4.687-2.504-4.687-4.274V6.498H3.403V4.432C5.83 3.557 6.412 1.368 6.55.12c.01-.086.077-.12.115-.12H9.01v4.076h3.2v2.422H8.997v4.98c.01.667.25 1.58 1.472 1.58h.067c.424-.012.994-.136 1.29-.278l.77 2.283c-.288.424-1.594.916-2.77.936h-.12z\" fill-rule=\"nonzero\"></path></svg>"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _twitter = __webpack_require__(24);
	
	var _twitter2 = _interopRequireDefault(_twitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _twitter2.default;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M16 3.038a6.62 6.62 0 0 1-1.885.517 3.299 3.299 0 0 0 1.443-1.816 6.59 6.59 0 0 1-2.085.795 3.273 3.273 0 0 0-2.396-1.036 3.281 3.281 0 0 0-3.197 4.03A9.329 9.329 0 0 1 1.114 2.1 3.243 3.243 0 0 0 .67 3.75c0 1.14.58 2.143 1.46 2.732a3.278 3.278 0 0 1-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22a3.336 3.336 0 0 1-1.482.056 3.287 3.287 0 0 0 3.067 2.28 6.592 6.592 0 0 1-4.077 1.404c-.265 0-.526-.015-.783-.045a9.303 9.303 0 0 0 5.032 1.474c6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425a6.67 6.67 0 0 0 1.638-1.7z\" fill-rule=\"nonzero\"></path></svg>"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vk = __webpack_require__(26);
	
	var _vk2 = _interopRequireDefault(_vk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _vk2.default;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path d=\"M7.828 12.526h.957s.288-.032.436-.19c.137-.147.133-.42.133-.42s-.02-1.284.576-1.473c.587-.187 1.34 1.24 2.14 1.788.604.416 1.063.326 1.063.326l2.137-.03s1.117-.07.587-.948c-.043-.072-.308-.65-1.588-1.838-1.34-1.244-1.162-1.043.452-3.194.983-1.31 1.376-2.11 1.253-2.452-.117-.326-.84-.24-.84-.24l-2.406.015s-.18-.025-.31.054c-.13.077-.213.258-.213.258s-.38 1.013-.89 1.876c-1.07 1.82-1.5 1.915-1.674 1.802-.407-.264-.305-1.058-.305-1.622 0-1.763.267-2.498-.52-2.688-.263-.063-.455-.105-1.124-.112-.86-.01-1.585.003-1.996.204-.274.134-.485.433-.357.45.16.02.52.097.71.357.248.335.24 1.088.24 1.088s.14 2.075-.33 2.333c-.326.177-.77-.184-1.726-1.834-.49-.845-.858-1.78-.858-1.78s-.072-.174-.2-.268c-.153-.113-.368-.15-.368-.15L.52 3.855s-.342.01-.468.16c-.112.132-.01.406-.01.406s1.79 4.187 3.818 6.298c1.858 1.935 3.968 1.808 3.968 1.808z\"></path></svg>"

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _more = __webpack_require__(28);
	
	var _more2 = _interopRequireDefault(_more);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _more2.default;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M576 736v192q0 40-28 68t-68 28H288q-40 0-68-28t-28-68V736q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68V736q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68V736q0-40 28-68t68-28h192q40 0 68 28t28 68z\"></path></svg>"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var refs = 0;
	var dispose;
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	exports.use = exports.ref = function() {
		if(!(refs++)) {
			exports.locals = content.locals;
			dispose = __webpack_require__(32)(content, {"insertAt":"top","singleton":true});
		}
		return exports;
	};
	exports.unuse = exports.unref = function() {
		if(!(--refs)) {
			dispose();
			dispose = null;
		}
	};
	if(false) {
		var lastRefs = module.hot.data && module.hot.data.refs || 0;
		if(lastRefs) {
			exports.ref();
			if(!content.locals) {
				refs = lastRefs;
			}
		}
		if(!content.locals) {
			module.hot.accept();
		}
		module.hot.dispose(function(data) {
			data.refs = content.locals ? 0 : refs;
			if(dispose) {
				dispose();
			}
		});
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	// imports
	
	
	// module
	exports.push([module.id, ":root {\n  /* Brand Colors */\n}\n\n/* Reset box-sizing */\n.socialshares,\n.socialshares *,\n.socialshares *::before,\n.socialshares *::after {\n  box-sizing: border-box;\n}\n\n.socialshares {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  white-space: nowrap;\n  width: auto;\n  max-width: 100%;\n  cursor: default;\n}\n\n.socialshares-btn {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin: 0;\n  padding: 0.25em 0.5em;\n  width: auto;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-weight: 500;\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n  line-height: 1.1;\n  letter-spacing: 0.03em;\n  border-radius: 2px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 0.2s ease;\n  transition: all 0.2s ease\n\n  /* Sizes */\n}\n\n.socialshares-btn:active {\n  outline: none;\n}\n\n.socialshares-btn-small {\n  font-size: 14px;\n}\n\n.socialshares-btn-medium {\n  font-size: 18px;\n}\n\n.socialshares-btn-large {\n  font-size: 21px;\n}\n\n.socialshares-btn:not(:first-child) {\n  margin-left: 0.5em;\n}\n\n.socialshares-btn-icon {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  width: 1em;\n  height: 1em;\n}\n\n.socialshares-btn-icon svg {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  width: 1em;\n  height: 1em;\n}\n\n.socialshares-more .socialshares-btn-icon svg {\n  top: 1px;\n}\n\n.socialshares-btn-light-monotone .socialshares-btn-icon svg,\n    .socialshares-btn-light-monotone .socialshares-btn-icon path {\n  fill: #222;\n}\n\n.socialshares-btn-dark .socialshares-btn-icon svg,\n    .socialshares-btn-dark .socialshares-btn-icon path,\n    .socialshares-btn-brand .socialshares-btn-icon svg,\n    .socialshares-btn-brand:not(.socialshares-reddit) .socialshares-btn-icon path {\n  fill: #fff;\n}\n\n.socialshares-btn-text {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin: 0 0 0 0.3em;\n  padding: 0;\n  width: auto;\n  height: 1em;\n}\n\n.socialshares-btn-icononly .socialshares-btn-text {\n  /* http://a11yproject.com/posts/how-to-hide-content */\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n/* Icon Colors */\n.socialshares-twitter {}\n.socialshares-twitter svg {\n  fill: #55acee;\n}\n.socialshares-facebook {}\n.socialshares-facebook svg {\n  fill: #3b5998;\n}\n.socialshares-googleplus {}\n.socialshares-googleplus svg {\n  fill: #dc4e41;\n}\n.socialshares-reddit {}\n.socialshares-reddit svg {\n  fill: #ff4500;\n}\n.socialshares-tumblr {}\n.socialshares-tumblr svg {\n  fill: #36465d;\n}\n.socialshares-linkedin {}\n.socialshares-linkedin svg {\n  fill: #0077b5;\n}\n.socialshares-pinterest {}\n.socialshares-pinterest svg {\n  fill: #bd081c;\n}\n.socialshares-slack {}\n.socialshares-slack svg {\n  fill: #56b68b;\n}\n.socialshares-vk {}\n.socialshares-vk svg {\n  fill: #6383a8;\n}\n\n/* Themes */\n\n[class*=\"socialshares-btn-light\"] {\n  color: #222;\n  background: rgba(0, 0, 0, .1);\n  border: 1px solid rgba(0, 0, 0, .15)\n}\n\n[class*=\"socialshares-btn-light\"]:hover,\n  [class*=\"socialshares-btn-light\"]:focus {\n  background: rgba(0, 0, 0, .2);\n  border-color: rgba(0, 0, 0, .25);\n}\n\n[class*=\"socialshares-btn-light\"]:active {\n  background: rgba(0, 0, 0, .3);\n  border-color: rgba(0, 0, 0, .35);\n}\n\n.socialshares-btn-dark {\n  color: #fff;\n  background: rgba(0, 0, 0, .7);\n  border: 1px solid rgba(0, 0, 0, .55)\n}\n\n.socialshares-btn-dark:hover,\n  .socialshares-btn-dark:focus {\n  background: rgba(0, 0, 0, .8);\n  border-color: rgba(0, 0, 0, .75);\n}\n\n.socialshares-btn-dark:active {\n  background: rgba(0, 0, 0, .9);\n  border-color: rgba(0, 0, 0, .85);\n}\n\n.socialshares-btn-brand {\n  color: #fff;\n  background: rgba(0, 0, 0, .9);\n  border: 1px solid rgba(0, 0, 0, .85)\n}\n\n.socialshares-btn-brand:hover,\n  .socialshares-btn-brand:focus {\n  background: rgba(0, 0, 0, .7);\n  border-color: rgba(0, 0, 0, .65);\n}\n\n.socialshares-btn-brand:active {\n  background: rgba(0, 0, 0, .6);\n  border-color: rgba(0, 0, 0, .55);\n}\n\n.socialshares-btn-brand.socialshares-twitter {\n  background: #55acee;\n  border-color: rgb(60, 160, 236);\n}\n\n.socialshares-btn-brand.socialshares-twitter:hover,\n      .socialshares-btn-brand.socialshares-twitter:focus {\n  background: rgb(84, 142, 186);\n  border-color: rgb(84, 149, 199);\n}\n\n.socialshares-btn-brand.socialshares-twitter:active {\n  background: rgb(84, 113, 135);\n  border-color: rgb(84, 120, 148);\n}\n\n.socialshares-btn-brand.socialshares-facebook {\n  background: #3b5998;\n  border-color: rgb(51, 77, 132);\n}\n\n.socialshares-btn-brand.socialshares-facebook:hover,\n      .socialshares-btn-brand.socialshares-facebook:focus {\n  background: rgb(59, 72, 102);\n  border-color: rgb(59, 76, 115);\n}\n\n.socialshares-btn-brand.socialshares-facebook:active {\n  background: rgb(57, 57, 57);\n  border-color: rgb(59, 60, 64);\n}\n\n.socialshares-btn-brand.socialshares-googleplus {\n  background: #dc4e41;\n  border-color: rgb(216, 58, 44);\n}\n\n.socialshares-btn-brand.socialshares-googleplus:hover,\n      .socialshares-btn-brand.socialshares-googleplus:focus {\n  background: rgb(168, 72, 64);\n  border-color: rgb(181, 74, 64);\n}\n\n.socialshares-btn-brand.socialshares-googleplus:active {\n  background: rgb(117, 68, 64);\n  border-color: rgb(130, 69, 64);\n}\n\n.socialshares-btn-brand.socialshares-reddit {\n  background: #ff4500;\n  border-color: rgb(230, 61, 0);\n}\n\n.socialshares-btn-brand.socialshares-reddit:hover,\n      .socialshares-btn-brand.socialshares-reddit:focus {\n  background: rgb(204, 54, 0);\n  border-color: rgb(217, 58, 0);\n}\n\n.socialshares-btn-brand.socialshares-reddit:active {\n  background: rgb(153, 41, 0);\n  border-color: rgb(166, 44, 0);\n}\n\n.socialshares-btn-brand.socialshares-tumblr {\n  background: #36465d;\n  border-color: rgb(45, 58, 78);\n}\n\n.socialshares-btn-brand.socialshares-tumblr:hover,\n      .socialshares-btn-brand.socialshares-tumblr:focus {\n  background: rgb(51, 51, 51);\n  border-color: rgb(54, 54, 54);\n}\n\n.socialshares-btn-brand.socialshares-tumblr:active {\n  background: rgb(44, 44, 44);\n  border-color: rgb(45, 45, 45);\n}\n\n.socialshares-btn-brand.socialshares-linkedin {\n  background: #0077b5;\n  border-color: rgb(0, 99, 153);\n}\n\n.socialshares-btn-brand.socialshares-linkedin:hover,\n      .socialshares-btn-brand.socialshares-linkedin:focus {\n  background: rgb(0, 85, 130);\n  border-color: rgb(0, 93, 143);\n}\n\n.socialshares-btn-brand.socialshares-linkedin:active {\n  background: rgb(0, 51, 79);\n  border-color: rgb(0, 60, 92);\n}\n\n.socialshares-btn-brand.socialshares-pinterest {\n  background: #bd081c;\n  border-color: rgb(166, 7, 26);\n}\n\n.socialshares-btn-brand.socialshares-pinterest:hover,\n      .socialshares-btn-brand.socialshares-pinterest:focus {\n  background: rgb(138, 8, 23);\n  border-color: rgb(150, 8, 24);\n}\n\n.socialshares-btn-brand.socialshares-pinterest:active {\n  background: rgb(87, 8, 17);\n  border-color: rgb(99, 8, 18);\n}\n\n.socialshares-btn-brand.socialshares-slack {\n  background: #56b68b;\n  border-color: rgb(73, 171, 127);\n}\n\n.socialshares-btn-brand.socialshares-slack:hover,\n      .socialshares-btn-brand.socialshares-slack:focus {\n  background: rgb(87, 130, 111);\n  border-color: rgb(87, 143, 118);\n}\n\n.socialshares-btn-brand.socialshares-slack:active {\n  background: rgb(84, 84, 84);\n  border-color: rgb(87, 92, 90);\n}\n\n.socialshares-btn-brand.socialshares-vk {\n  background: #6383a8;\n  border-color: rgb(86, 118, 153);\n}\n\n.socialshares-btn-brand.socialshares-vk:hover,\n      .socialshares-btn-brand.socialshares-vk:focus {\n  background: rgb(99, 108, 117);\n  border-color: rgb(99, 114, 130);\n}\n\n.socialshares-btn-brand.socialshares-vk:active {\n  background: rgb(88, 88, 88);\n  border-color: rgb(92, 92, 92);\n}\n", ""]);
	
	// exports


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=socialshares.js.map