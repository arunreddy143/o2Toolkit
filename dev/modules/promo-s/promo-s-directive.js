myApp.directive('promoSDirective', function($compile) {
  return {
      restrict: 'AE',
      replace: true,
      scope:{moduledata:"@"},
      template: `<div class="module promo-s    {{extraClass}}" ng-click="open()"> 
	   <div class="desktop-fragments-promoS-group-1 promo bkg-img"> 
	    
	     <div class="module-body"> 
	      <div class="info"> 
	       <h3 contenteditable="true">{{module.title}}</h3> 
	       <p> {{module.copy}} </p> 
	       <p class="product-cta">{{module.cta}}</p> 
	      </div> 
	     </div> <span class="hover-down"></span>
		</div> 
		</div>`,
		link: function ( $scope, element, attrs ) { 
			var moduleJson=JSON.parse($scope.moduledata);
			angular.forEach(moduleJson, function(moduleVal, key) {				
				if(moduleVal.name==="Promo S") {
					$scope.moduleName=moduleVal.name;
					$scope.master = moduleVal.component;
					$scope.module=moduleVal.component;
					angular.forEach($scope.module.extraClass, function(moduleExtraClass, key) {	
						
						if(moduleExtraClass.selected==="true") {
							$scope.extraClass=moduleExtraClass.shade;
						}
						
					});
				}
			});
			
			
			
			$scope.currentIndex;
			element.bind('click', function(currentObj) {
				$scope.currentIndex=$('.module').index(this);
				var DOM = angular.element(`<div class="modal"><div class="modal-dialog">
				<div class="modal-content" >
				<form name="moduleForm">
				<div class="modal-header">
				    <h3 class="modal-title">{{moduleName}}</h3>
				</div>
				<div class="modal-body">
				    
		    	<div class="form-row">
		    	<label>Title</label>
		    	<textarea type="text" ng-model="module.title"></textarea>
		    	</div>
		    	<div class="form-row">
		    	<label>Copy</label>
		    	<textarea type="text" value="${$scope.copy}}" ng-model="module.copy"></textarea>
		    	</div>
		    	<div class="form-row">
		    	<label>CTA Link</label>
		    	<textarea type="text" value="${$scope.cta}}" ng-model="module.cta"></textarea>
		    	</div>
		    	<div class="form-row">
		    	<label>Extra Classes</label>
		    	<select ng-model="extraClass"
          ng-options="module.shade as module.shade for module in module.extraClass">
    </select></div>
		    	<div class="form-row">
		    	<label>DD(Mobile)</label>
		    	<input type="file" name="image" accept="image/*" fileread="module.mobile">
		    	</div>
		    	<div class="form-row">
		    	<label>Bp2 (Tablet)</label>
		    	<input type="file" name="image" accept="image/*" fileread="module.tablet">
		    	</div>
		    	<div class="form-row">
		    	<label>Bp3 (Desktop)</label>
		    	<input type="file" name="image" accept="image/*" fileread="module.desktop">
		    	</div>
				</div>
				<div class="modal-footer">
				    <button class="btn btn-primary" type="button" ng-click="ok(module,currentIndex)">OK</button>
				    <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
				</div>
				</form>
				</div>
			</div></div>`);
			$compile(DOM)($scope);
				$( "body" ).find('.modal').remove();				
	         	$( DOM).appendTo( $( "body" ) );
	         	$( '.modal').addClass('fade in').css({"z-index": 1050,   "display": "block"});

	        });
	        $scope.ok=function(module,currentIndex) {	 
	        	var bgApply=$('.module').eq($scope.currentIndex).find('.bkg-img');        	
	        	
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
	        }
        	responsiveImg();
        	removeModal(currentIndex);
        	$(window).on("resize", function () {
	        	responsiveImg();
	        });     	
	        	
	        	
	        }

	        $scope.cancel=function() {
	        	console.log('cancel')
	        	removeModal();
	        	$scope.module = angular.copy($scope.master);
	        }
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
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);


//Directive for adding buttons on click that show an alert on click
myApp.directive("addmodules", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			angular.element(document.getElementById('section')).append($compile("<promo-s-directive moduledata='{{moduleData}}' /> ")(scope));
		});
	};
});

