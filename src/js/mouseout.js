var $ = require('jQuery')
module.exports = function (d){

  d3.select($("#" + d.properties.GEOID10)[0]).style("fill", "grey")

}
