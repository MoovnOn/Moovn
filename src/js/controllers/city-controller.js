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
var drawNeigh = require('../neighMap');
var zoom = require('../zoom');
var searchFunction = require('../search');
var views = require('views');
var showSideBar = require('../show-sidebar');


router.route('search/:cityName', function (cityName){


  show('city', {city: cityName});
  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  // Jquery UI tabs
  // $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  // $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  $('.bar-menu-icon').click(function(){
    $('.side-nav-container').css({
      'margin-left': '0px',
      'z-index':'100',
      'box-shadow': '83px 0px 100px 28px rgba(0,0,0,0.57)'
      });
    $('.bar-menu-icon').css('display', 'none');
  })

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
  var cityjson = [];
  var boundaryjson = [];

Promise.all([$.ajax({

    method: 'GET',
    url: '/api/boundary/' + 'US' + '/' + 'US' + '/'

}).done(function (json){

    cityjson = json;
    drawMap(json, g, path, "black");

})]).then(function(results){

Promise.all(
  [
    $.ajax({

    	method: 'GET',
    	url: '/api/boundary/' + state + '/' + city + '/'

    }).done(function (json){

      cityjson = json;
    	drawMap(json, g, path, "brown");

    }),
    $.ajax({

      method: 'GET',
      url: '/api/neighborhoods/' + state + '/' + city + '/'

    }).done(function (json){

      boundaryjson = json;
      drawNeigh(json, g, path);

    })
  ]
).then(
  function(results){

    zoom(results[0], results[1], g, path, height, width);

  })
})
//for the jquery UI tabs
  // $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  // $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );



//gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "attractions", ".leisure-tab-data");

});
