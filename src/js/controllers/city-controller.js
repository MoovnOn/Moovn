var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var chart = require('../c3-charts');
var places = require('../places-api');
var tab = require('responsive-tabs');
var d3 = require('../d3');
var drawMap = require('../drawMap');

router.route('search/:cityName', function (cityName){
  
  var citySplit = cityName.split(', ');

  $.ajax({
  	method: 'GET',
  	url: '/api/boundary/' + citySplit[1] + '/' + citySplit[0] + '/'
  }).done(function (data){	
  	drawMap(data);
  });	

  show('city', {city: cityName});
 	
 	chart();

  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "brewery", ".leisure-tab-data");
});