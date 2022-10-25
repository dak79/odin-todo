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

    createTask(task) {
        this.data.push(task);
    }

    readTask(id) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if ('id' in this.data[i] && this.data[i].id === id) return this.data[i];
        }
        return false;
    }

    updateTask(id, key, value) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if ('id' in this.data[i] && this.data[i].id === id && key in this.data[i]) return this.data[i][key] = value;
        }
        return false;
    }

    removeTask(id) {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            if ('id' in this.data[i] && this.data[i].id === id) return this.data.splice(i, 1);
        }
        return false;
    }
} 