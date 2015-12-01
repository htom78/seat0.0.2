'use strict';
import angular from 'angular';

class Chat{
	constructor(elem, opts, calculateAngleUtils) {
		if (!elem) {
			throw new Error('chart elem is not exist!');	
		}

		this.calculateAngleUtils = calculateAngleUtils;

		this.options = {
			marginBottom: 16,
			outPieRadius: 80,
			innerPieRadius: 20,
			pieRadius: 60,
			outPieColor: '#dfdfdf',
			chartBg: '#e5e5e5',
			offsetAngle: 0,
			navLineWidth: 20,
			navLineHeight: 25,
			colors: ['#ff7c3c', '#e6c707', '#97c255', '#649626'],
		};	
		this.options = angular.extend({}, this.options, opts);
		this.options.appendTo = elem;
		this.init();
		this.createCanvas();
	}

	init() {
		var options = this.options;	
		var elem = options.appendTo;
		options.height = elem.height();
		options.width = elem.width();
		options.pivotX = options.width / 2;
		options.pivotY = options.height - options.marginBottom;
	}

	createCanvas() {
		var options = this.options;
		var canvas = this.canvasElem = document.createElement('canvas');
		canvas.width = options.width;
		canvas.height = options.height;
		this.canvasContext = canvas.getContext('2d');
		options.appendTo.append($(canvas));
	}

	clear() {
		var options = this.options;
		this.canvasContext.clearRect(0, 0, options.width, options.height);
	}

	drawPie(r, startRadion, endRadion, color, shadowBlur, shadowOffsetY) {
		var context = this.canvasContext;
		var options = this.options;
		context.beginPath();
		context.fillStyle = color;
		context.shadowBlur = shadowBlur || 0;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = shadowOffsetY || 0;
		context.arc(options.pivotX, options.pivotY, r, startRadion, endRadion, false);
		context.lineTo(options.pivotX, options.pivotY);
		context.fill();
	}

	drawLine(angle, color, text) {
		var options = this.options;
		var offsetAngle = options.offsetAngle;
		var context = this.canvasContext;

		if (!isNaN(angle)) {
			angle = angle + offsetAngle;

			var angleX = Math.cos(Math.PI / 180 * angle),
				angleY = Math.sin(Math.PI / 180 * angle),
				lineRadius = options.outPieRadius + 5,
				x = options.pivotX + angleX * lineRadius,
				y = options.pivotY + angleY * lineRadius;
	
			context.beginPath();
			context.strokeStyle = color;
			context.lineWidth = 2;
			context.moveTo(x, y);
			lineRadius = lineRadius + options.navLineHeight;
			x = options.pivotX + angleX * lineRadius;
			y = options.pivotY + angleY * lineRadius;

			context.lineTo(x, y);
			var textX = 0;
			if (-angle > 90) {
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
	}

	drawOutPie() {
		var options = this.options;
		this.drawPie(options.outPieRadius, Math.PI, 2 * Math.PI, options.outPieColor, 6, -4);
	}

	drawInnerPie() {
		var options = this.options;
		this.drawPie(options.innerPieRadius, Math.PI, 2 * Math.PI, options.chartBg);
	}

	drawDataPie(data) {
		var options = this.options;
		var result = this.calculateAngleUtils.calculateAngleForData(data);
		var radian = Math.PI / 180;
		var startAngle = 0;
		var endAngle = 0;
		var a = 0;
		for (let i in result) {
			if (i !== 'total') {
				startAngle = -result[i] + startAngle;
				this.drawPie(options.pieRadius, startAngle * radian, endAngle * radian, options.colors[a]);
				if (options.hasLine) {
					this.drawLine((-result[i] / 2 + endAngle),  options.colors[a], a);
				}
				endAngle = startAngle;
				a++;
			}	
		}
	}

	draw(data) {
		this.clear();	
		this.drawOutPie();
		this.drawDataPie(data);
	}
}

function iChart(calculateAngleUtils) {
	return {
		instance(elem, opts) {
			return new Chat(elem, opts, calculateAngleUtils);	
		}	
	};
}

export default {
	name: 'iChart',
	fn: iChart
};
