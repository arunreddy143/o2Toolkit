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

myApp.directive('preCode', function(){
    return {
      restrict: 'AE',
      replace: true,
      scope:{name:"@"},
      template:"<pre class='preCode prettyprint'>sadas</pre>",
      link:function($scope, element, attrs) {
        
        $('[data-behavior="sample_code"').each(function(){
          var container = $(this);
          
          var target = container.closest('.preCode');
          //if we have a target
          
            // get the sample's html
            var sample_html = container.parent().html();
            var white_space = "☺";
            // find how many spaces are before the part of the html
            try {
              white_space = sample_html.match(/\n+\s+\S/)[0].slice(0,(sample_html.match(/\n+\s+\S/)[0].length-3));
            } catch(err) {}
            // set up a regex to search for a white space string
            var re = new RegExp(white_space,"g");
            // replace white_space, < and > with &lt; and &gt; and remove the sample_code ref
            sample_html = sample_html.replace(re,"\n").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(' data-behavior="sample_code"','');
            // trim out any new lines at begining or end of string
            sample_html = $.trim(sample_html);
            // stick into target
             element.html("<code>"+sample_html+"</code>");
          
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

