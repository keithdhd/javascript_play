var Dice = require('./dice')
var dice = new Dice(6)

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var game_interface = {
  welcome: function(){
    console.log('Welcome to our game')
  },
  turn: function(){
    rl.question("How many dice do you want to roll, type q to exit", function(answer) {
      if(answer === 'q'){
        console.log('Goodbye my friend');
        rl.close();
        process.exit(0);
      }
      var dice = []
      for(var i=0; i<answer; i++){
        dice.push( new Dice(6) )
      }
      var values = dice.map(function(di){
        return di.roll();
      })
      console.log('The dice values ' + values);
      this.turn()
    }.bind(this));
  }
}

game_interface.welcome();
game_interface.turn();
