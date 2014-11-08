/* globals metaData, gui, win */

$(function(){

  // callbacks to use with share buttons
  // filePath refers to the ABSOLUTE path to selected file / folder
  // $('.new-project-btn').on('click', function(){
  //   chooseFile('#fileDialog', function(filePath){
  //
  //   });
  // });

  $('.open-project-btn').on('click', function(){
    chooseFile('#fileDialog', function(filePath){
      // change title at top of node webkit window to show file path
      win.title = 'Sheet Sync - ' + filePath;
      metaData.filePath = filePath;
      // actually open the file...TODO
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
