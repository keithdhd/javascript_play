
exports.preTableCell = function(value, record, options, callback) {
  if (options.data[value]) {
    value = options.data[value];
  }
  callback(null, value);
}

/*
exports.preDisplay = function(value, record, options, callback) {
  callback(null, value, options);
}

exports.afterPost = function(value, options, callback) {
  callback(null, value);
}

*/
