const _ = require('lodash');

class Grid {

  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.scents = [];
  }

  isOffGrid (x, y) {
    return (x < 0 || y < 0 || x > this.x || y > this.y);
  }

  setScent (x, y) {
    this.scents.push("" + x + y);
  }

  isScented (x, y) {
    return _.find( this.scents, function(scent){
      return _.isEqual(scent, "" + x + y);
    })
  }

}

module.exports = Grid;