(function() {
  'use strict';
  angular.module('mainApp', [])

    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.users = [{
          "id": "88712433",
          "name": "Candace Nicolas",
          "phone": "(591) 414-5492",
          "address": {
            "street": "847 Clare Rapids",
            "city": "Uptonville",
            "state": "Hawaii"
          },
        },
        {
          "name": "Mr. Ines Wehner",
          "phone": "(234) 830-1931",
          "address": {
            "street": "11433 Carolanne Fall",
            "city": "South Jaylanside",
            "state": "Missouri"
          },
        },
        {
          "name": "Bud Ferry",
          "phone": "(830) 226-6682",
          "address": {
            "street": "6462 Wendell Ranch",
            "city": "Port Selenashire",
            "state": "Alaska"
          }
        }
      ];
    }])

    .directive('masterList', function() {
      return {
        scope: {
          users: '=data',
          selectedUser: '='
        },
        templateUrl: 'template/masterList.html',
        controller: function($scope) {
          $scope.selectedUser = $scope.users[0];
          $scope.selectUser = function(user) {
            console.log(user);
            $scope.selectedUser = user;
          };
        }
      };
    })

    .directive('detailUser', function() {
      return {
        scope: {
          users: '=data',
          selectedUser: '='
        },
        templateUrl: 'template/detailUser.html'
      };
    })

    .factory('userListStateService', function() {
      return {
        selectedUser: null
      };
    })
    ;
}());
