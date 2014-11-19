(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('currentWorkbook', currentWorkbook);

  var gui = require('nw.gui');
  var win = gui.Window.get();

  function currentWorkbook(){
    var service = {
      data: {
        gridFilePath: '',
        tempFolderPath: '',
        currentSheet: '',
        gitCommits: [],
        currentHash:'',
        win: win
      }
    };

    return service;
  }
})();
