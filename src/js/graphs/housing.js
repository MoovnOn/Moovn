var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, element) {

    $.ajax({
      method: 'GET',
      url: '/api/homeprices/' + state + '/' + city + '/'
    })
    .then(function(d){
      parseHousing(d);
    });


  function parseHousing(allHousingData){
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
      
      try {
            var housingAffordCondo = housingAfford[2].values.city.value["#text"];
      } catch (error) {
        // console.log(error);
        housingAffordCondo = 0;
      }
      try {
          var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
      } catch (error) {
        // console.log(error);
        housingAfford2Bed = 0;
      }
      try {
          var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
      } catch (error) {
        // console.log(error);
        housingAfford3Bed = 0;
      }
      try {
          var housingAfford4Bed = housingAfford[5].values.city.value["#text"];
      } catch (error) {
        // console.log(error);
        housingAfford4Bed = 0;
      }
      
     if(housingAffordCondo + housingAfford2Bed + housingAfford3Bed + housingAfford4Bed == 0){
        $(element).html("<p>Sorry, no data is available for this area.</p>");
     }else{

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
                  'Condo': '#B1D3DD',
                  '2-Bed': '#BDBBC3',
                  '3-Bed': '#51ABD2',
                  '4-Bed': '#55818F',
                },
              },
              axis: {
                x: {
                  type: 'category',
                  categories: ['Median Housing Prices']
              	},
                  y : {
                    tick: {
                      format: d3.format("$,"),
                    }
                  }
                },
                size: {
              		height: 400
            		},
             }
           }

      var chart = c3.generate(data);
      return data;
      
 

  }; 
};
