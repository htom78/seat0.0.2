var services = require('./index');

var offsetAngle = 5;

var chartUserService = function(chart, calculateAngleUtils) {
	var chartModel = chart.chart({
		offsetAngle: offsetAngle
	});
	return {
		get: function(elem) {
			return chartModel.get(elem);
		},
		draw: function(data) {

			var endA,startA;
			if (parseInt(data.fuckCount) === 0) {
				endA = 0;
				startA = 0;
			} else {
				endA = -(Math.PI / 180) * offsetAngle;
				startA = -(Math.PI / 180) * (calculateAngleUtils.calculateAngle(data.total, data.fuckCount, offsetAngle) + offsetAngle);
			}
			var pieData = [{startRadion: Math.PI, endRadion: 2 * Math.PI, pieColor: '#8ab14d'}, 
					{startRadion: startA, endRadion: endA, pieColor: '#e77037'}];

			var lineData = [{angle: calculateAngleUtils.calculateAngle(data.total, data.fuckCount, offsetAngle) / 2, lineColor: '#e77037', text: data.fuckCount}];
			chartModel.draw(pieData, lineData);
			chartModel.drawTotalLine(data.total);
		}
	};
};

chartUserService.$inject = ['chart', 'calculateAngleUtils'];

services.factory('chartUserService', chartUserService);
