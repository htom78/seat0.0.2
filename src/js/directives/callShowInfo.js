'use strict';

import angular from 'angular';

function Show(iChart) {
	return {
		scope: {
			userData: '=callShowInfo',	
			clickNumber: '&',
		},

		templateUrl: 'component/call-show-info.html',
		
		link(scope, elem) {
				var chartInstance = iChart.instance(angular.element('#callGraph'), {
					colors: ['#649626', '#ff7c3c' ],
				});

				scope.$watch('userData', (data) => {
					if (data && data.total !== undefined) {
						scope.rank = data.rank;
						scope.sn = data.sn;
						scope.timeCreated = data.timeCreated;
						chartInstance.drawUserCall({
							count: data.fkTotal,
							total: data.total,	
						});
					} else {
						chartInstance.drawUserCall({ count: 0,	total: 0 });
						scope.rank = null;
						scope.sn = null;
						scope.timeCreated = null;
					}
				});

				scope.queryOrderBySn = function(sn) {
					scope.clickNumber();
				};
		}	
	};
}

export default {
	name: 'callShowInfo',
	fn: Show
};
