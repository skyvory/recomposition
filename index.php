<!DOCTYPE html>
<html ng-app="recompositionApp">
<html>
	<head>
		<meta charset="utf-8">
		<title>Recomposition Front End</title>
		<!-- <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css"> -->
		<link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
		<style type="text/css">
			/*Hide when Angular is not yet loaded and initialized*/
			[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], ng-cloak, x-ng-cloak {
				display: none !important;
			}
		</style>
	</head>
	<body ng-cloak>
		<div layout="column" layout-fill>
		<md-toolbar class="md-whiteframe-z1">
			<div class="md-toolbar-tools">
				<md-button class="md-icon-button menu" hide-gt-sm ng-click="toggleMenu()">
					<md-icon md-svg-icon="assets/svg/menu.svg"></md-icon>
				</md-button>
				<h2>
					<span>Recomposition</span>
				</h2>
			</div>
		</md-toolbar>

		<div flex layout="row">

			<md-sidenav flex="grow" class="md-sidenav md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')">
				<md-toolbar class="md-whiteframe-z1" hide-gt-sm>
					<h1>Recomposition</h1>
				</md-toolbar>

				<md-list>
					 <md-list-item ng-click="newV()">
	    					<md-icon md-svg-icon="assets/svg/mail.svg"></md-icon>
						<p>Visualization</p>
					</md-list-item>
					<md-divider></md-divider>
				</md-list>
			</md-sidenav>

			<md-content id="content" role="main" class="md-whiteframe-z2" ui-view flex="grow">
		
			</md-content>
			</div>
		</div>
	</body>

	<!-- components -->
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
	<script src="bower_components/satellizer/satellizer.js"></script>
	<script src="bower_components/angular-resource/angular-resource.js"></script>
	<script src="bower_components/angular-animate/angular-animate.js"></script>
	<script src="bower_components/angular-aria/angular-aria.js"></script>
	<script src="bower_components/angular-material/angular-material.js"></script>

	<!-- application script s-->
	<script src="app/app.js"></script>
	<!-- // <script src="app/vn.js"></script> -->

	<!-- controller scripts -->
	<script src="app/controllers/authController.js"></script>
	<script src="app/controllers/vnController.js"></script>
	<script src="app/controllers/logoutController.js"></script>
	<script src="app/controllers/indexController.js"></script>

	<!-- service scripts -->
	<script src="app/services/vnService.js"></script>
	<script src="app/services/commonService.js"></script>

	<script type="text/javascript">
		// angular
		// 	.module('recompositionApp', ['ngMaterial', 'vn'])
		// 	.config(function($mdThemingProvider, $mdIconProvider) {

		// 		$mdIconProvider
		// 			.defaultIconSet("./assets/svg/avatars.svg", 128)
		// 			.icon("menu"       , "./assets/svg/menu.svg"        , 24)
		// 			.icon("share"      , "./assets/svg/share.svg"       , 24)
		// 			.icon("google_plus", "./assets/svg/google_plus.svg" , 512)
		// 			.icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
		// 			.icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
		// 			.icon("phone"      , "./assets/svg/phone.svg"       , 512);

		// 			$mdThemingProvider.theme('default')
		// 				.primaryPalette('brown')
		// 				.accentPalette('red');
		// 	})
	</script>
</html>