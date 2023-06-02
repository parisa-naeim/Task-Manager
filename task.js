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
let lastId = 1;

function createTask(name, description, assignedTo, dueDate, status) {
    return new Task(name, description, assignedTo, dueDate, status, lastId++);
}

export { createTask };

