var directives = require('./index');
var callTransformDirective = function(callTransform) {
	return {
		scope: {
		
		},

		link: function(scope, elem) {
			elem.on('click', function() {
				console.log('11111');
				callTransform.open(scope)
					.then(function() {
					
					});	
			});
		
		}	
	};
};

callTransformDirective.$inject = ['callTransform'];

directives.directive('callTransform', callTransformDirective);
