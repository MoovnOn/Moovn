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
var viewsContent = require('views/content');
var showSideBar = require('../../show-sidebar');

router.route('search/:cityName/housing', function (cityName){

  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  show('city-template-4', {city: cityName});
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  chart(state, city);
  
  var tabsList = viewsContent['tabs-lists'];
  
  $('.quad-4').html(tabsList)
  
  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "attractions", ".leisure-tab-data");
});