var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, message) {
  var resolvedPath = path.resolve(rootFilePath);

  var repo = gift(resolvedPath);

  repo.commit(message, {all: true, amend: false, author: 'greg fedirko'}, function(err) {
    if (err) {
      console.log(err);
    }
  })


};