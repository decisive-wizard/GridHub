// store current working file directory here

var metaData, gui, win, workbooks, gitSessionController;
gui = require('nw.gui');
win = gui.Window.get();

metaData = {};
workbooks = {};


// always load this file first before other non-vendor scripts
