const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(selectElement){
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  this.selectElement.addEventListener('change', (evt) => {
    PubSub.publish("SelectView:details-ready", evt.target.value);
  });
};

SelectView.prototype.receiveData = function(){
  PubSub.subscribe("InstrumentFamilies:data-ready", (evt) => {
    evt.detail.forEach( (instrumentFamily, index) => {
      this.addOption(instrumentFamily, index);
    });
  });
}

SelectView.prototype.addOption = function (instrumentFamily, index) {
  const opt = document.createElement('option');
  opt.value = index;
  opt.textContent = instrumentFamily.name;
  this.selectElement.appendChild(opt);
};

module.exports = SelectView;
