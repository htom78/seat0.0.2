'use strict';

function LeaderCtrl($scope, $timeout, $location, security, leaderService, preparedOrderCount) {

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

	//######################################################################################

	let isSearch = false;

	$scope.currentOrderPage = 1;
	$scope.orderItemCount = preparedOrderCount;
	$scope.preparedCount = preparedOrderCount;

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
	$scope.receivedCount = 0;
	$scope.startedCount = 0;
	$scope.doneCount = 0;
	$scope.exceptionCount = 0;

	$scope.cutOrderTabPrepared = function() {
		isSearch = false;
		$scope.currentOrderPage = 1;
		$scope.currentOrderTab = state.currentTab.PREPARED;
		$scope.getOrders();
	};

	$scope.cutOrderTabReceived = function() {
		isSearch = false;
		$scope.currentOrderPage = 1;
		$scope.currentOrderTab = state.currentTab.RECEIVED;
		$scope.getOrders();
	};

	$scope.cutOrderTabStarted = function() {
		isSearch = false;
		$scope.currentOrderPage = 1;
		$scope.currentOrderTab = state.currentTab.STARTED;
		$scope.getOrders();
	};

	$scope.cutOrderTabDone = function() {
		isSearch = false;
		$scope.currentOrderPage = 1;
		$scope.currentOrderTab = state.currentTab.DONE;
		$scope.getOrders();
	};

	$scope.cutOrderTabException = function() {
		isSearch = false;
		$scope.currentOrderPage = 1;
		$scope.currentOrderTab = state.currentTab.EXCEPTION;
		$scope.getOrders();
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
		$scope.getOrders();
	};


	$scope.searchOrder = function() {
		isSearch = true;
		searchData.keywords = $scope.words;
		$scope.getOrders();
	};


	$scope.pageChanged = function() {
		$scope.getOrders();
	};

	$scope.getOrders = function() {
		leaderService.getOrders({
			isImmediate: $scope.immediateOrReservationSelect,
			page: $scope.currentOrderPage,
			status: $scope.currentOrderTab,
			k: isSearch ? $scope.searchData.keywords : ''
		})
			.then((total) => {
				$scope[tabsName[$scope.currentOrderTab].toLowerCase() + 'Count'] = total;
				$scope.orderItemCount = total;
			});
	};

	$scope.hasCancelOrderBtn = function() {
		return 	!$scope.isDoneCurrentTab() && !$scope.isStartedCurrentTab();
	};

	$scope.hasAssignOrderBtn = function() {
		return !$scope.isDoneCurrentTab() && !$scope.isReceivedCurrentTab();	
	};

	$scope.hasDriverFuckOrderBtn = function() {
		return !$scope.isDoneCurrentTab() && !$scope.isPreparedCurrentTab();	
	};

	$scope.hasPassengerFuckOrderBtn = function() {
		return $scope.isReceivedCurrentTab() || $scope.isExceptionCurrentTab() ;	
	};

	$scope.$on('showMap', () => {
			$scope.isMapShow = true;	
	});

	$scope.$on('hideMap', () => {
			$scope.isMapShow = false;	
	});

}

export default {
	name: 'leaderCtrl',
	fn: LeaderCtrl
};
