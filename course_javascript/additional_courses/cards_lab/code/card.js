VALUES = {
  2:1,
  3:2,
  4:3,
  5:4,
  6:5,
  7:6,
  8:7,
  9:8,
  10:9,
  Jack:10,
  Queen:11,
  King:12,
  Ace:13
};

var Card = function(options) {
  this.suit = options.suit;
  this.value= options.value;
  this.rank = VALUES[this.value];
};

module.exports = Card;
