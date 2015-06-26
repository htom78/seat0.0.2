var directives = require('./index');

var orderStep = function(orderStepDialog) {
	return {
		scope: {
			order: '=orderStep',
			showInfo: '&'
		},
		link: function(scope, elem) {
			elem.on('dblclick', function(ev) {
				var pos = elem.offset();
				pos.top = elem.height() + pos.top;
				orderStepDialog.setStepDialogPosition(pos);
				setTimeout(function() {
					orderStepDialog.setDialogWidth(elem.width());
				}, 90);
			});
		}
	};
};

orderStep.$inject = ['orderStepDialog'];

directives.directive('orderStep', orderStep);
