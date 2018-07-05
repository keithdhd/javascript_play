Die = require('./die');
Game = require('./snakes_ladders_game');

var Player = function(name, colour) {
  this.name = name;
  this.colour = colour;
  this.position = 0;
};

Player.prototype = {
  roll: function() {
    // throw dice twice
    var moves = myDie.roll();
    this.move(moves);
    return moves;
  },
  move: function(moves) {
    console.log("Player "+this.name+" START: "+this.position);
    console.log("Player "+this.name+" ROLLED: "+moves);
    // calculate new position
    this.moveToNextPosition(moves);
    console.log("Player "+this.name+" LANDED ON: "+this.position);
    // check if valid square
    if (this.position > 100) {
      this.moveBack(moves);
    } else if(this.position == 100) {
      this.assignWinner();
    }
    var snakeSize = this.checkForSnake();
    var ladderHeight = this.checkForLadder();
    if (snakeSize > 0) {
      this.eatSnake(snakeSize);
    }
    if (ladderHeight > 0) {
      this.fallOffLadder(ladderHeight);
    }
    console.log("Player "+this.name+" END: "+this.position);
    console.log("");
  },
  moveToNextPosition: function(moves) {
    this.position += moves;
  },
  moveBack: function(moves) {
    this.position -= moves;
  },
  eatSnake: function(sizeOfSnake) {
    this.position += sizeOfSnake;
  },
  fallOffLadder: function(height) {
    this.position -= height;
  },
  checkForSnake: function() {
    for (var i=0; i<myGame.snakes.length; i++) {
      var currSnake = myGame.snakes[i];
      if(this.position == currSnake.start) {
        console.log("Player "+this.name+" ATE SNAKE OF LENGTH: "+currSnake.length);
        return currSnake.length;
      }
    }
    return 0;
  },
  checkForLadder: function() {
    for (var i=0; i<myGame.ladders.length; i++) {
      var currLadder = myGame.ladders[i];
      if(this.position == currLadder.start) {
        console.log("Player "+this.name+" FELL OFF LADDER OF HEIGHT: "+currLadder.length);
        return currLadder.length;
      }
    }
    return 0;
  },
  assignWinner: function() {
    myGame.winner = this.name;
  }
};

module.exports = Player;