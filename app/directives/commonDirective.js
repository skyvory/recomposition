recompositionApp.directive('selectOnClick', function($window) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function() {
				if(!$window.getSelection().toString()) {
					this.setSelectionRange(0, this.value.length);
				}
			});
		}
	}
});