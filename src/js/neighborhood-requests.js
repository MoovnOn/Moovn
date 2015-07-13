var $ = require('jquery')
var housing = require('./graphs/neigh-housing')

module.exports = function(state, city, id, coords){

  // zillow neighborhood data
  $.ajax({
    method: "GET",
    url: "api/neighborhooddata/" + state + "/" + city + "/" + id + "/",
  }).then(function(data){
    housing(data);
  });

  $.ajax({
    method: "GET",
    url: "api/cityschools/" + state + "/" + city + "/",
  }).then(function(data){console.log(data);});


}
