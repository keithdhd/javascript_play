var Countdown = function(minutes){
  this.minutes = minutes;
  this.seconds = 0;
}

Countdown.prototype = {
  start: function(){
    console.log("starting clock");


  }
}

module.exports = Countdown;