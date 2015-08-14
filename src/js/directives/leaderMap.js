var directives = require('./index');

var leaderMap = function(leaderMap) {
	return {
		scope: {

		},
		link: function(scope, elem) {
			leaderMap.mapView(elem);
			elem.on('click', function(ev) {
				ev.stopPropagation();	
			});
		}
	};
};

leaderMap.$inject = ['leaderMap'];

directives.directive('leaderMap', leaderMap);
