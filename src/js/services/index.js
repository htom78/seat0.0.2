'use strict';
import angular from 'angular';
import represent from './represent';
import searchService from './searchService';
import seatService from './seatService';

module.exports = angular.module('app.services', [])
	.service('representService', represent)
	.service('searchService', searchService)
	.service('seatService', seatService);

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
