var controllers = require('./index');

var loginCtrl = function($scope, $location, security) {
	/*
	$rootScope.isLoginPage = true;
	$scope.$on('$destroy', function() {
		$rootScope.isLoginPage = false;
	});
	*/

	$scope.login = function() {
		security.login($scope.username, $scope.password)
			.then(function() {
				location.reload();	
			}, function(errorInfo) {
				$scope.hasError = true;	
				$scope.errorInfo = errorInfo;
			});
	};

	$scope.$watch(function() {
		return security.isAuthenticated();	
	}, function(isAuthenticated) {
		if (isAuthenticated) {
			$location.path('/');	
		}	
	});

};

loginCtrl.$inject = ['$scope', '$location', 'security'];

controllers.controller('loginCtrl', loginCtrl);
