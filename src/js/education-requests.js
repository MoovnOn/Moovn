var $ = require('jquery');
var housing = require('./graphs/neigh-housing');

module.exports = function(state, city, id, coords){
	var schoolList = [];

$.ajax({
  method: "GET",
  url: "api/nearbyschools/" + state + "/" + city + "/?lat=" + coords[1] +
  "&lon=" + coords[0] //+ "&radius=" + 2, // min might be 5 miles
}).then(function(data){
		var school = data.schools.school;
		$('.school-info').html('<div class="school-modal"><button class="school-modal-x close-button">X</button><div class="school-modal-content"></div></div><div class="school-info-container"></div>');
		school.forEach(function(school, i) {
			schoolList.push(school);
			$('.school-info-container').append('<p class="school-title" data-id="' + i + '">'  + school.name + '</p>');
      $('.school-info-container').fadeIn();

	});

var showDetails = function() {
	$('.school-title').on('click', function(){
      var id = $(this).data("id");
      var currentSchool = school[id];
      var modal = $('.school-modal-content');

      $('.school-info-container').fadeOut();
      $('.school-info-container').html('');

      modal.text('');
      $('.school-modal').fadeIn();
      modal.append('<h1>' + currentSchool.name + '</h1>');

      if (currentSchool.address != null && currentSchool.address != undefined) {
        modal.append('<span class="school-details">' + currentSchool.address + '</p>');
      }
      if (currentSchool.phone != null && currentSchool.phone != undefined) {        
        modal.append('<span class="school-details">' + currentSchool.phone + '</p>');
      }
      if (currentSchool.website != null && currentSchool.website != undefined) {
        modal.append('<a href="' + currentSchool.website + '" target="_blank">' + currentSchool.website + '</p><br>');
      }
      if (currentSchool.type != null && currentSchool.type != undefined) {
        modal.append('<span class="details-titles">Type: </span><span class="school-details">' + currentSchool.type + '</span><br>');
      }
      if (currentSchool.gradeRange != null && currentSchool.gradeRange != undefined) {
        modal.append('<span class="details-titles">Grade Range: </span><span class="school-details">' + currentSchool.gradeRange + '</span><br>');
      }
      if (currentSchool.enrollment != null && currentSchool.enrollment != undefined) {
        modal.append('<span class="details-titles">Enrollment: </span><span class="school-details">' + currentSchool.enrollment + '</span><br>');
      }
      if (currentSchool.parentRating != null && currentSchool.parentRating != undefined) {
        modal.append('<span class="details-titles">Parent Rating: </span><span class="school-details">' + currentSchool.parentRating + '</span><br>');
      }
      if (currentSchool.gsRating != null && currentSchool.gsRating != undefined) {
        modal.append('<span class="details-titles">GS Rating: </span><span class="school-details">' + currentSchool.gsRating + '</span><br>');
      }

    });
};

showDetails();

  $('.main-content').on('click', '.school-modal-x' , function(){
        $('.school-modal').fadeOut();
        schoolList.forEach(function(school, i) {
       		$('.school-info-container').append('<p class="school-title" data-id="' + i + '">'  + school.name + '</p>');
       		showDetails();
  		});
        $('.school-info-container').fadeIn(800);
  });

});

};
