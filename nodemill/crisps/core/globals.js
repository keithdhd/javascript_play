var fs = require('fs'), _ = require('underscore'), path=require('path');


/**
 * @method loadConfigs
 * Loads a bunch of stuff into memory to save constant reloading
 *
 *
 */
exports.loadConfigs = function() {
  global._root = path.resolve(__dirname + '/..');
  global._private = path.resolve(__dirname + '/../private');
  global._public = path.resolve(__dirname + '/../public');

  global._siteopts = tryLoad('config.json');
  if (!_siteopts.name) global._siteopts = tryLoad('site.json');
  global._menu = require(_root + '/config/menu.json');
  global._dataPath = global._root + (_siteopts.datapath || '/private/data');

  global._api = tryLoad('api.json', 'missing config/api.json - you might want to add one for authentication');
  global._keys = tryLoad('keys.json');
  global._whitelist = tryLoad('whitelist.json');
  global._getKey = getKey;
  global._runAPI = runAPI;
  global._array2object=array2object;
  global._helpers = require('hbs_helpers').helpers;

  if (!_siteopts.salt) {
    _siteopts.salt = require('crypto').createHash('md5').update(new Date().getTime() + '').digest('hex');
    require('fs').writeFileSync(_root + '/config/config.json', JSON.stringify(_siteopts, null, 2));
  }
  global._cmsPages = loadLibs(_root + '/cms');
  global._sitePages = loadLibs(_root + '/site/pages', true);
  global._fieldJS = loadLibs(_root + '/cms/fields', true);
  global._fieldHBS = loadHBSs(_root + '/cms/fields', true);
  global._apis = loadAPIs(_root + '/api');
  global._db = require('nm_' + ((_siteopts.db || {}).type || "nedb")); //Mongo or nedb
  global._mail = require('mailer');

  // Global._includes=getIncludes([__dirname + '/public', _root+ '/public']);
  global._cmsincludes = getIncludes([_root + '/public/cmsincludes'], '/public/cmsincludes/');
  if (!global._cmsincludes.css.length) {
    global._cmsincludes = getIncludes([_root + '/public/cms'], '/public/cms/');
  }

  // getFieldIncludes - adds includes located in the field folders and adds them to _cmsincludes
  getFieldIncludes(global._cmsincludes, _root + '/cms/fields');
  global._siteincludes = getIncludes([_root + '/public/site'], '/public/site/');

  require('myglobals').loadConfigs();  // Custom stuff on top
}

var runAPI=function(apiname, id, params, callback) {
  if (_apis[apiname]) return _apis[apiname].api(id, params, callback);
  callback('invalid API');
};

var getKey = function(api, key) {
  if (_keys[api] && _keys[api][key] != undefined) {
    return _keys[api][key];
  }
  if (!_keys[api]) {
    _keys[api] = {};
  }
  _keys[api][key] = '';

  fs.writeFileSync(_root + '/config/keys.json', JSON.stringify(_keys, null, 2));
  return '';
}

/**
 * @method getHooks Requires any hooks libraries that we will need later - by loading ALL files from the /hooks folder and combining them (_.extend) into a single object
 * @param {String} folder where to look - /hooks
 */
function getHooks(folder) {
  var hooks={};
  var files = safeReadDir(folder);
  for (var i in files) {
    if (path.extname(files[i])=='.js') {
      _.extend(hooks, require(folder + '/' + files[i]));
    }
  }
  return hooks;
}

function tryLoad(configFile, errorMess) {
  try {
    return require(_root + '/config/' + configFile);
  } catch (err) {
    if (err.code == 'MODULE_NOT_FOUND') {
      if (errorMess) {
        console.log(errorMess);
      }
    } else {
      console.log(err);
    }
    return {};
  }
}

function array2object(array) {
  if (Array.isArray(array)) {
    var out={};
    array.forEach(function(item){
      out[item._id] = item;
    });
    return out;
  }
  return array;
}

function getIncludes(folders, prefix) {
  var out = {js: [], css: [], jsmin: [], cssmin: []};
  for (var filetype in out) {
    for (var i in folders) {
      var files = safeReadDir(folders[i] + '/' + filetype);
      // Include the prefix and filetype to produce eg: /cms/js/jquery.js
      if (files) {
        files = files.map(function(item) {
          return prefix + filetype + '/' + item;
        });
        // Only include those with the correct ext
        files = files.filter(function(item) {
          var ext = '.' + filetype.replace('min', '');
          return (path.extname(item) == ext);
        });
        out[filetype] = _.union(out[filetype], files);
      }
    }
  }
  return {js: out.jsmin.length ? out.jsmin : out.js, css: out.cssmin.length ? out.cssmin : out.css};
}


