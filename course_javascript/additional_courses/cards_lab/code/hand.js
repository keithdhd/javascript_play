var _ = require('lodash');
var Hand = function(cards) {
  this.cards = cards;
};

Hand.prototype = {

  pairs: function() {
    //returns list of pairs
    var counts = _.countBy(this.cards, function(card) {
      return card.value;
    });
    console.log('counts', counts);
    var pairs = _.pickBy(counts, function(count) {
      return count == 2;
    });

    console.log('pairs', pairs);
    return _.keys(pairs);
  }
};

module.exports = Hand;
