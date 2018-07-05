  EventHandler = {
    init: function() {
      this.bindStartButton();
      this.bindRollButton();
      this.bindStickButton();
    },
    bindStartButton: function(){
      var that = this;
      Elements.buttons.start.onclick = function() {
        player1Name = Elements.player1Name.value;
        player2Name = Elements.player2Name.value;
        GameRunner.setupGame(player1Name, player2Name);
        DisplayState.inGame(player1Name, player2Name);
      };
    },
    bindRollButton: function(){
      Elements.buttons.roll.onclick = function() {
        DisplayState.turnReset();
        var game = GameRunner.game;
        game.nextTurn();
        game.roll();
        if(game.currentTurn.score == 0)
        {
          DisplayState.turnLost(game.nextPlayer().name);
        }
        DisplayState.updateTurnScore(game.currentTurn)
      };
    },
    bindStickButton: function(){
      Elements.buttons.stick.onclick = function() {
        GameRunner.game.completeTurn();
        DisplayState.stick(GameRunner.game);
        if(GameRunner.checkWin()){
          console.log('Game is won')
          DisplayState.gameWon(GameRunner.game);
        }
      };
    }
  };
