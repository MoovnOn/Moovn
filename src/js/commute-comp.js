var $ = require('jquery');

module.exports = function (state, city, element) {

	$.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    // var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;    
    
    try{
      var housingPeopleCommute = housingPeople[0].data.attribute[6].values.city.value;  
    }catch(err){
      $('.overview-graph1').append('<p class="no-data-message">Sorry, no data is available in this location</p>');
      console.log(err);
    }
    $(element).append('<p>Average daily commute time is ' + Math.round(housingPeopleCommute) + ' minutes</p><br>');


};
}