'use strict';

var recompositionApp = angular.module('recompositionApp', [
	'ui.router',
	'satellizer',
	'ngResource',

	// 'vnController',
	'vnServices'
]);

recompositionApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
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
			controller: 'VnListController'
		})
		.state('showVn', {
			url: '/vn/:id/view',
			templateUrl: 'views/vnView.html',
			controller: 'VnShowController'
		})
		// .state('newVn', {
		// 	url: '/vn/new',
		// 	templateUrl: 'views/vnNewView.html',
		// 	controller: 'VnNewController'
		// })
		// .state('editVn', {
		// 	url: '/vn/:id/edit',
		// 	templateUrl: 'views/vnEditView.html',
		// 	controller: 'VnEditController'
		// })
		.state('logout', {
			url: '/logout',
			// templateUrl: 'views/logoutView',
			controller: 'LogoutController'
		});
}]);


// (function() {
// 	angular.module('recompositionApp', ['ui.router', 'satellizer', 'ngResource', 'vnServices']);
// })();

// (function() {
// 	'use strict';

// 	angular
// 		.module('recompositionApp')
// 		.config(function($stateProvider, $urlRouterProvider, $authProvider) {

// 			// satellizer configuration that specifies which api route the jwt should be retrieved from
// 			$authProvider.loginUrl = 'http://localhost/record/public/api/authenticate';

// 			// redirect to the auth state if any other states are requested other than users
// 			$urlRouterProvider.otherwise('/auth');

// 			$stateProvider
// 				.state('auth', {
// 					url: '/auth',
// 					templateUrl: 'views/authView.html',
// 					controller: 'AuthController as auth'
// 				})
// 				.state('users', {
// 					url: '/users',
// 					templateUrl: 'views/userView.html',
// 					controller: 'UserController as user'
// 				})
// 				.state('vn', {
// 					url: '/vn',
// 					templateUrl: 'views/vnView.html',
// 					controller: 'VnController'
// 				})
// 				.state('logout', {
// 					url: '/logout',
// 					// templateUrl: 'views/logoutView',
// 					controller: 'LogoutController'
// 				});
// 		});
// })();