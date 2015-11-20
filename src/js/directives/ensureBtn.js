'use strict';
function Ensure($uibModal) {
	return {
		scope: {
			title: '@messageTitle',
			content: '@messageContent',
			ensure: '&ensureFn',
			hasInput: '='	
		},

		link(scope, elem) {
			elem.bind('click', () => {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'dialogs/ensure-dialog.html',
					controller: 'modalDialogCtrl',
					resolve: {
						info() {
							return {
								title: scope.title,
								content: scope.content,
								hasInput: scope.hasInput	
							};	
						}
					}
				});

				modalInstance.result.then((input) => {
					if (scope.hasInput) {
						scope.ensure({input});
					} else {
						scope.ensure();
					}
				}, () => {
					console.log('dismiss');	
				});	
			});
		}	
	};
}

export default {
	name: 'ensureBtn',
	fn: Ensure
};
