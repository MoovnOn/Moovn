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
var getDetails = require('../../place-details')
var views = require('views');
var sideBar = require('../side-bar-controller');

router.route('search/:cityName/places', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName} );
  searchFunction();

  show('city-template-2', '.main-content', {city: cityName} );

  sideBar();

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  show('content/tabs-lists', '.duo-1');

  // Sets up search in the sixth tab
  $('.tab-title8').children('a').text('Search');
  $('.tab-data8').children('.list-left').append('<form class="tab-search-form"><input type="text" class="search-tab-input" autofocus><button type="submit" class="tab-search-btn" style="display:inline-block">Search</button></form><br>')

  $('.main-content').on('submit', '.tab-search-form' , function(e){
    e.preventDefault();

  var searchVal = $('.search-tab-input').val();
    $('.tab-data8').children('.list-left').html('');
    $('.tab-data8').children('.list-left').append('<form class="tab-search-form"><input type="text" class="search-tab-input" autofocus><button type="submit" class="tab-search-btn" style="display:inline-block">Search</button></form><br>')
    places(cityName, searchVal, ".tab-data8", "Search");
  });


  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      // startCollapsed: 'accordion'
  });


//google places
  places(cityName, "Attractions", ".tab-data1", ".tab-title1");
  places(cityName, "Bars", ".tab-data2", ".tab-title2");
  places(cityName, "Restaurants", ".tab-data3", ".tab-title3");
  places(cityName, "Shopping", ".tab-data4", ".tab-title4");
  places(cityName, "Coffee & Tea", ".tab-data5", ".tab-title5");
  places(cityName, "Banks", ".tab-data6", ".tab-title6");
  places(cityName, "Credit Union", ".tab-data7", ".tab-title7");
   
  // $(".duo-2").html("<h1 class= 'select-details'><i class='fa fa-arrow-circle-o-left'></i> Select for details</h1>");
  // setTimeout(function(){
  //   $(".select-details").fadeOut("slow")
  //   }, 3500);


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

  setTimeout(function() {
    var id = $('.clickSpan').first().attr('id')
    getDetails(id)
  }, 800);

//code to get each tab opening the first item in the list  
  // $(".r-tabs-anchor").click(function(){
  //    setTimeout(function() {
  //     console.log();
  //     var id = $('.clickSpan').first().attr('id')
  //     getDetails(id)
  //    }, 500);
  // })
  
  //changes tab view so that it is fullscreen only on this view
  $(".city-all-container").addClass("full-screen-container");
  $(".duo-1").addClass("full-screen-duo1");
  $(".tab-list-container").addClass("full-screen-tab-container");
  $(".details-right").addClass("full-screen-details-right");
});
