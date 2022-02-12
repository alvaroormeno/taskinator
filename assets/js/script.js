var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");


var taskIdCounter = 0;
    
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

    // this variable holds function that create the task actions... buttons and drop down menu
    var taskActionsEl = createTaskActions(taskIdCounter);
    // append to (<li>) all task actions
    listItemEl.appendChild(taskActionsEl);

    // add entire <li> to list (<ul>) which is selected in top variable = taskToDoEl
    tasksToDoEl.appendChild(listItemEl);

    // increase counter variable (top of page) by one everytime a task is created
    taskIdCounter++
};

var createTaskActions = function(taskId) {

    // create a new DIV element with the class name "task-actions"
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    // add Edit Button into DIV created in actionContainerEl function
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    // add Delete Button into DIV created in actionContainerEl function
    actionContainerEl.appendChild(deleteButtonEl);


    // create DROP DOWN menu (<select>) for task status
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute = ("name", "status-change");
    statusSelectEl.setAttribute = ("data-task-id", taskId);

    // Array of choices for Drop Down (<select>)
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // for loop that will create a (<option>) element for each array object
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element to be added inside Dropdown
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to dropdown (<select>)
        statusSelectEl.appendChild(statusOptionEl);
    }

    // add status Drop Down into DIV created in actionContainerEl function
    actionContainerEl.appendChild(statusSelectEl);


    return actionContainerEl;
};


formEl.addEventListener("submit", taskFormHandler);


var taskButtonHanler = function(event) {
    console.log(event.target);

    if (event.target.matches(".delete-btn")) {
        //get the elemets task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}


pageContentEl.addEventListener("click", taskButtonHanler)