import { format } from 'date-fns';

const MixCrud = superclass => class extends superclass {
    add(array) {
        array.push(this);
    }
    
    find(array) {
        return array.find(element => element.id === this.id);
    }

    update(array, key, value) {
        const task = this.find(array);
        return (key in task) ? task[key] = value : false;
    }

    delete(array) {
        const task = this.find(array);
        const index = array.indexOf(task);
        array.splice(index, 1);
    }
}

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        TaskProperty.#incrementId();
        this.id = TaskProperty.#id;
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'dd-MM-yyyy');
        this.tags = [];
        this.priority = priority;
        this.checklist = checklist;
    }    
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}

class ListProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title) {
        ListProperty.#incrementId();
        this.id = ListProperty.#id;
        this.title = title;
    }
}

export class List extends MixCrud(ListProperty) {
    constructor(...args) {
        super(...args);
    }
}
