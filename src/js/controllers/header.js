var controllers = require('./index');

var headerCtrl = function($scope, $timeout, $filter, signService, security, socket) {

	$scope.toggleSignState = function() {
		$scope.currentState = 'free';
		if (!$scope.isSignIn()) {
			signService.signIn()
				.then(function() {
					$scope.currentSignState = 'signIn';	
				});	
		} else {
			signService.signOut()
				.then(function() {
					$scope.currentSignState = 'signOut';	
				});	
		}
	};

	$scope.isSignIn = function() {
		return $scope.currentSignState === 'signIn';
	};

	$scope.isFreeState = function() {
		return $scope.currentState === 'free';	
	};

	$scope.isRestState = function() {
		return $scope.currentState === 'rest';	
	};

	$scope.isBusyState = function() {
		return $scope.currentState === 'busy';	
	};

	$scope.firstBtnCanClick = function() {
		return $scope.isSignIn() && ($scope.isFreeState() || $scope.isRestState());
	};
	$scope.secondBtnCanClick = function() {
		return $scope.isSignIn() && ($scope.isFreeState() || $scope.isBusyState());
	};


	//切换第一个按钮(小休、接电话)
	$scope.toggleFirstCallingStateBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.isFreeState()) {
				$scope.currentState = 'rest';	
				signService.rest();
			} else if($scope.isRestState()) {
				$scope.currentState = 'free';
				signService.unrest();
			}
		}
	};

	//切换第二个按钮(示忙、接电话)
	$scope.toggleSecondCallingStateBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.isFreeState()) {
				$scope.currentState = 'busy';	
				signService.busy();
			} else if ($scope.isBusyState()) {
				$scope.currentState = 'free';	
				signService.unbusy();
			}
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
						$scope.currentState = response.currentCallingState;
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

};

headerCtrl.$inject = [
	'$scope', 
	'$timeout',
 	'$filter',
 	'signService',
	'security',
	'socket'
	];

controllers.controller('headerCtrl', headerCtrl);
