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
var housingGraphGeneral = require('../../graphs/housing');

router.route('search/:cityName/housing', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName );
  searchFunction();
  show('city-template-4', '.main-content', {city: cityName} );
  
  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  //currenty bound to quad-1
  housingGraphGeneral(state, city);
  
  
  
//   var tabsList = views['content/tabs-lists'];
//   $('.quad-4').html(tabsList)
  
//   //gets the lists displaying as tabs and can change to accordian
//   $('#responsiveTabsDemo').responsiveTabs({
//       startCollapsed: 'accordion'
//   });

// //google places
//   places(cityName, "banks", ".banks-tab-data");
//   places(cityName, "attractions", ".leisure-tab-data");
});