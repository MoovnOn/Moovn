var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var places = require('../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var topojson = require('../topojson');
var neighMap = require('../neighMap');
var zoom = require('../zoom');
var searchFunction = require('../search');
var views = require('views');
var mouseOverZoom = require('../mouseoverzoom')
//var mouseout = require('../mouseout')
var googleMap = require('../google-maps');



router.route('search/:cityName', function (cityName){

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();
  show('city-template-4-map', '.main-content', {city: cityName});
  //show('city', '.main-content', {city: cityName})

$('.bar-menu-icon').click(function() {
  $( ".side-nav-container" ).toggle( "slide" );
});


//for the jquery UI tabs
  // $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  // $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
//   })
// })

  //


  // hacky way to make height change. should be refactored
  $('#google-map').attr('style','height: 400px');
  googleMap(state, city);



//gets the lists displaying as tabs and can change to accordian
  show('content/tabs-lists', '.quad-2')
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, city, ".tab-data1", ".tab-title1");


});
