'use strict';

var characterServices = angular.module('lineamentServices', ['ngResource']);

characterServices.factory('Lineament', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/lineament/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
	});
}]);
