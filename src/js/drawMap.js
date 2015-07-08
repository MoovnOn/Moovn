module.exports = function (data) {

var svg = d3.select("svg");
	  var height = 400;
	  var width = 400;
	  svg.attr("width", width).attr("height", height);
	  var g = svg.append("g");
	  var projection = d3.geo.albers().scale(400).translate([150,140]);
	  var path = d3.geo.path().projection(projection);	

    var b = path.bounds(data);

    g.append("rect").attr('width', width).attr('height', height)
       .style('stroke', 'black').style('fill', 'blue');

    g.selectAll("path")
        .data(data.features, function(d){return d.properties.GEOID10;})
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .style("fill", "green")
        .style("stroke-width", "1")
        .style("stroke", "none")
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