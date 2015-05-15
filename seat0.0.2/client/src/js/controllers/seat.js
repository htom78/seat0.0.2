var controllers = require('./index');

var seatCtrl = function ($scope, $timeout, orderService, $q, userService, seatMapService, socketService, phoneService) {

	//初始化订单信息
	var initOrderInfo = {
		gender: 1,
		startList: [],
		count: 1
	};

	//初始化用户信息
	var initUserInfo = {
		orderFuck: 0,
		orderTotal: 0,
		timeCreated: '',
		orderNumber: '',
		rank: ''
	};

	$scope.show = {};	

	$scope.order = angular.copy(initOrderInfo);
	$scope.user = angular.copy(initUserInfo);

	var snTimer;


	/*****************************************/
	//新建订单
	$scope.addNewOrder = function() {
		if ($scope.newOrder.$valid) {
			$scope.sending = true;
			var newOrder = $scope.order;
			orderService
				.add($scope.order)
				.then(function(sn) {
					$scope.sending = false;
					//下单成功返回一个订单号，序列号
					//清空订单字段
					$scope.cancelOrder();
					//订单添加成功，右下脚，切换到prepared
					$scope
						.toggleTab('prepared')
						.then(function(orders) {
							var order = {
								sn: sn,
								timeCreated: new Date(),
								user: newOrder.fullName,
								contactPhone: newOrder.actualTel,
								vehicleNumber: '',
								poi: newOrder.start,
								'destination_poi': newOrder.end
							}; 	
							$scope.show.sn = sn;	
							if (orders.total === 0) {
								$scope.orders = [order]; 	
							} else {
								var has = false;
								angular.forEach(orders, function(o) {
									if (order.sn === o.sn) {
										has = true;
										return;
									}	
								});	
								if (!has) {
									$scope.normalTotal = orders.total + 1;
									$scope.orders.unshift = order;
								}
							}
						});
				}, function(error) {
					$scope.sending = false;
					alert('下单失败:' + error);	
				});
		}
	};

	$scope.isSending = function() {
	    return $scope.sending;	
	};

	//清空表单数据
	$scope.cancelOrder = function() {
		$scope.order = angular.copy(initOrderInfo);
		$scope.newOrder.$setPristine();
		seatMapService.resetMap();
		$scope.user = angular.copy(initUserInfo);
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
	$scope.search = {};
	$scope.errorTotal = 0;
	$scope.toggleTab = function(tabName) {
		$scope.pause = true;
		$scope.search.currentTab = tabName;
		$scope.search.keywords = '';
		$scope.show.sn = 'quan';
		$timeout.cancel(snTimer);
		return orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.averageTimer = response.averageTimer;
				if ($scope.isCurrentTab('exception')) {
					$scope.errorTotal = $scope.orders.total;
				} else {
					$scope.normalTotal = $scope.orders.total;
				}
				$timeout(function() {
				    $scope.pause = false;	
				}, 3000);
				return $scope.orders;
			});
	};


	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};


	//搜索
	$scope.search = function() {
		$scope.search.keywords = $scope.words;
		$scope.averageTimer = 0;
		orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
			});
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

	//初始化查询
	$scope.toggleTab('prepared');

	$scope.orderStatus = function(status, sn) {
		if (!$scope.pause) {
			$timeout(function() {
				$scope
					.toggleTab(status)
					.then(function() {
						$scope.show.sn = sn;	
					});
			}, 300);
		}
	};

	$scope.isAddTab = function(tabName) {
		return $scope.show.tab === tabName;	
	};

	$scope.isOrderSn = function(sn) {
		return $scope.show.sn === sn;	
	};

	//订单状态事件
	$scope.$on('order:received', function(ev, sn) {
		$scope.orderStatus('received', sn);
	});

	$scope.$on('order:started', function(ev, sn) {
		$scope.orderStatus('started', sn);
	});

	$scope.$on('order:done', function(ev, sn) {
		$scope.orderStatus('done', sn);
	});

	socketService.connection();
	$scope.$on('$destroy', function() {
		$timeout.cancel(snTimer);
		socketService.close();
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

};


seatCtrl.$inject = ['$scope', '$timeout', 'orderService', '$q', 'userService', 'seatMapService', 'socketService', 'phoneService'];

controllers.controller('seatCtrl', seatCtrl);
