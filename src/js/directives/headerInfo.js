'use strict';

function Info($uibModal, headerService, security) {
	return {
		scope: {},

		template: `<span class='scroll-info'>{{message}}</span>`,

		link(scope, elem) {

			if (security.isAuthenticated()) {
				headerService.getNotifyInfo()
					.then((message) => {
						scope.message = message;
					});
			}

			if (security.isLeader()) {
				elem.bind('dblclick', (ev) => {
					var modalInstance = $uibModal.open({
						animation: true,
						templateUrl: 'dialogs/header-info.html',
						controller: 'headerInfoCtrl'
					});

					modalInstance.result.then((content) => {
						if (content && content.trim()) {
							headerService.publishMessage(content);
							scope.message = content;
						} else {
							headerService.publishMessage('');
							scope.message = '';
						}
					});
				});	
			}


			scope.$on('headerMessage', (ev, message) => {
				scope.message = message;
			});

		}	
	};
}

export default {
	name: 'headerInfo',
	fn: Info
};
