var gift = require('gift');
var path = require('path');
var fs = require('fs');


module.exports = function(rootFilePath, targetHash, callback) {

  var resolvedPath = path.resolve(rootFilePath);
  var repo = gift(resolvedPath);

  repo.checkout(targetHash, function(err) {
    if (err) {
      console.log(err);
    }
  })

}