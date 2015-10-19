<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Recomposition Front End</title>
		<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
	</head>
	<body ng-app="authApp">
		<div class="container">
			<div ui-view></div>
		</div>
	</body>

	<!-- application dependency -->
	<script src="node_modules/angular/angular.js"></script>
	<script src="node_modules/angular-ui-router/build/angular-ui-router.js"></script>
	<script src="node_modules/satellizer/satellizer.js"></script>

	<!-- application scripts -->
	<script src="scripts/app.js"></script>
	<script src="scripts/authController.js"></script>
	<script src="scripts/vnController.js"></script>
</html>