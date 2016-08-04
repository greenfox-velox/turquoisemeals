// describe('Testing AngularJS Test Suite', function() {
//   beforeEach(module('turquoiseMealApp'));

//   describe('Testing AngularJS Controller', function() {
//     var scope;
//
//     beforeEach(inject(function($controller, $rootScope) {
//       scope = $rootScope.$new();
//       $controller('mealController', {$scope: scope});
//     }));
//
//     afterEach(function() {
//
//     });

  // testing controller
describe('mealController', function() {
   var $httpBackend, $rootScope, createController, authRequestHandler;
   var scope;

   // Set up the module
   beforeEach(module('turquoiseMealApp'));

   beforeEach(inject(function($controller, $rootScope) {
     scope = $rootScope.$new();
     $controller('mealController', {$scope: scope});
   }));


   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', 'http://localhost:3000/meals')
                            .respond({'meals': [{id: 1, name: 'apple', calories: 25, date: new Date(1982, 5, 26, 10, 20), deleted: false}]});
     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('mealController', {'$scope' : $rootScope });
     };
   }));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });


   it('should fetch authentication token', function() {
     $httpBackend.expectGET('http://localhost:3000/meals');
     var controller = createController();
     $httpBackend.flush();
    // expect($rootScope.status).toBeDefined();
   });


    it('should get 1 meal from the with $http', function() {
      $httpBackend.expectGET('http://localhost:3000/meals');
      var controller = createController();
      $httpBackend.flush();
      expect(scope.meals).toBeDefined();
      expect(scope.meals.length).toBe(1);
      expect(scope.meals[0].id).toBe(1);
      expect(scope.meals[0].name).toBe('apple');
      expect(scope.meals[0].calories).toBe(25);
      expect(scope.meals[0].date).toEqual(new Date(1982, 5, 26, 10, 20));
      expect(scope.meals[0].deleted).toBe(false);
    });

    it('should initailize the newMeal scope', function() {
      $httpBackend.flush();
      expect(scope.newMeal).toBeDefined();
    });

    // it('should add 1 meal to the meal list and clear input fields after', function() {
    //   $httpBackend.flush();
    //   scope.sumcalories = 0;
    //   scope.newMeal.name = 'bread';
    //   scope.newMeal.calories = 125;
    //   scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
    //   scope.addMeal();
    //   expect(scope.meals.length).toBe(1);
    //   expect(scope.meals[0].name).toBe('apple');
    //   expect(scope.meals[0].calories).toBe(25);
    //   expect(scope.meals[0].date).toEqual(new Date(1982, 5, 26, 10, 20));
    //   expect(scope.meals[0].deleted).toBe(false);
    // });
// });

});
