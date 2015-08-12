var components = require('./index');

function createCanvas() {
	var canvas = document.createElement('canvas');
	return canvas;
}

var defaults = {
	marginBottom: 16,
	outPieRadius: 80,
	innerPieRadius: 20,
	pieRadius: 60,
	outPieColor: '#dfdfdf',
	chartBg: '#e5e5e5',
	offsetAngle: 0,
	navLineWidth: 20,
	navLineHeight: 25
};

/*************/
function Chart(opts) {
	this.options = angular.extend({}, defaults, opts);
	this.canvasEl = createCanvas();
}

Chart.prototype.get = function(elem) {
	var options = this.options;
	options.elem = elem;
	this.height = options.elem.height();
	this.width = options.elem.width();
	this.pivotX = this.width / 2;
	this.pivotY = this.height - options.marginBottom;
	this._initCanvas();
};

Chart.prototype._initCanvas = function() {
	this.canvasEl.width = this.width;
	this.canvasEl.height = this.height;
	this.canvasContext = this.canvasEl.getContext('2d');
	this._addCanvasToDom();
};

Chart.prototype._addCanvasToDom = function() {
	$(this.canvasEl).appendTo(this.options.elem);
};

Chart.prototype._drawPie = function(r, startRadion, endRadion, color, shadowBlur, shadowOffsetY) {
	var context = this.canvasContext;
	context.beginPath();
	context.fillStyle = color;
	context.shadowBlur = shadowBlur || 0;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = shadowOffsetY || 0;
	context.arc(this.pivotX, this.pivotY, r, startRadion, endRadion, false);
	context.lineTo(this.pivotX, this.pivotY);
	context.fill();
};

//最外面的边框半圆
Chart.prototype._drawOutPie = function() {
	var options = this.options;
	this._drawPie(options.outPieRadius, Math.PI, 2 * Math.PI, options.outPieColor, 6, -4);
};

//最里面的半圆(空心元)
Chart.prototype._drawInnerPie = function() {
	var options = this.options;
	this._drawPie(options.innerPieRadius, Math.PI, 2 * Math.PI, options.chartBg);
};

//饼图的主要数据部分
Chart.prototype._drawDataPie = function(data) {
	for (var i = 0, len = data.length; i < len; i ++) {
		this._drawPie(this.options.pieRadius, data[i].startRadion, data[i].endRadion, data[i].pieColor);
	}
};

Chart.prototype._drawLine = function(angle, color, text) {
	var offsetAngle = this.options.offsetAngle,
		options = this.options;

	var context = this.canvasContext;

	if (!isNaN(angle)) {
		angle = angle + offsetAngle;

		var angleX = Math.cos(Math.PI / 180 * angle),
			angleY = Math.sin(Math.PI / 180 * angle),
			lineRadius = options.outPieRadius + 5,
			x = this.pivotX + angleX * lineRadius,
			y = this.pivotY - angleY * lineRadius;

		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = 2;
		context.moveTo(x, y);
		lineRadius = lineRadius + options.navLineHeight;
		x = this.pivotX + angleX * lineRadius;
		y = this.pivotY - angleY * lineRadius;
		context.lineTo(x, y);
		var textX = 0;
		if (angle > 90) {
			x = x - options.navLineWidth;
			textX = x - 4 - context.measureText(text.toString()).width;

		} else {
			x = x + options.navLineWidth;
			textX = x + 4;
		}
		
		context.lineTo(x, y);
		context.stroke();

		context.font = '12pt Calibri';
		context.fillStyle = color;
		context.fillText(text, textX, y + 6);
	}
};

Chart.prototype._drawPieNavLine = function(data) {
	for (var i = 0, len = data.length; i < len; i ++) {
		this._drawLine(data[i].angle, data[i].lineColor, data[i].text);
	}
};

//饼图绘制
Chart.prototype.draw = function(pieData, lineData) {
	this.canvasContext.clearRect(0, 0, this.width, this.height);

	pieData = pieData || [];	
	lineData = lineData || [];
	/******************/
	this._drawOutPie();
	this._drawDataPie(pieData);
	this._drawInnerPie();

	this._drawPieNavLine(lineData);
};

Chart.prototype.drawTotalLine = function(total) {
	total = total || 0;
	var options = this.options,
		context = this.canvasContext;
	var x = this.pivotX - options.outPieRadius,
		y = this.pivotY - options.outPieRadius / 2;

	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = '#8ab14d';
	context.moveTo(x, y);
	x = x - options.navLineWidth;
	context.lineTo(x, y);
	y = y - options.navLineHeight;
	context.lineTo(x, y);
	context.stroke();
	context.font = '12pt Calibri';
	context.fillStyle = '#8ab14d';
	var txt = total.toString();
	context.fillText(txt, x - context.measureText(txt).width / 2, y - 4);
};


var chatComponent = function() {
	return {
		chart: function(opts) {
			return new Chart(opts);
		}
	};

};

chatComponent.$inject = [];


components.factory('chart', chatComponent);
