var addTaskBtn = document.querySelector(".addTaskBtn");
var input = document.querySelector(".inputTask");

input.focus();

//set local storage
function setLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todosClusor.getTodos()));
}

//todosClusor
var todosClusor = (function () {
  var todos =
    JSON.parse(localStorage.getItem("todos")) === null
      ? []
      : JSON.parse(localStorage.getItem("todos"));
  return {
    getTodos() {
      //  console.log(this); this refers to todosClusor
      return todos;
    },
    addTask(inputText) {
      todos.push({
        task: inputText,
        id: new Date().getTime(),
        isDone: false,
      });
      setLocalStorage();
    },
    removeTask(taskID) {
      var taskIndex = todos.findIndex(function (task) {
        return task.id === taskID;
      });
      todos.splice(taskIndex, 1);
      setLocalStorage();
    },
    doneTask(taskID) {
      var task = todos.find(function (currentTask) {
        return currentTask.id === taskID;
      });
      if (task) task.isDone = !task.isDone;
      setLocalStorage();
    },
  };
})();

//user error message
function errorMsg(message) {
  alert(message);
  input.value = "";
}

//render a list of tasks
function renderTodoList() {
  var taskList = document.querySelector(".taskList");
  taskList.innerHTML = "";
  todosClusor.getTodos().forEach(function (item, i) {
    var li = document.createElement("LI");
    var btnRemove = document.createElement("BUTTON");
    var btnDone = document.createElement("BUTTON");
    var spanTask = document.createElement("SPAN");

    if (item.isDone === true) spanTask.classList.add("done-task");

    btnRemove.classList.add("btn", "btn-remove");
    btnDone.classList.add("btn", "btn-done");

    btnRemove.innerHTML = '<i class="bi bi-trash"></i>';
    btnDone.innerHTML = '<i class="bi bi-check"></i>';

    btnRemove.addEventListener("click", removeTask.bind(null, item.id));
    btnDone.addEventListener("click", doneTask.bind(null, item.id));

    spanTask.textContent = todosClusor.getTodos()[i].task;

    li.appendChild(spanTask);
    li.appendChild(btnDone);
    li.appendChild(btnRemove);
    taskList.appendChild(li);
  });
}
renderTodoList();

//add task event
function addTask() {
  var inputText = input.value.trim();
  if (inputText.length === 0) {
    errorMsg("Please Enter Your Task!");
    return;
  }
  if (inputText.length < 3 && inputText.length > 0) {
    errorMsg("Please Enter At Least 3 Character!");
    return;
  }

  todosClusor.addTask(inputText);
  renderTodoList();

  input.value = "";
  input.focus();
}

//remove task from list
function removeTask(taskID) {
  todosClusor.removeTask(taskID);
  //   setLocalStorage();
  renderTodoList();
  input.focus();
}

//make task done and not done
function doneTask(taskID) {
  todosClusor.doneTask(taskID);
  renderTodoList();
  input.focus();
}

//global event
addTaskBtn.addEventListener("click", addTask);
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

//********clusor**********
// function a() {
//   var x = 2;
//   return function b() {
//     return (x = x + 2);
//   };
// }
// var c = a();
// console.log(c());
