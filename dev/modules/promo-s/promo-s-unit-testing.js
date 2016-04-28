describe('Full spec directive', function() {
  var element, scope,name="View Full Specifications";

  beforeEach(module('myApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element =
        '<full-spec name="'+name+'"></full-spec>';   

    element = $compile(element)(scope);
    scope.$digest();
  }));

  
  it("should compute the size to create other values", function() {
    expect(element.html()).toContain("View Full Specifications");   
    
  });

   it("Specifications Click Handler", function() {
    $(element).triggerHandler('click');
    
  });
 

});


describe('Promo S directive', function() {
  var compile, scope, directiveElem,moduleData;

    beforeEach(function(){
      module('myApp');
      
      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
      });
      
      directiveElem = getCompiledElement();
    });

    function getCompiledElement(){
      var element = angular.element('<promo-s-directive moduledata="{{'+moduleData+'}}"></promo-s-directive');
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should have directive testing', function () {
      var spanElement = directiveElem;
      console.log(spanElement.html());
      
    });
 



    
    
  });