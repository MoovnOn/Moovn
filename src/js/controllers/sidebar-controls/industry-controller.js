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
var showSideBar = require('../../show-sidebar');
var incomeCity = require ('../../graphs/income-city-wide')

router.route('search/:cityName/industry', function (cityName){

  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  show('city-template-4', {city: cityName});

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  incomeCity(state, city);

});
