module.exports = function (json, g, path, color) {

  g.selectAll("path")
      .data(json.features, function(d){return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .style("fill", "none")
      .style("stroke-width", "0.01")
      .style("stroke", color)
      .attr("id", function(d){return d.properties.GEOID10;});

}
