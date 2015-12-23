

angular.module("detailedBlock", ["ngRoute","d3"])
.controller('DetailedBlockController',  ['$scope','$http', '$routeParams', function($scope,$http, $routeParams) {
    var controller=this;
    var currentBlock;
    $scope.scoreData;

    $http.get('https://blockexplorer.com/api/block/'+$routeParams.blockid).success(function(data) {
      controller.currentBlock = data;
      $scope.scoreData=data.tx;
    });
  }])
  .directive('d3Bars', ['$window', '$timeout', 'd3Service',
    function($window, $timeout, d3Service) {
      return {
        restrict: 'EA',
        scope: {
          data:'='
        },
        link: function(scope, ele, attrs) {
          d3Service.d3().then(function(d3) {
            var renderTimeout;
            var svg = d3.select(ele[0]).append('svg');
            svg.style("width", 500)
            svg.style("height", 500);


            $window.onresize = function() {
              scope.$apply();
            };
            scope.$watch(function() {
              return angular.element($window)[0].innerWidth;
            }, function() {
              scope.render(scope.data);
            });


            scope.$watch('data', function(newData) {
              scope.render(newData);
            }, true);

            scope.render = function(data) {
              svg.selectAll('*').remove();

              if (!data) return;
              if (renderTimeout) clearTimeout(renderTimeout);

              renderTimeout = $timeout(function() {
              svg.selectAll('rect')
                .data(data).enter()
                .append('rect')
                .attr('height', 20)
                .attr('width', 20)
                .attr('x', function(d,i) {
                    return Math.floor(i % 5) * 100;
                })
                .attr('y',  function(d,i) {
                    return Math.floor(i / 5) * 100;
                });
              }, 200);
            };
          });
        }}
  }]);


  angular.module('d3', [])
  .factory('d3Service', ['$document', '$window', '$q', '$rootScope',
    function($document, $window, $q, $rootScope) {
      var d = $q.defer(),
          d3service = {
            d3: function() { return d.promise; }
          };
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve($window.d3); });
    }
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return d3service;
  }]);
