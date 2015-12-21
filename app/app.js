'use strict';

angular.module('blockExplorer', ['ngRoute', "blockTable"]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blocktable', {
    templateUrl: 'blocktable/view.html',
    controller: 'BlockTableController',
    controllerAs:"blockTableCtrl"
  })
  $routeProvider.otherwise({redirectTo: '/blocktable'});
}]);
