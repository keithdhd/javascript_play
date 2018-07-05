var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, data){
  if(err) 
    console.log("Uh oh!");
  else
    var bufferString = data;
  
  console.log(bufferString.split("\n").length-1);
})

