var dialogs = require('./index');
var callTransform = function(quanDialog) {

	var messageBox = quanDialog.dialog({
		modalClass: 'message-box',
		backdrop: true,
		backdropClick: true	
	});

	return {
		open: function(scope) {
			if (!this.isOpen()) {
				return messageBox.open('callTransform.html', 'headerCtrl', scope);	
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

callTransform.$inject = ['quanDialog'];
dialogs.factory('callTransform', callTransform);
