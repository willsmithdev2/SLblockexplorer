'use strict';

angular.module('myApp', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
