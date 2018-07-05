var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function(err, list){
  if(err){ 
    console.log("Uh oh!");
  }else{
    list.forEach(function(file){
      if(path.extname(file).substring(1) === ext)
        console.log(file);
    })
  }
})