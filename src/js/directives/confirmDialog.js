var directives = require('./index');

var confirmDialog = function(messageBoxService) {
	return {

		scope: {
			ctrl: '@boxCtrl',
			yes: '&ensureFn',
			message: '@messageBox'
		},	

		link: function(scope, elem) {

			if (elem.is('form')) {
				elem.on('submit', function() {
					messageBoxService.open(scope.ctrl, scope);
				});	
			} else {
				elem.on('click', function() {
					messageBoxService.open(scope.ctrl, scope);
				});	
			}

			scope.ensure = function() {
				messageBoxService.close();
				scope.yes();
			};

			scope.cancel = function() {
				messageBoxService.close();
			};
		}
	};
};

confirmDialog.$inject = ['messageBoxService'];

directives.directive('confirmDialog', confirmDialog);
