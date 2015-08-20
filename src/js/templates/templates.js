angular.module('app.templates', ['component/addressList.html', 'component/assignDialog.html', 'component/calendar.html', 'component/callStatus.html', 'component/handleAlarmDialog.html', 'component/messageBox.html', 'component/pagination.html', 'component/stepInfo.html', 'component/unhandleAlarmDialog.html', 'header.html', 'page/leader.html', 'page/login.html', 'page/police.html', 'page/search.html', 'page/seat.html']);

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
    "				ng-model='carPlate'/>\n" +
    "		</div>\n" +
    "		<div class='btns'>\n" +
    "			<button class='btn ensure' ng-click='assigning()'>确定</button>\n" +
    "			<a href='javascript:;' class='btn btn-normal' ng-click='cancelAssign()'>取消</a>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/calendar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/calendar.html",
    "<div ng-show='isShow'>\n" +
    "	<div class='calendar-header'>\n" +
    "		<i class='fa fa-angle-left' ng-click='previous()'>&lt;</i>\n" +
    "		<span>{{month.format(\"YYYY, MM\")}}月</span>\n" +
    "		<i class='fa fa-angle-right' ng-click='next()'>&gt;</i>\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class='week names'>\n" +
    "		<span class='day'>日</span>\n" +
    "		<span class='day'>一</span>\n" +
    "		<span class='day'>二</span>\n" +
    "		<span class='day'>三</span>\n" +
    "		<span class='day'>四</span>\n" +
    "		<span class='day'>五</span>\n" +
    "		<span class='day'>六</span>\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class='week' ng-repeat='week in weeks'>\n" +
    "		<span\n" +
    "			class='day'\n" +
    "			ng-click='select(day)'\n" +
    "			ng-class='{today: day.isToday, selected: day.date.isSame(selected), \"different-month\": !day.isCurrentMonth}'\n" +
    "			ng-repeat='day in week.days'>{{day.number}}</span>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/callStatus.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/callStatus.html",
    "<section class='call-status'>\n" +
    "	<div class='process-chart'>\n" +
    "	    <div class='hour-process-wrapper'>\n" +
    "	        <div class='process process-hour' style='width:{{lastHourWidth}}px'>\n" +
    "	        	<div class='current' style='width:{{hourWidth}}px'>\n" +
    "	    		<div class='overflow' style='width:{{hourWidth - lastHourWidth}}px' ng-if='isHourOverflow()'></div>\n" +
    "	    	</div>\n" +
    "	        	<div class='info'><span class='text'>{{lastHour}}</span></div>\n" +
    "	        </div>\n" +
    "	        <span class='text-info'>{{showHour}}<b ng-if='isHourOverflow()'> + {{hourOverflow}}</b></span>\n" +
    "	    </div>\n" +
    "	    <div class='day-process-wrapper'>\n" +
    "	        <div class='process process-day' style='width:{{lastDayWidth}}px'>\n" +
    "	    	<div class='current' style='width:{{dayWidth}}px'>\n" +
    "	    		<div class='overflow' style='width:{{dayWidth - lastDayWidth}}px' ng-if='isDayOverflow()'></div>\n" +
    "	    	</div>\n" +
    "	        	<div class='info'><span class='text'>{{lastDay}}</span></div>\n" +
    "	        </div>\n" +
    "	        <span class='text-info'>{{showDay}}<b ng-if='isDayOverflow()'> + {{dayOverflow}}</b></span>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<ul class='flex legend-wrap'>\n" +
    "		<li><i class='legend-dot hour'></i><span>当前小时电召数量</span></li>\n" +
    "		<li><i class='legend-dot day'></i><span>当前天电召数量</span></li>\n" +
    "		<li><i class='legend-dot predict'></i><span>预计数量</span></li>\n" +
    "	</ul>\n" +
    "</section>\n" +
    "");
}]);

