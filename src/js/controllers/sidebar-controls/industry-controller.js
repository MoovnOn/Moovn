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
var incomeCity = require ('../../graphs/income-city-wide')


router.route('search/:cityName/industry', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();
  show('city-template-4', '.main-content', {city: cityName});

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  incomeCity(state, city);
  
});