var $ = require('jquery');
var show = require('./show');


module.exports = function(id){

	map = new google.maps.Map(document.getElementById('map'));
	service = new google.maps.places.PlacesService(map);

  var request = {
  	placeId: id
	};

	service.getDetails(request, function(result, status) {
    var reviewsArr = result.reviews;
    var address = result.formatted_address;
    var phone = result.formatted_phone_number;
    var website = result.website

     $(".modal-details").fadeIn();
    
     $(".close-button").click(function(){
       $(".modal-details").fadeOut();
     });
		show('content/place-details', '.modal-details', {detail: result} );
    
	});

};