(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('spreadSheet', directive);

    /* @ngInject */
    function directive () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl:'app/spreadsheet/spreadsheet.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();