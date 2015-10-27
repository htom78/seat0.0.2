'use strict';
import angular from 'angular';

function PoliceCtrl ($scope, policeService) {
	$scope.orders = policeService.orders;

	$scope.getAllOrderTotal = policeService.getAllOrderTotal;
	$scope.getUnhandleOrderTotal = policeService.getUnhandleOrderTotal;
	$scope.getHandleOrderTotal = policeService.getHandleOrderTotal;

	$scope.$watch('orders', function() {
		$scope.currentOrderPage = policeService.currentPage;	
		$scope.currentOrderTotal = policeService.currentOrderTotal;
	}, true);

	$scope.currentOrderTab = 'unhandle';

	$scope.cutAllOrderTab = function() {
		$scope.currentOrderTab = 'all';	
		policeService.getAllOrders();
	};

	$scope.cutHandleOrderTab = function() {
		$scope.currentOrderTab = 'handle';	
		policeService.getHandleOrders();
	};

	$scope.cutUnhandleOrderTab = function() {
		$scope.currentOrderTab = 'unhandle';	
		policeService.getUnhandleOrders();
	};

	$scope.isAllOrderTab = function() {
		return $scope.currentOrderTab === 'all';	
	};

	$scope.isHandleOrderTab = function() {
		return $scope.currentOrderTab === 'handle';	
	};

	$scope.isUnhandleOrderTab = function() {
		return $scope.currentOrderTab === 'unhandle';	
	};

	$scope.searchOrder = function() {
		policeService.getOrderByKeywords($scope.keywords);
	};

	$scope.onSelectPage = function(page) {
		policeService.getOrderByPageNumber(page);
	};

	$scope.$on('newAlarmMessage', function(ev, orders) {
		if ($scope.isUnhandleOrderTab() || 
			$scope.isAllOrderTab()) {
				$scope.$apply(function() {
					angular.forEach(orders, function(order) {
						if (!policeService.hasOrderExist(order)) {
							$scope.orders.unshift(order);	
						}
					});
				});
			} else {
				$scope.cutUnhandleOrderTab();	
			}
	});

	$scope.$on('alarmItemSelect', function(ev, id) {
		$scope.$apply(function() {
			angular.forEach($scope.orders, function(order) {
				if (order.id === id) {
					order.isOtherSelected = true;	
				}	
			});	
		});
	});
}

export default {
	name: 'policeCtrl',
	fn: PoliceCtrl
};
