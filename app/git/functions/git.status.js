var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath) {

	var repo = gift(rootFilePath);

	var status = repo.status(function(err, status) {
	 	if (err) {console.log(err);};
	 	console.log(status);
	 	return status;
	});

	return status;

};