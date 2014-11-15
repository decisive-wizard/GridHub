(function() {
  'use strict';

  angular
    .module('app.utils')
    .directive('formulaBar', directive);

  /* @ngInject */
  function directive () {
    var directive = {
      link: link,
      restrict: 'EA',
      templateUrl: 'app/spreadsheet/formulaBar.html'
    };
    return directive;

    function link(scope, element, attrs) {
      // bind formula bar inputs to handsontable
      $('.formula-input').keydown(function(e){
        // enter key when e.which === 13
        if (e.which === 13){
          var cell = $('#spreadsheet').handsontable('getSelected');
          // check if its a single cell
          if (cell[0] === cell[2] && cell[1] === cell[3]){
            $('#spreadsheet').handsontable('setDataAtCell', cell[0], cell[1], $('.formula-input').val());
          }
        }
      });
    }
  }
})();
