var services = require('./index');

var orderStepDialog = function(dialog) {
	var stepDialog = dialog.dialog({modalClass: 'order-step'});

	function setDialogPosition(pos) {
		stepDialog.modalEl.css({
			top: pos.top,
			left: pos.left
		});
	}

	return {
		open: function(scope, pos) {
			scope.mapShow = true;
			this.scope = scope;
			stepDialog.open({
						url: 'component/stepInfo.html',
						scope: scope
					});
			setDialogPosition(pos);
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