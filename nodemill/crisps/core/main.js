exports.startApp = function() {
  require('app-module-path').addPath(__dirname + '/../lib');  // add ./lib to module path - this will take priority over core files
  require('app-module-path').addPath(__dirname + '/lib'); // add ./core/lib to module path
  require('app-module-path').addPath(__dirname + '/db'); // add ./core/db to module path

  var express = require('express');
  require('./globals').loadConfigs();  // Pre-loading any pages and api libraries rather than searching for them at runtime

  var app = express();
  app.set('port', _siteopts.port || 3000);
  app.disable('x-powered-by');

  // Handlebars engine:
  var exphbs  = require('express-handlebars');
  app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main', layoutsDir: __dirname + '/../views/layouts/', partialsDir: __dirname + '/../views/partials/'}));
  app.set('view engine', '.hbs');
  app.set('views', __dirname + '/../views');

  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var hooks;
  try {
    hooks = require(_root + '/hooks.js');
    if (hooks.appHook){
      hooks.appHook(app);
    }
  } catch(err) { }

  // Multer for file uploads
  var multer = require('multer');
  var fileUpload = multer({ dest: __dirname + '/../private/uploads/' })

  // Cookies and session.  CMS user details are stored in JWT token, please see /core/cms/user for implementation
  app.use(require('cookie-parser')(_siteopts.salt));
  app.use(require('express-session')({ secret: _siteopts.salt, resave: true, saveUninitialized: true}))

  if (hooks && hooks.requestHook){
    app.use('/*', hooks.requestHook);
  }

  // Statics, use built-in folder (core/public) merged with /public
  app.use(express.static('public')); // depreciated

  // Now using public in front of all static content
  app.use('/public/', express.static('public'));
  app.use('/public/', send404);


  // Check for blurred version of background
  require('fs').stat(_public + '/img/back2.jpg', function(err, stats){
    if (err && err.code=='ENOENT') {
      var exec = require('child_process').exec;
      exec('convert "' + _public + '/img/back.jpg" -blur 0x15 "' + _public + '/img/back2.jpg"', function (error, stdout, stderr) { });
    }
  });

  // API, see /core/api/main
  app.post('/api/:api/upload', fileUpload.any(), require('./api/upload').upload);
  app.use('/api', require('./api/main').router);


  // CMS
  if (_siteopts.cmsEnabled !== false) {
    // Uploads, your field type must support uploads
    app.post('/upload/:fieldtype', fileUpload.any(), require('./cms/upload').upload);

    app.get('/cms_field/:field/:file', function(req, res) {  // Field includes
      res.sendFile(_root + '/cms/fields/' + req.params.field + '/includes/' + req.params.file);
    });
    app.use(_siteopts.cmspath || '/', require('./cms/main').router);
  }

  // If we have a regular site use that
  app.use('/', require('./site/main').router);

  app.use(send404);


  if (_siteopts.sslKey) {
    var options = {
      key: fs.readFileSync(_siteopts.sslKey),
      cert: fs.readFileSync(_siteopts.sslCert),
      ca: [ fs.readFileSync(_siteopts.sslCA)]
    };
    var https = require('https');
    https.createServer(options, app).listen(app.get('port'));
    console.log('Server started on https://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  } else {
    app.listen(app.get('port'), function() {
      console.log('Server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
    }).on('error', function(err){
      console.log('Unable to start server on port ' + app.get('port'));
      console.log(err);
    });
  }
}

function send404(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
}
