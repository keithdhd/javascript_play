var fs = require('fs'), router = require('express').Router(), userProcs = require('./user'), async = require('async'), _ = require('underscore'), cmsHook;
try {
  cmsHook = require(_root + '/cms/hooks.js');
} catch(err) { }

exports.router = router;

// Add config.json to res.locals - makes it available in templates
router.use(function(req, res, next) {
  var exphbs  = require('express-handlebars');
  req.app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main', layoutsDir: _root + '/cms/views/layouts/', partialsDir: _root + '/cms/views/partials/'}));
  req.app.set('views', _root + '/cms/views');

  res.locals.includes = _cmsincludes;
  res.locals.siteopts = _siteopts;
  next();
});

router.use('/logout', userProcs.logout);

if (_whitelist.cms && _whitelist.cms.length) {
  var whitelist=require('whitelist');
  router.all('/login', function(req, res, next) {
    whitelist.filter(_whitelist.cms, req, res, next);
  });
}
router.get('/login', userProcs.loginPage);
router.post('/login', userProcs.tryLogin);

router.use(userProcs.checkUser);  // Won't call next if logged out


if (cmsHook && cmsHook.requestHook) {
  router.all('/*', cmsHook.requestHook);
}

router.all('(/:page)?(/:id)?(/*)?', function(req, res, next){
  if (_cmsPages[req.params.page] && _cmsPages[req.params.page].getPage) {
    _cmsPages[req.params.page].getPage(function(err, pageOpts) {
      req.pageOpts = pageOpts;
      next();
    }, req, res);
  } else {
    next();
  }
});


