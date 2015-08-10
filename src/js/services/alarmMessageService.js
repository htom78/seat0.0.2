var services = require('./index');

var alarmMessageService = function($rootScope, $location, quanDialog) {
	var dialog = quanDialog.dialog({
		modalClass: 'message-box',
		backdrop: true,
		backdropClick: true
	});
	return {

		message: function(orders) {
			if ($location.$$path !== '/police.htm') {
				this.openDialog();	
			} else {
				$rootScope.$broadcast('newAlarmMessage', orders);	
			}
		},

		itemSelected: function(id) {
			$rootScope.$broadcast('alarmItemSelect', id);	
		},

		openDialog: function() {
			if (!this.isDialogOpen()) {
				var scope = $rootScope.$new();
				this.bindDialogEvents(scope);
				scope.message = '有新的报警信息是否去查看?';
				dialog.open('component/messageBox.html', 'headerCtrl', scope);	
			}	
		},

		bindDialogEvents: function(scope) {
			var self = this;
			scope.ensure = function() {
				$location.path('/police.htm');
				self.closeDialog();
			};	

			scope.cancel = function() {
				self.closeDialog();
			};
		},

		closeDialog: function() {
			if (this.isDialogOpen()) {
				dialog.close();	
			}	
		},

		isDialogOpen: function() {
			return dialog.isOpen();	
		}	

	};
};

alarmMessageService.$inject = ['$rootScope', '$location', 'quanDialog'];

services.factory('alarmMessageService', alarmMessageService);
