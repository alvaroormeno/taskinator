var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskIdCounter = 0,
    
var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task form!");
        return false;
    }

    // resent previous task content from input
    formEl.reset();

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    
};


var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    // give it a class name
    listItemEl.className = "task-item";

    // add task id as a costum attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire <li> to list
    tasksToDoEl.appendChild(listItemEl);

    // increase counter variable (top of page) by one everytime a task is created
    taskIdCounter++
};




formEl.addEventListener("submit", taskFormHandler);