var topojson = require('./topojson')

module.exports = function (json, g, path, color, type, height, width) {

  var data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);

  var fill;
  var stroke;
  var opacity = 1;

  if (type === "US"){
    fill = "none";
    stroke = "black";
  }else if (type === "city"){
    fill = "darkgreen";
    stroke = "none";
    opacity = .4;
  }else{
    fill = "grey";
    stroke = "white";
  }

  if (type !== "neighborhood"){

    g.selectAll("path")
        .data(data.features, function (d) { return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature-" + type)
        .style("fill", fill)
        .style("fill-opacity", opacity)
        .style("stroke", stroke)
        .attr("id", function (d) { return d.properties.GEOID10;});

  }else{

    var neighG = g.append("g");

    neighG.attr("class", "neighborhoods");

    neighG.selectAll("path")
        .data(data.features, function (d) { return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature-" + type)
        .style("fill", fill)
        .style("fill-opacity", opacity)
        .style("stroke", stroke)
        .style("stroke-opacity", 0.1)
        .attr("id", function (d) { return d.properties.GEOID10;});

    var text = neighG.append("g")

    var scale = function (b) {
      return Math.min(width / (b[1][0] - b[0][0]), height / (b[1][1] - b[0][1]));
    };

    text.selectAll("text")
      .data(data.features)
    .enter().append("text")
      .attr("transform", function (d) { return "translate(" + path.centroid(d) +
            ")scale(" + 3 / (scale(path.bounds(d))) +")";})
      .attr("id", function (d) { return d.properties.GEOID10 + "T";})
      .attr("opacity", 0)
      .attr("class", "maptext")
      .style("user-select", "none")
      .attr("text-anchor", "middle")
      .text(function (d) { return d.properties.NAME;});

    var neighT = neighG.append("g")
    neighT.selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature-" + type + "TP")
        .style("fill", "white")
        .style("fill-opacity", 0)
        .style("stroke", "none")
        .attr("id", function (d) { return d.properties.GEOID10 + "TP";});

  }

  return data;

};
