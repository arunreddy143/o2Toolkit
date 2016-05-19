var myApp=myApp.directive('promoMDirective', function() {
  return {
      restrict: 'AE', 
      replace: true,
      scope:{moduledata:"@"},
      templateUrl: "./modules/promo-m/template.html"
  	};
}); 
