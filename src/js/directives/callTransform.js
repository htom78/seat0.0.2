var directives = require('./index');
var callTransformDirective = function(callTransform, ocxCall) {
	return {
		scope: {
		
		},

		link: function(scope, elem) {
			elem.on('click', function() {
				callTransform.open(scope)
					.then(function() {
						scope.employerNumber = '';	
					});	
			});

			scope.callTransform = function() {
				if (scope.transformForm.$valid) {
					ocxCall.callTransform(scope.employerNumber)
						.then(function() {
								
						});	
				}	
			};
		
		}	
	};
};

callTransformDirective.$inject = ['callTransform', 'ocxCall'];

directives.directive('callTransform', callTransformDirective);
