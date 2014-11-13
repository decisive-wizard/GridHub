// This file assigns git functions to the global variable: gitSessionController
// whitch is declared in globals.js

gitSessionController = (function() {
  var git = require('./app/git/git.js');

  return {
    activateSession: activateSession
  };



  ////////////

  function activateSession() {

    var filePath = metaData.filePath;

    // get the path to the root folder
    var folderPath;
    for (var i = filePath.length; i > 0; i--) {
      var currentChar = filePath[i];
      if (currentChar === '/') {
        folderPath = filePath.slice(0, i);
        break;
      }
    }

    // console.log(folderPath);
    git.getHistory(folderPath, function(commits) {
      // empty the list before appending
      $(".feedWrapper").empty();

      // add a new li to the list for each commit
      _.forEach(commits, function(commit) {
        // console.log(commit.author.name);
        var author = commit.author.name;

        console.log(author)
        var message = commit.message;
        var sha1 = commit.id;

        // $(newFeedItem(name, message, sha1)).hide().prependTo(".feedWrapper");
        $(".feedWrapper").append(newFeedItem(author, message, sha1));

      });
      // console.log('ACIVATE SESSION CONTROLLER:', commits);
    });

  }


    function newFeedItem (author, message, hash){
    var item = '<li class="project update"><div class="message">'+
                          '<a class ="innerUpdate">'+
                              '<h2>' + author + '</h2>'+
                              '<p>'+ message + '</p>'+
                              '<p>'+ hash + '</p>'+
                          '</a>'+
                        '</div>'+
                      '</li>'; 
      return item;                                   
    };

})();
