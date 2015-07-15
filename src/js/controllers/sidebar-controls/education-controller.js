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

// for the map
var d3 = require('d3');
var topojson = require('../../topojson');
var neighMap = require('../../neighMap');
var zoom = require('../../zoom');
var mouseOverZoom = require('../../educationmouseover');

router.route('search/:cityName/education', function (cityName){
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  show('side-bar-city-search', '.side-bar-content', cityName );
  searchFunction();
  show('city-template-2', '.main-content', {city: cityName} );

  activeSelection();


  nTitle = d3.select(".city-all-container");
  nTitle.selectAll("span");
  nTitle.insert("span", ".pure-g").text("Select a ");
  nTitle.insert("span", ".pure-g").style({"color": "grey", "font-weight": "bold"})
    .text("neighborhood");
  nTitle.insert("span", ".pure-g").text(" of ");
  nTitle.insert("span", ".pure-g").style({"color": "darkgreen", "font-weight": "bold"})
    .text(city);


  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  show('content/tabs-lists', '.duo-2')

  var svg = d3.select("#d3-graphs");
  var height = 400;
  var width = 400;
  svg.attr("width", width).attr("height", height);
  var g = svg.append("g");

  var projection = d3.geo.albers().scale(200).translate([150,140]);
  var path = d3.geo.path().projection(projection);

  var cityjson = [];
  var boundaryjson = [];
  var id = 0;


  Promise.all([

      $.ajax({

        method: 'GET',
        url: '/api/boundary/' + state + '/' + city + '/'

      }).done(function (json){


        cityjson = neighMap(json, g, path, "brown", "city", height, width);

      }),

  ]).then(function(results){

    Promise.all([

      $.ajax({

        method: 'GET',
        url: '/api/neighborhoods/' + state + '/' + city + '/'

      }).done(function (json){
        if (json){
          boundaryjson = neighMap(json, g, path, "grey", "neighborhood", height, width);
        } else {
          boundaryjson = false
        }

      })

    ]).then(function(results){

      if (boundaryjson){
        zoom(cityjson, boundaryjson, g, path, height, width);

        var mouseOutZoom = function (d) {
          $("#" + d.properties.GEOID10 + "T").attr("opacity", 0);

          d3.selectAll("path")
            .classed("active", false)

          return zoom(cityjson, boundaryjson, g, path, height, width);
        };

        var mouseZoom = function(d) {
          $(".maptext").attr("opacity", 0);
          $("#" + d.properties.GEOID10 + "T").attr("opacity", 1);
          return mouseOverZoom(d, path, g, height, width, mouseOutZoom, state, city);
        };

        d3.selectAll(".feature-neighborhood").on("click", mouseZoom);

      } else {

        zoom(cityjson, cityjson, g, path, height, width);

      }

    });

  });



  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "colleges", ".tab-data1", ".tab-title1");
  places(cityName, "community college", ".tab-data2", ".tab-title2");
});
