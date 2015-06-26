var controllers = require('./index');

var headerCtrl = function($scope, $timeout, $filter, signService, $rootScope, $location, employerService, callSocket, userService) {

	//依据这个判断用户是否已经登录
	$scope.$watch(function() {
		return 	employerService.employerName;
	}, function(newValue) {
		if (newValue) {
			//和oxc建立websocket连接
			
			//callSocket.connection();	

			/****************/
			$scope.employerName = employerService.employerName;
			$scope.employerType = employerService.employerType;
			var signState = employerService.signState;
			if (signState) {
				switch (signState) {
						//签入
						case 1:
							$scope.currentState = 'calling';
							$scope.signInfo = 'signIn';	
							break;
						//签出
						case 2:
							$scope.currentState = '';
							$scope.signInfo = 'signOut';	
							break;
						//小休
						case 3:
							$scope.currentState = 'rest';
							$scope.signInfo = 'signIn';	
							break;
						//取消小休
						case 4:
							$scope.currentState = 'calling';
							$scope.signInfo = 'signIn';	
							break;
						//示忙
						case 5:
							$scope.currentState = 'busy';
							$scope.signInfo = 'signIn';	
							break;
						//取消示忙
						case 6:
							$scope.currentState = 'calling';
							$scope.signInfo = 'signIn';	
							break;	
					}	

			} else {
				$scope.currentState = '';
				$scope.signInfo = 'signOut';	
			}
		} else {
			//用户未登录
				callSocket.close();
		}
	});

	$scope.isLeader = function() {
		return $scope.employerType === 'seat_leader';	
	};


	$scope.toggleSign = function() {
		if (!$scope.isSignIn()) {
			signService
				.signIn()
				.then(function() {
					$scope.currentState = 'calling';
					$scope.signInfo = 'signIn';	
				});	
		} else {
			signService
				.signOut()
				.then(function() {
					$scope.currentState = '';
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
		return $scope.isSignIn() && ($scope.currentState === 'calling' || $scope.currentState === 'rest');
	};
	$scope.secondBtnCanClick = function() {
		return $scope.isSignIn() && ($scope.currentState === 'calling' || $scope.currentState === 'busy');
	};


	//切换第一个按钮(小休、接电话)
	$scope.toggleFirstBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.currentState === 'calling') {
				$scope.currentState = 'rest';	
				signService.rest();
			} else if($scope.currentState === 'rest') {
				$scope.currentState = 'calling';
				signService.unrest();
			}
		}
	};

	//切换第二个按钮(示忙、接电话)
	$scope.toggleSecondBtn = function() {
		if ($scope.isSignIn()) {
			if ($scope.currentState === 'calling') {
				$scope.currentState = 'busy';	
				signService.busy();
			} else if ($scope.currentState === 'busy') {
				$scope.currentState = 'calling';	
				signService.unbusy();
			}
		}
	};


	$scope.$watch('currentState', function(newValue) {
		if (newValue) {
			switch (newValue) {
				case 'calling':
					$scope.currentStateInfo = '等电话中';
					break;	
				case 'busy':
					$scope.currentStateInfo = '示忙';
					break;
				case 'rest':
					$scope.currentStateInfo = '小休';
					break;
			}	
		} else {
			$scope.currentStateInfo = '';	
		}	
	});

	$scope.loginOut = function() {
		userService.loginOut()
			.then(function() {
				$location.path('/login.htm');	
			});
			
	};

	//左上角时间
	(function tickTimer(){
		$scope.currentTimer = $filter('date')(new Date(), 'HH:mm');
		$timeout(tickTimer, 30000);
	})();

	/******************************************/
	//当用户拨打进来电话：切换按钮
	/*
	$scope.$on('userCall', function() {
		$scope.toggleStatus('calling');
	});
	*/
};

headerCtrl.$inject = [
	'$scope', 
	'$timeout',
 	'$filter',
 	'signService',
 	'$rootScope' ,
 	'$location',
 	'employerService',
 	'callSocket',
	'userService'
	];

controllers.controller('headerCtrl', headerCtrl);
