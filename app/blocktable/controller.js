

angular.module("blockTable", ["ngRoute"])
.controller('BlockTableController',  function($http) {
    var controller=this;
    var latestBlockHash;
    var blockChain

    $http.get('https://blockexplorer.com/api/status?q=getLastBlockHash').success(function(data) {
      controller.latestBlock = data.lastblockhash;
    });

    $http.get('resources/fakeBlockChain.json').success(function(data) {
      controller.blockChain = data;
      controller.blockChain.blockChain.reverse();
    });

    controller.getBlockData = function(data){

    }

  });
