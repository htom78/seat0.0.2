var services = require('./index');

var handleAlarmDialog = function(quanDialog, policeService) {
	var alarmDialog = quanDialog.dialog({
		modalClass: 'handle-alram-dialog',
		bodyClick: true
	});

	return {

		open: function(scope, order) {
			if (!this.isOpen()) {
				if (order.status === 1) {
					alarmDialog.open('component/unhandleAlarmDialog.html', 'policeCtrl')
						.then(function() {
							policeService.removeActiveItem();	
						});
				} else {
					alarmDialog.open('component/handleAlarmDialog.html', 'policeCtrl')
						.then(function() {
							policeService.removeActiveItem();	
						});
				}
				policeService.addActiveItem(order);
			}	
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

handleAlarmDialog.$inject = ['quanDialog', 'policeService'];

services.factory('handleAlarmDialog', handleAlarmDialog);
