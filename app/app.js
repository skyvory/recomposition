(function() {
	angular.module('recompositionApp', ['ui.router', 'satellizer']);
})();

(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.config(function($stateProvider, $urlRouterProvider, $authProvider) {

			// satellizer configuration that specifies which api route the jwt should be retrieved from
			$authProvider.loginUrl = 'http://localhost/record/public/api/authenticate';

			// redirect to the auth state if any other states are requested other than users
			$urlRouterProvider.otherwise('/auth');

			$stateProvider
				.state('auth', {
					url: '/auth',
					templateUrl: 'views/authView.html',
					controller: 'AuthController as auth'
				})
				.state('users', {
					url: '/users',
					templateUrl: 'views/userView.html',
					controller: 'UserController as user'
				})
				.state('vn', {
					url: '/vn',
					templateUrl: 'views/vnView.html',
					controller: 'VnController as vn'
				})
				.state('logout', {
					url: '/logout',
					// templateUrl: 'views/logoutView',
					controller: 'LogoutController'
				});
		});
})();