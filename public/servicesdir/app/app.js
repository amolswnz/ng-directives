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
        },
        "friends": [
          'Pineapple',
          'Coconut'
        ]
      };
      $scope.user3 = {
        "name": "Bud Ferry",
        "phone": "(830) 226-6682",
        "address": {
          "street": "6462 Wendell Ranch",
          "city": "Port Selenashire",
          "state": "Alaska"
        }
      };

    }])

    .directive('userInfoCard', function(knighService) {
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
            knighService.knightMeCheck(user)
              .then(function() {
                console.log('x');
                $scope.user.rank = 'knight';
              }, function(user) {
                alert('Not possible for ' + user.name);
              });
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

    .factory('knighService', function($q) {
      return {
        knightMeCheck: function(candidate) {
          var deferred = $q.defer();
          // console.log('cehck', candidate.friends.length);
          if (candidate.friends) {
            console.log(candidate.friends);
            if (candidate.friends.length > 2) {
              console.log('resolve');
              deferred.resolve(candidate);
            }
          } else {
            console.log('reject');
            deferred.reject(candidate);
          }
          return deferred.promise;
        }
      };
    })

  ;
}());