angular.module("component/handleAlarmDialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/handleAlarmDialog.html",
    "<div class='dialog-wrap handle'>\n" +
    "	<div class='fl handle-info' ng-show='hasTransferPolice()'>\n" +
    "		<span>转警时间:{{order.timeCreated}}</span>	\n" +
    "		<span>接警员:{{order.opName}}</span>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='fr'>\n" +
    "		<ul class='operate-btns flex'>\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button\n" +
    "				 	class='operate-btn'>播放监听</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button\n" +
    "				 	class='operate-btn'>查看拍照</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button\n" +
    "				 	class='operate-btn'>跟踪回放</button>\n" +
    "			</li>	\n" +
    "		</ul>	\n" +
    "	</div>\n" +
    "	\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/messageBox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/messageBox.html",
    "<div class='box-wrap'>\n" +
    "	<h1 class='box-title'>{{message}}</h1>\n" +
    "	<div class='box-container'>\n" +
    "		<div class='message-input-wrap' ng-show='isInputShow()'>\n" +
    "			<label class='message-label'>{{labelName}}</label>\n" +
    "			<input \n" +
    "				class='text-input'\n" +
    "				type='input'\n" +
    "				ng-model='input'/>\n" +
    "		</div>\n" +
    "		<div class='message-box-btns'>\n" +
    "			<button \n" +
    "				class='message-box-ensure btn'\n" +
    "				ng-click='ensure()'>确认</button>\n" +
    "			<button \n" +
    "				class='message-box-cancel btn'\n" +
    "				ng-click='cancel()'>取消</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/pagination.html",
    "<div class='pagination'>\n" +
    "	<ul>\n" +
    "		<li class='btn-li'>\n" +
    "			<a \n" +
    "				href='javascript:;' \n" +
    "				class='prev pagination-btn'\n" +
    "				ng-class='{disabled: noPrevious()}'\n" +
    "				ng-click='selectPrevious()'><i class='prev-icon'></i></a>\n" +
    "		</li>\n" +
    "		<li class='btn-li page-btns'>\n" +
    "			<a \n" +
    "				href='javascript:;' \n" +
    "				class='page-btn pagination-btn'\n" +
    "				ng-class='{active: isCurrentPage(item)}'\n" +
    "				ng-click='selectPage(item)'\n" +
    "				ng-repeat='item in pages'>{{item}}</a>\n" +
    "		</li>\n" +
    "		<li class='btn-li'>\n" +
    "			<a \n" +
    "				href='javascript:;' \n" +
    "				class='next pagination-btn'\n" +
    "				ng-class='{disabled: noNext()}'\n" +
    "				ng-click='selectNext()'><i class='next-icon'></i></a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/stepInfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/stepInfo.html",
    "<div class='step'>\n" +
    "	<ul class='step-ul flex'>\n" +
    "		<li class='step-li'>\n" +
    "			<p>{{orderInfo.createTime}}</p>\n" +
    "			<p>乘客电话召车</p>\n" +
    "		</li>\n" +
    "		<li class='step-li'>\n" +
    "			<p>司机抢单成功</p>\n" +
    "			<p>{{orderInfo.orderTime}}</p>\n" +
    "		</li>\n" +
    "		<li class='step-li'>\n" +
    "			<p>{{orderInfo.pickupTime}}</p>\n" +
    "			<p>司机接到乘客</p>\n" +
    "		</li>\n" +
    "		<li class='step-li'>\n" +
    "			<p>到达目的</p>\n" +
    "			<p>{{orderInfo.endTime}}</p>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class='btns-wrap'>\n" +
    "	<button \n" +
    "		class='btn'\n" +
    "		confirm-dialog\n" +
    "		box-ctrl='leaderCtrl'\n" +
    "		message-box='指派'\n" +
    "		input-show='true'\n" +
    "		label-name='指派车辆'\n" +
    "		ensure-fn='assignCar(input)'\n" +
    "		ng-show='isAssignBtnShow()'>指派</button>\n" +
    "	<button \n" +
    "		class='btn'\n" +
    "		confirm-dialog\n" +
    "		box-ctrl='leaderCtrl'\n" +
    "		message-box='确认处理?'\n" +
    "		ensure-fn='cancelOrder()'\n" +
    "		ng-show='isCancelBtnShow()'>取消</button>\n" +
    "	<button \n" +
    "		class='btn'\n" +
    "		confirm-dialog\n" +
    "		box-ctrl='leaderCtrl'\n" +
    "		message-box='确认处理?'\n" +
    "		ensure-fn='passengerFuck()'\n" +
    "		ng-show='isPassengerFuckBtnShow()'>乘客放空</button>\n" +
    "	<button \n" +
    "		class='btn'\n" +
    "		confirm-dialog\n" +
    "		box-ctrl='leaderCtrl'\n" +
    "		message-box='确认处理?'\n" +
    "		ensure-fn='driverFuck()'\n" +
    "		ng-show='isDriverFuckBtnShow()'>司机爽约</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("component/unhandleAlarmDialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/unhandleAlarmDialog.html",
    "<div class='dialog-wrap'>\n" +
    "	<div class='fl'>\n" +
    "		<ul class='operate-btns flex'>\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button \n" +
    "					class='operate-btn'\n" +
    "					confirm-dialog\n" +
    "					box-ctrl='policeCtrl'\n" +
    "					message-box='确认监听?'\n" +
    "					ensure-fn='watchCar()'>监听</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button \n" +
    "					class='operate-btn'\n" +
    "					confirm-dialog\n" +
    "					box-ctrl='policeCtrl'\n" +
    "					message-box='确认拍照?'\n" +
    "					ensure-fn='photograph()'>拍照</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li'>\n" +
    "				<button \n" +
    "					class='operate-btn'\n" +
    "					confirm-dialog\n" +
    "					box-ctrl='policeCtrl'\n" +
    "					message-box='确认跟踪?'\n" +
    "					ensure-fn='trackCar()'>跟踪</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li' ng-show='isShowRelieveBtn()'>\n" +
    "				<button \n" +
    "					class='operate-btn'\n" +
    "					confirm-dialog\n" +
    "					box-ctrl='policeCtrl'\n" +
    "					message-box='确认解除?'\n" +
    "					ensure-fn='relieve()'>解除</button>\n" +
    "			</li>	\n" +
    "			<li class='operate-btn-li' ng-show='!hasTransferPolice()'>\n" +
    "				<button \n" +
    "					class='operate-btn transfer-police-btn'\n" +
    "					confirm-dialog\n" +
    "					box-ctrl='policeCtrl'\n" +
    "					message-box='确认转警'\n" +
    "					ensure-fn='transferPolice()'>转警</button>\n" +
    "			</li>	\n" +
    "		</ul>	\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='fl handle-info' ng-show='hasTransferPolice()'>\n" +
    "		<span>转警时间:{{timeTransfered}}</span>	\n" +
    "		<span>接警员:{{operator}}</span>\n" +
    "	</div>\n" +
    "\n" +
    "	\n" +
    "	<div class='fr' ng-show='hasAlarmNode()'>\n" +
    "		<form \n" +
    "			class='handle-form'\n" +
    "			confirm-dialog\n" +
    "			box-ctrl='policeCtrl'\n" +
    "			message-box='确认提交'\n" +
    "			ensure-fn='addAlarmNode()'>\n" +
    "			<ul class='flex'>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='alarmReason'\n" +
    "						class='field-select'\n" +
    "						id='operateDriverMiss'\n" +
    "						ng-model='alarmOperateInfo'\n" +
    "						ng-value='1'/>	\n" +
    "					<label for='operateDriverMiss'>设备误报</label>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='alarmReason'\n" +
    "						class='field-select'\n" +
    "						id='operateTest'\n" +
    "						ng-model='alarmOperateInfo'\n" +
    "						ng-value='2'/>	\n" +
    "					<label for='operateTest'>测试</label>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='alarmReason'\n" +
    "						class='field-select'\n" +
    "						id='operatePractice'\n" +
    "						ng-model='alarmOperateInfo'\n" +
    "						ng-value='3'/>	\n" +
    "					<label for='operatePractice'>实警</label>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='alarmReason'\n" +
    "						class='field-select'\n" +
    "						id='operateFacilityError'\n" +
    "						ng-model='alarmOperateInfo'\n" +
    "						ng-value='4'/>	\n" +
    "					<label for='operateFacilityError'>设备故障</label>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input'\n" +
    "						placeholder='详细说明'\n" +
    "						ng-model='alarmNote'/>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<button class='submit-btn'>确定</button>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='fr after-click-btns'>\n" +
    "		<ul class='flex'>\n" +
    "			<li class='operate-btn-li' ng-show='canPlayVioce()'>\n" +
    "				<button class='operate-btn'>播放监听</button>	\n" +
    "			</li>\n" +
    "			<li class='operate-btn-li' ng-show='canViewPhoto()'>\n" +
    "				<button class='operate-btn'>查看拍照</button>	\n" +
    "			</li>\n" +
    "			<li class='operate-btn-li' ng-show='canPlayTrace()'>\n" +
    "				<button class='operate-btn'>跟踪回放</button>	\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html",
    "<div ng-if='hasHeader()'>\n" +
    "<section class='flex'>\n" +
    "	<nav class='nav'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><a ng-href='index.htm' class='icon-btn file-btn'></a></li>\n" +
    "			<li ng-show='hasLeaderBtn()'>\n" +
    "				<a ng-href='leader.htm' class='icon-btn search-btn'></a>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<a ng-href='searchMore.htm' class='icon-btn police-btn'></a>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<a ng-href='special.htm' class='icon-btn track-btn'></a>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<a ng-href='police.htm' class='icon-btn listen-btn'></a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</nav>\n" +
    "\n" +
    "	<div class='call-operate'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><span class='call-count'>24</span></li>\n" +
    "			<li>\n" +
    "				<button class='icon-btn-bg call-btn'></button>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<button class='icon-btn-bg transform-btn'></button>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<button class='icon-btn-bg list-btn'></button>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='status flex'>\n" +
    "\n" +
    "		<div class='status-icon' ng-class='{signIn: isSignIn()}'>\n" +
    "			<i\n" +
    "				class='current-state'\n" +
    "				ng-class='{\n" +
    "					free: isFreeState(), \n" +
    "					busy: isBusyState(), \n" +
    "					rest: isRestState(), \n" +
    "					signOut:!isSignIn()}'></i>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class='user-info-timer'>\n" +
    "			<div class='username'><i></i><span>{{username}}</span></div>\n" +
    "			<div class='timer'><i></i><span>{{currentTimer}}</span></div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class='status-btns'>\n" +
    "			<button\n" +
    "				class='icon-btn'\n" +
    "				ng-class='{disabled:!firstBtnCanClick(),rest:!isRestState(),calling:isRestState()}'\n" +
    "				ng-click='toggleFirstCallingStateBtn()'></button>\n" +
    "			<button \n" +
    "				class='icon-btn'\n" +
    "				ng-class='{disabled:!secondBtnCanClick(),busy:!isBusyState(),calling:isBusyState()}'\n" +
    "				ng-click='toggleSecondCallingStateBtn()'></button>\n" +
    "		</div>\n" +
    "\n" +
    "		<ul class='flex'>\n" +
    "			<li><a href='javascript:;' \n" +
    "				class='sign-state'\n" +
    "				ng-class='{\"sign-out\": !isSignIn(), \"sign-in\": isSingIn()}' \n" +
    "				ng-click='toggleSignState()'></a></li>\n" +
    "			<li><a href='javascript:;' class='exit-btn icon-btn' ng-click='logout()'></a></li>\n" +
    "		</ul>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "<section class='flex info-bar'>\n" +
    "	<div class='info-left'><span class='scroll-info'>1.一切正常.</span></div>\n" +
    "	<div class='info-right'><span class='scroll-info'>每天一笔，立减3元；司机满3笔奖8元，满6笔再奖8元，满10笔再奖30元，可累计</span></div>\n" +
    "</section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("page/leader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/leader.html",
    "<section class='leader-chart flex'>\n" +
    "	<div class='employ flex'>\n" +
    "		<div class='employ-chart flex'>\n" +
    "			<div chart-employ class='graph' employ-data='employChart'>\n" +
    "			</div>\n" +
    "			<div class='employ-legend-wrap'>\n" +
    "				<ul class='dots-ul'>\n" +
    "					<li	class='dot-li' ng-class='{active: isEmployerActiveTab(\"busy\")}'>\n" +
    "						<a \n" +
    "							class='tab-btn'\n" +
    "							href='javascript:;' \n" +
    "							ng-click='toggleEmplyerTab(\"busy\")'>\n" +
    "							<i class='legend-dot dot-busy'></i>\n" +
    "							<span>示忙</span>\n" +
    "						</a>\n" +
    "					</li>\n" +
    "					<li	class='dot-li' ng-class='{active: isEmployerActiveTab(\"reset\")}'>\n" +
    "						<a \n" +
    "							class='tab-btn'\n" +
    "							href='javascript:;' \n" +
    "							ng-click='toggleEmplyerTab(\"reset\")'>\n" +
    "							<i class='legend-dot dot-rest'></i>\n" +
    "							<span>小休</span>\n" +
    "						</a>\n" +
    "					</li>\n" +
    "					<li	class='dot-li' ng-class='{active: isEmployerActiveTab(\"respond\")}'>\n" +
    "						<a \n" +
    "							class='tab-btn'\n" +
    "							href='javascript:;' \n" +
    "							ng-click='toggleEmplyerTab(\"respond\")'>\n" +
    "							<i class='legend-dot dot-respond'></i>\n" +
    "							<span>应答</span>\n" +
    "						</a>\n" +
    "					<li	class='dot-li' ng-class='{active: isEmployerActiveTab(\"vain\")}'>\n" +
    "						<a \n" +
    "							class='tab-btn'\n" +
    "							href='javascript:;' \n" +
    "							ng-click='toggleEmplyerTab(\"vain\")'>\n" +
    "							<i class='legend-dot dot-free'></i>\n" +
    "							<span>空闲</span>\n" +
    "						</a>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class='employ-info'>\n" +
    "			<ul class='employ-info-ul flex'>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "				<li class='item'>\n" +
    "					<div><i class='icon-img user-icon'></i><span>0000</span></div>\n" +
    "					<div><i class='icon-img timer-icon'></i><span>12:21</span></div>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='car'>\n" +
    "		<div>\n" +
    "			<ul class='flex'>\n" +
    "				<li><i class='legend-dot stop-legend'></i><span>未登录车/停运</span></li>\n" +
    "				<li><i class='legend-dot empty-legend'></i><span>空车</span></li>\n" +
    "				<li><i class='legend-dot heavy-legend'></i><span>重车</span></li>\n" +
    "				<li><i class='legend-dot task-legend'></i><span>任务车</span></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "		<div class='graph' chart-car car-data='carChart'></div>\n" +
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
    "					<div class='input-wrap'></div>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='search-input' \n" +
    "						ng-required='true'\n" +
    "						ng-model='words'/>\n" +
    "					<div><button class='icon-btn-bg search-btn'></button></div>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<a \n" +
    "				href='javascript:;' \n" +
    "				class='immediate-reservation-btn' \n" +
    "				ng-click='toggleImmediateOrReservation()'>\n" +
    "				<span class='btn-word'>{{immediateOrReservation}}</span>\n" +
    "			</a>\n" +
    "			<ul class='flex'>\n" +
    "				<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-class='{active: isCurrentOrderTab(\"prepared\")}'\n" +
    "					ng-click='cutOrderTabPrepared()'>\n" +
    "						<i class='icon-img-bg prepared-icon'></i>\n" +
    "						<b>{{preparedOrderTabCount[0]}}</b>\n" +
    "						<b>{{preparedOrderTabCount[1]}}</b>\n" +
    "						<b>{{preparedOrderTabCount[2]}}</b>\n" +
    "				</a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentOrderTab(\"received\")}'\n" +
    "						ng-click='cutOrderTabReceived()'>\n" +
    "							<i class='icon-img-bg received-icon'></i>\n" +
    "							<b>{{receivedOrderTabCount[0]}}</b>\n" +
    "							<b>{{receivedOrderTabCount[1]}}</b>\n" +
    "							<b>{{receivedOrderTabCount[2]}}</b>\n" +
    "						</a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentOrderTab(\"started\")}'\n" +
    "						ng-click='cutOrderTabStarted()'>\n" +
    "							<i class='icon-img-bg started-icon'></i>\n" +
    "							<b>{{startedOrderTabCount[0]}}</b>\n" +
    "							<b>{{startedOrderTabCount[1]}}</b>\n" +
    "							<b>{{startedOrderTabCount[2]}}</b>\n" +
    "					</a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentOrderTab(\"done\")}'\n" +
    "						ng-click='cutOrderTabDone()'>\n" +
    "							<i class='icon-img-bg done-icon'></i>\n" +
    "							<b>{{doneOrderTabCount[0]}}</b>\n" +
    "							<b>{{doneOrderTabCount[1]}}</b>\n" +
    "							<b>{{doneOrderTabCount[2]}}</b>\n" +
    "						</a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentOrderTab(\"exception\")}'\n" +
    "						ng-click='cutOrderTabException()'>\n" +
    "						<i class='icon-img-bg exception-icon'></i>\n" +
    "						<b>{{exceptionOrderTabCount[0]}}</b>\n" +
    "						<b>{{exceptionOrderTabCount[1]}}</b>\n" +
    "						<b>{{exceptionOrderTabCount[2]}}</b>\n" +
    "					</a>\n" +
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
    "						leader-order-info='item'\n" +
    "						ng-class='{active: item.isActive}'>\n" +
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
    "			<div class='leader-map' leader-map></div>	\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='orderItemCount > 10'>\n" +
    "			<pagination \n" +
    "				num-items='orderItemCount' \n" +
    "				current-page='orderCurrentPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("page/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/login.html",
    "<div class='login-page'>\n" +
    "	<div class='login-box'>\n" +
    "		<div class='login-form-wrapper'>\n" +
    "			<form class='login-form' ng-submit='login()'>\n" +
    "				<div class='input-wrapper'>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='login-input username-input'\n" +
    "						placeholder='工号'\n" +
    "						ng-required='true'\n" +
    "						ng-model='username'/>\n" +
    "				</div>\n" +
    "				<div class='input-wrapper'>\n" +
    "					<input \n" +
    "						type='password'\n" +
    "						class='login-input password-input'\n" +
    "						placeholder='密码'\n" +
    "						ng-required='true'\n" +
    "						ng-model='password'/>\n" +
    "				</div>\n" +
    "				<div class='some-error'><span>{{errorInfo}}</span></div>\n" +
    "				<div class='btn-wrapper'>\n" +
    "					<button class='login-btn'>登录</button>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "		<div class='shadow'></div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("page/police.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/police.html",
    "<section class='list-page police-page'>\n" +
    "	<div class='tabs'>\n" +
    "		<ul class='flex'>\n" +
    "			<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='normal-tab'\n" +
    "					ng-click='toggleTab(\"callPolice\")'>报警记录查询</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='search'>\n" +
    "		<form ng-submit='searchOrder()'>\n" +
    "			<div class='simple'>\n" +
    "				<input \n" +
    "					type='text' \n" +
    "					class='search-input-text'\n" +
    "					ng-model='keywords'/><button class='search-btn btn'>搜索</button>\n" +
    "				<a href='javascript:;' class='more-link' ng-click='selectMore()'>更多筛选条件</a>\n" +
    "			</div>\n" +
    "			<div class='more' ng-show='isShowMore'>\n" +
    "				<div>\n" +
    "					<span class='field-wraper'>\n" +
    "						<label>接线员:</label>\n" +
    "						<input type='text' class='input-text'/>\n" +
    "					</span>\n" +
    "					<span class='field-wraper'>\n" +
    "						<label>状态</label>\n" +
    "						<select class='select-normal'><option>请选择</option></select>\n" +
    "					</span>\n" +
    "					<span  class='field-wraper'>\n" +
    "						<label>订单时间:</label>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-text'\n" +
    "							ng-model='search.beginTime'/>\n" +
    "						<b>-</b>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-text'\n" +
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
    "				class='btn' \n" +
    "				ng-click='cutAllOrderTab()'\n" +
    "				ng-class='{active: isAllOrderTab()}'>全部({{getAllOrderTotal()}})</button>\n" +
    "			<button \n" +
    "				class='btn' \n" +
    "				ng-click='cutUnhandleOrderTab()'\n" +
    "				ng-class='{active: isUnhandleOrderTab()}'>未处理({{getUnhandleOrderTotal()}})</button>\n" +
    "			<button \n" +
    "				class='btn' \n" +
    "				ng-click='cutHandleOrderTab()'\n" +
    "				ng-class='{active: isHandleOrderTab()}'>已处理({{getHandleOrderTotal()}})</button>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='orders'>\n" +
    "		<div class='table-wrapper'>\n" +
    "			<table class='table'>\n" +
    "				<thead>\n" +
    "					<tr>\n" +
    "						<th>报警类型</th>\n" +
    "						<th>报警时间</th>\n" +
    "						<th>报警车辆</th>\n" +
    "						<th>状态</th>\n" +
    "						<th>司机姓名</th>\n" +
    "						<th>司机电话</th>\n" +
    "						<th>终端电话</th>\n" +
    "						<th>终端编号</th>\n" +
    "						<th>结案备注</th>\n" +
    "						<th>分公司</th>\n" +
    "						<th>车辆位置</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr \n" +
    "						ng-repeat='item in orders'\n" +
    "						handle-alarm-order='item'\n" +
    "						operator='{{item.opName}}'\n" +
    "						time-transfered='{{item.timeTransfered}}'\n" +
    "						ng-class='{active: item.isActive, selfSelected: item.hasSelfSelected(), otherSelected: item.hasOtherSelected()}'>\n" +
    "						<td class='first-field'>\n" +
    "							<i ng-class='{unhandle: (item.status === 1)}'></i>\n" +
    "							<span>{{item.rTypeLabel}}</span>\n" +
    "						</td>\n" +
    "						<td>{{item.timeCreated}}</td>\n" +
    "						<td>{{item.vehicleNumber}}</td>\n" +
    "						<td>{{item.oemStatus}}</td>\n" +
    "						<td>{{item.driverName}}</td>\n" +
    "						<td>{{item.driverMobile}}</td>\n" +
    "						<td>{{item.terminalMobile}}</td>\n" +
    "						<td>{{item.terminalCode}}</td>\n" +
    "						<td class='ellipsis'>{{item.note}}</td>\n" +
    "						<td class='ellipsis'>{{item.corpName}}</td>\n" +
    "						<td class='ellipsis'>{{item.poi}}</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='currentOrderTotal > 10'>\n" +
    "			<pagination \n" +
    "				num-items='currentOrderTotal' \n" +
    "				current-page='currentOrderPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("page/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/search.html",
    "<section class='search-page list-page'>\n" +
    "	<div class='tabs'>\n" +
    "		<ul class='flex'>\n" +
    "			<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='normal-tab'\n" +
    "					ng-click='toggleTab(\"prepared\")'>订单记录查询</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='search'>\n" +
    "		<form ng-submit='searchOrder()'>\n" +
    "			<div class='simple'>\n" +
    "				<input \n" +
    "					type='text' \n" +
    "					class='search-input-text'\n" +
    "					ng-model='words'/><button class='search-btn btn'>搜索</button>\n" +
    "				<a href='javascript:;' class='more-link' ng-click='filterMoreOrderSearchBtn()'>更多筛选条件</a>\n" +
    "			</div>\n" +
    "			<div class='more' ng-show='isShowMore'>\n" +
    "				<div>\n" +
    "					<span class='field-wraper'>\n" +
    "						<label>接线员:</label>\n" +
    "						<input type='text' class='text-input'/>\n" +
    "					</span>\n" +
    "					<span class='field-wraper'>\n" +
    "						<lable>状态</label>\n" +
    "						<select class='select'><option>请选择</option></select>\n" +
    "					</span>\n" +
    "					<span  class='field-wraper'>\n" +
    "						<label>订单时间:</label>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='text-input'\n" +
    "							ng-model='searchOrderBeginTime'/>\n" +
    "						<b>-</b>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='text-input'\n" +
    "							ng-model='searchOrderEndTime'/>\n" +
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
    "				class='btn' \n" +
    "				ng-click='cutAllOrderTab()'\n" +
    "				ng-class='{active:isCurrentTab(\"all\")}'>全部({{allOrderCount()}})</button>\n" +
    "			<button \n" +
    "				class='btn' \n" +
    "				ng-click='cutImmediateOrderTab()'\n" +
    "				ng-class='{active:isCurrentTab(\"immediate\")}'>即时({{immediateOrderCount()}})</button>\n" +
    "			<button \n" +
    "				class='btn' \n" +
    "				ng-click='cutReservationOrderTab()'\n" +
    "				ng-class='{active:isCurrentTab(\"reservation\")}'>预约({{reservationOrderCount()}})</button>\n" +
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
    "						<td>{{item.uType}}</td>\n" +
    "						<td class='ellipsis' title='{{item.statusName}}'>{{item.statusName}}</td>\n" +
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
    "		<div class='paging' ng-show='orderItemCount > 10'>\n" +
    "			<pagination \n" +
    "				num-items='orderItemCount' \n" +
    "				current-page='currentOrderPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("page/seat.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/seat.html",
    "<section class='seat-above flex'>\n" +
    "\n" +
    "	<div class='seat-top-left' listen-call>\n" +
    "		<div class='chart'>\n" +
    "			<div class='user-info'>\n" +
    "				<div class='justify'>\n" +
    "					<span  class='info-item'><i class='icon-img custom-type'></i>{{userData.rank}}</span>\n" +
    "					<span class='info-item'><i class='icon-img timer'></i>{{userData.timeCreated}}</span>\n" +
    "				</div>\n" +
    "				<div class='justify'>\n" +
    "					<span class='info-item' ng-click='queryOrderBySn()'><i class='icon-img serial-number'></i>{{userData.sn}}</span>\n" +
    "					<span class='info-item'>\n" +
    "						<span><b class='legend-dot dot-order-count'></b>订单次数</span>\n" +
    "						<span><b class='legend-dot dot-fuck-count'></b>放空次数</span>\n" +
    "					</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class='graph' chart-user order-fuck='userData.fkTotal' order-total='userData.total'>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<form class='seat-top-form' name='newOrder' ng-submit='addOrderFromForm()'>\n" +
    "			<ul class='seat-field1'>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg calling-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input' \n" +
    "						disabled='disabled'\n" +
    "						ng-model='orderData.callingTel'/>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg actual-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input' \n" +
    "						maxlength='11'\n" +
    "						ng-required='true'\n" +
    "						ng-model='orderData.actualTel'\n" +
    "						ng-pattern='/1\\d{10}/'/>\n" +
    "					<span class='mobile-position'>{{mobilePosition}}</span>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg username-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input'\n" +
    "						maxlength='30'\n" +
    "						ng-required='true'\n" +
    "						ng-model='orderData.fullName'\n" +
    "						placeholder='用户姓名'/>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='femaleRadio'\n" +
    "						ng-model='orderData.gender'\n" +
    "						value='1'/>\n" +
    "					<label class='female' for='femaleRadio'></label>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='maleRadio'\n" +
    "						ng-model='orderData.gender'\n" +
    "						value='2'/>\n" +
    "					<label class='male' for='maleRadio'></label>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg start-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input long-width'\n" +
    "						id='startInput'\n" +
    "						maxlength='50'\n" +
    "						ng-required='true'\n" +
    "						ng-model='orderData.start'\n" +
    "						placeholder='出发位置'\n" +
    "						words-place='orderData.start'\n" +
    "						start-list='orderData.poiList'/>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg around-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input long-width'\n" +
    "						maxlength='50'\n" +
    "						ng-model='orderData.aroundRoadName'\n" +
    "						placeholder='周围道路名称'/>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul>\n" +
    "				<li class='field-li'>\n" +
    "					<input\n" +
    "						type='checkbox'\n" +
    "						id='carTypeSelect'\n" +
    "						class='checkbox-in-label'\n" +
    "						ng-model='orderData.isCarType' />\n" +
    "					<label class='icon-img-bg cartype-label' for='carTypeSelect'></label>\n" +
    "					<span class='cartype-selects'>\n" +
    "						<select class='select car-select' ng-disabled='!orderData.isCarType'>\n" +
    "							<option>汽车类型</option>\n" +
    "						</select>\n" +
    "						<select class='select price-select' ng-disabled='!orderData.isCarType'>\n" +
    "							<option>价格</option>\n" +
    "						</select>\n" +
    "						<select class='select count-select' ng-disabled='!orderData.isCarType'>\n" +
    "							<option>车数</option>\n" +
    "						</select>\n" +
    "					</span>\n" +
    "					<label class='icon-img-bg destination-label'></label>\n" +
    "					<input \n" +
    "						list='orderDestination' \n" +
    "						class='text-input long-width'\n" +
    "						ng-model='orderData.end'\n" +
    "						ng-required='true'\n" +
    "						placeholder='目的地'/>\n" +
    "					<datalist id='orderDestination'>\n" +
    "						<option  ng-repeat='item in orderData.targetpoiList' value='{{item}}'>\n" +
    "					</datalist>\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<input \n" +
    "						type='checkbox' \n" +
    "						id='reservationSelect' \n" +
    "						class='checkbox-in-label'\n" +
    "						ng-model='orderData.isReservation'/>\n" +
    "					<label class='icon-img-bg reservation-label' for='reservationSelect'></label>\n" +
    "\n" +
    "					<span class='date-pickup-wrap'>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='text-input input-calendar'  \n" +
    "							ng-disabled='!orderData.isReservation'\n" +
    "							ng-model='orderData.reservationCalendar'/>\n" +
    "							<div calendar selected='orderData.reservationCalendar' class='calendar'></div>\n" +
    "\n" +
    "							<span \n" +
    "								class='time-select' \n" +
    "								ng-class='{disabled: !orderData.isReservation}'>\n" +
    "							<em \n" +
    "								class='hour' \n" +
    "								time-select='24'\n" +
    "								selected='orderData.hour'\n" +
    "								reservation='orderData.isReservation'\n" +
    "								>{{orderData.hour}}</em><i class='colon'>:</i><em \n" +
    "								class='minute' \n" +
    "								time-select='60'\n" +
    "								number-mod='5'\n" +
    "								reservation='orderData.isReservation'\n" +
    "								selected='orderData.minute'>{{orderData.minute}}</em>\n" +
    "							</span>\n" +
    "						</span>\n" +
    "\n" +
    "					<label class='icon-img-bg count-label'></label>\n" +
    "					<input \n" +
    "						type='text'\n" +
    "						class='text-input long-width'\n" +
    "						ng-model='orderData.count'\n" +
    "						placeholder='叫车数'/>\n" +
    "\n" +
    "				</li>\n" +
    "				<li class='field-li'>\n" +
    "					<label class='icon-img-bg remark-label'></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='text-input large-width'\n" +
    "						ng-model='orderData.remark'\n" +
    "						placeholder='附加信息'/>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<div class='btns text-center'>\n" +
    "				<button class='btn' ng-class='{clickable: newOrder.$valid, sending: sendingOrderData}'>保存</button>\n" +
    "				<a href='javascript:;' class='btn' ng-click='clearOrderForm()'>取消</a>\n" +
    "				<a href='javascript:;' class='btn'>转咨询投诉</a>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class='seat-top-right'>\n" +
    "		<nav class='nav'>\n" +
    "			<ul class='flex'>\n" +
    "				<li class='operate-btn-wrap'>\n" +
    "					<a href='javascript:;' class='icon-btn zoom'></a>\n" +
    "				</li>\n" +
    "				<li class='operate-btn-wrap'>\n" +
    "					<a href='javascript:;' class='icon-btn zoom'></a>\n" +
    "				</li>\n" +
    "				<li class='operate-btn-wrap'>\n" +
    "					<a href='javascript:;' class='icon-btn zoom'></a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "		<div class='map' seat-map-view>\n" +
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
    "				<li class='car-icon heavy-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon task-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul class='flex legend-wrap'>\n" +
    "				<li><i class='legend-dot stop'></i><span>未登录车/停运</span></li>\n" +
    "				<li><i class='legend-dot empty'></i><span>空车</span></li>\n" +
    "				<li><i class='legend-dot heavy'></i><span>重车</span></li>\n" +
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
    "				<button class='btn toggle-btn' ng-click='toggleImmediateOrReservation()'>{{immediateOrReservation}}</button>\n" +
    "			</div>\n" +
    "			<ul class='flex fl tabs'>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: !isCurrentTab(\"exception\")}'\n" +
    "						ng-click='cutOrderTabPrepared()'>\n" +
    "							<i class='icon-img-bg normal'></i>\n" +
    "							<em>({{normalOrderCount()}})</em>\n" +
    "						</a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='cutOrderTabException()'>\n" +
    "						<i class='icon-img-bg error'></i>\n" +
    "						<em>({{exceptionOrderCount()}})</em>\n" +
    "					</a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<div class='fr'>\n" +
    "				<form ng-submit='searchCurrentOrderByKeywords()'>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='search-input'\n" +
    "						ng-required='true'\n" +
    "						ng-model='inputOrderWords'\n" +
    "						pause-emit='pause'/><button class='btn search-btn'><i class='icon-img'></i></button>\n" +
    "					<select class='search-select'>\n" +
    "						<option>个人</option>\n" +
    "					</select>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<div class='fr'>\n" +
    "				<span class='tick-timer'>{{averageTimer()}}秒</span>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "		<section class='order-content flex'>\n" +
    "			<div class='order-nav-var' ng-show='!isCurrentTab(\"exception\")'>\n" +
    "				<h1 class='title'>状态</h1>\n" +
    "				<nav class='order-nav'>\n" +
    "					<ul>\n" +
    "						<li class='order-nav-li'>\n" +
    "							<a \n" +
    "								href='javascript:;' \n" +
    "								class='nav-btn'\n" +
    "								ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "								ng-click='cutOrderTabPrepared()'>调派中</a>\n" +
    "						</li>\n" +
    "						<li class='order-nav-li'>\n" +
    "							<a \n" +
    "								href='javascript:;' \n" +
    "								class='nav-btn'\n" +
    "								ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "								ng-click='cutOrderTabReceived()'>已接单</a>\n" +
    "						</li>\n" +
    "						<li class='order-nav-li'>\n" +
    "							<a \n" +
    "								href='javascript:;' \n" +
    "								class='nav-btn'\n" +
    "								ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "								ng-click='cutOrderTabStarted()'>已出发</a>\n" +
    "						</li>\n" +
    "						<li class='order-nav-li'>\n" +
    "							<a \n" +
    "								href='javascript:;' \n" +
    "								class='nav-btn'\n" +
    "								ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "								ng-click='cutOrderTabDone()'>已完成</a>\n" +
    "						</li>\n" +
    "					</ul>\n" +
    "				</nav>\n" +
    "			</div>\n" +
    "			<div class='order-table'>\n" +
    "				<table class='table'>\n" +
    "					<thead>\n" +
    "						<tr>\n" +
    "							<th>订单编号</th>\n" +
    "							<th>用车时间</th>\n" +
    "							<th>乘客</th>\n" +
    "							<th>乘客号码</th>\n" +
    "							<th>车牌号</th>\n" +
    "							<th>乘客地址</th>\n" +
    "							<th>目的地</th>\n" +
    "							<th ng-if='isCurrentTab(\"exception\")'>状态</th>\n" +
    "							<th ng-if='!isDoneCurrentTab()'>操作</th>\n" +
    "						</tr>\n" +
    "					</thead>\n" +
    "					<tbody>\n" +
    "						<tr \n" +
    "							ng-repeat='item in orders' \n" +
    "							ng-if='$index < 6' \n" +
    "							ng-class='{\"add-new\": item.isNewAdd, active: item.isBtnShow}'>\n" +
    "							<td class='ellipsis'>{{item.sn}}</td>\n" +
    "							<td class='ellipsis'>{{item.timeCreated}}</td>\n" +
    "							<td class='ellipsis'>{{item.user}}</td>\n" +
    "							<td class='ellipsis'>{{item.contactPhone}}</td>\n" +
    "							<td class='ellipsis'>{{item.vehicleNumber}}</td>\n" +
    "							<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "							<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "							<td ng-if='isCurrentTab(\"exception\")'>{{item.statusName}}</td>\n" +
    "							<td class='seat-operate-td' ng-if='!isDoneCurrentTab()'>\n" +
    "								<div class='seat-order-operate'>\n" +
    "									<a \n" +
    "										href='javascript:;' \n" +
    "										class='show-more'\n" +
    "										ng-click='showBtns(item)'>&gt;&gt;</a>\n" +
    "									<ul class='operate-list' ng-show='item.isBtnShow'>\n" +
    "										<li	\n" +
    "											class='operate-list-li'\n" +
    "											ng-show='isCancelBtnShow()'>\n" +
    "											<a \n" +
    "												href='javascript:;' \n" +
    "												confirm-dialog\n" +
    "												box-ctrl='seatCtrl'\n" +
    "												message-box='确认处理?'\n" +
    "												ensure-fn='handleCancelOrder(item)'\n" +
    "												class='operate-btn'>取消</a>\n" +
    "										</li>\n" +
    "										<li	\n" +
    "											class='operate-list-li'\n" +
    "											ng-show='isAssignBtnShow()'>\n" +
    "											<a \n" +
    "												confirm-dialog\n" +
    "												box-ctrl='seatCtrl'\n" +
    "												message-box='指派'\n" +
    "												input-show='true'\n" +
    "												label-name='指派车辆'\n" +
    "												ensure-fn='assignCar(item, input)'\n" +
    "												href='javascript:;' \n" +
    "												class='operate-btn'>指派</a>\n" +
    "										</li>\n" +
    "										<li	\n" +
    "											class='operate-list-li'\n" +
    "											ng-show='isPassengerFuckBtnShow()'>\n" +
    "											<a \n" +
    "												confirm-dialog\n" +
    "												box-ctrl='seatCtrl'\n" +
    "												message-box='确认处理?'\n" +
    "												ensure-fn='handlePassengerFuckOrder(item)'\n" +
    "												href='javascript:;' \n" +
    "												class='operate-btn'>乘客放空</a>\n" +
    "										</li>\n" +
    "										<li	\n" +
    "											class='operate-list-li'\n" +
    "											ng-show='isDriverFuckBtnShow()'>\n" +
    "											<a \n" +
    "												confirm-dialog\n" +
    "												box-ctrl='seatCtrl'\n" +
    "												message-box='确认处理?'\n" +
    "												ensure-fn='handleDriverFuckOrder(item)'\n" +
    "												href='javascript:;' \n" +
    "												class='operate-btn'>司机爽约</a>\n" +
    "										</li>\n" +
    "									</ul>\n" +
    "								</div>\n" +
    "							</td>\n" +
    "						</tr>\n" +
    "					</tbody>\n" +
    "				</table>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "");
}]);
