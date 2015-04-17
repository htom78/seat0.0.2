var mongodb = require('./db');

module.exports = Order;

function Order(order) {
	this.callingTel = order.callingTel;
	this.actualTel = order.actualTel;
	this.fullName = order.fullName;
	this.start = order.start;
	this.end = order.end;
	this.aroundRoadName = order.aroundRoadName;
	this.remark = order.remark;
	this.startLongitude = order.startLongitude;
	this.destinationLongitude = order.destinationLongitude;
	this.callType = order.callType;
	this.reservationTime = order.reservationTime;
	this.gender = order.gender;
};

Order.prototype.save = function(callback) {
	var order = {
		callingTel: this.callingTel,
		actualTel: this.actualTel,
		fullName: this.fullName,
		start: this.start,
		end: this.end,
		aroundRoadName: this.aroundRoadName,
		remark: this.remark,
		startLongitude: this.startLongitude,
		destinationLongitude: this.destinationLongitude,
		callType: this.callType,
		reservationTime: this.reservationTime,
		gender: this.gender
	}

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('orders', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.insert(order, {safe: true}, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, result[0]);
			});
		});
	});
};


Order.get = function(name, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('orders', function(err, collection) {
			if (err) {
				mongodb.close;
				return callback(err);
			}
			collection.findOne({fullName: name}, function(err, order) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, order);
			});
		});
	});
};