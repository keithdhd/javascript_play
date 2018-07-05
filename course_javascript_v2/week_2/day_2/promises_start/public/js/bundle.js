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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
  }
};

module.exports = PubSub;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function (url) {
  this.url = url;
}

Request.prototype.get = function (onComplete) {
  // TODO: Make AJAX request to API
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const PubSub = __webpack_require__(0);

const BreedFormView = function (element) {
  this.element = element;
  this.bindEvents();
}

BreedFormView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', function (event = []) {
    event.preventDefault();

    const breed = event.target['breed-input'].value;
    event.target['breed-input'].value = '';

    PubSub.publish('BreedFormView:form-submitted', breed);
  });
}

module.exports = BreedFormView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const PubSub = __webpack_require__(0);

const DogView = function (container) {
  this.container = container;
  this.bindEvents();
}

DogView.prototype.bindEvents = function () {
  PubSub.subscribe('Request:dog-data-loaded', this.render.bind(this));
}

DogView.prototype.render = function (event) {
  this.clear();
  event.detail.forEach(this.addImage.bind(this));
}

DogView.prototype.clear = function () {
  this.container.innerHTML = '';
}

DogView.prototype.addImage = function (imageUrl) {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.addEventListener('click', () => { open(imageUrl); })
  this.container.appendChild(img);
}

module.exports = DogView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const BreedFormView = __webpack_require__(2);
const DogView = __webpack_require__(3);
const Request = __webpack_require__(1);
const PubSub = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', function () {

  new BreedFormView(document.querySelector('#breed-form'));
  new DogView(document.querySelector('#dog-container'));

  PubSub.subscribe('BreedFormView:form-submitted', (event) => {
    const breed = event.detail;
    const url = `https://dog.ceo/api/breed/${ breed }/images`;
    const request = new Request(url);

    const onComplete = (data) => {
      PubSub.publish('Request:dog-data-loaded', data.message);
    }

    request.get(onComplete);
  });

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map