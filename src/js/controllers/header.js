'use strict';
function HeaderCtrl ($scope, $state, $timeout, $filter, $location, signService, security, socket, headerService) {

	$scope.$state = $state;
	$scope.isAuthenticated = security.isAuthenticated;
	$scope.isLeader = security.isLeader;

	security.requestCurrentUser()
		.then((username) => {
			$scope.username = username; 	
			socket.connection();
		});

	const status = {
		signState: {
			IN: 0,
			OUT: 1,	
		},
		operateState: {
			FREE: 0,
			BUSY: 1,
			REST: 2,	
		}	
	};

	$scope.currentSignState = status.signState.OUT;

	$scope.isSignIn = function() {
		return $scope.currentSignState === status.signState.IN;
	};

	$scope.isFreeState = function() {
		return $scope.currentOperateState === status.operateState.FREE;	
	};

	$scope.isRestState = function() {
		return $scope.currentOperateState === status.operateState.REST;	
	};

	$scope.isBusyState = function() {
		return $scope.currentOperateState === status.operateState.BUSY;	
	};

	$scope.toggleSignState = function() {
		$scope.currentOperateState = status.operateState.FREE;
		if (!$scope.isSignIn()) {
			signService.signIn()
				.then(() => {
					$scope.currentSignState = status.signState.IN;	
				});	
		} else {
			signService.signOut()
				.then(() => {
					$scope.currentSignState = status.signState.out;	
				});	
		}
	};

	$scope.selectRest = function() {
		if (!$scope.isSignIn()) {
			return;	
		}
		if (!$scope.isRestState()) {
			signService.rest()
				.then(() => {
					$scope.currentOperateState = status.operateState.REST;
				});	
		} else {
			signService.unrest()
				.then(() => {
					$scope.currentOperateState = status.operateState.FREE;
				});		
		}
	};

	$scope.selectBusy = function() {
		if (!$scope.isSignIn()) {
			return;	
		}
		if (!$scope.isBusyState()) {
			signService.busy()
				.then(() => {
					$scope.currentOperateState = status.operateState.BUSY;		
				});
		} else {
			signService.unbusy()
				.then(() => {
					$scope.currentOperateState = status.operateState.FREE;		
				});
		}
	};

	//security
	//###############################################################
	$scope.logout = function() {
		socket.close();
		security.logout();
	};

	//左上角时间
	(function tickTimer(){
		$scope.currentTimer = $filter('date')(new Date(), 'HH:mm');
		$timeout(tickTimer, 30000);
	})();

}

export default {
	name: 'headerCtrl',
	fn: HeaderCtrl
};
