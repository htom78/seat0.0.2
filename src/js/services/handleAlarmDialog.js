var services = require('./index');

var handleAlarmDialog = function(quanDialog, $q) {
	var alarmDialog = quanDialog.dialog({
		modalClass: 'handle-alram-dialog',
		bodyClick: true
	});

	return {

		open: function(scope) {
			if (!this.isOpen()) {
				if (scope.order.status === 1) {
					return alarmDialog.open('component/unhandleAlarmDialog.html', 'policeCtrl', scope);
				} else {
					return alarmDialog.open('component/handleAlarmDialog.html', 'policeCtrl', scope);
				}
			}	
			return $q.reject();
		},

		close: function() {
			if (this.isOpen()) {
				alarmDialog.close();
			}	
		},

		setDialogStyle: function(top, left, width) {
			alarmDialog.modalElem
				.css({
					top: top,
					left: left,
					width: width	
				});	
		},

		getModalElem: function() {
			return alarmDialog.modalElem;	
		},

		isOpen: function() {
			return alarmDialog.isOpen();	
		}

	};
};

handleAlarmDialog.$inject = ['quanDialog', '$q'];

services.factory('handleAlarmDialog', handleAlarmDialog);
