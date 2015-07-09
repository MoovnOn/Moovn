var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');
module.exports = function(state, city) {
	console.log(state);
  console.log(city);
  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);
  
  function parseHousing(allHousingData){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
    var housingRealEstate= allHousingData["Demographics:demographics"].response.pages.page[1].tables.table;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;
    
    var housingAffordCondo = housingAfford[2].values.city.value["#text"];
    var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
    var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
    var housingAfford4Bed = housingAfford[5].values.city.value["#text"];
    
    console.log(housingAfford);
    console.log(housingRealEstate);
    console.log(housingPeople);

    var chart = c3.generate({
        bindto: 'body .city-chart-container',
        data: {

          columns: [
              ['Condo', housingAffordCondo],
              ['2-Bed-Home', housingAfford2Bed],
              ['3-Bed-Home', housingAfford3Bed],
              ['4-Bed-Home', housingAfford4Bed],
          ],
          type: 'bar'
        },
        axis: {
            x: {
                type: 'bar',
                tick: {
                  format: d3.format("Median")
                  },
                label: {
                text: 'Median Home Values',
                position: 'outer-center',
                },
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
       });
       
       
       $('#chartType').change( function(){ 
         if ($('#cell').is(':selected')){
              chart.load({
          columns: [
              ['Verizon', 130, 120, 150, 200],
              ['ATT', 30, 20, 50, 40, 60, 50],
              ['T-Mobile', 30, 20, 50, 40, 60, 50],
          ],
          unload: ['Median-Condo-Value', 'Median-2-Bed-Home','Median-3-Bed-Home','Median-4-Bed-Home'],
          
          });

         }
       })
       

 
  
  }
};

