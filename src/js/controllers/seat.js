'use strict';

import angular from 'angular';

function SeatCtrl($scope,  userService, seatMap, seatService, orderService, utils, $location, mapService) {

	$scope.orders = seatService.orderss;

	const tabTextName = ['预', '即'];

	const status = {
		immediateOrReservation: {
			RESERVATION: 0,
			IMMEDIATE: 1,	
		}, 
		currentTab: {
			EXCEPTION: 0,
			PREPARED: 1,
			RECEIVED: 2,
			STARTED: 3,
			DONE: 4,
		}
	};

	$scope.minDate = new Date();
	var currentTimer = new Date();

	$scope.isCalendarOpened = false;

	$scope.openCalendar = function() {
		$scope.isCalendarOpened = true;
	};

	const initOrderData = {
		gender: 1,
		poiList: [],
		targetpoiList: [],
		count: 1,
		isReservation: false,
		isCarType: false,
		hour: currentTimer.getHours(),
		minute: currentTimer.getMinutes(),	
		reservationCalendar: new Date()
	};


	$scope.orderData = angular.copy(initOrderData);
	$scope.isAddNewOrdering = false;

	$scope.addNewOrder = function() {
		if ($scope.newOrder.$valid && !$scope.isAddNewOrdering) {
			$scope.isAddNewOrdering = true;
			seatService.addNewOrder($scope.orderData)
				.then((response) => {
					$scope.currentOrderTab = status.currentTab.PREPARED;
					$scope.immediateOrReservationSelect = 
						$scope.orderData.isReservation ? status.immediateOrReservation.RESERVATION :
						status.immediateOrReservation.IMMEDIATE;
					$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
					$scope.normalOrderCount = response.total;	
					$scope.averageTimer = response.average;
					$scope.initOrderDataAndUserData();	
					$scope.selectPersonalOrderType();
				}, (err) => {
					alert('订单提交失败:' + err);
				})
			.finally(() => {
				$scope.isAddNewOrdering = false;
			});
		}
	};

	$scope.initOrderDataAndUserData = function() {
		$scope.mobilePosition = '';	
		$scope.orderData = angular.copy(initOrderData);
		$scope.userData = {};
		$scope.newOrder.$setPristine();
		seatMap.clear();
	};

	$scope.clearOrderForm = function() {
		$scope.initOrderDataAndUserData();
	};

	$scope.addOrderFromForm = function() {
		$scope.orderData.vehicleNumber = null;
		$scope.addNewOrder();
	};

	//通过地图上的出租车图标下单
	$scope.$on('addNewOrder', function(ev, carInfo) {
		$scope.orderData.vehicleNumber = carInfo.vehicleNumber;
		$scope.addNewOrder();
	});

	//---------------------------------------------------------

	$scope.exceptionOrderCount = 0;
	$scope.normalOrderCount = 0;	
	$scope.averageTimer = 0;

	$scope.currentOrderTab = status.currentTab.PREPARED;
	$scope.immediateOrReservationSelect = status.immediateOrReservation.IMMEDIATE;
	$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];

	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = status.currentTab.PREPARED;
		$scope.getOrders();
	};

	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = status.currentTab.RECEIVED;
		$scope.getOrders();
	};

	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = status.currentTab.STARTED;
		$scope.getOrders();
	};

	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = status.currentTab.DONE;
		$scope.getOrders();
	};

	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = status.currentTab.EXCEPTION;
		$scope.getOrders();
	};


	$scope.toggleImmediateOrReservation = function() {
		if ($scope.immediateOrReservationSelect === status.immediateOrReservation.IMMEDIATE) {
			$scope.immediateOrReservationSelect = status.immediateOrReservation.RESERVATION;
		} else {
			$scope.immediateOrReservationSelect = status.immediateOrReservation.IMMEDIATE;
		}	
		$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
		$scope.getOrders();
	};

	$scope.isPreparedCurrentTab = function() {
		return $scope.currentOrderTab === status.currentTab.PREPARED;	
	};

	$scope.isExceptionCurrentTab = function() {
		return $scope.currentOrderTab === status.currentTab.EXCEPTION;
	};

	$scope.isDoneCurrentTab = function() {
		return $scope.currentOrderTab === status.currentTab.DONE;
	};

	$scope.isReceivedCurrentTab = function() {
		return $scope.currentOrderTab === status.currentTab.RECEIVED;
	};

	$scope.isStartedCurrentTab = function() {
		return $scope.currentOrderTab === status.currentTab.STARTED;
	};

	//-------------------------------------------


	$scope.queryOrderBySn = function() {
		if ($scope.userData.sn) {
			seatService.queryOrderBySn($scope.userData.sn, $scope.userData.isImmediate)
				.then(function(order) {
					$scope.currentOrderTab = order.status;
					$scope.immediateOrReservationSelect = Math.abs(order.isReserved - 1);
					$scope.immediateOrReservation = tabTextName[Math.abs(order.isReserved - 1)];
					$scope.normalOrderCount = 1;
				});	
		}
	};

	//用户拨打电话进来，异步
	$scope.$on('userCall', (ev, data) => {
		var mobile = data.mobile;
		$scope.initOrderDataAndUserData();
		$scope.orderData.callingTel = mobile;
		$scope.orderData.actualTel = mobile;
		userService.getUserInfoByMobile(mobile)
		.then((response) => {
			$scope.userData = response;
			$scope.orderData.fullName = response.contactName;
			$scope.orderData.targetpoiList = response.targetpoiList;
			$scope.orderData.poiList = response.poiList;
		});
	});

	//电话号码归属地
	$scope.$watch('orderData.actualTel', function(mobile) {
		if (mobile) {
			utils.getLocationByMobile(mobile)
				.then(function(response) {
					$scope.mobilePosition = response.carrier;
				});	
		} else {
			$scope.mobilePosition = '';	
		}
	});


	$scope.$on('order:received', function(ev, data) {
		seatService.shouldUpdateOrderItemList(status.currentTab.RECEIVED, $scope.immediateOrReservationSelect, data.sn)
			.then((response) => {
				$scope.currentOrderTab = status.currentTab.RECEIVED;	
				$scope.normalOrderCount = response.total;	
				$scope.averageTimer = response.average;
				$scope.selectPersonalOrderType();
			});
	});

	$scope.$on('order:depart', function(ev, data) {
		seatService.shouldUpdateOrderItemList(status.currentTab.STARTED, $scope.immediateOrReservationSelect, data.sn)
			.then((response) => {
				$scope.currentOrderTab = status.currentTab.RECEIVED;	
				$scope.normalOrderCount = response.total;	
				$scope.averageTimer = response.average;
				$scope.selectPersonalOrderType();
			});
	});

	$scope.$on('order:done', function(ev, data) {
		seatService.shouldUpdateOrderItemList(status.currentTab.DONE, $scope.immediateOrReservationSelect, data.sn)
			.then((response) => {
				$scope.currentOrderTab = status.currentTab.DONE;	
				$scope.normalOrderCount = response.total;	
				$scope.averageTimer = response.average;
				$scope.selectPersonalOrderType();
			});
	});

	$scope.hasCancelOrderBtn = function() {
		return 	!$scope.isDoneCurrentTab() && !$scope.isStartedCurrentTab();
	};

	$scope.hasAssignOrderBtn = function() {
		return !$scope.isDoneCurrentTab() && !$scope.isReceivedCurrentTab();	
	};

	$scope.hasDriverFuckOrderBtn = function() {
		return !$scope.isDoneCurrentTab() && !$scope.isPreparedCurrentTab();	
	};

	$scope.hasPassengerFuckOrderBtn = function() {
		return $scope.isReceivedCurrentTab() || $scope.isExceptionCurrentTab() ;	
	};

	$scope.handleCancelOrder = function(item) {
		orderService.handleCancelOrder(item.sn);
	};

	$scope.handleDriverFuckOrder = function(item) {
		orderService.handleDriverFuckOrder(item.sn)
			.then((response) => {
				item.statusName = '司机放空';	
			});	
	};

	$scope.handlePassengerFuckOrder = function(item) {
		orderService.handleCancelOrder(item.sn)
			.then((response) => {
				item.statusName = '乘客放空';	
			});	
	};

	$scope.assignOrderByCarPlate = function(item, input) {
		orderService.assignOrderByCarPlate(item.sn, input);
	};


	$scope.$on('mapPosition', (ev, data) => {
		if ($location.url() === data.path) {
			seatMap.setCenter(data.lng, data.lat);	
			mapService.getNearCars(`${data.lng},${data.lat}`)
				.then(response => {
					seatMap.addCarMarks(response);
				});
		}
	});


	$scope.orderTypes = [{name: '个人', value: 0}, {name: '全部', value: 1}];
	$scope.orderType = $scope.orderTypes[0];
	$scope.handleOrderTypeChange = function() {
		$scope.getOrders();
	};

	$scope.selectPersonalOrderType = function() {
		$scope.orderType = $scope.orderTypes[0];
	};

	$scope.getOrders = function(k) {
		seatService.getOrders({
			all: $scope.orderType.value,
			isImmediate: $scope.immediateOrReservationSelect,
			status: $scope.currentOrderTab,
			k,
		})
			.then((response) => {
				if ($scope.isExceptionCurrentTab()) {
					$scope.exceptionOrderCount = response.total;	
				} else {
					$scope.normalOrderCount = response.total;	
				}
				$scope.averageTimer = response.sec;
			}, (error) => {
				if ($scope.isExceptionCurrentTab()) {
					$scope.exceptionOrderCount = 0;	
				} else {
					$scope.normalOrderCount = 0;	
				}
				$scope.averageTimer = 0;	
			});
	};

	$scope.searchOrder = function() {
		$scope.getOrders($scope.keywords);	
	};

	$scope.getOrders();

}

export default {
	name: 'seatCtrl',
	fn: SeatCtrl
};
