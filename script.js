import { createTask } from './task.js';

const tasks = [];

const userName = document.getElementById('name');
const userDescription = document.getElementById('description');
const userAssignTo = document.getElementById('assigned-to');
const userDueDate = document.getElementById('due-Date');
const userStatus = document.getElementById('status');

const invalidName = document.getElementById('invalidName');
const invalidDescription = document.getElementById('invalidDescription');
const invalidAssignedTo = document.getElementById('invalidAssignedTo');

function populateTasks() {

    tasks.push(createTask('TASK 1', 'Design the wireframe', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 2', 'Implement task form', 'Vishnu', '25/4/2023', 'to-do'));
    tasks.push(createTask('TASK 3', 'Implement task layout', 'Parisa', '23/4/2023', 'in-progress'));
    tasks.push(createTask('TASK 4', 'Style the page', 'Vishnu', '17/4/2023', 'done'));
    tasks.push(createTask('TASK 5', 'Requirement gathering', 'Parisa', '20/4/2023', 'done'));
    tasks.push(createTask('TASK 6', 'Make the page responsive', 'Vishnu', '27/4/2023', 'review'));

}

function displayTasks() {
    const taskContainer = document.getElementById('taskCards');
    let allTasks = tasks.map(generateTaskHtml).join('');
    taskContainer.innerHTML = allTasks;
    document.querySelectorAll('#delete').forEach(item => {
        item.addEventListener('click', activeDeleteButton)

    });
    document.querySelectorAll('#edit').forEach(item => {
        item.addEventListener('click', activeEditButton)
    });
    document.querySelectorAll('#save').forEach(item => {
        item.addEventListener('click', activeSaveButton)
    });
    document.querySelectorAll('#cancel').forEach(item => {
        item.addEventListener('click', activeCancelButton)
    });


}



function generateTaskHtml(task) {
    return `<div class="col-md-6 col-lg-4 col-12" id="${task.id}-original">  
                        <div class="card ">
                        <div class="change">
                        <button type="button" name="${task.id}" class="btn btn-secondary" value="delete" id="delete">delete</button>
                        <button type="button" name="${task.id}" class="btn btn-secondary" value="edit" id="edit">edit</button></div>
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
                        <div class="card ">
                        <div class="change">
                        <button type="button" name="${task.id}" class="btn btn-secondary" value="save" id="save">save</button>
                        <button type="button" name="${task.id}" class="btn btn-secondary" value="cancel" id="cancel">cancel</button></div>
                        
                        
                        <div class="card-body">
                                <input id="${task.id}-name" value="${task.name}" class="form-select" type="text" class="card-title">
                                <input id="${task.id}-status" value="${task.status}" class="card-subtitle mb-2 text-body-secondary">
                                <input id="${task.id}-description" type="text" value="${task.description}" class="card-text"> 
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
        tasks.push(userNewTask);
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
    const index = tasks.findIndex(task => task.id == event.target.name);
    // then remove it from the task array
    tasks.splice(index, 1);
    // call displayTask to show in UI
    displayTasks();
};


// edit button
function activeEditButton(event) {
    const taskId = event.target.name;
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
    const taskId = event.target.name;

    // console.log('hgkhikl');
    const index = tasks.findIndex(task => task.id == event.target.name);
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

    console.log(tasks[index]);

    displayTasks();
}
// cancel button
function activeCancelButton(event) {
    const taskId = event.target.name;
    document.getElementById(`${taskId}-original`).style.display = 'block';
    document.getElementById(`${taskId}-editable`).style.display = 'none';
    console.log('check');

}
