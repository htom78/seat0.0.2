'use strict';
function HeaderCtrl ($scope, $timeout, $filter, signService, security, socket) {

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
		if ($scope.isSignIn() && !$scope.isRestState()) {
			signService.rest()
				.then(() => {
					$scope.currentOperateState = status.operateState.REST;
				});	
		}
	};

	$scope.selectBusy = function() {
		if ($scope.isSignIn() && !$scope.isBusyState()) {
			signService.busy()
				.then(() => {
					$scope.currentOperateState = status.operateState.BUSY;		
				});
		}
	};

	$scope.selectFree = function() {
		if ($scope.isSignIn() && !$scope.isFreeState()) {
			signService.free()
				.then(() => {
					$scope.currentOperateState = status.operateState.FREE;	
				});	
		}
	
	};


	//security
	//###############################################################
	$scope.logout = function() {
		socket.close();
		signService.logout();
		security.logout();
	};

	$scope.$watch(function() {
		return security.isAuthenticated();	
	}, function(isAuthenticated) {
		if (isAuthenticated) {
			security.requestCurrentUser()
				.then(function(response) {
					socket.connection();
					$scope.isHeaderShow = true;	
					$scope.username = response; 	
					$scope.isLeader = security.isLeader();
					return signService.getCurrentState();
				})
				.then(function(response) {
					if (response.isSignIn) {
						$scope.currentSignState = 'signIn';	
						$scope.currentState = response.currentState;
					}	
				});
		} else {
			$scope.isHeaderShow = false;	
		}	
	});

	$scope.hasHeader = function() {
		return $scope.isHeaderShow;	
	};

	$scope.hasLeaderBtn = function() {
		return $scope.isLeader;	
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
