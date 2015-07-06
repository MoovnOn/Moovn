var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var chart = require('../c3-charts')

router.route('search/:cityName', function (cityName){
  
  show('city', {city: cityName});;

 	chart();


  $(function() {
     $( "#accordion" ).accordion({
      collapsible: true
    });
  });
});