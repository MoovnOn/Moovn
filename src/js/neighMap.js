var topojson = require('topojson')

module.exports = function (json, g, path, color, type) {

  var data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]])

  var fill;
  var stroke;
  var opacity = 1;

  if (type === "US"){
    fill = "none";
    stroke = "black";
  }else if (type === "city"){
    fill = "brown";
    stroke = "none";
    opacity = .4;
  }else{
    fill = "grey";
    stroke = "none";
  }

  g.selectAll("path")
      .data(data.features, function(d){return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature" + type)
      .style("fill", fill)
      .style("fill-opacity", opacity)
      .style("stroke", stroke)
      .attr("id", function(d){return d.properties.GEOID10;});

  return data;

};
