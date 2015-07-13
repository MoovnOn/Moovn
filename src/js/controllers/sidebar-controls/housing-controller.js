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
var housingGraphGeneral = require('../../graphs/housing');

router.route('search/:cityName/housing', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName );
  searchFunction();

  show('city-template-4', '.main-content', {city: cityName} );

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });


  $('.side-nav-item').click(function(){
   this.addclass("side-nav-item-active");
  })

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  //currenty bound to quad-1
  housingGraphGeneral(state, city);


  show('content/tabs-lists', '.quad-4')

  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places

  places(cityName, "apartments", ".tab-data1", ".tab-title1");
  places(cityName, "realty", ".tab-data2", ".tab-title2");
  places(cityName, "banks", ".tab-data3", ".tab-title3");
});
