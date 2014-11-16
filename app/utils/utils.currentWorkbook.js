(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('currentWorkbook', currentWorkbook);

  function currentWorkbook(){
    var service = {
      data: {
        filePath: '',
        currentSheet: '',
        gitCommits: []
      }
    };

    return service;
  }
})();
