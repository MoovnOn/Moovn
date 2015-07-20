var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, element) {

  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;
   
      try{
    var housingPeopleIncome= housingPeople[0].data.attribute[0].values.city.value["#text"];
    }catch(err){
      $('.overview-graph3').append('<p class="no-data-message">Sorry, no data is available in this location</p>');
      console.log(err);
    }
        

    var housingPeopleIncomeNation= housingPeople[0].data.attribute[0].values.nation.value["#text"];
              
       c3.generate({
        bindto: element,
        data: {
          columns: [
              ['City Income', Math.round(housingPeopleIncome)],
              ['National Income', Math.round(housingPeopleIncomeNation)],
          ],
          type: 'bar',
          colors: {
            'City Income': '#BDBBC3',
            'National Income': '#55818F',           
          },
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Median Income of City vs. Nation']
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
       
  }
};

