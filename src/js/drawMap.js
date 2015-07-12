var topojson = require('topojson');
module.exports = function (json, g, path, color, topo, type) {
  //console.log(json)
  if (topo === true){

    data = topojson.feature(json, json.objects.us).features//.features
    //console.log(data)

    g.selectAll("path")
        .data(data)//, function(d){return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature" + type)
        .style("fill", "none")
        .style("stroke", color)
        .attr("id", function(d){return d.properties.GEOID10;});


  }else{
    data = json.features


  g.selectAll("path")
      .data(data, function(d){return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature" + type)
      .style("fill", "none")

      .style("stroke", color)
      .attr("id", function(d){return d.properties.GEOID10;});

  }
}
