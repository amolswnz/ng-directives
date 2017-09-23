(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.userData = {
        "id": "88712433",
        "name": "Candace Nicolas",
        "phone": "(591) 414-5492",
        "address": {
          "street": "847 Clare Rapids",
          "city": "Uptonville",
          "state": "Hawaii"
        }
      };
    }])
    .directive('userInfoCard', function() {
      return {
        templateUrl: "template/userInfoCard.html",
        restrict: 'E'
      };
    });
}());
// (function() {
//
//   app.config(function($routeProvider) {
//     $routeProvider
//       .when("/main", {
//         templateUrl: "main.html",
//         controller: "MainController"
//       })
//       .when("/user/:userName", {
//         templateUrl: "userDetails.html",
//         controller: "UserController"
//       })
//       .otherwise({
//         // template : "<h1>None</h1><p>Nothing has been selected,</p>"
//         redirectTo: "main"
//       });
//   });
//
//   });
//
// }());
