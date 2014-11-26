(function() {
  'use strict';
  angular
    .module('app.utils', [])
    .factory('socket', function (socketFactory) {  
      console.log('Starting socket');
      var sio = socketFactory('http://10.8.32.239:3000');

      sio.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
      });

      sio.on('connect', function (){
        console.info('successfully established a working connection \o/');
      });

      return sio;
    }).value('version', '0.1');

})();
