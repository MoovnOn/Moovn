var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('search/:cityName/:cityName2', function (cityName, cityName2){
  show('city-comp');
});