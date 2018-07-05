var nedb = require('nedb'), async = require('async'), fs = require('fs');
var db = {};

exports.find = function(tablename, find, callback) {
  var tbl = getTable(tablename);
  if (callback) {
    tbl.find(find, callback);
  } else {
    return tbl.find(find);
  }
}

exports.findOne = function(tablename, find, callback) {
  var tbl = getTable(tablename);
  tbl.findOne(find, callback);
}

exports.insert = function(tablename, obj, callback) {
  var tbl = getTable(tablename);
  tbl.find({}).sort({ _id: -1 }).exec(function(err, results) {
    if (!obj._id || obj._id == 'new') {
      obj._id = results.length?(parseInt(results[0]._id,10) || 0) + 1:1;
    }
    tbl.insert(obj, function(err, result) {
      tbl.persistence.compactDatafile(); // Optional
      if (callback) {
        callback(err, result);
      }
    });
  });
}

exports.update = function(tablename, obj, find, callback) {
  var tbl = getTable(tablename);
  if (typeof find !== "object") {  // Must be the _ID
    find = {$or:[{_id: parseInt(find,10)}, {_id: find}]};
  }
  delete obj._id;
  tbl.update(find, {$set: obj}, {multi: true}, function(err, result) {
    tbl.persistence.compactDatafile(); // Optional
    if (callback) {
      callback(err, result);
    }
  });
}

exports.upsert = function(tablename, obj, find, callback) {
  if (find === 'new' || !find) {
    return exports.insert(tablename, obj, callback);
  }
  if (typeof find !== "object") {  // Must be the _ID
    find = {$or:[{_id: parseInt(find,10)}, {_id: find}]};
  }
  exports.find(tablename, find, function(err, records){
    if (records.length) {
      delete obj._id;  //Can't update _id
      exports.update(tablename, obj, find, callback);
    } else {
      exports.insert(tablename, obj, callback);
    }
  });
}

exports.remove = function(tablename, find, callback) {
  var tbl = getTable(tablename);
  tbl.remove(find, {multi: true}, callback);
}

exports.count =function(tablename, find, callback) {
  var tbl = getTable(tablename);
  tbl.count(find || {}, callback);
}

exports.count =function(tablename, find, callback) {
  var tbl = getTable(tablename);
  tbl.count(find || {}, callback);
}

exports.ensureIndex =function(tablename, index, callback) {
  var tbl = getTable(tablename);
  tbl.ensureIndex(index, callback);  // callback is function(err)
}


exports.getTables = function(tblnames, callback) {
  var out = {};
  for (var i in tblnames) {  // set up empties, so that they are (generally) returned in the order asked
    out[tblnames[i]]=[];
  }
  async.each(tblnames, function(tblname, cb) {
    exports.find(tblname, {}, function(err, data) {
      out[tblname] = data;
      cb(null);
    });
  }, function(err) {
    callback(err, out);
  });
}

function getTable(tablename) {
  if (!db[tablename]) {
    // jscs:disable
    db[tablename] = new nedb({filename: _dataPath + '/' + tablename, autoload: true});  //  JSCS doesn't like the lowercase constructor, but we can't change it.
    // jscs:enable
  }
  return db[tablename];
}
