
var add = function(firstNumber){

  return function(secondNumber){
    return firstNumber + secondNumber; 
  }
}

var add5 = add(5);
var add4 = add(4);

console.log(add5(3));
console.log(add4(3));

///////////////////////////////////////////////////
var lastNameTrier = function(firstName){

  var inner = function(lastName){
    console.log(firstName, lastName);
  }

  return inner;
}

var trier = lastNameTrier("Keith");
trier("Duncan");
trier("Smith");
trier("Douglas");

///////////////////////////////////////////////////

var car = function(gas){
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

var newCar = car(10);

newCar.accelerate();
newCar.decelerate();

console.log(newCar.getGas());















