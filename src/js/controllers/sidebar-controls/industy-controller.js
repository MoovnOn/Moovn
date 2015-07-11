var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var chart = require('../../c3-charts');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawMap = require('../../drawMap');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var showSideBar = require('../../show-sidebar');
var industryGraph = require('../../graphs/industry');

router.route('search/:cityName/industry', function (cityName){

  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  show('city-template-2', {city: cityName});

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  industryGraph(state, city).done(function(data) {
  	console.log(data)
  })

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
});