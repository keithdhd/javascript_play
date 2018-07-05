var security = require('security');

exports.authenticate = function(req, callback) {
  var pathBits = (req.path || '').split('/');
  var apiname1 = pathBits[0], apiname2 = pathBits[1];
  var authType = _api.auth?(_api.auth.type || ''):'';

  if (_api.auth && _api.auth.exceptions && ((_api.auth.exceptions.indexOf(apiname1) >= 0) || (_api.auth.exceptions.indexOf(apiname2) >= 0))) {
    return callback(null, true);
  }

  switch (authType) {
    case 'basic': {
      basicAuth(req, function(err, user) {
        if (err) {
          callback(err);
        } else {
          req.authUser = user;
          callback(null, true);
        }
      });
      break;
    }

    case 'sharedkey': {
      var auth = req.get('Auth') || req.query.auth || req.body.auth;
      var authenticated=(auth == _api.auth.key);
      callback(!authenticated, authenticated);
      break;
    }

    default: {
      callback(null, true);
    }

  }
};




function basicAuth(req, callback) {
  var b64auth = (req.get('Authorization') || '').split(' ')[1] || '';
  var bits = new Buffer(b64auth, 'base64').toString().split(':');
  var login = bits[0] || '';
  var password = bits[1] || '';


  // Test for valid login - compare against list of logins from /config/api.json or from user table
  var validLogin = false;
  if (_api.auth.logins) {  // Use logins from api.json
    for (var i in _api.auth.logins) {
      var compare = _api.auth.logins[i];
      if (compare.login == login && compare.password == password) {
        validLogin = login;
      }
    }

    if (validLogin) {
      callback(null, validLogin);
    } else {
      callback('Invalid basic auth headers');
    }
  } else {  // Compare against existing users
    _db.findOne('users', {login: login}, function(err, record) {
      if (record && security.validate(password, record.password)) {
        validLogin = true;
      }
      if (validLogin) {
        delete record.password;
        callback(null, record);
      } else {
        callback('Invalid basic auth headers');
      }
    });
  }
}
