$ = require('jquery');

module.exports = function (data, g, path, height, width) {

    g.selectAll("path")
        .data(data.features, function(d){return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .style("fill", "white")
        .style("stroke-width", "0.01")
        .style("stroke", "gray")
        .attr("id", function(d){return d.properties.GEOID10;});	

    var bounds = path.bounds(data),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0])/2,
      y = (bounds[0][1] + bounds[1][1])/2,
      scale = .9 / Math.max( dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
     .duration(1000)
     .style("stroke-width", 1.5/ scale + "px")
     .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

}