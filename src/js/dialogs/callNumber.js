'use strict';
var services = require('./index');

var callNumber = function(quanDialog) {
	var messageBox = quanDialog.dialog({
		modalClass: 'message-box',
		backdrop: true,
		backdropClick: true	
	});
	return {
		open: function(scope) {
			if (!this.isOpen()) {
				return messageBox.open('component/callNumber.html', 'headerCtrl', scope);	
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

callNumber.$inject = ['quanDialog'];

services.factory('callNumberDialog', callNumber);
