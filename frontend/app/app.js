var myMealApp = angular.module('turqoiseMealApp', ['ngRoute']);

myMealApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });
}]);

myMealApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {
  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  }

  $scope.addNinja = function() {
    $scope.ninjas.push({
        name: $scope.newninja.name,
        colour: $scope.newninja.colour,
        rate: parseInt($scope.newninja.rate),
        available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.colour = "";
    $scope.newninja.rate = "";
  }

  $http.get('data/meals.json').success(function(data) {
    $scope.ninjas = data;
  })
}]);
