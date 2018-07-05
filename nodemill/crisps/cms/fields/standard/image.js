var fs = require('fs'), path = require('path'), async = require('async');


exports.upload = function(req, res) {
  var saveFolder = _root + '/public/images/';
  fs.mkdir(saveFolder, function(err) {});

  if (req.files[0]) {
    var ext = req.body.ext || path.extname(req.files[0].originalname).substr(1);
    if (ext != 'jpg' && ext != 'png') {
      ext = 'jpg';
    }
    var filename = require('crypto').createHash('md5').update(new Date().getTime() + '').digest('hex').substr(0,8) + '.' + ext;

    if (req.body.width && req.body.height) {
      var w = req.body.width || 400;
      var h = req.body.height || 200;
      var exec = require('child_process').exec;
      var command = 'convert "' + path.resolve(req.files[0].path) + '" -resize ' + w + 'x' + h + '^ -gravity Center -crop ' + w + 'x' + h + '+0+0 +repage "';
      command += path.resolve(saveFolder + filename) + '"';
      exec(command, function(error, stdout, stderr) {

        var out = {filename: filename};
        if (error) {
          out.error = 'Unable to resize image (probably no ImageMagick), so left it at original dimensions.';
          fs.rename(req.files[0].path, saveFolder + filename, function(error) {
            deleteFiles(req);
          });
        } else {
          deleteFiles(req);
        }
        res.send(JSON.stringify(out));
      });
    } else {
      fs.rename(req.files[0].path, saveFolder + filename, function(error) {
        var out = error?{error: error}:{filename: filename};
        deleteFiles(req);
        res.send(JSON.stringify(out));
      });
    }
  } else {
    res.send(JSON.stringify({error: 'No file upload'}));
  }
}

function deleteFiles(req) {
  for (var i in req.files) {
    fs.unlink(req.files[i].path, function(err) {});
  }
}

exports.preTableCell = function(value, record, options, callback) {
  if (value) {
    value = '<img src="images/' + value + '" height=32> ' + value;
  }
  callback(null, value, options);
}
/*
exports.preDisplay=function(value, record, options, callback) {
  callback(null, value, options);
}

exports.afterPost=function(value, options, callback) {
  value=value.trim();
  callback(null, value);
}
*/
