'use strict';
import angular from 'angular';
import represent from './represent';
import searchService from './searchService';

module.exports = angular.module('app.services', [])
	.service('representService', represent)
	.service('searchService', searchService)
	.factory('seatService', require('./seatService').fn);

require('./statistics');
require('./mapService');
require('./chartUser');
require('./chartEmploy');
require('./chartCar');
require('./leaderMap');
require('./socket');
require('./sign');
require('./leaderService');
require('./policeService');
require('./security');
require('./user');
require('./handleAlarmDialog');
require('./messageBoxService');
require('./socketMessageService');
require('./alarmMessageService');
require('./orderStateChangeMessage');
require('./leaderOrderInfoDialog');
require('./myHttpInterceptor');
