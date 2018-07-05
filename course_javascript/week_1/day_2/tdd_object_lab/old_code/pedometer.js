var pedometer = {
  count : 0,
  increment: function(numSteps) {
    if(numSteps)
      this.count += numSteps;
    else
      this.count++;
  }
};

module.exports = pedometer;