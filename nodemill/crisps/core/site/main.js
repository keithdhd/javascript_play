var router = require('express').Router(), siteHook;
try {
  siteHook = require(_root + '/site/hooks.js');
} catch(err) {
  // OK, no hooks file, siteHook is null
}

exports.router = router;

router.use(function(req, res, next) {
  res.locals.menu = _menu.site || {items:[]};
  res.locals.includes = _siteincludes;
  var path = (req.url || req.baseUrl || '').split('?')[0];
  if (path && path.substr(0,1) == '/') {
    path = path.substr(1);
  }

  // Set selected for menu items to highlight
  res.locals.menu.items.map(function(item){
    var itemPath=(item.route || 'XXX').split('/')[0], comparePath=(path || 'home').split('/')[0];
    item.selected = (itemPath == comparePath);
    if (item.subItems) {
      item.subItems.map(function(subItem){
        var subItemPath=(subItem.route || '').split('/')[0];
        subItem.selected = (subItemPath == comparePath);
        item.selected = item.selected || subItem.selected;
      });
    }
  });

  req.pathBits = path.split('/');
  res.locals.route = req.pathBits[0] || '';
  res.locals.siteopts = _siteopts;
  next();
});

if (siteHook && siteHook.requestHook) {
  router.use(siteHook.requestHook);
}

router.use(function(req, res, next) {
  if (_siteopts.siteEnabled) {
    var route = res.locals.route;
    if (!route && res.locals.menu && res.locals.menu.items) {
      route = _menu.site.items[0].route;
    }

    if (_sitePages[route]) {
      var exphbs  = require('express-handlebars');
      req.app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main', layoutsDir: _root + '/site/layouts/', partialsDir: _root + '/site/partials/'}));
      req.app.set('views', _root + '/site/pages');

      if (_sitePages[route].express) {
        _sitePages[route].express(req, res, next);
      } else {
        next();
      }

    } else {
      next();
    }
  } else if (_siteopts.cmsEnabled !== false && !req.params.page) {
    res.redirect(303, _siteopts.cmspath || '/cms/');
  } else {
    next();
  }
});
