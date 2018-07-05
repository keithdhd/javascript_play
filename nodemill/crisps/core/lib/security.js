var crypto = require('crypto');

/*
Security library
- feel free to replace this in ./lib/security (not ./core/lib/security - yours will take priority)
- export a hash and validate function - needs to be syncronous
*/

exports.hash = function(what) {
  var salt = makeHash(new Date().getTime() + '').substr(0,12);
  var hash = makeHash(salt + what);
  return salt + hash;
};

exports.validate=function(pw, fullhash) {
  var salt = fullhash.substr(0,12);  // one salt is included in the saved pw hash as 1st 12 chars - ensures unique hash for same pw

  //Legacy
  var hashpart = crypto.createHash('md5').update(salt + pw).digest('hex');
  var validLegacy = (hashpart == fullhash.substr(12));

  var hashpart = makeHash(salt + pw);  // New improved uses sha256
  var valid = (hashpart == fullhash.substr(12));

  return validLegacy || valid;
};


function makeHash(what) {
  return crypto.createHash('sha256').update(what + _siteopts.salt).digest('hex');
}
