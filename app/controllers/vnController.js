(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnListController', ['$auth', '$scope', 'Vn', 'confirmService', '$window', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Vn, confirmService, $window, $state, $mdSidenav, $q, $timeout, $mdDialog) {
			var vns = Vn.get();
			$scope.vns = vns;
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
			function success(vns) {
				$scope.vns = vns;
				console.log(vns);
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
			$scope.vns = Vn.get({ id: $stateParams.id});

			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			}
		}])
		.controller('VnCreateController', ['$scope', '$state', 'Vn', '$timeout', '$q', '$log', 'Developer', 'moment', '$http', function($scope, $state, Vn, $timeout, $q, $log, Developer, moment, $http) {
			$scope.vn = new Vn();

			$scope.createVn = function() {
				$scope.vn.date_release = moment($scope.vn.date_release).add(24, 'hours');
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
				console.log(item);
				$scope.vn.developer_id = item ? item.id : '';
				$scope.vn.developer_name_en = item ? item.name_en : '';
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

			$scope.retrieveVndbVn = function() {
				// fetch vn data
				$http({
					method: 'POST',
					url: 'http://localhost/record/public/vndb/vn',
					data: {
						vndb_id: $scope.vndb.vndb_id,
						username: 'svry',
						password: 'svry',
					},
				}).then(function successCallback(response) {
					$scope.vndb.vn = response.data.data.items['0'];
					console.log("VN", response.data.data);
					$scope.vn.title_en = response.data.data.items['0'].title;
					$scope.vn.title_jp = response.data.data.items['0'].original ? response.data.data.items['0'].original : 'n/a';
					$scope.vn.date_release = moment(response.data.data.items['0'].released).toDate();
				}, function errorCallback(response) {
					//
				});

				// fetch release data
				$http({
					method: 'POST',
					url: 'http://localhost/record/public/vndb/release',
					data: {
						vndb_id: $scope.vndb.vndb_id,
						username: 'svry',
						password: 'svry',
					},
				}).then(function successCallback(response) {
					$scope.vndb.release = response.data.data.items['0'];
					console.log("REL", response);
					// crawl through the response to find developer = true
					if(response.data.data.items) {
						var tobreak = false;
						for(var i in response.data.data.items) {
							if(response.data.data.items[i].producers) {
								for(var j in response.data.data.items[i].producers) {
									if(response.data.data.items[i].producers[j].developer == true) {
										var check = checkDeveloper(response.data.data.items[i].producers[j].name);
										// var check = checkDeveloper("bilingu");
										check.then(function(dev) {
											console.log(dev);
											// assign developer id to scope
											$scope.vn.developer_id = dev.id;
											// assign developer name to scope
											$scope.vn.developer_name_en = dev.name_en;
										}, function(reason) {
											// no match found, creating new entry of developer
											console.log(reason);
											var reg = createDeveloper(response.data.data.items[i].producers[j].name, response.data.data.items[i].producers[j].original);
											reg.then(function(resolution) {
												console.log("successfully create developer");
												console.log(resolution);
												// set successfully inserted developer to scope
												$scope.vn.developer_id = resolution.id;
												$scope.vn.developer_name_en = resolution.name_en;
											}, function(fail) {
												console.log(fail);
												console.log("something went wrong and developer creation manifest to no avail");
											});
										});

										tobreak = true;
									}
									if(tobreak == true) {
										break;
									}
								}
							}
							if(tobreak == true) {
								break;
							}
						}
					}
					// $scope.vn.date_release = 
				}, function errorCallback(response) {
					//
				});
			}
			$scope.vndb = {
				vndb_id: 17,
			}

			function checkDeveloper(name_en) {
				return $q(function(resolve, reject) {
					setTimeout(function() {
						Developer.get({name_en: name_en}, function(response) {
							if(name_en == response.name_en) {
								resolve(response);
							}
							else {
								reject('no match found');
							}
						});
					}, 500);
				});
			}

			function createDeveloper(name_en, name_jp) {
				return $q(function(resolve, reject) {
					setTimeout(function() {
						var dev = new Developer();
						dev.name_en = name_en;
						dev.name_jp = name_jp;
						dev.$save(function(response) {
							resolve(response);
						}, function(error) {
							reject(error);
						});
					}, 500);
				});
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
		}])
		.controller('VnAssessmentController', function($scope) {
			//
		})
		.controller('VnNoteController', function($scope) {
			//
		})
		;
	
})();


// angular.module('vnController',[]).controller('VnListController',function($scope,$state,Vn){
// 	$scope.vn = Vn.get();
// 	console.log($scope.vn);
// });