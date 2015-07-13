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

var d3 = require('d3');
var topojson = require('../../topojson');
var neighMap = require('../../neighMap');
var zoom = require('../../zoom');
var mouseOverZoom = require('../../mouseoverzoom');

router.route('search/:cityName/housing', function (cityName){

  show('side-bar-city-search', '.side-bar-content', cityName );
  searchFunction();
  show('city-template-4-map', '.main-content', {city: cityName} );


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
        if (json){
          boundaryjson = neighMap(json, g, path, "grey", "neighborhood");
        } else {
          boundaryjson = false
        }

      })

    ]).then(function(results){

      if (boundaryjson){
        zoom(cityjson, boundaryjson, g, path, height, width);

        var mouseOutZoom = function () {
          $("#neighborhood-title").text("Select A Neighborhood");
          return zoom(cityjson, boundaryjson, g, path, height, width);
        };
        var mouseZoom = function(d) {
          $("#neighborhood-title").text(d.properties.NAME);
          return mouseOverZoom(d, path, g, height, width, mouseOutZoom, state, city);
        };

        d3.selectAll(".feature-neighborhood").on("click", mouseZoom);

      } else {

        zoom(cityjson, cityjson, g, path, height, width);

      }


    });

  });

  })


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

  //currenty bound to quad-3
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
