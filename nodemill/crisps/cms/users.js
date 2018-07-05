
exports.getPage = function(callback) {
  var tableName = 'users';

  var fields = {
    login: { type: 'string', title: 'Login', mandatory: true},
    password: { type: 'password'},
    realname: { type: 'string', title: 'Real name', mandatory: true},
    level: { type: 'dropdown', title: 'User type', data: {user: 'User', admin: 'Admin'}, noBlank: true, defaultValue: 'user'},
  };

  var tableColumns = {
    login: { title: 'Login'},
    realname: { title: 'Real name' },
    level: { title: 'Type' },
  };

  callback(null, {fields: fields, tableColumns: tableColumns, tableName: tableName});
}
