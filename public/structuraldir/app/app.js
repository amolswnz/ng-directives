(function() {
  'use strict';
  angular.module('mainApp', [])
    .controller('mainCtrl', ['$scope', function($scope) {
      $scope.names = ['Apple', 'Mango', 'Orange', 'Lemon'];
      $scope.hunters = ['Amol', 'Vivaan', 'Aaron'];
      $scope.fruits = ['Apple', 'Mango', 'Orange', 'Lemon', 'Banana', 'Pineapple'];
      $scope.add = function() {
        $scope.fruits.push('Coconut');
      };
      $scope.remove = function() {
        $scope.fruits.length--;
      };

      $scope.moreFruits = [{
          'name': 'Apple',
          'boxes': 12
        },
        {
          'name': 'Mango',
          'boxes': 21
        },
        {
          'name': 'Orange',
          'boxes': 43
        },
        {
          'name': 'Lemon',
          'boxes': 23
        },
        {
          'name': 'Banana',
          'boxes': 42
        },
        {
          'name': 'Pineapple',
          'boxes': 11
        }
      ];
    }])

    .directive('myTransclude', function() {
      return {
        restrict: 'A',
        transclude: 'element',
        link: function(scope, el, attr, ctrl, transclude) {
          console.log(el[0]);
          transclude(scope, function(clone, scope) {
            el.after(clone);
          });
        }
      };
    })

    .directive('lazyLoadData', function() {
      return {
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function(scope, el, attr, ctrl, transclude) {
          var hasBeenShown = false;
          var unwatchFn = scope.$watch(attr.lazyLoadData, function(value) {
            if (value && !hasBeenShown) {
              hasBeenShown = true;
              transclude(scope, function(clone, scope) {
                el.after(clone);
              });
              unwatchFn();
            }
          });
        }
      };
    })

    .directive('myRepeat', function() {
      return {
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function(scope, el, attr, ctrl, transclude) {
          var pieces = attr.myRepeat.split(' ');
          var item = pieces[0];
          var items = pieces[2];
          var elements = [];
          scope.$watchCollection(items, function(collection) {
            if (elements.length > 0) {
              for (var a = 0; a < elements.length; a++) {
                elements[a].el.remove();
                elements[a].scope.$destroy();
              }
            }
            for (var a = 0; a < collection.length; a++) {
              var childScope = scope.$new();
              childScope[item] = collection[a];
              transclude(childScope, function(clone) {
                el.before(clone);
                var data = {};
                data.el = clone;
                data.scope = childScope
                elements.push(data);
              });
            }
          });
        }
      };
    })

    .directive('fruitList', function($compile) {
      return {
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function(scope, el, attr, ctrl, transclude) {
          var pieces = attr.fruitList.split(' ');
          var item = pieces[0];
          var items = pieces[2];
          var elements = [];
          scope.$watchCollection(items, function(collection) {
            if (elements.length > 0) {
              for (var a = 0; a < elements.length; a++) {
                elements[a].el.remove();
                elements[a].scope.$destroy();
              }
            }
            for (var a = 0; a < collection.length; a++) {
              var childScope = scope.$new();
              childScope[item] = collection[a];
              transclude(childScope, function(clone) {
                var template = $compile(
                  '<div class="panel panel-primary"> \
                    <div class="panel-heading"> {{ ' + item + '.name }} \ </div> \
                    <div class="panel-body" /> \
                  </div>'
                );
                var wrapper = template(childScope);
                wrapper.find('.panel-body').append(clone);
                el.before(wrapper);
                var data = {};
                data.el = wrapper;
                data.scope = childScope
                elements.push(data);
              });
            }
          });
        }
      };
    });
}());
