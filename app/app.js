'use strict';

angular.module('blockExplorer', ['ngRoute', "blockTable","detailedBlock"]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blocktable', {
    templateUrl: 'views/blockTable.html',
    controller: 'BlockTableController',
    controllerAs:"blockTableCtrl"
  })
  .when('/blocktable/detail/:blockid',{
    templateUrl:"views/blockDetail.html",
    controller:"DetailedBlockController",
    controllerAs:"detailedCtrl"
  })
  .otherwise({redirectTo: '/blocktable'});
}]);
