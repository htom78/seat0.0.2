angular.module('app.templates', ['component/addressList.html', 'component/assignDialog.html', 'component/callStatus.html', 'component/pagination.html', 'component/stepInfo.html', 'header.html', 'page/leader.html', 'page/login.html', 'page/search.html', 'page/seat.html']);

angular.module("component/addressList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/addressList.html",
    "<ul>\n" +
    "	<li ng-repeat='item in addresses'>\n" +
    "		<a \n" +
    "			href='javascript:;' \n" +
    "			class='link ellipsis' \n" +
    "			ng-class='{active: isActive($index)}'\n" +
    "			ng-click='onSelectAddress(item)'>{{item.name}}</a>\n" +
    "		</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("component/assignDialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/assignDialog.html",
    "<h1 class='title'>指派车辆</h1>\n" +
    "<div class='content'>\n" +
    "	<form>\n" +
    "		<div>\n" +
    "			<input \n" +
    "				type='text' \n" +
    "				class='input-normal' \n" +
    "				placeholder='请输入车牌号码'\n" +
    "				ng-model='assign.carNumber'/>\n" +
    "		</div>\n" +
    "		<div class='btns'>\n" +
    "			<button class='btn ensure' ng-click='assigning()'>确定</button>\n" +
    "			<a href='javascript:;' class='btn btn-normal' ng-click='cancelAssign()'>取消</a>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>");
}]);

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

angular.module("component/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/pagination.html",
    "<div class='pagination'>\n" +
    "	<ul>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='prev'\n" +
    "				ng-class='{disabled: noPrevious()}'\n" +
    "				ng-click='selectPrevious()'><i></i></a></li>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='page'\n" +
    "				ng-class='{active: isCurrentPage(item)}'\n" +
    "				ng-click='selectPage(item)'\n" +
    "				ng-repeat='item in pages'>{{item}}</a></li>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='next'\n" +
    "				ng-class='{disabled: noNext()}'\n" +
    "				ng-click='selectNext()'><i></i></a></li>\n" +
    "	</ul>\n" +
    "</div>");
}]);

angular.module("component/stepInfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/stepInfo.html",
    "<div class='step'>\n" +
    "	<ul class='flex'>\n" +
    "		<li>\n" +
    "			<p>{{step.createTime}}</p>\n" +
    "			<p>乘客电话召车</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>司机抢单成功</p>\n" +
    "			<p>{{step.orderTime}}</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>{{step.pickupTime}}</p>\n" +
    "			<p>司机接到乘客</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>到达目的</p>\n" +
    "			<p>{{step.endTime}}</p>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class='btns'>\n" +
    "	<button ng-click='showAssign()' ng-show='isAssignShow()'>指派</button>\n" +
    "	<button ng-click='cancelOrder()' ng-show='isCancelShow()'>取消</button>\n" +
    "	<button ng-click='passengerFuck()' ng-show='isPassengerFuckShow()'>乘客放空</button>\n" +
    "	<button ng-click='driverFuck()' ng-show='isDriverFuckShow()'>司机爽约</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html",
    "<section class='flex'>\n" +
    "	<nav class='nav'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><a href='/' class='btn-icon-large file-btn'></a></li>\n" +
    "			<li><a href='/leader.htm' class='btn-icon-large file-search'></a></li>\n" +
    "			<li><a href='/searchMore.htm' class='btn-icon-large file-search'></a></li>\n" +
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
    "	<div class='info-left'><span>1.一切正常.</span></div>\n" +
    "	<div class='info-right'><span>每天一笔，立减3元；司机满3笔奖8元，满6笔再奖8元，满10笔再奖30元，可累计</span></div>\n" +
    "</section>");
}]);

