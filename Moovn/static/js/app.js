(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("search/:cityName1/:cityName2",function(e,r){show("city-comp",{city1:e,city2:r})});

},{"../router":5,"../show":6,"jquery":"jquery","underscore":"underscore","views":"views"}],2:[function(require,module,exports){
var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("search/:cityName",function(r){show("city",{city:r})});

},{"../router":5,"../show":6,"jquery":"jquery","underscore":"underscore","views":"views"}],3:[function(require,module,exports){
var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("","search",function(){show("search"),$(".compare").on("click",function(e){e.preventDefault(),$(".search-city-comp").removeClass("hidden"),$(".search-city-comp").addClass(" show-input"),$(this).addClass("hidden")}),$(".compare-form").on("submit",function(e){e.preventDefault();var r=$(".search-city").val(),t=$(".search-city-comp").val();""!=t&&""!=r?router.navigate("search/"+r+"/"+t,{trigger:!0}):""===t&&""!=r?router.navigate("search/"+r,{trigger:!0}):alert("Please enter the city you would like to see")})});

},{"../router":5,"../show":6,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
"use strict";function getCookie(e){var r=null;if(document.cookie&&""!=document.cookie)for(var o=document.cookie.split(";"),t=0;t<o.length;t++){var n=jQuery.trim(o[t]);if(n.substring(0,e.length+1)==e+"="){r=decodeURIComponent(n.substring(e.length+1));break}}return r}function csrfSafeMethod(e){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)}var jQuery=require("jquery"),$=require("jquery"),router=require("./router");({controllers:{"city-comp-controller":require("./controllers/city-comp-controller.js"),"city-controller":require("./controllers/city-controller.js"),"search-controller":require("./controllers/search-controller.js")}}),router.init();var csrftoken=getCookie("csrftoken");$.ajaxSetup({beforeSend:function(e,r){csrfSafeMethod(r.type)||this.crossDomain||e.setRequestHeader("X-CSRFToken",csrftoken)}});

},{"./controllers/city-comp-controller.js":1,"./controllers/city-controller.js":2,"./controllers/search-controller.js":3,"./router":5,"jquery":"jquery"}],5:[function(require,module,exports){
"use strict";var SortedRouter=require("./sorted-router");module.exports=new SortedRouter;

},{"./sorted-router":7}],6:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views");module.exports=function(e,r){var i=views[e],t=_.template(i,{variable:"m"}),u=t(r);$(".main-content").html(u)};

},{"jquery":"jquery","underscore":"underscore","views":"views"}],7:[function(require,module,exports){
"use strict";var Backbone=require("backbone"),_=require("underscore"),SortedRouter=Backbone.Router.extend({sortedRoutes:{},route:function(){for(var e=arguments.length-1,t=arguments[arguments.length-1],r=0;e>r;++r)this.sortedRoutes[arguments[r]]=t},init:function(){var e=-1e6,t=this;_.chain(_.pairs(this.sortedRoutes)).sortBy(function(t){var r=t[0];return r.indexOf("*")>=0?e:-r.split(":").length}).each(function(e){Backbone.Router.prototype.route.apply(t,e)}),Backbone.history.start()}});module.exports=SortedRouter;

},{"backbone":"backbone","underscore":"underscore"}]},{},[4])


//# sourceMappingURL=app.js.map