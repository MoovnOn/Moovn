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
    var liveshere0name = housingResponse[2].segmentation.liveshere[0].name;
    var liveshere1 = housingResponse[2].segmentation.liveshere[1].description;
    var liveshere1name = housingResponse[2].segmentation.liveshere[1].name;
    var liveshere2 = housingResponse[2].segmentation.liveshere[2].description;
    var liveshere2name = housingResponse[2].segmentation.liveshere[2].name;
    var liveshere3 = housingResponse[2].segmentation.liveshere[3].description;
    var liveshere3name = housingResponse[2].segmentation.liveshere[3].name;
    var liveshere4 = housingResponse[2].segmentation.liveshere[4].description;
    var liveshere4name = housingResponse[2].segmentation.liveshere[4].name;
    



  $(".tab-title1").html('<a href="#tab-1" class="r-tabs-anchor">People Who Live Here</a>');
  $(".tab-data1").append(
    liveshere0name + "<br><p>" + liveshere0 + "</p><br>" +
    liveshere1name + "<br><p>" + liveshere1 + "</p><br>" +
    liveshere2name + "<br><p>" + liveshere2 + "</p><br>" +
    liveshere3name + "<br><p>" + liveshere3 + "</p><br>" +
    liveshere4name + "<br><p>" + liveshere4 + "</p><br>"
    );
            
  }
};

