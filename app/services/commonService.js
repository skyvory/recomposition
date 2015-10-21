(function() {
	angular
		.module('commonServices', [])
		.service('confirm', function($window) {
		this.showPopup = function(message) {
			return $window.confirm(message);
		}
		})
})