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

function _add(rootFilePath, fileName, callback) {

  var repo = gift(rootFilePath);

  repo.add(fileName, function(err) {
		callback();
    console.log(err);
  });
}

function _checkout(rootFilePath, targetHash, callback) {

  var resolvedPath = path.resolve(rootFilePath);
  var repo = gift(resolvedPath);

  repo.checkout(targetHash, function(err) {
    callback(err,'OK');

  })

}

function _commit(rootFilePath, message,callback) {
 var resolvedPath = path.resolve(rootFilePath);

 var repo = gift(resolvedPath);

 repo.commit(message, {all: true, amend: false, author: 'John Heroy <johnheroy@gmail.com>'}, function(err) {
   callback(err,'OK');
 });
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
				callback(err, repo);
      });
    } else {
			callback();
    }
  });
}

function _status(rootFilePath,callback) {

  var repo = gift(rootFilePath);

  repo.status(function(err, status) {
    callback(err,status) ;
  });
}
