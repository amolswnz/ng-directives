(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.message = 'Hello from controller';
    }])

    .directive('displayBox', function() {
      return {
        restrict: 'E',
        templateUrl: 'template/displayBox.html',
        controller: function($scope) {
          $scope.hidden = false;
          $scope.hideThis = function() {
            $scope.hidden = true;
          };
          $scope.message = 'This will not be shown as it and it will also not allow this directive to modify controller properties which is not possible without transclusion';
        },
        scope: true,
        transclude: true
      };
    })



  ;
}());
