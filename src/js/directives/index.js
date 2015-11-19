'use strict';
import angular from 'angular';
import representMap from './representMap';
import seatMap from './seatMap';
import tabCount from './tabCount';
import ensureBtn from './ensureBtn';

module.exports = angular.module('app.dirctives', [])
	.directive('representMap', representMap)
	.directive('seatMap', seatMap)
	.directive(tabCount.name, tabCount.fn)
	.directive(ensureBtn.name, ensureBtn.fn);

require('./chartUser');
require('./callStatus');
require('./pagination');
require('./wordsPlace');
require('./leaderMap');
require('./chartEmploy');
require('./chartCar');
require('./listenCall');
require('./pauseEmit');
require('./handleAlarmOrder');
require('./confirmDialog');
require('./timeSelect');
require('./leaderOrderInfo');
require('./callNumber');
require('./callTransform');
require('./tripartiteConference');
