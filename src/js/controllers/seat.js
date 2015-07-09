var controllers = require('./index');
var moment = require('moment');

var seatCtrl = function ($scope, $timeout,  userService, seatMapService, socketService, selectData, employerService, seatOrderStorageService) {

	$scope.orders = seatOrderStorageService.orders;

	var initOrderData = {
		gender: 1,
		startList: [],
		destinationList: [],
		count: 1,
		isReservation: false,
		isCarType: false,
		hour: 0,
		minute: 0,
		reservationCalendar: moment().format('YYYY-MM-DD')
	};

	var initUserData = {
		orderFuck: 0,
		orderTotal: 0,
		timeCreated: '',
		orderNumber: '',
		rank: ''
	};

	//select 小时 分钟
	$scope.options = {
		hour: selectData.hour,
		minute: selectData.minute	
	};

	$scope.orderData = angular.copy(initOrderData);
	$scope.userData = angular.copy(initUserData);

	/*****************************************/
	$scope.addNewOrder = function() {
		$scope.sendingOrderData = true;
		seatOrderStorageService.addNewOrder($scope.orderData)
			.then(function (response) {
				var sn = response.sn;
				var newOrderData = response.order;
				$scope.initOrderDataAndUserData();	
				$scope.cutOrderTabPrepared()
					.then(function() {
						seatOrderStorageService.addNewOrderState(sn, newOrderData);
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
		return seatOrderStorageService.getPreparedOrders();
	};
	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		return seatOrderStorageService.getReceivedOrders();
	};
	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		return seatOrderStorageService.getStartedOrders();
	};
	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		return seatOrderStorageService.getDoneOrders();
	};
	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		return seatOrderStorageService.getExceptionOrders();
	};

	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.currentOrderTab;
	};


	$scope.searchCurrentOrderByKeywords = function() {
		seatOrderStorageService.getCurrentOrdersByKeywords($scope.inputOrderWords);
	};

	//用户拨打电话进来，异步
	$scope.$on('userCall', function(ev, data) {
		$scope.initOrderDataAndUserData();
		var mobile = data.mobile;
		$scope.orderData.callingTel = mobile;
		$scope.orderData.actualTel = mobile;

		//自动焦距
		var startInput = document.getElementById('startInput');
		if (startInput) {
			setTimeout(function() {
				startInput.focus();
			}, 1000);
		}

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


	$scope.$on('order:stateChange', function(ev, orderInfo) {
		if ($scope.pause || seatOrderStorageService.pauseSearch) {
			return;	
		}
		$timeout(function() {
			var sn = orderInfo.sn;
			switch (orderInfo.state) {
				case 'received':
					seatOrderStorageService.getVriableOrders(2, sn)
						.then(function() {
							$scope.currentOrderTab = 'received';
						}, function() {
							console.log('receive error');	
						});
					break;	
				case 'started':
					seatOrderStorageService.getVriableOrders(3, sn)
						.then(function() {
							$scope.currentOrderTab = 'started';
						}, function() {
							console.log('started error');	
						});
					break;
				case 'done':
					seatOrderStorageService.getVriableOrders(4, sn)
						.then(function() {
							$scope.currentOrderTab = 'done';
						}, function() {
							console.log('done error');	
						});
					break;
			}
		}, 200);
	
	});


	//电话号码归属地
	$scope.$watch('orderData.actualTel', function(value) {
		if (value) {
			userService.fromMobileGetLocation(value)
				.then(function(response) {
					$scope.mobilePosition = response.carrier;
				});	
		} else {
			$scope.mobilePosition = '';	
		}
	});


	$scope.searchType = '即时';
	//即时、预约切换
	$scope.toggleSearchType = function() {
		if ($scope.searchType === '即时') {
			$scope.searchType = '预约';	
			seatOrderStorageService.getCurrentPrepareOrder();
		} else {
			$scope.searchType = '即时';	
			seatOrderStorageService.getCurrentImmediateOrder();
		}	
	};

//socket connection
	$scope.$watch(function() {
		return employerService.employerName;		
	}, function() {
		if (employerService.employerName && 
			employerService.employerName === window.employer) {
			socketService.connection();
		}	
	});

	$scope.$on('$destroy', function() {
		socketService.close();
	});

};


seatCtrl.$inject = [
	'$scope', 
	'$timeout', 
	'userService', 
	'seatMapService', 
	'socketService', 
	'selectData',
	'employerService',
	'seatOrderStorageService'
	];

controllers.controller('seatCtrl', seatCtrl);
