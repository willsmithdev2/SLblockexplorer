

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
  .directive('d3Bars', ['$window', '$timeout', 'd3Service', "$http",
    function($window, $timeout, d3Service,$http) {
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
                var node={x:width/3,y:i*height/3, hash:data[i]};
                nodes.push(node);
                if(i<numOfTxs-1){
                  links.push(obj);
                }
              }
          }

          d3Service.d3().then(function(d3) {

         //Watch 'data' and run scope.render whenever it changes
          scope.$watch('data', function(){
              scope.render(scope.data);
          }, true);

          scope.render = function(data) {
            if(!(!data)){

              generateLinksAndNodes(data);

              var svg = d3.select(ele[0]).append('svg')
              .attr("width", width)
              .attr("height", height)
              .call(d3.behavior.zoom().scaleExtent([0.5, 8]).on("zoom", zoom))
              .append("g");

              var force = d3.layout.force()
                  .size([width, height])
                  .nodes(nodes)
                  .links(links);

              force.gravity(0);
              force.linkDistance(height/3-20);

              var link = svg.selectAll('.link')
                  .data(links)
                  .enter().append('line')
                  .attr('class', 'link');

              var node = svg.selectAll('g.node')
                  .data(nodes)
                  .enter()
                  .append("g")
                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


              node.append("circle")
              .attr('class', 'node')
              .on("click", click);


              var texts = svg.selectAll("text.label")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .attr("fill", "black");


              force.on('end', function() {

                  node.selectAll(".node")
                      .attr('r', width/100);

                  link.attr('x1', function(d) { return d.source.x; })
                      .attr('y1', function(d) { return d.source.y-80; })
                      .attr('x2', function(d) { return d.target.x; })
                      .attr('y2', function(d) { return d.target.y+13; });

                  texts.text(function(d) {  return d.hash;  })
                  .attr("transform", function(d) {
                      return "translate(" + (d.x+30) + "," + (d.y) + ")";
                  });
              });

              force.start();


              function zoom() {
                  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
              }


              function click(data) {
                  //reset other elements
                  d3.selectAll('.node')
                  .style('fill', null)
                  .attr("r", width/100);

                  node.selectAll('.coinValue')
                  .remove();

                  //fill in blue
                  d3.select(this).transition()
                  .duration(750)
                  .attr("r", 30)
                  .style("fill", "lightsteelblue");

                  $http.get('https://blockexplorer.com/api/tx/'+data.hash).success(function(txResult) {
                    node.filter(function (o) {return o.index === data.index;})
                    .append("text")
                    .attr("class", "coinValue")
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .text(Math.round(txResult.valueOut*10)/100);
                  });
              }
            }
          }
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
