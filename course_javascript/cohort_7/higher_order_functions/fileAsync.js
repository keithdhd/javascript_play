var fs = require("fs");

fs.readFile("animalss.txt", function(err, data){
  if(err){
    console.log("ERROR", err);
  }
  else{
    var bufferString = data.toString();
    console.log('bufferString', bufferString);
    var numberOfAnimals = bufferString.split("\n").length - 1;
    console.log("There are " + numberOfAnimals + " animals");
  }
});

console.log("SOMETHING TO DO AT THE BOTTOM");
