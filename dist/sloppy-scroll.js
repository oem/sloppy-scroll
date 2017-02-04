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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
  'use strict';

  window.sloppyscroll = {
    init: function () {
      var scrollableLinks = document.querySelectorAll('[data-sloppyscroll]');

      [].forEach.call(scrollableLinks, function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          var linkParts = link.getAttribute('href').split('#');
          var linkId = linkParts[linkParts.length - 1];
          start(linkId);
        });
      });
    }
  };

  var minSpeed         = 150
    , toleranceBuffer  = 1
    , animationStopped = false
    , requestId
    , targetEl
    , targetId;

  function start(target) {
    targetId         = target;
    targetEl         = document.getElementById(targetId);
    animationStopped = false;
    loop();
  }

  function stop() {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId        = undefined;
      animationStopped = true;
      location.hash    = targetId;
    }
  }

  function loop() {
    if (!animationStopped) {
      scroll(targetEl);
      requestId = window.requestAnimationFrame(loop);
    }
  }

  function scroll(el) {
    var targetOffset  = el.offsetTop
      , pageOffset    = window.pageYOffset
      , oldPageOffset = pageOffset;

    if (targetOffset > pageOffset + toleranceBuffer) {
      window.scrollTo(el.offsetLeft, pageOffset + easeOut(targetOffset, pageOffset));
      if (oldPageOffset >= pageYOffset) stop();
    } else if (targetOffset < pageOffset - toleranceBuffer) {
      window.scrollTo(el.offsetLeft, pageOffset - easeOut(pageOffset, targetOffset));
      if (oldPageOffset <= pageYOffset) stop();
    } else {
      window.scrollTo(el.offsetLeft, targetOffset); // it might be 1px off, so scroll the last bit
      stop();
    }
  }

  function easeOut(firstOffset, secondOffset) {
    var distance = firstOffset - secondOffset;

    if (distance >= minSpeed * 2) {
      return minSpeed;
    } else {
      return (parseInt(distance/10) * 2) + toleranceBuffer;
    }
  }
})();



/***/ })
/******/ ]);