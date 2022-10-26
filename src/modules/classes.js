import { format } from 'date-fns';

/**
 * Create a new Task
 * @class
 */
export class Task {
    static #id = 0;

    /**
     * Create an incremental Id for each task
     */
    static #incrementId() {
        this.#id++;
    }

    /**
     * @param { String } title 
     * @param { String } description 
     * @param { Date } dueDate 
     * @param { Number } priority 
     * @param { Array.String } checklist 
     */
    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        Task.#incrementId();
        this.id = Task.#id;
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'dd-MM-yyyy');
        this.tags = [];
        this.priority = priority;
        this.checklist = checklist;
    }

    addTask(array) {
        array.push(this);
    }
    
    findTask(array) {
        return array.find(element => element.id === this.id);
    }

    updateTask(array, key, newValue) {
        const task = this.findTask(array);
        return (key in task) ? task[key] = newValue : false;
    }

    removeTask(array) {
        const task = this.findTask(array);
        const index = array.indexOf(task);
        array.splice(index, 1);
    }
}

/**
 * Create a new List.
 * @class
 */
export class List {

    /**
     * @param { String } title 
     */
    constructor(title) {
        this.title = title;
    }
}
