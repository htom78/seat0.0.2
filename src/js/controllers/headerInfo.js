'use strict';

function Dialog($scope, $uibModalInstance) {

	$scope.ok = function() {
		$uibModalInstance.close($scope.content);	
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();	
	};
}

export default {
	name: 'headerInfoCtrl',
	fn: Dialog
};
