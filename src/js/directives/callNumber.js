var directives = require('./index');
var callNumber = function(callNumberDialog, ocxCall) {
	return {
		scope: {
		
		},

		link: function(scope, elem) {
			scope.callType = 'outerLine';

			elem.on('click', function(ev) {
				callNumberDialog.open(scope)
					.then(function() {
						scope.callType = 'outerLine';	
						scope.diviceNumber = '';
					});
			});	

			scope.$watch('callType', function(callType) {
				if (callType) {
					if (callType === 'outerLine') {
						scope.labelName = '电话号码';	
					} else if(callType === 'terminalNumber') {
						scope.labelName = '终端号码';	
					}	
				}	
			});

			scope.call = function() {
				if (scope.callForm.$valid) {
					ocxCall.callOutByPhone(scope.diviceNumber)
						.then(function(response) {
							console.log(response);	
						});
				}
			};
		}	
	};
};

callNumber.$inject = ['callNumberDialog', 'ocxCall'];

directives.directive('callNumber', callNumber);
