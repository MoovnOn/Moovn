var $ = require('jquery');
var c3 = require('c3');
var topojson = require('../topojson')
var parse2 = require('./parse-cell-2')
var downloadGraph = require('./cell-download');
var reliabilityGraph = require('./cell-reliability');


module.exports = function (state, city) {
  var centroid = [];
  var newArray = [];

  Promise.all([

    $.ajax({
      method: 'GET',
      url: 'api/boundary/' + state + '/' + city + '/'
    }).then(function (json) {

      data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);
      centroid = [data.features[0].properties.INTPTLAT10, data.features[0].properties.INTPTLON10]

    }),

  ]).then(function(results) {

    Promise.all([
    $.ajax({
      method: "GET",
      url: "api/celldata/" + state + "/" + city + "/?lat=" + centroid[0] + "&lon=" + centroid[1],
    }).then(function(data){
        var array = data.networkRank;

       array.forEach(function(prov) {
         if (prov.networkName === "AT&T") {
           newArray[0] = prov;
         }
         if (prov.networkName === "Verizon") {
           newArray[1] = prov;
         }
         if (prov.networkName === "Sprint") {
           newArray[2] = prov;
         }
         if (prov.networkName === "T-Mobile") {
           newArray[3] = prov;
         }
       })

    }),

  ]).then(function(results){
      console.log(newArray)
      var data2 = parse2(newArray);
      console.log(data2)
      downloadGraph(data2, '.duo-1');
      reliabilityGraph(data2, '.duo-2');

    });

  });

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
