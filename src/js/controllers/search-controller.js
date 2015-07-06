var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var autocomplete = require('jquery-ui');

router.route('', 'search', function (){
  show('search');
  $('.compare').on('click', function(e) {
  	e.preventDefault();

  	$('.search-city-comp').removeClass('hidden');
  	$('.search-city-comp').addClass(' show-input');
  	$(this).addClass('hidden');
  });

  $('.compare-form').on('submit', function(e) {
  	e.preventDefault();

  	var searchCity = $('.search-city').val();
  	var compareCity = $('.search-city-comp').val();

  	if (compareCity != '' && searchCity != '') {
  		router.navigate("search/" + searchCity + "/" + compareCity, {trigger: true});
  	} else if (compareCity === '' && searchCity != '') {		
  		router.navigate("search/" + searchCity, {trigger: true});
  	} else {
  		alert('Please enter the city you would like to see');
  	}
	});
  
    
  $(function() {
      var availableTags = [
        "Austin, TX", 
        "Durham, NC", 
        "Charlotte, NC",
        "Fort Collins, CO",
        "Colorado Springs, CO",
        "Nashville, TN",
        "Seattle, WA"
      ];
      $("#tags").autocomplete({
        source: availableTags,
        messages: {
          noResults: '',
          results: function() {}
      }
      });
       $("#tags2").autocomplete({
        source: availableTags,
        messages: {
          noResults: '',
          results: function() {}
      }
      });
  });

});
