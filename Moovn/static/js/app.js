(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function getCookie(e){var r=null;if(document.cookie&&""!=document.cookie)for(var t=document.cookie.split(";"),o=0;o<t.length;o++){var n=jQuery.trim(t[o]);if(n.substring(0,e.length+1)==e+"="){r=decodeURIComponent(n.substring(e.length+1));break}}return r}function csrfSafeMethod(e){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)}var jQuery=require("jquery"),$=require("jquery"),router=require("./router");router.init();var csrftoken=getCookie("csrftoken");$.ajaxSetup({beforeSend:function(e,r){csrfSafeMethod(r.type)||this.crossDomain||e.setRequestHeader("X-CSRFToken",csrftoken)}});

},{"./router":2,"jquery":"jquery"}],2:[function(require,module,exports){
"use strict";var SortedRouter=require("./sorted-router");module.exports=new SortedRouter;

},{"./sorted-router":3}],3:[function(require,module,exports){
"use strict";var Backbone=require("backbone"),_=require("underscore"),SortedRouter=Backbone.Router.extend({sortedRoutes:{},route:function(){for(var e=arguments.length-1,t=arguments[arguments.length-1],r=0;e>r;++r)this.sortedRoutes[arguments[r]]=t},init:function(){var e=-1e6,t=this;_.chain(_.pairs(this.sortedRoutes)).sortBy(function(t){var r=t[0];return r.indexOf("*")>=0?e:-r.split(":").length}).each(function(e){Backbone.Router.prototype.route.apply(t,e)}),Backbone.history.start()}});module.exports=SortedRouter;

},{"backbone":"backbone","underscore":"underscore"}]},{},[1])


//# sourceMappingURL=app.js.map