var converter = require('./js/arrayToCsv.js');

// Dummy Data:
// var data = [
//   ['=$B$2', "Maserati", "Mazda", "Mercedes", "Mini", "=A$1"],
//   [2009, 0, 2941, 4303, 354, 5814],
//   [2010, 5, 2905, 2867, '=SUM(A4,2,3)', '=$B1'],
//   [2011, 4, 2517, 4822, 552, 6127],
//   [2012, '=SUM(A2:A5)', '=SUM(B5,E3)', '=A2/B2', 12, 4151]
// ];

$(function(){

  var writeFileCallback,
      generateBlankSheet;

  $('#spreadsheet').handsontable({
    data: generateBlankSheet(30,30),
    rowHeaders: true,
    colHeaders: true,
    stretchH: 'last',
    minSpareRows: 1,
    contextMenu: true,
    formulas: true
  });

  // Create a custom sized table
  // $(".create-sheet-form").submit(function(event){
  //   event.preventDefault();
  //
  //   var height = $('.height').val();
  //   var width = $('.width').val();
  //
  //     $('#spreadsheet').handsontable({
  //       data: generateBlankSheet(height, width),
  //       minSpareRows: 1,
  //       colHeaders: true,
  //       rowHeaders:true,
  //       contextMenu: true,
  //       formulas:true,
  //       stretchH: 'last'
  //     });
  //
  // })

  $(".save-button").click(function() {
    var currentDir = process.env.PWD;
    var fileName = "test"
    var data = $('.table-container').handsontable('getData');

    converter.arrayToCsv(data, currentDir + '/' + fileName, writeFileCallback);

  });

  //////////// Helper functions: ////////////

  function writeFileCallback() {
    alert('file successfully saved');
  }

  function generateBlankSheet(height, width) {
    var newSheet = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push("");
      }
      newSheet.push(row);
    }
    return newSheet;
  }

  function createBigData() {
    var rows = []
      , i
      , j;

    for (i = 0; i < 1000; i++) {
      var row = [];
      for (j = 0; j < 6; j++) {
        row.push(Handsontable.helper.spreadsheetColumnLabel(j) + (i + 1));
      }
      rows.push(row);
    }

    return rows;
  }

});
