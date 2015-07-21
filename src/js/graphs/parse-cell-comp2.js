var $ = require('jquery');
var c3 = require('c3');
var topojson = require('../topojson');
var parse2 = require('./parse-cell-2');
var downloadGraph = require('./cell-download-comp');
var reliabilityGraph = require('./cell-reliability');
var maxCompare = require('./cell-comp-max');


module.exports = function (state1, city1, state2, city2, el1, el2) {
  var centroid = [];
  var newArray = [];
  var newArray2 = [];

  var dataArray = [];
  var dataArray2 = [];

  Promise.all([

    $.ajax({
      method: 'GET',
      url: 'api/boundary/' + state1 + '/' + city1 + '/'
    }).then(function (json) {

      data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);
      centroid = [data.features[0].properties.INTPTLAT10, data.features[0].properties.INTPTLON10]

    }),

  ]).then(function(results) {

    Promise.all([
    $.ajax({
      method: "GET",
      url: "api/celldata/" + state1 + "/" + city1 + "/?lat=" + centroid[0] + "&lon=" + centroid[1],
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
      var parsedData = parse2(newArray);
      dataArray.push(parsedData);
      
    Promise.all([

      $.ajax({
        method: 'GET',
        url: 'api/boundary/' + state2 + '/' + city2 + '/'
      }).then(function (json) {

        data = topojson.feature(json, json.objects[Object.keys(json.objects)[0]]);
        centroid2 = [data.features[0].properties.INTPTLAT10, data.features[0].properties.INTPTLON10]

      }),

    ]).then(function(results) {

      Promise.all([
      $.ajax({
        method: "GET",
        url: "api/celldata/" + state2 + "/" + city2 + "/?lat=" + centroid2[0] + "&lon=" + centroid2[1],
      }).then(function(data){
          var array = data.networkRank;

         array.forEach(function(prov) {
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
      var parsedData2 = parse2(newArray2);
      dataArray2.push(parsedData2);

      var maxVal = maxCompare(dataArray, dataArray2);
      console.log(maxVal);
      downloadGraph(dataArray, el1, maxVal);
      downloadGraph(dataArray2, el2, maxVal);

    });     
  

    });

  });
});
};





