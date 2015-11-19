'use strict';

import angular from 'angular';

function SeatCtrl($scope,  userService, seatMap, seatService, utils, $location, mapService, initCount) {

	$scope.orders = seatService.orderss;

	const tabTextName = ['预约', '即时'];
	const tabsName = ['Exception', 'Prepared', 'Received', 'Started', 'Done'];	
	const state = {
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

	$scope.status = {
		calendarOpened: false
	};

	$scope.minDate = new Date();


	$scope.openCalendar = function() {
		$scope.status.calendarOpened = true;
	};


	let currentTimer = new Date();
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

	$scope.addNewOrder = function() {
		if ($scope.newOrder.$valid) {
			$scope.sendingOrderData = true;
			seatService.addNewOrder($scope.orderData)
				.then((response) => {
					$scope.currentOrderTab = state.currentTab.PREPARED;
					$scope.immediateOrReservationSelect = 
						$scope.orderData.isReservation ? state.immediateOrReservation.RESERVATION :
						state.immediateOrReservation.IMMEDIATE;
					$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
					$scope.normalOrderCount = response.total;	
					$scope.averageTimer = response.average;
					$scope.initOrderDataAndUserData();	
				}, (err) => {
					alert('订单提交失败:' + err);
				})
			.finally(() => {
				$scope.sendingOrderData = false;
			});
		}
	};

	$scope.initOrderDataAndUserData = function() {
		$scope.mobilePosition = '';	
		$scope.orderData = angular.copy(initOrderData);
		$scope.userData = {};
		$scope.newOrder.$setPristine();
		seatMap.clear();
		$scope.clearSearchWords();
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

	$scope.normalOrderCount = initCount.total;
	$scope.averageTimer = initCount.average;
	$scope.exceptionOrderCount = 0;

	$scope.currentOrderTab = state.currentTab.PREPARED;
	$scope.immediateOrReservationSelect = state.immediateOrReservation.IMMEDIATE;
	$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];

	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = state.currentTab.PREPARED;
		$scope.getOrders();
	};

	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = state.currentTab.RECEIVED;
		$scope.getOrders();
	};

	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = state.currentTab.STARTED;
		$scope.getOrders();
	};

	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = state.currentTab.DONE;
		$scope.getOrders();
	};

	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = state.currentTab.EXCEPTION;
		$scope.getOrders();
	};

	$scope.searchCurrentOrderByKeywords = function() {
		seatService.queryOrderByKeywords($scope.inputOrderWords, $scope.immediateOrReservationSelect, $scope.currentOrderTab );
	};

	$scope.toggleImmediateOrReservation = function() {
		if ($scope.immediateOrReservationSelect === state.immediateOrReservation.IMMEDIATE) {
			$scope.immediateOrReservationSelect = state.immediateOrReservation.RESERVATION;
		} else {
			$scope.immediateOrReservationSelect = state.immediateOrReservation.IMMEDIATE;
		}	
		$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
		$scope.getOrders();
	};

	$scope.isPreparedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.PREPARED;	
	};

	$scope.isExceptionCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.EXCEPTION;
	};

	$scope.isDoneCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.DONE;
	};

	$scope.isReceivedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.RECEIVED;
	};

	$scope.isStartedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.STARTED;
	};

	//-------------------------------------------

	$scope.clearSearchWords = function() {
		$scope.inputOrderWords = '';
	};

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
		let mobile = data.mobile;
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


	$scope.hasSearchWords = function() {
		return $scope.inputOrderWords	&& $scope.inputOrderWords.trim().length > 0;
	};

	$scope.$on('order:received', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.shouldUpdateOrderItemList(state.currentTab.RECEIVED, $scope.immediateOrReservationSelect, data.sn)
				.then((response) => {
					$scope.currentOrderTab = state.currentTab.RECEIVED;	
					$scope.normalOrderCount = response.total;	
					$scope.averageTimer = response.average;
				});
		}
	});

	$scope.$on('order:depart', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.shouldUpdateOrderItemList(state.currentTab.STARTED, $scope.immediateOrReservationSelect, data.sn)
				.then((response) => {
					$scope.currentOrderTab = state.currentTab.RECEIVED;	
					$scope.normalOrderCount = response.total;	
					$scope.averageTimer = response.average;
				});
		}
	});

	$scope.$on('order:done', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.shouldUpdateOrderItemList(state.currentTab.DONE, $scope.immediateOrReservationSelect, data.sn)
				.then((response) => {
					$scope.currentOrderTab = state.currentTab.DONE;	
					$scope.normalOrderCount = response.total;	
					$scope.averageTimer = response.average;
				});
		}
	});


	$scope.isCancelBtnShow = function() {
		if ($scope.isDoneCurrentTab() ||
				$scope.isStartedCurrentTab()) {
					return false;
				} else {
					return true;
				}
	};

	$scope.isDriverFuckBtnShow = function() {
		if ($scope.isExceptionCurrentTab() ||
				$scope.isStartedCurrentTab() ||
				$scope.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}	
	};

	$scope.isPassengerFuckBtnShow = function() {
		if ($scope.isExceptionCurrentTab() ||
				$scope.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}	
	};

	$scope.isAssignBtnShow = function() {
		if ($scope.isDoneCurrentTab() || 
				$scope.isReceivedCurrentTab()) {
					return false;
				} else {
					return true;
				}	
	};

	$scope.handleCancelOrder = function(item) {
		seatService.handleCancelOrder(item);
	};

	$scope.handleDriverFuckOrder = function(item) {
		seatService.handleDriverFuckOrder(item)
			.then((response) => {
				item.statusName = '司机放空';	
			});	
	};

	$scope.handlePassengerFuckOrder = function(item) {
		seatService.handleCancelOrder(item)
			.then((response) => {
				item.statusName = '乘客放空';	
			});	
	};

	$scope.assignOrderByCarPlate = function(item, input) {
		seatService.assignOrderByCarPlate(item, input);
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
	$scope.handleOrderTypeChange = function() {
		seatService.setOrderType($scope.orderType.value);
		$scope.getOrders();
	};

	$scope.getOrders = function() {
		seatService['get' + tabsName[$scope.currentOrderTab] + 'Orders']($scope.immediateOrReservationSelect)
			.then((response) => {
				if ($scope.isExceptionCurrentTab()) {
					$scope.exceptionOrderCount = response.total;	
				} else {
					$scope.normalOrderCount = response.total;	
				}
				$scope.averageTimer = response.average;
			});
	};



}

export default {
	name: 'seatCtrl',
	fn: SeatCtrl
};
