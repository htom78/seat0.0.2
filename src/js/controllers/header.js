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

	//检测是否为签入状态
	$scope.isSignIn = function() {
		return $scope.signInfo === 'signIn';
	};
	$scope.isFirstBtnRest = function() {
		return $scope.currentState === 'rest';	
	};

	$scope.isSecondBtnBusy = function() {
		return $scope.currentState === 'busy';	
	};

	$scope.isCurrentActive = function(state) {
		return $scope.currentState === state;	
	};

	$scope.firstBtnCanClick = function() {
		return $scope.isSignIn() && ($scope.currentState === 'free' || $scope.currentState === 'rest');
	};
	$scope.secondBtnCanClick = function() {
		return $scope.isSignIn() && ($scope.currentState === 'free' || $scope.currentState === 'busy');
	};


	//切换第一个按钮(小休、接电话)
	$scope.toggleFirstCallingStateBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.currentState === 'free') {
				$scope.currentState = 'rest';	
				signService.rest();
			} else if($scope.currentState === 'rest') {
				$scope.currentState = 'free';
				signService.unrest();
			}
		}
	};

	//切换第二个按钮(示忙、接电话)
	$scope.toggleSecondCallingStateBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.currentState === 'free') {
				$scope.currentState = 'busy';	
				signService.busy();
			} else if ($scope.currentState === 'busy') {
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

	$scope.isLeader = security.isLeader;

	security.requestCurrentUser()
		.then(function(response) {
			$scope.username = response; 	
			$scope.isHeaderShow = true;
			signService.getCurrentState()
				.then(function(response) {
					if (response.isSignIn) {
						$scope.signInfo = 'signIn';	
						$scope.currentState = response.currentCallingState;
					}	
				});
		}, function() {
			$scope.isHeaderShow = false;	
		});

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
