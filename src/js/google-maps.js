var $ = require('jquery');

module.exports = function(state, city) {
	

	var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': city + ',' + state}, function(results) {
      var lat = results[0].geometry.location.lat();
     	var lon = results[0].geometry.location.lng();

	  var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(lat, lon),
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false

		};

		map = new google.maps.Map(document.getElementById('google-map'), mapOptions);


  });


};