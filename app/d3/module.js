define(['angular', './factory'],
    function(angular, D3Factory){
    'use strict';

    var app = angular.module('d3', ['ngRoute']);

    app.factory('d3Service', D3Factory);

});
