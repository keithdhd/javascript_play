
window.initElements = function(){
  window.Elements = {
    buttons: {
      start: document.getElementById("btn-start"),
      roll: document.getElementById("btn-roll"),
      stick: document.getElementById("btn-stick"),
    },
    containers :{
      start: document.getElementById("container-start"),
      inGame: document.getElementById("container-in-game"),
    },
    player1Name: document.getElementsByName("player1-name")[0],
    player2Name: document.getElementsByName("player2-name")[0],
    currentPlayer: document.getElementById("current-player"),
    player1Label: document.getElementById("player1-label"),
    player2Label: document.getElementById("player2-label"),
    playerLabels: document.getElementsByClassName("player-label"),
    turnScore: document.getElementById("turn-score"),
    turnLost: document.getElementById("turn-lost")
  }
}
