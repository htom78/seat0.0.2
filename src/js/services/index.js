import angular from 'angular';
import represent from './represent';

module.exports = angular.module('app.services', [])
	.service('representService', represent);

require('./statistics');
require('./mapService');
require('./chartUser');
require('./chartEmploy');
require('./chartCar');
require('./leaderMap');
require('./socket');
require('./sign');
require('./seatService');
require('./leaderOrderStorageService');
require('./searchOrderStorageService');
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
