import angular from 'angular';
import representMap from './representMap';
module.exports = angular.module('app.dirctives', [])
	.directive('representMap', representMap);
require('./seatMapView');
require('./chartUser');
require('./callStatus');
require('./pagination');
require('./wordsPlace');
require('./leaderMap');
require('./chartEmploy');
require('./chartCar');
require('./listenCall');
require('./pauseEmit');
require('./calendar');
require('./handleAlarmOrder');
require('./confirmDialog');
require('./timeSelect');
require('./leaderOrderInfo');
require('./callNumber');
require('./callTransform');
require('./tripartiteConference');
