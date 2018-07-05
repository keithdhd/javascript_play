const PubSub = require('../helpers/pub_sub.js');

const DetailView = function(divElement){
  this.divElement = divElement;
};

DetailView.prototype.bindEvents = function () {
  PubSub.subscribe("InstrumentFamilies:details-ready", (evt) => {
    console.log(evt.detail);
    // append to the DOM
  });
};

module.exports = DetailView;
