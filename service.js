application.toDoApp.factory('toDoSession', function () {
  var SESS_ID = 'angular_todo_example';

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(SESS_ID) || '[]');
    },
    save: function (todoList) {
      localStorage.setItem(SESS_ID, JSON.stringify(todoList));
    }
  };

});