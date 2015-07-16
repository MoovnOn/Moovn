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
		$('.school-info-title').css('display', 'none');
		$('.school-info').append('<h1>Local Schools</h1>');
		school.forEach(function(school, i) {
		$('.school-info').append('<p class="school-title" data-id="' + i + '">'  + school.name + '</p>');
	});
	$('.school-title').on('click', function(){
			var id = $(this).data("id");
			var currentSchool = school[id];
			var modal = $('.school-modal-content');
			modal.text('');	
			$('.school-modal').fadeIn();
			modal.append('<h1>' + currentSchool.name + '</h1>');
			modal.append('<span class="school-details">' + currentSchool.address + '</p>');
			modal.append('<span class="school-details">' + currentSchool.phone + '</p>');
			modal.append('<a href="' + currentSchool.website + '" target="_blank">' + currentSchool.website + '</p><br>');
			modal.append('<span class="details-titles">Type: </span><span class="school-details">' + currentSchool.type + '</span><br>');
			modal.append('<span class="details-titles">Grade Range: </span><span class="school-details">' + currentSchool.gradeRange + '</span><br>');
			modal.append('<span class="details-titles">Enrollment: </span><span class="school-details">' + currentSchool.enrollment + '</span><br>');
			modal.append('<span class="details-titles">Parent Rating: </span><span class="school-details">' + currentSchool.parentRating + '</span><br>');
			modal.append('<span class="details-titles">GS Rating: </span><span class="school-details">' + currentSchool.gsRating + '</span><br>');
		});
	$('.main-content').on('click', '.school-modal-x' , function(){
    		$('.school-modal').fadeOut();
  });

});

};

