'use strict';
import angular from 'angular';

function SearchCtrl($scope, searchService, startCount, orderStatuses) {
	$scope.orders = searchService.orderss;
	$scope.orderItemCount = startCount;		
	$scope.orderStatuses = orderStatuses;
	$scope.orderTypes = [{name: '即时', value: 1}, {name: '预约', value: 0}];

	const searchData = {};



	//点击搜索按钮
	$scope.currentOrderPage = 1;
	$scope.searchOrder = function() {

		$scope.currentOrderPage = 1;
		searchData.poi = $scope.order.startPosition;
		searchData.targetPoi = $scope.order.destination;	
		searchData.vehilceNumber = $scope.order.carPlate;
		searchData.contactPhone = $scope.order.concatPhone;
		searchData.sn = $scope.order.orderNumber;
		searchData.opName = $scope.order.operatorName;
		searchData.status = $scope.order.orderStatus.id;
		searchData.isImmediate = $scope.order.orderType.value;
		searchData.beginTime = $scope.order.beginTime;
		searchData.endTime = $scope.order.endTime;
		searchData.page = 1;
		$scope.getOrders();
	};

	$scope.pageChanged = function() {
		searchData.page = $scope.currentOrderPage;
		$scope.getOrders();
	};

	$scope.getOrders = function() {
		searchService.getOrders(searchData)
			.then((total) => {
				$scope.orderItemCount = total;		
			}, () => {
				$scope.orderItemCount = 0;	
			});
	};


	$scope.status = {
		beginTimeOpend: false,
		endTimeOpend: false	
	};

	$scope.openBeginTime = function() {
		$scope.status.beginTimeOpend = true;	
	};

	$scope.openEndTime = function() {
		$scope.status.endTimeOpend = true;	
	};

}

export default {
	name: 'searchCtrl',
	fn: SearchCtrl
};
