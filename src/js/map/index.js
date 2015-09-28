import angular from 'angular';

import representMap from './representMap';
import seatMap from './seatMap';

export default angular.module('app.map', [])
	.provider('representMap', representMap)
	.provider('seatMap', seatMap);
