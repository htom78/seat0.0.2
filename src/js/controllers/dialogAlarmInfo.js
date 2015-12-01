'use strict';

function Alarm($scope, $uibModalInstance, policeService, order, hasHandle) {

	$scope.isHandle = function() {
		return hasHandle;	
	};

	$scope.listen = function() {
		policeService.listen(order.id);	
	};

	$scope.photograph = function() {
		policeService.photograph(order.vehicleNumber);
	};

	$scope.trail = function() {
		policeService.trail(order.vehicleNumber);	
	};

	$scope.relieve = function() {
		policeService.relieve(order.id);	
	};

	$scope.transfer = function() {
		policeService.transfer(order.id);	
	};

	var reason = ['', '设备误报', '测试', '实警', '设备故障'];

	$scope.isAlarmReasonShow = function() {
		return order.rTypeLabel === '';	
	};

	$scope.alarmMark = 1;
	$scope.mark = function() {
		policeService.mark({
			id: order.id,
			rType: $scope.alarmMark,
			note: $scope.alarmMarkNote || '',		
		}).then((response) => {
			order.rTypeLabel = reason[$scope.alarmMark];
		});	
	};
}


export default {
	name: 'dialogAlarmInfoCtrl',
	fn: Alarm
};