angular.module("page/leader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/leader.html",
    "<section class='leader-chart flex'>\n" +
    "	<div class='employ flex'>\n" +
    "		<div class='employ-chart'>\n" +
    "			<div chart-employ class='graph' employ-data='employChart'>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class='employ-info'>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='car'>\n" +
    "		<div>\n" +
    "			<ul class='flex'>\n" +
    "				<li><i></i><span>未登录车/停运</span></li>\n" +
    "				<li><i></i><span>空车</span></li>\n" +
    "				<li><i></i><span>重车</span></li>\n" +
    "				<li><i></i><span>任务车</span></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "		<div class='graph' chart-car car-data='carChart'>\n" +
    "		</div>\n" +
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
    "				<form class='flex' ng-submit='searchOrder()'>\n" +
    "					<div class='input-wrap'><input \n" +
    "												type='text' \n" +
    "												class='search-input' \n" +
    "												ng-required='true'\n" +
    "												ng-model='words'/></div>\n" +
    "					<div><button class='btn-normal search-btn'><i></i></button></div>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<ul class='flex'>\n" +
    "				<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "					ng-click='toggleTab(\"prepared\")'><i class='prepared-icon'></i><span><b>{{tabsCount.prepared[0]}}</b><b>{{tabsCount.prepared[1]}}</b><b>{{tabsCount.prepared[2]}}</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "						ng-click='toggleTab(\"received\")'><i class='received-icon'></i><span><b>{{tabsCount.received[0]}}</b><b>{{tabsCount.received[1]}}</b><b>{{tabsCount.received[2]}}</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "						ng-click='toggleTab(\"started\")'><i class='started-icon'></i><span><b>{{tabsCount.started[0]}}</b><b>{{tabsCount.started[1]}}</b><b>{{tabsCount.started[2]}}</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "						ng-click='toggleTab(\"done\")'><i class='done-icon'></i><span><b>{{tabsCount.done[0]}}</b><b>{{tabsCount.done[1]}}</b><b>{{tabsCount.done[2]}}</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i class='exception-icon'></i><span><b>{{tabsCount.exception[0]}}</b><b>{{tabsCount.exception[1]}}</b><b>{{tabsCount.exception[2]}}</b></span></a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "	</div>\n" +
    "	<div class='orders flex'>\n" +
    "		<div class='table-wrapper'>\n" +
    "			<table class='table'>\n" +
    "				<colgroup>\n" +
    "					<col class='col1'>\n" +
    "					<col class='col2'>\n" +
    "					<col class='col3'>\n" +
    "					<col class='col4'>\n" +
    "					<col class='col5'>\n" +
    "					<col class='col6'>\n" +
    "					<col class='col7'>\n" +
    "					<col class='col8'>\n" +
    "					<col class='col9'>\n" +
    "					<col class='col10'>\n" +
    "				</colgroup>\n" +
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
    "						<th>类型</th>\n" +
    "						<th>状态</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr \n" +
    "						ng-repeat='item in orders' \n" +
    "						order-step='item' \n" +
    "						show-info='showInfo(sn, pos)'\n" +
    "						map-show='mapShow'\n" +
    "						ng-class='{active: isCurrentItem(item)}'>\n" +
    "						<td>{{$index + 1}}</td>\n" +
    "						<td class='ellipsis' title='{{item.sn}}'>{{item.sn}}</td>\n" +
    "						<td class='ellipsis'>{{item.timeCreated | cmdate: 'MM/dd HH:mm'}}</td>\n" +
    "						<td class='ellipsis' title='{{item.user}}'>{{item.user}}</td>\n" +
    "						<td class='ellipsis' title='{{item.contactPhone}}'>{{item.contactPhone}}</td>\n" +
    "						<td class='ellipsis' title='{{item.vehicleNumber}}'>{{item.vehicleNumber}}</td>\n" +
    "						<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "						<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "						<td class='ellipsis'>{{item.uType}}</td>\n" +
    "						<td class='ellipsis' title='{{item.statusName}}'>{{item.statusName}}</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "		<div class='map-wrapper' ng-show='mapShow'>\n" +
    "			<a \n" +
    "				href='javascript:;' \n" +
    "				class='btn-bg-icon map-close-btn'\n" +
    "				ng-click='closeMapView()'>X</a>\n" +
    "			<div class='leader-map' leader-map></div>	\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='numItems > 10'>\n" +
    "			<pagination \n" +
    "				num-items='numItems' \n" +
    "				current-page='search.currentPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("page/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/login.html",
    "<h1 class='login-header'>平台登录页</h1>\n" +
    "<div class='login-page'>\n" +
    "	<div class='login-form-wrapper'>\n" +
    "		<form class='login-form' ng-submit='login()'>\n" +
    "			<div class='input-wrapper'>\n" +
    "				<input \n" +
    "					type='text' \n" +
    "					class='login-input input-normal'\n" +
    "					placeholder='工号'\n" +
    "					ng-required='true'\n" +
    "					ng-model='loginForm.username'/>\n" +
    "			</div>\n" +
    "			<div class='input-wrapper'>\n" +
    "				<input \n" +
    "					type='password'\n" +
    "					class='login-input input-normal'\n" +
    "					placeholder='密码'\n" +
    "					ng-required='true'\n" +
    "					ng-model='loginForm.password'/>\n" +
    "			</div>\n" +
    "			<div class='login-error' ng-if='hasError'><span>{{errorInfo}}</span></div>\n" +
    "			<div class='btn-wrapper'>\n" +
    "				<button class='login-btn'>登录</button>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class='bottom-license'>\n" +
    "	<small>浙江信电技术股份有限公司All Right Reserved     浙ICP备 07026991-2号  Copyright© 1999-2020</small>\n" +
    "</div>");
}]);

