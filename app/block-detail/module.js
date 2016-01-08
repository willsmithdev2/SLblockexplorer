
define(['angular', './controller', './directive', '../d3/module','./d3Directive'],
    function(angular, BlockDetailController, BlockDetailDirective, d3,D3Directive){
    'use strict';

    var app = angular.module('BlockDetailModule', ['ngRoute',"d3"]);
    app.directive('d3Bars',D3Directive);
    app.controller('BlockDetailCtrl', BlockDetailController);
    app.directive('blockDetail', BlockDetailDirective);

});
