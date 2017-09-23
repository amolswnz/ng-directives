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

    .directive('masterList', function(userListStateService) {
      return {
        scope: {
          users: '=data'
        },
        templateUrl: 'template/masterList.html',
        controller: function($scope) {
          $scope.state = userListStateService;
          userListStateService.selectedUser = $scope.users[0];
        }
      };
    })

    .directive('detailUser', function(userListStateService) {
      return {
        scope: {
          users: '=data'
        },
        templateUrl: 'template/detailUser.html',
        controller: function($scope) {
          $scope.state = userListStateService;
        }
      };
    })

    .factory('userListStateService', function() {
      return {
        selectedUser: null
      };
    })
    ;
}());
