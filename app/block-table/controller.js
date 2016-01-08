define([], function() {
  function BlockTableController($http,$filter) {
    var controller=this;
    controller.latestBlockHash;
    controller.blockChain=[];
    controller.startingIndex=0;
    controller.currentIndex=1;
    controller.lastHash;

    $http.get('https://blockexplorer.com/api/status?q=getLastBlockHash').success(function(data) {
      controller.latestBlockHash = data.lastblockhash;
    }).then(function(result){
      controller.generateBlockChain(controller.latestBlockHash);
    });

    this.generateBlockChain = function(hash){
      $http.get('https://blockexplorer.com/api/block/'+hash).success(function(data) {
        var formattedDate=$filter('date')(data.time*1000,'dd/MM/yyyy h:mma');
        controller.blockChain.push({
          "index":controller.currentIndex,
          "hash":data.hash,
          "time": formattedDate,
          "height":data.height
        })
        controller.lastHash=data.hash;
        controller.currentIndex++;
        if(controller.blockChain.length >9 || !data.previousblockhash){
          return controller.blockChain;
        }else{
          controller.generateBlockChain(data.previousblockhash)
        }
      });
    }

    this.next10=function(){
      controller.startingIndex+=10;
      controller.blockChain=[];
      controller.generateBlockChain(controller.lastHash);
    }
  }

  BlockTableController.$inject=['$http','$filter'];

  return BlockTableController;
});
