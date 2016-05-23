var myApp=myApp.directive('promoMDirective', function($compile,ModalService) {
  return {
      restrict: 'AE',   
      replace: true,
      scope:{moduledata:"@"},
      templateUrl: "./modules/promo-m/template.html",
		link: function ( $scope, element ) {  
			$scope.module=JSON.parse($scope.moduledata);
			$scope.currentIndex;
			element.bind('click', function() {
				
				//$scope.currentIndex=$('.module-section').index(this);
				ModalService.showModal({
		            templateUrl: './modules/common/modaltemplate.html',
		            controller: "ModalController",
		            data:$scope.module
		        }).then(function(modal) {
		            modal.element.show();
		            modal.close.then(function(result) {

		            	$scope.module=result;
		                $scope.message = "You said " + result;
		            });
		        });
			

	        });
	        $scope.ok=function(module,currentIndex) {	 
	        	var bgApply=$('.module-section').eq($scope.currentIndex).find('.bkg-img');
	        	var responsiveImg=function() {
	        	if(angular.element(window).width()<575) {
	        		$(bgApply).css( 'background-image',"url('" + module.mobile + "')"); 
	        	}
	        	if(angular.element(window).width()>=575 && angular.element(window).width()<=815) {
	        		$(bgApply).css( 'background-image',"url('" + module.tablet + "')");  
	        	}
	        	if(angular.element(window).width()>=815) {
	        		$(bgApply).css( 'background-image',"url('" + module.desktop + "')");
	        	}
	        	$scope.master = angular.copy($scope.module);
	        };
        	responsiveImg();
        	removeModal(currentIndex);
        	$(window).on("resize", function () {
	        	responsiveImg();
	        });     	
	        	
	        	
	        };
	        
		}
  	};
}); 

myApp.controller('ModalController', function($scope, close,options) {
	$scope.module=options.data; 
 $scope.close = function(result) {
 	$scope.module=result;
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});




