'use strict';

function Info($uibModal) {
	return {
		scope: {
			order: '=leaderOrderInfo'	
		},

		link(scope, elem) {
			elem.bind('dblclick', (ev) => {
				console.log(scope.order);	
				/*
				var modalInstance = $uibModal.open({
					animation: false,
					backdrop: false,
					appendTo: elem.closest('.table-wrapper');
					templateUrl: ''	
				});
				*/
			});		
		}	
	};
}

export default {
	name: 'leaderOrderInfo',
	fn: Info
};

/*

var leaderOrderInfo = function(leaderOrderInfoDialog, leaderService, leaderMap) {
	return {

		scope: {
			order: '=leaderOrderInfo',
		},	

		link: function(scope, elem) {


			const $parent = scope.$parent;

			elem.on('dblclick', function(ev) {
				scope.order.isActive = true;
				$parent.showMap();
				leaderService.getOrderInfo(scope.order.sn)
					.then((response) => {
						scope.orderInfo = response.data;	
						if ($parent.isDoneCurrentTab()) {
							leaderMap.setPath(scope.orderInfo);
						}
					});
				leaderOrderInfoDialog.open(scope)
					.then(function() {
						$parent.hideMap();
						scope.order.isActive = false;	
						leaderMap.clearPath();
					});	
				var pos = elem.offset();
				leaderOrderInfoDialog.setDialogStyle(pos.top + elem.height(), pos.left, elem.width() - 680);
			});	


			//双击表单出来的，控制按钮，权限控制
			scope.isAssignBtnShow = function() {
				if ($parent.isDoneCurrentTab() ||
					$parent.isReceivedCurrentTab()) {
					return false;
				} else {
					return true;
				}
			};

			scope.isCancelBtnShow = function() {
				if ($parent.isDoneCurrentTab() ||
					$parent.isStartedCurrentTab()) {
					return false;
				} else {
					return true;
				}
			};

			scope.isPassengerFuckBtnShow = function() {
				if ($parent.isExceptionCurrentTab() ||
					$parent.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}
			};

			scope.isDriverFuckBtnShow = function() {
				if ($parent.isExceptionCurrentTab() ||
					$parent.isStartedCurrentTab() ||
					$parent.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}
			};

			scope.cancelOrder = function() {
				leaderService.handleCancelOrder(scope.order.sn)
					.then(() => {
						leaderService.removeOrder(scope.order);
						leaderOrderInfoDialog.close();
					});
			};

			scope.passengerFuck = function() {
				leaderService.handlePassengerFuckOrder(scope.order.sn)
					.then(() => {
						if (!$parent.isExceptionCurrentTab()) {
							leaderService.removeOrder(scope.order);
						}
						scope.order.statusName = '乘客违约';
						leaderOrderInfoDialog.close();
					});
			};

			scope.driverFuck = function() {
				leaderService.handleDriverFuckOrder(scope.order.sn)
					.then(() => {
						if (!$parent.isExceptionCurrentTab()) {
							leaderService.removeOrder(scope.order);
						}
						scope.order.statusName = '司机违约';
						leaderOrderInfoDialog.close();
					});
			};

			scope.assignCar = function(carPlate) {
				leaderService.assignOrderByCarPlate(scope.order.sn, carPlate)
					.then(() => {
						leaderService.removeOrder(scope.order);
						leaderOrderInfoDialog.close();
					});
			};

		}
	};
};

*/
