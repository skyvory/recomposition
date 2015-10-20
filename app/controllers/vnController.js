(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnListController', ['$auth', '$scope', 'Vn', function($auth, $scope, Vn) {
			$scope.vn = Vn.get();
			// console.log($scope.vn);

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}
		}])
		.controller('VnShowController', ['$auth', '$scope', '$stateParams', 'Vn', function($auth, $scope, $stateParams, Vn) {
			$scope.vn = Vn.query({ id: $stateParams.id});
		}]);
	
})();


// angular.module('vnController',[]).controller('VnListController',function($scope,$state,Vn){
// 	$scope.vn = Vn.get();
// 	console.log($scope.vn);
// });