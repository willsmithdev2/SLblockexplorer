

angular.module("detailedBlock", ["ngRoute","d3"])
.controller('DetailedBlockController',  ['$scope','$http', '$routeParams', function($scope,$http, $routeParams) {
    var controller=this;
    var currentBlock;
    $scope.scoreData = [
      {name: "Greg", score: 98},
      {name: "Ari", score: 96},
      {name: 'Q', score: 75},
      {name: "Loser", score: 48}
    ];

    $http.get('https://blockexplorer.com/api/block/'+$routeParams.blockid).success(function(data) {
      controller.currentBlock = data;
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
            // hard-code data
            var renderTimeout;
            var margin = parseInt(attrs.margin) || 20,
                barHeight = parseInt(attrs.barHeight) || 20,
                barPadding = parseInt(attrs.barPadding) || 5;

            var svg = d3.select(ele[0])
              .append('svg')
              .style('width', '100%');

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
                var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                    height = scope.data.length * (barHeight + barPadding),
                    color = d3.scale.category20(),
                    xScale = d3.scale.linear()
                      .domain([0, d3.max(data, function(d) {
                        return d.score;
                      })])
                      .range([0, width]);

                svg.attr('height', height);

                svg.selectAll('rect')
                  .data(data)
                  .enter()
                    .append('rect')
                    .on('click', function(d,i) {
                      return scope.onClick({item: d});
                    })
                    .attr('height', barHeight)
                    .attr('width', 140)
                    .attr('x', Math.round(margin/2))
                    .attr('y', function(d,i) {
                      return i * (barHeight + barPadding);
                    })
                    .attr('fill', function(d) {
                      return color(d.score);
                    })
                    .transition()
                      .duration(1000)
                      .attr('width', function(d) {
                        return xScale(d.score);
                      });
                svg.selectAll('text')
                  .data(data)
                  .enter()
                    .append('text')
                    .attr('fill', '#fff')
                    .attr('y', function(d,i) {
                      return i * (barHeight + barPadding) + 15;
                    })
                    .attr('x', 15)
                    .text(function(d) {
                      return d.name + " (scored: " + d.score + ")";
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
