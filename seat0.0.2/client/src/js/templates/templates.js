angular.module('app.templates', ['component/callStatus.html', 'header.html', 'page/leader.html', 'page/seat.html']);

angular.module("component/callStatus.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/callStatus.html",
    "<section class='call-status'>\n" +
    "	<div class='process process-hour'>\n" +
    "		<div class='current' style='width:{{hourRate}}%'><span>{{hour}}</span></div>\n" +
    "		<div class='info'><span>{{lastHour}}</span></div>\n" +
    "	</div>\n" +
    "	<div class='process process-day'>\n" +
    "		<div class='current' style='width:{{dayRate}}%'><span>{{day}}</span></div>\n" +
    "		<div class='info'><span>{{lastDay}}</span></div>\n" +
    "	</div>\n" +
    "	<ul class='flex legend'>\n" +
    "		<li><i class='legend-dot hour'></i><span>当前小时电召数量</span></li>\n" +
    "		<li><i class='legend-dot day'></i><span>当前天电召数量</span></li>\n" +
    "		<li><i class='legend-dot predict'></i><span>预计数量</span></li>\n" +
    "	</ul>\n" +
    "</section>");
}]);

angular.module("header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html",
    "<section class='flex'>\n" +
    "	<nav class='nav'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><a href='/' class='btn-icon-large file-btn'></a></li>\n" +
    "			<li><a href='/leader.htm' class='btn-icon-large file-search'></a></li>\n" +
    "		</ul>\n" +
    "	</nav>\n" +
    "\n" +
    "	<div class='call-operate'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><span class='call-count'>24</span></li>\n" +
    "			<li><button class='btn-bg-icon call-btn'></button></li>\n" +
    "			<li><button class='btn-bg-icon transform-btn'></button></li>\n" +
    "			<li><button class='btn-bg-icon list-btn'></button></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='status'>\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "<section class='flex info-bar'>\n" +
    "	<div class='info-left'><span>11111</span></div>\n" +
    "	<div class='info-right'><span>22222</span></div>\n" +
    "</section>");
}]);

