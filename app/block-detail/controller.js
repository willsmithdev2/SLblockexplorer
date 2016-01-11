
define([], function() {
  function BlockDetailController($scope,$http,$routeParams) {
    var controller=this;
    var currentBlock;
    $scope.transactions;
    var isBlockValid;
    controller.showButton=true;
    controller.hashMessage=""

    $http.get('https://blockexplorer.com/api/block/'+$routeParams.blockid).success(function(data) {
      controller.currentBlock = data;
      $scope.transactions=data.tx;
    });

    controller.checkHash=function(){
      $http.post('http://localhost:3000/api/validate-hash',controller.currentBlock).success(function(data) {
        controller.isBlockValid=data[0].isHashValid;
        if(controller.isBlockValid){
          controller.hashMessage="This blocks hash is valid";
        }else{
          controller.hashMessage="This blocks hash is not valid!";
        }
        controller.showButton=false;
      });
    }
  }

  BlockDetailController.$inject=['$scope','$http','$routeParams'];

  return BlockDetailController;
});
