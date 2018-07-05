var Dice = require('./dice')
var ZombieDice = function(color){
  if( color != 'green' && color !='yellow' && color != 'red' ){
    throw new Error('Unknown color');
  }
  this.color = color;
  // diceLayoutMap = {
  //   green:{}
  // }
  this.dice = new Dice(6);
}

module.exports = ZombieDice