

angular.module("detailedBlock", ["ngRoute"])
.controller('DetailedBlockController',  ['$http', '$routeParams', function($http, $routeParams) {
    var controller=this;
    var currentBlock;
    $http.get('https://blockexplorer.com/api/block/'+$routeParams.blockid).success(function(data) {
      controller.currentBlock = data;
    });
  }]);
