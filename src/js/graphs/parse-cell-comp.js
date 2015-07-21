var $ = require('jquery');
var c3 = require('c3');
var topojson = require('../topojson')
var parse2 = require('./parse-cell-2')
var downloadGraph = require('./cell-download');
var reliabilityGraph = require('./cell-reliability');


module.exports = function (state1, city1, state2, city2, el1, el2) {
  var centroid = [];
  var newArray1 = [];
  var newArray2 = [];

  Promise.all([

    $.ajax({
      method: 'GET',
      url: 'api/boundary/' + state1 + '/' + city1 + '/'
    }).then(function (json) {

      data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);
      centroid = [data.features[0].properties.INTPTLAT10, data.features[0].properties.INTPTLON10]
    }),
    $.ajax({
      method: 'GET',
      url: 'api/boundary/' + state2 + '/' + city2 + '/'
    }).then(function (json) {

      data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);
      centroid = [data.features[0].properties.INTPTLAT10, data.features[0].properties.INTPTLON10]
    })

  ]).then(function(results) {

    Promise.all([
    $.ajax({
      method: "GET",
      url: "api/celldata/" + state1 + "/" + city1 + "/?lat=" + centroid[0] + "&lon=" + centroid[1],
    }).then(function(data){
        var array1 = data.networkRank;

       array1.forEach(function(prov) {
         if (prov.networkName === "AT&T") {
           newArray1[0] = prov;
         }
         if (prov.networkName === "Verizon") {
           newArray1[1] = prov;
         }
         if (prov.networkName === "Sprint") {
           newArray1[2] = prov;
         }
         if (prov.networkName === "T-Mobile") {
           newArray1[3] = prov;
         }
       })
       
    }),
    

    $.ajax({
      method: "GET",
      url: "api/celldata/" + state2 + "/" + city2 + "/?lat=" + centroid[0] + "&lon=" + centroids[1],
    }).then(function(data){
        var array2 = data.networkRank;

       array2.forEach(function(prov) {
         if (prov.networkName === "AT&T") {
           newArray2[0] = prov;
         }
         if (prov.networkName === "Verizon") {
           newArray2[1] = prov;
         }
         if (prov.networkName === "Sprint") {
           newArray2[2] = prov;
         }
         if (prov.networkName === "T-Mobile") {
           newArray2[3] = prov;
         }
       })
       
    })

  ]).then(function(results){
    
      var data3 = parse2(newArray1);
      var data4 = parse2(newArray2);
      console.log(newArray1)
      console.log(newArray2)

      downloadGraph(data3, el1);
      downloadGraph(data4, el2);

    //   if (el2 != undefined) {
    //     downloadGraph(data2, el1);
    //     reliabilityGraph(data2, el2);
    //   } else {
    //     downloadGraph(data2, el1);}
    });

  });

};
