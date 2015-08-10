var directives = require('./index');

var timeSelect = function() {
	return {

		scope: {
			isReservation: '=timeSelect'	
		},

		link: function(scope, elem) {

			elem.on('click', '.hour', function(ev) {
				if (scope.isReservation) {
				console.log('hor click');	
				}
			});

			elem.on('click', '.minute', function(ev) {
				if (scope.isReservation) {
					console.log('minute click');	
				}
			});
		}		

	};
};

timeSelect.$inject = [];

directives.directive('timeSelect', timeSelect);
