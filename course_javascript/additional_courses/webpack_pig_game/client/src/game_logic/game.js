var Turn = require('./turn')
var WinChecker = require('./win_checker')

var Game = function(player1, player2, dice, target){
  this.player1 = player1;
  this.player2 = player2;
  this.dice = dice;
  this.currentTurn = null;
  this.lastTurn = false;
  this.winChecker = new WinChecker(target);
}

Game.prototype = {
  turnInPlay: function(){
    return this.currentTurn!=null && !this.currentTurn.finished;
  },
  nextTurn: function(){
    if(this.turnInPlay() || this.gameWon()) return null;
    this.currentTurn = new Turn(this.nextPlayer(), this.dice);
  },
  roll: function(){
    return this.currentTurn.roll();
  },
  completeTurn:function(){
    if(this.gameWon()) return null;
    this.currentTurn.exit()
    this.winChecker.checkWin(this.player1, this.player2)
  },
  gameWon:function(){
    return this.player1.hasWon || this.player2.hasWon
  },

  winningPlayer: function(){
    if(!this.gameWon){return false}
    if(this.player1.hasWon){
      return this.player1
    } else {
      return this.player2
    }
  },


  nextPlayer: function(){
    if(this.currentTurn === null){
      return this.player1;
    }
    if(this.currentTurn.player === this.player1){
      return this.player2;
    } else{
      return this.player1;
    }
  }
}

module.exports = Game;
