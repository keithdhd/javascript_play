var fs = require('fs');
var bufferString = "nothing";

fs.readFile("us-states.txt", "utf-8", function(err, data){
  if(err){
    console.log("uh oh! error");
  }
  else{
    bufferString = data;
    console.log(bufferString.split("\n").length - 1);
  }
})

console.log(bufferString);