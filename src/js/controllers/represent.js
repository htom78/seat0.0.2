import angular from 'angular';
var controllers = require('./index');
var moment = require('moment');

var representCtrl = (
		$scope, 
		userService, 
		representService, 
		$location,
		representMap
		) => {

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
		if ($location.$$path === data.path) {
			representMap.setCenter(data.lng, data.lat);	
			representService.getNearCar(data.lng, data.lat)
				.then( response => {
					representMap.addCarMarks(response.data.msg);
				});
		}
	});
};

representCtrl.$inject = [
	'$scope', 
	'userService', 
	'representService', 
	'$location',
	'representMap'
];

controllers.controller('representCtrl', representCtrl);
