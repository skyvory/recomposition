(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnListController', ['$auth', '$scope', 'Vn', 'confirmService', '$window', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Vn, confirmService, $window, $state, $mdSidenav, $q, $timeout, $mdDialog) {
			var v = Vn.get();
			$scope.vn = v;
			// console.log(v.$promise);

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}

			$scope.deleteVnx = function(v) {
				if(confirmService.showPopup('Sure?')) {
					console.log($scope.vn);
					Vn.delete({ id: v.id }, function() {
						$window.location.href = '';
					});
				}
			}

			$scope.deleteVn = function(ev) {
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
						Vn.delete({ id: $scope.selected[i].id }, function() {
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
				order: 'created_at',
				limit: 3,
				page: 1
			};
			function success(vn) {
				$scope.vn = vn;
				console.log(vn);
			}
			$scope.search = function(pre) {
				return Vn.get($scope.query)
			}
			$scope.onpagechange = function(page, limit) {

				// var deferred = $q.defer();
				// var xxx = Vn.get({page: page});
				// xxx.$promise.then(function (response) {
				// 	deferred.resolve(response.data);
				// 	console.log(deferred.promise);
				// 	return deferred.promise;
				// });

				return Vn.get({page:page}, success).$promise;
			}
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 1000);
				return deferred.promise;
			}

		}])
		.controller('VnShowController', ['$auth', '$scope', '$stateParams', 'Vn', function($auth, $scope, $stateParams, Vn) {
			$scope.vn = Vn.get({ id: $stateParams.id});

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}
		}])
		.controller('VnCreateController', ['$scope', '$state', 'Vn', '$timeout', '$q', '$log', 'Developer', function($scope, $state, Vn, $timeout, $q, $log, Developer) {
			$scope.vn = new Vn();

			$scope.createVn = function() {
				$scope.vn.developer_id = $scope.selectedItem.id;
				$scope.vn.$save(function() {
					$state.go('vn');
				});
			}

			$scope.simulateQuery = false;
			$scope.isDisabled = false;
			// $scope.repos = loadAll();
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
			}
			function loadAll() {
				// var repos = [
				// 	{
				//           'name'      : 'Angular 1',
				//           'url'       : 'https://github.com/angular/angular.js',
				//           'watchers'  : '3,623',
				//           'forks'     : '16,175',
				//         },
				//         {
				//           'name'      : 'Angular 2',
				//           'url'       : 'https://github.com/angular/angular',
				//           'watchers'  : '469',
				//           'forks'     : '760',
				//         },
				//         {
				//           'name'      : 'Angular Material',
				//           'url'       : 'https://github.com/angular/material',
				//           'watchers'  : '727',
				//           'forks'     : '1,241',
				//         },
				//         {
				//           'name'      : 'Bower Material',
				//           'url'       : 'https://github.com/angular/bower-material',
				//           'watchers'  : '42',
				//           'forks'     : '84',
				//         },
				//         {
				//           'name'      : 'Material Start',
				//           'url'       : 'https://github.com/angular/material-start',
				//           'watchers'  : '81',
				//           'forks'     : '303',
				//         }
				// ];
				// return repos.map( function (repo) {
				// 	repo.value = repo.name.toLowerCase();
				// 	return repo;
				// });

				var repos = Developer.get();
				// return (function() {
					repos.$promise.then(function(res) {
						$scope.repos = res.data.map( function (repo) {
							repo.value = repo.name_en.toLowerCase();
							return repo;
						});
					});
				// })();

			}
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(item) {
					return (item.value.indexOf(lowercaseQuery) === 0);
				};
			}
		}])
		.controller('VnEditController', ['$scope', '$state', '$stateParams', 'Vn', '$timeout', '$q', '$log', 'Developer', 'moment', function($scope, $state, $stateParams, Vn, $timeout, $q, $log, Developer, moment) {
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
					$scope.repos = res.data.map( function (repo) {
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
	
})();


// angular.module('vnController',[]).controller('VnListController',function($scope,$state,Vn){
// 	$scope.vn = Vn.get();
// 	console.log($scope.vn);
// });