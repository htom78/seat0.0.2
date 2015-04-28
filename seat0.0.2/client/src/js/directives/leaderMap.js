var directives = require('./index');

var leaderMap = function(leaderMapService) {
	return {
		scope: {

		},
		link: function(scope, elem) {
			leaderMapService.mapView(elem);
		}
	};
};

leaderMap.$inject = ['leaderMapService'];

directives.directive('leaderMap', leaderMap);