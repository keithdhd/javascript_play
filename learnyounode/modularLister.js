var listFilter = require('./lister');
var path = require('path');

var logFile = function(err, files){
  if(err){ 
    console.log(err);
  }else{
    files.forEach(function(file){
      console.log(file);
    });
  }
}

listFilter(process.argv[2], process.argv[3], logFile);