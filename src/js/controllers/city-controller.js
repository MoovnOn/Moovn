var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var chart = require('../c3-charts');
var places = require('../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawMap = require('../drawMap');
var drawNeigh = require('../neighMap')

router.route('search/:cityName', function (cityName){
   show('city', {city: cityName}); 



  var svg = d3.select("#d3-graphs");
  var height = 400;
  var width = 400;
  svg.attr("width", width).attr("height", height);
  var g = svg.append("g");

  var projection = d3.geo.albers().scale(200).translate([150,140]);
  var path = d3.geo.path().projection(projection);
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  $.ajax({
  	method: 'GET',
  	url: '/api/boundary/' + state + '/' + city + '/'
  }).done(function (data){	
  	drawMap(data, g, path, height, width);
  });	


  $.ajax({
    method: 'GET',
    url: '/api/neighborhoods/' + state + '/' + city + '/'
  }).done(function (json){  
    drawNeigh(json, g, path);
  }); 

 	
  chart(state, city); 

  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "brewery", ".leisure-tab-data");


});