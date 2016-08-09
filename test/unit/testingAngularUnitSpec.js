  // testing controller
describe('mealController', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;
  var scope;

  // Set up the module
  beforeEach(module('turquoiseMealApp'));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('GET', 'http://localhost:3000/meals')
                          .respond({'meals': [{id: 1, name: 'apple', calories: 25, date: new Date(1982, 5, 26, 10, 20), deleted: false}]});
    authRequestHandler = $httpBackend.when('POST', 'http://localhost:3000/meals')
                          .respond({'meal': [{id: 5, name: 'egg', calories: 25, date: new Date(1982, 5, 26, 10, 20), deleted: false}]});
    // Get hold of a scope (i.e. the root scope)
    authRequestHandler = $httpBackend.when('DELETE', 'http://localhost:3000/meals/5')
                          .respond({});
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      scope = $rootScope.$new();
      return $controller('mealController', {'$scope' : scope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
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
    expect(scope.newMeal).toBeDefined();
  });

  it('should add 1 meal to the meal list and clear input fields after', function() {
    scope.sumcalories = 0;
    scope.newMeal.name = 'bread';
    scope.newMeal.calories = 125;
    scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
    scope.addMeal();
    expect(scope.meals.length).toBe(2);
    expect(scope.meals[0].name).toBe('apple');
    expect(scope.meals[0].calories).toBe(25);
    expect(scope.meals[0].date).toEqual(new Date(1982, 5, 26, 10, 20));
    expect(scope.meals[0].deleted).toBe(false);
    expect(scope.meals[1].name).toBe('bread');
    expect(scope.meals[1].calories).toBe(125);
    expect(scope.meals[1].date).toEqual('1982-6-26 10-20');
    expect(scope.meals[1].deleted).toBe(false);
    scope.newMeal.name = '';
    scope.newMeal.calories = '';
    scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
  });

  it('should add 1 meal with $http', function() {
    $httpBackend.expectGET('http://localhost:3000/meals');
    var controller = createController();
    scope.meals = [];
    scope.newMeal.name = 'egg';
    scope.newMeal.calories = 25;
    scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
    scope.addMeal();
    $httpBackend.expectPOST('http://localhost:3000/meals', JSON.stringify({name: 'egg', calories: 25, date: '1982-6-26 10-20', deleted: false}));
    $httpBackend.flush();
    expect(scope.meals.length).toBe(1);
  });

  it('should delete 1 meal with $http', function() {
    $httpBackend.expectGET('http://localhost:3000/meals');
    var controller = createController();
    scope.meals = [];
    expect(scope.meals.length).toBe(0);
    scope.newMeal.name = 'egg';
    scope.newMeal.calories = 25;
    scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
    scope.addMeal();
    expect(scope.meals.length).toBe(1);
    scope.meals[scope.meals.length - 1].id = 5;
    scope.removeMeal({name : 'egg', calories : 25, date : '1982-6-26 10-20', deleted : false, id : 5});
    $httpBackend.expectDELETE('http://localhost:3000/meals/5');
    expect(scope.meals.length).toBe(0);
    $httpBackend.flush();
  });
});
