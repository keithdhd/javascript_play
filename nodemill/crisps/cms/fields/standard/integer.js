
exports.afterPost = function(value, options, callback) {
  callback(null, parseInt(value, 10));
}
