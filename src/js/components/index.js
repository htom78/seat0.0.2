'use strict';

import angular from 'angular';
import iChart from './iChart';
module.exports = angular.module('app.components', [])
	.factory(iChart.name, iChart.fn);
require('./chart');
require('./quanDialog');
