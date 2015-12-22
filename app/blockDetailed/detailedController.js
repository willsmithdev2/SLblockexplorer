

angular.module("detailedBlock", ["ngRoute"])
.controller('DetailedBlockController',  function($http) {
    var controller=this;
    var currentBlock;
    $http.get('resources/00000000000000000a5093e24e1f43c509e2cd51dd3ec38c739a532523534.json').success(function(data) {
      controller.currentBlock = data;
    });
});
