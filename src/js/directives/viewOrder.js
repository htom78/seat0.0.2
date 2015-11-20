'use strict';

function View($uibModal) {
	return {
		scope: {},

		link(scope, elem) {
			elem.bind('click', () => {
			
			});
		}	
	};
}

export default {
	name: 'viewOrder',
	fn: View
};
