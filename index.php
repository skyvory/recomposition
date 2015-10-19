<!DOCTYPE html>
<html ng-app="recompositionApp">
<html>
	<head>
		<meta charset="utf-8">
		<title>Recomposition Front End</title>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
	</head>
	<body>
		<div class="container">
			<div ui-view></div>
		</div>
	</body>

	<!-- components -->
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
	<script src="bower_components/satellizer/satellizer.js"></script>
	<script src="bower_components/angular-resource/angular-resource.js"></script>

	<!-- application script s-->
	<script src="app/app.js"></script>

	<!-- controller scripts -->
	<script src="app/controllers/authController.js"></script>
	<script src="app/controllers/vnController.js"></script>
	<script src="app/controllers/logoutController.js"></script>

	<!-- service scripts -->
	<script src="app/services/vnService.js"></script>
</html>