angular.module("page/leader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/leader.html",
    "<section class='leader-chart flex'>\n" +
    "	<div class='employ'>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='car'>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='call'>\n" +
    "		<div call-status></div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "\n" +
    "<section class='leader-orders'>\n" +
    "	<div class='nav-bar'>\n" +
    "		<nav class='tabs'>\n" +
    "			<div class='fr search-wrap'>\n" +
    "				<form class='flex'>\n" +
    "					<div class='input-wrap'><input type='text' class='search-input'/></div>\n" +
    "					<div><button class='btn-normal search-btn'><i></i></button></div>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<ul class='flex'>\n" +
    "				<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "					ng-click='toggleTab(\"prepared\")'><i class='prepared-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "						ng-click='toggleTab(\"received\")'><i class='received-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "						ng-click='toggleTab(\"started\")'><i class='started-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "						ng-click='toggleTab(\"done\")'><i class='done-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i class='exception-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "	</div>\n" +
    "	<div class='orders'>\n" +
    "		<div class='table-wrapper'>\n" +
    "			<table class='table'>\n" +
    "				<thead>\n" +
    "					<tr>\n" +
    "						<th>NO</th>\n" +
    "						<th>订单编号</th>\n" +
    "						<th>用车时间</th>\n" +
    "						<th>乘客</th>\n" +
    "						<th>乘客号码</th>\n" +
    "						<th>车牌号</th>\n" +
    "						<th>乘客地址</th>\n" +
    "						<th>目的地</th>\n" +
    "						<th>状态</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "						<td>11</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("page/seat.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/seat.html",
    "<section class='seat-above flex'>\n" +
    "\n" +
    "	<div class='seat-top-left'>\n" +
    "		<div class='chart'>\n" +
    "			<div class='info'>\n" +
    "				<div class='justify'>\n" +
    "					<span  class='info-item'><i class='custom-type'></i>普通客户</span>\n" +
    "					<span class='info-item'><i class='timer'></i>2014-12-12 12:12</span>\n" +
    "				</div>\n" +
    "				<div class='justify'>\n" +
    "					<span class='info-item'><i class='serial'></i>111111</span>\n" +
    "					<span class='info-item'>\n" +
    "						<span><b class='legend-dot dot-order-count'></b>订单次数</span>\n" +
    "						<span><b class='legend-dot dot-fuck-count'></b>放空次数</span>\n" +
    "					</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class='graph' chart-user order-fuck='user.orderFuck' order-total='user.orderTotal'>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<form class='seat-top-form' name='newOrder' ng-submit='addOrder()'>\n" +
    "			<ul class='seat-field1'>\n" +
    "				<li>\n" +
    "					<label class='icon-label calling-label'><i></i></label>\n" +
    "					<input type='text' class='input-normal' disabled='disabled'/>\n" +
    "					<input type='checkbox' class='checkbox' id='autoCall'/>\n" +
    "					<label class='label-checkbox' for='autoCall'></label>\n" +
    "					<label class='auto-call-label' for='autoCall'>自动回拨</label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label actual-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal' \n" +
    "						ng-required='true'\n" +
    "						ng-model='order.actualTel'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label username-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.fullName'\n" +
    "						placeholder='请输入用户姓名'/>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='femaleRadio'\n" +
    "						ng-model='order.gender'\n" +
    "						value='1'\n" +
    "						ng-init='order.gender=1'/>\n" +
    "					<label class='label-radio female' for='femaleRadio'></label>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='maleRadio'\n" +
    "						ng-model='order.gender'\n" +
    "						value='2'/>\n" +
    "					<label class='label-radio male' for='maleRadio'></label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label start-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.start'\n" +
    "						placeholder='请输入出发位置'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label around-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.aroundRoadName'\n" +
    "						placeholder='请输入周围道路名称'/>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul>\n" +
    "				<li>\n" +
    "					<label class='icon-label cartype-label'><i></i></label>\n" +
    "					<span class='cartype-selects'>\n" +
    "						<select class='select-normal car-select'>\n" +
    "							<option>汽车类型</option>\n" +
    "						</select>\n" +
    "						<select class='select-normal price-select'>\n" +
    "							<option>价格</option>\n" +
    "						</select>\n" +
    "						<select class='select-normal count-select'>\n" +
    "							<option>车数</option>\n" +
    "						</select>\n" +
    "					</span>\n" +
    "					<label class='icon-label destination-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.end'\n" +
    "						placeholder='请输入目的地'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<input type='checkbox' id='prepareSelect' class='prepare-checkbox'/>\n" +
    "					<label class='icon-label prepare-label' for='prepareSelect'><i></i></label>\n" +
    "					<input type='text' class='input-normal input-calendar'/>\n" +
    "					<select class='select-normal timer-select'>\n" +
    "						<option>10</option>\n" +
    "					</select>\n" +
    "					<select class='select-normal timer-select'>\n" +
    "						<option>36</option>\n" +
    "					</select>\n" +
    "					<input type='checkbox' class='checkbox' id='autoDate'/>\n" +
    "					<label class='label-checkbox' for='autoDate'></label>\n" +
    "					<label class='auto-checked-label' for='autoDate'>自动</label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label remark-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal large-width'\n" +
    "						ng-model='order.remark'\n" +
    "						placeholder='请输入附加信息'/>\n" +
    "				</il>\n" +
    "			</ul>\n" +
    "			<div class='btns text-center'>\n" +
    "				<button class='btn-normal'>保存</button>\n" +
    "				<a href='javascript:;' class='btn-normal'>取消</a>\n" +
    "				<a href='javascript:;' class='btn-normal'>转咨询投诉</a>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class='seat-top-right'>\n" +
    "		<nav class='nav'>\n" +
    "			<ul class='flex'>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "		<div class='map' map-view>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class='seat-blow flex'>\n" +
    "	<div class='seat-bottom-left'>\n" +
    "		<section class='car-status'>\n" +
    "			<ul class='flex'>\n" +
    "				<li class='car-icon stop-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon empty-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon big-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon task-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul class='flex legend'>\n" +
    "				<li><i class='legend-dot stop'></i><span>未登录车/停运</span></li>\n" +
    "				<li><i class='legend-dot empty'></i><span>空车</span></li>\n" +
    "				<li><i class='legend-dot big'></i><span>重车</span></li>\n" +
    "				<li><i class='legend-dot task'></i><span>任务车</span></li>\n" +
    "			</ul>\n" +
    "		</section>\n" +
    "\n" +
    "		<div call-status></div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='seat-bottom-right'>\n" +
    "		<section class='search-bar'>\n" +
    "			<div class='fl'>\n" +
    "				<button class='btn-normal toggle-btn'>即时</button>\n" +
    "			</div>\n" +
    "			<ul class='flex fl tabs'>\n" +
    "				<li><a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: !isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"prepared\")'><i></i>({{normalTotal}})</a></li>\n" +
    "				<li><a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i></i>({{errorTotal}})</a></li>\n" +
    "			</ul>\n" +
    "			<div class='fr'>\n" +
    "				<form ng-submit='search()'>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='search-input'\n" +
    "						ng-required='true'\n" +
    "						ng-model='words'/><button class='btn-normal search-btn'><i></i></button>\n" +
    "					<select class='search-select'>\n" +
    "						<option>个人</option>\n" +
    "					</select>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<div class='fr'>\n" +
    "				<span class='tick-timer'>300秒</span>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "		<section class='order-content flex'>\n" +
    "			<div class='order-nav-var' ng-show='!isCurrentTab(\"exception\")'>\n" +
    "				<h1 class='title'>状态</h1>\n" +
    "				<nav>\n" +
    "					<ul>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "								ng-click='toggleTab(\"prepared\")'>调派中</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "								ng-click='toggleTab(\"received\")'>已接单</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "								ng-click='toggleTab(\"started\")'>已出发</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "								ng-click='toggleTab(\"done\")'>已完成</a></li>\n" +
    "					</ul>\n" +
    "				</nav>\n" +
    "			</div>\n" +
    "			<div class='order-table'>\n" +
    "				<table class='table'>\n" +
    "					<thead>\n" +
    "						<tr>\n" +
    "							<th>NO</th>\n" +
    "							<th>订单编号</th>\n" +
    "							<th>用车时间</th>\n" +
    "							<th>乘客</th>\n" +
    "							<th>乘客号码</th>\n" +
    "							<th>车牌号</th>\n" +
    "							<th>乘客地址</th>\n" +
    "							<th>目的地</th>\n" +
    "							<th ng-if='isCurrentTab(\"exception\")'>状态</th>\n" +
    "						</tr>\n" +
    "					</thead>\n" +
    "					<tbody>\n" +
    "						<tr ng-repeat='item in orders' ng-if='$index < 6'>\n" +
    "							<td>{{$index + 1}}</td>\n" +
    "							<td>{{item.sn}}</td>\n" +
    "							<td>{{item.timeCreated}}</td>\n" +
    "							<td>{{item.user}}</td>\n" +
    "							<td>{{item.contactPhone}}</td>\n" +
    "							<td>{{item.vehicleNumber}}</td>\n" +
    "							<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "							<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "							<td ng-if='isCurrentTab(\"exception\")'>{{item.statusName}}</td>\n" +
    "						</tr>\n" +
    "					</tbody>\n" +
    "				</table>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "\n" +
    "</section>");
}]);