// GetFieldIncludes - look through all field folders for any css/js files in the includes folder
function getFieldIncludes(includeObject, folder) {
  var out = {js: [], css: []};
  var fieldFolders = safeReadDir(folder);
  fieldFolders.forEach(function(item) {
    var files = safeReadDir(folder + '/' + item + '/includes');
    files.forEach(function(file) {
      for (var ftype in out) {
        if (file.substr(file.length - ftype.length, ftype.length + 1) == ftype) {
          includeObject[ftype].push('cms_field/' + item + '/' + file);
        }
      }
    });
  });
}

/**
 * @method loadLibs Requires any libraries that we will need later - currently CMS pages, field controllers and APIs
 * @param {String} folder where to look
 * @param {Boolean} subFolders - if true then look for index.js in any subfolders (see /api structure)
 */
function loadLibs(folder, subFolders) {
  var out = {}
  var files = [];
  try {
    files = fs.readdirSync(folder);
  } catch (err) {

  }
  for (var i in files) {
    var libName = getValidLibName(files[i], '.js');
    if (libName) {
      out[libName] = require(folder + '/' + libName);
    }
    if (subFolders && fs.lstatSync(folder + '/' + files[i]).isDirectory()) {
      var subfiles = fs.readdirSync(folder + '/' + files[i]);
      if (subfiles) {
        for (var j in subfiles) {
          try {
            var sublibName = getValidLibName(subfiles[j], '.js');
            if (sublibName) {
              out[sublibName] = require(folder + '/' + files[i] + '/' + sublibName);
            }
          } catch (err) {
            console.log('Error loading library ' + folder + '/' + files[i] + '/' + subfiles[j] + ': ' + err)
          }
        }
      }
    }
  }
  return out;
}

function getValidLibName(fname, ext) {
  var startPath = fname.substr(0, fname.length - ext.length)
  var ext2 = fname.substr(fname.length - ext.length, ext.length);
  if (ext2 == ext) {
    return startPath;
  }
  return false;
}

/**
 * @method loadAPIs Requires any API libraries that we will need later
 * @param {String} folder where to look, under here we expect subfolders with index.js in it
 */
function loadAPIs(folder) {
  var out = {};
  var folders = fs.readdirSync(folder);
  for (var i in folders) {
    var contents=getLibrary(folder + '/' + folders[i]);
    if (contents.api) {
      out[folders[i]] = require(folder + '/' + folders[i] + '/index');
    } else if (contents.subfolders) {
      var subfolders = fs.readdirSync(folder + '/' + folders[i]);
      for (var j in subfolders) {
        contents=getLibrary(folder + '/' + folders[i] + '/' + subfolders[j]);
        if (contents.api) {
          out[folders[i] + '/' + subfolders[j]] = require(folder + '/' + folders[i] + '/' + subfolders[j] + '/index');
        }
      }
    }
  }
  return out;
}

/**
 * @method getLibrary returns info on a folder - whether it is an api folder (has an index.js) or has subfolder
 * @param {String} folder where to look (eg resorts, hotels, v1, v2)
 */
function getLibrary(folder) {
  var out={};
  try {
    var contents = fs.readdirSync(folder);
    for (var i in contents) {
      var fileStats=fs.statSync(folder + '/' + contents[i]);
      if (fileStats.isDirectory()) {
        out.subfolders= true;
      }
      if (contents[i] == 'index.js') {
        out.api = true;
      }
    }
  } catch(err) {

  }
  return out;
}

/**
 * @method loadHBSs preload all the HBS template files for the CMS fields, saves reading them at runtime
 * @param {String} folder where to look
 * @return an object with each of the hbs filenames as keys and the contents as values
 */
function loadHBSs(folder, subFolders) {
  var out = {};
  var files = fs.readdirSync(folder);
  for (var i in files) {
    var libName = getValidLibName(files[i], '.hbs');
    if (libName) {
      out[libName] = fs.readFileSync(folder + '/' + files[i], {encoding: 'utf8'});
    }
    if (subFolders) {
      try {
        var subfiles = fs.readdirSync(folder + '/' + files[i]);
        if (subfiles) {
          for (var j in subfiles) {
            var sublibName = getValidLibName(subfiles[j], '.hbs');
            if (sublibName) {
              out[sublibName] = fs.readFileSync(folder + '/' + files[i] + '/' + subfiles[j], {encoding: 'utf8'});
            }
          }
        }
      } catch (err) {

      }
    }
  }
  return out;
}

function safeReadDir(dir) {
  var files = [];
  try {
    var files = fs.readdirSync(dir);
  } catch (err) {

  }
  return files;
}
