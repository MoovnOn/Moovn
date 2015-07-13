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
var commuteTime = require('../../graphs/commute-times');
var googleMap = require('../../google-maps');
var activeSelection = require('../active-selection');

router.route('search/:cityName/transportation', function (cityName){

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();
  show('city-template-2', '.main-content', {city: cityName});
  activeSelection();
 
  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  // hacky way to make height change. should be refactored
  $('#google-map').attr('style','height: 400px');
  googleMap(state, city);
  
  commuteTime(state, city);
  
});