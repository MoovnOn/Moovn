module.exports = function (json, g, path) {

  g.selectAll("path")
      .data(json.features, function(d) {return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .style("fill", "none")
      .style("stroke-width", "0.001")
      .style("stroke", "black")
      .attr("id", function(d) {return d.properties.GEOID10;});

};