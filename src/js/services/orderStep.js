var services = require('./index');

var orderStepDialog = function(dialog, leaderOrderStorageService) {
	var stepDialog = dialog.dialog({modalClass: 'order-step'});

	return {
		open: function(scope) {
			if (this.isOpen()) {
				return;	
			}
			scope.mapShow = true;
			this.scope = scope;
			stepDialog.open({
						url: 'component/stepInfo.html',
						scope: scope
					});
		},
		setStepDialogPosition: function(pos) {
			stepDialog.modalEl.css({
				top: pos.top,
				left: pos.left
			});
		},
		close: function() {
			if (this.scope) {
				this.scope.mapShow = false;
			}
			stepDialog.close();
		},
		isOpen: function() {
			return stepDialog.isOpen();
		},
		setDialogWidth: function(width) {
			stepDialog.modalEl.width(width);
		}
	};
};

orderStepDialog.$inject = ['dialog'];

services.factory('orderStepDialog', orderStepDialog);
