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
