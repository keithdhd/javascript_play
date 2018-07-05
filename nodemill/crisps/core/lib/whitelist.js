var async=require('async'), dns=require('dns');


/*
Whitelist - apply a filter to CMS users.

This is an extra security measure to ensure that only valid users can even reach the CMS.
It only applies to the login page.

How to use:
===========

Simply add a file called /config/whitelist.json and poplulate it with ip addresses and/or (d)dns addresses - eg:

{
  "cms": [
    "127.0.0.1",
    "::1",
    "my.ddns.address.com"
  ]
}

Then users not on the whitelist will see a blank page



*/


exports.filter=function(list, req, res, next) {  // called from core/cms/main.js whenever logging in
  var isGood = false;
  var ip = ipAddress(req);  // IP Address of user

  async.forEach(list, function checkWhiteListItem(listItem, callback){
    // is it an ip address format (or ::1 - the same as 127.0.0.1)
    var isIP = (listItem == '::1') || /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(listItem);
    if (isIP) {
      if (listItem == ip) {
        isGood = true;
      }
      callback();
    } else {
      dns.lookup(listItem, function(err, address, family){
        if (address == ip) {
          isGood = true;
        }
        callback();
      });
    }
  }, function allDone(err){
    if (err || !isGood) {
      console.log(err ? 'Whitelist error: ' + err : 'CMS Request denied for ip ' + ip);
      res.send('');
    } else {
      next();
    }
  });
}

function ipAddress(req) {
  var ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress || req.connection.remoteAddress || (req.connection && req.connection.socket ? req.connection.socket.remoteAddress : '');
  if (ip.indexOf('.') >=0 && ip.indexOf(':') >= 0) {
    ip = ip.substr(ip.lastIndexOf(':') + 1);
  }
  return ip;
}
