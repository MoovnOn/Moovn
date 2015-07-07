var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var chart = require('../c3-charts');
var places = require('../places-api');
var tab = require('responsive-tabs');

router.route('search/:cityName', function (cityName){
  
  show('city', {city: cityName});
 	
 	chart();



  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "brewery", ".leisure-tab-data");
});