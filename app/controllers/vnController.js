(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnListController', ['$auth', '$scope', 'Vn', 'confirmService', '$window', '$state', '$mdSidenav', function($auth, $scope, Vn, confirmService, $window, $state, $mdSidenav) {
			$scope.vn = Vn.get();

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}

			$scope.deleteVn = function(v) {
				if(confirmService.showPopup('Sure?')) {
					console.log($scope.vn);
					Vn.delete({ id: v.id }, function() {
						$window.location.href = '';
					});
				}
			}

		}])
		.controller('VnShowController', ['$auth', '$scope', '$stateParams', 'Vn', function($auth, $scope, $stateParams, Vn) {
			$scope.vn = Vn.get({ id: $stateParams.id});

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}
		}])
		.controller('VnCreateController', ['$scope', '$state', 'Vn', function($scope, $state, Vn) {
			$scope.vn = new Vn();

			$scope.createVn = function() {
				$scope.vn.$save(function() {
					$state.go('vn');
				});
			}
		}])
		.controller('VnEditController', ['$scope', '$state', '$stateParams', 'Vn', function($scope, $state, $stateParams, Vn) {
			$scope.updateVn = function() {
				$scope.vn.$update(function() {
					$state.go('vn');
				});
			}

			// $scope.loadVn = function() {
				$scope.vn = Vn.get({ id: $stateParams.id });
			// }
			// $scope.loadVn();
		}]);
	
})();


// angular.module('vnController',[]).controller('VnListController',function($scope,$state,Vn){
// 	$scope.vn = Vn.get();
// 	console.log($scope.vn);
// });