 var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var places = require('../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var topojson = require('../topojson');
var neighMap = require('../neighMap');
var zoom = require('../zoom');
var searchFunction = require('../search');
var views = require('views');
var mouseOverZoom = require('../mouseoverzoom')
var mouseout = require('../mouseout')
var googleMap = require('../google-maps');



router.route('search/:cityName', function (cityName){


  show('side-bar-city-search', '.side-bar-content', cityName);
  searchFunction();
  show('city-template-4-map', '.main-content', {city: cityName});
  //show('city', '.main-content', {city: cityName})

$('.bar-menu-icon').click(function() {
  $( ".side-nav-container" ).toggle( "slide" );
});


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

  Promise.all([

      $.ajax({

      	method: 'GET',
      	url: '/api/boundary/' + state + '/' + city + '/'

      }).done(function (json){


      	cityjson = neighMap(json, g, path, "brown", "city");

      }),

  ]).then(function(results){

    Promise.all([

      $.ajax({

        method: 'GET',
        url: '/api/neighborhoods/' + state + '/' + city + '/'

      }).done(function (json){

        boundaryjson = neighMap(json, g, path, "grey", "neighborhood");

      })

    ]).then(function(results){
        zoom(cityjson, boundaryjson, g, path, height, width);

        var mouseOutZoom = function (d) { return zoom(cityjson, boundaryjson, g, path, height, width);};
        var mouseZoom = function(d) { return mouseOverZoom(d, path, g, height, width);};

        d3.selectAll(".feature-neighborhood").on("mouseenter", mouseZoom);
        d3.selectAll(".neighborhoods").on("mouseleave", mouseOutZoom);
        d3.selectAll(".feature-neighborhood").on("mouseleave", mouseout)
    });

  });

})
//for the jquery UI tabs
  // $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  // $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
//   })
// })

  //


  // hacky way to make height change. should be refactored
  $('#google-map').attr('style','height: 400px');
  googleMap(state, city);


//gets the lists displaying as tabs and can change to accordian
  show('content/tabs-lists', '.quad-2')
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, city, ".tab-data1", ".tab-title1");


});
