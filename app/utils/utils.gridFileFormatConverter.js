(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('gridFileFormatConverter', gridFileFormatConverter);

  var fs = require('fs');

  function gridFileFormatConverter(){
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
