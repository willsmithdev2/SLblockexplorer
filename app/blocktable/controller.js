

angular.module("blockTable", ["ngRoute"])
.controller('BlockTableController',  function($http) {
    var controller=this;
    var latestBlock;
    var blockChain

    $http.get('resources/latest-block.json').success(function(data) {
      controller.latestBlock = data;
    });

    this.generateBlockChain= function(block){


    };
  });
