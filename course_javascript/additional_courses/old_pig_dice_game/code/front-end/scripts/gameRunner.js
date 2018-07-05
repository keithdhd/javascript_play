GameRunner = {
  setupGame: function(player1Name, player2Name){
    var p1 = new Player(player1Name);
    var p2 = new Player(player2Name);
    var dice = new Dice(6)
    this.game = new Game(p1, p2, dice);
  },
  checkWin:function(){
    console.log('check win')
    return this.game.gameWon();
  }
};
