myApp.directive('promoMDirective', function($compile) {
  return {
      restrict: 'AE', 
      replace: true,
      scope:{moduledata:"@"},
      template: ` 
      <div class="module promo promo1 desktop-fragments-promoM-group-1  module-first diagonal  dark   "> 
         <a href="https://www.o2.co.uk/shop/phones/apple/iphone-6s/" title="Lorem ipsum" manual_cm_re="promoM-_-iPhone 6s-_-Buy now" target="_self"> 
          <div class="module-body">  
           <div class="info"> 
            <h3>Lorem  ipsum</h3> 
            <p>Promo-m module with dark and diagonal class</p> 
            <p class="product-cta">Lorem ipsum</p> 
           </div> 
          </div> <span class="hover-down"></span><span class="hover-down"></span></a> 
        </div> `,
		link: function ( $scope, element, attrs ) { 
			var moduleJson=JSON.parse($scope.moduledata);
			angular.forEach(moduleJson, function(moduleVal, key) {				
				if(moduleVal.name==="Promo M") {
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
				$scope.currentIndex=$('.module-section').index(this);
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
				    <button class="btn btn-primary btn-primary" type="button" ng-click="ok(module,currentIndex)">OK</button>
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
