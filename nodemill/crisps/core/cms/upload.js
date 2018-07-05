var fs = require('fs');

exports.upload = function(req, res, next) {
  if (_fieldJS[req.params.fieldtype] && _fieldJS[req.params.fieldtype].upload) {
    _fieldJS[req.params.fieldtype].upload(req, res);
  } else if (_cmsPages[req.params.fieldtype] && _cmsPages[req.params.fieldtype].upload) {
    _cmsPages[req.params.fieldtype].upload(req, res);
  }  else {
    req.files.forEach(function(item) {
      fs.unlink(item.path);
    });
    next();
  }
};
