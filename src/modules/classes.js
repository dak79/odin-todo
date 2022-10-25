import { format } from 'date-fns';
export class Task {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title, description, dueDate, priority, checklist){
        Task.#incrementId();
        this.id = Task.#id;
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'dd-MM-yyyy');
        this.priority = priority;
        this.checklist = checklist;
    }
}

export class Project {
    constructor(title) {
        this.title = title;
        this.data = [];
    }
} 