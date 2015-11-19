(function() {
	'use strict';

	angular
		.module('recompositionApp')
		// add toggleMenu function to root scope, enabling this function to be used globally
		.run(function($rootScope, $mdSidenav, $state) {
			$rootScope.toggleMenu = function() {
				$mdSidenav('left').toggle();
			}

			$rootScope.ariaVn = function(){
				$state.go('vn');
			}
			$rootScope.ariaDeveloper = function() {
				$state.go('developer');
			}
			$rootScope.ariaCharacter = function() {
				$state.go('character');
			}
			$rootScope.ariaAssessment = function() {
				$state.go('assessment');
			}
		});
})();