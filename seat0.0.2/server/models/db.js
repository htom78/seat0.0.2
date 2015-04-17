var config = require('../config').mongo,
	Db = require('mongodb').Db,
	Server = require('mongodb').Server;
module.exports = new Db(config.db, new Server(config.host, config.port), {safe: true});