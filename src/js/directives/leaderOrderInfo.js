var directives = require('./index');

var leaderOrderInfo = function(leaderOrderInfoDialog, leaderService) {
	return {

		scope: {
			order: '=leaderOrderInfo',
		},	

		link: function(scope, elem) {

			elem.on('dblclick', function(ev) {
				scope.order.isActive = true;
				leaderService.showMap();	
				leaderOrderInfoDialog.open(scope)
					.then(function() {
						scope.order.isActive = false;	
						leaderService.closeMap();
					});	
				leaderService.getOrderInfo(scope.order.sn)
					.then(function(response) {
						scope.orderInfo = response.data;	
					});
				var pos = elem.offset();
				leaderOrderInfoDialog.setDialogStyle(pos.top + elem.height(), pos.left, elem.width() - 680);
			});	

			scope.getCurrentTabName = leaderService.getCurrentTabName;

			//双击表单出来的，控制按钮，权限控制
			scope.isAssignBtnShow = function() {
				if (scope.getCurrentTabName() === 'done' ||
					scope.getCurrentTabName() === 'received') {
					return false;
				} else {
					return true;
				}
			};

			scope.isCancelBtnShow = function() {
				if (scope.getCurrentTabName() === 'done' ||
					scope.getCurrentTabName() === 'started') {
					return false;
				} else {
					return true;
				}
			};

			scope.isPassengerFuckBtnShow = function() {
				if (scope.getCurrentTabName() === 'exception' ||
					scope.getCurrentTabName() === 'received') {
					return true;
				} else {
					return false;
				}
			};

			scope.isDriverFuckBtnShow = function() {
				if (scope.getCurrentTabName() === 'exception' ||
					scope.getCurrentTabName() === 'started' ||
					scope.getCurrentTabName() === 'received') {
					return true;
				} else {
					return false;
				}
			};

			scope.isExceptionCurrentTab = function() {
				return scope.getCurrentTabName() === 'exception';	
			};


			scope.cancelOrder = function() {
				leaderService.handleCancelOrder(scope.order.sn)
					.then(function() {
						leaderService.removeOrder(scope.order);
						leaderOrderInfoDialog.close();
					});
			};

			scope.passengerFuck = function() {
				leaderService.handlePassengerFuckOrder(scope.order.sn)
					.then(function() {
						if (!scope.isExceptionCurrentTab()) {
							leaderService.removeOrder(scope.order);
						}
						scope.order.statusName = '乘客违约';
						leaderOrderInfoDialog.close();
					});
			};

			scope.driverFuck = function() {
				leaderService.handleDriverFuckOrder(scope.order.sn)
					.then(function() {
						if (!scope.isExceptionCurrentTab()) {
							leaderService.removeOrder(scope.order);
						}
						scope.order.statusName = '司机违约';
						leaderOrderInfoDialog.close();
					});
			};

			scope.assignCar = function(name) {
				leaderService.assignOrderToCarPlate(scope.order.sn, name)
					.then(function() {
						leaderService.removeOrder(scope.order);
						leaderOrderInfoDialog.close();
					});
			};

			}
	};
};

leaderOrderInfo.$inject = ['leaderOrderInfoDialog', 'leaderOrderStorageService'];

directives.directive('leaderOrderInfo', leaderOrderInfo);
