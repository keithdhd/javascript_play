DisplayState = {
  inGame: function(player1Name, player2Name){
    Elements.containers.start.style.display = "none";
    Elements.containers.inGame.style.display = "block";
    this.updateCurrentPlayer(player1Name);
    Elements.player1Label.innerHTML = player1Name;
    Elements.player2Label.innerHTML = player2Name;
  },
  updateCurrentPlayer: function(name){
    Elements.currentPlayer.innerHTML = name+"'s";
  },
  updateTurnScore: function(currentTurn)
  {
    Elements.turnScore.innerHTML = currentTurn.score;
  },
  turnReset: function(){
    Elements.turnScore.innerHTML = "0";
    Elements.turnLost.style.display = "none";
  },
  turnLost: function(nextPlayerName){
    this.updateCurrentPlayer(nextPlayerName);
    Elements.turnLost.style.display = "block";
  },
  updatePlayerScore: function(currentTurn){
    playerName = currentTurn.player.name;
    labels = Elements.playerLabels;
    for (i = 0; i < labels.length; i++) {
      if(labels[i].innerHTML == playerName)
      {
        var sibling = labels[i].nextElementSibling;
        var currentScore = parseInt(sibling.innerHTML)
        var score = currentScore + currentTurn.score
        sibling.innerHTML = score;
      }
    }
  },
  stick: function(game){
    this.updatePlayerScore(game.currentTurn);
    this.updateCurrentPlayer(game.nextPlayer().name)
    this.updateTurnScore(game.currentTurn)
    this.turnReset();
  },
  gameWon: function(game){
    console.log('game has been won trying to display')
    var winningPlayer = game.winningPlayer();
    Elements.currentPlayer.innerHTML = winningPlayer.name + " has won yo!"
  }

}
