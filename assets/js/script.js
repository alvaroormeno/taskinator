var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var tasks = [

];
    
var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formEl.hasAttribute("data-task-id");
    //has attribute, so get task id and call function to complete edit proces
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }

    // resent previous task content from input
    formEl.reset();

    // reset form fields for next task to be entered
    //document.querySelector("input[name='task-name']").value = "";
    //document.querySelector("select[name='task-type']").selectedIndex = 0;
    
    
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
    
    switch (taskDataObj.status) {
        case "to do":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
          tasksToDoEl.append(listItemEl);
          break;
        case "in progress":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
          tasksInProgressEl.append(listItemEl);
          break;
        case "completed":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompletedEl.append(listItemEl);
          break;
        default:
          console.log("Something went wrong!");
    }

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    saveTasks();

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
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    // add status Drop Down into DIV created in actionContainerEl function
    actionContainerEl.appendChild(statusSelectEl);

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

    


    return actionContainerEl;
};


var completeEditTask = function(taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);

    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks();

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

};



var taskButtonHanler = function(event) {
    //get target element from event
    var targetEl = event.target;
    console.log(event.target);

    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        //get the elemets task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};

var editTask = function(taskId) {
    //console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "'");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id" , taskId);
};



var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
          updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();



}

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);
  
    // find task list item based on event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");
  
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // convert value to lower case
    var statusValue = event.target.value.toLowerCase();
  
    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }

    //update tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks)

    saveTasks();

};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Gets task items from localStorage.

// Converts tasks from the string format back into an array of objects.

// Iterates through a tasks array and creates task elements on the page from it.

var loadTasks = function() {

    var savedTasks = localStorage.getItem("tasks");

    if(!savedTasks) {
        return false;
    }

    savedTasks = JSON.parse(savedTasks);

    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
    }


}



pageContentEl.addEventListener("click", taskButtonHanler)

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);


loadTasks();