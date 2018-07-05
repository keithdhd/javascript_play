

exports.getPage = function(callback) {
  var actions = [
    {title: 'Publish', text: 'Publish your work - this is a sample action and nothing is published', button: 'Publish', callback: donePublish},
    {title: 'Backup', text: 'Backup your work - this is a sample action and nothing is backed up', button: 'Backup', callback: doneBackup},
  ];

  callback(null, { actions: actions });
}


function donePublish(post, callback) {
  callback(null, 'Publish all done.');
}

function doneBackup(post, callback) {
  callback(null, 'Backup all done.');
}
