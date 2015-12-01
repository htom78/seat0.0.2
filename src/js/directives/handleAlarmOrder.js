'use strict';
import angular from 'angular';

function Handle($uibModal, $document, policeService) {
	return {

		scope: {
			order: '=handleAlarmOrder',	
		},

		link: function(scope, elem) {
			let isDialogOpened = false;

			var modalInstance;
			var tr;

			elem.on('dblclick', function(ev) {
				if (scope.order.isOtherSelected) {
					return false;
				}
				scope.$apply(() => {

					if (!scope.order.isSelfSelected) {
						policeService.selectItem(scope.order.id);
					}

					if (!isDialogOpened) {
						isDialogOpened = true;	
						let len = elem.children().length;
						tr = angular.element('<tr></tr>');
						tr.insertAfter(elem);
						scope.order.isActive = true;
						scope.$emit('showMap');
						modalInstance = $uibModal.open({
							animation: false,
							backdrop: false,
							appendTo: angular.element(`<td class='insert-td' colspan='${len}'></td>`).appendTo(tr),
							templateUrl: 'dialogs/alarm-info.html',
							controller: 'dialogAlarmInfoCtrl',
							windowTemplateUrl: 'bootstrap/modal/div.html',
							openedClass: 'dddd',
							resolve: {
								order() {
									return scope.order;	
								},

								hasHandle() {
								 return scope.order.status === 2;
								}
							}
						});
					}

					modalInstance.result.then(() => {})
						.finally(() => {
							scope.$emit('hideMap');
							isDialogOpened = false;	
							scope.order.isActive = false;
							modalInstance = null;
							tr.remove();
						});

				});
			});	

			$document.bind('click', (ev) => {
				if (isDialogOpened 
						&& tr.has($(ev.target)).length === 0
						&& !$document.find('body').hasClass('modal-open')) {
					modalInstance.dismiss();	
				}	
			});


		}	

	};
}

export default {
	name: 'handleAlarmOrder',
	fn: Handle
};

