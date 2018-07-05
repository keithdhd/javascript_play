
exports.preTableCell = function(value, record, options, callback) {
  value = value?'Yes':'';
  callback(null, value);
}



exports.afterPost = function(value, options, callback) {
  // HTML forms don't support boolean values for checkbox types, so we get a '1' or a '' - convert to true or false
  value = value?true:false;
  callback(null, value);
}

