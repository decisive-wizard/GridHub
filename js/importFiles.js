/* globals metaData, gui, win, workbooks */

$(function(){

  // callbacks to use with share buttons
  // filePath refers to the ABSOLUTE path to selected file / folder
  // $('.new-project-btn').on('click', function(){
  //   chooseFile('#fileDialog', function(filePath){
  //
  //   });
  // });

  var converter = require('./js/arrayToCsv.js');
  var parsexcel = require('parsexcel.js');

  $('.open-project-btn').on('click', function(){
    chooseFile('#fileDialog', function(filePath){

      // change title at top of node webkit window to show file path
      win.title = 'Sheet Sync - ' + filePath;
      metaData.filePath = filePath;

      // actually open the file and seed the data into the spreadsheet
      converter.csvToArray(filePath, function(array){

      });

    });
  });

  // import .xlsx, .csv etc
  $('.import-file-btn').on('click', function(){
    chooseFile('#fileDialog', function(filePath){
    
      win.title = 'Sheet Sync - ' + filePath;
      metaData.filePath = filePath;

      if (/(.)+\.csv$/.test(filePath)){
        // actually open the file and seed the data into the spreadsheet
        converter.csvToArray(filePath, function(array){
          var workbookname = fileNameValidator(filePath,'csv');
          workbooks[workbookname] = new Workbook(array,{csv:true});
          $('#spreadsheet').handsontable(workbooks[workbookname].sheet1);
        });
      } else if (/(.)+\.xlsx$/.test(filePath)){
        parsexcel(filePath,function(err,array){
          if (err) console.log(err);
          var workbookname = fileNameValidator(filePath,'xlsx');
          workbooks[workbookname] = new Workbook(array,{xlsx:true});
          $('#spreadsheet').handsontable(workbooks[workbookname][1]);
        });
      } else {
        alert("This file extension is not supported.")
      }
    });
  });

  function chooseFile(name, cb) {
    var chooser = $(name);
    chooser.change(function(evt) {
      cb($(this).val());
    });

    chooser.trigger('click');
  }

  function fileNameValidator(filepath, extension){
    var noSlashes = filepath.split('/').length > 0 ?
      filepath.split('/')[filepath.split('/').length - 1] :
      filepath;
    var reString = '(.+)\\.' + extension + '$';
    var re = new RegExp(reString);
    var filename = noSlashes.match(re)[1];
    var safeFileName = filename.replace(/[\\\/\<\>\"\*\?\|]/gi,"");
    return safeFileName.length > 0 ? safeFileName : "workbook";
  }

});
