  (function() {
    'use strict';
    angular
        .module('app.utils')
        .factory('excel', excel);

    /* @ngInject */
    function excel() {
        var service = {
            renderSheet : renderSheet,
            generateWorkbook:generateWorkbook
        };
        return service;
        
   function generateWorkbook(dataObj,options){
   	if(arguments.length === 0){
      return new Workbook();
   	}else{
   		return new Workbook(dataObj,options);
   	}
  }
    }
})();























