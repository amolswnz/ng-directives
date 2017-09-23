(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.user1 = {
        "id": "88712433",
        "name": "Candace Nicolas",
        "phone": "(591) 414-5492",
        "address": {
          "street": "847 Clare Rapids",
          "city": "Uptonville",
          "state": "Hawaii"
        },
        "friends": [
          'Apple',
          'Mango',
          'Orange',
          'Lemon'
        ]
      };

      $scope.user2 = {
        "name": "Mr. Ines Wehner",
        "phone": "(234) 830-1931",
        "address": {
          "street": "11433 Carolanne Fall",
          "city": "South Jaylanside",
          "state": "Missouri"
        }
      };

    }])

    .directive('userInfoCard', function() {
      return {
        templateUrl: "template/userInfoCard.html",
        restrict: 'E',
        scope: {
          user: '=',
          initialCollapsed: '@collapsed'
        },
        controller: function($scope) {
          $scope.collapsed = ($scope.initialCollapsed === 'true');
          $scope.knightMe = function(user) {
            console.log('clicked');
            $scope.user.rank = 'knight';
          };
          $scope.collapse = function() {
            $scope.collapsed = !$scope.collapsed;
          };
          $scope.removeFriend = function(friend) {
            console.log('clicked', friend);
            var id = $scope.user.friends.indexOf(friend);
            console.log(id);
            if (id > -1)
              $scope.user.friends.splice(id, 1);
          };
        }
      };
    })

    .directive('userAddress', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'template/userAddress.html',
        controller: function($scope) {
          $scope.collapsed = false;
          $scope.collapseAdd = function() {
            $scope.collapsed = !$scope.collapsed;
          };
          $scope.explandAdd = function() {
            $scope.collapsed = !$scope.collapsed;
          };
        }
      };
    })

    .directive('removeFriend', function() {
      return {
        restrict: 'E',
        templateUrl: 'template/removeFriend.html',
        scope: {
          notifyParent: '&method'
        },
        controller: function($scope) {
          $scope.removing = false;
          $scope.removingThis = function() {
            $scope.removing = !$scope.removing;
          };
          $scope.cancelRemove = function() {
            $scope.removing = !$scope.removing;
          };

          $scope.confirmRemove = function() {
            $scope.notifyParent();
          };

        }
      };
    })



  ;
}());