// Post record
router.post('/:page', function(req, res, next) {
  var tableName = '';

  if (req.body.isAction || req.body.partialName) {
    if (req.pageOpts) {
      var options = req.pageOpts;
      var thisAction;
      if (req.body.isAction) {
        thisAction = options.actions[req.body.actionIndex];
      } else if (req.body.partialName) {
        thisAction = options.above;
      }
      if (thisAction && thisAction.callback) {
        var messFunc=function(err, message) {
          req.session.message = {message: message, type: 'info'};
          res.redirect(303, req.params.page);
        };
        switch (thisAction.callback.length) {  // What kind of callback do we call
          case 1:
            thisAction.callback(messFunc);
            break;
          case 2:
            thisAction.callback(req, messFunc);
            break
          default:
            thisAction.callback(req, res, messFunc);
        }
      } else {
        req.session.message = {message: 'Please add an action callback', type: 'info'};
        res.redirect(303, req.params.page);
      }
    } else {
      console.log('Unable to load CMS page ' + req.params.page + '.js');
      res.redirect(303, req.params.page);
    }
  } else if (req.body._nodemill) {
    async.waterfall([
      function loadPageLibFile(callback) {   // 1. load page options from cms user page file (eg cities.js)
        if (req.pageOpts) {
          callback(null, req.pageOpts);
        } else {
          callback('Unable to load CMS page ' + req.params.page + '.js');
        }
      },
      function readData(opts, callback) {  // 2. create record by merging html post with field names
        tableName = opts.tableName;
        var fields = opts.fields;
        var record = {};

        // Convert names with . into objects
        var postData = req.body;
        function addDepthField(root, fieldArray, value) {
          if (!root) {
            root = {};
          }
          fieldArray.splice(0,1);
          var fname = fieldArray[0];
          if (fieldArray.length > 1) {
            root[fname] = addDepthField(root[fname], fieldArray, value);
          } else {
            root[fname] = value;
          }
          return root;
        }

        for (var f in postData) {
          if (f.indexOf('.') >= 0) {
            var fBits = f.split('.');
            var objKey=fBits[0];
            var value=postData[f];
            if (Array.isArray(value)) {
              if (!postData[objKey]) {
                postData[objKey]=[];
              }
              for (var i in value) {
                if (!postData[objKey][i]) {
                  postData[objKey][i]={};
                }
                fBits = f.split('.');
                postData[objKey][i]=addDepthField(postData[objKey][i], fBits, value[i]);
              }
            } else {
              postData[objKey] = addDepthField(postData[objKey], fBits,value);
            }
            delete postData[f];
          }
        }

        // Trim any array fields so we don't include empties
        for (var i in postData) {
          if (postData[i] && Array.isArray(postData[i]) && postData[i].length) {  // Remove any blanks
            postData[i]=postData[i].filter(function(item){
              var isOK = false;
              if (typeof item == 'object') {  //loop through and check that there is *some* data
                for (var k in item) if (item[k] !== '') isOK = true;
              } else {
                isOK = (item !== ''?true:false);
              }
              return isOK;
            });
          }
        }


        // Run through each field, populating the record
        async.forEachOf(fields, function(item, field, cb) {
          if (_fieldJS[item.type] && _fieldJS[item.type].afterPost) {  // After post callback to edit the data before going into db
            _fieldJS[item.type].afterPost(postData[field], item, function(err, val) {
              if (!err) {
                record[field] = val; // Err actually means don't post this field
                if (record[field] && item.array && !Array.isArray(record[field])) { // Convert to array if should be
                  record[field]=[record[field]];
                }
              }
              cb();
            });
          } else if (item.langs) {  // populate record for each lang
            item.langs.forEach(function(lang) {
              record[field + '_' + lang] = postData[field + '_' + lang];
            });
            cb();
          } else {
            record[field] = postData[field];
            if (record[field] && item.array && !Array.isArray(record[field])) {  // Convert to array if should be
              record[field]=[record[field]];
            }
            cb(); // Js file doesn't exist, carry on..
          }
        }, function checkForPageCallback(err) {
          if (err) {
            return callback(err);
          }
          if (opts.prePost) {
            opts.prePost(record, callback);
          } else {
            callback(null, record);
          }
        });
      },
      function sentToDB(record, callback) {
        delete req.body._nodemill;
        if (Array.isArray(req.body._id)){  // We have the original/new and the field
          record._id = req.body._id[1];
          req.body._id = req.body._id[0];
        }
        //_.defaults(record, req.body);  // Merge in any other fields, breaks with empty submissions so removed

        if (req.pageOpts.id) {  // Single record page, push _id
          record._id = req.pageOpts.id;
          _db.upsert(tableName, record, req.body._id, callback);
          req.session.message = {message: 'Your changes have been saved', type: 'success'};
        } else if (req.body._id == 'new') {
          delete req.body._id;
          _db.insert(tableName, record, callback);
        } else {
          _db.update(tableName, record, req.body._id, callback);
        }
      },
    ], function(err, posted) {
      if (err) {
        console.log('Error ' + err + ' in CMS post record');
        next();
      } else {
        req.session.lastId = posted._id || req.body._id;
        res.redirect(303, req.params.page);
      }
    });
  } else {
    next();
  }
});

// Check for valid CMS route
router.use('/:page', function(req, res, next) {
  if (!_cmsPages[req.params.page]) {
    if (!req.params.page) {
      res.redirect(303, res.locals.menu.homeRoute || 'login');
    } else {
      res.status(404).send('Unable to find route');
    }
  } else {
    next();
  }
});

// Check for express style page
router.use('/:page', function(req, res, next) {
  if (_cmsPages[req.params.page].express) {
    _cmsPages[req.params.page].express(req, res, next);
  } else {
    next();
  }
});

// Normal page - Edit
router.get('/:page/:id', function(req, res, next) {
  if (req.pageOpts) {
    var allow = (req.params.id == 'new') ? !req.pageOpts.noAdd : !req.pageOpts.noEdit;
    if (allow) {
      require('./edit').render(req, res, req.params.page, req.params.id, req.pageOpts);
    } else {
      next();
    }
  } else {
    next();
  }
});

// Normal page - table
router.all('/:page', function(req, res, next) {
  if (_cmsPages[req.params.page]) {
    if (req.pageOpts && req.pageOpts.id) {
      require('./edit').render(req, res, req.params.page, req.pageOpts.id, req.pageOpts);
    } else {
      require('./table').render(req, res, req.params.page, req.pageOpts);
    }
  } else {
    res.render('error', {title: 'Invalid page - 404', errormessage: 'Unable to find the page that you have requested: ' + req.params.page});
  }
});

router.use(function(req, res, next) {
  return res.redirect(303, res.locals.menu.homeRoute || 'login');
});
