(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('DeveloperListController', ['$auth', '$scope', 'Developer', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Developer, $state, $mdSidenav, $q, $timeout, $mdDialog) {

			$scope.developers = Developer.get();

			$scope.deleteDeveloper = function(ev) {
				var confirm = $mdDialog.confirm()
					.title('Are you convinced to delete this cord?')
					// material.angularjs.org example states using textContent instead of content, which doesn't work (version problem?)
					.content('there\'s no archive capability implemented yet, your erasure shall bring you calamity in lapse of necessity')
					.ariaLabel('might not be your lucky day')
					.targetEvent(ev)
					.ok('kill')
					.cancel('flee');
				$mdDialog.show(confirm).then(function() {
					console.log($scope.selected);
					var suc = 0;
					for(var i = 0; i < $scope.selected.length; i++) {
						Developer.delete({ id: $scope.selected[i].id }, function() {
							suc++;
							if(suc == $scope.selected.length) {
								// refresh current state
								$state.go($state.current, {}, {reload: true});
							}
						});
					}
				}, function() {
					console.log('hetare!');
				});
			}

			$scope.selected = [];
			$scope.query = {
				filter: '',
				order: 'name_en',
				limit: 1,
				page: 1
			};
			function success(devs) {
				$scope.developers = devs;
				console.log(devs);
			}
			$scope.search = function(pre) {
				return Developer.get($scope.query)
			}
			$scope.onpagechange = function(page, limit) {

				return Developer.get({page:page}, success).$promise;
			}
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 1000);
				return deferred.promise;
			}

			$scope.newDeveloper = function(ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'views/developerNewView.html',
					parent: angular.element(document.body),
					tergetEvent: ev,
					clickOutsideToClose: true
				})
				.then(function(answer) {
					var new_dev = new Developer();
					new_dev.name_en = answer.name_en;
					new_dev.name_jp = answer.name_jp;
					new_dev.$save(function() {
						$state.go($state.current, {}, {reload:true});
					});
				}, function() {
					// dialog cancelled
				});
			}

		}])
		.controller('DeveloperShowController', ['$auth', '$scope', '$stateParams', 'Vn', function($auth, $scope, $stateParams, Vn) {
			$scope.vn = Vn.get({ id: $stateParams.id});

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}
		}])
		.controller('DeveloperCreateController', ['$scope', '$state', '$timeout', '$q', '$log', 'Developer', function($scope, $state, $timeout, $q, $log, Developer) {
			$scope.developer = new Developer();

			$scope.createDeveloper = function() {
				$scope.developer.$save(function() {
					$state.go('developer');
				});
			}

		}])
		
		.controller('DeveloperEditController', ['$scope', '$state', '$stateParams', '$timeout', '$q', '$log', 'Developer', function($scope, $state, $stateParams, $timeout, $q, $log, Developer) {
			$scope.updateDeveloper = function() {
				$scope.developer.$update(function() {
					$state.go('developer');
				});
			}

			$scope.developer = Developer.get({ id: $stateParams.id });
			
		}]);
	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
})();

