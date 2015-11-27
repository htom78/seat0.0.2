'use strict';

function Run($rootScope, security) {
	$rootScope.$on('$stateChangeSuccess', (ev, toState) => {
		$rootScope.pageTitle = '';	
		if (toState.title) {
			$rootScope.pageTitle += toState.title;	
			$rootScope.pageTitle += '\u2014';
		}
	});
	security.requestCurrentUser();
}

export default Run;
