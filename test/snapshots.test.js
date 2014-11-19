'use strict';

describe('snapShots', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app.layout'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('snapshotsController', {$scope: scope});
    }));

    it('should have variable value equal 1', function(){
            expect(scope.value).toBe(1);
        });

    // tests start here
});