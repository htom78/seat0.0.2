var services = require('./index');

var chartCarService = function(chart, calculateAngleUtils) {
	var chartModel = chart.chart({});
	return {
		get: function(elem) {
			chartModel.get(elem);
		},
		draw: function(data) {
			/*
			data = {
				stop: 1,
				empty: 7,
				heavy: 25,
				task: 3
			};*/

			var result = calculateAngleUtils.calculateAngleForData(data);
			var radion = Math.PI / 180;

			var stopStartRadion = -result.stop * radion,
				stopEndRadion = 0,
				emptyStartRadion = -(result.stop + result.empty) * radion,
				emptyEndRadion = stopStartRadion,
				heavyEndRadion = emptyStartRadion,
				heavyStartRadion = -(result.stop + result.empty + result.heavy) * radion,
				taskEndRadion = heavyStartRadion,
				taskStartRadion = Math.PI;

			chartModel.draw([
				{startRadion: stopStartRadion, endRadion: stopEndRadion, pieColor: '#ff7c3c'},
				{startRadion: emptyStartRadion, endRadion: emptyEndRadion, pieColor: '#e6c707'},
				{startRadion: heavyStartRadion, endRadion: heavyEndRadion, pieColor: '#97c255'},
				{startRadion: taskStartRadion, endRadion: taskEndRadion, pieColor: '#649626'}
			], [
				{angle: result.stop / 2, lineColor: '#ff7c3c', text: data.stop},
				{angle: result.stop + result.empty / 2, lineColor: '#e6c707', text: data.empty},
				{angle: result.stop + result.empty + result.heavy / 2, lineColor: '#97c255', text: data.heavy},
				{angle: 180 - result.task / 2, lineColor: '#649626', text: data.task}
			]);
		}
	};

};

chartCarService.$inject = ['chart', 'calculateAngleUtils'];

services.factory('chartCarService', chartCarService);
