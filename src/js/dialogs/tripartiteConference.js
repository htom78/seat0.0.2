var dialogs = require('./index');
var tripartiteConference = function(quanDialog) {

	var messageBox = quanDialog.dialog({
		modalClass: 'message-box',
		backdrop: true,
		backdropClick: true	
	});

	return {
		open: function(scope) {
			if (!this.isOpen()) {
				return messageBox.open('tripartiteConference.html', 'headerCtrl', scope);	
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

tripartiteConference.$inject = ['quanDialog'];
dialogs.factory('tripartiteConference', tripartiteConference);
