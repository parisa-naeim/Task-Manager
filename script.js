import { creatTask } from './task.js';

const tasks = [];

function populateTasks() {

    tasks.push(creatTask('TASK 1', 'Design the wireframe', 'Parisa', '23/4/2023', 'In Progress'));
    tasks.push(creatTask('TASK 2', 'Implement task form', 'Vishnu', '25/4/2023', 'To do'));
    tasks.push(creatTask('TASK 3', 'Implement task layout', 'Parisa', '23/4/2023', 'In Progress'));
    tasks.push(creatTask('TASK 4', 'Style the page', 'Vishnu', '17/4/2023', 'Done'));
    tasks.push(creatTask('TASK 5', 'Requirement gathering', 'Parisa', '20/4/2023', 'Done'));
    tasks.push(creatTask('TASK 6', 'Make the page responsive', 'Vishnu', '27/4/2023', 'Review'));

}

function displayTasks() {
    const taskContainer = document.getElementById('taskCards');
    let allTasks = tasks.map(generateTaskHtml).join('');
    taskContainer.innerHTML += allTasks;

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
                        </div>
                    </div>`;

}

populateTasks();
displayTasks();