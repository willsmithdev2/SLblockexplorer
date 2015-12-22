

angular.module("blockTable", ["ngRoute"])
.controller('BlockTableController',  function($http) {

    var controller=this;
    controller.latestBlockHash;
    controller.blockChain=[];


    $http.get('https://blockexplorer.com/api/status?q=getLastBlockHash').success(function(data) {
      controller.latestBlockHash = data.lastblockhash;
      controller.somestring=data.lastblockhash;
    }).then(function(result){
      controller.generateBlockChain(controller.latestBlockHash);
    });

    this.generateBlockChain = function(hash){
      $http.get('https://blockexplorer.com/api/block/'+hash).success(function(data) {
        controller.blockChain.push({
          "hash":data.hash,
          "time":data.time,
          "height":data.height
        })
        if(!data.previousblockhash){
          return controller.blockChain;
        }else{
          controller.generateBlockChain(data.previousblockhash)
        }
      });
    }
  });
