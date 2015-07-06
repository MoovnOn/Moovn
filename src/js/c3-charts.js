var c3 = require('c3');

module.exports = function() {
	c3.generate({
    bindto: 'body .city-chart-container',
     data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
    }
   
});

};