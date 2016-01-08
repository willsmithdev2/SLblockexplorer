
define(['angular', './controller', './directive'],
    function(angular, BlockTableController, BlockTableDirective){
    'use strict';

    var app = angular.module('BlockTableModule', ['ngRoute']);

    app.controller('BlockTableController', BlockTableController);
    app.directive('blockTable', BlockTableDirective);

});
