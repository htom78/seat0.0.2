'use strict';

function LoginCtrl($scope, $location, security) {

	$scope.login = function() {
		security.login($scope.username, $scope.password)
			.then(function() {
				location.reload();	
			}, function(errorInfo) {
				$scope.hasErrorMessage = true;	
				$scope.errorInfo = errorInfo;
			});
	};

	$scope.$watch(() => {
		return security.isAuthenticated();	
	}, (isAuthenticated) => {
		if (isAuthenticated) {
			$location.path('/main/seat.htm');	
		}	
	});
}

export default {
	name: 'loginCtrl',
	fn: LoginCtrl
};
