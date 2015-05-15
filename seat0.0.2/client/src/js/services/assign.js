var services = require('./index');

var assignDialog = function(dialog) {
	var alert = dialog.dialog({modalClass: 'assign-dialog', backdrop: true});
	return {
		open: function(scope) {
			return alert.open({
						url: 'component/assignDialog.html',
						scope: scope
					});
		},
		close: function() {
			alert.close();
		}
	};
};

assignDialog.$inject = ['dialog'];

services.factory('assignDialog', assignDialog);
