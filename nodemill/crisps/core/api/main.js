var fs = require('fs'), crypto = require('crypto'), router = require('express').Router(), _ = require('underscore');
var auth = require(__dirname + '/auth'), apiHook;

try {
  apiHook = require(_root + '/api/hooks');
} catch (err) {
}

exports.router = router;


// 1. Authenticate, finally calling next() if authentication passed, otherwise issue a basic auth challenge (for browsers)
router.all('/*', function(req, res, next) { // See ./auth.js and /config/api.json
  auth.authenticate(req, function(err, authenticated) {
    if (err || !authenticated) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="' + (_siteopts.name || 'Nodemill') + '"');
      res.json({headers: {code: 401, message: 'Unauthorised access'}});
    } else {
      var path = (req.url || req.baseUrl || '').split('?')[0];
      if (path && path.substr(0,1) == '/') {
        path = path.substr(1);
      }
      req.pathBits = path.split('/');
      next();
    }
  });
});

// 1a. Run any custom hooks
if (apiHook && apiHook.requestHook) {
  router.all('/*', apiHook.requestHook);
}

// 2. Check for versioned APIs like /v2/data
router.all('(/:version)(/:apiname)(/:id)?', function(req, res, next) {
  var apiname = req.params.version + '/' + req.params.apiname;
  if (_apis[apiname] && !_apis[apiname].private) {
    runAPI(_apis[apiname], req, res, req.params.id)
  } else {
    next();
  }
});

// 3. Check for normal APIs like /data
router.all('(/:apiname)?(/:id)?(/*)?', function(req, res, next) {
  var apiname = req.params.apiname;
  if (_apis[apiname] && !_apis[apiname].private) {
    runAPI(_apis[apiname], req, res, req.params.id);
  } else {
    if (apiname) {
      res.json({headers: {code: 404, message: 'unknown api', api: apiname}});
    } else {
      res.json({headers: {code: 404, message: 'missing api endpoint'}});
    }
  }
});

function runAPI(apiLib, req, res, id) {
  // If the api plugin has an express(id,res,req) function then use that.  Only applies where non-json output is required or you want to set cookies etc with res
  if (apiLib.express) {
    return apiLib.express(id, req, res);
  }

  // Otherwise run the api
  var sendResponse = function(err, headers, data) {
    if (!res.headerSent) {  // detect that response hasn't been sent by API
      var out = {headers: headers};
      if (data) {
        out.data = data;
        out.md5 = md5(JSON.stringify(data));
      }
      if (params.md5 && params.md5 == out.md5) {
        out.headers.code = 204;
        out.headers.message = 'No Change';
        delete out.data;
        delete out.md5;
      }
      res.json(out);
    }
  };

  var params = _.extend(req.query, req.body);
  var path = req.url || req.baseUrl;
  if (path && path.substr(0,1) == '/') {
    path = path.substr(1);
  }
  params._path = path.split('/');
  switch (apiLib.api.length) {
    case 4:
      apiLib.api(id, params, req, sendResponse);
      break;
    case 5:
      apiLib.api(id, params, req, res, sendResponse);
      break;
    default:
      apiLib.api(id, params, sendResponse);
  }
}



function md5(what) {
  return crypto.createHash('md5').update(what).digest('hex').substr(0,6);
}
