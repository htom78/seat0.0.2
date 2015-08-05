var directives = require('./index');

var handleAlarmOrder = function(handleAlarmDialog) {
	return {

		scope: {
			order: '=handleAlarmOrder',	
		},

		link: function(scope, elem) {
			elem.on('dblclick', function(ev) {
				var self = $(this);
				var pos = self.offset();
				handleAlarmDialog.open(scope, scope.order);
				handleAlarmDialog.setDialogStyle(pos.top + self.height(), pos.left, self.width());
			});	
		}	

	};
};

handleAlarmOrder.$inject = ['handleAlarmDialog'];

directives.directive('handleAlarmOrder', handleAlarmOrder);
