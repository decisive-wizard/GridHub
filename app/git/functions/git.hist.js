var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, callback) {
  var resolvedPath = path.resolve(rootFilePath);
  var repo = gift(resolvedPath);
  // console.log(repo);

  repo.commits(function(err, commits) {
    if (err) {
      console.log(err);
    }
    // console.log(commits);
    if (callback) {
      callback(commits);
    }
  });

}