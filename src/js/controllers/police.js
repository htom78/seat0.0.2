var controllers = require('./index');
var policeCtrl = function($scope, policeService) {
	$scope.orders = policeService.orders;

	$scope.getAllOrderTotal = policeService.getAllOrderTotal;
	$scope.getUnhandleOrderTotal = policeService.getUnhandleOrderTotal;
	$scope.getHandleOrderTotal = policeService.getHandleOrderTotal;

	$scope.$watch('orders', function() {
		$scope.currentOrderPage = policeService.currentPage;	
		$scope.currentOrderTotal = policeService.currentOrderTotal;
	}, true);

	$scope.currentOrderTab = 'all';

	$scope.isCurrentTab = function(type) {
		return $scope.currentOrderTab === type;
	};

	$scope.cutAllOrderTab = function() {
		$scope.currentOrderTab = 'all';	
		policeService.getAllOrders();
	};

	$scope.cutHandleOrderTab = function() {
		$scope.currentOrderTab = 'handle';	
		policeService.getHandleOrders();
	};

	$scope.cutUnhandleOrderTab = function() {
		$scope.currentOrderTab = 'unhandle';	
		policeService.getUnhandleOrders();
	};

	$scope.searchOrder = function() {
		policeService.getOrderByKeywords($scope.keywords);
	};

	$scope.onSelectPage = function(page) {
		policeService.getOrderByPageNumber(page);
	};

	$scope.watchCar = function() {
		policeService.watchCar();
	};

	$scope.trackCar = function() {
		policeService.trackCar();	
	};

	$scope.photograph = function() {
		policeService.photograph();	
	};

	$scope.transferPolice = function() {
		policeService.transferPolice();	
	};

	$scope.alarmOperateInfo = 1;
	$scope.handleAlarm = function() {
		policeService.handleAlarm($scope.alarmOperateInfo, $scope.alarmNote);
	};


};

policeCtrl.$inject = ['$scope', 'policeService'];

controllers.controller('policeCtrl', policeCtrl);
