

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

          var width = 640,
          height = 480;

          var nodes = [];

          var links = [];

          var generateLinksAndNodes = function(data){
              var numOfTxs=data.length;
              for(var i = 0; i < numOfTxs; i++){
                var obj={source:i,target:i+1};
                console.log("Height "+i*height/3)
                var emptyObj={x:width/2,y:i*height/3};
                nodes.push(emptyObj);
                if(i<numOfTxs-1){
                  links.push(obj);
                }
              }
          }


          d3Service.d3().then(function(d3) {

          scope.render = function(data) {
            if(!(!data)){
              generateLinksAndNodes(data);

              var svg = d3.select(ele[0]).append('svg')
              .attr("width", width)
              .attr("height", height)
              .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
              .append("g");

              function zoom() {
                  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
              }

              var force = d3.layout.force()
                  .size([width, height])
                  .nodes(nodes)
                  .links(links);

              force.gravity(0);
              force.linkDistance(140);

              var link = svg.selectAll('.link')
                  .data(links)
                  .enter().append('line')
                  .attr('class', 'link');


              var node = svg.selectAll('.node')
                  .data(nodes)
                  .enter().append('circle')
                  .attr('class', 'node');

              force.on('tick', function() {

                  node.attr('r', width/100)
                      .attr('cx', function(d) { return d.x; })
                      .attr('cy', function(d) { return d.y; });


                  link.attr('x1', function(d) { return d.source.x; })
                      .attr('y1', function(d) { return d.source.y; })
                      .attr('x2', function(d) { return d.target.x; })
                      .attr('y2', function(d) { return d.target.y; });


              });

              force.start();
          }

          };

           //Watch 'data' and run scope.render(newVal) whenever it changes
           //Use true for 'objectEquality' property so comparisons are done on equality and not reference
            scope.$watch('data', function(){
                scope.render(scope.data);
            }, true);

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
