var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var autocomplete = require('jquery-ui');
var tags = require('../city-list');

router.route('', 'search', function (){
  show('search');
  
  $('.header-home').fadeIn(600);
  $('.search-page-container').fadeIn(600);
  
  $('.compare').on('click', function(e) {
  	e.preventDefault();

  	$('.search-city-comp').removeClass('hidden');
  	$('.search-city-comp').addClass(' show-input');
  	$(this).addClass('hidden');
  });

  $('.search-form').on('submit', function(e) {
  	e.preventDefault();

  	var searchCity = $('.search-city').val();
  	var compareCity = $('.search-city-comp').val();

    if ((searchCity != '' && compareCity === '') && (/[\w ]+, \w{2}/.test(searchCity) === false)) {
      alert('Please enter city name followed by 2 digit state code')
    } else if ((searchCity != '' && compareCity != '') && (/[\w ]+, \w{2}/.test(searchCity) === false || /[\w ]+, \w{2}/.test(compareCity) === false )) {
      alert('Please enter city name followed by 2 digit state code')
    } else {
      routeToPages()
    }
    
    function routeToPages() {
    	if (compareCity != '' && searchCity != '') {
    		router.navigate("search/" + searchCity + "/" + compareCity, {trigger: true});
    	} else if (compareCity === '' && searchCity != '') {
    		router.navigate("search/" + searchCity, {trigger: true});
    	} else {
    		alert('Please enter the city you would like to see');
    	}
    };






  });

      $("#tags").autocomplete({
        source: availableTags,
        messages: {
          noResults: '',
          results: function() {}
          },
         
      });
       $("#tags2").autocomplete({
        source: availableTags,
        messages: {
          noResults: '',
          results: function() {}
          }
      });

});
