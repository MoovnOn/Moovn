var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('search/:cityName', function (cityName){
  
  show('city', {city: cityName});;
  
  $(function() {
     $( "#accordion" ).accordion({
      collapsible: true
    });
  });
});