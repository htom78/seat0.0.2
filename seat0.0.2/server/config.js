var path = require('path');
var dist = path.resolve(__dirname, '../client/dist');
module.exports = {
	server: {
		listenPort: 8890,
		distFolder: dist,
		staticUrl: '/static',
		sass: path.resolve(__dirname, '../client/src/sass'),
		favicon: dist + '/favicon.ico'
	},
	mongo: {
		db: 'order',
		host: 'localhost',
		port: 27017
	}
};
