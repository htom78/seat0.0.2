'use strict';
import angular from 'angular';

function PoliceCtrl ($scope, policeService) {
	$scope.orders = policeService.orderss;
	const tabsName = ['all', 'unhandle', 'handle'];

	const searchData = {
		keywords: '',	
	};

	let isSearch = false;

	const status = {
		order: {
			ALL: 0,
			UNHANDLE: 1,
			HANDLE: 2,	
		}	
	};

	$scope.allOrderTotal = 0;
	$scope.unhandleOrderTotal = 0;
	$scope.handleOrderTotal = 0;
	$scope.currentOrderPage = 1;	
	$scope.orderItemCount = 0;

	$scope.currentOrderTab = status.order.UNHANDLE;

	$scope.cutAllOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = status.order.ALL;	
		$scope.currentOrderPage = 1;	
		$scope.getOrders();
	};

	$scope.cutHandleOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = status.order.HANDLE;	
		$scope.currentOrderPage = 1;	
		$scope.getOrders();
	};

	$scope.cutUnhandleOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = status.order.UNHANDLE;	
		$scope.getOrders();
	};

	$scope.getOrders = function() {
		policeService.getOrders({
			status: $scope.currentOrderTab,
			page: $scope.currentOrderPage,
			k: isSearch ? searchData.keywords : '',
		})
			.then((count) => {
				$scope[ tabsName[$scope.currentOrderTab] + 'OrderTotal'] = count;		
				$scope.orderItemCount = count;
			}, (error) => {
				$scope[ tabsName[$scope.currentOrderTab] + 'OrderTotal'] = 0;		
				$scope.orderItemCount = 0;
			});	
	};

	$scope.isAllOrderTab = function() {
		return $scope.currentOrderTab === status.order.ALL;	
	};

	$scope.isHandleOrderTab = function() {
		return $scope.currentOrderTab === status.order.HANDLE;	
	};

	$scope.isUnhandleOrderTab = function() {
		return $scope.currentOrderTab === status.order.UNHANDLE;	
	};

	$scope.searchOrder = function() {
		isSearch = true;
		$scope.currentOrderPage = 1;	
		searchData.keywords = $scope.keywords;
		$scope.getOrders();
	};

	$scope.pageChanged = function(page) {
		$scope.getOrders();
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
		$scope.$apply(() => {
			angular.forEach($scope.orders, (order) => {
				if (order.id === id) {
					order.isOtherSelected = true;	
				}	
			});	
		});
	});

	$scope.getOrders();
}

export default {
	name: 'policeCtrl',
	fn: PoliceCtrl
};
