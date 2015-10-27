'use strict';
function SearchCtrl($scope, searchService, initCount) {
	$scope.orders = searchService.orderss;

	$scope.allOrderCount = initCount;
	$scope.immediateOrderCount = 0;
	$scope.reservationOrderCount = 0;

	let isSearch = false;
	let searchData = {
		keywords: '',
		beginTime: '',
		endTime: ''	
	};

	$scope.$watch( () => searchService.shoudUpdate, function() {
		$scope.currentOrderPage = searchService.currentPage;
		$scope.orderItemCount = searchService.total;
	});

	$scope.currentOrderTab = 'all';
	$scope.isCurrentTab = function(type) {
		return $scope.currentOrderTab === type;
	};

	$scope.cutAllOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = 'all';
		searchService.getAllOrders()
			.then((total) => {
				$scope.allOrderCount = total;	
			});
	};

	$scope.cutImmediateOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = 'immediate';
		searchService.getImmediatOrders()
			.then((total) => {
				$scope.immediateOrderCount = total;
			});
	};

	$scope.cutReservationOrderTab = function() {
		isSearch = false;
		$scope.currentOrderTab = 'reservation';	
		searchService.getReservationOrders()
			.then((total) => {
				$scope.reservationOrderCount = total;
			});
	};

	//更多筛选条件
	$scope.filterMoreOrderSearchBtn = function() {
		$scope.isShowMore = !$scope.isShowMore;	
	};

	//点击搜索按钮
	$scope.searchOrder = function() {
		isSearch = true;
		let [beginTime, endTime] = ['', ''];
		if ($scope.isShowMore) {
			beginTime = $scope.searchOrderBeginTime;
			endTime =$scope.searchOrderEndTime;
		}

		searchData.beginTime = beginTime;
		searchData.endTime = endTime;
		searchData.keywords = $scope.words;
		searchService.queryOrderByKeyWords($scope.words, beginTime, endTime);
	};

	//点击分页按钮
	$scope.onSelectPage = function(page) {
		if (isSearch) {
			searchService.getSelectPageOrder(page, searchData.keywords, searchData.beginTime, searchData.endTime);
		} else {
			searchService.getSelectPageOrder(page);
		}
	};
}

export default {
	name: 'searchCtrl',
	fn: SearchCtrl
};
