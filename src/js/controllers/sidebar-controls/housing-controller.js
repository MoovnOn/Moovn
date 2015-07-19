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
var sideBar = require('../side-bar-controller');
var getDetails = require('../../place-details');

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
  show('housing-template-3', '.main-content', {city: cityName} );

  nTitle = d3.select(".neighborhood-select");
  nTitle.selectAll("span");
  nTitle.append("span").text("Select a ");
  nTitle.append("span").style({"color": "grey", "font-weight": "bold"})
    .text("neighborhood");
  nTitle.append("span").text(" of ");
  nTitle.append("span").style({"color": "darkgreen", "font-weight": "bold"})
    .text(city);


  var width = Math.max($("#d3-graphs").width(), 200),
      aspect = 1;

  var svg = d3.select("#d3-graphs").append("svg")
              .attr("preserveAspectRatio", "xMinYMin")
              .attr("viewBox", "0 0 700 700")
              .attr("width", width)
              .attr("height", width * aspect)
              .attr("class", "map");


  $(window).resize(function(){
    var width = $(".quad-1").width();
    svg.attr("width", width);
    svg.attr("height", width * aspect);
  });

  //$(".map").on("resize", mouseOutZoom);

  var g = svg.append("g");

  var projection = d3.geo.albers().scale(200).translate([150,140]);
  var path = d3.geo.path().projection(projection);

  //City wide housing graph
  var housingdata = housingGraphGeneral(state, city, '.housing-graph');
  var cityjson = [];
  var boundaryjson = [];
  var id = 0;

  var mouseOutZoom = function (d) {
    $("#" + d.properties.GEOID10 + "T").attr("opacity", 0);
    d3.selectAll("path")
      .classed("active", false);
    housingGraphGeneral(state, city, '.housing-graph');
    return zoom(cityjson, boundaryjson, g, path, aspect * width, width);
  };

  var mouseZoom = function(d) {
    $(".maptext").attr("opacity", 0);
    $("#" + d.properties.GEOID10 + "T").attr("opacity", 1);
    return mouseOverZoom(d, path, g, aspect * width, width, mouseOutZoom, state, city);
  };

  Promise.all([
      $.ajax({
        method: 'GET',
        url: '/api/boundary/' + state + '/' + city + '/'
      }).done(function (json){
              cityjson = neighMap(json, g, path, "brown", "city", aspect * width, width);
              }),
      ]).then(function(results){

    Promise.all([
      $.ajax({
        method: 'GET',
        url: '/api/neighborhoods/' + state + '/' + city + '/'
      }).done(function (json){
        if (json){
          boundaryjson = neighMap(json, g, path, "grey", "neighborhood", aspect * width, width);
        } else {
          boundaryjson = false
        }
      })
    ]).then(function(results){
      if (boundaryjson){
        zoom(cityjson, boundaryjson, g, path, aspect * width, width);
        d3.selectAll(".feature-neighborhoodTP").on("click", mouseZoom);
      } else {
        zoom(cityjson, cityjson, g, path, aspect * width, width);
      }
    });
  });

//loads the sidebar
  sideBar();
//shows the tabs
  show('content/tabs-lists', '.quad-3')
//gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      startCollapsed: 'accordion'
  });
//google places
  places(cityName, "apartments", ".tab-data1", ".tab-title1");
  places(cityName, "realty", ".tab-data2", ".tab-title2");

  $('.main-content').on('click', '.r-tabs-anchor', function(){
    $('.details-right').html('');
      var searchTerm = $(this).text()
      var request = {
        query: searchTerm + " " + city
      };  

      map = new google.maps.Map(document.getElementById('map'));
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, function(results) {
        var id = results[0].place_id;
            getDetails(id)
      });
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

$('.graph-title').html("Housing Prices");

});
