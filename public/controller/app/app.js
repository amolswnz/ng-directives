(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.message = 'Hello from controller';
    }])

    .directive('myTabCtrl', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope) {
          $scope.panes = [];
          $scope.select = function(pane) {
            pane.selected = true;
            $scope.panes.forEach(function(current) {
              if (current !== pane) {
                current.selected = false;
              }
            });
          };
          this.addPane = function(pane) {
            $scope.panes.push(pane);
            if ($scope.panes.length === 1)
              pane.selected = true;
          };
        },
        templateUrl: 'template/myTabCtrl.html'
      };
    })

    .directive('myTab', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          title: '@'
        },
        require: '^myTabCtrl',
        templateUrl: 'template/myPane.html',
        link: function(scope, el, attrs, tabCtrl) {
          console.log(scope);
          tabCtrl.addPane(scope);
        }
      };
    })


  ;
}());
