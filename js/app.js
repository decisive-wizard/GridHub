// See below for event API interface to handstontable
// https://github.com/handsontable/jquery-handsontable/wiki/Events

// store current working file directory here
var metaData, gui, win, workbooks;

$(function(){

  var converter = require('./js/arrayToCsv.js');
  var Workbook = require('./js/workbook.js');
  var Worksheet = require('./js/worksheet.js')

  metaData = {};
  workbooks = {};
  gui = require('nw.gui');
  win = gui.Window.get();
  
  workbooks.noname = new Workbook();

  $('#spreadsheet').handsontable(workbooks.noname.sheet1);

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


  // setInterval(function(){
  //   console.log('1');
  //   $(generateNewRandomFeed()).hide().prependTo(".feedWrapper").slideDown("slow", function() {
  //     //when complete
  //     console.log("swami");
  //   });
  // },1000);

//End of Feed Simulator

});
