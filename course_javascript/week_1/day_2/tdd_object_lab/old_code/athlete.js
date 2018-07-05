var checker = require('./checker');

var athlete = {
  hydration: 100,
  distanceCovered: 0,
  checker: checker,
  run: function(distance,pedometer) {
    if(this.isDehydrated()) return;
    this.dehydrate();
    this.distanceCovered += distance;
    if(pedometer)
      pedometer.increment(distance);
  },
  isDehydrated: function() {
    return this.hydration === 0;
  },
  dehydrate: function() {
    this.hydration = checker.notMinus(this.hydration);
    if(this.hydration <= 10)
      this.hydration = 0;
    else
      this.hydration -= 10;
  },
  drink: function(bottle) {
    this.hydration += bottle.hydrationValue;
  }
};

module.exports = athlete;
