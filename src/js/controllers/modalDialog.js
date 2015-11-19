'use strict';

function Dialog($scope, $uibModalInstance, info) {
	$scope.content = info.content;
	$scope.title = info.title;
	$scope.hasInput = info.hasInput;

	$scope.ok = function() {
		if ($scope.hasInput && $scope.input) {
			$uibModalInstance.close($scope.input);	
		} else {
			$uibModalInstance.close();	
		}
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();	
	};
}

export default {
	name: 'modalDialogCtrl',
	fn: Dialog
};
