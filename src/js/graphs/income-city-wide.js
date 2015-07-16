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
            
       var housingPeopleIncome= housingPeople[0].data.attribute[0].values.city.value["#text"];
       var housingPeopleIncomeNation= housingPeople[0].data.attribute[0].values.nation.value["#text"];
       // var housingPeopleCommute = housingPeople[0].data.attribute[6].values.city.value;
       // var housingPeopleCommuteNation = housingPeople[0].data.attribute[6].values.nation.value;
       
       
       c3.generate({
        bindto: element,
        data: {
          columns: [
              ['Median-City-Income', housingPeopleIncome],
              ['Median-Nation-Income', housingPeopleIncomeNation],
          ],
          type: 'bar'
        },
        axis: {
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

