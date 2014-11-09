// See below for event API interface to handstontable
// https://github.com/handsontable/jquery-handsontable/wiki/Events

// store current working file directory here
var metaData, gui, win;

$(function(){

  var converter = require('./js/arrayToCsv.js');
  var writeFileCallback,
      generateBlankSheet;

  metaData = {};
  gui = require('nw.gui');
  win = gui.Window.get();

  $('#spreadsheet').handsontable({
    data: generateBlankSheet(30,30),
    rowHeaders: true,
    colHeaders: true,
    stretchH: 'last',
    minSpareRows: 1,
    contextMenu: true,
    outsideClickDeselects : false,
    formulas: true,

    afterChange: function(changes, source){
      // cell value has changed
      // continually save files
      var currentDir = process.env.PWD;
      var data = this.getData();
      if (metaData.filePath !== undefined){
        converter.arrayToCsv(data, metaData.filePath, writeFileCallback);
      }
    },

    afterSelection: function(r, c, r2, c2){
      // r = selection start row
      // c = selection start column
      // r2 = selection end row
      // c2 = selection end column
      // note: only show function or value for a single cell
      if (r === r2 && c === c2){
        $('.formula-input').val(this.getDataAtCell(r, c));
      } else {
        $('.formula-input').val('');
      }
    }

  });

  //////////// Helper functions: ////////////

  function writeFileCallback() {
    console.log('file successfully saved');
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

  //Feed Simulator

  var Feed = $('.feedWrapper');
  var newFeedItem =function(user,message){
    var item = '<li class="project update"><div class="message">'+
                          '<a class ="innerUpdate">'+
                              '<img src=' + user.image + '/>'+
                              '<h2>' + user.name + '</h2>'+
                              '<p>'+ message + '</p>'+
                          '</a>'+
                        '</div>'+
                      '</li>'; 
      return item;                                   
    };

  var messages = ['Made a pull request to "SheetSync"','Asked Santa for a new shiny Dildo','Pushed an awesome Commit','Went to Kenya, for some reason'];
  var users = [{name:'Greg Fedirko', image:'"assets/greg.jpeg"'},
                  {name:'Felipe Batista', image:'"assets/felipe.jpeg"'},
                  {name:'John Heroy', image:'"assets/john.png"'},
                  {name:'Nick Stefan', image:'"assets/nick.jpeg"'}];
                      
  var generateNewRandomFeed = function(){
    var randomMsg = messages[Math.floor(Math.random() * (messages.length-1))];
    var randomUser = users[Math.floor(Math.random() * (users.length-1))];
    return newFeedItem(randomUser,randomMsg);
  };  


  setInterval(function(){
    console.log('1');
    $(generateNewRandomFeed()).hide().prependTo(".feedWrapper").slideDown("slow", function() {
      //when complete
      console.log("swami");
    });
  },1000);

//End of Feed Simulator

});
