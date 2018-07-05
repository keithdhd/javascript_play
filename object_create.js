// function Car (desc) {
//     this.desc = desc;
//     this.color = "red";
// }
 
// Car.prototype = {
//     getInfo: function() {
//       return 'A ' + this.color + ' ' + this.desc + '.';
//     }
// };

// //instantiate object using the constructor function
// var car =  Object.create(Car.prototype, 
//   { 
//     color:
//       { writable: true,  configurable:true, value: 'red' },
//       desc:
//       { writable: true,  configurable:true, value: 'Porsche' }
//   }
// );

// car.color = "blue";
// // console.log(car.getInfo()); //displays 'A blue undefined.' ??!

// var Planet = function(name, size){
  
//   return{
//     name: name,
//     size: size,
//     explode: function(){
//       console.log("Uh oh " + this.name + " has exploded! Boom");
//     }
//   }

// }

// var mercury = Planet("Mercury", "tiny");
// var jupiter = Planet("Jupiter", "huge");
// var venus = Planet("Venus", "tiny");
// mercury.explode();
// jupiter.explode();
// venus.explode();



var planet = {
  name: "Alderan",
  size: 2039,
  explode: function(){
    return this.name + " has gone boom!"
  },
  expand: null
}

planet.expand = function(){
  this.size += 1000;
}

planet.expand();
console.log(planet.explode());
console.log(planet.size);
