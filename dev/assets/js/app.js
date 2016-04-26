var myApp=angular.module('myApp', ['ui.router','ngSanitize']);

myApp.config(function($stateProvider, $urlRouterProvider) {   
    
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('promoM', {
            url: 'promoM',
            templateUrl: 'modules/promo-m/index.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('promoS', {
             url: 'promoS',
            templateUrl: 'modules/promo-s/index.html'     
        });
        
});

myApp.service('modulesService', function($http){
    this.moduleData= function(){
        return $http.get('assets/data/modules.json');
    };   
});

myApp.controller('modulesController',['$scope','modulesService', function($scope,modulesService){
    modulesService.moduleData().then(function(httpData) {
        $scope.moduleData=httpData.data.modules;
        
    });
}]);



myApp.directive('fullSpec', function(){
    return {
      restrict: 'AE',
      replace: true,
      scope:{name:"@"},
      template:"<a href='javascript:void(0)' class='specsLink'>{{name}}</a>",
      link:function($scope, element, attrs) {
            angular.element('.fullSpecs').hide();
        element.bind('click',function() {
            angular.element(this).toggleClass('specActive').next().closest('.fullSpecs').slideToggle();
        });
      }

      }  
});

myApp.directive('formSearch', function(){
    return {
      restrict: 'AE',
      replace: true,
      scope:{name:"@"},
      template:`<form action="" method="GET">
         <label for"search"="">Search for modules</label> 
         <div class="fieldandsubmitbar"> 
          <input type="text" autocomplete="on" name="query" placeholder="Keywords"> 
          <input type="submit" value="" > 
         </div> 
        </form>`,
      link:function($scope, element, attrs) {
          
      }

      }  
});

