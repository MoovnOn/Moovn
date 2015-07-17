var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, element) {
  //var data;

  //Promise.all([

    $.ajax({
      method: 'GET',
      url: '/api/homeprices/' + state + '/' + city + '/'
    })
    .then(function(d){
      parseHousing(d);
    });

//  ]).then(

  //  function (results) { data = results;}

  //);

  function parseHousing(allHousingData){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
    var housingRealEstate= allHousingData["Demographics:demographics"].response.pages.page[1].tables.table;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;

    var housingAffordCondo = housingAfford[2].values.city.value["#text"];
    var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
    var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
    var housingAfford4Bed = housingAfford[5].values.city.value["#text"];

      var data = {
        bindto: element,
        data: {
          columns: [
              ['Condo', housingAffordCondo],
              ['2-Bed', housingAfford2Bed],
              ['3-Bed', housingAfford3Bed],
              ['4-Bed', housingAfford4Bed],
          ],
          type: 'bar',
          colors: {
            'Condo': '#3D5E99',
            '2-Bed': '#CC2E14',
            '3-Bed': '#00E2FF',
            '4-Bed': '#707D94',
          },
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Median Housing Prices']
        	},
            y : {
              tick: {
                format: d3.format("$,")
              }
            }
          },
          size: {
        		height: 400
      		},
       }

      var chart = c3.generate(data);
      return data;
  };

  //return data;
};
