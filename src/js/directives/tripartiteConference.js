var directives = require('./index');

var tripartiteConference = function(tripartiteConference) {
	return {
		scope: {
		
		},

		link: function(scope, elem) {
			elem.on('click', function() {
				console.log(333333);	
				tripartiteConference.open(scope)
					.then(function() {
					
					});
			});	
		}	
	};
};

tripartiteConference.$inject = ['tripartiteConference'];

directives.directive('tripartiteConference', tripartiteConference);
