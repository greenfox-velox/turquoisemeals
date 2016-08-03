var myMealApp = angular.module('turquoiseMealApp', ['ngRoute']);

myMealApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'mealController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'mealController'
    }).otherwise({
      redirectTo: '/home'
    });
}]);

myMealApp.controller('mealController', ['$scope', '$http', function($scope, $http) {
  $scope.removeMeal = function(meal) {
    var removedMeal = $scope.meals.indexOf(meal);
    $scope.meals.splice(removedMeal, 1);
    changeCalories(-parseInt(meal.calories, 10));
    $http.delete('http://localhost:3000/meals/' + meal.id).success(function() {});
  };

  function formatDate(date) {
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes());
  }

  function calculateCalories(allMeals) {
    var output = allMeals.reduce(function(pv, cv) {
      return cv.deleted ? pv : pv + cv.calories;
    }, 0);
    return output;
  }

  function changeCalories(difference) {
    $scope.sumcalories += difference;
  }

  function clearInputFields() {
    $scope.newMeal.name = '';
    $scope.newMeal.calories = '';
    $scope.newMeal.date = new Date();
  }

  $scope.clearFilterInput = function() {
    $scope.search = '';
  };

  $scope.newMeal = {
    date: new Date()
  };

  function mealMaker() {
    return {
      name: $scope.newMeal.name,
      calories: $scope.newMeal.calories,
      date: formatDate($scope.newMeal.date),
      deleted: false
    };
  }

  $scope.addMeal = function() {
    var mealToAdd = mealMaker();
    $scope.meals.push(mealToAdd);
    changeCalories(parseInt(mealToAdd.calories, 10));
    clearInputFields();
    $http.post('http://localhost:3000/meals', mealToAdd).success(function(data) {
      $scope.meals[$scope.meals.length - 1].id = data.meal.id;
    });
  };

  $http.get('http://localhost:3000/meals').success(function(data) {
    $scope.meals = data.meals;
    $scope.sumcalories = calculateCalories(data.meals);
  });
}]);
