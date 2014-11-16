(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('currentWorkbook', currentWorkbook);

  function currentWorkbook(){
    var service = {
      data: {
        gridFilePath: '',
        tempFolderPath: '',
        currentSheet: '',
        gitCommits: []
      }
    };

    return service;
  }
})();
