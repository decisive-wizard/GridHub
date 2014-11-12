// This file assigns git functions to the global variable: gitSessionController
// whitch is declared in globals.js

gitSessionController = (function() {
  var git = require('./js/git/git.js');

  return {
    activateSession: activateSession
  };



  ////////////

  function activateSession() {

    var filePath = metaData.filePath;
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
      console.log('ACIVATE SESSION CONTROLLER:', commits);
    });

  }

})();
