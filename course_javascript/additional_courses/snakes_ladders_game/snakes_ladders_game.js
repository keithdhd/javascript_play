var Player = require('./player');
var Snake = require('./snakes_ladders').snake;
var Ladder = require('./snakes_ladders').ladder;

var Game = function() {
  this.players = [];
  this.snakes = [];
  this.ladders = [];
  this.winner = "";
};

Game.prototype = {
  addPlayer: function(player) {
    this.players.push(player);    
  },
  addSnake: function(start, length) {
    if (start + length < 100) {
      var mySnake = new Snake(start, length);
      this.snakes.push(mySnake);
      return true;
    } else {
      return false;
    }
  },
  addLadder: function(start, length) {
    if (start - length > 0) {
      var myLadder = new Ladder(start, length);
      this.ladders.push(myLadder);
      return true;
    } else {
      return false;
    }
  },
  start: function() {
    myDie = new Die();
    while (myGame.winner == "" && this.players[0].position < 100) {
      for (var p=0; p<this.players.length; p++) {
        var roll = this.players[p].roll();
        if (myGame.winner != "") {
          break;
        }
      }
    }
    console.log("***** "+myGame.winner+" HAS WON *****");
  }
};

module.exports = Game;