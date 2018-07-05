var nodemailer = require('nodemailer');

var server = _getKey('SMTP', 'server');
var login = _getKey('SMTP', 'login');
var password = _getKey('SMTP', 'password');

var transporter = nodemailer.createTransport('smtp://' + login + ':' + password + '@' + server);


exports.send=function(obj, callback) {
  if (server) {
    transporter.sendMail(obj, callback);
  } else {
    console.log('Unable to send mail without SMTP server set up');
    callback('No SMTP credentials');
  }
};

// see https://www.npmjs.com/package/nodemailer for options
// sign up for free account at smtp2go.com


/*
_mail.send({from: fromAddr, to: toAddr, subject: 'Hi', text: 'Hello'}, function(err, res){
  console.log('Mail: ' + res);
});
*/
