var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawMap = require('../../drawMap');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var peopleAge = require('../../graphs/people-age');
var peopleHousehold = require('../../graphs/people-household');
var peopleRelationships = require('../../graphs/people-relationships');
var liveshere = require('../../list-data/liveshere');


router.route('search/:cityName/people', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();
  show('city-template-4', '.main-content' , {city: cityName});


  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  peopleAge(state, city);
  peopleHousehold(state, city);
  peopleRelationships(state, city);

  show('content/tabs-lists', '.quad-4')
  
  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

  liveshere(state, city);

  // //google places
  //   places(cityName, "banks", ".tab-data1", ".tab-title1");
    // places(cityName, "attractions", ".tab-data2", ".tab-title2");
});