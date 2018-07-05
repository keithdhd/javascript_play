var menuData = require(__dirname + '/../../config/menu.json'), _ = require('underscore');


exports.getMenu = function(user, currentRoute, totalRoute) {
  var menu = {items: [{title: 'Log in', route: 'login'}], rightItems: [], routePrefix: _siteopts.cmspath || '', validRoute: false};
  if (user) {
    menu = {items: [], rightItems: [], name: user.realname, firstRoute: '', currentRoute: currentRoute, currentPageTitle: '', routePrefix: _siteopts.cmspath || ''};
    menuData.cms.items.map(function(item) {
      if ((!item.users) || (item.users.indexOf(user.level) >= 0) || (item.users.indexOf(parseInt(user.level,10)) >= 0)) {
        var thisItem=_.clone(item);
        delete thisItem.users;
        menu.items.push(thisItem);
      }
    });
    if (menuData.cms.rightItems) {
      menuData.cms.rightItems.map(function(item) {
        if ((!item.users) || (item.users.indexOf(user.level) >= 0) || (item.users.indexOf(parseInt(user.level,10)) >= 0)) {
          var thisItem=_.clone(item);
          delete thisItem.users;
          menu.rightItems.push(thisItem);
        }
      });
    }
    menu.rightItems.push({title: 'Log out', route: 'logout', prefix: _siteopts.cmspath || ''});
  }

  // Now find selected item for active CSS
  menu.items.map(function(item) {
    item.selected = (item.route == currentRoute) || (item.route == totalRoute);
    if (item.route) {
      item.prefix = (_siteopts.cmspath || '');
      if (item.selected) {
        menu.currentPageTitle = item.title;
      }
      if (!menu.homeRoute) {
        menu.homeRoute = item.prefix + item.route;
      }
    }

    if (item.subItems) {
      item.subItems.map(function(subitem) {
        if (subitem.route) {
          subitem.prefix = (_siteopts.cmspath || '');
          subitem.selected = (subitem.route == currentRoute) || (subitem.route == totalRoute);
          if (subitem.selected) {
            menu.currentPageTitle = subitem.title;
            item.selected = true;
          }
          if (!menu.homeRoute) {
            menu.homeRoute = subitem.prefix + subitem.route;
          }
        }
      });
    }
  });

  if (!currentRoute) {
    menu.validRoute=true;
  }
  var allowableMenus=menu.items.concat(menu.rightItems);
  for (var i in allowableMenus) {
    if ((allowableMenus[i].route == currentRoute) || (allowableMenus[i].route == totalRoute)) {
      menu.validRoute=true;
    }
    if (allowableMenus[i].subItems) {
      for (var j in allowableMenus[i].subItems) {
        if (allowableMenus[i].subItems[j].route == currentRoute || (allowableMenus[i].subItems[j].route == totalRoute)) {
          menu.validRoute=true;
        }
      }
    }
  }

  menu.sitename = _siteopts.name || 'Nodemill';
  return menu;
};
