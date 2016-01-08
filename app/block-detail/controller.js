
define([], function() {
  function BlockDetailController($scope,$http,$routeParams) {
    var controller=this;
    var currentBlock;
    $scope.scoreData;

    $http.get('https://blockexplorer.com/api/block/'+$routeParams.blockid).success(function(data) {
      controller.currentBlock = data;
      $scope.scoreData=data.tx;
    });
  }

  BlockDetailController.$inject=['$scope','$http','$routeParams'];

  return BlockDetailController;
});
