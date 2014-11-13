var gift = require('gift');
var path = require('path');
var fs = require('fs');

var _init = require('./functions/git.init.js');
var _status = require('./functions/git.status.js');
var _add = require('./functions/git.add.js');
var _commit = require('./functions/git.commit.js');
var _hist = require('./functions/git.hist.js');
var _checkout = require('./functions/git.checkout.js');

module.exports = {
	init: _init,
  getHistory: _hist,
	status: _status,
	add: _add,
	commit: _commit,
  checkout: _checkout
}