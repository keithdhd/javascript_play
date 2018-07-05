var security = require('security');  // Takes care of hashing/verifying pw - see core/libs/security or libs/security



// Before displaying a password, make it blank (otherwise the hash is displayed and it looks far too long)
exports.preDisplay = function(value, record, options, callback) {
  value = '';
  callback(null, value, options);
};

// After posting we want to hash the pw.
// If it remains blank then callback with error so it doesn;t get posted
exports.afterPost = function(value, options, callback) {
  if (value) {
    var hash = security.hash(value);
    callback(null, hash);
  } else {
    callback('unchanged password');
  }
};
