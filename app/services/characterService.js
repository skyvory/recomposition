'use strict';

var characterServices = angular.module('characterServices', ['ngResource']);

characterServices.factory('Character', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/character/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
		get: {
			// isArray: true,
		},
	});
}]);
