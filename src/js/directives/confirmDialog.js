var directives = require('./index');

var confirmDialog = function(messageBoxService) {
	return {

		scope: {
			ctrl: '@boxCtrl',
			yes: '&ensureFn',
			message: '@messageBox',
			inputShow: '@inputShow',
			labelName: '@labelName'
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
				if (scope.isInputShow() && scope.input) {
					scope.yes({input: scope.input});
					messageBoxService.close();
					scope.input = '';
				} else if (!scope.isInputShow()){
					scope.yes();	
					messageBoxService.close();
				}
			};

			scope.cancel = function() {
				messageBoxService.close();
			};

			scope.isInputShow = function() {
				return !!scope.inputShow;	
			};
		}
	};
};

confirmDialog.$inject = ['messageBoxService'];

directives.directive('confirmDialog', confirmDialog);
