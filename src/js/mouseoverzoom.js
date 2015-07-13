var $ = require('jQuery');
var mouseout = require('./mouseout');
var neighborhoodRequests = require('./neighborhood-requests')

module.exports = function (d, path, g, height, width, zoomout, state, city){

  //console.log(d)
  var bounds = path.bounds(d);
  if (d3.select($("#" + d.properties['GEOID10'])[0]).classed("active")){
    mouseout(d);
    zoomout();
  } else {
    d3.selectAll(".feature-neighborhood").classed("active", false).style("fill", "grey")
    d3.select($("#" + d.properties['GEOID10'])[0]).classed("active", true)
    .style("fill", "orange")


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

    var clicked = function (){

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
    var ident = d3.geo.path().projection({stream: function(d){return d;}})
    neighborhoodRequests(state, city, d.properties['GEOID10'], ident.centroid(d));
  }

}
