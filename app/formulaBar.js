$(function(){

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

});
