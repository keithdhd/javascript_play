# JS Snakes and Ladder

- Create a dice object.

- Create snakes and ladders.
# Dice 30 mins

In pairs create a dice object.
First we'll create our spec.

```
touch dice_spec.js
```
```js
var Dice = require('./dice');
assert = require('assert');
describe('Dice', function() {
  var di = new Dice(6);
  it('should have a number of sides', function() {
    assert.equal(6, di.sides);
  });
});
```

Okay cool,  we now need a file to create our dice.

```
touch dice.js
```

And in this we'll make a constructor for our dice. Remember to export it.

```js
var Dice = function(sides) {
  this.sides = sides;
};
module.exports = Dice;
```

Now we want to be able to roll our dice and for it to give us number between 1 and it's number of sides.

```js
describe('Dice', function() {
  var di = new Dice(6);
  it('should have a number of sides', function() {
    assert.equal(6, di.sides);
  });
  it('should roll and be greater than zero and at most the number of sides', function() {
    var outcome = di.roll();
    assert.equal(true, outcome <= di.sides && outcome > 0);
  });
});
```

How can we implement this?  Computers are deterministic right? How we can it do randomness??
[TASK] Go and find out how we can produce a random number in Javascript?

```js
var Dice = function(sides) {
  this.sides = sides;
};

Dice.prototype = {
  roll: function() {
    return Math.ceil(Math.random() * this.sides);
  }
};

module.exports = Dice;
```

## Snakes and Ladders

We would like you to produce a version of snakes and ladders (with tests).

Plan how your objects will work to achieve this.

Don't worry about a UI, we will learn how to make a browser based UI for this next week.

Snakes and ladders is a bit of a non-game right?  Try and extend it to make it better.
