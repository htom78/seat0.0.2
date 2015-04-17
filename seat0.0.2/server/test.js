var request = require('request');
var request = request.defaults({jar: true});
var j = request.jar();
var url = 'http://localhost:8080/search.htm?all=0&callType=1&k=&page=1&pagesize=6&status=4';
var cookie = request.cookie('JSESSIONID=khm6s07294fx14wbk1i2yqt62');
j.setCookie(cookie, url);

request({url: url, jar: j}, function(err, response, body) {
		console.log(body);
});
/*
request({url: url, jar: j}, function() {

});*/