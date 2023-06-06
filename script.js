import { createTask } from './task.js';

// const tasks = [];

const userName = document.getElementById('name');
const userDescription = document.getElementById('description');
const userAssignTo = document.getElementById('assigned-to');
const userDueDate = document.getElementById('due-Date');
const userStatus = document.getElementById('status');

const invalidName = document.getElementById('invalidName');
const invalidDescription = document.getElementById('invalidDescription');
const invalidAssignedTo = document.getElementById('invalidAssignedTo');

function populateTasks() {
    if (localStorage.getItem("cards")) {
        // means the program ran once and have the local storage so just return and stop
        return;
    }
    let tasks = [];
    tasks.push(createTask('TASK 1', 'Design the wireframe', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 2', 'Implement task form', 'Vishnu', '25/4/2023', 'to-do'));
    tasks.push(createTask('TASK 3', 'Implement task layout', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 4', 'Style the page', 'Vishnu', '17/4/2023', 'done'));
    tasks.push(createTask('TASK 5', 'Requirement gathering', 'Parisa', '20/4/2023', 'done'));
    tasks.push(createTask('TASK 6', 'Make the page responsive', 'Vishnu', '27/4/2023', 'review'));
    setTasks(tasks);
}

function displayTasks() {
    const taskContainer = document.getElementById('taskCards');

    let allTasks = getTasks().map(generateTaskHtml).join('');
    taskContainer.innerHTML = allTasks;
    document.querySelectorAll('.delete-btn').forEach(item => {
        item.addEventListener('click', activeDeleteButton)

    });
    document.querySelectorAll('.edit-btn').forEach(item => {
        item.addEventListener('click', activeEditButton)
    });
    document.querySelectorAll('.save-btn').forEach(item => {
        item.addEventListener('click', activeSaveButton)
    });
    document.querySelectorAll('.cancel-btn').forEach(item => {
        item.addEventListener('click', activeCancelButton)
    });


}



function generateTaskHtml(task) {
    return `<div class="col-md-6 col-lg-4 col-12" id="${task.id}-original">  
                        <div class="card ">
                        <div class="change">
                        <span class="material-symbols-outlined delete-btn" id="${task.id}">delete</span>
                        <span class="material-symbols-outlined edit-btn" id="${task.id}" >stylus</span>
                        </div>
                        <div class="card-body">
                                <h5 class="card-title">${task.name}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${task.status}</h6>
                                <p class="card-text"> ${task.description}</p>
                                <label>${task.assignedTo}</label>
                                <label>${task.dueDate}<label>
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

const addNewTask = () => {
    invalidName.innerHTML = "";
    invalidDescription.innerHTML = "";
    invalidAssignedTo.innerHTML = "";

    let validInputs = true;

    if (userName.value.length <= 8) {
        validInputs = false;
        invalidName.innerHTML = "Please provide valid name with at lease 8 chars";
    }

    if (userDescription.value.length <= 15) {
        validInputs = false;
        invalidDescription.innerHTML = "Please provide valid description with at lease 15 chars";
    }

    if (userAssignTo.value.length <= 8) {
        validInputs = false;
        invalidAssignedTo.innerHTML = "Please provide valid assigned to value with at lease 8 chars";
    }


    if (validInputs) {
        const userNewTask = createTask(userName.value, userDescription.value, userAssignTo.value, userDueDate.value, userStatus.value);
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