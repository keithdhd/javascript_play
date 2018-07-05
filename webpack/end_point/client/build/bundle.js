/******/ (function(modules) { // webpackBootstrap
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

	var waterBottle  = __webpack_require__(1)
	
	var displayVolume = function(){
	  var volumeDisplay = document.getElementById('volume');
	  volumeDisplay.innerText = waterBottle.volume;
	}
	
	window.onload = function(){
	  displayVolume();
	
	  var refillButton = document.getElementById('refill');
	
	  refillButton.onclick = function(){
	    waterBottle.fill();
	    displayVolume();
	  }
	
	  var drinkButton = document.getElementById('drink');
	
	  drinkButton.onclick = function(){
	    waterBottle.drink();
	    displayVolume();
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var checker = __webpack_require__(2);
	
	var waterBottle = {
	  volume: 0,
	  checker: checker,
	  hydrationValue: 10,
	  fill: function(){
	    this.volume = 100;
	  },
	  drink: function(){
	    this.volume -= this.hydrationValue;
	    this.volume = checker.notMinus(this.volume);
	  },
	  empty: function(){
	    this.volume = 0;
	  }
	}
	
	module.exports = waterBottle;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var checker = {
	  notMinus: function(value){
	    return value < 0 ? 0 : value;
	  },
	}
	
	module.exports = checker;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map