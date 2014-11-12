// Create a .git directory inside the root directory
var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, callback) {
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