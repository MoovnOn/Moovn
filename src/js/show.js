'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');

module.exports = function (templateName, htmlEl, model) {
  var rawTemplate = views[templateName];
  var templateFn = _.template(rawTemplate, { variable: 'm' });
  var hydratedHTML = templateFn(model);
  
  $(htmlEl).html(hydratedHTML);
};