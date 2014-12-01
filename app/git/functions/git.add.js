
var gift = require('gift');
var path = require('path');
var fs = require('fs');

module.exports = function(rootFilePath, fileName) {

	var repo = gift(rootFilePath);
	repo.add(fileName, function(err) {
		console.log(err);
	});
}