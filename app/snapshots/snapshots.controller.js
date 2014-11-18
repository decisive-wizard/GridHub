(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('snapshotsController', Ctrl);

    /* @ngInject */
    function Ctrl($scope) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Ctrl';
        $scope.commits = [{message:'Hey ho Lets go everyone',name:'Felipe Batista', hash:"192949293", date:'11/14/2014'},{name:'Felipe Batista', hash:"9192939123",message:'Hey ho, Lets go Everyone, Lets get this party started',date:'11/14/2014'}];
        activate();

        function activate() {
        }
    }
})();

