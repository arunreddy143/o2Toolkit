var myApp=myApp.directive('promoSDirective', function($compile) {
  return {
      restrict: 'AE',  
      replace: true,
      scope:{moduledata:"@"},
      templateUrl: "./modules/promo-s/template.html",
		link: function ( $scope, element ) { 
			//var moduleJson=JSON.parse($scope.moduledata);
			
			$scope.currentIndex;
			element.bind('click', function() {
				$scope.currentIndex=$('.module-section').index(this);
				var DOM = angular.element("");
			$compile(DOM)($scope);
				$( "body" ).find('.modal').remove();				
	         	$( DOM).appendTo( $( "body" ) );
	         	$( '.modal').addClass('fade in').css({"z-index": 1050,   "display": "block"});

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

	        $scope.cancel=function() {
	        	removeModal();
	        	$scope.module = angular.copy($scope.master);
	        };
	        var removeModal=function() {
	        	$( '.modal').remove();

	        };
	        
	        
		}
  	};
}); 


myApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element) {
            element.bind("change", function (changeEvent) {
            	var FileReader;
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);


//Directive for adding buttons on click that show an alert on click
myApp.directive("addmodules", function(/*$compile*/){
	return function(scope, element){
		element.bind("click", function(){
			//angular.element(document.getElementById('section')).append($compile("<promo-s-directive moduledata='{{moduleData}}' /> ")(scope));
		});
	};
});

