var c3 = require('c3');
var $ = require('jquery');
module.exports = function() {
	$.ajax({
    url: '/api/homeprices/NC/Durham/',
    method: 'GET'
  })
  .then(parseHousing);
  
  function parseHousing(allHousingData){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
    var housingRealEstate= allHousingData["Demographics:demographics"].response.pages.page[1].tables.table;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;
    
    console.log(housingAfford);
    console.log(housingRealEstate);
    console.log(housingPeople);
    
    var housingAffordCondo = housingAfford[2].values.city.value["#text"];
    var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
    var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
    var housingAfford4Bed = housingAfford[5].values.city.value["#text"];
    
  
  
      var chart = c3.generate({
        bindto: 'body .city-chart-container',
        data: {
          
          columns: [
              ['Median-Condo-Value', housingAffordCondo],
              ['Median-2-Bed-Home', housingAfford2Bed],
              ['Median-3-Bed-Home', housingAfford3Bed],
              ['Median-4-Bed-Home', housingAfford4Bed],
          ],
          type: 'bar'
        },
          size: {
        		height: 400
      		},
          
       });
       
       
       $('#chartType').change( function(){ 
         if ($('#cell').is(':selected')){
              chart.load({
          columns: [
              ['Verizon', 130, 120, 150, 140000, 160000, 200000],
              ['ATT', 30, 20, 50, 40, 60, 50],
              ['T-Mobile', 30, 20, 50, 40, 60, 50],
          ],
          unload: ['Median-Condo-Value', 'Median-2-Bed-Home','Median-3-Bed-Home','Median-4-Bed-Home'],
          
          });

         }
       })
       

 
  
  }
};