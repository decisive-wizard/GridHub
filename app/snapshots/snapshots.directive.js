(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('snapShots', directive);

    /* @ngInject */
    function directive () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl:'app/snapshots/snapshots.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();


