define([], function() {

  function D3Directive($window, $timeout, $http,d3Service) {
    return {
      restrict: 'E',
      scope: {
        data:'=',
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
            var node={x:(width/2) ,y:i*100, hash:data[i]};
            nodes.push(node);
            if(i<numOfTxs-1){
              links.push(obj);
            }
          }
        }

        function enlargeNodeAndGetTxValue(allNodes,currentNodeData,circleSVG) {
          //reset other elements
          allNodes.selectAll('.node')
          .style('fill', null)
          .attr("r", width/100);

          allNodes.selectAll('.coinValue')
          .remove();

          //fill in blue
          d3.select(circleSVG).transition()
          .duration(750)
          .attr("r", 30)
          .style("fill", "lightsteelblue");

          $http.get('https://blockexplorer.com/api/tx/'+currentNodeData.hash).success(function(txResult) {
            allNodes.filter(function (o) {return o.index === currentNodeData.index;})
            .append("text")
            .attr("class", "coinValue")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text(Math.round(txResult.valueOut*10)/100);
          });
        }

        function zoom(svg) {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
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
              .call(d3.behavior.zoom().scaleExtent([0.5, 8]).on("zoom", function() {zoom(svg)}))
              .append("g");

              var force = d3.layout.force()
              .size([width, height])
              .nodes(nodes)
              .links(links);

              force.gravity(0);
              force.linkDistance(100);

              var link = svg.selectAll('.link')
              .data(links)
              .enter().append('line')
              .attr('class', 'link');

              var allNodes = svg.selectAll('g.node')
              .data(nodes)
              .enter()
              .append("g");

              var texts = allNodes.append("text")
              .attr("class", "label")
              .attr("fill", "black")
              .attr("text-anchor", "middle");

              force.on('end', function() {
                allNodes.append("circle")
                .attr('class', 'node')
                .on("click", function(currentNodeData) {enlargeNodeAndGetTxValue(allNodes,currentNodeData,this);});

                allNodes.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
                allNodes.selectAll(".node")
                .attr('r', width/100);

                link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

                texts.text(function(d) {  return d.hash;  })
                .attr("transform", function(d) {
                  return "translate(" + (220) + "," + (0) + ")";
                });
              });

              force.start();
            }
          }
        });
      }
    }
  }

  D3Directive.$inject=['$window', '$timeout','$http', 'd3Service'];
  return D3Directive;
});
