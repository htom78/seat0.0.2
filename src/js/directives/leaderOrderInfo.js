var directives = require('./index');

var leaderOrderInfo = function(leaderOrderInfoDialog, leaderService, leaderMapService) {
	return {

		scope: {
			order: '=leaderOrderInfo',
		},	

		link: function(scope, elem) {

			scope.getCurrentTabName = leaderService.getCurrentTabName;

			elem.on('dblclick', function(ev) {
				scope.order.isActive = true;
				leaderService.showMap();	
				leaderOrderInfoDialog.open(scope)
					.then(function() {
						scope.order.isActive = false;	
						leaderService.closeMap();
						leaderMapService.clearPath();
					});	
				leaderService.getOrderInfo(scope.order.sn)
					.then(function(response) {
						scope.orderInfo = response.data;	
						if (scope.isDoneCurrentTab()) {
							leaderMapService.setPath(scope.orderInfo);
						}
					});
				var pos = elem.offset();
				leaderOrderInfoDialog.setDialogStyle(pos.top + elem.height(), pos.left, elem.width() - 680);
			});	

			scope.isExceptionCurrentTab = function() {
				return scope.getCurrentTabName() === 'exception';	
			};

			scope.isDoneCurrentTab = function() {
				return scope.getCurrentTabName() === 'done';	
			};

			scope.isReceivedCurrentTab = function() {
				return scope.getCurrentTabName() === 'received';	
			};

			scope.isStartedCurrentTab = function() {
				return scope.getCurrentTabName() === 'started';	
			};

			//双击表单出来的，控制按钮，权限控制
			scope.isAssignBtnShow = function() {
				if (scope.isDoneCurrentTab() ||
					scope.isReceivedCurrentTab()) {
					return false;
				} else {
					return true;
				}
			};

			scope.isCancelBtnShow = function() {
				if (scope.isDoneCurrentTab() ||
					scope.isStartedCurrentTab()) {
					return false;
				} else {
					return true;
				}
			};

			scope.isPassengerFuckBtnShow = function() {
				if (scope.isExceptionCurrentTab() ||
					scope.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}
			};

			scope.isDriverFuckBtnShow = function() {
				if (scope.isExceptionCurrentTab() ||
					scope.isStartedCurrentTab() ||
					scope.isReceivedCurrentTab()) {
					return true;
				} else {
					return false;
				}
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

leaderOrderInfo.$inject = ['leaderOrderInfoDialog', 'leaderOrderStorageService', 'leaderMapService'];

directives.directive('leaderOrderInfo', leaderOrderInfo);
