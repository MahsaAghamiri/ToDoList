var addTaskBtn = document.querySelector('.addTaskBtn');
var input = document.querySelector('.inputTask');
var todos = [];

input.focus();

//user error message
function errorMsg(message) {
    alert(message);
    input.value = '';
}

//render a list of tasks
function renderTodoList() {
    var taskList = document.querySelector('.taskList');
    taskList.innerHTML = '';

    todos.forEach(function (item, i) {
        var li = document.createElement('LI');
        var btnRemove = document.createElement('BUTTON');
        var btnDone = document.createElement('BUTTON');
        var spanTask = document.createElement('SPAN');

        if (item.isDone === true) spanTask.classList.add('done-task');

        btnRemove.classList.add('btn', 'btn-remove');
        btnDone.classList.add('btn', 'btn-done');

        btnRemove.innerHTML = '<i class="bi bi-trash"></i>';
        btnDone.innerHTML = '<i class="bi bi-check"></i>';

        btnRemove.addEventListener('click', removeTask.bind(null, item.id));
        btnDone.addEventListener('click', doneTask.bind(null, item.id));

        spanTask.textContent = todos[i].task;

        li.appendChild(spanTask);
        li.appendChild(btnDone);
        li.appendChild(btnRemove);
        taskList.appendChild(li);
    });

}

//add task event
function addTask() {
    var inputText = input.value.trim();
    if (inputText.length === 0) {
        errorMsg('Please Enter Your Task!');
        return;
    }
    if (inputText.length < 3 && inputText.length > 0) {
        errorMsg('Please Enter At Least 3 Character!');
        return;
    }

    todos.push({
        task: inputText,
        id: new Date().getTime(),
        isDone: false,
    });

    renderTodoList();

    input.value = '';
    input.focus();
}

//remove task from list
function removeTask(taskID) {
    var taskIndex = todos.findIndex(function(task){
        return task.id === taskID;
    });
    todos.splice(taskIndex,1)

    // todos = todos.filter(function (item) {
    //     return item.id !== taskID;
    // });
    renderTodoList();
    input.focus();
}

//make task done and not done
function doneTask(taskID) {
    todos.forEach(function (item) {
        if (item.id === taskID && item.isDone === false) {
            item.isDone = true;
        } else if (item.id === taskID) {
            item.isDone = false;
        }
    });
    renderTodoList();
    input.focus();
}

//global event
addTaskBtn.addEventListener('click', addTask);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
})


