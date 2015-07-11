module.exports = function (json, g, path) {

  g.selectAll("path")
      .data(json.features, function(d) {return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature-neighborhood")
      .style("fill", "none")
      //.style("stroke-width", "0.01")
      .style("stroke", "darkgrey")
      .attr("id", function(d) {return d.properties.GEOID10;});

};
