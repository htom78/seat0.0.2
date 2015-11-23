'use strict';
import angular from 'angular';
import representMap from './representMap';
import seatMap from './seatMap';
import ensureBtn from './ensureBtn';
import leaderOrderInfo from './leaderOrderInfo';
import viewOrder from './viewOrder';

module.exports = angular.module('app.dirctives', [])
	.directive('representMap', representMap)
	.directive('seatMap', seatMap)
	.directive(leaderOrderInfo.name, leaderOrderInfo.fn)
	.directive(ensureBtn.name, ensureBtn.fn)
	.directive(viewOrder.name, viewOrder.fn);

require('./chartUser');
require('./callStatus');
require('./wordsPlace');
require('./leaderMap');
require('./chartEmploy');
require('./chartCar');
require('./listenCall');
require('./pauseEmit');
require('./handleAlarmOrder');
require('./confirmDialog');
require('./timeSelect');
require('./callNumber');
require('./callTransform');
require('./tripartiteConference');