angular.module("page/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/search.html",
    "<section class='search-page'>\n" +
    "	<div class='tabs'>\n" +
    "		<ul class='flex'>\n" +
    "			<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-click='toggleTab(\"prepared\")'><i class='prepared-icon'>订单记录查询</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='search'>\n" +
    "		<form ng-submit='searchOrder()'>\n" +
    "			<div class='simple'>\n" +
    "				<input \n" +
    "					type='text' \n" +
    "					class='input-text'\n" +
    "					ng-model='words'/><button class='search-btn btn-normal'>搜索</button>\n" +
    "				<a href='javascript:;' class='more-link' ng-click='selectMore()'>更多筛选条件</a>\n" +
    "			</div>\n" +
    "			<div class='more' ng-show='isShowMore'>\n" +
    "				<div>\n" +
    "					<span class='field-wraper'>\n" +
    "						<label>接线员:</label>\n" +
    "						<input type='text' class='input-normal'/>\n" +
    "					</span>\n" +
    "					<span class='field-wraper'>\n" +
    "						<lable>状态</label>\n" +
    "						<select class='select-normal'><option>请选择</option></select>\n" +
    "					</span>\n" +
    "					<span  class='field-wraper'>\n" +
    "						<label>订单时间:</label>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-normal'\n" +
    "							ng-model='search.beginTime'/>\n" +
    "						<b>-</b>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-normal'\n" +
    "							ng-model='search.endTime'/>\n" +
    "					</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class='more-btn-wrap'>\n" +
    "					<button class='more-btn'>搜索</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "		<div class='toggle-btns'>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(0)'\n" +
    "				ng-class='{active:isCurrentTab(0)}'>全部({{tabCount.total}})</button>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(1)'\n" +
    "				ng-class='{active:isCurrentTab(1)}'>即时({{tabCount.immediate}})</button>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(2)'\n" +
    "				ng-class='{active:isCurrentTab(2)}'>预约({{tabCount.prepared}})</button>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
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
    "						<th>类型</th>\n" +
    "						<th>订单状态</th>\n" +
    "						<th>接线员</th>\n" +
    "						<th>作业员</th>\n" +
    "						<th>订单形式</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr ng-repeat='item in orders'>\n" +
    "						<td>{{$index + 1}}</td>\n" +
    "						<td>{{item.sn}}</td>\n" +
    "						<td>{{item.timeCreated | cmdate: 'MM/dd HH:mm'}}</td>\n" +
    "						<td>{{item.user}}</td>\n" +
    "						<td>{{item.contactPhone}}</td>\n" +
    "						<td>{{item.vehicleNumber}}</td>\n" +
    "						<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "						<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "						<td>普通</td>\n" +
    "						<td>{{item.statusName}}</td>\n" +
    "						<td>2562</td>\n" +
    "						<td>{{item.opName}}</td>\n" +
    "						<td ng-switch='item.isReserved'>\n" +
    "							<span ng-switch-when='0'>即时</span>\n" +
    "							<span ng-switch-when='1'>预约</span>\n" +
    "						</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='numItems > 10'>\n" +
    "			<pagination \n" +
    "				num-items='numItems' \n" +
    "				current-page='search.currentPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("page/seat.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/seat.html",
    "<section class='seat-above flex'>\n" +
    "\n" +
    "	<div class='seat-top-left' listen-call>\n" +
    "		<div class='chart'>\n" +
    "			<div class='info'>\n" +
    "				<div class='justify'>\n" +
    "					<span  class='info-item'><i class='custom-type'></i>{{user.rank}}</span>\n" +
    "					<span class='info-item'><i class='timer'></i>{{user.timeCreated}}</span>\n" +
    "				</div>\n" +
    "				<div class='justify'>\n" +
    "					<span class='info-item'><i class='serial'></i>{{user.orderNumber}}</span>\n" +
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
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal' \n" +
    "						disabled='disabled'\n" +
    "						ng-model='order.callingTel'/>\n" +
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
    "						ng-model='order.actualTel'\n" +
    "						ng-pattern='/1\\d{10}/'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label username-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.fullName'\n" +
    "						placeholder='用户姓名'/>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='femaleRadio'\n" +
    "						ng-model='order.gender'\n" +
    "						value='1'/>\n" +
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
    "						id='startInput'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.start'\n" +
    "						placeholder='出发位置'\n" +
    "						words-place='order.start'\n" +
    "						start-list='order.startList'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label around-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.aroundRoadName'\n" +
    "						placeholder='周围道路名称'/>\n" +
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
    "						list='orderDestination' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.end'\n" +
    "						ng-required='true'\n" +
    "						placeholder='目的地'/>\n" +
    "					<datalist id='orderDestination'>\n" +
    "						<option  ng-repeat='item in order.destinationList' value='{{item}}'>\n" +
    "					</datalist>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<input \n" +
    "						type='checkbox' \n" +
    "						id='prepareSelect' \n" +
    "						class='prepare-checkbox'\n" +
    "						ng-model='preparalbe'/>\n" +
    "					<label class='icon-label prepare-label' for='prepareSelect'><i></i></label>\n" +
    "					<input type='text' class='input-normal input-calendar'  ng-disabled='!preparalbe'/>\n" +
    "					<select class='select-normal timer-select' ng-disabled='!preparalbe'>\n" +
    "						<option>10</option>\n" +
    "					</select>\n" +
    "					<select class='select-normal timer-select' ng-disabled='!preparalbe'>\n" +
    "						<option>36</option>\n" +
    "					</select>\n" +
    "					<label class='icon-label count-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text'\n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='callCarCount'\n" +
    "						placeholder='叫车数'/>\n" +
    "\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label remark-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal large-width'\n" +
    "						ng-model='order.remark'\n" +
    "						placeholder='附加信息'/>\n" +
    "				</il>\n" +
    "			</ul>\n" +
    "			<div class='btns text-center'>\n" +
    "				<button class='btn-normal' ng-class='{clickable: newOrder.$valid}'>保存</button>\n" +
    "				<a href='javascript:;' class='btn-normal' ng-click='cancelOrder()'>取消</a>\n" +
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
    "						ng-click='toggleTab(\"prepared\")'><i class='normal'></i>({{normalTotal}})</a></li>\n" +
    "				<li><a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i class='error'></i>({{errorTotal}})</a></li>\n" +
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
    "							<td class='ellipsis'>{{item.sn}}</td>\n" +
    "							<td class='ellipsis'>{{item.timeCreated | cmdate: 'MM/dd HH:mm'}}</td>\n" +
    "							<td class='ellipsis'>{{item.user}}</td>\n" +
    "							<td class='ellipsis'>{{item.contactPhone}}</td>\n" +
    "							<td class='ellipsis'>{{item.vehicleNumber}}</td>\n" +
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
