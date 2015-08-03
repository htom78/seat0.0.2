var services = require('./index');

var handleAlarmDialog = function(quanDialog) {
	var alarmDialog = quanDialog.dialog({modalClass: 'handle-alram-dialog'});

	return {

		_isOpen: false,

		open: function(scope) {
			if (!this.isOpen()) {
				this._isOpen = true;
				alarmDialog.open('component/handleAlarmDialog.html', 'policeCtrl')
					.then(function() {
						console.log(8888);	
					});
			}	
		},

		close: function() {
			if (this.isOpen()) {
				this._isOpen = false;
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
			return this._isOpen;	
		}


	};
};

handleAlarmDialog.$inject = ['quanDialog'];

services.factory('handleAlarmDialog', handleAlarmDialog);
