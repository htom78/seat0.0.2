var controllers = require('./index');

var seatCtrl = function ($scope, orderResource, $timeout, orderService) {
	//新建订单
	$scope.order = {};
	$scope.addOrder = function() {
		orderResource.add($scope.order);
	};


	//用户个人统计图、订单次数放空次数统计
	$scope.user = {};
	$scope.user.orderFuck = 0;
	$scope.user.orderTotal = 0;
	$timeout(function() {
		$scope.user.orderFuck = 3;
		$scope.user.orderTotal = 20;
	}, 3000);

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
	//初始化查询
	$scope.toggleTab('prepared');

};
seatCtrl.$inject = ['$scope', 'orderResource', '$timeout', 'orderService'];

controllers.controller('seatCtrl', seatCtrl);