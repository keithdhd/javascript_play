var waterBottle = {
  volume: 0,
  hydrationValue: 10,
  fill: function() {
    this.volume = 100;
  },
  drink: function() {
    this.volume -= this.hydrationValue;
    this.volume = checker.notMinus(this.volume);
  },
  empty: function() {
    this.volume = 0;
  }
};

module.exports = waterBottle;