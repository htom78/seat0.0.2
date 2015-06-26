var directives = require('./index');
var pauseEmit = function($timeout) {
	return {
		scope: {
			pause: '=pauseEmit'	
		},
		link: function(scope, elem) {
			var timer;
			(function interval() {
				if (elem.is(':focus')) {
					scope.pause = true;	
				} else {
					scope.pause = false;	
				}
				timer = $timeout(interval, 200);	
			})();

			scope.$on('$destroy', function() {
				$timeout.cancel(timer);
			});
		}	
	};
};

pauseEmit.$inject = ['$timeout'];

directives.directive('pauseEmit', pauseEmit);
