// (function() {
// 	angular
// 		.module('commonServices', [])
// 		.service('confirmService', function($window) {
// 		this.showPopup = function(message) {
// 			return $window.confirm(message);
// 		}
// 		});
// });

'use strict';

var commonServices = angular.module('commonServices', []);

commonServices.service('confirmService', function($window) {
	this.showPopup = function(message) {
		return $window.confirm(message);
	}
});

// angular.module('commonServices', []).service('confirmService', function($window) {
// 	this.showPopup = function(message) {
// 		return $window.confirm(message);
// 	}
// });