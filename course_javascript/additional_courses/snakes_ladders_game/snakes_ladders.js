var Snake = function(start, length) {
  this.start = start;
  this.length = length;
};

var Ladder = function(start, length) {
  this.start = start;
  this.length = length;
}

module.exports = {
  snake: Snake,
  ladder: Ladder
};