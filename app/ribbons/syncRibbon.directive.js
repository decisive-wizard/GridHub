(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('syncRibbon', directive);

    /* @ngInject */
    function directive () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl:'app/ribbons/syncRibbon.html'

        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();