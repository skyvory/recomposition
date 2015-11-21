(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('AssessmentListController', ['$auth', '$scope', 'Assessment', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Assessment, $state, $mdSidenav, $q, $timeout, $mdDialog) {

			$scope.assessments = Assessment.get();

			$scope.deleteAssessment = function(ev) {
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
						Assessment.delete({ id: $scope.selected[i].id }, function() {
							suc++;
							if(suc == $scope.selected.length) {
								// retrieve updated chara list
								Assessment.get({}, success).$promise;
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
			function success(assess) {
				$scope.assessments = assess;
				console.log(assess);
			}
			$scope.search = function(pre) {
				return Assessment.get($scope.query)
			}
			$scope.onpagechange = function(page, limit) {

				return Assessment.get({page:page}, success).$promise;
			}
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 1000);
				return deferred.promise;
			}

		}])
		
		.controller('AssessmentCreateController', ['$scope', '$state', 'Assessment', '$timeout', '$q', '$log', 'Vn', 'Developer', '$http', function($scope, $state, Assessment, $timeout, $q, $log, Vn, Developer, $http) {
			$scope.assessment = new Assessment();

			$scope.createAssessment = function() {
				$scope.assessment.vn_id = $scope.selectedItem.id;
				$scope.vn.$save(function() {
					$state.go('assessment');
				});
			}

			$scope.retrieveVndbVn = function() {
				$http({
					method: 'POST',
					url: 'http://localhost/record/public/vndb/vn',
					data: {
						vndb_id: $scope.assessment.vndb_id,
						username: 'svry',
						password: 'svry',
					},
				}).then(function successCallback(response) {
					$scope.dbvn = response.data.items;
				}, function errorCallback(response) {
					//
				});
				$http({
					method: 'POST',
					url: 'http://localhost/record/public/vndb/release',
					data: {
						vndb_id: $scope.assessment.vndb_id,
						username: 'svry',
						password: 'svry',
					},
				}).then(function successCallback(response) {
					$scope.dbrelease = response.data.items;
				});
			}
			
			$scope.simulateQuery = true;
			$scope.isDisabled = false;
			$scope.repos = {};
			loadAll();
			$scope.querySearch = querySearch;
			$scope.selectedItemChange = selectedItemChange;
			$scope.searchTextChange = searchTextChange;

			function querySearch(query) {
				var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos, deferred;
				if($scope.simulateQuery && query && query.length > 2) {
					// Vn.get({search: query}, function(res) {
					// 	console.log(res.data);
					// 	$scope. res.data;
					// });
					
					deferred = $q.defer();
					$timeout(function () {
				 		Vn.get({search: query}, function(res) {
							deferred.resolve(res.data);
						});
					}, 1000, false);
					 console.log(results);
					return deferred.promise;
				}
				else {
					console.log(results);
					return results;
				}
			}
			function searchTextChange(text) {
				$log.info(text);
			}
			function selectedItemChange(item) {
				$log.info(JSON.stringify(item));
				$scope.assessment.vn_id = $scope.selectedItem ? $scope.selectedItem.id : '';
			}
			function loadAll() {

				var repos = Vn.get();
				repos.$promise.then(function(res) {
					$scope.repos = res.data.map( function (repo) {
						repo.value = repo.title_en.toLowerCase();
						return repo;
					});
				});
			}
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(item) {
					return (item.value.indexOf(lowercaseQuery) === 0);
				};
			}

		}])
		.controller('AssessmentEditController', ['$scope', '$state', '$stateParams', 'Vn', '$timeout', '$q', '$log', 'Developer', 'moment', function($scope, $state, $stateParams, Vn, $timeout, $q, $log, Developer, moment) {
			$scope.updateVn = function() {
				// add 24 hours to date, suspect US utc is being used as md-datepicker locale
				$scope.vn.date_release = moment($scope.vn.date_release).add(24, 'hours');
				$scope.vn.$update(function() {
					$state.go('vn');
				});
			}

			var vn = Vn.get({ id: $stateParams.id });
			vn.$promise.then(function(res) {
				$scope.vn = res;
				$scope.vn.date_release = moment(res.date_release).toDate();
			});

			$scope.simulateQuery = false;
			$scope.isDisabled = false;
			$scope.repos = {};
			loadAll();
			$scope.querySearch = querySearch;
			$scope.selectedItemChange = selectedItemChange;
			$scope.searchTextChange = searchTextChange;

			function querySearch(query) {
				var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos, deferred;
				if($scope.simulateQuery) {
					deferred = $q.defer();
					$timeout(function () {
						deferred.resolve( results );
					}, Math.rendom() * 1000, false);
					return deferred.promise;
				}
				else {
					return results;
				}
			}
			function searchTextChange(text) {
				$log.info(text);
			}
			function selectedItemChange(item) {
				$log.info(JSON.stringify(item));
				// change value on scope holding value to update
				if(item) {
					$scope.vn.developer_id = item.id;
				}
			}
			function loadAll() {
				var repos = Developer.get();
				repos.$promise.then(function(res) {
					$scope.repos = res.map( function (repo) {
						repo.value = repo.name_en.toLowerCase();
						return repo;
					});
				});
			}
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(item) {
					return (item.value.indexOf(lowercaseQuery) === 0);
				};
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

