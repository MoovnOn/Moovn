var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city) {

  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;    
    var housingPeopleCommute = housingPeople[0].data.attribute[6].values.city.value;
    var housingPeopleCommuteNation = housingPeople[0].data.attribute[6].values.nation.value;

      c3.generate({
        bindto: '.overview-graph1',
        data: {
          columns: [
              ['City Commute', housingPeopleCommute],
              ['National Commute', housingPeopleCommuteNation]
          ],
          type: 'bar'
        },
        axis: {
            x: {
            type: 'category',
            categories: ['Median Commute Times']
        	},
            y: {
              label: 'minutes'
            },
          },
          size: {
        		height: 400
      		},
       });
            


    

  
  }
};

