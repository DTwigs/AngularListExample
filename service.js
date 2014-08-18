application.toDoApp.factory('toDoSession', function () {
  var SESS_ID = 'angular_todo_example';

  return {
    get: function () {
      // Retrieve todo list data from localStorage
      return JSON.parse(localStorage.getItem(SESS_ID) || '[]');
    },
    save: function (todoList) {
      // Save todo list data to localStorage
      localStorage.setItem(SESS_ID, JSON.stringify(todoList));
    }
  };

});


// The service layer for the To Do List
// The heavy lifting and logic goes here.

application.toDoApp.factory('ToDoService', [
  function() {
    ToDoService = function(){};

    ToDoService.prototype.addNewToDo = function(newToDoDesc, toDoList) {
      if (newToDoDesc.length === 0)
        return false;

      // Create a new to do list object and add it to the toDoList
      toDoList.push({
        desc: newToDoDesc,
        isCompleted: false,
        isDeleted: false
      });

      return true;
    }

    ToDoService.prototype.removeOrRestoreItem = function(restore, item) {
      // Restore the item from it's deleted state if viewing deleted items
      // other wise mark the item as deleted.
      if(restore) {
        item.isDeleted = false;
      } else {
        item.isDeleted = true;
      }
    }

    return ToDoService;
  }]);
