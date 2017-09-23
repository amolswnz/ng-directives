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
        ],
        "level": 0
      };

      $scope.user2 = {
        "name": "Mr. Ines Wehner",
        "phone": "(234) 830-1931",
        "address": {
          "street": "11433 Carolanne Fall",
          "city": "South Jaylanside",
          "state": "Missouri"
        },
        "level": 1
      };

      $scope.droid1 = {
        "name": 'AD-34X',
        "specifications": {
          "manafacturer": 'IBM',
          "type": ' Astromarch',
          "productLine": 'AD Series'
        },
        level: 1
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
        link: function(scope, el, attrs) {},
        controller: function($scope) {
          $scope.knightMe = function(user) {
            console.log('clicked');
            $scope.user.rank = 'knight';
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

    .directive('stateDisplay', function() {
      return {
        restrict: 'A',
        link: function(scope, el, attrs) {
          var colors = attrs.stateDisplay.split(' ');
          console.log(colors);
          var linkColor = colors[0];
          // watching user.level change
          scope.$watch(linkColor, function(newVal, oldVal) {
            el.css('background-color', colors[newVal + 1]);
          });
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

    .directive('userPanel', function() {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'template/userPanel.html',
        scope: {
          name: '@',
          level: '=',
          initialCollapsed: '@collapsed'
        },
        controller: function($scope) {
          $scope.collapsed = ($scope.initialCollapsed === 'true');
          $scope.collapse = function() {
            $scope.collapsed = !$scope.collapsed;
          };
          $scope.nextState = function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $scope.level++;
            $scope.level = $scope.level % 4;
          };
        }
      };
    })

    .directive('droidInfoCard', function() {
      // console.log(droid1);
      return {
        templateUrl: "template/droidInfoCard.html",
        restrict: 'E',
        scope: {
          droid: '=',
          initialCollapsed: '@collapsed'
        },
        link: function(scope, el, attrs) {},
      };
    })


  ;
}());
