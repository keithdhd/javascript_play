var async = require('async'), fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = (_siteopts.db || {}).url ||  'mongodb://localhost:27017/' + _siteopts.name;

var db = null;

MongoClient.connect(url, function(err, connetedDB) {
  if (err) {
    ['find', 'findOne', 'insert', 'update', 'upsert', 'remove', 'count', 'getTables', 'ensureIndex'].forEach(function(fname){
      exports[fname]=function(){
        console.error('Call to _db.' + fname + ' failed, no mongo connection');  // Stub out exported functions
      };
    });
    return console.log("\nMongo error: " + err.message);
  }

  db = connetedDB;

  exports.find = function(tablename, find, callback) {
    var tbl = db.collection(tablename);
    tbl.find(find, function(err, cursor){
      if (callback) {
        cursor.toArray(callback);
      } else {
        return cursor;
      }
    });
  }

  exports.findOne = function(tablename, find, callback) {
    var tbl = db.collection(tablename);
    tbl.findOne(find, callback);
  }

  exports.insert = function(tablename, obj, callback) {
    var tbl = db.collection(tablename);
    tbl.find({}).sort({ _id: -1 }).toArray(function(err, results) {
      if (!obj._id || obj._id == 'new') {
        obj._id = results.length?(parseInt(results[0]._id,10) || 0) + 1:1;
      }
      tbl.insert(obj, callback);
    });
  }

  exports.update = function(tablename, obj, find, callback) {
    var tbl = db.collection(tablename);
    if (typeof find !== "object") {  // Is it the _ID?
      find = {$or:[{_id: parseInt(find,10)}, {_id: find}]};
    }
    delete obj._id;
    tbl.update(find, {$set: obj}, {multi: true}, callback);
  }

  exports.upsert = function(tablename, obj, find, callback) {
    if (find === 'new' || !find) {
      return exports.insert(tablename, obj, callback);
    }
    if (typeof find !== "object") {  // Is it the _ID?
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
    db.collection(tablename).remove(find, callback);
  }

  exports.count =function(tablename, find, callback) {
    db.collection(tablename).count(find, callback);
  }

  exports.ensureIndex =function(tablename, index, options, callback) {
    var tbl = db.collection(tablename);
    var fields={};
    if (index && index.fieldName) {
      fields[index.fieldName] = 1;
    } else {
      fields = index;
    };
    if (typeof options == 'function') {
      callback = options;
      options = null;
    }
    tbl.ensureIndex(index, fields, options, callback);  // callback is function(err)
  }


  exports.getTables = function(tblnames, callback) {
    var out = {};
    async.each(tblnames, function(tblname, cb) {
      exports.find(tblname, {}, function(err, data) {
        out[tblname] = data;
        cb(null);
      },db);
    }, function(err) {
      callback(err, out);
    });
  }

});
