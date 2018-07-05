var  _ = require('underscore'), handlebars = require('handlebars');
var fs = require('fs'), async = require('async');
var rowTemplate = handlebars.compile(fs.readFileSync(__dirname + '/row.hbs', 'UTF-8'));

// Render: displays the page with one row per field for one record (or new)
exports.render = function(req, res, pagename, id, pageOptions) {
  var recordTitle;
  var mandatoryFields = {};
  var isNew = (id == 'new');
  async.waterfall([
    function readData(callback) {  // 2. load record from id
      if (isNew) {
        callback(null, {});
      } else {
        //var search = { _id: parseInt(id,10) || id };
        var search = {$or: [{_id: parseInt(id,10)}, {_id: id}] };
        _db.findOne(pageOptions.tableName, search, callback);  // Look up from db and pass onto next function
      }
    },
    function generateHTMLRows(record, callback) {  // 3. for each field, make a html row based on the field type and value
      if (record == null) {
        if (pageOptions.id) {
          record = {_id: pageOptions.id};
        } else {
          return callback('Unable to find record');
        }

      }
      var fields = pageOptions.fields;
      recordTitle = pageOptions.title || record[pageOptions.titleField];
      var rows = [];
      for (var field in fields) {
        if (fields[field].mandatory) {
          mandatoryFields[field] = '{ validators : { notEmpty : { message : "Field required and cannot be empty" } } }';
        }
        if (!recordTitle && field != '_id') {
          recordTitle = record[field] || 'new';
        }

        if (fields[field].langs) {
          for (var i in fields[field].langs) {
            var langcode = fields[field].langs[i];
            var newField = field + '_' + langcode;
            var fieldBits = {fieldname: newField, fieldParams: _.extend(_.clone(fields[field]), {lang: langcode}), value: fields[field].override || (isNew?fields[field].defaultValue:record[newField])};
            rows.push(fieldBits);
          }
        } else {
          var fieldBits = {fieldname: field, fieldParams: fields[field], value: fields[field].override || (isNew?fields[field].defaultValue:record[field])};
          rows.push(fieldBits);
        }
      }
      async.map(rows, function(item, cb) {

        getHTML(item.fieldname, item.value, item.fieldParams, record, cb);
      }, callback);
    },],
    function(err, rows) {
      if (err) {
        res.render('error', {title: 'Missing record', errormessage: err || 'Unable to find that record'});
      } else {
        res.locals.googleMapKey = _getKey('CMS', 'googleMapKey');
        var renderOpts = {id: id, pagename: pagename, recordTitle: recordTitle, editRows: rows, pageTitle: recordTitle, mandatoryFields: mandatoryFields, extra: pageOptions.extra || {}};

        if (pageOptions.id) {
          renderOpts.noback = true;
        }

        if (req.session.message) {
          renderOpts.message = req.session.message;
          delete req.session.message;
        }

        if (pageOptions.aboveEdit) {
          renderOpts.abovePartial = pageOptions.aboveEdit.partial || pageOptions.aboveEdit;
          renderOpts.aboveEdit = pageOptions.aboveEdit.data || {};
        }
        if (pageOptions.belowEdit) {
          renderOpts.belowPartial = pageOptions.belowEdit.partial || pageOptions.belowEdit;
          renderOpts.belowEdit = pageOptions.belowEdit.data || {};
        }

        res.render('edit', renderOpts);
      }
    }
  );
}


function getHTML(field, value, options, record, callback) {  // Load field hbs (and optional js) and callback with html
  var fieldType = options.type;
  if (!fieldType && !options.title) {  // Check for empty field type - don't display in that case
    return callback(null, '');
  }
  async.waterfall([
    function loadHBS(callback) {
      var preDisplay = null;
      if (_fieldJS[fieldType] && _fieldJS[fieldType].preDisplay) {
        preDisplay = _fieldJS[fieldType].preDisplay;
      }
      if (options.preDisplay) {
        preDisplay = options.preDisplay;
      }
      if (preDisplay) {  // If there is a preDisplay callback then let's edit the value before showing it
        preDisplay(value, record, options, function(err, val, opts) {
          value = val;
          if (opts) {
            options = opts;
          }
          callback();
        });
      } else {
        callback();
      }
    },
    function manipulateOptions(callback) {  // Add any data fields from db table values
      prepareOptions(fieldType, value, options, callback);
    },
  ],
  function loadTemplate(err, value, options) {  // Now put it all together to form the html row
    var hbs = _fieldHBS[fieldType] || _fieldHBS.string;
    var fullWidth = hbs.toLowerCase().indexOf('@fullwidth') >= 0;
    if (!err) {
      for (var i in _helpers) {
        handlebars.registerHelper(i, _helpers[i]);
      }
      var template = handlebars.compile(hbs);
      var title = options.title || capitalize(field);
      if (options.lang) {
        title += ' (' + options.lang + ')';
      }
      var html = '';
      if (options.array) {
        var innerHtml=[];
        if (Array.isArray(value)) {
          for (var i in value) {
            innerHtml.push(template({id: field + '_' + i  + '_id', field: field, value: value[i], options: options, title: title, index: i, isFirst: i==0}));
          }
        } else {
          innerHtml.push(template({id: field + '_0_id', field: field, value: value, options: options, title: title, index: 0, isFirst: true}));
        }
        var newItem=template({id: field + '_id_XXXX', field: field, options: options, title: title});
        html=rowTemplate({id: field, title: title, html: innerHtml, newItem: newItem, array: true, options: options});
      } else {
        var innerHtml = template({id: field + '_id', field: field, value: value, options: options, title: title});
        if (fullWidth) {
          html = innerHtml;
        } else {
          html=rowTemplate({id: field, title: title, html: innerHtml, array: false, options: options, fullWidth: fullWidth});
        }
      }
    }
    callback(err, html);
  });
}

function prepareOptions(fieldType, value, options, callback) {
  if (options.table) {
    options.data = {};
    _db.find(options.table, options.filter ? options.filter : {}, function(err, records) {
      var keyField = options.key || '_id';
      var valueField = options.value || 'name';
      for (var i in records) {
        options.data[records[i][keyField]] = records[i][valueField];
      }
      callback(null, value, options);
    });
  } else {
    callback(null, value, options);
  }
}

function capitalize(what) {
  return what ? what.charAt(0).toUpperCase() + what.slice(1) : '';
}
