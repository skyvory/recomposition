'use strict';

var characterServices = angular.module('noteServices', ['ngResource']);

characterServices.factory('Note', ['$resource', function($resource) {
	// return $resource('http://localhost/record/vn/:id', {}, {
		// query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	// });
	return $resource('http://localhost/record/public/api/note/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
	});
}]);
