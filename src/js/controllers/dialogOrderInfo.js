'use strict';

function Dialog($scope, $uibModalInstance, leaderService, orderService, order, btnShows) {
	$scope.hasCancelOrderBtn = btnShows.hasCancelOrderBtn;
	$scope.hasAssignOrderBtn = btnShows.hasAssignOrderBtn;
	$scope.hasDriverFuckOrderBtn = btnShows.hasDriverFuckOrderBtn;
	$scope.hasPassengerFuckOrderBtn = btnShows.hasPassengerFuckOrderBtn;		

	orderService.getOrderStepInfo(order.sn)
		.then((response) => {
			$scope.createTime = response.createTime;	
			$scope.orderTime = response.orderTime;
			$scope.pickupTime = response.pickupTime; 
			$scope.endTime = response.endTime;
		});

	$scope.handleCancelOrder = function() {
		orderService.handleCancelOrder(order.sn);
	};	

	$scope.handleDriverFuckOrder = function() {
		orderService.handleDriverFuckOrder(order.sn);	
	};

	$scope.handlePassengerFuckOrder = function() {
		orderService.handlePassengerFuckOrder(order.sn);	
	};

	$scope.assignOrderByCarPlate = function(input) {
		orderService.assignOrderByCarPlate(order.sn, input);
	};
}

export default {
	name: 'dialogOrderInfoCtrl',
	fn: Dialog
};
