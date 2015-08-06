var controllers = require('./index');

var headerCtrl = function($scope, $timeout, $filter, signService, security) {

	$scope.toggleSignState = function() {
		$scope.currentState = 'free';
		if (!$scope.isSignIn()) {
			signService.signIn()
				.then(function() {
					$scope.signInfo = 'signIn';	
				});	
		} else {
			signService.signOut()
				.then(function() {
					$scope.signInfo = 'signOut';	
				});	
		}
	};

	$scope.isSignIn = function() {
		return $scope.signInfo === 'signIn';
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
	$scope.logout = function() {
		signService.loginOut();
		security.logout();
	};

	security.requestCurrentUser()
		.then(function(response) {
			$scope.username = response; 	
			$scope.isHeaderShow = true;
			signService.getCurrentState()
				.then(function(response) {
					$scope.isLeader = security.isLeader();
					if (response.isSignIn) {
						$scope.signInfo = 'signIn';	
						$scope.currentState = response.currentCallingState;
					}	
				});
		}, function() {
			$scope.isHeaderShow = false;	
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
	'security'
	];

controllers.controller('headerCtrl', headerCtrl);
