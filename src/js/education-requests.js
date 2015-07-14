var $ = require('jquery')
var housing = require('./graphs/neigh-housing')

module.exports = function(state, city, id, coords){

$.ajax({
  method: "GET",
  url: "api/nearbyschools/" + state + "/" + city + "/?lat=" + coords[1] +
  "&lon=" + coords[0] //+ "&radius=" + 2, // min might be 5 miles
}).then(function(data){console.log(data);});

}
