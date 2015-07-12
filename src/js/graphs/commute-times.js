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
    console.log(housingResponse);
    
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;    
    var housingPeopleCommute = housingPeople[0].data.attribute[6].values.city.value;
    var housingPeopleCommuteNation = housingPeople[0].data.attribute[6].values.nation.value;
       

      c3.generate({
        bindto: 'body .duo-1',
        data: {
          columns: [
              ['Commute-Time-City', housingPeopleCommute],
              ['Commute-Time-Nation', housingPeopleCommuteNation],              
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

