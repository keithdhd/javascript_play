const PubSub = require('../helpers/pub_sub.js');

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
