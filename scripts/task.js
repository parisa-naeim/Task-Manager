
// task class shows the structure and getter of tasks, we use underscore because we dont want to set these properties directly
class Task {
    constructor(name, description, assignedTo, dueDate, status, id) {
        this._name = name;
        this._description = description;
        this._assignedTo = assignedTo;
        this._dueDate = dueDate;
        this._status = status;
        this._id = id;
    }


    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get assignedTo() {
        return this._assignedTo;
    }

    get dueDate() {
        return this._dueDate;
    }

    get status() {
        return this._status;
    }
    get id() {
        return this._id;
    }
}


// make a new obj from class and increament id one by one and maintain in local storage

function createTask(name, description, assignedTo, dueDate, status) {


    if (localStorage.getItem("lastId")) {
        //    lastId found in local storage (1) so it goes through if statement and make 2,3,...
        let fromStorage = localStorage.getItem("lastId");
        let parsed = parseInt(fromStorage);
        let lastId = parsed + 1;
        localStorage.setItem("lastId", lastId);
    } else {
        // this is the first task so the id is 1
        localStorage.setItem("lastId", "1");
    }
    // it create task with the id from local storage
    return new Task(name, description, assignedTo, dueDate, status, localStorage.getItem("lastId"));


}

export { createTask };

