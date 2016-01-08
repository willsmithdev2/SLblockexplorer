'use strict';

define([
	'angular',
	'angularRoute',
	'block-detail/module',
	'block-table/module'
], function(angular, angularRoute, BlockDetailController, BlockTableController) {

	return angular.module('blockExplorer', [
		'ngRoute',
		'BlockDetailModule',
		'BlockTableModule'
	]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/blocktable', {
      template: "<block-table></block-table>"
    })
    .when('/blocktable/detail/:blockid',{
			template: "<block-detail></block-detail>"
    })
    .otherwise({redirectTo: '/blocktable'});
	}]);
});
