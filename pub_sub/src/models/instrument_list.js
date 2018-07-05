const PubSub = require('../helpers/pub_sub.js');

const InstrumentList = function(){
  this.instrumentFamilies = [
    {name: "Stringed", description: "The six string guitar is...", instruments: ["guitar", "fiddle"]},
    {name: "Percusion", description: "The six string guitar is...", instruments: ["snare", "bongo"]}
  ];
}

InstrumentList.prototype.bindEvents = function () {
  PubSub.subscribe("SelectView:details-ready", (evt) => {
    this.publishChange(evt.detail);
  });
};

InstrumentList.prototype.getData = function () {
  PubSub.publish("InstrumentFamilies:data-ready", this.instrumentFamilies);
};

InstrumentList.prototype.publishChange = function (index) {
  PubSub.publish("InstrumentFamilies:details-ready", this.instrumentFamilies[index]);
};

module.exports = InstrumentList;
