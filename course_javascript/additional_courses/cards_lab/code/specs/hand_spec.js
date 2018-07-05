var expect = require('chai').expect;
var Hand = require("../hand");
var Card = require("../card");
describe('hand', function() {
  it('should have multiple cards', function() {
    var card1 = new Card( { suit:'Hearts', value:"Ace" } );
    var card2 = new Card( { suit:'Hearts', value:"2" } );

    var hand = new Hand([card1, card2]);
    expect(hand.cards.length).to.equal(2);
  });

  it('should give list of pairs', function() {
    var card1 = new Card( { suit:'Hearts', value:"2" } );
    var card2 = new Card( { suit:'Clubs', value:"2" } );

    var hand = new Hand([card1, card2]);
    expect(hand.pairs()).to.deep.equal([ "2" ]);
  });

  it('should show empty when no pairs', function() {
    var card1 = new Card( { suit:'Hearts', value:"2" } );
    var card2 = new Card( { suit:'Clubs', value:"1" } );

    var hand = new Hand([card1, card2]);
    expect(hand.pairs()).to.deep.equal([]);
  });

  it('should give highest pair', function() {
    var card1 = new Card( { suit:'Hearts', value:"2" } );
    var card2 = new Card( { suit:'Clubs', value:"2" } );
    var card3 = new Card( { suit:'Hearts', value:"Ace" } );
    var card4 = new Card( { suit:'Clubs', value:"Ace" } );

    var hand = new Hand([card1, card2]);
    expect(hand.pairs()).to.deep.equal([ "2" ]);
  });
});
