<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Recomposition Front End</title>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
	</head>
	<body ng-app="authApp">
		<div class="container">
			<div ui-view></div>
		</div>
	</body>

	<!-- application dependency -->
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
	<script src="bower_components/satellizer/satellizer.js"></script>

	<!-- application scripts -->
	<script src="app/app.js"></script>
	<script src="app/controllers/authController.js"></script>
	<script src="app/controllers/vnController.js"></script>
</html>