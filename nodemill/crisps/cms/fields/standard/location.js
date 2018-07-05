
exports.preDisplay = function(value, record, options, callback) {
  options.googleMapKey = _getKey('CMS', 'googleMapKey');
  callback(null, value, options);
}
