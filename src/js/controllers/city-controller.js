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
var topojson = require('../topojson');
var neighMap = require('../neighMap');
var zoom = require('../zoom');
var searchFunction = require('../search');
var views = require('views');
var showSideBar = require('../show-sidebar')


router.route('search/:cityName',{trigger: true} , function (cityName){


  show('city', {city: cityName});


  // Jquery UI tabs

var sideBarHTML = views['side-bar-city-search'];

//console.log(sideBarHTML);

  $('.side-bar-content').html(sideBarHTML);


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
  var id = 0;

Promise.all([

  $.ajax({

    method: 'GET',
    url: '/api/boundary/' + 'US' + '/' + 'US' + '/'

  }).done(function (json){

    neighMap(json, g, path, "black", "US");

  })

]).then(function(results){

  Promise.all(
    [
      $.ajax({

      	method: 'GET',
      	url: '/api/boundary/' + state + '/' + city + '/'

      }).done(function (json){


      	cityjson = neighMap(json, g, path, "brown", city);

      }),
      $.ajax({

        method: 'GET',
        url: '/api/neighborhoods/' + state + '/' + city + '/'

      }).done(function (json){

        boundaryjson = neighMap(json, g, path, "grey", city + "neighborhood");

      })
    ]
  ).then(
  function(results){

    zoom(cityjson, boundaryjson, g, path, height, width);

  })
})
//for the jquery UI tabs
  // $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  // $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  chart(state, city);

//gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "banks", ".banks-tab-data");
  places(cityName, "attractions", ".leisure-tab-data");


});
