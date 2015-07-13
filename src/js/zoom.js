var d3 = require('d3')
module.exports = function (cityjson, boundaryjson, g, path, height, width){

  var x = d3.scale.linear()
      .domain([0, width])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([0, height])
      .range([0, height]);

  var zoomMap = d3.behavior.zoom()
      .x(x)
      .y(y)
      .size([width, height])
      .on("zoom", zoomed);

var clicked = function (){

    var bounds1 = path.bounds(cityjson);
    var bounds2 = path.bounds(boundaryjson);

    var dx = function (bound) {
      return bound[1][0] - bound[0][0];
    }
    var dy = function (bound){
      return bound[1][1] - bound[0][1];
    }

    if(dx(bounds1) * dy(bounds1) >= dx(bounds2) * dy(bounds2)){
      var bounds = bounds1;
    }else{
      var bounds = bounds2;
    }

      var x = (bounds[0][0] + bounds[1][0])/2;
      var y = (bounds[0][1] + bounds[1][1])/2;
      var scale = .85 / Math.max( dx(bounds) / width, dy(bounds) / height);
      var translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
     .duration(250)
     //.style("stroke-width", 1.5/ scale + "px")
     .call(zoomMap.translate(translate).scale(scale).event);

    //zoomed(translate, scale);

}

  function zoomed(translate, scale){

    g.style("stroke-width", 1.5 / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

  };

  clicked();

}
