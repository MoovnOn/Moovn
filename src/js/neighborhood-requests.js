var $ = require('jquery')

module.exports = function(state, city, id, coords){

  // zillow neighborhood data
  $.ajax({
    method: "GET",
    url: "api/neighborhooddata/" + state + "/" + city + "/" + id + "/",
  }).done(function(data){console.log(data);});

  // $.ajax({
  //   method: "GET",
  //   url: "api/nearbyschools/" + state + "/?" + "lat=" + coords[1] + "&lon=" + coords[0]
  // }).done(function(data){console.log(data);});

  $.ajax({
    method: "GET",
    url: "api/cityschools/" + state + "/" + city + "/",
  }).done(function(data){console.log(data);});


}
