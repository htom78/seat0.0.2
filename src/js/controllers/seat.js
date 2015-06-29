var controllers = require('./index');
var moment = require('moment');

var seatCtrl = function ($scope, $timeout,  userService, seatMapService, socketService, phoneService, selectData, orderUtils, employerService, store) {
	$scope.orders = store.orders;
	//初始化订单信息
	var initOrderInfo = {
		gender: 1,
		startList: [],
		count: 1,
		isReservation: false,
		isCarType: false,
		hour: 0,
		minute: 0,
		reservationCalendar: moment().format('YYYY-MM-DD')
	};


	//初始化用户信息
	var initUserInfo = {
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

	$scope.order = angular.copy(initOrderInfo);
	$scope.user = angular.copy(initUserInfo);

	var snTimer;
	/*****************************************/
	//新建订单
	$scope.addNewOrder = function() {
		$scope.sendingOrderData = true;
		if ($scope.newOrder.$valid) {
			store.insert($scope.order)
			.then(function success(response) {
				var sn = response.sn;
				var newOrderData = response.order;
				$scope.cancelOrder();	
				$scope.cutOrderTabPrepared()
					.then(function() {
						store.addNewOrderState(sn, newOrderData);
					});
			}, function error(err) {
				alert('订单提交失败:' + err);
			})
			.finally(function() {
				$scope.sendingOrderData = false;
			});
		}
	};

	//清空表单数据
	$scope.cancelOrder = function() {
		$scope.order = angular.copy(initOrderInfo);
		$scope.user = angular.copy(initUserInfo);
		$scope.newOrder.$setPristine();
		seatMapService.resetMap();
	};


	//普通下单
	$scope.addOrder = function() {
		$scope.order.vehicleNumber = null;
		$scope.addNewOrder();
	};

	//通过地图上的出租车图标下单
	$scope.$on('addNewOrder', function(ev, carInfo) {
		$scope.order.vehicleNumber = carInfo.vehicleNumber;
		$scope.addNewOrder();
	});

	//订单查询 右下部分
	//exception(0),prepared(1),received(2),started(3),done(4);

	$scope.currentOrderTab = 'prepared';
	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = 'prepared';
		return store.getPrepared();
	};
	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		return store.getReceived();
	};
	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		return store.getStarted();
	};
	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		return store.getDone();
	};
	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		return store.getException();
	};

	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.currentOrderTab;
	};


	//搜索
	$scope.search = function() {
		store.searchOrderForKeywords($scope.inputOrderWords);
	};

	//用户拨打电话进来，异步
	$scope.$on('userCall', function(ev, data) {
		$scope.cancelOrder();
		var mobile = data.mobile;
		$scope.order.callingTel = mobile;
		$scope.order.actualTel = mobile;

		//自动焦距
		var startInput = document.getElementById('startInput');
		if (startInput) {
			setTimeout(function() {
				startInput.focus();
			}, 1000);
		}

		userService
			.getUserInfoToMobile(mobile)
			.then(function(response) {
				$scope.user.orderFuck = response.fkTotal;
				$scope.user.orderTotal = response.total;
				$scope.user.timeCreated = response.timeCreated;
				$scope.user.orderNumber = response.sn;
				$scope.user.rank = response.rank;

				$scope.order.fullName = response.contactName;
				$scope.order.destinationList = response.targetpoiList;
				$scope.order.startList = response.poiList;
			}, function() {
				$scope.user = angular.copy(initUserInfo);
				$scope.order.fullName = '';
				$scope.order.destinationList = [];
				$scope.order.startList = [];
			});
	});


	$scope.$on('order:stateChange', function(ev, orderInfo) {
		if ($scope.pause || store.pauseSearch) {
			return;	
		}
		$timeout(function() {
			var sn = orderInfo.sn;
			switch (orderInfo.state) {
				case 'received':
					store.getVriableOrders(2, sn)
						.then(function() {
							$scope.currentOrderTab = 'received';
						}, function() {
							console.log('receive error');	
						});
					break;	
				case 'started':
					store.getVriableOrders(3, sn)
						.then(function() {
							$scope.currentOrderTab = 'started';
						}, function() {
							console.log('started error');	
						});
					break;
				case 'done':
					store.getVriableOrders(4, sn)
						.then(function() {
							$scope.currentOrderTab = 'done';
						}, function() {
							console.log('done error');	
						});
					break;
			}
		}, 100);
	
	});


	//电话号码归属地
	$scope.$watch('order.actualTel', function(value) {
		if (value) {
			phoneService
				.mobileToPosition(value)
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
			store.orderSearchParams.isImmediate = 0;
		} else {
			$scope.searchType = '即时';	
			store.orderSearchParams.isImmediate = 1;
		}	
		store.flushCurrentOrderTab();
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
		$timeout.cancel(snTimer);
		//关闭socket
		socketService.close();
	});

};


seatCtrl.$inject = [
	'$scope', 
	'$timeout', 
	'userService', 
	'seatMapService', 
	'socketService', 
	'phoneService', 
	'selectData',
	'orderUtils',
	'employerService',
	'store'
	];

controllers.controller('seatCtrl', seatCtrl);
