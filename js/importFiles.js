/* globals metaData, gui, win */

$(function(){

  // callbacks to use with share buttons
  // filePath refers to the ABSOLUTE path to selected file / folder
  // $('.new-project-btn').on('click', function(){
  //   chooseFile('#fileDialog', function(filePath){
  //
  //   });
  // });

  var converter = require('./js/arrayToCsv.js');

  $('.open-project-btn').on('click', function(){
    chooseFile('#fileDialog', function(filePath){

      // change title at top of node webkit window to show file path
      win.title = 'Sheet Sync - ' + filePath;
      metaData.filePath = filePath;

      // actually open the file and seed the data into the spreadsheet
      converter.csvToArray(filePath, function(array){
        console.log('loaded csv', array);
      });

    });
  });

  // import .xlsx
  $('.import-excel-btn').on('click', function(){
    chooseFile('#fileDialog', function(filePath){

    });
  });



  function chooseFile(name, cb) {
    var chooser = $(name);
    chooser.change(function(evt) {
      cb($(this).val());
    });

    chooser.trigger('click');
  }

});
