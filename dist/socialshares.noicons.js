/*! socialshares v2.0.3 - https://socialshar.es */
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
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '.socialshares' : arguments[0];
	  var initialMount = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
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
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '.socialshares' : arguments[0];
	
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

	'use strict';
	/* eslint-disable no-unused-vars */
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
			var test1 = new String('abc');  // eslint-disable-line
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
		} catch (e) {
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
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
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
	    var _encodeParams = encodeParams(params);
	
	    var url = _encodeParams.url;
	    var text = _encodeParams.text;
	    var via = _encodeParams.via;
	
	    var viaParam = params.via ? '&via=' + via : '';
	    return 'https://twitter.com/share?url=' + url + '&text=' + text + viaParam;
	  }
	};
	
	var facebook = exports.facebook = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams2 = encodeParams(params);
	
	    var url = _encodeParams2.url;
	
	    return 'https://www.facebook.com/sharer/sharer.php?u=' + url;
	  }
	};
	
	var googleplus = exports.googleplus = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams3 = encodeParams(params);
	
	    var url = _encodeParams3.url;
	
	    return 'https://plus.google.com/share?url=' + url;
	  }
	};
	
	var reddit = exports.reddit = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams4 = encodeParams(params);
	
	    var url = _encodeParams4.url;
	
	    return 'https://www.reddit.com/submit?url=' + url;
	  }
	};
	
	var tumblr = exports.tumblr = {
	  action: 'Post',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams5 = encodeParams(params);
	
	    var url = _encodeParams5.url;
	
	    return 'https://www.tumblr.com/share/link?url=' + url;
	  }
	};
	
	var linkedin = exports.linkedin = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams6 = encodeParams(params);
	
	    var url = _encodeParams6.url;
	
	    return 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
	  }
	};
	
	var pinterest = exports.pinterest = {
	  action: 'Pin it',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams7 = encodeParams(params);
	
	    var url = _encodeParams7.url;
	
	    return 'https://www.pinterest.com/pin/create/button/?url=' + url;
	  }
	};
	
	var slack = exports.slack = {
	  action: 'Slack it',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams8 = encodeParams(params);
	
	    var url = _encodeParams8.url;
	
	    return 'http://slackbutton.herokuapp.com/post/new/?url=' + url;
	  }
	};
	
	var vk = exports.vk = {
	  action: 'Share',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams9 = encodeParams(params);
	
	    var url = _encodeParams9.url;
	    var title = _encodeParams9.title;
	    var text = _encodeParams9.text;
	
	    return 'http://vk.com/share.php?url=' + url + '&title=' + title + '&description=' + text;
	  }
	};
	
	var email = exports.email = {
	  action: 'Email',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams10 = encodeParams(params);
	
	    var url = _encodeParams10.url;
	    var title = _encodeParams10.title;
	    var text = _encodeParams10.text;
	
	    return 'mailto:?subject=' + title + '&body=' + text + '%0' + url;
	  }
	};
	
	var more = exports.more = {
	  action: 'More',
	  makeUrl: function makeUrl(params) {
	    var _encodeParams11 = encodeParams(params);
	
	    var url = _encodeParams11.url;
	    var title = _encodeParams11.title;
	    var text = _encodeParams11.text;
	
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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

/***/ },
/* 18 */
/***/ function(module, exports) {

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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

	// empty (null-loader)

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
	exports.push([module.id, ":root {\n  /* Brand Colors */\n}\n\n/* Reset box-sizing */\n.socialshares,\n.socialshares *,\n.socialshares *::before,\n.socialshares *::after {\n  box-sizing: border-box;\n}\n\n.socialshares {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  white-space: nowrap;\n  width: auto;\n  max-width: 100%;\n  cursor: default;\n}\n\n.socialshares-btn {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin: 0;\n  padding: 0.25em 0.5em;\n  width: auto;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-weight: 500;\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n  line-height: 1.1;\n  letter-spacing: 0.03em;\n  border-radius: 2px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 0.2s ease;\n  transition: all 0.2s ease\n\n  /* Sizes */\n}\n\n.socialshares-btn:active {\n  outline: none;\n}\n\n.socialshares-btn-small {\n  font-size: 14px;\n}\n\n.socialshares-btn-medium {\n  font-size: 18px;\n}\n\n.socialshares-btn-large {\n  font-size: 21px;\n}\n\n.socialshares-btn:not(:first-child) {\n  margin-left: 0.5em;\n}\n\n.socialshares-btn-icon {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  width: 1em;\n  height: 1em;\n}\n\n.socialshares-btn-icon svg {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  width: 1em;\n  height: 1em;\n}\n\n.socialshares-more .socialshares-btn-icon svg {\n  top: 1px;\n}\n\n.socialshares-btn-light-monotone .socialshares-btn-icon svg,\n    .socialshares-btn-light-monotone .socialshares-btn-icon path {\n  fill: #222;\n}\n\n.socialshares-btn-dark .socialshares-btn-icon svg,\n    .socialshares-btn-dark .socialshares-btn-icon path,\n    .socialshares-btn-brand .socialshares-btn-icon svg,\n    .socialshares-btn-brand:not(.socialshares-reddit) .socialshares-btn-icon path {\n  fill: #fff;\n}\n\n.socialshares-btn-text {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin: 0 0 0 0.3em;\n  padding: 0;\n  width: auto;\n  height: 1em;\n}\n\n.socialshares-btn-icononly .socialshares-btn-text {\n  /* http://a11yproject.com/posts/how-to-hide-content */\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n/* Icon Colors */\n.socialshares-twitter {}\n.socialshares-twitter svg {\n  fill: #55acee;\n}\n.socialshares-facebook {}\n.socialshares-facebook svg {\n  fill: #3b5998;\n}\n.socialshares-googleplus {}\n.socialshares-googleplus svg {\n  fill: #dc4e41;\n}\n.socialshares-reddit {}\n.socialshares-reddit svg {\n  fill: #ff4500;\n}\n.socialshares-tumblr {}\n.socialshares-tumblr svg {\n  fill: #36465d;\n}\n.socialshares-linkedin {}\n.socialshares-linkedin svg {\n  fill: #0077b5;\n}\n.socialshares-pinterest {}\n.socialshares-pinterest svg {\n  fill: #bd081c;\n}\n.socialshares-slack {}\n.socialshares-slack svg {\n  fill: #56b68b;\n}\n.socialshares-vk {}\n.socialshares-vk svg {\n  fill: #6383a8;\n}\n\n/* Themes */\n\n[class*=\"socialshares-btn-light\"] {\n  color: #222;\n  background: rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(0, 0, 0, 0.15)\n}\n\n[class*=\"socialshares-btn-light\"]:hover,\n  [class*=\"socialshares-btn-light\"]:focus {\n  background: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.25);\n}\n\n[class*=\"socialshares-btn-light\"]:active {\n  background: rgba(0, 0, 0, 0.3);\n  border-color: rgba(0, 0, 0, 0.35);\n}\n\n.socialshares-btn-dark {\n  color: #fff;\n  background: rgba(0, 0, 0, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.55)\n}\n\n.socialshares-btn-dark:hover,\n  .socialshares-btn-dark:focus {\n  background: rgba(0, 0, 0, 0.8);\n  border-color: rgba(0, 0, 0, 0.75);\n}\n\n.socialshares-btn-dark:active {\n  background: rgba(0, 0, 0, 0.9);\n  border-color: rgba(0, 0, 0, 0.85);\n}\n\n.socialshares-btn-brand {\n  color: #fff;\n  background: rgba(0, 0, 0, 0.9);\n  border: 1px solid rgba(0, 0, 0, 0.85)\n}\n\n.socialshares-btn-brand:hover,\n  .socialshares-btn-brand:focus {\n  background: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.65);\n}\n\n.socialshares-btn-brand:active {\n  background: rgba(0, 0, 0, 0.6);\n  border-color: rgba(0, 0, 0, 0.55);\n}\n\n.socialshares-btn-brand.socialshares-twitter {\n  background: #55acee;\n  border-color: rgb(60, 160, 236);\n}\n\n.socialshares-btn-brand.socialshares-twitter:hover,\n      .socialshares-btn-brand.socialshares-twitter:focus {\n  background: rgb(84, 142, 186);\n  border-color: rgb(84, 149, 199);\n}\n\n.socialshares-btn-brand.socialshares-twitter:active {\n  background: rgb(84, 113, 135);\n  border-color: rgb(84, 120, 148);\n}\n\n.socialshares-btn-brand.socialshares-facebook {\n  background: #3b5998;\n  border-color: rgb(51, 77, 132);\n}\n\n.socialshares-btn-brand.socialshares-facebook:hover,\n      .socialshares-btn-brand.socialshares-facebook:focus {\n  background: rgb(59, 72, 102);\n  border-color: rgb(59, 76, 115);\n}\n\n.socialshares-btn-brand.socialshares-facebook:active {\n  background: rgb(57, 57, 57);\n  border-color: rgb(59, 60, 64);\n}\n\n.socialshares-btn-brand.socialshares-googleplus {\n  background: #dc4e41;\n  border-color: rgb(216, 58, 44);\n}\n\n.socialshares-btn-brand.socialshares-googleplus:hover,\n      .socialshares-btn-brand.socialshares-googleplus:focus {\n  background: rgb(168, 72, 64);\n  border-color: rgb(181, 74, 64);\n}\n\n.socialshares-btn-brand.socialshares-googleplus:active {\n  background: rgb(117, 68, 64);\n  border-color: rgb(130, 69, 64);\n}\n\n.socialshares-btn-brand.socialshares-reddit {\n  background: #ff4500;\n  border-color: rgb(230, 61, 0);\n}\n\n.socialshares-btn-brand.socialshares-reddit:hover,\n      .socialshares-btn-brand.socialshares-reddit:focus {\n  background: rgb(204, 54, 0);\n  border-color: rgb(217, 58, 0);\n}\n\n.socialshares-btn-brand.socialshares-reddit:active {\n  background: rgb(153, 41, 0);\n  border-color: rgb(166, 44, 0);\n}\n\n.socialshares-btn-brand.socialshares-tumblr {\n  background: #36465d;\n  border-color: rgb(45, 58, 78);\n}\n\n.socialshares-btn-brand.socialshares-tumblr:hover,\n      .socialshares-btn-brand.socialshares-tumblr:focus {\n  background: rgb(51, 51, 51);\n  border-color: rgb(54, 54, 54);\n}\n\n.socialshares-btn-brand.socialshares-tumblr:active {\n  background: rgb(44, 44, 44);\n  border-color: rgb(45, 45, 45);\n}\n\n.socialshares-btn-brand.socialshares-linkedin {\n  background: #0077b5;\n  border-color: rgb(0, 99, 153);\n}\n\n.socialshares-btn-brand.socialshares-linkedin:hover,\n      .socialshares-btn-brand.socialshares-linkedin:focus {\n  background: rgb(0, 85, 130);\n  border-color: rgb(0, 93, 143);\n}\n\n.socialshares-btn-brand.socialshares-linkedin:active {\n  background: rgb(0, 51, 79);\n  border-color: rgb(0, 60, 92);\n}\n\n.socialshares-btn-brand.socialshares-pinterest {\n  background: #bd081c;\n  border-color: rgb(166, 7, 26);\n}\n\n.socialshares-btn-brand.socialshares-pinterest:hover,\n      .socialshares-btn-brand.socialshares-pinterest:focus {\n  background: rgb(138, 8, 23);\n  border-color: rgb(150, 8, 24);\n}\n\n.socialshares-btn-brand.socialshares-pinterest:active {\n  background: rgb(87, 8, 17);\n  border-color: rgb(99, 8, 18);\n}\n\n.socialshares-btn-brand.socialshares-slack {\n  background: #56b68b;\n  border-color: rgb(73, 171, 127);\n}\n\n.socialshares-btn-brand.socialshares-slack:hover,\n      .socialshares-btn-brand.socialshares-slack:focus {\n  background: rgb(87, 130, 111);\n  border-color: rgb(87, 143, 118);\n}\n\n.socialshares-btn-brand.socialshares-slack:active {\n  background: rgb(84, 84, 84);\n  border-color: rgb(87, 92, 90);\n}\n\n.socialshares-btn-brand.socialshares-vk {\n  background: #6383a8;\n  border-color: rgb(86, 118, 153);\n}\n\n.socialshares-btn-brand.socialshares-vk:hover,\n      .socialshares-btn-brand.socialshares-vk:focus {\n  background: rgb(99, 108, 117);\n  border-color: rgb(99, 114, 130);\n}\n\n.socialshares-btn-brand.socialshares-vk:active {\n  background: rgb(88, 88, 88);\n  border-color: rgb(92, 92, 92);\n}\n", ""]);
	
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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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
//# sourceMappingURL=socialshares.noicons.js.map