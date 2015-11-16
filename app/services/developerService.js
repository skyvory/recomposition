'use strict';

var developerServices = angular.module('developerServices', ['ngResource']);

developerServices.factory('Developer', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/developer/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
		get: {
			isArray: true,
		},
	});
}]);
