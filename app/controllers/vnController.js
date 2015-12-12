(function() {
	'use strict';

	angular
		.module('recompositionApp')
		.controller('VnListController', ['$auth', '$scope', 'Vn', 'confirmService', '$window', '$state', '$mdSidenav', '$q', '$timeout', '$mdDialog', function($auth, $scope, Vn, confirmService, $window, $state, $mdSidenav, $q, $timeout, $mdDialog) {

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
				order: '-created_at',
				limit: 10,
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

				return Vn.get({ page:page, limit: limit }, success).$promise;
			}
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 1000);
				return deferred.promise;
			}

			$scope.vns = Vn.get({ limit: $scope.query.limit });

		}])
		.controller('VnShowController', ['$auth', '$scope', '$stateParams', 'Vn', function($auth, $scope, $stateParams, Vn) {
			$scope.vns = Vn.get({ id: $stateParams.id});

			$scope.isAuthenticatekd = function() {
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
		.controller('VnAssessmentController', function($scope, Assessment, $state, $stateParams, moment) {
			$scope.assessment = {};
			getAssessment($stateParams.id);
			function getAssessment(vn_id) {
				Assessment.get({ id: vn_id }, function(response) {
					if(!response.id) {
						var new_assessment = new Assessment();
						new_assessment.vn_id = vn_id;
						$scope.assessment = new_assessment;
					}
					else {
						generalizeAssessment(response);
					}
				});
			}
			$scope.saveAssessment = function() {
				// $scope.assessment.date_start = moment($scope.assessment.date_start).add(0, 'hours');
				if($scope.assessment.id) {
					if(date_start_switch) {
						$scope.assessment.date_start = date_start_local;
					}
					if(date_end_switch) {
						$scope.assessment.date_end = date_end_local;
					}
					$scope.assessment.$update(function(response) {
						generalizeAssessment(response);
						// toast!
					});
				}
				else {
					$scope.assessment.$save(function(response) {
						generalizeAssessment(response);
						// toast
					})
				}
			}
			// generalize assessment response to be in streamlined format, datetime especially
			function generalizeAssessment(assessment) {
				$scope.assessment = assessment;
				$scope.date_start_local = assessment.date_start ? moment.utc(assessment.date_start).toDate() : '';
				$scope.date_end_local = assessment.date_end ? moment.utc(assessment.date_end).toDate() : '';
			}

			$scope.date_start_switch = false;
			$scope.date_end_switch = false;
		})
		.controller('VnCharacterController', function($scope, $state, $stateParams, Vn, Character, $http, $mdDialog, $mdMedia, Lineament) {
			$scope.characters = {};
			$scope.vndb = [];
			$scope.vndb.characters = [];
			$scope.vndb_toggle = false;
			$scope.toggleVndb = function() {
				$scope.vndb_toggle = $scope.vndb_toggle ? false : true;
			}
			getCharacter($stateParams.id);
			function getCharacter(vn_id) {
				Character.get({ vn_id: vn_id }, function(response) {
					$scope.characters = response.data;
					// console.log(response);
				});
			}
			$scope.retrieveVndbCharacter = function() {
				$http({
					method: 'POST',
					url: 'http://localhost/record/public/vndb/character',
					data: {
						vndb_id: $scope.vndb.vndb_id,
						username: 'svry',
						password: 'svry',
					},
				}).then(function successCallback(response) {
					var characters = response.data.data.items;
					console.log(characters);
					// chara processing
					if(characters) {
						for(var i in characters) {
							if(characters[i].gender == "f") {
								console.log(i);
								// $scope.vndb.characters.push({
									// kanji: characters[i].original,
									// betsumyou: characters[i].aliases,
									// yobikata: characters[i].name,
									// birthmonth: characters[i].birthday['1'],
									// birthday: characters[i].birthday['0'],
									// image: characters[i].image,
								// });
								$scope.vndb.characters.push(characters[i]);
							}
						}
					}
				}, function errorCallback(response) {
					console.log("ERROR", response);
				});
			}
			$scope.removeVndbCharacter = function(item) {
				var index = $scope.vndb.characters.indexOf(item);
				$scope.vndb.characters.splice(index, 1);
			}
			$scope.saveVndbCharacter = function(chara) {
				console.log(chara);
				var character = new Character();
				character.vn_id = $stateParams.id;
				character.kanji = chara.original;
				character.betsumyou = chara.aliases;
				character.yobikata = chara.name;
				character.birthmonth = chara.birthday[1];
				character.birthday = chara.birthday[0];
				character.image = chara.image;
				character.$save(function(response) {
					console.log(response);
					$scope.characters = $scope.characters.concat(response);
				}, function(error) {
					console.log(error);
				});
			}
			$scope.saveCharacter = function(chara) {
				Character.update(chara, function() {
					// toast
				});
			}
			$scope.deleteCharacter = function(ev, chara) {
				console.log(chara);
				var confirm = $mdDialog.confirm()
					.title('Do you really want to kill this girl?')
					.content('there\'s no dump provided yet, your sin will be forever noted')
					.ariaLabel('you are deemed to be doomed')
					.targetEvent(ev)
					.ok('kill')
					.cancel('mercy')
				;
				$mdDialog.show(confirm).then(function() {
					console.log(chara.id);
					// get index of item to be deleted
					var index = $scope.characters.indexOf(chara);
					Character.delete({ id: chara.id }, function() {
						// remove item from scope once delete succeed on server
						$scope.characters.splice(index, 1);
						// toast
					});
				}, function() {
					// dialog cancelled
				})
			}
			$scope.saveMark = function(chara) {
				console.log(chara);
				if(chara.lineament_id) {
					var lineament = {
						id: chara.lineament_id,
						character_id: chara.id,
						note: chara.note,
						mark: chara.mark,
					};
					Lineament.update(lineament, function(response) {
						console.log(response);
						// toast
					}, function(error) {
						console.log(error);
					});
				}
				else {
					var lineament = {
						character_id: chara.id,
						note: chara.note,
						mark: chara.mark,
					};
					Lineament.save(lineament, function(response) {
						console.log(response);
						// toast
					}, function(error) {
						console.log(error);
					});
				}
			}

			$scope.customFullscreen = $mdMedia('sm');
			$scope.showVndbDialog = function(ev) {
				$scope.retrieveVndbCharacter();
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'views/vndbCharacterDialog.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: $mdMedia('sm') &&$scope.customFullscreen
				})
				.then(function(answer) {
					console.log("finished adding characters");
				}, function() {
					console.log("canceled dialog");
				});
				$scope.watch(function() {
					return $mdMedia('sm');
				}, function(sm) {
					$scope.customFullscreen = (sm === true);
				});
			};
		})
		.controller('VnNoteController', function($scope, $stateParams, Vn, Character, Lineament, Note, $interval, $mdToast) {
			
			$scope.note;
			Note.get({ vn_id:$stateParams.id }, function(response) {
				if(response.id) {
					$scope.note = response;
					var textarea = document.getElementsByClassName('note-textarea');
					setTimeout(function() {
						for(var i in textarea) {
							textarea[i].scrollTop = textarea[i].scrollHeight;
						}
					}, 100);
				}
				else {
					toast('creating new note');
					Note.save({ vn_id: $stateParams.id }, function(response) {
						toast('new note created');
						$scope.note = response;
					}, function(error) {
						alert(error);
					});
				}
				$scope.save_status = 'ok';
			}, function(error) {
				alert(error);
			});

			function saveNote() {
				toast('saving note');
				Note.update($scope.note, function(response) {
					toast('note saved');
					$scope.save_status = 'ok';
					console.log(response);
				}, function(error) {
					console.log(error);
				});
			}

			function saveLineament(line) {
				line.id = line.lineament_id;
				toast('saving lineament');
				Lineament.update(line, function(response) {
					toast('lineament saved');
					$scope.save_status = 'ok';
					console.log(response);
					// toast
				}, function(error) {
					console.log(error);
				});
			}

			// to detect if there's any change happens
			var primary_change = false;
			$scope.$watch('note', function() {
				primary_change = true;
				$scope.save_status = 'waiting note to be saved';
			}, true);
			var lineament_change = false;
			$scope.$watch('lineaments', function(new_value, old_value) {
				// loop through scope and get object of ewhich note property changed
				for(var i in old_value) {
					if(old_value[i].note !== new_value[i].note) {
						lineament_change = true;
						$scope.lineaments[i].change = true;
						$scope.save_status = 'waiting lineament to be saved';
					}
				}
				// lineament_change = true;
			}, true);

			// set interval execution to frequently update to server on content change
			setTimeout(function() {
				$interval(function() {
					if(primary_change) {
						saveNote();
						primary_change = false;
						$scope.save_status = 'sending note save command...';
					}
					if(lineament_change) {
						for(var i in $scope.lineaments) {
							if($scope.lineaments[i].change) {
								console.log($scope.lineaments[i]);
								saveLineament($scope.lineaments[i]);
								$scope.lineaments[i].change = false;
							}
						}
						lineament_change = false;
						$scope.save_status = 'sending lineament save command...';
					}
				}, 3000);
			}, 6000);

			// default view of note
			$scope.note_toggle = 'primary';

			// retrieve character note
			$scope.lineament;
			Lineament.get({ vn_id: $stateParams.id }, function(response) {
				$scope.lineaments = response.data;
			}, function(error) {
				alert(error);
			});

			$scope.save_status = 'working...';

			function toast(text_content) {
				$mdToast.show(
					$mdToast.simple()
						.content(text_content)
						.position('bottom left')
						.hideDelay(3000)
				);
			}
		})
		;
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
