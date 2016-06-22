var myApp=myApp.directive('promoSDirective', function($compile,ModalService,$window) {
  return {
      restrict: 'AE',  
      replace: true,      
      scope:{moduledata:"@"},                 
      templateUrl: "./modules/promo-s/template.html",
		link: function ( $scope, element ) {  
			$scope.module=JSON.parse($scope.moduledata);			
			$scope.module.titleBol=true; 
			$scope.module.copyBol=true;
			$scope.module.ctaBol=true;  
			$scope.module.shadeClass=$scope.module.extraClass[0].shade;   
			
			element.bind('click', function() {  
				ModalService.showModal({
		            templateUrl: './modules/common/modaltemplate.html',
		            controller: "ModalController",
		            data:$scope.module

		        }).then(function(modal) {
		        	$scope.resetData = angular.copy($scope.module);
		            modal.element.show();
		            modal.close.then(function(result) {	
		            	if(result==='no') {
		            		$scope.module=$scope.resetData;
		            		return;
		            	}	            	
		            	responsiveImg();    		            	    
		            });
		        });

	        });
	        function responsiveImg() {	 
	        	var bgApply=element.find('.bkg-img');
	        	var responsiveImg=function() {
	        	if(angular.element($window).width()<575) {
	        		$(bgApply).css( 'background-image',"url('" + $scope.module.dd + "')"); 
	        	}
	        	if(angular.element($window).width()>=575 && angular.element($window).width()<=815) {
	        		$(bgApply).css( 'background-image',"url('" + $scope.module.bp2 + "')");  
	        	}
	        	if(angular.element($window).width()>=815) {
	        		$(bgApply).css( 'background-image',"url('" + $scope.module.bp3 + "')");
	        	}
	        };
        	responsiveImg();
        	$($window).on("resize", function () {
	        	responsiveImg();
	        });     	
	        	
	        	
	        }
	        
		}
  	};
}); 

myApp.controller('ModalController', function($scope, close,options) {
	$scope.module=options.data; 
 $scope.close = function(result) {
 	//$scope.module=result;
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

 

});




