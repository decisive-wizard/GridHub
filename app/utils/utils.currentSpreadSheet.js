(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('currentSpreadSheet', currentSpreadSheet);

  function currentSpreadSheet(){
    var service = {
      data: {
        filePath: '',
        commitHash: ''
      }
    };

    return service;
  }
})();
