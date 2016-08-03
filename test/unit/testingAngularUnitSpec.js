describe('Testing AngularJS Test Suite', function() {

  beforeEach(module('turquoiseMealApp'));

  describe('Testing AngularJS Controller', function() {
    var scope, ctrl;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('mealController', {$scope:scope});
    }));

    afterEach(function() {

    });

    it('should initailize the title in the scope', function() {
      expect(scope.newMeal).toBeDefined();
    //   expect(scope.title).toBe("Testing AngularJS Application");
    });

    // it('should add 2 destination to the destination list', function() {
    //   expect(scope.destinations).toBeDefined();
    //   expect(scope.destinations.length).toBe(0);
    //
    //   scope.newDestination = {
    //     city: "London",
    //     country: "England"
    //   };

      // scope.addDestination();
      //
      // expect(scope.destinations.length).toBe(1);
      // expect(scope.destinations[0].city).toBe("London");
      // expect(scope.destinations[0].country).toBe("England");
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

    // });
  });
});
