var fs = require('fs'), request = require('request'), crypto = require('crypto'), moment=require('moment');

exports.ensureFolderExists=function(foldername, callback) {
  fs.stat(foldername, function(err, stat){  // check cache folder exists
    if (err && err.code == 'ENOENT') {
      fs.mkdir(foldername, function(err){
        if (callback) {
          callback(err, 1);
        }
      });
    } else if (callback) { // already exists
      callback(err, 0);
    }
  });
}


exports.getURL=function(url, params, cacheTime, callback) {
  if (typeof params != 'object') {  // Params is optional, it may be missing!
    callback = cacheTime;
    cacheTime = params;
  }

  if (cacheTime) {
    var cacheFolder = _private + '/cache';
    exports.ensureFolderExists(cacheFolder);
    var cacheFile = cacheFolder + '/' + crypto.createHash('md5').update(url).digest("hex") + '.txt';
    fs.stat(cacheFile, function(err, stats) {
      if (!err) {
        var minsOld = moment().diff(moment(stats.mtime),'minutes');
        if (minsOld <= cacheTime) {
          return fs.readFile(cacheFile, 'utf8', callback);  // use cache
        }
      }
      downloadFile(url, cacheFile);
    });
  } else {
    downloadFile(url);
  }

  function downloadFile(url, cacheFile) {
    function gotResponse(error, response, body) {
      if (error) {
        return callback(error);
      }
      if (cacheFile) {
        fs.writeFile(cacheFile, body, {encoding: 'utf8'}, function(fileerr) {
          callback(fileerr, body);
        });
      } else {
        callback(null, body);
      }
    }

    if (params.post) {
      request.post({url:url, formData: params.post}, gotResponse);
    } else {
      request(url, gotResponse);
    }
  }
}
