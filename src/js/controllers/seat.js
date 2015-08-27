var controllers = require('./index');
var moment = require('moment');

var seatCtrl = function ($scope,  userService, seatMap, seatService, utils) {

	$scope.orders = seatService.orders;

	$scope.normalOrderCount = seatService.getNormalOrderCount;

	$scope.exceptionOrderCount = seatService.getExceptionOrderCount;

	$scope.averageTimer = seatService.getAverageTimer;

	var currentTimer = new Date();
	var initOrderData = {
		gender: 1,
		poiList: [],
		targetpoiList: [],
		count: 1,
		isReservation: false,
		isCarType: false,
		hour: currentTimer.getHours(),
		minute: currentTimer.getMinutes(),	
		reservationCalendar: moment().format('YYYY-MM-DD')
	};

	$scope.orderData = angular.copy(initOrderData);

	/*****************************************/
	$scope.addNewOrder = function() {
		if ($scope.newOrder.$valid) {
			$scope.sendingOrderData = true;
			seatService.addNewOrder($scope.orderData)
				.then(function () {
					$scope.initOrderDataAndUserData();	
					$scope.currentOrderTab = 'prepared';
					$scope.updateOrderCallType();
				}, function (err) {
					alert('订单提交失败:' + err);
				})
			.finally(function() {
				$scope.sendingOrderData = false;
			});
		}
	};

	$scope.initOrderDataAndUserData = function() {
		$scope.mobilePosition = '';	
		$scope.orderData = angular.copy(initOrderData);
		$scope.userData = {};
		$scope.newOrder.$setPristine();
		seatMap.resetMap();
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

	$scope.currentOrderTab = 'prepared';
	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = 'prepared';
		return seatService.getPreparedOrders();
	};
	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		return seatService.getReceivedOrders();
	};
	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		return seatService.getStartedOrders();
	};
	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		return seatService.getDoneOrders();
	};
	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		return seatService.getExceptionOrders();
	};

	$scope.isCurrentTab = function(tabName) {
		return $scope.currentOrderTab === tabName;
	};

	$scope.searchCurrentOrderByKeywords = function() {
		seatService.getCurrentOrdersByKeywords($scope.inputOrderWords);
	};

	$scope.immediateOrReservation = '即时';
	$scope.toggleImmediateOrReservation = function() {
		if ($scope.immediateOrReservation === '即时') {
			$scope.immediateOrReservation = '预约';	
			seatService.selectReservation();
		} else {
			$scope.immediateOrReservation = '即时';	
			seatService.selectImmediate();
		}	
		seatService.refreshCurrentOrder();
	};


	$scope.queryOrderBySn = function() {
		if ($scope.userData.sn) {
			seatService.queryOrderBySn($scope.userData.sn, $scope.userData.isImmediate)
				.then(function(order) {
					$scope.updateOrderTab(order.status);
					$scope.updateOrderCallType();
					angular.copy([order], $scope.orders);
					$scope.updateOrderCallType();
				});	
		}
	};

	$scope.updateOrderCallType = function() {
		if (seatService.isImmediateSelect()) {
			$scope.immediateOrReservation = '即时';
		} else {
			$scope.immediateOrReservation = '预约';
		}
	};

	$scope.updateOrderTab = function(status) {
		var tabsName = ['exception', 'prepared', 'received', 'started', 'done'];	
		$scope.currentOrderTab = tabsName[status];
	};

	$scope.hasSearchWords = function() {
		return $scope.inputOrderWords	&& $scope.inputOrderWords.trim().length > 0;
	};

	$scope.clearSearchWords = function() {
		$scope.inputOrderWords = '';
	};

	//用户拨打电话进来，异步
	$scope.$on('userCall', function(ev, data) {
		$scope.initOrderDataAndUserData();
		var mobile = data.mobile;
		$scope.orderData.callingTel = mobile;
		$scope.orderData.actualTel = mobile;
		userService.getUserInfoByMobile(mobile)
		.then(function(response) {
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

	$scope.$on('order:receive', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.receiveOrderUpdate(data.sn).then(function() {
				$scope.currentOrderTab = 'receive';	
			});
		}
	});

	$scope.$on('order:depart', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.startedOrderUpdate(data.sn).then(function() {
				$scope.currentOrderTab = 'stated';	
			});
		}
	});

	$scope.$on('order:done', function(ev, data) {
		if (!$scope.hasSearchWords()) {
			seatService.doneOrderUpdate(data.sn).then(function() {
				$scope.currentOrderTab = 'done';	
			});
		}
	});

	$scope.$on('$destroy', function() {
		seatMap.clearMap();	
	});

	$scope.showBtns = function(order) {
		seatService.toggleShowBtns(order);
	};

	$scope.handleCancelOrder = function(order) {
		seatService.handleCancelOrder(order);
	};

	$scope.handleDriverFuckOrder = function(order) {
		seatService.handleDriverFuckOrder(order);	
	};

	$scope.handlePassengerFuckOrder = function(order) {
		seatService.handlePassengerFuckOrder(order);	
	};

	$scope.assignCar = function(order, carPlate) {
		seatService.assignOrderToCarPlate(order, carPlate);
	};


	$scope.isExceptionCurrentTab = function() {
		return $scope.currentOrderTab === 'exception';	
	};

	$scope.isDoneCurrentTab = function() {
		return $scope.currentOrderTab === 'done';	
	};

	$scope.isReceivedCurrentTab = function() {
		return $scope.currentOrderTab === 'received';	
	};

	$scope.isStartedCurrentTab = function() {
		return $scope.currentOrderTab === 'started';	
	};

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

};

seatCtrl.$inject = [
'$scope', 
	'userService', 
	'seatMap', 
	'seatService',
	'utils'
	];

	controllers.controller('seatCtrl', seatCtrl);
