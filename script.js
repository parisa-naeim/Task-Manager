import { createTask } from './task.js';

const tasks = [];

function populateTasks() {

    tasks.push(createTask('TASK 1', 'Design the wireframe', 'Parisa', '23/4/2023', 'In Progress'));
    tasks.push(createTask('TASK 2', 'Implement task form', 'Vishnu', '25/4/2023', 'To do'));
    tasks.push(createTask('TASK 3', 'Implement task layout', 'Parisa', '23/4/2023', 'In Progress'));
    tasks.push(createTask('TASK 4', 'Style the page', 'Vishnu', '17/4/2023', 'Done'));
    tasks.push(createTask('TASK 5', 'Requirement gathering', 'Parisa', '20/4/2023', 'Done'));
    tasks.push(createTask('TASK 6', 'Make the page responsive', 'Vishnu', '27/4/2023', 'Review'));

}

function displayTasks() {
    const taskContainer = document.getElementById('taskCards');
    let allTasks = tasks.map(generateTaskHtml).join('');
    taskContainer.innerHTML = allTasks;
    document.querySelectorAll('#delete').forEach(item => {
        item.addEventListener('click', activeDeleteButton)
    });
}



function generateTaskHtml(task) {
    return `<div class="col-md-6 col-lg-4 col-12" >  
                        <div class="card ">
                            <div class="card-body">
                                <h5 class="card-title">${task.name}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${task.status}</h6>
                                <p class="card-text"> ${task.description}</p>
                                <label>${task.assignedTo}</label>
                                <label>${task.dueDate}<label>
                            </div>
                            <button type="button" name="${task.id}" class="btn btn-secondary" value="delete" id="delete">delete</button>
                        </div>
                    </div>`;

}

populateTasks();
displayTasks();

// active create button

const addNewTask = () => {
    const userName = document.getElementById('name');
    const userDescription = document.getElementById('description');
    const userAssignTo = document.getElementById('assigned-to');
    const userDueDate = document.getElementById('due-Date');
    const userStatus = document.getElementById('status');
    console.log(userName.value);

    const userNewTask = createTask(userName.value, userDescription.value, userAssignTo.value, userDueDate.value, userStatus.value);

    tasks.push(userNewTask);
    displayTasks();
};

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


