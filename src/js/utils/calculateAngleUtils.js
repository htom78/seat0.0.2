var utils = require('./index');

var calculateAngleUtils = function($filter) {
	return {
		calculateAngle: function(total, count, offsetAngle) {
			offsetAngle = offsetAngle || 0;
			var angle = 180 * (count / total);
			return angle > (180 - offsetAngle) ? (180 - offsetAngle) : angle;
		},
		calculateAngleForData: function(data) {
				var total = 0,
					i;
				for (i in data) {
					total += data[i];
				}
				var result = {};
				for (i in data) {
					result[i] = this.calculateAngle(total, data[i]);
				}
				result.total = total;
				return result;
		}
	};
};

utils.$inject = ['$filter'];

utils.factory('calculateAngleUtils', calculateAngleUtils);
