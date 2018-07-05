var Die = function(sides) {
  this.sides = sides || 6;
};

Die.prototype = {
  roll: function() {
    return Math.floor((Math.random()*this.sides)+1);
  }
};

module.exports = Die;