'use strict';

function View($uibModal, orderService) {
	return {
		scope: {
			order: '=viewOrder'	
		},

		link(scope, elem) {
			elem.bind('click', () => {
				$uibModal.open({
					animation: true,
					templateUrl: 'dialogs/view-order.html',
					controller: 'viewOrderCtrl',
					resolve: {
						orderInfo() {
							return orderService.getOrderDetail(scope.order.sn);	
						}	
					}	
				});

				
			});
		}	
	};
}

export default {
	name: 'viewOrder',
	fn: View
};
