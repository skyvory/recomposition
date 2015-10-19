(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnController', VnController);

	function VnController($http, $auth, $scope) {
		var vm = this;

		vm.res;
		vm.error;

		vm.getVn = function() {
			$http.get('http://localhost/record/public/api/vn').success(function(response) {
				vm.res = response;
			}).error(function(error) {
				vm.error = error;
			});
		}

		// define authentication status to scope
		$scope.isAuthenticated = function() {
			return $auth.isAuthenticated();
		}

	}
})();