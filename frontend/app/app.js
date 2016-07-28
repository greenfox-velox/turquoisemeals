var myMealApp = angular.module('turqoiseMealApp', ['ngRoute']);
var now = new Date();

function setFilterDate() {
  document.querySelector('#addDate').valueAsNumber = now.getTime();
};

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
  }

  $scope.addMeal = function() {
    $scope.meals.push({
        name: $scope.newMeal.name,
        calories: $scope.newMeal.calories,
        date: $scope.newMeal.date,
        available: true
    });

    $scope.newMeal.name = "";
    $scope.newMeal.calories = "";
    $scope.newMeal.date = "";
  }

  $http.get('http://localhost:3000/meals').success(function(data) {
    $scope.meals = data.meals;
  })
}]);
