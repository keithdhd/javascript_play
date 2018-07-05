var createCar = function(gas){

  var currentGas = gas;
  var speed = 0;

  return {

    accelerate: function(){
      speed = speed + 10;
      currentGas--;
    },

    decelerate: function(){
      speed = speed - 10;
      currentGas--;
    },

    getGas: function(){
      return currentGas;
    }

  }

}

var newCar = createCar(100);
var newCar2 = createCar(10);
var newCar3 = createCar(30);
var newCar4 = createCar(20);
var newCar5 = createCar(0);

newCar.accelerate();
console.log(newCar.getGas(), newCar.speed);//undefined