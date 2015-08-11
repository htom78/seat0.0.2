var controllers = require('./index');

var leaderCtrl = function($scope, orderStepDialog, $timeout, leaderMapService, $location, security, leaderService) {


	$scope.orders = leaderService.orders;
	
	//图表 = > 员工tab切换
	$scope.chartEmployer = {
		currentTab: 'busy'
	};

	$scope.isEmployerActiveTab = function(tabName) {
		return $scope.chartEmployer.currentTab === tabName;
	};

	$scope.toggleEmplyerTab = function(tabName) {
		$scope.chartEmployer.currentTab = tabName;
	};

	//######################################################################################

	$scope.isCurrentOrderTab = function(tabName) {
		return tabName === $scope.currentOrderTab;
	};

	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = 'prepared';
		leaderService.getPreparedOrders();	
	};

	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		leaderService.getReceivedOrders();	
	};

	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		leaderService.getStartedOrders();	
	};

	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		leaderService.getDoneOrders();	
	};

	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		leaderService.getExceptionOrders();	
	};
	//$scope.currentOrderTab = 'prepared';

	$scope.preparedOrderTabCount = [0, 0, 0];
	$scope.receivedOrderTabCount = [0, 0, 0];
	$scope.startedOrderTabCount = [0, 0, 0];
	$scope.doneOrderTabCount = [0, 0, 0];
	$scope.exceptionOrderTabCount = [0, 0, 0];

	$scope.$watch('orders', function() {
		$scope.orderCurrentPage = leaderService.currentPage;
		$scope.orderItemCount = leaderService.currentOrderTotal;
		$scope[$scope.currentOrderTab + 'OrderTabCount'] = leaderService.getShowOrderCount();
	}, true);

	//点击分页
	$scope.onSelectPage = function(pageNumber) {
		leaderService.getOrderByPageNumber(pageNumber);
	};

	//搜索
	$scope.searchOrder = function() {
		leaderService.getCurrentOrdersByKeywords($scope.words);
	};

	$scope.immediateOrReservation = '即';
	$scope.toggleImmediateOrReservation = function() {
		if ($scope.immediateOrReservation === '即') {
			$scope.immediateOrReservation = '预';	
			leaderService.selectReservation();
		} else {
			$scope.immediateOrReservation = '即';	
			leaderService.selectImmediate();
		}	
		leaderService.refreshCurrentOrder();
	};




	/*******************************/


	//---------------------------------------------------------------

	//图表数据
	$scope.employChart = {
		busy: 1,
		reset: 7,
		respond: 25,
		vain: 3
	};

	$scope.carChart = {
		stop: 5,
		empty: 5,
		heavy: 5,
		task: 5
	};

	$timeout(function() {
		$scope.carChart = {
			stop: 12,
			empty: 3,
			heavy: 20,
			task: 7
		};
	}, 3000);

	$timeout(function() {
		$scope.employChart = {
			busy: 10,
			reset: 2,
			respond: 8,
			vain: 14
		};
	}, 4000);
	/***************************************/

	$scope.$watch(function() {
		return security.isLeader();	
	}, function(isLeader) {
		if (!isLeader) {
			$location.path('/');	
		}	
	});


};

leaderCtrl.$inject = [
	'$scope',
 	'orderStepDialog',
 	'$timeout',
 	'leaderMapService',
 	'$location',
	'security',
	'leaderOrderStorageService'
	];

controllers.controller('leaderCtrl', leaderCtrl);
