'use strict';

function LeaderCtrl($scope, $timeout, $location, security, leaderService) {

	$scope.orders = leaderService.orderss;
	
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

	let isSearch = false;
	const searchData = {
		keywords: '',	
	};

	const tabTextName = ['预', '即'];
	const tabsName = ['Exception', 'Prepared', 'Received', 'Started', 'Done'];	
	const state = {
		immediateOrReservation: {
			RESERVATION: 0,
			IMMEDIATE: 1,	
		}, 
		currentTab: {
			EXCEPTION: 0,
			PREPARED: 1,
			RECEIVED: 2,
			STARTED: 3,
			DONE: 4,
		}
	};

	$scope.currentOrderTab = state.currentTab.PREPARED;
	$scope.immediateOrReservationSelect = state.immediateOrReservation.IMMEDIATE;
	$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
	$scope.preparedCount = 0;
	$scope.receivedCount = 0;
	$scope.startedCount = 0;
	$scope.doneCount = 0;
	$scope.exceptionCount = 0;

	$scope.cutOrderTabPrepared = function() {
		isSearch = false;
		$scope.currentOrderTab = state.currentTab.PREPARED;
		leaderService.getPreparedOrders($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope.preparedCount = total;
			});	
	};

	$scope.cutOrderTabReceived = function() {
		isSearch = false;
		$scope.currentOrderTab = state.currentTab.RECEIVED;
		leaderService.getReceivedOrders($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope.receivedCount = total;	
			});	
	};

	$scope.cutOrderTabStarted = function() {
		isSearch = false;
		$scope.currentOrderTab = state.currentTab.STARTED;
		leaderService.getStartedOrders($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope.startedCount = total;
			});	
	};

	$scope.cutOrderTabDone = function() {
		isSearch = false;
		$scope.currentOrderTab = state.currentTab.DONE;
		leaderService.getDoneOrders($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope.doneCount = total;
			});
	};

	$scope.cutOrderTabException = function() {
		isSearch = false;
		$scope.currentOrderTab = state.currentTab.EXCEPTION;
		leaderService.getExceptionOrders($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope.exceptionCount = total;
			});	
	};

	$scope.isPreparedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.PREPARED;	
	};

	$scope.isStartedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.STARTED;	
	};

	$scope.isReceivedCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.RECEIVED;	
	};

	$scope.isDoneCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.DONE;	
	};

	$scope.isExceptionCurrentTab = function() {
		return $scope.currentOrderTab === state.currentTab.EXCEPTION;	
	};

	$scope.toggleImmediateOrReservation = function() {
		let isImmediate;
		isSearch = false;
		if ($scope.immediateOrReservationSelect === state.immediateOrReservation.IMMEDIATE) {
			$scope.immediateOrReservationSelect = state.immediateOrReservation.RESERVATION;
		} else {
			$scope.immediateOrReservationSelect = state.immediateOrReservation.IMMEDIATE;
		}
		$scope.immediateOrReservation = tabTextName[$scope.immediateOrReservationSelect];
		leaderService['get' + tabsName[$scope.currentOrderTab] + 'Orders']($scope.immediateOrReservationSelect)
			.then((total) => {
				$scope[tabsName[$scope.currentOrderTab].toLowerCase() + 'Count'] = total;
			});
	};

	$scope.$watch(() => leaderService.shouldUpdate, () => {
		$scope.currentOrderPage = leaderService.currentPage;
		$scope.orderItemCount = leaderService.total;
	});

	$scope.onSelectPage = function(page) {
		if (isSearch) {
			leaderService.getSelectPageOrder(page, $scope.immediateOrReservationSelect, $scope.currentOrderTab, searchData.keywords);
		} else {
			leaderService.getSelectPageOrder(page, $scope.immediateOrReservationSelect, $scope.currentOrderTab, '');
		}
	};

	$scope.searchOrder = function() {
		isSearch = true;
		searchData.keywords = $scope.words;
		leaderService.queryOrderByKeywords($scope.words, $scope.immediateOrReservationSelect, $scope.currentOrderTab)
			.then((response) => {
				$scope[tabsName[$scope.currentOrderTab].toLowerCase() + 'Count'] = response;
			});
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

	$scope.$watch(function() {
		return security.isLeader();	
	}, function(isLeader) {
		if (security.isAuthenticated() && !isLeader) {
			$location.path('/index.htm');	
		}	
	});

	$scope.showMap = function() {
		$scope.isMapShow = true;
	};
	$scope.hideMap = function() {
		$scope.isMapShow = false;
	};
}

export default {
	name: 'leaderCtrl',
	fn: LeaderCtrl
};
