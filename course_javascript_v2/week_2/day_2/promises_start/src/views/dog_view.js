const PubSub = require('../helpers/pub_sub.js');

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
