var fs = require('fs');

var buffer = fs.readFileSync("animalss.txt");
var bufferString = buffer.toString();
console.log("bufferString", bufferString);
var numberOfAnimals = bufferString.split("\n").length - 1;
console.log("There are " + numberOfAnimals + " animals");


console.log("SOMETHING TO DO AT THE BOTTOM");
