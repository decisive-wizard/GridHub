var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, message,callback) {
  var resolvedPath = path.resolve(rootFilePath);


  var repo = gift(resolvedPath);


  repo.commit(message, {all: true, amend: false, author: 'John Heroy'}, function(err) {
    callback(err,'OK');
  });


};