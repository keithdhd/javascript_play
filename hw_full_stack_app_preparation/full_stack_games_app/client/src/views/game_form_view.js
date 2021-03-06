const PubSub = require('../helpers/pub_sub.js')

const GameFormView = function (form) {
  this.form = form;
};

GameFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

GameFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newGame = this.createGame(evt.target);
  PubSub.publish('GameView:game-submitted', newGame);
};

GameFormView.prototype.createGame = function (form) {
  const newGame = {
    game: {
      name: form.name.value,
      playingTime: form.playingTime.value,
      players: {
        min: form.minNumPlayers.value,
        max: form.minNumPlayers.value
      }
    }
  };

  return newGame;
};

module.exports = GameFormView;
