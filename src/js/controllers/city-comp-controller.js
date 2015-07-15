var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route( 'search/:cityName1/:cityName2', function (cityName1, cityName2){
 
 	show('city-comp', '.main-content')

 	var citySplit1 = cityName1.split(', ');
  var city1 = citySplit1[0];
  var state1 = citySplit1[1];

  var citySplit2 = cityName2.split(', ');
  var city2 = citySplit2[0];
  var state2 = citySplit2[1];

  console.log(city1);
  console.log(city2);

  console.log(state1);
  console.log(state2);
});