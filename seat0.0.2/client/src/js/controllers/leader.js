var controllers = require('./index');

var leaderCtrl = function($scope, orderService, orderStepDialog, assignDialog, $timeout) {

	$scope.search = {};

	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};

	//tab切换
	$scope.tabsCount = {
		prepared: [0, 0, 0],
		received: [0, 0, 0],
		started: [0, 0, 0],
		done: [0, 0, 0, 0],
		exception: [0, 0, 0]
	};
	$scope.toggleTab = function(tabName) {
		orderStepDialog.close();
		$scope.search.currentTab = tabName;
		$scope.isSearching = false;
		$scope.search.keywords = '';
		$scope.search.currentPage = 1;
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
				var count = $scope.numItems > 999 ? 999 : $scope.numItems;
				$scope.tabsCount[tabName] = ('000' + count).slice(-3).split('');
			});
	};



	//点击分页
	$scope.onSelectPage = function(page) {
		orderStepDialog.close();
		$scope.search.currentPage = page;
		if ($scope.isSearching) {
			$scope.search.keywords = $scope.words;
		} else {
			$scope.search.keywords = '';
		}
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//搜索
	$scope.searchOrder = function() {
		orderStepDialog.close();
		$scope.search.currentPage = 1;
		$scope.isSearching = true;
		$scope.search.keywords = $scope.words;
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//init
	$scope.toggleTab('prepared');


	//dialog ------------------------------
	$scope.step = {};
	$scope.assign = {};
	
	//双击，弹出订单信息步骤
	$scope.showInfo = function(sn, pos) {
		orderStepDialog.open($scope, pos);
		$scope.assign.sn = sn;
		orderService
			.getStepInfo(sn)
			.then(function(response) {
				$scope.step = response;
			});
	};

	//指派
	$scope.showAssign = function() {
		assignDialog.open($scope);
	};

	//取消订单
	$scope.cancelOrder = function() {
		orderService
			.cancelOrder($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('订单取消成功');
			});
	};

	//乘客放空
	$scope.passengerFuck = function() {
		orderService
			.passengerFuck($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('乘客放空');
			});
	};

	//司机放空
	$scope.driverFuck = function() {
		orderService
			.driverFuck($scope.assign.sn)
			.then(function(response) {
				orderStepDialog.close();
				alert('司机爽约');
			});
	};

	$scope.assigning = function() {
		orderService
			.assign($scope.assign)
			.then(function(response) {
				alert('指派成功');
			}, function(msg) {
				alert('指派失败:' + msg);
			});
		assignDialog.close();
	};

	$scope.cancelAssign = function() {
		assignDialog.close();
	};


	/**********************/
	$scope.$on('$destroy', function() {
		orderStepDialog.close();
	});


	//地图显示
	$scope.mapShow = false;
	$scope.closeMapView = function() {
		orderStepDialog.close();
	};

	$scope.isCurrentItem = function(item) {
		return orderStepDialog.isOpen() && item.sn === $scope.assign.sn;
	};


	//双击表单出来的，控制按钮，权限控制
	$scope.isAssignShow = function() {
		if ($scope.search.currentTab === 'done' ||
			$scope.search.currentTab === 'received') {
			return false;
		} else {
			return true;
		}
	};

	$scope.isCancelShow = function() {
		if ($scope.search.currentTab === 'done' ||
			$scope.search.currentTab === 'started') {
			return false;
		} else {
			return true;
		}
	};

	$scope.isPassengerFuckShow = function() {
		if ($scope.search.currentTab === 'exception' ||
			$scope.search.currentTab === 'received') {
			return true;
		} else {
			return false;
		}
	};

	$scope.isDriverFuckShow = function() {
		if ($scope.search.currentTab === 'exception' ||
			$scope.search.currentTab === 'started' ||
			$scope.search.currentTab === 'received') {
			return true;
		} else {
			return false;
		}
	};

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

leaderCtrl.$inject = ['$scope', 'orderService', 'orderStepDialog', 'assignDialog', '$timeout'];

controllers.controller('leaderCtrl', leaderCtrl);