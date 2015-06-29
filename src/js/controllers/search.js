var controllers = require('./index');

var initInfo = {
	beginTime: '',
	endTime: '',
	currentPage: 1,
	keywords: '',
	status: -1
};

var searchCtrl = function($scope, store) {

	$scope.orders = store.orders;

	$scope.currentOrderTab = 'all';
	$scope.allOrderCount = 0;
	$scope.immediateOrderCount = 0;
	$scope.reservationOrderCount = 0;

	$scope.$watch('orders', function() {
		$scope.currentOrderPage = store.currentOrderPage;
		$scope.orderItemCount = store.orderItemCount;
	}, true);

	$scope.isCurrentTab = function(type) {
		return $scope.currentOrderTab === type;
	};

	$scope.cutAllOrderTab = function() {
		$scope.currentOrderTab = 'all';
		return store.getAllOrders();
	};

	$scope.cutImmediateOrderTab = function() {
		$scope.currentOrderTab = 'immediate';
		return store.getImmediatOrders();
	};

	$scope.cutReservationOrderTab = function() {
		$scope.currentOrderTab = 'reservation';	
		return store.getReservationOrders();
	};

	//点击分页按钮
	$scope.onSelectPage = function(page) {
		store.getSelectPageOrder(page);
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
		store.searchOrderForKeywords($scope.words, filterData);
	};

};

searchCtrl.$inject = [
	'$scope', 
	'store'
	];

controllers.controller('searchCtrl', searchCtrl);
