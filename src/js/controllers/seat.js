var controllers = require('./index');
var moment = require('moment');

var seatCtrl = function ($scope, $timeout,  userService, seatMapService, seatService, utils) {

	$scope.orders = seatService.orders;

	$scope.normalOrderCount = seatService.getNormalOrderCount;

	$scope.exceptionOrderCount = seatService.getExceptionOrderCount;

	$scope.averageTimer = seatService.getAverageTimer;

	var currentTimer = new Date();
	var initOrderData = {
		gender: 1,
		startList: [],
		destinationList: [],
		count: 1,
		isReservation: false,
		isCarType: false,
		hour: currentTimer.getHours(),
		minute: currentTimer.getMinutes(),	
		reservationCalendar: moment().format('YYYY-MM-DD')
	};

	var initUserData = {
		orderFuck: 0,
		orderTotal: 0,
		timeCreated: '',
		orderNumber: '',
		rank: ''
	};

	$scope.orderData = angular.copy(initOrderData);
	$scope.userData = angular.copy(initUserData);

	/*****************************************/
	$scope.addNewOrder = function() {
		$scope.sendingOrderData = true;
		seatService.addNewOrder($scope.orderData)
			.then(function (newOrderData) {
				$scope.initOrderDataAndUserData();	
				$scope.cutOrderTabPrepared()
					.then(function() {
						seatService.addNewOrderState(newOrderData);
					});
			}, function (err) {
				alert('订单提交失败:' + err);
			})
			.finally(function() {
				$scope.sendingOrderData = false;
			});
	};

	$scope.initOrderDataAndUserData = function() {
		$scope.mobilePosition = '';	
		$scope.orderData = angular.copy(initOrderData);
		$scope.userData = angular.copy(initUserData);
		$scope.newOrder.$setPristine();
		seatMapService.resetMap();
	};

	//清空表单数据
	$scope.cancelOrder = function() {
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

	//订单查询 右下部分
	//exception(0),prepared(1),received(2),started(3),done(4);

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
		return tabName === $scope.currentOrderTab;
	};

	$scope.searchCurrentOrderByKeywords = function() {
		seatService.getCurrentOrdersByKeywords($scope.inputOrderWords);
	};

	$scope.immediateOrReservation = '即时';
	//即时、预约切换
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

	//用户拨打电话进来，异步
	$scope.$on('userCall', function(ev, data) {
		$scope.initOrderDataAndUserData();
		var mobile = data.mobile;
		$scope.orderData.callingTel = mobile;
		$scope.orderData.actualTel = mobile;

		userService.getUserInfoByMobile(mobile)
			.then(function(response) {
				$scope.userData.orderFuck = response.fkTotal;
				$scope.userData.orderTotal = response.total;
				$scope.userData.timeCreated = response.timeCreated;
				$scope.userData.orderNumber = response.sn;
				$scope.userData.rank = response.rank;

				$scope.orderData.fullName = response.contactName;
				$scope.orderData.destinationList = response.targetpoiList;
				$scope.orderData.startList = response.poiList;
			}, function() {
				$scope.userData = angular.copy(initUserData);
				$scope.orderData.fullName = '';
				$scope.orderData.destinationList = [];
				$scope.orderData.startList = [];
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
		seatService.receiveOrderUpdate(data.sn).then(function() {
			$scope.currentOrderTab = 'receive';	
		});
	});

	$scope.$on('order:depart', function(ev, data) {
		seatService.startedOrderUpdate(data.sn).then(function() {
			$scope.currentOrderTab = 'stated';	
		});
	});

	$scope.$on('order:done', function(ev, data) {
		seatService.doneOrderUpdate(data.sn).then(function() {
			$scope.currentOrderTab = 'done';	
		});
	});

};


seatCtrl.$inject = [
	'$scope', 
	'$timeout', 
	'userService', 
	'seatMapService', 
	'seatOrderStorageService',
	'utils'
	];

controllers.controller('seatCtrl', seatCtrl);
