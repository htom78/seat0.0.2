var controllers = require('./index');

var searchCtrl = function($scope, searchOrderStorageService) {

	$scope.orders = searchOrderStorageService.orders;

	$scope.allOrderCount = searchOrderStorageService.getAllOrderCount;
	$scope.immediateOrderCount = searchOrderStorageService.getImmediateOrderCount;
	$scope.reservationOrderCount = searchOrderStorageService.getReservationOrderCount;

	$scope.$watch('orders', function() {
		$scope.currentOrderPage = searchOrderStorageService.currentOrderPage;
		$scope.orderItemCount = searchOrderStorageService.orderItemCount;
	}, true);

	$scope.currentOrderTab = 'all';
	$scope.isCurrentTab = function(type) {
		return $scope.currentOrderTab === type;
	};

	$scope.cutAllOrderTab = function() {
		$scope.currentOrderTab = 'all';
		return searchOrderStorageService.getAllOrders();
	};

	$scope.cutImmediateOrderTab = function() {
		$scope.currentOrderTab = 'immediate';
		return searchOrderStorageService.getImmediatOrders();
	};

	$scope.cutReservationOrderTab = function() {
		$scope.currentOrderTab = 'reservation';	
		return searchOrderStorageService.getReservationOrders();
	};

	//点击分页按钮
	$scope.onSelectPage = function(page) {
		searchOrderStorageService.getSelectPageOrder(page);
	};

	//更多筛选条件
	$scope.filterMoreOrderSearchBtn = function() {
		$scope.isShowMore = !$scope.isShowMore;	
	};

	//点击搜索按钮
	$scope.searchOrder = function() {
		var filterData = {
			beginTime: '',
			endTime: ''	
		};
		if ($scope.isShowMore) {
			filterData.beginTime = $scope.searchOrderBeginTime;
			filterData.endTime = $scope.searchOrderEndTime;	
		}
		searchOrderStorageService.searchOrderForKeywords($scope.words, filterData);
	};

};

searchCtrl.$inject = [
	'$scope', 
	'searchOrderStorageService'
	];

controllers.controller('searchCtrl', searchCtrl);
