
function renderSheet(workbook,worksheet){
  // clear any existing sheet tabs
  $('.sheet-select').html('');
  // create each tab
  for (var key in workbook){
    var $li = key !== worksheet.toString() ? $('<li>') : $('<li>').addClass('active');
    var $a = $('<a>');
    $a.text(workbook[key].sheetName);
    $a.attr('href','#');
    $a.attr('data',key);
    $li.append($a);
    $('.sheet-select').append($li);
  }
  // register onclick events
  $('.sheet-select > li > a').on('click',function(e){
    e.preventDefault();
    var whichSheet = $(this).attr('data');
    renderSheet(workbook,whichSheet);
  });

  // set current spreadsheet
  $('#spreadsheet').handsontable(workbook[worksheet]);
}
