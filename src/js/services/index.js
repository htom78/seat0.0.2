'use strict';
import angular from 'angular';
import represent from './represent';
import searchService from './searchService';
import seatService from './seatService';
import leaderService from './leaderService';
import headerService from './headerService';
import orderService from './orderService';

module.exports = angular.module('app.services', [])
	.service('representService', represent)
	.service('searchService', searchService)
	.service('seatService', seatService)
	.service('leaderService', leaderService)
	.service('headerService', headerService)
	.factory(orderService.name, orderService.fn);

require('./statistics');
require('./mapService');
require('./chartUser');
require('./chartEmploy');
require('./chartCar');
require('./leaderMap');
require('./socket');
require('./sign');
require('./policeService');
require('./user');
require('./handleAlarmDialog');
require('./messageBoxService');
require('./socketMessageService');
require('./alarmMessageService');
require('./orderStateChangeMessage');
require('./leaderOrderInfoDialog');
require('./myHttpInterceptor');
