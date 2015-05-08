var controllers = require('./index');

var loginCtrl = function($scope, loginService, $location, $rootScope) {
	$scope.loginForm = {};
	$rootScope.isLoginPage = true;
	$scope.$on('$destroy', function() {
		$rootScope.isLoginPage = false;
	});
	$scope.login = function() {
		loginService
			.login($scope.loginForm)
			.then(function() {
				$location.path(window.appRoot + '/');
			}, function(errorInfo) {
				$scope.hasError = true;
				$scope.errorInfo= errorInfo;
			});
	};
};

loginCtrl.$inject = ['$scope', 'loginService', '$location', '$rootScope'];

controllers.controller('loginCtrl', loginCtrl);