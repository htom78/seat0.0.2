'use strict';

import angular from 'angular';
function TabCount() {
	return {
		restrict: 'E',
		scope: {
			count:'='	
		},
		template: `
			<b>{{arrayCount[0]}}</b>	
			<b>{{arrayCount[1]}}</b>	
			<b>{{arrayCount[2]}}</b>	
		`,
		link: (scope, elem) => {
			scope.$watch('count', (c) => {
				if (!angular.isNumber(c) || c === 0) {
					scope.arrayCount = [0, 0, 0];	
				} else {
					scope.arrayCount = ('000' + scope.count).toString().split('').slice(-3);	
				}	
			});
		}	
	};
}

export default {
	name: 'tabCount',
	fn: TabCount
};



