'use strict';

import angular from 'angular';

import security from './security';

export default angular.module('app.security', [])
	.service(security.name, security.fn);
