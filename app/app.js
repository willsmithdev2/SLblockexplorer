'use strict';

angular.module('blockExplorer', ['ngRoute', "blockTable","detailedBlock"]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blocktable', {
    templateUrl: 'blocktable/view.html',
    controller: 'BlockTableController',
    controllerAs:"blockTableCtrl"
  })
  .when('/blocktable/detail/:blockid',{
    templateUrl:"blockDetailed/detailedView.html",
    controller:"DetailedBlockController",
    controllerAs:"detailedCtrl"
  })
  .otherwise({redirectTo: '/blocktable'});
}]);
