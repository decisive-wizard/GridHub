$(function(){

  $('.new-project-btn').on('click', function(){
    chooseFile('#fileDialog');
  });

  $('.open-project-btn').on('click', function(){
    chooseFile('#fileDialog');
  });

  // import .xlsx
  $('.import-excel-btn').on('click', function(){
    chooseFile('#fileDialog');
  });



  function chooseFile(name) {
    var chooser = $(name);
    chooser.change(function(evt) {
      console.log($(this).val());
    });

    chooser.trigger('click');
  }

});
