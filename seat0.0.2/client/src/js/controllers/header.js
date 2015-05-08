var controllers = require('./index');

var headerCtrl = function($scope, $timeout, $filter) {

	$scope.username = window.username;

	//左上角时间
	(function tickTimer(){
		$scope.currentTimer = $filter('date')(new Date(), 'HH:mm');
		$timeout(tickTimer, 30000);
	})();


	//状态切换按钮
	$scope.toggleStatus = function(name) {
		$scope.currentStauts = name;
	};

	$scope.isCurrentActive = function(name) {
		return $scope.currentStauts === name;
	};

	$scope.firstBtnTitle = '小休';
	$scope.secondBtnTitle = '示忙';

	//第一个按钮切换
	$scope.firstBtnStatus = 'reset';
	$scope.toggleFirstBtn = function() {
		if (!$scope.isSignIn() || $scope.isSecondBtnVain()) {
			return;
		}
		if ($scope.firstBtnStatus === 'reset') {
			$scope.firstBtnStatus = 'vain'; //切换到接电话状态
			$scope.toggleStatus('reset');
			$scope.firstBtnTitle = '等待接电话';
		} else {
			$scope.firstBtnStatus = 'reset';//切换到小休状态
			$scope.toggleStatus('vain');
			$scope.firstBtnTitle = '小休';
		}
	};

	//第二个按钮切换
	$scope.secondBtnStatus = 'busy';
	$scope.toggleSecondBtn = function() {
		if (!$scope.isSignIn() || $scope.isFirstBtnVain()) {
			return;
		}
		if ($scope.secondBtnStatus === 'busy') {
			$scope.secondBtnStatus = 'vain'; //切换到接电话状态
			$scope.toggleStatus('busy');
			$scope.secondBtnTitle = '等待接电话';
		} else {
			$scope.secondBtnStatus = 'busy'; //切换到示忙状态
			$scope.toggleStatus('vain');
			$scope.secondBtnTitle = '示忙';
		}
		
	};

	$scope.isFirstBtnVain = function() {
		return $scope.firstBtnStatus === 'vain';
	};

	$scope.isSecondBtnVain = function() {
		return $scope.secondBtnStatus === 'vain';
	};



	//当用户拨打进来电话：切换按钮
	$scope.$on('userCall', function() {
		$scope.toggleStatus('calling');
	});



	//状态： reset=    vain= 接电话   busy=    calling
	$scope.$watch('currentStauts', function(newValue) {
		var info = '';
		if (newValue) {
			switch (newValue) {
				case 'reset' :
					info = '小休';
					break;
				case 'vain' :
					info = '空闲';
					break;
				case 'busy' :
					info = '示忙';
					break;
				case 'calling' :
					info = '接电话中';
					break;
			}
		}
		$scope.currentStatusInfo = info;
	});

	//签入签出
	$scope.signInfo = 'signOut';
	$scope.toggleSign = function(name) {
		$scope.signInfo = name;
		if (name === 'signIn') {
			//签入
			$scope.firstBtnStatus = 'reset';
			$scope.secondBtnStatus = 'busy';
			$scope.toggleStatus('vain');
		}
	};

	$scope.isSignActive = function(name) {
		return $scope.signInfo === name;
	};

	//检测是否为签入状态
	$scope.isSignIn = function() {
		return $scope.signInfo === 'signIn';
	};
};

headerCtrl.$inject = ['$scope', '$timeout', '$filter'];

controllers.controller('headerCtrl', headerCtrl);