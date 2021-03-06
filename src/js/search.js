var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var autocomplete = require('jquery-ui');
var tags = require('./city-list');
var router = require('./router'); 


module.exports = function(){

    // var once = false;

    // $('.search-city').keypress(function() {
      
    //   if (!once) {
    //     $('.compare-option').removeClass('hidden'); 
    //     once = true;
    //   }
    
    // });  

    $('.compare-option').on('click', function(){
      $('.search-city-comp').removeClass('hidden');
      $('.search-city-comp').addClass(' show-input');
      $(this).addClass('hidden');
    })


  $('.search-form').on('submit', function(e) {
  	e.preventDefault();

  	var searchCity = $('.search-city').val();
  	var compareCity = $('.search-city-comp').val();

    if ((searchCity != '' && compareCity === '') && (/[\w ]+, \w{2}/.test(searchCity) === false)) {
      alert('Please enter city name followed by 2 digit state code')
    } else if ((searchCity != '' && compareCity != '') && (/[\w ]+, \w{2}/.test(searchCity) === false || /[\w ]+, \w{2}/.test(compareCity) === false )) {
      alert('Please enter city name followed by 2 digit state code BAH')
    } else {
      routeToPages()
    }
    
    function routeToPages() {
    	if (compareCity != '' && searchCity != '') {
    		router.navigate("search/" + searchCity + "/" + compareCity, {trigger: true});
    	} else if (compareCity === '' && searchCity != '') {
    		router.navigate("search/" + searchCity + "/overview", {trigger: true});
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


}