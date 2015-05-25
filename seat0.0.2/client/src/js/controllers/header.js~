var controllers = require('./index');

var headerCtrl = function($scope, $timeout, $filter, signService, $rootScope) {

	$scope.username = window.username;

	//左上角时间
	(function tickTimer(){
		$scope.currentTimer = $filter('date')(new Date(), 'HH:mm');
		$timeout(tickTimer, 30000);
	})();


	//签入
	$scope.callSignIn = function() {
		signService
			.signIn()
			.then(function() {
				$scope.currentState = 'calling';
				$scope.signInfo = 'signIn';	
			});
	};

	//签出
	$scope.callSignOut = function() {
		signService
			.signOut()
			.then(function() {
				$scope.currentState = '';
				$scope.signInfo = 'signOut';	
			});
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


	$rootScope.$on('$routeChangeSuccess', function(ev, next, prev) {
		if ((prev && prev.loadedTemplateUrl === 'page/login.html') ||
			localStorage.getItem('parentId') === 'quan') {
			$scope.currentState = '';
			$scope.signInfo = 'signOut';	
		} else {
			$timeout(function() {
				var btnState = window.signState;
				if (btnState) {
					btnState = parseInt(btnState);	
					switch (btnState) {
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
				}	
			}, 200);
		}
	});

	/******************************************/
	//当用户拨打进来电话：切换按钮
	/*
	$scope.$on('userCall', function() {
		$scope.toggleStatus('calling');
	});
	*/
};

headerCtrl.$inject = ['$scope', '$timeout', '$filter', 'signService', '$rootScope'];

controllers.controller('headerCtrl', headerCtrl);
