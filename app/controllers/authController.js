(function() {
	'use strict';

	angular
		.module('authApp')
		.controller('AuthController', AuthController);

	function AuthController($auth, $state) {
		var vm = this;

		vm.login = function() {

			var credentials = {
				username: vm.email,
				password: vm.password
			}

			// use satellizer's $auth service to login
			$auth.login(credentials).then(function(data) {

				// if login is successful, redirect to the user state
				$state.go('vn', {});
			});
		}

		// check if user is already authenticated
		if($auth.isAuthenticated()) {
			$state.go('vn', {});
		}

	}
})();