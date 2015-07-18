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
var getDetails = require('../../place-details');

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

  show('side-bar-city-search', '.side-bar-content', {city: cityName} );
  searchFunction();
  show('education-template', '.main-content', {city: cityName} );

  activeSelection();

  nTitle = d3.select(".neighborhood-select");
  nTitle.selectAll("span");
  nTitle.append("span").text("Select a ");
  nTitle.append("span").style({"color": "grey", "font-weight": "bold"})
    .text("neighborhood");
  nTitle.append("span").text(" of ");
  nTitle.append("span").style({"color": "darkgreen", "font-weight": "bold"})
    .text(city);

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  show('content/tabs-lists', '.tri-3-edu')

  var width = Math.max($("#d3-graphs").width(), 200),
      aspect = 1;

  var svg = d3.select("#d3-graphs").append("svg")
              .attr("preserveAspectRatio", "xMidYMid")
              .attr("viewBox", "0 0 700 700")
              .attr("width", width)
              .attr("height", width * aspect)
              .attr("class", "map");

  $(window).resize(function(){
    var width = $(".tri-1-edu").width();
    svg.attr("width", width);
    svg.attr("height", width * aspect);
  });


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


        cityjson = neighMap(json, g, path, "brown", "city", width * aspect, width);

      }),

  ]).then(function(results){

    Promise.all([

      $.ajax({

        method: 'GET',
        url: '/api/neighborhoods/' + state + '/' + city + '/'

      }).done(function (json){
        if (json){
          boundaryjson = neighMap(json, g, path, "grey", "neighborhood", width * aspect, width);
        } else {
          boundaryjson = false
        }

      })

    ]).then(function(results){

      if (boundaryjson){
        zoom(cityjson, boundaryjson, g, path, width * aspect, width);

        var mouseOutZoom = function (d) {
          $("#" + d.properties.GEOID10 + "T").attr("opacity", 0);

          d3.selectAll("path")
            .classed("active", false)

          return zoom(cityjson, boundaryjson, g, path, width * aspect, width);
        };

        var mouseZoom = function(d) {
          $(".maptext").attr("opacity", 0);
          $("#" + d.properties.GEOID10 + "T").attr("opacity", 1);
          return mouseOverZoom(d, path, g, width * aspect, width, mouseOutZoom, state, city);
        };

        d3.selectAll(".feature-neighborhoodTP").on("click", mouseZoom);

      } else {

        zoom(cityjson, cityjson, g, path, width * aspect, width);

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

  $('.main-content').on('click', '.r-tabs-anchor', function(){
    $('.details-right').html('');
  });

  $('.city-all-container').on('click', '.clickSpan', function (){
    var id = this.id;
    getDetails(id);
    $(".clickSpan").removeClass("clickSpan-selected");
    $(this).addClass("clickSpan-selected");
  });

  // code handling schools modal in  education-requests file

  setTimeout(function() {
    var id = $('.clickSpan').eq(0).attr('id')
    getDetails(id)
  },1000);

// bottom
});

