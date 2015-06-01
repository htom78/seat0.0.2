var controllers = require('./index');

var loginCtrl = function($scope, loginService, $location, $rootScope, employerService) {
	$scope.loginForm = {};
	$rootScope.isLoginPage = true;
	$scope.$on('$destroy', function() {
		$rootScope.isLoginPage = false;
	});
	$scope.login = function() {
		loginService
			.login($scope.loginForm)
			.then(function() {
				$location.path('/');
			}, function(errorInfo) {
				$scope.hasError = true;
				$scope.errorInfo= errorInfo;
			});
	};

	employerService.clearInfo();
};

loginCtrl.$inject = ['$scope', 'loginService', '$location', '$rootScope', 'employerService'];

controllers.controller('loginCtrl', loginCtrl);
