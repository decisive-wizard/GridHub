var converter = require('./js/arrayToCsv.js');

var data = [
  ['=$B$2', "Maserati", "Mazda", "Mercedes", "Mini", "=A$1"],
  [2009, 0, 2941, 4303, 354, 5814],
  [2010, 5, 2905, 2867, '=SUM(A4,2,3)', '=$B1'],
  [2011, 4, 2517, 4822, 552, 6127],
  [2012, '=SUM(A2:A5)', '=SUM(B5,E3)', '=A2/B2', 12, 4151]
];

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

$(function(){
  $('.table-container').handsontable({
    data: generateBlankSheet(10,10),
    minSpareRows: 1,
    colHeaders: true,
    rowHeaders:true,
    contextMenu: true,
    formulas:true
  });

  $("#create-sheet-form").submit(function(event){
    event.preventDefault();

    var height = 10;
    var width = 10;

    height = $('.height').val();
    width = $('.width').val();
    console.log(width);

      $('.table-container').handsontable({
        data: generateBlankSheet(height, width),
        minSpareRows: 1,
        colHeaders: true,
        rowHeaders:true,
        contextMenu: true,
        formulas:true
      });

  })

  $("#commit-button").click(function() {
    var currentDir = process.env.PWD;
    var fileName = "test"
    var data = $('.table-container').handsontable('getData');


    converter.arrayToCsv(data, currentDir + '/' + fileName, writeFileCallback);


    function writeFileCallback() {
      alert('file successfully saved');
    }
  });
});
