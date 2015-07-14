var $ = require('jquery');
var salaryGraph = require('./graphs/salary-percentile');

module.exports = function(state, city){

	var job = $('.job-input').val();

	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job
  }).done(function(data){
  	console.log(data)
  	console.log(job)	

  });

  
	
};