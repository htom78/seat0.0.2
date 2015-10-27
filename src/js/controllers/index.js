'use strict';
import angular from 'angular';
const bulk = require('bulk-require');

/*
module.exports = angular.module('app.controllers', [])
	.controller('headerCtrl', require('./header').fn)
	.controller('leaderCtrl', require('./leader').fn)
	.controller('loginCtrl', require('./login').fn)
	.controller('searchCtrl', require('./search').fn)
	.controller('policeCtrl', require('./police').fn)
	.controller('representCtrl', require('./represent').fn)
	.controller('seatCtrl', require('./seat').fn);

	*/
const controllersModule = angular.module('app.controllers', []);
const controllers = bulk(__dirname, ['./**/!(*index).js']);
Object.keys(controllers).forEach((key) => {
	let item = controllers[key];
	controllersModule.controller(item.name, item.fn);
});
