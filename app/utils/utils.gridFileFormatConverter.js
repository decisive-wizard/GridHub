(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('gridFileFormatConverter', gridFileFormatConverter);

  gridFileFormatConverter.$inject = ['fs'];

  function gridFileFormatConverter(fs){
    var service = {
      parseGrid : parseGrid,
      gridify   : gridify
    };

    return service;

    ///////////////////////////////////

    function parseGrid(filePath) {

    }

    function gridify(gridArray) {

    }
  }
})();
