'use strict';

var vnServices = angular.module('vnServices', ['ngResource']);

vnServices.factory('Vn', ['$resource', function($resource) {
	return $resource('http://localhost/record/vn/:id', {}, {
		query: {method: 'get', params: {id: 'vn_id'}, isArray: true}
	});
}]);

