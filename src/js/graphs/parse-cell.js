var $ = require('jquery');
var c3 = require('c3');
var d3 = require('d3');

module.exports = function (state, city) {

  $.ajax({
    method: 'GET',
    url: 'api/boundary/' + state + '/' + city + '/'
  }).then(function (data) {
     
      var projection = d3.geo.albers().scale(200).translate([150,140]);
      var path = d3.geo.path().projection(projection);

      var bounds = path.bounds(data); 
      var lon = (bounds[0][0] + bounds[0][0])/2;
      var lat = (bounds[0][1] + bounds[1][1])/2;

      console.log(lat);
      console.log(lon);

  }).then(function(data) {

      console.log(data)



  })


};
  // return $.ajax({
  //  method: 'GET',
  //  url: 'api/celldata/' + state + '/' + city + '/?lat=' + lat + '&lon=' + lon
  // }).then(function (data){
  //   console.log(data)  
  //  var array = data.networkRank;
  //   var newArray = [];

  //   console.log(array);
    
  //  array.forEach(function(prov) {
  //    if (prov.networkName === "AT&T") {
  //      newArray[0] = prov
  //    }
  //    if (prov.networkName === "Verizon") {
  //      newArray[1] = prov
  //    }
  //    if (prov.networkName === "Sprint") {
  //      newArray[2] = prov
  //    }
  //    if (prov.networkName === "T-Mobile") {
  //      newArray[3] = prov
  //    }
  //  })
  //   return newArray
  // });
