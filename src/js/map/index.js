import angular from 'angular';

import representMap from './representMap';

export default angular.module('app.map', [])
	.provider('representMap', representMap);
