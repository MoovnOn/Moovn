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
    var housingLiveshere = allHousingData["Demographics:demographics"].response.pages.page[2].segmentation.liveshere;


    var descArr =[];     
      for (var index = 0; index < housingLiveshere.length; index++) {
          descArr.push(allHousingData["Demographics:demographics"]
            .response.pages.page[2].segmentation
            .liveshere[index].description
          );
      }
    
    var nameArr =[];     
      for (var index = 0; index < housingLiveshere.length; index++) {
          nameArr.push(allHousingData["Demographics:demographics"]
            .response.pages.page[2].segmentation
            .liveshere[index].name
          );
      }
    

  $(".people-left").append('<h1>People Who Live Here</h1>');   
    
    descArr.forEach(function(e, i) {
      $(".people-left").append("<b>" + nameArr[i] + "</b>" + "<br>");
      $(".people-left").append(descArr[i] + "<br><br>");
    });

  }
};

