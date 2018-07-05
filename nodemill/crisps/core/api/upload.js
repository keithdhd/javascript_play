var fs = require('fs');

exports.upload = function(req, res, next) {
  if (_apis[req.params.api].upload) {
    _apis[req.params.api].upload(req, res);
  } else {  // No API, remove files
    req.files.forEach(function(item) {
      fs.unlink(item.path);
    });
    next();
  }
};
