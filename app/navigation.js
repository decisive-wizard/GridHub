// this file toggles navigation in top bar
$(function(){

  $('.tab-menu').on('click', 'a', function(e){
    e.preventDefault();
    var ribbonClass = $(this).parent().data('ribbon');
    console.log(ribbonClass);
    // toggle active tag
    $('.tab-menu .active').removeClass('active');
    $(this).parent().addClass('active');
    // toggle ribbon show/hide
    $('.ribbon').hide();
    $('.' + ribbonClass + '-ribbon').show();
  });

});
