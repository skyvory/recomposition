'use strict';

var vnServices = angular.module('vnServices', ['ngResource']);

vnServices.factory('Vn', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/vn/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		}
	});
}]);

vnServices.factory('toastService', ['$mdToast', function($mdToast) {
	var toast_content = [];
	function toast() {
		$mdToast.show(
			$mdToast.simple()
				.content(toast_content[0])
				.position('bottom left')
				.hideDelay(600)
				.theme("success-toast")
		).then(function() {
			toast_content.splice(0, 1);
			if(toast_content.length) {
				toast();
			}
		});
	}
	var toastMethod = {
		show: function(text_content) {
			toast_content = text_content;
			$mdToast.show(
				$mdToast.simple()
					.content(text_content)
					.position('bottom left')
					.hideDelay(0)
					.theme("success-toast")
			);
		},
		hide: function() {
			$mdToast.hide();
		},
		updateContent: function(text_content) {
			$mdToast.updateTextContent(text_content);
		},
		pop: function(text_content) {
			if(toast_content.length) {
				toast_content.push(text_content);
			}
			else {
				toast_content.push(text_content);
				toast();
			}
		},
	}
	return toastMethod;
}]);