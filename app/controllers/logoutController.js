(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('LogoutController', LogoutController);

	function LogoutController($auth, $state) {
		// if user is authenticated (token exist in local storage), then do logout
		if($auth.isAuthenticated()) {
			var token = $auth.getToken();
			console.log('deleted token: ', token);
			$auth.logout()
				// if logout success, redirect to login state
				.then(function() {
					$state.go('auth', {});
				});
		}

	}
})();