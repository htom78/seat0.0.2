var controllers = require('./index');

var leaderCtrl = function($scope, orderService) {

	$scope.search = {};

	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};

	$scope.toggleTab = function(tabName) {
		$scope.search.currentTab = tabName;
		$scope.search.keywords = '';
		$scope.search.page = 1;
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				console.log(response);
			});
	};
};

leaderCtrl.$inject = ['$scope', 'orderService'];

controllers.controller('leaderCtrl', leaderCtrl);