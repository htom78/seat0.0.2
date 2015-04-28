var controllers = require('./index');

var initInfo = {
	beginTime: '',
	endTime: '',
	currentPage: 1,
	keywords: '',
	status: -1
};

var searchCtrl = function($scope, orderService) {

	$scope.tabCount = {
		total: 0,
		immediate: 0,
		prepared: 0
	};

		//全部、即时、预约，切换按钮
	$scope.toggleCallType = function(type) {
		$scope.isSearching = false;
		$scope.search = angular.copy(initInfo);
		$scope.search.callType = type;
		var callTypes = ['total', 'immediate', 'prepared'];
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
				$scope.tabCount[callTypes[type]] = $scope.orders.total;
			});
	};

	//点击搜索按钮
	$scope.searchOrder = function() {
		$scope.isSearching = true;
		$scope.search.currentPage = 1;
		$scope.search.keywords = $scope.words;
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//点击分页按钮
	$scope.onSelectPage = function(page) {
		$scope.search.currentPage = page;
		if ($scope.isSearching) {
			$scope.search.keywords = $scope.words;
		} else {
			$scope.search.keywords = '';
		}
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	$scope.isCurrentTab = function(type) {
		return $scope.search.callType === type;
	};

	//更多筛选条件
	$scope.selectMore = function() {
		var temp = angular.copy(initInfo);
		temp.callType = $scope.search.callType;
		$scope.search = temp;
		$scope.isShowMore = !$scope.isShowMore;
	};

	//init
	$scope.toggleCallType(0);
};

searchCtrl.$inject = ['$scope', 'orderService'];

controllers.controller('searchCtrl', searchCtrl);