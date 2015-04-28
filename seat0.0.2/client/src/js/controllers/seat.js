var controllers = require('./index');

var seatCtrl = function ($scope, $timeout, orderService, $q, userService) {
	//新建订单
	$scope.order = {
		gender: 1,
		startList: []
	};

	//叫车数默认为1
	$scope.callCarCount = 1;
	$scope.addOrder = function() {
		$scope.order.vehicleNumber = null;
		if ($scope.newOrder.$valid) {
			var callCount = 1;
			if (typeof parseInt($scope.callCarCount) === 'number' && 
					$scope.callCarCount > 0) {
				callCount = $scope.callCarCount > 5 ? 5 : $scope.callCarCount;
			}
			var requests = [];
			for (var i = 0; i < callCount; i ++ ) {
				requests.push(orderService.add);
			}
			$q
				.all(angular.forEach(requests, function(request) {
					request($scope.order);
				}))
				.then(function() {
					alert('下单成功');
					$scope.cancelOrder();
				});
		}
		
	};

	

	//订单查询 右下部分
	//exception(0),prepared(1),received(2),started(3),done(4);
	$scope.search = {};
	$scope.errorTotal = 0;
	$scope.toggleTab = function(tabName) {
		$scope.search.currentTab = tabName;
		$scope.search.keywords = '';
		orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
				if ($scope.isCurrentTab('exception')) {
					$scope.errorTotal = $scope.orders.total;
				} else {
					$scope.normalTotal = $scope.orders.total;
				}
			});
	};
	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};
	$scope.search = function() {
		$scope.search.keywords = $scope.words;
		orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
			});
	};

	$scope.$on('addNewOrder', function(ev, carInfo) {
		$scope.order.vehicleNumber = carInfo.vehicleNumber;
		if ($scope.newOrder.$valid) {
			orderService
				.add($scope.order)
				.then(function() {
					alert('指派成功');
					$scope.cancelOrder();
				});
		}
	});

	//初始化查询
	$scope.toggleTab('prepared');

	//用户电话拨打进来
	var initUserInfo = {
		orderFuck: 0,
		orderTotal: 0,
		timeCreated: '',
		orderNumber: '',
		rank: ''
	};
	$scope.user = angular.copy(initUserInfo);

	//用户拨打电话进来，异步
	$scope.$on('userCall', function(ev, data) {
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
/************************************************************/

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

	//清空表单数据
	$scope.cancelOrder = function() {
		$scope.order = {
			gender: 1,
			startList: []
		};
		$scope.newOrder.$setPristine();
		$scope.user = angular.copy(initUserInfo);
	};

};


seatCtrl.$inject = ['$scope', '$timeout', 'orderService', '$q', 'userService'];

controllers.controller('seatCtrl', seatCtrl);