(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.message = 'Hello from controller';
    }])

    .directive('myQuestion', function() {
      return {
        restrict: 'E',
        templateUrl: 'template/myQuestion.html',
        scope: {
          questionTxt: '@q'
        },
        transclude: true
      };
    })



  ;
}());
