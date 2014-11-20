var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath,callback) {

	var repo = gift(rootFilePath);

 	repo.status(function(err, status) {
	 	callback(err,status) ;
	});
};