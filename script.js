import { createTask } from './task.js';

// const tasks = [];
// get the element of the form
const userName = document.getElementById('name');
const userDescription = document.getElementById('description');
const userAssignTo = document.getElementById('assigned-to');
const userDueDate = document.getElementById('due-Date');
const userStatus = document.getElementById('status');
const todayDate = new Date();

// get the elements which wants to give us error message
const invalidName = document.getElementById('invalidName');
const invalidDescription = document.getElementById('invalidDescription');
const invalidAssignedTo = document.getElementById('invalidAssignedTo');


// generate initial tasks
function populateTasks() {
    if (localStorage.getItem("cards")) {
        // means the program ran once and have the local storage so just return and not make another 6 tasks again so 
        // I use return to stop and not to run the rest of function
        return;
    }
    // by using creatTask from task.js create 6 initial task 
    let tasks = [];
    tasks.push(createTask('TASK 1', 'Design the wireframe', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 2', 'Implement task form', 'Vishnu', '25/4/2023', 'to-do'));
    tasks.push(createTask('TASK 3', 'Implement task layout', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 4', 'Style the page', 'Vishnu', '17/4/2023', 'done'));
    tasks.push(createTask('TASK 5', 'Requirement gathering', 'Parisa', '20/4/2023', 'done'));
    tasks.push(createTask('TASK 6', 'Make the page responsive', 'Vishnu', '27/4/2023', 'review'));
    // store the initial tasks in local storage
    setTasks(tasks);
}
// get tasks from local storage and render tasks on UI
function displayTasks(filterBy) {
    const taskContainer = document.getElementById('taskCards');
    const assigneeDropdown = document.getElementById('assignee');

    // get tasks from local storage
    // generate card html for each task by using generateTaskHtml function and map itterator
    // join all the cards html to give us string from array of string

    let assignees  = getTasks().map(tasks =>
        `<li><a class="dropdown-item" href="#">${tasks.assignedTo}</a></li>`
    ).reduce((a,b) => { if (a.indexOf(b) < 0 ) a.push(b); return a;},[]).join('');
    assigneeDropdown.innerHTML = assignees;

    if(filterBy) {
        const filteredTasks = getTasks().filter(task => task.status === filterBy);
        if(filteredTasks.length > 0) {
            taskContainer.innerHTML = getTasks().filter(task => task.status === filterBy).map(generateTaskHtml).join('');
        } else {
            taskContainer.innerHTML = `<div id="error-popup" class="popup">
                            <div class="popup-content">
                                <p>No task's found for your selection. Please re-select different filter</p>
                                <button class="btn btn-primary" id="closePopup">Close</button>
                            </div>
                        </div>`;
            document.getElementById("error-popup").classList.add("show");
            document.getElementById("closePopup").addEventListener('click', ()=> {
                document.getElementById("error-popup").classList.remove("show");
                taskContainer.innerHTML = getTasks().map(generateTaskHtml).join('');
            });
        }
    } else {
        taskContainer.innerHTML = getTasks().map(generateTaskHtml).join('');
    }

    // set evenLIstener for buttons

    document.querySelectorAll('.delete-btn').forEach(item => {
        item.addEventListener('click', activeDeleteButton)

    });
    document.querySelectorAll('.edit-btn').forEach(item => {
        item.addEventListener('click', activeEditButton)
    });

    document.querySelectorAll('.dropdown-menu.filter-status li a').forEach(item => {
        item.addEventListener('click', filterTasksByStatus)
    });

    document.querySelectorAll('.save-btn').forEach(item => {
        item.addEventListener('click', activeSaveButton)
    });
    document.querySelectorAll('.cancel-btn').forEach(item => {
        item.addEventListener('click', activeCancelButton)
    });
    document.querySelectorAll('.mark-as-done').forEach(item => {
        item.addEventListener('click', markAsDone)
    });

}

// this function get task object and make a card html for UI

function generateTaskHtml(task) {
    return `<div class="col-md-6 col-lg-4 col-12" id="${task.id}-original">  
                        <div class="card">
                        <div class="change">
                        <span class="material-symbols-outlined avatar" title="${task.assignedTo}">person</span>
                        </div>
                        <div class="card-body">
                                <h5 class="card-title">${task.name}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${task.status.toUpperCase()}</h6>
                                <p class="card-text"> ${task.description}</p>
                                <label>${task.assignedTo}</label>
                                </br>
                                <label>${task.dueDate}</label>
                                <div style="display:${(task.status === "done") ? "none" : "block"}"></br></br> 
                                Progress <div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar progress-bar-striped" style="width: ${task.status === "in-progress" ? 25 : 0 || task.status === "review" ? 75 : 0}%">
                                    ${task.status === "in-progress" ? 25 : 0 || task.status === "review" ? 75 : 0}%</div>
                                </div>
                                <br>
                                <br>
                                <span class="material-symbols-outlined delete-btn" id="${task.id}">delete</span>
                                <span class="material-symbols-outlined edit-btn" id="${task.id}" >stylus</span>
                                <span class="material-symbols-outlined mark-as-done" title="Mark as done" id="${task.id}">done</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>`
        +
        `<div class="col-md-6 col-lg-4 col-12" id="${task.id}-editable" style="display:none">  
                        <div class="card pt-3">
                        <div class="change">

                        <span class="material-symbols-outlined save-btn" id="${task.id}">save</span>
                        <span class="material-symbols-outlined cancel-btn" id="${task.id}">cancel</span>
                        
                        </div>
                        <div class="card-body">
                                <input id="${task.id}-name" value="${task.name}"  type="text">
                                <input id="${task.id}-status" value="${task.status}">
                                <input id="${task.id}-description" type="text" value="${task.description}"> 
                                <input id="${task.id}-assignedTo" type="text" value="${task.assignedTo}">
                                <input id="${task.id}-dueDate" type="text" value="${task.dueDate}">
                            </div>
                            
                        </div>
                    </div>`;

}


populateTasks();
displayTasks();

// active create button
// validate inputs and create new task
const addNewTask = () => {
    invalidName.innerHTML = "";
    invalidDescription.innerHTML = "";
    invalidAssignedTo.innerHTML = "";

    let validInputs = true;

    if (userName.value.length <= 8) {
        validInputs = false;
        invalidName.innerHTML = "Please provide valid name with at least 8 chars";
    }

    if (userDescription.value.length <= 15) {
        validInputs = false;
        invalidDescription.innerHTML = "Please provide valid description with at least 15 chars";
    }

    if (userAssignTo.value.length <= 8) {
        validInputs = false;
        invalidAssignedTo.innerHTML = "Please provide valid assigned to value with at least 8 chars";
    }

    // if the inputs are valid it create tasks,then get the current tasks from local storage 
    //  add the new task to the local array then set the changes to the local storage, then display on UI
    if (validInputs) {
        let givenDueDateArray = userDueDate.value.split('-');
        const userNewTask = createTask(userName.value, userDescription.value, userAssignTo.value,  givenDueDateArray[2] +"/" + givenDueDateArray[1] + "/" + givenDueDateArray[0], userStatus.value);
        let tasks = getTasks();
        tasks.push(userNewTask);
        setTasks(tasks);
        displayTasks();
    }

};


const clearForm = () => {

    invalidName.innerHTML = "";
    invalidDescription.innerHTML = "";
    invalidAssignedTo.innerHTML = "";

    userName.value = "";
    userDescription.value = "";
    userAssignTo.value = "";
}

const createButton = document.getElementById('create');
createButton.addEventListener('click', addNewTask);

// delete button

function activeDeleteButton(event) {

    // find the index of task which is clicked then if the value is the same as id of task,
    let tasks = getTasks();
    const index = tasks.findIndex(task => task.id == event.target.id);
    console.log(event.target.id);
    console.log(index);
    // then remove it from the task array
    tasks.splice(index, 1);
    setTasks(tasks);
    // call displayTask to show in UI
    displayTasks();
};


// edit button
function activeEditButton(event) {
    const taskId = event.target.id;
    // `${taskId}-original`
    // taskId + '-original'
    document.getElementById(`${taskId}-original`).style.display = 'none';
    document.getElementById(`${taskId}-editable`).style.display = 'block';
    console.log('check');
}

function filterTasksByStatus(event) {
    const filterBy = event.target.getAttribute("value");
    // `${taskId}-original`
    // taskId + '-original'
    displayTasks(filterBy);
    console.log("filter", filterBy);
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', clearForm);


// save button
function activeSaveButton(event) {
    const taskId = event.target.id;

    // console.log('hgkhikl');
    let tasks = getTasks();
    const index = tasks.findIndex(task => task.id == event.target.id);
    const saveName = document.getElementById(`${taskId}-name`).value
    const saveStatus = document.getElementById(`${taskId}-status`).value
    const saveDescription = document.getElementById(`${taskId}-description`).value
    const saveAssignedTo = document.getElementById(`${taskId}-assignedTo`).value
    const saveDueDate = document.getElementById(`${taskId}-dueDate`).value

    // console.log(saveName);
    tasks[index]._name = saveName
    tasks[index]._status = saveStatus
    tasks[index]._description = saveDescription
    tasks[index]._assignedTo = saveAssignedTo
    tasks[index]._dueDate = saveDueDate


    setTasks(tasks);
    displayTasks();
}
// cancel button
function activeCancelButton(event) {
    const taskId = event.target.id;
    document.getElementById(`${taskId}-original`).style.display = 'block';
    document.getElementById(`${taskId}-editable`).style.display = 'none';
    // console.log('check');

}
// get tasks array from local storage
function getTasks() {
    let get = localStorage.getItem("cards");
    let deserialisedTasks = JSON.parse(get);
    return deserialisedTasks.map(card => Object.assign(createTask(), card));
}

// store tasks array to local storage
function setTasks(input) {
    let stInput = JSON.stringify(input);
    localStorage.setItem("cards", stInput);
}


// mark as done

function markAsDone(event) {

    let tasks = getTasks();
    const index = tasks.findIndex(task => task.id == event.target.id);
    // console.log(index);
    tasks[index]._status = "done";
    setTasks(tasks);
    displayTasks();
}
