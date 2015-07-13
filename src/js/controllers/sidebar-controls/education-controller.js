var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var activeSelection = require('../active-selection');


router.route('search/:cityName/education', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName );
  searchFunction();

  show('city-template-2', '.main-content', {city: cityName} );

  activeSelection();

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });


  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  show('content/tabs-lists', '.duo-1')

  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "colleges", ".tab-data1", ".tab-title1");
  places(cityName, "community college", ".tab-data2", ".tab-title2");
});
