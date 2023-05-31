import { creatTask } from './task.js';

const tasks = [];

function addTask() {
    const task1 = creatTask('task1', 'dessign wireframe', 'Alex', '23/4/2023', 'in progress');
    tasks.push(task1);
}

function displayTasks() {
    const taskContainer = document.getElementById('taskCards');
    let newTask = generateTaskHtml(tasks[0]);
    taskContainer.innerHTML += newTask;
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

addTask();
displayTasks();