var expect = require('chai').expect;
var Card = require("../card");
describe('card', function() {
  it('should have a suit', function() {
    var card = new Card( { suit:'Hearts', value:"King" } );
    expect(card.suit).to.equal("Hearts");
  });
  it('should have a number', function() {
    var card = new Card( { suit:'Hearts', value:"King" } );
    expect(card.value).to.equal("King");
  });
  it('should be ranked', function() {
    var card = new Card( { suit:'Hearts', value:"King" } );
    expect(card.rank).to.equal(12);
  });
});
