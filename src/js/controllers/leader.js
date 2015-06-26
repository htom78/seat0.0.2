var controllers = require('./index');

var leaderCtrl = function($scope, orderService, orderStepDialog, assignDialog, $timeout, leaderMapService, employerService, $location, store) {

	$scope.search = {};

	$scope.orders = store.orders;
	
	$scope.$watch(function() {
		return employerService.employerType;	
	}, function(newValue) {
		if (newValue) {
			if (newValue !== 'seat_leader') {
				$location.path('/');	
			}	
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
		store.getPrepared();	
	};

	$scope.cutOrderTabReceived = function() {
		$scope.currentOrderTab = 'received';
		store.getReceived();	
	};

	$scope.cutOrderTabStarted = function() {
		$scope.currentOrderTab = 'started';
		store.getStarted();	
	};

	$scope.cutOrderTabDone = function() {
		$scope.currentOrderTab = 'done';
		store.getDone();	
	};

	$scope.cutOrderTabException = function() {
		$scope.currentOrderTab = 'exception';
		store.getException();	
	};

	$scope.preparedOrderTabCount = [0, 0, 0];
	$scope.receivedOrderTabCount = [0, 0, 0];
	$scope.startedOrderTabCount = [0, 0, 0];
	$scope.doneOrderTabCount = [0, 0, 0];
	$scope.exceptionOrderTabCount = [0, 0, 0];

	$scope.$watch('orders', function() {
		$scope.orderCurrentPage = store.currentOrderPage;
		$scope.orderItemCount = store.orderItemCount;
		$scope[$scope.currentOrderTab + 'OrderTabCount'] = store.getShowOrderCount();
	}, true);

	//点击分页
	$scope.onSelectPage = function(pageNumber) {
		store.getSelectPageOrder(pageNumber);
	};

	//搜索
	$scope.searchOrder = function() {
		store.searchOrderForKeywords($scope.words);
	};

	$scope.searchType = '即';
	//即时、预约切换
	$scope.toggleSearchType = function() {
		if ($scope.searchType === '即') {
			$scope.searchType = '预';	
			store.orderSearchParams.isImmediate = 0;
		} else {
			$scope.searchType = '即';	
			store.orderSearchParams.isImmediate = 1;
		}	
		store.flushCurrentOrderTab();
	};

	$scope.step = {};

	$scope.orderStepInfo = function(orderItem) {
		store.getOrderStepInfo(orderItem)
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

	//dialog ------------------------------
	$scope.assign = {};

	//指派
	$scope.showAssign = function() {
		assignDialog
			.open($scope)
			.then(function() {
			    $scope.assign.carNumber = '';	
			});
	};

	//##########################################
	$scope.updateOrders = function() {
		if ($scope.search.currentTab === 'exception') {
			$scope.toggleTab('exception');
		} else {
			$scope.orders.splice($scope.assign.idx, 1);
			$scope.orders.total = $scope.orders.total - 1;
			$scope.updateTabCount($scope.search.currentTab);
		}
	};
	//取消订单
	$scope.cancelOrder = function() {
		orderService
			.cancelOrder($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('订单取消成功');
				$scope.updateOrders();
			}, function() {
			    alert('操作失败');	
			});
	};

	//乘客放空
	$scope.passengerFuck = function() {
		orderService
			.passengerFuck($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('乘客放空');
				$scope.updateOrders();
			}, function() {
			    alert('操作失败');	
			});
	};

	//司机放空
	$scope.driverFuck = function() {
		orderService
			.driverFuck($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('司机爽约');
				$scope.updateOrders();
			}, function() {
			    alert('操作失败');	
			});
	};

	$scope.assigning = function() {
		orderService
			.assign($scope.assign)
			.then(function(response) {
				alert('指派成功');
				$scope.toggleTab('prepared');
			}, function(msg) {
				alert('指派失败');
			});
		assignDialog.close();
		$scope.updateOrders();
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
		store.clearOrderItemActive();
	};

	$scope.isCurrentItem = function(item) {
		return orderStepDialog.isOpen() && item.sn === $scope.assign.sn;
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
 	'orderService',
 	'orderStepDialog',
 	'assignDialog',
 	'$timeout',
 	'leaderMapService',
 	'employerService',
 	'$location',
	'store'
	];

controllers.controller('leaderCtrl', leaderCtrl);
