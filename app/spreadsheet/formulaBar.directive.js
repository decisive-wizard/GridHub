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
            var cellObj = $('#spreadsheet').handsontable('getDataAtCell', cell[0], cell[1]);
            var inputVal = $('.formula-input').val();
            if (inputVal.length && inputVal[0] === '='){
              cellObj.formula = inputVal;
              cellObj.value = '';
            } else {
              cellObj.value = inputVal;
              cellObj.formula = '';
            }
            $('#spreadsheet').handsontable('setDataAtCell', cell[0], cell[1], cellObj);
            $('#spreadsheet').handsontable('render');
          }
        }
      });
    }
  }
})();
