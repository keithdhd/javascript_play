// //Use this file to implement Part One of your project


// var animal = {};
// animal.username = "JarJarBinks";
// animal.tagline = "Hoo ha!";
// var noises = [];
// animal["noises"] = noises;

// var counter = 0;
// for(var key in animal){
//   if(key === "username"){
//     console.log("hello " + animal[key]);
//   }
//   counter++;
// }


// noises['0'] = "I'm zero";
// noises['1'] = "I'm one";
// console.log(noises[0]);

// function Animalmaker(name){
//   return{
//     speak: function(){
//       console.log('my name is ', name);
//     },
//     'loves dancing': true
//   }
// }


// var animalNames = ['Sheep', 'Lion', 'Guinea Pig'];
// var farm = [];

// for(var i=0; i < animalNames.length; i++){
//   farm.push(Animalmaker(animalNames[i]));
//   console.log(farm[i]['loves dancing']);
// }


// var farm = function(){
//   console.log(arguments);
// }

// farm('sheep', 'cow');




var noises = ['bah', 'moo'];
var animal = 'cat';
var number = 9;

var changeNoises = function(someNoises, someAnimal, someNumber){
  someNoises[3] = 'meaiow';
  someAnimal = 'dog';
  someNumber = 10;
}

changeNoises(noises, animal, number);
console.log(noises);
console.log(animal);
console.log(number);

var box = {};
box["material"] = "cardboard";
console.log(box);

for(key in box){
  console.log(typeof(key));
}


































