var fs = require('fs');

fs.readFile("us-states.txt", "utf-8", function(err, data) {
  if(err){
    console.log("Uh oh! " + err);
  }
  else{
    var bufferString = data;
    var newLineCount = bufferString.split("\n").length;
    console.log("There are " + newLineCount + " lines in the file");
    console.log("Oh, you've finished reading the file.");
  }
});

console.log("Oh, where has Oregon? She's gone to Oklahoma.");
