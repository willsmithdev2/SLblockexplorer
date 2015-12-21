'use strict';

angular.module('blockexplorer', ['ngRoute', "blockexplorer.blocktable"]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blocktable', {
    templateUrl: 'blocktable/view.html',
    controller: 'BlockTableController',
    controllerAs:"blocktable/blockTableCtrl"

  })
  $routeProvider.otherwise({redirectTo: '/blocktable'});
}]);
