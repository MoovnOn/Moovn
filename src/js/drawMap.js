var topojson = require('topojson');
module.exports = function (json, g, path, color, sw, topo) {

  if (topo === true){
    //console.log(topojson.feature(json, json.objects.us).features)
    data = topojson.feature(json, json.objects.us).features//.features

    g.selectAll("path")
        .data(data)//, function(d){return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .style("fill", "none")
        //.style("stroke-width", sw + "px")//"0.01")
        .style("stroke", color)
        .attr("id", function(d){return d.properties.GEOID10;});


  }else{
    data = json.features


  g.selectAll("path")
      .data(data, function(d){return d.properties.GEOID10;})
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .style("fill", "none")
      //.style("stroke-width", sw + "px")//"0.01")
      .style("stroke", color)
      .attr("id", function(d){return d.properties.GEOID10;});

  }
}
