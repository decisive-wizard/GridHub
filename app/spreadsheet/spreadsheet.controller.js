(function() {
    'use strict';

    angular
        .module('app.utils')
        .controller('spreadSheetController',['excel',Ctrl]);

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
    }
})();