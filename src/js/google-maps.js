var $ = require('jquery');

module.exports = function(state, city) {

	var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': city + ',' + state}, function(results) {
      var lat = results[0].geometry.location.lat();
     	var lon = results[0].geometry.location.lng();

	  var mapOptions = {
			zoom: 10,
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


		var request = {
	    query: "airports " + city
		};
		service = new google.maps.places.PlacesService(map);
		
			var infowindow = new google.maps.InfoWindow({
      		content: 'hello'
  			});

		service.textSearch(request, function(results) {
		  for (var i = 0; i < results.length; i++) {
	    	var place = results[i];
	    	placeLat = place.geometry.location['A'];
	    	placeLon = place.geometry.location['F'];
		  	var myLatlng = new google.maps.LatLng(placeLat, placeLon);

			 	var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!',
  		 	});

			 	var infoWindow = new google.maps.InfoWindow({
					content: place.name
			});
 
			google.maps.event.addListener(marker, 'click', function(pointer, bubble) {
				return function() {
					bubble.open(map, pointer);
				};
			}(marker, infoWindow));	
 
	  	};

		});

  });

};