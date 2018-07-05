console.log(2/4);

// console.log(Math.floor(2/4));

var nothingToSeeHereMoveOn = null;


function Car(typeOfCar, brand){
  this.typeOfCar = typeOfCar;
  this.brand = brand;
}

Car.prototype = {

  getInfo: function(){
    return "Hello! This is " + this.brand + " " + this.typeOfCar;
  }

}

var robinReliant = new Car("Robin", "Reliant");

var goKart = Object.create(Car.prototype);

goKart.brand = "Honda";

console.log(goKart.getInfo());