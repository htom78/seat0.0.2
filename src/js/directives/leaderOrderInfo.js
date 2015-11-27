'use strict';

import angular from 'angular';


function Info($uibModal, $document) {
	return {
		scope: {
			order: '=leaderOrderInfo'	
		},

		link(scope, elem) {

			let isDialogOpened = false;

			var modalInstance;
			var tr;

			elem.bind('dblclick', (ev) => {
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
						templateUrl: 'dialogs/order-info.html',
						controller: 'dialogOrderInfoCtrl',
						windowTemplateUrl: 'bootstrap/modal/div.html',
						openedClass: 'dddd',
						resolve: {
							btnShows() {
								return {
									hasCancelOrderBtn: scope.$parent.hasCancelOrderBtn(),
									hasAssignOrderBtn: scope.$parent.hasAssignOrderBtn(),
									hasDriverFuckOrderBtn: scope.$parent.hasDriverFuckOrderBtn(),
									hasPassengerFuckOrderBtn: scope.$parent.hasPassengerFuckOrderBtn(),		
								};	
							},

							order() {
								return scope.order; 	
							}
						}
					});

					modalInstance.result.then(() => {})
						.finally(() => {
							scope.$emit('hideMap');
							scope.order.isActive = false;
							isDialogOpened = false;
							modalInstance = null;
							tr.remove();
						});
				}

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
	name: 'leaderOrderInfo',
	fn: Info
};

