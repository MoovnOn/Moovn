var topojson = require('topojson')

module.exports = function (json, g, path, color, type) {
  //console.log(json)
  //console.log(json.objects[Object.keys(json.objects)[0]])

  var data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]])

  g.selectAll("path")
      .data(data.features, function(d){return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature" + type)
      .style("fill", "none")
      .style("stroke", color)
      .attr("id", function(d){return d.properties.GEOID10;});

  return data;

};
