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
    $http.delete('http://localhost:3000/meals/' + meal.id).success(function(data) {
      $scope.meals[$scope.meals.length-1].id = meal.id;
    })
  }

  formatDate = function(date) {
    return (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes());
  }

  $scope.newMeal = {
    date: new Date()
  }

  $scope.addMeal = function() {
    var mealToAdd = {
      name: $scope.newMeal.name,
      calories: $scope.newMeal.calories,
      date: formatDate($scope.newMeal.date),
      deleted: false
    }
    $scope.meals.push(mealToAdd);
    $scope.newMeal.name = "";
    $scope.newMeal.calories = "";
    $scope.newMeal.date = new Date();
    $http.post('http://localhost:3000/meals', mealToAdd).success(function(data) {
      $scope.meals[$scope.meals.length-1].id = data.meal.id;
    })
  }

  $http.get('http://localhost:3000/meals').success(function(data) {
    $scope.meals = data.meals;
    $scope.sumcalories = data.meals.reduce(function (pv, cv) {
      if (!cv.deleted) {
        pv += cv.calories;
      }
      return pv;
    }, 0);
  })
}]);
