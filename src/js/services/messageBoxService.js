var services = require('./index');

var messageBoxService = function(quanDialog) {

	var messageBox = quanDialog.dialog({
		modalClass: 'message-box',
		backdrop: true,
		backdropClick: true
	});

	return {

		open: function(controller, scope) {
			if (!this.isOpen()) {
				messageBox.open('component/messageBox.html', controller, scope);
			}	
		},

		close: function() {
			if (this.isOpen()) {
				messageBox.close();
			}	
		},

		isOpen: function() {
			return messageBox.isOpen();	
		}	

	};
};

messageBoxService.$inject = ['quanDialog'];

services.factory('messageBoxService', messageBoxService);
