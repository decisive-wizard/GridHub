(function() {
  'use strict';

  angular
    .module('app.utils')
    .controller('spreadSheetController',[
      'excel',
      'gridFileFormatConverter',
      Ctrl
    ]);

  /* @ngInject */
  function Ctrl(excel) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Ctrl';
    activate();

    function activate() {
    	var initialSpreadSheet = new excel.generateWorkbook();
    	excel.renderSheet(initialSpreadSheet,1);
    }

    // render sheet goes in here
  }
})();
