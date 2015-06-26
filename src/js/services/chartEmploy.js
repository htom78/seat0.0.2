var services = require('./index');

var chartEmployService = function(chart, calculateAngleUtils) {
	var chartModel = chart.chart({});

	return {
		get: function(elem) {
			chartModel.get(elem);
		},
		draw: function(data) {
			/*
			data = {
				busy: 1,
				reset: 7,
				respond: 25,
				vain: 3
			};*/

			
			var result = calculateAngleUtils.calculateAngleForData(data);
			var radion = Math.PI / 180;

			var busyStartRadion = -result.busy * radion,
				busyEndRadion = 0,
				resetStartRadion = -(result.busy + result.reset) * radion,
				resetEndRadion = busyStartRadion,
				respondEndRadion = resetStartRadion,
				respondStartRadion = -(result.busy + result.reset + result.respond) * radion,
				vainEndRadion = respondStartRadion,
				vainStartRadion = Math.PI;

			chartModel.draw([
				{startRadion: busyStartRadion, endRadion: busyEndRadion, pieColor: '#ff7c3c'},
				{startRadion: resetStartRadion, endRadion: resetEndRadion, pieColor: '#e6c707'},
				{startRadion: respondStartRadion, endRadion: respondEndRadion, pieColor: '#97c255'},
				{startRadion: vainStartRadion, endRadion: vainEndRadion, pieColor: '#649626'}
			], [
				{angle: result.busy / 2, lineColor: '#ff7c3c', text: data.busy},
				{angle: result.busy + result.reset / 2, lineColor: '#e6c707', text: data.reset},
				{angle: result.busy + result.reset + result.respond / 2, lineColor: '#97c255', text: data.respond},
				{angle: 180 - result.vain / 2, lineColor: '#649626', text: data.vain}
			]);
		}
	};
};

chartEmployService.$inject = ['chart', 'calculateAngleUtils'];

services.factory('chartEmployService', chartEmployService);
