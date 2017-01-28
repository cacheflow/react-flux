/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	//Our DOM elements with javascript objects
	/** jsx dom */

	var dom = function dom(tag, attrs) {
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  if (typeof tag == 'function') {
	    attrs = attrs || {};
	    attrs.children = children;
	    console.log(tag(attrs));
	    return tag(attrs);
	  } else {
	    if (children.length > 1) {
	      for (var i in children) {
	        var child = children[i];
	        if (child && (typeof child === 'undefined' ? 'undefined' : _typeof(child)) != 'object') {
	          children[i] = dom('span', null, child.toString());
	        }
	      }
	    }
	  }
	  return { tag: tag, attrs: attrs, children: children };
	};

	var list = dom(
	  'ul',
	  { className: 'list' },
	  dom(
	    'li',
	    null,
	    ' Hope this works '
	  ),
	  dom(
	    'li',
	    null,
	    ' Bet it will not work '
	  ),
	  dom(
	    'li',
	    null,
	    ' I hate jury duty '
	  )
	);

	var root = document.getElementById('app');

/***/ }
/******/ ]);