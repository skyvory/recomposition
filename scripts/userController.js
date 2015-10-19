(function() {

	'use strict';

	angular
		.module('authApp')
		.controller('UserController', UserController);

	function UserController($http) {

		var vm = this;

		vm.users;
		vm.error;

		vm.getUsers = function() {

			// this request will hit the index method in the AuthenticateController on the Laravel side and will return the list of user
			$http.get('http://localhost/record/public/api/vn').success(function(users) {
				vm.users = users;
			}).error(function(error) {
				vm.error = error;
			});
		}
	}
})();