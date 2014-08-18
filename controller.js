application = {};

application.toDoApp = angular.module('toDoApp', [
  'listControllers',
  'xeditable'
]);

application.listControllers = angular.module('listControllers', []);

application.listControllers.controller('ListCtrl', ['$scope', '$location', 'toDoSession', 'ToDoService',
  function($scope, $location, toDoSession, ToDoService) {

    var todoList = $scope.todoList = toDoSession.get(),
        toDoService = new ToDoService();

    $scope.newToDo = '';

    $scope.location = $location;

    $scope.$watch('location.path()', function (path) {
      // Use the path to determine the filter for the ToDo View
      var routes = {
        '': {isDeleted: false},
        '/': {isDeleted: false},
        '/deleted': {isDeleted: true},
        '/completed': {isCompleted: true, isDeleted: false}
      }

      // todoFilter is what the view uses to filter the repeater
      $scope.todoFilter = routes[path];
    });

    $scope.removeOrRestoreItem = function(item) {
      // Restore the item from it's deleted state if viewing deleted items
      // other wise mark the item as deleted.
      var restore = $scope.location.path() == '/deleted'
      toDoService.removeOrRestoreItem(restore, item)
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
      if(toDoService.addNewToDo(toDoDesc, todoList)) {
        toDoSession.save(todoList);
        $scope.newToDo = '';  // Clear add todo field.
      }
    };
  }
]);
