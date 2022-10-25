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
        this.priority = priority;
        this.checklist = checklist;
    }
}

/**
 * Create a new Project.
 * @class
 */
export class Project {

    /**
     * @param { String } title 
     */
    constructor(title) {
        this.title = title;
        this.data = [];
    }
    
    /**
     * Check if param Object is a Task object.
     * @param { Object } task 
     * @returns { Boolean } True if is a Task object, otherwise false.
     */
    static #isTask(task) {
        return task.type === 'task' ? true : false;
    }

    /**
     * Add new task to data []
     * @param { Object.Task } task 
     */
    createTask(task) {
        Project.#isTask(task) ? this.data.push(task) : false;
    }

    /**
     * Search and read a task
     * @param { number } id 
     * @returns { Object.Task|false } Searched task or false if nothing found 
     */
    readTask(id) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if (Project.#isTask(this.data[i]) && this.data[i].id === id) return this.data[i];
        }
        return false;
    }

    /**
     * Update a task
     * @param { Number } id 
     * @param { String } key 
     * @param { String } value 
     * @returns { Object.Task|false } Updated task or false if nothing 
     * found 
     */
    updateTask(id, key, value) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if (Project.#isTask(this.data[i]) && this.data[i].id === id && key in this.data[i]) return this.data[i][key] = value;
        }
        return false;
    }

    /**
     * Delete a task
     * @param { Number } id 
     * @returns { Object.Task|false } Removed task or false if nothing found
     */
    removeTask(id) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if (Project.#isTask(this.data[i]) && this.data[i].id === id) return this.data.splice(i, 1);
        }
        return false;
    }
} 