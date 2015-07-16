var $ = require('jquery');
var housing = require('./graphs/neigh-housing');

module.exports = function(state, city, id, coords){

$.ajax({
  method: "GET",
  url: "api/nearbyschools/" + state + "/" + city + "/?lat=" + coords[1] +
  "&lon=" + coords[0] //+ "&radius=" + 2, // min might be 5 miles
}).then(function(data){
	var school = data.schools.school;
	console.log(school);
	school.forEach(function(school, i) {
		$('.school-info').append('<p class="school-title" data-id="' + i + '">'  + school.name + '</p>');
	});
	$('.school-title').on('click', function(){
			var id = $(this).data("id");
			var currentSchool = school[id];

			$('.school-modal-content').text('');	
			$('.school-modal').fadeIn();
			$('.school-modal-content').append(currentSchool.name);
		});
	$('.main-content').on('click', '.school-modal-x' , function(){
    		$('.school-modal').fadeOut();
  });

});

};

