'use strict';

function Order($scope, $uibModalInstance, orderInfo) {
	$scope.order = orderInfo;		
}

export default {
	name: 'viewOrderCtrl',
	fn: Order
};
