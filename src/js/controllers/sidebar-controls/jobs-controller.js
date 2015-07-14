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


router.route('search/:cityName/jobs', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();

  show('test', '.main-content', {city: cityName});
  activeSelection();
    
  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

});
