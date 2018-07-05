var _ = require('underscore'), async = require('async');

exports.render = function(req, res, pagename, opts) {
  // Delete records:
  if (req.body && req.body.del) {
    var delCount = 0;
    async.forEachOfSeries(req.body, function(value, key, callback) {
      if (key.substr(0,4) == 'chb_') {
        key = key.substr(4);
        if (opts.preDelete) {
          opts.preDelete(key, function(err) {
            if (err) {
              return callback();
            }
            _db.remove(opts.tableName, {_id: parseInt(key) || key}, function(err, res) {
              delCount++;
              callback();
            });
          });
        } else {
          _db.remove(opts.tableName, {_id: parseInt(key) || key}, function(err, res) {
            delCount++;
            callback();
          });
        }
      } else {
        callback();
      }
    }, function(err) {
      req.session.message = {message: delCount + ' record' + (delCount == 1?'':'s') + ' deleted', type: 'info'};
      res.redirect(303, pagename);
    });
  } else { // Regular table page
    var pageOptions = opts;
    pageOptions.pagename = pagename;
    if (opts.message) {
      req.session.message={message: opts.message, type: 'info'};
    }
    async.waterfall([
      function mergeDataToDropdowns(callback) {
        addDataToOptions(opts, callback);
      },
      function readData(opts, callback) {   // Go and read the data
        pageOptions = opts;
        if (opts.tableName) {
          _db.find(opts.tableName, {}, callback);  // Look up from db and pass onto next function
        } else {
          callback(null, []);
        }
      },
      function setCellData(results, callback) {  // Apply each data record into an object with id and data object
        async.map(results, function(item, cb) {
          tableRow(item, pageOptions, cb);
        }, callback);
      },
    ], function renderPage(err, rows) {   // Send all the rows, headers etc to the template
      if (err) {
        return res.json(err);
      }
      var renderOpts = {tableColumns: pageOptions.tableColumns, rows: rows, lastId: req.session.lastId, helpers: _helpers, actions: pageOptions.actions};
      if (pageOptions.noDelete || rows.length <= 0) {
        renderOpts.noDelete = true;
      }
      if (pageOptions.noAdd) {
        renderOpts.noAdd = true;
      }
      if (pageOptions.noEdit) {
        renderOpts.noEdit = true;
      }
      if (req.session.message) {
        renderOpts.message = req.session.message;
        delete req.session.message;
      }
      if (pageOptions.aboveTable) {
        renderOpts.abovePartial = pageOptions.aboveTable.partial || pageOptions.aboveTable;
        renderOpts.aboveTable = pageOptions.aboveTable.data || {};
      }
      if (pageOptions.belowTable) {
        renderOpts.belowPartial = pageOptions.belowTable.partial || pageOptions.belowTable;
        renderOpts.belowTable = pageOptions.belowTable.data || {};
      }

      res.render('table', renderOpts);
      delete req.session.lastId;
    });
  }
};

// AddDataToOptions converts fields with a table, key and value field to a data field
function addDataToOptions(opts, callback) {
  async.forEach(opts.fields, function(item, cb) {
    if (item.table) {
      item.data = {};
      _db.find(item.table, {}, function(err, records) {
        for (var i in records) {
          item.data[records[i][item.key || '_id']] = records[i][item.value || 'name'];
        }
        cb();
      });
    } else {
      cb();
    }
  }, function() {  // Finally
    callback(null, opts);
  });
}

function xss(what) {
  return what;
}

function tableRow(record, pageOptions, callback) {
  var row = {id: record._id, data: {}};
  async.forEachOf(pageOptions.tableColumns, function(item, field, cb) {
    var clickable = !pageOptions.noEdit; //true;
    var fieldOptions = pageOptions.fields[field] || {};
    var value = record[field];
    if (!value && fieldOptions.langs) {
      value=record[field + '_' + fieldOptions.langs[0]];
    }
    var fieldType = fieldOptions?fieldOptions.type:'';
    // Var value=display(field, record[field], pageOptions);
    row.data[field] = {value: value, clickable: clickable, link: (_siteopts.cmspath || '/') + pageOptions.pagename + '/' + record._id};
    if (typeof row.data[field].value != 'object') {
      row.data[field].value = xss(row.data[field].value);
    }
    var tableCellCallback = null;
    if (_fieldJS[fieldType]) {
      tableCellCallback = _fieldJS[fieldType].preTableCell;
    }
    if (item.callback) {
      tableCellCallback = item.callback;
    }
    if (tableCellCallback) {
      tableCellCallback(value, record, fieldOptions, function(err, val, clickable, sortValue) {
        row.data[field].value = val;
        if (sortValue) {
          row.data[field].sortValue = sortValue;
        }
        if (clickable === true || clickable === false) {
          row.data[field].clickable = clickable;
        }
        cb();
      });
    } else {
      if (pageOptions.fields[field] && pageOptions.fields[field].array) {  // Display an array in the table - just show "x items" if it is >=2 length
        if (row.data[field].value && row.data[field].value.length >= 2) {
          row.data[field].value = row.data[field].value.length + ' items';
        }
        else if (row.data[field].value && row.data[field].value.length == 1 && row.data[field].value[0]) {
          row.data[field].value = xss(row.data[field].value[0]);
        } else {
          row.data[field].value='';
        }
      }
      if (typeof row.data[field].value == 'object') {
        row.data[field].value = row.data[field].value ? xss(JSON.stringify(row.data[field].value)) : '';
      }
      cb();
    }

  }, function(err) {
    callback(err, row);
  });
}
