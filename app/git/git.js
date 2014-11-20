var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = {
	add: _add,
  checkout: _checkout,
  commit: _commit,
  getHistory: _hist,
  init: _init,
  status: _status
}

////////////

function _add(rootFilePath, fileName) {

  var repo = gift(rootFilePath);

  repo.add(fileName, function(err) {
    console.log(err);
  });
}

function _checkout(rootFilePath, targetHash, callback) {

  var resolvedPath = path.resolve(rootFilePath);
  var repo = gift(resolvedPath);

  repo.checkout(targetHash, function(err) {
    if (err) {
      console.log(err);
    }
  })

}

function _commit(rootFilePath, message) {
  var resolvedPath = path.resolve(rootFilePath);

  var repo = gift(resolvedPath);

  repo.commit(message, {all: true, amend: false, author: 'greg fedirko'}, function(err) {
    if (err) {
      console.log(err);
    }
  })

};

function _hist(rootFilePath, callback) {
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

function _init(rootFilePath, callback) {
  var resolvedPath = path.resolve(rootFilePath);

  fs.exists(resolvedPath + '/.git', function(exists) {
    if (!exists) {
      gift.init(resolvedPath, function(err, repo) {
        if (err) {console.log(err);}
        console.log('Initialized empty git repository in', resolvedPath);
      });
    } else {
      console.log('Git repository already exists in', resolvedPath);
    }
  });
}

function _status(rootFilePath,callback) {

  var repo = gift(rootFilePath);

  repo.status(function(err, status) {
    callback(err,status) ;
  });
}



















