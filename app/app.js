'use strict';

angular.module('myApp', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blockchain', {
    templateUrl: 'blocktable/blocktable.html',
    controller: 'View1Ctrl'
  })
  $routeProvider.otherwise({redirectTo: '/blockchain'});
}]);
