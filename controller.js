application.toDoApp = angular.module('toDoApp', [
  'listControllers',
  'xeditable',
  'ngAnimate'
]);

application.listControllers = angular.module('listControllers', []);

application.listControllers.controller('ListCtrl', ['$scope', '$location', 'toDoSession',
  function($scope, $location, toDoSession) {

    var todoList = $scope.todoList = toDoSession.get();

    $scope.newToDo = '';

    $scope.location = $location;

    $scope.$watch('location.path()', function (path) {
      var routes = {
        '/': {isDeleted: false},
        '/deleted': {isDeleted: true},
        '/completed': {isCompleted: true, isDeleted: false}
      }
      $scope.todoFilter = routes[path];
    });

    $scope.removeOrRestoreItem = function(item) {
      if($scope.location.path() == '/deleted') {
        item.isDeleted = false;
      } else {
        item.isDeleted = true;
      }
      toDoSession.save(todoList);
    }

    $scope.saveItem = function(item) {
      toDoSession.save(todoList);
    }

    $scope.restoreItem = function(item) {
      item.isDeleted = false;
      toDoSession.save(todoList);
    }

    $scope.addTodo = function () {
      var toDoDesc = $scope.newToDo.trim();
      if (toDoDesc.length === 0)
        return;

      todoList.push({
        desc: toDoDesc,
        isCompleted: false,
        isDeleted: false
      });

      toDoSession.save(todoList);

      $scope.newToDo = '';
    };


  }
]);

// application.listFilters = angular.module('listFilters', []);

// application.listFilters.filter('deletedItems', function() {
//     return function(items) {
//       return items.filter(function(toDo) {
//         if(toDo.isDeleted)
//           return true;
//         return false;
//       });
//     };
//   });

// application.listFilters.filter('activeItems', function() {
//     return function(items) {
//       return items.filter(function(toDo) {
//         if(toDo.isDeleted)
//           return false;
//         return true;
//       });
//     };
//   })
