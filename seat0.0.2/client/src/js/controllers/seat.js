var controllers = require('./index');

var seatCtrl = function ($scope, $timeout, orderService, $q, userService, seatMapService) {

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
	$scope.addNewOrder = function() {
		if ($scope.newOrder.$valid) {
			var newOrder = $scope.order;
			orderService
				.add($scope.order)
				.then(function(sn) {
					//下单成功返回一个订单号，序列号
					$scope.cancelOrder();
					//右下脚，切换到pera
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
							if (orders.total === 0) {
								$scope.orders = [order]; 	
							} else {
								angular.forEach(orders, function(o) {
									if (order.sn === o.sn) {
										return;
									}	
								});	
								$scope.normalTotal = orders.total + 1;
								$scope.orders.unshift = order;
							}
						});
				}, function(error) {
					alert('下单失败:' + error);	
				});
		}
	};

	//清空表单数据
	$scope.cancelOrder = function() {
		$scope.order = angular.copy(initOrderInfo);
		$scope.newOrder.$setPristine();
		seatMapService.removeCarMarker();
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
		$scope.search.currentTab = tabName;
		$scope.search.keywords = '';
		$scope.show.sn = 'quan';
		$scope.show.tab = 'quan';
		$timeout.cancel(snTimer);
		return orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
				if ($scope.isCurrentTab('exception')) {
					$scope.errorTotal = $scope.orders.total;
				} else {
					$scope.normalTotal = $scope.orders.total;
				}
				return $scope.orders;
			});
	};


	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};


	//搜索
	$scope.search = function() {
		$scope.search.keywords = $scope.words;
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
		if ($scope.isCurrentTab('prepared') && status === 'received') {
			$scope
				.toggleTab(status)
				.then(function(orders) {
					$scope.show.sn = sn;	
				});
			return;
		}
		if (status !== $scope.search.currentTab) {
			$scope.show.tab = status;		
		} else if (status === 'done') {
			//当前的tab为完成，刷新tab，根据order.sn === sn 来添加className		
			$scope
				.toggleTab(status)
				.then(function(orders) {
					$scope.show.sn = sn;	
				});
		} else {
			$scope.show.sn = sn;	
			snTimer = $timeout(function() {
				$scope
					.toggleTab(status);
			}, 3000);
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

	$scope.$on('$destroy', function() {
		$timeout.cancel(snTimer);
	});

};


seatCtrl.$inject = ['$scope', '$timeout', 'orderService', '$q', 'userService', 'seatMapService'];

controllers.controller('seatCtrl', seatCtrl);
