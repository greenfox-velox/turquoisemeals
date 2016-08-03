describe('Testing AngularJS Test Suite', function() {
  beforeEach(module('turquoiseMealApp'));

  describe('Testing AngularJS Controller', function() {
    var scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      $controller('mealController', {$scope: scope});
    }));

    afterEach(function() {

    });

    it('should initailize the newMeal scope', function() {
      expect(scope.newMeal).toBeDefined();
    });

    it('should add 1 meal to the meal list and clear input fields after', function() {
      scope.meals = [];
      scope.sumcalories = 0;
      scope.newMeal.name = 'apple';
      scope.newMeal.calories = 25;
      scope.newMeal.date = new Date(1982, 5, 26, 10, 20);
      scope.addMeal();
      expect(scope.meals).toBeDefined();
      expect(scope.meals.length).toBe(1);
      expect(scope.meals[0].name).toBe('apple');
      expect(scope.meals[0].calories).toBe(25);
      expect(scope.meals[0].date).toBe('1982-6-26 10-20');
      expect(scope.meals[0].deleted).toBe(false);
      expect(scope.newMeal.name).toBe('');
      expect(scope.newMeal.calories).toBe('');
      expect(scope.sumcalories).toBe(25);
      // expect(scope.newMeal.date).toBe(new Date());
    });
    //
    //   scope.newDestination = {
    //     city: "London",
    //     country: "England"
    //   };

      // scope.addDestination();
      //
      // expect(scope.destinations.length).toBe(1);
      //
      // scope.newDestination = {
      //   city: "Frankfurt",
      //   country: "Germany"
      // };
      //
      // scope.addDestination();
      //
      // expect(scope.destinations.length).toBe(2);
      // expect(scope.destinations[1].city).toBe("Frankfurt");
      // expect(scope.destinations[1].country).toBe("Germany");
      // expect(scope.destinations[0].city).toBe("London");
      // expect(scope.destinations[0].country).toBe("England");
  });
});
