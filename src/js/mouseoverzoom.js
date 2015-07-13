var $ = require('jQuery')
module.exports = function (d, path, g, height, width){

  var bounds = path.bounds(d);
  //console.log(d);
  //item = $.("#" + d.properties['GEOID10'])
  console.log(d3.select($("#" + d.properties['GEOID10'])))
  d3.select($("#" + d.properties['GEOID10'])[0]).style("fill", "orange")


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

    var dx = function (bound) {
      return bound[1][0] - bound[0][0];
    }
    var dy = function (bound){
      return bound[1][1] - bound[0][1];
    }
    var center_x = function (bound) {
      return (bound[0][0] + bound[1][0])/2;
    }
    var center_y = function (bound) {
      return (bound[0][1] + bound[1][1])/2;
    }


    var scale = .5 / Math.max( dx(bounds) / width, dy(bounds) / height);
    var translate = [width / 2 - scale * center_x(bounds), height / 2 - scale * center_y(bounds)];

    g.transition()
     .duration(250)
     .call(zoomMap.translate(translate).scale(scale).event);

}

  function zoomed(translate, scale){

    g.style("stroke-width", 1.5 / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

  };

  clicked();

}
