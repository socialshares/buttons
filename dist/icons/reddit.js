(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reddit = __webpack_require__(7);

	var _reddit2 = _interopRequireDefault(_reddit);

	var _redditColor = __webpack_require__(8);

	var _redditColor2 = _interopRequireDefault(_redditColor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { default: _reddit2.default, color: _redditColor2.default };

/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1792 846q0 58-29.5 105.5T1683 1024q12 46 12 96 0 155-106.5 287T1298 1615.5 898 1692t-399.5-76.5-290-208.5T102 1120q0-47 11-94-51-25-82-73.5T0 846q0-82 58-140.5T199 647q85 0 145 63 218-152 515-162L975 27q3-13 15-21t26-5l369 81q18-37 54-59.5T1518 0q62 0 106 43.5t44 105.5-44 106-106 44-105.5-43.5T1369 150l-334-74-104 472q300 9 519 160 58-61 143-61 83 0 141 58.5t58 140.5zM418 1045q0 62 43.5 106t105.5 44 106-44 44-106-44-105.5T567 896q-61 0-105 44t-44 105zm810 355q11-11 11-26t-11-26q-10-10-25-10t-26 10q-41 42-121 62t-160 20-160-20-121-62q-11-10-26-10t-25 10q-11 10-11 25.5t11 26.5q43 43 118.5 68t122.5 29.5 91 4.5 91-4.5 122.5-29.5 118.5-68zm-3-205q62 0 105.5-44t43.5-106q0-61-44-105t-105-44q-62 0-106 43.5t-44 105.5 44 106 106 44z\"></path></svg>"

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-4.771 0.104 53.521 44.858\"><path fill=\"#FFF\" d=\"M29.909 35.89c-1.999 1.997-5.218 2.382-7.921 2.382-2.7 0-5.922-.385-7.918-2.382M36.021 4.276L25.899 1.894l-3.93 11.996L25.9 1.894m18.241 3.201a3.99 3.99 0 1 1-7.98 0 3.991 3.991 0 0 1 7.98 0zm.661 23.906c0 8.262-10.263 14.961-22.922 14.961-12.66 0-22.922-6.698-22.922-14.961 0-8.262 10.262-14.961 22.922-14.961 12.659 0 22.922 6.698 22.922 14.961zM-.744 26.676a5.061 5.061 0 0 1-3.027-4.636 5.06 5.06 0 0 1 8.935-3.257m33.568.103a5.061 5.061 0 0 1 9.018 3.154 5.064 5.064 0 0 1-3.23 4.72\"></path><path d=\"M21.879 44.963c-13.191 0-23.922-7.16-23.922-15.961 0-.608.051-1.21.151-1.801a6.066 6.066 0 0 1-2.879-5.161 6.068 6.068 0 0 1 6.06-6.061c1.493 0 2.916.546 4.017 1.522 4.149-2.663 9.73-4.339 15.887-4.455L25.235.71l.882.208.021.005 9.421 2.218A5 5 0 0 1 40.151.105a4.996 4.996 0 0 1 4.99 4.991 4.996 4.996 0 0 1-4.99 4.99 4.995 4.995 0 0 1-4.99-4.984l-8.596-2.024-3.273 9.99c5.933.231 11.291 1.912 15.291 4.517a6.028 6.028 0 0 1 4.108-1.605 6.068 6.068 0 0 1 6.061 6.061 6.019 6.019 0 0 1-3.08 5.28c.087.553.132 1.113.132 1.681-.002 8.801-10.734 15.961-23.925 15.961zM.157 27.11a9.05 9.05 0 0 0-.2 1.892c0 7.699 9.834 13.961 21.922 13.961 12.088 0 21.922-6.263 21.922-13.961 0-.612-.062-1.215-.183-1.807a1.003 1.003 0 0 1-.099-.435c-.669-2.627-2.494-5.012-5.13-6.934a.992.992 0 0 1-.429-.304c-4.007-2.755-9.732-4.482-16.081-4.482-6.285 0-11.961 1.693-15.962 4.401a1.022 1.022 0 0 1-.401.279C2.823 21.643.951 24.044.256 26.694a.992.992 0 0 1-.084.384c-.005.011-.009.022-.015.032zm40.097-8.319c2.319 1.855 4.021 4.064 4.891 6.488a4.033 4.033 0 0 0 1.605-3.239 4.065 4.065 0 0 0-4.061-4.061 4.04 4.04 0 0 0-2.435.812zm-38.965-.812a4.065 4.065 0 0 0-4.06 4.061c0 1.213.54 2.34 1.436 3.1.899-2.405 2.618-4.596 4.946-6.433a4.066 4.066 0 0 0-2.322-.728zM40.15 2.104c-1.648 0-2.99 1.342-2.99 2.991s1.342 2.99 2.99 2.99 2.99-1.341 2.99-2.99-1.341-2.991-2.99-2.991zM21.988 39.271c-4.005 0-6.827-.875-8.626-2.675a1 1 0 0 1 1.415-1.414c1.405 1.405 3.763 2.089 7.211 2.089 3.447 0 5.807-.684 7.214-2.089a.999.999 0 1 1 1.413 1.414c-1.801 1.8-4.622 2.675-8.627 2.675z\"></path><path fill=\"#FF4500\" d=\"M30.097 22.35c-2.038 0-3.749 1.707-3.749 3.745 0 2.037 1.711 3.688 3.749 3.688s3.688-1.651 3.688-3.688c0-2.038-1.651-3.745-3.688-3.745zm-16.158 0c-2.036 0-3.745 1.709-3.745 3.745s1.708 3.688 3.745 3.688 3.688-1.652 3.688-3.688-1.652-3.745-3.688-3.745z\"></path></svg>"

/***/ }

/******/ })
});
;