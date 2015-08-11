var services = require('./index');

var leaderOrderInfoDialog = function(quanDialog) {
	var infoDialog = quanDialog.dialog({
		modalClass: 'order-step',
		bodyClick: true	
	});

	return {

		open: function(scope) {
			if (!this.isOpen()) {
				return infoDialog.open('component/stepInfo.html', 'leaderCtrl', scope);	
			}	
		},

		close: function() {
			if (this.isOpen()) {
				infoDialog.close();	
			}	
		},

		setDialogStyle: function(top, left, width) {
			infoDialog.modalElem.css({
				top: top,
				left: left,
				width: width	
			});	
		},

		getModalElem: function() {
			return infoDialog.modalElem;	
		},

		isOpen: function() {
			return infoDialog.isOpen();	
		}	

	};
};

leaderOrderInfoDialog.$inject = ['quanDialog'];

services.factory('leaderOrderInfoDialog', leaderOrderInfoDialog);
