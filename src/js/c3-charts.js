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
  }
  
  c3.generate({
    bindto: 'body .city-chart-container',
    data: {
      columns: [
          ['Median 2 Bed Home', 30, 200, 100, 400, 150, 250],
          ['data2', 400, 20, 10, 40, 15, 25]
      ],
      type: 'bar'
    },
     
    size: {
  		height: 400
		}
   
});

};