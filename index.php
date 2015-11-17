<!DOCTYPE html>
<html ng-app="recompositionApp">
<html>
	<head>
		<meta charset="utf-8">
		<title>Recomposition Front End</title>
		<!-- <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css"> -->
		<link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
		<link rel="stylesheet" href="bower_components/angular-material-data-table/dist/md-data-table.css" />
		<style type="text/css">
			/*Hide when Angular is not yet loaded and initialized*/
			[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], ng-cloak, x-ng-cloak {
				display: none !important;
			}
		</style>
	</head>
	<body ng-cloak ng-controller="MainController" ng-style="bodystyle">
		<span ui-view=""></span>
	</body>

	<!-- components -->
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
	<script src="bower_components/satellizer/satellizer.js"></script>
	<script src="bower_components/angular-resource/angular-resource.js"></script>
	<script src="bower_components/angular-animate/angular-animate.js"></script>
	<script src="bower_components/angular-aria/angular-aria.js"></script>
	<script src="bower_components/angular-material/angular-material.js"></script>
	<script src="bower_components/angular-messages/angular-messages.js"></script>
	<script src="bower_components/angular-material-data-table/dist/md-data-table.js"></script>
	<script src="bower_components/moment/moment.js"></script>
	<script src="bower_components/angular-moment/angular-moment.js"></script>

	<!-- application script s-->
	<script src="app/app.js"></script>
	<!-- // <script src="app/vn.js"></script> -->

	<!-- controller scripts -->
	<script src="app/controllers/authController.js"></script>
	<script src="app/controllers/vnController.js"></script>
	<script src="app/controllers/logoutController.js"></script>
	<script src="app/controllers/indexController.js"></script>
	<!-- // <script src="app/controllers/developerController.js"></script> -->

	<!-- service scripts -->
	<script src="app/services/vnService.js"></script>
	<script src="app/services/developerService.js"></script>
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
	<style type="text/css">
	</style>
</html>