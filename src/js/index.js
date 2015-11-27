'use strict';
import angular from 'angular';
import 'angular-route';
import './map';
import './bootstrap';
import './security';
import 'angular-ui-router';

require('./controllers');
require('./directives');
require('./services');
require('./components');
require('./filters');
require('./utils');
require('./ocx');
require('./templates');

var requires = [
	'ngRoute',
	'ui.router',
	'templates',
	'app.controllers',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters',
	'app.utils',
	'app.ocx',
	'app.map',
	'app.security',
	'ui.bootstrap.datepicker',
	'ui.bootstrap.modal',
	'ui.bootstrap.dropdown',
	'ui.bootstrap.pagination'
];

var app = angular.module('app', requires)
	.config(require('./router'))
	.config(require('./config'))
	.run(require('./run'));


module.exports = app;



