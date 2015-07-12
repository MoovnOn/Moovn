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
    var liveshere0 = housingResponse[2].segmentation.liveshere[0].description;
    var liveshere1 = housingResponse[2].segmentation.liveshere[1].description;
    var liveshere4 = housingResponse[2].segmentation.liveshere[4].description;



  $(".tab-title1").html('<a href="#tab-1" class="r-tabs-anchor">People Who Live Here</a>');
  $(".tab-data1").append(
    "Struggling Singles" + "<p>" + liveshere0 + "</p><br>" +
    "Non-Native Newbies" + "<p>" + liveshere1 + "</p><br>" +
    "Mobile Singles" + "<p>" + liveshere4 + "</p><br>"
    );
            
  }
};

