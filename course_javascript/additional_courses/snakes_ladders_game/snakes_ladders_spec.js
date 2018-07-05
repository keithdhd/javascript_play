var assert = require('assert');
Game = require('./snakes_ladders_game');
Die = require('./die');
Player = require('./player');
Snake = require('./snakes_ladders');
Ladder = require('./snakes_ladders');

var setup = function() {
  myDie = new Die();
  myGame = new Game();
  player1 = new Player('Marc', 'blue');
  player2 = new Player('Val', 'red');
  player3 = new Player('Jay', 'yellow');
  player4 = new Player('Keith', 'green');
  myGame.addPlayer(player1);
  myGame.addPlayer(player2);
  myGame.addPlayer(player3);
  myGame.addPlayer(player4);
}

var addSnakesAndLadders = function() {
  myGame.addSnake(10,5);
  myGame.addSnake(18,8);
  myGame.addSnake(29,4);
  myGame.addSnake(33,5);
  myGame.addSnake(46,7);
  myGame.addSnake(52,9);
  myGame.addSnake(60,4);
  myGame.addSnake(89,5);
  myGame.addLadder(24,7);
  myGame.addLadder(46,8);
  myGame.addLadder(52,2);
  myGame.addLadder(78,9);
  myGame.addLadder(80,4);
}

describe('die', function() {
  it('should have 6 sides', function() {
    setup();
    assert.equal(6, myDie.sides);
  });
  it('should be able to roll a number between 1 and 6', function(){
    setup();
    var dieThrow = myDie.roll();
    assert(dieThrow >= 1 && dieThrow <= 6);
  });
});

describe('Snakes and Ladders game', function() {
  it('should be able to add a player to the game', function() {
    setup();
    assert.deepEqual(myGame.players[0], player1);
  });
  it('should store player at position 4 if 4 is rolled', function() {
    setup();
    player1.move(4);
    assert.equal(myGame.players[0].position, 4);
  });
  it('should store multiple players at position 4 if both roll 4', function() {
    setup();
    player1.move(4);
    player2.move(4);
    assert.equal(myGame.players[0].position, 4);
    assert.equal(myGame.players[1].position, 4);
  });
  it ('should store snake of length 5 at position 12', function() {
    setup();
    var snakePosition = 12;
    var snakeLength = 5;
    myGame.addSnake(snakePosition,snakeLength);
    var snakeFound = false;
    for (var i=0; i<myGame.snakes.length; i++) {
      var currSnake = myGame.snakes[i];
      if(currSnake.start == snakePosition) {
        snakeFound = true;
      }
    }
    assert(snakeFound);
  });
  it('should start and continue until 1 player wins', function(){
    setup();
    addSnakesAndLadders();
    myGame.start();
  });
});

describe('snake', function(size) {
  it('should move player forward lengthOfSnake spaces', function() {
    setup();
    myGame.players[0].position = 5;
    myGame.players[0].eatSnake(5);
    assert.equal(myGame.players[0].position, 10);
  });
});

describe('ladder', function(height) {
  it('should move player backward lengthOfLadder spaces', function() {
    setup();
    myGame.players[0].position = 10;
    myGame.players[0].fallOffLadder(5);
    assert.equal(myGame.players[0].position, 5);
  });
});

describe('player', function() {
  it('all players should have an initial position of 0', function() {
    setup();
    for (var i=0; i<myGame.players.length; i++) {
      assert.equal(myGame.players[i].position, 0);
    }
  });
  it('all players should have a name', function() {
    setup();
    for (var i=0; i<myGame.players.length; i++) {
      assert(myGame.players[i].name != "");
    }
  });
  it('all players should have a colour', function() {
      setup();
      for (var i=0; i<myGame.players.length; i++) {
            assert(myGame.players[i].colour != "");
          }
    });
  it('should move forward 4 if 4 is rolled', function() {
    setup();
    myGame.players[0].move(4);
    assert.equal(myGame.players[0].position,4);
  });
  it('should eat snake and move forward sizeOFSnake spaces if lands on snake', function() {
    setup();
    var snakePosition = 12;
    var snakeLength = 5;
    myGame.addSnake(snakePosition,snakeLength);
    myGame.players[0].move(12);
    assert(myGame.players[0].position, 17);
  });
  it('should fall off ladder and move backward sizeOFLadder spaces if lands on ladder', function() {
    setup();
    var ladderPosition = 12;
    var ladderLength = 5;
    myGame.addLadder(ladderPosition,ladderLength);
    myGame.players[0].move(12);
    assert(myGame.players[0].position, 7);
  });
  it('should win if they reach 100', function(){
    setup();
    addSnakesAndLadders();
    myGame.players[0].position = 97;
    myGame.players[0].move(3);
    assert.equal(myGame.winner, myGame.players[0].name);
  });
  it ('should not be able to travel past 100 squares', function() {
    setup();
    addSnakesAndLadders();
    myGame.players[0].position = 98;
    myGame.players[0].move(3);
    assert.equal(myGame.players[0].position, 98);
  });
  it('should move to top of snake if lands at bottom of snake', function() {
    setup();
    addSnakesAndLadders();
    myGame.players[0].move(10);
    assert.equal(myGame.players[0].position, 15);
  });
  it('should move to bottom of ladder if lands at top of ladder', function() {
    setup();
    addSnakesAndLadders();
    myGame.players[0].move(24);
    assert.equal(myGame.players[0].position, 17);
  });
});