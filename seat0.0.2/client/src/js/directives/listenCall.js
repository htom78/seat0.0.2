var directives = require('./index');



var listenCall = function($rootScope, $timeout) {
	return {
		link: function(scope, elem) {

			var receiveMobile = function(ev) {
				$rootScope
					.$broadcast('userCall', {mobile: ev.data});
			};
			window.addEventListener('message', receiveMobile);
			scope.$on('$destroy', function() {
				window.removeEventListener('message', receiveMobile);
			});
		}
	};
};

listenCall.$inject = ['$rootScope', '$timeout'];

directives.directive('listenCall', listenCall);