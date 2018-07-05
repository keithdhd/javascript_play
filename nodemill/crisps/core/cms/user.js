var _ = require('underscore'), menuLib = require('./menu'), jwt = require('jsonwebtoken'), security = require('security'), moment = require('moment');

/**
 * @method checkUser validate the jwt cookie and go next() if we have a good user
 * We also set up the menu for this user level
 */
exports.checkUser = function(req, res, next) {
  var paths = req.path.split('/').filter(function(e) {return e;});
  var route = paths[0];
  jwt.verify(req.cookies.token, _siteopts.salt, function(err, user) {
    if (user) {
      var ip = ipAddress(req);
      var expiryTime = moment.unix(user.exp);
      var now = moment();
      if (expiryTime.isBefore(now)) {
        req.session.message = {message: 'Your login has expired.', type: 'info'};
        res.clearCookie('token');
        res.redirect(303, (_siteopts.cmspath || '/') + 'login');
      } else if (!_siteopts.allowIPChange && ip && ip != user.ip) {
        req.session.message = {message: 'Your IP address has changed, you have been logged out.', type: 'info'};
        res.clearCookie('token');
        res.redirect(303, (_siteopts.cmspath || '/') + 'login');
      } else {
        res.locals.menu = menuLib.getMenu(user, decodeURI(route), decodeURI(paths.join('/')));

        if (route && !res.locals.menu.validRoute) {  //If user doesn't have permissions
          return res.render('error', {title: 'Invalid page - 404', errormessage: 'Unable to find the page that you have requested: ' + route});
        }

        _db.findOne('users', {_id: user.id}, function(err, record){
          if (record) {
            req.user=record;
            delete req.user.password;
            res.user=req.user;  // for backward compatibility
          }
          next();
        })
      }
    } else {
      res.redirect(303, (_siteopts.cmspath || '/') + 'login');
    }
  });
};

exports.logout = function(req, res, next) {
  res.clearCookie('token');
  res.redirect(303, (_siteopts.cmspath || '/') + 'login');
};

/**
 * @method loginPage Display the login page.  If no users (or one temp one) then add a temp user to allow login
 */
exports.loginPage = function(req, res, next) {
  _db.find('users', {}, function(err, users) {  // Add temp user if none exist
    var message = null;
    if (users.length <= 0 || (users.length == 1 && users[0].login == 'tempuser')) {
      var pw = security.hash(new Date().getTime() + '').substr(0, 8); //generate random pw
      message = {type: 'warning', message: 'There are no users to log in with so an admin user has been created with usersname <b>tempuser</b> and password <b>' + pw
                                          + '</b>.<br><br>Log in with this user, create your own user and delete this one.',};
      var hashedPW=security.hash(pw);
      _db.upsert('users', {login: 'tempuser', realname: 'System setup',level: 'admin',password: hashedPW}, users.length?1:null, function() {});
    }

    if (req.session.message) {
      message = req.session.message;
      delete req.session.message;
    }

    res.render('login', {background: 'back.jpg', menu: menuLib.getMenu(false, 'login'), message: message, pageTitle: _siteopts.name || 'Login'});
  });
};

/**
 * @method tryLogin called from login page on post
 * If success then we set JWT cookie with user ID, realname and level and then redirect to the first cms page
 */
exports.tryLogin = function(req, res, next) {
  _db.findOne('users', {login: req.body.login}, function(err, user) {   // 1. find a user by login (compare pw in next step)
    if (user && !user.password && !req.body.loginpassword) {
      checkedLogin(null, true);
    } else {
      var loggedIn = security.validate(req.body.loginpassword, user?user.password:'xxx');
      checkedLogin(null, loggedIn);
    }

    function checkedLogin(err, validPW) {  // 2. Compare pw
      if (validPW === true) {
        var ip = ipAddress(req);
        var tokenData = {id: user._id, realname: user.realname, level: user.level};
        if (ip) {
          tokenData.ip = ip;
        }
        var token = jwt.sign(tokenData, _siteopts.salt, {expiresIn: req.body.remember ? '7d' : '1d'});
        res.cookie('token', token, req.body.remember?{maxAge: 7 * 24 * 3600 * 1000}:null);  // 3. set JWT cookie, save for one week if remember box is ticked
        //  var menu = menuLib.getMenu(user, 'login');
        res.redirect(303, _siteopts.cmspath);   // Loggedin, go to first page
      } else {
        res.render('login', _.extend(req.body, {background: 'back.jpg', menu: menuLib.getMenu(false, 'login'), message: {message: 'Invalid login details', type: 'danger'}}));
      }
    }
  });
};

function ipAddress(req) {
  var ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress || req.socket.remoteAddress || (req.connection && req.connection.socket ? req.connection.socket.remoteAddress : '');
  return ip;
}
