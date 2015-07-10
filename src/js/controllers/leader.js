var controllers = require('./index');

var leaderCtrl = function($scope, orderStepDialog, assignDialog, $timeout, leaderMapService, $location, security, leaderOrderStorageService) {


	$scope.orders = leaderOrderStorageService.orders;
	
	$scope.$watch(function() {
		return security.isLeader();	
	}, function(isLeader) {
		if (!isLeader) {
			$location.path('/');	
		}	
	});


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

	$scope.currentOrderTab = 'prepared';
	$scope.isCurrentOrderTab = function(tabName) {
		return tabName === $scope.currentOrderTab;
	};

	$scope.cutOrderTabPrepared = function() {
		$scope.currentOrderTab = 'prepared';
		leaderOrderStorageService.getPrepared();	
	};

	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		leaderOrderStorageService.getReceived();	
	};

	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		leaderOrderStorageService.getStarted();	
	};

	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		leaderOrderStorageService.getDone();	
	};

	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		leaderOrderStorageService.getException();	
	};

	$scope.preparedOrderTabCount = [0, 0, 0];
	$scope.receivedOrderTabCount = [0, 0, 0];
	$scope.startedOrderTabCount = [0, 0, 0];
	$scope.doneOrderTabCount = [0, 0, 0];
	$scope.exceptionOrderTabCount = [0, 0, 0];

	$scope.$watch('orders', function() {
		$scope.orderCurrentPage = leaderOrderStorageService.currentOrderPage;
		$scope.orderItemCount = leaderOrderStorageService.orderItemCount;
		$scope[$scope.currentOrderTab + 'OrderTabCount'] = leaderOrderStorageService.getShowOrderCount();
	}, true);

	//点击分页
	$scope.onSelectPage = function(pageNumber) {
		leaderOrderStorageService.getSelectPageOrder(pageNumber);
	};

	//搜索
	$scope.searchOrder = function() {
		leaderOrderStorageService.searchOrderForKeywords($scope.words);
	};

	$scope.searchType = '即';
	//即时、预约切换
	$scope.toggleSearchType = function() {
		if ($scope.searchType === '即') {
			$scope.searchType = '预';	
			leaderOrderStorageService.orderSearchParams.isImmediate = 0;
		} else {
			$scope.searchType = '即';	
			leaderOrderStorageService.orderSearchParams.isImmediate = 1;
		}	
		leaderOrderStorageService.refreshCurrentOrderTab();
	};

	$scope.step = {};

	$scope.orderStepInfo = function(orderItem) {
		leaderOrderStorageService.getOrderStepInfo(orderItem)
			.then(function(response) {
				$scope.step = response;
				orderStepDialog.open($scope);
				if ($scope.currentOrderTab === 'done') {
					leaderMapService.setPath({
						pickupX: response.pickupX,
						pickupY: response.pickupY,
						assignedX: response.assignedX,
						assignedY: response.assignedY,
						arrivedY: response.arrivedY,
						arrivedX: response.arrivedX
					});
				} else {
					leaderMapService.clearPath();	
				}
			});	
	};


	//指派
	$scope.showAssign = function() {
		assignDialog
			.open($scope)
			.then(function() {
			    $scope.carPlate = '';	
			});
	};

	//取消订单
	$scope.cancelOrder = function() {
		leaderOrderStorageService.dealCancelOrder();
	};

	//乘客放空
	$scope.passengerFuck = function() {
		leaderOrderStorageService.dealPassengerFuckOrder();
	};

	//司机放空
	$scope.driverFuck = function() {
		leaderOrderStorageService.dealDriverFuckOrder();
	};

	$scope.assigning = function() {
		leaderOrderStorageService.assignOrderToCarPlate($scope.carPlate)
			.finally(function() {
				assignDialog.close();
			});
	};

	$scope.cancelAssign = function() {
		assignDialog.close();
	};


	/*******************************/
	$scope.$on('$destroy', function() {
		orderStepDialog.close();
	});

	//地图显示
	$scope.closeMapView = function() {
		orderStepDialog.close();
		leaderOrderStorageService.clearOrderItemActive();
	};



	//双击表单出来的，控制按钮，权限控制
	$scope.isAssignBtnShow = function() {
		if ($scope.currentOrderTab === 'done' ||
			$scope.currentOrderTab === 'received') {
			return false;
		} else {
			return true;
		}
	};

	$scope.isCancelBtnShow = function() {
		if ($scope.currentOrderTab === 'done' ||
			$scope.currentOrderTab === 'started') {
			return false;
		} else {
			return true;
		}
	};

	$scope.isPassengerFuckBtnShow = function() {
		if ($scope.currentOrderTab === 'exception' ||
			$scope.currentOrderTab === 'received') {
			return true;
		} else {
			return false;
		}
	};

	$scope.isDriverFuckBtnShow = function() {
		if ($scope.currentOrderTab === 'exception' ||
			$scope.currentOrderTab === 'started' ||
			$scope.currentOrderTab === 'received') {
			return true;
		} else {
			return false;
		}
	};

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

};

leaderCtrl.$inject = [
	'$scope',
 	'orderStepDialog',
 	'assignDialog',
 	'$timeout',
 	'leaderMapService',
 	'$location',
	'security',
	'leaderOrderStorageService'
	];

controllers.controller('leaderCtrl', leaderCtrl);
