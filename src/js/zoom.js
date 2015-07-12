module.exports = function (cityjson, boundaryjson, g, path, height, width){

  console.log(boundaryjson)

  var bounds1 = path.bounds(cityjson);
  var bounds2 = path.bounds(boundaryjson);

  console.log(bounds2)

  var dx = function (bound) {
    return bound[1][0] - bound[0][0];
  }
  var dy = function (bound){
    return bound[1][1] - bound[0][1];
  }

  if(dx(bounds1) * dy(bounds1) >= dx(bounds2) * dy(bounds2)){
    var bounds = bounds1;
  }else{
    var bounds = bounds2;
  }

    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0])/2,
    y = (bounds[0][1] + bounds[1][1])/2,
    scale = .85 / Math.max( dx / width, dy / height),
    translate = [width / 2 - scale * x, height / 2 - scale * y];

  g.transition()
   .duration(1000)
   .style("stroke-width", 1.5/ scale + "px")
   .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

}
