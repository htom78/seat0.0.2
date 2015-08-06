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
				scope.order.isActive = true;
				var self = $(this);
				var pos = self.offset();
				handleAlarmDialog.open(scope)
					.then(function() {
						scope.order.isActive = false;
					});
				handleAlarmDialog.setDialogStyle(pos.top + self.height(), pos.left, self.width());
			});	

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
				policeService.relieve(scope.order)
					.then(function() {
						scope.order.isRevecatory = 1;
					});	
			};

			scope.alarmOperateInfo = 1;
			scope.handleAlarm = function() {
				policeService.handleAlarm(scope.order.id, scope.alarmOperateInfo, scope.alarmNote)
					.then(function() {
						scope.order.status = 2;
					});
			};

			scope.hasHandleAlarm = function() {
				return scope.order.status === 1;
			};

			scope.isShowRelieveBtn = function() {
				return scope.order.isRevecatory === 0;
			};

			scope.isShowTransferedBtn = function() {
				return scope.order.isTransfered === 0;
			};

		}	

	};
};

handleAlarmOrder.$inject = ['handleAlarmDialog', 'policeService', 'security', '$filter'];

directives.directive('handleAlarmOrder', handleAlarmOrder);
