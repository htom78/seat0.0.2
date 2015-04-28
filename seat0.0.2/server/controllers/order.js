var Order = require('../models/order');
var request = require('request');
var request = request.defaults({jar: true});
var j = request.jar();
var cookie = request.cookie('JSESSIONID=1cb9yz3acmyud1bygihbl1zwqk');
j.setCookie(cookie, 'http://localhost:8080');

//新建订单
exports.call = function(req, res) {
	var data = req.body;
	var order = new Order({
		callingTel: data.callingTel,
		actualTel: data.actualTel,
		fullName: data.fullName,
		start: data.start,
		end: data.end,
		aroundRoadName: data.aroundRoadName,
		remark: data.remark,
		startLongitude: data.startLongitude,
		destinationLongitude: data.destinationLongitude,
		callType: data.callType,
		reservationTime: data.reservationTime,
		gender: data.gender
	});
	order.save(function(err, order) {
		if (err) {
			res.json(400, {state: 'error'});
		} else {
			res.json({state: 'no'});
		}
	});
};

//简单查询订单
exports.search = function(req, res) {
	var url = 'http://localhost:8080' + req.url;
	request({url: url, jar: j}, function(err, response, body) {
		res.json(JSON.parse(body));
	});
};

exports.searchMore = function(req, res) {
	var url = 'http://localhost:8080' + req.url;
	request({url: url, jar: j}, function(err, response, body) {
		res.json(JSON.parse(body));
	});
};

exports.stepInfo = function(req, res) {
	var url = 'http://localhost:8080' + req.url;
	request({url: url, jar: j}, function(err, response, body) {
		res.json(JSON.parse(body));
	});
};

exports.assign = function(req, res) {
	var url = 'http://localhost:8080' + req.url;
	request({url: url, jar: j}, function(err, response, body) {
		res.json(JSON.parse(body));
	});
};