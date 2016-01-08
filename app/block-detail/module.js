
define(['angular', './controller', './directive'],
    function(angular, BlockDetailController, BlockDetailDirective){
    'use strict';

    var app = angular.module('BlockDetailModule', ['ngRoute']);

    app.controller('BlockDetailCtrl', BlockDetailController);
    app.directive('blockDetail', BlockDetailDirective);
});
