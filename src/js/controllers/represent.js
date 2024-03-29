'use strict';

import angular from 'angular';
var moment = require('moment');

function RepresentCtrl($scope, userService, representService, $location, representMap) {
	$scope.orders = representService.orderss;

	let currentTimer = new Date();

	let initOrderData = {
		gender: 1,
		poiList: [],
		targetpoiList: [],
		isReserved: false,
		hour: currentTimer.getHours(),
		minute: currentTimer.getMinutes(),
		reservedDate: moment().format('YYYY-MM-DD'),
		number: 1,
	};

	$scope.orderData = angular.copy(initOrderData);
	$scope.initOrderData = () => {
		$scope.orderData = angular.copy(initOrderData);
		$scope.newOrder.$setPristine();
		representMap.clear();
	};

	$scope.shouldSubmitOrder = true;

	$scope.addOrderFromForm = () => {
		if (!$scope.shouldSubmitOrder) {
			return;	
		}
		$scope.shouldSubmitOrder = false;
		representService.addNewOrder($scope.orderData)
			.then(() => {
				$scope.initOrderData();	
			}, (err) => {
				alert('表单提交失败!');	
			})
			.finally(() => {
				$scope.shouldSubmitOrder = true;	
			});	
	};

	$scope.$on('userCall', (ev, data) => {
		$scope.initOrderData();	
		let mobile = data.mobile;
		$scope.orderData.callPhone = mobile;
		$scope.orderData.contactPhone = mobile;
		userService.getUserInfoByMobile(mobile)
			.then((response) => {
				$scope.orderData.callName = response.contactName;	
				$scope.orderData.contactName = response.contactName;
				$scope.orderData.targetpoiList = response.targetpoiList;
				$scope.orderData.poiList =response.poiList;
			});
	});

	$scope.$on('mapPosition', (ev, data) => {
		if ($location.url() === data.path) {
			representMap.setCenter(data.lng, data.lat);	
			representService.getNearCar(data.lng, data.lat)
				.then( response => {
					representMap.addCarMarks(response);
				});
		}
	});

	$scope.searchOrder = function() {
		representService.getOrders($scope.searchKeywords);	
	};

	$scope.passengerFuck = function(item, remark) {
		representService.passengerFuck(item.id, remark)
			.then(response => {
				item.statusLabel = '乘客违约';	
				item.noHandlerBtn = true;
			});
	};

	$scope.driverFuck = function(item, remark) {
		representService.driverFuck(item.id, remark)
			.then(response => {
				item.statusLabel = '司机违约';	
				item.noHandlerBtn = true;
			});	
	};

	$scope.queryTrack = function (id) {
		representService.queryTrack(id)
			.then(response => {
				representMap.drawTrack(response.data.msg);
			});	
	};
		
}

export default {
	name: 'representCtrl',
	fn: RepresentCtrl
};
