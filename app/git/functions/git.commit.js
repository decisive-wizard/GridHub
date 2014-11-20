var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, message,callback) {
  var resolvedPath = path.resolve(rootFilePath);

  console.log('This is the resolved path',resolvedPath);

  var repo = gift(resolvedPath);

  console.log('this is the repo',repo);

  repo.commit(message, {all: true, amend: false, author: 'John Heroy'}, function(err) {
    callback(err,'OK');
  });


};