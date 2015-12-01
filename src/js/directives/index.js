'use strict';
import angular from 'angular';
import representMap from './representMap';
import seatMap from './seatMap';
import ensureBtn from './ensureBtn';
import leaderOrderInfo from './leaderOrderInfo';
import viewOrder from './viewOrder';
import headerInfo from './headerInfo';
import handleAlarmOrder from './handleAlarmOrder';
import employeeStatus from './employeeStatus';

module.exports = angular.module('app.dirctives', [])
	.directive('representMap', representMap)
	.directive('seatMap', seatMap)
	.directive(leaderOrderInfo.name, leaderOrderInfo.fn)
	.directive(ensureBtn.name, ensureBtn.fn)
	.directive(viewOrder.name, viewOrder.fn)
	.directive(headerInfo.name, headerInfo.fn)
	.directive(handleAlarmOrder.name, handleAlarmOrder.fn)
	.directive(employeeStatus.name , employeeStatus.fn);

require('./chartUser');
require('./callStatus');
require('./wordsPlace');
require('./leaderMap');
require('./chartEmploy');
require('./chartCar');
require('./listenCall');
require('./pauseEmit');
require('./confirmDialog');
require('./timeSelect');
require('./callNumber');
require('./callTransform');
