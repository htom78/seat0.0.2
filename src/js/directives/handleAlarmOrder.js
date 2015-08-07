var directives = require('./index');

var handleAlarmOrder = function(handleAlarmDialog, policeService, security, $filter) {
	return {

		scope: {
			order: '=handleAlarmOrder',	
			timeTransfered: '@timeTransfered',
			operator: '@operator'
		},

		link: function(scope, elem) {
			elem.on('dblclick', function(ev) {
				if (scope.order.isOtherSelected) {
					return false;
				}
				scope.order.isActive = true;
				var pos = elem.offset();
				if (scope.isUnhandleOrder() && 
					!scope.order.isSelfSelected) {
					policeService.selectItem(scope.order.id)
						.then(function(response) {
							scope.order.isSelfSelected = true;
						});
				}
				handleAlarmDialog.open(scope)
					.then(function() {
						scope.order.isActive = false;	
					});
				handleAlarmDialog.setDialogStyle(pos.top + elem.height(), pos.left, elem.width());

			});	

			scope.hasSelfSelected = function() {
				return scope.isUnhandleOrder() && scope.order.isSelfSelected;	
			};

			scope.hasOtherSelected = function() {
				return scope.isUnhandleOrder() && scope.order.isOtherSelected;	
			};

			scope.isUnhandleOrder = function() {
				return scope.order.status === 1;	
			};

			scope.canPlayVioce = function() {
				return scope.isWatchingCar;	
			};
			scope.canViewPhoto = function() {
				return scope.isPhotographed;	
			};
			scope.canPlayTrace = function() {
				return scope.isTrackingCar;	
			};

			scope.watchCar = function() {
				policeService.watchCar(scope.order.vehicleNumber)
					.then(function() {
						scope.isWatchingCar = true;				
					});
			};

			scope.trackCar = function() {
				policeService.trackCar(scope.order.vehicleNumber)
					.then(function() {
						scope.isTrackingCar = true;
					});	
			};

			scope.photograph = function() {
				policeService.photograph(scope.order.vehicleNumber)
					.then(function() {
						scope.isPhotographed = true;
					});	
			};

			scope.transferPolice = function() {
				policeService.transferPolice(scope.order.id)
					.then(function() {
						scope.order.isTransfered = 1;					
						scope.timeTransfered = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
						security.requestCurrentUser()
							.then(function(response) {
								scope.operator = response;
							});
					});	
			};

			scope.relieve = function() {
				policeService.relieve(scope.order.id)
					.then(function() {
						scope.order.status = 2;
						scope.order.isRevecatory = 1;
					});	
			};

			scope.hasTransferPolice = function() {
				return scope.order.isTransfered === 1;		
			};

			scope.alarmOperateInfo = 1;
			scope.handleAlarm = function() {
				policeService.handleAlarm(scope.order.id, scope.alarmOperateInfo, scope.alarmNote);
			};

			scope.hasHandleAlarm = function() {
				return scope.order.status === 1;
			};

			scope.isShowRelieveBtn = function() {
				return scope.order.isRevecatory === 0;
			};

		}	

	};
};

handleAlarmOrder.$inject = ['handleAlarmDialog', 'policeService', 'security', '$filter'];

directives.directive('handleAlarmOrder', handleAlarmOrder);
