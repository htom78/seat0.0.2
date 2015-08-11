var directives = require('./index');

var leaderOrderInfo = function(leaderOrderInfoDialog, leaderService) {
	return {

		scope: {
			order: '=leaderOrderInfo',
			currentOrderTab: '=currentTab'	
		},	

		link: function(scope, elem) {

			elem.on('dblclick', function(ev) {
				scope.order.isActive = true;
				leaderOrderInfoDialog.open(scope)
					.then(function() {
						scope.order.isActive = false;	
					});	
				leaderService.getOrderInfo(scope.order.sn)
					.then(function(response) {
						scope.orderInfo = response.data;	
					});
				var pos = elem.offset();
				leaderOrderInfoDialog.setDialogStyle(pos.top + elem.height(), pos.left, elem.width());
			});	

			//双击表单出来的，控制按钮，权限控制
			scope.isAssignBtnShow = function() {
				if (scope.currentOrderTab === 'done' ||
					scope.currentOrderTab === 'received') {
					return false;
				} else {
					return true;
				}
			};

			scope.isCancelBtnShow = function() {
				if (scope.currentOrderTab === 'done' ||
					scope.currentOrderTab === 'started') {
					return false;
				} else {
					return true;
				}
			};

			scope.isPassengerFuckBtnShow = function() {
				if (scope.currentOrderTab === 'exception' ||
					scope.currentOrderTab === 'received') {
					return true;
				} else {
					return false;
				}
			};

			scope.isDriverFuckBtnShow = function() {
				if (scope.currentOrderTab === 'exception' ||
					scope.currentOrderTab === 'started' ||
					scope.currentOrderTab === 'received') {
					return true;
				} else {
					return false;
				}
			};


	//取消订单
	scope.cancelOrder = function() {
		leaderService.heandlCancelOrder(scope.order.sn);
	};

	//乘客放空
	scope.passengerFuck = function() {
		leaderService.handlePassengerFuckOrder(scope.order.sn);
	};

	//司机放空
	scope.driverFuck = function() {
		leaderService.handleDriverFuckOrder(scope.order.sn);
	};

	scope.assignCar = function(name) {
		console.log('assign', name);
		//leaderService.assignOrderToCarPlate($scope.carPlate);
	};

		}
	};
};

leaderOrderInfo.$inject = ['leaderOrderInfoDialog', 'leaderOrderStorageService'];

directives.directive('leaderOrderInfo', leaderOrderInfo);
