var express = require('express');
var routes = express.Router();

var site = require('./controllers/site');
var order = require('./controllers/order');
var statistics = require('./controllers/statistics');


routes.get('/', site.index);
routes.get('/leader.htm', site.index);

/*********order*****/
routes.post('/call.htm', order.call);
routes.get('/search.htm', order.search);

/********statistics******/
routes.get('/statis/m.htm', statistics.call);

module.exports = routes;
