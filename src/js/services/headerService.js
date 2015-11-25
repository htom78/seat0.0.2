'use strict';

export default class Header {

	constructor($http) {
		this.$http = $http;	
	}

	getNotifyInfo() {
		return this.$http.get('notice/view.htm')
			.then((response) => {
				return response.data.msg;	
			});
	}

	publishMessage(content) {
		return this.$http.post('notice/save.htm', {content} );
	}
}

