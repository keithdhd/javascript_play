var fs   = require('fs');
var path = require('path');

function listFilter(dir, ext, callback){

  fs.readdir(dir, function(err, list){
    if(err){ 
      callback(err, null); // early return 
    }else{
      var files = [];
      list.forEach(function(file){
        if(path.extname(file).substring(1) === ext)
          files.push(file);
      })
    callback(null, files); 
    }
  });
} 

module.exports = listFilter;