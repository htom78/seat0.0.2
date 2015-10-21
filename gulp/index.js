'use strict';

var fs = require('fs');
var onlyScripts = require('./utils/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(task => {
	require(`./tasks/${task}`);
});

