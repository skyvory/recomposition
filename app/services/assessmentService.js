'use strict';

var assessmentServices = angular.module('assessmentServices', ['ngResource']);

assessmentServices.factory('Assessment', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/assessment/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
		get: {
			// isArray: true,
		},
	});
}]);
