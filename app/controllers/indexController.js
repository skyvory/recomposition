(function() {
	'use strict';

	angular
		.module('recompositionApp')
		// add toggleMenu function to root scope, enabling this function to be used globally
		.run(function($rootScope, $mdSidenav, $state) {
			$rootScope.toggleMenu = function() {
				$mdSidenav('left').toggle();
			}

			$rootScope.newV=function(){
				$state.go('newVn');
			}
		});
})();