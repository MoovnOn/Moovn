var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var c3 = require('c3');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var housingGraphGeneral = require('../../graphs/housing');
var activeSelection = require('../active-selection');

// for the map
var d3 = require('d3');
var topojson = require('../../topojson');
var neighMap = require('../../neighMap');
var zoom = require('../../zoom');
var mouseOverZoom = require('../../mouseoverzoom');

router.route('search/:cityName/housing', function (cityName){


  show('side-bar-city-search', '.side-bar-content', {city: cityName} );

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  searchFunction();
  show('city-template-4-map', '.main-content', {city: cityName} );

  nTitle = d3.select(".neighborhood-select");
  nTitle.selectAll("span");
  nTitle.append("span").text("Select a ");
  nTitle.append("span").style({"color": "grey", "font-weight": "bold"})
    .text("neighborhood");
  nTitle.append("span").text(" of ");
  nTitle.append("span").style({"color": "darkgreen", "font-weight": "bold"})
    .text(city);

  //$("#neighborhood-title").text("Select a Neighborhood");

  var svg = d3.select("#d3-graphs");
  var height = 400;
  var width = 400;
  svg.attr("width", width).attr("height", height);

  // svg.append("text")
  //   .attr("x", 200)
  //   .attr("y", 20)
  //   .attr("id", "map-title")
  //   .attr("text-anchor", "middle")
  //   .text("");

  var g = svg.append("g");

  var projection = d3.geo.albers().scale(200).translate([150,140]);
  var path = d3.geo.path().projection(projection);

  //currenty bound to quad-2
  var housingdata = housingGraphGeneral(state, city);
  var cityjson = [];
  var boundaryjson = [];
  var id = 0;

  // Promise.all([
  //
  // $.ajax({
  //
  //   method: 'GET',
  //   url: '/api/boundary/' + 'US' + '/' + 'US' + '/'
  //
  // }).done(function (json){
  //
  //   neighMap(json, g, path, "black", "US");
  //
  // })
  //
  // ]).then(function(results){

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
          //c3.generate(housingdata);
          housingGraphGeneral(state, city);
          return zoom(cityjson, boundaryjson, g, path, height, width);
        };

        var mouseZoom = function(d) {
          $(".maptext").attr("opacity", 0);
          $("#" + d.properties.GEOID10 + "T").attr("opacity", 1);
          return mouseOverZoom(d, path, g, height, width, mouseOutZoom, state, city);
        };

        d3.selectAll(".feature-neighborhoodTP").on("click", mouseZoom);

      } else {

        zoom(cityjson, cityjson, g, path, height, width);

      }

    });

  });
  //
  // })

  activeSelection();

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  show('content/tabs-lists', '.quad-4')

  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });

//google places
  places(cityName, "apartments", ".tab-data1", ".tab-title1");
  places(cityName, "realty", ".tab-data2", ".tab-title2");



});
