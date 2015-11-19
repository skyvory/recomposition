(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('CharacterListController', ['$auth', '$scope', 'Character', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Character, $state, $mdSidenav, $q, $timeout, $mdDialog) {

			$scope.characters = Character.get();

			$scope.deleteCharacter = function(ev) {
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
						Character.delete({ id: $scope.selected[i].id }, function() {
							suc++;
							if(suc == $scope.selected.length) {
								// retrieve updated chara list
								Character.get({}, success).$promise;
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
				order: 'kanji',
				limit: 1,
				page: 1
			};
			function success(chars) {
				$scope.characters = chars;
				console.log(chars);
			}
			$scope.search = function(pre) {
				return Character.get($scope.query)
			}
			$scope.onpagechange = function(page, limit) {

				return Character.get({page:page}, success).$promise;
			}
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 1000);
				return deferred.promise;
			}

			$scope.newCharacter = function(ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'views/characterNewView.html',
					parent: angular.element(document.body),
					tergetEvent: ev,
					clickOutsideToClose: true
				})
				.then(function(answer) {
					var new_char = new Character();
					Object.assign(new_char, answer);
					new_char.$save(function() {
						// retrieve updated character list
						Character.get({}, success).$promise;
						// $state.go($state.current, {}, {reload:true});
					});
				}, function() {
					// dialog cancelled
				});
			}
			
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

