'use strict';

var recompositionApp = angular.module('recompositionApp', [
	'ui.router',
	'satellizer',
	'ngResource',

	// 'vnController',
	'vnServices',
	'commonServices',
	'ngMaterial',
	'ngMessages',
	'md.data.table',
	'developerServices',
	'angularMoment',
]);

recompositionApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$mdDateLocaleProvider', 'moment', function($stateProvider, $urlRouterProvider, $authProvider, $mdDateLocaleProvider, moment) {
	// satellizer configuration that specifies which api route the jwt should be retrieved from
	$authProvider.loginUrl = 'http://localhost/record/public/api/authenticate';

	// redirect to the auth state if any other states are requested other than users
	$urlRouterProvider.otherwise('/auth');

	$stateProvider
		.state('auth', {
			url: '/auth',
			templateUrl: 'views/authView.html',
			controller: 'AuthController as auth',
		})
		.state('common', {
			templateUrl: 'views/common.html',
			abstract: true,
		})
		.state('users', {
			url: '/users',
			templateUrl: 'views/userView.html',
			controller: 'UserController as user',
			parent: 'common',
		})
		.state('vn', {
			url: '/vn',
			templateUrl: 'views/vnView.html',
			controller: 'VnListController',
			parent: 'common',
		})
			.state('showVn', {
				url: '/vn/:id/view',
				templateUrl: 'views/vnShowView.html',
				controller: 'VnShowController',
				parent: 'common',
			})
			.state('newVn', {
				url: '/vn/new',
				templateUrl: 'views/vnNewView.html',
				controller: 'VnCreateController',
				parent: 'common',
			})
			.state('editVn', {
				url: '/vn/:id/edit',
				templateUrl: 'views/vnEditView.html',
				controller: 'VnEditController',
				parent: 'common',
			})
		.state('developer', {
			url: '/developer',
			templateUrl: 'views/developerView.html',
			controller: 'DeveloperListController',
			parent: 'common',
		})
			.state('newDeveloper', {
				url: '/developer/new',
				templateUrl: 'views/developerNewView.html',
				controller: 'DeveloperCreateController',
				parent: 'common',
			})
			.state('editDeveloper', {
				url: '/developer/:id/edit',
				templateUrl: 'views/developerEditView.html',
				controller: 'DeveloperEditController',
				parent: 'common',
			})
		.state('logout', {
			url: '/logout',
			// templateUrl: 'views/logoutView',
			controller: 'LogoutController',
		});

	$mdDateLocaleProvider.formatDate = function(date) {
		return moment(date).format('YYYY-MM-DD');
	}
}]);

recompositionApp.controller('MainController', function($scope) {
	$scope.image = 'http://localhost/recompose/assets/images/bg.png';
	$scope.bodystyle = {
		background: "url(" + $scope.image + ") 100%"
	};
});

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